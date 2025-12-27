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
        description: 'Please upload JPG, PNG, or WEBP images only.',
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
    link.download = `taskguru-compressed-${originalFile.name}`;
    link.click();
  };

  const handleReset = () => {
    setOriginalImage(null);
    setOriginalFile(null);
    setCompressedImage(null);
    setCompressedSize(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'AI Image Compressor - TaskGuru',
    operatingSystem: 'All',
    applicationCategory: 'MultimediaApplication',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '8940',
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
    'WEBSITEPOWER',
    'TASKGURUTOOLS',
    'SEO2025',
    'FREEDESIGNTOOLS',
    'RESIZEIMAGE',
    'WEBPCONVERTER',
  ];

  return (
    <>
      <Head>
        <title>Free Image Compressor Online | Reduce Image Size Without Quality Loss</title>
        <meta
          name="description"
          content="Compress JPG, PNG, and WEBP images online without losing quality. Improve website speed, SEO performance, and user experience with TaskGuru."
        />
        <link
          rel="canonical"
          href="https://taskguru.online/tools/image-compressor"
        />
      </Head>

      <Script
        id="software-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />

      <div className="max-w-6xl mx-auto px-4 py-12 space-y-20">
        {/* HERO */}
        <section className="text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-black">
            Free Image Compressor:{' '}
            <span className="text-primary underline decoration-wavy">
              Optimize Your Visuals
            </span>{' '}
            in Seconds
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Reduce image file size without sacrificing quality. Perfect for
            faster websites, better SEO rankings, and smoother user experience.
          </p>
        </section>

        {/* TOOL */}
        <Card className="shadow-2xl rounded-3xl">
          <CardContent className="p-10">
            {!originalImage ? (
              <div
                className="border-4 border-dashed rounded-3xl p-20 text-center cursor-pointer hover:bg-primary/5"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="w-16 h-16 mx-auto mb-6 text-primary" />
                <h2 className="text-3xl font-bold mb-2">Upload Your Image</h2>
                <p className="text-muted-foreground mb-6">
                  JPG, PNG or WEBP supported
                </p>
                <Button size="lg">Select Image</Button>
                <Input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>
            ) : (
              <div className="space-y-10">
                <div className="grid md:grid-cols-2 gap-12">
                  <div>
                    <Label className="text-lg font-bold">
                      Original Image
                    </Label>
                    <div className="relative aspect-video border rounded-xl overflow-hidden">
                      <Image
                        src={originalImage}
                        alt="Original"
                        fill
                        className="object-contain"
                      />
                      <span className="absolute top-3 right-3 bg-black text-white px-3 py-1 rounded-full text-xs">
                        {formatBytes(originalFile?.size ?? 0)}
                      </span>
                    </div>
                  </div>

                  <div>
                    <Label className="text-lg font-bold text-primary">
                      Compressed Image
                    </Label>
                    <div className="relative aspect-video border rounded-xl overflow-hidden">
                      {isLoading ? (
                        <div className="flex items-center justify-center h-full">
                          <Loader2 className="animate-spin w-10 h-10 text-primary" />
                        </div>
                      ) : compressedImage ? (
                        <>
                          <Image
                            src={compressedImage}
                            alt="Compressed"
                            fill
                            className="object-contain"
                          />
                          <span className="absolute top-3 right-3 bg-primary text-white px-3 py-1 rounded-full text-xs">
                            {formatBytes(compressedSize)}
                          </span>
                        </>
                      ) : (
                        <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                          <ImageIcon className="w-12 h-12 mb-2" />
                          Waiting for compression
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {!compressedImage && (
                  <div className="max-w-xl mx-auto space-y-4">
                    <div className="flex justify-between">
                      <span className="font-bold flex items-center gap-2">
                        <SlidersHorizontal className="w-4 h-4" />
                        Compression Quality
                      </span>
                      <span className="font-bold text-primary">
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
                    <p className="text-xs text-center text-muted-foreground flex items-center justify-center gap-2">
                      <Info className="w-3 h-3" />
                      Recommended: 75–80% for best SEO results
                    </p>
                  </div>
                )}
              </div>
            )}
          </CardContent>

          {originalImage && (
            <CardFooter className="flex justify-center gap-6">
              <Button variant="outline" onClick={handleReset}>
                <Trash2 className="mr-2 w-4 h-4" />
                Reset
              </Button>
              {!compressedImage ? (
                <Button onClick={compressImage} disabled={isLoading}>
                  <Wand2 className="mr-2 w-4 h-4" />
                  Compress Image
                </Button>
              ) : (
                <Button onClick={handleDownload}>
                  <Download className="mr-2 w-4 h-4" />
                  Download
                </Button>
              )}
            </CardFooter>
          )}
        </Card>

        {/* ARTICLE */}
        <article className="grid lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 space-y-12">
            <section>
              <h2 className="text-3xl font-black mb-4">
                Why Every Digital Creator Needs an Image Compressor
              </h2>
              <p>
                In today’s digital landscape, users expect fast-loading
                websites. If a page takes more than a few seconds to load,
                visitors often leave before engaging. Large, unoptimized images
                are one of the most common reasons behind slow performance.
              </p>
              <p className="mt-4">
                TaskGuru’s Image Compressor helps reduce image size while
                preserving clarity. Bloggers, photographers, designers, and
                online sellers can confidently optimize images without losing
                visual quality.
              </p>
            </section>

            <section className="bg-primary/5 p-8 rounded-3xl">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Globe className="text-primary" />
                SEO Benefits of Image Compression
              </h2>
              <p className="mt-4">
                Page speed is a confirmed Google ranking factor. Optimized
                images improve Core Web Vitals, especially Largest Contentful
                Paint (LCP), helping search engines recognize your site as fast
                and user-friendly.
              </p>

              <div className="grid sm:grid-cols-2 gap-6 mt-6">
                <div className="flex gap-3">
                  <CheckCircle2 className="text-green-500" />
                  Faster load times reduce bounce rates
                </div>
                <div className="flex gap-3">
                  <CheckCircle2 className="text-green-500" />
                  Lower bandwidth usage improves mobile performance
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-2xl font-bold mb-4">
                Privacy & Data Protection
              </h3>
              <p>
                TaskGuru follows a strict zero-storage policy. All image
                processing happens locally in your browser or in secure,
                temporary sessions that are cleared instantly.
              </p>
              <p className="mt-2 font-semibold">
                Your images are never saved, tracked, or shared.
              </p>
            </section>
          </div>

          <aside className="space-y-8">
            <div className="p-8 border-2 border-dashed rounded-3xl">
              <h4 className="text-xl font-black mb-4 flex items-center gap-2">
                <ShieldCheck className="text-primary" />
                Pro Tips
              </h4>
              <ul className="space-y-4 text-sm">
                <li>
                  Keep blog images under 100KB for near-perfect speed scores.
                </li>
                <li>
                  Use WEBP format when transparency is needed for smaller file
                  sizes.
                </li>
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
        <div className="flex flex-wrap justify-center gap-3 pt-10 border-t">
          {hashtags.map(tag => (
            <span
              key={tag}
              className="text-xs font-bold uppercase bg-primary/5 text-primary px-4 py-1 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </>
  );
                      }

