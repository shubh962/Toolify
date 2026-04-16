"use client";

import { useState, useEffect } from "react";
import { PDFDocument } from "pdf-lib";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LockKeyhole, FileKey, Check, RefreshCw, CloudOff, 
  ShieldCheck, ShieldQuestion, Globe 
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
      <div className="max-w-3xl mx-auto">

        {/* Hero Header - SEO + Screenshot Style */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tighter">
            Unlock PDF <span className="text-emerald-500">Privately</span>
          </h1>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
            The secure browser-only PDF password remover.<br />
            No uploads, no tracking, no data leaving your device.
          </p>
        </div>

        {/* Main Tool - Matches Your Screenshot */}
        <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl p-8 md:p-10 mb-20">
          <AnimatePresence mode="wait">
            {!file ? (
              <motion.div
                key="upload"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={() => document.getElementById("file-input")?.click()}
                className="border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-2xl py-20 text-center cursor-pointer hover:border-emerald-400 transition-all"
              >
                <LockKeyhole className="w-16 h-16 mx-auto text-emerald-500 mb-6" />
                <p className="text-2xl font-semibold">Drop PDF Here</p>
                <p className="text-zinc-500 mt-2">or click to browse</p>
                <input id="file-input" type="file" accept=".pdf" className="hidden" onChange={handleFileChange} />
              </motion.div>
            ) : !unlockedUrl ? (
              <motion.div key="process" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                {/* File Info */}
                <div className="bg-zinc-100 dark:bg-zinc-800 rounded-2xl p-5 flex items-center gap-4">
                  <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900 rounded-xl flex items-center justify-center">
                    <FileKey className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{file.name}</p>
                    <p className="text-xs text-zinc-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                  <button onClick={handleReset} className="text-emerald-600 font-medium text-sm">Change File</button>
                </div>

                {/* Password */}
                <input
                  type="password"
                  placeholder="Enter PDF Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl px-6 py-5 text-center text-2xl tracking-widest focus:border-emerald-500 outline-none"
                />

                {/* Local Processing Box */}
                <div className="bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 rounded-2xl p-6">
                  <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-semibold mb-3">
                    <CloudOff className="w-5 h-5" /> 100% LOCAL PROCESSING
                  </div>
                  <p className="text-sm text-zinc-700 dark:text-zinc-300">
                    This tool runs entirely in your browser. Your document and password never leave your device.
                  </p>
                  <div className="mt-5 flex gap-3">
                    <input type="checkbox" id="legal" checked={isOwner} onChange={(e) => setIsOwner(e.target.checked)} className="mt-1 accent-emerald-600" />
                    <label htmlFor="legal" className="text-sm cursor-pointer">I confirm I have the legal right to unlock this document.</label>
                  </div>
                </div>

                {error && <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-2xl text-sm">{error}</div>}

                <button
                  onClick={handleUnlock}
                  disabled={!password || !isOwner || loading}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-70 text-white font-semibold py-6 rounded-2xl text-xl transition-all"
                >
                  {loading ? <RefreshCw className="animate-spin mx-auto" /> : "Unlock PDF Now"}
                </button>
              </motion.div>
            ) : (
              <motion.div key="success" className="text-center py-12 space-y-8">
                <Check className="w-20 h-20 text-emerald-500 mx-auto" />
                <h3 className="text-3xl font-bold text-emerald-700">PDF Successfully Unlocked</h3>
                <a href={unlockedUrl} download={`unlocked_${file.name}`} className="block bg-blue-600 text-white py-6 rounded-2xl font-semibold text-xl">
                  Download Unlocked PDF
                </a>
                <button onClick={handleReset} className="text-zinc-500 hover:underline">Unlock Another PDF</button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* What is this Tool */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold tracking-tight mb-6">What is TaskGuru Unlock PDF?</h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
            TaskGuru Unlock PDF is a <strong>100% private, browser-only PDF password remover</strong>. 
            It lets you securely remove password protection from your PDFs without uploading any files to the cloud. 
            Perfect for sensitive financial statements, legal contracts, medical records, and confidential business documents.
          </p>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
            Unlike other online tools, your data never leaves your device — making it one of the safest ways to unlock PDF files privately.
          </p>
        </section>

        {/* How to Use */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold tracking-tight mb-6">How to Use This Tool</h2>
          <ol className="space-y-6 text-lg">
            <li className="flex gap-4">
              <span className="font-bold text-emerald-600">1.</span>
              <div>Upload your password-protected PDF file (or drag & drop it).</div>
            </li>
            <li className="flex gap-4">
              <span className="font-bold text-emerald-600">2.</span>
              <div>Enter the correct password for the PDF.</div>
            </li>
            <li className="flex gap-4">
              <span className="font-bold text-emerald-600">3.</span>
              <div>Confirm you have legal rights to unlock the document.</div>
            </li>
            <li className="flex gap-4">
              <span className="font-bold text-emerald-600">4.</span>
              <div>Click "Unlock PDF Now" — everything happens locally in your browser.</div>
            </li>
            <li className="flex gap-4">
              <span className="font-bold text-emerald-600">5.</span>
              <div>Download your unlocked PDF instantly.</div>
            </li>
          </ol>
        </section>

        {/* Why Professionals Trust */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold tracking-tight mb-8 text-center">Why Professionals Trust TaskGuru</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl">
              <h4 className="text-emerald-600 font-bold text-xl mb-3">Financial Documents</h4>
              <p className="text-zinc-600 dark:text-zinc-400">Unlock bank statements, tax returns, and payroll records safely.</p>
            </div>
            <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl">
              <h4 className="text-blue-600 font-bold text-xl mb-3">Legal & Compliance</h4>
              <p className="text-zinc-600 dark:text-zinc-400">Remove passwords from contracts and case files while staying GDPR/HIPAA compliant.</p>
            </div>
          </div>
        </section>

        {/* 6 FAQs */}
        <section className="mb-20">
          <div className="flex items-center gap-4 mb-10">
            <ShieldQuestion className="w-9 h-9 text-emerald-500" />
            <h3 className="text-4xl font-bold tracking-tight">Frequently Asked Questions</h3>
          </div>

          <div className="space-y-6">
            <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 border border-zinc-100 dark:border-zinc-800">
              <h5 className="font-semibold text-lg mb-3">Is TaskGuru Unlock PDF really free?</h5>
              <p className="text-zinc-600 dark:text-zinc-400">Yes, it is completely free with no sign-up, no limits, and no hidden fees.</p>
            </div>

            <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 border border-zinc-100 dark:border-zinc-800">
              <h5 className="font-semibold text-lg mb-3">Is my data safe and private?</h5>
              <p className="text-zinc-600 dark:text-zinc-400">Yes. The entire process runs locally in your browser using WebAssembly. Nothing is uploaded or stored on our servers.</p>
            </div>

            <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 border border-zinc-100 dark:border-zinc-800">
              <h5 className="font-semibold text-lg mb-3">What PDFs can this tool unlock?</h5>
              <p className="text-zinc-600 dark:text-zinc-400">It works with standard password-protected PDFs. Advanced DRM-protected files (e.g., some eBooks) may not be supported.</p>
            </div>

            <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 border border-zinc-100 dark:border-zinc-800">
              <h5 className="font-semibold text-lg mb-3">Can I use it on mobile phones?</h5>
              <p className="text-zinc-600 dark:text-zinc-400">Yes, it works on modern mobile browsers, though desktop browsers perform better for larger files.</p>
            </div>

            <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 border border-zinc-100 dark:border-zinc-800">
              <h5 className="font-semibold text-lg mb-3">Is there a file size limit?</h5>
              <p className="text-zinc-600 dark:text-zinc-400">No strict limit, but very large files (100MB+) may take longer depending on your device.</p>
            </div>

            <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 border border-zinc-100 dark:border-zinc-800">
              <h5 className="font-semibold text-lg mb-3">What if the correct password still doesn’t work?</h5>
              <p className="text-zinc-600 dark:text-zinc-400">Some PDFs use owner-level or advanced encryption. Try Adobe Acrobat in those rare cases.</p>
            </div>
          </div>
        </section>

        {/* Internal Links */}
        <div className="grid md:grid-cols-2 gap-6">
          <Link href="/tools/split-pdf" className="p-8 bg-white dark:bg-zinc-900 rounded-3xl border hover:shadow-xl transition-all">
            <h5 className="font-bold text-xl">Split PDF</h5>
            <p className="text-zinc-500 mt-2">Extract pages from your unlocked document locally.</p>
          </Link>
          <Link href="/tools/image-compressor" className="p-8 bg-white dark:bg-zinc-900 rounded-3xl border hover:shadow-xl transition-all">
            <h5 className="font-bold text-xl">Compress Images</h5>
            <p className="text-zinc-500 mt-2">Reduce file size after unlocking your PDF.</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
