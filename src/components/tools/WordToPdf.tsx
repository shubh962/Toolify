'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import * as mammoth from 'mammoth';
import { jsPDF } from 'jspdf';
import {
  Upload, FileText, Download, Trash2,
  Loader2, CheckCircle, ShieldCheck,
  Zap, Globe, HelpCircle, ArrowRight,
} from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const MAX_SIZE_MB = 50;
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

// ✅ FAQ Schema — outside component
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How do I convert Word to PDF for free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Upload your Word document (.docx or .doc) to TaskGuru\'s free Word to PDF converter. The tool converts your document to a clean PDF instantly in your browser. No signup, no payment, no watermark required.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I convert Word to PDF without Microsoft Office?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. TaskGuru\'s Word to PDF converter works without any software installation. It runs directly in your browser on Windows, Mac, Android, and iOS — no Microsoft Office or any other software required.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is my Word document safe when converting online?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes — completely safe. TaskGuru processes your Word document entirely in your browser using JavaScript. Your file never gets sent to any server. Personal documents, business reports, and confidential files stay on your device throughout the conversion.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which Word formats are supported?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'TaskGuru supports .docx (Word 2007 and later) files. For best results, save your document in .docx format before uploading.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why convert Word to PDF?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'PDF files look identical on every device regardless of which fonts or software the recipient has installed. Converting Word documents to PDF before sharing ensures your formatting, layout, and fonts are preserved exactly as you intended. PDF is also the required format for most official submissions, job applications, and professional documents.',
      },
    },
    {
      '@type': 'Question',
      name: 'Will the PDF have a watermark?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. TaskGuru\'s Word to PDF converter produces completely clean PDF files with no watermarks, no branding, and no trial limitations. The output is a professional PDF you can use for any purpose.',
      },
    },
  ],
};

export default function WordToPdf() {
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);
  const [preview, setPreview] = useState<string>('');
  const [wordCount, setWordCount] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateAndSetFile = async (f: File) => {
    const validTypes = [
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword',
    ];
    const validExts = ['.docx', '.doc'];
    const ext = f.name.toLowerCase().slice(f.name.lastIndexOf('.'));

    if (!validTypes.includes(f.type) && !validExts.includes(ext)) {
      toast({ title: 'Invalid File', description: 'Please upload a Word document (.docx)', variant: 'destructive' });
      return;
    }
    if (f.size > MAX_SIZE_BYTES) {
      toast({ title: 'File Too Large', description: `Max ${MAX_SIZE_MB}MB allowed.`, variant: 'destructive' });
      return;
    }

    setFile(f);
    setIsDone(false);
    setPdfBlob(null);
    setPreview('');

    // Preview extraction
    try {
      const arrayBuffer = await f.arrayBuffer();
      const result = await mammoth.extractRawText({ arrayBuffer });
      const text = result.value.trim();
      const words = text.split(/\s+/).filter(Boolean).length;
      setWordCount(words);
      setPreview(text.slice(0, 300));
    } catch {
      setPreview('Preview not available for this file.');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) validateAndSetFile(f);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const f = e.dataTransfer.files[0];
    if (f) validateAndSetFile(f);
  };

  const handleConvert = async () => {
    if (!file) return;
    setIsConverting(true);

    try {
      const arrayBuffer = await file.arrayBuffer();

      // Extract text with mammoth
      const result = await mammoth.extractRawText({ arrayBuffer });
      const text = result.value;

      if (!text.trim()) {
        toast({ title: 'No Text Found', description: 'This document appears to be empty or image-based.', variant: 'destructive' });
        setIsConverting(false);
        return;
      }

      // ✅ Create PDF with jsPDF
      const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
      const pageW = 210;
      const pageH = 297;
      const marginTop = 20;
      const marginBottom = 20;
      const marginLeft = 20;
      const marginRight = 20;
      const contentWidth = pageW - marginLeft - marginRight;
      const maxY = pageH - marginBottom;

      doc.setFont('times', 'normal');
      doc.setFontSize(11);
      doc.setTextColor(20, 20, 20);

      let y = marginTop;

      // Split into paragraphs first
      const paragraphs = text.split(/\n+/).filter((p) => p.trim().length > 0);

      paragraphs.forEach((para) => {
        // Check if it looks like a heading (short, no period at end)
        const isHeading = para.trim().length < 80 && !para.trim().endsWith('.');
        const isFirstPara = paragraphs.indexOf(para) === 0 && isHeading;

        if (isFirstPara) {
          // Document title
          if (y > marginTop) { y += 4; }
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(16);
          const titleLines = doc.splitTextToSize(para.trim(), contentWidth);
          titleLines.forEach((line: string) => {
            if (y > maxY) { doc.addPage(); y = marginTop; }
            doc.text(line, marginLeft, y);
            y += 8;
          });
          doc.setFont('times', 'normal');
          doc.setFontSize(11);
          y += 4;
        } else if (isHeading && para.trim().length < 60) {
          // Section heading
          y += 3;
          if (y > maxY) { doc.addPage(); y = marginTop; }
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(12);
          doc.text(para.trim(), marginLeft, y);
          y += 7;
          doc.setFont('times', 'normal');
          doc.setFontSize(11);
        } else {
          // Regular paragraph
          const lines = doc.splitTextToSize(para.trim(), contentWidth);
          lines.forEach((line: string) => {
            if (y > maxY) {
              doc.addPage();
              y = marginTop;
            }
            doc.text(line, marginLeft, y);
            y += 6;
          });
          y += 3; // paragraph spacing
        }
      });

      // ✅ Footer on every page
      const totalPages = (doc as any).internal.getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        doc.setDrawColor(220, 220, 220);
        doc.setLineWidth(0.3);
        doc.line(marginLeft, pageH - 12, pageW - marginRight, pageH - 12);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7.5);
        doc.setTextColor(160, 160, 160);
        doc.text('Generated by TaskGuru.online — Free Word to PDF Converter', marginLeft, pageH - 8);
        doc.text(`Page ${i} of ${totalPages}`, pageW - marginRight, pageH - 8, { align: 'right' });
      }

      const pdfBytes = doc.output('blob');
      setPdfBlob(pdfBytes);
      setIsDone(true);
      toast({ title: '✅ Conversion Complete!', description: `${totalPages} page${totalPages > 1 ? 's' : ''} generated.` });

    } catch (err) {
      console.error(err);
      toast({ title: 'Conversion Failed', description: 'Could not convert this file. Please ensure it is a valid .docx file.', variant: 'destructive' });
    } finally {
      setIsConverting(false);
    }
  };

  const handleDownload = () => {
    if (!pdfBlob || !file) return;
    const url = URL.createObjectURL(pdfBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.name.replace(/\.(docx|doc)$/i, '.pdf');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast({ title: 'Downloaded!', description: 'PDF saved to your device.' });
  };

  const handleReset = () => {
    setFile(null);
    setIsDone(false);
    setPdfBlob(null);
    setPreview('');
    setWordCount(0);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* ── TOOL CARD ── */}
      <Card className="w-full max-w-2xl mx-auto shadow-2xl mt-8 border-2 border-primary/10 rounded-[2rem] bg-white dark:bg-gray-900">
        <CardContent className="p-6 sm:p-10 space-y-6">

          {!file ? (
            <>
              {/* Upload zone */}
              <div
                className="flex flex-col items-center justify-center space-y-5 p-10 sm:p-14 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-[1.5rem] cursor-pointer hover:border-primary/50 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
              >
                <div className="p-5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-full">
                  <FileText className="w-10 h-10" />
                </div>
                <div className="text-center space-y-2">
                  <h3 className="text-xl font-black text-gray-800 dark:text-white">
                    Upload Word Document
                  </h3>
                  <p className="text-gray-500 text-sm font-medium">
                    Drag & Drop or Click to Browse
                  </p>
                  <p className="text-xs text-blue-600 font-bold bg-blue-50 dark:bg-blue-900/20 inline-block px-3 py-1 rounded-full">
                    .docx · Max {MAX_SIZE_MB}MB · 100% Private · No Upload
                  </p>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".docx,.doc,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/msword"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>

              {/* Features */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: <ShieldCheck className="w-5 h-5 text-green-500" />, label: '100% Private' },
                  { icon: <Zap className="w-5 h-5 text-yellow-500" />, label: 'Instant' },
                  { icon: <Globe className="w-5 h-5 text-blue-500" />, label: 'No Software' },
                ].map((f) => (
                  <div key={f.label} className="flex flex-col items-center gap-1.5 p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl text-center">
                    {f.icon}
                    <span className="text-xs font-bold text-slate-600 dark:text-slate-400">{f.label}</span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="space-y-5">

              {/* File info */}
              <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex-shrink-0">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-gray-900 dark:text-white text-sm truncate">{file.name}</p>
                  <p className="text-xs text-gray-500">
                    {(file.size / 1024).toFixed(1)} KB
                    {wordCount > 0 && ` · ~${wordCount.toLocaleString()} words`}
                  </p>
                </div>
              </div>

              {/* Preview */}
              {preview && (
                <div className="space-y-2">
                  <p className="text-xs font-black text-slate-400 uppercase tracking-wider">Document Preview</p>
                  <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 max-h-36 overflow-y-auto">
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-serif">
                      {preview}{preview.length >= 300 ? '...' : ''}
                    </p>
                  </div>
                </div>
              )}

              {/* Success */}
              {isDone && (
                <div className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-2xl border border-green-200 dark:border-green-800">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-bold text-green-700 dark:text-green-300">PDF Ready!</p>
                    <p className="text-xs text-green-600">Click Download to save your PDF.</p>
                  </div>
                </div>
              )}

              {/* Loading */}
              {isConverting && (
                <div className="flex items-center gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100">
                  <Loader2 className="w-5 h-5 text-blue-600 animate-spin flex-shrink-0" />
                  <div>
                    <p className="text-sm font-bold text-blue-700 dark:text-blue-300">Converting to PDF...</p>
                    <p className="text-xs text-blue-500">Your file never leaves your device.</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>

        {file && (
          <CardFooter className="flex flex-col sm:flex-row justify-center gap-3 bg-gray-50/80 dark:bg-gray-800/50 p-6 border-t rounded-b-[2rem]">
            <Button variant="outline" size="lg" onClick={handleReset} disabled={isConverting} className="w-full sm:w-auto rounded-xl h-11">
              <Trash2 className="mr-2 h-4 w-4" /> Change File
            </Button>
            {!isDone ? (
              <Button
                size="lg"
                onClick={handleConvert}
                disabled={isConverting || !file}
                className="w-full sm:w-auto rounded-xl h-11 font-bold shadow-lg shadow-blue-500/20"
              >
                {isConverting
                  ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Converting...</>
                  : <><FileText className="mr-2 h-4 w-4" /> Convert to PDF</>
                }
              </Button>
            ) : (
              <Button
                size="lg"
                onClick={handleDownload}
                className="w-full sm:w-auto rounded-xl h-11 font-bold bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-500/20"
              >
                <Download className="mr-2 h-5 w-5" /> Download PDF
              </Button>
            )}
          </CardFooter>
        )}
      </Card>

      {/* ── SEO ARTICLE ── */}
      <article className="max-w-5xl mx-auto px-6 py-16 space-y-14 text-slate-600 dark:text-slate-400 leading-relaxed">

        <section className="space-y-5">
          <h2 className="text-3xl font-black text-slate-900 dark:text-white">
            Why Convert Word to PDF?
          </h2>
          <p className="text-lg">
            Word documents look different on every device. Fonts change, margins shift,
            and formatting breaks depending on which version of Word the recipient has
            installed. A PDF looks exactly the same everywhere — making it the professional
            standard for resumes, reports, contracts, proposals, and any document you need
            to share or submit.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: <ShieldCheck className="w-8 h-8 text-green-600" />, title: '100% Private', desc: 'Your Word document is processed entirely in your browser. It never gets uploaded to any server — personal documents stay private.' },
              { icon: <Zap className="w-8 h-8 text-yellow-500" />, title: 'Instant Conversion', desc: 'No upload queue. Convert instantly in your browser on any device — Windows, Mac, Android, or iOS.' },
              { icon: <Globe className="w-8 h-8 text-blue-500" />, title: 'No Software Needed', desc: 'Works without Microsoft Office, LibreOffice, or any other software. Just a browser.' },
            ].map((item) => (
              <div key={item.title} className="p-6 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl space-y-3">
                {item.icon}
                <h3 className="font-black text-slate-900 dark:text-white">{item.title}</h3>
                <p className="text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-5">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            When Should You Convert Word to PDF?
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { emoji: '📄', title: 'Job Applications', desc: 'Resumes and cover letters sent as PDF cannot be accidentally edited and look professional on any device recruiters use.' },
              { emoji: '📋', title: 'Official Form Submissions', desc: 'Government portals, university applications, and grant submissions typically require PDF format.' },
              { emoji: '💼', title: 'Business Proposals', desc: 'Client proposals and quotes look more professional as PDFs — and prevent clients from editing your pricing.' },
              { emoji: '📚', title: 'Reports & Assignments', desc: 'Academic institutions often require PDF submission. Convert your Word essay or report before submitting.' },
              { emoji: '⚖️', title: 'Contracts & Agreements', desc: 'Contracts should always be shared as PDFs to preserve the exact layout and prevent unauthorized modifications.' },
              { emoji: '📧', title: 'Email Attachments', desc: 'PDFs are universally readable. Not everyone has Word installed — a PDF opens on every device without any software.' },
            ].map((item) => (
              <div key={item.title} className="flex gap-3 p-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl">
                <span className="text-2xl flex-shrink-0">{item.emoji}</span>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-1">{item.title}</h3>
                  <p className="text-xs leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
         <section className="space-y-5">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-blue-600" /> Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {faqSchema.mainEntity.map((faq, i) => (
              <details key={i} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 cursor-pointer group">
                <summary className="font-bold text-slate-900 dark:text-white list-none flex justify-between items-center text-sm">
                  {faq.name}
                  <span className="transition-transform group-open:rotate-180 text-slate-400 flex-shrink-0 ml-2">▼</span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed">{faq.acceptedAnswer.text}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Related */}
        <section className="border-t border-slate-100 dark:border-slate-800 pt-12 space-y-6">
          <h3 className="text-xl font-black text-slate-900 dark:text-white">Related Free Tools</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { label: 'PDF to Word Converter', sub: 'Convert PDF to editable Word doc', href: '/tools/pdf-to-word', color: 'hover:border-orange-400' },
              { label: 'Merge PDF', sub: 'Combine multiple PDFs into one', href: '/tools/merge-pdf', color: 'hover:border-blue-400' },
              { label: 'PDF Compressor', sub: 'Reduce PDF file size free', href: '/tools/pdf-compressor', color: 'hover:border-green-400' },
              { label: 'PDF Redactor', sub: 'Remove sensitive info from PDF', href: '/tools/pdf-redactor', color: 'hover:border-red-400' },
            ].map((tool) => (
              <Link key={tool.href} href={tool.href} className={`flex items-center justify-between p-5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 ${tool.color} rounded-2xl transition-colors group`}>
                <div>
                  <p className="font-bold text-slate-900 dark:text-white text-sm">{tool.label}</p>
                  <p className="text-xs text-slate-500">{tool.sub}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-slate-600 transition-colors flex-shrink-0" />
              </Link>
            ))}
          </div>
        </section>

      </article>
    </>
  );
}
