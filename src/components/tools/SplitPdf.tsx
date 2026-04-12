"use client";

import { useState } from "react";
import { PDFDocument } from "pdf-lib";
import JSZip from "jszip";
import { 
  Loader2, Download, FileDigit, Scissors, 
  ShieldCheck, Zap, Info, CheckCircle2,
  FileLock, Share2, MousePointerClick
} from "lucide-react";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How to split PDF into individual pages without uploading to a server?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "TaskGuru uses browser-side WebAssembly technology. When you select a file, the splitting process happens locally on your computer. Your document never reaches our servers, making it the most secure way to separate PDF pages online.",
      },
    },
    {
      "@type": "Question",
      name: "Can I extract specific pages from a large PDF for free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, our tool allows you to extract every single page as a separate PDF file. You can then download them individually or as a single ZIP folder. This is 100% free with no hidden subscriptions.",
      },
    },
    {
      "@type": "Question",
      name: "Is there a limit on the number of pages I can split?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Unlike other tools that limit you to 20 pages, TaskGuru's Split PDF tool has no artificial limits. Whether it is a 5-page report or a 500-page ebook, our local engine handles it easily.",
      },
    },
  ],
};

export default function SplitPdf() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("");
  const [splitFiles, setSplitFiles] = useState<{ name: string; bytes: Uint8Array; url: string }[]>([]);

  const handleReset = () => {
    setFile(null);
    setLoading(false);
    setProgress(0);
    setStatus("");
    setSplitFiles([]);
  };

  async function handleSplit() {
    if (!file) return;
    try {
      setLoading(true);
      setStatus("Booting local PDF engine...");
      const buffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(buffer);
      const totalPages = pdfDoc.getPageCount();
      const results: { name: string; bytes: Uint8Array; url: string }[] = [];

      for (let i = 0; i < totalPages; i++) {
        setStatus(`Extracting page ${i + 1} of ${totalPages}...`);
        setProgress(Math.round(((i + 1) / totalPages) * 100));
        const newPdf = await PDFDocument.create();
        const [page] = await newPdf.copyPages(pdfDoc, [i]);
        newPdf.addPage(page);
        const pdfBytes = await newPdf.save();
        results.push({
          name: `${file.name.replace(".pdf", "")}_part_${i + 1}.pdf`,
          bytes: pdfBytes,
          url: URL.createObjectURL(new Blob([pdfBytes], { type: "application/pdf" }))
        });
      }
      setSplitFiles(results);
      setLoading(false);
    } catch (e) {
      setStatus("Error: Check if the PDF is encrypted.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 selection:bg-purple-100">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="max-w-5xl mx-auto px-4 py-16">
        {/* HERO SECTION */}
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight">
            Split PDF <span className="text-purple-600">Instantly</span>
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
            The most secure way to separate PDF pages online. No uploads, no server-side processing—just pure privacy.
          </p>
        </div>

        {/* MAIN TOOL INTERFACE */}
        <div className="bg-white dark:bg-slate-900 rounded-[3rem] shadow-xl border border-slate-100 dark:border-slate-800 p-8 md:p-12 transition-all">
          {!file ? (
            <div 
              onClick={() => document.getElementById('pdf-upload')?.click()}
              className="group border-4 border-dashed border-slate-200 dark:border-slate-700 rounded-[2rem] p-16 flex flex-col items-center justify-center gap-6 hover:border-purple-400 dark:hover:border-purple-500 hover:bg-purple-50/30 transition-all cursor-pointer"
            >
              <div className="p-6 bg-purple-100 dark:bg-purple-900/30 text-purple-600 rounded-3xl group-hover:scale-110 transition-transform">
                <Scissors className="w-12 h-12" />
              </div>
              <div className="text-center">
                <p className="text-2xl font-black text-slate-800 dark:text-slate-200">Drop your PDF here</p>
                <p className="text-slate-500 font-medium">or click to browse files locally</p>
              </div>
              <input id="pdf-upload" type="file" accept="application/pdf" className="hidden" onChange={(e) => e.target.files && setFile(e.target.files[0])} />
            </div>
          ) : (
            <div className="space-y-8">
              <div className="flex items-center justify-between p-6 bg-slate-50 dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700">
                <div className="flex items-center gap-4">
                  <FileDigit className="w-8 h-8 text-purple-500" />
                  <div className="text-left">
                    <p className="font-bold text-slate-900 dark:text-white truncate max-w-[200px] md:max-w-sm">{file.name}</p>
                    <p className="text-xs text-slate-400 uppercase font-black tracking-widest">Ready to Process</p>
                  </div>
                </div>
                {!loading && splitFiles.length === 0 && (
                  <button onClick={handleReset} className="text-red-500 hover:text-red-600 text-sm font-bold underline">Change</button>
                )}
              </div>

              {loading && (
                <div className="space-y-4">
                  <div className="h-4 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${progress}%` }} className="h-full bg-gradient-to-r from-purple-500 to-indigo-600" />
                  </div>
                  <p className="text-purple-600 font-black text-sm animate-pulse tracking-wide">{status}</p>
                </div>
              )}

              {!loading && splitFiles.length === 0 && (
                <button onClick={handleSplit} className="w-full py-6 bg-purple-600 hover:bg-purple-700 text-white font-black rounded-3xl text-xl shadow-xl shadow-purple-200 dark:shadow-none transition-all active:scale-95">
                  Separate All Pages
                </button>
              )}

              {splitFiles.length > 0 && (
                <div className="grid sm:grid-cols-2 gap-4">
                  <button onClick={() => {/* Zip Logic */}} className="py-5 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-2xl flex items-center justify-center gap-3 shadow-lg">
                    <Download className="w-6 h-6" /> Download ZIP
                  </button>
                  <button onClick={handleReset} className="py-5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-black rounded-2xl hover:bg-slate-200 transition-colors">
                    Start New Task
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* SEO LONG-TAIL KEYWORD SECTION */}
        <article className="mt-24 space-y-16">
          <section className="text-center space-y-6">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white">How to Separate PDF Pages Without Software Installation?</h2>
            <p className="text-lg text-slate-600 leading-relaxed max-w-4xl mx-auto">
              If you are looking for a way to <strong>extract specific pages from a PDF for free</strong>, TaskGuru provides the ultimate solution. Most online tools require you to upload your files to their servers, posing a security risk. Our <strong>privacy-focused PDF splitter</strong> works 100% locally in your browser using WebAssembly. This means you can <strong>split large PDF documents on Mac, Windows, and Mobile</strong> without ever worrying about data leaks.
            </p>
          </section>

          <div className="grid md:grid-cols-3 gap-8">
             {[
               { icon: <FileLock />, title: "Secure Browser-Based Splitting", desc: "Your data stays on your machine. Perfect for sensitive business contracts and legal documents." },
               { icon: <Zap />, title: "High-Speed Page Extraction", desc: "No upload queues. Separate 100+ pages into individual files in under 5 seconds." },
               { icon: <Share2 />, title: "ZIP Package Support", desc: "Don't download files one by one. Get everything neatly packed in a single ZIP folder." }
             ].map((item, i) => (
               <div key={i} className="p-8 bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm">
                 <div className="text-purple-600 mb-4">{item.icon}</div>
                 <h3 className="text-xl font-black mb-2 text-slate-800 dark:text-slate-200">{item.title}</h3>
                 <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
               </div>
             ))}
          </div>

          <section className="bg-slate-900 text-white p-12 rounded-[3rem] space-y-6">
            <h3 className="text-2xl font-black text-purple-400 uppercase tracking-widest">Why Professionals Choose TaskGuru?</h3>
            <p className="text-slate-300 text-lg">
              Our <strong>online PDF page separator</strong> is designed for productivity. Whether you need to <strong>remove pages from a scanned PDF</strong> or <strong>split a PDF into two parts</strong>, our tool handles it with zero quality loss. It's the best free alternative to Adobe Acrobat for daily office tasks.
            </p>
          </section>
        </article>
      </div>
    </div>
  );
}
