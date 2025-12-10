'use server';

import { z } from "zod";
import { generate } from "@genkit-ai/googleai";

// Schema
const InputSchema = z.object({
  text: z.string(),
});

// Main function
export async function paraphraseText(input: { text: string }) {
  const { text } = InputSchema.parse(input);

  const result = await generate({
    model: "models/gemini-1.5-flash",
    prompt: `
      Rewrite this text in a clearer, more professional way.
      Maintain the meaning.

      Text: "${text}"
    `,
    temperature: 0.2,
  });

  return {
    paraphrasedText: result.outputText(),
  };
}
