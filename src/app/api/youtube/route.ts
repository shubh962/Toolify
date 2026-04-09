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

        const PIPED_INSTANCES = [
      "https://pipedapi.kavin.rocks",
      "https://pipedapi.tokhmi.xyz",
      "https://pipedapi.syncpundit.io", // 🔥 New Server 1
      "https://api.piped.projectsegfau.lt",
      "https://piped-api.lunar.icu",    // 🔥 New Server 2
      "https://piped-api.garudalinux.org" // 🔥 New Server 3
    ];

    let data = null;
    
    // 🔹 ट्राई करें कौन सा प्रॉक्सी सर्वर सबसे तेज़ है
    for (const instance of PIPED_INSTANCES) {
      try {
        // 🔥 Vercel को क्रैश होने से बचाने के लिए 8 सेकंड का कस्टम टाइमआउट
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000);

        const res = await fetch(`${instance}/streams/${videoId}`, { 
          cache: 'no-store',
          signal: controller.signal
        });
        
        clearTimeout(timeoutId); // अगर डेटा आ गया तो टाइमआउट कैंसिल करें

        if (res.ok) {
          data = await res.json();
          break; // डेटा मिल गया, लूप रोकें
        }
      } catch (err) {
        continue; // अगर यह सर्वर डाउन/स्लो है, तो अगला ट्राई करें
      }
    }

    if (!data || !data.subtitles || data.subtitles.length === 0) {
      return NextResponse.json(
        { error: "Subtitles not found for this video." },
        { status: 404 }
      );
    }

    // 🔹 स्मार्ट लैंग्वेज सेलेक्शन (पहले इंग्लिश या हिंदी ढूँढें)
    let track = data.subtitles.find((s: any) => s.code === 'en' || s.code === 'hi');
    if (!track) {
      track = data.subtitles[0]; 
    }

    const vttRes = await fetch(track.url);
    const vttText = await vttRes.text();

    const cleanText = vttText
      .split('\n')
      .filter(line => !line.includes('WEBVTT') && !line.includes('-->') && line.trim() !== '')
      .join(' ')
      .replace(/<[^>]*>/g, '')
      .replace(/\s+/g, ' ')
      .trim();

    if (!cleanText) {
      throw new Error("Empty Transcript");
    }

    return NextResponse.json({ text: cleanText });

  } catch (error: any) {
    console.error("API Error:", error.message);
    return NextResponse.json(
      { error: "Servers took too long to respond. Please use the Manual option below." },
      { status: 500 }
    );
  }
}
