"use client";

import { useState } from "react";
import { jsPDF } from "jspdf";
import Link from "next/link";
import {
  Youtube, FileText, Loader2, AlertCircle,
  Copy, RotateCcw, CheckCircle, HelpCircle, ArrowRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

// ✅ FAQ Schema — outside component
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I convert a YouTube video to PDF notes for free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Paste the YouTube video URL into TaskGuru's free YouTube to PDF converter. Click Generate Notes — the tool automatically extracts the video transcript and converts it into a downloadable PDF. Works on any device without signup or payment.",
      },
    },
    {
      "@type": "Question",
      name: "Does the YouTube video need subtitles or captions enabled?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The tool extracts the closed captions (CC) or auto-generated subtitles from the YouTube video. Videos with captions disabled cannot be automatically transcribed. If automatic extraction fails, use the manual fallback option to paste the transcript yourself.",
      },
    },
    {
      "@type": "Question",
      name: "Can I convert YouTube lecture videos to study notes?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — this is the most popular use case. Paste the URL of any YouTube lecture, tutorial, or educational video. The transcript is extracted and formatted as a clean PDF you can use for revision, note-taking, or offline study.",
      },
    },
    {
      "@type": "Question",
      name: "Why is the automatic extraction failing for some videos?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "YouTube periodically updates its systems to limit automated access to subtitles. If automatic extraction fails, use the manual fallback: click the manual link provided in the error message to get the transcript from a third-party site, then paste it into the text box and download your PDF.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use this for YouTube Shorts?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — YouTube Shorts URLs (youtube.com/shorts/) are supported. However, since Shorts are typically 60 seconds or less, the transcript will be brief.",
      },
    },
    {
      "@type": "Question",
      name: "Is this tool free and does it require an account?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Completely free. No account, no signup, no payment. Paste the URL and download your PDF — that is the entire process.",
      },
    },
  ],
};

// ✅ Extract Video ID
function getVideoId(url: string) {
  const regExp = /(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([^&#?/]+)/;
  const match = url.match(regExp);
  return match ? match[1] : null;
}

export default function YoutubeToPdf() {
  const { toast } = useToast();
  const [url, setUrl] = useState("");
  const [text, setText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const [isDone, setIsDone] = useState(false);

  // ✅ Generate Notes
  const handleGenerate = async () => {
    if (!url.includes("youtube.com") && !url.includes("youtu.be")) {
      setError("Please enter a valid YouTube URL.");
      return;
    }

    setIsProcessing(true);
    setError(null);
    setText("");
    setProgress(0);
    setIsDone(false);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 85) { clearInterval(progressInterval); return 85; }
        return prev + 12;
      });
    }, 400);

    try {
      const res = await fetch("/api/youtube", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      clearInterval(progressInterval);

      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Server timeout. Please use the Manual option below.");
      }

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setProgress(100);
      setText(data.text);
      setIsDone(true);
      toast({ title: "✅ Transcript Ready!", description: "Copy or download as PDF." });

    } catch (err: any) {
      clearInterval(progressInterval);
      setProgress(0);
      setError(err.message || "Failed to fetch transcript. Try the manual option below.");
    } finally {
      setTimeout(() => { setIsProcessing(false); setProgress(0); }, 500);
    }
  };

  const handleReset = () => {
    setUrl(""); setText(""); setError(null);
    setProgress(0); setIsDone(false); setCopied(false);
  };

  const handleCopy = () => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast({ title: "Copied!", description: "Text copied to clipboard." });
    setTimeout(() => setCopied(false), 2000);
  };

  // ✅ PDF with title + footer
  const generatePDF = () => {
    const doc = new jsPDF();
    const margin = 15;
    const width = doc.internal.pageSize.getWidth() - margin * 2;

    // Title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("YouTube Notes", margin, 18);

    // Source URL
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(100);
    doc.text(`Source: ${url}`, margin, 26);
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, margin, 31);
    doc.setTextColor(0);

    // Content
    doc.setFont("times", "normal");
    doc.setFontSize(11);
    const lines = doc.splitTextToSize(text, width);
    let y = 42;

    lines.forEach((line: string) => {
      if (y > 278) {
        doc.addPage();
        y = 18;
        // Footer
        doc.setFontSize(8);
        doc.setTextColor(150);
        doc.text("Generated by TaskGuru.online — Free YouTube to PDF Converter", margin, 290);
        doc.setTextColor(0);
        doc.setFontSize(11);
      }
      doc.text(line, margin, y);
      y += 6.5;
    });

    // Footer on last page
    const totalPages = (doc as any).internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(150);
      doc.text(`Generated by TaskGuru.online  |  Page ${i} of ${totalPages}`, margin, 290);
    }

    doc.save(`YouTube-Notes-${Date.now()}.pdf`);
    toast({ title: "Downloaded!", description: "PDF saved to your device." });
  };

  const videoId = getVideoId(url);
  const manualLink = videoId ? `https://youtubetotranscript.com/` : "#";

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="max-w-3xl mx-auto my-10 px-4 sm:px-6">

        {/* ── TOOL CARD ── */}
        <Card className="rounded-[2rem] shadow-2xl border-2 border-primary/10 bg-white dark:bg-gray-900">
          <CardContent className="p-6 sm:p-10 space-y-5">

            {/* URL Input */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                YouTube Video URL
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Youtube className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-red-500" />
                  <input
                    type="url"
                    placeholder="https://www.youtube.com/watch?v=..."
                    value={url}
                    onChange={(e) => { setUrl(e.target.value); setError(null); }}
                    onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-primary transition-colors bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3 flex-wrap">
              <Button
                size="lg"
                onClick={handleGenerate}
                disabled={isProcessing || !url.trim()}
                className="rounded-xl font-bold shadow-lg shadow-red-500/20 bg-red-600 hover:bg-red-700 text-white h-11"
              >
                {isProcessing
                  ? <><Loader2 className="animate-spin mr-2 h-4 w-4" /> Extracting...</>
                  : <><FileText className="mr-2 h-4 w-4" /> Generate Notes</>
                }
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={handleReset}
                disabled={isProcessing}
                className="rounded-xl h-11"
              >
                <RotateCcw className="mr-2 h-4 w-4" /> Reset
              </Button>
            </div>

            {/* Progress bar */}
            {isProcessing && (
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-primary">
                  <span>Fetching transcript...</span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full bg-primary/10 rounded-full h-2.5 overflow-hidden">
                  <div
                    className="bg-primary h-full rounded-full transition-all duration-300 ease-out"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Error + Manual fallback */}
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 p-5 rounded-2xl border border-red-200 dark:border-red-800 space-y-3">
                <div className="flex items-center gap-2 text-red-600 dark:text-red-400 font-bold text-sm">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" /> {error}
                </div>
                <div className="space-y-1 text-sm text-red-600 dark:text-red-400">
                  <p className="font-bold">👉 Use Manual Option:</p>
                  <ol className="list-decimal pl-5 space-y-1 text-xs">
                    <li>
                      <a href={manualLink} target="_blank" rel="noreferrer" className="underline font-bold hover:text-red-700">
                        Click here to get transcript manually
                      </a>
                    </li>
                    <li>Copy the transcript from that site</li>
                    <li>Paste it in the text box below and click Download PDF</li>
                  </ol>
                </div>
              </div>
            )}

            {/* Success */}
            {isDone && (
              <div className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-2xl border border-green-200 dark:border-green-800">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                <div>
                  <p className="text-sm font-bold text-green-700 dark:text-green-300">Transcript extracted!</p>
                  <p className="text-xs text-green-600">Edit below if needed, then download as PDF.</p>
                </div>
              </div>
            )}

            {/* Textarea */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Transcript / Notes {text && `— ${text.trim().split(/\s+/).length} words`}
              </label>
              <textarea
                placeholder="Transcript will appear here automatically — or paste it manually from the link above..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full h-64 p-4 border-2 border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:border-primary transition-colors bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white resize-none text-sm leading-relaxed"
              />
            </div>

            {/* Download buttons */}
            {text && (
              <div className="flex gap-3 flex-wrap">
                <Button
                  size="lg"
                  variant="outline"
                  onClick={handleCopy}
                  className="rounded-xl h-11"
                >
                  {copied
                    ? <><CheckCircle className="mr-2 h-4 w-4 text-green-500" /> Copied!</>
                    : <><Copy className="mr-2 h-4 w-4" /> Copy Text</>
                  }
                </Button>
                <Button
                  size="lg"
                  onClick={generatePDF}
                  className="rounded-xl h-11 font-bold shadow-lg"
                >
                  <FileText className="mr-2 h-4 w-4" /> Download PDF
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Pro Tip */}
        <div className="mt-5 bg-amber-50 dark:bg-amber-900/10 p-4 rounded-2xl border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300 text-sm font-medium">
          💡 <strong>Pro Tip:</strong> YouTube occasionally blocks automatic subtitle access. If extraction fails, the manual fallback works 100% of the time. Just copy the transcript and paste it in the box above — then download your PDF instantly.
        </div>

        {/* ── SEO ARTICLE ── */}
        <article className="mt-16 space-y-12 text-slate-600 dark:text-slate-400 leading-relaxed">

          <section className="space-y-5">
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white">
              Convert YouTube Videos to PDF Notes — Free & Instant
            </h2>
            <p className="text-base leading-relaxed">
              Whether you are a student trying to capture a lecture, a researcher summarizing
              a long documentary, or a professional taking notes from a webinar —
              <strong> converting YouTube videos to PDF notes</strong> saves hours of manual
              typing. Paste any YouTube URL and get a clean, downloadable PDF in seconds.
              No account. No paywall. No software.
            </p>
            <div className="grid md:grid-cols-3 gap-5">
              {[
                { emoji: "🎓", title: "Students", desc: "Convert university lecture recordings, Khan Academy videos, and tutorial channels into revision notes you can highlight and annotate." },
                { emoji: "💼", title: "Professionals", desc: "Turn webinars, conference talks, and training videos into searchable PDFs for your team. No more replaying videos to find one quote." },
                { emoji: "🔬", title: "Researchers", desc: "Extract spoken content from interview recordings, documentary footage, and expert talks. Build a reference library from YouTube content." },
              ].map((item) => (
                <div key={item.title} className="p-5 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl space-y-2">
                  <span className="text-2xl">{item.emoji}</span>
                  <h3 className="font-black text-slate-900 dark:text-white text-sm">{item.title}</h3>
                  <p className="text-xs leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-5">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">
              How to Convert YouTube to PDF — Step by Step
            </h2>
            <div className="space-y-3">
              {[
                { n: "1", title: "Copy the YouTube video URL", desc: "Find the video you want to convert. Copy the URL from your browser address bar or from the YouTube Share button." },
                { n: "2", title: "Paste URL and click Generate Notes", desc: 'Paste the URL into the input field above. Click "Generate Notes." The tool fetches the video\'s closed captions or auto-generated subtitles automatically.' },
                { n: "3", title: "Review and edit the transcript", desc: "The extracted text appears in the box below. You can edit it — remove filler words, add paragraph breaks, or clean up any formatting." },
                { n: "4", title: "Download as PDF", desc: 'Click "Download PDF." A professionally formatted PDF with the video URL, date, and page numbers downloads instantly to your device.' },
              ].map((step) => (
                <div key={step.n} className="flex gap-4 p-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl">
                  <div className="h-8 w-8 rounded-full bg-red-600 text-white flex items-center justify-center font-black flex-shrink-0 text-sm">{step.n}</div>
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white text-sm mb-1">{step.title}</p>
                    <p className="text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">
              What Kind of YouTube Videos Work Best?
            </h2>
            <div className="grid md:grid-cols-2 gap-3">
              {[
                { good: true, label: "✅ University lectures with CC enabled" },
                { good: true, label: "✅ TED Talks and conference presentations" },
                { good: true, label: "✅ How-to tutorials and explainer videos" },
                { good: true, label: "✅ Podcast recordings uploaded to YouTube" },
                { good: true, label: "✅ News reports and interviews" },
                { good: true, label: "✅ Language learning and educational channels" },
                { good: false, label: "⚠️ Music videos (lyrics, not speech)" },
                { good: false, label: "❌ Videos with captions disabled" },
              ].map((item) => (
                <div key={item.label} className={`px-4 py-3 rounded-xl text-sm font-medium border ${
                  item.good
                    ? "bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-800 text-green-700 dark:text-green-400"
                    : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500"
                }`}>
                  {item.label}
                </div>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section className="space-y-5">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <HelpCircle className="w-6 h-6 text-red-500" /> Frequently Asked Questions
            </h2>
            <div className="space-y-3">
              {faqSchema.mainEntity.map((faq, i) => (
                <details key={i} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 cursor-pointer group">
                  <summary className="font-bold text-slate-900 dark:text-white list-none flex justify-between items-center text-sm">
                    {faq.name}
                    <span className="transition-transform group-open:rotate-180 text-slate-400 flex-shrink-0 ml-2">▼</span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed">{faq.acceptedAnswer.text}</p>
                </details>
              ))}
            </div>
          </section>

          {/* Internal links */}
          <section className="border-t border-slate-100 dark:border-slate-800 pt-10 space-y-5">
            <h3 className="text-xl font-black text-slate-900 dark:text-white">
              Useful Tools After Generating Your Notes
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { label: "AI Text Paraphraser", sub: "Rewrite and simplify your notes", href: "/tools/text-paraphraser", color: "hover:border-green-400" },
                { label: "Word Counter", sub: "Check word count and reading time", href: "/tools/word-counter", color: "hover:border-blue-400" },
                { label: "Merge PDF", sub: "Combine notes from multiple videos", href: "/tools/merge-pdf", color: "hover:border-orange-400" },
                { label: "PDF Redactor", sub: "Remove sensitive content from PDFs", href: "/tools/pdf-redactor", color: "hover:border-red-400" },
              ].map((tool) => (
                <Link key={tool.href} href={tool.href} className={`flex items-center justify-between p-5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 ${tool.color} rounded-2xl transition-colors group`}>
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white text-sm">{tool.label}</p>
                    <p className="text-xs text-slate-500">{tool.sub}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-slate-600 transition-colors flex-shrink-0" />
                </Link>
              ))}
            </div>
          </section>

        </article>
      </div>
    </>
  );
}
