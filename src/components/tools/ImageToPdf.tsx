"use client";

import { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, Loader2, RotateCcw } from "lucide-react";
import { PDFDocument, StandardFonts } from "pdf-lib";

export default function ImageToPdf() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");
  const [pdfDataUri, setPdfDataUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const MAX_SIZE = 50 * 1024 * 1024; // 50MB

  // ✅ CLEAN + RESIZE IMAGE BEFORE PDF CONVERSION
  const cleanAndResizeImage = (base64: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = base64;

      img.onload = () => {
        let { width, height } = img;
        const MAX_RES = 2000;

        // Resize if too large
        if (width > MAX_RES || height > MAX_RES) {
          const scale = MAX_RES / Math.max(width, height);
          width = width * scale;
          height = height * scale;
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d", { alpha: false });
        if (!ctx) return reject("Canvas error");

        // White background (fix PNG transparency + corrupted EXIF)
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, width, height);

        ctx.drawImage(img, 0, 0, width, height);

        // Output clean JPEG
        const cleanBase64 = canvas.toDataURL("image/jpeg", 0.9);
        resolve(cleanBase64);
      };

      img.onerror = () => reject("Failed to load image");
    });
  };

  // 📤 HANDLE FILE UPLOAD
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
      alert("Only JPG and PNG images are supported.");
      return;
    }

    if (file.size > MAX_SIZE) {
      alert("Image too large. Max allowed is 50MB.");
      return;
    }

    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  // 📝 RESET TOOL
  const resetAll = () => {
    setImagePreview(null);
    setPdfDataUri(null);
    setLoading(false);
    setFileName("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // 🔄 CONVERT IMAGE → PDF
  const convertToPdf = async () => {
    if (!imagePreview) return;

    try {
      setLoading(true);

      // STEP 1 – Clean + Resize Image
      const cleanedImage = await cleanAndResizeImage(imagePreview);

      // STEP 2 – Create PDF Document (A4)
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage([595, 842]); // A4 Size in points

      const jpegImageBytes = Uint8Array.from(
        atob(cleanedImage.split(",")[1]),
        (c) => c.charCodeAt(0)
      );

      const embeddedImage = await pdfDoc.embedJpg(jpegImageBytes);

      const imgWidth = embeddedImage.width;
      const imgHeight = embeddedImage.height;

      const pageWidth = page.getWidth();
      const pageHeight = page.getHeight();

      // STEP 3 – AUTO-FIT IMAGE ON A4
      const scale = Math.min(pageWidth / imgWidth, pageHeight / imgHeight);

      const finalW = imgWidth * scale;
      const finalH = imgHeight * scale;

      page.drawImage(embeddedImage, {
        x: (pageWidth - finalW) / 2,
        y: (pageHeight - finalH) / 2,
        width: finalW,
        height: finalH,
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

  return (
    <div className="space-y-12 py-10">

      {/* TITLE */}
      <section className="text-center space-y-3">
        <h1 className="text-4xl font-extrabold">Image to PDF Converter</h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Convert JPG or PNG images into high-quality PDF files instantly.
          Fast, secure — everything happens inside your browser.
        </p>
      </section>

      {/* Mid Heading */}
      <h2 className="text-center text-2xl font-bold text-primary">
        Free Image to PDF Converter – Convert Images Instantly
      </h2>

      {/* MAIN CARD */}
      <Card className="w-full max-w-4xl mx-auto shadow-lg">
        <CardContent className="p-10">

          {!imagePreview ? (
            // Upload Box
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
            <>
              <div className="flex flex-col items-center space-y-4">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="max-h-96 rounded-lg border shadow-md object-contain"
                />

                <p className="text-sm text-muted-foreground">{fileName}</p>

                {/* Buttons */}
                <div className="flex gap-4 mt-4">
                  <Button
                    onClick={convertToPdf}
                    className="w-40"
                    disabled={loading}
                  >
                    {loading ? (
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    ) : null}
                    {loading ? "Converting..." : "Convert to PDF"}
                  </Button>

                  <Button
                    variant="outline"
                    onClick={resetAll}
                    className="w-32"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" /> Reset
                  </Button>
                </div>

                {/* PDF Download */}
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
            </>
          )}
        </CardContent>
      </Card>

      {/* SEO Content */}
      <Card className="max-w-4xl mx-auto p-8 shadow-xl border">
        <h2 className="text-2xl font-bold mb-4 text-primary">
          The Essential Guide to Image-to-PDF Conversion
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          Image to PDF conversion is one of the most common document formatting
          needs for students, professionals, freelancers, and businesses.
          Whether you're submitting scanned notes, converting receipts, or preparing
          official documents — PDFs ensure universal compatibility.
        </p>

        <h3 className="text-xl font-semibold mt-6">How to Use This Tool</h3>
        <ol className="list-decimal ml-5 space-y-2 mt-2">
          <li>Upload your JPG or PNG image.</li>
          <li>Preview the image instantly.</li>
          <li>Click “Convert to PDF”.</li>
          <li>Download your PDF file.</li>
        </ol>

        <h3 className="text-xl font-semibold mt-6">Common Uses</h3>
        <ul className="list-disc ml-5 space-y-2 mt-2">
          <li>Scanned documents</li>
          <li>E-book pages</li>
          <li>Assignments</li>
          <li>Certificates, ID cards, receipts</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6">FAQ</h3>
        <p><strong>Is it free?</strong> Yes, always.</p>
        <p><strong>Is anything uploaded?</strong> No — everything is 100% local.</p>
        <p><strong>Max size?</strong> 50MB.</p>
        <p><strong>Formats?</strong> JPG, JPEG, PNG.</p>
      </Card>
    </div>
  );
}
