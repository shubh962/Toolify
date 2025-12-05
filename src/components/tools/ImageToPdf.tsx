"use client";

import { useState, useRef } from "react";
import type React from "react";
import Script from "next/script";
import Link from "next/link";
import { PDFDocument } from "pdf-lib";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

import {
  Upload,
  Download,
  Loader2,
  Image as ImageIcon,
  Trash2,
  FileText,
  Zap,
  ShieldCheck,
} from "lucide-react";

// 🔥 Resize image safely for both mobile & desktop (max ~2500px)
async function resizeImage(
  imageBase64: string,
  maxSize = 2500
): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = imageBase64;

    img.onload = () => {
      let { width, height } = img;

      // Scale down if larger than maxSize
      if (width > maxSize || height > maxSize) {
        const scale = Math.min(maxSize / width, maxSize / height);
        width = width * scale;
        height = height * scale;
      }

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject("Canvas not supported");
        return;
      }

      ctx.drawImage(img, 0, 0, width, height);

      // Convert to JPEG with ~85% quality for good balance
      const optimized = canvas.toDataURL("image/jpeg", 0.85);
      resolve(optimized);
    };

    img.onerror = () => reject("Failed to load image");
  });
}

export default function ImageToPdf() {
  const { toast } = useToast();

  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [pdfDataUri, setPdfDataUri] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // ✅ Max 50MB allowed
  const MAX_SIZE_MB = 50;
  const SUPPORTED_TYPES = ["image/jpeg", "image/jpg", "image/png"];

  // 📂 Handle file upload
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Type check
    if (!SUPPORTED_TYPES.includes(file.type)) {
      toast({
        title: "Unsupported file type",
        description: "Only JPG, JPEG and PNG images are supported. HEIC is not supported yet.",
        variant: "destructive",
      });
      return;
    }

    // Size check (up to 50MB)
    const sizeMB = file.size / (1024 * 1024);
    if (sizeMB > MAX_SIZE_MB) {
      toast({
        title: "Image too large",
        description: `Maximum allowed size is ${MAX_SIZE_MB} MB. Your file is ${sizeMB.toFixed(
          2
        )} MB.`,
        variant: "destructive",
      });
      return;
    }

    setFileName(file.name.replace(/\.[^/.]+$/, "")); // remove extension
    setPdfDataUri(null);

    const reader = new FileReader();
    reader.onload = (e) => {
      setOriginalImage(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  // 📄 Convert to PDF (single-page)
  const handleConvert = async () => {
    if (!originalImage) {
      toast({
        title: "No image",
        description: "Please upload an image before converting.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      setPdfDataUri(null);

      // 1️⃣ Resize big images safely for mobile & desktop
      const safeImage = await resizeImage(originalImage, 2500);

      // 2️⃣ Create PDF
      const pdfDoc = await PDFDocument.create();
      const base64 = safeImage.split(",")[1];
      const bytes = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));

      const embeddedImg = await pdfDoc.embedJpg(bytes);
      const { width, height } = embeddedImg;

      const page = pdfDoc.addPage([width, height]);
      page.drawImage(embeddedImg, { x: 0, y: 0, width, height });

      const pdfBytes = await pdfDoc.save();
      const pdfUri =
        "data:application/pdf;base64," +
        btoa(String.fromCharCode(...pdfBytes));

      setPdfDataUri(pdfUri);

      toast({
        title: "PDF generated",
        description: "Your image has been converted into a PDF successfully.",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Conversion failed",
        description:
          "Something went wrong while converting. Try a smaller JPG/PNG image.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // ⬇ Download PDF
  const handleDownload = () => {
    if (!pdfDataUri) return;
    const link = document.createElement("a");
    link.href = pdfDataUri;
    link.download = `${fileName || "image"}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // ♻ Reset state
  const handleReset = () => {
    setOriginalImage(null);
    setPdfDataUri(null);
    setFileName(null);
    setIsLoading(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // ✅ SEO: FAQ + Tool schema (lightweight)
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Is the Image to PDF Converter free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Toolify’s Image to PDF converter is 100% free to use with no login or watermark.",
        },
      },
      {
        "@type": "Question",
        name: "What is the maximum supported image size?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can upload images up to 50 MB. Larger images are automatically optimized and resized for stable conversion.",
        },
      },
      {
        "@type": "Question",
        name: "Are my images uploaded or stored on your server?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. All processing happens directly in your browser. We do not store or upload your images.",
        },
      },
    ],
  };

  const toolSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Image to PDF Converter | Toolify",
    applicationCategory: "Utility",
    operatingSystem: "Any",
    url: "https://taskguru.online/tools/image-to-pdf",
    description:
      "Convert JPG, JPEG and PNG images (up to 50 MB) into high-quality PDF files using Toolify’s free online image to PDF converter.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  const Sparkles = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      {...props}
    >
      <path d="M12 2v2M4 12H2m20 0h-2M12 20v2m-7.07-7.07-1.41 1.41M19.07 4.93l-1.41 1.41M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41" />
    </svg>
  );

  return (
    <div className="space-y-12">
      {/* 📦 JSON-LD */}
      <Script
        id="tool-schema-image-to-pdf"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema) }}
      />
      <Script
        id="faq-schema-image-to-pdf"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Intro section (inside Tool page) */}
      <section className="max-w-4xl mx-auto py-4 text-center space-y-3">
        <h2 className="text-2xl md:text-3xl font-bold text-primary">
          Convert Any Image to PDF — Up to 50 MB
        </h2>
        <p className="text-base md:text-lg text-muted-foreground">
          Upload JPG, JPEG or PNG images of any size up to 50 MB. We{" "}
          <strong>automatically resize large images</strong> for safe, fast and
          high-quality PDF conversion on both mobile and desktop.
        </p>
      </section>

      {/* MAIN TOOL CARD - BackgroundRemover style UI */}
      <Card className="w-full max-w-4xl mx-auto shadow-lg">
        <CardContent className="p-6">
          {!originalImage ? (
            <div
              className="flex flex-col items-center justify-center space-y-4 p-10 border-2 border-dashed rounded-lg cursor-pointer hover:border-primary"
              onClick={() => fileInputRef.current?.click()}
              aria-label="Upload image to convert to PDF"
            >
              <div className="p-4 bg-secondary rounded-full">
                <Upload className="w-10 h-10 text-muted-foreground" />
              </div>
              <p className="font-semibold">Click to upload or drag & drop</p>
              <p className="text-sm text-muted-foreground">
                Supported: JPG, JPEG, PNG • Max size: {MAX_SIZE_MB} MB
              </p>
              <Input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept="image/jpeg,image/jpg,image/png"
                onChange={handleFileChange}
              />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Original view */}
              <div>
                <h3 className="text-lg font-semibold text-center">Original</h3>
                <div className="relative aspect-square border rounded-lg overflow-hidden bg-muted">
                  <img
                    src={originalImage}
                    alt="Uploaded original"
                    className="object-contain w-full h-full absolute top-0 left-0"
                  />
                </div>
              </div>

              {/* Result / PDF view */}
              <div>
                <h3 className="text-lg font-semibold text-center">PDF Output</h3>
                <div className="relative aspect-square border rounded-lg bg-muted overflow-hidden flex items-center justify-center">
                  {isLoading && (
                    <Loader2 className="w-12 h-12 animate-spin text-primary" />
                  )}

                  {!isLoading && pdfDataUri && (
                    <div className="flex flex-col items-center gap-2 px-4 text-center">
                      <FileText className="w-12 h-12 text-primary" />
                      <p className="text-sm text-muted-foreground">
                        Your PDF is ready. Click{" "}
                        <span className="font-semibold">Download PDF</span>{" "}
                        below to save it.
                      </p>
                    </div>
                  )}

                  {!isLoading && !pdfDataUri && (
                    <ImageIcon
                      className="w-12 h-12 text-muted-foreground"
                      aria-hidden="true"
                    />
                  )}
                </div>
              </div>
            </div>
          )}
        </CardContent>

        {/* Footer buttons */}
        {originalImage && (
          <CardFooter className="flex flex-wrap justify-center gap-4 bg-muted/50 border-t p-4">
            <Button variant="outline" onClick={handleReset}>
              <Trash2 className="mr-2 h-4 w-4" /> Reset
            </Button>
            <Button
              onClick={handleConvert}
              disabled={isLoading || !!pdfDataUri}
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="mr-2 h-4 w-4" />
              )}
              Convert to PDF
            </Button>
            <Button onClick={handleDownload} disabled={!pdfDataUri}>
              <Download className="mr-2 h-4 w-4" /> Download PDF
            </Button>
          </CardFooter>
        )}
      </Card>

      {/* SEO / Info Content */}
      <section className="max-w-4xl mx-auto py-10 p-6 bg-white dark:bg-gray-900 shadow-xl rounded-2xl border border-indigo-100 dark:border-indigo-900">
        <h2 className="text-3xl font-extrabold mb-8 text-center text-indigo-700 dark:text-indigo-400 flex items-center justify-center gap-3">
          <Zap className="w-6 h-6" /> Why Toolify’s Image to PDF Converter is Different
        </h2>

        <div className="space-y-6 text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          <p>
            Most online image-to-PDF tools either compress your image too much,
            upload it to unknown servers, or crash when you try uploading a big
            file. Toolify solves all of that with a{" "}
            <strong>browser-based, privacy-friendly converter</strong> that
            automatically handles even large images up to 50 MB.
          </p>

          <h3 className="text-2xl font-bold mt-4 mb-2">Key Benefits</h3>
          <ul className="list-disc list-outside ml-6 space-y-2">
            <li>Supports images from a few KBs up to 50 MB safely.</li>
            <li>
              Automatically resizes huge images (up to ~2500px) to prevent
              freezing or crashing on mobile devices.
            </li>
            <li>No watermark, no account required, no hidden paywalls.</li>
            <li>Everything runs inside your browser — images are never uploaded.</li>
            <li>Perfect for documents, notes, receipts, ID photos and more.</li>
          </ul>

          <h3 className="text-2xl font-bold mt-6 mb-2 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5" /> Built with Security & Privacy in Mind
          </h3>
          <p>
            Because processing is done locally, your images stay on your device.
            For further optimization, you can also use our{" "}
            <Link
              href="/tools/image-compressor"
              className="text-primary font-semibold hover:underline"
            >
              Image Compressor
            </Link>{" "}
            before converting to PDF if you want even smaller final file sizes.
          </p>

          <p className="pt-4 text-center font-semibold text-xl text-primary">
            In future, you’ll also be able to combine{" "}
            <strong>multiple images into a single multi-page PDF</strong> —
            stay tuned!
          </p>
        </div>
      </section>

      {/* FAQ section */}
      <section className="max-w-4xl mx-auto my-8 sm:my-12 p-6 bg-white dark:bg-gray-900 shadow rounded-lg border border-gray-100 dark:border-gray-800">
        <h2 className="text-xl sm:text-2xl font-bold mb-6 text-gray-900 dark:text-white">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6 text-left">
          {faqSchema.mainEntity.map((item: any, index: number) => (
            <div key={index} className="border-b pb-4 last:border-b-0">
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                {item.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                {item.acceptedAnswer.text}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
