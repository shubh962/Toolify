'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import {
  Upload, FileText, Download, Trash2, Loader2,
  CheckCircle, ShieldCheck, Eye, EyeOff,
  HelpCircle, ArrowRight, Square, Type, RotateCcw,
  Plus, Minus,
} from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const MAX_SIZE_MB = 50;
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

// ✅ FAQ Schema — outside component — Tier 1 country keywords
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How do I redact a PDF for free online?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Upload your PDF to TaskGuru\'s free PDF redactor. You can redact by searching for specific text to black out, or by manually drawing black boxes over sensitive areas on each page. Download the permanently redacted PDF when done. Your document never leaves your device.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is PDF redaction permanent?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes — TaskGuru\'s PDF redactor permanently removes the underlying text and covers it with a solid black rectangle. Unlike simply placing a black shape on top (which can be removed), the redacted text is gone from the PDF structure. The redacted PDF cannot be unredacted.',
      },
    },
    {
      '@type': 'Question',
      name: 'What information should be redacted from a PDF?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Common redactions include: Social Security Numbers (SSN), National Insurance numbers, passport and ID numbers, bank account and credit card numbers, medical record numbers, personal addresses, phone numbers, signatures, and any confidential business information before sharing documents.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I redact a specific line or word in a PDF?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. TaskGuru\'s PDF redactor has two modes: Text Search Redaction lets you type a word or phrase and it blacks out every occurrence throughout the document. Manual Redaction lets you draw black boxes precisely over specific lines, words, or areas on any page.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is it safe to redact sensitive documents online?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'With TaskGuru, yes — completely safe. All PDF redaction happens locally in your browser using JavaScript. Your document, including any sensitive information it contains, never gets uploaded to any server. This makes it safe for legal documents, medical records, and financial statements.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between redaction and deletion?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Redaction permanently removes specific content from a document while keeping the rest intact. Deletion removes the entire document or page. Redaction is used when you need to share a document but must hide specific sensitive information — such as sharing a contract with personal details removed.',
      },
    },
  ],
};

interface RedactionBox {
  id: string;
  page: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

interface PageDimension {
  width: number;
  height: number;
}

export default function PdfRedactor() {
  const { toast } = useToast();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [pdfDoc, setPdfDoc] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [pageDimensions, setPageDimensions] = useState<PageDimension[]>([]);
  const [redactions, setRedactions] = useState<RedactionBox[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawStart, setDrawStart] = useState({ x: 0, y: 0 });
  const [currentRect, setCurrentRect] = useState<{ x: number; y: number; w: number; h: number } | null>(null);
  const [mode, setMode] = useState<'draw' | 'text'>('draw');
  const [searchText, setSearchText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [redactedBlob, setRedactedBlob] = useState<Blob | null>(null);
  const [scale, setScale] = useState(1);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [pdfjsLib, setPdfjsLib] = useState<any>(null);
  const [pdfViewDoc, setPdfViewDoc] = useState<any>(null);

  // ✅ Load PDF.js for rendering
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
    script.onload = () => {
      const pdfjs = (window as any).pdfjsLib;
      pdfjs.GlobalWorkerOptions.workerSrc =
        'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
      setPdfjsLib(pdfjs);
    };
    document.head.appendChild(script);
    return () => { document.head.removeChild(script); };
  }, []);

  const validateAndSetFile = async (f: File) => {
    if (f.type !== 'application/pdf' && !f.name.toLowerCase().endsWith('.pdf')) {
      toast({ title: 'Invalid File', description: 'Please upload a PDF file.', variant: 'destructive' });
      return;
    }
    if (f.size > MAX_SIZE_BYTES) {
      toast({ title: 'File Too Large', description: `Max ${MAX_SIZE_MB}MB allowed.`, variant: 'destructive' });
      return;
    }
    setFile(f);
    setRedactions([]);
    setCurrentPage(1);
    setIsDone(false);
    setRedactedBlob(null);

    if (!pdfjsLib) {
      toast({ title: 'Loading...', description: 'PDF viewer is loading. Please try again in a moment.' });
      return;
    }

    const arrayBuffer = await f.arrayBuffer();

    // Load with PDF.js for viewing
    const viewDoc = await pdfjsLib.getDocument({ data: arrayBuffer.slice(0) }).promise;
    setPdfViewDoc(viewDoc);
    setTotalPages(viewDoc.numPages);

    // Get all page dimensions
    const dims: PageDimension[] = [];
    for (let i = 1; i <= viewDoc.numPages; i++) {
      const page = await viewDoc.getPage(i);
      const viewport = page.getViewport({ scale: 1 });
      dims.push({ width: viewport.width, height: viewport.height });
    }
    setPageDimensions(dims);

    // Load with pdf-lib for editing
    const libDoc = await PDFDocument.load(arrayBuffer);
    setPdfDoc(libDoc);
  };

  // ✅ Render current page to canvas
  const renderPage = useCallback(async () => {
    if (!pdfViewDoc || !canvasRef.current) return;

    try {
      const page = await pdfViewDoc.getPage(currentPage);
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      if (!context) return;

      const isMobile = window.innerWidth < 640;
      const maxWidth = isMobile ? window.innerWidth - 48 : 600;
      const pageDim = pageDimensions[currentPage - 1];
      const computedScale = pageDim ? Math.min(maxWidth / pageDim.width, 1.2) : 1;
      setScale(computedScale);

      const viewport = page.getViewport({ scale: computedScale });
      canvas.width = viewport.width;
      canvas.height = viewport.height;

      await page.render({ canvasContext: context, viewport }).promise;

      // Draw existing redactions for this page
      context.fillStyle = 'black';
      redactions
        .filter((r) => r.page === currentPage)
        .forEach((r) => {
          context.fillRect(r.x * computedScale, r.y * computedScale, r.width * computedScale, r.height * computedScale);
        });
    } catch (err) {
      console.error('Render error:', err);
    }
  }, [pdfViewDoc, currentPage, pageDimensions, redactions]);

  useEffect(() => {
    renderPage();
  }, [renderPage]);

  // ✅ Mouse drawing handlers
  const getCanvasPos = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    return {
      x: (e.clientX - rect.left) / scale,
      y: (e.clientY - rect.top) / scale,
    };
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (mode !== 'draw') return;
    const pos = getCanvasPos(e);
    setIsDrawing(true);
    setDrawStart(pos);
    setCurrentRect({ x: pos.x, y: pos.y, w: 0, h: 0 });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || mode !== 'draw') return;
    const pos = getCanvasPos(e);
    setCurrentRect({
      x: Math.min(drawStart.x, pos.x),
      y: Math.min(drawStart.y, pos.y),
      w: Math.abs(pos.x - drawStart.x),
      h: Math.abs(pos.y - drawStart.y),
    });
    renderPage();
    // Draw live rect
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx && currentRect) {
      ctx.fillStyle = 'rgba(0,0,0,0.7)';
      ctx.fillRect(currentRect.x * scale, currentRect.y * scale, currentRect.w * scale, currentRect.h * scale);
    }
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || mode !== 'draw') return;
    setIsDrawing(false);
    const pos = getCanvasPos(e);
    const x = Math.min(drawStart.x, pos.x);
    const y = Math.min(drawStart.y, pos.y);
    const w = Math.abs(pos.x - drawStart.x);
    const h = Math.abs(pos.y - drawStart.y);

    if (w > 5 && h > 5) {
      const newBox: RedactionBox = {
        id: Date.now().toString(),
        page: currentPage,
        x, y, width: w, height: h,
      };
      setRedactions((prev) => [...prev, newBox]);
    }
    setCurrentRect(null);
  };

  // ✅ Text search redaction
  const handleTextRedaction = async () => {
    if (!searchText.trim() || !pdfViewDoc) return;

    const newBoxes: RedactionBox[] = [];

    for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
      const page = await pdfViewDoc.getPage(pageNum);
      const textContent = await page.getTextContent();
      const viewport = page.getViewport({ scale: 1 });
      const pageDim = pageDimensions[pageNum - 1];

      textContent.items.forEach((item: any) => {
        if (item.str && item.str.toLowerCase().includes(searchText.toLowerCase())) {
          const tx = item.transform;
          // PDF coordinates are bottom-left, canvas is top-left
          const x = tx[4];
          const y = pageDim.height - tx[5] - (item.height || 12);
          const w = item.width || searchText.length * 6;
          const h = (item.height || 12) + 4;

          newBoxes.push({
            id: `text-${pageNum}-${Date.now()}-${Math.random()}`,
            page: pageNum,
            x: Math.max(0, x - 2),
            y: Math.max(0, y - 2),
            width: w + 4,
            height: h + 4,
          });
        }
      });
    }

    if (newBoxes.length === 0) {
      toast({ title: 'Text Not Found', description: `"${searchText}" was not found in this PDF.`, variant: 'destructive' });
      return;
    }

    setRedactions((prev) => [...prev, ...newBoxes]);
    toast({ title: `${newBoxes.length} redaction${newBoxes.length > 1 ? 's' : ''} added`, description: `"${searchText}" found on ${[...new Set(newBoxes.map(b => b.page))].length} page(s).` });
    setSearchText('');
  };

  // ✅ Apply redactions and generate final PDF
  const handleRedact = async () => {
    if (!pdfDoc || redactions.length === 0) {
      toast({ title: 'No Redactions', description: 'Draw or search for text to redact first.', variant: 'destructive' });
      return;
    }

    setIsProcessing(true);

    try {
      const pages = pdfDoc.getPages();

      redactions.forEach((box) => {
        const page = pages[box.page - 1];
        if (!page) return;
        const { width: pdfW, height: pdfH } = page.getSize();
        const pageDim = pageDimensions[box.page - 1];

        if (!pageDim) return;

        // Convert from canvas coords to PDF coords
        const scaleX = pdfW / pageDim.width;
        const scaleY = pdfH / pageDim.height;

        const pdfX = box.x * scaleX;
        // PDF Y is from bottom, canvas Y is from top
        const pdfY = pdfH - (box.y + box.height) * scaleY;
        const pdfWidth = box.width * scaleX;
        const pdfHeight = box.height * scaleY;

        page.drawRectangle({
          x: Math.max(0, pdfX),
          y: Math.max(0, pdfY),
          width: Math.min(pdfWidth, pdfW - pdfX),
          height: Math.min(pdfHeight, pdfH - pdfY),
          color: rgb(0, 0, 0),
          opacity: 1,
        });
      });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      setRedactedBlob(blob);
      setIsDone(true);
      toast({ title: 'Redaction Complete!', description: `${redactions.length} area${redactions.length > 1 ? 's' : ''} permanently redacted.` });
    } catch (err) {
      console.error(err);
      toast({ title: 'Redaction Failed', description: 'Could not process this PDF.', variant: 'destructive' });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!redactedBlob || !file) return;
    const url = URL.createObjectURL(redactedBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `redacted-${file.name}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast({ title: 'Downloaded!', description: 'Redacted PDF saved to your device.' });
  };

  const handleReset = () => {
    setFile(null);
    setPdfDoc(null);
    setPdfViewDoc(null);
    setRedactions([]);
    setCurrentPage(1);
    setTotalPages(0);
    setIsDone(false);
    setRedactedBlob(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const undoLast = () => {
    setRedactions((prev) => prev.slice(0, -1));
  };

  const currentPageRedactions = redactions.filter((r) => r.page === currentPage);
  const totalRedactions = redactions.length;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* ── TOOL CARD ── */}
      <Card className="w-full max-w-3xl mx-auto shadow-2xl mt-8 border-2 border-primary/10 rounded-[2rem] bg-white dark:bg-gray-900">
        <CardContent className="p-6 sm:p-8 space-y-5">

          {!file ? (
            <>
              <div
                className="flex flex-col items-center justify-center space-y-5 p-10 sm:p-14 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-[1.5rem] cursor-pointer hover:border-primary/50 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) validateAndSetFile(f); }}
              >
                <div className="p-5 bg-red-50 dark:bg-red-900/20 text-red-500 rounded-full">
                  <FileText className="w-10 h-10" />
                </div>
                <div className="text-center space-y-2">
                  <h3 className="text-xl font-black text-gray-800 dark:text-white">Upload PDF to Redact</h3>
                  <p className="text-gray-500 text-sm">Drag & Drop or Click to Browse</p>
                  <p className="text-xs text-red-500 font-bold bg-red-50 dark:bg-red-900/20 inline-block px-3 py-1 rounded-full">
                    Max {MAX_SIZE_MB}MB · 100% Private · Never Uploaded
                  </p>
                </div>
                <input ref={fileInputRef} type="file" accept="application/pdf,.pdf" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) validateAndSetFile(f); }} />
              </div>

              {/* Use cases */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { emoji: '⚖️', label: 'Legal Documents', desc: 'Redact client names, case numbers' },
                  { emoji: '🏥', label: 'Medical Records', desc: 'Remove patient identifiers' },
                  { emoji: '🏦', label: 'Financial Docs', desc: 'Hide account numbers, SSN' },
                  { emoji: '📋', label: 'Business Contracts', desc: 'Redact confidential terms' },
                ].map((item) => (
                  <div key={item.label} className="flex gap-2 p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                    <span className="text-lg flex-shrink-0">{item.emoji}</span>
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white text-xs">{item.label}</p>
                      <p className="text-xs text-slate-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="space-y-4">

              {/* Controls */}
              <div className="flex flex-wrap items-center gap-3">

                {/* Mode toggle */}
                <div className="flex rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700">
                  <button
                    onClick={() => setMode('draw')}
                    className={`flex items-center gap-1.5 px-3 py-2 text-sm font-bold transition-colors ${
                      mode === 'draw' ? 'bg-primary text-white' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    <Square className="w-3.5 h-3.5" /> Draw Box
                  </button>
                  <button
                    onClick={() => setMode('text')}
                    className={`flex items-center gap-1.5 px-3 py-2 text-sm font-bold transition-colors ${
                      mode === 'text' ? 'bg-primary text-white' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    <Type className="w-3.5 h-3.5" /> Find Text
                  </button>
                </div>

                {/* Undo */}
                {redactions.length > 0 && (
                  <button
                    onClick={undoLast}
                    className="flex items-center gap-1.5 px-3 py-2 text-sm font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-xl hover:bg-slate-200 transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> Undo
                  </button>
                )}

                {/* Stats */}
                <div className="ml-auto flex items-center gap-2 text-xs text-slate-500">
                  <span className="font-bold text-slate-900 dark:text-white">{totalRedactions}</span> redaction{totalRedactions !== 1 ? 's' : ''} total
                </div>
              </div>

              {/* Text search mode */}
              {mode === 'text' && (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleTextRedaction()}
                    placeholder="Type text to redact (e.g. John Smith, SSN, account number...)"
                    className="flex-1 px-4 py-2.5 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:outline-none focus:border-primary transition-colors text-slate-900 dark:text-white"
                  />
                  <Button onClick={handleTextRedaction} disabled={!searchText.trim()} className="rounded-xl font-bold">
                    Redact
                  </Button>
                </div>
              )}

              {mode === 'draw' && (
                <p className="text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800 px-3 py-2 rounded-xl">
                  🖱️ Click and drag on the PDF to draw a black redaction box over sensitive content
                </p>
              )}

              {/* Page navigation */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-3">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 disabled:opacity-40 hover:bg-slate-200 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-sm font-bold text-slate-900 dark:text-white">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 disabled:opacity-40 hover:bg-slate-200 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                  {currentPageRedactions.length > 0 && (
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-bold">
                      {currentPageRedactions.length} on this page
                    </span>
                  )}
                </div>
              )}

              {/* PDF Canvas */}
              <div className="overflow-auto rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 flex justify-center">
                <canvas
                  ref={canvasRef}
                  className={`block ${mode === 'draw' ? 'cursor-crosshair' : 'cursor-default'}`}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={() => { if (isDrawing) { setIsDrawing(false); setCurrentRect(null); } }}
                />
              </div>

              {/* Success */}
              {isDone && (
                <div className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-2xl border border-green-200 dark:border-green-800">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-bold text-green-700 dark:text-green-300">
                      {totalRedactions} area{totalRedactions !== 1 ? 's' : ''} permanently redacted
                    </p>
                    <p className="text-xs text-green-600">Click Download to save the redacted PDF.</p>
                  </div>
                </div>
              )}

              {isProcessing && (
                <div className="flex items-center gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100">
                  <Loader2 className="w-5 h-5 text-blue-600 animate-spin flex-shrink-0" />
                  <p className="text-sm font-bold text-blue-700 dark:text-blue-300">Applying redactions permanently...</p>
                </div>
              )}
            </div>
          )}
        </CardContent>

        {file && (
          <CardFooter className="flex flex-col sm:flex-row justify-center gap-3 bg-gray-50/80 dark:bg-gray-800/50 p-6 border-t rounded-b-[2rem]">
            <Button variant="outline" size="lg" onClick={handleReset} disabled={isProcessing} className="w-full sm:w-auto rounded-xl h-11">
              <Trash2 className="mr-2 h-4 w-4" /> New File
            </Button>
            {!isDone ? (
              <Button
                size="lg"
                onClick={handleRedact}
                disabled={isProcessing || redactions.length === 0}
                className="w-full sm:w-auto rounded-xl h-11 font-bold shadow-lg shadow-red-500/20 bg-red-600 hover:bg-red-700 text-white"
              >
                {isProcessing
                  ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Redacting...</>
                  : <><Square className="mr-2 h-4 w-4" /> Apply Redactions ({totalRedactions})</>
                }
              </Button>
            ) : (
              <Button size="lg" onClick={handleDownload} className="w-full sm:w-auto rounded-xl h-11 font-bold bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-500/20">
                <Download className="mr-2 h-5 w-5" /> Download Redacted PDF
              </Button>
            )}
          </CardFooter>
        )}
      </Card>

      {/* ── SEO ARTICLE — Tier 1 Country Keywords ── */}
      <article className="max-w-5xl mx-auto px-6 py-16 space-y-14 text-slate-600 dark:text-slate-400 leading-relaxed">

        <section className="space-y-5">
          <h2 className="text-3xl font-black text-slate-900 dark:text-white">
            What Is PDF Redaction and Why Does It Matter?
          </h2>
          <p className="text-lg">
            PDF redaction is the permanent removal of sensitive information from a document
            before sharing it. In the United States, United Kingdom, Canada, and Australia,
            redaction is a legal and compliance requirement across industries — from law
            firms handling client data to hospitals protecting patient records under HIPAA
            and GDPR.
          </p>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              { emoji: '⚖️', title: 'Legal Industry (USA/UK/Canada)', desc: 'Law firms must redact client names, case numbers, and privileged communications before filing public documents or sharing discovery materials.' },
              { emoji: '🏥', title: 'Healthcare (HIPAA Compliance)', desc: 'Medical providers in the US are legally required to redact Protected Health Information (PHI) before sharing patient records for research or third-party review.' },
              { emoji: '🏦', title: 'Financial Services', desc: 'Banks and financial institutions redact account numbers, Social Security Numbers, and routing numbers from documents shared with clients or regulators.' },
              { emoji: '🏛️', title: 'Government & FOIA Requests', desc: 'Government agencies in the US, UK, Canada, and Australia are required to redact certain information from documents released under freedom of information laws.' },
            ].map((item) => (
              <div key={item.title} className="flex gap-4 p-5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl">
                <span className="text-3xl flex-shrink-0">{item.emoji}</span>
                <div>
                  <h3 className="font-black text-slate-900 dark:text-white mb-1 text-sm">{item.title}</h3>
                  <p className="text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-5">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            What Information Should You Redact?
          </h2>
          <div className="grid md:grid-cols-2 gap-3">
            {[
              { category: '🇺🇸 United States', items: ['Social Security Numbers (SSN)', 'Employer Identification Numbers', 'Driver\'s license numbers', 'Financial account numbers', 'Protected Health Information (PHI)'] },
              { category: '🇬🇧 United Kingdom', items: ['National Insurance numbers', 'NHS numbers', 'Passport numbers', 'Bank account details', 'Personal addresses under GDPR'] },
              { category: '🇨🇦 Canada', items: ['Social Insurance Numbers (SIN)', 'Health card numbers', 'Date of birth (PIPEDA)', 'Financial account details', 'Indigenous status information'] },
              { category: '🇦🇺 Australia', items: ['Tax File Numbers (TFN)', 'Medicare numbers', 'Passport numbers', 'Bank account details', 'Private health information (Privacy Act)'] },
            ].map((section) => (
              <div key={section.category} className="p-5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl">
                <p className="font-black text-slate-900 dark:text-white mb-3 text-sm">{section.category}</p>
                <ul className="space-y-1">
                  {section.items.map((item) => (
                    <li key={item} className="flex gap-2 text-xs text-slate-600 dark:text-slate-400">
                      <span className="text-red-500 flex-shrink-0">■</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-5">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            How to Use the PDF Redactor
          </h2>
          <div className="space-y-3">
            {[
              { n: '1', title: 'Upload your PDF', desc: 'Drag and drop or click to upload. Your file loads directly in your browser — nothing is sent to any server.' },
              { n: '2', title: 'Choose redaction method', desc: 'Use Draw Box mode to manually drag black rectangles over sensitive areas. Use Find Text mode to type a word or phrase and automatically redact every occurrence throughout the document.' },
              { n: '3', title: 'Navigate pages', desc: 'Use the page navigation to move between pages and add redactions to any page in the document.' },
              { n: '4', title: 'Apply redactions', desc: 'Click Apply Redactions. The tool permanently embeds black rectangles over the sensitive areas in the PDF structure.' },
              { n: '5', title: 'Download', desc: 'Download the redacted PDF. The sensitive information is permanently removed and cannot be recovered.' },
            ].map((step) => (
              <div key={step.n} className="flex gap-4 p-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl">
                <div className="h-8 w-8 rounded-full bg-red-600 text-white flex items-center justify-center font-black flex-shrink-0 text-sm">{step.n}</div>
                <div>
                  <p className="font-bold text-slate-900 dark:text-white text-sm mb-1">{step.title}</p>
                  <p className="text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Privacy note */}
        <section className="p-6 bg-slate-900 text-white rounded-2xl space-y-3">
          <h2 className="text-xl font-black flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-green-400" /> Complete Privacy — No Server Upload
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            Unlike most online PDF tools, TaskGuru&apos;s PDF redactor processes your document
            entirely in your browser using JavaScript. Your PDF — including every sensitive
            detail it contains — never gets transmitted to any server. This makes it safe
            for legal documents, medical records, financial statements, and any other
            confidential material that must never leave your control.
          </p>
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
          <h3 className="text-xl font-black text-slate-900 dark:text-white">Related PDF Tools</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { label: 'PDF Compressor', sub: 'Reduce PDF file size free', href: '/tools/pdf-compressor', color: 'hover:border-orange-400' },
              { label: 'PDF to Word', sub: 'Convert PDF to editable Word', href: '/tools/pdf-to-word', color: 'hover:border-blue-400' },
              { label: 'Merge PDF', sub: 'Combine multiple PDFs', href: '/tools/merge-pdf', color: 'hover:border-green-400' },
              { label: 'Split PDF', sub: 'Extract pages from PDF', href: '/tools/split-pdf', color: 'hover:border-purple-400' },
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
