import { createAI } from "genkit";
import { googleAI } from "@genkit-ai/googleai";

export const ai = createAI({
  plugins: [
    googleAI({
      apiKey: process.env.GOOGLE_GENAI_API_KEY!,
    }),
  ],

  // ⭐ The ONLY correct model for your version
  model: "googleai/gemini-1.5-flash",
});
