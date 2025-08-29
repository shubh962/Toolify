"use client";

import { useState } from "react";
import Head from "next/head";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Loader2, Copy } from "lucide-react";

export default function ImageToText() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleExtractText = async () => {
    if (!file) return;
    setLoading(true);

    // Fake delay for demo – replace with real OCR API call later
    setTimeout(() => {
      setResult(
        "Extracted text will appear here. (Connect OCR API for real output)"
      );
      setLoading(false);
    }, 1500);
  };

  const handleCopy = () => {
    if (result) {
      navigator.clipboard.writeText(result);
    }
  };

  return (
    <>
      {/* ✅ SEO Meta Tags */}
      <Head>
        <title>
          Free Image to Text Converter Online | Extract Text from Images - TaskGuru
        </title>
        <meta
          name="description"
          content="Convert images to text online free with TaskGuru OCR tool. Extract text from JPG, PNG, WEBP instantly. Best image to text converter with OCR."
        />
        <meta
          name="keywords"
          content="image to text, image to text converter online, extract text from image, OCR online, convert image to text, free image to text tool, scan image to text, photo to text converter, picture to text online"
        />
        <link
          rel="canonical"
          href="https://www.taskguru.online/tools/image-to-text"
        />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Free Image to Text Converter Online | TaskGuru"
        />
        <meta
          property="og:description"
          content="Extract text from images online free. Upload JPG, PNG, WEBP and convert into editable text instantly using OCR."
        />
        <meta
          property="og:url"
          content="https://www.taskguru.online/tools/image-to-text"
        />
        <meta
          property="og:image"
          content="https://www.taskguru.online/og-image-to-text.jpg"
        />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Image to Text Converter Online Free | TaskGuru"
        />
        <meta
          name="twitter:description"
          content="Free OCR tool to extract text from images online. How to convert image to text? Use TaskGuru now."
        />
        <meta
          name="twitter:image"
          content="https://www.taskguru.online/og-image-to-text.jpg"
        />

        {/* ✅ FAQ Schema for Google */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "How to extract text from image online?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text":
                      "You can extract text from image online free using TaskGuru’s Image to Text Converter. Upload PNG, JPG, or WEBP and get editable text instantly.",
                  },
                },
                {
                  "@type": "Question",
                  "name": "Which is the best free image to text converter?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text":
                      "TaskGuru provides the best free image to text converter online using OCR. Fast, accurate, and no login required.",
                  },
                },
                {
                  "@type": "Question",
                  "name": "Can I convert a scanned photo to text?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text":
                      "Yes, TaskGuru’s OCR image to text tool can extract text from scanned photos and pictures.",
                  },
                },
                {
                  "@type": "Question",
                  "name": "How do I convert a picture into editable text?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text":
                      "Simply upload your picture (JPG, PNG, WEBP) to TaskGuru’s free converter and click Extract. The tool will give you editable text.",
                  },
                },
              ],
            }),
          }}
        />
      </Head>

      {/* ✅ Main UI */}
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 p-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
            Free Image to Text Converter Online (OCR Tool)
          </h1>

          <Card className="shadow-lg rounded-2xl border border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-700">
                Upload Image to Extract Text
              </CardTitle>
            </CardHeader>

            <CardContent>
              <div className="flex flex-col items-center gap-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="border p-2 rounded-lg w-full"
                />

                <Button
                  onClick={handleExtractText}
                  disabled={!file || loading}
                  className="flex items-center gap-2 px-6 py-2 rounded-lg"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Upload className="w-4 h-4" />
                  )}
                  {loading ? "Extracting..." : "Extract Text"}
                </Button>

                {result && (
                  <div className="mt-4 w-full">
                    <h2 className="text-lg font-medium text-gray-800 mb-2">
                      Extracted Text:
                    </h2>
                    <textarea
                      readOnly
                      value={result}
                      className="w-full p-3 border rounded-lg h-40 resize-none"
                    />
                    <Button
                      onClick={handleCopy}
                      variant="outline"
                      className="mt-3 flex items-center gap-2"
                    >
                      <Copy className="w-4 h-4" /> Copy Text
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
