import { createAI } from "genkit";
import { googleAI } from "@genkit-ai/googleai";

export const ai = createAI({
  plugins: [
    googleAI({
      apiKey: process.env.GOOGLE_GENAI_API_KEY!,
    }),
  ],

  // 👇 Directly use model name (NO IMPORT)
  model: "googleai/gemini-1.5-flash",
});
