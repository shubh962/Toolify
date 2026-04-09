import { NextResponse } from "next/server";
import { YoutubeTranscript } from "youtube-transcript";

// 🔹 Extract Video ID (Optional, since the package handles full URLs too, but good for validation)
function getVideoId(url: string) {
  const regExp = /(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([^&#?/]+)/;
  const match = url.match(regExp);
  return match ? match[1] : null;
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

    // 🔥 FETCH TRANSCRIPT USING PACKAGE
    const transcript = await YoutubeTranscript.fetchTranscript(videoId);
    
    // Combine all transcript parts into a single text block
    const fullText = transcript.map((t) => t.text).join(" ");

    if (!fullText || fullText.trim() === "") {
      throw new Error("Empty transcript");
    }

    // ✅ SUCCESS
    return NextResponse.json({ text: fullText });

  } catch (error: any) {
    console.error("Transcript Error:", error.message);
    return NextResponse.json(
      { 
        error: "No subtitles available. This video may not have captions or is age-restricted." 
      },
      { status: 404 }
    );
  }
}
