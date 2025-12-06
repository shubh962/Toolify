"use client";

import { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, Loader2, RotateCcw } from "lucide-react";
import { PDFDocument } from "pdf-lib";

export default function ImageToPdf() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [pdfDataUri, setPdfDataUri] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);

  const MAX_SIZE = 50 * 1024 * 1024; // 50 MB
  const MAX_RESOLUTION = 2000; // Prevent mobile crash

  // Resize image BEFORE converting to PDF
  const resizeImage = (base64: string): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = base64;

      img.onload = () => {
        let { width, height } = img;

        // Only resize if very large
        if (width > MAX_RESOLUTION || height > MAX_RESOLUTION) {
          const scale = MAX_RESOLUTION / Math.max(width, height);
          width = width * scale;
          height = height * scale;
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d")!;
        ctx.drawImage(img, 0, 0, width, height);

        resolve(canvas.toDataURL("image/jpeg", 0.9));
      };
    });
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
      alert("Only JPG, JPEG & PNG images are supported.");
      return;
    }

    if (file.size > MAX_SIZE) {
      alert("Max file size allowed is 50 MB.");
      return;
    }

    setImageFile(file);
    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const convertToPdf = async () => {
    if (!imagePreview || !imageFile) {
      alert("Please upload an image first.");
      return;
    }

    try {
      setLoading(true);

      // Auto resize large images
      const safeBase64 = await resizeImage(imagePreview);

      const pdfDoc = await PDFDocument.create();
      const base64 = safeBase64.split(",")[1];
      const imgBytes = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));

      let embeddedImg =
        imageFile.type === "image/png"
          ? await pdfDoc.embedPng(imgBytes)
          : await pdfDoc.embedJpg(imgBytes);

      const { width, height } = embeddedImg;

      const A4_WIDTH = 595;
      const A4_HEIGHT = 842;

      const widthRatio = A4_WIDTH / width;
      const heightRatio = A4_HEIGHT / height;
      const scale = Math.min(widthRatio, heightRatio);

      const newWidth = width * scale;
      const newHeight = height * scale;

      const page = pdfDoc.addPage([A4_WIDTH, A4_HEIGHT]);
      page.drawImage(embeddedImg, {
        x: (A4_WIDTH - newWidth) / 2,
        y: (A4_HEIGHT - newHeight) / 2,
        width: newWidth,
        height: newHeight,
      });

      const pdfBytes = await pdfDoc.save();
      const pdfUri =
        "data:application/pdf;base64," +
        btoa(String.fromCharCode(...pdfBytes));

      setPdfDataUri(pdfUri);
      setLoading(false);
    } catch (err) {
      console.error(err);
      alert("Failed to convert image. Try again.");
      setLoading(false);
    }
  };

  const resetAll = () => {
    setImageFile(null);
    setImagePreview(null);
    setPdfDataUri(null);
    setFileName("");
  };

  return (
    <div className="space-y-12 py-10">
      {/* Title */}
      <section className="text-center space-y-3">
        <h1 className="text-4xl font-extrabold">Image to PDF Converter</h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Convert JPG or PNG images into high-quality PDFs — 100% local & secure.
        </p>
      </section>

      <h2 className="text-center text-2xl font-bold text-primary">
        Free Image to PDF Converter — Convert Instantly
      </h2>

      {/* Upload Card */}
      <Card className="w-full max-w-4xl mx-auto shadow-lg">
        <CardContent className="p-10">
          {!imagePreview ? (
            <div
              className="flex flex-col items-center justify-center p-12 border-2 border-dashed rounded-xl cursor-pointer hover:border-primary transition"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="w-10 h-10 text-muted-foreground" />
              <p className="mt-4 font-semibold">Click to upload or drag & drop</p>
              <p className="text-sm text-muted-foreground">JPG, JPEG, PNG • Max 50MB</p>

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
                alt="Preview"
                className="max-h-96 rounded-lg border shadow-md object-contain"
              />
              <p className="text-sm text-muted-foreground">{fileName}</p>

              <Button onClick={convertToPdf} disabled={loading} className="w-full max-w-sm">
                {loading && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
                {loading ? "Converting..." : "Convert to PDF"}
              </Button>

              {pdfDataUri && (
                <a href={pdfDataUri} download="converted.pdf" className="text-primary underline font-semibold">
                  Download PDF
                </a>
              )}

              <Button
                variant="outline"
                onClick={resetAll}
                className="flex items-center gap-2 w-full max-w-sm"
              >
                <RotateCcw className="w-4 h-4" /> Reset
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* SEO Content */}
      <Card className="max-w-4xl mx-auto p-8 shadow-xl border">
        <h2 className="text-2xl font-bold mb-4 text-primary">The Essential Guide to Image-to-PDF Conversion</h2>

        <p className="text-muted-foreground leading-relaxed">
          Converting images into PDFs ensures universal compatibility and a professional format.
        </p>

        <h3 className="text-xl font-semibold mt-6">How to Use This Tool</h3>
        <ol className="list-decimal ml-5 space-y-2 mt-2">
          <li>Upload your JPG or PNG image</li>
          <li>Preview instantly</li>
          <li>Click “Convert to PDF”</li>
          <li>Download your file</li>
        </ol>

        <h3 className="text-xl font-semibold mt-6">FAQ</h3>
        <p><strong>Is it free?</strong> Yes.</p>
        <p><strong>Are images uploaded?</strong> No, 100% local.</p>
        <p><strong>Max file size?</strong> 50 MB.</p>
        <p><strong>Formats?</strong> JPG, JPEG, PNG.</p>
      </Card>
    </div>
  );
}
