"use client";

import { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, Loader2 } from "lucide-react";
import { PDFDocument } from "pdf-lib";

export default function ImageToPdf() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [image, setImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");
  const [pdfDataUri, setPdfDataUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const MAX_SIZE = 50 * 1024 * 1024; // 50MB

  // ------------------------------------------
  // 1. IMAGE UPLOAD
  // ------------------------------------------
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
      alert("Only JPG and PNG images are supported.");
      return;
    }

    if (file.size > MAX_SIZE) {
      alert("Max allowed image size is 50 MB.");
      return;
    }

    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = () => setImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  // ------------------------------------------
  // 2. CANVAS RESIZE FUNCTION (IMPORTANT FIX)
  // ------------------------------------------
  const resizeImage = (dataUrl: string): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = dataUrl;

      img.onload = () => {
        const MAX_WIDTH = 2000;  // keep high quality but safe memory
        const scale = MAX_WIDTH / img.width;

        const canvas = document.createElement("canvas");
        canvas.width = img.width > MAX_WIDTH ? MAX_WIDTH : img.width;
        canvas.height = img.height * (img.width > MAX_WIDTH ? scale : 1);

        const ctx = canvas.getContext("2d");
        ctx!.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Compress to 85% quality JPG for huge images
        resolve(canvas.toDataURL("image/jpeg", 0.85));
      };
    });
  };

  // ------------------------------------------
  // 3. CONVERT IMAGE → PDF
  // ------------------------------------------
  const convertToPdf = async () => {
    if (!image) return;

    setLoading(true);
    setPdfDataUri(null);

    try {
      // resize first to avoid browser crash + pdf-lib crash
      const optimizedImage = await resizeImage(image);

      const pdfDoc = await PDFDocument.create();

      const base64 = optimizedImage.split(",")[1];
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
    } catch (err) {
      console.error(err);
      alert("Image too large for conversion. Automatically compressing failed.");
    }

    setLoading(false);
  };

  return (
    <div className="space-y-12 py-10">
      {/* TITLE */}
      <section className="text-center space-y-3">
        <h1 className="text-4xl font-extrabold">Image to PDF Converter</h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Convert JPG or PNG images into high-quality PDF files instantly.
          Private, fast & secure — all processing happens in your browser.
        </p>
      </section>

      {/* SUBTITLE */}
      <h2 className="text-center text-2xl font-bold text-primary">
        Free Image to PDF Converter – Convert Images Instantly
      </h2>

      {/* UPLOAD CARD */}
      <Card className="w-full max-w-4xl mx-auto shadow-lg">
        <CardContent className="p-10">

          {!image ? (
            <div
              className="flex flex-col items-center justify-center p-12
              border-2 border-dashed rounded-xl cursor-pointer hover:border-primary transition"
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
                src={image}
                alt="Preview"
                className="max-h-96 rounded-lg border shadow-md object-contain"
              />
              <p className="text-sm text-muted-foreground">{fileName}</p>

              <Button
                onClick={convertToPdf}
                className="w-full max-w-sm"
                disabled={loading}
              >
                {loading && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
                {loading ? "Converting..." : "Convert to PDF"}
              </Button>

              {pdfDataUri && (
                <a
                  href={pdfDataUri}
                  download="converted.pdf"
                  className="text-primary underline font-semibold mt-2"
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
