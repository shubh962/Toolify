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
      <Card className="p-6 rounded-3xl shadow-xl border-2 border-primary/10">
        
        {/* HEADER */}
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 rounded-full bg-red-100 dark:bg-red-950 flex items-center justify-center mb-4">
            <Youtube className="text-red-600 w-8 h-8" />
          </div>
          <CardTitle className="text-3xl font-bold">
            YouTube to PDF Notes
          </CardTitle>
          <CardDescription className="text-base mt-2">
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
            className="w-full p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-primary transition-colors bg-gray-50 dark:bg-gray-800"
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
            className="w-full h-64 p-5 border-2 border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:border-primary transition-colors bg-gray-50 dark:bg-gray-800 resize-none"
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
    </div>
  );
}

