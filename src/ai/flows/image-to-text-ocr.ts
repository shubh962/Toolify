'use server';

import { ai } from "@/ai/genkit";
import { z } from "genkit";

const InputSchema = z.object({
  photoDataUri: z.string(),
});

const OutputSchema = z.object({
  extractedText: z.string(),
});

export type ImageToTextOcrInput = z.infer<typeof InputSchema>;
export type ImageToTextOcrOutput = z.infer<typeof OutputSchema>;

export const imageToTextOcr = ai.defineFlow(
  {
    name: "imageToTextOcr",
    inputSchema: InputSchema,
    outputSchema: OutputSchema,
  },
  async ({ photoDataUri }) => {

    const [meta, base64] = photoDataUri.split(",");
    const mimeType = meta.split(":")[1].split(";")[0];

    const prompt = `
You are an OCR engine. Extract ALL readable text from this image.
Return *only plain text*, no formatting.
`;

    const result = await ai.prompt("gemini-1.5-flash", {
      prompt,
      media: [
        {
          mimeType,
          data: Buffer.from(base64, "base64"),
        },
      ],
    });

    return {
      extractedText: result.text ?? "",
    };
  }
);
