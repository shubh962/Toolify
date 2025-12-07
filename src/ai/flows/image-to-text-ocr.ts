'use server';

import { ai } from "@/ai/genkit";
import { z } from "genkit";

// ---------------------------
// INPUT / OUTPUT SCHEMAS
// ---------------------------
const ImageToTextOcrInputSchema = z.object({
  photoDataUri: z.string().describe(
    "A Base64 data URI: 'data:image/png;base64,...'"
  ),
});
export type ImageToTextOcrInput = z.infer<typeof ImageToTextOcrInputSchema>;

const ImageToTextOcrOutputSchema = z.object({
  extractedText: z.string().describe("Text extracted from the image"),
});
export type ImageToTextOcrOutput = z.infer<typeof ImageToTextOcrOutputSchema>;

// ---------------------------
// MAIN OCR FUNCTION
// ---------------------------
export async function imageToTextOcr(
  input: ImageToTextOcrInput
): Promise<ImageToTextOcrOutput> {
  return imageToTextOcrFlow(input);
}

// ---------------------------
// PROMPT (NEW GEMINI FORMAT)
// ---------------------------
const prompt = ai.definePrompt({
  name: "imageToTextOcrPrompt",
  input: { schema: ImageToTextOcrInputSchema },
  output: { schema: ImageToTextOcrOutputSchema },
  prompt:
    `You are an expert OCR engine. Extract all readable text from the image. 
Return only the extracted text, no explanation.`,
});

// ---------------------------
// FLOW (WITH NEW IMAGE FORMAT)
// ---------------------------
const imageToTextOcrFlow = ai.defineFlow(
  {
    name: "imageToTextOcrFlow",
    inputSchema: ImageToTextOcrInputSchema,
    outputSchema: ImageToTextOcrOutputSchema,
  },
  async (input) => {
    const { photoDataUri } = input;

    // Clean Base64 for AI input
    const base64 = photoDataUri.split(",")[1];

    const { output } = await prompt(
      {
        photoDataUri,
      },
      {
        attachments: [
          {
            name: "inputImage",
            mimeType: "image/png",
            data: Buffer.from(base64, "base64"),
          },
        ],
      }
    );

    return {
      extractedText: output?.extractedText ?? "",
    };
  }
);
