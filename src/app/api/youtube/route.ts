import { NextResponse } from "next/server";

function getVideoId(url: string) {
  const regExp =
    /(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([^&#?/]+)/;
  const match = url.match(regExp);
  return match ? match[1] : null;
}

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

    // 🔥 Try multiple languages
    const langs = ["en", "hi", "en-US"];
    let xml = "";

    for (const lang of langs) {
      const res = await fetch(
        `https://www.youtube.com/api/timedtext?lang=${lang}&v=${videoId}`
      );
      xml = await res.text();

      if (xml && !xml.includes("error") && xml.trim() !== "") break;
    }

    if (!xml || xml.includes("error") || xml.trim() === "") {
      return NextResponse.json(
        { error: "No subtitles found for this video." },
        { status: 404 }
      );
    }

    const text = parseXML(xml);

    return NextResponse.json({ text });

  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch transcript." },
      { status: 500 }
    );
  }
}
