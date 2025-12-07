"use client";

import { useState, useRef, useEffect } from "react";
import Script from "next/script";
import Link from "next/link";
import { PDFDocument } from "pdf-lib";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Upload,
  Loader2,
  RotateCcw,
  FileText,
  Download,
  Sparkles,
  MoveRight,
  Image as ImageIcon,
  FileImage,
  Scissors,
  FileText as FileTextIcon,
  Merge,
  Highlighter,
} from "lucide-react";

// ⭐ JSON-LD Schema
const schemaData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Image to PDF Converter - Toolify",
  description: "Convert JPG and PNG images to clean A4 PDFs instantly. Free, secure, no login.",
  url: "https://www.taskguru.online/tools/image-to-pdf",
  applicationCategory: "Utility",
  operatingSystem: "All",
};

// ⭐ Safe Canvas Loader
const loadSafeCanvas = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = new Image();
      img.onload = () => {
        let w = img.width,
          h = img.height;

        const MAX_SIDE = 1600;
        const scale = Math.min(MAX_SIDE / w, MAX_SIDE / h, 1);

        w *= scale;
        h *= scale;

        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;

        const ctx = canvas.getContext("2d");
        if (!ctx) return reject("Canvas error");

        ctx.drawImage(img, 0, 0, w, h);

        resolve({ preview: canvas.toDataURL("image/jpeg", 0.9), canvas });
      };
      img.onerror = () => reject("Decode error");
      img.src = ev.target.result;
    };
    reader.onerror = () => reject("Read error");
    reader.readAsDataURL(file);
  });

// ⭐ MAIN COMPONENT
export default function ImageToPdf() {
  const fileRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const [canvas, setCanvas] = useState(null);
  const [fileName, setFileName] = useState("");
  const [pdfUrl, setPdfUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    return () => pdfUrl && URL.revokeObjectURL(pdfUrl);
  }, [pdfUrl]);

  // ⭐ Upload Handler
  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) return alert("Only images allowed");
    if (file.size > 50 * 1024 * 1024) return alert("Max 50MB allowed");

    setLoading(true);
    try {
      const base = file.name.replace(/\.[^/.]+$/, "");
      setFileName(base);

      const { preview, canvas } = await loadSafeCanvas(file);
      setPreview(preview);
      setCanvas(canvas);

      if (pdfUrl) URL.revokeObjectURL(pdfUrl);
      setPdfUrl(null);
    } catch {
      alert("Upload failed");
    }
    setLoading(false);
  };

  // ⭐ Convert Image → PDF
  const convertToPdf = async () => {
    if (!canvas) return;

    setLoading(true);
    try {
      const pdf = await PDFDocument.create();
      const A4_W = 595.28,
        A4_H = 841.89;

      const imgBlob = await new Promise((res) =>
        canvas.toBlob((b) => res(b), "image/jpeg", 0.9)
      );

      const bytes = new Uint8Array(await imgBlob.arrayBuffer());
      const embedded = await pdf.embedJpg(bytes);

      const scale = Math.min(A4_W / canvas.width, A4_H / canvas.height);
      const w = canvas.width * scale;
      const h = canvas.height * scale;

      const page = pdf.addPage([A4_W, A4_H]);
      page.drawImage(embedded, {
        x: (A4_W - w) / 2,
        y: (A4_H - h) / 2,  // ⭐ FIXED — no syntax error
        width: w,
        height: h,
      });

      const pdfBytes = await pdf.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });

      if (pdfUrl) URL.revokeObjectURL(pdfUrl);
      setPdfUrl(URL.createObjectURL(blob));
    } catch {
      alert("PDF conversion failed");
    }
    setLoading(false);
  };

  // ⭐ Reset
  const reset = () => {
    setPreview(null);
    setCanvas(null);
    setFileName("");
    if (pdfUrl) URL.revokeObjectURL(pdfUrl);
    setPdfUrl(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  // Card for More Tools
  const ToolCard = ({ icon: Icon, title, desc, href, cta }) => (
    <Link href={href}>
      <div className="p-4 border rounded-xl hover:shadow-md transition cursor-pointer bg-white dark:bg-gray-900">
        <div className="flex items-start gap-3">
          <div className="p-3 bg-primary/10 rounded-full">
            <Icon className="text-primary w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold">{title}</h3>
            <p className="text-xs text-muted-foreground">{desc}</p>
          </div>
        </div>
        <div className="mt-3 text-sm text-primary flex items-center">
          {cta} <MoveRight className="w-4 h-4 ml-1" />
        </div>
      </div>
    </Link>
  );

  return (
    <>
      <Script
        id="schema-image-to-pdf"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <div className="space-y-16 py-12">

        {/* ⭐ HERO SECTION */}
        <section className="text-center space-y-3 max-w-3xl mx-auto px-4">
          <h1 className="text-4xl font-extrabold text-primary">
            Image to PDF Converter
          </h1>
          <p className="text-muted-foreground text-lg">
            Convert JPG & PNG images to clean A4 PDF instantly — Free & Secure.
          </p>
        </section>

        {/* ⭐ TOOL CARD — (MAIN TOOL VISIBLE HERE) */}
        <Card className="max-w-5xl mx-auto shadow-xl rounded-xl">
          <CardContent className="p-8">
            {!preview ? (
              <div
                onClick={() => fileRef.current?.click()}
                className="p-10 border-2 border-dashed rounded-xl text-center cursor-pointer hover:border-primary transition"
              >
                <Upload className="w-12 h-12 mx-auto text-primary mb-4" />
                <p className="text-lg font-semibold">Upload Image</p>
                <p className="text-sm text-muted-foreground">
                  JPG, PNG • Max 50MB
                </p>
                <Input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleUpload}
                />
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-8">
                {/* Preview */}
                <div>
                  <h3 className="font-semibold text-center mb-2">
                    Preview – {fileName}
                  </h3>
                  <div className="border rounded-xl min-h-[300px] flex items-center justify-center bg-muted">
                    <img src={preview} className="max-h-[360px] object-contain" />
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg bg-muted/50">
                    <h4 className="font-semibold flex items-center gap-2 text-sm mb-2">
                      <FileText className="w-4 h-4 text-primary" />
                      Conversion Details
                    </h4>
                    <ul className="text-xs text-muted-foreground list-disc pl-4">
                      <li>Output: A4 PDF</li>
                      <li>Secure client-side processing</li>
                      <li>No watermark</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </CardContent>

          {preview && (
            <CardFooter className="flex justify-center gap-4 p-6 bg-muted/40 rounded-b-xl">
              <Button variant="outline" onClick={reset}>
                <RotateCcw className="mr-2 h-4 w-4" /> Reset
              </Button>

              {!pdfUrl ? (
                <Button onClick={convertToPdf}>
                  {loading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    "Convert to PDF"
                  )}
                </Button>
              ) : (
                <Button asChild>
                  <a href={pdfUrl} download={`${fileName}.pdf`}>
                    <Download className="mr-2 h-4 w-4" /> Download PDF
                  </a>
                </Button>
              )}
            </CardFooter>
          )}
        </Card>

        {/* ⭐⭐⭐ SEO CONTENT SECTION — BELOW TOOL (Correct Position) ⭐⭐⭐ */}
        <section className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-100 dark:border-gray-800 leading-relaxed space-y-6">

<h2 className="text-3xl font-bold">Why Convert Images to PDF? A Complete 2025 Guide</h2>
<p>
Many people need a simple and reliable way to convert images into PDF files. Whether you are a student submitting homework, a working professional handling documents, or someone who wants a clean digital record of photos, converting images to PDF has become a basic daily requirement. A PDF is more secure, more professional, and easier to share than loose image files.
</p>

<h3 className="text-2xl font-semibold mt-6">Benefits of Using an Image-to-PDF Converter</h3>
<ul className="list-disc list-outside ml-6 space-y-2">
  <li><strong>Professional formatting:</strong> A4-sized PDFs look clean and print-ready.</li>
  <li><strong>Easy to attach & upload:</strong> Many portals reject image uploads but accept PDFs.</li>
  <li><strong>Better organization:</strong> Multiple images can be stored in a single document.</li>
  <li><strong>Universal compatibility:</strong> Any device can open PDFs without losing quality.</li>
  <li><strong>More secure:</strong> PDFs can be locked, encrypted, and protected.</li>
</ul>

<h3 className="text-2xl font-semibold mt-6">Why Toolify’s Converter Is Different</h3>
<p>
Unlike other tools, Toolify performs all image processing <strong>inside your device</strong> using secure client-side technology. Your image is never uploaded to any server, ensuring 100% data privacy and instant processing.
</p>

<h3 className="text-2xl font-semibold mt-6">Common Uses</h3>
<ul className="list-disc ml-6 space-y-2">
  <li>Submitting documents like ID cards, certificates, and assignments</li>
  <li>Creating printable project PDFs</li>
  <li>Organizing receipts and scanned documents</li>
  <li>Sharing handwritten notes digitally</li>
  <li>Making professional multi-page PDFs</li>
</ul>

<h3 className="text-2xl font-semibold mt-6">Is It Safe?</h3>
<p>
Absolutely. Your images never leave your device. Everything happens locally, inside your browser.
</p>

<h3 className="text-2xl font-semibold mt-6">Final Thoughts</h3>
<p>
Toolify’s Image-to-PDF Converter is designed to be fast, simple, secure, and completely free. Whether you’re a student, a professional, or a casual user, this tool helps you create clean, high-quality PDFs in seconds.
</p>

<p className="font-semibold text-primary text-center text-xl mt-6">
Start converting your images to PDF now — quick, free, and secure.
</p>

        </section>

        {/* ⭐ MORE TOOLS SECTION */}
        <section className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-5 flex items-center justify-center gap-2">
            <Sparkles className="w-6 h-6 text-primary" /> Explore More Tools
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ToolCard
              icon={FileImage}
              title="Image Compressor"
              desc="Reduce image size without losing quality."
              href="/tools/image-compressor"
              cta="Compress"
            />
            <ToolCard
              icon={Scissors}
              title="Background Remover"
              desc="Remove background instantly using AI."
              href="/tools/background-remover"
              cta="Remove BG"
            />
            <ToolCard
              icon={Merge}
              title="Merge PDF"
              desc="Combine multiple PDFs into one."
              href="/tools/merge-pdf"
              cta="Merge"
            />
            <ToolCard
              icon={FileTextIcon}
              title="PDF to Word"
              desc="Convert PDF files into Word documents."
              href="/tools/pdf-to-word"
              cta="Convert"
            />
            <ToolCard
              icon={ImageIcon}
              title="Image to Text OCR"
              desc="Extract text from scanned pages."
              href="/tools/image-to-text"
              cta="Extract"
            />
            <ToolCard
              icon={Highlighter}
              title="AI Paraphraser"
              desc="Rewrite text instantly."
              href="/tools/text-paraphraser"
              cta="Rewrite"
            />
          </div>
        </section>
      </div>
    </>
  );
}
