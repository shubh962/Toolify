"use server";

export async function directParaphrase(text: string) {
  const apiKey = process.env.GOOGLE_GENAI_API_KEY;
  
  if (!apiKey) {
    throw new Error("API Key nahi mili! Vercel settings mein GOOGLE_GENAI_API_KEY check karein.");
  }

  // 1️⃣ Step 1: Google se pucho ki kaunsa Model Available hai (Auto-Discovery)
  // Ye sabse smart tareeka hai, hum naam guess nahi karenge.
  const listUrl = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
  
  let modelName = "gemini-1.5-flash"; // Default fallback
  
  try {
    const listResp = await fetch(listUrl);
    if (listResp.ok) {
      const data = await listResp.json();
      // List mein se pehla "Gemini" model dhoondo jo content generate kar sake
      const foundModel = data.models?.find((m: any) => 
        m.name.includes("gemini") && 
        m.supportedGenerationMethods?.includes("generateContent")
      );
      
      if (foundModel) {
        // Model name usually "models/gemini-1.5-flash" hota hai, hum prefix hata denge
        modelName = foundModel.name.replace("models/", "");
        console.log("✅ Auto-Selected Model:", modelName);
      }
    }
  } catch (e) {
    console.warn("Model list fetch failed, using default.");
  }

  // 2️⃣ Step 2: Usi Model ko use karke request bhejo
  const generateUrl = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;

  const response = await fetch(generateUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: `You are a professional editor. Paraphrase this text to be clear and unique:\n\n"${text}"` }] }]
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    // Agar ab bhi error aaye, to user ko batao ki API Key shayad blocked hai
    throw new Error(`Google API Error (${modelName}): ${errorText}`);
  }

  const data = await response.json();
  const outputText = data.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!outputText) {
    throw new Error("AI response empty tha. Dobara try karein.");
  }

  return outputText;
}
