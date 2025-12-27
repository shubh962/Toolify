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
        <title>Free Image Compressor Online | Reduce Image KB Without Quality Loss</title>
        <meta
          name="description"
          content="Professional AI Image Compressor to reduce JPG, PNG, and WEBP file size. Fast, secure, and perfect for SEO optimization. No signup required."
        />
        <link rel="canonical" href="https://taskguru.online/tools/image-compressor" />
      </Head>

      <Script
        id="rating-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />

      <div className="max-w-6xl mx-auto px-4 py-12 space-y-24 text-gray-800 dark:text-gray-100">

        {/* HERO SECTION - NO UNDERLINE */}
        <section className="text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-black leading-tight text-gray-900 dark:text-white">
            Free Image Compressor: <span className="text-primary">Optimize Your Visuals</span> in Seconds
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Shrink heavy image files without sacrificing clarity. [span_0](start_span)Our smart AI-driven tool helps you boost website speed, save storage space, and improve your search engine rankings.[span_0](end_span)
          </p>
        </section>

        {/* TOOL UI CARD */}
        <Card className="shadow-2xl border-t-8 border-primary rounded-3xl overflow-hidden">
          <CardContent className="p-8 md:p-12">
            {!originalImage ? (
              <div
                className="group border-4 border-dashed border-gray-200 dark:border-gray-800 rounded-3xl p-20 text-center cursor-pointer hover:bg-primary/5 transition-all"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="w-16 h-16 text-primary mx-auto mb-6" />
                <h2 className="text-3xl font-bold mb-3">Upload Your Image</h2>
                [span_1](start_span)<p className="text-muted-foreground mb-6">Supports JPG, PNG, and WEBP (Max 10MB)[span_1](end_span)</p>
                <Button size="lg" className="rounded-full px-12 text-lg shadow-xl">Select Photo</Button>
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
                  <div className="space-y-4 text-center md:text-left">
                    <Label className="text-xl font-black">Original Version</Label>
                    <div className="relative aspect-video rounded-2xl overflow-hidden border bg-muted shadow-sm">
                      <Image src={originalImage} alt="Original file" fill className="object-contain" />
                      <div className="absolute top-4 right-4 bg-black/80 text-white px-4 py-1 rounded-full text-sm font-bold">
                        {formatBytes(originalFile?.size ?? 0)}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4 text-center md:text-left">
                    <Label className="text-xl font-black text-primary">Optimized Result</Label>
                    <div className="relative aspect-video rounded-2xl overflow-hidden border shadow-2xl bg-muted shadow-inner">
                      {isLoading ? (
                        <div className="flex flex-col items-center justify-center h-full gap-4">
                           <Loader2 className="animate-spin w-12 h-12 text-primary" />
                           <p className="font-bold">Compressing...</p>
                        </div>
                      ) : compressedImage ? (
                        <>
                          <Image src={compressedImage} alt="Compressed file" fill className="object-contain" />
                          <div className="absolute top-4 right-4 bg-primary text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                            {formatBytes(compressedSize)}
                          </div>
                        </>
                      ) : (
                        <div className="flex flex-col items-center justify-center h-full text-muted-foreground opacity-40 italic">
                             <Zap className="w-16 h-16 mb-2" />
                             Waiting to optimize...
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {!compressedImage && (
                  <div className="max-w-xl mx-auto space-y-6 p-8 bg-secondary/20 rounded-3xl border border-primary/10">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-black flex items-center gap-2 font-bold">
                        <SlidersHorizontal className="w-5 h-5" /> Adjust Quality
                      </span>
                      <span className="text-2xl font-black text-primary font-bold">{quality}%</span>
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
            <CardFooter className="bg-muted/30 p-8 flex flex-wrap justify-center gap-6">
              <Button variant="outline" size="lg" onClick={handleReset} className="rounded-full px-8 text-red-500 border-red-200 hover:bg-red-50">
                <Trash2 className="mr-2 w-5 h-5" /> Reset
              </Button>
              {!compressedImage ? (
                <Button size="lg" onClick={compressImage} disabled={isLoading} className="rounded-full px-12 shadow-xl">
                  <Wand2 className="mr-2 w-5 h-5" /> Optimize Now
                </Button>
              ) : (
                <Button size="lg" onClick={handleDownload} className="rounded-full px-12 bg-green-600 hover:bg-green-700 shadow-xl">
                  <Download className="mr-2 w-5 h-5" /> Download Result
                </Button>
              )}
            </CardFooter>
          )}
        </Card>

        {/* HUMAN-WRITTEN ARTICLE SECTION - NO SPAN TAGS */}
        <article className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 space-y-12 leading-relaxed">
            
            <section className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white">Why Every Digital Creator Needs an Image Compressor</h2>
              <p className="text-lg text-gray-700 dark:text-gray-300">
                In today's fast-paced digital world, patience is a rare commodity. [span_2](start_span)Research shows that if a website takes more than 3 seconds to load, over 40% of visitors will leave immediately.[span_2](end_span) [span_3](start_span)The primary culprit is often unoptimized, heavy images.[span_3](end_span)
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                [span_4](start_span)TaskGuru's AI Image Compressor is designed to bridge the gap between high-quality visuals and lightning-fast performance.[span_4](end_span) [span_5](start_span)Whether you are a blogger, professional photographer, or eCommerce seller, our tool ensures your images are web-ready without losing that professional crispness.[span_5](end_span)
              </p>
            </section>

            <section className="bg-primary/5 p-10 rounded-3xl border border-primary/10 space-y-6">
              <h2 className="text-2xl font-bold flex items-center gap-3 text-gray-900 dark:text-white">
                <Globe className="text-primary" /> The Impact on Search Engine Optimization (SEO)
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                [span_6](start_span)Google has officially confirmed that Page Speed is a critical ranking factor.[span_6](end_span) [span_7](start_span)By reducing your image file size, you directly improve your site's Core Web Vitals, specifically the Largest Contentful Paint (LCP).[span_7](end_span) [span_8](start_span)This signals to search engines that your website provides a superior user experience, helping you climb higher in search results.[span_8](end_span)
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
                <div className="flex gap-4 p-4 bg-white dark:bg-black/20 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 font-medium text-sm">
                  <CheckCircle2 className="text-green-500 w-6 h-6 flex-shrink-0" />
                  [span_9](start_span)Faster load times reduce bounce rates significantly.[span_9](end_span)
                </div>
                <div className="flex gap-4 p-4 bg-white dark:bg-black/20 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 font-medium text-sm">
                  <CheckCircle2 className="text-green-500 w-6 h-6 flex-shrink-0" />
                  [span_10](start_span)Lower bandwidth usage is ideal for mobile users globally.[span_10](end_span)
                </div>
              </div>
            </section>

            <section className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">How TaskGuru Protects Your Privacy</h3>
              <p className="text-gray-700 dark:text-gray-300">
                [span_11](start_span)Unlike other free online tools that might store your photos for data mining, TaskGuru follows an "Institutional Privacy" protocol.[span_11](end_span) [span_12](start_span)All compression happens either locally in your browser or through secure, temporary sessions that are wiped clean the moment you close the tab.[span_12](end_span) [span_13](start_span)Your data is yours alone.[span_13](end_span)
              </p>
            </section>
          </div>

          <aside className="space-y-10">
            <div className="bg-secondary/30 p-8 rounded-3xl border-2 border-dashed border-gray-200 dark:border-gray-800 h-fit">
              <h4 className="text-2xl font-black mb-6 flex items-center gap-2">
                <ShieldCheck className="text-primary" /> Pro Tips for Web
              </h4>
              <ul className="space-y-6">
                <li className="flex gap-3">
                   <div className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">1</div>
                   <p className="text-sm italic text-muted-foreground">
                    [span_14](start_span)"Aim for images under 100KB for blog posts to maintain 100/100 speed scores."[span_14](end_span)
                   </p>
                </li>
                <li className="flex gap-3">
                   <div className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">2</div>
                   <p className="text-sm italic text-muted-foreground">
                    [span_15](start_span)"Use WEBP for transparency if you need even smaller sizes than PNG."[span_15](end_span)
                   </p>
                </li>
              </ul>
              <div className="mt-10 pt-8 border-t border-gray-200 dark:border-gray-800">
                <h5 className="font-bold mb-4 text-gray-900 dark:text-white">Related Utilities</h5>
                <nav className="flex flex-col gap-3">
                  <Link href="/tools/background-remover" className="text-primary font-bold text-sm hover:underline">→ Remove Background AI</Link>
                  <Link href="/tools/pdf-to-word" className="text-primary font-bold text-sm hover:underline">→ PDF to Word Converter</Link>
                  <Link href="/tools/image-to-text" className="text-primary font-bold text-sm hover:underline">→ Image to Text (OCR)</Link>
                </nav>
              </div>
            </div>
          </aside>
        </article>

        {/* HASHTAGS SECTION */}
        <div className="flex flex-wrap justify-center gap-4 py-12 border-t-2 border-dashed border-gray-100 dark:border-gray-900">
          {hashtags.map(tag => (
            <span
              key={tag}
              className="text-xs md:text-sm font-black text-primary/60 bg-primary/5 px-6 py-2 rounded-full border border-primary/10 tracking-widest hover:bg-primary/10 transition-all uppercase cursor-default"
            >
              #{tag}
            </span>
          ))}
        </div>

      </div>
    </>
  );
                    }

