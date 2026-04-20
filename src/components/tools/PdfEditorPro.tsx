'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import Link from 'next/link';
import {
  Upload, Download, Type, Eraser, Undo2,
  ChevronLeft, ChevronRight, ShieldCheck,
  Loader2, CheckCircle2, HelpCircle, MoveRight,
  Trash2, MousePointer,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FAQ SCHEMA — JSON-LD for Google rich results
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Can I edit PDF text online for free without a watermark?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. TaskGuru\'s free PDF editor lets you add text, erase content, and download the edited PDF with no watermark and no account required. All processing runs in your browser — your PDF is never uploaded to any server.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does this PDF editor upload my file to a server?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. TaskGuru\'s PDF editor uses pdf-lib and PDF.js running entirely in your browser (client-side). Your PDF file never leaves your device. This makes it safe for bank statements, medical records, legal contracts, and any sensitive document.',
      },
    },
    {
      '@type': 'Question',
      name: 'What can I do with this free online PDF editor?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You can add text anywhere on a PDF page, erase or white-out existing content by drawing over it, navigate between pages, undo recent edits, and download the final result as a clean PDF with no watermark.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I edit scanned PDFs with this tool?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes — you can add text and erase content on any PDF including scanned ones. However, editing the original scanned text itself is not possible since it\'s an image. To extract text from a scanned PDF, use TaskGuru\'s free Image to Text (OCR) tool first.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is this PDF editor free for commercial use?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes — completely free for personal and commercial use. No account, no subscription, no watermarks. Edit invoices, contracts, reports, and business documents without any restrictions.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does it work on mobile phones?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. The PDF editor works on iOS and Android in Chrome and Safari. Touch drawing is supported for both adding text positions and erasing content. For complex editing, desktop browsers give a better experience.',
      },
    },
  ],
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// TYPES
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
type Tool = 'select' | 'text' | 'erase';

interface TextEdit {
  id: string;
  pageIndex: number;
  x: number;        // canvas coords
  y: number;
  pdfX: number;     // pdf coords (for pdf-lib)
  pdfY: number;
  text: string;
  fontSize: number;
  color: string;
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
  width: number;   // pdf-lib points
  height: number;
  canvasW: number;
  canvasH: number;
  scale: number;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// MAIN COMPONENT
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export default function PdfEditorPro() {
  const { toast } = useToast();

  // File state
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0); // 0-indexed
  const [pageDims, setPageDims] = useState<PageDimensions | null>(null);
  const [isRendering, setIsRendering] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Edit state
  const [activeTool, setActiveTool] = useState<Tool>('select');
  const [textEdits, setTextEdits] = useState<TextEdit[]>([]);
  const [eraseEdits, setEraseEdits] = useState<EraseEdit[]>([]);
  const [textInput, setTextInput] = useState('');
  const [fontSize, setFontSize] = useState(14);
  const [textColor, setTextColor] = useState('#000000');
  const [pendingPos, setPendingPos] = useState<{ x: number; y: number } | null>(null);
  const [isErasing, setIsErasing] = useState(false);
  const [eraseStart, setEraseStart] = useState<{ x: number; y: number } | null>(null);

  // Refs
  const pdfCanvasRef = useRef<HTMLCanvasElement>(null);
  const overlayCanvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const pdfDocRef = useRef<unknown>(null);    // PDF.js document
  const pdfLibDocRef = useRef<PDFDocument | null>(null); // pdf-lib document
  const pdfBytesRef = useRef<ArrayBuffer | null>(null);
  const renderTaskRef = useRef<unknown>(null);

  // ── Load PDF.js dynamically
  const loadPdfJs = useCallback(async () => {
    if (typeof window === 'undefined') return null;
    // @ts-ignore
    if (window.pdfjsLib) return window.pdfjsLib;
    return new Promise<unknown>((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
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

  // ── Handle file
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

      // Load with pdf-lib for saving
      const pdfLib = await PDFDocument.load(bytes);
      pdfLibDocRef.current = pdfLib;

      // Load with PDF.js for rendering
      const pdfjsLib = await loadPdfJs();
      // @ts-ignore
      const pdfDoc = await pdfjsLib.getDocument({ data: bytes.slice(0) }).promise;
      pdfDocRef.current = pdfDoc;
      setTotalPages(pdfDoc.numPages);
      toast({ title: '✅ PDF loaded!', description: `${pdfDoc.numPages} page${pdfDoc.numPages > 1 ? 's' : ''} — ready to edit.` });
    } catch (err) {
      toast({ title: 'Failed to load PDF', description: 'Make sure the file is a valid PDF.', variant: 'destructive' });
    } finally {
      setIsRendering(false);
    }
  }, [loadPdfJs, toast]);

  // ── Render current page
  const renderPage = useCallback(async (pageIdx: number) => {
    if (!pdfDocRef.current || !pdfCanvasRef.current) return;
    setIsRendering(true);

    try {
      // @ts-ignore
      if (renderTaskRef.current) renderTaskRef.current.cancel();

      // @ts-ignore
      const page = await pdfDocRef.current.getPage(pageIdx + 1);
      const container = pdfCanvasRef.current.parentElement;
      const maxW = container ? container.clientWidth - 32 : 680;
      const viewport = page.getViewport({ scale: 1 });
      const scale = Math.min(maxW / viewport.width, 1.5);
      const scaledViewport = page.getViewport({ scale });

      const canvas = pdfCanvasRef.current;
      canvas.width = scaledViewport.width;
      canvas.height = scaledViewport.height;

      // Set overlay canvas same size
      if (overlayCanvasRef.current) {
        overlayCanvasRef.current.width = scaledViewport.width;
        overlayCanvasRef.current.height = scaledViewport.height;
      }

      setPageDims({
        width: viewport.width,
        height: viewport.height,
        canvasW: scaledViewport.width,
        canvasH: scaledViewport.height,
        scale,
      });

      const ctx = canvas.getContext('2d')!;
      const task = page.render({ canvasContext: ctx, viewport: scaledViewport });
      renderTaskRef.current = task;
      await task.promise;
    } catch (err: unknown) {
      if (err instanceof Error && err.message !== 'Rendering cancelled') {
        toast({ title: 'Render error', description: String(err), variant: 'destructive' });
      }
    } finally {
      setIsRendering(false);
    }
  }, [toast]);

  // Render on page change
  useEffect(() => {
    if (file && totalPages > 0) renderPage(currentPage);
  }, [file, currentPage, totalPages, renderPage]);

  // ── Redraw overlay (text + erase boxes)
  const redrawOverlay = useCallback(() => {
    const canvas = overlayCanvasRef.current;
    if (!canvas || !pageDims) return;
    const ctx = canvas.getContext('2d')!;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw erase boxes
    eraseEdits.filter(e => e.pageIndex === currentPage).forEach(e => {
      ctx.fillStyle = 'white';
      ctx.fillRect(e.x, e.y, e.width, e.height);
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 1;
      ctx.strokeRect(e.x, e.y, e.width, e.height);
    });

    // Draw text edits
    textEdits.filter(t => t.pageIndex === currentPage).forEach(t => {
      ctx.font = `${t.fontSize * pageDims.scale}px Helvetica, Arial, sans-serif`;
      ctx.fillStyle = t.color;
      ctx.fillText(t.text, t.x, t.y);
    });

    // Draw pending text position
    if (pendingPos && activeTool === 'text') {
      ctx.strokeStyle = '#3b82f6';
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 4]);
      ctx.strokeRect(pendingPos.x - 2, pendingPos.y - fontSize * pageDims.scale, 200, fontSize * pageDims.scale + 8);
      ctx.setLineDash([]);
    }
  }, [eraseEdits, textEdits, currentPage, pageDims, pendingPos, activeTool, fontSize]);

  useEffect(() => { redrawOverlay(); }, [redrawOverlay]);

  // ── Canvas click/draw handlers
  const getCanvasPos = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = overlayCanvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    if ('touches' in e) {
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX,
        y: (e.touches[0].clientY - rect.top) * scaleY,
      };
    }
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!pageDims) return;
    const { x, y } = getCanvasPos(e);

    if (activeTool === 'text') {
      setPendingPos({ x, y });
    }
  };

  const handleEraseStart = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (activeTool !== 'erase' || !pageDims) return;
    e.preventDefault();
    const pos = getCanvasPos(e);
    setIsErasing(true);
    setEraseStart(pos);
  };

  const handleEraseMove = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isErasing || !eraseStart || !pageDims) return;
    e.preventDefault();
    const pos = getCanvasPos(e);
    // Draw preview
    const canvas = overlayCanvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    redrawOverlay();
    ctx.fillStyle = 'rgba(255,255,255,0.7)';
    ctx.fillRect(eraseStart.x, eraseStart.y, pos.x - eraseStart.x, pos.y - eraseStart.y);
    ctx.strokeStyle = '#f87171';
    ctx.lineWidth = 1.5;
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

    if (w < 5 || h < 5) { setEraseStart(null); return; }

    // Convert to pdf-lib coords (origin bottom-left)
    const pdfX = x / pageDims.scale;
    const pdfY = pageDims.height - (y + h) / pageDims.scale;
    const pdfW = w / pageDims.scale;
    const pdfH = h / pageDims.scale;

    setEraseEdits(prev => [...prev, {
      id: Date.now().toString(),
      pageIndex: currentPage,
      x, y, width: w, height: h,
      pdfX, pdfY, pdfW, pdfH,
    }]);
    setEraseStart(null);
    toast({ title: '✅ Content erased', description: 'White box added over selected area.' });
  };

  // ── Add text edit
  const addTextEdit = () => {
    if (!pendingPos || !textInput.trim() || !pageDims) return;

    const pdfX = pendingPos.x / pageDims.scale;
    const pdfY = pageDims.height - pendingPos.y / pageDims.scale;

    setTextEdits(prev => [...prev, {
      id: Date.now().toString(),
      pageIndex: currentPage,
      x: pendingPos.x,
      y: pendingPos.y,
      pdfX,
      pdfY,
      text: textInput,
      fontSize,
      color: textColor,
    }]);

    setTextInput('');
    setPendingPos(null);
    toast({ title: '✅ Text added' });
  };

  // ── Undo last edit
  const handleUndo = () => {
    if (textEdits.filter(t => t.pageIndex === currentPage).length > 0) {
      setTextEdits(prev => {
        const onPage = prev.filter(t => t.pageIndex === currentPage);
        if (onPage.length === 0) return prev;
        const lastId = onPage[onPage.length - 1].id;
        return prev.filter(t => t.id !== lastId);
      });
    } else {
      setEraseEdits(prev => {
        const onPage = prev.filter(e => e.pageIndex === currentPage);
        if (onPage.length === 0) return prev;
        const lastId = onPage[onPage.length - 1].id;
        return prev.filter(e => e.id !== lastId);
      });
    }
  };

  // ── Save PDF with all edits
  const handleSave = async () => {
    if (!pdfBytesRef.current) return;
    setIsSaving(true);

    try {
      const pdfDoc = await PDFDocument.load(pdfBytesRef.current);
      const pages = pdfDoc.getPages();
      const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);

      // Apply erase edits (white rectangles)
      eraseEdits.forEach(edit => {
        const page = pages[edit.pageIndex];
        if (!page) return;
        page.drawRectangle({
          x: edit.pdfX,
          y: edit.pdfY,
          width: edit.pdfW,
          height: edit.pdfH,
          color: rgb(1, 1, 1),
          borderWidth: 0,
        });
      });

      // Apply text edits
      for (const edit of textEdits) {
        const page = pages[edit.pageIndex];
        if (!page) continue;

        // Parse hex color
        const hex = edit.color.replace('#', '');
        const r = parseInt(hex.substring(0, 2), 16) / 255;
        const g = parseInt(hex.substring(2, 4), 16) / 255;
        const b = parseInt(hex.substring(4, 6), 16) / 255;

        page.drawText(edit.text, {
          x: edit.pdfX,
          y: edit.pdfY,
          size: edit.fontSize,
          font: helvetica,
          color: rgb(r, g, b),
        });
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `edited_${file?.name || 'document.pdf'}`;
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 5000);

      toast({ title: '✅ PDF Downloaded!', description: 'No watermark. All edits saved.' });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to save PDF';
      toast({ title: 'Save failed', description: msg, variant: 'destructive' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setTextEdits([]);
    setEraseEdits([]);
    setCurrentPage(0);
    setTotalPages(0);
    setPendingPos(null);
    pdfDocRef.current = null;
    pdfLibDocRef.current = null;
    pdfBytesRef.current = null;
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const totalEdits = textEdits.length + eraseEdits.length;
  const pageEdits = textEdits.filter(t => t.pageIndex === currentPage).length +
                    eraseEdits.filter(e => e.pageIndex === currentPage).length;

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // RENDER
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-5xl mx-auto px-4 space-y-8">

        {/* Privacy badge */}
        <div className="flex justify-center">
          <div className="flex items-center gap-2 text-xs font-bold text-green-600 bg-green-50 dark:bg-green-950/40 border border-green-200 dark:border-green-900 px-4 py-2 rounded-full">
            <ShieldCheck className="w-3.5 h-3.5" />
            100% Private — PDF never leaves your device
          </div>
        </div>

        {/* ── UPLOAD STATE ── */}
        {!file && (
          <div
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setIsDragging(false);
              const f = e.dataTransfer.files[0];
              if (f) handleFile(f);
            }}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-3xl p-16 flex flex-col items-center gap-5 cursor-pointer transition-all ${
              isDragging
                ? 'border-primary bg-primary/5 scale-[1.01]'
                : 'border-slate-200 dark:border-slate-700 hover:border-primary/50'
            }`}
          >
            <input ref={fileInputRef} type="file" accept=".pdf" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
            <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center">
              <Upload className="w-10 h-10 text-primary" />
            </div>
            <div className="text-center">
              <p className="text-xl font-black text-foreground">Drop your PDF here to start editing</p>
              <p className="text-sm text-muted-foreground mt-1">or click to browse — Runs 100% in your browser</p>
            </div>
            <div className="flex flex-wrap justify-center gap-2 text-xs font-bold">
              {['✅ No Upload', '✅ No Signup', '✅ No Watermark', '✅ Free Forever'].map(f => (
                <span key={f} className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-600 dark:text-slate-400">{f}</span>
              ))}
            </div>
          </div>
        )}

        {/* ── EDITOR STATE ── */}
        {file && (
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
                <button onClick={handleReset} className="text-xs font-bold text-muted-foreground hover:text-red-500 transition-colors">Change File</button>
                <button
                  onClick={handleSave}
                  disabled={isSaving || totalEdits === 0}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:opacity-40 text-white font-bold text-sm rounded-xl transition-colors"
                >
                  {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                  Download PDF
                </button>
              </div>
            </div>

            {/* Toolbar */}
            <div className="flex flex-wrap items-center gap-2 p-3 bg-slate-50 dark:bg-slate-900 border border-border rounded-2xl">
              {/* Tool buttons */}
              {([
                { id: 'select' as Tool, icon: MousePointer, label: 'Select' },
                { id: 'text' as Tool, icon: Type, label: 'Add Text' },
                { id: 'erase' as Tool, icon: Eraser, label: 'Erase / Whitebox' },
              ] as const).map((btn) => (
                <button
                  key={btn.id}
                  onClick={() => { setActiveTool(btn.id); setPendingPos(null); }}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeTool === btn.id
                      ? 'bg-primary text-white shadow-md shadow-primary/20'
                      : 'bg-white dark:bg-slate-800 border border-border text-foreground hover:border-primary/40'
                  }`}
                >
                  <btn.icon className="w-3.5 h-3.5" />
                  {btn.label}
                </button>
              ))}

              <div className="h-6 w-px bg-border mx-1" />

              {/* Text options — only when text tool */}
              {activeTool === 'text' && (
                <>
                  <div className="flex items-center gap-1.5">
                    <label className="text-[10px] font-black text-muted-foreground uppercase">Size</label>
                    <select
                      value={fontSize}
                      onChange={(e) => setFontSize(Number(e.target.value))}
                      className="text-xs border border-border rounded-lg px-2 py-1.5 bg-white dark:bg-slate-800 text-foreground"
                    >
                      {[8, 10, 12, 14, 16, 18, 20, 24, 28, 32].map(s => (
                        <option key={s} value={s}>{s}px</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <label className="text-[10px] font-black text-muted-foreground uppercase">Color</label>
                    <input
                      type="color"
                      value={textColor}
                      onChange={(e) => setTextColor(e.target.value)}
                      className="w-8 h-8 rounded-lg border border-border cursor-pointer"
                    />
                  </div>
                </>
              )}

              <div className="h-6 w-px bg-border mx-1" />

              {/* Undo */}
              <button
                onClick={handleUndo}
                disabled={pageEdits === 0}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-white dark:bg-slate-800 border border-border disabled:opacity-40 hover:border-primary/40 transition-colors"
              >
                <Undo2 className="w-3.5 h-3.5" />
                Undo
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
              >
                <Trash2 className="w-3.5 h-3.5" />
                Clear Page
              </button>

              {/* Page nav */}
              {totalPages > 1 && (
                <>
                  <div className="h-6 w-px bg-border mx-1" />
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setCurrentPage(p => Math.max(0, p - 1))}
                      disabled={currentPage === 0}
                      className="p-1.5 rounded-lg border border-border disabled:opacity-40 hover:bg-muted transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span className="text-xs font-bold text-foreground px-2">
                      {currentPage + 1} / {totalPages}
                    </span>
                    <button
                      onClick={() => setCurrentPage(p => Math.min(totalPages - 1, p + 1))}
                      disabled={currentPage === totalPages - 1}
                      className="p-1.5 rounded-lg border border-border disabled:opacity-40 hover:bg-muted transition-colors"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Tool hint */}
            <div className="text-xs text-center text-muted-foreground font-medium h-5">
              {activeTool === 'text' && !pendingPos && '💡 Click anywhere on the PDF to place your text'}
              {activeTool === 'text' && pendingPos && '📝 Type your text below and click Add'}
              {activeTool === 'erase' && '🔲 Click and drag to draw a white box over content'}
              {activeTool === 'select' && totalEdits === 0 && '← Choose a tool above to start editing'}
            </div>

            {/* PDF Canvas */}
            <div className="relative bg-slate-300 dark:bg-slate-700 rounded-2xl overflow-hidden flex items-start justify-center p-4 min-h-[400px]">
              {isRendering && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/50 dark:bg-black/50 z-20 rounded-2xl">
                  <div className="flex items-center gap-2 text-sm font-bold text-foreground">
                    <Loader2 className="w-5 h-5 animate-spin text-primary" />
                    Rendering PDF...
                  </div>
                </div>
              )}

              <div className="relative shadow-2xl">
                {/* PDF render canvas */}
                <canvas
                  ref={pdfCanvasRef}
                  className="block bg-white"
                  style={{ maxWidth: '100%' }}
                />
                {/* Overlay canvas for edits */}
                <canvas
                  ref={overlayCanvasRef}
                  className="absolute inset-0 block"
                  style={{
                    maxWidth: '100%',
                    cursor: activeTool === 'text' ? 'text' : activeTool === 'erase' ? 'crosshair' : 'default',
                  }}
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

            {/* Text input box — appears when text tool is active and position chosen */}
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
                />
                <button
                  onClick={addTextEdit}
                  disabled={!textInput.trim()}
                  className="px-5 py-2.5 bg-primary hover:bg-primary/90 disabled:opacity-40 text-white font-bold rounded-xl text-sm transition-colors"
                >
                  Add
                </button>
                <button
                  onClick={() => setPendingPos(null)}
                  className="px-4 py-2.5 border border-border hover:bg-muted text-foreground font-bold rounded-xl text-sm transition-colors"
                >
                  Cancel
                </button>
              </div>
            )}

            {/* Edits summary */}
            {totalEdits > 0 && (
              <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-950/20 border border-green-100 dark:border-green-900 rounded-xl text-sm">
                <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                <span className="text-green-700 dark:text-green-400 font-semibold">
                  {totalEdits} edit{totalEdits > 1 ? 's' : ''} applied across {new Set([...textEdits.map(t => t.pageIndex), ...eraseEdits.map(e => e.pageIndex)]).size} page{totalEdits > 1 ? 's' : ''} — download when ready.
                </span>
              </div>
            )}
          </div>
        )}

        {/* ── SEO CONTENT ── */}
        <section className="space-y-10 border-t border-border pt-12">

          {/* What it does */}
          <div className="space-y-4">
            <h2 className="text-2xl font-black text-foreground">Free Online PDF Editor — No Upload, No Watermark</h2>
            <p className="text-muted-foreground leading-relaxed">
              Most &quot;free&quot; PDF editors upload your file to a server, watermark the result, or lock the download behind a subscription. This tool doesn&apos;t do any of that. It uses PDF.js and pdf-lib running directly in your browser — your PDF file is never sent anywhere. It stays in your browser&apos;s memory from start to finish.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              You can add text at any position on any page, draw white boxes to cover content you want to erase, navigate multi-page documents, undo edits, and download a clean PDF instantly.
            </p>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-2 gap-5">
            {[
              {
                title: 'Add Text to Any PDF Page',
                desc: 'Click anywhere on the rendered PDF, type your text, choose font size and color, and it gets embedded at that exact position. Works on any PDF — scanned or digital.',
              },
              {
                title: 'Erase and White-Out PDF Content',
                desc: 'Draw a white rectangle over any content you want to hide. Useful for redacting addresses, covering outdated info, or masking sensitive fields before sharing.',
              },
              {
                title: 'Multi-Page Navigation',
                desc: 'Navigate between pages using the prev/next buttons. Edits on each page are tracked separately and all applied when you download.',
              },
              {
                title: 'No Upload — 100% Browser Processing',
                desc: 'Unlike iLovePDF, Smallpdf, or Adobe Acrobat online, nothing is sent to a server. This matters when editing bank statements, medical records, or legal contracts.',
              },
            ].map((item) => (
              <div key={item.title} className="p-5 bg-card border border-border rounded-2xl space-y-2">
                <h3 className="font-black text-foreground text-sm">{item.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Use cases */}
          <div className="space-y-4">
            <h2 className="text-xl font-black text-foreground">Common Uses</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { emoji: '📝', title: 'Fill PDF Forms', desc: 'Add text to form fields in PDFs that don\'t have interactive forms. Type directly onto the PDF.' },
                { emoji: '✏️', title: 'Annotate Documents', desc: 'Add notes, comments, or corrections to any PDF — reports, drafts, research papers.' },
                { emoji: '🔲', title: 'Redact Information', desc: 'White-out names, account numbers, addresses before forwarding sensitive documents.' },
                { emoji: '📄', title: 'Update Old PDFs', desc: 'Add a new date, correct a typo, or update a contact number on an existing PDF.' },
                { emoji: '🧾', title: 'Edit Invoices', desc: 'Add missing line items or correct amounts on PDF invoices you created elsewhere.' },
                { emoji: '🏦', title: 'Annotate Bank Statements', desc: 'Add labels or category notes to transactions before sharing with an accountant.' },
              ].map((uc) => (
                <div key={uc.title} className="flex gap-3 p-4 bg-card border border-border rounded-2xl hover:border-primary/30 transition-colors">
                  <span className="text-xl flex-shrink-0">{uc.emoji}</span>
                  <div>
                    <p className="font-bold text-foreground text-xs">{uc.title}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">{uc.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <section className="space-y-4">
            <h2 className="text-2xl font-black text-foreground flex items-center gap-2">
              <HelpCircle className="w-6 h-6 text-primary" /> Frequently Asked Questions
            </h2>
            <div className="space-y-3">
              {faqSchema.mainEntity.map((faq, i) => (
                <details key={i} className="bg-card border border-border rounded-2xl p-5 cursor-pointer group">
                  <summary className="font-bold text-foreground list-none flex justify-between items-center text-sm">
                    {faq.name}
                    <span className="transition-transform group-open:rotate-180 text-muted-foreground flex-shrink-0 ml-2">▼</span>
                  </summary>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{faq.acceptedAnswer.text}</p>
                </details>
              ))}
            </div>
          </section>

          {/* Related tools */}
          <section className="border-t border-border pt-10 space-y-4">
            <h3 className="font-black text-foreground">Related Free PDF Tools</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { label: 'PDF Password Remover', sub: 'Unlock before editing', href: '/tools/unlock-pdf-no-upload', icon: '🔓' },
                { label: 'PDF Redactor', sub: 'Permanent black-box redaction', href: '/tools/pdf-redactor', icon: '🔲' },
                { label: 'E-Sign PDF', sub: 'Add signature to PDF', href: '/tools/esign-pdf-no-upload', icon: '✍️' },
                { label: 'Merge PDF', sub: 'Combine edited PDFs', href: '/tools/merge-pdf', icon: '📎' },
              ].map((t) => (
                <Link key={t.href} href={t.href} className="flex items-center gap-3 p-4 border border-border rounded-2xl hover:border-primary/40 hover:shadow-md transition-all group bg-card">
                  <span className="text-xl">{t.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm text-foreground group-hover:text-primary transition-colors">{t.label}</p>
                    <p className="text-xs text-muted-foreground">{t.sub}</p>
                  </div>
                  <MoveRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                </Link>
              ))}
            </div>
          </section>

        </section>
      </div>
    </>
  );
                    }
