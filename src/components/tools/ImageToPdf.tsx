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
  Image as ImageIcon,
  Check,
  FileAxis3D,
  ShieldCheck,
  Zap,
  Briefcase,
  GraduationCap,
  Globe,
  Layers,
  HelpCircle,
  Scissors,
  FileImage,
  Merge,
  BrainCircuit,
  ScanText,
  MoveRight
} from "lucide-react";

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
    } catch (error) {
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

  const ToolCard = ({ icon: Icon, title, desc, href, cta, iconColor }: any) => (
    <Link href={href} prefetch={false} className="group">
      <div className="p-6 border rounded-xl hover:shadow-xl transition duration-300 bg-card dark:bg-gray-900 flex flex-col items-center text-center h-full">
          <Icon className={`w-8 h-8 mb-3 transition-colors ${iconColor} group-hover:text-primary`} />
          <h3 className="font-bold text-lg text-foreground mb-1">{title}</h3>
          <p className="text-sm text-muted-foreground mb-4 flex-grow">{desc}</p>
        
          <div className="mt-auto text-sm font-semibold text-primary group-hover:text-indigo-600 flex items-center">
            {cta} <MoveRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
          </div>
      </div>
    </Link>
  );

  return (
    <div className="container mx-auto px-4">
      
      {/* ❌ REMOVED: Duplicate Header Section */}
      {/* The Main Title is now handled by page.tsx */}

      {/* TOOL CARD - Added margin top (mt-8) for spacing */}
      <Card className="max-w-5xl mx-auto shadow-2xl rounded-3xl border-t-8 border-primary mt-8 overflow-hidden">
        <CardContent className="p-8 md:p-12">

          {!preview ? (
            // Upload Section
            <div
              onClick={() => fileRef.current?.click()}
              className="p-16 border-4 border-dashed rounded-3xl text-center cursor-pointer hover:border-primary transition-all bg-muted/20 hover:bg-primary/5 flex flex-col items-center justify-center group"
            >
              <div className="p-6 bg-white dark:bg-slate-800 rounded-full shadow-lg mb-6 group-hover:scale-110 transition-transform">
                 <Upload className="w-16 h-16 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Click to Upload Image</h2>
              <p className="text-lg text-muted-foreground">JPG, PNG, WEBP supported • Max 50MB</p>
              <div className="mt-6">
                 <span className="px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-bold shadow-md">Select from Device</span>
              </div>

              <Input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleUpload}
              />
            </div>
          ) : (
            // Preview & Convert Section
            <div className="grid md:grid-cols-2 gap-10">

              <div>
                <h3 className="font-bold text-center mb-4 text-foreground flex items-center justify-center gap-2">
                  <ImageIcon className="w-5 h-5 text-blue-500" /> Preview
                </h3>
                <div className="border-2 rounded-2xl min-h-[350px] flex items-center justify-center bg-muted/50 p-6 shadow-inner relative overflow-hidden">
                  <img src={preview} className="max-h-[400px] w-full object-contain rounded-lg shadow-lg" alt="Image preview" />
                </div>
              </div>

              <div className="flex flex-col justify-between space-y-6">
                 <div className="space-y-6">
                    <div className="p-6 border rounded-2xl bg-card/50 shadow-sm">
                      <h4 className="font-bold flex items-center gap-2 text-lg mb-4 text-primary">
                        <FileText className="w-5 h-5" />
                        Conversion Details
                      </h4>
                      <ul className="space-y-3 text-muted-foreground">
                        <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> File Name: <strong>{fileName}</strong></li>
                        <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> Output: <strong>Standard A4 PDF</strong></li>
                        <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> Quality: <strong>High (Optimized)</strong></li>
                        <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> Privacy: <strong>Client-Side Only</strong></li>
                      </ul>
                    </div>
                 </div>
                
                <div className="mt-auto space-y-4">
                    {!pdfUrl ? (
                        <Button 
                            onClick={convertToPdf} 
                            className="w-full bg-primary hover:bg-primary/90 text-xl py-8 shadow-xl transition-all hover:scale-[1.02] rounded-2xl"
                            disabled={loading}
                        >
                          {loading ? (
                            <><Loader2 className="mr-3 h-6 w-6 animate-spin" /> Processing...</>
                          ) : (
                            <><FileAxis3D className="mr-3 h-6 w-6" /> Convert to PDF</>
                          )}
                        </Button>
                    ) : (
                        <Button asChild className="w-full bg-green-600 hover:bg-green-700 text-xl py-8 shadow-xl transition-all hover:scale-[1.02] rounded-2xl">
                            <a href={pdfUrl} download={`${fileName}.pdf`}>
                              <Download className="mr-3 h-6 w-6" /> Download PDF Now
                            </a>
                        </Button>
                    )}
                    
                    <Button variant="ghost" onClick={reset} className="w-full text-muted-foreground hover:text-red-500">
                        <RotateCcw className="mr-2 h-4 w-4" /> Start Over
                    </Button>
                </div>

              </div>

            </div>
          )}
        </CardContent>
      </Card>
      
      {/* 🌟 DISCOVER MORE TOOLS 🌟 */}
      <section className="max-w-5xl mx-auto px-4 mt-24 pt-10 border-t border-muted">
        <div className="text-center mb-10">
            <h2 className="text-3xl font-black tracking-tight text-foreground">
                Enhance Your Workflow
            </h2>
            <p className="text-muted-foreground mt-2 text-lg">
                Explore our full suite of free, privacy-focused productivity tools.
            </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <ToolCard icon={Scissors} iconColor="text-indigo-600" title="AI Background Remover" desc="Remove background from any image instantly." href="/tools/background-remover" cta="Remove Now" />
            <ToolCard icon={FileImage} iconColor="text-green-600" title="Image Compressor" desc="Compress JPG, PNG, WebP without quality loss." href="/tools/image-compressor" cta="Compress Now" />
            <ToolCard icon={FileTextIcon} iconColor="text-red-600" title="PDF to Word" desc="Convert PDF files into editable Word docs." href="/tools/pdf-to-word" cta="Convert Now" />
            <ToolCard icon={Merge} iconColor="text-purple-600" title="Merge PDF" desc="Combine multiple PDFs into one document." href="/tools/merge-pdf" cta="Merge Now" />
            <ToolCard icon={BrainCircuit} iconColor="text-blue-600" title="AI Text Paraphraser" desc="Rewrite text for unique content." href="/tools/text-paraphraser" cta="Paraphrase Now" />
            <ToolCard icon={ScanText} iconColor="text-yellow-600" title="Image to Text OCR" desc="Extract text from scanned photos." href="/tools/image-to-text" cta="Extract Now" />
        </div>
      </section>

      {/* 🚀 SEO CONTENT (English Global Keywords) */}
      <article className="max-w-4xl mx-auto mt-24 space-y-16 text-gray-700 dark:text-gray-300 leading-relaxed font-sans">
        
        {/* Intro */}
        <section className="space-y-6 text-center">
            <h2 className="text-4xl font-black text-gray-900 dark:text-white">
                The Ultimate Free Image to PDF Converter
            </h2>
            <p className="text-xl">
                In today's digital workflow, sending scattered JPEG or PNG files is unprofessional. Whether you are applying for a job, submitting college assignments, or archiving receipts, a single, clean PDF file is the gold standard. <strong>TaskGuru's Image to PDF Converter</strong> allows you to transform your photos into a professional document instantly—directly in your browser.
            </p>
        </section>

        {/* Why Use This Tool */}
        <section className="grid md:grid-cols-2 gap-10">
            <div className="bg-blue-50 dark:bg-blue-900/10 p-8 rounded-3xl border border-blue-100 dark:border-blue-800">
                <h3 className="text-2xl font-bold mb-4 text-blue-800 dark:text-blue-200 flex items-center gap-2">
                    <ShieldCheck className="w-6 h-6" /> Privacy First Architecture
                </h3>
                <p>
                    Most online converters require you to upload your personal files to their servers. This creates a privacy risk. TaskGuru is different. We use <strong>Client-Side WebAssembly</strong> technology. This means the conversion happens <strong>100% on your device</strong>. Your sensitive documents (ID proofs, medical records, contracts) never leave your computer.
                </p>
            </div>
            <div className="bg-green-50 dark:bg-green-900/10 p-8 rounded-3xl border border-green-100 dark:border-green-800">
                <h3 className="text-2xl font-bold mb-4 text-green-800 dark:text-green-200 flex items-center gap-2">
                    <Zap className="w-6 h-6" /> Zero Latency Speed
                </h3>
                <p>
                    Because we don't upload your files to a cloud server, there is no waiting for "uploading" or "processing" queues. The conversion is instantaneous. Whether you have a 1MB file or a 50MB high-resolution scan, TaskGuru converts it in milliseconds.
                </p>
            </div>
        </section>

        {/* Step by Step Guide */}
        <section>
            <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">How to Convert Images to PDF Online?</h2>
            <div className="space-y-6">
                <div className="flex gap-6 items-start">
                    <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xl flex-shrink-0">1</div>
                    <div>
                        <h4 className="text-xl font-bold text-foreground">Upload Your Photo</h4>
                        <p>Click the upload box or drag and drop your image file. We support all major formats including JPG, JPEG, PNG, and WebP. There is no limit on resolution.</p>
                    </div>
                </div>
                <div className="flex gap-6 items-start">
                    <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xl flex-shrink-0">2</div>
                    <div>
                        <h4 className="text-xl font-bold text-foreground">Automatic Optimization</h4>
                        <p>Our smart engine automatically centers your image and fits it into a standard A4 page layout (210mm x 297mm). This ensures your PDF looks perfect when printed on any standard printer.</p>
                    </div>
                </div>
                <div className="flex gap-6 items-start">
                    <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xl flex-shrink-0">3</div>
                    <div>
                        <h4 className="text-xl font-bold text-foreground">Download & Share</h4>
                        <p>Click the "Convert to PDF" button, and within a split second, your download link is ready. Save the file to your device and share it via email or WhatsApp.</p>
                    </div>
                </div>
            </div>
        </section>

        {/* FAQ Section */}
        <section className="border-t border-muted pt-16">
            <h2 className="text-3xl font-bold mb-10 text-center text-foreground flex items-center justify-center gap-3">
                <HelpCircle className="w-8 h-8 text-primary" /> Frequently Asked Questions
            </h2>
            <div className="space-y-6">
                <div className="border border-gray-200 dark:border-gray-700 rounded-2xl p-6 bg-card">
                    <h3 className="text-lg font-bold text-foreground mb-2">Is this Image to PDF converter really free?</h3>
                    <p className="text-muted-foreground">Yes! TaskGuru is committed to providing free, high-quality tools. There are no hidden costs, no premium subscriptions, and no limits on how many times you can use the tool.</p>
                </div>
                <div className="border border-gray-200 dark:border-gray-700 rounded-2xl p-6 bg-card">
                    <h3 className="text-lg font-bold text-foreground mb-2">Does it support PNG and WebP formats?</h3>
                    <p className="text-muted-foreground">Absolutely. While many tools only support JPG, TaskGuru supports PNG (ideal for screenshots with text) and WebP (modern web images). Our engine automatically handles transparency and conversion logic.</p>
                </div>
                <div className="border border-gray-200 dark:border-gray-700 rounded-2xl p-6 bg-card">
                    <h3 className="text-lg font-bold text-foreground mb-2">Do I need to install software?</h3>
                    <p className="text-muted-foreground">No. This is a cloud-native web application. It works directly in your browser (Chrome, Safari, Firefox, Edge). You can use it on your mobile phone, tablet, or laptop without installing any apps or extensions.</p>
                </div>
            </div>
        </section>

      </article>
    </div>
  );
}

