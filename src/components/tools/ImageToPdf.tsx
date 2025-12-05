"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PDFDocument } from "pdf-lib";

// 🔥 Resize large images before PDF conversion
async function resizeImage(imageBase64: string, maxWidth = 1600, maxHeight = 1600) {
  return new Promise<string>((resolve, reject) => {
    const img = new Image();
    img.src = imageBase64;

    img.onload = () => {
      let { width, height } = img;

      // Scale down if needed
      if (width > maxWidth || height > maxHeight) {
        const scale = Math.min(maxWidth / width, maxHeight / height);
        width *= scale;
        height *= scale;
      }

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      if (!ctx) return reject("Canvas error");

      ctx.drawImage(img, 0, 0, width, height);
      resolve(canvas.toDataURL("image/jpeg", 0.9)); // Higher compression for stability
    };

    img.onerror = () => reject("Failed to resize");
  });
}

export default function ImageToPdf() {
  const [image, setImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [pdfDataUri, setPdfDataUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const MAX_SIZE_MB = 5;
  const SUPPORTED_TYPES = ["image/jpeg", "image/jpg", "image/png"];

  // 📌 Upload Image
  const uploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!SUPPORTED_TYPES.includes(file.type)) {
      alert("Only JPG, JPEG, PNG are allowed.");
      return;
    }

    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > MAX_SIZE_MB) {
      alert(`Maximum allowed size is ${MAX_SIZE_MB} MB`);
      return;
    }

    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = () => setImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  // 📌 Convert to PDF
  const convertToPdf = async () => {
    if (!image) return;

    try {
      setLoading(true);

      // RESIZE large image FIRST 🔥
      const safeImage = await resizeImage(image);

      const pdfDoc = await PDFDocument.create();
      const base64 = safeImage.split(",")[1];
      const bytes = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));

      const img = await pdfDoc.embedJpg(bytes);
      const page = pdfDoc.addPage([img.width, img.height]);

      page.drawImage(img, {
        x: 0,
        y: 0,
        width: img.width,
        height: img.height,
      });

      const pdfBytes = await pdfDoc.save();

      const uri =
        "data:application/pdf;base64," +
        btoa(String.fromCharCode(...pdfBytes));

      setPdfDataUri(uri);
      setLoading(false);
    } catch (error) {
      console.error(error);
      alert("Failed to convert image to PDF. Try using a smaller image or screenshot.");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4 md:px-6">

      <Card className="shadow-lg border rounded-2xl">
        <CardContent className="py-8">

          <h1 className="text-4xl font-bold text-center mb-3 text-primary">
            Image to PDF Converter
          </h1>

          <p className="text-center text-muted-foreground mb-6 text-lg">
            Convert JPG, JPEG, PNG into a high-quality PDF.  
            <br />Private, secure — processing happens on your device.
          </p>

          {/* Upload */}
          <div className="flex flex-col items-center mb-3">
            <input type="file" accept="image/*" onChange={uploadImage} />
            {fileName && (
              <p className="text-sm mt-2 text-gray-700">
                Selected: {fileName}
              </p>
            )}
            <p className="text-xs text-gray-500 mt-1">
              Supported: JPG, JPEG, PNG | Max size: {MAX_SIZE_MB} MB
            </p>
          </div>

          {/* Preview */}
          {image && (
            <img
              src={image}
              className="rounded-lg border mt-4 mb-6 w-full shadow"
              alt="preview"
            />
          )}

          {/* Convert */}
          <Button
            className="w-full py-3 text-lg"
            onClick={convertToPdf}
            disabled={!image || loading}
          >
            {loading ? "Converting..." : "Convert to PDF"}
          </Button>

          {pdfDataUri && (
            <a
              href={pdfDataUri}
              download="converted.pdf"
              className="block mt-5 text-center text-primary font-semibold underline"
            >
              Download PDF
            </a>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
