"use client";

import { useState } from "react";
import { PDFDocument } from "pdf-lib";
import JSZip from "jszip";

// ✅ FAQ Schema added
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I split a PDF into individual pages?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Upload your PDF to TaskGuru's free PDF splitter. The tool automatically separates every page into individual PDF files and packages them in a ZIP download. No signup or payment required.",
      },
    },
    {
      "@type": "Question",
      name: "Is splitting a PDF free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — completely free. TaskGuru's PDF splitter has no page limits, no file size restrictions, and no watermarks on the output files.",
      },
    },
    {
      "@type": "Question",
      name: "Can I extract specific pages from a PDF?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The tool splits your PDF into individual pages. You can then keep only the pages you need and discard the rest, or use our free Merge PDF tool to recombine selected pages.",
      },
    },
    {
      "@type": "Question",
      name: "Is my PDF safe when splitting online?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. TaskGuru uses WebAssembly (pdf-lib) to split your PDF directly in your browser. Your document never gets uploaded to any server — everything stays on your device.",
      },
    },
  ],
};


import { 
  Loader2, Download, FileDigit, Scissors, 
  ShieldCheck, Zap, Info, CheckCircle2 
} from "lucide-react";

export default function SplitPdf() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("");
  const [splitFiles, setSplitFiles] = useState<
    { name: string; bytes: Uint8Array; url: string }[]
  >([]);

  function handleReset() {
    setFile(null);
    setLoading(false);
    setProgress(0);
    setStatus("");
    setSplitFiles([]);
  }
//working
  async function handleSplit() {
    if (!file) return;

    try {
      setLoading(true);
      setProgress(0);
      setSplitFiles([]);
      setStatus("Initializing local engine...");

      const buffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(buffer);

      const totalPages = pdfDoc.getPageCount();
      const results: { name: string; bytes: Uint8Array; url: string }[] = [];

      for (let i = 0; i < totalPages; i++) {
        setStatus(`Processing page ${i + 1} of ${totalPages}...`);
        setProgress(Math.round(((i + 1) / totalPages) * 100));

        const newPdf = await PDFDocument.create();
        const [page] = await newPdf.copyPages(pdfDoc, [i]);
        newPdf.addPage(page);

        const pdfBytes = await newPdf.save();
        const blob = new Blob([pdfBytes], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);
        
        results.push({
          name: `${file.name.replace(".pdf", "")}_page_${i + 1}.pdf`,
          bytes: pdfBytes,
          url
        });
      }

      setSplitFiles(results);
      setStatus("Splitting complete!");
      setLoading(false);
    } catch (error) {
      console.error(error);
      setStatus("Error processing PDF. Is it password protected?");
      setLoading(false);
    }
  }

  function handleDownloadAll() {
    splitFiles.forEach((f) => {
      const a = document.createElement("a");
      a.href = f.url;
      a.download = f.name;
      a.click();
    });
  }

  async function handleDownloadZip() {
    const zip = new JSZip();
    splitFiles.forEach((f) => {
      zip.file(f.name, f.bytes);
    });
    const content = await zip.generateAsync({ type: "blob" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(content);
    a.download = "split_pages_taskguru.zip";
    a.click();
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] shadow-2xl border p-8 md:p-12 text-center space-y-8 mb-20">
        <div className="inline-flex p-4 bg-purple-100 dark:bg-purple-900/30 text-purple-600 rounded-full mb-4">
          <Scissors className="w-8 h-8" />
        </div>
        <h1 className="text-4xl font-black">Split PDF Pages Online</h1>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Extract every page from your PDF into separate files instantly. 
          Client-side processing ensures your data never leaves your device.
        </p>

        {!file ? (
          <div className="border-4 border-dashed rounded-3xl p-10 hover:bg-muted/30 transition cursor-pointer" onClick={() => document.getElementById('pdf-upload')?.click()}>
            <p className="font-bold text-xl mb-2">Click to Upload PDF</p>
            <p className="text-sm text-muted-foreground">Max 100MB • 100% Private</p>
            <input 
              id="pdf-upload"
              type="file" 
              accept="application/pdf" 
              className="hidden" 
              onChange={(e) => e.target.files && setFile(e.target.files[0])}
            />
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-center gap-3 font-bold text-lg p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <FileDigit className="w-6 h-6 text-purple-500" />
              {file.name}
            </div>
            
            {loading && (
              <div className="space-y-2">
                <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-600 transition-all duration-300" style={{ width: `${progress}%` }}></div>
                </div>
                <p className="text-sm text-purple-600 font-bold animate-pulse">{status}</p>
              </div>
            )}

            {!loading && splitFiles.length === 0 && (
               <button onClick={handleSplit} className="w-full py-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl shadow-lg transition-transform active:scale-95">
                 Split PDF Now
               </button>
            )}

            {splitFiles.length > 0 && (
              <div className="grid gap-4">
                <button onClick={handleDownloadZip} className="w-full py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2">
                  <Download className="w-5 h-5" /> Download as ZIP
                </button>
                <button onClick={handleDownloadAll} className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg transition-transform active:scale-95">
                   Download Individual Files
                </button>
                <button onClick={handleReset} className="text-muted-foreground hover:text-red-500 text-sm font-bold mt-4">
                  Start Over
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <article className="prose prose-lg dark:prose-invert max-w-none border-t pt-16">
        <h2 className="text-3xl font-black text-center mb-8">How to Separate PDF Pages for Free</h2>
        <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl border">
                <ShieldCheck className="w-8 h-8 text-green-500 mb-4" />
                <h3 className="font-bold text-lg mb-2">100% Private</h3>
                <p className="text-sm">We use WebAssembly to split files directly in your browser.</p>
            </div>
            <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl border">
                <Zap className="w-8 h-8 text-yellow-500 mb-4" />
                <h3 className="font-bold text-lg mb-2">Instant Speed</h3>
                <p className="text-sm">No upload waiting time. Split large documents in seconds.</p>
            </div>
            <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl border">
                <Download className="w-8 h-8 text-blue-500 mb-4" />
                <h3 className="font-bold text-lg mb-2">ZIP Download</h3>
                <p className="text-sm">Get all your separated pages packed in a single ZIP file.</p>
            </div>
        </div>

        {/* ✅ FAQ Section */}
        <div className="mt-12 space-y-4">
          <h2 className="text-2xl font-black text-center">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqSchema.mainEntity.map((faq, i) => (
              <details key={i} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 cursor-pointer group">
                <summary className="font-bold text-foreground list-none flex justify-between items-center text-sm">
                  {faq.name}
                  <span className="transition-transform group-open:rotate-180 text-muted-foreground ml-2">▼</span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{faq.acceptedAnswer.text}</p>
              </details>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
}
