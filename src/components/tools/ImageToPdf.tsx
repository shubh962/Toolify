"use client";

import { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, Loader2, RotateCcw } from "lucide-react";
import { PDFDocument } from "pdf-lib";

export default function ImageToPdf() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");
  const [pdfDataUri, setPdfDataUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const MAX_SIZE = 50 * 1024 * 1024; // 50MB

  // Resize Image (Core Fix)
  const resizeImage = (dataUrl: string, maxWidth = 2000) =>
    new Promise<string>((resolve) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const scale = maxWidth / img.width;
        canvas.width = maxWidth;
        canvas.height = img.height * scale;

        const ctx = canvas.getContext("2d")!;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        resolve(canvas.toDataURL("image/jpeg", 0.9));
      };
      img.src = dataUrl;
    });

  // Handle Upload
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
      alert("Only JPG and PNG images are supported.");
      return;
    }

    if (file.size > MAX_SIZE) {
      alert("This image is too large. Maximum allowed size is 50 MB.");
      return;
    }

    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = async () => {
      const originalData = reader.result as string;

      // Resize if too large resolution
      const img = new Image();
      img.onload = async () => {
        let finalImage = originalData;

        // Auto resize large resolution images
        if (img.width > 2500) {
          finalImage = await resizeImage(originalData, 2000);
        }

        setImage(finalImage);
      };
      img.src = originalData;
    };
    reader.readAsDataURL(file);
  };

  // Convert to PDF
  const convertToPdf = async () => {
    if (!image) return;

    try {
      setLoading(true);

      const pdfDoc = await PDFDocument.create();
      const base64 = image.split(",")[1];
      const bytes = Uint8Array.from(atob(base64), (c) =>
        c.charCodeAt(0)
      );

      const imgEmbed = await pdfDoc.embedJpg(bytes);
      const pageWidth = 595; // A4 width
      const scale = pageWidth / imgEmbed.width;
      const pageHeight = imgEmbed.height * scale;

      const page = pdfDoc.addPage([pageWidth, pageHeight]);

      page.drawImage(imgEmbed, {
        x: 0,
        y: 0,
        width: pageWidth,
        height: pageHeight,
      });

      const pdfBytes = await pdfDoc.save();
      const uri =
        "data:application/pdf;base64," +
        btoa(String.fromCharCode(...pdfBytes));

      setPdfDataUri(uri);
      setLoading(false);
    } catch (err) {
      console.error(err);
      alert("Failed to convert image. Try again.");
      setLoading(false);
    }
  };

  const reset = () => {
    setImage(null);
    setPdfDataUri(null);
    setFileName("");
  };

  return (
    <div className="space-y-12 py-10">
      <section className="text-center space-y-3">
        <h1 className="text-4xl font-extrabold">Image to PDF Converter</h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Convert JPG or PNG images into high-quality PDFs instantly. Private,
          fast & secure — everything is processed inside your browser.
        </p>
      </section>

      <h2 className="text-center text-2xl font-bold text-primary">
        Free Image to PDF Converter – Convert Images Instantly
      </h2>

      <Card className="w-full max-w-4xl mx-auto shadow-lg">
        <CardContent className="p-10">
          {!image ? (
            <div
              className="flex flex-col items-center justify-center p-12 border-2 border-dashed rounded-xl cursor-pointer hover:border-primary transition"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="w-10 h-10 text-muted-foreground" />
              <p className="mt-4 font-semibold">Click to upload or drag & drop</p>
              <p className="text-sm text-muted-foreground">
                JPG, JPEG, PNG • Max 50MB
              </p>

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

              <div className="flex space-x-4">
                <Button
                  onClick={convertToPdf}
                  className="w-full"
                  disabled={loading}
                >
                  {loading && (
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  )}
                  {loading ? "Converting..." : "Convert to PDF"}
                </Button>

                <Button variant="outline" onClick={reset}>
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset
                </Button>
              </div>

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
