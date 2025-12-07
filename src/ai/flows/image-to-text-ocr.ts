"use server";

import { ai } from "@/ai/genkit";
import { z } from "genkit";

// INPUT SCHEMA
const ImageToTextOcrInputSchema = z.object({
  photoDataUri: z.string(),
});

// OUTPUT SCHEMA
const ImageToTextOcrOutputSchema = z.object({
  extractedText: z.string(),
  debug: z.any().optional(), // ⭐ SEND FULL ERROR BACK
});

// PROMPT
const prompt = ai.definePrompt({
  name: "imageToTextOcrPrompt",
  input: { schema: ImageToTextOcrInputSchema },
  output: { schema: ImageToTextOcrOutputSchema },
  prompt: `
Extract ALL text from this image. Do NOT invent anything.

{{#image}}
{{photoDataUri}}
{{/image}}

Extracted Text:
`,
});

// FLOW
export async function imageToTextOcr(input: { photoDataUri: string }) {
  console.log("🟦 [OCR] Starting OCR...");
  console.log("🟦 [OCR] Base64 length:", input.photoDataUri.length);

  try {
    console.log("🟦 [OCR] Sending request to Gemini Vision...");

    const response = await prompt(input);

    console.log("🟩 [OCR] MODEL RESPONSE:", JSON.stringify(response, null, 2));

    return {
      extractedText: response?.output?.extractedText || "",
      debug: response,
    };
  } catch (error: any) {
    console.error("❌ [OCR] GEMINI ERR:", error);
    console.error("❌ FULL ERROR:", JSON.stringify(error, null, 2));

    // ⭐ RETURN FULL ERROR TO UI
    return {
      extractedText: "",
      debug: {
        message: error?.message || "Unknown Error",
        full: JSON.stringify(error, null, 2),
        type: error?.type,
        status: error?.status,
      },
    };
  }
}
