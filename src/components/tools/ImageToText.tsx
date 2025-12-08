'use client';

import { useState, useRef } from 'react';
import Head from 'next/head';
import Image from 'next/image';

import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';

import { Upload, Loader2, Copy, Trash2, ScanText } from 'lucide-react';

// ----------------------------------------------------------------------------------
// IMAGE TO TEXT (OCR TOOL) — CLIENT-ONLY VERSION USING TESSERACT.JS
// ----------------------------------------------------------------------------------

export default function ImageToText() {
  const { toast } = useToast();

  const [image, setImage] = useState<string | null>(null);
  const [extractedText, setExtractedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // --------------------------------------------
  // 1️⃣ Handle Image Upload
  // --------------------------------------------
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: 'File too large',
        description: 'Please upload an image under 5MB.',
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

  // --------------------------------------------
  // 2️⃣ Extract Text (OCR via Tesseract.js)
  // --------------------------------------------
  const handleSubmit = async () => {
    if (!image) {
      toast({
        title: 'No Image Selected',
        description: 'Upload an image to extract text.',
        variant: 'destructive',
      });
      return;
    }

    try {
      setIsLoading(true);
      setExtractedText('');

      const { createWorker } = await import('tesseract.js');

      const worker = await createWorker({
        logger: () => {}, // progress logs hidden for cleaner UI
      });

      await worker.loadLanguage('eng');
      await worker.initialize('eng');

      // Improve accuracy for camera photos
      await worker.setParameters({
        tessedit_pageseg_mode: '6', // treat text as block
        user_defined_dpi: '300',
        preserve_interword_spaces: '1',
      });

      const { data } = await worker.recognize(image);
      await worker.terminate();

      if (!data.text.trim()) {
        toast({
          title: 'No text found',
          description: 'Try using a clearer or higher contrast image.',
          variant: 'destructive',
        });
      }

      setExtractedText(data.text.trim());

      toast({
        title: 'OCR Complete',
        description: 'Text extracted successfully.',
      });
    } catch (err) {
      console.error('OCR ERROR:', err);
      toast({
        title: 'OCR Failed',
        description: 'Try again with a clearer / sharper image.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // --------------------------------------------
  // 3️⃣ Copy Extracted Text
  // --------------------------------------------
  const handleCopy = () => {
    if (!extractedText) return;

    navigator.clipboard.writeText(extractedText);
    toast({ title: 'Copied!' });
  };

  // --------------------------------------------
  // 4️⃣ Reset Tool
  // --------------------------------------------
  const handleReset = () => {
    setImage(null);
    setExtractedText('');
    setIsLoading(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <>
      {/* -------------------------------------------- */}
      {/* SEO / META TAGS */}
      {/* -------------------------------------------- */}
      <Head>
        <title>Image to Text Converter (OCR) | Free Online Tool - Toolify</title>
        <meta
          name="description"
          content="Extract text from images (JPG, PNG, WEBP) using fast OCR technology. 100% free, no signup, no upload — everything happens inside your browser."
        />
        <link rel="canonical" href="https://taskguru.online/tools/image-to-text" />

        <meta property="og:title" content="Free Image to Text Converter (OCR)" />
        <meta
          property="og:description"
          content="Fast & free OCR tool — extract text from pictures in your browser using AI-powered OCR."
        />
        <meta property="og:image" content="https://taskguru.online/og-image-to-text.jpg" />
      </Head>

      {/* -------------------------------------------- */}
      {/* TITLE + DESCRIPTION */}
      {/* -------------------------------------------- */}
      <section className="max-w-4xl mx-auto py-10 text-center space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight text-primary">
          Image to Text Converter (OCR)
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Convert JPG, PNG, or WEBP into editable text instantly.  
          100% private — processed directly in your browser.
        </p>
      </section>

      {/* -------------------------------------------- */}
      {/* MAIN TOOL CARD */}
      {/* -------------------------------------------- */}
      <Card className="max-w-4xl mx-auto shadow-xl">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* LEFT: UPLOAD IMAGE */}
            <div className="flex flex-col space-y-4">
              <h3 className="font-semibold text-xl text-center">Upload Image</h3>

              {image ? (
                <div className="relative aspect-video w-full border rounded-lg overflow-hidden bg-muted">
                  <img src={image} alt="Preview" className="object-contain w-full h-full" />
                </div>
              ) : (
                <div
                  className="flex flex-col items-center justify-center p-12 border-2 border-dashed rounded-lg bg-muted/50 hover:border-primary transition cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="w-10 h-10 text-muted-foreground mb-4" />
                  <p className="font-semibold">Click to upload or drag & drop</p>
                  <p className="text-xs text-muted-foreground">JPG, PNG, WEBP • Max 5MB</p>
                </div>
              )}

              <Input
                type="file"
                className="hidden"
                ref={fileInputRef}
                accept="image/png, image/jpeg, image/webp"
                onChange={handleFileChange}
              />
            </div>

            {/* RIGHT: OCR OUTPUT */}
            <div className="flex flex-col space-y-4">
              <h3 className="font-semibold text-xl text-center">Extracted Text</h3>

              <div className="relative h-full">
                {isLoading && <Skeleton className="absolute inset-0" />}
                <Textarea
                  value={extractedText}
                  readOnly
                  placeholder={isLoading ? 'Extracting text...' : 'Text will appear here'}
                  className="h-full min-h-[220px] resize-none"
                />
              </div>

              <Button variant="outline" onClick={handleCopy} disabled={!extractedText}>
                <Copy className="w-4 h-4 mr-2" />
                Copy Text
              </Button>
            </div>
          </div>
        </CardContent>

        {image && (
          <CardFooter className="flex justify-center gap-4 p-4 border-t bg-muted/40">
            <Button variant="outline" onClick={handleReset}>
              <Trash2 className="mr-2 h-4 w-4" />
              Reset
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

      {/* -------------------------------------------- */}
      {/* MORE TOOLS SECTION */}
      {/* -------------------------------------------- */}
      <section className="max-w-5xl mx-auto mt-16 px-4">
        <h2 className="text-2xl font-bold text-center mb-6">Explore More Tools</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: 'PDF to Word Converter',
              desc: 'Convert PDF files into editable DOCX instantly.',
              link: '/tools/pdf-to-word',
            },
            {
              title: 'Merge PDF Online',
              desc: 'Combine PDFs into one organized file.',
              link: '/tools/merge-pdf',
            },
            {
              title: 'Image to PDF Converter',
              desc: 'Turn JPG/PNG images into clean A4 PDFs.',
              link: '/tools/image-to-pdf',
            },
          ].map((tool, i) => (
            <a key={i} href={tool.link}>
              <div className="p-5 border rounded-xl bg-card hover:shadow-md transition cursor-pointer">
                <h3 className="font-semibold">{tool.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{tool.desc}</p>
              </div>
            </a>
          ))}
        </div>
      </section>
    </>
  );
}
