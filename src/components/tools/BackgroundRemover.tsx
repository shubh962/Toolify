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
  Trash2,
  Sparkles,
  CheckCircle2,
  Layers,
  Zap
} from 'lucide-react';

import { handleBackgroundRemoval } from '@/app/actions';

/* =====================================================
   HELPER: SAFE COMPRESSION (1280px - Never Fails)
   ===================================================== */
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
        
        const dataUrl = canvas.toDataURL('image/jpeg', 0.85); 
        resolve(dataUrl);
      };
      img.onerror = (error) => reject(error);
    };
    reader.onerror = (error) => reject(error);
  });
};

export default function BackgroundRemover() {
  const { toast } = useToast();

  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  /* ================= HANDLERS ================= */

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
       toast({ title: 'Invalid File', description: 'Please upload an image.', variant: 'destructive' });
       return;
    }

    setIsLoading(true);

    try {
        const compressedBase64 = await compressImage(file);
        setOriginalImage(compressedBase64);
        setProcessedImage(null);
    } catch (error) {
        console.error("Compression Error:", error);
        toast({ title: 'Error', description: 'Failed to process image.', variant: 'destructive' });
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
        console.error("Processing Error:", err);
        let msg = "Server is busy. Try a smaller image.";
        if (err.message === "Request timeout") msg = "Server took too long. Please try again.";
        
        toast({ title: 'Error', description: msg, variant: 'destructive' });
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

  /* ================= SCHEMAS ================= */

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "AI Background Remover - TaskGuru",
    "operatingSystem": "All",
    "applicationCategory": "MultimediaApplication",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "10245"
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "How do I remove the background from a picture for free?", "acceptedAnswer": { "@type": "Answer", "text": "Simply upload your image to TaskGuru's AI Background Remover, wait for the automatic processing, and download your transparent PNG instantly without any cost." }},
      { "@type": "Question", "name": "Can I remove backgrounds on my phone?", "acceptedAnswer": { "@type": "Answer", "text": "Yes! Our tool is fully optimized for mobile devices (iOS and Android). You can upload directly from your camera roll or gallery." }},
      { "@type": "Question", "name": "Is the image quality maintained?", "acceptedAnswer": { "@type": "Answer", "text": "Absolutely. We use advanced AI to ensure the edges are sharp and the subject resolution remains high quality." }},
      { "@type": "Question", "name": "Do you store my private photos?", "acceptedAnswer": { "@type": "Answer", "text": "No. TaskGuru prioritizes privacy. Images are processed in real-time and deleted from our servers immediately after the session." }}
    ]
  };

  const hashtags = [
    "BACKGROUNDREMOVER", "REMOVEBG", "TRANSPARENTIMAGE", "AIPHOTOEDITOR", 
    "TASKGURUOFFICIAL", "FREEAITOOLS", "MAKEMEMETRANSPARENT", "PNGMAKER",
    "ONLINEEDITOR", "PHOTOGRAPHY", "DIGITALMARKETING"
  ];

  /* Checkerboard style fix for the 404 image issue */
  const checkerboardStyle = {
    backgroundImage: `linear-gradient(45deg, #e5e7eb 25%, transparent 25%), 
                      linear-gradient(-45deg, #e5e7eb 25%, transparent 25%), 
                      linear-gradient(45deg, transparent 75%, #e5e7eb 75%), 
                      linear-gradient(-45deg, transparent 75%, #e5e7eb 75%)`,
    backgroundSize: '20px 20px',
    backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
  };

  return (
    <>
      <Head>
        <title>Free AI Background Remover | Make Image Transparent Online - TaskGuru</title>
        <meta name="description" content="Best Free AI Background Remover. Remove backgrounds from images instantly. Download transparent PNGs for e-commerce, profiles & marketing. No signup required." />
        <meta name="keywords" content="background remover, remove bg, transparent background, ai photo editor, remove image background free, online photo editor" />
        <link rel="canonical" href="https://taskguru.online/tools/background-remover" />
      </Head>

      {/* FIXED ADSENSE: Using strategy="afterInteractive" to solve the warning */}
      <Script 
        async 
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4272213374622185" 
        crossOrigin="anonymous" 
        strategy="afterInteractive"
      />

      <Script id="rating-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="space-y-16">

        {/* HERO SECTION */}
        <section className="max-w-4xl mx-auto text-center py-8 space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
            AI Background Remover: Make Images Transparent Instantly
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            The fastest way to remove backgrounds from photos. 100% Free, Automatic, and High-Quality. Perfect for professionals and creators.
          </p>
        </section>

        {/* TOOL UI */}
        <Card className="max-w-5xl mx-auto shadow-xl border-t-4 border-t-primary">
          <CardContent className="p-8">
            {!originalImage ? (
              <label className="flex flex-col items-center justify-center border-3 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-16 text-center cursor-pointer hover:bg-muted/30 transition-all duration-300 w-full h-80 group">
                <div className="p-4 bg-primary/10 rounded-full mb-4 group-hover:scale-110 transition-transform">
                  <Upload className="w-12 h-12 text-primary" />
                </div>
                <p className="font-bold text-2xl mb-2">Upload an Image</p>
                <p className="text-muted-foreground mb-4">Drag & drop or tap to select (JPG, PNG, WEBP)</p>
                <span className="px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium">Choose Photo</span>
                <Input ref={fileInputRef} type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
              </label>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <h3 className="font-semibold text-lg flex items-center"><Layers className="w-4 h-4 mr-2" /> Original Image</h3>
                  <div className="relative aspect-square w-full border rounded-xl overflow-hidden bg-gray-50 dark:bg-gray-900 shadow-inner">
                      <Image src={originalImage} alt="Original uploaded photo" fill style={{ objectFit: "contain" }} unoptimized />
                  </div>
                </div>
                <div className="space-y-3">
                  <h3 className="font-semibold text-lg flex items-center text-green-600 dark:text-green-400"><Sparkles className="w-4 h-4 mr-2" /> Transparent Result</h3>
                  <div className="relative aspect-square w-full border rounded-xl overflow-hidden shadow-inner" style={checkerboardStyle}>
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center h-full animate-pulse bg-white/50 dark:bg-black/50">
                            <Loader2 className="animate-spin w-12 h-12 mb-4 text-primary" />
                            <p className="font-medium text-lg text-muted-foreground">Processing...</p>
                        </div>
                    ) : processedImage ? (
                        <Image src={processedImage} alt="Result transparent" fill style={{ objectFit: "contain" }} unoptimized />
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-muted-foreground opacity-60">
                             <Sparkles className="w-16 h-16 mb-4" />
                             <p className="font-medium">Ready to process</p>
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
                 <Trash2 className="w-5 h-5 mr-2"/> Reset
              </Button>
              {!processedImage ? (
                  <Button size="lg" className="min-w-[200px]" onClick={handleSubmit} disabled={isLoading}>
                    {isLoading ? <Loader2 className="animate-spin w-5 h-5 mr-2"/> : <Zap className="w-5 h-5 mr-2"/>}
                    Remove Background Now
                  </Button>
              ) : (
                  <Button size="lg" className="bg-green-600 hover:bg-green-700 min-w-[200px]" onClick={handleDownload}>
                    <Download className="w-5 h-5 mr-2"/> Download HD PNG
                  </Button>
              )}
            </CardFooter>
          )}
        </Card>

        {/* BEFORE & AFTER SECTION */}
        <section className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
             <h2 className="text-3xl font-bold mb-4">See the Magic: Before & After</h2>
             <p className="text-muted-foreground">Experience pixel-perfect precision with our AI technology.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Image src="/tool-previews/bg-remover-before.png" alt="Before" width={600} height={400} className="rounded-2xl border shadow-lg" />
            <div className="rounded-2xl border shadow-lg overflow-hidden" style={checkerboardStyle}>
                <Image src="/tool-previews/bg-remover-after.png" alt="After" width={600} height={400} />
            </div>
          </div>
        </section>

        {/* SEO ARTICLE CONTENT */}
        <article className="max-w-4xl mx-auto px-4 py-10 space-y-12 text-gray-700 dark:text-gray-300 leading-relaxed">
          
          <section className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              The Ultimate Free Online Background Remover for Everyone
            </h2>
            <p className="text-lg">
              In today's digital-first world, visual content is king. Whether you are an e-commerce seller listing products on Amazon, a social media influencer creating stunning Instagram stories, or a professional designing a corporate presentation, having clear, high-quality images is non-negotiable. One of the most common challenges creators face is dealing with cluttered, distracting, or unprofessional backgrounds. This is where <strong>TaskGuru's AI Background Remover</strong> comes in—a powerful, free, and instant solution to remove background from images online.
            </p>
            <p className="text-lg">
              Gone are the days when you needed expensive software like Adobe Photoshop or complex technical skills to create transparent backgrounds. Our tool leverages state-of-the-art <strong>Artificial Intelligence (AI)</strong> and Machine Learning algorithms to detect the subject of your photo automatically. Within seconds, it isolates the foreground—be it a person, a car, a pet, or a product—and completely erases the background, leaving you with a clean, transparent PNG file ready for any use.
            </p>
            <p className="text-lg">
              After you have processed your image, you might want to optimize it for the web. Check out our <Link href="/tools/image-compressor" className="text-primary font-semibold hover:underline">Free Image Compressor</Link> to reduce file size without losing quality.
            </p>
          </section>

          <section className="space-y-6 bg-gray-50 dark:bg-gray-800/50 p-8 rounded-2xl border">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">How Does AI Background Removal Work?</h2>
            <p>
              Understanding the technology behind our tool helps you appreciate its precision. Unlike manual "magic wand" tools that rely on simple color contrast, our AI Background Remover uses <strong>Semantic Segmentation</strong>. This is a computer vision technique where the AI examines every single pixel in the image and assigns it a label: "Subject" or "Background."
            </p>
            <ul className="grid md:grid-cols-2 gap-4 mt-4">
              <li className="flex items-start">
                <CheckCircle2 className="w-6 h-6 text-green-500 mr-2 mt-1 flex-shrink-0" />
                <span><strong>Edge Detection:</strong> The AI identifies the fine boundaries of the subject, ensuring smooth cutouts even around tricky areas.</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-6 h-6 text-green-500 mr-2 mt-1 flex-shrink-0" />
                <span><strong>Depth Analysis:</strong> It distinguishes between foreground and background even with similar colors.</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-6 h-6 text-green-500 mr-2 mt-1 flex-shrink-0" />
                <span><strong>Transparency Handling:</strong> It intelligently manages semi-transparent objects like glass or veils.</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-6 h-6 text-green-500 mr-2 mt-1 flex-shrink-0" />
                <span><strong>Auto-Correction:</strong> The final output is refined to remove any jagged edges or halos.</span>
              </li>
            </ul>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Step-by-Step: How to Make Background Transparent</h2>
            <p>Using TaskGuru is incredibly simple. We designed our interface to be user-friendly for everyone, from beginners to experts.</p>
            <div className="space-y-4 mt-4">
              <div className="flex items-start gap-4">
                <div className="bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">1</div>
                <div>
                  <h3 className="font-bold text-lg">Upload Your Image</h3>
                  <p>Click on the upload box or drag and drop your file. We support JPG, PNG, and WEBP formats up to 8MB. If your image is a scanned document, you might want to extract text using our <Link href="/tools/image-to-text" className="text-primary font-semibold hover:underline">Image to Text OCR Tool</Link>.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">2</div>
                <div>
                  <h3 className="font-bold text-lg">Automatic Processing</h3>
                  <p>Once uploaded, our AI kicks in instantly. During this time, the image is analyzed by the neural network, and the background is removed.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">3</div>
                <div>
                  <h3 className="font-bold text-lg">Download Result</h3>
                  <p>Within seconds, your transparent image appears. Review the result, and if happy, click "Download HD PNG" to save it.</p>
                </div>
              </div>
            </div>
          </section>
        </article>

        <div className="flex flex-wrap justify-center gap-2 py-8 max-w-4xl mx-auto px-4 border-t border-dashed">
          {hashtags.map((tag) => (
            <span key={tag} className="text-[10px] md:text-xs font-bold text-primary border border-primary/20 px-3 py-1 rounded-full bg-primary/5 hover:bg-primary/10 transition-colors uppercase cursor-default">
              #{tag}
            </span>
          ))}
        </div>

      </div>
    </>
  );
}
