"use client";

import { useState } from "react";
import { PDFDocument } from "pdf-lib";
import JSZip from "jszip";
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
    <div className="max-w-4xl mx-auto px-4 py-12">
      
      {/* TOOL INTERFACE */}
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

      {/* 🚀 SEO CONTENT SECTION */}
      <article className="prose prose-lg dark:prose-invert max-w-none border-t pt-16">
        <h2 className="text-3xl font-black text-center mb-8">How to Separate PDF Pages for Free</h2>
        
        <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl border">
                <ShieldCheck className="w-8 h-8 text-green-500 mb-4" />
                <h3 className="font-bold text-lg mb-2">100% Private</h3>
                <p className="text-sm">We use WebAssembly to split files directly in your browser. Your sensitive documents are never uploaded to our servers.</p>
            </div>
            <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl border">
                <Zap className="w-8 h-8 text-yellow-500 mb-4" />
                <h3 className="font-bold text-lg mb-2">Instant Speed</h3>
                <p className="text-sm">No upload waiting time. Split large 100+ page documents in seconds using your device's processing power.</p>
            </div>
            <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl border">
                <Download className="w-8 h-8 text-blue-500 mb-4" />
                <h3 className="font-bold text-lg mb-2">ZIP Download</h3>
                <p className="text-sm">Get all your separated pages neatly packed in a single ZIP file for easy organization.</p>
            </div>
        </div>

        <section className="space-y-6">
            <h3 className="text-2xl font-bold">Why Split a PDF?</h3>
            <p>
                Large PDF files are often difficult to share via email or upload to portals with size limits. 
                Using the <strong>TaskGuru Split PDF</strong> tool allows you to:
            </p>
            <ul className="list-disc pl-5 space-y-2">
                <li><strong>Extract Specific Pages:</strong> Only share the relevant chapter of a report or book.</li>
                <li><strong>Reduce File Size:</strong> Break down a massive document into smaller, manageable chunks.</li>
                <li><strong>Organize Invoices:</strong> Separate a bulk scan of receipts into individual files for accounting.</li>
            </ul>
        </section>

        <section className="mt-12 p-8 bg-blue-50 dark:bg-blue-900/20 rounded-3xl">
            <h3 className="text-xl font-bold flex items-center gap-2 mb-4">
                <Info className="w-5 h-5 text-blue-600" /> Pro Tip: Merging
            </h3>
            <p>
                Made a mistake and split too many pages? You can put them back together using our 
                <a href="/tools/merge-pdf" className="font-bold text-blue-600 hover:underline mx-1">Free PDF Merger</a>.
            </p>
        </section>
      </article>

    </div>
  );
}
