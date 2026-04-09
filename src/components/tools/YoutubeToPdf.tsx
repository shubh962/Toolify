"use client";

import { useState } from "react";
import { jsPDF } from "jspdf";
import {
  Youtube,
  FileText,
  Loader2,
  AlertCircle,
  ArrowRight,
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

    try {
      const res = await fetch("/api/youtube", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error);

      setText(data.text);

      toast({
        title: "Transcript Loaded",
        description: "You can now copy or generate PDF",
      });
    } catch (err: any) {
      setError(err.message || "Failed to fetch transcript");
    } finally {
      setIsProcessing(false);
    }
  };

  // 🔹 RESET BUTTON
  const handleReset = () => {
    setUrl("");
    setText("");
    setError(null);
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

    doc.save("youtube-notes.pdf");
  };

  const videoId = getVideoId(url);
  const manualLink = videoId
    ? `https://youtubetranscript.com/?v=${videoId}`
    : "#";

  return (
    <div className="max-w-4xl mx-auto my-10 px-6">

      <Card className="p-6 rounded-3xl shadow-xl">

        {/* HEADER */}
        <CardHeader className="text-center">
          <Youtube className="mx-auto text-red-500 w-12 h-12 mb-3" />
          <CardTitle className="text-2xl font-bold">
            YouTube to PDF Notes
          </CardTitle>
          <CardDescription>
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
            className="w-full p-4 border rounded-xl"
          />

          {/* BUTTONS */}
          <div className="flex gap-3 flex-wrap">

            <Button onClick={handleGenerate} disabled={isProcessing}>
              {isProcessing ? (
                <Loader2 className="animate-spin mr-2" />
              ) : (
                <FileText className="mr-2" />
              )}
              Generate
            </Button>

            <Button variant="outline" onClick={handleReset}>
              <RotateCcw className="mr-2" />
              Reset
            </Button>
          </div>

          {/* ERROR */}
          {error && (
            <div className="bg-red-100 p-4 rounded-xl text-red-600 space-y-2">
              <div className="flex items-center gap-2">
                <AlertCircle /> {error}
              </div>

              <a
                href={manualLink}
                target="_blank"
                className="underline text-blue-600"
              >
                👉 Get Transcript Manually
              </a>

              <p className="text-sm">
                Copy transcript and paste below 👇
              </p>
            </div>
          )}

          {/* TEXTAREA */}
          <textarea
            placeholder="Transcript will appear here OR paste manually..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full h-60 p-4 border rounded-xl"
          />

          {/* ACTION BUTTONS */}
          {text && (
            <div className="flex gap-3 flex-wrap">

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
    </div>
  );
}
