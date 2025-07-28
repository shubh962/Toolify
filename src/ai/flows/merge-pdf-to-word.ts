'use server';
/**
 * @fileOverview Merges text from multiple PDF files into a single Word document.
 *
 * - mergePdfToWord - A function that handles the PDF text merging process.
 * - MergePdfToWordInput - The input type for the mergePdfToWord function.
 * - MergePdfToWordOutput - The return type for the mergePdfToWord function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import {textToWord} from '@/ai/flows/text-to-word';

const MergePdfToWordInputSchema = z.object({
  pdfDataUris: z.array(z.string()).describe('An array of PDF files as data URIs.'),
});
export type MergePdfToWordInput = z.infer<typeof MergePdfToWordInputSchema>;

const MergePdfToWordOutputSchema = z.object({
  wordDataUri: z.string().describe('The merged Word document as a data URI.'),
});
export type MergePdfToWordOutput = z.infer<typeof MergePdfToWordOutputSchema>;

export async function mergePdfToWord(input: MergePdfToWordInput): Promise<MergePdfToWordOutput> {
  return mergePdfToWordFlow(input);
}

const pdfToTextPrompt = ai.definePrompt({
  name: 'pdfToTextForMergePrompt',
  input: {schema: z.object({pdfDataUri: z.string()})},
  output: {schema: z.object({
    extractedText: z.string().describe('The text extracted from the PDF.'),
  })},
  prompt: `You are an expert at extracting text from documents. Please extract all the text content from the following PDF file.
  
PDF File: {{media url=pdfDataUri}}`,
});

const mergePdfToWordFlow = ai.defineFlow(
  {
    name: 'mergePdfToWordFlow',
    inputSchema: MergePdfToWordInputSchema,
    outputSchema: MergePdfToWordOutputSchema,
  },
  async input => {
    let combinedText = '';
    for (const pdfDataUri of input.pdfDataUris) {
      const {output} = await pdfToTextPrompt({pdfDataUri});
      if (output) {
        combinedText += output.extractedText + '\n\n---\n\n';
      }
    }

    if (!combinedText) {
      throw new Error('Failed to extract any text from the provided PDFs.');
    }

    const wordOutput = await textToWord({text: combinedText});
    return {
      wordDataUri: wordOutput.wordDataUri,
    };
  }
);
