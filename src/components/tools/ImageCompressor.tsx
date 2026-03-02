'use client';

import { useState, useRef } from 'react';
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
  Upload, Download, Loader2, Trash2, Wand2,
  SlidersHorizontal, CheckCircle2, Zap, ShieldCheck,
  Globe, Info, Smartphone, Camera, Mail, Users,
} from 'lucide-react';

// ✅ FIX 1: Removed fake ratings
const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Free Image Compressor Online — TaskGuru',
  operatingSystem: 'All',
  applicationCategory: 'MultimediaApplication',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
};

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
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith('image/')) {
      toast({ title: 'Invalid file', description: 'Please upload JPG, PNG or WEBP images only.', variant: 'destructive' });
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      toast({ title: 'File too large', description: 'Please upload images smaller than 10MB.', variant: 'destructive' });
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

  // ✅ FIX 2: Renamed to handleCompress to avoid naming confusion
  // ✅ FIX 3: Added img.onerror so loading state never gets stuck
  const handleCompress = () => {
    if (!originalImage || !originalFile) return;
    setIsLoading(true);

    const img = document.createElement('img');
    img.src = originalImage;

    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          setIsLoading(false);
          toast({ title: 'Error', description: 'Canvas not supported in your browser.', variant: 'destructive' });
          return;
        }

        ctx.drawImage(img, 0, 0);
        const output = canvas.toDataURL('image/jpeg', quality / 100);
        const finalSize = Math.round((output.length - 'data:image/jpeg;base64,'.length) * 3 / 4);

        setCompressedImage(output);
        setCompressedSize(finalSize);
        setIsLoading(false);

        const reduction = ((1 - finalSize / originalFile.size) * 100).toFixed(0);
        toast({
          title: 'Compression Successful!',
          description: `Your image is now ${reduction}% smaller without noticeable quality loss.`,
        });
      } catch {
        setIsLoading(false);
        toast({ title: 'Compression Failed', description: 'Please try a different image.', variant: 'destructive' });
      }
    };

    // ✅ FIX 3: Error handler — prevents infinite loading state
    img.onerror = () => {
      setIsLoading(false);
      toast({ title: 'Error', description: 'Failed to load the image. Please try another file.', variant: 'destructive' });
    };
  };

  const handleDownload = () => {
    if (!compressedImage || !originalFile) return;
    const link = document.createElement('a');
    link.href = compressedImage;
    link.download = `compressed-taskguru-${originalFile.name}`;
    link.click();
  };

  const handleReset = () => {
    setOriginalImage(null);
    setOriginalFile(null);
    setCompressedImage(null);
    setCompressedSize(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <>
      <Script
        id="image-compressor-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />

      <div className="max-w-6xl mx-auto px-4 space-y-24 text-gray-800 dark:text-gray-100">

        {/* TOOL UI */}
        <Card className="shadow-2xl border-t-8 border-primary rounded-3xl overflow-hidden mt-8">
          <CardContent className="p-8 md:p-12">
            {!originalImage ? (
              <div
                className="group border-4 border-dashed border-gray-200 dark:border-gray-800 rounded-3xl p-20 text-center cursor-pointer hover:bg-primary/5 transition-all"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="w-20 h-20 text-primary mx-auto mb-8" />
                <h2 className="text-4xl font-bold mb-4">Upload Your Image to Compress</h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Drag & drop or click to select JPG, PNG, or WebP files (up to 10MB)
                </p>
                <Button size="lg" className="rounded-full px-16 text-xl shadow-xl">
                  Choose Image
                </Button>
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
                      <Image src={originalImage} alt="Original uploaded image" fill className="object-contain" unoptimized />
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
                          <Image src={compressedImage} alt="Compressed image result" fill className="object-contain" unoptimized />
                          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-primary text-white px-6 py-2 rounded-full text-lg font-bold shadow-lg">
                            {formatBytes(compressedSize)}
                          </div>
                        </>
                      ) : (
                        <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                          <Zap className="w-20 h-20 mb-4" />
                          <p className="text-xl">Adjust quality and click Compress!</p>
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
                      min={10} max={100} step={5}
                      value={[quality]}
                      onValueChange={v => setQuality(v[0])}
                      className="py-4"
                    />
                    <p className="text-center text-muted-foreground flex items-center justify-center gap-2">
                      <Info className="w-5 h-5" />
                      Most people choose 75–85% for the best balance of size and quality.
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
                // ✅ FIX 2: Updated onClick to handleCompress
                <Button size="lg" onClick={handleCompress} className="rounded-full px-16 text-xl shadow-2xl">
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

            <section className="space-y-5">
              <h2 className="text-3xl font-black text-gray-900 dark:text-white">
                Why Should You Compress Your Images?
              </h2>
              <p>
                Big image files make everything slower: your website takes longer to load, emails
                won&apos;t send, social media uploads fail, and your phone runs out of storage quickly.
              </p>
              <p>
                Compressing images makes them smaller without making them look worse. You get the
                same beautiful photos but with tiny file sizes — perfect for sharing, uploading,
                and saving space.
              </p>
            </section>

            <section className="bg-primary/5 p-12 rounded-3xl space-y-8">
              <h2 className="text-3xl font-bold flex items-center justify-center gap-4">
                <Globe className="text-primary w-10 h-10" /> Great for Everyone
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  { icon: <Smartphone className="w-12 h-12 text-primary" />, title: "Phone Users", desc: "Free up storage and share photos faster on WhatsApp, Instagram, and more." },
                  { icon: <Camera className="w-12 h-12 text-primary" />, title: "Bloggers & Photographers", desc: "Upload high-quality images quickly without waiting for heavy files to transfer." },
                  { icon: <Mail className="w-12 h-12 text-primary" />, title: "Email Attachments", desc: "Send multiple photos easily — no more 'file too large' errors in your inbox." },
                  { icon: <Users className="w-12 h-12 text-primary" />, title: "Website Owners", desc: "Make your site load instantly, improve UX, and rank higher on Google search results." },
                ].map((item) => (
                  <div key={item.title} className="flex flex-col items-center text-center space-y-3">
                    {item.icon}
                    <h4 className="text-xl font-bold">{item.title}</h4>
                    <p className="text-base text-gray-600 dark:text-gray-400">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-5">
              <h2 className="text-3xl font-black flex items-center gap-4 text-gray-900 dark:text-white">
                <ShieldCheck className="text-primary w-10 h-10" /> 100% Safe & Private
              </h2>
              <p>
                Your images never leave your device! All compression happens right in your browser —
                no uploads to servers, no storage, nothing saved. As soon as you close the page,
                everything is gone.
              </p>
              <p>
                No signup, no email, no tracking — just fast, free compression whenever you need it.
                TaskGuru prioritizes your data privacy above all else.
              </p>
            </section>

            <section className="space-y-5">
              <h2 className="text-3xl font-black text-gray-900 dark:text-white">
                How to Use This Free Image Compressor
              </h2>
              <ol className="list-decimal list-inside space-y-4">
                <li>Click <strong>&quot;Choose Image&quot;</strong> or drag your photo into the upload area.</li>
                <li>Adjust the <strong>quality slider</strong> if you want (80% is recommended).</li>
                <li>Click <strong>&quot;Compress Image Now&quot;</strong> and wait a split second.</li>
                <li>Review the file size reduction and click <strong>&quot;Download Compressed Image&quot;</strong>.</li>
              </ol>
              <p>That&apos;s it — simple, fast, and completely free forever!</p>
            </section>
          </div>

          {/* SIDEBAR */}
          <aside className="space-y-10">
            <div className="bg-secondary/30 p-10 rounded-3xl border-2 border-dashed border-gray-200 dark:border-gray-800">
              <h4 className="text-2xl font-black mb-8 text-center">Quick Tips</h4>
              <ul className="space-y-6">
                {[
                  "Use 75–85% quality for the best size vs quality balance.",
                  "Compress before uploading to social media for lightning-fast posts.",
                  "Smaller images mean faster emails and less mobile data usage.",
                  "Essential for product photos on Shopify, Amazon, and online stores.",
                ].map((tip, i) => (
                  <li key={i} className="flex gap-4">
                    <div className="bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0 text-sm">
                      {i + 1}
                    </div>
                    <p className="text-sm leading-relaxed">{tip}</p>
                  </li>
                ))}
              </ul>

              <div className="mt-10 pt-8 border-t border-gray-300 dark:border-gray-700">
                <h5 className="font-bold text-xl mb-5 text-center">More Free Tools</h5>
                {/* ✅ FIX 4: Replaced hashtags with clean related tool links */}
                <nav className="flex flex-col gap-3">
                  <Link href="/tools/background-remover" className="text-primary font-bold hover:underline">
                    → AI Background Remover
                  </Link>
                  <Link href="/tools/image-to-text" className="text-primary font-bold hover:underline">
                    → Photo to Text (OCR)
                  </Link>
                  <Link href="/tools/pdf-to-word" className="text-primary font-bold hover:underline">
                    → PDF to Word Converter
                  </Link>
                  <Link href="/tools/image-to-pdf" className="text-primary font-bold hover:underline">
                    → Image to PDF
                  </Link>
                </nav>
              </div>
            </div>
          </aside>
        </article>

      </div>
    </>
  );
        }
