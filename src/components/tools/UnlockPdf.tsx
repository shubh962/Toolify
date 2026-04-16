"use client";

import { useState, useEffect } from "react";
import { PDFDocument } from "pdf-lib";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LockKeyhole, FileKey, Check, RefreshCw, CloudOff, 
  ShieldCheck, ShieldQuestion 
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
    return () => {
      if (unlockedUrl) URL.revokeObjectURL(unlockedUrl);
    };
  }, [unlockedUrl]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    if (selectedFile && selectedFile.type !== "application/pdf") {
      setError("Please select a valid PDF file.");
      return;
    }
    setFile(selectedFile);
    setError("");
    setPassword("");
    setUnlockedUrl(null);
  };

  const handleUnlock = async () => {
    if (!file || !password || !isOwner) return;

    setLoading(true);
    setError("");

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer, { 
        password, 
        ignoreEncryption: false 
      });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);

      if (unlockedUrl) URL.revokeObjectURL(unlockedUrl);
      setUnlockedUrl(url);
    } catch (err: any) {
      console.error(err);
      setError(
        err.message?.toLowerCase().includes("password") 
          ? "Incorrect password. Please check and try again." 
          : "Failed to unlock the PDF. The file may use advanced encryption or DRM not supported by standard tools."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    if (unlockedUrl) URL.revokeObjectURL(unlockedUrl);
    setFile(null);
    setPassword("");
    setIsOwner(false);
    setError("");
    setUnlockedUrl(null);
  };

  return (
    <div className="min-h-screen bg-zinc-100 dark:bg-zinc-950 py-12 px-4 font-sans">
      <div className="max-w-2xl mx-auto">
        
        {/* Header - Matches Screenshot */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tighter">
            Unlock PDF <span className="text-emerald-500">Privately</span>
          </h1>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400 max-w-md mx-auto">
            Remove password protection from your PDFs entirely in your browser.<br />
            No data is uploaded, stored, or tracked — ever.
          </p>
        </div>

        {/* Main Tool Card - Closely Matches Screenshot */}
        <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl p-8 md:p-10">
          <AnimatePresence mode="wait">
            {!file ? (
              /* Upload Area */
              <motion.div
                key="upload"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => document.getElementById("file-input")?.click()}
                className="border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-2xl py-20 text-center cursor-pointer hover:border-emerald-400 transition-all"
              >
                <LockKeyhole className="w-16 h-16 mx-auto text-emerald-500 mb-6" />
                <p className="text-2xl font-semibold text-zinc-800 dark:text-white">Drop PDF Here</p>
                <p className="text-zinc-500 mt-2">or click to browse your files</p>
                <input
                  id="file-input"
                  type="file"
                  accept=".pdf"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </motion.div>
            ) : !unlockedUrl ? (
              /* Processing Screen - Matches Screenshot Design */
              <motion.div 
                key="process" 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                {/* File Info Box */}
                <div className="bg-zinc-100 dark:bg-zinc-800 rounded-2xl p-5 flex items-center gap-4">
                  <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FileKey className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-zinc-900 dark:text-white truncate">{file.name}</p>
                    <p className="text-xs text-zinc-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                  <button 
                    onClick={handleReset}
                    className="text-emerald-600 hover:text-emerald-700 font-medium text-sm whitespace-nowrap"
                  >
                    Change File
                  </button>
                </div>

                {/* Password Field */}
                <div>
                  <input
                    type="password"
                    placeholder="Enter PDF Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl px-6 py-5 text-center text-2xl tracking-[4px] placeholder:text-zinc-400 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                {/* 100% Local Processing Box - Matches Screenshot */}
                <div className="bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 rounded-2xl p-6">
                  <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-semibold text-sm mb-3">
                    <CloudOff className="w-5 h-5" />
                    100% LOCAL PROCESSING
                  </div>
                  <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                    This tool runs entirely in your browser using WebAssembly. Your document and password never leave your device. 
                    Ideal for sensitive financial, legal, and medical documents.
                  </p>

                  {/* Legal Checkbox */}
                  <div className="mt-6 flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="legal"
                      checked={isOwner}
                      onChange={(e) => setIsOwner(e.target.checked)}
                      className="mt-1 w-5 h-5 accent-emerald-600 rounded"
                    />
                    <label htmlFor="legal" className="text-sm text-zinc-700 dark:text-zinc-300 cursor-pointer select-none">
                      I confirm I have the legal right to unlock and modify this document.
                    </label>
                  </div>
                </div>

                {/* Error Message - Matches Screenshot Style */}
                {error && (
                  <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 text-sm p-4 rounded-2xl">
                    {error}
                  </div>
                )}

                {/* Unlock Button */}
                <button
                  onClick={handleUnlock}
                  disabled={!password || !isOwner || loading}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-800 text-white font-semibold text-xl py-6 rounded-2xl transition-all active:scale-[0.985] flex items-center justify-center gap-3"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="w-6 h-6 animate-spin" />
                      Unlocking...
                    </>
                  ) : (
                    "Unlock PDF Now"
                  )}
                </button>
              </motion.div>
            ) : (
              /* Success Screen */
              <motion.div 
                key="success" 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }}
                className="text-center space-y-8 py-8"
              >
                <div className="mx-auto w-20 h-20 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center">
                  <Check className="w-12 h-12 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-emerald-700 dark:text-emerald-400">PDF Successfully Unlocked</h3>
                  <p className="text-zinc-500 mt-2">Processed securely in your browser</p>
                </div>

                <a
                  href={unlockedUrl!}
                  download={`unlocked_${file.name}`}
                  className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xl py-6 rounded-2xl transition-all"
                >
                  Download Unlocked PDF
                </a>

                <button onClick={handleReset} className="text-zinc-500 hover:text-zinc-600 font-medium">
                  Unlock Another PDF →
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Why Professionals Trust Section */}
        <div className="mt-20">
          <h2 className="text-4xl font-bold tracking-tight text-center mb-12">
            Why Professionals Trust TaskGuru for Secure PDF Unlocking
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl">
              <h4 className="text-emerald-600 font-bold text-xl mb-4">Financial & Banking</h4>
              <p className="text-zinc-600 dark:text-zinc-400">
                Safely unlock bank statements, tax documents, mortgage papers, and payroll records without exposing them to the cloud.
              </p>
            </div>
            <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl">
              <h4 className="text-blue-600 font-bold text-xl mb-4">Legal & Compliance</h4>
              <p className="text-zinc-600 dark:text-zinc-400">
                Lawyers and compliance teams use TaskGuru to process contracts, NDAs, and case files while maintaining strict confidentiality.
              </p>
            </div>
          </div>
        </div>

        {/* Expanded FAQ Section - 6 Questions */}
        <div className="mt-24">
          <div className="flex items-center gap-4 mb-10">
            <ShieldQuestion className="w-9 h-9 text-emerald-500" />
            <h3 className="text-4xl font-bold tracking-tight">Frequently Asked Questions</h3>
          </div>

          <div className="space-y-6">
            <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 border border-zinc-100 dark:border-zinc-800">
              <h5 className="font-semibold text-lg mb-3">Is TaskGuru completely free to use?</h5>
              <p className="text-zinc-600 dark:text-zinc-400">Yes. All our PDF tools are 100% free with no sign-up required, no usage limits, and no hidden fees. Available worldwide.</p>
            </div>

            <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 border border-zinc-100 dark:border-zinc-800">
              <h5 className="font-semibold text-lg mb-3">Does this tool really keep my files private?</h5>
              <p className="text-zinc-600 dark:text-zinc-400">Absolutely. Everything runs locally in your browser using WebAssembly. Your PDF and password never leave your device and are not stored anywhere.</p>
            </div>

            <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 border border-zinc-100 dark:border-zinc-800">
              <h5 className="font-semibold text-lg mb-3">What types of PDFs can I unlock?</h5>
              <p className="text-zinc-600 dark:text-zinc-400">You can unlock standard password-protected PDFs. However, files with advanced DRM (like some eBooks or enterprise rights-managed documents) may not be supported.</p>
            </div>

            <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 border border-zinc-100 dark:border-zinc-800">
              <h5 className="font-semibold text-lg mb-3">Can I unlock PDFs on mobile devices?</h5>
              <p className="text-zinc-600 dark:text-zinc-400">Yes, the tool works on most modern mobile browsers (Chrome, Safari, Firefox). For best performance, we recommend using a desktop browser for larger files.</p>
            </div>

            <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 border border-zinc-100 dark:border-zinc-800">
              <h5 className="font-semibold text-lg mb-3">Is there a file size limit?</h5>
              <p className="text-zinc-600 dark:text-zinc-400">There is no strict limit, but very large files (over 100MB) may take longer to process depending on your device’s hardware and available RAM.</p>
            </div>

            <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 border border-zinc-100 dark:border-zinc-800">
              <h5 className="font-semibold text-lg mb-3">What should I do if the password is correct but it still fails?</h5>
              <p className="text-zinc-600 dark:text-zinc-400">Some PDFs use owner-level passwords or advanced encryption not fully supported by browser-based tools. In such cases, try using Adobe Acrobat with the correct password.</p>
            </div>
          </div>
        </div>

        {/* Optional Internal Links */}
        <div className="mt-20 grid md:grid-cols-2 gap-6">
          <Link href="/tools/split-pdf" className="block p-8 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-100 dark:border-zinc-800 hover:shadow-xl transition-all">
            <div className="flex justify-between items-start">
              <div>
                <h5 className="font-bold text-xl">Split PDF</h5>
                <p className="text-zinc-500 mt-2 text-sm">Extract specific pages from your unlocked document locally.</p>
              </div>
            </div>
          </Link>
          <Link href="/tools/image-compressor" className="block p-8 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-100 dark:border-zinc-800 hover:shadow-xl transition-all">
            <div className="flex justify-between items-start">
              <div>
                <h5 className="font-bold text-xl">Compress Images</h5>
                <p className="text-zinc-500 mt-2 text-sm">Optimize images after extraction for smaller file sizes.</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
                }
