'use server';
/**
 * @fileOverview Extracts text from a PDF file.
 *
 * - pdfToText - A function that handles the PDF text extraction process.
 * - PdfToTextInput - The input type for the pdfToText function.
 * - PdfToTextOutput - The return type for the pdfToText function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import {textToWord} from '@/ai/flows/text-to-word';

const PdfToTextInputSchema = z.object({
  pdfDataUri: z
    .string()
    .describe(
      "A PDF file to extract text from, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:application/pdf;base64,<encoded_data>'."
    ),
});
export type PdfToTextInput = z.infer<typeof PdfToTextInputSchema>;

const PdfToWordOutputSchema = z.object({
  wordDataUri: z.string().describe('The Word document as a data URI.'),
});
export type PdfToWordOutput = z.infer<typeof PdfToWordOutputSchema>;

export async function pdfToWord(input: PdfToTextInput): Promise<PdfToWordOutput> {
  return pdfToWordFlow(input);
}

const pdfToTextPrompt = ai.definePrompt({
  name: 'pdfToTextPrompt',
  input: {schema: PdfToTextInputSchema},
  output: {schema: z.object({
    extractedText: z.string().describe('The text extracted from the PDF.'),
  })},
  prompt: `You are an expert at extracting text from documents. Please extract all the text content from the following PDF file.
  
PDF File: {{media url=pdfDataUri}}`,
});

const pdfToWordFlow = ai.defineFlow(
  {
    name: 'pdfToWordFlow',
    inputSchema: PdfToTextInputSchema,
    outputSchema: PdfToWordOutputSchema,
  },
  async input => {
    const {output} = await pdfToTextPrompt(input);
    if (!output) {
      throw new Error('Failed to extract text from PDF.');
    }
    const wordOutput = await textToWord({text: output.extractedText});
    return {
      wordDataUri: wordOutput.wordDataUri,
    };
  }
);
