import { configureGenkit } from "genkit";
import { googleAI } from "@genkit-ai/googleai";
import { generate } from "@genkit-ai/googleai";

configureGenkit({
  plugins: [
    googleAI({
      apiKey: process.env.GOOGLE_GENAI_API_KEY!,
    }),
  ],
});

// ⭐ This function will replace old ai.generateText()
export async function generateText(prompt: string) {
  const result = await generate({
    model: "models/gemini-1.5-flash",
    prompt,
    temperature: 0.3,
  });

  return result.outputText();
}
