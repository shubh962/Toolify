'use server';
/**
 * @fileOverview Converts text to a Word document.
 *
 * - textToWord - A function that handles the text to Word conversion process.
 * - TextToWordInput - The input type for the textToWord function.
 * - TextToWordOutput - The return type for the textToWord function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import {Document, Packer, Paragraph} from 'docx';

const TextToWordInputSchema = z.object({
  text: z.string().describe('The text to be converted to a Word document.'),
});
export type TextToWordInput = z.infer<typeof TextToWordInputSchema>;

const TextToWordOutputSchema = z.object({
  wordDataUri: z
    .string()
    .describe('The Word document as a data URI.'),
});
export type TextToWordOutput = z.infer<typeof TextToWordOutputSchema>;

async function createDocx(text: string): Promise<Buffer> {
  const doc = new Document({
    sections: [
      {
        children: text.split('\n').map(p => new Paragraph(p)),
      },
    ],
  });

  return Packer.toBuffer(doc);
}

export const textToWord = ai.defineTool(
    {
        name: 'textToWord',
        description: 'Converts a string of text into a Word document.',
        inputSchema: TextToWordInputSchema,
        outputSchema: TextToWordOutputSchema,
    },
    async (input) => {
        const buffer = await createDocx(input.text);
        const base64 = buffer.toString('base64');
        return {
            wordDataUri: `data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,${base64}`,
        };
    }
);
