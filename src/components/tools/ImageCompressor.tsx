'use client';

import { useState, useRef } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Script from 'next/script';
import Link from 'next/link';

import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

import {
  Upload,
  Download,
  Loader2,
  Trash2,
  Wand2,
  Image as ImageIcon,
  SlidersHorizontal,
  Zap,
  ShieldCheck,
} from 'lucide-react';

/* ================== COMPONENT ================== */

export default function ImageCompressor() {
  const { toast } = useToast();

  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [compressedImage, setCompressedImage] = useState<string | null>(null);
  const [compressedSize, setCompressedSize] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [quality, setQuality] = useState(80);
  const fileInputRef = useRef<HTMLInputElement>(null);

  /* ================== HELPERS ================== */

  const formatBytes = (bytes: number | null) => {
    if (!bytes) return '0 KB';
    return (bytes / 1024).toFixed(2) + ' KB';
  };

  /* ================== HANDLERS ================== */

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !file.type.startsWith('image/')) {
      toast({
        title: 'Invalid file',
        description: 'Upload JPG, PNG or WEBP image only.',
        variant: 'destructive',
      });
      return;
    }

    setOriginalFile(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      setOriginalImage(e.target?.result as string);
      setCompressedImage(null);
      setCompressedSize(null);
    };
    reader.readAsDataURL(file);
  };

  const compressImage = () => {
    if (!originalImage || !originalFile) return;

    setIsLoading(true);

    // PNG / WEBP – no forced recompression (same as your original logic)
    if (!originalFile.type.includes('jpeg')) {
      setCompressedImage(originalImage);
      setCompressedSize(originalFile.size);
      setIsLoading(false);
      toast({
        title: 'Note',
        description: 'PNG/WEBP files are already optimized.',
      });
      return;
    }

    const img = document.createElement('img');
    img.src = originalImage;

    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.drawImage(img, 0, 0);
      const output = canvas.toDataURL('image/jpeg', quality / 100);
      const finalSize = atob(output.split(',')[1]).length;

      setCompressedImage(output);
      setCompressedSize(finalSize);
      setIsLoading(false);

      toast({
        title: 'Success',
        description: `Saved ${formatBytes(originalFile.size - finalSize)}`,
      });
    };
  };

  const handleDownload = () => {
    if (!compressedImage || !originalFile) return;
    const link = document.createElement('a');
    link.href = compressedImage;
    link.download = `compressed-${originalFile.name}`;
    link.click();
  };

  const handleReset = () => {
    setOriginalImage(null);
    setOriginalFile(null);
    setCompressedImage(null);
    setCompressedSize(null);
    setIsLoading(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  /* ================== FAQ SCHEMA ================== */

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "Is this image compressor free?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, TaskGuru Image Compressor is 100% free." }},
      { "@type": "Question", "name": "Does compression reduce quality?", "acceptedAnswer": { "@type": "Answer", "text": "Quality loss is minimal and visually unnoticeable." }},
      { "@type": "Question", "name": "Which formats are supported?", "acceptedAnswer": { "@type": "Answer", "text": "JPG, PNG and WEBP formats are supported." }},
      { "@type": "Question", "name": "Are images stored?", "acceptedAnswer": { "@type": "Answer", "text": "No, images are processed instantly and never stored." }},
      { "@type": "Question", "name": "Does it work on mobile?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, it works on all devices." }},
    ]
  };

  /* ================== RENDER ================== */

  return (
    <>
      {/* SEO HEAD */}
      <Head>
        <title>Free Image Compressor Online | Reduce Image Size Without Quality Loss</title>
        <meta
          name="description"
          content="Compress JPG, PNG, WEBP images online for free using TaskGuru. Reduce image size up to 80% without losing quality."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://taskguru.online/tools/image-compressor" />
      </Head>

      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="space-y-12">

        {/* ================== H1 ================== */}
        <section className="max-w-4xl mx-auto text-center py-6">
          <h1 className="text-4xl font-extrabold">
            Free Image Compressor Online – Optimize Images for Web Speed
          </h1>
          <p className="mt-3 text-muted-foreground text-lg">
            Compress images instantly while keeping quality intact. Perfect for websites, SEO and faster loading.
          </p>
        </section>

        {/* ================== TOOL ================== */}
        <Card className="max-w-4xl mx-auto shadow-lg">
          <CardContent className="p-6">

            {!originalImage ? (
              <div
                className="border-2 border-dashed rounded-lg p-10 text-center cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="mx-auto mb-3" />
                <p className="font-semibold">Upload Image</p>
                <p className="text-sm text-muted-foreground">JPG, PNG, WEBP</p>
                <Input ref={fileInputRef} type="file" className="hidden" onChange={handleFileChange} />
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-center font-semibold">
                      Original ({formatBytes(originalFile?.size ?? 0)})
                    </h3>
                    <Image src={originalImage} alt="Original image" width={400} height={400} />
                  </div>

                  <div>
                    <h3 className="text-center font-semibold">
                      Compressed ({formatBytes(compressedSize)})
                    </h3>
                    {isLoading ? (
                      <Loader2 className="animate-spin mx-auto mt-20" />
                    ) : compressedImage ? (
                      <Image src={compressedImage} alt="Compressed image" width={400} height={400} />
                    ) : (
                      <ImageIcon className="w-24 h-24 mx-auto mt-20 text-muted-foreground" />
                    )}
                  </div>
                </div>

                {!compressedImage && (
                  <div className="mt-6">
                    <Label className="flex justify-between">
                      <span className="flex items-center gap-2">
                        <SlidersHorizontal className="w-4 h-4" /> Quality
                      </span>
                      <span>{quality}%</span>
                    </Label>
                    <Slider
                      min={10}
                      max={100}
                      step={5}
                      value={[quality]}
                      onValueChange={(v) => setQuality(v[0])}
                    />
                  </div>
                )}
              </>
            )}
          </CardContent>

          {originalImage && (
            <CardFooter className="flex justify-center gap-4">
              <Button variant="outline" onClick={handleReset}><Trash2 /> Reset</Button>
              <Button onClick={compressImage} disabled={isLoading}><Wand2 /> Compress</Button>
              <Button onClick={handleDownload} disabled={!compressedImage}><Download /> Download</Button>
            </CardFooter>
          )}
        </Card>

        {/* ================== BEFORE / AFTER DEMO ================== */}
        <section className="max-w-4xl mx-auto py-10">
          <h2 className="text-2xl font-bold text-center mb-6">
            Before & After Compression Example
          </h2>
          <div className="grid grid-cols-2 gap-6">
            <Image src="/tool-previews/compressor-before.png" alt="Before compression" width={400} height={400} />
            <Image src="/tool-previews/compressor-after.png" alt="After compression" width={400} height={400} />
          </div>
        </section>

        {/* ================== HIGH CONTENT ================== */}
        <section className="max-w-4xl mx-auto text-lg leading-relaxed space-y-6">
          <h2 className="text-3xl font-bold">Why Image Compression Is Important</h2>
          <p>
            Large images slow down websites and negatively affect SEO. Image compression reduces file size,
            improves loading speed, reduces bounce rate, and helps websites rank better on Google.
          </p>

          <h2 className="text-3xl font-bold">Who Should Use This Tool?</h2>
          <ul className="list-disc ml-6">
            <li>Website owners & bloggers</li>
            <li>YouTubers optimizing thumbnails</li>
            <li>E-commerce sellers</li>
            <li>Students & professionals</li>
          </ul>

          <h2 className="text-3xl font-bold">Security & Privacy</h2>
          <p>
            TaskGuru follows a strict zero-storage policy. Images are processed instantly and never saved.
          </p>
        </section>

        {/* ================== INTERNAL LINKS ================== */}
        <section className="text-center">
          <p className="font-semibold">Related Tools</p>
          <div className="flex justify-center gap-4 mt-2">
            <Link href="/tools/background-remover">Background Remover</Link>
            <Link href="/tools/image-to-text-ocr">Image to Text OCR</Link>
            <Link href="/tools/pdf-to-word">PDF to Word</Link>
          </div>
        </section>

      </div>
    </>
  );
      }

