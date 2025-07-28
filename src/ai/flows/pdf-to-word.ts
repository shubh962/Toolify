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

const PdfToTextInputSchema = z.object({
  pdfDataUri: z
    .string()
    .describe(
      "A PDF file to extract text from, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:application/pdf;base64,<encoded_data>'."
    ),
});
export type PdfToTextInput = z.infer<typeof PdfToTextInputSchema>;

const PdfToTextOutputSchema = z.object({
  extractedText: z.string().describe('The text extracted from the PDF.'),
});
export type PdfToTextOutput = z.infer<typeof PdfToTextOutputSchema>;

export async function pdfToText(input: PdfToTextInput): Promise<PdfToTextOutput> {
  return pdfToTextFlow(input);
}

const prompt = ai.definePrompt({
  name: 'pdfToTextPrompt',
  input: {schema: PdfToTextInputSchema},
  output: {schema: PdfToTextOutputSchema},
  prompt: `You are an expert at extracting text from documents. Please extract all the text content from the following PDF file.
  
PDF File: {{media url=pdfDataUri}}`,
});

const pdfToTextFlow = ai.defineFlow(
  {
    name: 'pdfToTextFlow',
    inputSchema: PdfToTextInputSchema,
    outputSchema: PdfToTextOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
