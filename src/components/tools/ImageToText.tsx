"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Upload, Copy } from "lucide-react";

export default function ImageToText() {
  const [image, setImage] = useState<File | null>(null);
  const [text, setText] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleExtractText = async () => {
    if (!image) return;
    setLoading(true);

    // Simulate OCR process (replace with API call)
    setTimeout(() => {
      setText("This is the extracted text from your uploaded image.");
      setLoading(false);
    }, 2000);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    alert("Text copied to clipboard ✅");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-6">
      {/* SEO + H1 */}
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Image to Text Converter (OCR Online)
      </h1>

      <Card className="max-w-2xl mx-auto shadow-xl rounded-2xl border">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-900">
            Upload Image & Extract Text
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Upload Section */}
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-6 bg-white hover:border-blue-500 transition cursor-pointer">
              <Upload className="w-10 h-10 text-gray-500 mb-3" />
              <p className="text-gray-600 mb-2">Drag & Drop or Click to Upload</p>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id="fileInput"
              />
              <label
                htmlFor="fileInput"
                className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition"
              >
                Choose File
              </label>
              {image && <p className="text-sm text-gray-500 mt-2">{image.name}</p>}
            </div>

            {/* Extract Button */}
            <Button
              onClick={handleExtractText}
              disabled={!image || loading}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700"
            >
              {loading ? <Loader2 className="animate-spin w-5 h-5" /> : "Extract Text"}
            </Button>

            {/* Extracted Text Output */}
            {text && (
              <div className="bg-gray-50 border rounded-lg p-4 shadow-inner relative">
                <pre className="whitespace-pre-wrap text-gray-800">{text}</pre>
                <Button
                  onClick={handleCopy}
                  size="sm"
                  className="absolute top-2 right-2 flex items-center gap-1"
                  variant="outline"
                >
                  <Copy className="w-4 h-4" /> Copy
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
