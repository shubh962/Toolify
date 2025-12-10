import { genkit } from "genkit";
import { googleAI } from "@genkit-ai/googleai";

// -------------------------------
// ✅ 1. Create AI Runtime (Genkit v2 way)
// -------------------------------
export const ai = genkit({
  plugins: [
    googleAI({
      apiKey: process.env.GOOGLE_GENAI_API_KEY!,
    }),
  ],
});

// -------------------------------
// ✅ 2. Optional helper function for simple generations
// -------------------------------
export async function generateText(prompt: string) {
  const response = await ai.generate({
    model: "googleai/gemini-1.5-flash",
    prompt,
    temperature: 0.3,
  });

  return response.text(); // Genkit v2 output method
}
