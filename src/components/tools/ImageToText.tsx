"use client";

import { useState, useRef } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Upload, Loader2, Trash2, Copy, ScanText } from "lucide-react";

export default function ImageToText() {
  const { toast } = useToast();

  const [image, setImage] = useState<string | null>(null);
  const [extractedText, setExtractedText] = useState("");
  const [loading, setLoading] = useState(false);

  const fileRef = useRef<HTMLInputElement>(null);

  // -------------------------------
  // Handle Image Upload
  // -------------------------------
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 4 * 1024 * 1024) {
      toast({
        title: "File Too Large",
        description: "Please upload an image below 4 MB.",
        variant: "destructive",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (ev) => {
      setImage(ev.target?.result as string);
      setExtractedText("");
    };
    reader.readAsDataURL(file);
  };

  // -------------------------------
  // Extract Text (server logic added in Step 3)
  // -------------------------------
  const handleExtract = async () => {
    toast({
      title: "OCR Not Connected Yet",
      description: "Step 3 will add working Gemini OCR.",
    });
  };

  // -------------------------------
  // Copy Text
  // -------------------------------
  const copyText = () => {
    navigator.clipboard.writeText(extractedText);
    toast({ title: "Copied!" });
  };

  // -------------------------------
  // Reset Tool
  // -------------------------------
  const reset = () => {
    setImage(null);
    setExtractedText("");
    if (fileRef.current) fileRef.current.value = "";
  };

  return (
    <div className="py-10 space-y-10">

      {/* ---------------------- */}
      {/* HERO SECTION */}
      {/* ---------------------- */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-extrabold text-primary">
          Image to Text Converter (OCR)
        </h1>
        <p className="text-muted-foreground text-lg">
          Upload JPG, PNG or WEBP and extract text instantly — Fast & Accurate.
        </p>
      </div>

      {/* ---------------------- */}
      {/* MAIN TOOL CARD */}
      {/* ---------------------- */}
      <Card className="max-w-5xl mx-auto shadow-xl">
        <CardContent className="p-8">

          <div className="grid md:grid-cols-2 gap-8">

            {/* Upload Section */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg text-center">Upload Image</h3>

              {!image ? (
                <div
                  className="border-2 border-dashed rounded-xl p-10 flex flex-col items-center justify-center text-center cursor-pointer hover:border-primary transition"
                  onClick={() => fileRef.current?.click()}
                >
                  <Upload className="w-12 h-12 text-primary mb-4" />
                  <p className="font-semibold text-lg">Upload Image</p>
                  <p className="text-sm text-muted-foreground">
                    JPG, PNG, WEBP • Max 4MB
                  </p>
                </div>
              ) : (
                <div className="border rounded-xl overflow-hidden bg-muted h-[280px] flex items-center justify-center">
                  <img
                    src={image}
                    className="max-h-[260px] object-contain"
                  />
                </div>
              )}

              <Input
                ref={fileRef}
                type="file"
                className="hidden"
                accept="image/png, image/jpeg, image/webp"
                onChange={handleUpload}
              />
            </div>

            {/* Extracted Text Section */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg text-center">Extracted Text</h3>

              <Textarea
                className="min-h-[280px] resize-none"
                placeholder="Text will appear here..."
                value={extractedText}
                readOnly
              />

              <Button
                variant="outline"
                onClick={copyText}
                disabled={!extractedText}
              >
                <Copy className="mr-2 h-4 w-4" /> Copy Text
              </Button>
            </div>

          </div>
        </CardContent>

        {/* FOOTER BUTTONS */}
        <CardFooter className="flex justify-center gap-4 p-6 bg-muted/40 rounded-b-xl">
          <Button variant="outline" onClick={reset}>
            <Trash2 className="mr-2 h-4 w-4" /> Reset
          </Button>

          <Button onClick={handleExtract} disabled={!image}>
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <ScanText className="mr-2 h-4 w-4" />
            )}
            Extract Text
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
