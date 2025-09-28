'use server';

import { removeBackground } from '@/ai/flows/background-remover';
import { imageToTextOcr } from '@/ai/flows/image-to-text-ocr';
import { paraphraseText } from '@/ai/flows/text-paraphraser';
import { pdfToWord } from '@/ai/flows/pdf-to-word';
import { mergePdfToWord } from '@/ai/flows/merge-pdf-to-word'; // यह फ़ंक्शन मर्जिंग को Word या PDF में करता है

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

export async function handlePdfToWord(pdfDataUri: string) {
  if (!pdfDataUri) {
    return { success: false, error: 'No PDF provided.' };
  }
  try {
    const result = await pdfToWord({ pdfDataUri });
    return { success: true, data: result };
  } catch (error) {
    console.error('PDF to Word error:', error);
    return { success: false, error: 'Failed to convert PDF to Word. The AI model may be unavailable.' };
  }
}

// ✅ FIX: नाम को handleMergePdfs से handleMergePdf में बदला गया ताकि MergePdf.tsx से मेल खाए
export async function handleMergePdf(pdfDataUris: string[]) {
    if (!pdfDataUris || pdfDataUris.length < 2) {
        return { success: false, error: 'Please select at least two PDFs to merge.' };
    }
    try {
        // यहाँ हम मानते हैं कि mergePdfToWord फ़ंक्शन PDF को मर्ज करके PDF Data URI वापस करता है
        const result = await mergePdfToWord({ pdfDataUris }); 
        return { success: true, data: result };
    } catch (error) {
        console.error('PDF Merge error:', error);
        return { success: false, error: 'Failed to merge PDFs. The AI model may be unavailable.' };
    }
}
