"use client";

import { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, Loader2, RotateCcw } from "lucide-react";
import { PDFDocument } from "pdf-lib";

// ✅ Safely load image into canvas (removes EXIF + huge resolution)
const loadSafeCanvas = (
  file: File
): Promise<{ preview: string; canvas: HTMLCanvasElement }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        let w = img.width;
        let h = img.height;

        // Keep quality good but safe for mobile – max side 1600px
        const MAX_SIDE = 1600;
        const scale = Math.min(MAX_SIDE / w, MAX_SIDE / h, 1);

        w = Math.round(w * scale);
        h = Math.round(h * scale);

        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject("Canvas context not available.");
          return;
        }

        ctx.drawImage(img, 0, 0, w, h);

        // Clean JPEG preview (no EXIF)
        const preview = canvas.toDataURL("image/jpeg", 0.9);

        resolve({ preview, canvas });
      };

      img.onerror = () => reject("Image decode failed.");
      img.src = event.target?.result as string;
    };

    reader.onerror = () => reject("File read error.");
    reader.readAsDataURL(file);
  });
};

export default function ImageToPdf() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [preview, setPreview] = useState<string | null>(null);
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50 MB

  // 🔁 Clean up old object URLs
  useEffect(() => {
    return () => {
      if (pdfUrl) URL.revokeObjectURL(pdfUrl);
    };
  }, [pdfUrl]);

  // 📂 Handle file upload
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Only image files are allowed.");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      alert("File size must be under 50 MB.");
      return;
    }

    setLoading(true);
    try {
      const baseName = file.name.replace(/\.[^/.]+$/, "");
      setFileName(baseName);

      const { preview, canvas } = await loadSafeCanvas(file);
      setPreview(preview);
      setCanvas(canvas);

      // clear old pdf url if any
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
        setPdfUrl(null);
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("Failed to load image. Please try a different file.");
    }
    setLoading(false);
  };

  // 🧾 Convert image → PDF (using Blob, NO base64)
  const convertToPdf = async () => {
    if (!canvas) return;

    setLoading(true);
    try {
      const pdfDoc = await PDFDocument.create();

      // A4 in points
      const A4_W = 595.28;
      const A4_H = 841.89;

      // Canvas → JPEG blob (clean, no EXIF)
      const imgBlob: Blob = await new Promise((resolve, reject) => {
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject("Failed to create image blob.");
              return;
            }
            resolve(blob);
          },
          "image/jpeg",
          0.9
        );
      });

      const imgBytes = new Uint8Array(await imgBlob.arrayBuffer());
      const embedded = await pdfDoc.embedJpg(imgBytes);

      const iw = canvas.width;
      const ih = canvas.height;
      const scale = Math.min(A4_W / iw, A4_H / ih, 1);
      const w = iw * scale;
      const h = ih * scale;

      const page = pdfDoc.addPage([A4_W, A4_H]);
      page.drawImage(embedded, {
        x: (A4_W - w) / 2,
        y: (A4_H - h) / 2,
        width: w,
        height: h,
      });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });

      // Old url cleanup
      if (pdfUrl) URL.revokeObjectURL(pdfUrl);

      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
    } catch (err) {
      console.error("PDF conversion error:", err);
      alert("PDF conversion failed.");
    }
    setLoading(false);
  };

  // 🔄 Reset tool
  const handleReset = () => {
    setPreview(null);
    setCanvas(null);
    setFileName("");
    if (pdfUrl) {
      URL.revokeObjectURL(pdfUrl);
      setPdfUrl(null);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-12 py-10 text-center">
      {/* Heading */}
      <section className="space-y-3">
        <h1 className="text-4xl font-extrabold">Image to PDF Converter</h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Convert any camera photo or screenshot into a clean A4 PDF.
          Processing is 100% local in your browser — fast, private and secure.
        </p>
      </section>

      {/* Upload / Preview Card */}
      <Card className="max-w-3xl mx-auto shadow-xl border">
        <CardContent className="p-8 md:p-10">
          {!preview ? (
            <div
              className="flex flex-col items-center justify-center p-12 border-2 border-dashed rounded-xl cursor-pointer hover:border-primary transition"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="w-10 h-10 text-muted-foreground" />
              <p className="mt-4 font-semibold">Click to upload or drag &amp; drop</p>
              <p className="text-sm text-muted-foreground">
                JPG, JPEG, PNG • Max 50 MB
              </p>

              <Input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleUpload}
              />
            </div>
          ) : (
            <>
              <img
                src={preview}
                alt="Preview"
                className="max-h-96 w-full object-contain rounded-lg border shadow-md mx-auto"
              />
              <p className="mt-3 text-sm text-muted-foreground">
                {fileName || "Selected image"}
              </p>

              <div className="flex flex-wrap justify-center gap-4 mt-6">
                <Button
                  onClick={convertToPdf}
                  disabled={loading}
                  className="min-w-[180px]"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      Converting…
                    </>
                  ) : (
                    "Convert to PDF"
                  )}
                </Button>
                <Button
                  variant="outline"
                  onClick={handleReset}
                  disabled={loading}
                  className="min-w-[140px]"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset
                </Button>
              </div>

              {pdfUrl && (
                <a
                  href={pdfUrl}
                  download={`${fileName || "image"}.pdf`}
                  className="mt-4 inline-block text-primary underline font-semibold"
                >
                  Download {fileName || "image"}.pdf
                </a>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
