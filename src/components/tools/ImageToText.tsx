'use client';

import { useState, useRef } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

import { Upload, Loader2, Copy, Trash2, ScanText } from "lucide-react";

// ------------------------------
// IMAGE PRE-PROCESSING FUNCTIONS
// ------------------------------

/** Resize image to max width for faster OCR */
const resizeImage = (src: string, maxWidth: number): Promise<string> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = function () {
      const scale = maxWidth / img.width;
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d")!;

      canvas.width = maxWidth;
      canvas.height = img.height * scale;

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      resolve(canvas.toDataURL("image/jpeg", 0.9));
    };
    img.src = src;
  });
};

/** Enhances mobile photos for better OCR accuracy */
const enhanceImage = (base64: string): Promise<string> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = function () {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d")!;

      canvas.width = img.width;
      canvas.height = img.height;

      ctx.drawImage(img, 0, 0);

      let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      let data = imgData.data;

      // 1️⃣ Convert to grayscale
      for (let i = 0; i < data.length; i += 4) {
        let avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
        data[i] = data[i + 1] = data[i + 2] = avg;
      }

      // 2️⃣ Boost contrast
      let contrast = 40;
      let factor = (259 * (contrast + 255)) / (255 * (259 - contrast));
      for (let i = 0; i < data.length; i += 4) {
        data[i] = factor * (data[i] - 128) + 128;
        data[i + 1] = factor * (data[i + 1] - 128) + 128;
        data[i + 2] = factor * (data[i + 2] - 128) + 128;
      }

      // 3️⃣ Apply threshold to remove shadows
      for (let i = 0; i < data.length; i += 4) {
        let v = data[i] > 130 ? 255 : 0;
        data[i] = data[i + 1] = data[i + 2] = v;
      }

      ctx.putImageData(imgData, 0, 0);
      resolve(canvas.toDataURL("image/jpeg"));
    };

    img.src = base64;
  });
};

// ------------------------------
// MAIN COMPONENT
// ------------------------------
export default function ImageToText() {
  const { toast } = useToast();

  const [image, setImage] = useState<string | null>(null);
  const [extractedText, setExtractedText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  // Handle upload
  const handleFileChange = (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 4 * 1024 * 1024) {
      return toast({
        title: "File too large",
        description: "Upload image smaller than 4 MB.",
        variant: "destructive",
      });
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setImage(event.target?.result as string);
      setExtractedText("");
    };
    reader.readAsDataURL(file);
  };

  // OCR Handler
  const handleSubmit = async () => {
    if (!image) {
      return toast({
        title: "No image selected",
        description: "Upload an image first.",
        variant: "destructive",
      });
    }

    setIsLoading(true);
    setExtractedText("");

    try {
      // Step 1: Enhance image
      const enhanced = await enhanceImage(image);

      // Step 2: Resize image for performance
      const cleaned = await resizeImage(enhanced, 1000);

      // Step 3: Run Tesseract
      const { createWorker } = await import("tesseract.js");
      const worker = await createWorker();

      await worker.loadLanguage("eng");
      await worker.initialize("eng");

      const { data } = await worker.recognize(cleaned);
      await worker.terminate();

      const text = data.text.trim();
      setExtractedText(text);

      if (!text)
        return toast({
          title: "No readable text",
          description: "Try capturing a clearer photo.",
          variant: "destructive",
        });

      toast({ title: "Success", description: "Text extracted successfully!" });
    } catch (err) {
      console.error(err);
      toast({
        title: "OCR failed",
        description: "Try again with a well-lit and clear image.",
        variant: "destructive",
      });
    }

    setIsLoading(false);
  };

  // copy
  const handleCopy = () => {
    navigator.clipboard.writeText(extractedText);
    toast({ title: "Copied!" });
  };

  // reset
  const handleReset = () => {
    setImage(null);
    setExtractedText("");
    setIsLoading(false);
    if (fileRef.current) fileRef.current.value = "";
  };

  return (
    <>
      {/* Header */}
      <section className="max-w-4xl mx-auto py-10 text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold text-primary">
          Image to Text Converter (OCR)
        </h1>
        <p className="text-muted-foreground mt-2">
          Extract text from photos & screenshots using advanced browser OCR.
        </p>
      </section>

      {/* Main Tool */}
      <Card className="max-w-4xl mx-auto shadow-xl">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Upload */}
            <div>
              <h2 className="font-semibold text-lg text-center mb-3">Upload Image</h2>

              {image ? (
                <div className="relative w-full aspect-[3/5] border rounded-lg overflow-hidden">
                  <img src={image} className="object-contain w-full h-full" />
                </div>
              ) : (
                <div
                  onClick={() => fileRef.current?.click()}
                  className="flex flex-col items-center justify-center p-10 border-2 border-dashed rounded-lg cursor-pointer hover:border-primary transition"
                >
                  <Upload className="w-10 h-10 text-muted-foreground" />
                  <p className="mt-2 text-sm">Click to upload JPG / PNG</p>
                </div>
              )}

              <Input
                ref={fileRef}
                type="file"
                className="hidden"
                accept="image/png, image/jpeg, image/webp"
                onChange={handleFileChange}
              />
            </div>

            {/* Output */}
            <div>
              <h2 className="font-semibold text-lg text-center mb-3">Extracted Text</h2>

              <div className="relative">
                {isLoading && <Skeleton className="absolute inset-0" />}
                <Textarea
                  readOnly
                  value={extractedText}
                  placeholder="Your extracted text will appear here..."
                  className="min-h-[220px] resize-none"
                />
              </div>

              <Button
                onClick={handleCopy}
                disabled={!extractedText}
                variant="outline"
                className="mt-3 w-full"
              >
                <Copy className="w-4 h-4 mr-2" /> Copy Text
              </Button>
            </div>

          </div>
        </CardContent>

        {image && (
          <CardFooter className="flex justify-center gap-4 border-t bg-muted/50 p-4">
            <Button variant="outline" onClick={handleReset}>
              <Trash2 className="mr-2" /> Reset
            </Button>
            <Button onClick={handleSubmit} disabled={isLoading}>
              {isLoading ? <Loader2 className="animate-spin mr-2" /> : <ScanText className="mr-2" />}
              Extract Text
            </Button>
          </CardFooter>
        )}
      </Card>
    </>
  );
}
