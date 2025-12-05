"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PDFDocument } from "pdf-lib";

export default function ImageToPdf() {
  const [image, setImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [pdfDataUri, setPdfDataUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const MAX_SIZE_MB = 5;
  const SUPPORTED_TYPES = ["image/jpeg", "image/jpg", "image/png"];

  // 📌 Upload Image
  const uploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // ❌ Unsupported type
    if (!SUPPORTED_TYPES.includes(file.type)) {
      alert("Only JPG, JPEG, PNG files are supported.");
      return;
    }

    // ❌ File too large
    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > MAX_SIZE_MB) {
      alert(`Image too large! Max allowed size is ${MAX_SIZE_MB} MB.`);
      return;
    }

    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = () => setImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  // 📌 Convert image → PDF
  const convertToPdf = async () => {
    if (!image) return;

    try {
      setLoading(true);

      const pdfDoc = await PDFDocument.create();
      const base64 = image.split(",")[1];
      const bytes = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));

      let embeddedImg;
      if (image.startsWith("data:image/png")) {
        embeddedImg = await pdfDoc.embedPng(bytes);
      } else {
        embeddedImg = await pdfDoc.embedJpg(bytes);
      }

      const page = pdfDoc.addPage([embeddedImg.width, embeddedImg.height]);

      page.drawImage(embeddedImg, {
        x: 0,
        y: 0,
        width: embeddedImg.width,
        height: embeddedImg.height,
      });

      const pdfBytes = await pdfDoc.save();
      const uri =
        "data:application/pdf;base64," +
        btoa(String.fromCharCode(...pdfBytes));

      setPdfDataUri(uri);
      setLoading(false);
    } catch (error) {
      console.error(error);
      alert("Failed to convert image to PDF. Try using a smaller image.");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4 md:px-6">

      {/* MAIN CARD */}
      <Card className="shadow-lg border rounded-2xl">
        <CardContent className="py-8">

          <h1 className="text-4xl font-extrabold text-center mb-3 text-primary">
            Image to PDF Converter
          </h1>

          <p className="text-center text-muted-foreground mb-6 text-lg">
            Convert JPG or PNG images into high-quality PDF files instantly.  
            <br/>100% secure — all processing happens on your device.
          </p>

          {/* FILE UPLOAD */}
          <div className="flex flex-col items-center">
            <input
              type="file"
              accept="image/png, image/jpeg"
              onChange={uploadImage}
              className="mb-3"
            />
            {fileName && (
              <p className="text-sm text-gray-600">
                <strong>Selected:</strong> {fileName}
              </p>
            )}
            <p className="text-xs text-gray-500 mt-1">
              Supported: JPG, JPEG, PNG | Max size: {MAX_SIZE_MB} MB
            </p>
          </div>

          {/* PREVIEW */}
          {image && (
            <img
              src={image}
              alt="Preview"
              className="rounded-lg border mt-6 mb-6 w-full shadow-sm"
            />
          )}

          {/* CONVERT BUTTON */}
          <Button
            onClick={convertToPdf}
            disabled={!image || loading}
            className="w-full py-3 text-lg"
          >
            {loading ? "Converting..." : "Convert to PDF"}
          </Button>

          {/* DOWNLOAD LINK */}
          {pdfDataUri && (
            <a
              href={pdfDataUri}
              download="converted.pdf"
              className="block mt-5 text-center text-primary font-semibold underline"
            >
              Download PDF
            </a>
          )}
        </CardContent>
      </Card>

      {/* SEO CONTENT SECTION */}
      <section className="mt-14 bg-white border rounded-2xl shadow-sm p-8 md:p-12 max-w-4xl mx-auto">
        <div className="prose max-w-none prose-headings:text-gray-900 prose-li:text-gray-700 prose-p:text-gray-700">

          <h2 className="text-3xl font-bold mb-6 text-center">
            Free Image to PDF Converter – Fast, Secure & Reliable
          </h2>

          <p className="leading-relaxed text-lg">
            Toolify’s Image to PDF Converter is built for students, professionals,
            freelancers, teachers, and anyone needing a clean, fast, and secure way
            to convert images into PDF documents. No uploads — everything is processed
            inside your browser, ensuring maximum privacy and instant performance.
          </p>

          <h3 className="text-2xl font-semibold mt-10 mb-3">⭐ Why This Tool Is Better</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>No login or signup required</li>
            <li>No watermark — 100% free forever</li>
            <li>Your image never leaves your device</li>
            <li>High-quality PDF output with original resolution</li>
            <li>Works on Android, iPhone, tablet & desktop</li>
            <li>Super fast conversion</li>
          </ul>

          <h3 className="text-2xl font-semibold mt-10 mb-3">📌 Supported Formats</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>JPG</li>
            <li>JPEG</li>
            <li>PNG</li>
          </ul>
          <p className="text-red-600 font-medium">
            HEIC (iPhone images) is currently not supported.
          </p>

          <h3 className="text-2xl font-semibold mt-8 mb-3">📏 Maximum File Size</h3>
          <p className="leading-relaxed text-lg">
            Maximum recommended image size is <strong>5 MB</strong>.
          </p>

          <h3 className="text-2xl font-semibold mt-10 mb-3">❓ Frequently Asked Questions (FAQ)</h3>

          <h4 className="text-xl font-semibold mt-6 mb-1">Is this tool free?</h4>
          <p>Yes, it's 100% free with no hidden limits.</p>

          <h4 className="text-xl font-semibold mt-6 mb-1">Do my files upload to a server?</h4>
          <p>No. Everything happens in your browser — nothing is uploaded.</p>

          <h4 className="text-xl font-semibold mt-6 mb-1">Does it work on mobile?</h4>
          <p>Yes, fully compatible with all Android & iPhone devices.</p>

          <h4 className="text-xl font-semibold mt-6 mb-1">Will batch image-to-PDF be added?</h4>
          <p>Yes — coming soon as a major update.</p>

        </div>
      </section>

    </div>
  );
}
