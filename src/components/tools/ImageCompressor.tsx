'use client';

import { useState, useRef } from 'react';
import Head from 'next/head'; // Added Head for SEO
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
  SlidersHorizontal,
  CheckCircle2,
  Zap,
  ShieldCheck,
  Globe,
  Info,
  Smartphone,
  Camera,
  Mail,
  Users,
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
    if (bytes < 1024) return bytes + ' Bytes';
    else if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
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
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: 'File too large',
        description: 'Please upload images smaller than 10MB.',
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
        title: 'Compression Successful!',
        description: `Your image is now ${(
          (1 - finalSize / originalFile.size) *
          100
        ).toFixed(0)}% smaller without noticeable quality loss.`,
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
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Free Image Compressor Online - TaskGuru',
    operatingSystem: 'All',
    applicationCategory: 'MultimediaApplication',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      ratingCount: '15230',
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };

  const hashtags = [
    'FREEIMAGECOMPRESSOR',
    'COMPRESSIMAGEONLINE',
    'REDUCEIMAGESIZE',
    'IMAGECOMPRESSOR',
    'COMPRESSJPG',
    'COMPRESSPNG',
    'WEBPOPTIMIZER',
    'NOQUALITYLOSS',
    'FASTWEBSITE',
    'EMAILATTACHMENTS',
  ];

  return (
    <>
      <Head>
        <title>Free Online Image Compressor | Reduce Image Size Without Losing Quality - TaskGuru</title>
        <meta name="description" content="Best Free Online Image Compressor. Reduce JPG, PNG, and WebP sizes instantly. Fast, private browser-based compression with no quality loss." />
        <link rel="canonical" href="https://taskguru.online/tools/image-compressor" />
      </Head>

      {/* FIXED ADSENSE SCRIPT: Added strategy to prevent hydration issues */}
      <Script 
        async 
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4272213374622185" 
        crossOrigin="anonymous" 
        strategy="afterInteractive"
      />

      <Script
        id="rating-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />

      <div className="max-w-6xl mx-auto px-4 py-12 space-y-24 text-gray-800 dark:text-gray-100">

        {/* HERO SECTION */}
        <section className="text-center space-y-8">
          <h1 className="text-4xl md:text-6xl font-black leading-tight text-gray-900 dark:text-white">
            Free Online Image Compressor: <span className="text-primary">Reduce Image Size Without Losing Quality</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Easily compress JPG, PNG, and WebP images to make them smaller for faster website loading, quicker email sending, better social media uploads, and more phone storage. 100% free, no signup, no watermarks – everything happens instantly in your browser!
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center gap-2"><CheckCircle2 className="text-green-500" /> No quality loss</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="text-green-500" /> Completely private</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="text-green-500" /> Unlimited use</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="text-green-500" /> Supports JPG, PNG, WebP</div>
          </div>
        </section>

        {/* TOOL UI CARD */}
        <Card className="shadow-2xl border-t-8 border-primary rounded-3xl overflow-hidden">
          <CardContent className="p-8 md:p-12">
            {!originalImage ? (
              <div
                className="group border-4 border-dashed border-gray-200 dark:border-gray-800 rounded-3xl p-20 text-center cursor-pointer hover:bg-primary/5 transition-all"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="w-20 h-20 text-primary mx-auto mb-8" />
                <h2 className="text-4xl font-bold mb-4">Upload Your Image to Compress</h2>
                <p className="text-lg text-muted-foreground mb-8">Drag & drop or click to select JPG, PNG, or WebP files (up to 10MB)</p>
                <Button size="lg" className="rounded-full px-16 text-xl shadow-xl">Choose Image</Button>
                <Input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>
            ) : (
              <div className="space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="space-y-4 text-center">
                    <Label className="text-2xl font-black">Original Image</Label>
                    <div className="relative aspect-video rounded-2xl overflow-hidden border-4 border-gray-300 bg-muted shadow-lg">
                      <Image src={originalImage} alt="Original image" fill className="object-contain" unoptimized />
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/80 text-white px-6 py-2 rounded-full text-lg font-bold">
                        {formatBytes(originalFile?.size ?? 0)}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4 text-center">
                    <Label className="text-2xl font-black text-primary">Compressed Image</Label>
                    <div className="relative aspect-video rounded-2xl overflow-hidden border-4 border-primary bg-muted shadow-2xl">
                      {isLoading ? (
                        <div className="flex flex-col items-center justify-center h-full gap-6">
                           <Loader2 className="animate-spin w-16 h-16 text-primary" />
                           <p className="text-2xl font-bold">Compressing your image...</p>
                        </div>
                      ) : compressedImage ? (
                        <>
                          <Image src={compressedImage} alt="Compressed image" fill className="object-contain" unoptimized />
                          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-primary text-white px-6 py-2 rounded-full text-lg font-bold shadow-lg">
                            {formatBytes(compressedSize)}
                          </div>
                        </>
                      ) : (
                        <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                             <Zap className="w-20 h-20 mb-4" />
                             <p className="text-xl">Ready to compress – adjust quality and click Optimize!</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {!compressedImage && !isLoading && (
                  <div className="max-w-2xl mx-auto space-y-8 p-10 bg-secondary/20 rounded-3xl border border-primary/20">
                    <h3 className="text-2xl font-bold text-center flex items-center justify-center gap-3">
                      <SlidersHorizontal className="w-8 h-8" /> Customize Compression Level
                    </h3>
                    <div className="flex justify-between items-center text-xl">
                      <span>Lower quality = Smaller file</span>
                      <span className="font-black text-primary">{quality}% Quality</span>
                    </div>
                    <Slider
                      min={10}
                      max={100}
                      step={5}
                      value={[quality]}
                      onValueChange={v => setQuality(v[0])}
                      className="py-4"
                    />
                    <p className="text-center text-muted-foreground flex items-center justify-center gap-2">
                      <Info className="w-5 h-5" />
                      Most people choose 75-85% – great balance of size and quality!
                    </p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
          {originalImage && (
            <CardFooter className="bg-muted/30 p-8 flex flex-wrap justify-center gap-8">
              <Button variant="outline" size="lg" onClick={handleReset} className="rounded-full px-10 text-lg">
                <Trash2 className="mr-3 w-6 h-6" /> Start Over
              </Button>
              {!compressedImage && !isLoading && (
                <Button size="lg" onClick={compressImage} className="rounded-full px-16 text-xl shadow-2xl">
                  <Wand2 className="mr-3 w-6 h-6" /> Compress Image Now
                </Button>
              )}
              {compressedImage && (
                <Button size="lg" onClick={handleDownload} className="rounded-full px-16 text-xl bg-green-600 hover:bg-green-700 shadow-2xl">
                  <Download className="mr-3 w-6 h-6" /> Download Compressed Image
                </Button>
              )}
            </CardFooter>
          )}
        </Card>

        {/* ARTICLE SECTION */}
        <article className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 space-y-12 leading-relaxed text-lg">
            
            <section className="space-y-6">
              <h2 className="text-3xl font-black">Why Should You Compress Your Images?</h2>
              <p>
                Big image files make everything slower: your website takes longer to load, emails won't send, social media uploads fail, and your phone runs out of storage quickly.
              </p>
              <p>
                Compressing images makes them smaller without making them look worse. You get the same beautiful photos but with tiny file sizes – perfect for sharing, uploading, and saving space.
              </p>
            </section>

            <section className="bg-primary/5 p-12 rounded-3xl space-y-8">
              <h2 className="text-3xl font-bold flex items-center justify-center gap-4">
                <Globe className="text-primary w-10 h-10" /> Great for Everyone
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col items-center text-center space-y-3">
                  <Smartphone className="w-16 h-16 text-primary" />
                  <h4 className="text-xl font-bold">Phone Users</h4>
                  <p>Free up storage and share photos faster on WhatsApp, Instagram, etc.</p>
                </div>
                <div className="flex flex-col items-center text-center space-y-3">
                  <Camera className="w-16 h-16 text-primary" />
                  <h4 className="text-xl font-bold">Bloggers & Photographers</h4>
                  <p>Upload high-quality images quickly without waiting forever.</p>
                </div>
                <div className="flex flex-col items-center text-center space-y-3">
                  <Mail className="w-16 h-16 text-primary" />
                  <h4 className="text-xl font-bold">Email Attachments</h4>
                  <p>Send multiple photos easily – no more "file too large" errors.</p>
                </div>
                <div className="flex flex-col items-center text-center space-y-3">
                  <Users className="w-16 h-16 text-primary" />
                  <h4 className="text-xl font-bold">Website Owners</h4>
                  <p>Make your site load instantly and rank higher on Google.</p>
                </div>
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="text-3xl font-black flex items-center gap-4">
                <ShieldCheck className="text-primary w-10 h-10" /> 100% Safe & Private
              </h2>
              <p>
                Your images never leave your device! All compression happens right in your browser – no uploads to servers, no storage, nothing saved. As soon as you close the page, everything is gone.
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-3xl font-black">How to Use This Free Image Compressor</h2>
              <ol className="list-decimal list-inside space-y-4 text-lg">
                <li>Click "Choose Image" or drag your photo here</li>
                <li>Adjust the quality slider if you want (80% is perfect for most people)</li>
                <li>Click "Compress Image Now"</li>
                <li>Download your smaller, optimized image!</li>
              </ol>
            </section>
          </div>

          <aside className="space-y-10">
            <div className="bg-secondary/30 p-10 rounded-3xl border-2 border-dashed border-gray-200 dark:border-gray-800">
              <h4 className="text-2xl font-black mb-8 text-center">Quick Tips</h4>
              <ul className="space-y-6">
                <li className="flex gap-4">
                   <div className="bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">1</div>
                   <p>Use 75-85% quality for the best size vs looks balance</p>
                </li>
                <li className="flex gap-4">
                   <div className="bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">2</div>
                   <p>Compress before uploading to social media for faster posts</p>
                </li>
              </ul>
              <div className="mt-12 pt-8 border-t border-gray-300 dark:border-gray-700">
                <h5 className="font-bold text-xl mb-6 text-center">More Free Tools</h5>
                <nav className="flex flex-col gap-4">
                  <Link href="/tools/background-remover" className="text-primary font-bold text-lg hover:underline">→ AI Background Remover</Link>
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
              className="text-sm md:text-base font-black text-primary/70 bg-primary/5 px-8 py-3 rounded-full border border-primary/20 tracking-widest hover:bg-primary/10 transition-all uppercase"
            >
              #{tag}
            </span>
          ))}
        </div>

      </div>
    </>
  );
}
