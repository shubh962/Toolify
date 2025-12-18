"use server";

export async function directParaphrase(text: string) {
  const apiKey = process.env.GOOGLE_GENAI_API_KEY;
  
  if (!apiKey) {
    throw new Error("API Key nahi mili! Vercel settings mein GOOGLE_GENAI_API_KEY check karein.");
  }

  // 👇 Ye seedha URL call karega (No Library, No Install Needed)
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

  const response = await fetch(url, {
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

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Google API Error: ${errorText}`);
  }

  const data = await response.json();
  
  // Response se text nikalo
  const outputText = data.candidates?.[0]?.content?.parts?.[0]?.text;
  
  if (!outputText) {
    throw new Error("AI ne koi jawab nahi diya.");
  }

  return outputText;
}
