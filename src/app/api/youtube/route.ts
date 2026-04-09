import { NextResponse } from "next/server";

// Extract Video ID from any YouTube URL
function getVideoId(url: string) {
  const regExp =
    /(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([^&#?/]+)/;
  const match = url.match(regExp);
  return match ? match[1] : null;
}

// Convert XML captions → plain text
function parseXML(xml: string) {
  const matches = [...xml.matchAll(/<text[^>]*>(.*?)<\/text>/g)];
  return matches.map((m) => m[1]).join(" ");
}

// POST API
export async function POST(req: Request) {
  try {
    const { url } = await req.json();

    // Validate URL
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

    // Step 1: Get available caption tracks
    const listRes = await fetch(baseUrl);
    const listXML = await listRes.text();

    // Step 2: Extract all available languages
    const tracks = [
      ...listXML.matchAll(/lang_code="([^"]+)"/g),
    ].map((m) => m[1]);

    let xml = "";

    // Step 3: Try all available caption tracks
    for (const lang of tracks) {
      const res = await fetch(`${baseUrl}&lang=${lang}`);
      xml = await res.text();

      if (xml && !xml.includes("error") && xml.trim() !== "") break;
    }

    // Step 4: If no captions found
    if (!xml || xml.trim() === "") {
      return NextResponse.json(
        {
          error:
            "No subtitles available for this video. Try a video with captions (CC enabled).",
        },
        { status: 404 }
      );
    }

    // Step 5: Convert XML → text
    const text = parseXML(xml);

    return NextResponse.json({ text });

  } catch (error) {
    console.error("Transcript Error:", error);

    return NextResponse.json(
      { error: "Failed to fetch transcript. Try another video." },
      { status: 500 }
    );
  }
}
