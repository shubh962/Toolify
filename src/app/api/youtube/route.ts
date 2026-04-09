import { NextResponse } from "next/server";

// 🔹 Extract Video ID
function getVideoId(url: string) {
  const regExp =
    /(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([^&#?/]+)/;
  const match = url.match(regExp);
  return match ? match[1] : null;
}

// 🔹 XML → Text
function parseXML(xml: string) {
  const matches = [...xml.matchAll(/<text[^>]*>(.*?)<\/text>/g)];
  return matches.map((m) => m[1]).join(" ");
}

// 🔹 Parse Innertube JSON
function parseJSON(data: any) {
  try {
    const cues =
      data?.actions?.[0]?.updateEngagementPanelAction?.content
        ?.transcriptRenderer?.content?.transcriptSearchPanelRenderer
        ?.body?.transcriptSegmentListRenderer?.initialSegments || [];

    return cues
      .map(
        (c: any) =>
          c.transcriptSegmentRenderer?.snippet?.runs?.[0]?.text || ""
      )
      .join(" ");
  } catch {
    return "";
  }
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

    let text = "";

    // ==============================
    // 🔥 METHOD 1: INNERTUBE API
    // ==============================
    try {
      const res = await fetch(
        "https://www.youtube.com/youtubei/v1/get_transcript?key=AIzaSyAq8oQ4yexample",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            context: {
              client: {
                clientName: "WEB",
                clientVersion: "2.20240101.00.00",
              },
            },
            videoId,
          }),
        }
      );

      const data = await res.json();
      text = parseJSON(data);
    } catch {}

    // ==============================
    // 🔥 METHOD 2: GOOGLE TIMEDTEXT
    // ==============================
    if (!text) {
      try {
        const listRes = await fetch(
          `https://video.google.com/timedtext?type=list&v=${videoId}`
        );
        const listXML = await listRes.text();

        const tracks = [
          ...listXML.matchAll(/lang_code="([^"]+)"/g),
        ].map((m) => m[1]);

        for (const lang of tracks) {
          const res = await fetch(
            `https://video.google.com/timedtext?v=${videoId}&lang=${lang}`
          );
          const xml = await res.text();

          if (xml && xml.trim() !== "") {
            text = parseXML(xml);
            break;
          }
        }
      } catch {}
    }

    // ==============================
    // 🔥 METHOD 3: FORCE AUTO CAPTION
    // ==============================
    if (!text) {
      try {
        const res = await fetch(
          `https://video.google.com/timedtext?v=${videoId}&lang=en&kind=asr`
        );
        const xml = await res.text();

        if (xml && xml.trim() !== "") {
          text = parseXML(xml);
        }
      } catch {}
    }

    // ==============================
    // ❌ STILL FAILED
    // ==============================
    if (!text || text.trim() === "") {
      return NextResponse.json(
        {
          error:
            "No subtitles available. This video may not have captions.",
        },
        { status: 404 }
      );
    }

    // ✅ SUCCESS
    return NextResponse.json({ text });

  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
