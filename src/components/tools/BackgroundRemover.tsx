'use client';

import { useState, useRef } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Script from 'next/script';
import Link from 'next/link';

import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

import {
  Upload,
  Download,
  Loader2,
  Image as ImageIcon,
  Trash2,
  Zap,
  ShieldCheck,
} from 'lucide-react';

import { handleBackgroundRemoval } from '@/app/actions';

export default function BackgroundRemover() {
  const { toast } = useToast();

  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 8 * 1024 * 1024) {
      toast({
        title: 'File too large',
        description: 'Max 8MB allowed.',
        variant: 'destructive',
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setOriginalImage(e.target?.result as string);
      setProcessedImage(null);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    if (!originalImage) {
      toast({
        title: 'No image selected',
        description: 'Upload an image first.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    setProcessedImage(null);

    const result = await handleBackgroundRemoval(originalImage);
    setIsLoading(false);

    if (result.success && result.data?.backgroundRemovedDataUri) {
      setProcessedImage(result.data.backgroundRemovedDataUri);
      toast({ title: 'Success!', description: 'Background removed successfully.' });
    } else {
      toast({ title: 'Error', description: result.error, variant: 'destructive' });
    }
  };

  const handleDownload = () => {
    if (!processedImage) return;
    const link = document.createElement('a');
    link.href = processedImage;
    link.download = 'background-removed.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleReset = () => {
    setOriginalImage(null);
    setProcessedImage(null);
    setIsLoading(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  /* ---------------- SCHEMA ---------------- */

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Is TaskGuru AI Background Remover free?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, it is completely free with no signup or hidden charges."
        }
      },
      {
        "@type": "Question",
        "name": "Does it work on mobile phones?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, the tool works smoothly on mobile, tablet, and desktop browsers."
        }
      },
      {
        "@type": "Question",
        "name": "Are uploaded images stored?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. Images are processed instantly and deleted immediately after processing."
        }
      },
      {
        "@type": "Question",
        "name": "Which image formats are supported?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "JPG, PNG, and WEBP formats are supported."
        }
      },
      {
        "@type": "Question",
        "name": "Can AI remove background from hair accurately?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, TaskGuru’s AI handles hair, shadows, and fine edges with high accuracy."
        }
      }
    ]
  };

  const toolSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "AI Background Remover | TaskGuru",
    "applicationCategory": "Multimedia",
    "operatingSystem": "Any",
    "url": "https://taskguru.online/tools/background-remover",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  return (
    <>
      {/* SEO HEAD */}
      <Head>
        <title>AI Background Remover Online | Remove Image Background Free</title>
        <meta
          name="description"
          content="Remove image backgrounds instantly using TaskGuru’s free AI background remover. Upload JPG, PNG or WEBP images and download transparent PNG."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://taskguru.online/tools/background-remover" />

        <meta property="og:title" content="AI Background Remover Tool | TaskGuru" />
        <meta
          property="og:description"
          content="Erase image backgrounds online instantly using TaskGuru’s AI-powered background remover."
        />
        <meta property="og:url" content="https://taskguru.online/tools/background-remover" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="TaskGuru" />
      </Head>

      {/* SCHEMA */}
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Script
        id="tool-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema) }}
      />

      <div className="space-y-14">

        {/* H1 */}
        <section className="max-w-4xl mx-auto text-center py-6">
          <h1 className="text-4xl font-extrabold">
            AI Background Remover – Remove Image Background Online Free
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            TaskGuru’s AI-powered background remover helps you erase image backgrounds instantly with professional accuracy.
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
                <p className="font-semibold">Click to upload image</p>
                <p className="text-sm text-muted-foreground">JPG, PNG, WEBP • Max 8MB</p>
                <Input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  accept="image/png,image/jpeg,image/webp"
                  onChange={handleFileChange}
                />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <img src={originalImage} alt="Original image" />
                {isLoading ? (
                  <Loader2 className="animate-spin m-auto" />
                ) : (
                  processedImage && <img src={processedImage} alt="Background removed image" />
                )}
              </div>
            )}
          </CardContent>

          {originalImage && (
            <CardFooter className="flex justify-center gap-4">
              <Button variant="outline" onClick={handleReset}><Trash2 /> Reset</Button>
              <Button onClick={handleSubmit} disabled={isLoading}>Remove Background</Button>
              <Button onClick={handleDownload} disabled={!processedImage}><Download /> Download</Button>
            </CardFooter>
          )}
        </Card>

        {/* HIGH AUTHORITY CONTENT */}
        <section className="max-w-4xl mx-auto space-y-8 text-lg leading-relaxed">

          <h2 className="text-3xl font-bold">What Is an AI Background Remover and How Does It Work?</h2>
          <p>
            An AI background remover is an advanced image editing tool that automatically detects the main subject in a photo and separates it from the background. Unlike traditional tools that require manual selection, AI-based systems analyze pixels, edges, colors, and depth using machine learning models trained on millions of images.
          </p>
          <p>
            TaskGuru’s background remover uses deep neural networks to understand where the subject ends and the background begins. This allows it to accurately remove complex backgrounds, including hair, shadows, and transparent objects, in just seconds.
          </p>

          <h2 className="text-3xl font-bold">AI Background Remover vs Manual Editing Tools</h2>
          <p>
            Manual tools like Photoshop require technical knowledge, time, and paid subscriptions. In contrast, TaskGuru’s AI Background Remover is completely free, instant, and requires no editing skills.
          </p>
          <ul className="list-disc ml-6">
            <li>Manual editing takes minutes or hours</li>
            <li>AI removes background in seconds</li>
            <li>No learning curve or software installation</li>
            <li>Works directly in your browser</li>
          </ul>

          <h2 className="text-3xl font-bold">Who Should Use This Free Online Background Remover?</h2>
          <p>
            This tool is ideal for students, content creators, e-commerce sellers, designers, office professionals, and anyone who needs clean images quickly.
          </p>
          <p>
            YouTubers can create eye-catching thumbnails, online sellers can improve product images, and students can prepare professional documents effortlessly.
          </p>

          <h2 className="text-3xl font-bold">Common Problems in Background Removal (Solved by AI)</h2>
          <p>
            Traditional tools struggle with fine hair, low contrast subjects, and busy backgrounds. TaskGuru’s AI is trained to handle these scenarios with precision, delivering smooth edges and professional-quality results.
          </p>

          <h2 className="text-3xl font-bold">Security, Privacy, and Accuracy</h2>
          <p>
            TaskGuru follows a strict zero-storage policy. Uploaded images are processed instantly and deleted immediately. Your data remains private and secure at all times.
          </p>

        </section>

        {/* INTERNAL LINKS */}
        <section className="max-w-4xl mx-auto text-center">
          <p className="font-semibold">Related Tools:</p>
          <div className="flex justify-center gap-4 mt-3">
            <Link href="/tools/image-compressor">Image Compressor</Link>
            <Link href="/tools/image-to-text-ocr">Image to Text OCR</Link>
            <Link href="/tools/pdf-to-word">PDF to Word Converter</Link>
          </div>
        </section>

      </div>
    </>
  );
                                                                                                 }

