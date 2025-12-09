'use server';

/**
 * @fileOverview Text paraphrasing AI agent.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ParaphraseTextInputSchema = z.object({
  text: z.string().describe('The text to be paraphrased.'),
});
export type ParaphraseTextInput = z.infer<typeof ParaphraseTextInputSchema>;

const ParaphraseTextOutputSchema = z.object({
  paraphrasedText: z.string().describe('The paraphrased text.'),
});
export type ParaphraseTextOutput = z.infer<typeof ParaphraseTextOutputSchema>;

export async function paraphraseText(input: ParaphraseTextInput): Promise<ParaphraseTextOutput> {
  return paraphraseTextFlow(input);
}

// 👇 Yahan humne change kiya hai (Model add kiya)
const paraphraseTextPrompt = ai.definePrompt({
  name: 'paraphraseTextPrompt',
  model: 'googleai/gemini-1.5-flash', // ✅ FORCE CORRECT MODEL
  input: {schema: ParaphraseTextInputSchema},
  output: {schema: ParaphraseTextOutputSchema},
  prompt: `You are a helpful AI assistant that paraphrases text while preserving the original meaning. Rewrite the following text in a different style:\n\n{{text}}`,
});

const paraphraseTextFlow = ai.defineFlow(
  {
    name: 'paraphraseTextFlow',
    inputSchema: ParaphraseTextInputSchema,
    outputSchema: ParaphraseTextOutputSchema,
  },
  async input => {
    const {output} = await paraphraseTextPrompt(input);
    return output!;
  }
);
