'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';

import { Upload, Loader2, Copy, Trash2, ScanText } from 'lucide-react';

// ❗ NOTE: Ye version server actions / Gemini ka use nahin karta.
// OCR pura client-side Tesseract.js se hota hai.

export default function ImageToText() {
  const { toast } = useToast();

  const [image, setImage] = useState<string | null>(null);
  const [extractedText, setExtractedText] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // ------------------------
  // FILE UPLOAD HANDLER
  // ------------------------
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 4 * 1024 * 1024) {
      toast({
        title: 'File too large',
        description: 'Please upload an image smaller than 4MB.',
        variant: 'destructive',
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setImage(e.target?.result as string);
      setExtractedText('');
    };
    reader.readAsDataURL(file);
  };

  // ------------------------
  // OCR VIA TESSERACT.JS
  // ------------------------
  const handleSubmit = async () => {
    if (!image) {
      toast({
        title: 'No image selected',
        description: 'Please upload an image first.',
        variant: 'destructive',
      });
      return;
    }

    try {
      setIsLoading(true);
      setExtractedText('');

      // ⚙️ Dynamic import so build safe rahe
      const { createWorker } = await import('tesseract.js');

      const worker = await createWorker('eng', 1, {
        logger: (m) => {
          // Optional: console me progress dekh sakte ho
          // console.log(m);
        },
      });

      const {
        data: { text },
      } = await worker.recognize(image);

      await worker.terminate();

      const cleanText = text.trim();

      if (!cleanText) {
        toast({
          title: 'No text found',
          description: 'OCR completed but no readable text was detected.',
          variant: 'destructive',
        });
      }

      setExtractedText(cleanText);

      toast({
        title: 'Success!',
        description: 'Text extracted successfully using OCR.',
      });
    } catch (error) {
      console.error('❌ Tesseract OCR error:', error);
      toast({
        title: 'OCR failed',
        description:
          'Failed to extract text from image. Please try with a clearer image.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // ------------------------
  // COPY TO CLIPBOARD
  // ------------------------
  const handleCopy = () => {
    if (!extractedText) return;
    navigator.clipboard.writeText(extractedText);
    toast({ title: 'Copied to clipboard!' });
  };

  // ------------------------
  // RESET TOOL
  // ------------------------
  const handleReset = () => {
    setImage(null);
    setExtractedText('');
    setIsLoading(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <>
      {/* Top intro, same vibe as other tools */}
      <section className="max-w-4xl mx-auto py-8 text-center space-y-4">
        <h1 className="text-3xl md:text-4xl font-extrabold text-primary">
          Image to Text Converter (OCR)
        </h1>
        <p className="text-muted-foreground">
          Upload JPG, PNG, or WEBP and extract readable text instantly using
          OCR. Works in your browser — no upload to any server.
        </p>
      </section>

      {/* MAIN TOOL CARD */}
      <Card className="w-full max-w-4xl mx-auto shadow-xl">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* LEFT: IMAGE UPLOAD / PREVIEW */}
            <div className="flex flex-col space-y-4">
              <h2 className="font-semibold text-xl text-center">Upload Image</h2>

              {image ? (
                <div className="relative aspect-[3/5] w-full rounded-lg overflow-hidden border bg-muted">
                  {/* Simple <img> so layout same rahe */}
                  <img
                    src={image}
                    alt="Uploaded for OCR"
                    className="object-contain w-full h-full"
                  />
                </div>
              ) : (
                <div
                  className="flex flex-col items-center justify-center space-y-4 p-12 border-2 border-dashed rounded-lg cursor-pointer hover:border-primary transition-colors h-full bg-muted/40"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <div className="p-4 bg-secondary rounded-full">
                    <Upload className="w-10 h-10 text-muted-foreground" />
                  </div>
                  <div className="text-center">
                    <p className="font-semibold">Click to upload or drag & drop</p>
                    <p className="text-sm text-muted-foreground">
                      PNG, JPG, WEBP (Max 4MB)
                    </p>
                  </div>
                </div>
              )}

              <Input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept="image/png, image/jpeg, image/webp"
                onChange={handleFileChange}
              />
            </div>

            {/* RIGHT: OCR RESULT */}
            <div className="flex flex-col space-y-4">
              <h2 className="font-semibold text-lg text-center">
                Extracted Text Result
              </h2>
              <div className="relative h-full">
                {isLoading && <Skeleton className="absolute inset-0" />}
                <Textarea
                  className="h-full min-h-[220px] resize-none"
                  placeholder={
                    isLoading
                      ? 'Extracting text, please wait...'
                      : 'Text from your image will appear here.'
                  }
                  value={extractedText}
                  readOnly
                />
              </div>
              <Button
                onClick={handleCopy}
                disabled={!extractedText || isLoading}
                variant="outline"
              >
                <Copy className="mr-2 h-4 w-4" /> Copy Text
              </Button>
            </div>
          </div>
        </CardContent>

        {/* ACTION BUTTONS */}
        {image && (
          <CardFooter className="flex justify-center gap-4 bg-muted/50 p-4 border-t">
            <Button variant="outline" onClick={handleReset}>
              <Trash2 className="mr-2 h-4 w-4" /> Reset
            </Button>
            <Button onClick={handleSubmit} disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <ScanText className="mr-2 h-4 w-4" />
              )}
              Extract Text
            </Button>
          </CardFooter>
        )}
      </Card>

      {/* OPTIONAL: “More tools” section same as others — if you already
          have a shared component for this, use that instead */}
      <section className="max-w-6xl mx-auto px-4 mt-16">
        <h2 className="text-2xl font-bold text-center mb-5">
          Explore More Tools
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <a href="/tools/pdf-to-word">
            <div className="p-4 border rounded-xl hover:shadow-md transition cursor-pointer bg-card">
              <h3 className="font-bold">PDF to Word</h3>
              <p className="text-xs text-muted-foreground">
                Convert PDF files into editable Word documents.
              </p>
            </div>
          </a>
          <a href="/tools/merge-pdf">
            <div className="p-4 border rounded-xl hover:shadow-md transition cursor-pointer bg-card">
              <h3 className="font-bold">Merge PDF</h3>
              <p className="text-xs text-muted-foreground">
                Combine multiple PDFs into one organized file.
              </p>
            </div>
          </a>
          <a href="/tools/image-to-pdf">
            <div className="p-4 border rounded-xl hover:shadow-md transition cursor-pointer bg-card">
              <h3 className="font-bold">Image to PDF</h3>
              <p className="text-xs text-muted-foreground">
                Turn JPG/PNG images into high-quality PDFs.
              </p>
            </div>
          </a>
        </div>
      </section>
    </>
  );
}
