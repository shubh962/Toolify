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
  const [fileName, setFileName] = useState("");
  const [pdfDataUri, setPdfDataUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const MAX_SIZE = 50 * 1024 * 1024; // 50 MB

  // ---------- helper: Uint8Array -> base64 (safe, no stack overflow) ----------
  const uint8ToBase64 = (bytes: Uint8Array): string => {
    let binary = "";
    const len = bytes.length;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  };

  // ---------- handle image upload ----------
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!["image/jpeg", "image/jpg", "image/png"].includes(file.type)) {
      alert("Only JPG, JPEG or PNG images are supported.");
      return;
    }

    if (file.size > MAX_SIZE) {
      const sizeInMB = (file.size / (1024 * 1024)).toFixed(1);
      alert(
        `This image is ${sizeInMB} MB. Maximum allowed size is 50 MB. Please use a smaller image.`
      );
      return;
    }

    setImageFile(file);
    setFileName(file.name);
    setPdfDataUri(null);

    const reader = new FileReader();
    reader.onload = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  // ---------- convert single image -> PDF ----------
  const convertToPdf = async () => {
    if (!imageFile) return;

    try {
      setLoading(true);
      setPdfDataUri(null);

      // 1) Read raw file bytes
      const arrayBuffer = await imageFile.arrayBuffer();
      const imgBytes = new Uint8Array(arrayBuffer);

      // 2) Create PDF + embed image
      const pdfDoc = await PDFDocument.create();

      let embeddedImg;
      if (imageFile.type === "image/png") {
        embeddedImg = await pdfDoc.embedPng(imgBytes);
      } else {
        // jpeg / jpg
        embeddedImg = await pdfDoc.embedJpg(imgBytes);
      }

      const { width, height } = embeddedImg;

      // 3) Add page same size as image
      const page = pdfDoc.addPage([width, height]);
      page.drawImage(embeddedImg, {
        x: 0,
        y: 0,
        width,
        height,
      });

      // 4) Get PDF bytes & make data URL safely
      const pdfBytes = await pdfDoc.save();
      const base64Pdf = uint8ToBase64(pdfBytes);
      const dataUri = `data:application/pdf;base64,${base64Pdf}`;

      setPdfDataUri(dataUri);
    } catch (error) {
      console.error("IMAGE→PDF ERROR:", error);
      alert(
        "Image too large to process in this browser session. Try compressing the image or using a lower-resolution version."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-12 py-10">
      {/* PAGE TITLE */}
      <section className="text-center space-y-3">
        <h1 className="text-4xl font-extrabold">Image to PDF Converter</h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Convert JPG or PNG images into high-quality PDF files instantly.
          Private, fast &amp; secure — all processing happens inside your
          browser.
        </p>
      </section>

      {/* PURPLE SUB-HEADING */}
      <h2 className="text-center text-2xl font-bold text-primary">
        Free Image to PDF Converter – Convert Images Instantly
      </h2>

      {/* UPLOAD + PREVIEW CARD */}
      <Card className="w-full max-w-4xl mx-auto shadow-lg">
        <CardContent className="p-10">
          {!imagePreview ? (
            <div
              className="flex flex-col items-center justify-center p-12 border-2 border-dashed rounded-xl cursor-pointer hover:border-primary transition"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="w-10 h-10 text-muted-foreground" />
              <p className="mt-4 font-semibold">
                Click to upload or drag &amp; drop
              </p>
              <p className="text-sm text-muted-foreground">
                JPG, JPEG, PNG • Max 50 MB
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
                src={imagePreview}
                alt="Preview"
                className="max-h-96 rounded-lg border shadow-md object-contain"
              />
              <p className="text-sm text-muted-foreground">{fileName}</p>

              <Button
                onClick={convertToPdf}
                className="w-full max-w-sm"
                disabled={loading}
              >
                {loading && (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                )}
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
          Image to PDF conversion is one of the most common document formatting
          needs for students, professionals, freelancers, and businesses.
          Whether you're submitting scanned notes, converting receipts, or
          preparing official documents — PDFs ensure universal compatibility
          across devices and platforms.
        </p>

        <h3 className="text-xl font-semibold mt-6">
          How to Use This Image to PDF Tool
        </h3>
        <ol className="list-decimal ml-5 space-y-2 mt-2">
          <li>Upload your JPG or PNG image using the upload box.</li>
          <li>Preview the image instantly on the screen.</li>
          <li>Click “Convert to PDF” to generate a PDF file.</li>
          <li>Download your ready-to-use PDF document.</li>
        </ol>

        <h3 className="text-xl font-semibold mt-6">Common Use Cases</h3>
        <ul className="list-disc ml-5 space-y-2 mt-2">
          <li>Convert scanned documents and notes into PDF</li>
          <li>Create e-books from image pages</li>
          <li>Submit school or college assignments as PDF</li>
          <li>Digitize certificates, ID cards &amp; receipts</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6">FAQ</h3>
        <p>
          <strong>Is it free?</strong> Yes, this Image to PDF Converter is 100%
          free to use.
        </p>
        <p>
          <strong>Are my images uploaded to a server?</strong> No — everything
          is processed locally in your browser. Files are never stored on our
          servers.
        </p>
        <p>
          <strong>Maximum file size?</strong> You can upload images up to{" "}
          <strong>50 MB</strong>.
        </p>
        <p>
          <strong>Supported formats?</strong> JPG, JPEG, and PNG are fully
          supported.
        </p>
      </Card>
    </div>
  );
}
