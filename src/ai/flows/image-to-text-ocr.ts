'use server';
/**
 * @fileOverview An image-to-text OCR AI agent.
 *
 * - imageToTextOcr - A function that handles the image-to-text extraction process.
 * - ImageToTextOcrInput - The input type for the imageToTextOcr function.
 * - ImageToTextOcrOutput - The return type for the imageToTextOcr function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ImageToTextOcrInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo containing text, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type ImageToTextOcrInput = z.infer<typeof ImageToTextOcrInputSchema>;

const ImageToTextOcrOutputSchema = z.object({
  extractedText: z.string().describe('The text extracted from the image.'),
});
export type ImageToTextOcrOutput = z.infer<typeof ImageToTextOcrOutputSchema>;

export async function imageToTextOcr(input: ImageToTextOcrInput): Promise<ImageToTextOcrOutput> {
  return imageToTextOcrFlow(input);
}

const prompt = ai.definePrompt({
  name: 'imageToTextOcrPrompt',
  input: {schema: ImageToTextOcrInputSchema},
  output: {schema: ImageToTextOcrOutputSchema},
  prompt: `You are an expert OCR reader specializing in extracting text from images.

You will use this information to extract the text from the image.

Image: {{media url=photoDataUri}}

Extracted Text:`,
});

const imageToTextOcrFlow = ai.defineFlow(
  {
    name: 'imageToTextOcrFlow',
    inputSchema: ImageToTextOcrInputSchema,
    outputSchema: ImageToTextOcrOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
