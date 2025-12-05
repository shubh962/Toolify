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

// 🔥 Helper: safely resize image before PDF (mobile-friendly)
async function resizeImage(
  imageBase64: string,
  maxWidth = 1600,
  maxHeight = 1600
): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = imageBase64;

    img.onload = () => {
      let { width, height } = img;

      if (width > maxWidth || height > maxHeight) {
        const scale = Math.min(maxWidth / width, maxHeight / height);
        width *= scale;
        height *= scale;
      }

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      if (!ctx) return reject("Canvas not supported");

      ctx.drawImage(img, 0, 0, width, height);

      // Convert to JPEG for stability & smaller size
      const resizedDataUrl = canvas.toDataURL("image/jpeg", 0.9);
      resolve(resizedDataUrl);
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

  const MAX_SIZE_MB = 5;
  const SUPPORTED_TYPES = ["image/jpeg", "image/jpg", "image/png"];

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!SUPPORTED_TYPES.includes(file.type)) {
      toast({
        title: "Unsupported format",
        description: "Only JPG, JPEG and PNG images are supported. HEIC is not supported.",
        variant: "destructive",
      });
      return;
    }

    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > MAX_SIZE_MB) {
      toast({
        title: "File too large",
        description: `Max ${MAX_SIZE_MB} MB allowed. Your file is ${fileSizeMB.toFixed(
          2
        )} MB.`,
        variant: "destructive",
      });
      return;
    }

    setFileName(file.name.replace(/\.[^/.]+$/, ""));
    setPdfDataUri(null);

    const reader = new FileReader();
    reader.onload = (e) => {
      setOriginalImage(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleConvert = async () => {
    if (!originalImage) {
      toast({
        title: "No image selected",
        description: "Please upload an image before converting to PDF.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      setPdfDataUri(null);

      // 1️⃣ Resize image for mobile stability
      const safeImage = await resizeImage(originalImage, 1600, 1600);

      const pdfDoc = await PDFDocument.create();
      const base64 = safeImage.split(",")[1];
      const bytes = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));

      const embeddedImg = await pdfDoc.embedJpg(bytes);
      const { width, height } = embeddedImg;

      const page = pdfDoc.addPage([width, height]);
      page.drawImage(embeddedImg, {
        x: 0,
        y: 0,
        width,
        height,
      });

      const pdfBytes = await pdfDoc.save();
      const pdfUri =
        "data:application/pdf;base64," +
        btoa(String.fromCharCode(...pdfBytes));

      setPdfDataUri(pdfUri);
      toast({
        title: "PDF ready",
        description: "Your image has been converted to PDF successfully.",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Conversion failed",
        description:
          "We couldn't convert this image. Try using a smaller JPG/PNG file.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (!pdfDataUri) return;
    const link = document.createElement("a");
    link.href = pdfDataUri;
    link.download = `${fileName || "image"}-to-pdf.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleReset = () => {
    setOriginalImage(null);
    setPdfDataUri(null);
    setFileName(null);
    setIsLoading(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // ✅ Optional: Basic structured data for SEO (non-breaking)
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Is this Image to PDF Converter free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, the Toolify Image to PDF converter is 100% free to use with no login or watermark.",
        },
      },
      {
        "@type": "Question",
        name: "Which image formats are supported?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "This tool supports JPG, JPEG and PNG image formats. HEIC is not supported yet.",
        },
      },
      {
        "@type": "Question",
        name: "Is my image uploaded to any server?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. All processing happens in your browser. Your files are not uploaded or stored on our servers.",
        },
      },
    ],
  };

  const toolSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Free Image to PDF Converter | Toolify",
    applicationCategory: "Utility",
    operatingSystem: "Any",
    url: "https://taskguru.online/tools/image-to-pdf",
    description:
      "Convert JPG and PNG images into high-quality PDF files with Toolify’s free online Image to PDF converter. Fast, secure, and no signup required.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    publisher: {
      "@type": "Organization",
      name: "Toolify",
      url: "https://taskguru.online",
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
      {/* ✅ JSON-LD Schema */}
      <Script
        id="image-to-pdf-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema) }}
      />
      <Script
        id="image-to-pdf-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Intro (inside tool area – ToolPage already has main h1) */}
      <section className="max-w-4xl mx-auto py-4 text-center space-y-3">
        <h2 className="text-2xl md:text-3xl font-bold text-primary">
          Convert Any Image to PDF in One Click
        </h2>
        <p className="text-base md:text-lg text-muted-foreground">
          Upload a JPG or PNG image, convert it into a high-quality PDF, and
          download instantly. Fast, secure and{" "}
          <strong>completely free — no signup required.</strong>
        </p>
      </section>

      {/* Main Tool Card */}
      <Card className="w-full max-w-4xl mx-auto shadow-lg">
        <CardContent className="p-6">
          {!originalImage ? (
            <div
              className="flex flex-col items-center justify-center space-y-4 p-10 border-2 border-dashed rounded-lg cursor-pointer hover:border-primary"
              onClick={() => fileInputRef.current?.click()}
              aria-label="Upload image to convert to PDF"
            >
              <div className="p-4 bg-secondary rounded-full">
                <Upload
                  className="w-10 h-10 text-muted-foreground"
                  aria-hidden="true"
                />
              </div>
              <p className="font-semibold">Click to upload or drag and drop</p>
              <p className="text-sm text-muted-foreground">
                Supported: JPG, JPEG, PNG (Max {MAX_SIZE_MB} MB)
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
              {/* Original */}
              <div>
                <h3 className="text-lg font-semibold text-center">Original</h3>
                <div className="relative aspect-square border rounded-lg overflow-hidden bg-muted">
                  <img
                    src={originalImage}
                    alt="Uploaded image"
                    className="object-contain w-full h-full absolute top-0 left-0"
                  />
                </div>
              </div>

              {/* Result */}
              <div>
                <h3 className="text-lg font-semibold text-center">Result (PDF)</h3>
                <div className="relative aspect-square border rounded-lg bg-muted overflow-hidden flex items-center justify-center">
                  {isLoading && (
                    <Loader2 className="w-12 h-12 animate-spin text-primary" />
                  )}
                  {!isLoading && pdfDataUri && (
                    <div className="flex flex-col items-center gap-2">
                      <FileText className="w-12 h-12 text-primary" />
                      <p className="text-sm text-muted-foreground text-center px-4">
                        Your PDF is ready. Click{" "}
                        <span className="font-semibold">Download</span> below to
                        save it.
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

        {originalImage && (
          <CardFooter className="flex flex-wrap justify-center gap-4 bg-muted/50 border-t p-4">
            <Button
              variant="outline"
              onClick={handleReset}
              aria-label="Reset uploaded image"
            >
              <Trash2 className="mr-2 h-4 w-4" /> Reset
            </Button>
            <Button
              onClick={handleConvert}
              disabled={isLoading || !!pdfDataUri}
              aria-label="Convert image to PDF"
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="mr-2 h-4 w-4" />
              )}
              Convert to PDF
            </Button>
            <Button
              onClick={handleDownload}
              disabled={!pdfDataUri || isLoading}
              aria-label="Download PDF file"
            >
              <Download className="mr-2 h-4 w-4" /> Download PDF
            </Button>
          </CardFooter>
        )}
      </Card>

      {/* SEO / High-Value Content Section */}
      <section className="max-w-4xl mx-auto py-10 p-6 bg-white dark:bg-gray-900 shadow-xl rounded-2xl border border-indigo-100 dark:border-indigo-900">
        <h2 className="text-3xl font-extrabold mb-8 text-center text-indigo-700 dark:text-indigo-400 flex items-center justify-center gap-3">
          <Zap className="w-6 h-6" /> Why Use Toolify’s Image to PDF Converter?
        </h2>

        <div className="space-y-6 text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          <p>
            Toolify’s Image to PDF Converter is designed for{" "}
            <strong>students, professionals, freelancers, and creators</strong>{" "}
            who want a clean, fast, and secure way to convert images into PDF
            files. Unlike heavy desktop apps or spammy websites, this tool runs
            directly in your browser and does not upload your files to any
            server.
          </p>

          <h3 className="text-2xl font-bold mt-8 mb-4 text-gray-800 dark:text-gray-200 border-b pb-2">
            1. Simple Step-by-Step Workflow
          </h3>
          <ol className="list-decimal list-inside ml-4 space-y-3">
            <li>Upload your JPG, JPEG, or PNG image.</li>
            <li>The tool optimizes and prepares it for PDF generation.</li>
            <li>Click on <strong>Convert to PDF</strong> to generate your file.</li>
            <li>Download the ready-to-use PDF instantly.</li>
          </ol>

          <h3 className="text-2xl font-bold mt-8 mb-4 text-gray-800 dark:text-gray-200 border-b pb-2">
            2. Perfect for Real-World Use Cases
          </h3>
          <ul className="list-disc list-outside ml-6 space-y-3">
            <li>Scan notes or handwritten pages and turn them into a PDF.</li>
            <li>Convert receipts or bills for expense tracking.</li>
            <li>Create simple e-books from image pages.</li>
            <li>Attach PDF documents in job applications or forms.</li>
            <li>Standardize image documents for office workflows.</li>
          </ul>

          <h3 className="text-2xl font-bold mt-8 mb-4 text-gray-800 dark:text-gray-200 border-b pb-2 flex items-center gap-2">
            <ShieldCheck className="h-5 w-5" /> Security & Privacy First
          </h3>
          <p>
            We follow a strict{" "}
            <strong>no-upload, no-storage approach</strong> for this tool. All
            operations happen inside your browser using secure, modern web
            technologies. For even more optimization, you can combine this with
            our{" "}
            <Link
              href="/tools/image-compressor"
              className="text-primary hover:underline font-semibold"
            >
              Image Compressor
            </Link>{" "}
            tool before or after PDF conversion.
          </p>

          <p className="pt-4 text-center font-semibold text-xl text-primary">
            Need to convert multiple images into a single PDF? Multi-page
            support is coming soon to Toolify.
          </p>
        </div>
      </section>

      {/* FAQ Section */}
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
