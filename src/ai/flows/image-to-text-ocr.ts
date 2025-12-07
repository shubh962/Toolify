'use server';

import { ai } from "@/ai/genkit";
import { z } from "genkit";

const ImageToTextOcrInputSchema = z.object({
  photoDataUri: z.string(),
});

const ImageToTextOcrOutputSchema = z.object({
  extractedText: z.string(),
});

export type ImageToTextOcrInput = z.infer<typeof ImageToTextOcrInputSchema>;
export type ImageToTextOcrOutput = z.infer<typeof ImageToTextOcrOutputSchema>;

export async function imageToTextOcr(input: ImageToTextOcrInput): Promise<ImageToTextOcrOutput> {
  const { photoDataUri } = input;

  // 🔥 Extract base64 + detect type
  const base64 = photoDataUri.split(",")[1];
  const mimeType = photoDataUri.includes("png") ? "image/png" : "image/jpeg";

  const prompt = `
Extract all readable text from this image.
Return plain text only. No formatting.
`;

  const result = await ai.run("gemini-pro-vision", {
    prompt,
    media: [
      {
        mimeType,
        data: Buffer.from(base64, "base64")
      }
    ]
  });

  return {
    extractedText: result.text || ""
  };
}
