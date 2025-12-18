"use server";

export async function directParaphrase(text: string) {
  const apiKey = process.env.GOOGLE_GENAI_API_KEY;
  
  if (!apiKey) {
    throw new Error("API Key nahi mili! Vercel settings mein GOOGLE_GENAI_API_KEY check karein.");
  }

  // 1️⃣ Pehli koshish: Specific Stable Version
  let modelName = "gemini-1.5-flash-001"; 
  let url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;

  let response = await fetchModel(url, text);

  // 2️⃣ Agar pehla fail hua (404), to purana model try karein
  if (!response.ok && response.status === 404) {
    console.log("Flash-001 failed, trying Gemini Pro...");
    modelName = "gemini-pro";
    url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;
    response = await fetchModel(url, text);
  }

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Google API Error (${modelName}): ${errorText}`);
  }

  const data = await response.json();
  const outputText = data.candidates?.[0]?.content?.parts?.[0]?.text;
  
  if (!outputText) {
    throw new Error("AI ne koi jawab nahi diya. (Empty Response)");
  }

  return outputText;
}

// Helper function to keep code clean
async function fetchModel(url: string, text: string) {
  return await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            { text: `You are a professional editor. Paraphrase the following text to make it unique, clear, and engaging while keeping the original meaning. Text:\n\n"${text}"` }
          ]
        }
      ]
    }),
  });
}
