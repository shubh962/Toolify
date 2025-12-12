// src/components/tools/ImageToPdf.tsx
"use client";

import { useState, useRef, useEffect } from "react";
// WARNING: pdf-lib MUST be imported dynamically in Next.js/React to prevent client-side build errors
// If the error persists, you must switch to Dynamic Import:
// const { PDFDocument } = await import('pdf-lib');
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
  Lock,
  Check,
  FileAxis3D,
  Zap, // Used for 'More Tools' section title
} from "lucide-react";

// Structured data (unchanged)
const schemaData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Image to PDF Converter - TaskGuru",
  description: "Convert JPG & PNG images into clean A4 PDF instantly for free.",
  url: "https://www.taskguru.online/tools/image-to-pdf",
  applicationCategory: "Utility",
};

// SAFE CANVAS LOADER (Unchanged)
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


// MAIN TOOL COMPONENT 
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

  // Handlers (Unchanged)
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

  const convertToPdf = async () => {
    if (!canvas) return;
    setLoading(true);

    try {
        // PDF-LIB logic remains the same
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
    } catch(error) {
      console.error("PDF Conversion Error:", error);
      alert("Conversion failed. Check browser console for details.");
    }

    setLoading(false);
  };

  const reset = () => {
    setPreview(null);
    setCanvas(null);
    setFileName("");
    if (pdfUrl) URL.revokeObjectURL(pdfUrl);
    setPdfUrl(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  // Reusable Tool card (Used in 'More Tools' section)
  const ToolCard = ({ icon: Icon, title, desc, href, cta }) => (
    <Link href={href} prefetch={false}>
      <div className="p-4 border rounded-xl hover:shadow-lg transition cursor-pointer bg-card dark:bg-gray-800 h-full">
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
          {cta} <MoveRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );

  return (
    <div className="container mx-auto py-10 md:py-16">
      {/* JSON-LD Schema */}
      <Script
        id="schema-image-to-pdf"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* 🌟 PROFESSIONAL HEADER 🌟 */}
      <header className="text-center mb-12">
        <div className="inline-flex items-center gap-3 p-3 bg-primary/10 rounded-full mb-3">
          <FileAxis3D className="w-6 h-6 text-primary" />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
          Image to PDF Converter
        </h1>
        <p className="mt-3 text-xl text-muted-foreground max-w-2xl mx-auto">
          Convert JPG, PNG, or WebP images into a perfectly formatted A4 PDF file for free.
        </p>
      </header>

      {/* TOOL CARD - Centered and Shadowed */}
      <Card className="max-w-5xl mx-auto shadow-2xl rounded-xl border-t-4 border-primary/50">
        <CardContent className="p-8">

          {!preview ? (
            // ⭐ Upload Section - Clean and Inviting
            <div
              onClick={() => fileRef.current?.click()}
              className="p-10 border-2 border-dashed rounded-xl text-center cursor-pointer hover:border-primary transition bg-muted/20 hover:bg-muted/50 min-h-[300px] flex flex-col items-center justify-center"
            >
              <Upload className="w-12 h-12 mx-auto text-primary mb-4" />
              <p className="text-lg font-bold text-foreground">Click to Upload Image to Convert</p>
              <p className="text-sm text-muted-foreground">JPG, PNG, WEBP • Max 50MB • Private Processing</p>

              <Input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleUpload}
              />
            </div>
          ) : (
            // ⭐ Uploaded Preview + Summary (Clean Layout)
            <div className="grid md:grid-cols-2 gap-8">

              <div>
                <h3 className="font-semibold text-center mb-2 text-foreground">
                  Preview – {fileName}
                </h3>
                <div className="border rounded-xl min-h-[300px] flex items-center justify-center bg-muted/50 p-4">
                  <img src={preview} className="max-h-[360px] object-contain rounded-lg shadow-inner" alt="Image preview for PDF conversion" />
                </div>
              </div>

              <div className="space-y-4 flex flex-col justify-between">
                <div className="p-4 border rounded-lg bg-card/50 shadow-inner">
                  <h4 className="font-semibold flex items-center gap-2 text-sm mb-2 text-primary">
                    <FileText className="w-4 h-4" />
                    Output Settings
                  </h4>

                  <ul className="text-sm text-muted-foreground list-disc pl-4 space-y-1">
                    <li>Output Format: Standard A4 PDF (Optimized for Printing)</li>
                    <li>Security: Client-side processing (100% Private)</li>
                    <li>License: No watermark, Free to use</li>
                  </ul>
                </div>
                
                <div className="mt-auto">
                    <Button 
                        onClick={convertToPdf} 
                        className="w-full bg-primary hover:bg-primary/90 text-lg py-6 shadow-lg transition-transform hover:scale-[1.01]"
                        disabled={loading || pdfUrl !== null}
                    >
                      {loading ? (
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      ) : (
                        <><FileText className="mr-2 h-5 w-5" /> Convert Image to PDF </>
                      )}
                    </Button>
                </div>

              </div>

            </div>
          )}
        </CardContent>

        {/* ⭐ Footer Buttons */}
        {preview && (
          <CardFooter className="flex justify-center gap-4 p-6 bg-muted/40 rounded-b-xl border-t">
            <Button variant="outline" onClick={reset}>
              <RotateCcw className="mr-2 h-4 w-4" /> Start New
            </Button>

            {pdfUrl && (
              <Button asChild className="bg-green-600 hover:bg-green-700">
                <a href={pdfUrl} download={`${fileName}.pdf`}>
                  <Download className="mr-2 h-4 w-4" /> Download PDF
                </a>
              </Button>
            )}
          </CardFooter>
        )}
      </Card>

      {/* 🚀 SEO CONTENT SECTION (Unchanged, Clean Pro Layout) */}
      <section className="max-w-5xl mx-auto px-4 mt-16 prose dark:prose-invert">
        <h2 className="text-3xl font-bold mb-4 text-foreground">
          The Best Free Image to PDF Converter Online
        </h2>
        <p>
          TaskGuru का **Image to PDF Converter** छात्रों, पेशेवरों और रचनाकारों के लिए JPG, PNG और अन्य इमेज फ़ाइलों को PDF दस्तावेज़ों में बदलने का सबसे आसान और सुरक्षित तरीका है। चाहे आपको **हस्तलिखित नोट्स** को कॉलेज सबमिशन के लिए एक PDF में मिलाना हो, या वेब इमेजेज़ को प्रिंट करने योग्य दस्तावेज़ों में बदलना हो, हमारा टूल उच्च गुणवत्ता वाले **A4 PDF** आउटपुट की गारंटी देता है।
        </p>

        <h3 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Lock className="w-5 h-5 text-green-600" /> सुरक्षा और विश्वसनीयता क्यों मायने रखती है? (E-A-T)
        </h3>
        <p>
          हम जानते हैं कि जब आप व्यक्तिगत दस्तावेज़ (जैसे स्कैन किए गए ID या नोट्स) अपलोड करते हैं तो गोपनीयता कितनी महत्वपूर्ण होती है। इसीलिए यह **JPG to PDF converter free** टूल <strong className="text-green-600">पूरी तरह से क्लाइंट-साइड (in your browser) पर काम करता है</strong>। आपकी फाइलें हमारे सर्वर पर **कभी अपलोड या स्टोर नहीं** की जाती हैं। यह आपकी गोपनीयता सुनिश्चित करने का सबसे विश्वसनीय तरीका है।
        </p>

        <h3 className="text-2xl font-semibold mt-8 flex items-center gap-2">
          <Check className="w-5 h-5 text-primary" /> मुख्य विशेषताएँ: JPG से PDF रूपांतरण
        </h3>
        <ul>
          <li>**ऑटो-A4 फ़ॉर्मेटिंग:** आउटपुट PDF को प्रिंटिंग के लिए आदर्श A4 साइज़ में स्वचालित रूप से फ़ॉर्मेट किया जाता है।</li>
          <li>**गुणवत्ता संरक्षण:** इमेज की क्वालिटी को बनाए रखा जाता है, जिससे आपका PDF क्रिस्प (crisp) दिखता है।</li>
          <li>**बहु-फ़ॉर्मेट समर्थन:** JPG, PNG, और WebP सहित सभी प्रमुख इमेज फ़ॉर्मेट को PDF में बदलें।</li>
          <li>**100% मुफ़्त और कोई वॉटरमार्क नहीं:** इस टूल का उपयोग बिना किसी सीमा या वॉटरमार्क के बार-बार करें।</li>
        </ul>

        <p className="mt-6 text-sm italic text-muted-foreground">
          **SEO Keywords:** <code>JPG to PDF online free</code>, <code>PNG to PDF converter A4</code>, <code>Convert image to PDF without watermark</code>.
        </p>
      </section>

      {/* ⭐ More Tools Section - Enhanced Professional Grid */}
      <section className="max-w-5xl mx-auto px-4 mt-16 pt-10 border-t border-muted">
        <h2 className="text-3xl font-bold text-center mb-10 flex items-center justify-center gap-3 text-foreground">
          <Zap className="w-6 h-6 text-primary" /> Explore More AI Productivity Tools
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <ToolCard
            icon={FileImage}
            title="Image Compressor"
            desc="Reduce file size without losing quality for faster submissions."
            href="/tools/image-compressor"
            cta="Compress Now"
          />
          <ToolCard
            icon={Scissors}
            title="Background Remover"
            desc="AI-powered tool for clean professional images (PNG output)."
            href="/tools/background-remover"
            cta="Remove BG"
          />
          <ToolCard
            icon={Merge}
            title="Merge PDF"
            desc="Combine multiple PDF documents easily into one file."
            href="/tools/merge-pdf"
            cta="Merge Files"
          />
          <ToolCard
            icon={FileTextIcon}
            title="PDF to Word"
            desc="Convert non-editable PDF files into editable Word documents."
            href="/tools/pdf-to-word"
            cta="Convert Now"
          />
          <ToolCard
            icon={ImageIcon}
            title="Image to Text OCR"
            desc="Extract text from scanned pages or photos instantly."
            href="/tools/image-to-text"
            cta="Extract Text"
          />
          <ToolCard
            icon={Highlighter}
            title="AI Paraphraser"
            desc="Rewrite text instantly for plagiarism check and clarity."
            href="/tools/text-paraphraser"
            cta="Rewrite Text"
          />
        </div>
      </section>
    </div>
  );
}
