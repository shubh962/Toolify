import { NextResponse } from "next/server";

// Extract video ID
function getVideoId(url: string) {
  const regExp =
    /(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([^&#?/]+)/;
  const match = url.match(regExp);
  return match ? match[1] : null;
}

// Convert XML → text
function parseXML(xml: string) {
  const matches = [...xml.matchAll(/<text[^>]*>(.*?)<\/text>/g)];
  return matches.map((m) => m[1]).join(" ");
}

export async function POST(req: Request) {
  try {
    const { url } = await req.json();

    if (!url) {
      return NextResponse.json(
        { error: "Please enter a valid YouTube URL." },
        { status: 400 }
      );
    }

    const videoId = getVideoId(url);

    if (!videoId) {
      return NextResponse.json(
        { error: "Invalid YouTube URL." },
        { status: 400 }
      );
    }

    const baseUrl = `https://www.youtube.com/api/timedtext?v=${videoId}`;

    // 🔥 STEP 1: Get all available caption tracks
    const listRes = await fetch(baseUrl);
    const listXML = await listRes.text();

    const tracks = [
      ...listXML.matchAll(/lang_code="([^"]+)"/g),
    ].map((m) => m[1]);

    let xml = "";

    // 🔥 STEP 2: Try all tracks (manual + auto)
    for (const lang of tracks) {
      const res = await fetch(
        `${baseUrl}&lang=${lang}${lang.startsWith("a.") ? "&kind=asr" : ""}`
      );

      xml = await res.text();

      if (xml && !xml.includes("error") && xml.trim() !== "") break;
    }

    // 🔥 STEP 3: Fallback (auto captions force)
    if (!xml || xml.trim() === "") {
      const fallbackRes = await fetch(
        `${baseUrl}&lang=en&kind=asr`
      );
      xml = await fallbackRes.text();
    }

    // ❌ Still no captions
    if (!xml || xml.trim() === "") {
      return NextResponse.json(
        {
          error:
            "No subtitles available for this video. Try another video with captions (CC enabled).",
        },
        { status: 404 }
      );
    }

    // ✅ Convert to text
    const text = parseXML(xml);

    return NextResponse.json({ text });

  } catch (error) {
    console.error("Transcript Error:", error);

    return NextResponse.json(
      { error: "Failed to fetch transcript. Try again." },
      { status: 500 }
    );
  }
}
