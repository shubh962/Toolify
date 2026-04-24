'use client';

import { useState, useRef, DragEvent, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import {
  Upload, FileText, Trash2, Loader2, Download, CheckCircle,
  ShieldCheck, Zap, Globe, ArrowRight, BookOpen, Laptop,
  Briefcase, GraduationCap, AlertCircle, Sparkles,
} from 'lucide-react';

import * as pdfjsLib from 'pdfjs-dist';
import { Document, Packer, Paragraph, TextRun, HeadingLevel } from 'docx';
import { saveAs } from 'file-saver';

// ── FAQ Schema — dangerouslySetInnerHTML because Script tag doesn't
//    inject ld+json correctly inside 'use client' components
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I convert a PDF to Word for free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Upload your PDF to TaskGuru's converter. The tool processes it in your browser and provides a downloadable .docx file — no account, no watermark.",
      },
    },
    {
      "@type": "Question",
      name: "Is it safe to convert sensitive PDFs here?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — 100% safe. TaskGuru uses client-side processing via PDF.js. Your file never leaves your device and is never sent to any server.",
      },
    },
    {
      "@type": "Question",
      name: "Can I edit the converted Word document?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The output is a standard .docx file that opens in Microsoft Word, Google Docs, and LibreOffice.",
      },
    },
    {
      "@type": "Question",
      name: "Does this tool support large PDF files?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — up to 100MB. Because conversion happens on your device, there are no server upload size limits.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need to install any software?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Works in any modern browser — Chrome, Safari, Firefox, Edge — on Windows, Mac, Android, and iOS.",
      },
    },
  ],
};

const MAX_PDF_SIZE_MB = 100;
const MAX_PDF_SIZE_BYTES = MAX_PDF_SIZE_MB * 1024 * 1024;

// ── Type for raw PDF text items from pdfjs
interface PdfTextItem {
  str: string;
  transform: number[];   // [a, b, c, d, x, y] — transform[5] = Y position
  height: number;        // font height in pt
  width: number;
}

export default function PdfToWord() {
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [convertedBlob, setConvertedBlob] = useState<Blob | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ── Set PDF.js worker once on mount
  useEffect(() => {
    pdfjsLib.GlobalWorkerOptions.workerSrc =
      'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
  }, []);

  const validateAndSetFile = (f: File) => {
    if (f.type !== 'application/pdf') {
      toast({ title: 'Invalid File', description: 'Only PDF files are allowed.', variant: 'destructive' });
      return;
    }
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
    setProgress(0);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) validateAndSetFile(f);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) validateAndSetFile(f);
  };

  const handleConvert = async () => {
    if (!file) return;
    setIsConverting(true);
    setConvertedBlob(null);
    setProgress(0);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
      const pdf = await loadingTask.promise;
      const totalPages = pdf.numPages;

      const docChildren: Paragraph[] = [];

      for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
        // Update progress
        setProgress(Math.round((pageNum / totalPages) * 90));

        const page = await pdf.getPage(pageNum);
        const textContent = await page.getTextContent();

        // ── BUG 1 FIX: Filter empty strings + cast to PdfTextItem
        const rawItems = (textContent.items as PdfTextItem[]).filter(
          (item) => item.str && item.str.trim() !== ''
        );

        if (rawItems.length === 0) {
          // This page has no extractable text (scanned/image page)
          docChildren.push(
            new Paragraph({
              children: [
                new TextRun({
                  text: `[Page ${pageNum}: Scanned image — use Image to Text (OCR) to extract text from this page]`,
                  italics: true,
                  color: '999999',
                  size: 20,
                }),
              ],
              spacing: { after: 200 },
            })
          );
          continue;
        }

        // ── BUG 2 FIX: Sort items TOP to BOTTOM
        // PDF Y-axis is bottom-up (y=0 = bottom of page)
        // Sorting DESCENDING = top of page first (highest Y value first)
        const sortedItems = [...rawItems].sort((a, b) => {
          const yDiff = b.transform[5] - a.transform[5]; // descending Y
          if (Math.abs(yDiff) > 2) return yDiff;
          return a.transform[4] - b.transform[4]; // same line → sort by X (left to right)
        });

        // ── BUG 3 FIX: Group into lines using dynamic threshold based on font height
        type LineGroup = { text: string; y: number; height: number; isBold?: boolean };
        const lines: LineGroup[] = [];
        let currentLine: LineGroup | null = null;

        for (const item of sortedItems) {
          const itemY = item.transform[5];
          // Dynamic threshold: half the font height, minimum 4 units
          const threshold = Math.max(item.height * 0.5, 4);

          if (currentLine === null || Math.abs(itemY - currentLine.y) > threshold) {
            // New line
            if (currentLine && currentLine.text.trim()) {
              lines.push(currentLine);
            }
            currentLine = {
              text: item.str,
              y: itemY,
              height: item.height,
            };
          } else {
            // Same line — append with space
            const needsSpace = currentLine.text.length > 0 &&
              !currentLine.text.endsWith(' ') &&
              !item.str.startsWith(' ');
            currentLine.text += (needsSpace ? ' ' : '') + item.str;
          }
        }
        // Push the last line
        if (currentLine && currentLine.text.trim()) {
          lines.push(currentLine);
        }

        // ── Convert lines to docx Paragraphs
        for (const line of lines) {
          const text = line.text.trim();
          if (!text) continue;

          // Heuristic: large font height = likely a heading
          const isHeading = line.height > 14;
          const isBigHeading = line.height > 18;

          docChildren.push(
            new Paragraph({
              heading: isBigHeading
                ? HeadingLevel.HEADING_1
                : isHeading
                ? HeadingLevel.HEADING_2
                : undefined,
              children: [
                new TextRun({
                  text,
                  size: Math.round(line.height * 2) || 24, // pt → half-pt for docx
                  bold: isHeading,
                }),
              ],
              spacing: { after: isHeading ? 160 : 80 },
            })
          );
        }

        // Page break between pages (except last)
        if (pageNum < totalPages) {
          docChildren.push(
            new Paragraph({
              children: [],
              pageBreakBefore: true,
            })
          );
        }
      }

      // ── BUG 4 FIX: If ALL pages were blank/scanned, still produce a usable doc
      if (docChildren.length === 0) {
        docChildren.push(
          new Paragraph({
            children: [
              new TextRun({
                text: 'No extractable text found in this PDF. It may be a fully scanned document. Please use the Image to Text (OCR) tool for scanned PDFs.',
                italics: true,
                color: '888888',
                size: 22,
              }),
            ],
          })
        );
      }

      setProgress(95);

      const doc = new Document({
        styles: {
          default: {
            document: {
              run: { font: 'Calibri', size: 24 },
            },
          },
        },
        sections: [
          {
            properties: {},
            children: docChildren,
          },
        ],
      });

      const blob = await Packer.toBlob(doc);
      setConvertedBlob(blob);
      setProgress(100);

      toast({
        title: '✅ Conversion Complete!',
        description: 'Click Download to save your Word file.',
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to process this PDF.';
      console.error('[PdfToWord]', err);
      toast({
        title: 'Conversion Failed',
        description: msg,
        variant: 'destructive',
      });
    } finally {
      setIsConverting(false);
    }
  };

  const handleDownload = () => {
    if (convertedBlob && file) {
      const baseName = file.name.replace(/\.pdf$/i, '');
      saveAs(convertedBlob, `${baseName}_converted.docx`);
      toast({ title: 'Downloaded!', description: 'File saved to your device.' });
    }
  };

  const handleReset = () => {
    setFile(null);
    setConvertedBlob(null);
    setProgress(0);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <>
      {/* ── BUG 5 FIX: dangerouslySetInnerHTML for JSON-LD — Script tag
          doesn't inject ld+json correctly inside 'use client' components */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <article className="max-w-4xl mx-auto space-y-16 px-4">

        {/* ── TOOL CARD ── */}
        <Card className="rounded-3xl overflow-hidden shadow-xl border-0 bg-white dark:bg-gray-900">
          <CardContent className="p-8 md:p-10">

            {/* Upload zone */}
            {!file && (
              <div
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-2xl p-16 flex flex-col items-center justify-center gap-4 cursor-pointer transition-all ${
                  isDragging
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/20 scale-[1.01]'
                    : 'border-gray-200 dark:border-gray-700 hover:border-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,application/pdf"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <div className="w-20 h-20 bg-blue-50 dark:bg-blue-900/30 rounded-3xl flex items-center justify-center">
                  <Upload className="w-10 h-10 text-blue-500" />
                </div>
                <div className="text-center">
                  <p className="text-xl font-black text-gray-900 dark:text-white">
                    Drop your PDF here
                  </p>
                  <p className="text-gray-500 text-sm mt-1">or click to browse · Max {MAX_PDF_SIZE_MB}MB</p>
                </div>
                <div className="flex flex-wrap justify-center gap-2 mt-1">
                  {['✅ No Upload', '✅ No Signup', '✅ No Watermark', '✅ Runs in Browser'].map((f) => (
                    <span key={f} className="text-xs font-semibold px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-600 dark:text-gray-400">{f}</span>
                  ))}
                </div>
              </div>
            )}

            {/* File loaded + convert button */}
            {file && !convertedBlob && (
              <div className="space-y-6">
                {/* File info row */}
                <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl">
                  <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FileText className="w-6 h-6 text-red-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-900 dark:text-white truncate">{file.name}</p>
                    <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                  <Button variant="ghost" size="icon" onClick={handleReset} className="flex-shrink-0 hover:text-red-500">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>

                {/* Progress bar */}
                {isConverting && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-gray-500 font-medium">
                      <span>Converting…</span>
                      <span>{progress}%</span>
                    </div>
                    <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Convert button */}
                <Button
                  onClick={handleConvert}
                  disabled={isConverting}
                  className="w-full h-14 text-base font-black rounded-2xl bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/20"
                >
                  {isConverting ? (
                    <><Loader2 className="w-5 h-5 animate-spin mr-2" /> Converting…</>
                  ) : (
                    <><Sparkles className="w-5 h-5 mr-2" /> Convert PDF to Word</>
                  )}
                </Button>
              </div>
            )}

            {/* Success state */}
            {convertedBlob && (
              <div className="text-center space-y-6 py-6">
                <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-gray-900 dark:text-white">
                    Conversion Complete!
                  </h3>
                  <p className="text-gray-500 text-sm mt-1">
                    Your Word document is ready — no watermark.
                  </p>
                </div>
                <div className="flex gap-3 justify-center flex-wrap">
                  <Button
                    onClick={handleDownload}
                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-black px-8 py-3 rounded-2xl shadow-lg shadow-green-500/20"
                  >
                    <Download className="w-5 h-5" /> Download .docx
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleReset}
                    className="font-bold px-6 py-3 rounded-2xl"
                  >
                    Convert Another
                  </Button>
                </div>
                {/* Next step links */}
                <div className="flex flex-wrap justify-center gap-4 pt-2">
                  {[
                    { label: 'Merge PDFs →', href: '/tools/merge-pdf' },
                    { label: 'Compress PDF →', href: '/tools/pdf-compressor' },
                    { label: 'Split PDF →', href: '/tools/split-pdf' },
                  ].map((l) => (
                    <Link key={l.href} href={l.href} className="text-sm font-semibold text-blue-600 hover:underline">
                      {l.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}

          </CardContent>
        </Card>

        {/* ── HOW IT WORKS ── */}
        <section className="space-y-8">
          <h2 className="text-3xl font-black text-gray-900 dark:text-white">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { n: '1', title: 'Upload PDF', desc: 'Drop your PDF onto the area above. Nothing is sent to any server — it loads directly in your browser.' },
              { n: '2', title: 'Auto Convert', desc: 'PDF.js extracts text from every page, groups it into lines, and the docx library builds a properly formatted Word document.' },
              { n: '3', title: 'Download .docx', desc: 'Click Download. Open in Microsoft Word, Google Docs, or LibreOffice. Edit, copy, and format freely.' },
            ].map((step) => (
              <div key={step.n} className="relative p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl space-y-3">
                <span className="absolute top-4 right-4 text-4xl font-black text-gray-100 dark:text-gray-800 select-none">{step.n}</span>
                <h3 className="font-black text-gray-900 dark:text-white">{step.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── WHY TASKGURU ── */}
        <section className="space-y-8">
          <h2 className="text-3xl font-black text-gray-900 dark:text-white">
            Why TaskGuru PDF to Word?
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: <ShieldCheck className="w-7 h-7" />,
                bg: "bg-blue-100 dark:bg-blue-900/50 text-blue-600",
                title: "100% Private — Files Stay on Your Device",
                desc: "PDF.js processes your file entirely in your browser's RAM. No upload, no server, no third-party sees your document.",
              },
              {
                icon: <Globe className="w-7 h-7" />,
                bg: "bg-green-100 dark:bg-green-900/50 text-green-600",
                title: "Up to 100MB — No Server Limits",
                desc: "Since conversion uses your device's CPU, you can convert large documents that server-based tools reject.",
              },
              {
                icon: <Laptop className="w-7 h-7" />,
                bg: "bg-purple-100 dark:bg-purple-900/50 text-purple-600",
                title: "Cross-Platform",
                desc: "Works on Windows, macOS, Linux, Android, and iOS — any modern browser, no installation needed.",
              },
              {
                icon: <Zap className="w-7 h-7" />,
                bg: "bg-orange-100 dark:bg-orange-900/50 text-orange-600",
                title: "Lightning Fast",
                desc: "No upload queue. Conversion starts immediately and completes in seconds on most modern devices.",
              },
            ].map((item) => (
              <div key={item.title} className="flex gap-5 p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl">
                <div className={`w-14 h-14 rounded-2xl ${item.bg} flex items-center justify-center flex-shrink-0`}>
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── USE CASES ── */}
        <section>
          <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-8">Who Needs This Tool?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <GraduationCap className="w-10 h-10 text-gray-400 mb-4" />,
                title: "Students & Researchers",
                desc: "Extract text from PDF journals and research papers to quote in essays without retyping.",
              },
              {
                icon: <Briefcase className="w-10 h-10 text-gray-400 mb-4" />,
                title: "HR & Recruiters",
                desc: "Convert PDF resumes to Word to add notes, reformat for clients, or mask personal details.",
              },
              {
                icon: <BookOpen className="w-10 h-10 text-gray-400 mb-4" />,
                title: "Legal Professionals",
                desc: "Convert contracts into editable drafts, make revisions, and re-sign without starting from scratch.",
              },
            ].map((item) => (
              <div key={item.title} className="border border-gray-200 dark:border-gray-700 p-8 rounded-3xl hover:border-blue-500 transition-colors">
                {item.icon}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── TIPS ── */}
        <section className="bg-yellow-50 dark:bg-yellow-900/10 p-8 rounded-3xl border border-yellow-200 dark:border-yellow-800">
          <div className="flex items-center gap-3 mb-4">
            <AlertCircle className="w-6 h-6 text-yellow-600" />
            <h2 className="text-xl font-bold text-yellow-800 dark:text-yellow-200">
              Tips for Best Results
            </h2>
          </div>
          <ul className="list-disc pl-5 space-y-3 text-yellow-900/80 dark:text-yellow-100/80 text-sm">
            <li>
              <strong>Scanned PDFs:</strong> If text shows as [Scanned image — …], your PDF is an image scan.
              Use our{' '}
              <Link href="/tools/image-to-text" className="underline font-bold">Image to Text (OCR)</Link>{' '}
              tool to extract text from scanned documents.
            </li>
            <li>
              <strong>Password protected:</strong> Unlock the PDF first using our{' '}
              <Link href="/tools/unlock-pdf-no-upload" className="underline font-bold">PDF Password Remover</Link>{' '}
              before converting.
            </li>
            <li>
              <strong>Complex layouts:</strong> Multi-column PDFs and PDFs with overlapping text boxes may need minor formatting adjustments in Word after conversion.
            </li>
          </ul>
        </section>

        {/* ── RELATED TOOLS ── */}
        <section className="bg-gray-50 dark:bg-gray-800/50 p-10 rounded-[2.5rem]">
          <h2 className="text-2xl font-bold mb-8 text-center">More Free PDF Tools</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { href: "/tools/merge-pdf", emoji: "📎", colorClass: "bg-blue-100 text-blue-600", hoverBorder: "hover:border-blue-500", label: "Merge PDF Files", sub: "Combine Multiple PDFs Into One" },
              { href: "/tools/image-to-text", emoji: "📝", colorClass: "bg-green-100 text-green-600", hoverBorder: "hover:border-green-500", label: "Image to Text (OCR)", sub: "Extract Text from Scanned PDFs" },
              { href: "/tools/unlock-pdf-no-upload", emoji: "🔓", colorClass: "bg-orange-100 text-orange-600", hoverBorder: "hover:border-orange-500", label: "PDF Password Remover", sub: "Unlock Password Protected PDFs" },
              { href: "/tools/pdf-compressor", emoji: "📦", colorClass: "bg-purple-100 text-purple-600", hoverBorder: "hover:border-purple-500", label: "PDF Compressor", sub: "Reduce PDF File Size Free" },
            ].map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className={`flex items-center justify-between p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 ${tool.hoverBorder} hover:shadow-lg transition-all group`}
              >
                <div className="flex items-center gap-4">
                  <span className={`p-3 ${tool.colorClass} rounded-xl text-xl`}>{tool.emoji}</span>
                  <div>
                    <span className="font-bold text-gray-900 dark:text-white block">{tool.label}</span>
                    <span className="text-xs text-gray-500">{tool.sub}</span>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors" />
              </Link>
            ))}
          </div>
        </section>

        {/* ── FAQ ── */}
        <section>
          <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqSchema.mainEntity.map((faq, i) => (
              <details
                key={i}
                className="border border-gray-200 dark:border-gray-700 rounded-2xl p-6 bg-white dark:bg-gray-900 cursor-pointer group"
              >
                <summary className="font-bold text-lg text-gray-900 dark:text-white list-none flex justify-between items-center">
                  {faq.name}
                  <span className="transition-transform group-open:rotate-180 text-gray-400 text-xs ml-2">▼</span>
                </summary>
                <p className="mt-3 text-gray-600 dark:text-gray-400 leading-relaxed text-sm">{faq.acceptedAnswer.text}</p>
              </details>
            ))}
          </div>
        </section>

      </article>
    </>
  );
}
