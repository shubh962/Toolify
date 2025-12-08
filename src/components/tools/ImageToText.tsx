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

// -------------------------------
// FAST IMAGE RESIZER (Major Speed Boost)
// -------------------------------
function resizeImage(base64: string, maxWidth = 1000) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = function () {
      const scale = maxWidth / img.width;
      const canvas = document.createElement('canvas');

      canvas.width = maxWidth;
      canvas.height = img.height * scale;

      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      resolve(canvas.toDataURL("image/jpeg", 0.7));
    };
    img.src = base64;
  });
}

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

    if (file.size > 6 * 1024 * 1024) {
      toast({
        title: 'File too large',
        description: 'Please upload an image smaller than 6MB.',
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
  // OCR VIA TESSERACT
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

      // ⭐ Resize first → 5× faster OCR
      const resizedImage = await resizeImage(image);

      const { createWorker } = await import('tesseract.js');

      const worker = await createWorker({
        logger: (m) => {
          // You can show % progress if needed
          // console.log(m);
        },
      });

      await worker.loadLanguage('eng');
      await worker.initialize('eng');

      // ⭐ Performance-focused OCR settings
      await worker.setParameters({
        tessedit_pageseg_mode: '6',
        user_defined_dpi: '180',
        preserve_interword_spaces: '1',
      });

      const { data } = await worker.recognize(resizedImage);

      await worker.terminate();

      const clean = data.text.trim();

      if (!clean) {
        toast({
          title: 'No text found',
          description: 'Try using a clearer image.',
          variant: 'destructive',
        });
      }

      setExtractedText(clean);

      toast({
        title: 'Success!',
        description: 'OCR completed.',
      });

    } catch (error) {
      console.error("OCR ERROR:", error);
      toast({
        title: 'OCR failed',
        description: 'Try again with a clearer or well-lit photo.',
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
      {/* Header Section */}
      <section className="max-w-4xl mx-auto py-8 text-center space-y-4">
        <h1 className="text-3xl md:text-4xl font-extrabold text-primary">
          Image to Text Converter (OCR)
        </h1>
        <p className="text-muted-foreground">
          Convert JPG, PNG, WEBP into editable text instantly.
          <br />All processing happens on your device — 100% private.
        </p>
      </section>

      {/* MAIN TOOL CARD */}
      <Card className="w-full max-w-4xl mx-auto shadow-xl">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* LEFT: UPLOAD/PREVIEW */}
            <div className="flex flex-col space-y-4">
              <h2 className="font-semibold text-xl text-center">Upload Image</h2>

              {image ? (
                <div className="relative aspect-[3/5] w-full rounded-lg overflow-hidden border bg-muted">
                  <img
                    src={image}
                    alt="Uploaded for OCR"
                    className="object-contain w-full h-full"
                  />
                </div>
              ) : (
                <div
                  className="flex flex-col items-center justify-center space-y-4 p-12 border-2 border-dashed rounded-lg cursor-pointer hover:border-primary transition bg-muted/40"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="w-10 h-10 text-muted-foreground" />
                  <p className="font-semibold">Click to upload or drag & drop</p>
                  <p className="text-sm text-muted-foreground">
                    PNG, JPG, WEBP • Max 6MB
                  </p>
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
                  value={extractedText}
                  placeholder={
                    isLoading
                      ? 'Extracting text… please wait'
                      : 'Text will appear here…'
                  }
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

      {/* More Tools */}
      <section className="max-w-6xl mx-auto px-4 mt-16">
        <h2 className="text-2xl font-bold text-center mb-5">Explore More Tools</h2>
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
