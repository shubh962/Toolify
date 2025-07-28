'use server';

import { removeBackground } from '@/ai/flows/background-remover';
import { imageToTextOcr } from '@/ai/flows/image-to-text-ocr';
import { paraphraseText } from '@/ai/flows/text-paraphraser';
import { pdfToText } from '@/ai/flows/pdf-to-word';

export async function handleBackgroundRemoval(photoDataUri: string) {
  if (!photoDataUri) {
    return { success: false, error: 'No image provided.' };
  }
  try {
    const result = await removeBackground({ photoDataUri });
    return { success: true, data: result };
  } catch (error) {
    console.error('Background removal error:', error);
    return { success: false, error: 'Failed to remove background. The AI model may be unavailable.' };
  }
}

export async function handleImageToText(photoDataUri: string) {
  if (!photoDataUri) {
    return { success: false, error: 'No image provided.' };
  }
  try {
    const result = await imageToTextOcr({ photoDataUri });
    return { success: true, data: result };
  } catch (error) {
    console.error('Image to text error:', error);
    return { success: false, error: 'Failed to extract text from image. The AI model may be unavailable.' };
  }
}

export async function handleTextParaphrasing(text: string) {
  if (!text.trim()) {
    return { success: false, error: 'Input text cannot be empty.' };
  }
  try {
    const result = await paraphraseText({ text });
    return { success: true, data: result };
  } catch (error) {
    console.error('Text paraphrasing error:', error);
    return { success: false, error: 'Failed to paraphrase text. The AI model may be unavailable.' };
  }
}

export async function handlePdfToText(pdfDataUri: string) {
  if (!pdfDataUri) {
    return { success: false, error: 'No PDF provided.' };
  }
  try {
    const result = await pdfToText({ pdfDataUri });
    return { success: true, data: result };
  } catch (error) {
    console.error('PDF to text error:', error);
    return { success: false, error: 'Failed to extract text from PDF. The AI model may be unavailable.' };
  }
}
