import { NextResponse } from "next/server";

// ⚡ Vercel Edge Runtime (यह Vercel के नॉर्मल सर्वर की जगह Cloudflare नेटवर्क का यूज़ करता है, जो ब्लॉक नहीं होता)
export const runtime = "edge";

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

    // 🔥 THE ULTIMATE BYPASS: Public Piped APIs (YouTube Proxies)
    // यह Vercel के IP बैन को पूरी तरह बायपास कर देगा!
    const PIPED_INSTANCES = [
      "https://pipedapi.kavin.rocks",
      "https://pipedapi.tokhmi.xyz",
      "https://api.piped.projectsegfau.lt"
    ];

    let data = null;
    
    // 🔹 ट्राई करें कौन सा प्रॉक्सी सर्वर सबसे तेज़ चल रहा है
    for (const instance of PIPED_INSTANCES) {
      try {
        const res = await fetch(`${instance}/streams/${videoId}`, { cache: 'no-store' });
        if (res.ok) {
          data = await res.json();
          break; // जैसे ही डेटा मिले, लूप रोक दें
        }
      } catch (err) {
        continue; // अगर एक फेल हो, तो दूसरा ट्राई करें
      }
    }

    // अगर किसी भी सर्वर से सबटाइटल नहीं मिला
    if (!data || !data.subtitles || data.subtitles.length === 0) {
      return NextResponse.json(
        { error: "No subtitles available for this video." },
        { status: 404 }
      );
    }

    // 🔹 स्मार्ट लैंग्वेज सेलेक्शन (इंग्लिश या हिंदी ढूँढें)
    let track = data.subtitles.find((s: any) => s.code === 'en' || s.code === 'hi');
    if (!track) {
      track = data.subtitles[0]; // नहीं तो जो पहला मिले वो ले लें
    }

    // 🔹 प्रॉक्सी से .vtt (WebVTT) फाइल डाउनलोड करें
    const vttRes = await fetch(track.url);
    if (!vttRes.ok) throw new Error("Failed to fetch subtitle file");
    const vttText = await vttRes.text();

    // 🔹 WebVTT फाइल को साफ़-सुथरे पैराग्राफ में बदलें
    const cleanText = vttText
      .split('\n')
      .filter(line => 
        !line.includes('WEBVTT') && // हेडर हटाएँ
        !line.includes('-->') &&    // टाइमस्टैम्प हटाएँ
        line.trim() !== ''          // खाली लाइन हटाएँ
      )
      .join(' ')
      .replace(/<[^>]*>/g, '')      // HTML/Color कोडिंग (जैसे <b> या <c>) हटाएँ
      .replace(/\s+/g, ' ')         // एक्स्ट्रा स्पेस हटाएँ
      .trim();

    if (!cleanText) {
      return NextResponse.json({ error: "Transcript is empty." }, { status: 404 });
    }

    // ✅ FINALLY SUCCESS!
    return NextResponse.json({ text: cleanText });

  } catch (error: any) {
    console.error("Proxy Bypass Error:", error.message);
    return NextResponse.json(
      { error: "Servers are busy. Please use the 'Get Transcript Manually' link below." },
      { status: 500 }
    );
  }
}
