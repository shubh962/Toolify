"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { PDFDocument } from "pdf-lib";
import Link from "next/link";
import {
  LockKeyhole, FileKey, Check, RefreshCw, CloudOff,
  ShieldCheck, ShieldQuestion, AlertCircle, Download,
  Eye, EyeOff, MoveRight, Upload,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// ✅ FIX 1: faqSchema defined — JSON-LD structured data for Google rich results
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is TaskGuru PDF password remover really free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — completely free with no sign-up, no limits, and no hidden fees. No account or credit card required.",
      },
    },
    {
      "@type": "Question",
      name: "Is my PDF data safe and private?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The entire process runs locally in your browser using pdf-lib. Your document and password never leave your device — nothing is uploaded or stored on any server.",
      },
    },
    {
      "@type": "Question",
      name: "What types of PDF passwords can this tool remove?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It removes user open-passwords (required to open the PDF) and owner restriction passwords (that block printing, copying, and editing). For owner-restricted PDFs that already open without a password, leave the password field blank and click Unlock.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use this PDF unlocker on mobile?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — it works on all modern mobile browsers on iOS and Android. Chrome, Safari, and Firefox are all supported. Desktop browsers perform better for very large files.",
      },
    },
    {
      "@type": "Question",
      name: "Is there a file size limit?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No strict server-side limit since everything runs in your browser. Files up to 100MB work well. Very large files may take longer depending on your device's processing speed.",
      },
    },
    {
      "@type": "Question",
      name: "What if the correct password still doesn't work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Some PDFs use advanced AES-256 encryption or DRM protection (common in some eBooks and enterprise software). These cannot be unlocked by browser-based tools. For those, you need the original software that created the PDF.",
      },
    },
  ],
};

export default function UnlockPdf() {
  const { toast } = useToast();

  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [unlockedUrl, setUnlockedUrl] = useState<string | null>(null);
  const [unlockedName, setUnlockedName] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      if (unlockedUrl) URL.revokeObjectURL(unlockedUrl);
    };
  }, [unlockedUrl]);

  // ✅ FIX 2: handleFile extracted — reused by input + drag & drop
  const handleFile = useCallback((f: File) => {
    if (f.type !== "application/pdf") {
      toast({ title: "Only PDF files supported", variant: "destructive" });
      return;
    }
    setFile(f);
    setError("");
    setPassword("");
    setUnlockedUrl(null);
    setIsOwner(false);
  }, [toast]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) handleFile(f);
  };

  // ✅ FIX 3: Drag & drop support added
  const onDragOver = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(true); };
  const onDragLeave = () => setIsDragging(false);
  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  };

  // ✅ FIX 4: Password no longer required — owner-restricted PDFs work with blank password
  const handleUnlock = async () => {
    if (!file || !isOwner) return;

    setLoading(true);
    setError("");

    try {
      const arrayBuffer = await file.arrayBuffer();
      let pdfDoc: Awaited<ReturnType<typeof PDFDocument.load>>;

      try {
        // Try with password first (handles user-password PDFs)
        pdfDoc = await PDFDocument.load(arrayBuffer, {
          password: password || undefined,
          ignoreEncryption: false,
        });
      } catch {
        // If no password given, try ignoring encryption (owner-restricted PDFs)
        try {
          pdfDoc = await PDFDocument.load(arrayBuffer, {
            ignoreEncryption: true,
          });
        } catch {
          throw new Error(
            password
              ? "Incorrect password. Please check and try again."
              : "This PDF requires a password to open. Please enter the password below."
          );
        }
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);

      if (unlockedUrl) URL.revokeObjectURL(unlockedUrl);
      setUnlockedUrl(url);
      setUnlockedName(`unlocked_${file.name}`);
      toast({ title: "✅ PDF Unlocked!", description: "Ready to download." });

    } catch (err: unknown) { // ✅ FIX 5: err: unknown (not any)
      const msg =
        err instanceof Error
          ? err.message
          : "Failed to unlock the PDF. The file may use advanced encryption not supported by browser tools.";
      setError(msg);
      toast({ title: "Failed", description: msg, variant: "destructive" });
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
    setUnlockedName("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <>
      {/* ✅ FIX 6: JSON-LD script tag for Google rich results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ✅ FIX 7: Removed min-h-screen + bg-zinc wrapper — uses site layout */}
      <div className="max-w-3xl mx-auto px-4 space-y-16">

        {/* Privacy badge */}
        <div className="flex justify-center">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 px-4 py-2 rounded-full">
            <ShieldCheck className="w-3.5 h-3.5" />
            100% Private — Your PDF never leaves your device
          </div>
        </div>

        {/* ── MAIN TOOL ── */}
        <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-xl border border-border p-8 md:p-10">

          {/* Upload state */}
          {!file && (
            <div
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl py-20 text-center cursor-pointer transition-all ${
                isDragging
                  ? "border-emerald-400 bg-emerald-50 dark:bg-emerald-950/20 scale-[1.01]"
                  : "border-zinc-300 dark:border-zinc-700 hover:border-emerald-400"
              }`}
            >
              <LockKeyhole className="w-16 h-16 mx-auto text-emerald-500 mb-6" />
              <p className="text-2xl font-semibold text-foreground">Drop PDF Here</p>
              <p className="text-muted-foreground mt-2 text-sm">or click to browse · Max 100MB</p>
              <input
                ref={fileInputRef}
                id="file-input"
                type="file"
                accept=".pdf"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
          )}

          {/* Process state */}
          {file && !unlockedUrl && (
            <div className="space-y-6">

              {/* File info */}
              <div className="bg-muted/50 rounded-2xl p-4 flex items-center gap-4">
                <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900 rounded-xl flex items-center justify-center flex-shrink-0">
                  <FileKey className="w-5 h-5 text-emerald-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold truncate text-foreground">{file.name}</p>
                  <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
                <button
                  onClick={handleReset}
                  className="text-sm font-semibold text-muted-foreground hover:text-red-500 transition-colors"
                >
                  Change
                </button>
              </div>

              {/* ✅ FIX 8: Password optional — clear instructions */}
              <div className="space-y-2">
                <label className="text-sm font-black uppercase tracking-wider text-foreground">
                  PDF Password
                  <span className="ml-2 font-normal text-muted-foreground normal-case">(leave blank for restriction-only PDFs)</span>
                </label>
                <div className="relative">
                  <input
                    type={showPass ? "text" : "password"}
                    placeholder="Enter password (if PDF requires one to open)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleUnlock()}
                    className="w-full bg-white dark:bg-zinc-800 border-2 border-zinc-200 dark:border-zinc-700 rounded-2xl px-5 py-4 text-lg tracking-widest focus:border-emerald-500 outline-none transition-colors text-foreground"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass((p) => !p)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-xs text-muted-foreground">
                  💡 PDF opens fine but can&apos;t print/copy? Leave blank and click Unlock.
                </p>
              </div>

              {/* Local processing info + legal checkbox */}
              <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-2xl p-5 space-y-4">
                <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-semibold text-sm">
                  <CloudOff className="w-4 h-4" /> 100% LOCAL — File never leaves your device
                </div>
                <label className="flex gap-3 cursor-pointer text-sm text-foreground">
                  <input
                    type="checkbox"
                    checked={isOwner}
                    onChange={(e) => setIsOwner(e.target.checked)}
                    className="mt-0.5 accent-emerald-600 flex-shrink-0"
                  />
                  I confirm I have the legal right to unlock this PDF document.
                </label>
              </div>

              {/* Error */}
              {error && (
                <div className="flex gap-3 items-start p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 rounded-2xl">
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
                </div>
              )}

              {/* Unlock button */}
              <button
                onClick={handleUnlock}
                disabled={!isOwner || loading}
                className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-black py-5 rounded-2xl text-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
              >
                {loading
                  ? <><RefreshCw className="animate-spin w-5 h-5" /> Removing Password...</>
                  : <><LockKeyhole className="w-5 h-5" /> Unlock PDF Now</>
                }
              </button>
            </div>
          )}

          {/* Success state */}
          {unlockedUrl && (
            <div className="text-center py-10 space-y-6">
              <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center mx-auto">
                <Check className="w-10 h-10 text-emerald-600" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-foreground">PDF Successfully Unlocked!</h3>
                <p className="text-muted-foreground text-sm mt-1">Password removed — no restrictions, no watermarks.</p>
              </div>
              <div className="flex gap-3 justify-center flex-wrap">
                <a
                  href={unlockedUrl}
                  download={unlockedName}
                  className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-black px-8 py-3.5 rounded-2xl transition-colors shadow-lg shadow-emerald-500/20"
                >
                  <Download className="w-5 h-5" /> Download Unlocked PDF
                </a>
                <button
                  onClick={handleReset}
                  className="border border-border hover:bg-muted text-foreground font-bold px-6 py-3.5 rounded-2xl transition-colors"
                >
                  Unlock Another
                </button>
              </div>
              <div className="flex items-center justify-center gap-4 pt-2 flex-wrap">
                {[
                  { label: "Convert to Word →", href: "/tools/pdf-to-word" },
                  { label: "Merge PDFs →", href: "/tools/merge-pdf" },
                  { label: "Redact PDF →", href: "/tools/pdf-redactor" },
                ].map((l) => (
                  <Link key={l.href} href={l.href} className="text-sm font-semibold text-primary hover:underline">
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── WHAT IS THIS TOOL ── */}
        {/* ✅ FIX 9: Removed duplicate h1 — kept as h2 */}
        <section className="space-y-4">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">What is TaskGuru Unlock PDF?</h2>
          <p className="text-muted-foreground leading-relaxed">
            TaskGuru Unlock PDF is a <strong>100% private, browser-only PDF password remover</strong>.
            It lets you securely remove password protection from your PDFs without uploading any files to the cloud.
            Perfect for sensitive financial statements, legal contracts, medical records, and confidential business documents.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Unlike other online tools, your data never leaves your device — making it one of the safest ways to unlock PDF files privately.
          </p>
        </section>

        {/* ── HOW TO USE ── */}
        <section className="space-y-5">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">How to Remove PDF Password</h2>
          <ol className="space-y-4">
            {[
              "Upload your password-protected PDF (drag & drop or click to browse).",
              "Enter the password if the PDF requires one to open — leave blank if it only has copy/print restrictions.",
              "Confirm you have legal rights to unlock the document.",
              'Click "Unlock PDF Now" — everything processes locally in your browser.',
              "Download your fully unlocked PDF instantly. No watermark, no compression.",
            ].map((step, i) => (
              <li key={i} className="flex gap-4">
                <span className="font-black text-emerald-600 text-lg flex-shrink-0">{i + 1}.</span>
                <p className="text-muted-foreground">{step}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* ── WHY PROFESSIONALS TRUST ── */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight text-foreground text-center">Why Professionals Trust TaskGuru</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { color: "text-emerald-600", title: "Financial Documents", desc: "Unlock bank statements, tax returns, and payroll records safely without any file upload." },
              { color: "text-blue-600", title: "Legal & Compliance", desc: "Remove passwords from contracts and case files while staying GDPR/HIPAA compliant — nothing leaves your device." },
              { color: "text-purple-600", title: "Government PDFs", desc: "Unlock IT returns, Aadhaar-linked PDFs, and government notices locked with common DOB or PAN-based passwords." },
              { color: "text-orange-600", title: "Study & Research", desc: "Unlock university course materials locked by portals so you can annotate, highlight, and print freely offline." },
            ].map((item) => (
              <div key={item.title} className="bg-card border border-border p-6 rounded-2xl space-y-2">
                <h4 className={`font-bold text-lg ${item.color}`}>{item.title}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ✅ FIX 10: FAQ — <details> accordion from faqSchema (no duplicate) */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <ShieldQuestion className="w-7 h-7 text-emerald-500" />
            <h2 className="text-3xl font-bold tracking-tight text-foreground">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-3">
            {faqSchema.mainEntity.map((faq, i) => (
              <details
                key={i}
                className="bg-card border border-border rounded-2xl p-5 cursor-pointer group"
              >
                <summary className="font-semibold text-foreground list-none flex justify-between items-center text-sm">
                  {faq.name}
                  <span className="transition-transform group-open:rotate-180 text-muted-foreground flex-shrink-0 ml-2">▼</span>
                </summary>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{faq.acceptedAnswer.text}</p>
              </details>
            ))}
          </div>
        </section>

        {/* ── RELATED TOOLS ── */}
       <section className="grid md:grid-cols-2 gap-5 border-t border-border pt-12">
          {[
            { href: "/tools/split-pdf", title: "Split PDF", desc: "Extract individual pages from your now-unlocked PDF document.", icon: "✂️" },
            { href: "/tools/merge-pdf", title: "Merge PDF", desc: "Combine multiple PDFs into one file after unlocking.", icon: "📎" },
            { href: "/tools/pdf-to-word", title: "PDF to Word", desc: "Convert your unlocked PDF to an editable Word document.", icon: "📝" },
            { href: "/tools/pdf-redactor", title: "PDF Redactor", desc: "Black out sensitive info before sharing your unlocked PDF.", icon: "🔒" },
          ].map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="flex items-start gap-4 p-5 bg-card border border-border rounded-2xl hover:shadow-lg hover:border-primary/30 transition-all group"
            >
              <span className="text-2xl">{tool.icon}</span>
              <div>
                <h4 className="font-bold text-foreground group-hover:text-primary transition-colors">{tool.title}</h4>
                <p className="text-muted-foreground text-sm mt-0.5">{tool.desc}</p>
              </div>
              <MoveRight className="w-4 h-4 text-muted-foreground group-hover:text-primary ml-auto flex-shrink-0 mt-1 transition-colors" />
            </Link>
          ))}
        </section>

      </div>
    </>
  );
}
