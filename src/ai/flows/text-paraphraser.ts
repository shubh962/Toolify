'use server';

import { ai } from "@/ai/genkit";
import { z } from "genkit";

// Input schema
const ParaphraseTextInputSchema = z.object({
  text: z.string(),
});

// Output schema
const ParaphraseTextOutputSchema = z.object({
  paraphrasedText: z.string(),
});

// Prompt definition
const paraphraseTextPrompt = ai.definePrompt({
  name: "paraphraseTextPrompt",
  input: { schema: ParaphraseTextInputSchema },
  output: { schema: ParaphraseTextOutputSchema },
  prompt: `
Rewrite the following text clearly and professionally while keeping the meaning same:

{{text}}
`,
});

// Flow definition
export const paraphraseTextFlow = ai.defineFlow(
  {
    name: "paraphraseTextFlow",
    inputSchema: ParaphraseTextInputSchema,
    outputSchema: ParaphraseTextOutputSchema,
  },
  async (input) => {
    const result = await paraphraseTextPrompt(input);

    // Handle different Genkit return formats safely
    return {
      paraphrasedText:
        result.output?.paraphrasedText ||
        result.output?.text ||
        "AI returned no output.",
    };
  }
);

// Callable wrapper
export async function paraphraseText(input) {
  return paraphraseTextFlow(input);
}
