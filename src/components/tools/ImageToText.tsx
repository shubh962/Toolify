"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Loader2 } from "lucide-react";

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
      setResult("Extracted text will appear here. (Connect OCR API for real output)");
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 p-6">
      {/* SEO */}
      <head>
        <title>Image to Text - Free Online OCR Tool | TaskGuru</title>
        <meta
          name="description"
          content="Extract text from images instantly with TaskGuru's free Image to Text (OCR) tool. Upload an image and convert it to editable text online."
        />
        <link rel="canonical" href="https://www.taskguru.online/tools/image-to-text" />
      </head>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Image to Text (Free OCR Tool)
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
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                {loading ? "Extracting..." : "Extract Text"}
              </Button>

              {result && (
                <div className="mt-4 w-full">
                  <h2 className="text-lg font-medium text-gray-800 mb-2">Extracted Text:</h2>
                  <textarea
                    readOnly
                    value={result}
                    className="w-full p-3 border rounded-lg h-40 resize-none"
                  />
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Loader2 } from "lucide-react";

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
      setResult("Extracted text will appear here. (Connect OCR API for real output)");
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 p-6">
      {/* SEO */}
      <head>
        <title>Image to Text - Free Online OCR Tool | TaskGuru</title>
        <meta
          name="description"
          content="Extract text from images instantly with TaskGuru's free Image to Text (OCR) tool. Upload an image and convert it to editable text online."
        />
        <link rel="canonical" href="https://www.taskguru.online/tools/image-to-text" />
      </head>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Image to Text (Free OCR Tool)
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
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                {loading ? "Extracting..." : "Extract Text"}
              </Button>

              {result && (
                <div className="mt-4 w-full">
                  <h2 className="text-lg font-medium text-gray-800 mb-2">Extracted Text:</h2>
                  <textarea
                    readOnly
                    value={result}
                    className="w-full p-3 border rounded-lg h-40 resize-none"
                  />
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
