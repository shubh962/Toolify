'use server';

import { ai } from "@/ai/genkit";
import { z } from "genkit";

// -----------------------
// Input Schema
// -----------------------
const ImageToTextOcrInputSchema = z.object({
  photoDataUri: z.string(),
});

export type ImageToTextOcrInput = z.infer<typeof ImageToTextOcrInputSchema>;

// -----------------------
// Output Schema
// -----------------------
const ImageToTextOcrOutputSchema = z.object({
  extractedText: z.string(),
});

export type ImageToTextOcrOutput = z.infer<typeof ImageToTextOcrOutputSchema>;

// -----------------------
// Prompt (Inline Base64 Media)
// -----------------------
const prompt = ai.definePrompt({
  name: "imageToTextOcrPrompt",
  input: { schema: ImageToTextOcrInputSchema },
  output: { schema: ImageToTextOcrOutputSchema },
  prompt: `
You are an OCR engine. Extract **only readable text** from the image below.

{{#image}}
{{photoDataUri}}
{{/image}}

Extracted Text:
`,
});

// -----------------------
// FLOW (NO ATTACHMENTS)
// -----------------------
export async function imageToTextOcr(input: ImageToTextOcrInput) {
  try {
    // Direct inline Base64 image inside prompt
    const { output } = await prompt(input);

    return {
      extractedText: output?.extractedText ?? "",
    };
  } catch (error) {
    console.error("OCR error:", error);
    throw error;
  }
}
