"use server";

import { removeBackground } from "@/ai/flows/background-remover";
import { imageToTextOcr } from "@/ai/flows/image-to-text-ocr";
import { directParaphrase } from "@/ai/direct-gemini"; 
import { pdfToWord } from "@/ai/flows/pdf-to-word";
import { PDFDocument } from "pdf-lib";

/* ---------------------------------------------------------
   BACKGROUND REMOVAL
--------------------------------------------------------- */
export async function handleBackgroundRemoval(photoDataUri: string) {
  if (!photoDataUri) return { success: false, error: "No image provided." };
  try {
    if (photoDataUri.startsWith("data:image/heic")) {
      return { success: false, error: "HEIC images are not supported. Please use JPG/PNG." };
    }
    const result = await removeBackground({ photoDataUri });
    if (!result) return { success: false, error: "Processing failed." };
    
    const finalOutput = result.backgroundRemovedDataUri || result.backgroundRemovedPhotoDataUri || result.finalImage || null;
    if (!finalOutput) return { success: false, error: "Background could not be removed." };

    return { success: true, data: { backgroundRemovedDataUri: finalOutput } };
  } catch (error) {
    console.error("BG Removal Error:", error);
    return { success: false, error: error instanceof Error ? error.message : "Background removal failed." };
  }
}

/* ---------------------------------------------------------
   IMAGE → TEXT (OCR)
--------------------------------------------------------- */
export async function handleImageToText(photoDataUri: string) {
  if (!photoDataUri) return { success: false, error: "No image provided." };
  try {
    const result = await imageToTextOcr({ photoDataUri });
    return { success: true, data: result };
  } catch (err) {
    console.error("OCR Error:", err);
    return { success: false, error: "OCR failed on server." };
  }
}

/* ---------------------------------------------------------
   TEXT PARAPHRASING (DIRECT)
--------------------------------------------------------- */
export async function handleTextParaphrasing(text: string) {
  if (!text.trim()) return { success: false, error: "Input text cannot be empty." };
  try {
    const resultText = await directParaphrase(text);
    return { success: true, data: { paraphrasedText: resultText } };
  } catch (error) {
    console.error("Paraphrasing Error:", error);
    return { success: false, error: error instanceof Error ? error.message : "Paraphrasing failed." };
  }
}

/* ---------------------------------------------------------
   PDF → WORD
--------------------------------------------------------- */
export async function handlePdfToWord(pdfDataUri: string) {
  if (!pdfDataUri) return { success: false, error: "No PDF provided." };
  try {
    const result = await pdfToWord({ pdfDataUri });
    return { success: true, data: result };
  } catch (error) {
    console.error("PDF to Word error:", error);
    return { success: false, error: "Failed to convert PDF." };
  }
}

/* =========================================================
   OPTION 1: SIMPLE MERGE (Phle wala - End to End)
   User selects multiple files, they join one after another.
   ========================================================= */
export async function handleMergePdf(pdfDataUris: string[]) {
  if (!pdfDataUris || pdfDataUris.length < 2) {
    return { success: false, error: "Please select at least two PDFs." };
  }

  try {
    const mergedPdf = await PDFDocument.create();

    for (const pdfUri of pdfDataUris) {
      const base64 = pdfUri.split(",")[1];
      const pdfBytes = Buffer.from(base64, "base64");
      const pdf = await PDFDocument.load(pdfBytes);
      const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      copiedPages.forEach((page) => mergedPdf.addPage(page));
    }

    const mergedPdfBytes = await mergedPdf.save();
    const mergedPdfBase64 = Buffer.from(mergedPdfBytes).toString("base64");
    
    return { success: true, data: { mergedPdfDataUri: `data:application/pdf;base64,${mergedPdfBase64}` } };
  } catch (error) {
    console.error("Merge PDF error:", error);
    return { success: false, error: "Failed to merge PDFs." };
  }
}

/* =========================================================
   OPTION 2: SMART INSERT (Naya wala - Specific Page)
   User selects Main PDF + Insert PDF + Page Number.
   ========================================================= */
export async function handleInsertPdf(mainPdfUri: string, insertPdfUri: string, insertAtPageNumber: number) {
  if (!mainPdfUri || !insertPdfUri) {
    return { success: false, error: "Both PDF files are required." };
  }

  try {
    const finalPdf = await PDFDocument.create();

    // Load PDFs
    const mainPdfBytes = Buffer.from(mainPdfUri.split(",")[1], "base64");
    const insertPdfBytes = Buffer.from(insertPdfUri.split(",")[1], "base64");
    const mainPdf = await PDFDocument.load(mainPdfBytes);
    const insertPdf = await PDFDocument.load(insertPdfBytes);

    // Copy Pages
    const mainPages = await finalPdf.copyPages(mainPdf, mainPdf.getPageIndices());
    const insertPages = await finalPdf.copyPages(insertPdf, insertPdf.getPageIndices());

    // Logic: Split and Insert
    // Page 1 means index 0. User input "2" means insert AFTER page 2 (so at index 2).
    // Adjust logic based on your UI preference (After page X or At page X).
    // Logic here: "Insert AT Page X" (Everything shifts right)
    
    let targetIndex = insertAtPageNumber - 1; 
    if (targetIndex < 0) targetIndex = 0;
    if (targetIndex > mainPages.length) targetIndex = mainPages.length;

    // 1. Add pages BEFORE target
    for (let i = 0; i < targetIndex; i++) finalPdf.addPage(mainPages[i]);

    // 2. Add INSERT pages (Beech mein)
    for (const page of insertPages) finalPdf.addPage(page);

    // 3. Add remaining pages AFTER target
    for (let i = targetIndex; i < mainPages.length; i++) finalPdf.addPage(mainPages[i]);

    const finalPdfBytes = await finalPdf.save();
    const finalPdfBase64 = Buffer.from(finalPdfBytes).toString("base64");

    return { success: true, data: { mergedPdfDataUri: `data:application/pdf;base64,${finalPdfBase64}` } };
  } catch (error) {
    console.error("Insert PDF error:", error);
    return { success: false, error: "Failed to insert PDF." };
  }
}

/* ---------------------------------------------------------
   IMAGE → PDF
--------------------------------------------------------- */
export async function handleImageToPdf(imageDataUri: string) {
  if (!imageDataUri) return { success: false, error: "No image provided." };
  try {
    const pdfDoc = await PDFDocument.create();
    const base64 = imageDataUri.split(",")[1];
    const bytes = Buffer.from(base64, "base64");
    
    const imgEmbed = imageDataUri.startsWith("data:image/png") 
      ? await pdfDoc.embedPng(bytes) 
      : await pdfDoc.embedJpg(bytes);

    const page = pdfDoc.addPage([imgEmbed.width, imgEmbed.height]);
    page.drawImage(imgEmbed, { x: 0, y: 0, width: imgEmbed.width, height: imgEmbed.height });

    const pdfBytes = await pdfDoc.save();
    const pdfBase64 = Buffer.from(pdfBytes).toString("base64");
    return { success: true, pdfDataUri: `data:application/pdf;base64,${pdfBase64}` };
  } catch (error) {
    return { success: false, error: "Failed to convert image to PDF." };
  }
}
