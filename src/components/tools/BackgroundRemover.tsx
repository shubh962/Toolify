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
} from 'lucide-react';

import { handleBackgroundRemoval } from '@/app/actions';

/* =====================================================
   HELPER: CLIENT-SIDE IMAGE COMPRESSION
   (Fixes Mobile "Payload Too Large" & HEIC Issues)
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
        const MAX_WIDTH = 1500; // Resize huge mobile photos to max 1500px
        const scaleSize = MAX_WIDTH / img.width;
        
        // If image is smaller than max, don't resize
        if (scaleSize >= 1) {
           resolve(event.target?.result as string);
           return;
        }

        canvas.width = MAX_WIDTH;
        canvas.height = img.height * scaleSize;

        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
        
        // Convert to efficient JPEG to save bandwidth
        const dataUrl = canvas.toDataURL('image/jpeg', 0.8); 
        resolve(dataUrl);
      };
      img.onerror = (error) => reject(error);
    };
    reader.onerror = (error) => reject(error);
  });
};

/* =====================================================
   BACKGROUND REMOVER – MOBILE OPTIMIZED VERSION
   ===================================================== */

export default function BackgroundRemover() {
  const { toast } = useToast();

  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // We don't need fileInputRef for the upload click anymore if we use <label>
  const fileInputRef = useRef<HTMLInputElement>(null);

  /* ================= HANDLERS ================= */

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Mobile Validation
    if (!file.type.startsWith('image/')) {
       toast({ title: 'Invalid File', description: 'Please upload an image.', variant: 'destructive' });
       return;
    }

    setIsLoading(true); // Show loading while compressing

    try {
        // 🚀 COMPRESS IMAGE BEFORE SETTING STATE
        // This prevents the browser from crashing on mobile with 12MP photos
        const compressedBase64 = await compressImage(file);
        
        setOriginalImage(compressedBase64);
        setProcessedImage(null);
    } catch (error) {
        toast({ title: 'Error', description: 'Failed to process image.', variant: 'destructive' });
    } finally {
        setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!originalImage) {
      toast({
        title: 'No image selected',
        description: 'Please upload an image first.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    setProcessedImage(null);

    try {
        const result = await handleBackgroundRemoval(originalImage);
        
        if (result.success && result.data?.backgroundRemovedDataUri) {
          setProcessedImage(result.data.backgroundRemovedDataUri);
          toast({ title: 'Success!', description: 'Background removed successfully.' });
        } else {
          toast({ title: 'Error', description: result.error || "Failed to remove background", variant: 'destructive' });
        }
    } catch (err) {
        toast({ title: 'Server Error', description: "Image might be too complex or server is busy.", variant: 'destructive' });
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

  /* ================= FAQ SCHEMA ================= */

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "Is this background remover free?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, TaskGuru Background Remover is 100% free to use." }},
      { "@type": "Question", "name": "Does it work on mobile devices?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, it works perfectly on mobile, tablet, and desktop." }},
      { "@type": "Question", "name": "Are uploaded images stored?", "acceptedAnswer": { "@type": "Answer", "text": "No, images are processed instantly and never stored." }},
      { "@type": "Question", "name": "Can AI remove background from hair accurately?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, the AI handles hair and fine edges with high accuracy." }},
      { "@type": "Question", "name": "Which formats are supported?", "acceptedAnswer": { "@type": "Answer", "text": "JPG, PNG and WEBP formats are supported." }}
    ]
  };

  /* ================= RENDER ================= */

  return (
    <>
      {/* ================= SEO HEAD ================= */}
      <Head>
        <title>AI Background Remover Online | Remove Image Background Free</title>
        <meta
          name="description"
          content="Remove image backgrounds instantly using TaskGuru’s AI Background Remover. Free, fast and accurate background removal online."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://taskguru.online/tools/background-remover" />
      </Head>

      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="space-y-14">

        {/* ================= H1 ================= */}
        <section className="max-w-4xl mx-auto text-center py-6">
          <h1 className="text-4xl font-extrabold">
            AI Background Remover – Remove Image Background Online Free
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Remove photo backgrounds instantly using AI. No signup, no watermark, completely free.
          </p>
        </section>

        {/* ================= TOOL ================= */}
        <Card className="max-w-4xl mx-auto shadow-lg">
          <CardContent className="p-6">

            {!originalImage ? (
              // 🟢 MOBILE FIX: Using <label> instead of div onClick for better touch support
              <label 
                className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-12 text-center cursor-pointer hover:bg-muted/50 transition-colors w-full h-64"
              >
                <Upload className="mx-auto mb-3 w-10 h-10 text-muted-foreground" />
                <p className="font-semibold text-lg">Tap to upload image</p>
                <p className="text-sm text-muted-foreground">Works with Gallery & Camera</p>
                
                {/* 🟢 MOBILE FIX: accept="image/*" allows standard mobile pickers to work better */}
                <Input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  accept="image/*" 
                  onChange={handleFileChange}
                />
              </label>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-center font-semibold mb-2">Original</h3>
                  {/* Image container with fixed aspect ratio prevention */}
                  <div className="relative aspect-square w-full border rounded-md overflow-hidden bg-gray-100">
                      <Image 
                        src={originalImage} 
                        alt="Original" 
                        fill 
                        style={{ objectFit: "contain" }} 
                      />
                  </div>
                </div>
                <div>
                  <h3 className="text-center font-semibold mb-2">Result</h3>
                  <div className="relative aspect-square w-full border rounded-md overflow-hidden bg-[url('/transparent-bg.png')] bg-repeat">
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                            <Loader2 className="animate-spin w-10 h-10 mb-2" />
                            <p className="text-sm">Processing...</p>
                        </div>
                    ) : processedImage ? (
                        <Image 
                            src={processedImage} 
                            alt="Result" 
                            fill 
                            style={{ objectFit: "contain" }} 
                        />
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                             <Sparkles className="w-10 h-10 mb-2 opacity-50" />
                             <p className="text-sm">Ready to remove background</p>
                        </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </CardContent>

          {originalImage && (
            <CardFooter className="flex flex-col sm:flex-row justify-center gap-4">
              <Button variant="outline" className="w-full sm:w-auto" onClick={handleReset} disabled={isLoading}>
                 <Trash2 className="w-4 h-4 mr-2"/> Reset
              </Button>
              
              {!processedImage ? (
                  <Button className="w-full sm:w-auto" onClick={handleSubmit} disabled={isLoading}>
                    {isLoading ? <Loader2 className="animate-spin w-4 h-4 mr-2"/> : <Sparkles className="w-4 h-4 mr-2"/>}
                    Remove Background
                  </Button>
              ) : (
                  <Button className="w-full sm:w-auto bg-green-600 hover:bg-green-700" onClick={handleDownload}>
                    <Download className="w-4 h-4 mr-2"/> Download HD
                  </Button>
              )}
            </CardFooter>
          )}
        </Card>

        {/* ================= BEFORE / AFTER DEMO ================= */}
        <section className="max-w-4xl mx-auto py-10">
          <h2 className="text-2xl font-bold text-center mb-6">
            Before & After Background Removal Example
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative aspect-video rounded-lg overflow-hidden border">
                 <Image src="/tool-previews/bg-remover-before.png" alt="Before" fill style={{objectFit: 'cover'}} />
            </div>
            <div className="relative aspect-video rounded-lg overflow-hidden border">
                 <Image src="/tool-previews/bg-remover-after.png" alt="After" fill style={{objectFit: 'cover'}} />
            </div>
          </div>
        </section>

        {/* ================= HIGH CONTENT (SEO) ================= */}
        <section className="max-w-4xl mx-auto text-lg leading-relaxed space-y-8 px-4">
          <h2 className="text-3xl font-bold">What Is an AI Background Remover?</h2>
          <p>
            An AI background remover is an intelligent image editing tool that automatically detects the subject
            in a photo and separates it from the background. Traditional background removal requires manual
            selection, masking, and editing skills. AI-based tools eliminate this complexity by using
            machine learning models trained on millions of images.
          </p>

          <h2 className="text-3xl font-bold">How AI Background Removal Works</h2>
          <p>
            The AI analyzes pixels, edges, colors, and depth to understand where the subject ends and the background
            begins. It handles complex elements like hair, shadows, and transparent objects far better than
            traditional tools.
          </p>

          <h2 className="text-3xl font-bold">Why Background Removal Is Important</h2>
          <p>
            Clean backgrounds improve visual appeal, professionalism, and user trust. For e-commerce,
            social media, resumes, and websites, background-free images lead to higher engagement and conversions.
          </p>

          <h2 className="text-3xl font-bold">Who Should Use This Tool?</h2>
          <ul className="list-disc ml-6">
            <li>E-commerce sellers creating product photos</li>
            <li>YouTubers and content creators designing thumbnails</li>
            <li>Students and job seekers preparing documents</li>
            <li>Designers and marketers</li>
          </ul>

          <h2 className="text-3xl font-bold">Privacy & Security</h2>
          <p>
            TaskGuru follows a strict zero-storage policy. Uploaded images are processed instantly
            and deleted immediately after processing.
          </p>

          <h2 className="text-3xl font-bold">Related Tools</h2>
          <p>
            Enhance your workflow using
            <Link href="/tools/image-compressor" className="text-primary underline"> Image Compressor</Link>,
            <Link href="/tools/image-to-text-ocr" className="text-primary underline"> Image to Text OCR</Link> and
            <Link href="/tools/pdf-to-word" className="text-primary underline"> PDF to Word Converter</Link>.
          </p>
        </section>

      </div>
    </>
  );
}

