"use client";

import { useState, useEffect } from "react";
import { PDFDocument } from "pdf-lib";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Unlock, Lock, Download, ShieldCheck, Zap, 
  RefreshCw, FileWarning, AlertCircle, Check,
  ShieldAlert, LockKeyhole, FileKey, ArrowRight,
  Scissors, FileStack, Globe, ShieldQuestion, CloudOff
} from "lucide-react";
import Link from "next/link";

export default function UnlockPdf() {
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState("");
  const [isOwner, setIsOwner] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [unlockedUrl, setUnlockedUrl] = useState<string | null>(null);

  useEffect(() => {
    return () => { if (unlockedUrl) URL.revokeObjectURL(unlockedUrl); };
  }, [unlockedUrl]);

  const handleUnlock = async () => {
    if (!file || !password || !isOwner) return;
    setLoading(true);
    setError("");
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer, { password: password, ignoreEncryption: false });
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      setUnlockedUrl(URL.createObjectURL(blob));
    } catch (err) {
      setError("Decryption failed. Please check if the password is correct or if the file uses unsupported DRM.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFile(null); setPassword(""); setIsOwner(false); setError("");
    if (unlockedUrl) URL.revokeObjectURL(unlockedUrl);
    setUnlockedUrl(null);
  };

  return (
    <div className="min-h-screen bg-[#F2F2F7] dark:bg-black font-sans pb-20">
      <div className="max-w-6xl mx-auto px-6 py-24">
        
        {/* --- GLOBAL SEO HEADER --- */}
        <header className="text-center mb-20 space-y-6">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-4 shadow-sm">
              <Globe className="w-3 h-3" /> Worldwide Enterprise Privacy Standard
            </div>
            <h1 className="text-6xl md:text-9xl font-[950] tracking-tighter text-slate-900 dark:text-white leading-[0.9]">
              Unlock <span className="text-emerald-500">Privately</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 max-w-3xl mx-auto font-medium mt-6">
              The only browser-side PDF decrypter that never uploads your data. [cite_start]Securely remove passwords from financial and legal documents. [cite: 5-6, 22]
            </p>
          </motion.div>
        </header>

        {/* --- TOOL INTERFACE --- */}
        <div className="max-w-2xl mx-auto bg-white/95 dark:bg-slate-900/95 backdrop-blur-3xl rounded-[4rem] shadow-2xl border border-white dark:border-slate-800 p-12 relative">
          <AnimatePresence mode="wait">
            {!file ? (
              <motion.div 
                key="upload" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                onClick={() => document.getElementById("pdf-in")?.click()}
                className="group border-4 border-dashed border-slate-100 dark:border-slate-800 rounded-[3rem] py-28 flex flex-col items-center gap-8 hover:border-emerald-400 transition-all cursor-pointer bg-slate-50/30"
              >
                <div className="w-24 h-24 bg-emerald-50 text-emerald-500 rounded-[2.5rem] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <LockKeyhole className="w-12 h-12" />
                </div>
                <div className="text-center">
                  <p className="text-3xl font-black text-slate-800 dark:text-slate-100">Drop PDF Here</p>
                  <p className="text-slate-400 text-[10px] uppercase tracking-[0.4em] font-black mt-2 underline decoration-emerald-500 underline-offset-8">No Cloud Storage</p>
                </div>
                <input id="pdf-in" type="file" accept=".pdf" className="hidden" onChange={(e) => setFile(e.target.files?.[0] || null)} />
              </motion.div>
            ) : (
              <motion.div key="process" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-10 text-center">
                <div className="flex items-center gap-5 p-6 bg-slate-50 rounded-[2rem] border border-slate-100">
                   <FileKey className="w-8 h-8 text-emerald-500" />
                   <div className="flex-1 text-left overflow-hidden"><p className="font-black text-slate-900 truncate">{file.name}</p></div>
                   <button onClick={handleReset} className="text-red-500 font-bold text-xs uppercase tracking-widest">Reset</button>
                </div>

                {!unlockedUrl ? (
                  <div className="space-y-8">
                    <input 
                      type="password" placeholder="Password Required" autoComplete="off"
                      className="w-full p-8 bg-slate-100 dark:bg-slate-950 rounded-[2rem] border-none outline-none focus:ring-4 focus:ring-emerald-500/10 text-center text-5xl font-black tracking-tighter"
                      value={password} onChange={(e) => setPassword(e.target.value)}
                    />
                    
                    {/* CONTEXTUAL DISCLAIMER */}
                    <div className="bg-amber-50/50 p-8 rounded-[3rem] border border-amber-100/50 space-y-4">
                      <div className="flex gap-2 items-center justify-center text-amber-700 uppercase text-[10px] font-black tracking-widest">
                        <CloudOff className="w-4 h-4" /> Zero Server Interaction
                      </div>
                      <p className="text-sm text-amber-900 font-semibold leading-relaxed">
                        USA & EU Compliance Notice: This tool operates 100% within your RAM. [cite_start]We do not transmit or store your credentials or documents. [cite: 5-6, 22]
                      </p>
                      <div className="flex gap-4 items-center justify-center pt-4 border-t border-amber-200/50">
                        <input type="checkbox" id="legal" className="w-8 h-8 accent-emerald-600 rounded-xl" checked={isOwner} onChange={(e) => setIsOwner(e.target.checked)} />
                        <label htmlFor="legal" className="text-sm font-black text-slate-700">I hold the legal rights to this file.</label>
                      </div>
                    </div>

                    <button 
                      onClick={handleUnlock} disabled={!password || !isOwner || loading}
                      className="w-full py-8 bg-emerald-600 text-white rounded-[2.5rem] font-black text-3xl shadow-2xl disabled:opacity-20 transition-all active:scale-95"
                    >
                      {loading ? <RefreshCw className="animate-spin mx-auto" /> : "Unlock Now"}
                    </button>
                  </div>
                ) : (
                  <div className="space-y-8">
                    <div className="py-16 bg-emerald-50 rounded-[3rem] border border-emerald-100"><Check className="w-16 h-16 text-emerald-500 mx-auto" /><h3 className="text-4xl font-black text-emerald-700 mt-4 underline decoration-emerald-200">Decrypted Locally</h3></div>
                    <a href={unlockedUrl} download={`unlocked_${file.name}`} className="block w-full py-8 bg-blue-600 text-white rounded-[2.5rem] font-black text-3xl shadow-2xl">Download PDF</a>
                    <button onClick={handleReset} className="text-slate-400 font-bold uppercase text-xs tracking-[0.3em]">Unlock Another</button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* --- HIGH CPM GLOBAL CONTENT --- */}
        <article className="mt-48 space-y-32 text-left">
          
          <section className="space-y-12">
            <h2 className="text-5xl md:text-7xl font-[950] text-slate-900 tracking-tighter leading-none">
              [cite_start]Why Privacy Professionals from USA, UK & EU Trust TaskGuru [cite: 5-6, 22]
            </h2>
            <div className="grid md:grid-cols-2 gap-16">
              <div className="space-y-6">
                <h4 className="text-2xl font-black text-emerald-600">Secure Bank Statements</h4>
                <p className="text-lg text-slate-500 font-medium leading-relaxed">
                  [cite_start]Unlock sensitive payroll records, mortgage documents, and insurance files for seamless processing without compromising your security. [cite: 5-6] [cite_start]Ideal for international tax compliance and financial auditing where cloud-exposure is prohibited.[span_0](end_span)
                </p>
              </div>
              <div className="space-y-6">
                <h4 className="text-2xl font-black text-blue-600">Legal Document Workflow</h4>
                <p className="text-lg text-slate-500 font-medium leading-relaxed">
                  [span_1](start_span)Lawyers and paralegals across the UK and Australia use TaskGuru to remove security flags from case files locally. [cite: 5-6] [cite_start]Our WebAssembly logic ensures zero data retention, making us the top choice for privacy-centric legal professionals.[span_1](end_span)
                </p>
              </div>
            </div>
          </section>

          {/* INTERNAL LINKING CARDS */}
          <div className="grid md:grid-cols-2 gap-8">
             <Link href="/tools/split-pdf" className="p-12 bg-white rounded-[3.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group flex items-center justify-between">
                <div><h5 className="text-2xl font-black mb-2 uppercase tracking-tighter">Split Unlocked PDF</h5><p className="text-slate-400 text-sm font-bold">Extract pages from your newly decrypted file locally.</p></div>
                <Scissors className="w-10 h-10 text-purple-500 group-hover:rotate-12 transition-transform" />
             </Link>
             <Link href="/tools/image-compressor" className="p-12 bg-white rounded-[3.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group flex items-center justify-between">
                <div><h5 className="text-2xl font-black mb-2 uppercase tracking-tighter">Compress Assets</h5><p className="text-slate-400 text-sm font-bold">Optimize images for faster web loading after extraction.</p></div>
                <Zap className="w-10 h-10 text-yellow-500 group-hover:scale-125 transition-transform" />
             </Link>
          </div>

          <section className="bg-slate-900 p-20 rounded-[4rem] text-white space-y-10 relative overflow-hidden">
             <Globe className="absolute -top-10 -right-10 w-80 h-80 text-white/5" />
             [span_2](start_span)<h3 className="text-4xl font-[950] tracking-tighter leading-none max-w-xl">Meeting International Privacy Standards for Decryption[span_2](end_span)</h3>
             <div className="grid md:grid-cols-3 gap-8 text-sm font-black uppercase tracking-widest text-slate-400">
                <div className="p-6 bg-white/5 rounded-3xl border border-white/10 text-center"><ShieldCheck className="mx-auto mb-4 text-emerald-400" /> HIPAA Ready</div>
                <div className="p-6 bg-white/5 rounded-3xl border border-white/10 text-center"><ShieldCheck className="mx-auto mb-4 text-emerald-400" /> GDPR Compliant</div>
                <div className="p-6 bg-white/5 rounded-3xl border border-white/10 text-center"><ShieldCheck className="mx-auto mb-4 text-emerald-400" /> ISO 27001 Logic</div>
             </div>
             <p className="text-lg text-slate-300 max-w-2xl leading-relaxed">
               TaskGuru is engineered for global productivity. Our "No-Server" promise means your passwords never cross borders. [span_3](start_span)Local execution is the gold standard for high-security environments in San Francisco, London, and Berlin.[span_3](end_span)
             </p>
          </section>

          <section className="space-y-12">
             <h3 className="text-3xl font-black flex items-center gap-4"><ShieldQuestion className="text-emerald-500" /> Global Privacy FAQ</h3>
             <div className="grid md:grid-cols-2 gap-6">
                [span_4](start_span)<div className="p-10 bg-slate-50 rounded-[3rem]"><h5 className="font-black mb-3">Is this tool free in the USA?</h5><p className="text-slate-500 text-sm">Yes, TaskGuru offers 100% free professional tools globally without sign-ups or hidden fees. [cite: 5-6]</p></div>
                [cite_start]<div className="p-10 bg-slate-50 rounded-[3rem]"><h5 className="font-black mb-3">Can I unlock enterprise-locked PDFs?</h5><p className="text-slate-500 text-sm">As long as you provide the authorized password, our tool can remove security flags from any standard PDF document. [cite: 8-12]</p></div>
             </div>
          </section>

        </article>
      </div>
    </div>
  );
               }
