"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PDFDocument } from "pdf-lib";

export default function ImageToPdf() {
  const [image, setImage] = useState<string | null>(null);
  const [pdfDataUri, setPdfDataUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState("");

  // ⭐ MAX SAFE SIZE = 5 MB
  const MAX_SIZE_MB = 5;

  const uploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileMB = file.size / (1024 * 1024);

    if (fileMB > MAX_SIZE_MB) {
      alert(
        `⚠️ Image too large!\n\nYour file: ${fileMB.toFixed(2)} MB\nAllowed: ${MAX_SIZE_MB} MB\n\nPlease compress the image and try again.`
      );
      return;
    }

    setFileName(file.name.replace(/\.[^/.]+$/, "")); // remove extension

    const reader = new FileReader();
    reader.onload = () => setImage(reader.result as string);
    reader.readAsDataURL(file);
  };

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

      // Auto-resize page for massive images (prevents crash)
      const maxWidth = 1500;
      const scale = img.width > maxWidth ? maxWidth / img.width : 1;

      const page = pdfDoc.addPage([img.width * scale, img.height * scale]);

      page.drawImage(img, {
        x: 0,
        y: 0,
        width: img.width * scale,
        height: img.height * scale,
      });

      const pdfBytes = await pdfDoc.save();
      const uri = "data:application/pdf;base64," + btoa(String.fromCharCode(...pdfBytes));

      setPdfDataUri(uri);
      setLoading(false);
    } catch (error) {
      console.error(error);

      alert(
        "❌ Failed to convert image.\n\nPossible reasons:\n• Image too large\n• Low device memory\n• Unsupported format (like HEIC)\n\nTry compressing the image or using a smaller one."
      );

      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-6">
      <Card className="shadow-lg border border-purple-200">
        <CardContent>

          {/* TITLE */}
          <h1 className="text-4xl font-extrabold text-center mb-3 bg-gradient-to-r from-purple-500 to-blue-600 bg-clip-text text-transparent">
            Image to PDF Converter
          </h1>

          <p className="text-center text-muted-foreground mb-6 text-lg">
            Convert JPG or PNG images into high-quality PDF files instantly.
            <br />
            <span className="font-semibold">Private, Fast & 100% Secure — all processing happens in your device.</span>
          </p>

          {/* FILE INPUT */}
          <div className="flex flex-col items-center mb-6">
            <input
              type="file"
              accept="image/*"
              onChange={uploadImage}
              className="block text-sm text-gray-600 cursor-pointer 
              file:mr-4 file:py-2 file:px-4 
              file:rounded-lg file:border-0 
              file:text-sm file:font-semibold 
              file:bg-purple-600 file:text-white 
              hover:file:bg-purple-700"
            />
            <p className="text-xs text-muted-foreground mt-2">
              Maximum size: <strong>5 MB</strong>
            </p>
          </div>

          {/* PREVIEW */}
          {image && (
            <div className="flex justify-center mb-4">
              <img
                src={image}
                alt="Preview"
                className="rounded-lg shadow-md border w-full max-w-lg"
              />
            </div>
          )}

          {/* BUTTON */}
          <Button
            onClick={convertToPdf}
            disabled={!image || loading}
            className="w-full py-4 text-lg font-semibold bg-purple-600 hover:bg-purple-700"
          >
            {loading ? "Converting..." : "Convert to PDF"}
          </Button>

          {/* DOWNLOAD */}
          {pdfDataUri && (
            <a
              href={pdfDataUri}
              download={`${fileName || "converted"}.pdf`}
              className="block mt-5 text-center text-blue-600 underline font-medium text-lg"
            >
              ⬇ Download PDF
            </a>
          )}
        </CardContent>
      </Card>

      {/* SEO CONTENT */}
      <section className="prose max-w-none mt-12">
        <h2>Free Image to PDF Converter – Fast, Secure & Reliable</h2>
        <p>
          Toolify’s Image to PDF Converter is a modern, browser-based tool built for
          students, professionals, teachers, freelancers, and everyday users who need a
          fast, secure, and high-quality PDF creator. No uploads, no tracking, and no
          watermarks — everything runs locally on your device.
        </p>

        <h3>Why This Tool Is Better</h3>
        <ul>
          <li>No login required</li>
          <li>Fully private — nothing is uploaded</li>
          <li>Maintains original resolution</li>
          <li>Instant performance</li>
          <li>Perfect for mobile, laptop, and tablets</li>
        </ul>

        <h3>Common Use Cases</h3>
        <ul>
          <li>Convert scanned notes to PDF</li>
          <li>Digital assignments for school/college</li>
          <li>Submit documents in PDF format</li>
          <li>Create eBooks from photos</li>
          <li>Convert receipts, ID cards & certificates</li>
        </ul>

        <h3>Frequently Asked Questions</h3>

        <h4>Is this tool free?</h4>
        <p>Yes, it is 100% free forever.</p>

        <h4>Do my files get uploaded to a server?</h4>
        <p>No, everything happens locally in your browser.</p>

        <h4>What is the size limit?</h4>
        <p>The maximum recommended image size is <strong>5 MB</strong>.</p>

        <h4>Will multi-image to PDF be added?</h4>
        <p>Yes — batch image-to-PDF support is coming soon.</p>
      </section>
    </div>
  );
}
