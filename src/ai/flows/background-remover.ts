'use server';

/**
 * Background Remover using remove.bg API
 */

import { z } from 'genkit';

// ------------------ SCHEMAS ------------------

const RemoveBackgroundInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe("Image to remove background from, as a data URI (base64)."),
});

export type RemoveBackgroundInput = z.infer<typeof RemoveBackgroundInputSchema>;

const RemoveBackgroundOutputSchema = z.object({
  backgroundRemovedDataUri: z.string(),
});

export type RemoveBackgroundOutput = z.infer<typeof RemoveBackgroundOutputSchema>;

// ------------------ MAIN FUNCTION ------------------

export async function removeBackground(
  input: RemoveBackgroundInput
): Promise<RemoveBackgroundOutput> {
  
  const parsed = RemoveBackgroundInputSchema.parse(input);

  const apiKey = process.env.BG_REMOVER_API_KEY;
  const apiUrl =
    process.env.BG_REMOVER_API_URL || 'https://api.remove.bg/v1.0/removebg';

  if (!apiKey) throw new Error('Remove.bg API key missing in env');

  // Extract Base64 from DataURI
  const base64Data = parsed.photoDataUri.split(',')[1];

  // Create formData for remove.bg
  const formData = new FormData();
  formData.append('image_file_b64', base64Data);
  formData.append('size', 'auto');

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'X-Api-Key': apiKey,
    },
    body: formData,
  });

  if (!response.ok) {
    const err = await response.text();
    console.error('Remove.bg API Error →', err);
    throw new Error('Failed to remove background using remove.bg');
  }

  // Convert binary output → base64 → data URI
  const arrayBuffer = await response.arrayBuffer();
  // @ts-ignore
  const buffer = Buffer.from(arrayBuffer);
  const outputBase64 = buffer.toString('base64');

  return {
    backgroundRemovedDataUri: `data:image/png;base64,${outputBase64}`,
  };
}
