'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import * as XLSX from 'xlsx';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import {
  Upload, FileSpreadsheet, Download, Trash2,
  Loader2, CheckCircle, ShieldCheck, Zap,
  Globe, HelpCircle, ArrowRight,
} from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const MAX_SIZE_MB = 50;
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How do I convert Excel to PDF for free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Upload your Excel file (.xlsx or .xls) to TaskGuru\'s free Excel to PDF converter. The tool converts your spreadsheet to a clean PDF instantly in your browser. No signup, no payment, no watermark.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is my Excel file safe when converting online?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes — completely safe. TaskGuru processes your Excel file entirely in your browser using JavaScript. Your file never gets uploaded to any server. Financial data, business spreadsheets, and personal information stay on your device.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I convert Excel to PDF without Microsoft Office?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. TaskGuru\'s Excel to PDF converter works without any software installation. It runs in your browser on Windows, Mac, Android, and iOS — no Microsoft Office or any other software required.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which Excel formats are supported?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'TaskGuru supports .xlsx (Excel 2007+) and .xls (older Excel) formats. Both single-sheet and multi-sheet workbooks are supported.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why convert Excel to PDF?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'PDF files look identical on every device and cannot be accidentally edited. Converting Excel reports, invoices, or financial statements to PDF ensures they print correctly and look professional when shared with clients or colleagues.',
      },
    },
  ],
};

interface SheetData {
  name: string;
  rows: string[][];
  headers: string[];
}

export default function ExcelToPdf() {
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [sheets, setSheets] = useState<SheetData[]>([]);
  const [selectedSheet, setSelectedSheet] = useState(0);
  const [isConverting, setIsConverting] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

    // Parse Excel to preview
    const buffer = await f.arrayBuffer();
    const workbook = XLSX.read(buffer, { type: 'array' });
    const parsedSheets: SheetData[] = workbook.SheetNames.map((name) => {
      const ws = workbook.Sheets[name];
      const json: string[][] = XLSX.utils.sheet_to_json(ws, { header: 1, defval: '' });
      const headers = (json[0] || []).map(String);
      const rows = json.slice(1).map((row) => row.map(String));
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

  const handleConvert = async () => {
    if (!file || sheets.length === 0) return;
    setIsConverting(true);

    try {
      const sheet = sheets[selectedSheet];
      const allRows = [sheet.headers, ...sheet.rows].filter((r) => r.some((c) => c !== ''));

      // ✅ Create PDF
      const pdfDoc = await PDFDocument.create();
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

      const pageWidth = 841.89; // A4 landscape
      const pageHeight = 595.28;
      const margin = 40;
      const rowHeight = 20;
      const headerHeight = 26;
      const fontSize = 9;
      const headerFontSize = 10;

      // Calculate column widths
      const colCount = Math.max(...allRows.map((r) => r.length));
      const availWidth = pageWidth - margin * 2;
      const colWidth = Math.min(availWidth / Math.max(colCount, 1), 120);

      let page = pdfDoc.addPage([pageWidth, pageHeight]);
      let y = pageHeight - margin;

      // Title
      page.drawText(sheet.name, {
        x: margin,
        y: y - 16,
        size: 14,
        font: boldFont,
        color: rgb(0.1, 0.1, 0.1),
      });
      y -= 36;

      for (let rowIndex = 0; rowIndex < allRows.length; rowIndex++) {
        const isHeader = rowIndex === 0;
        const rowH = isHeader ? headerHeight : rowHeight;

        // New page if needed
        if (y - rowH < margin) {
          page = pdfDoc.addPage([pageWidth, pageHeight]);
          y = pageHeight - margin;
        }

        // Row background
        if (isHeader) {
          page.drawRectangle({
            x: margin,
            y: y - rowH,
            width: availWidth,
            height: rowH,
            color: rgb(0.15, 0.35, 0.65),
          });
        } else if (rowIndex % 2 === 0) {
          page.drawRectangle({
            x: margin,
            y: y - rowH,
            width: availWidth,
            height: rowH,
            color: rgb(0.96, 0.97, 0.99),
          });
        }

        // Cell borders + text
        const row = allRows[rowIndex];
        for (let colIndex = 0; colIndex < colCount; colIndex++) {
          const cellX = margin + colIndex * colWidth;
          const cellText = String(row[colIndex] || '');
          const truncated = cellText.length > 18 ? cellText.slice(0, 17) + '…' : cellText;

          // Border
          page.drawRectangle({
            x: cellX,
            y: y - rowH,
            width: colWidth,
            height: rowH,
            borderColor: rgb(0.8, 0.85, 0.9),
            borderWidth: 0.5,
            opacity: 0,
          });

          // Text
          page.drawText(truncated, {
            x: cellX + 4,
            y: y - rowH + (isHeader ? 8 : 6),
            size: isHeader ? headerFontSize : fontSize,
            font: isHeader ? boldFont : font,
            color: isHeader ? rgb(1, 1, 1) : rgb(0.15, 0.15, 0.15),
            maxWidth: colWidth - 8,
          });
        }

        y -= rowH;
      }

      // Footer
      const pages = pdfDoc.getPages();
      pages.forEach((p, i) => {
        p.drawText(`Generated by TaskGuru.online • Sheet: ${sheet.name} • Page ${i + 1} of ${pages.length}`, {
          x: margin,
          y: 20,
          size: 7,
          font,
          color: rgb(0.6, 0.6, 0.6),
        });
      });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      setPdfBlob(blob);
      setIsDone(true);
      toast({ title: 'Conversion Complete!', description: `${allRows.length} rows converted to PDF.` });
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
    const a = document.createElement('a');
    a.href = url;
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* ── TOOL CARD ── */}
      <Card className="w-full max-w-2xl mx-auto shadow-2xl mt-8 border-2 border-primary/10 rounded-[2rem] bg-white dark:bg-gray-900">
        <CardContent className="p-6 sm:p-10 space-y-6">

          {!file ? (
            <div
              className="flex flex-col items-center justify-center space-y-5 p-10 sm:p-14 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-[1.5rem] cursor-pointer hover:border-primary/50 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
            >
              <div className="p-5 bg-green-50 dark:bg-green-900/20 text-green-600 rounded-full">
                <FileSpreadsheet className="w-10 h-10" />
              </div>
              <div className="text-center space-y-2">
                <h3 className="text-xl font-black text-gray-800 dark:text-white">
                  Upload Excel File
                </h3>
                <p className="text-gray-500 text-sm font-medium">
                  Drag & Drop or Click to Browse
                </p>
                <p className="text-xs text-green-600 font-bold bg-green-50 dark:bg-green-900/20 inline-block px-3 py-1 rounded-full">
                  .xlsx / .xls · Max {MAX_SIZE_MB}MB · 100% Private
                </p>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept=".xlsx,.xls"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
          ) : (
            <div className="space-y-5">

              {/* File info */}
              <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700">
                <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl flex-shrink-0">
                  <FileSpreadsheet className="w-6 h-6 text-green-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-gray-900 dark:text-white text-sm truncate">{file.name}</p>
                  <p className="text-xs text-gray-500">
                    {sheets.length} sheet{sheets.length !== 1 ? 's' : ''} · {(file.size / 1024).toFixed(1)} KB
                  </p>
                </div>
              </div>

              {/* Sheet selector */}
              {sheets.length > 1 && (
                <div className="space-y-2">
                  <p className="text-sm font-bold text-gray-700 dark:text-gray-300">Select Sheet</p>
                  <div className="flex flex-wrap gap-2">
                    {sheets.map((s, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedSheet(i)}
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
                    Preview — {sheets[selectedSheet].name}
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
                              <td key={j} className="px-3 py-1.5 text-gray-700 dark:text-gray-300 max-w-[100px] truncate">
                                {cell}
                              </td>
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
                <div className="flex items-center gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-900">
                  <Loader2 className="w-5 h-5 text-blue-600 animate-spin flex-shrink-0" />
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
            <Button variant="outline" size="lg" onClick={handleReset} disabled={isConverting} className="w-full sm:w-auto rounded-xl h-11">
              <Trash2 className="mr-2 h-4 w-4" /> Change File
            </Button>
            {!isDone ? (
              <Button size="lg" onClick={handleConvert} disabled={isConverting || !file} className="w-full sm:w-auto rounded-xl h-11 font-bold shadow-lg shadow-green-500/20">
                {isConverting
                  ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Converting...</>
                  : <><FileSpreadsheet className="mr-2 h-4 w-4" /> Convert to PDF</>
                }
              </Button>
            ) : (
              <Button size="lg" onClick={handleDownload} className="w-full sm:w-auto rounded-xl h-11 font-bold bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-500/20">
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
            Why Convert Excel to PDF?
          </h2>
          <p className="text-lg">
            Excel spreadsheets look different on every device depending on screen size,
            installed fonts, and Excel version. A PDF looks identical everywhere — making
            it the standard format for sharing invoices, reports, and financial data
            professionally.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: <ShieldCheck className="w-8 h-8 text-blue-600" />, title: '100% Private', desc: 'Your spreadsheet never leaves your device. All conversion happens locally in your browser — financial data stays confidential.' },
              { icon: <Zap className="w-8 h-8 text-yellow-500" />, title: 'Instant Conversion', desc: 'No upload queue or server processing. Convert instantly in your browser on any device.' },
              { icon: <Globe className="w-8 h-8 text-green-600" />, title: 'No Software Needed', desc: 'Works without Microsoft Office, LibreOffice, or any other software. Just a browser.' },
            ].map((item) => (
              <div key={item.title} className="p-6 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl space-y-3">
                {item.icon}
                <h3 className="font-black text-slate-900 dark:text-white">{item.title}</h3>
                <p className="text-sm">{item.desc}</p>
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
          <h3 className="text-xl font-black text-slate-900 dark:text-white">Related PDF Tools</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { label: 'PDF to Word Converter', sub: 'Convert PDF to editable Word', href: '/tools/pdf-to-word', color: 'hover:border-orange-400' },
              { label: 'Merge PDF Files', sub: 'Combine multiple PDFs into one', href: '/tools/merge-pdf', color: 'hover:border-blue-400' },
              { label: 'PDF Compressor', sub: 'Reduce PDF file size free', href: '/tools/pdf-compressor', color: 'hover:border-green-400' },
              { label: 'Image to PDF', sub: 'Convert images to PDF', href: '/tools/image-to-pdf', color: 'hover:border-purple-400' },
            ].map((tool) => (
              <Link key={tool.href} href={tool.href} className={`flex items-center justify-between p-5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 ${tool.color} rounded-2xl transition-colors group`}>
                <div>
                  <p className="font-bold text-slate-900 dark:text-white text-sm">{tool.label}</p>
                  <p className="text-xs text-slate-500">{tool.sub}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors flex-shrink-0" />
              </Link>
            ))}
          </div>
        </section>

      </article>
    </>
  );
}
