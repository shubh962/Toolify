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
// Prompt (Inline image)
// -----------------------
const prompt = ai.definePrompt({
  name: "imageToTextOcrPrompt",
  input: { schema: ImageToTextOcrInputSchema },
  output: { schema: ImageToTextOcrOutputSchema },
  prompt: `
You are an OCR engine. Extract all readable text from the image below. Do NOT imagine text.

{{#image}}
{{photoDataUri}}
{{/image}}

Extracted Text:
`,
});

// -----------------------
// FLOW WITH FULL LOGGING
// -----------------------
export async function imageToTextOcr(input: ImageToTextOcrInput): Promise<ImageToTextOcrOutput> {
  console.log("🟦 [OCR] Starting OCR Flow...");
  console.log("🟦 [OCR] Received Base64 length:", input.photoDataUri?.length);

  if (!input.photoDataUri?.startsWith("data:image/")) {
    console.error("❌ [OCR] Invalid Data URI format:", input.photoDataUri.slice(0, 50));
  }

  try {
    console.log("🟦 [OCR] Sending request to Gemini Vision...");

    const response = await prompt(input);

    console.log("🟩 [OCR] Raw Model Response:", JSON.stringify(response, null, 2));

    if (!response?.output?.extractedText) {
      console.warn("⚠️ [OCR] Model returned no text.");
    }

    return {
      extractedText: response?.output?.extractedText || "",
    };
  } catch (error: any) {
    console.error("❌ [OCR] Gemini Vision ERROR:", error);
    console.error("❌ [OCR] Full Error Details:", JSON.stringify(error, null, 2));

    throw new Error("Gemini OCR failed: " + (error?.message || "Unknown error"));
  }
}
