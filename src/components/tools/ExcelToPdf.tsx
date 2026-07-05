'use client';

import { useState, useRef } from 'react';
import Script from 'next/script';
import Link from 'next/link';
import * as XLSX from 'xlsx';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import {
  Upload, FileSpreadsheet, Download, Trash2,
  Loader2, CheckCircle, ShieldCheck, Zap,
  Globe, ArrowRight, Clock, User, RefreshCw,
  AlertTriangle, Columns, Layers,
} from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

/* ─── Constants ─────────────────────────────────────────────── */
const MAX_SIZE_MB    = 50;
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;
const LAST_UPDATED   = 'June 2026';
const READ_TIME      = '5 min read';
const REVIEWED_BY    = 'Shubham Gautam';

/* ─── Types — unchanged ──────────────────────────────────────── */
interface SheetData {
  name: string;
  rows: string[][];
  headers: string[];
}

/* ─── FAQ ────────────────────────────────────────────────────── */
const faqItems = [
  { q: 'How do I convert Excel to PDF for free?',            a: "Upload your Excel file (.xlsx or .xls) to TaskGuru's free Excel to PDF converter. The tool converts your spreadsheet to a clean PDF instantly in your browser. No signup, no payment, no watermark." },
  { q: 'Is my Excel file safe when converting online?',      a: "Yes — completely safe. TaskGuru processes your Excel file entirely in your browser using JavaScript. Your file never gets uploaded to any server. Financial data, business spreadsheets, and personal information stay on your device." },
  { q: 'Can I convert Excel to PDF without Microsoft Office?',a: "Yes. TaskGuru's Excel to PDF converter works without any software installation. It runs in your browser on Windows, Mac, Android, and iOS." },
  { q: 'Which Excel formats are supported?',                 a: 'TaskGuru supports .xlsx (Excel 2007+) and .xls (older Excel) formats. Both single-sheet and multi-sheet workbooks are supported, with an option to convert all sheets at once.' },
  { q: 'Why convert Excel to PDF?',                          a: 'PDF files look identical on every device and cannot be accidentally edited. Converting Excel reports, invoices, or financial statements to PDF ensures they print correctly and look professional when shared.' },
  { q: 'Can I convert all sheets in a workbook at once?',    a: 'Yes — enable the Convert All Sheets toggle to combine every sheet into a single PDF document, with each sheet clearly labelled as a separate section.' },
  { q: 'Which orientation should I choose?',                 a: 'Use Landscape (default) for wide spreadsheets with many columns. Use Portrait for narrow data or when printing on standard A4 paper in standard orientation.' },
];

/* ─── Schemas ─────────────────────────────────────────────────── */
const toolSchema = {
  '@context': 'https://schema.org',
  '@type': ['WebApplication', 'SoftwareApplication'],
  name: 'Free Excel to PDF Converter — TaskGuru',
  url: 'https://www.taskguru.online/tools/excel-to-pdf',
  applicationCategory: 'Utility',
  operatingSystem: 'Any',
  browserRequirements: 'Requires JavaScript',
  description: 'Free browser-based Excel to PDF converter. Convert .xlsx and .xls files to clean, table-formatted PDFs with no server upload, no watermark, and no Microsoft Office required.',
  featureList: [
    'Convert .xlsx and .xls to PDF',
    'Portrait and Landscape orientation options',
    'Convert All Sheets in one PDF',
    'Live spreadsheet preview before conversion',
    'Multi-sheet workbook support',
    'Client-side processing — no server upload',
    'No watermark on output',
    'No Microsoft Office required',
  ],
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD', availability: 'https://schema.org/InStock' },
  publisher: { '@type': 'Organization', name: 'TaskGuru', url: 'https://www.taskguru.online', logo: { '@type': 'ImageObject', url: 'https://www.taskguru.online/logo.png' } },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Convert Excel to PDF Free Using TaskGuru',
  description: 'Step-by-step guide to converting .xlsx or .xls files to PDF without Microsoft Office using TaskGuru.',
  totalTime: 'PT1M',
  estimatedCost: { '@type': 'MonetaryAmount', currency: 'USD', value: '0' },
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Upload your Excel file',  text: 'Drag and drop or click to browse your .xlsx or .xls file. Supports up to 50MB.' },
    { '@type': 'HowToStep', position: 2, name: 'Choose settings',         text: 'Select orientation (Landscape or Portrait) and whether to convert one sheet or all sheets at once.' },
    { '@type': 'HowToStep', position: 3, name: 'Preview your data',       text: 'Check the live table preview to confirm your data looks correct before converting.' },
    { '@type': 'HowToStep', position: 4, name: 'Convert and download',    text: 'Click Convert to PDF. The PDF generates entirely in your browser — no upload. Download instantly.' },
  ],
};

/* ─── PDF drawing helper — converts max content widths per column ─ */
function calcColWidths(allRows: string[][], colCount: number, availWidth: number): number[] {
  const MIN_COL = 40;
  const MAX_COL = 160;
  const widths: number[] = Array(colCount).fill(0);

  allRows.forEach((row) => {
    for (let c = 0; c < colCount; c++) {
      const len = (row[c] || '').length;
      widths[c] = Math.max(widths[c], len);
    }
  });

  // Normalize to available width
  const totalWeight = widths.reduce((a, b) => a + b, 0) || 1;
  return widths.map((w) =>
    Math.max(MIN_COL, Math.min(MAX_COL, (w / totalWeight) * availWidth))
  );
}

/* ─── Component ─────────────────────────────────────────────── */
export default function ExcelToPdf() {
  const { toast } = useToast();

  // Original state — unchanged
  const [file, setFile]                 = useState<File | null>(null);
  const [sheets, setSheets]             = useState<SheetData[]>([]);
  const [selectedSheet, setSelectedSheet] = useState(0);
  const [isConverting, setIsConverting] = useState(false);
  const [isDone, setIsDone]             = useState(false);
  const [pdfBlob, setPdfBlob]           = useState<Blob | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ── NEW: Orientation + All Sheets toggle
  const [orientation, setOrientation]         = useState<'landscape' | 'portrait'>('landscape');
  const [convertAllSheets, setConvertAllSheets] = useState(false);

  /* ── Original logic — UNCHANGED ── */
  const validateAndSetFile = async (f: File) => {
    const validTypes = [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel',
    ];
    const validExts = ['.xlsx', '.xls'];
    const ext = f.name.toLowerCase().slice(f.name.lastIndexOf('.'));

    if (!validTypes.includes(f.type) && !validExts.includes(ext)) {
      toast({ title: 'Invalid File', description: 'Please upload an Excel file (.xlsx or .xls)', variant: 'destructive' });
      return;
    }
    if (f.size > MAX_SIZE_BYTES) {
      toast({ title: 'File Too Large', description: `Max ${MAX_SIZE_MB}MB allowed.`, variant: 'destructive' });
      return;
    }

    setFile(f);
    setIsDone(false);
    setPdfBlob(null);

    const buffer = await f.arrayBuffer();
    const workbook = XLSX.read(buffer, { type: 'array' });
    const parsedSheets: SheetData[] = workbook.SheetNames.map((name) => {
      const ws = workbook.Sheets[name];
      const json: string[][] = XLSX.utils.sheet_to_json(ws, { header: 1, defval: '' });
      const headers = (json[0] || []).map(String);
      const rows    = json.slice(1).map((row) => row.map(String));
      return { name, headers, rows };
    });
    setSheets(parsedSheets);
    setSelectedSheet(0);
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

  /* ── ENHANCED handleConvert — supports orientation + all sheets ── */
  const handleConvert = async () => {
    if (!file || sheets.length === 0) return;
    setIsConverting(true);

    // Page dimensions based on orientation
    const isLandscape = orientation === 'landscape';
    const pageWidth   = isLandscape ? 841.89 : 595.28;
    const pageHeight  = isLandscape ? 595.28 : 841.89;
    const margin      = 40;
    const rowHeight   = 20;
    const headerHeight = 26;
    const fontSize    = 9;
    const headerFontSize = 10;
    const availWidth  = pageWidth - margin * 2;

    try {
      const pdfDoc  = await PDFDocument.create();
      const font     = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

      const sheetsToProcess = convertAllSheets ? sheets : [sheets[selectedSheet]];

      for (const sheet of sheetsToProcess) {
        const allRows = [sheet.headers, ...sheet.rows].filter((r) => r.some((c) => c !== ''));
        if (allRows.length === 0) continue;

        const colCount  = Math.max(...allRows.map((r) => r.length));
        const colWidths = calcColWidths(allRows, colCount, availWidth);

        let page = pdfDoc.addPage([pageWidth, pageHeight]);
        let y    = pageHeight - margin;

        // Sheet title
        page.drawText(sheet.name, {
          x: margin, y: y - 16, size: 14, font: boldFont, color: rgb(0.1, 0.1, 0.1),
        });
        y -= 36;

        for (let rowIndex = 0; rowIndex < allRows.length; rowIndex++) {
          const isHeader = rowIndex === 0;
          const rowH     = isHeader ? headerHeight : rowHeight;

          if (y - rowH < margin) {
            page = pdfDoc.addPage([pageWidth, pageHeight]);
            y    = pageHeight - margin;
          }

          if (isHeader) {
            page.drawRectangle({ x: margin, y: y - rowH, width: availWidth, height: rowH, color: rgb(0.15, 0.35, 0.65) });
          } else if (rowIndex % 2 === 0) {
            page.drawRectangle({ x: margin, y: y - rowH, width: availWidth, height: rowH, color: rgb(0.96, 0.97, 0.99) });
          }

          const row = allRows[rowIndex];
          let cellX = margin;
          for (let colIndex = 0; colIndex < colCount; colIndex++) {
            const colW     = colWidths[colIndex] ?? (availWidth / colCount);
            const cellText = String(row[colIndex] || '');
            // Truncate to fit column width (approx 7px per char at fontSize 9)
            const maxChars  = Math.floor((colW - 8) / 5.5);
            const truncated = cellText.length > maxChars ? cellText.slice(0, maxChars - 1) + '…' : cellText;

            page.drawRectangle({ x: cellX, y: y - rowH, width: colW, height: rowH, borderColor: rgb(0.8, 0.85, 0.9), borderWidth: 0.5, opacity: 0 });
            page.drawText(truncated, {
              x: cellX + 4, y: y - rowH + (isHeader ? 8 : 6),
              size: isHeader ? headerFontSize : fontSize,
              font: isHeader ? boldFont : font,
              color: isHeader ? rgb(1, 1, 1) : rgb(0.15, 0.15, 0.15),
              maxWidth: colW - 8,
            });
            cellX += colW;
          }
          y -= rowH;
        }
      }

      // Footer on all pages
      const pages = pdfDoc.getPages();
      pages.forEach((p, i) => {
        p.drawText(`Generated by TaskGuru.online • ${convertAllSheets ? 'All Sheets' : `Sheet: ${sheets[selectedSheet].name}`} • Page ${i + 1} of ${pages.length}`, {
          x: margin, y: 20, size: 7, font, color: rgb(0.6, 0.6, 0.6),
        });
      });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      setPdfBlob(blob);
      setIsDone(true);
      const totalRows = (convertAllSheets ? sheets : [sheets[selectedSheet]]).reduce((a, s) => a + s.rows.length, 0);
      toast({ title: 'Conversion Complete!', description: `${totalRows} rows across ${sheetsToProcess.length} sheet(s) converted to PDF.` });
    } catch (err) {
      console.error(err);
      toast({ title: 'Conversion Failed', description: 'Could not convert this file. Please try a different Excel file.', variant: 'destructive' });
    } finally {
      setIsConverting(false);
    }
  };

  const handleDownload = () => {
    if (!pdfBlob || !file) return;
    const url = URL.createObjectURL(pdfBlob);
    const a   = document.createElement('a');
    a.href     = url;
    a.download = file.name.replace(/\.(xlsx|xls)$/i, '.pdf');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast({ title: 'Downloaded!', description: 'PDF saved to your device.' });
  };

  const handleReset = () => {
    setFile(null);
    setSheets([]);
    setIsDone(false);
    setPdfBlob(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <>
      <Script id="excel-pdf-tool-schema"  type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema)  }} />
      <Script id="excel-pdf-faq-schema"   type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema)   }} />
      <Script id="excel-pdf-howto-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />

      {/* ── EEAT META BAR ── */}
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground border-b border-border pb-4 mb-6">
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
      <section id="quick-answer" aria-label="Quick Answer" className="p-5 bg-primary/5 border border-primary/20 rounded-2xl mb-6">
        <p className="text-xs font-bold text-primary uppercase tracking-wider mb-2">⚡ Quick Answer</p>
        <p className="text-sm leading-relaxed text-foreground">
          <strong>TaskGuru&apos;s Free Excel to PDF Converter</strong> converts .xlsx and .xls files to clean, table-formatted PDFs entirely in your browser. Choose Portrait or Landscape orientation, convert one sheet or all sheets at once, and download instantly — no Microsoft Office, no server upload, no watermark.
        </p>
      </section>

      {/* ── TOOL CARD ── */}
      <Card className="w-full max-w-2xl mx-auto shadow-2xl mt-8 border-2 border-primary/10 rounded-[2rem] bg-white dark:bg-gray-900">
        <CardContent className="p-6 sm:p-10 space-y-6">

          {!file ? (
            <div
              role="button"
              tabIndex={0}
              aria-label="Upload Excel file — drag and drop or click to browse"
              className="flex flex-col items-center justify-center space-y-5 p-10 sm:p-14 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-[1.5rem] cursor-pointer hover:border-primary/50 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
              onClick={() => fileInputRef.current?.click()}
              onKeyDown={(e) => e.key === 'Enter' && fileInputRef.current?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
            >
              <div className="p-5 bg-green-50 dark:bg-green-900/20 text-green-600 rounded-full">
                <FileSpreadsheet className="w-10 h-10" aria-hidden="true" />
              </div>
              <div className="text-center space-y-2">
                <h3 className="text-xl font-black text-gray-800 dark:text-white">Upload Excel File</h3>
                <p className="text-gray-500 text-sm font-medium">Drag &amp; Drop or Click to Browse</p>
                <p className="text-xs text-green-600 font-bold bg-green-50 dark:bg-green-900/20 inline-block px-3 py-1 rounded-full">
                  .xlsx / .xls · Max {MAX_SIZE_MB}MB · 100% Private
                </p>
              </div>
              <input
                ref={fileInputRef}
                id="excel-pdf-input"
                type="file"
                accept=".xlsx,.xls"
                className="hidden"
                onChange={handleFileChange}
                aria-label="Choose Excel file to convert to PDF"
              />
            </div>
          ) : (
            <div className="space-y-5">

              {/* File info */}
              <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700">
                <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl flex-shrink-0">
                  <FileSpreadsheet className="w-6 h-6 text-green-600" aria-hidden="true" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-gray-900 dark:text-white text-sm truncate">{file.name}</p>
                  <p className="text-xs text-gray-500">
                    {sheets.length} sheet{sheets.length !== 1 ? 's' : ''} · {(file.size / 1024).toFixed(1)} KB
                  </p>
                </div>
              </div>

              {/* ── NEW: Orientation + All Sheets toggles ── */}
              <div className="grid grid-cols-2 gap-3">
                {/* Orientation */}
                <div className="space-y-2">
                  <p className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Columns className="w-3.5 h-3.5" aria-hidden="true" /> Orientation
                  </p>
                  <div className="flex gap-2" role="group" aria-label="PDF orientation">
                    {(['landscape', 'portrait'] as const).map((o) => (
                      <button
                        key={o}
                        onClick={() => setOrientation(o)}
                        aria-pressed={orientation === o}
                        className={`flex-1 py-2 rounded-xl text-xs font-bold capitalize transition-all border ${
                          orientation === o
                            ? 'bg-primary text-white border-primary shadow-md'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-transparent hover:border-slate-300'
                        }`}
                      >
                        {o === 'landscape' ? '↔ Landscape' : '↕ Portrait'}
                      </button>
                    ))}
                  </div>
                  <p className="text-[10px] text-gray-400">
                    {orientation === 'landscape' ? 'A4 841×595pt — best for wide spreadsheets' : 'A4 595×842pt — best for narrow data'}
                  </p>
                </div>

                {/* All Sheets */}
                <div className="space-y-2">
                  <p className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5" aria-hidden="true" /> Sheets
                  </p>
                  <button
                    onClick={() => setConvertAllSheets((v) => !v)}
                    aria-pressed={convertAllSheets}
                    disabled={sheets.length <= 1}
                    className={`w-full py-2 rounded-xl text-xs font-bold transition-all border ${
                      convertAllSheets
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-md'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-transparent hover:border-slate-300 disabled:opacity-40'
                    }`}
                  >
                    {convertAllSheets ? '✅ All Sheets' : `Sheet ${selectedSheet + 1} of ${sheets.length}`}
                  </button>
                  <p className="text-[10px] text-gray-400">
                    {sheets.length <= 1 ? 'Only one sheet detected' : convertAllSheets ? 'All sheets → one PDF' : 'Select a sheet below'}
                  </p>
                </div>
              </div>

              {/* Sheet selector — shown when not converting all */}
              {sheets.length > 1 && !convertAllSheets && (
                <div className="space-y-2">
                  <p className="text-sm font-bold text-gray-700 dark:text-gray-300">Select Sheet</p>
                  <div className="flex flex-wrap gap-2" role="group" aria-label="Select spreadsheet sheet">
                    {sheets.map((s, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedSheet(i)}
                        aria-pressed={selectedSheet === i}
                        className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all ${
                          selectedSheet === i
                            ? 'bg-primary text-white shadow-md'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        {s.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Preview */}
              {sheets[selectedSheet] && (
                <div className="space-y-2">
                  <p className="text-sm font-bold text-gray-700 dark:text-gray-300">
                    Preview — {convertAllSheets ? 'All Sheets' : sheets[selectedSheet].name}
                    <span className="text-xs font-normal text-gray-400 ml-2">
                      ({sheets[selectedSheet].rows.length} rows, {sheets[selectedSheet].headers.length} columns)
                    </span>
                  </p>
                  <div className="overflow-x-auto rounded-xl border border-gray-100 dark:border-gray-800 max-h-48">
                    <table className="w-full text-xs">
                      <thead className="bg-primary text-white sticky top-0">
                        <tr>
                          {sheets[selectedSheet].headers.slice(0, 6).map((h, i) => (
                            <th key={i} className="px-3 py-2 text-left font-bold whitespace-nowrap max-w-[100px] truncate">
                              {h || `Col ${i + 1}`}
                            </th>
                          ))}
                          {sheets[selectedSheet].headers.length > 6 && (
                            <th className="px-3 py-2 text-left text-white/60">+{sheets[selectedSheet].headers.length - 6} more</th>
                          )}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50 dark:divide-gray-800 bg-white dark:bg-gray-900">
                        {sheets[selectedSheet].rows.slice(0, 5).map((row, i) => (
                          <tr key={i} className={i % 2 === 0 ? 'bg-gray-50/50 dark:bg-gray-800/30' : ''}>
                            {row.slice(0, 6).map((cell, j) => (
                              <td key={j} className="px-3 py-1.5 text-gray-700 dark:text-gray-300 max-w-[100px] truncate">{cell}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Success */}
              {isDone && (
                <div className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-2xl border border-green-200 dark:border-green-800" role="status" aria-live="polite">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-bold text-green-700 dark:text-green-300">PDF Ready!</p>
                    <p className="text-xs text-green-600">Click Download to save your PDF.</p>
                  </div>
                </div>
              )}

              {/* Loading */}
              {isConverting && (
                <div className="flex items-center gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-900" role="status" aria-live="polite">
                  <Loader2 className="w-5 h-5 text-blue-600 animate-spin flex-shrink-0" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-bold text-blue-700 dark:text-blue-300">Converting...</p>
                    <p className="text-xs text-blue-500">Your file never leaves your device.</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>

        {file && (
          <CardFooter className="flex flex-col sm:flex-row justify-center gap-3 bg-gray-50/80 dark:bg-gray-800/50 p-6 border-t rounded-b-[2rem]">
            <Button variant="outline" size="lg" onClick={handleReset} disabled={isConverting} className="w-full sm:w-auto rounded-xl h-11" aria-label="Remove file and start over">
              <Trash2 className="mr-2 h-4 w-4" aria-hidden="true" /> Change File
            </Button>
            {!isDone ? (
              <Button size="lg" onClick={handleConvert} disabled={isConverting || !file} className="w-full sm:w-auto rounded-xl h-11 font-bold shadow-lg shadow-green-500/20" aria-label="Convert Excel to PDF">
                {isConverting
                  ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" /> Converting...</>
                  : <><FileSpreadsheet className="mr-2 h-4 w-4" aria-hidden="true" /> Convert to PDF</>
                }
              </Button>
            ) : (
              <Button size="lg" onClick={handleDownload} className="w-full sm:w-auto rounded-xl h-11 font-bold bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-500/20" aria-label="Download converted PDF">
                <Download className="mr-2 h-5 w-5" aria-hidden="true" /> Download PDF
              </Button>
            )}
          </CardFooter>
        )}
      </Card>

      {/* ── SEO ARTICLE ── */}
      <article className="max-w-5xl mx-auto px-6 py-16 space-y-14 text-slate-600 dark:text-slate-400 leading-relaxed">

        <section className="space-y-5">
          <h2 className="text-3xl font-black text-slate-900 dark:text-white">Why Convert Excel to PDF?</h2>
          <p className="text-lg">
            Excel spreadsheets look different on every device depending on screen size, installed fonts, and Excel version. A PDF looks identical everywhere — making it the standard format for sharing invoices, reports, and financial data professionally.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: <ShieldCheck className="w-8 h-8 text-blue-600" aria-hidden="true" />,  title: '100% Private',       desc: 'Your spreadsheet never leaves your device. All conversion happens locally in your browser — financial data stays confidential.' },
              { icon: <Zap className="w-8 h-8 text-yellow-500" aria-hidden="true" />,         title: 'Instant Conversion', desc: 'No upload queue or server processing. Convert instantly in your browser on any device.' },
              { icon: <Globe className="w-8 h-8 text-green-600" aria-hidden="true" />,        title: 'No Software Needed', desc: 'Works without Microsoft Office, LibreOffice, or any other software. Just a browser.' },
            ].map((item) => (
              <div key={item.title} className="p-6 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl space-y-3">
                {item.icon}
                <h3 className="font-black text-slate-900 dark:text-white">{item.title}</h3>
                <p className="text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Common Mistakes */}
        <section className="space-y-4">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-yellow-500" aria-hidden="true" /> Common Excel to PDF Mistakes
          </h2>
          <div className="space-y-3">
            {[
              { m: 'Converting in Portrait when columns overflow', f: 'Switch to Landscape orientation for wide spreadsheets with many columns. Portrait works best for narrow datasets.' },
              { m: 'Not previewing before converting',             f: 'Always check the preview table before clicking Convert. This confirms headers and row data look correct.' },
              { m: 'Forgetting multi-sheet workbooks',             f: 'Enable Convert All Sheets to capture every tab in one PDF — no need to convert each sheet separately.' },
              { m: 'Very long cell values getting truncated',      f: 'The PDF converter truncates text that is too long to fit in a column cell. Shorten cell content in Excel first for best results.' },
            ].map((item) => (
              <div key={item.m} className="flex gap-3 p-4 bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-800/50 rounded-xl text-sm">
                <AlertTriangle className="w-4 h-4 text-yellow-500 shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <p className="font-bold text-slate-900 dark:text-white">❌ {item.m}</p>
                  <p className="mt-0.5">✅ {item.f}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Summary */}
        <section id="tool-summary" className="p-6 bg-primary/5 border border-primary/20 rounded-2xl">
          <h2 className="text-xl font-black text-slate-900 dark:text-white mb-4">Summary</h2>
          <ul className="space-y-2 text-sm" role="list">
            {[
              'Converts .xlsx and .xls to clean, table-formatted PDF in your browser.',
              'Choose Portrait or Landscape orientation based on column count.',
              'Convert All Sheets toggle combines every tab into one PDF.',
              'Proportional column widths based on actual content length.',
              '100% private — your spreadsheet never leaves your device.',
              'No Microsoft Office required. No watermark. No signup.',
            ].map((point) => (
              <li key={point} className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* FAQ */}
        <section className="space-y-5">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqItems.map((faq, i) => (
              <details key={i} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 cursor-pointer group">
                <summary className="font-bold text-slate-900 dark:text-white list-none flex justify-between items-center text-sm">
                  {faq.q}
                  <span className="transition-transform group-open:rotate-180 text-slate-400 flex-shrink-0 ml-2" aria-hidden="true">▼</span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Related Tools — 10 verified links */}
        <section className="border-t border-slate-100 dark:border-slate-800 pt-12 space-y-6">
          <h3 className="text-xl font-black text-slate-900 dark:text-white">Related PDF & Document Tools</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { label: 'PDF to Word',          sub: 'Convert PDF to editable Word',          href: '/tools/pdf-to-word',          color: 'hover:border-orange-400' }, // ✅
              { label: 'Word to PDF',           sub: 'Convert Word documents to PDF',         href: '/tools/word-to-pdf',          color: 'hover:border-blue-400'   }, // ✅
              { label: 'Merge PDF Files',       sub: 'Combine multiple PDFs into one',        href: '/tools/merge-pdf',            color: 'hover:border-purple-400' }, // ✅
              { label: 'PDF Compressor',        sub: 'Reduce PDF file size free',             href: '/tools/pdf-compressor',       color: 'hover:border-green-400'  }, // ✅
              { label: 'Image to PDF',          sub: 'Convert images to PDF',                 href: '/tools/image-to-pdf',         color: 'hover:border-indigo-400' }, // ✅
              { label: 'PDF Editor Pro',        sub: 'Add text and edit PDFs in browser',     href: '/tools/pdf-editor-pro',       color: 'hover:border-yellow-400' }, // ✅
              { label: 'Split PDF',             sub: 'Extract pages from PDF',                href: '/tools/split-pdf',            color: 'hover:border-red-400'    }, // ✅
              { label: 'PDF to Excel',          sub: 'Extract PDF tables to spreadsheet',     href: '/tools/pdf-to-excel',         color: 'hover:border-teal-400'   }, // ✅
              { label: 'Invoice Generator',     sub: 'Create professional invoices free',     href: '/tools/invoice-generator',    color: 'hover:border-pink-400'   }, // ✅
              { label: 'Image Compressor',      sub: 'Compress images without quality loss',  href: '/tools/image-compressor',     color: 'hover:border-cyan-400'   }, // ✅
            ].map((tool) => (
              <Link key={tool.href} href={tool.href}
                className={`flex items-center justify-between p-5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 ${tool.color} rounded-2xl transition-colors group`}
                aria-label={`${tool.label} — ${tool.sub}`}
              >
                <div>
                  <p className="font-bold text-slate-900 dark:text-white text-sm">{tool.label}</p>
                  <p className="text-xs text-slate-500">{tool.sub}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors flex-shrink-0" aria-hidden="true" />
              </Link>
            ))}
          </div>
          {/* Blog links */}
          <div className="p-5 rounded-xl border bg-slate-50 dark:bg-slate-900 space-y-2">
            <p className="font-bold text-slate-900 dark:text-white text-sm">Related Reading</p>
            {[
              { href: '/blog/how-to-convert-pdf-to-word-free',          title: 'How to Convert PDF to Word Free — Complete Guide' }, // ✅
              { href: '/blog/free-online-tools-students-2026-no-login',  title: 'Best Free Tools for Students 2026'               }, // ✅
              { href: '/blog/zero-cost-freelancer-tools',               title: 'Zero-Cost Tools Every Freelancer Needs'          }, // ✅
            ].map((post) => (
              <Link key={post.href} href={post.href} className="flex items-center gap-2 text-sm text-primary hover:underline" aria-label={post.title}>
                <ArrowRight className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />{post.title}
              </Link>
            ))}
          </div>
        </section>

      </article>
    </>
  );
}
