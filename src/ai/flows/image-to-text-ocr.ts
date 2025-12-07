'use server';

import { ai } from "@/ai/genkit";
import { z } from "genkit";

const ImageToTextOcrInputSchema = z.object({
  photoDataUri: z.string(),
});

export type ImageToTextOcrInput = z.infer<typeof ImageToTextOcrInputSchema>;

const ImageToTextOcrOutputSchema = z.object({
  extractedText: z.string(),
});

export type ImageToTextOcrOutput = z.infer<typeof ImageToTextOcrOutputSchema>;

// ------------------------------
// FIXED PROMPT WITH MEDIA INPUT
// ------------------------------
const prompt = ai.definePrompt({
  name: "imageToTextOcrPrompt",
  input: { schema: ImageToTextOcrInputSchema },
  output: { schema: ImageToTextOcrOutputSchema },
  prompt: `
You are an expert OCR system. Extract ALL readable text from the provided image.

Image: {{ media photoDataUri }}

Return only raw extracted text.
`,
});

// ------------------------------
// FIXED FLOW FOR GEMINI
// ------------------------------
export const imageToTextOcr = ai.defineFlow(
  {
    name: "imageToTextOcrFlow",
    inputSchema: ImageToTextOcrInputSchema,
    outputSchema: ImageToTextOcrOutputSchema,
  },
  async (input) => {
    try {
      console.log("🔥 OCR FLOW RECEIVED IMAGE LENGTH:", input.photoDataUri.length);

      const { output } = await prompt(input);

      console.log("🔥 OCR FLOW OUTPUT:", output);

      return output!;
    } catch (err) {
      console.error("❌ OCR FLOW ERROR:", err);
      throw new Error("OCR_MODEL_FAILED");
    }
  }
);
