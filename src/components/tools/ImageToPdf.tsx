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

  // IMAGE UPLOAD
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    reader.onload = () => setImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  // CONVERT IMAGE → PDF
  const convertToPdf = async () => {
    if (!image) return;

    try {
      setLoading(true);

      const pdfDoc = await PDFDocument.create();
      const base64 = image.split(",")[1];
      const bytes = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));

      let img;
      if (image.startsWith("data:image/png")) {
        img = await pdfDoc.embedPng(bytes);
      } else {
        img = await pdfDoc.embedJpg(bytes);
      }

      const page = pdfDoc.addPage([img.width, img.height]);

      page.drawImage(img, {
        x: 0,
        y: 0,
        width: img.width,
        height: img.height,
      });

      const pdfBytes = await pdfDoc.save();
      const uri = "data:application/pdf;base64," +
        btoa(String.fromCharCode(...pdfBytes));

      setPdfDataUri(uri);
      setLoading(false);
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Try using a smaller image.");
      setLoading(false);
    }
  };

  return (
    <div className="space-y-12 py-10">

      {/* PAGE TITLE */}
      <section className="text-center space-y-3">
        <h1 className="text-4xl font-extrabold">Image to PDF Converter</h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Convert JPG or PNG images into high-quality PDF files instantly. Fast, private & secure — processing happens inside your browser.
        </p>
      </section>

      {/* PURPLE MID HEADING */}
      <h2 className="text-center text-2xl font-bold text-primary">
        Free Image to PDF Converter – Convert Images Instantly
      </h2>

      {/* UPLOAD CARD */}
      <Card className="w-full max-w-4xl mx-auto shadow-lg">
        <CardContent className="p-10">

          {!image ? (
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
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                ) : null}
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

      {/* SEO CONTENT CARD */}
      <Card className="max-w-4xl mx-auto p-8 shadow-xl border">
        <h2 className="text-2xl font-bold mb-4 text-primary">
          The Essential Guide to Image-to-PDF Conversion
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          Image to PDF conversion is one of the most common document formatting needs for students, professionals, freelancers, and businesses. Whether you're submitting scanned notes, converting receipts, or preparing official documents — PDFs ensure universal compatibility across devices.
        </p>

        <h3 className="text-xl font-semibold mt-6">How to Use This Tool</h3>
        <ol className="list-decimal ml-5 space-y-2 mt-2">
          <li>Upload your JPG or PNG image.</li>
          <li>Preview the image instantly.</li>
          <li>Click “Convert to PDF”.</li>
          <li>Download your generated PDF file.</li>
        </ol>

        <h3 className="text-xl font-semibold mt-6">Common Uses</h3>
        <ul className="list-disc ml-5 space-y-2 mt-2">
          <li>Convert scanned documents into PDF</li>
          <li>Create e-books from image pages</li>
          <li>Submit school/college assignments</li>
          <li>Digitize certificates, ID cards & receipts</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6">FAQ</h3>

        <p><strong>Is it free?</strong> Yes, 100% free.</p>
        <p><strong>Are images uploaded to a server?</strong> No — everything is processed inside your browser.</p>
        <p>
          <strong>Maximum file size?</strong> Up to <strong>50 MB</strong>.
        </p>
        <p><strong>Supported formats?</strong> JPG, JPEG, PNG.</p>
      </Card>
    </div>
  );
}
