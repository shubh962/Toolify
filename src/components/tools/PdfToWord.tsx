'use client';

import { useState, useRef, DragEvent, useEffect } from 'react';
import Script from 'next/script';
import Link from 'next/link';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import {
  Upload, FileText, Trash2, Loader2, Download, CheckCircle,
  ShieldCheck, Zap, Globe, ArrowRight, BookOpen, Laptop,
  Briefcase, GraduationCap, AlertCircle, Sparkles,
} from 'lucide-react';

import * as pdfjsLib from 'pdfjs-dist';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import { saveAs } from 'file-saver';

// ✅ FIX 1: faqSchema outside component — not recreated on every render
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I convert a PDF to Word for free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Simply upload your PDF to TaskGuru's converter. Our tool processes the file in your browser and instantly provides a download link for the editable Word document.",
      },
    },
    {
      "@type": "Question",
      name: "Is it safe to convert sensitive PDFs here?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, it is 100% safe. TaskGuru uses Client-Side technology, meaning your file never leaves your computer and is never uploaded to any server.",
      },
    },
    {
      "@type": "Question",
      name: "Can I edit the converted Word document?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! The output is a standard Microsoft Word (.docx) file that you can edit in MS Word, Google Docs, or LibreOffice.",
      },
    },
    {
      "@type": "Question",
      name: "Does this tool support large PDF files?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely. Because the conversion happens on your own device, there are no server upload limits. You can convert files larger than 100MB easily.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need to install any software?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. TaskGuru works entirely in your web browser (Chrome, Safari, Firefox, Edge). No downloads, plugins, or extensions are required.",
      },
    },
  ],
};

// ✅ FIX 2: File size limit constant
const MAX_PDF_SIZE_MB = 100;
const MAX_PDF_SIZE_BYTES = MAX_PDF_SIZE_MB * 1024 * 1024;

export default function PdfToWord() {
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [convertedBlob, setConvertedBlob] = useState<Blob | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    pdfjsLib.GlobalWorkerOptions.workerSrc =
      'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
  }, []);

  const validateAndSetFile = (f: File) => {
    if (f.type !== 'application/pdf') {
      toast({ title: 'Invalid File', description: 'Only PDF files are allowed.', variant: 'destructive' });
      return;
    }
    // ✅ FIX 3: File size validation
    if (f.size > MAX_PDF_SIZE_BYTES) {
      toast({
        title: 'File Too Large',
        description: `Please upload a PDF smaller than ${MAX_PDF_SIZE_MB}MB.`,
        variant: 'destructive',
      });
      return;
    }
    setFile(f);
    setConvertedBlob(null);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) validateAndSetFile(selectedFile);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) validateAndSetFile(droppedFile);
  };

  const handleConvert = async () => {
    if (!file) return;
    setIsConverting(true);
    setConvertedBlob(null);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const loadingTask = pdfjsLib.getDocument(arrayBuffer);
      const pdf = await loadingTask.promise;
      const totalPages = pdf.numPages;

      const docChildren: Paragraph[] = [];

      for (let i = 1; i <= totalPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();

        const items = textContent.items.map((item: any) => ({
          str: item.str,
          y: item.transform[5],
        }));

        let currentLineText = '';
        let lastY = -1;

        items.forEach((item) => {
          if (lastY !== -1 && Math.abs(item.y - lastY) > 10) {
            if (currentLineText.trim()) {
              docChildren.push(
                new Paragraph({
                  children: [new TextRun({ text: currentLineText, size: 24 })],
                  spacing: { after: 120 },
                })
              );
            }
            currentLineText = '';
          }
          currentLineText += item.str + ' ';
          lastY = item.y;
        });

        if (currentLineText.trim()) {
          docChildren.push(
            new Paragraph({ children: [new TextRun({ text: currentLineText, size: 24 })] })
          );
        }

        if (i < totalPages) {
          docChildren.push(new Paragraph({ text: '' }));
        }
      }

      const doc = new Document({
        sections: [{ properties: {}, children: docChildren }],
      });

      const blob = await Packer.toBlob(doc);
      setConvertedBlob(blob);
      toast({ title: 'Conversion Complete!', description: 'Click Download to save your Word file.' });
    } catch (error) {
      console.error(error);
      toast({
        title: 'Conversion Failed',
        description: 'Failed to process this PDF. Please try another file.',
        variant: 'destructive',
      });
    } finally {
      setIsConverting(false);
    }
  };

  const handleDownload = () => {
    if (convertedBlob && file) {
      saveAs(convertedBlob, `${file.name.replace('.pdf', '')}.docx`);
      toast({ title: 'Downloaded', description: 'File saved to your device.' });
    }
  };

  const handleReset = () => {
    setFile(null);
    setConvertedBlob(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <>
      <Script
        id="pdf-to-word-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* TOOL CARD */}
      <Card className="w-full max-w-2xl mx-auto shadow-2xl my-10 mt-8 border-2 border-primary/10 rounded-[2rem] bg-white dark:bg-gray-900">
        <CardContent className="p-6 sm:p-10">
          {!file ? (
            <div
              className={`flex flex-col items-center justify-center space-y-6 p-10 sm:p-16 border-2 border-dashed rounded-[2rem] cursor-pointer transition-all duration-300 ${
                isDragging
                  ? 'border-primary bg-primary/5 scale-105'
                  : 'border-gray-200 hover:border-primary/50 hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
            >
              <div className="p-6 bg-blue-50 text-blue-600 rounded-full shadow-sm animate-bounce">
                <Upload className="w-10 h-10" />
              </div>
              <div className="text-center space-y-2">
                {/* ✅ FIX 4: h2 → h3 (parent page already has h1 and h2) */}
                <h3 className="text-2xl font-black text-gray-800 dark:text-white">Upload PDF File</h3>
                <p className="text-gray-500 font-medium">Drag & Drop or Click to Browse</p>
                <p className="text-xs text-blue-500 font-bold bg-blue-50 dark:bg-blue-900/30 inline-block px-3 py-1 rounded-full">
                  No Server Uploads · Max {MAX_PDF_SIZE_MB}MB
                </p>
              </div>
              <Input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept="application/pdf"
                onChange={handleFileChange}
              />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center space-y-6 p-10">
              <div className="relative">
                <FileText className="w-20 h-20 text-red-500 drop-shadow-lg" />
                <div className="absolute -bottom-2 -right-2 bg-green-500 text-white p-1 rounded-full border-4 border-white dark:border-gray-900">
                  <CheckCircle className="w-4 h-4" />
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white break-all">{file.name}</h3>
                <p className="text-sm text-gray-500 font-medium">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
            </div>
          )}
        </CardContent>

        {file && (
          <CardFooter className="flex flex-col sm:flex-row justify-center gap-4 bg-gray-50/80 dark:bg-gray-800/50 p-6 border-t backdrop-blur-sm rounded-b-[2rem]">
            {!convertedBlob ? (
              <>
                <Button
                  variant="outline" size="lg"
                  onClick={handleReset} disabled={isConverting}
                  className="w-full sm:w-auto rounded-xl h-12"
                >
                  <Trash2 className="mr-2 h-4 w-4" /> Change File
                </Button>
                <Button
                  size="lg"
                  onClick={handleConvert} disabled={isConverting}
                  className="w-full sm:w-auto rounded-xl h-12 text-lg font-bold shadow-lg shadow-blue-500/20"
                >
                  {isConverting
                    ? <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    : <Zap className="mr-2 h-5 w-5 fill-current" />
                  }
                  Convert to Word
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" onClick={handleReset} className="text-gray-500 hover:text-red-500">
                  Convert Another
                </Button>
                {/* ✅ FIX 5: Removed animate-pulse — green color is enough */}
                <Button
                  size="lg"
                  onClick={handleDownload}
                  className="w-full sm:w-auto rounded-xl h-14 text-lg font-bold bg-green-600 hover:bg-green-700 text-white shadow-xl shadow-green-500/30"
                >
                  <Download className="mr-2 h-6 w-6" /> Download Word File
                </Button>
              </>
            )}
          </CardFooter>
        )}
      </Card>

      {/* SEO ARTICLE */}
      <article className="max-w-5xl mx-auto px-6 py-16 space-y-20 font-sans text-gray-600 dark:text-gray-300">

        <section>
          <div className="bg-blue-50 dark:bg-blue-900/10 p-8 md:p-10 rounded-[2.5rem] border border-blue-100 dark:border-blue-900 text-left max-w-4xl mx-auto shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="w-5 h-5 text-blue-600" />
              <h2 className="text-sm font-bold text-blue-700 dark:text-blue-300 uppercase tracking-widest">
                Quick Answer
              </h2>
            </div>
            <p className="text-lg md:text-xl text-gray-800 dark:text-gray-200 leading-relaxed font-medium">
              TaskGuru provides the fastest way to <strong>convert PDF to Word for free</strong>.
              Our browser-based tool extracts text from your PDF and reconstructs it into an{' '}
              <strong>editable Microsoft Word document (.docx)</strong> instantly. Unlike traditional
              converters, TaskGuru processes files <strong>100% on your device</strong>, ensuring
              complete privacy with no server uploads.
            </p>
          </div>
        </section>

        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-4">
              How to Convert PDF to Word Online
            </h2>
            <p className="text-lg max-w-2xl mx-auto">
              Three simple steps to transform your PDF into an editable document.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Upload className="w-24 h-24" />,
                num: "01",
                title: "Upload File",
                desc: "Drag and drop your PDF or click to browse. Files up to 100MB are fully supported.",
              },
              {
                icon: <Zap className="w-24 h-24" />,
                num: "02",
                title: "Instant Processing",
                desc: "Our engine reads your PDF structure locally, identifying text lines and paragraphs without sending data to the cloud.",
              },
              {
                icon: <Download className="w-24 h-24" />,
                num: "03",
                title: "Save & Edit",
                desc: "Click the green Download button to save your .docx file, ready for editing in Microsoft Word or Google Docs.",
              },
            ].map((step) => (
              <div
                key={step.num}
                className="p-8 rounded-[2rem] bg-white dark:bg-gray-800 shadow-xl border border-gray-100 dark:border-gray-700 relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  {step.icon}
                </div>
                <span className="text-5xl font-black text-blue-600/20 mb-4 block">{step.num}</span>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">{step.title}</h3>
                <p className="leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-gray-50 dark:bg-gray-800/30 p-10 md:p-16 rounded-[3rem]">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-12 text-center">
            Why TaskGuru is the Best Choice
          </h2>
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
            {[
              {
                icon: <ShieldCheck className="w-7 h-7" />,
                bg: "bg-blue-100 dark:bg-blue-900/50 text-blue-600",
                title: "100% Privacy Guarantee",
                desc: "Most converters upload your files to their servers. TaskGuru is different — your file stays on your computer at all times.",
              },
              {
                icon: <Globe className="w-7 h-7" />,
                bg: "bg-green-100 dark:bg-green-900/50 text-green-600",
                title: "Up to 100MB File Size",
                desc: "Since we use your device's processing power, you can convert large documents that server-based tools reject.",
              },
              {
                icon: <Laptop className="w-7 h-7" />,
                bg: "bg-purple-100 dark:bg-purple-900/50 text-purple-600",
                title: "Cross-Platform",
                desc: "Works on Windows, macOS, Linux, Android, and iOS — any modern browser, any device, no installation needed.",
              },
              {
                icon: <Zap className="w-7 h-7" />,
                bg: "bg-orange-100 dark:bg-orange-900/50 text-orange-600",
                title: "Lightning Fast",
                desc: "Skip upload queues. TaskGuru converts locally in seconds, saving you valuable time on every document.",
              },
            ].map((item) => (
              <div key={item.title} className="flex gap-5">
                <div className={`w-14 h-14 rounded-2xl ${item.bg} flex items-center justify-center flex-shrink-0`}>
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                  <p className="leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-8">Who Needs This Tool?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <GraduationCap className="w-10 h-10 text-gray-400 mb-4" />,
                title: "Students & Researchers",
                desc: "Extract text from PDF journals and research papers to quote in essays without retyping everything manually.",
              },
              {
                icon: <Briefcase className="w-10 h-10 text-gray-400 mb-4" />,
                title: "HR & Recruiters",
                desc: "Convert PDF resumes to Word to add notes, reformat for clients, or mask personal details before sharing.",
              },
              {
                icon: <BookOpen className="w-10 h-10 text-gray-400 mb-4" />,
                title: "Legal Professionals",
                desc: "Convert contracts into editable drafts, make revisions, and re-sign without starting the document from scratch.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="border border-gray-200 dark:border-gray-700 p-8 rounded-3xl hover:border-blue-500 transition-colors"
              >
                {item.icon}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                <p className="text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-8">
            Client-Side vs Server-Side Conversion
          </h2>
          <div className="overflow-x-auto rounded-2xl shadow-lg">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-900 text-white">
                <tr>
                  <th className="p-4 md:p-6 text-lg">Feature</th>
                  <th className="p-4 md:p-6 text-lg bg-blue-600">TaskGuru (Client-Side)</th>
                  <th className="p-4 md:p-6 text-lg bg-gray-800">Others (Server-Side)</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {[
                  ["Privacy", "100% Private — No Uploads", "Files Uploaded to Cloud"],
                  ["File Size Limit", "Up to 100MB", "Usually 10–50MB"],
                  ["Speed", "Instant — No Upload Time", "Slow — Depends on Internet"],
                  ["Cost", "Free Forever", "Subscription for Pro Features"],
                ].map(([feature, ours, theirs]) => (
                  <tr key={feature}>
                    <td className="p-4 md:p-6 font-bold text-gray-700 dark:text-gray-300">{feature}</td>
                    <td className="p-4 md:p-6 text-green-600 font-bold">{ours}</td>
                    <td className="p-4 md:p-6 text-red-500">{theirs}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="bg-yellow-50 dark:bg-yellow-900/10 p-8 rounded-3xl border border-yellow-200 dark:border-yellow-800">
          <div className="flex items-center gap-3 mb-4">
            <AlertCircle className="w-6 h-6 text-yellow-600" />
            <h2 className="text-xl font-bold text-yellow-800 dark:text-yellow-200">
              Tips for Best Conversion Results
            </h2>
          </div>
          <ul className="list-disc pl-5 space-y-3 text-yellow-900/80 dark:text-yellow-100/80">
            <li>
              <strong>Avoid Scanned PDFs:</strong> If your PDF is a scanned image, text extraction
              won&apos;t work well. Use our{' '}
              <Link href="/tools/image-to-text" className="underline font-bold">
                Image to Text (OCR)
              </Link>{' '}
              tool instead.
            </li>
            <li>
              <strong>Standard Fonts:</strong> PDFs using Arial or Times New Roman convert most
              accurately.
            </li>
            <li>
              <strong>Check Formatting:</strong> Complex layouts with tables or floating images may
              need minor adjustments in Word after conversion.
            </li>
          </ul>
        </section>

        {/* ✅ FIX 6: Removed /tools/resume-maker (doesn't exist → broken link)
                      Replaced with real existing tools */}
        <section className="bg-gray-50 dark:bg-gray-800/50 p-10 rounded-[2.5rem]">
          <h2 className="text-2xl font-bold mb-8 text-center">Explore More Free Productivity Tools</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                href: "/tools/merge-pdf",
                emoji: "📎",
                colorClass: "bg-blue-100 text-blue-600",
                hoverBorder: "hover:border-blue-500",
                label: "Merge PDF Files",
                sub: "Combine Multiple PDFs Into One",
              },
              {
                href: "/tools/image-to-text",
                emoji: "📝",
                colorClass: "bg-green-100 text-green-600",
                hoverBorder: "hover:border-green-500",
                label: "Image to Text Converter",
                sub: "Extract Text from Images (OCR)",
              },
              {
                href: "/tools/background-remover",
                emoji: "🖼️",
                colorClass: "bg-purple-100 text-purple-600",
                hoverBorder: "hover:border-purple-500",
                label: "Background Remover",
                sub: "Transparent PNGs Instantly",
              },
              {
                href: "/tools/age-calculator",
                emoji: "📅",
                colorClass: "bg-pink-100 text-pink-600",
                hoverBorder: "hover:border-pink-500",
                label: "Age Calculator",
                sub: "Exact Age & Date Calculation",
              },
            ].map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className={`flex items-center justify-between p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 ${tool.hoverBorder} hover:shadow-lg transition-all group`}
              >
                <div className="flex items-center gap-4">
                  <span className={`p-3 ${tool.colorClass} rounded-xl`}>
                    {tool.emoji}
                  </span>
                  <div>
                    <span className="font-bold text-gray-900 dark:text-white block">{tool.label}</span>
                    <span className="text-xs text-gray-500">{tool.sub}</span>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-300 flex-shrink-0 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors" />
              </Link>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqSchema.mainEntity.map((faq, index) => (
              <div
                key={index}
                className="border border-gray-200 dark:border-gray-700 rounded-2xl p-6 hover:shadow-sm transition-shadow bg-white dark:bg-gray-900"
              >
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">{faq.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{faq.acceptedAnswer.text}</p>
              </div>
            ))}
          </div>
        </section>

      </article>
    </>
  );
}
