'use server';

/**
 * @fileOverview An image-to-text OCR AI agent using Gemini Vision.
 *
 * Gemini Vision requires image to be passed via `attachments`.
 */

import { ai } from "@/ai/genkit";
import { z } from "genkit";

// -------------------------
// INPUT VALIDATION
// -------------------------
const ImageToTextOcrInputSchema = z.object({
  photoDataUri: z.string().describe(
    "A Base64 encoded image. Format: data:image/png;base64,xxx"
  ),
});

export type ImageToTextOcrInput = z.infer<
  typeof ImageToTextOcrInputSchema
>;

// -------------------------
// OUTPUT VALIDATION
// -------------------------
const ImageToTextOcrOutputSchema = z.object({
  extractedText: z.string().describe("Text extracted from the image."),
});

export type ImageToTextOcrOutput = z.infer<
  typeof ImageToTextOcrOutputSchema
>;

// -------------------------
// PROMPT
// -------------------------
const prompt = ai.definePrompt({
  name: "imageToTextOcrPrompt",
  input: { schema: ImageToTextOcrInputSchema },
  output: { schema: ImageToTextOcrOutputSchema },

  prompt: `
You are an OCR engine. Extract ONLY readable text from this image. 

Image: {{media url=photoDataUri}}

Extracted Text:
`,
});

// -------------------------
// FLOW WITH ATTACHMENTS
// -------------------------
export async function imageToTextOcr(input: ImageToTextOcrInput) {
  const { photoDataUri } = input;

  // Extract base64
  const base64 = photoDataUri.split(",")[1];

  const mime =
    photoDataUri.startsWith("data:image/png") ? "image/png" : "image/jpeg";

  const attachment = {
    name: "uploaded_image",
    mimeType: mime,
    data: Buffer.from(base64, "base64"),
  };

  // Run Gemini with attachments
  const { output } = await prompt(input, {
    attachments: [attachment],
  });

  return output!;
}
