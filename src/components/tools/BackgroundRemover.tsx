'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import Script from 'next/script';
import Link from 'next/link';

import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

import {
  Upload, Download, Loader2, Trash2, Sparkles,
  CheckCircle2, Layers, Zap
} from 'lucide-react';

import { handleBackgroundRemoval } from '@/app/actions';

// ✅ FIX: Max file size validation
const MAX_FILE_SIZE_MB = 8;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

const compressImage = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = document.createElement('img');
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 1280;
        const scaleSize = MAX_WIDTH / img.width;

        if (scaleSize >= 1) {
          resolve(event.target?.result as string);
          return;
        }

        canvas.width = MAX_WIDTH;
        canvas.height = img.height * scaleSize;

        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'medium';
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        }

        resolve(canvas.toDataURL('image/jpeg', 0.85));
      };
      img.onerror = reject;
    };
    reader.onerror = reject;
  });
};

// ✅ FIX 1: Removed fake ratings
const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "AI Background Remover — TaskGuru",
  "operatingSystem": "All",
  "applicationCategory": "MultimediaApplication",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do I remove the background from a picture for free?",
      "acceptedAnswer": { "@type": "Answer", "text": "Simply upload your image to TaskGuru's AI Background Remover, wait for automatic processing, and download your transparent PNG instantly — no cost, no sign-up required." }
    },
    {
      "@type": "Question",
      "name": "Can I remove backgrounds on my phone?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes! Our tool is fully optimized for mobile devices (iOS and Android). You can upload directly from your camera roll or gallery." }
    },
    {
      "@type": "Question",
      "name": "Is the image quality maintained after background removal?",
      "acceptedAnswer": { "@type": "Answer", "text": "Absolutely. We use advanced AI to ensure edges are sharp and subject resolution remains high quality." }
    },
    {
      "@type": "Question",
      "name": "Do you store my photos after processing?",
      "acceptedAnswer": { "@type": "Answer", "text": "No. Images are processed in real-time and permanently deleted from our servers immediately after your session ends." }
    }
  ]
};

const checkerboardStyle = {
  backgroundImage: `linear-gradient(45deg, #e5e7eb 25%, transparent 25%), 
                    linear-gradient(-45deg, #e5e7eb 25%, transparent 25%), 
                    linear-gradient(45deg, transparent 75%, #e5e7eb 75%), 
                    linear-gradient(-45deg, transparent 75%, #e5e7eb 75%)`,
  backgroundSize: '20px 20px',
  backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
};

export default function BackgroundRemover() {
  const { toast } = useToast();
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast({ title: 'Invalid File', description: 'Please upload a JPG, PNG, or WEBP image.', variant: 'destructive' });
      return;
    }

    // ✅ FIX 2: File size check
    if (file.size > MAX_FILE_SIZE_BYTES) {
      toast({
        title: 'File Too Large',
        description: `Please upload an image smaller than ${MAX_FILE_SIZE_MB}MB.`,
        variant: 'destructive'
      });
      return;
    }

    setIsLoading(true);
    try {
      const compressedBase64 = await compressImage(file);
      setOriginalImage(compressedBase64);
      setProcessedImage(null);
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to load image. Please try another file.', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!originalImage) {
      toast({ title: 'No image selected', description: 'Please upload an image first.', variant: 'destructive' });
      return;
    }

    setIsLoading(true);
    setProcessedImage(null);

    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Request timeout")), 25000)
    );

    try {
      const result: any = await Promise.race([
        handleBackgroundRemoval(originalImage),
        timeoutPromise
      ]);

      if (result.success && result.data?.backgroundRemovedDataUri) {
        setProcessedImage(result.data.backgroundRemovedDataUri);
        toast({ title: 'Success!', description: 'Background removed successfully.' });
      } else {
        throw new Error(result.error || "Failed to remove background");
      }
    } catch (err: any) {
      const msg = err.message === "Request timeout"
        ? "Server took too long. Please try again with a smaller image."
        : "Server is busy. Please try again in a moment.";
      toast({ title: 'Processing Failed', description: msg, variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (!processedImage) return;
    const link = document.createElement('a');
    link.href = processedImage;
    link.download = `bg-removed-taskguru-${Date.now()}.png`;
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

  return (
    <>
      {/* ✅ FIX 3: Removed <Head> — doesn't work in App Router */}
      {/* Metadata is handled in tools/[slug]/page.tsx generateMetadata */}

      <Script id="bg-remover-software-schema" type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <Script id="bg-remover-faq-schema" type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="space-y-16">

        {/* Subtitle */}
        <div className="text-center max-w-2xl mx-auto mt-4 mb-8">
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Make images transparent instantly. 100% Free, Automatic, and High-Quality.
          </p>
        </div>

        {/* TOOL UI */}
        <Card className="max-w-5xl mx-auto shadow-xl border-t-4 border-t-primary mt-8">
          <CardContent className="p-8">
            {!originalImage ? (
              <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-16 text-center cursor-pointer hover:bg-muted/30 transition-all duration-300 w-full h-80 group">
                <div className="p-4 bg-primary/10 rounded-full mb-4 group-hover:scale-110 transition-transform">
                  <Upload className="w-12 h-12 text-primary" />
                </div>
                <p className="font-bold text-2xl mb-2">Upload an Image</p>
                <p className="text-muted-foreground mb-4">Drag & drop or tap to select (JPG, PNG, WEBP · Max {MAX_FILE_SIZE_MB}MB)</p>
                <span className="px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium">
                  Choose Photo
                </span>
                <Input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </label>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <h3 className="font-semibold text-lg flex items-center">
                    <Layers className="w-4 h-4 mr-2" /> Original Image
                  </h3>
                  <div className="relative aspect-square w-full border rounded-xl overflow-hidden bg-gray-50 dark:bg-gray-900 shadow-inner">
                    <Image src={originalImage} alt="Original uploaded photo" fill style={{ objectFit: "contain" }} unoptimized />
                  </div>
                </div>
                <div className="space-y-3">
                  <h3 className="font-semibold text-lg flex items-center text-green-600 dark:text-green-400">
                    <Sparkles className="w-4 h-4 mr-2" /> Transparent Result
                  </h3>
                  <div className="relative aspect-square w-full border rounded-xl overflow-hidden shadow-inner" style={checkerboardStyle}>
                    {isLoading ? (
                      <div className="flex flex-col items-center justify-center h-full bg-white/50 dark:bg-black/50">
                        <Loader2 className="animate-spin w-12 h-12 mb-4 text-primary" />
                        <p className="font-medium text-lg text-muted-foreground">Removing background...</p>
                      </div>
                    ) : processedImage ? (
                      <Image src={processedImage} alt="Background removed result" fill style={{ objectFit: "contain" }} unoptimized />
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full text-muted-foreground opacity-60">
                        <Sparkles className="w-16 h-16 mb-4" />
                        <p className="font-medium">Click &quot;Remove Background&quot; to process</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </CardContent>

          {originalImage && (
            <CardFooter className="flex flex-col sm:flex-row justify-center gap-4 bg-muted/20 p-6">
              <Button variant="ghost" size="lg" className="text-red-500" onClick={handleReset} disabled={isLoading}>
                <Trash2 className="w-5 h-5 mr-2" /> Reset
              </Button>
              {!processedImage ? (
                <Button size="lg" className="min-w-[200px]" onClick={handleSubmit} disabled={isLoading}>
                  {isLoading
                    ? <><Loader2 className="animate-spin w-5 h-5 mr-2" /> Processing...</>
                    : <><Zap className="w-5 h-5 mr-2" /> Remove Background Now</>
                  }
                </Button>
              ) : (
                <Button size="lg" className="bg-green-600 hover:bg-green-700 min-w-[200px]" onClick={handleDownload}>
                  <Download className="w-5 h-5 mr-2" /> Download HD PNG
                </Button>
              )}
            </CardFooter>
          )}
        </Card>

        {/* BEFORE & AFTER — images confirmed to exist in /public */}
        <section className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">See the Magic: Before & After</h2>
            <p className="text-muted-foreground">Experience pixel-perfect precision with our AI technology.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <p className="text-xs font-bold uppercase tracking-widest text-center text-gray-400">Before</p>
              <Image
                src="/tool-previews/bg-remover-before.png"
                alt="Image before background removal"
                width={600} height={400}
                className="rounded-2xl border shadow-lg w-full"
              />
            </div>
            <div className="space-y-2">
              <p className="text-xs font-bold uppercase tracking-widest text-center text-gray-400">After</p>
              <div className="rounded-2xl border shadow-lg overflow-hidden" style={checkerboardStyle}>
                <Image
                  src="/tool-previews/bg-remover-after.png"
                  alt="Image after background removal — transparent PNG"
                  width={600} height={400}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </section>

        {/* SEO ARTICLE */}
        <article className="max-w-4xl mx-auto px-4 py-10 space-y-12 text-gray-700 dark:text-gray-300 leading-relaxed">

          <section className="space-y-5">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              The Ultimate Free Online Background Remover for Everyone
            </h2>
            <p className="text-lg">
              In today&apos;s digital-first world, visual content is king. Whether you are an
              e-commerce seller listing products on Amazon, a social media influencer creating
              stunning Instagram stories, or a professional designing a corporate presentation,
              having clear, high-quality images is non-negotiable. This is where{" "}
              <strong>TaskGuru&apos;s AI Background Remover</strong> comes in — a powerful, free,
              and instant solution to remove backgrounds from images online.
            </p>
            <p className="text-lg">
              Gone are the days of expensive software like Adobe Photoshop or complex technical
              skills. Our tool leverages state-of-the-art <strong>Artificial Intelligence</strong>{" "}
              and Machine Learning to detect your photo&apos;s subject automatically. Within seconds,
              it isolates the foreground — be it a person, car, pet, or product — and completely
              erases the background, leaving you with a clean transparent PNG ready for any use.
            </p>
            <p className="text-base text-gray-600 dark:text-gray-400">
              After processing, you might want to optimize your image for the web.{" "}
              <Link href="/tools/image-compressor" className="text-primary font-semibold hover:underline">
                Try our free Image Compressor
              </Link>{" "}
              to reduce file size without losing quality.
            </p>
          </section>

          <section className="space-y-5 bg-gray-50 dark:bg-gray-800/50 p-8 rounded-2xl border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              How Does AI Background Removal Work?
            </h2>
            <p>
              Unlike manual &quot;magic wand&quot; tools that rely on simple color contrast, our AI uses{" "}
              <strong>Semantic Segmentation</strong> — a computer vision technique where every single
              pixel is analyzed and labeled as either &quot;Subject&quot; or &quot;Background.&quot;
            </p>
            <ul className="grid md:grid-cols-2 gap-4 mt-2">
              {[
                { title: "Edge Detection", desc: "The AI identifies fine subject boundaries, ensuring smooth cutouts even around hair and complex edges." },
                { title: "Depth Analysis", desc: "Distinguishes foreground from background even when colors are similar." },
                { title: "Transparency Handling", desc: "Intelligently manages semi-transparent objects like glass or fabric." },
                { title: "Auto-Correction", desc: "Final output is refined to remove any jagged edges or halos." },
              ].map((item) => (
                <li key={item.title} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm"><strong>{item.title}:</strong> {item.desc}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="space-y-5">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Step-by-Step: How to Make a Background Transparent
            </h2>
            <div className="space-y-5">
              {[
                {
                  title: "Upload Your Image",
                  desc: "Click the upload box or drag and drop your file. We support JPG, PNG, and WEBP up to 8MB.",
                },
                {
                  title: "Automatic AI Processing",
                  desc: "Our neural network analyzes and removes the background automatically. No manual selection needed.",
                },
                {
                  title: "Download Transparent PNG",
                  desc: "Within seconds your transparent image appears. Click 'Download HD PNG' to save it to your device.",
                },
              ].map((step, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0 text-sm">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-gray-900 dark:text-white mb-1">{step.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ✅ FIX 4: Removed spammy hashtags — replaced with clean related tools */}
          <section className="border-t border-gray-200 dark:border-gray-700 pt-8">
            <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">
              Related Free Tools
            </p>
            <div className="flex flex-wrap gap-3">
              {[
                { label: "Image Compressor", href: "/tools/image-compressor" },
                { label: "Image to PDF", href: "/tools/image-to-pdf" },
                { label: "Image to Text OCR", href: "/tools/image-to-text" },
                { label: "Merge PDF", href: "/tools/merge-pdf" },
              ].map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="px-4 py-2 bg-primary/5 border border-primary/20 text-primary rounded-full text-sm font-semibold hover:bg-primary/10 transition-colors"
                >
                  {tool.label} →
                </Link>
              ))}
            </div>
          </section>

        </article>
      </div>
    </>
  );
}
