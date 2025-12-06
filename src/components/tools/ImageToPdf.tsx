"use client";

import { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, Loader2 } from "lucide-react";
import { PDFDocument } from "pdf-lib";

export default function ImageToPdf() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [pdfDataUri, setPdfDataUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const MAX_SIZE = 50 * 1024 * 1024; // 50MB allowed

  // ------------------------------------------------
  // 1. HANDLE FILE INPUT
  // ------------------------------------------------
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!["image/png", "image/jpeg", "image/jpg"].includes(file.type)) {
      alert("Only JPG or PNG allowed.");
      return;
    }

    if (file.size > MAX_SIZE) {
      alert("Max allowed image size: 50 MB");
      return;
    }

    setImageFile(file);

    // SAFE PREVIEW  
    const reader = new FileReader();
    reader.onload = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  // ------------------------------------------------
  // 2. SAFE IMAGE RESIZE FIX (NO CORS ERROR)
  // ------------------------------------------------
  const resizeImageSafely = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        const img = new Image();
        img.crossOrigin = "anonymous"; // <— FIX FOR ALL CANVAS FAILURES
        img.src = reader.result as string;

        img.onload = () => {
          const MAX_WIDTH = 1600; // safe for all mobiles
          const scale = img.width > MAX_WIDTH ? MAX_WIDTH / img.width : 1;

          const canvas = document.createElement("canvas");
          canvas.width = img.width * scale;
          canvas.height = img.height * scale;

          const ctx = canvas.getContext("2d");

          try {
            ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);

            // Always convert to compressed JPEG
            const resized = canvas.toDataURL("image/jpeg", 0.85);
            resolve(resized);
          } catch (e) {
            reject("Canvas processing failed");
          }
        };

        img.onerror = () => reject("Invalid image format");
      };

      reader.onerror = () => reject("Failed to read file");
      reader.readAsDataURL(file);
    });
  };

  // ------------------------------------------------
  // 3. GENERATE PDF SAFELY
  // ------------------------------------------------
  const convertToPdf = async () => {
    if (!imageFile) return;

    try {
      setLoading(true);
      setPdfDataUri(null);

      // Resize first — otherwise big images crash canvas + pdf-lib
      const safeImg = await resizeImageSafely(imageFile);

      const pdfDoc = await PDFDocument.create();

      const base64 = safeImg.split(",")[1];
      const bytes = Uint8Array.from(atob(base64), c => c.charCodeAt(0));
      const jpg = await pdfDoc.embedJpg(bytes);

      const page = pdfDoc.addPage([jpg.width, jpg.height]);
      page.drawImage(jpg, {
        x: 0,
        y: 0,
        width: jpg.width,
        height: jpg.height,
      });

      const pdfBytes = await pdfDoc.save();
      const uri = "data:application/pdf;base64," +
        btoa(String.fromCharCode(...pdfBytes));

      setPdfDataUri(uri);
    } catch (err) {
      console.error(err);
      alert("Image too large to process. Try another image.");
    }

    setLoading(false);
  };

  // ------------------------------------------------
  // UI
  // ------------------------------------------------
  return (
    <div className="space-y-12 py-10">
      <section className="text-center">
        <h1 className="text-4xl font-extrabold">Image to PDF Converter</h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Convert JPG or PNG images into PDF instantly.
        </p>
      </section>

      <Card className="w-full max-w-4xl mx-auto shadow-lg">
        <CardContent className="p-10">
          {!imagePreview ? (
            <div
              className="flex flex-col items-center justify-center p-12 border-2 border-dashed rounded-xl cursor-pointer hover:border-primary"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="w-10 h-10 text-muted-foreground" />
              <p className="mt-3 font-semibold">Click to upload</p>
              <p className="text-sm text-muted-foreground">JPG, PNG • Max 50MB</p>

              <Input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleUpload}
                className="hidden"
              />
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-4">
              <img
                src={imagePreview}
                className="max-h-96 rounded-lg border shadow"
              />

              <Button
                onClick={convertToPdf}
                disabled={loading}
                className="w-full max-w-sm"
              >
                {loading && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
                {loading ? "Converting..." : "Convert to PDF"}
              </Button>

              {pdfDataUri && (
                <a
                  download="converted.pdf"
                  href={pdfDataUri}
                  className="text-primary underline mt-2"
                >
                  Download PDF
                </a>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
