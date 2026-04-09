import { NextResponse } from "next/server";

// Extract Video ID from any YouTube URL
function getVideoId(url: string) {
  const regExp =
    /(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([^&#?/]+)/;
  const match = url.match(regExp);
  return match ? match[1] : null;
}

// Convert XML → plain text
function parseXML(xml: string) {
  const matches = [...xml.matchAll(/<text[^>]*>(.*?)<\/text>/g)];
  return matches.map((m) => m[1]).join(" ");
}

export async function POST(req: Request) {
  try {
    const { url } = await req.json();

    // ✅ Validate URL
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

    // 🔥 STEP 1: Get caption list (IMPORTANT)
    const listRes = await fetch(
      `https://video.google.com/timedtext?type=list&v=${videoId}`
    );
    const listXML = await listRes.text();

    // 🔥 STEP 2: Extract all available languages
    const tracks = [
      ...listXML.matchAll(/lang_code="([^"]+)"/g),
    ].map((m) => m[1]);

    let xml = "";

    // 🔥 STEP 3: Try all available tracks
    for (const lang of tracks) {
      const res = await fetch(
        `https://video.google.com/timedtext?v=${videoId}&lang=${lang}`
      );

      xml = await res.text();

      if (xml && xml.trim() !== "") break;
    }

    // 🔥 STEP 4: Fallback (try auto captions)
    if (!xml || xml.trim() === "") {
      const fallbackRes = await fetch(
        `https://video.google.com/timedtext?v=${videoId}&lang=en&kind=asr`
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

    // ✅ Convert XML → text
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
