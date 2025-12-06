"use client";

import { useState, useRef } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, Loader2, Trash2, Download } from "lucide-react";
import { PDFDocument } from "pdf-lib";

export default function ImageToPdf() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");
  const [pdfDataUri, setPdfDataUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const MAX_SIZE = 50 * 1024 * 1024; // 50MB

  // Upload Handler
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
      alert("Only JPG and PNG images are supported.");
      return;
    }

    if (file.size > MAX_SIZE) {
      alert("Image is too large. Maximum allowed size is 50MB.");
      return;
    }

    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = () => setImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  // Convert to PDF (Auto-fit)
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

      // Original size
      let { width, height } = img;

      // Auto-fit system
      const MAX_WIDTH = 1440;
      const MAX_HEIGHT = 1800;

      let scale = Math.min(MAX_WIDTH / width, MAX_HEIGHT / height);

      if (scale < 1) {
        width = width * scale;
        height = height * scale;
      }

      const page = pdfDoc.addPage([width, height]);

      page.drawImage(img, {
        x: 0,
        y: 0,
        width,
        height,
      });

      const pdfBytes = await pdfDoc.save();
      const uri =
        "data:application/pdf;base64," +
        btoa(String.fromCharCode(...pdfBytes));

      setPdfDataUri(uri);
      setLoading(false);
    } catch (error) {
      console.error(error);
      alert("Failed to convert image. Try again.");
      setLoading(false);
    }
  };

  // RESET
  const handleReset = () => {
    setImage(null);
    setPdfDataUri(null);
    setFileName("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="space-y-12 py-10">

      {/* PAGE HEADER */}
      <section className="text-center space-y-3">
        <h1 className="text-4xl font-extrabold">Image to PDF Converter</h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Convert JPG or PNG images into high-quality PDFs instantly.
          Private, fast & secure — everything happens inside your browser.
        </p>
      </section>

      {/* MID HEADING */}
      <h2 className="text-center text-2xl font-bold text-primary">
        Free Image to PDF Converter — Convert Images Instantly
      </h2>

      {/* MAIN TOOL CARD */}
      <Card className="w-full max-w-4xl mx-auto shadow-lg">
        <CardContent className="p-10">

          {!image ? (
            // UPLOAD UI
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
            // PREVIEW + BUTTONS
            <div className="flex flex-col items-center space-y-4">

              <img
                src={image}
                alt="Preview"
                className="max-h-96 rounded-lg border shadow-md object-contain"
              />

              <p className="text-sm text-muted-foreground">{fileName}</p>

              <div className="flex gap-4">
                <Button
                  onClick={convertToPdf}
                  disabled={loading}
                  className="w-40"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  ) : null}
                  {loading ? "Converting..." : "Convert to PDF"}
                </Button>

                <Button
                  variant="outline"
                  className="w-28"
                  onClick={handleReset}
                >
                  <Trash2 className="mr-2 w-4 h-4" /> Reset
                </Button>
              </div>

              {pdfDataUri && (
                <a
                  href={pdfDataUri}
                  download="converted.pdf"
                  className="text-primary underline font-semibold mt-2 flex items-center gap-2"
                >
                  <Download className="w-5 h-5" /> Download PDF
                </a>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* SEO CONTENT */}
      <Card className="max-w-4xl mx-auto p-8 shadow-xl border">
        <h2 className="text-2xl font-bold mb-4 text-primary">
          The Essential Guide to Image-to-PDF Conversion
        </h2>

        <p className="text-muted-foreground leading-relaxed">
          Image to PDF conversion is essential for students, professionals,
          freelancers, and businesses. Whether you're converting scanned notes,
          ID cards, receipts, or documents — PDF ensures universal compatibility.
        </p>

        <h3 className="text-xl font-semibold mt-6">How to Use This Tool</h3>
        <ol className="list-decimal ml-5 space-y-2 mt-2">
          <li>Upload a JPG or PNG image</li>
          <li>Preview it instantly</li>
          <li>Click “Convert to PDF”</li>
          <li>Download your PDF file</li>
        </ol>

        <h3 className="text-xl font-semibold mt-6">Common Uses</h3>
        <ul className="list-disc ml-5 space-y-2 mt-2">
          <li>Scanned documents</li>
          <li>eBook pages</li>
          <li>Assignments</li>
          <li>ID cards, certificates & receipts</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6">FAQ</h3>
        <p><strong>Is it free?</strong> Yes, fully free.</p>
        <p><strong>Do images upload to a server?</strong> No, processing is 100% local.</p>
        <p><strong>Max file size?</strong> 50 MB</p>
        <p><strong>Supported formats?</strong> JPG, JPEG, PNG</p>
      </Card>
    </div>
  );
}
