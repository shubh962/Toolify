"use server";
import "server-only";

export async function directParaphrase(text: string) {
  const apiKey = process.env.GOOGLE_GENAI_API_KEY;

  if (!apiKey) {
    throw new Error("API Key nahi mili! Vercel settings check karein.");
  }

  const preferredModels = [
    "models/gemini-1.5-flash",
    "models/gemini-1.5-flash-001",
    "models/gemini-1.5-pro",
  ];

  let modelName = "gemini-1.5-flash";

  try {
    // ✅ SECURE: No API key in URL
    const listResp = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models",
      {
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey,
        },
        cache: "no-store",
      }
    );

    if (listResp.ok) {
      const data = await listResp.json();
      const availableModels =
        data.models?.map((m: any) => m.name) || [];

      const bestMatch = preferredModels.find((pref) =>
        availableModels.includes(pref)
      );

      if (bestMatch) {
        modelName = bestMatch.replace("models/", "");
        console.log("✅ Selected Model:", modelName);
      } else {
        const fallback = data.models?.find(
          (m: any) =>
            m.name.includes("gemini") &&
            m.supportedGenerationMethods?.includes("generateContent")
        );

        if (fallback) {
          modelName = fallback.name.replace("models/", "");
        }
      }
    }
  } catch (e) {
    console.warn("⚠️ Model list fetch failed, using default.");
  }

  // ✅ SECURE: No API key in URL
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey,
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `You are an expert corporate editor. Rewrite the following text to make it sound highly professional, formal, and concise.

RULES:
1. Output ONLY the rewritten text.
2. Do not add explanations.
3. Do not use conversational filler.
4. Improve grammar and vocabulary.

Original Text: "${text}"`,
              },
            ],
          },
        ],
      }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();

    if (response.status === 503) {
      throw new Error(
        "Server overloaded. Kindly retry after five seconds."
      );
    }

    throw new Error(
      `Google API Error (${modelName}): ${errorText}`
    );
  }

  const data = await response.json();

  const outputText =
    data.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!outputText) {
    throw new Error("AI response empty tha.");
  }

  return outputText;
}
