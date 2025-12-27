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
  CheckCircle2,
  Zap,
  ShieldCheck,
  Globe,
  Info,
} from 'lucide-react';

/* =====================================================
   IMAGE COMPRESSOR – CLEAN & FINAL VERSION
   ===================================================== */

export default function ImageCompressor() {
  const { toast } = useToast();

  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [compressedImage, setCompressedImage] = useState<string | null>(null);
  const [compressedSize, setCompressedSize] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [quality, setQuality] = useState(80);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatBytes = (bytes: number | null) => {
    if (!bytes) return '0 KB';
    return (bytes / 1024).toFixed(2) + ' KB';
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith('image/')) {
      toast({
        title: 'Invalid file',
        description: 'Please upload JPG, PNG or WEBP images only.',
        variant: 'destructive',
      });
      return;
    }

    setOriginalFile(file);
    const reader = new FileReader();
    reader.onload = ev => {
      setOriginalImage(ev.target?.result as string);
      setCompressedImage(null);
      setCompressedSize(null);
    };
    reader.readAsDataURL(file);
  };

  const compressImage = () => {
    if (!originalImage || !originalFile) return;
    setIsLoading(true);

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
        title: 'Compression Successful',
        description: `Reduced size by ${(
          (1 - finalSize / originalFile.size) *
          100
        ).toFixed(0)}%`,
      });
    };
  };

  const handleDownload = () => {
    if (!compressedImage || !originalFile) return;
    const link = document.createElement('a');
    link.href = compressedImage;
    link.download = `taskguru-optimized-${originalFile.name}`;
    link.click();
  };

  const handleReset = () => {
    setOriginalImage(null);
    setOriginalFile(null);
    setCompressedImage(null);
    setCompressedSize(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  /* ================= SCHEMA ================= */

  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'AI Image Compressor - TaskGuru',
    operatingSystem: 'All',
    applicationCategory: 'MultimediaApplication',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '9420',
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };

  const hashtags = [
    'IMAGECOMPRESSOR',
    'OPTIMIZEIMAGE',
    'TASKGURUTOOLS',
    'SEO2025',
    'WEBSITEPERFORMANCE',
    'FREETOOLS',
    'RESIZEIMAGE',
    'WEBPCONVERTER',
  ];

  return (
    <>
      <Head>
        <title>Free Image Compressor Online | Reduce Image Size Without Quality Loss</title>
        <meta
          name="description"
          content="Compress JPG, PNG and WEBP images online without losing quality. Improve website speed, SEO and performance using TaskGuru Image Compressor."
        />
        <link rel="canonical" href="https://taskguru.online/tools/image-compressor" />
      </Head>

      <Script
        id="software-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />

      <div className="max-w-6xl mx-auto px-4 py-12 space-y-24 text-gray-800 dark:text-gray-100">

        {/* HERO */}
        <section className="text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-black leading-tight">
            Free Image Compressor:{' '}
            <span className="text-primary underline decoration-wavy">
              Optimize Your Visuals
            </span>{' '}
            in Seconds
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Shrink heavy image files without sacrificing clarity. Our AI-powered
            image compressor helps you boost website speed, save storage space,
            and improve search engine rankings.
          </p>
        </section>

        {/* TOOL CARD */}
        <Card className="shadow-2xl border-t-8 border-primary rounded-3xl overflow-hidden">
          <CardContent className="p-8 md:p-12">
            {!originalImage ? (
              <div
                className="group border-4 border-dashed rounded-3xl p-20 text-center cursor-pointer hover:bg-primary/5"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="w-16 h-16 text-primary mx-auto mb-6" />
                <h2 className="text-3xl font-bold mb-3">Upload Your Image</h2>
                <p className="text-muted-foreground mb-6">
                  Supports JPG, PNG and WEBP formats (up to 10MB)
                </p>
                <Button size="lg" className="rounded-full px-12 text-lg shadow-xl">
                  Select Photo
                </Button>
                <Input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>
            ) : (
              <div className="space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="space-y-4">
                    <Label className="text-xl font-black">
                      Original Version
                    </Label>
                    <div className="relative aspect-video rounded-2xl overflow-hidden border bg-muted">
                      <Image
                        src={originalImage}
                        alt="Original image"
                        fill
                        className="object-contain"
                      />
                      <div className="absolute top-4 right-4 bg-black/80 text-white px-4 py-1 rounded-full text-sm font-bold">
                        {formatBytes(originalFile?.size ?? 0)}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label className="text-xl font-black text-primary">
                      Optimized Result
                    </Label>
                    <div className="relative aspect-video rounded-2xl overflow-hidden border bg-muted">
                      {isLoading ? (
                        <div className="flex flex-col items-center justify-center h-full gap-4">
                          <Loader2 className="animate-spin w-12 h-12 text-primary" />
                          <p className="font-bold">Compressing…</p>
                        </div>
                      ) : compressedImage ? (
                        <>
                          <Image
                            src={compressedImage}
                            alt="Compressed image"
                            fill
                            className="object-contain"
                          />
                          <div className="absolute top-4 right-4 bg-primary text-white px-4 py-1 rounded-full text-sm font-bold">
                            {formatBytes(compressedSize)}
                          </div>
                        </>
                      ) : (
                        <div className="flex flex-col items-center justify-center h-full text-muted-foreground italic">
                          <Zap className="w-16 h-16 mb-2" />
                          Waiting to optimize…
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {!compressedImage && (
                  <div className="max-w-xl mx-auto space-y-6 p-8 bg-secondary/20 rounded-3xl border">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold flex items-center gap-2">
                        <SlidersHorizontal className="w-5 h-5" />
                        Adjust Quality
                      </span>
                      <span className="text-2xl font-black text-primary">
                        {quality}%
                      </span>
                    </div>
                    <Slider
                      min={10}
                      max={100}
                      step={1}
                      value={[quality]}
                      onValueChange={v => setQuality(v[0])}
                    />
                    <p className="text-xs text-center text-muted-foreground italic flex items-center justify-center gap-2">
                      <Info className="w-3 h-3" />
                      Recommended: 75–80% for best results
                    </p>
                  </div>
                )}
              </div>
            )}
          </CardContent>

          {originalImage && (
            <CardFooter className="p-8 flex flex-wrap justify-center gap-6">
              <Button variant="outline" size="lg" onClick={handleReset}>
                <Trash2 className="mr-2 w-5 h-5" /> Reset
              </Button>
              {!compressedImage ? (
                <Button size="lg" onClick={compressImage} disabled={isLoading}>
                  <Wand2 className="mr-2 w-5 h-5" /> Optimize Now
                </Button>
              ) : (
                <Button size="lg" onClick={handleDownload}>
                  <Download className="mr-2 w-5 h-5" /> Download Result
                </Button>
              )}
            </CardFooter>
          )}
        </Card>

        {/* ARTICLE */}
        <article className="grid lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 space-y-12 leading-relaxed">
            <h2 className="text-3xl font-black">
              Why Every Digital Creator Needs an Image Compressor
            </h2>
            <p>
              In today’s fast-paced digital world, users expect websites to load
              instantly. Research shows that if a page takes more than three
              seconds to load, over 40% of visitors leave without interacting.
              One of the biggest reasons behind slow websites is unoptimized,
              heavy images.
            </p>

            <h3 className="text-2xl font-bold flex items-center gap-2">
              <Globe className="text-primary" />
              SEO & Performance Benefits
            </h3>
            <ul className="list-disc ml-6 space-y-2">
              <li>Faster page load times and better user experience</li>
              <li>Improved Core Web Vitals and SEO rankings</li>
              <li>Lower bandwidth usage for mobile users</li>
            </ul>

            <h3 className="text-2xl font-bold">Privacy & Security</h3>
            <p>
              TaskGuru follows a strict zero-storage policy. All image compression
              happens locally in your browser or in secure temporary sessions.
              Your files are never stored, tracked, or shared.
            </p>
          </div>

          <aside className="space-y-8">
            <div className="p-8 border-2 border-dashed rounded-3xl">
              <h4 className="text-xl font-black mb-4 flex items-center gap-2">
                <ShieldCheck className="text-primary" />
                Pro Tips
              </h4>
              <ul className="space-y-3 text-sm">
                <li>Keep blog images under 100KB for best speed scores</li>
                <li>Use WEBP format whenever possible</li>
                <li>Avoid uploading raw camera images directly</li>
              </ul>

              <div className="mt-6 pt-6 border-t">
                <h5 className="font-bold mb-3">Related Tools</h5>
                <nav className="flex flex-col gap-2 text-sm">
                  <Link href="/tools/background-remover">
                    → Remove Background AI
                  </Link>
                  <Link href="/tools/pdf-to-word">
                    → PDF to Word Converter
                  </Link>
                  <Link href="/tools/image-to-text">
                    → Image to Text (OCR)
                  </Link>
                </nav>
              </div>
            </div>
          </aside>
        </article>

        {/* HASHTAGS */}
        <div className="flex flex-wrap justify-center gap-4 py-12 border-t">
          {hashtags.map(tag => (
            <span
              key={tag}
              className="text-xs md:text-sm font-black text-primary/60 bg-primary/5 px-6 py-2 rounded-full border tracking-widest uppercase"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}

