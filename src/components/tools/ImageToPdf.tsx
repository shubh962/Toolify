"use client";

import { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, Loader2, RefreshCw } from "lucide-react";
import { PDFDocument } from "pdf-lib";

export default function ImageToPdf() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");
  const [pdfDataUri, setPdfDataUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const MAX_SIZE = 50 * 1024 * 1024; // 50 MB

  // -------------------------
  // HANDLE UPLOAD
  // -------------------------
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
      alert("Only JPG, JPEG or PNG files allowed.");
      return;
    }

    if (file.size > MAX_SIZE) {
      alert("Image size must be less than 50 MB.");
      return;
    }

    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = () => setImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  // -------------------------
  // CONVERT TO PDF
  // -------------------------
  const convertToPdf = async () => {
    if (!image) return;

    try {
      setLoading(true);

      const pdfDoc = await PDFDocument.create();
      const base64 = image.split(",")[1];
      const bytes = Uint8Array.from(atob(base64), c => c.charCodeAt(0));

      let img;
      const isPng = image.startsWith("data:image/png");
      img = isPng ? await pdfDoc.embedPng(bytes) : await pdfDoc.embedJpg(bytes);

      // Autofit inside A4 page
      const A4_WIDTH = 595;
      const A4_HEIGHT = 842;

      let imgWidth = img.width;
      let imgHeight = img.height;

      const scale = Math.min(A4_WIDTH / imgWidth, A4_HEIGHT / imgHeight);

      imgWidth *= scale;
      imgHeight *= scale;

      const page = pdfDoc.addPage([A4_WIDTH, A4_HEIGHT]);
      page.drawImage(img, {
        x: (A4_WIDTH - imgWidth) / 2,
        y: (A4_HEIGHT - imgHeight) / 2,
        width: imgWidth,
        height: imgHeight,
      });

      const pdfBytes = await pdfDoc.save();
      const pdfBase64 = btoa(String.fromCharCode(...pdfBytes));

      const cleanName = fileName.replace(/\.[^/.]+$/, "");
      setPdfDataUri(`data:application/pdf;base64,${pdfBase64}#${cleanName}`);

      setLoading(false);
    } catch (err) {
      console.error(err);
      alert("PDF conversion failed.");
      setLoading(false);
    }
  };

  // RESET
  const resetAll = () => {
    setImage(null);
    setPdfDataUri(null);
    setFileName("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="space-y-16 py-10">

      {/* Title */}
      <div className="text-center space-y-3">
        <h1 className="text-4xl font-extrabold">Image to PDF Converter</h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Convert any camera photo, screenshot or document into a high-quality PDF — fast, private & 100% offline.
        </p>
      </div>

      {/* Purple Heading */}
      <h2 className="text-center text-2xl font-bold text-primary">
        Free Image to PDF Converter – Convert Images Instantly
      </h2>

      {/* Upload Box */}
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

              <div className="flex gap-4">
                <Button onClick={convertToPdf} disabled={loading}>
                  {loading && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
                  {loading ? "Converting..." : "Convert to PDF"}
                </Button>

                <Button
                  variant="outline"
                  onClick={resetAll}
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Reset
                </Button>
              </div>

              {pdfDataUri && (
                <a
                  href={pdfDataUri.split("#")[0]}
                  download={`${pdfDataUri.split("#")[1]}.pdf`}
                  className="text-primary underline font-semibold mt-2"
                >
                  Download PDF
                </a>
              )}
            </div>
          )}

        </CardContent>
      </Card>

      {/* SEO Content */}
      <Card className="max-w-4xl mx-auto p-8 shadow-xl border">
        <h2 className="text-2xl font-bold mb-4 text-primary">
          The Essential Guide to Image-to-PDF Conversion
        </h2>

        <p className="text-muted-foreground leading-relaxed">
          Converting images to PDF is essential for submitting documents, storing notes,
          sending files professionally, or sharing captured photos with proper formatting.
          This tool works offline, supports all images, and preserves clarity.
        </p>

        <h3 className="text-xl font-semibold mt-6">How to Use</h3>
        <ol className="list-decimal ml-5 space-y-2 mt-2">
          <li>Upload any JPG or PNG image.</li>
          <li>Preview the image instantly.</li>
          <li>Click “Convert to PDF”.</li>
          <li>Download your PDF file.</li>
        </ol>

        <h3 className="text-xl font-semibold mt-6">Common Uses</h3>
        <ul className="list-disc ml-5 space-y-2 mt-2">
          <li>Camera photos → clean PDF</li>
          <li>Handwritten notes</li>
          <li>Receipts & bills</li>
          <li>Assignments & documents</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6">FAQ</h3>

        <p><strong>Is it free?</strong> Yes, 100% free.</p>
        <p><strong>Is my image uploaded?</strong> No — everything happens inside your device.</p>
        <p><strong>Maximum file size?</strong> 50 MB.</p>
        <p><strong>Formats supported?</strong> JPG, JPEG, PNG.</p>
      </Card>

      {/* More Useful Tools */}
      <section className="py-16 bg-muted/30 mt-10">
        <h2 className="text-center text-2xl font-bold mb-4">
          Discover More Useful Tools
        </h2>
        <p className="text-center text-muted-foreground mb-10">
          Explore more free AI tools to simplify your workflow.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">

          <a href="/tools/background-remover" className="p-6 border rounded-xl shadow-sm hover:shadow-md transition bg-white">
            <h3 className="text-lg font-semibold">AI Background Remover</h3>
            <p className="text-muted-foreground text-sm mb-2">
              Remove background instantly using AI.
            </p>
            <span className="text-primary font-semibold">Remove Now →</span>
          </a>

          <a href="/tools/image-compressor" className="p-6 border rounded-xl shadow-sm hover:shadow-md transition bg-white">
            <h3 className="text-lg font-semibold">Image Compressor</h3>
            <p className="text-muted-foreground text-sm mb-2">
              Compress JPG/PNG without losing quality.
            </p>
            <span className="text-primary font-semibold">Compress Now →</span>
          </a>

          <a href="/tools/pdf-to-word" className="p-6 border rounded-xl shadow-sm hover:shadow-md transition bg-white">
            <h3 className="text-lg font-semibold">PDF to Word Converter</h3>
            <p className="text-muted-foreground text-sm mb-2">
              Convert PDF files into editable Word files.
            </p>
            <span className="text-primary font-semibold">Convert Now →</span>
          </a>

          <a href="/tools/merge-pdf" className="p-6 border rounded-xl shadow-sm hover:shadow-md transition bg-white">
            <h3 className="text-lg font-semibold">Merge PDF</h3>
            <p className="text-muted-foreground text-sm mb-2">
              Combine multiple PDFs into one.
            </p>
            <span className="text-primary font-semibold">Merge Now →</span>
          </a>

          <a href="/tools/text-paraphraser" className="p-6 border rounded-xl shadow-sm hover:shadow-md transition bg-white">
            <h3 className="text-lg font-semibold">AI Text Paraphraser</h3>
            <p className="text-muted-foreground text-sm mb-2">
              Rewrite content in seconds.
            </p>
            <span className="text-primary font-semibold">Paraphrase Now →</span>
          </a>

          <a href="/tools/image-to-text" className="p-6 border rounded-xl shadow-sm hover:shadow-md transition bg-white">
            <h3 className="text-lg font-semibold">Image to Text OCR</h3>
            <p className="text-muted-foreground text-sm mb-2">
              Extract text from images instantly.
            </p>
            <span className="text-primary font-semibold">Extract Now →</span>
          </a>

        </div>
      </section>

    </div>
  );
}
