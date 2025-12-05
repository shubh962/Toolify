'use server';

import { removeBackground } from '@/ai/flows/background-remover';
import { imageToTextOcr } from '@/ai/flows/image-to-text-ocr';
import { paraphraseText } from '@/ai/flows/text-paraphraser';
import { pdfToWord } from '@/ai/flows/pdf-to-word';
import { mergePdfToWord } from '@/ai/flows/merge-pdf-to-word';
import { PDFDocument } from "pdf-lib";

// --------------------------------------------------------
// BACKGROUND REMOVER
// --------------------------------------------------------
export async function handleBackgroundRemoval(photoDataUri: string) {
  if (!photoDataUri) {
    return { success: false, error: 'No image provided.' };
  }
  try {
    const result = await removeBackground({ photoDataUri });
    return { success: true, data: result };
  } catch (error) {
    console.error('Background removal error:', error);
    return {
      success: false,
      error: 'Failed to remove background. The AI model may be unavailable.',
    };
  }
}

// --------------------------------------------------------
// IMAGE → TEXT (OCR)
// --------------------------------------------------------
export async function handleImageToText(photoDataUri: string) {
  if (!photoDataUri) {
    return { success: false, error: 'No image provided.' };
  }
  try {
    const result = await imageToTextOcr({ photoDataUri });
    return { success: true, data: result };
  } catch (error) {
    console.error('Image to text error:', error);
    return {
      success: false,
      error: 'Failed to extract text from image. The AI model may be unavailable.',
    };
  }
}

// --------------------------------------------------------
// TEXT PARAPHRASING
// --------------------------------------------------------
export async function handleTextParaphrasing(text: string) {
  if (!text.trim()) {
    return { success: false, error: 'Input text cannot be empty.' };
  }
  try {
    const result = await paraphraseText({ text });
    return { success: true, data: result };
  } catch (error) {
    console.error('Text paraphrasing error:', error);
    return {
      success: false,
      error: 'Failed to paraphrase text. The AI model may be unavailable.',
    };
  }
}

// --------------------------------------------------------
// PDF → WORD
// --------------------------------------------------------
export async function handlePdfToWord(pdfDataUri: string) {
  if (!pdfDataUri) {
    return { success: false, error: 'No PDF provided.' };
  }
  try {
    const result = await pdfToWord({ pdfDataUri });
    return { success: true, data: result };
  } catch (error) {
    console.error('PDF to Word error:', error);
    return {
      success: false,
      error: 'Failed to convert PDF to Word. The AI model may be unavailable.',
    };
  }
}

// --------------------------------------------------------
// MERGE PDF
// --------------------------------------------------------
export async function handleMergePdf(pdfDataUris: string[]) {
  if (!pdfDataUris || pdfDataUris.length < 2) {
    return { success: false, error: 'Please select at least two PDFs to merge.' };
  }
  try {
    const result = await mergePdfToWord({ pdfDataUris });
    return { success: true, data: result };
  } catch (error) {
    console.error('PDF Merge error:', error);
    return {
      success: false,
      error: 'Failed to merge PDFs. The AI model may be unavailable.',
    };
  }
}

// --------------------------------------------------------
// ⭐ NEW: IMAGE → PDF CONVERTER
// --------------------------------------------------------
export async function handleImageToPdf(imageDataUri: string) {
  if (!imageDataUri) {
    return { success: false, error: "No image provided." };
  }

  try {
    // Create PDF
    const pdfDoc = await PDFDocument.create();

    // Extract Base64
    const base64 = imageDataUri.split(",")[1];
    const bytes = Buffer.from(base64, "base64");

    // Detect PNG / JPG
    let imgEmbed;
    if (imageDataUri.startsWith("data:image/png")) {
      imgEmbed = await pdfDoc.embedPng(bytes);
    } else {
      imgEmbed = await pdfDoc.embedJpg(bytes);
    }

    // Create PDF page same size as image
    const page = pdfDoc.addPage([imgEmbed.width, imgEmbed.height]);
    page.drawImage(imgEmbed, {
      x: 0,
      y: 0,
      width: imgEmbed.width,
      height: imgEmbed.height,
    });

    // Convert PDF → Base64
    const pdfBytes = await pdfDoc.save();
    const pdfBase64 = Buffer.from(pdfBytes).toString("base64");

    return {
      success: true,
      pdfDataUri: `data:application/pdf;base64,${pdfBase64}`,
    };
  } catch (error) {
    console.error("Image to PDF error:", error);
    return {
      success: false,
      error: "Failed to convert image to PDF.",
    };
  }
}
