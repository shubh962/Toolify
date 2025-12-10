'use server';

import { ai } from "@/ai/genkit";
import { z } from "zod";

// -----------------------------
// ✅ 1. Schemas
// -----------------------------
const ParaphraseTextInputSchema = z.object({
  text: z.string(),
});

const ParaphraseTextOutputSchema = z.object({
  paraphrasedText: z.string(),
});

// -----------------------------
// ✅ 2. Prompt (Genkit v2 syntax)
// -----------------------------
const paraphraseTextPrompt = ai.prompt("paraphraseTextPrompt", {
  input: ParaphraseTextInputSchema,
  output: ParaphraseTextOutputSchema,
  prompt: `
Rewrite the following text in a clear, professional and natural tone.
Keep the meaning same but improve readability.

Text:
{{ text }}
`,
});

// -----------------------------
// ✅ 3. Flow (Genkit v2 syntax)
// -----------------------------
export const paraphraseTextFlow = ai.flow(
  "paraphraseTextFlow",
  {
    input: ParaphraseTextInputSchema,
    output: ParaphraseTextOutputSchema,
  },
  async ({ text }) => {
    const response = await paraphraseTextPrompt({ text });

    return {
      paraphrasedText:
        response?.paraphrasedText || 
        response?.text || 
        "Unable to paraphrase text.",
    };
  }
);

// -----------------------------
// ✅ 4. Export Action for UI
// -----------------------------
export async function paraphraseText(input: { text: string }) {
  return paraphraseTextFlow(input);
}
