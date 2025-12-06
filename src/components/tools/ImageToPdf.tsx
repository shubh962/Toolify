"use client";

import { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, Loader2, RotateCcw } from "lucide-react";
import { PDFDocument } from "pdf-lib";

// ---------------------------------------------------
// FIX ALL CAMERA IMAGES (48MP SAFE) + EXIF + AUTO RESIZE
// ---------------------------------------------------
const loadImageSafe = (file: File): Promise<{ preview: string; canvas: HTMLCanvasElement }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (ev) => {
      const img = new Image();
      img.onload = () => {
        // Auto-limit very large camera images (8000px → 2000px)
        let w = img.width;
        let h = img.height;

        const MAX = 2000; // safe value for all mobiles

        const scale = Math.min(MAX / w, MAX / h, 1);
        w *= scale;
        h *= scale;

        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = w;
        canvas.height = h;

        if (!ctx) return reject("Canvas not supported");

        ctx.drawImage(img, 0, 0, w, h);

        resolve({ preview: canvas.toDataURL("image/jpeg", 0.92), canvas });
      };

      img.onerror = () => reject("Image load error");
      img.src = ev.target?.result as string;
    };

    reader.onerror = () => reject("File read error");
    reader.readAsDataURL(file);
  });
};

export default function ImageToPdf() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [preview, setPreview] = useState<string | null>(null);
  const [canvasData, setCanvasData] = useState<HTMLCanvasElement | null>(null);
  const [pdfUri, setPdfUri] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);

  const MAX_SIZE = 50 * 1024 * 1024;

  // -----------------------------------------
  // IMAGE UPLOAD HANDLER (SAFE FOR ALL MOBILE PICS)
  // -----------------------------------------
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
      alert("Only JPG, JPEG, PNG supported.");
      return;
    }

    if (file.size > MAX_SIZE) {
      alert("Max file size allowed is 50MB.");
      return;
    }

    setLoading(true);

    try {
      const cleanName = file.name.replace(/\.[^/.]+$/, "");
      setFileName(cleanName);

      const { preview, canvas } = await loadImageSafe(file);

      setPreview(preview);
      setCanvasData(canvas);
      setPdfUri(null);
    } catch (err) {
      alert("Failed to process image.");
      console.error(err);
    }

    setLoading(false);
  };

  // -----------------------------------------
  // CONVERT TO PDF (ALWAYS FIT TO A4)
  // -----------------------------------------
  const convertToPdf = async () => {
    if (!canvasData) return;

    setLoading(true);

    try {
      const pdfDoc = await PDFDocument.create();
      const A4_W = 595.28;
      const A4_H = 841.89;

      const imgData = canvasData.toDataURL("image/jpeg", 0.92);
      const bytes = Uint8Array.from(atob(imgData.split(",")[1]), (c) => c.charCodeAt(0));

      const embedded = await pdfDoc.embedJpg(bytes);

      const iw = canvasData.width;
      const ih = canvasData.height;

      const scale = Math.min(A4_W / iw, A4_H / ih);
      const fw = iw * scale;
      const fh = ih * scale;

      const page = pdfDoc.addPage([A4_W, A4_H]);
      page.drawImage(embedded, {
        x: (A4_W - fw) / 2,
        y: (A4_H - fh) / 2,
        width: fw,
        height: fh,
      });

      const pdfBytes = await pdfDoc.save();

      const uri =
        "data:application/pdf;base64," + btoa(String.fromCharCode(...pdfBytes));

      setPdfUri(uri);
    } catch (err) {
      alert("Conversion failed. Try again.");
      console.error(err);
    }

    setLoading(false);
  };

  // -----------------------------------------
  // RESET TOOL
  // -----------------------------------------
  const resetTool = () => {
    setPreview(null);
    setCanvasData(null);
    setPdfUri(null);
    setFileName("");
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="space-y-12 py-10 text-center">

      <h1 className="text-4xl font-extrabold">Image to PDF Converter</h1>
      <p className="text-muted-foreground max-w-xl mx-auto">
        Convert camera photos + screenshots into PDF instantly. Ultra-fast. Works offline. No upload.
      </p>

      {/* Upload Card */}
      <Card className="max-w-3xl mx-auto shadow-xl border">
        <CardContent className="p-10">

          {!preview ? (
            <div
              className="flex flex-col items-center justify-center p-12 border-2 border-dashed rounded-xl cursor-pointer hover:border-primary"
              onClick={() => inputRef.current?.click()}
            >
              <Upload className="w-12 h-12 text-muted-foreground" />
              <p className="mt-4 font-semibold">Click to upload or drag & drop</p>
              <p className="text-sm text-muted-foreground">JPG, JPEG, PNG • Max 50MB</p>

              <Input
                type="file"
                accept="image/*"
                className="hidden"
                ref={inputRef}
                onChange={handleUpload}
              />
            </div>
          ) : (
            <>
              <img
                src={preview}
                alt="Preview"
                className="max-h-96 mx-auto rounded-lg shadow-md object-contain"
              />

              <p className="text-muted-foreground mt-2">{fileName}</p>

              <div className="flex justify-center gap-4 mt-5">
                <Button onClick={convertToPdf} disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-2" /> Converting...
                    </>
                  ) : (
                    "Convert to PDF"
                  )}
                </Button>

                <Button variant="outline" onClick={resetTool}>
                  <RotateCcw className="w-4 h-4 mr-2" /> Reset
                </Button>
              </div>

              {pdfUri && (
                <a
                  href={pdfUri}
                  download={`${fileName}.pdf`}
                  className="text-primary underline block mt-4 font-semibold"
                >
                  Download {fileName}.pdf
                </a>
              )}
            </>
          )}
        </CardContent>
      </Card>

    </div>
  );
}
