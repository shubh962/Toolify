"use client";

import { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, Loader2, RotateCcw, FileText } from "lucide-react";
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
    <div className="space-y-12 py-10">
      {/* ✅ Hero / Heading Section (like Image Compressor) */}
      <section className="max-w-3xl mx-auto text-center space-y-3">
        <div className="inline-flex items-center justify-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-2">
          <FileText className="w-3 h-3" />
          <span>Free Online Image to PDF Tool</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold">
          Convert Images to PDF Instantly
        </h1>
        <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto">
          Turn your camera photos, scanned documents, and screenshots into clean A4 PDF files. 
          Everything is processed locally in your browser for maximum privacy and speed.
        </p>
      </section>

      {/* ✅ Main Tool Card – styled similar to Image Compressor */}
      <Card className="w-full max-w-5xl mx-auto shadow-lg border">
        <CardContent className="p-6 md:p-8 space-y-6">
          {!preview ? (
            // 🔹 Upload area (dashed box, like compressor)
            <div
              className="flex flex-col items-center justify-center p-10 border-2 border-dashed rounded-xl cursor-pointer hover:border-primary transition"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="w-10 h-10 text-muted-foreground" />
              <p className="mt-4 font-semibold">
                Click to upload or drag &amp; drop your image
              </p>
              <p className="text-xs md:text-sm text-muted-foreground mt-1">
                Supported formats: <span className="font-semibold">JPG, JPEG, PNG</span> · Max size:{" "}
                <span className="font-semibold">50 MB</span>
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
            // 🔹 After upload – two-column layout (preview + controls)
            <div className="grid gap-8 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] items-start">
              {/* Left: Image preview */}
              <div className="space-y-3">
                <h2 className="text-lg font-semibold text-left">
                  Preview – {fileName || "Selected image"}
                </h2>
                <div className="border rounded-lg overflow-hidden bg-muted flex items-center justify-center">
                  <img
                    src={preview}
                    alt="Preview"
                    className="max-h-[400px] w-full object-contain"
                  />
                </div>
                <p className="text-xs text-muted-foreground text-left">
                  Your image is safely processed in your browser. No upload, no storage — perfect for
                  documents, ID cards, receipts, assignments, and more.
                </p>
              </div>

              {/* Right: Actions panel */}
              <div className="space-y-4">
                <div className="rounded-lg border bg-muted/40 p-4 text-left space-y-2">
                  <h3 className="text-sm font-semibold">Conversion summary</h3>
                  <ul className="text-xs text-muted-foreground list-disc pl-4 space-y-1">
                    <li>Input: {fileName || "Image"}</li>
                    <li>Output: A4 PDF (auto-fitted)</li>
                    <li>Processing: 100% in-browser</li>
                  </ul>
                </div>

                <div className="flex flex-col gap-3">
                  <Button
                    onClick={convertToPdf}
                    disabled={loading}
                    className="w-full"
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
                    className="w-full flex items-center justify-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Reset
                  </Button>

                  {pdfUrl && (
                    <Button asChild variant="outline" className="w-full">
                      <a href={pdfUrl} download={`${fileName || "image"}.pdf`}>
                        Download {fileName || "image"}.pdf
                      </a>
                    </Button>
                  )}
                </div>

                <p className="text-[11px] text-muted-foreground">
                  Tip: For the best text clarity, upload high-resolution scans or photos in good lighting.
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* ✅ Simple SEO / Info Section – like other tools (can upgrade later) */}
      <Card className="w-full max-w-5xl mx-auto shadow-sm border bg-muted/40">
        <CardContent className="p-6 md:p-8 space-y-4">
          <h2 className="text-xl md:text-2xl font-bold text-left">
            Why use TaskGuru&apos;s Image to PDF Converter?
          </h2>
          <p className="text-sm md:text-base text-muted-foreground text-left">
            Many online converters upload your files to remote servers, which can be slow and risky for
            sensitive documents. TaskGuru&apos;s Image to PDF tool runs entirely in your browser using
            modern web technology and PDF generation, so your files never leave your device.
          </p>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground">
            <ul className="list-disc pl-4 space-y-1">
              <li>Perfect for assignments, notes, and study material</li>
              <li>Convert photos of documents into clean, shareable PDFs</li>
              <li>Works great with camera images and screenshots</li>
            </ul>
            <ul className="list-disc pl-4 space-y-1">
              <li>No signup, no watermark, no hidden limits</li>
              <li>Optimized for both desktop and mobile use</li>
              <li>Output is compatible with all major PDF viewers</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
