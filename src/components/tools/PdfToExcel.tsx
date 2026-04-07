'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import * as pdfjsLib from 'pdfjs-dist';
import * as XLSX from 'xlsx';
import {
  Upload, FileText, Download, Trash2,
  Loader2, CheckCircle, ShieldCheck, Zap,
  Globe, HelpCircle, ArrowRight, Table,
} from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const MAX_SIZE_MB = 50;
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

// ✅ Set up the PDF.js worker securely (using unpkg instead of cdnjs for better mobile support)
if (typeof window !== 'undefined') {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;
}

// ✅ FAQ Schema
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How do I convert PDF to Excel for free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Upload your PDF to TaskGuru\'s free PDF to Excel converter. The tool extracts all text and table data from your PDF and converts it into a downloadable .xlsx file instantly. No signup, no payment, works in your browser.',
      },
    },
    {
      '@type': 'Question',
      name: 'What types of PDFs work best for PDF to Excel conversion?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Text-based PDFs with clear tables and structured data convert best — such as bank statements, invoices, financial reports, and exported data files. Scanned PDFs (images of documents) have lower accuracy as they require OCR processing.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is my PDF data safe when converting online?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes — completely safe. TaskGuru processes your PDF entirely in your browser. Your file never gets sent to any server. Financial statements, invoices, and sensitive data stay on your device throughout the entire conversion.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I convert a bank statement PDF to Excel?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Bank statement PDFs that are text-based (not scanned) convert well. The tool extracts transaction data, dates, amounts, and descriptions into Excel rows. You can then use Excel formulas to analyze your financial data.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why convert PDF to Excel instead of copying and pasting?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Manual copy-pasting from PDF loses formatting, merges columns, and takes hours for large files. PDF to Excel conversion preserves the structure of your data, puts each value in its own cell, and handles hundreds of rows in seconds.',
      },
    },
  ],
};

// ✅ Robust Text Extraction using pdfjs-dist
async function extractTextFromPdf(arrayBuffer: ArrayBuffer): Promise<string[][]> {
  const allLines: string[][] = [];
  
  try {
    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
    const pdf = await loadingTask.promise;

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const textContent = await page.getTextContent();
      
      // Group items by their Y coordinate to form rows
      // We store the X coordinate to sort columns left-to-right later
      const rows: { [y: string]: { x: number, text: string }[] } = {};
      
      textContent.items.forEach((item: any) => {
        // transform array: [scaleX, skewY, skewX, scaleY, x, y]
        const xCoord = Math.round(item.transform[4]); 
        
        // Round Y coordinate to nearest 5 pixels. 
        // This groups text that visually looks like it's on the same line 
        // but might be off by 1 or 2 pixels in the raw PDF data.
        const yCoord = Math.round(item.transform[5] / 5) * 5; 
        
        if (!rows[yCoord]) {
          rows[yCoord] = [];
        }
        
        if (item.str.trim() !== '') {
          rows[yCoord].push({ x: xCoord, text: item.str.trim() });
        }
      });

      // Sort rows from top to bottom (PDF Y-axis usually starts at 0 at the bottom of the page)
      const sortedYCoords = Object.keys(rows)
        .map(Number)
        .sort((a, b) => b - a);

      sortedYCoords.forEach((y) => {
        // Sort items in the row from left to right based on X coordinate
        const rowData = rows[y]
          .sort((a, b) => a.x - b.x)
          .map(item => item.text);
          
        if (rowData.length > 0) {
          allLines.push(rowData);
        }
      });
    }
  } catch (err) {
    console.error("PDF reading error:", err);
    throw err; // Pass error to UI handler
  }

  return allLines;
}

export default function PdfToExcel() {
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [rowCount, setRowCount] = useState(0);
  const [xlsxBlob, setXlsxBlob] = useState<Blob | null>(null);
  const [preview, setPreview] = useState<string[][]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateAndSetFile = (f: File) => {
    if (f.type !== 'application/pdf' && !f.name.toLowerCase().endsWith('.pdf')) {
      toast({ title: 'Invalid File', description: 'Please upload a PDF file.', variant: 'destructive' });
      return;
    }
    if (f.size > MAX_SIZE_BYTES) {
      toast({ title: 'File Too Large', description: `Max ${MAX_SIZE_MB}MB allowed.`, variant: 'destructive' });
      return;
    }
    setFile(f);
    setIsDone(false);
    setXlsxBlob(null);
    setPreview([]);
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
      const lines = await extractTextFromPdf(arrayBuffer);

      if (lines.length === 0) {
        toast({
          title: 'No Text Found',
          description: 'This PDF appears to be an image or scanned document without readable text.',
          variant: 'destructive',
        });
        setIsConverting(false);
        return;
      }

      // Create Excel workbook
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.aoa_to_sheet(lines);

      // Auto column widths dynamically based on longest content
      const colWidths = lines[0]?.map((_, colIdx) =>
        Math.min(Math.max(...lines.map((row) => (row[colIdx] || '').toString().length), 10), 50)
      ) || [];
      ws['!cols'] = colWidths.map((w) => ({ wch: w }));

      XLSX.utils.book_append_sheet(wb, ws, 'PDF Data');
      const xlsxBytes = XLSX.write(wb, { type: 'array', bookType: 'xlsx' });

      const blob = new Blob([xlsxBytes], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });

      setXlsxBlob(blob);
      setRowCount(lines.length);
      setPreview(lines.slice(0, 6)); // Show first 6 rows as preview
      setIsDone(true);

      toast({
        title: 'Conversion Complete!',
        description: `${lines.length} rows extracted perfectly.`,
      });

    } catch (err: any) {
      console.error("Conversion Error:", err);
      
      const isEncrypted = err?.message?.toLowerCase().includes('password') || err?.name === 'PasswordException';
      const isCorrupt = err?.name === 'InvalidPDFException' || err?.message?.toLowerCase().includes('invalid pdf structure');
      
      toast({
        title: isEncrypted ? 'Password-Protected PDF' : isCorrupt ? 'Corrupted File' : 'Conversion Failed',
        description: isEncrypted
          ? 'Please unlock the PDF first, then try again.'
          : isCorrupt 
            ? 'This file appears to be corrupted or not a valid PDF (common with WhatsApp documents).'
            : 'Could not extract data from this file. Ensure it is a valid, text-based PDF.',
        variant: 'destructive',
      });
    } finally {
      setIsConverting(false);
    }
  };

  const handleDownload = () => {
    if (!xlsxBlob || !file) return;
    const url = URL.createObjectURL(xlsxBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.name.replace(/\.pdf$/i, '.xlsx');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast({ title: 'Downloaded!', description: 'Excel file saved successfully.' });
  };

  const handleReset = () => {
    setFile(null);
    setIsDone(false);
    setXlsxBlob(null);
    setPreview([]);
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
              <div
                className="flex flex-col items-center justify-center space-y-5 p-10 sm:p-14 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-[1.5rem] cursor-pointer hover:border-primary/50 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
              >
                <div className="p-5 bg-green-50 dark:bg-green-900/20 text-green-600 rounded-full">
                  <FileText className="w-10 h-10" />
                </div>
                <div className="text-center space-y-2">
                  <h3 className="text-xl font-black text-gray-800 dark:text-white">
                    Upload PDF File
                  </h3>
                  <p className="text-gray-500 text-sm font-medium">
                    Drag & Drop or Click to Browse
                  </p>
                  <p className="text-xs text-green-600 font-bold bg-green-50 dark:bg-green-900/20 inline-block px-3 py-1 rounded-full">
                    .pdf · Max {MAX_SIZE_MB}MB · 100% Private · No Upload
                  </p>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="application/pdf,.pdf"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>

              {/* Best for note */}
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl">
                <p className="text-xs font-black text-blue-700 dark:text-blue-300 uppercase mb-2">💡 Best Results With</p>
                <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-400">
                  {[
                    '✅ Bank statements', '✅ Invoices & receipts',
                    '✅ Financial reports', '✅ Data export PDFs',
                    '⚠️ Scanned PDFs (lower accuracy)', '❌ Image-only PDFs',
                  ].map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="space-y-5">

              {/* File info */}
              <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700">
                <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-xl flex-shrink-0">
                  <FileText className="w-6 h-6 text-red-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-gray-900 dark:text-white text-sm truncate">{file.name}</p>
                  <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(1)} KB</p>
                </div>
              </div>

              {/* Preview */}
              {preview.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm font-bold text-gray-700 dark:text-gray-300">
                    Preview
                    <span className="text-xs font-normal text-gray-400 ml-2">({rowCount} rows extracted)</span>
                  </p>
                  <div className="overflow-x-auto rounded-xl border border-gray-100 dark:border-gray-800 max-h-48">
                    <table className="w-full text-xs">
                      <tbody className="divide-y divide-gray-50 dark:divide-gray-800 bg-white dark:bg-gray-900">
                        {preview.map((row, i) => (
                          <tr key={i} className={i === 0 ? 'bg-green-50 dark:bg-green-900/20 font-bold' : i % 2 === 0 ? 'bg-gray-50/50' : ''}>
                            {row.slice(0, 5).map((cell, j) => (
                              <td key={j} className="px-3 py-1.5 text-gray-700 dark:text-gray-300 max-w-[120px] truncate">
                                {cell}
                              </td>
                            ))}
                            {row.length > 5 && <td className="px-3 py-1.5 text-gray-400">+{row.length - 5}</td>}
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
                    <p className="text-sm font-bold text-green-700 dark:text-green-300">
                      Excel Ready — {rowCount} rows extracted
                    </p>
                    <p className="text-xs text-green-600">Click Download to save your .xlsx file.</p>
                  </div>
                </div>
              )}

              {/* Loading */}
              {isConverting && (
                <div className="flex items-center gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100">
                  <Loader2 className="w-5 h-5 text-blue-600 animate-spin flex-shrink-0" />
                  <div>
                    <p className="text-sm font-bold text-blue-700 dark:text-blue-300">Extracting data...</p>
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
                  ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Extracting...</>
                  : <><Table className="mr-2 h-4 w-4" /> Convert to Excel</>
                }
              </Button>
            ) : (
              <Button size="lg" onClick={handleDownload} className="w-full sm:w-auto rounded-xl h-11 font-bold bg-green-600 hover:bg-green-700 text-white shadow-lg">
                <Download className="mr-2 h-5 w-5" /> Download Excel
              </Button>
            )}
          </CardFooter>
        )}
      </Card>

      {/* ── SEO ARTICLE ── */}
      <article className="max-w-5xl mx-auto px-6 py-16 space-y-14 text-slate-600 dark:text-slate-400 leading-relaxed">

        <section className="space-y-5">
          <h2 className="text-3xl font-black text-slate-900 dark:text-white">
            Why Convert PDF to Excel?
          </h2>
          <p className="text-lg">
            PDF files are designed for reading, not analysis. When you receive financial data,
            invoices, or reports as a PDF, you cannot sort, filter, or calculate with the data
            until it is in a spreadsheet. Converting PDF to Excel unlocks the full power of
            your data — formulas, pivot tables, charts, and automated analysis.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: <ShieldCheck className="w-8 h-8 text-blue-600" />, title: '100% Private', desc: 'Your PDF — including financial statements and invoices — never leaves your device. All processing runs locally in your browser.' },
              { icon: <Zap className="w-8 h-8 text-yellow-500" />, title: 'Instant Extraction', desc: 'No upload queue. Data extraction happens directly in your browser in seconds.' },
              { icon: <Table className="w-8 h-8 text-green-600" />, title: 'Clean Excel Output', desc: 'Auto-detected columns with proper widths. Download a clean .xlsx file ready for Excel, Google Sheets, or LibreOffice.' },
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
            Common Use Cases
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { emoji: '🏦', title: 'Bank Statement Analysis', desc: 'Convert bank statement PDFs to Excel and use formulas to calculate totals, categorize transactions, and track spending.' },
              { emoji: '📊', title: 'Financial Reports', desc: 'Extract quarterly or annual report data into Excel for custom charts, comparisons, and deeper financial analysis.' },
              { emoji: '🧾', title: 'Invoice Processing', desc: 'Batch process multiple invoice PDFs and consolidate the data into a single Excel sheet for accounting purposes.' },
              { emoji: '📋', title: 'Data Migration', desc: 'Move data from legacy PDF reports into modern spreadsheet systems without manual retyping.' },
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
          <h3 className="text-xl font-black text-slate-900 dark:text-white">Related Tools</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { label: 'Excel to PDF Converter', sub: 'Convert spreadsheets to PDF', href: '/tools/excel-to-pdf', color: 'hover:border-green-400' },
              { label: 'PDF to Word Converter', sub: 'Convert PDF to editable Word', href: '/tools/pdf-to-word', color: 'hover:border-orange-400' },
              { label: 'Merge PDF Files', sub: 'Combine multiple PDFs', href: '/tools/merge-pdf', color: 'hover:border-blue-400' },
              { label: 'PDF Compressor', sub: 'Reduce PDF file size', href: '/tools/pdf-compressor', color: 'hover:border-purple-400' },
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
