import { NextResponse } from 'next/server';
import { YoutubeTranscript } from 'youtube-transcript';

// POST request handler
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { url } = body;

    // Basic validation
    if (!url) {
      return NextResponse.json({ error: 'Please paste a valid YouTube video link.' }, { status: 400 });
    }

    // Attempt to fetch the transcript using the package
    // (This runs on the server, bypassing CORS)
    const transcript = await YoutubeTranscript.fetchTranscript(url);
    
    // Combine all subtitle snippets into one readable text block
    const fullText = transcript.map((t) => t.text).join(' ');

    // Return the clean text to the frontend
    return NextResponse.json({ text: fullText });
    
  } catch (error: any) {
    console.error("YouTube Fetch Error:", error.message);
    
    // Empathetic, Human-like error messages
    let userFriendlyError = 'We couldn\'t find any subtitles for this video.';
    
    if (error.message.includes('Age-restricted')) {
      userFriendlyError = 'This video is age-restricted, and we cannot access it.';
    } else if (error.message.includes('Transcript is disabled')) {
      userFriendlyError = 'The creator has disabled captions/subtitles for this video.';
    }

    return NextResponse.json(
      { error: userFriendlyError + ' Try another video.' },
      { status: 500 }
    );
  }
}
