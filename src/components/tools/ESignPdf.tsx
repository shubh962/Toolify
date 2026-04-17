"use client";

import { useState, useRef, useEffect } from "react";
import { PDFDocument } from "pdf-lib";
import { motion, AnimatePresence } from "framer-motion";
import { 
  PenLine, Lock, Download, ShieldCheck, Zap, 
  RefreshCw, AlertCircle, Check, Eraser, 
  FileSignature, CloudOff, ArrowRight, FileText, 
  ShieldAlert, Landmark, Scale
} from "lucide-react";
import Link from "next/link";

export default function ESignPdf() {
  const [file, setFile] = useState<File | null>(null);
  const [signature, setSignature] = useState<string | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [loading, setLoading] = useState(false);
  const [unlockedUrl, setUnlockedUrl] = useState<string | null>(null);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);

  // Initialize Canvas for Local Signature
  useEffect(() => {
    if (canvasRef.current && file && !unlockedUrl) {
      const canvas = canvasRef.current;
      canvas.width = 500 * 2;
      canvas.height = 200 * 2;
      canvas.style.width = `100%`;
      canvas.style.height = `200px`;

      const context = canvas.getContext("2d");
      if (context) {
        context.scale(2, 2);
        context.lineCap = "round";
        context.lineJoin = "round";
        context.strokeStyle = "#0F172A";
        context.lineWidth = 2.5;
        contextRef.current = context;
      }
    }
  }, [file, unlockedUrl]);

  const startDrawing = ({ nativeEvent }: React.MouseEvent<HTMLCanvasElement>) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current?.beginPath();
    contextRef.current?.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const draw = ({ nativeEvent }: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current?.lineTo(offsetX, offsetY);
    contextRef.current?.stroke();
  };

  const endDrawing = () => {
    contextRef.current?.closePath();
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas && contextRef.current) {
      contextRef.current.clearRect(0, 0, canvas.width, canvas.height);
    }
    setSignature(null);
  };

  const handleSignPdf = async () => {
    if (!file || !isOwner || !canvasRef.current) return;
    setLoading(true);

    try {
      const sigData = canvasRef.current.toDataURL("image/png");
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const pages = pdfDoc.getPages();
      const firstPage = pages[0];

      const sigImage = await pdfDoc.embedPng(sigData);
      const sigDims = sigImage.scale(0.32);

      firstPage.drawImage(sigImage, {
        x: firstPage.getWidth() - sigDims.width - 55,
        y: 75,
        width: sigDims.width,
        height: sigDims.height,
      });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      setUnlockedUrl(URL.createObjectURL(blob));
    } catch (err) {
      console.error("Signing error:", err);
      alert("Something went wrong while signing. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setSignature(null);
    setIsOwner(false);
    setUnlockedUrl(null);
  };

  return (
    <div className="min-h-screen bg-[#F2F2F7] dark:bg-black font-sans selection:bg-blue-100">
      <div className="max-w-6xl mx-auto px-6 py-20 md:py-32">
        
        {/* Premium Header - SEO Friendly */}
        <header className="text-center mb-16 space-y-6">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-blue-100 dark:border-blue-800">
              <CloudOff className="w-4 h-4" /> Zero-Server • 100% Private
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-slate-900 dark:text-white leading-none">
              E-Sign <span className="text-blue-600">Secure</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 max-w-3xl mx-auto mt-8 font-medium leading-relaxed">
              Sign PDFs privately with the most secure local electronic signature tool. 
              No uploads, no cloud storage — everything happens in your browser.
            </p>
          </motion.div>
        </header>

        <main>
          {/* Main Tool Interface */}
          <div className="max-w-3xl mx-auto bg-white/80 dark:bg-slate-900/80 backdrop-blur-3xl rounded-[3.5rem] shadow-2xl border border-white dark:border-slate-800 p-10 md:p-14">
            <AnimatePresence mode="wait">
              {!file ? (
                <motion.div 
                  key="upload" 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }}
                  onClick={() => document.getElementById("pdf-in")?.click()}
                  className="group border-4 border-dashed border-slate-100 dark:border-slate-800 rounded-[3rem] py-28 flex flex-col items-center gap-8 cursor-pointer hover:border-blue-400 transition-all bg-slate-50/30"
                  aria-label="Upload PDF to sign"
                >
                  <div className="w-24 h-24 bg-blue-50 text-blue-600 rounded-[2.5rem] flex items-center justify-center group-hover:scale-110 transition-transform">
                    <FileSignature className="w-12 h-12" />
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-black text-slate-800 dark:text-slate-100">Upload Your Contract or PDF</p>
                    <p className="text-slate-400 text-sm mt-3">Sign locally — No data leaves your device</p>
                  </div>
                  <input 
                    id="pdf-in" 
                    type="file" 
                    accept=".pdf" 
                    className="hidden" 
                    onChange={(e) => setFile(e.target.files?.[0] || null)} 
                  />
                </motion.div>
              ) : (
                <motion.div 
                  key="process" 
                  initial={{ opacity: 0, x: 20 }} 
                  animate={{ opacity: 1, x: 0 }} 
                  className="space-y-10"
                >
                  {/* File Name */}
                  <div className="flex items-center gap-5 p-6 bg-slate-50 dark:bg-slate-800 rounded-[2rem] border border-slate-100 dark:border-slate-700">
                    <FileText className="w-8 h-8 text-blue-600 flex-shrink-0" />
                    <p className="font-semibold text-slate-900 dark:text-white truncate">{file.name}</p>
                    <button 
                      onClick={handleReset} 
                      className="ml-auto text-red-500 font-medium text-sm hover:underline"
                    >
                      Change File
                    </button>
                  </div>

                  {!unlockedUrl ? (
                    <div className="space-y-8">
                      {/* Signature Canvas */}
                      <div className="space-y-4">
                        <div className="flex justify-between items-center px-2">
                          <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Draw Your Signature</label>
                          <button 
                            onClick={clearCanvas} 
                            className="flex items-center gap-1 text-xs text-slate-400 hover:text-red-500 transition-colors"
                          >
                            <Eraser className="w-4 h-4" /> Clear
                          </button>
                        </div>
                        <div className="bg-white rounded-[2.5rem] border-2 border-slate-100 overflow-hidden cursor-crosshair shadow-inner h-[200px]">
                          <canvas 
                            ref={canvasRef}
                            onMouseDown={startDrawing}
                            onMouseMove={draw}
                            onMouseUp={endDrawing}
                            onMouseLeave={endDrawing}
                            className="w-full h-full touch-none"
                          />
                        </div>
                      </div>

                      {/* Legal & Privacy Notice */}
                      <div className="bg-blue-50 dark:bg-blue-900/10 p-8 rounded-[2.5rem] border border-blue-100 dark:border-blue-800 space-y-5">
                        <div className="flex items-center gap-2 text-blue-700 dark:text-blue-400 uppercase text-xs font-bold tracking-widest">
                          <ShieldCheck className="w-5 h-5" /> 
                          Private & Legally Compliant
                        </div>
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                          This e-signature tool works entirely in your browser. Your PDF and signature never leave your device, ensuring maximum privacy and security.
                        </p>
                        <div className="flex gap-4 items-start">
                          <input 
                            type="checkbox" 
                            id="legal" 
                            className="mt-1 w-6 h-6 accent-blue-600" 
                            checked={isOwner} 
                            onChange={(e) => setIsOwner(e.target.checked)} 
                          />
                          <label htmlFor="legal" className="text-sm cursor-pointer text-slate-700 dark:text-slate-200">
                            I confirm I am the authorized person to sign this document.
                          </label>
                        </div>
                      </div>

                      <button 
                        onClick={handleSignPdf} 
                        disabled={!isOwner || loading}
                        className="w-full py-8 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-[2.5rem] font-black text-3xl transition-all active:scale-95 shadow-lg"
                      >
                        {loading ? <RefreshCw className="animate-spin mx-auto w-8 h-8" /> : "Sign & Download PDF"}
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-8 text-center">
                      <div className="py-16 bg-emerald-50 dark:bg-emerald-900/20 rounded-[3rem] border border-emerald-100">
                        <Check className="w-20 h-20 text-emerald-600 mx-auto" />
                        <h2 className="text-4xl font-black mt-6 text-emerald-700 dark:text-emerald-400">PDF Signed Successfully</h2>
                      </div>

                      <a 
                        href={unlockedUrl} 
                        download={`signed_${file.name}`}
                        className="flex items-center justify-center gap-4 w-full py-8 bg-blue-600 hover:bg-blue-700 text-white rounded-[2.5rem] font-black text-3xl transition-all active:scale-95"
                      >
                        <Download className="w-9 h-9" /> Download Signed PDF
                      </a>

                      <div className="pt-8">
                        <p className="uppercase text-xs font-bold tracking-widest text-slate-400 mb-6">Next Steps</p>
                        <div className="grid grid-cols-2 gap-4">
                          <Link href="/tools/pdf-to-word" className="p-6 bg-white dark:bg-slate-800 rounded-3xl border hover:border-blue-400 transition-all flex flex-col items-center gap-3">
                            <RefreshCw className="w-6 h-6 text-blue-500" />
                            <span className="font-medium text-sm">Convert to Word</span>
                          </Link>
                          <Link href="/tools/pdf-compressor" className="p-6 bg-white dark:bg-slate-800 rounded-3xl border hover:border-emerald-400 transition-all flex flex-col items-center gap-3">
                            <Zap className="w-6 h-6 text-emerald-500" />
                            <span className="font-medium text-sm">Compress PDF</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>

        {/* SEO-Rich Educational Content */}
        <article className="mt-32 space-y-24 text-left max-w-4xl mx-auto">
          <section>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none mb-10">
              Private E-Signature Tool: Local vs Cloud Signing
            </h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center">
                    <Landmark className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold">Legal for Business & Finance</h3>
                </div>
                <p className="text-lg text-slate-600 dark:text-slate-400">
                  Fully compliant with ESIGN Act (USA), eIDAS (Europe), and equivalent laws in Canada and Australia. 
                  Sign loan documents, contracts, and NDAs with confidence — all locally.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center">
                    <Scale className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold">GDPR-Friendly for Law Firms</h3>
                </div>
                <p className="text-lg text-slate-600 dark:text-slate-400">
                  No document data is sent to any server. Ideal for lawyers and professionals who need strict data privacy.
                </p>
              </div>
            </div>
          </section>

          {/* FAQ Section - Great for SEO */}
          <section>
            <h2 className="text-4xl font-black text-center mb-12">Frequently Asked Questions</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border">
                <h3 className="font-bold text-lg mb-4">Is the digital signature legally binding?</h3>
                <p className="text-slate-600 dark:text-slate-400">Yes. Signatures created with this tool are legally valid in most jurisdictions under the ESIGN Act and eIDAS regulation.</p>
              </div>
              <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border">
                <h3 className="font-bold text-lg mb-4">Do I need to upload my PDF?</h3>
                <p className="text-slate-600 dark:text-slate-400">No. Everything runs locally in your browser. Your document never leaves your device.</p>
              </div>
            </div>
          </section>

          <footer className="text-center pt-16 border-t border-slate-200 dark:border-slate-800 text-sm text-slate-500">
            TaskGuru E-Sign Secure — All operations performed locally in your browser for maximum privacy and security.
          </footer>
        </article>
      </div>
    </div>
  );
                      }
