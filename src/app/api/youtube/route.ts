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

    // 🔥 THE MAGIC BULLET: YouTube's Internal 'InnerTube' API
    // यह Vercel के HTML/Captcha ब्लॉक को पूरी तरह बाईपास कर देता है
    const innerTubeRes = await fetch("https://www.youtube.com/youtubei/v1/player", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // एक असली मैकबुक/क्रोम ब्राउज़र का दिखावा
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
      },
      body: JSON.stringify({
        context: {
          client: {
            clientName: "WEB",
            clientVersion: "2.20240105.01.00", // YouTube का रीसेंट क्लाइंट वर्ज़न
            hl: "en"
          }
        },
        videoId: videoId
      })
    });

    const data = await innerTubeRes.json();

    // 🔹 API के रिस्पॉन्स में से कैप्शंस निकालें
    const captions = data?.captions?.playerCaptionsTracklistRenderer?.captionTracks;

    if (!captions || captions.length === 0) {
      return NextResponse.json(
        { error: "No subtitles available for this video." },
        { status: 404 }
      );
    }

    // 🔹 स्मार्ट लैंग्वेज सेलेक्शन: 
    // सबसे पहले इंग्लिश ढूँढेगा, ना मिले तो हिंदी (hi), वो भी ना मिले तो जो पहला मिल जाए वो ले लेगा।
    let track = captions.find((c: any) => c.languageCode === 'en' || c.languageCode === 'hi');
    if (!track) {
      track = captions[0]; 
    }

    // 🔹 असली XML फाइल डाउनलोड करें
    const xmlRes = await fetch(track.baseUrl);
    if (!xmlRes.ok) throw new Error("Failed to fetch XML");
    const xml = await xmlRes.text();

    // 🔹 XML को साफ़-सुथरे टेक्स्ट (String) में बदलें
    const textMatches = [...xml.matchAll(/<text[^>]*>(.*?)<\/text>/g)];
    const fullText = textMatches
      .map((m) => m[1]
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
      )
      .join(" ")
      .replace(/\s+/g, " ") // फालतू स्पेस हटाएँ
      .trim();

    if (!fullText) {
      return NextResponse.json({ error: "Transcript is empty." }, { status: 404 });
    }

    // ✅ BOOM! SUCCESS!
    return NextResponse.json({ text: fullText });

  } catch (error: any) {
    console.error("InnerTube API Error:", error.message);
    return NextResponse.json(
      { error: "Vercel server blocked. Please use the 'Get Transcript Manually' link below." },
      { status: 500 }
    );
  }
}
