// ⭐ SERVER PART (Required for Google Indexing)
export const metadata = {
  title: "Image to PDF Converter Online | Free JPG/PNG to PDF Tool - TaskGuru",
  description:
    "Convert JPG, PNG, and photos into high-quality A4 PDF instantly. 100% free, secure, no login, no watermark. Works perfectly on mobile.",
  robots: "index, follow",
  alternates: {
    canonical: "https://www.taskguru.online/tools/image-to-pdf",
  },
  openGraph: {
    title: "Free Image to PDF Converter | JPG to PDF Online - TaskGuru",
    description:
      "Convert images into PDF instantly — secure, fast, free, and works locally in your browser.",
    url: "https://www.taskguru.online/tools/image-to-pdf",
    images: [
      {
        url: "https://www.taskguru.online/assets/image-to-pdf-og.png",
        width: 1200,
        height: 630,
      },
    ],
  },
};

"use client"; // ⭐ CLIENT MODE STARTS

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

// ⭐ JSON-LD SCHEMA for GOOGLE
const schemaData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Image to PDF Converter - TaskGuru",
  description:
    "Convert images (JPG, PNG, WEBP) to PDF instantly. No login. No watermark.",
  url: "https://www.taskguru.online/tools/image-to-pdf",
  applicationCategory: "Utility",
  operatingSystem: "All",
};

// ⭐ IMAGE LOADER (ORIGINAL LOGIC — UNTOUCHED)
const loadSafeCanvas = (
  file: File
): Promise<{ preview: string; canvas: HTMLCanvasElement }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        let w = img.width;
        let h = img.height;

        const MAX_SIDE = 1600;
        const scale = Math.min(MAX_SIDE / w, MAX_SIDE / h, 1);

        w = Math.round(w * scale);
        h = Math.round(h * scale);

        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;

        const ctx = canvas.getContext("2d");
        if (!ctx) return reject("Canvas error");

        ctx.drawImage(img, 0, 0, w, h);

        const preview = canvas.toDataURL("image/jpeg", 0.9);
        resolve({ preview, canvas });
      };

      img.onerror = () => reject("Failed decoding image");
      img.src = event.target?.result as string;
    };

    reader.onerror = () => reject("File reading failed");
    reader.readAsDataURL(file);
  });
};

// ⭐ MAIN PAGE COMPONENT
export default function ImageToPdf() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [preview, setPreview] = useState<string | null>(null);
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const MAX_FILE_SIZE = 50 * 1024 * 1024;

  useEffect(() => {
    return () => {
      if (pdfUrl) URL.revokeObjectURL(pdfUrl);
    };
  }, [pdfUrl]);

  // ⭐ UPLOAD HANDLER — UNTOUCHED
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) return alert("Only images allowed");
    if (file.size > MAX_FILE_SIZE) return alert("Max 50MB allowed");

    setLoading(true);
    try {
      const name = file.name.replace(/\.[^/.]+$/, "");
      setFileName(name);

      const { preview, canvas } = await loadSafeCanvas(file);
      setPreview(preview);
      setCanvas(canvas);

      if (pdfUrl) URL.revokeObjectURL(pdfUrl);
      setPdfUrl(null);
    } catch {
      alert("Failed to upload");
    }
    setLoading(false);
  };

  // ⭐ PDF CONVERSION — UNTOUCHED
  const convertToPdf = async () => {
    if (!canvas) return;

    setLoading(true);
    try {
      const pdfDoc = await PDFDocument.create();
      const A4_W = 595.28;
      const A4_H = 841.89;

      const imgBlob: Blob = await new Promise((res) =>
        canvas.toBlob((b) => res(b!), "image/jpeg", 0.9)
      );

      const bytes = new Uint8Array(await imgBlob.arrayBuffer());
      const embed = await pdfDoc.embedJpg(bytes);

      const iw = canvas.width;
      const ih = canvas.height;
      const scale = Math.min(A4_W / iw, A4_H / ih, 1);

      const w = iw * scale;
      const h = ih * scale;

      const page = pdfDoc.addPage([A4_W, A4_H]);
      page.drawImage(embed, {
        x: (A4_W - w) / 2,
        y: (A4_H - h) / 2,
        width: w,
        height: h,
      });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });

      if (pdfUrl) URL.revokeObjectURL(pdfUrl);
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
    } catch {
      alert("Conversion failed");
    }

    setLoading(false);
  };

  // ⭐ RESET — UNTOUCHED
  const handleReset = () => {
    setPreview(null);
    setCanvas(null);
    setFileName("");
    if (pdfUrl) URL.revokeObjectURL(pdfUrl);
    setPdfUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // ⭐ SMALL TOOL CARD COMPONENT
  const ToolLinkCard = ({ icon: Icon, title, description, href, ctaText }) => (
    <Link href={href}>
      <div className="p-5 border rounded-xl hover:shadow-lg transition cursor-pointer bg-white dark:bg-gray-900">
        <div className="flex items-start gap-3">
          <div className="p-3 bg-primary/10 rounded-full">
            <Icon className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="font-bold">{title}</h3>
            <p className="text-xs text-muted-foreground">{description}</p>
          </div>
        </div>
        <div className="mt-3 text-primary flex items-center text-sm">
          {ctaText} <MoveRight className="w-4 h-4 ml-1" />
        </div>
      </div>
    </Link>
  );

  // ⭐ PREMIUM REDESIGNED UI (FULLY WORKING)
  return (
    <>
      <Script
        type="application/ld+json"
        id="schema-image-to-pdf"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <div className="pt-10 space-y-14">

        {/* ⭐ HERO */}
        <section className="text-center space-y-3 max-w-3xl mx-auto px-4">
          <h1 className="text-4xl font-extrabold text-primary">
            Image to PDF Converter
          </h1>
          <p className="text-muted-foreground text-lg">
            Convert your JPG, PNG, or scanned notes into clean PDFs instantly — free & secure.
          </p>
        </section>

        {/* ⭐ TOOL CARD */}
        <Card className="max-w-5xl mx-auto shadow-xl rounded-xl">
          <CardContent className="p-8">

            {!preview ? (
              // ⭐ Upload Box
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer hover:border-primary transition"
              >
                <Upload className="w-12 h-12 mx-auto text-primary mb-4" />
                <p className="text-lg font-semibold">Upload Image</p>
                <p className="text-sm text-muted-foreground">
                  JPG, PNG • Max Size 50MB
                </p>
                <Input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleUpload}
                />
              </div>
            ) : (
              // ⭐ After Upload
              <div className="grid md:grid-cols-2 gap-8">

                <div>
                  <h3 className="font-semibold text-center mb-2">
                    Preview – {fileName}
                  </h3>
                  <div className="border rounded-xl bg-muted flex items-center justify-center min-h-[300px]">
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
                      <li>Secure client-side processing</li>
                    </ul>
                  </div>
                </div>

              </div>
            )}

          </CardContent>

          {preview && (
            <CardFooter className="flex justify-center gap-4 p-6 bg-muted/40 rounded-b-xl">
              <Button variant="outline" onClick={handleReset}>
                <RotateCcw className="mr-2 h-4 w-4" /> Reset
              </Button>

              {!pdfUrl ? (
                <Button onClick={convertToPdf}>
                  {loading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <>Convert to PDF</>
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

        {/* ⭐ MORE TOOLS */}
        <section className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-5 flex items-center justify-center gap-2">
            <Sparkles className="w-6 h-6 text-primary" /> Explore More Tools
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ToolLinkCard
              icon={FileImage}
              title="Image Compressor"
              description="Reduce image size without losing quality."
              href="/tools/image-compressor"
              ctaText="Compress"
            />
            <ToolLinkCard
              icon={Scissors}
              title="Background Remover"
              description="Remove background instantly with AI."
              href="/tools/background-remover"
              ctaText="Remove BG"
            />
            <ToolLinkCard
              icon={Merge}
              title="Merge PDF"
              description="Combine multiple PDFs into one."
              href="/tools/merge-pdf"
              ctaText="Merge"
            />
            <ToolLinkCard
              icon={FileTextIcon}
              title="PDF to Word"
              description="Convert PDF into Word file."
              href="/tools/pdf-to-word"
              ctaText="Convert"
            />
            <ToolLinkCard
              icon={ImageIcon}
              title="Image to Text OCR"
              description="Extract text from images."
              href="/tools/image-to-text"
              ctaText="Extract"
            />
            <ToolLinkCard
              icon={Highlighter}
              title="AI Paraphraser"
              description="Rewrite text clearly."
              href="/tools/text-paraphraser"
              ctaText="Rewrite"
            />
          </div>
        </section>

      </div>
    </>
  );
}
