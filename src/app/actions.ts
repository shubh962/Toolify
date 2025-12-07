'use server';

import { removeBackground } from '@/ai/flows/background-remover';
import { imageToTextOcr } from '@/ai/flows/image-to-text-ocr';
import { paraphraseText } from '@/ai/flows/text-paraphraser';
import { pdfToWord } from '@/ai/flows/pdf-to-word';
import { mergePdfToWord } from '@/ai/flows/merge-pdf-to-word';
import { PDFDocument } from "pdf-lib";

// --------------------------------------------------------
// BACKGROUND REMOVAL
// --------------------------------------------------------
export async function handleBackgroundRemoval(photoDataUri: string) {
  if (!photoDataUri) return { success: false, error: 'No image provided.' };

  try {
    const result = await removeBackground({ photoDataUri });
    return { success: true, data: result };
  } catch (error) {
    console.error('Background removal error:', error);
    return { success: false, error: 'Failed to remove background.' };
  }
}

// --------------------------------------------------------
// IMAGE → TEXT (OCR) - FIXED
// --------------------------------------------------------
export async function handleImageToText(photoDataUri: string) {
  if (!photoDataUri) {
    return { success: false, error: "No image provided." };
  }

  try {
    // Note: यह मानते हुए कि imageToTextOcr अब त्रुटियों को स्पष्ट रूप से फेंकता है (throws errors)
    const result = await imageToTextOcr({ photoDataUri });

    return {
      success: true,
      data: result,
    };
  } catch (err) {
    console.error("🔥 OCR SERVER ERROR (CAUGHT):", err);
    
    // 🔥 FIX: सुनिश्चित करें कि यह त्रुटि क्लाइंट को संरचित JSON के रूप में जाती है
    let errorMessage = "OCR failed on server. Please try again.";
    
    // यदि त्रुटि में 'Gemini rejected' है (जो कि image-to-text-ocr.ts से आना चाहिए)
    if (err instanceof Error && err.message.includes("Gemini rejected")) {
        errorMessage = "OCR failed on server — Gemini rejected the image (Safety/Quality issue).";
    }

    // यदि इमेज से कोई टेक्स्ट नहीं निकाला गया और result.extractedText खाली है,
    // तो यह एरर client-side पर result.error के रूप में जाएगा।
    return {
      success: false,
      error: errorMessage,
    };
  }
}

// --------------------------------------------------------
// TEXT PARAPHRASING
// --------------------------------------------------------
export async function handleTextParaphrasing(text: string) {
  if (!text.trim())
    return { success: false, error: "Input text cannot be empty." };

  try {
    const result = await paraphraseText({ text });
    return { success: true, data: result };
  } catch (error) {
    console.error("Paraphrasing error:", error);
    return { success: false, error: "Failed to paraphrase text." };
  }
}

// --------------------------------------------------------
// PDF → WORD
// --------------------------------------------------------
export async function handlePdfToWord(pdfDataUri: string) {
  if (!pdfDataUri)
    return { success: false, error: "No PDF provided." };

  try {
    const result = await pdfToWord({ pdfDataUri });
    return { success: true, data: result };
  } catch (error) {
    console.error("PDF to Word error:", error);
    return { success: false, error: "Failed to convert PDF to Word." };
  }
}

// --------------------------------------------------------
// MERGE PDF
// --------------------------------------------------------
export async function handleMergePdf(pdfDataUris: string[]) {
  if (!pdfDataUris || pdfDataUris.length < 2)
    return { success: false, error: "Please select at least two PDFs." };

  try {
    const result = await mergePdfToWord({ pdfDataUris });
    return { success: true, data: result };
  } catch (error) {
    console.error("Merge PDF error:", error);
    return { success: false, error: "Failed to merge PDFs." };
  }
}

// --------------------------------------------------------
// IMAGE → PDF
// --------------------------------------------------------
export async function handleImageToPdf(imageDataUri: string) {
  if (!imageDataUri)
    return { success: false, error: "No image provided." };

  try {
    const pdfDoc = await PDFDocument.create();

    const base64 = imageDataUri.split(",")[1];
    const bytes = Buffer.from(base64, "base64");

    let imgEmbed;
    if (imageDataUri.startsWith("data:image/png")) {
      imgEmbed = await pdfDoc.embedPng(bytes);
    } else {
      imgEmbed = await pdfDoc.embedJpg(bytes);
    }

    const page = pdfDoc.addPage([imgEmbed.width, imgEmbed.height]);

    page.drawImage(imgEmbed, {
      x: 0,
      y: 0,
      width: imgEmbed.width,
      height: imgEmbed.height,
    });

    const pdfBytes = await pdfDoc.save();
    const pdfBase64 = Buffer.from(pdfBytes).toString("base64");

    return {
      success: true,
      pdfDataUri: `data:application/pdf;base64,${pdfBase64}`,
    };
  } catch (error) {
    console.error("Image to PDF error:", error);
    return { success: false, error: "Failed to convert image to PDF." };
  }
}
