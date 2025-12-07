"use client";

import { useState, useRef, useEffect } from "react";
import { PDFDocument } from "pdf-lib";
import Link from "next/link";
import Script from "next/script";

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

// ✔ Structured data (kept minimal for tool component)
const schemaData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Image to PDF Converter - TaskGuru",
  description: "Convert JPG & PNG images into clean A4 PDF instantly for free.",
  url: "https://www.taskguru.online/tools/image-to-pdf",
  applicationCategory: "Utility",
};

// ⭐ SAFE CANVAS LOADER
const loadSafeCanvas = (file: File): Promise<{ preview: string; canvas: HTMLCanvasElement }> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        let w = img.width;
        let h = img.height;

        const MAX_SIDE = 1600;
        const scale = Math.min(MAX_SIDE / w, MAX_SIDE / h, 1);

        w *= scale;
        h *= scale;

        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;

        const ctx = canvas.getContext("2d");
        if (!ctx) return reject("Canvas context missing");

        ctx.drawImage(img, 0, 0, w, h);

        resolve({
          preview: canvas.toDataURL("image/jpeg", 0.9),
          canvas,
        });
      };

      img.onerror = () => reject("Image decode failed");
      img.src = event.target?.result as string;
    };

    reader.onerror = () => reject("File read error");
    reader.readAsDataURL(file);
  });

// ⭐ MAIN TOOL COMPONENT
export default function ImageToPdf() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);
  const [fileName, setFileName] = useState("");
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    return () => pdfUrl && URL.revokeObjectURL(pdfUrl);
  }, [pdfUrl]);

  // ⭐ Handle file upload
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
      alert("Failed to load image");
    }

    setLoading(false);
  };

  // ⭐ Convert to PDF
  const convertToPdf = async () => {
    if (!canvas) return;
    setLoading(true);

    try {
      const pdf = await PDFDocument.create();

      const A4_W = 595.28;
      const A4_H = 841.89;

      const imgBlob: Blob = await new Promise((res) =>
        canvas.toBlob((b) => res(b!), "image/jpeg", 0.9)
      );

      const bytes = new Uint8Array(await imgBlob.arrayBuffer());
      const embedded = await pdf.embedJpg(bytes);

      const scale = Math.min(A4_W / canvas.width, A4_H / canvas.height);
      const w = canvas.width * scale;
      const h = canvas.height * scale;

      const page = pdf.addPage([A4_W, A4_H]);

      page.drawImage(embedded, {
        x: (A4_W - w) / 2,
        y: (A4_H - h) / 2,
        width: w,
        height: h,
      });

      const pdfBytes = await pdf.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });

      if (pdfUrl) URL.revokeObjectURL(pdfUrl);
      setPdfUrl(URL.createObjectURL(blob));
    } catch {
      alert("Conversion failed");
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

  // ⭐ Reusable Tool card
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
      {/* JSON-LD Schema */}
      <Script
        id="schema-image-to-pdf"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* TOOL CARD */}
      <Card className="max-w-5xl mx-auto shadow-xl rounded-xl">
        <CardContent className="p-8">

          {!preview ? (
            // ⭐ Upload Section
            <div
              onClick={() => fileRef.current?.click()}
              className="p-10 border-2 border-dashed rounded-xl text-center cursor-pointer hover:border-primary transition"
            >
              <Upload className="w-12 h-12 mx-auto text-primary mb-4" />
              <p className="text-lg font-semibold">Upload Image</p>
              <p className="text-sm text-muted-foreground">JPG, PNG • Max 50MB</p>

              <Input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleUpload}
              />
            </div>
          ) : (
            // ⭐ Uploaded Preview + Summary
            <div className="grid md:grid-cols-2 gap-8">

              <div>
                <h3 className="font-semibold text-center mb-2">
                  Preview – {fileName}
                </h3>
                <div className="border rounded-xl min-h-[300px] flex items-center justify-center bg-muted">
                  <img src={preview} className="max-h-[360px] object-contain" />
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 border rounded-lg bg-muted/50">
                  <h4 className="font-semibold flex items-center gap-2 text-sm mb-2">
                    <FileText className="w-4 h-4 text-primary" />
                    Conversion Details
                  </h4>

                  <ul className="text-xs text-muted-foreground list-disc pl-4">
                    <li>Output: A4 PDF</li>
                    <li>Fully private — processed on your device</li>
                    <li>No watermark — free forever</li>
                  </ul>
                </div>
              </div>

            </div>
          )}
        </CardContent>

        {/* ⭐ Footer Buttons */}
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

      {/* ⭐ More Tools Section (No SEO content) */}
      <section className="max-w-6xl mx-auto px-4 mt-16">
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
    </>
  );
}
