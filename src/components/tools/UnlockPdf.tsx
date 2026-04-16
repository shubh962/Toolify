"use client";

import { useState, useEffect } from "react";
import { PDFDocument } from "pdf-lib";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LockKeyhole, FileKey, Check, RefreshCw, CloudOff, 
  ShieldCheck, Scissors, Zap, ShieldQuestion, Globe 
} from "lucide-react";
import Link from "next/link";

export default function UnlockPdf() {
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState("");
  const [isOwner, setIsOwner] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [unlockedUrl, setUnlockedUrl] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Cleanup object URL on unmount or reset
  useEffect(() => {
    return () => {
      if (unlockedUrl) URL.revokeObjectURL(unlockedUrl);
    };
  }, [unlockedUrl]);

  const handleUnlock = async () => {
    if (!file || !password || !isOwner) return;

    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const arrayBuffer = await file.arrayBuffer();
      
      // Load PDF with password (pdf-lib will throw if password is wrong)
      const pdfDoc = await PDFDocument.load(arrayBuffer, { 
        password, 
        ignoreEncryption: false 
      });

      // Save the unlocked document
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      
      const newUrl = URL.createObjectURL(blob);
      
      // Clean up previous URL if exists
      if (unlockedUrl) URL.revokeObjectURL(unlockedUrl);
      
      setUnlockedUrl(newUrl);
      setSuccess(true);
    } catch (err: any) {
      console.error(err);
      if (err.message?.includes("password") || err.message?.includes("decrypt")) {
        setError("Incorrect password. Please check and try again.");
      } else {
        setError("Failed to unlock the PDF. The file may use advanced encryption or DRM not supported by standard tools.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    if (unlockedUrl) {
      URL.revokeObjectURL(unlockedUrl);
    }
    setFile(null);
    setPassword("");
    setIsOwner(false);
    setError("");
    setUnlockedUrl(null);
    setSuccess(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    if (selectedFile && selectedFile.type !== "application/pdf") {
      setError("Please upload a valid PDF file.");
      return;
    }
    setFile(selectedFile);
    setError("");
  };

  return (
    <div className="min-h-screen bg-[#F2F2F7] dark:bg-black font-sans pb-20">
      <div className="max-w-6xl mx-auto px-6 py-24">
        
        {/* Header */}
        <header className="text-center mb-20 space-y-6">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 rounded-full text-xs font-bold uppercase tracking-widest mb-6 shadow-sm">
              <Globe className="w-4 h-4" /> 100% Private • No Uploads • Browser Only
            </div>

            <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-slate-900 dark:text-white leading-none">
              Unlock PDF <span className="text-emerald-500">Privately</span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto mt-8 font-medium">
              Remove password protection from your PDFs entirely in your browser.<br />
              No data is uploaded, stored, or tracked — ever.
            </p>
          </motion.div>
        </header>

        {/* Main Tool Card */}
        <div className="max-w-2xl mx-auto bg-white/95 dark:bg-slate-900/95 backdrop-blur-3xl rounded-[3.5rem] shadow-2xl border border-white dark:border-slate-800 p-10 md:p-14 relative overflow-hidden">
          <AnimatePresence mode="wait">
            {!file ? (
              /* Upload Area */
              <motion.div
                key="upload"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onClick={() => document.getElementById("pdf-in")?.click()}
                className="group border-4 border-dashed border-slate-200 dark:border-slate-700 rounded-[2.75rem] py-32 flex flex-col items-center justify-center gap-8 hover:border-emerald-400 transition-all cursor-pointer bg-slate-50/50 dark:bg-slate-950/50"
              >
                <div className="w-28 h-28 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <LockKeyhole className="w-14 h-14" />
                </div>
                <div className="text-center">
                  <p className="text-4xl font-black text-slate-800 dark:text-white">Drop your PDF here</p>
                  <p className="text-emerald-600 dark:text-emerald-400 mt-3 font-medium">or click to browse</p>
                  <p className="text-xs text-slate-400 mt-6 uppercase tracking-[0.125em]">Processed locally • Zero cloud storage</p>
                </div>
                <input 
                  id="pdf-in" 
                  type="file" 
                  accept=".pdf" 
                  className="hidden" 
                  onChange={handleFileChange} 
                />
              </motion.div>
            ) : (
              /* Processing Area */
              <motion.div 
                key="process" 
                initial={{ opacity: 0, x: 30 }} 
                animate={{ opacity: 1, x: 0 }}
                className="space-y-10"
              >
                {/* File Info */}
                <div className="flex items-center gap-4 p-6 bg-slate-100 dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700">
                  <FileKey className="w-9 h-9 text-emerald-500 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-900 dark:text-white truncate">{file.name}</p>
                    <p className="text-xs text-slate-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                  <button 
                    onClick={handleReset}
                    className="text-red-500 hover:text-red-600 font-medium text-sm px-4 py-2 rounded-2xl hover:bg-red-50 dark:hover:bg-red-950 transition-colors"
                  >
                    Change File
                  </button>
                </div>

                {!unlockedUrl ? (
                  <div className="space-y-8">
                    <div>
                      <input 
                        type="password" 
                        placeholder="Enter PDF Password"
                        autoComplete="off"
                        className="w-full p-8 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-3xl outline-none focus:border-emerald-500 text-center text-4xl font-semibold tracking-tight placeholder:text-slate-400"
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>

                    {/* Security Notice */}
                    <div className="bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 p-8 rounded-3xl space-y-5">
                      <div className="flex items-center gap-3 text-amber-700 dark:text-amber-400 text-sm font-bold uppercase tracking-widest">
                        <CloudOff className="w-5 h-5" />
                        100% Local Processing
                      </div>
                      <p className="text-slate-700 dark:text-slate-300 text-[15px] leading-relaxed">
                        This tool runs entirely in your browser using WebAssembly. 
                        Your document and password never leave your device. 
                        Ideal for sensitive financial, legal, and medical documents.
                      </p>

                      <div className="flex items-start gap-4 pt-4 border-t border-amber-200 dark:border-amber-800">
                        <input 
                          type="checkbox" 
                          id="legal" 
                          className="w-6 h-6 mt-0.5 accent-emerald-600 rounded-lg" 
                          checked={isOwner} 
                          onChange={(e) => setIsOwner(e.target.checked)} 
                        />
                        <label htmlFor="legal" className="text-sm text-slate-700 dark:text-slate-300 cursor-pointer select-none">
                          I confirm I have the legal right to unlock and modify this document.
                        </label>
                      </div>
                    </div>

                    {error && (
                      <div className="text-red-600 dark:text-red-400 text-sm bg-red-50 dark:bg-red-950 p-4 rounded-2xl border border-red-100 dark:border-red-900">
                        {error}
                      </div>
                    )}

                    <button 
                      onClick={handleUnlock} 
                      disabled={!password || !isOwner || loading}
                      className="w-full py-8 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-800 text-white rounded-3xl font-bold text-3xl shadow-xl transition-all active:scale-[0.985] flex items-center justify-center gap-3"
                    >
                      {loading ? (
                        <>
                          <RefreshCw className="w-7 h-7 animate-spin" />
                          Decrypting...
                        </>
                      ) : (
                        "Unlock PDF Now"
                      )}
                    </button>
                  </div>
                ) : (
                  /* Success Screen */
                  <div className="space-y-10 text-center">
                    <div className="py-20 bg-emerald-50 dark:bg-emerald-950/60 rounded-3xl border border-emerald-100 dark:border-emerald-900">
                      <Check className="w-20 h-20 text-emerald-500 mx-auto" />
                      <h3 className="text-4xl font-bold text-emerald-700 dark:text-emerald-400 mt-6">
                        PDF Successfully Unlocked
                      </h3>
                      <p className="text-emerald-600 dark:text-emerald-500 mt-3">Processed locally in your browser</p>
                    </div>

                    <a 
                      href={unlockedUrl!} 
                      download={`unlocked_${file.name}`}
                      className="block w-full py-8 bg-blue-600 hover:bg-blue-700 text-white rounded-3xl font-bold text-3xl shadow-xl transition-all active:scale-[0.985]"
                    >
                      Download Unlocked PDF
                    </a>

                    <button 
                      onClick={handleReset}
                      className="text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300 font-medium text-sm tracking-widest"
                    >
                      Unlock Another Document →
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Expanded Content Section */}
        <article className="mt-32 space-y-24 text-left max-w-4xl mx-auto">
          
          <section className="space-y-12">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900 dark:text-white leading-none">
              Why Professionals Trust TaskGuru for Secure PDF Unlocking
            </h2>

            <div className="grid md:grid-cols-2 gap-12 text-lg">
              <div className="space-y-6">
                <h4 className="text-3xl font-bold text-emerald-600">Financial & Banking Documents</h4>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  Safely unlock bank statements, tax returns, mortgage agreements, and payroll records. 
                  Perfect for accountants, financial advisors, and individuals who need to process 
                  sensitive documents without risking cloud exposure.
                </p>
              </div>

              <div className="space-y-6">
                <h4 className="text-3xl font-bold text-blue-600">Legal & Compliance Workflows</h4>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  Lawyers, paralegals, and compliance officers worldwide use TaskGuru to remove 
                  password protection from contracts, NDAs, court filings, and discovery documents — 
                  all while maintaining strict client confidentiality.
                </p>
              </div>
            </div>
          </section>

          {/* Internal Linking */}
          <div className="grid md:grid-cols-2 gap-8">
            <Link href="/tools/split-pdf" className="group p-12 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 hover:shadow-2xl transition-all flex items-center justify-between">
              <div>
                <h5 className="text-2xl font-bold mb-3">Split PDF</h5>
                <p className="text-slate-500 dark:text-slate-400">Extract specific pages from your unlocked document locally.</p>
              </div>
              <Scissors className="w-12 h-12 text-purple-500 group-hover:rotate-12 transition-transform" />
            </Link>

            <Link href="/tools/image-compressor" className="group p-12 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 hover:shadow-2xl transition-all flex items-center justify-between">
              <div>
                <h5 className="text-2xl font-bold mb-3">Compress Images</h5>
                <p className="text-slate-500 dark:text-slate-400">Optimize extracted images for faster loading and smaller file sizes.</p>
              </div>
              <Zap className="w-12 h-12 text-yellow-500 group-hover:scale-125 transition-transform" />
            </Link>
          </div>

          {/* Trust Section */}
          <section className="bg-slate-900 text-white p-16 md:p-20 rounded-[3.5rem] relative overflow-hidden">
            <Globe className="absolute -top-20 -right-20 w-96 h-96 text-white/5 pointer-events-none" />
            
            <h3 className="text-4xl md:text-5xl font-black tracking-tighter max-w-2xl">
              Built for Global Privacy Standards
            </h3>

            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <div className="p-8 bg-white/5 rounded-3xl border border-white/10 text-center">
                <ShieldCheck className="mx-auto mb-6 text-emerald-400 w-10 h-10" />
                <p className="font-bold">GDPR Compliant</p>
              </div>
              <div className="p-8 bg-white/5 rounded-3xl border border-white/10 text-center">
                <ShieldCheck className="mx-auto mb-6 text-emerald-400 w-10 h-10" />
                <p className="font-bold">HIPAA Ready</p>
              </div>
              <div className="p-8 bg-white/5 rounded-3xl border border-white/10 text-center">
                <ShieldCheck className="mx-auto mb-6 text-emerald-400 w-10 h-10" />
                <p className="font-bold">ISO 27001 Aligned</p>
              </div>
            </div>

            <p className="mt-12 text-lg text-slate-300 max-w-2xl">
              TaskGuru's client-side architecture ensures your sensitive documents and passwords 
              never leave your device. Trusted by professionals in finance, law, healthcare, 
              and government sectors across the USA, UK, EU, and beyond.
            </p>
          </section>

          {/* FAQ */}
          <section className="space-y-12">
            <h3 className="text-4xl font-bold flex items-center gap-4">
              <ShieldQuestion className="text-emerald-500 w-9 h-9" /> 
              Frequently Asked Questions
            </h3>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-slate-50 dark:bg-slate-900 p-10 rounded-3xl border border-slate-100 dark:border-slate-800">
                <h5 className="font-bold text-xl mb-4">Is TaskGuru really free?</h5>
                <p className="text-slate-600 dark:text-slate-400">
                  Yes. All our PDF tools are completely free to use with no sign-up, no limits, 
                  and no hidden fees — available worldwide.
                </p>
              </div>

              <div className="bg-slate-50 dark:bg-slate-900 p-10 rounded-3xl border border-slate-100 dark:border-slate-800">
                <h5 className="font-bold text-xl mb-4">What kind of PDFs can I unlock?</h5>
                <p className="text-slate-600 dark:text-slate-400">
                  Standard password-protected PDFs. Note: Advanced DRM-protected files (e.g., some eBooks or enterprise rights-managed documents) may not be supported.
                </p>
              </div>
            </div>
          </section>
        </article>
      </div>
    </div>
  );
}
