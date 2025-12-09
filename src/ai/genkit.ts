import { createAI } from "genkit";
import { googleAI } from "@genkit-ai/googleai";

// 🔥 Import the correct updated model
import { gemini15Flash } from "@genkit-ai/googleai/models";

export const ai = createAI({
  plugins: [
    googleAI({
      apiKey: process.env.GOOGLE_GENAI_API_KEY!, // No other changes needed
    }),
  ],

  // ⭐ MUST-HAVE: Default model (fixes "model not found")
  model: gemini15Flash,
});
