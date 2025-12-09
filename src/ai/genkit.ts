import { createAI } from "genkit";
import { googleAI } from "@genkit-ai/googleai";
import { gemini15Flash } from "@genkit-ai/googleai/models";

export const ai = createAI({
  plugins: [
    googleAI({
      apiKey: process.env.GOOGLE_GENAI_API_KEY!,
    }),
  ],

  // Correct model name
  model: gemini15Flash,
});
