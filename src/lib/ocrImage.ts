// src/lib/ocrImage.ts
import { createWorker, PSM } from "tesseract.js";

let workerPromise: ReturnType<typeof createWorker> | null = null;

// Reuse single worker for all calls
function getWorker() {
  if (!workerPromise) {
    workerPromise = createWorker({
      logger: m => console.log("[OCR]", m), // optional
    });
  }
  return workerPromise;
}

// Basic preprocessing: upscale + grayscale + contrast
async function preprocessImage(dataUrl: string): Promise<HTMLCanvasElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const MAX_WIDTH = 1400;
      const scale = img.width < MAX_WIDTH ? MAX_WIDTH / img.width : 1;

      const canvas = document.createElement("canvas");
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;

      const ctx = canvas.getContext("2d");
      if (!ctx) return reject("No canvas context");

      // Grayscale + contrast thoda badhao
      ctx.filter = "grayscale(1) contrast(1.4)";
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      resolve(canvas);
    };
    img.onerror = reject;
    img.src = dataUrl;
  });
}

// MAIN FUNCTION – call this from your tool
export async function runOcrOnImage(dataUrl: string, lang = "eng") {
  // 1) Preprocess (client-side)
  const canvas = await preprocessImage(dataUrl);

  // 2) Get worker
  const worker = await getWorker();
  await worker.loadLanguage(lang);
  await worker.initialize(lang);

  // Tune for normal block of text
  await worker.setParameters({
    tessedit_pageseg_mode: PSM.SINGLE_BLOCK, // 6
    preserve_interword_spaces: "1",
    user_defined_dpi: "300",
  });

  const { data } = await worker.recognize(canvas);
  await worker.terminate(); // optional if you want, else reuse

  return data.text;
}
