"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PDFDocument } from "pdf-lib";

export default function ImageToPdf() {
  const [image, setImage] = useState<string | null>(null);
  const [pdfDataUri, setPdfDataUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // 📌 Handle image upload
  const uploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  // ⚡ ULTRA-FAST CLIENT-SIDE IMAGE → PDF CONVERSION
  const convertToPdf = async () => {
    if (!image) return;

    try {
      setLoading(true);

      const pdfDoc = await PDFDocument.create();

      const base64 = image.split(",")[1];
      const binary = atob(base64);
      const len = binary.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binary.charCodeAt(i);
      }

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
      const pdfUri =
        "data:application/pdf;base64," +
        btoa(String.fromCharCode(...pdfBytes));

      setPdfDataUri(pdfUri);
      setLoading(false);
    } catch (error) {
      console.error(error);
      alert("Failed to convert image to PDF.");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-6">
      <Card>
        <CardContent>
          <h1 className="text-4xl font-bold text-center mb-4">
            Image to PDF Converter
          </h1>
          <p className="text-center text-muted-foreground mb-6">
            Convert JPG or PNG images into high-quality PDF files instantly.
            100% secure — all processing happens inside your browser.
          </p>

          <input
            type="file"
            accept="image/*"
            onChange={uploadImage}
            className="mb-4"
          />

          {image && (
            <img
              src={image}
              alt="Preview"
              className="rounded-md border mb-4 w-full"
            />
          )}

          <Button
            onClick={convertToPdf}
            disabled={!image || loading}
            className="w-full"
          >
            {loading ? "Converting..." : "Convert to PDF"}
          </Button>

          {pdfDataUri && (
            <a
              href={pdfDataUri}
              download="converted.pdf"
              className="block mt-4 text-center text-primary underline font-medium"
            >
              Download PDF
            </a>
          )}
        </CardContent>
      </Card>

      {/* SEO CONTENT BELOW */}
      <section className="prose max-w-none mt-12">
        <h2>Free Image to PDF Converter – Fast, Secure & Reliable</h2>
        <p>
          Toolify’s Image to PDF Converter is built for students, professionals,
          freelancers, teachers, and everyday users who need a fast and secure
          way to convert images into high-quality PDF documents. Because the
          entire conversion happens inside your browser, your images never leave
          your device — ensuring maximum privacy and instant performance.
        </p>

        <h3>Why Use Toolify’s Image to PDF Converter?</h3>
        <ul>
          <li>Lightning-fast PDF conversion</li>
          <li>No login, no signup, no watermark</li>
          <li>Privacy-first — files stay on your device</li>
          <li>High-quality output with original resolution</li>
          <li>Works on mobile, tablet, and desktop</li>
          <li>Completely free forever</li>
        </ul>

        <h3>Who Is This Tool For?</h3>
        <ul>
          <li>Students submitting homework or assignments</li>
          <li>Professionals converting documents to PDF</li>
          <li>Freelancers sending client work</li>
          <li>Designers exporting image previews</li>
          <li>Anyone needing clean, shareable PDFs</li>
        </ul>

        <h3>Common Use Cases</h3>
        <ul>
          <li>Convert scanned handwritten notes into a PDF</li>
          <li>Turn photos of receipts into a professional document</li>
          <li>Create simple eBooks from images</li>
          <li>Digitize certificates and IDs</li>
          <li>Submit documents in standardized PDF format</li>
        </ul>

        <h3>How Does It Work?</h3>
        <ol>
          <li>Upload any image (JPG, PNG)</li>
          <li>Preview the image instantly</li>
          <li>Click “Convert to PDF”</li>
          <li>Download your ready PDF file</li>
        </ol>

        <h2>Frequently Asked Questions (FAQ)</h2>

        <h3>Is this tool free?</h3>
        <p>Yes, completely free with no hidden limits.</p>

        <h3>Are my images uploaded to a server?</h3>
        <p>No. Everything is processed locally in your browser.</p>

        <h3>Does it work on iPhone or Android?</h3>
        <p>Yes, works perfectly on all modern devices.</p>

        <h3>What image types are supported?</h3>
        <p>JPG, JPEG, and PNG formats.</p>

        <h3>Is there a file size limit?</h3>
        <p>No strict limit — depends only on your device memory.</p>

        <h3>Will multi-image to PDF be added?</h3>
        <p>Yes! A batch converter is coming soon.</p>
      </section>
    </div>
  );
    }
      
