"use server";

import { removeBackground } from "@/ai/flows/background-remover";
import { imageToTextOcr } from "@/ai/flows/image-to-text-ocr";
// 👇 NEW: Direct AI import for Paraphraser
import { directParaphrase } from "@/ai/direct-gemini"; 
import { pdfToWord } from "@/ai/flows/pdf-to-word";
// 👇 NOTE: Maine mergePdfToWord import hata diya hai kyunki hum ab direct merge karenge
import { PDFDocument } from "pdf-lib";

/* ---------------------------------------------------------
   BACKGROUND REMOVAL — MOBILE SAFE FIXED VERSION
--------------------------------------------------------- */
export async function handleBackgroundRemoval(photoDataUri: string) {
  if (!photoDataUri) {
    return { success: false, error: "No image provided." };
  }

  try {
    // 🟢 Convert HEIC → JPG automatically (iPhone fix)
    if (photoDataUri.startsWith("data:image/heic")) {
      return {
        success: false,
        error: "HEIC images are not supported. Please screenshot or save as JPG/PNG.",
      };
    }

    const result = await removeBackground({ photoDataUri });

    if (!result) {
      return {
        success: false,
        error: "Processing failed. Try again with a clearer image.",
      };
    }

    // 🟢 Normalizing remove.bg result
    const finalOutput =
      result.backgroundRemovedDataUri ||
      result.backgroundRemovedPhotoDataUri ||
      result.finalImage ||
      null;

    if (!finalOutput) {
      return {
        success: false,
        error: "Background could not be removed. Try with a sharper image.",
      };
    }

    return { success: true, data: { backgroundRemovedDataUri: finalOutput } };
  } catch (error) {
    console.error("🔥 Background Removal Error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Background removal failed.",
    };
  }
}

/* ---------------------------------------------------------
   IMAGE → TEXT (OCR)
--------------------------------------------------------- */
export async function handleImageToText(photoDataUri: string) {
  if (!photoDataUri)
    return { success: false, error: "No image provided." };

  try {
    const result = await imageToTextOcr({ photoDataUri });
    return { success: true, data: result };
  } catch (err) {
    console.error("🔥 OCR SERVER ERROR:", err);

    let errorMessage = "OCR failed on server.";
    if (err instanceof Error) {
        errorMessage = err.message;
        if (err.message.includes("Gemini rejected")) {
             errorMessage = "OCR failed — Gemini rejected the image.";
        }
    }
    return { success: false, error: errorMessage };
  }
}

/* ---------------------------------------------------------
   TEXT PARAPHRASING — FIXED (DIRECT API)
--------------------------------------------------------- */
export async function handleTextParaphrasing(text: string) {
  if (!text.trim()) {
    return { success: false, error: "Input text cannot be empty." };
  }

  try {
    // ✅ Using the new Direct API (No 404/503 Errors)
    const resultText = await directParaphrase(text);

    return {
      success: true,
      data: { paraphrasedText: resultText },
    };
  } catch (error) {
    console.error("🔥 Paraphrasing Error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Paraphrasing failed.",
    };
  }
}

/* ---------------------------------------------------------
   PDF → WORD
--------------------------------------------------------- */
export async function handlePdfToWord(pdfDataUri: string) {
  if (!pdfDataUri)
    return { success: false, error: "No PDF provided." };

  try {
    const result = await pdfToWord({ pdfDataUri });
    return { success: true, data: result };
  } catch (error) {
    console.error("PDF to Word error:", error);
    return { success: false, error: error instanceof Error ? error.message : "Failed to convert PDF to Word." };
  }
}

/* ---------------------------------------------------------
   MERGE PDF — FIXED (USING PDF-LIB, NO AI)
--------------------------------------------------------- */
export async function handleMergePdf(pdfDataUris: string[]) {
  if (!pdfDataUris || pdfDataUris.length < 2) {
    return { success: false, error: "Please select at least two PDFs." };
  }

  try {
    // 1. Create a new document
    const mergedPdf = await PDFDocument.create();

    for (const pdfUri of pdfDataUris) {
      // 2. Load each uploaded PDF
      // Data URI format: "data:application/pdf;base64,....."
      const base64 = pdfUri.split(",")[1]; 
      const pdfBytes = Buffer.from(base64, "base64");
      
      const pdf = await PDFDocument.load(pdfBytes);

      // 3. Copy all pages to the new document
      const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      copiedPages.forEach((page) => mergedPdf.addPage(page));
    }

    // 4. Save and return
    const mergedPdfBytes = await mergedPdf.save();
    const mergedPdfBase64 = Buffer.from(mergedPdfBytes).toString("base64");
    
    return { 
      success: true, 
      data: { 
        // Sending back standard PDF data URI
        mergedPdfDataUri: `data:application/pdf;base64,${mergedPdfBase64}` 
      } 
    };

  } catch (error) {
    console.error("Merge PDF error:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Failed to merge PDFs." 
    };
  }
}

/* ---------------------------------------------------------
   IMAGE → PDF
--------------------------------------------------------- */
export async function handleImageToPdf(imageDataUri: string) {
  if (!imageDataUri)
    return { success: false, error: "No image provided." };

  try {
    const pdfDoc = await PDFDocument.create();

    const base64 = imageDataUri.split(",")[1];
    const bytes = Buffer.from(base64, "base64");

    const imgEmbed = imageDataUri.startsWith("data:image/png")
      ? await pdfDoc.embedPng(bytes)
      : await pdfDoc.embedJpg(bytes);

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
    return { success: false, error: error instanceof Error ? error.message : "Failed to convert image to PDF." };
  }
}
