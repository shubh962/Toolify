import { createAI } from "genkit";
import { googleAI } from "@genkit-ai/googleai";

export const ai = createAI({
  plugins: [
    googleAI({
      apiKey: process.env.GOOGLE_GENAI_API_KEY!,
    }),
  ],

  // ⭐ Correct & universal model name (for all Genkit versions)
  model: "models/gemini-1.5-flash"
  
});
