"use server";

export async function directParaphrase(text: string) {
  const apiKey = process.env.GOOGLE_GENAI_API_KEY;
  
  if (!apiKey) {
    throw new Error("API Key nahi mili! Vercel settings check karein.");
  }

  // 👇 STABILITY FIX: Hum apni pasand ke models ki list bana rahe hain.
  // Code pehle stable models check karega, fir naye models par jayega.
  const preferredModels = [
    "models/gemini-1.5-flash",      // Sabse fast aur stable
    "models/gemini-1.5-flash-001",  // Backup stable version
    "models/gemini-1.5-pro",        // High quality backup
  ];

  let modelName = "gemini-1.5-flash"; // Default backup

  try {
    // 1. Google se pucho kya available hai
    const listUrl = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
    const listResp = await fetch(listUrl);

    if (listResp.ok) {
      const data = await listResp.json();
      const availableModels = data.models?.map((m: any) => m.name) || [];

      // 2. Humari preferred list mein se pehla jo available ho, wo select karo
      const bestMatch = preferredModels.find(pref => availableModels.includes(pref));

      if (bestMatch) {
        modelName = bestMatch.replace("models/", "");
        console.log("✅ Selected Stable Model:", modelName);
      } else {
        // Agar preferred nahi mila, tabhi koi naya model uthao
        const fallback = data.models?.find((m: any) => 
          m.name.includes("gemini") && 
          m.supportedGenerationMethods?.includes("generateContent")
        );
        if (fallback) modelName = fallback.name.replace("models/", "");
      }
    }
  } catch (e) {
    console.warn("Model list fetch failed, using default.");
  }

  // 3. Ab Request Bhejo (Stable Model ke sath)
  const generateUrl = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;

  const response = await fetch(generateUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ 
        parts: [{ 
          // 👇 YAHAN CHANGE KIYA HAI: Strict Professional Prompt
          text: `You are an expert corporate editor. Rewrite the following text to make it sound highly professional, formal, and concise.
          
          RULES:
          1. Output ONLY the rewritten text. 
          2. Do not add explanations like "Here is the text" or "As an AI".
          3. Do not use conversational filler.
          4. Improve grammar and vocabulary.

          Original Text: "${text}"` 
        }] 
      }]
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    // 503 Overloaded error ko acche se handle karein
    if (response.status === 503) {
      throw new Error("Server overloaded. Kindly retry after five seconds.");
    }
    throw new Error(`Google API Error (${modelName}): ${errorText}`);
  }

  const data = await response.json();
  const outputText = data.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!outputText) {
    throw new Error("AI response empty tha.");
  }

  return outputText;
}
