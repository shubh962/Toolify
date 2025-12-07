'use server';

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ImageToTextOcrInputSchema = z.object({
  photoDataUri: z.string(),
});

export type ImageToTextOcrInput = z.infer<typeof ImageToTextOcrInputSchema>;

const ImageToTextOcrOutputSchema = z.object({
  extractedText: z.string(),
});

export type ImageToTextOcrOutput = z.infer<typeof ImageToTextOcrOutputSchema>;

export async function imageToTextOcr(
  input: ImageToTextOcrInput
): Promise<ImageToTextOcrOutput> {
  return imageToTextOcrFlow(input);
}

const prompt = ai.definePrompt({
  name: 'imageToTextOcrPrompt',
  input: { schema: ImageToTextOcrInputSchema },
  output: { schema: ImageToTextOcrOutputSchema },
  prompt: `
You are an OCR expert. Extract all readable text from this image.

Image: {{media url=photoDataUri}}

Return only extracted text.
`,
});

const imageToTextOcrFlow = ai.defineFlow(
  {
    name: 'imageToTextOcrFlow',
    inputSchema: ImageToTextOcrInputSchema,
    outputSchema: ImageToTextOcrOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
