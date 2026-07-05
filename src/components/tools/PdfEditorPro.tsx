'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import Script from 'next/script';
import Link from 'next/link';
import {
  Upload, Download, Type, Eraser, Undo2,
  ChevronLeft, ChevronRight, ShieldCheck,
  Loader2, CheckCircle2, MoveRight,
  Trash2, MousePointer, ZoomIn, ZoomOut,
  Clock, User, RefreshCw, CheckCircle, ArrowRight,
  AlertTriangle,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

/* ─── Constants ─────────────────────────────────────────────── */
const LAST_UPDATED = 'June 2026';
const READ_TIME    = '6 min read';
const REVIEWED_BY  = 'Shubham Gautam';

/* ─── Types — unchanged ──────────────────────────────────────── */
type Tool = 'select' | 'text' | 'erase';

interface TextEdit {
  id: string;
  pageIndex: number;
  x: number;
  y: number;
  pdfX: number;
  pdfY: number;
  text: string;
  fontSize: number;
  color: string;
  fontFamily: string;
}

interface EraseEdit {
  id: string;
  pageIndex: number;
  x: number;
  y: number;
  width: number;
  height: number;
  pdfX: number;
  pdfY: number;
  pdfW: number;
  pdfH: number;
}

interface PageDimensions {
  width: number;
  height: number;
  canvasW: number;
  canvasH: number;
  scale: number;
}

/* ─── Helper: hex to PDF rgb ────────────────────────────────── */
function hexToRgb(hex: string): [number, number, number] {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? [parseInt(result[1], 16) / 255, parseInt(result[2], 16) / 255, parseInt(result[3], 16) / 255]
    : [0, 0, 0];
}

/* ─── FAQ ────────────────────────────────────────────────────── */
const faqItems = [
  { q: 'Can I edit PDF text online for free without a watermark?',  a: "Yes. TaskGuru's free PDF editor lets you add text, erase content, and download the edited PDF with no watermark and no account required. All processing runs in your browser — your PDF is never uploaded to any server." },
  { q: 'Does this PDF editor upload my file to a server?',          a: "No. TaskGuru's PDF editor uses pdf-lib and PDF.js running entirely in your browser. Your PDF file never leaves your device — safe for bank statements, medical records, legal contracts, and any sensitive document." },
  { q: 'What can I do with this free online PDF editor?',           a: "Add text at any position, erase or white-out existing content by drawing over it, navigate between pages, undo recent edits, zoom in/out for precision, choose font family and size, and download the final PDF with no watermark." },
  { q: 'Can I edit scanned PDFs with this tool?',                   a: "Yes — you can add text and erase content on any PDF including scanned ones. However, editing the original scanned text is not possible since it is an image. To extract text from a scanned PDF, use TaskGuru's free Image to Text (OCR) tool first." },
  { q: 'Is this PDF editor free for commercial use?',               a: "Yes — completely free for personal and commercial use. No account, no subscription, no watermarks. Edit invoices, contracts, reports, and business documents without restrictions." },
  { q: 'Does it work on mobile phones?',                            a: "Yes. The PDF editor works on iOS and Android in Chrome and Safari. Touch drawing is supported for both adding text positions and erasing content. For complex editing, desktop browsers give a better experience." },
  { q: 'What keyboard shortcuts are available?',                    a: "Ctrl+Z (or Cmd+Z on Mac) undoes the last edit on the current page. Escape cancels a pending text placement. These shortcuts work once a PDF is loaded and a tool is selected." },
];

/* ─── Schemas ─────────────────────────────────────────────────── */
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
};

const toolSchema = {
  '@context': 'https://schema.org',
  '@type': ['WebApplication', 'SoftwareApplication'],
  name: 'Free Online PDF Editor — No Upload, No Watermark | TaskGuru',
  url: 'https://www.taskguru.online/tools/pdf-editor-pro',
  applicationCategory: 'Utility',
  operatingSystem: 'Any',
  browserRequirements: 'Requires JavaScript',
  description: 'Free browser-based PDF editor. Add text, erase content, choose fonts, and download edited PDFs with no watermark. Uses PDF.js and pdf-lib — your file never leaves your device.',
  featureList: [
    'Add text to any PDF page',
    'Erase / white-out content',
    'Font family selector (Helvetica, Times Roman, Courier)',
    'Font size selector (8–32px)',
    'Custom text color',
    'Zoom control (50%–150%)',
    'Multi-page navigation',
    'Undo last edit',
    'Clear page edits',
    'No file upload — 100% browser processing',
    'No watermark on download',
  ],
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD', availability: 'https://schema.org/InStock' },
  publisher: { '@type': 'Organization', name: 'TaskGuru', url: 'https://www.taskguru.online', logo: { '@type': 'ImageObject', url: 'https://www.taskguru.online/logo.png' } },
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Edit a PDF Online Free Using TaskGuru',
  description: 'Step-by-step guide to adding text and erasing content in a PDF using TaskGuru\'s free browser-based PDF editor.',
  totalTime: 'PT2M',
  estimatedCost: { '@type': 'MonetaryAmount', currency: 'USD', value: '0' },
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Upload your PDF',   text: 'Drag and drop or click to browse your PDF file. The document loads and renders entirely in your browser.' },
    { '@type': 'HowToStep', position: 2, name: 'Select a tool',     text: 'Choose Add Text to type on the PDF, or Erase to draw a white box over content you want to hide.' },
    { '@type': 'HowToStep', position: 3, name: 'Apply your edits',  text: 'Click the PDF canvas to place text or drag to draw an erase box. Adjust font, size, color, and zoom as needed.' },
    { '@type': 'HowToStep', position: 4, name: 'Download',          text: 'Click Download PDF. The edited file is generated in your browser and saved directly to your device — no server involved.' },
  ],
};

/* ─── Font options ──────────────────────────────────────────── */
const FONT_OPTIONS = [
  { label: 'Helvetica',   value: 'Helvetica',   pdfLib: StandardFonts.Helvetica   },
  { label: 'Times Roman', value: 'TimesRoman',  pdfLib: StandardFonts.TimesRoman  },
  { label: 'Courier',     value: 'Courier',     pdfLib: StandardFonts.Courier     },
];

const ZOOM_OPTIONS = [0.5, 0.75, 1.0, 1.25, 1.5];

/* ─── Component ─────────────────────────────────────────────── */
export default function PdfEditorPro() {
  const { toast } = useToast();

  // File + render state — unchanged
  const [file, setFile]             = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageDims, setPageDims]     = useState<PageDimensions | null>(null);
  const [isRendering, setIsRendering] = useState(false);
  const [isSaving, setIsSaving]     = useState(false);

  // Edit state — unchanged
  const [activeTool, setActiveTool] = useState<Tool>('select');
  const [textEdits, setTextEdits]   = useState<TextEdit[]>([]);
  const [eraseEdits, setEraseEdits] = useState<EraseEdit[]>([]);
  const [textInput, setTextInput]   = useState('');
  const [fontSize, setFontSize]     = useState(14);
  const [textColor, setTextColor]   = useState('#000000');
  const [pendingPos, setPendingPos] = useState<{ x: number; y: number } | null>(null);
  const [isErasing, setIsErasing]   = useState(false);
  const [eraseStart, setEraseStart] = useState<{ x: number; y: number } | null>(null);

  // ── NEW: font family + zoom
  const [fontFamily, setFontFamily] = useState('Helvetica');
  const [zoom, setZoom]             = useState(1.0);

  // Refs — unchanged
  const pdfCanvasRef  = useRef<HTMLCanvasElement>(null);
  const overlayCanvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef  = useRef<HTMLInputElement>(null);
  const pdfDocRef     = useRef<unknown>(null);
  const pdfLibDocRef  = useRef<PDFDocument | null>(null);
  const pdfBytesRef   = useRef<ArrayBuffer | null>(null);
  const renderTaskRef = useRef<unknown>(null);

  // ── Keyboard shortcuts: Ctrl+Z = undo, Escape = cancel pending
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!file) return;
      if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
        e.preventDefault();
        handleUndo();
      }
      if (e.key === 'Escape') {
        setPendingPos(null);
        setTextInput('');
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [file, textEdits, eraseEdits, currentPage]);

  /* ── Load PDF.js dynamically — unchanged ── */
  const loadPdfJs = useCallback(async () => {
    if (typeof window === 'undefined') return null;
    // @ts-ignore
    if (window.pdfjsLib) return window.pdfjsLib;
    return new Promise<unknown>((resolve) => {
      const script = document.createElement('script');
      script.src   = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
      script.onload = () => {
        // @ts-ignore
        window.pdfjsLib.GlobalWorkerOptions.workerSrc =
          'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
        // @ts-ignore
        resolve(window.pdfjsLib);
      };
      document.head.appendChild(script);
    });
  }, []);

  /* ── Handle file — unchanged ── */
  const handleFile = useCallback(async (f: File) => {
    if (f.type !== 'application/pdf') {
      toast({ title: 'Only PDF files supported', variant: 'destructive' });
      return;
    }
    setFile(f);
    setTextEdits([]);
    setEraseEdits([]);
    setCurrentPage(0);
    setIsRendering(true);

    try {
      const bytes = await f.arrayBuffer();
      pdfBytesRef.current = bytes;
      const pdfLib = await PDFDocument.load(bytes);
      pdfLibDocRef.current = pdfLib;
      const pdfjsLib = await loadPdfJs();
      // @ts-ignore
      const pdfDoc = await pdfjsLib.getDocument({ data: bytes.slice(0) }).promise;
      pdfDocRef.current = pdfDoc;
      setTotalPages(pdfDoc.numPages);
      toast({ title: '✅ PDF loaded!', description: `${pdfDoc.numPages} page${pdfDoc.numPages > 1 ? 's' : ''} — ready to edit.` });
    } catch {
      toast({ title: 'Failed to load PDF', description: 'Make sure the file is a valid PDF.', variant: 'destructive' });
    } finally {
      setIsRendering(false);
    }
  }, [loadPdfJs, toast]);

  /* ── Render page — zoom applied ── */
  const renderPage = useCallback(async (pageIdx: number, zoomLevel = zoom) => {
    if (!pdfDocRef.current || !pdfCanvasRef.current) return;
    setIsRendering(true);

    try {
      // @ts-ignore
      if (renderTaskRef.current) renderTaskRef.current.cancel();
      // @ts-ignore
      const page      = await pdfDocRef.current.getPage(pageIdx + 1);
      const container = pdfCanvasRef.current.parentElement;
      const maxW      = container ? container.clientWidth - 32 : 680;
      const viewport  = page.getViewport({ scale: 1 });
      const baseScale = Math.min(maxW / viewport.width, 1.5);
      const scale     = baseScale * zoomLevel;
      const scaledVP  = page.getViewport({ scale });

      const canvas = pdfCanvasRef.current;
      canvas.width = scaledVP.width;
      canvas.height = scaledVP.height;

      if (overlayCanvasRef.current) {
        overlayCanvasRef.current.width  = scaledVP.width;
        overlayCanvasRef.current.height = scaledVP.height;
      }

      setPageDims({
        width: viewport.width, height: viewport.height,
        canvasW: scaledVP.width, canvasH: scaledVP.height, scale,
      });

      const ctx  = canvas.getContext('2d')!;
      const task = page.render({ canvasContext: ctx, viewport: scaledVP });
      renderTaskRef.current = task;
      await task.promise;
    } catch (err: unknown) {
      if (err instanceof Error && err.message !== 'Rendering cancelled') {
        toast({ title: 'Render error', description: String(err), variant: 'destructive' });
      }
    } finally {
      setIsRendering(false);
    }
  }, [toast, zoom]);

  useEffect(() => {
    if (file && totalPages > 0) renderPage(currentPage, zoom);
  }, [file, currentPage, totalPages, zoom]);

  /* ── Redraw overlay — unchanged ── */
  const redrawOverlay = useCallback(() => {
    const canvas = overlayCanvasRef.current;
    if (!canvas || !pageDims) return;
    const ctx = canvas.getContext('2d')!;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    eraseEdits.filter(e => e.pageIndex === currentPage).forEach(e => {
      ctx.fillStyle   = 'white';
      ctx.fillRect(e.x, e.y, e.width, e.height);
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth   = 1;
      ctx.strokeRect(e.x, e.y, e.width, e.height);
    });

    textEdits.filter(t => t.pageIndex === currentPage).forEach(t => {
      ctx.font      = `${t.fontSize * pageDims.scale}px ${t.fontFamily}, Arial, sans-serif`;
      ctx.fillStyle = t.color;
      ctx.fillText(t.text, t.x, t.y);
    });

    if (pendingPos && activeTool === 'text') {
      ctx.strokeStyle = '#3b82f6';
      ctx.lineWidth   = 2;
      ctx.setLineDash([4, 4]);
      ctx.strokeRect(pendingPos.x - 2, pendingPos.y - fontSize * pageDims.scale, 200, fontSize * pageDims.scale + 8);
      ctx.setLineDash([]);
    }
  }, [eraseEdits, textEdits, currentPage, pageDims, pendingPos, activeTool, fontSize]);

  useEffect(() => { redrawOverlay(); }, [redrawOverlay]);

  /* ── Canvas helpers — unchanged ── */
  const getCanvasPos = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = overlayCanvasRef.current!;
    const rect   = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    if ('touches' in e) {
      return { x: (e.touches[0].clientX - rect.left) * scaleX, y: (e.touches[0].clientY - rect.top) * scaleY };
    }
    return { x: (e.clientX - rect.left) * scaleX, y: (e.clientY - rect.top) * scaleY };
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!pageDims || activeTool !== 'text') return;
    const { x, y } = getCanvasPos(e);
    setPendingPos({ x, y });
  };

  const handleEraseStart = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (activeTool !== 'erase' || !pageDims) return;
    e.preventDefault();
    setIsErasing(true);
    setEraseStart(getCanvasPos(e));
  };

  const handleEraseMove = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isErasing || !eraseStart || !pageDims) return;
    e.preventDefault();
    const pos    = getCanvasPos(e);
    const canvas = overlayCanvasRef.current!;
    const ctx    = canvas.getContext('2d')!;
    redrawOverlay();
    ctx.fillStyle   = 'rgba(255,255,255,0.7)';
    ctx.fillRect(eraseStart.x, eraseStart.y, pos.x - eraseStart.x, pos.y - eraseStart.y);
    ctx.strokeStyle = '#f87171';
    ctx.lineWidth   = 1.5;
    ctx.setLineDash([4, 4]);
    ctx.strokeRect(eraseStart.x, eraseStart.y, pos.x - eraseStart.x, pos.y - eraseStart.y);
    ctx.setLineDash([]);
  };

  const handleEraseEnd = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isErasing || !eraseStart || !pageDims) return;
    e.preventDefault();
    const pos = getCanvasPos(e);
    setIsErasing(false);

    const x = Math.min(eraseStart.x, pos.x);
    const y = Math.min(eraseStart.y, pos.y);
    const w = Math.abs(pos.x - eraseStart.x);
    const h = Math.abs(pos.y - eraseStart.y);

    if (w > 5 && h > 5) {
      setEraseEdits(prev => [...prev, {
        id:       Date.now().toString(),
        pageIndex: currentPage,
        x, y, width: w, height: h,
        pdfX:  (x / pageDims.canvasW) * pageDims.width,
        pdfY:  pageDims.height - ((y + h) / pageDims.canvasH) * pageDims.height,
        pdfW:  (w / pageDims.canvasW) * pageDims.width,
        pdfH:  (h / pageDims.canvasH) * pageDims.height,
      }]);
    }
    setEraseStart(null);
  };

  /* ── addTextEdit — includes fontFamily ── */
  const addTextEdit = () => {
    if (!textInput.trim() || !pendingPos || !pageDims) return;
    setTextEdits(prev => [...prev, {
      id:        Date.now().toString(),
      pageIndex: currentPage,
      x:         pendingPos.x,
      y:         pendingPos.y,
      pdfX:      (pendingPos.x / pageDims.canvasW) * pageDims.width,
      pdfY:      pageDims.height - (pendingPos.y / pageDims.canvasH) * pageDims.height,
      text:      textInput,
      fontSize,
      color:     textColor,
      fontFamily,
    }]);
    setTextInput('');
    setPendingPos(null);
  };

  /* ── handleUndo — unchanged ── */
  const handleUndo = () => {
    const lastText = [...textEdits].reverse().find(t => t.pageIndex === currentPage);
    if (lastText) {
      setTextEdits(prev => {
        const arr = [...prev];
        const idx = arr.map(t => t.id).lastIndexOf(lastText.id);
        if (idx !== -1) arr.splice(idx, 1);
        return arr;
      });
      return;
    }
    const lastErase = [...eraseEdits].reverse().find(e => e.pageIndex === currentPage);
    if (lastErase) {
      setEraseEdits(prev => {
        const arr = [...prev];
        const idx = arr.map(e => e.id).lastIndexOf(lastErase.id);
        if (idx !== -1) arr.splice(idx, 1);
        return arr;
      });
    }
  };

  /* ── handleSave — supports font family ── */
  const handleSave = async () => {
    if (!pdfLibDocRef.current) return;
    setIsSaving(true);
    try {
      const pdfDoc = pdfLibDocRef.current;
      const pages  = pdfDoc.getPages();

      // Embed all 3 font families upfront
      const fonts: Record<string, Awaited<ReturnType<typeof pdfDoc.embedFont>>> = {
        Helvetica:  await pdfDoc.embedFont(StandardFonts.Helvetica),
        TimesRoman: await pdfDoc.embedFont(StandardFonts.TimesRoman),
        Courier:    await pdfDoc.embedFont(StandardFonts.Courier),
      };

      for (const erase of eraseEdits) {
        const page = pages[erase.pageIndex];
        if (!page) continue;
        page.drawRectangle({ x: erase.pdfX, y: erase.pdfY, width: erase.pdfW, height: erase.pdfH, color: rgb(1, 1, 1) });
      }

      for (const edit of textEdits) {
        const page = pages[edit.pageIndex];
        if (!page) continue;
        const [r, g, b] = hexToRgb(edit.color);
        const font = fonts[edit.fontFamily] ?? fonts['Helvetica'];
        page.drawText(edit.text, { x: edit.pdfX, y: edit.pdfY, size: edit.fontSize, font, color: rgb(r, g, b) });
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url  = URL.createObjectURL(blob);
      const a    = document.createElement('a');
      a.href     = url;
      a.download = `edited-${file?.name || 'document.pdf'}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast({ title: 'Downloaded!', description: 'Edited PDF saved to your device.' });
    } catch (err) {
      toast({ title: 'Save failed', description: String(err), variant: 'destructive' });
    } finally {
      setIsSaving(false);
    }
  };

  /* ── handleReset — unchanged ── */
  const handleReset = () => {
    setFile(null);
    setTextEdits([]);
    setEraseEdits([]);
    setCurrentPage(0);
    setTotalPages(0);
    setPageDims(null);
    setPendingPos(null);
    pdfDocRef.current    = null;
    pdfLibDocRef.current = null;
    pdfBytesRef.current  = null;
  };

  const totalEdits = textEdits.length + eraseEdits.length;
  const pageEdits  = textEdits.filter(t => t.pageIndex === currentPage).length
                   + eraseEdits.filter(e => e.pageIndex === currentPage).length;

  return (
    <>
      <Script id="pdf-editor-faq-schema"   type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema)   }} />
      <Script id="pdf-editor-tool-schema"  type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema)  }} />
      <Script id="pdf-editor-howto-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />

      <div className="space-y-10">

        {/* ── EEAT META BAR ── */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground border-b border-border pb-4">
          <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5" aria-hidden="true" />Reviewed by <strong className="text-foreground">{REVIEWED_BY}</strong></span>
          <span className="flex items-center gap-1.5"><RefreshCw className="w-3.5 h-3.5" aria-hidden="true" />Updated: <strong className="text-foreground">{LAST_UPDATED}</strong></span>
          <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" aria-hidden="true" />{READ_TIME}</span>
          <span className="flex items-center gap-x-3 ml-auto">
            <Link href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <span aria-hidden="true">·</span>
            <Link href="/about" className="hover:text-primary transition-colors">About</Link>
            <span aria-hidden="true">·</span>
            <Link href="/contact" className="hover:text-primary transition-colors">Contact</Link>
          </span>
        </div>

        {/* ── QUICK ANSWER ── */}
        <section id="quick-answer" aria-label="Quick Answer" className="p-5 bg-primary/5 border border-primary/20 rounded-2xl">
          <p className="text-xs font-bold text-primary uppercase tracking-wider mb-2">⚡ Quick Answer</p>
          <p className="text-sm leading-relaxed text-foreground">
            <strong>TaskGuru&apos;s Free PDF Editor</strong> lets you add text and erase content on any PDF directly in your browser — no upload, no watermark, no account. Choose font family (Helvetica, Times Roman, Courier), size, and color. Use Ctrl+Z to undo. Download the edited PDF instantly.
          </p>
        </section>

        {/* ── EDITOR UI ── */}
        {!file ? (
          /* Upload drop zone — unchanged */
          <div
            onDragEnter={() => setIsDragging(true)}
            onDragLeave={() => setIsDragging(false)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => { e.preventDefault(); setIsDragging(false); const f = e.dataTransfer.files[0]; if (f) handleFile(f); }}
            onClick={() => fileInputRef.current?.click()}
            onKeyDown={(e) => e.key === 'Enter' && fileInputRef.current?.click()}
            role="button"
            tabIndex={0}
            aria-label="Upload PDF to edit — drag and drop or click to browse"
            className={`border-2 border-dashed rounded-3xl p-16 flex flex-col items-center gap-5 cursor-pointer transition-all ${
              isDragging ? 'border-primary bg-primary/5 scale-[1.01]' : 'border-slate-200 dark:border-slate-700 hover:border-primary/50'
            }`}
          >
            <input ref={fileInputRef} type="file" accept=".pdf" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }} aria-label="Choose PDF file to edit" />
            <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center">
              <Upload className="w-10 h-10 text-primary" aria-hidden="true" />
            </div>
            <div className="text-center">
              <p className="text-xl font-black text-foreground">Drop your PDF here to start editing</p>
              <p className="text-sm text-muted-foreground mt-1">or click to browse — Runs 100% in your browser</p>
              <p className="text-xs text-muted-foreground mt-1 font-medium">Ctrl+Z to undo · Escape to cancel</p>
            </div>
            <div className="flex flex-wrap justify-center gap-2 text-xs font-bold">
              {['✅ No Upload', '✅ No Signup', '✅ No Watermark', '✅ Free Forever'].map((f) => (
                <span key={f} className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-600 dark:text-slate-400">{f}</span>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-4">

            {/* Top bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-card border border-border rounded-2xl">
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-8 h-8 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-red-600 text-xs font-black">PDF</span>
                </div>
                <p className="font-bold text-foreground text-sm truncate max-w-[180px]">{file.name}</p>
                {totalEdits > 0 && (
                  <span className="text-[10px] font-black px-2 py-0.5 bg-primary/10 text-primary rounded-full flex-shrink-0">{totalEdits} edit{totalEdits > 1 ? 's' : ''}</span>
                )}
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <button onClick={handleReset} className="text-xs font-bold text-muted-foreground hover:text-red-500 transition-colors" aria-label="Change PDF file">Change File</button>
                <button
                  onClick={handleSave}
                  disabled={isSaving || totalEdits === 0}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:opacity-40 text-white font-bold text-sm rounded-xl transition-colors"
                  aria-label="Download edited PDF"
                >
                  {isSaving ? <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" /> : <Download className="w-4 h-4" aria-hidden="true" />}
                  Download PDF
                </button>
              </div>
            </div>

            {/* Toolbar */}
            <div className="flex flex-wrap items-center gap-2 p-3 bg-slate-50 dark:bg-slate-900 border border-border rounded-2xl">
              {/* Tools */}
              {([
                { id: 'select' as Tool, icon: MousePointer, label: 'Select' },
                { id: 'text'   as Tool, icon: Type,          label: 'Add Text' },
                { id: 'erase'  as Tool, icon: Eraser,         label: 'Erase / Whitebox' },
              ] as const).map((btn) => (
                <button
                  key={btn.id}
                  onClick={() => { setActiveTool(btn.id); setPendingPos(null); }}
                  aria-pressed={activeTool === btn.id}
                  aria-label={btn.label}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeTool === btn.id
                      ? 'bg-primary text-white shadow-md shadow-primary/20'
                      : 'bg-white dark:bg-slate-800 border border-border text-foreground hover:border-primary/40'
                  }`}
                >
                  <btn.icon className="w-3.5 h-3.5" aria-hidden="true" />
                  {btn.label}
                </button>
              ))}

              <div className="h-6 w-px bg-border mx-1" aria-hidden="true" />

              {/* Text options */}
              {activeTool === 'text' && (
                <>
                  {/* Font family — NEW */}
                  <div className="flex items-center gap-1.5">
                    <label htmlFor="font-family-select" className="text-[10px] font-black text-muted-foreground uppercase">Font</label>
                    <select
                      id="font-family-select"
                      value={fontFamily}
                      onChange={(e) => setFontFamily(e.target.value)}
                      className="text-xs border border-border rounded-lg px-2 py-1.5 bg-white dark:bg-slate-800 text-foreground"
                      aria-label="Font family"
                    >
                      {FONT_OPTIONS.map((f) => (
                        <option key={f.value} value={f.value}>{f.label}</option>
                      ))}
                    </select>
                  </div>

                  {/* Font size */}
                  <div className="flex items-center gap-1.5">
                    <label htmlFor="font-size-select" className="text-[10px] font-black text-muted-foreground uppercase">Size</label>
                    <select
                      id="font-size-select"
                      value={fontSize}
                      onChange={(e) => setFontSize(Number(e.target.value))}
                      className="text-xs border border-border rounded-lg px-2 py-1.5 bg-white dark:bg-slate-800 text-foreground"
                      aria-label="Font size"
                    >
                      {[8, 10, 12, 14, 16, 18, 20, 24, 28, 32].map(s => (
                        <option key={s} value={s}>{s}px</option>
                      ))}
                    </select>
                  </div>

                  {/* Color */}
                  <div className="flex items-center gap-1.5">
                    <label htmlFor="text-color-picker" className="text-[10px] font-black text-muted-foreground uppercase">Color</label>
                    <input
                      id="text-color-picker"
                      type="color"
                      value={textColor}
                      onChange={(e) => setTextColor(e.target.value)}
                      className="w-8 h-8 rounded-lg border border-border cursor-pointer"
                      aria-label="Text color"
                    />
                  </div>
                </>
              )}

              <div className="h-6 w-px bg-border mx-1" aria-hidden="true" />

              {/* Zoom controls — NEW */}
              <div className="flex items-center gap-1" role="group" aria-label="Zoom controls">
                <button
                  onClick={() => setZoom(z => Math.max(0.5, ZOOM_OPTIONS[ZOOM_OPTIONS.indexOf(z) - 1] ?? 0.5))}
                  disabled={zoom <= 0.5}
                  className="p-1.5 rounded-lg border border-border disabled:opacity-40 hover:bg-muted transition-colors"
                  aria-label="Zoom out"
                >
                  <ZoomOut className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
                <span className="text-xs font-bold text-foreground px-1 w-12 text-center">{Math.round(zoom * 100)}%</span>
                <button
                  onClick={() => setZoom(z => Math.min(1.5, ZOOM_OPTIONS[ZOOM_OPTIONS.indexOf(z) + 1] ?? 1.5))}
                  disabled={zoom >= 1.5}
                  className="p-1.5 rounded-lg border border-border disabled:opacity-40 hover:bg-muted transition-colors"
                  aria-label="Zoom in"
                >
                  <ZoomIn className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              </div>

              <div className="h-6 w-px bg-border mx-1" aria-hidden="true" />

              {/* Undo */}
              <button
                onClick={handleUndo}
                disabled={pageEdits === 0}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-white dark:bg-slate-800 border border-border disabled:opacity-40 hover:border-primary/40 transition-colors"
                aria-label="Undo last edit (Ctrl+Z)"
              >
                <Undo2 className="w-3.5 h-3.5" aria-hidden="true" /> Undo
              </button>

              {/* Clear page */}
              <button
                onClick={() => {
                  setTextEdits(prev => prev.filter(t => t.pageIndex !== currentPage));
                  setEraseEdits(prev => prev.filter(e => e.pageIndex !== currentPage));
                  setPendingPos(null);
                }}
                disabled={pageEdits === 0}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-white dark:bg-slate-800 border border-border disabled:opacity-40 hover:border-red-300 text-red-500 transition-colors"
                aria-label="Clear all edits on this page"
              >
                <Trash2 className="w-3.5 h-3.5" aria-hidden="true" /> Clear Page
              </button>

              {/* Page nav */}
              {totalPages > 1 && (
                <>
                  <div className="h-6 w-px bg-border mx-1" aria-hidden="true" />
                  <div className="flex items-center gap-1.5" role="group" aria-label="Page navigation">
                    <button onClick={() => setCurrentPage(p => Math.max(0, p - 1))} disabled={currentPage === 0} className="p-1.5 rounded-lg border border-border disabled:opacity-40 hover:bg-muted transition-colors" aria-label="Previous page">
                      <ChevronLeft className="w-4 h-4" aria-hidden="true" />
                    </button>
                    <span className="text-xs font-bold text-foreground px-2" aria-live="polite">{currentPage + 1} / {totalPages}</span>
                    <button onClick={() => setCurrentPage(p => Math.min(totalPages - 1, p + 1))} disabled={currentPage === totalPages - 1} className="p-1.5 rounded-lg border border-border disabled:opacity-40 hover:bg-muted transition-colors" aria-label="Next page">
                      <ChevronRight className="w-4 h-4" aria-hidden="true" />
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Tool hint */}
            <div className="text-xs text-center text-muted-foreground font-medium h-5" aria-live="polite">
              {activeTool === 'text'  && !pendingPos && '💡 Click anywhere on the PDF to place your text'}
              {activeTool === 'text'  && pendingPos  && '📝 Type below and click Add — or press Escape to cancel'}
              {activeTool === 'erase'                && '🔲 Click and drag to draw a white box over content'}
              {activeTool === 'select' && totalEdits === 0 && '← Choose a tool above to start editing'}
            </div>

            {/* PDF canvas */}
            <div className="relative bg-slate-300 dark:bg-slate-700 rounded-2xl overflow-hidden flex items-start justify-center p-4 min-h-[400px]">
              {isRendering && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/50 dark:bg-black/50 z-20 rounded-2xl" role="status" aria-live="polite">
                  <div className="flex items-center gap-2 text-sm font-bold text-foreground">
                    <Loader2 className="w-5 h-5 animate-spin text-primary" aria-hidden="true" />
                    Rendering PDF...
                  </div>
                </div>
              )}
              <div className="relative shadow-2xl">
                <canvas ref={pdfCanvasRef} className="block bg-white" style={{ maxWidth: '100%' }} aria-label="PDF page render" />
                <canvas
                  ref={overlayCanvasRef}
                  className="absolute inset-0 block"
                  style={{
                    maxWidth: '100%',
                    cursor: activeTool === 'text' ? 'text' : activeTool === 'erase' ? 'crosshair' : 'default',
                  }}
                  aria-label="PDF edit overlay — click to add text or drag to erase"
                  onClick={activeTool === 'text' ? handleCanvasClick : undefined}
                  onMouseDown={activeTool === 'erase' ? handleEraseStart : undefined}
                  onMouseMove={activeTool === 'erase' ? handleEraseMove : undefined}
                  onMouseUp={activeTool === 'erase' ? handleEraseEnd : undefined}
                  onTouchStart={activeTool === 'erase' ? handleEraseStart : undefined}
                  onTouchMove={activeTool === 'erase' ? handleEraseMove : undefined}
                  onTouchEnd={activeTool === 'erase' ? handleEraseEnd : undefined}
                />
              </div>
            </div>

            {/* Text input box */}
            {activeTool === 'text' && pendingPos && (
              <div className="flex gap-2 p-4 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-2xl">
                <input
                  autoFocus
                  type="text"
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') addTextEdit(); if (e.key === 'Escape') setPendingPos(null); }}
                  placeholder="Type your text here..."
                  className="flex-1 px-4 py-2.5 border border-border rounded-xl bg-white dark:bg-slate-800 text-foreground text-sm focus:outline-none focus:border-primary transition-colors"
                  aria-label="Text to add to PDF"
                  style={{ fontFamily, fontSize: `${Math.min(fontSize, 16)}px` }}
                />
                <button onClick={addTextEdit} disabled={!textInput.trim()} className="px-5 py-2.5 bg-primary hover:bg-primary/90 disabled:opacity-40 text-white font-bold rounded-xl text-sm transition-colors" aria-label="Add text to PDF">Add</button>
                <button onClick={() => setPendingPos(null)} className="px-4 py-2.5 border border-border hover:bg-muted text-foreground font-bold rounded-xl text-sm transition-colors" aria-label="Cancel text placement">Cancel</button>
              </div>
            )}

            {/* Edit summary */}
            {totalEdits > 0 && (
              <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-950/20 border border-green-100 dark:border-green-900 rounded-xl text-sm" role="status" aria-live="polite">
                <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" aria-hidden="true" />
                <span className="text-green-700 dark:text-green-400 font-semibold">
                  {totalEdits} edit{totalEdits > 1 ? 's' : ''} applied across {new Set([...textEdits.map(t => t.pageIndex), ...eraseEdits.map(e => e.pageIndex)]).size} page{totalEdits > 1 ? 's' : ''} — download when ready.
                </span>
              </div>
            )}
          </div>
        )}

        {/* ── SEO CONTENT ── */}
        <section className="space-y-10 border-t border-border pt-12">

          <div className="space-y-4">
            <h2 className="text-2xl font-black text-foreground">Free Online PDF Editor — No Upload, No Watermark</h2>
            <p className="text-muted-foreground leading-relaxed">
              Most &quot;free&quot; PDF editors upload your file to a server, watermark the result, or lock the download behind a subscription. This tool doesn&apos;t do any of that. It uses PDF.js and pdf-lib running directly in your browser — your PDF file is never sent anywhere.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Add text at any position, choose between Helvetica, Times Roman, and Courier fonts, draw white boxes to erase content, navigate multi-page documents, undo edits with Ctrl+Z, and download a clean PDF instantly.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {[
              { title: 'Add Text to Any PDF Page',         desc: 'Click anywhere on the rendered PDF, type your text, choose font, size, and color, and it gets embedded at that exact position. Works on any PDF — scanned or digital.' },
              { title: 'Erase and White-Out PDF Content',  desc: 'Draw a white rectangle over any content you want to hide. Useful for redacting addresses, covering outdated info, or masking sensitive fields.' },
              { title: 'Font Family & Size Control',       desc: 'Choose between Helvetica, Times Roman, and Courier fonts. Select any size from 8px to 32px. Adjust text color with the color picker.' },
              { title: 'Zoom for Precision Editing',       desc: 'Zoom in to 125% or 150% for small text placement on dense PDFs. Zoom out to see the full page layout before downloading.' },
              { title: 'Multi-Page Navigation',            desc: 'Navigate between pages using the prev/next buttons. Edits on each page are tracked separately and all applied when you download.' },
              { title: 'No Upload — 100% Browser',         desc: 'Unlike iLovePDF, Smallpdf, or Adobe online, nothing is sent to a server. Critical when editing bank statements, medical records, or legal contracts.' },
            ].map((item) => (
              <div key={item.title} className="p-5 bg-card border border-border rounded-2xl space-y-2">
                <h3 className="font-black text-foreground text-sm">{item.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Use Cases */}
          <div className="space-y-4">
            <h2 className="text-xl font-black text-foreground">Common PDF Editing Use Cases</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { emoji: '📝', title: 'Fill PDF Forms',        desc: "Add text to form fields in PDFs that don't have interactive forms." },
                { emoji: '✏️', title: 'Annotate Documents',    desc: 'Add notes, comments, or corrections to reports, drafts, and research papers.' },
                { emoji: '🔲', title: 'Redact Information',    desc: 'White-out names, account numbers, and addresses before forwarding.' },
                { emoji: '📄', title: 'Update Old PDFs',       desc: 'Add a new date, correct a typo, or update a contact number on an existing PDF.' },
                { emoji: '🧾', title: 'Edit Invoices',         desc: 'Add missing line items or correct amounts on PDF invoices.' },
                { emoji: '🏦', title: 'Annotate Statements',   desc: 'Add category labels to bank transaction lines before sharing with an accountant.' },
              ].map((uc) => (
                <div key={uc.title} className="flex gap-3 p-4 bg-card border border-border rounded-2xl hover:border-primary/30 transition-colors">
                  <span className="text-xl flex-shrink-0" role="img" aria-label={uc.title}>{uc.emoji}</span>
                  <div>
                    <p className="font-bold text-foreground text-xs">{uc.title}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">{uc.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Common Mistakes */}
          <div className="space-y-4">
            <h2 className="text-xl font-black text-foreground flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-500" aria-hidden="true" /> Common PDF Editing Mistakes
            </h2>
            <div className="space-y-3">
              {[
                { m: 'Editing without zooming in for small text', f: 'Use the 125% or 150% zoom for precise placement on small or dense PDFs. Click accuracy improves significantly at higher zoom.' },
                { m: 'Not undoing before downloading',            f: 'Press Ctrl+Z to undo any misplaced text or erase box before downloading. You cannot edit after download without re-uploading.' },
                { m: 'Trying to edit scanned PDF text directly',  f: 'Scanned PDFs are images — you cannot select or modify existing text. Add new text on top, or use Image to Text (OCR) to extract and reuse the content.' },
                { m: 'Forgetting edits on other pages',           f: 'Navigate through all pages before downloading. The edit count badge shows total edits — check it matches your expected changes.' },
              ].map((item) => (
                <div key={item.m} className="flex gap-3 p-4 bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-800/50 rounded-xl text-sm">
                  <AlertTriangle className="w-4 h-4 text-yellow-500 shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="font-bold text-foreground">❌ {item.m}</p>
                    <p className="mt-0.5 text-muted-foreground">✅ {item.f}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary */}
          <section id="tool-summary" className="p-6 bg-primary/5 border border-primary/20 rounded-2xl">
            <h2 className="text-xl font-black text-foreground mb-4">Summary</h2>
            <ul className="space-y-2 text-sm" role="list">
              {[
                'Add text anywhere on any PDF page with font, size, and color control.',
                'Choose Helvetica, Times Roman, or Courier font families.',
                'Erase content by drawing white rectangles over it.',
                'Zoom in (50%–150%) for precise text placement.',
                'Ctrl+Z undoes the last edit on the current page.',
                'Multi-page navigation with per-page edit tracking.',
                '100% browser-based — your PDF never leaves your device.',
                'No watermark, no account, free for personal and commercial use.',
              ].map((point) => (
                <li key={point} className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                  <span className="text-muted-foreground">{point}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* FAQ */}
          <section className="space-y-4">
            <h2 className="text-2xl font-black text-foreground">Frequently Asked Questions</h2>
            <div className="space-y-3">
              {faqItems.map((faq, i) => (
                <details key={i} className="bg-card border border-border rounded-2xl p-5 cursor-pointer group">
                  <summary className="font-bold text-foreground list-none flex justify-between items-center text-sm">
                    {faq.q}
                    <span className="transition-transform group-open:rotate-180 text-muted-foreground flex-shrink-0 ml-2" aria-hidden="true">▼</span>
                  </summary>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                </details>
              ))}
            </div>
          </section>

          {/* Related Tools — 10 verified links */}
          <section className="border-t border-border pt-10 space-y-4">
            <h3 className="font-black text-foreground text-xl">Related Free PDF Tools</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { label: 'PDF Password Remover',  sub: 'Unlock PDFs before editing',            href: '/tools/unlock-pdf-no-upload', icon: '🔓' }, // ✅
                { label: 'PDF Redactor',          sub: 'Permanent black-box redaction',         href: '/tools/pdf-redactor',         icon: '🔲' }, // ✅
                { label: 'E-Sign PDF',            sub: 'Add your signature to PDF',              href: '/tools/esign-pdf-no-upload',  icon: '✍️' }, // ✅
                { label: 'Merge PDF',             sub: 'Combine multiple PDFs into one',         href: '/tools/merge-pdf',            icon: '📎' }, // ✅
                { label: 'Split PDF',             sub: 'Extract individual pages',               href: '/tools/split-pdf',            icon: '✂️' }, // ✅
                { label: 'PDF Compressor',        sub: 'Reduce PDF size without quality loss',   href: '/tools/pdf-compressor',       icon: '📉' }, // ✅
                { label: 'Image to Text (OCR)',   sub: 'Extract text from scanned PDFs',         href: '/tools/image-to-text',        icon: '🔍' }, // ✅
                { label: 'PDF to Word',           sub: 'Convert PDF to editable Word doc',       href: '/tools/pdf-to-word',          icon: '📝' }, // ✅
                { label: 'Word to PDF',           sub: 'Convert Word documents to PDF',          href: '/tools/word-to-pdf',          icon: '📄' }, // ✅
                { label: 'Image to PDF',          sub: 'Convert images to PDF documents',        href: '/tools/image-to-pdf',         icon: '🖼️' }, // ✅
              ].map((t) => (
                <Link key={t.href} href={t.href} className="flex items-center gap-3 p-4 border border-border rounded-2xl hover:border-primary/40 hover:shadow-md transition-all group bg-card" aria-label={`${t.label} — ${t.sub}`}>
                  <span className="text-xl" role="img" aria-label={t.label}>{t.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm text-foreground group-hover:text-primary transition-colors">{t.label}</p>
                    <p className="text-xs text-muted-foreground">{t.sub}</p>
                  </div>
                  <MoveRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" aria-hidden="true" />
                </Link>
              ))}
            </div>
            {/* Blog links */}
            <div className="p-4 rounded-xl border bg-muted/30 space-y-2 mt-4">
              <p className="font-bold text-foreground text-sm">Related Reading</p>
              {[
                { href: '/blog/how-to-sign-pdf-online-free',               title: 'How to Sign a PDF Online Free'                    }, // ✅
                { href: '/blog/how-to-merge-pdf-files-free',               title: 'How to Merge PDF Files Free — Step by Step Guide' }, // ✅
                { href: '/blog/free-online-tools-students-2026-no-login',  title: 'Best Free Tools for Students 2026'                }, // ✅
              ].map((post) => (
                <Link key={post.href} href={post.href} className="flex items-center gap-2 text-sm text-primary hover:underline" aria-label={post.title}>
                  <ArrowRight className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />{post.title}
                </Link>
              ))}
            </div>
          </section>

        </section>
      </div>
    </>
  );
}
