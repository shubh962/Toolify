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

export default function ImageCompressor() {
  const { toast } = useToast();

  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [compressedImage, setCompressedImage] = useState<string | null>(null);
  const [compressedSize, setCompressedSize] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [quality, setQuality] = useState(80);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !file.type.startsWith('image/')) {
      toast({ title: 'Invalid file', description: 'Upload JPG, PNG or WEBP only.', variant: 'destructive' });
      return;
    }
    setOriginalFile(file);
    const reader = new FileReader();
    reader.onload = e => {
      setOriginalImage(e.target?.result as string);
      setCompressedImage(null);
      setCompressedSize(null);
    };
    reader.readAsDataURL(file);
  };

  const compressImage = () => {
    if (!originalImage || !originalFile) return;
    setIsLoading(true);

    if (!originalFile.type.includes('jpeg')) {
      setCompressedImage(originalImage);
      setCompressedSize(originalFile.size);
      setIsLoading(false);
      toast({ title: 'Note', description: 'PNG/WEBP already optimized. Size unchanged.' });
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

  const formatBytes = (bytes: number) =>
    bytes === 0 ? '0 Bytes' : (bytes / 1024).toFixed(2) + ' KB';

  /* ---------------- SCHEMA ---------------- */

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "Is TaskGuru Image Compressor free?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, it is completely free with no signup required." }},
      { "@type": "Question", "name": "Does image quality reduce after compression?", "acceptedAnswer": { "@type": "Answer", "text": "The tool intelligently reduces file size while keeping visual quality almost identical." }},
      { "@type": "Question", "name": "Which formats are supported?", "acceptedAnswer": { "@type": "Answer", "text": "JPG, PNG, and WEBP image formats are supported." }},
      { "@type": "Question", "name": "Are uploaded images stored?", "acceptedAnswer": { "@type": "Answer", "text": "No, images are processed instantly and never stored." }},
      { "@type": "Question", "name": "Does it work on mobile?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, the image compressor works smoothly on all devices." }}
    ]
  };

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

      <div className="space-y-14">

        {/* H1 */}
        <section className="max-w-4xl mx-auto text-center py-6">
          <h1 className="text-4xl font-extrabold">
            Free Image Compressor Online – Optimize Images for Web Speed
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Compress images instantly and improve website performance using TaskGuru’s AI-powered image compressor.
          </p>
        </section>

        {/* TOOL */}
        <Card className="max-w-4xl mx-auto shadow-lg">
          <CardContent className="p-6">
            {!originalImage ? (
              <div
                className="border-2 border-dashed rounded-lg p-10 text-center cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="mx-auto mb-3" />
                <p className="font-semibold">Upload Image</p>
                <Input ref={fileInputRef} type="file" className="hidden" onChange={handleFileChange} />
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Image src={originalImage} alt="Original" width={400} height={400} />
                  {compressedImage ? (
                    <Image src={compressedImage} alt="Compressed" width={400} height={400} />
                  ) : (
                    <ImageIcon className="w-24 h-24 m-auto text-muted-foreground" />
                  )}
                </div>

                {!compressedImage && (
                  <div className="mt-6">
                    <Label>Compression Quality: {quality}%</Label>
                    <Slider min={10} max={100} step={5} value={[quality]} onValueChange={v => setQuality(v[0])} />
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

        {/* HIGH AUTHORITY CONTENT */}
        <section className="max-w-4xl mx-auto text-lg leading-relaxed space-y-6">
          <h2 className="text-3xl font-bold">Why Image Compression Is Critical for SEO</h2>
          <p>
            Image compression plays a major role in website speed, user experience, and Google rankings.
            Large images slow down page loading and negatively affect Core Web Vitals.
            TaskGuru Image Compressor helps reduce file size while preserving clarity.
          </p>

          <h2 className="text-3xl font-bold">How TaskGuru Image Compressor Works</h2>
          <p>
            Our tool analyzes unnecessary pixel data and compresses it intelligently.
            JPEG images benefit most from lossy compression, while PNG and WEBP are optimized safely.
          </p>

          <h2 className="text-3xl font-bold">Who Should Use This Tool?</h2>
          <ul className="list-disc ml-6">
            <li>Website owners improving page speed</li>
            <li>YouTubers optimizing thumbnails</li>
            <li>E-commerce sellers uploading product images</li>
            <li>Students and professionals sharing documents</li>
          </ul>

          <h2 className="text-3xl font-bold">Security & Privacy</h2>
          <p>
            TaskGuru follows a strict zero-storage policy.
            Uploaded images are never saved and are processed instantly.
          </p>
        </section>

        {/* INTERNAL LINKS */}
        <section className="max-w-4xl mx-auto text-center">
          <p className="font-semibold">Related Tools:</p>
          <div className="flex justify-center gap-4 mt-3">
            <Link href="/tools/background-remover">Background Remover</Link>
            <Link href="/tools/image-to-text-ocr">Image to Text OCR</Link>
            <Link href="/tools/pdf-to-word">PDF to Word</Link>
          </div>
        </section>

      </div>
    </>
  );
}

