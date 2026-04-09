"use client";

import { useState } from "react";
import { jsPDF } from "jspdf";
import {
  Youtube,
  FileText,
  Loader2,
  AlertCircle,
  Copy,
  RotateCcw,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function YoutubeToPdf() {
  const { toast } = useToast();
  // 🔹 States
  const [url, setUrl] = useState("");
  const [text, setText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0); // Progress bar state

  // 🔹 Extract Video ID
  function getVideoId(url: string) {
    const regExp =
      /(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([^&#?/]+)/;
    const match = url.match(regExp);
    return match ? match[1] : null;
  }

  // 🔹 MAIN FUNCTION
  const handleGenerate = async () => {
    if (!url.includes("youtube.com") && !url.includes("youtu.be")) {
      setError("Enter a valid YouTube URL");
      return;
    }

    setIsProcessing(true);
    setError(null);
    setText("");
    setProgress(0);

    // 🔹 Simulate Progress Bar Loading
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90; // 90% पर आकर रुक जाएगा जब तक असली डेटा न आ जाए
        }
        return prev + 15;
      });
    }, 500);

    try {
      const res = await fetch("/api/youtube", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      clearInterval(progressInterval); // डेटा आ गया, अब इंटरवल रोकें

      // 🔥 FIX: Vercel के HTML एरर पेज को रोकने के लिए
      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Server timeout. Please use the Manual option below.");
      }

      const data = await res.json();

      if (!res.ok) throw new Error(data.error);

      setProgress(100); // 100% पूरा
      setText(data.text);
      
      toast({
        title: "Transcript Loaded",
        description: "You can now copy or generate PDF",
      });

    } catch (err: any) {
      clearInterval(progressInterval);
      setProgress(0);
      setError(err.message || "Failed to fetch transcript");
    } finally {
      // 100% दिखाने के लिए आधा सेकंड रुकें, फिर लोडिंग हटाएं
      setTimeout(() => {
        setIsProcessing(false);
        setProgress(0);
      }, 500);
    }
  };

  // 🔹 RESET BUTTON
  const handleReset = () => {
    setUrl("");
    setText("");
    setError(null);
    setProgress(0);
  };

  // 🔹 COPY BUTTON
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    toast({ title: "Copied!", description: "Text copied to clipboard" });
  };

  // 🔹 PDF GENERATION
  const generatePDF = () => {
    const doc = new jsPDF();
    const margin = 15;
    const width = doc.internal.pageSize.getWidth() - margin * 2;

    doc.setFont("times", "normal");
    doc.setFontSize(12);

    const lines = doc.splitTextToSize(text, width);
    let y = 20;

    lines.forEach((line: string) => {
      if (y > 280) {
        doc.addPage();
        y = 20;
      }
      doc.text(line, margin, y);
      y += 7;
    });

    doc.save(`YouTube-Notes-${Date.now()}.pdf`);
    toast({ title: "Success!", description: "PDF downloaded successfully" });
  };

  const videoId = getVideoId(url);
  const manualLink = videoId
    ? `https://youtubetranscript.com/?v=${videoId}`
    : "#";

  return (
    <div className="max-w-4xl mx-auto my-10 px-6">
      
      {/* 🔹 MAIN TOOL CARD */}
      <Card className="p-6 rounded-3xl shadow-xl border-2 border-primary/10 bg-white dark:bg-gray-900">
        
        {/* HEADER */}
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 rounded-full bg-red-100 dark:bg-red-950 flex items-center justify-center mb-4">
            <Youtube className="text-red-600 w-8 h-8" />
          </div>
          <CardTitle className="text-3xl font-bold text-gray-900 dark:text-white">
            YouTube to PDF Notes
          </CardTitle>
          <CardDescription className="text-base mt-2 text-gray-500 dark:text-gray-400">
            Convert YouTube videos into readable notes (Auto + Manual)
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* INPUT */}
          <input
            type="text"
            placeholder="Paste YouTube URL..."
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              setError(null);
            }}
            className="w-full p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-primary transition-colors bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
          />

          {/* BUTTONS */}
          <div className="flex gap-3 flex-wrap">
            <Button size="lg" onClick={handleGenerate} disabled={isProcessing || !url}>
              {isProcessing ? (
                <Loader2 className="animate-spin mr-2 h-5 w-5" />
              ) : (
                <FileText className="mr-2 h-5 w-5" />
              )}
              {isProcessing ? "Extracting..." : "Generate Notes"}
            </Button>

            <Button size="lg" variant="outline" onClick={handleReset} disabled={isProcessing}>
              <RotateCcw className="mr-2 h-5 w-5" />
              Reset
            </Button>
          </div>

          {/* PROGRESS BAR */}
          {isProcessing && (
            <div className="w-full space-y-2 mt-2">
              <div className="flex justify-between text-sm font-bold text-primary">
                <span>Fetching Subtitles...</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full bg-primary/20 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-primary h-full rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* ERROR & MANUAL FALLBACK */}
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 p-5 rounded-2xl border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 space-y-3">
              <div className="flex items-center gap-2 font-semibold">
                <AlertCircle className="w-5 h-5 flex-shrink-0" /> {error}
              </div>
              <a
                href={manualLink}
                target="_blank"
                rel="noreferrer"
                className="inline-block font-bold underline hover:text-red-700 transition-colors"
              >
                👉 Click here to Get Transcript Manually
              </a>
              <p className="text-sm opacity-90 font-medium">
                Copy the transcript from the site and paste it below 👇
              </p>
            </div>
          )}

          {/* TEXTAREA */}
          <textarea
            placeholder="Transcript will appear here OR paste manually..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full h-64 p-5 border-2 border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:border-primary transition-colors bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white resize-none"
          />

          {/* ACTION BUTTONS */}
          {text && (
            <div className="flex gap-3 flex-wrap">
              <Button size="lg" onClick={handleCopy} variant="secondary">
                <Copy className="mr-2 h-5 w-5" />
                Copy Text
              </Button>

              <Button size="lg" onClick={generatePDF}>
                Download PDF
              </Button>
            </div>
          )}

        </CardContent>
      </Card>

      {/* 🌟 PRO TIP / DISCLAIMER SECTION */}
      <div className="mt-8 bg-amber-50 dark:bg-amber-900/10 p-5 rounded-2xl border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300 text-sm md:text-base font-medium text-center shadow-sm">
        💡 <strong className="font-bold">Pro Tip:</strong> Due to recent strict YouTube anti-bot updates, automatic fetching may occasionally fail for some videos. If you see a "Subtitles not found" error, don't worry! You can always use our instant <strong className="font-bold">Manual copy-paste fallback</strong> above to generate your study notes without any delay.
      </div>

      {/* 🚀 SEO & HOW TO USE SECTION */}
      <div className="mt-16 prose prose-slate dark:prose-invert max-w-none">
        
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
          How to Convert a YouTube Video to PDF Notes Online?
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
          Whether you are a student attending online lectures, a researcher analyzing long podcasts, or a professional taking minutes from a webinar, our <strong className="text-gray-800 dark:text-gray-200">free YouTube to PDF notes generator online</strong> is built to save you hours of manual typing. Get clean, distraction-free study materials in seconds.
        </p>

        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
          Follow these simple steps:
        </h3>
        <ol className="list-decimal pl-5 space-y-3 text-gray-600 dark:text-gray-400 mb-10 marker:text-primary marker:font-bold">
          <li><strong className="text-gray-800 dark:text-gray-200">Copy the Video Link:</strong> Find the educational video or podcast and copy its URL. (Ensure the video has Closed Captions / CC enabled).</li>
          <li><strong className="text-gray-800 dark:text-gray-200">Paste and Extract:</strong> Paste the link in the tool above to <strong className="text-gray-800 dark:text-gray-200">download YouTube transcript as PDF</strong>. Our tool will automatically process the text.</li>
          <li><strong className="text-gray-800 dark:text-gray-200">Use Manual Fallback (If Needed):</strong> If YouTube servers are busy, simply click the manual link provided, copy the transcript, and paste it into our text box.</li>
          <li><strong className="text-gray-800 dark:text-gray-200">Download & Save:</strong> Click the "Download PDF" button to save your clean, readable study document instantly to your device.</li>
        </ol>

                {/* 🔗 INTERNAL LINKING SECTION */}
        <div className="bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-6 md:p-8 border border-gray-100 dark:border-gray-800 mt-12">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Explore More Productivity Tools
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Once you have generated your study notes, you might want to refine them further. Here are some related free tools to boost your productivity:
          </p>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <span className="text-primary mt-1">✦</span>
              <p className="text-gray-600 dark:text-gray-400 m-0">
                Need to rewrite, simplify, or summarize your newly generated notes? Try our <a href="/tools/text-paraphraser" className="text-primary hover:text-primary/80 font-bold underline decoration-primary/30 underline-offset-4 transition-colors">Text Paraphraser</a> to make your content unique and easy to understand.
              </p>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary mt-1">✦</span>
              <p className="text-gray-600 dark:text-gray-400 m-0">
                Writing an essay or assignment from your notes? Keep track of your exact length using our accurate <a href="/tools/word-counter" className="text-primary hover:text-primary/80 font-bold underline decoration-primary/30 underline-offset-4 transition-colors">Word Counter</a>.
              </p>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary mt-1">✦</span>
              <p className="text-gray-600 dark:text-gray-400 m-0">
                Have multiple PDF notes from different video lectures? Combine them easily into a single study guide with our <a href="/tools/merge-pdf" className="text-primary hover:text-primary/80 font-bold underline decoration-primary/30 underline-offset-4 transition-colors">Merge PDF</a> tool.
              </p>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary mt-1">✦</span>
              <p className="text-gray-600 dark:text-gray-400 m-0">
                If your generated PDF contains personal information that you want to hide before sharing with classmates, use our secure <a href="/tools/pdf-redactor" className="text-primary hover:text-primary/80 font-bold underline decoration-primary/30 underline-offset-4 transition-colors">PDF Redactor</a>.
              </p>
            </li>
          </ul>
        </div>

    </div>
  );
        }
