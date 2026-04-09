import { NextResponse } from "next/server";

// 🔹 Extract Video ID
function getVideoId(url: string) {
  const regExp = /(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([^&#?/]+)/;
  const match = url.match(regExp);
  return match ? match[1] : null;
}

export async function POST(req: Request) {
  try {
    const { url } = await req.json();
    const videoId = getVideoId(url);

    if (!videoId) {
      return NextResponse.json({ error: "Invalid YouTube URL." }, { status: 400 });
    }

    // 🔥 STEP 1: Fetch Video HTML as a "Real Browser" (Bypasses Vercel Bot Block)
    const videoPageRes = await fetch(`https://www.youtube.com/watch?v=${videoId}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9',
        // This cookie bypasses YouTube's consent screens
        'Cookie': 'CONSENT=YES+cb.20210328-17-p0.en+FX+478' 
      },
    });

    const html = await videoPageRes.text();

    // 🔥 STEP 2: Extract the hidden Captions JSON from the HTML
    const captionsRegex = /"captionTracks":(\[.*?\])/;
    const match = html.match(captionsRegex);

    if (!match || match.length < 2) {
      return NextResponse.json(
        { error: "No subtitles available. This video may not have captions or is age-restricted." },
        { status: 404 }
      );
    }

    const captionTracks = JSON.parse(match[1]);

    // 🔥 STEP 3: Find the best language track (Priority: Hindi -> English -> First available)
    let targetTrack = captionTracks.find((track: any) => 
      track.languageCode === 'hi' || track.languageCode === 'en'
    );
    
    // If neither Hindi nor English is found, just grab whatever the first available subtitle is
    if (!targetTrack) {
      targetTrack = captionTracks[0];
    }

    if (!targetTrack || !targetTrack.baseUrl) {
      return NextResponse.json({ error: "No valid subtitle track found." }, { status: 404 });
    }

    // 🔥 STEP 4: Fetch the actual XML Transcript
    const transcriptRes = await fetch(targetTrack.baseUrl);
    const transcriptXml = await transcriptRes.text();

    // 🔥 STEP 5: Convert XML to readable text and clean up HTML symbols (like &amp;)
    const textMatches = [...transcriptXml.matchAll(/<text[^>]*>(.*?)<\/text>/g)];
    const fullText = textMatches
      .map((m) => m[1]
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
      )
      .join(" ");

    if (!fullText || fullText.trim() === "") {
      throw new Error("Empty transcript");
    }

    // ✅ SUCCESS: Send the clean text to Frontend
    return NextResponse.json({ text: fullText });

  } catch (error: any) {
    console.error("Custom Scraper Error:", error.message);
    return NextResponse.json(
      { error: "Something went wrong while fetching subtitles. Try another video." },
      { status: 500 }
    );
  }
}
