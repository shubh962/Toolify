"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import Link from "next/link";
import {
  PenLine, Lock, Download, ShieldCheck, Check, Eraser,
  FileSignature, CloudOff, Type, ShieldAlert, Globe,
  RefreshCw, AlertCircle, MoveRight,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// ✅ FIX 1: faqSchema — JSON-LD for Google rich results
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is an e-signature created with this tool legally valid?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. In most countries — including the USA (ESIGN Act), UK (Electronic Communications Act), EU (eIDAS Regulation), and India (IT Act 2000) — electronic signatures are legally binding for most commercial and personal documents. This includes contracts, invoices, NDAs, rental agreements, and freelance agreements.",
      },
    },
    {
      "@type": "Question",
      name: "Does my PDF get uploaded to a server when I sign it?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. TaskGuru's e-sign tool uses pdf-lib entirely in your browser. Your PDF and your signature are processed in RAM on your device. Nothing is sent to any server, stored, or logged. This makes it 100% GDPR and HIPAA compliant by design.",
      },
    },
    {
      "@type": "Question",
      name: "What types of documents can I sign with this tool?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can sign any PDF — freelance contracts, business agreements, rental agreements, job offer letters, school permission slips, invoices, NDAs, and more. The signature is embedded directly into the PDF as an image layer.",
      },
    },
    {
      "@type": "Question",
      name: "Can I sign PDFs on my phone?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — the signature canvas supports touch drawing on iOS and Android. Open the tool in Chrome or Safari on your phone, draw your signature with your finger or stylus, and download the signed PDF directly to your device.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between Draw and Stamp mode?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Draw mode lets you create a handwritten signature using your mouse or touchscreen — this looks like a real ink signature. Stamp mode lets you type text (like your name or 'Approved') in bold font directly onto the PDF — useful for quick approvals and stamps.",
      },
    },
    {
      "@type": "Question",
      name: "Is this e-sign tool free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — completely free. No signup, no subscription, no credit card, no watermark on the signed PDF. TaskGuru's e-sign tool is part of a suite of free browser-based PDF tools.",
      },
    },
  ],
};

// ✅ FIX 2: Proper event types — no more 'any'
type DrawEvent =
  | React.MouseEvent<HTMLCanvasElement>
  | React.TouchEvent<HTMLCanvasElement>;

function getXY(e: DrawEvent, canvas: HTMLCanvasElement): { x: number; y: number } {
  const rect = canvas.getBoundingClientRect();
  if ("touches" in e && e.touches[0]) {
    return {
      x: e.touches[0].clientX - rect.left,
      y: e.touches[0].clientY - rect.top,
    };
  }
  if ("nativeEvent" in e) {
    const me = e as React.MouseEvent<HTMLCanvasElement>;
    return { x: me.nativeEvent.offsetX, y: me.nativeEvent.offsetY };
  }
  return { x: 0, y: 0 };
}

export default function ESignPdf() {
  const { toast } = useToast();

  const [file, setFile] = useState<File | null>(null);
  const [signature, setSignature] = useState<string | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [signedUrl, setSignedUrl] = useState<string | null>(null);
  const [signedName, setSignedName] = useState("");
  const [mode, setMode] = useState<"draw" | "stamp">("draw");
  const [stampText, setStampText] = useState("");

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ✅ Initialize canvas
  useEffect(() => {
    if (canvasRef.current && mode === "draw" && file && !signedUrl) {
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
  }, [mode, file, signedUrl]);

  // Cleanup blob URL
  useEffect(() => {
    return () => { if (signedUrl) URL.revokeObjectURL(signedUrl); };
  }, [signedUrl]);

  // ✅ FIX 3: File handler with drag & drop
  const handleFile = useCallback((f: File) => {
    if (f.type !== "application/pdf") {
      toast({ title: "Only PDF files are supported", variant: "destructive" });
      return;
    }
    setFile(f);
    setSignedUrl(null);
    setSignature(null);
    setIsOwner(false);
  }, [toast]);

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  };

  // ✅ FIX 4: Typed drawing handlers
  const startDrawing = (e: DrawEvent) => {
    e.preventDefault();
    if (!canvasRef.current) return;
    const { x, y } = getXY(e, canvasRef.current);
    contextRef.current?.beginPath();
    contextRef.current?.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e: DrawEvent) => {
    if (!isDrawing || !canvasRef.current) return;
    const { x, y } = getXY(e, canvasRef.current);
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
    if (canvas && contextRef.current) {
      contextRef.current.clearRect(0, 0, canvas.width, canvas.height);
    }
    setSignature(null);
  };

  const canSign = isOwner && (mode === "draw" ? !!signature : !!stampText.trim());

  const handleSignPdf = async () => {
    if (!file || !canSign) return;
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
        page.drawText(stampText.trim(), {
          x: 70, y: 70, size: 20, font, color: rgb(0.06, 0.09, 0.16),
        });
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      setSignedUrl(URL.createObjectURL(blob));
      setSignedName(`signed_${file.name}`);
      toast({ title: "✅ PDF Signed!", description: "Ready to download." });
    } catch (err: unknown) { // ✅ FIX 5: err: unknown
      const msg = err instanceof Error ? err.message : "Failed to sign PDF locally.";
      toast({ title: "Error", description: msg, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    if (signedUrl) URL.revokeObjectURL(signedUrl);
    setFile(null);
    setSignedUrl(null);
    setSignedName("");
    setSignature(null);
    setIsOwner(false);
    setStampText("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <>
      {/* ✅ FIX 6: JSON-LD script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ✅ FIX 7: Removed min-h-screen + bg wrapper */}
      <div className="max-w-4xl mx-auto px-4 space-y-16">

        {/* Privacy badge */}
        <div className="flex justify-center">
          <div className="flex items-center gap-2 text-xs font-bold text-blue-600 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 px-4 py-2 rounded-full">
            <ShieldCheck className="w-3.5 h-3.5" />
            100% Private — Your PDF is never uploaded to any server
          </div>
        </div>

        {/* ── MAIN TOOL ── */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-border p-8 md:p-10">

          {/* Upload */}
          {!file && (
            <div
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={onDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-3xl py-20 flex flex-col items-center gap-5 cursor-pointer transition-all ${
                isDragging
                  ? "border-blue-400 bg-blue-50 dark:bg-blue-950/20 scale-[1.01]"
                  : "border-slate-200 dark:border-slate-700 hover:border-blue-400"
              }`}
            >
              <div className="w-20 h-20 bg-blue-50 dark:bg-blue-900/30 rounded-3xl flex items-center justify-center">
                <FileSignature className="w-10 h-10 text-blue-600" />
              </div>
              <div className="text-center">
                <p className="text-xl font-black text-foreground uppercase tracking-tight">Upload PDF to Sign</p>
                <p className="text-muted-foreground text-sm mt-1">Drag & drop or click to browse</p>
              </div>
              <input
                ref={fileInputRef}
                id="pdf-in"
                type="file"
                accept=".pdf"
                className="hidden"
                onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
              />
            </div>
          )}

          {/* Sign flow */}
          {file && !signedUrl && (
            <div className="space-y-6">

              {/* File info */}
              <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-2xl">
                <ShieldCheck className="text-emerald-500 flex-shrink-0" />
                <span className="font-bold text-foreground truncate flex-1">{file.name}</span>
                <button onClick={handleReset} className="text-xs font-bold text-red-400 hover:text-red-600 transition-colors">Reset</button>
              </div>

              {/* Mode toggle */}
              <div className="flex p-1 bg-muted rounded-2xl">
                {(["draw", "stamp"] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => setMode(m)}
                    className={`flex-1 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all text-sm ${
                      mode === m
                        ? "bg-white dark:bg-slate-800 shadow-sm text-blue-600"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {m === "draw" ? <><PenLine className="w-4 h-4" /> Draw Signature</> : <><Type className="w-4 h-4" /> Type Stamp</>}
                  </button>
                ))}
              </div>

              {/* Draw canvas */}
              {mode === "draw" && (
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Signature Pad</label>
                    <button onClick={clearCanvas} className="text-red-400 hover:text-red-600 text-xs font-bold flex items-center gap-1 transition-colors">
                      <Eraser className="w-3 h-3" /> Clear
                    </button>
                  </div>
                  <canvas
                    ref={canvasRef}
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={endDrawing}
                    onMouseLeave={endDrawing}
                    onTouchStart={startDrawing}
                    onTouchMove={draw}
                    onTouchEnd={endDrawing}
                    className="w-full h-[120px] bg-white dark:bg-slate-950 border-2 border-slate-100 dark:border-slate-800 rounded-2xl cursor-crosshair touch-none"
                  />
                  {!signature && (
                    <p className="text-xs text-center text-muted-foreground">Draw your signature above ↑</p>
                  )}
                </div>
              )}

              {/* Stamp input */}
              {mode === "stamp" && (
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Stamp Text</label>
                  <input
                    type="text"
                    placeholder="Your Name / Approved / Signed"
                    value={stampText}
                    onChange={(e) => setStampText(e.target.value)}
                    className="w-full p-5 bg-muted/50 rounded-2xl border-2 border-transparent focus:border-blue-400 outline-none text-2xl font-bold text-center text-foreground transition-colors"
                  />
                </div>
              )}

              {/* Legal checkbox */}
              <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900 rounded-2xl p-5">
                <label htmlFor="legal" className="flex gap-3 cursor-pointer text-sm font-semibold text-foreground">
                  <input
                    id="legal"
                    type="checkbox"
                    checked={isOwner}
                    onChange={(e) => setIsOwner(e.target.checked)}
                    className="mt-0.5 w-4 h-4 accent-blue-600 flex-shrink-0"
                  />
                  I am the authorized signer for this document and have the legal right to sign it.
                </label>
              </div>

              {/* Sign button */}
              <button
                onClick={handleSignPdf}
                disabled={loading || !canSign}
                className="w-full py-5 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-2xl font-black text-lg transition-all flex items-center justify-center gap-3 shadow-lg shadow-blue-500/20"
              >
                {loading
                  ? <><RefreshCw className="animate-spin w-5 h-5" /> Signing PDF...</>
                  : <><PenLine className="w-5 h-5" /> Sign & Download</>
                }
              </button>
            </div>
          )}

          {/* Success */}
          {signedUrl && (
            <div className="text-center space-y-6 py-6">
              <div className="w-20 h-20 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center mx-auto">
                <Check className="w-10 h-10 text-blue-600" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-foreground">PDF Signed Successfully!</h3>
                <p className="text-muted-foreground text-sm mt-1">Signature embedded — no watermark, no upload.</p>
              </div>
              <div className="flex gap-3 justify-center flex-wrap">
                <a
                  href={signedUrl}
                  download={signedName}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-black px-8 py-3.5 rounded-2xl transition-colors shadow-lg shadow-blue-500/20"
                >
                  <Download className="w-5 h-5" /> Download Signed PDF
                </a>
                <button
                  onClick={handleReset}
                  className="border border-border hover:bg-muted text-foreground font-bold px-6 py-3.5 rounded-2xl transition-colors"
                >
                  Sign Another
                </button>
              </div>
              <div className="flex items-center justify-center gap-4 flex-wrap pt-2">
                {[
                  { label: "Compress PDF →", href: "/tools/pdf-compressor" },
                  { label: "Merge PDFs →", href: "/tools/merge-pdf" },
                  { label: "Unlock PDF →", href: "/tools/unlock-pdf-no-upload" },
                ].map((l) => (
                  <Link key={l.href} href={l.href} className="text-sm font-semibold text-primary hover:underline">{l.label}</Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── WHY TASKGURU ── */}
        {/* ✅ FIX 8: Removed duplicate h1 — h2 only */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-foreground">Why Professionals Choose TaskGuru E-Sign</h2>
          <p className="text-muted-foreground leading-relaxed">
            TaskGuru provides an enterprise-grade electronic signature solution that operates entirely within your browser.
            Unlike conventional cloud-based tools, our zero-upload technology ensures that your sensitive legal contracts, NDAs,
            and financial invoices never leave your local machine. Fully compliant with GDPR, HIPAA, and eIDAS regulations.
          </p>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              {
                icon: <Lock className="w-5 h-5 text-blue-600" />,
                title: "Privacy First Architecture",
                desc: "pdf-lib processes your documents in RAM. No data is transmitted to external servers — making our tool GDPR and HIPAA compliant by design.",
              },
              {
                icon: <Globe className="w-5 h-5 text-emerald-600" />,
                title: "Legally Binding Globally",
                desc: "Valid under USA ESIGN Act, UK Electronic Communications Act, EU eIDAS, and India IT Act 2000. Sign contracts, invoices, and agreements with confidence.",
              },
              {
                icon: <CloudOff className="w-5 h-5 text-orange-500" />,
                title: "Zero Upload Policy",
                desc: "Every byte stays on your device. Bank statements, legal contracts, medical forms — sign them without any data leaving your browser.",
              },
              {
                icon: <ShieldCheck className="w-5 h-5 text-purple-600" />,
                title: "No Watermark Ever",
                desc: "Unlike DocuSign and Adobe Sign free tiers, TaskGuru never adds watermarks or branding to your signed PDFs. Clean, professional output every time.",
              },
            ].map((item) => (
              <div key={item.title} className="p-5 bg-card border border-border rounded-2xl space-y-2">
                <div className="flex items-center gap-2">{item.icon}<h4 className="font-black text-foreground text-sm">{item.title}</h4></div>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Workflow CTA */}
        <section className="bg-slate-900 dark:bg-slate-800 rounded-3xl p-10 text-white relative overflow-hidden">
          <ShieldAlert className="absolute -right-8 -bottom-8 w-52 h-52 text-white/5" />
          <h3 className="text-2xl font-black mb-3">Complete Your PDF Workflow Privately</h3>
          <p className="text-slate-400 mb-6 max-w-xl text-sm leading-relaxed">Once signed, use our other browser-based PDF tools to compress, merge, or unlock documents — all without uploading anything.</p>
          <div className="flex flex-wrap gap-3">
            {[
              { label: "Compress PDF", href: "/tools/pdf-compressor" },
              { label: "Unlock PDF", href: "/tools/unlock-pdf-no-upload" },
              { label: "Merge PDFs", href: "/tools/merge-pdf" },
              { label: "PDF to Word", href: "/tools/pdf-to-word" },
            ].map((l) => (
              <Link key={l.href} href={l.href} className="flex items-center gap-1.5 px-5 py-2.5 bg-white/10 hover:bg-white/20 rounded-xl text-sm font-bold transition-all border border-white/10">
                {l.label} <MoveRight className="w-3.5 h-3.5" />
              </Link>
            ))}
          </div>
        </section>

        {/* ✅ FIX 9: FAQ section added — <details> accordion from faqSchema */}
        <section className="space-y-4">
          <h2 className="text-2xl font-black text-foreground">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqSchema.mainEntity.map((faq, i) => (
              <details key={i} className="bg-card border border-border rounded-2xl p-5 cursor-pointer group">
                <summary className="font-bold text-foreground list-none flex justify-between items-center text-sm">
                  {faq.name}
                  <span className="transition-transform group-open:rotate-180 text-muted-foreground flex-shrink-0 ml-2">▼</span>
                </summary>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{faq.acceptedAnswer.text}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Related tools */}
        <section className="grid md:grid-cols-2 gap-4 border-t border-border pt-10">
          {[
            { href: "/tools/unlock-pdf-no-upload", icon: "🔓", title: "PDF Password Remover", desc: "Remove passwords before signing — unlock and sign in one workflow." },
            { href: "/tools/pdf-redactor", icon: "🔒", title: "PDF Redactor", desc: "Black out sensitive data before sharing your signed document." },
            { href: "/tools/pdf-compressor", icon: "📦", title: "PDF Compressor", desc: "Reduce file size after signing for easy email attachment." },
            { href: "/tools/merge-pdf", icon: "📎", title: "Merge PDFs", desc: "Combine multiple signed documents into one final package." },
          ].map((t) => (
            <Link key={t.href} href={t.href} className="flex items-start gap-3 p-5 bg-card border border-border rounded-2xl hover:shadow-md hover:border-primary/30 transition-all group">
              <span className="text-2xl">{t.icon}</span>
              <div>
                <h4 className="font-bold text-foreground text-sm group-hover:text-primary transition-colors">{t.title}</h4>
                <p className="text-xs text-muted-foreground mt-0.5">{t.desc}</p>
              </div>
            </Link>
          ))}
        </section>

      </div>
    </>
  );
}
