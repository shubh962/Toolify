"use client";

import { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FileIcon, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { PDFDocument } from "pdf-lib";

export default function ImageToPdf() {
  const [image, setImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const filePicker = useRef<HTMLInputElement>(null);

  // ---------- Upload Handler ----------
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 50 * 1024 * 1024) {
      alert("Maximum allowed size is 50 MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as string);
      setFileName(file.name);
      setPdfUrl(null);
    };
    reader.readAsDataURL(file);
  };

  // ---------- Convert to PDF ----------
  const convertToPdf = async () => {
    if (!image) return;

    try {
      setLoading(true);

      const pdf = await PDFDocument.create();
      const base64 = image.split(",")[1];
      const bytes = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));

      let img;
      if (image.startsWith("data:image/png")) {
        img = await pdf.embedPng(bytes);
      } else {
        img = await pdf.embedJpg(bytes);
      }

      const page = pdf.addPage([img.width, img.height]);
      page.drawImage(img, { x: 0, y: 0, width: img.width, height: img.height });

      const pdfBytes = await pdf.save();
      const pdfBlob = new Blob([pdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(pdfBlob);

      setPdfUrl(url);
      setLoading(false);
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Try using a smaller file or compress it first.");
      setLoading(false);
    }
  };

  return (
    <div className="space-y-10 pb-20">

      {/* ------------------ PAGE HEADING ------------------ */}
      <div className="text-center space-y-3 mt-6">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">
          Image to PDF Converter
        </h1>

        <p className="text-muted-foreground max-w-2xl mx-auto">
          Reduce JPG or PNG images into high-quality PDF files instantly.
          Faster, cleaner, privacy-first conversion.
        </p>

        <h2 className="text-2xl font-semibold text-primary mt-4">
          Free Image to PDF Converter Online – Convert Images Quickly
        </h2>
      </div>

      {/* ------------------ UPLOAD CARD ------------------ */}
      <Card className="max-w-3xl mx-auto shadow-md rounded-xl">
        <CardContent className="p-6">

          {/* Upload Box */}
          {!image && (
            <div
              className="border-2 border-dashed border-muted-foreground/30 rounded-xl p-10 text-center cursor-pointer hover:border-primary transition"
              onClick={() => filePicker.current?.click()}
            >
              <Upload className="w-12 h-12 mx-auto text-muted-foreground mb-4" />

              <p className="font-semibold">Click to upload or drag and drop</p>
              <p className="text-sm text-muted-foreground">
                JPG, JPEG, PNG (Max 50 MB)
              </p>

              <Input
                type="file"
                accept="image/*"
                className="hidden"
                ref={filePicker}
                onChange={handleFile}
              />
            </div>
          )}

          {/* Selected Image Preview */}
          {image && (
            <div className="space-y-4">
              <div className="w-full rounded-lg overflow-hidden border h-64 relative bg-muted">
                <Image
                  src={image}
                  alt="Uploaded image"
                  fill
                  className="object-contain"
                />
              </div>

              <p className="text-center text-sm font-medium text-muted-foreground">
                {fileName} — {Math.round((image.length * 3) / 4 / 1024 / 1024)} MB
              </p>

              <Button
                className="w-full"
                disabled={loading}
                onClick={convertToPdf}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" /> Converting...
                  </>
                ) : (
                  "Convert to PDF"
                )}
              </Button>
            </div>
          )}

          {/* PDF Download */}
          {pdfUrl && (
            <a
              href={pdfUrl}
              download="converted.pdf"
              className="block mt-4 text-center text-primary underline font-medium"
            >
              Download PDF
            </a>
          )}
        </CardContent>
      </Card>

      {/* ------------------ SEO CONTENT BLOCK ------------------ */}
      <Card className="max-w-3xl mx-auto p-6 rounded-xl shadow-md">
        <h3 className="text-2xl font-bold text-primary mb-4 text-center">
          Essential Guide to Image-to-PDF Conversion
        </h3>

        <p className="text-muted-foreground leading-relaxed text-lg">
          Converting images into PDF files ensures document safety, easy sharing,
          better compatibility, and professional formatting...
        </p>

        <h4 className="text-xl font-semibold mt-6 mb-3">How to Use This Tool</h4>

        <ol className="list-decimal ml-6 space-y-2 text-muted-foreground">
          <li>Upload any image (JPG, JPEG, PNG up to 50 MB).</li>
          <li>Preview your image before converting.</li>
          <li>Click "Convert to PDF".</li>
          <li>Download your clean, high-quality PDF instantly.</li>
        </ol>

        <h4 className="text-xl font-semibold mt-6 mb-3">FAQs</h4>

        <p><strong>Is it free?</strong> Yes, 100% free forever.</p>
        <p><strong>Are my files uploaded to a server?</strong> No, everything happens inside your device.</p>
        <p><strong>Supported image types?</strong> JPG, JPEG, PNG.</p>
        <p><strong>Max size?</strong> 50 MB per file.</p>
      </Card>
    </div>
  );
}
