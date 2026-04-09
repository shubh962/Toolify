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
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function YoutubeToPdf() {
  const { toast } = useToast();

  const [url, setUrl] = useState("");
  const [text, setText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  function getVideoId(url: string) {
    const regExp =
      /(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([^&#?/]+)/;
    const match = url.match(regExp);
    return match ? match[1] : null;
  }

  const handleGenerate = async () => {
    if (!url.includes("youtube.com") && !url.includes("youtu.be")) {
      setError("Enter a valid YouTube URL");
      return;
    }

    setIsProcessing(true);
    setError(null);
    setText("");
    setProgress(0);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
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

      clearInterval(progressInterval);

      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Server timeout. Use manual option below.");
      }

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setProgress(100);
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
      setTimeout(() => {
        setIsProcessing(false);
        setProgress(0);
      }, 500);
    }
  };

  const handleReset = () => {
    setUrl("");
    setText("");
    setError(null);
    setProgress(0);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    toast({ title: "Copied!", description: "Text copied" });
  };

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
    toast({ title: "Success!", description: "PDF downloaded" });
  };

  const videoId = getVideoId(url);
  const manualLink = videoId
    ? `https://youtubetranscript.com/?v=${videoId}`
    : "#";

  return (
    <div className="max-w-4xl mx-auto my-10 px-6">

      {/* 🔹 Breadcrumb */}
      <p className="text-sm text-gray-500 mb-4">
        Home → Tools → YouTube to PDF
      </p>

      <Card className="p-6 rounded-3xl shadow-xl border-2 border-primary/10 bg-white dark:bg-gray-900">

        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 rounded-full bg-red-100 dark:bg-red-950 flex items-center justify-center mb-4">
            <Youtube className="text-red-600 w-8 h-8" />
          </div>

          <CardTitle className="text-3xl font-bold">
            Free YouTube to PDF Converter
          </CardTitle>

          <CardDescription>
            Convert YouTube videos into readable PDF notes instantly (Auto + Manual)
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">

          <input
            type="text"
            placeholder="Paste YouTube URL..."
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              setError(null);
            }}
            className="w-full p-4 border-2 rounded-xl"
          />

          <div className="flex gap-3 flex-wrap">
            <Button onClick={handleGenerate} disabled={isProcessing || !url}>
              {isProcessing ? (
                <Loader2 className="animate-spin mr-2" />
              ) : (
                <FileText className="mr-2" />
              )}
              {isProcessing ? "Extracting..." : "Generate PDF Notes"}
            </Button>

            <Button variant="outline" onClick={handleReset}>
              <RotateCcw className="mr-2" />
              Reset
            </Button>
          </div>

          {isProcessing && (
            <div>
              <p className="text-sm font-bold">Processing... {progress}%</p>
              <div className="w-full bg-gray-200 h-2 rounded">
                <div
                  className="bg-blue-500 h-2 rounded"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          {error && (
            <div className="bg-red-100 p-4 rounded">
              <p>{error}</p>
              <a href={manualLink} target="_blank">
                Get transcript manually
              </a>
            </div>
          )}

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Transcript will appear here..."
            className="w-full h-64 p-4 border rounded"
          />

          {text && (
            <div className="flex gap-3">
              <Button onClick={handleCopy}>
                <Copy className="mr-2" />
                Copy
              </Button>

              <Button onClick={generatePDF}>
                Download PDF
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* 🔥 SEO CONTENT */}
      <div className="mt-12 space-y-6">

        <h2 className="text-2xl font-bold">
          Convert YouTube Transcript to PDF Online Free
        </h2>

        <p>
          Use this free YouTube to PDF converter to extract subtitles and turn them into clean downloadable notes.
        </p>

        <h3 className="text-xl font-bold">Related Tools</h3>

        <ul className="space-y-2">
          <li>
            <a href="/tools/pdf-to-word">PDF to Word Converter</a>
          </li>
          <li>
            <a href="/tools/pdf-to-excel">PDF to Excel Converter</a>
          </li>
          <li>
            <a href="/tools/excel-to-pdf">Excel to PDF</a>
          </li>
          <li>
            <a href="/tools/image-to-pdf">Image to PDF</a>
          </li>
          <li>
            <a href="/tools/text-paraphraser">Text Paraphraser</a>
          </li>
          <li>
            <a href="/tools/word-counter">Word Counter</a>
          </li>
          <li>
            <a href="/tools/merge-pdf">Merge PDF</a>
          </li>
          <li>
            <a href="/tools/pdf-redactor">PDF Redactor</a>
          </li>
          <li>
            <a href="/tools/youtube-thumbnail-downloader">
              YouTube Thumbnail Downloader
            </a>
          </li>
        </ul>

        <h3 className="text-xl font-bold">Learn More</h3>

        <ul className="space-y-2">
          <li>
            <a href="/blog/how-to-paraphrase-text">
              How to Paraphrase Text Effectively
            </a>
          </li>
          <li>
            <a href="/blog/how-to-convert-pdf-to-word-free">
              Convert PDF to Word Free Guide
            </a>
          </li>
          <li>
            <a href="/blog/youtube-thumbnail-guide">
              YouTube Thumbnail Complete Guide
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
