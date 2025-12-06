"use client";

import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Upload,
    Loader2,
    RotateCcw,
    FileText,
    Download,
    MoveRight, // नए टूल सेक्शन के लिए आइकन
    Sparkles, // नए टूल सेक्शन के लिए आइकन
    ImageIcon,
    FileImage,
    Scissors,
    FileText as FileTextIcon,
    FileSliders,
    Merge,
    Highlighter,
} from "lucide-react";
import { PDFDocument } from "pdf-lib";
import Link from 'next/link'; // Link कंपोनेंट जोड़ा गया

// ... [loadSafeCanvas function UNTOUCHED] ...

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

        // Keep quality good but safe for mobile – max side 1600px
        const MAX_SIDE = 1600;
        const scale = Math.min(MAX_SIDE / w, MAX_SIDE / h, 1);

        w = Math.round(w * scale);
        h = Math.round(h * scale);

        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject("Canvas context not available.");
          return;
        }

        ctx.drawImage(img, 0, 0, w, h);

        // Clean JPEG preview (no EXIF)
        const preview = canvas.toDataURL("image/jpeg", 0.9);

        resolve({ preview, canvas });
      };

      img.onerror = () => reject("Image decode failed.");
      img.src = event.target?.result as string;
    };

    reader.onerror = () => reject("File read error.");
    reader.readAsDataURL(file);
  });
};


export default function ImageToPdf() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [preview, setPreview] = useState<string | null>(null);
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50 MB

  // 🔁 Clean up old object URLs - UNTOUCHED
  useEffect(() => {
    return () => {
      if (pdfUrl) URL.revokeObjectURL(pdfUrl);
    };
  }, [pdfUrl]);

  // 📂 Handle file upload - LOGIC UNTOUCHED
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Only image files are allowed.");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      alert("File size must be under 50 MB.");
      return;
    }

    setLoading(true);
    try {
      const baseName = file.name.replace(/\.[^/.]+$/, "");
      setFileName(baseName);
      const { preview, canvas } = await loadSafeCanvas(file);
      setPreview(preview);
      setCanvas(canvas);
      // clear old pdf url if any
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
        setPdfUrl(null);
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("Failed to load image. Please try a different file.");
    }
    setLoading(false);
  };

  // 🧾 Convert image → PDF (using Blob, NO base64) - LOGIC UNTOUCHED
  const convertToPdf = async () => {
    if (!canvas) return;
    setLoading(true);
    try {
      const pdfDoc = await PDFDocument.create();
      // A4 in points
      const A4_W = 595.28;
      const A4_H = 841.89;
      // Canvas → JPEG blob (clean, no EXIF)
      const imgBlob: Blob = await new Promise((resolve, reject) => {
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject("Failed to create image blob.");
              return;
            }
            resolve(blob);
          },
          "image/jpeg",
          0.9
        );
      });
      const imgBytes = new Uint8Array(await imgBlob.arrayBuffer());
      const embedded = await pdfDoc.embedJpg(imgBytes);

      const iw = canvas.width;
      const ih = canvas.height;
      const scale = Math.min(A4_W / iw, A4_H / ih, 1);
      const w = iw * scale;
      const h = ih * scale;

      const page = pdfDoc.addPage([A4_W, A4_H]);
      page.drawImage(embedded, {
        x: (A4_W - w) / 2,
        y: (A4_H - h) / 2,
        width: w,
        height: h,
      });
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      // Old url cleanup
      if (pdfUrl) URL.revokeObjectURL(pdfUrl);

      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
    } catch (err) {
      console.error("PDF conversion error:", err);
      alert("PDF conversion failed.");
    }
    setLoading(false);
  };

  // 🔄 Reset tool - UNTOUCHED
  const handleReset = () => {
    setPreview(null);
    setCanvas(null);
    setFileName("");
    if (pdfUrl) {
      URL.revokeObjectURL(pdfUrl);
      setPdfUrl(null);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const getDownloadFileName = () => `${fileName || "image"}.pdf`;

  // ✅ New Component for Tool Link Card
  const ToolLinkCard = ({ icon: Icon, title, description, href, ctaText }) => (
    <Link href={href}>
        <div className="flex flex-col justify-between p-4 border rounded-lg hover:shadow-lg transition cursor-pointer h-full">
            <div className="flex items-start space-x-3">
                <div className="p-3 rounded-full bg-primary/10">
                    <Icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                    <h3 className="text-md font-bold">{title}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{description}</p>
                </div>
            </div>
            <div className="mt-4 flex items-center text-sm font-semibold text-primary group">
                {ctaText}
                <MoveRight className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
            </div>
        </div>
    </Link>
  );

  return (
    <div className="space-y-12 py-10">
      
      {/* 🚀 Hero / Heading Section - Image Compressor Style */}
      <section className="max-w-4xl mx-auto text-center space-y-4">
        <h1 className="text-4xl font-extrabold text-primary">
          Image to PDF Converter – Turn Photos into Clean A4 PDFs
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          TaskGuru का Image to PDF टूल आपकी JPG, PNG इमेजेज को तुरंत A4 PDF में बदलता है। सभी प्रोसेसिंग आपके ब्राउज़र में होती है, जिससे 100% प्राइवेसी और तेज़ स्पीड मिलती है।
        </p>
      </section>

      {/* 🖼️ Main Tool Card */}
      <Card className="w-full max-w-4xl mx-auto shadow-lg">
        <CardContent className="p-6">
          {!preview ? (
            // 🔹 Upload area
            <div
              className="flex flex-col items-center justify-center space-y-4 p-12 border-2 border-dashed rounded-lg cursor-pointer hover:border-primary transition"
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="p-4 bg-secondary rounded-full">
                <Upload className="w-10 h-10 text-muted-foreground" />
              </div>
              <p className="font-semibold">
                Click to upload or drag and drop your image
              </p>
              <p className="text-sm text-muted-foreground">
                Supported formats: <span className="font-semibold">JPG, JPEG, PNG</span> · Max size:{" "}
                <span className="font-semibold">50 MB</span>
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
            // 🔹 After upload – two-column layout (preview + controls)
            <div className="grid gap-6 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] items-start">
              
              {/* Left: Image preview */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-center">
                  Preview – {fileName || "Selected image"}
                </h3>
                <div className="relative aspect-square border rounded-lg overflow-hidden bg-muted flex items-center justify-center">
                  <img
                    src={preview}
                    alt="Preview"
                    className="max-h-[400px] w-full object-contain"
                  />
                  {loading && <Loader2 className="w-12 h-12 animate-spin absolute inset-0 m-auto text-primary" />}
                </div>
                <p className="text-center text-sm text-muted-foreground mt-2">
                  Your image is safely processed in your browser.
                </p>
              </div>

              {/* Right: Actions panel */}
              <div className="space-y-4">
                <div className="rounded-lg border bg-muted/40 p-4 text-left space-y-2">
                  <h3 className="text-sm font-semibold flex items-center gap-2">
                    <FileText className="w-4 h-4 text-primary" /> Conversion Summary
                  </h3>
                  <ul className="text-xs text-muted-foreground list-disc pl-4 space-y-1">
                    <li>Input File: {fileName || "Image"}</li>
                    <li>Output Format: A4 PDF (Auto-fitted)</li>
                    <li>Processing Method: 100% In-Browser (Secure)</li>
                  </ul>
                </div>

                {/* Convert/Download Button is now in CardFooter */}
              </div>
            </div>
          )}
        </CardContent>
        
        {/* ⬇️ CardFooter - Reset और Download बटन */}
        {preview && (
            <CardFooter className="flex justify-center gap-4 bg-muted/50 border-t p-4">
                <Button variant="outline" onClick={handleReset} disabled={loading} aria-label="Reset tool">
                    <RotateCcw className="mr-2 h-4 w-4" /> Reset
                </Button>
                
                {pdfUrl ? (
                    <Button asChild onClick={() => {}} aria-label="Download converted PDF">
                        <a href={pdfUrl} download={getDownloadFileName()}>
                            <Download className="mr-2 h-4 w-4" /> Download {getDownloadFileName()}
                        </a>
                    </Button>
                ) : (
                    <Button onClick={convertToPdf} disabled={loading} aria-label="Convert to PDF">
                        {loading ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                            <>
                                <FileText className="mr-2 h-4 w-4" /> Convert to PDF
                            </>
                        )}
                    </Button>
                )}
            </CardFooter>
        )}
      </Card>

      {/* 🚀 New Section: Discover More Useful Tools (Image Compressor Style) */}
      <section className="max-w-5xl mx-auto py-10">
        <div className="text-center space-y-3 mb-8">
            <h2 className="text-3xl font-bold flex items-center justify-center gap-3">
                <Sparkles className="w-6 h-6 text-primary" /> Discover More Useful Tools
            </h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
                Don&apos;t stop here! Explore our full suite of free, AI-powered utilities to simplify your workflow.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Tool 1: Image Compressor (Related to Image) */}
            <ToolLinkCard 
                icon={FileImage}
                title="Image Compressor"
                description="Reduce JPG, PNG, WEBP file size without losing visual quality."
                href="/tools/image-compressor"
                ctaText="Compress Now"
            />
            {/* Tool 2: AI Background Remover (Related to Image) */}
            <ToolLinkCard 
                icon={Scissors}
                title="AI Background Remover"
                description="Remove background from any image instantly using AI."
                href="/tools/background-remover"
                ctaText="Remove Now"
            />
            {/* Tool 3: PDF to Word Converter (Related to PDF) */}
            <ToolLinkCard 
                icon={FileTextIcon}
                title="PDF to Word Converter"
                description="Convert PDF files into fully editable Word documents."
                href="/tools/pdf-to-word"
                ctaText="Convert Now"
            />
            {/* Tool 4: Merge PDF (Related to PDF) */}
            <ToolLinkCard 
                icon={Merge}
                title="Merge PDF"
                description="Combine multiple PDF files into one single document."
                href="/tools/merge-pdf"
                ctaText="Merge Now"
            />
            {/* Tool 5: Image to Text OCR (Related to Image/Text) */}
            <ToolLinkCard 
                icon={ImageIcon}
                title="Image to Text OCR"
                description="Extract text from images, scanned notes, and photos."
                href="/tools/image-to-text"
                ctaText="Extract Now"
            />
            {/* Tool 6: AI Text Paraphraser (Related to Text) */}
            <ToolLinkCard 
                icon={Highlighter}
                title="AI Text Paraphraser"
                description="Rewrite text and essays instantly for unique content."
                href="/tools/text-paraphraser"
                ctaText="Paraphrase Now"
            />
        </div>
      </section>

      {/* 📚 SEO / Info Section - UNTOUCHED (moved down) */}
      <section className="max-w-4xl mx-auto py-10 p-6 bg-white dark:bg-gray-900 shadow-xl rounded-2xl border border-indigo-100 dark:border-indigo-900">
        <h2 className="text-3xl font-extrabold mb-8 text-center text-indigo-700 dark:text-indigo-400">
            Why use TaskGuru&apos;s Secure Image to PDF Converter?
        </h2>
        <div className="space-y-6 text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            <p>
                पारंपरिक ऑनलाइन कन्वर्टर अक्सर आपकी फ़ाइलों को रिमोट सर्वर पर अपलोड करते हैं, जो धीमा और संवेदनशील दस्तावेज़ों के लिए जोखिम भरा हो सकता है। TaskGuru&apos;s Image to PDF टूल पूरी तरह से आपके ब्राउज़र में चलता है, जिसका अर्थ है कि आपकी फ़ाइलें कभी भी आपके डिवाइस को नहीं छोड़ती हैं। हम अधिकतम प्राइवेसी और तेज़ प्रोसेसिंग की गारंटी देते हैं।
            </p>
            
            <h3 className="text-2xl font-bold mt-8 mb-4 text-gray-800 dark:text-gray-200 border-b pb-2">
                Key Features for Professionals and Students
            </h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                <ul className="list-disc list-outside ml-6 space-y-2">
                    <li>100% In-Browser Processing**: आपकी फ़ाइलें हमेशा निजी और सुरक्षित रहती हैं।</li>
                    <li>Clean A4 Output**: आउटपुट PDF को प्रिंटिंग और शेयरिंग के लिए एक मानक A4 साइज़ पर ऑटो-फिट किया जाता है।</li>
                    <li>High-Quality JPEG Embedding**: हम EXIF डेटा को हटाने के लिए इमेज को पहले एक सुरक्षित कैनवास में लोड करते हैं, जिससे एक साफ-सुथरा और ऑप्टिमाइज़्ड PDF बनता है।</li>
                </ul>
                <ul className="list-disc list-outside ml-6 space-y-2">
                    <li>No Watermark or Limits: कोई साइनअप नहीं, कोई वॉटरमार्क नहीं, और कोई छिपी हुई सीमा नहीं।</li>
                    <li>Easy to Use: फोटो, रसीद, या नोट्स को तुरंत एक पेशेवर दस्तावेज़ में बदलें।</li>
                    </li>Mobile Optimized: डेस्कटॉप और मोबाइल दोनों डिवाइसों पर शानदार काम करता है।</li>
                </ul>
            </div>
            
            <p className="pt-4 text-center font-semibold text-xl text-primary">
                सुरक्षित, तेज़ और पूरी तरह से मुफ़्त। आज ही अपने इमेज को PDF में बदलना शुरू करें।
            </p>
        </div>
      </section>
    </div>
  );
}
