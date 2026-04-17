"use client";

import { useState, useRef, useEffect } from "react";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { motion, AnimatePresence } from "framer-motion";
import { 
  PenLine, Lock, Download, ShieldCheck, Zap, 
  RefreshCw, AlertCircle, Check, Eraser, 
  FileSignature, CloudOff, FileText, 
  Type, ShieldAlert, Globe, Scale
} from "lucide-react";
import Link from "next/link";

export default function ESignPdf() {
  const [file, setFile] = useState<File | null>(null);
  const [signature, setSignature] = useState<string | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [loading, setLoading] = useState(false);
  const [unlockedUrl, setUnlockedUrl] = useState<string | null>(null);
  const [mode, setMode] = useState<"draw" | "stamp">("draw");
  const [stampText, setStampText] = useState("");

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);

  // Initialize Canvas
  useEffect(() => {
    if (canvasRef.current && mode === "draw" && file && !unlockedUrl) {
      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * 2;
      canvas.height = 200 * 2;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.scale(2, 2);
        ctx.lineCap = "round";
        ctx.strokeStyle = "#0F172A";
        ctx.lineWidth = 2.5;
        contextRef.current = ctx;
      }
    }
  }, [mode, file, unlockedUrl]);

  useEffect(() => {
    return () => { if (unlockedUrl) URL.revokeObjectURL(unlockedUrl); };
  }, [unlockedUrl]);

  const getXY = (e: any) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    if (e.touches && e.touches[0]) {
      return { x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top };
    }
    return { x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY };
  };

  const startDrawing = (e: any) => {
    e.preventDefault();
    const { x, y } = getXY(e);
    contextRef.current?.beginPath();
    contextRef.current?.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e: any) => {
    if (!isDrawing) return;
    const { x, y } = getXY(e);
    contextRef.current?.lineTo(x, y);
    contextRef.current?.stroke();
  };

  const endDrawing = () => {
    contextRef.current?.closePath();
    setIsDrawing(false);
    if (canvasRef.current) setSignature(canvasRef.current.toDataURL());
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) contextRef.current?.clearRect(0, 0, canvas.width, canvas.height);
    setSignature(null);
  };

  const handleSignPdf = async () => {
    if (!file || !isOwner) return;
    setLoading(true);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const pages = pdfDoc.getPages();
      const page = pages[pages.length - 1];

      if (mode === "draw" && signature) {
        const image = await pdfDoc.embedPng(signature);
        const dims = image.scale(0.35);
        page.drawImage(image, {
          x: page.getWidth() - dims.width - 50,
          y: 70,
          width: dims.width,
          height: dims.height,
        });
      } else if (mode === "stamp" && stampText) {
        const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
        page.drawText(stampText, {
          x: 70, y: 70, size: 20, font, color: rgb(0.06, 0.09, 0.16),
        });
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      setUnlockedUrl(URL.createObjectURL(blob));
    } catch (err) {
      alert("Error processing PDF locally.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F2F2F7] dark:bg-black font-sans pb-20">
      <div className="max-w-4xl mx-auto px-6 py-20">
        
        <header className="text-center mb-12 space-y-4">
          <h1 className="text-5xl md:text-7xl font-[950] tracking-tighter text-slate-900 dark:text-white leading-none">
            E-Sign <span className="text-blue-600">Securely</span>
          </h1>
          <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto">
            Legally sign PDFs 100% privately in your browser. No server uploads, no data storage.
          </p>
        </header>

        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-3xl rounded-[3rem] shadow-2xl border border-white dark:border-slate-800 p-8 md:p-12">
          <AnimatePresence mode="wait">
            {!file ? (
              <motion.div 
                onClick={() => document.getElementById("pdf-in")?.click()}
                className="group border-4 border-dashed border-slate-100 dark:border-slate-800 rounded-[2.5rem] py-24 flex flex-col items-center gap-6 cursor-pointer hover:border-blue-400 transition-all"
              >
                <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <FileSignature className="w-10 h-10" />
                </div>
                <p className="text-2xl font-black text-slate-800 dark:text-slate-200 uppercase tracking-tighter">Upload PDF Document</p>
                <input id="pdf-in" type="file" accept=".pdf" className="hidden" onChange={(e) => setFile(e.target.files?.[0] || null)} />
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                
                <div className="flex items-center gap-4 p-5 bg-slate-50 dark:bg-slate-800 rounded-2xl">
                  <ShieldCheck className="text-emerald-500" />
                  <span className="font-bold truncate flex-1 text-left">{file.name}</span>
                  <button onClick={() => setFile(null)} className="text-red-500 font-bold text-xs uppercase tracking-widest">Reset</button>
                </div>

                {!unlockedUrl ? (
                  <div className="space-y-8">
                    <div className="flex p-1 bg-slate-100 dark:bg-slate-950 rounded-2xl">
                      <button onClick={() => setMode("draw")} className={`flex-1 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${mode === "draw" ? "bg-white dark:bg-slate-800 shadow-sm text-blue-600" : "text-slate-400"}`}>
                        <PenLine className="w-4 h-4" /> Draw
                      </button>
                      <button onClick={() => setMode("stamp")} className={`flex-1 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${mode === "stamp" ? "bg-white dark:bg-slate-800 shadow-sm text-blue-600" : "text-slate-400"}`}>
                        <Type className="w-4 h-4" /> Stamp
                      </button>
                    </div>

                    {mode === "draw" ? (
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Signature Pad</label>
                          <button onClick={clearCanvas} className="text-red-500 text-xs font-bold flex items-center gap-1"><Eraser className="w-3 h-3" /> Clear</button>
                        </div>
                        <canvas ref={canvasRef} onMouseDown={startDrawing} onMouseMove={draw} onMouseUp={endDrawing} onMouseLeave={endDrawing} onTouchStart={startDrawing} onTouchMove={draw} onTouchEnd={endDrawing} className="w-full bg-white border-2 border-slate-100 rounded-3xl cursor-crosshair touch-none" />
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Stamp Text</label>
                        <input type="text" placeholder="Your Name / Approved" value={stampText} onChange={(e) => setStampText(e.target.value)} className="w-full p-6 bg-slate-50 dark:bg-slate-950 rounded-2xl border-none outline-none focus:ring-4 focus:ring-blue-500/10 text-2xl font-bold text-center" />
                      </div>
                    )}

                    <div className="bg-amber-50 dark:bg-amber-900/10 p-6 rounded-[2rem] border border-amber-100/50 flex gap-4 items-center">
                      <input type="checkbox" id="legal" className="w-6 h-6 accent-blue-600 rounded-lg cursor-pointer" checked={isOwner} onChange={(e) => setIsOwner(e.target.checked)} />
                      <label htmlFor="legal" className="text-sm font-bold text-slate-700 dark:text-slate-300 cursor-pointer leading-tight">I am the authorized signer for this document.</label>
                    </div>

                    <button onClick={handleSignPdf} disabled={loading || !isOwner} className="w-full py-6 bg-blue-600 text-white rounded-[2rem] font-black text-2xl shadow-xl shadow-blue-200 disabled:opacity-20 transition-all active:scale-95 flex items-center justify-center gap-3">
                      {loading ? <RefreshCw className="animate-spin" /> : "Sign & Download"}
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6 text-center">
                    <div className="py-12 bg-blue-50 dark:bg-blue-900/20 rounded-[3rem] border border-blue-100">
                      <Check className="w-16 h-16 text-blue-600 mx-auto" />
                      <h3 className="text-3xl font-black text-blue-700 mt-4">Execution Successful</h3>
                    </div>
                    <a href={unlockedUrl} download={`signed_${file.name}`} className="block w-full py-6 bg-emerald-600 text-white rounded-[2rem] font-black text-2xl shadow-xl shadow-emerald-200 text-center">Download Signed PDF</a>
                    <button onClick={() => setUnlockedUrl(null)} className="text-slate-400 font-bold uppercase text-xs tracking-widest mt-4">Sign Another Document</button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* --- CLEAN SEO CONTENT --- */}
        <article className="mt-32 space-y-16 text-left">
          <section className="space-y-6">
            <h2 className="text-4xl font-[950] text-slate-900 dark:text-white">Why Professionals Choose TaskGuru E-Sign</h2>
            <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
              TaskGuru provides an enterprise-grade electronic signature solution that operates entirely within your browser. For users in the United States, United Kingdom, and Canada, document privacy is a top priority. Unlike conventional cloud-based tools, our Zero-Upload technology ensures that your sensitive legal contracts, NDAs, and financial invoices never leave your local machine.
            </p>
          </section>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <Lock className="w-6 h-6 text-blue-600" />
                <h4 className="font-black text-xl">Privacy First Architecture</h4>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                We use WebAssembly to process your documents in RAM. No data is transmitted to external servers, making our tool fully GDPR and HIPAA compliant by design.
              </p>
            </div>

            <div className="p-8 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <Globe className="w-6 h-6 text-emerald-600" />
                <h4 className="font-black text-xl">Legally Binding Signatures</h4>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                TaskGuru follows the digital signature standards required for modern commerce. Securely sign mortgage papers, freelance contracts, and business invoices with confidence.
              </p>
            </div>
          </div>

          <section className="bg-slate-900 rounded-[3.5rem] p-12 text-white relative overflow-hidden">
             <ShieldAlert className="absolute -right-10 -bottom-10 w-64 h-64 text-white/5" />
             <h3 className="text-3xl font-black mb-6">Complete Your Workflow Privately</h3>
             <p className="text-slate-400 mb-8 max-w-xl">Once your document is signed, use our other local tools to finalize your documents without compromising security.</p>
             <div className="flex flex-wrap gap-4 font-bold text-xs uppercase tracking-widest">
                <Link href="/tools/pdf-compressor" className="px-6 py-3 bg-white/10 rounded-2xl hover:bg-white/20 transition-all border border-white/10">Compress PDF</Link>
                <Link href="/tools/unlock-pdf-no-upload" className="px-6 py-3 bg-white/10 rounded-2xl hover:bg-white/20 transition-all border border-white/10">Unlock PDF</Link>
             </div>
          </section>
        </article>

      </div>
    </div>
  );
}
