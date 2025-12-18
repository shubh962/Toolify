"use server";

export async function directParaphrase(text: string) {
  const apiKey = process.env.GOOGLE_GENAI_API_KEY;
  
  if (!apiKey) {
    throw new Error("API Key nahi mili! Vercel settings mein GOOGLE_GENAI_API_KEY check karein.");
  }

  // 👇 FIX: Model name change kiya hai 'gemini-1.5-flash-latest' par.
  // Ye version har region mein available hota hai.
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;

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
    // Error ko thoda saaf karke dikhayenge
    throw new Error(`Google API Error: ${errorText}`);
  }

  const data = await response.json();
  
  const outputText = data.candidates?.[0]?.content?.parts?.[0]?.text;
  
  if (!outputText) {
    throw new Error("AI ne koi jawab nahi diya. (Empty Response)");
  }

  return outputText;
}
