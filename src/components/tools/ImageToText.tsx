'use client';

import { useState, useRef } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';

import { Upload, Loader2, Copy, Trash2, ScanText } from 'lucide-react';

// IMPORTANT: rename import to avoid conflict (Next.js 15 server action calling fix)
import { handleImageToText as serverHandleImageToText } from '@/app/actions';


export default function ImageToText() {
  const { toast } = useToast();

  const [image, setImage] = useState<string | null>(null);
  const [extractedText, setExtractedText] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // ------------------------
  // FILE UPLOAD HANDLER
  // ------------------------
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 4 * 1024 * 1024) {
      toast({
        title: 'File too large',
        description: 'Please upload an image smaller than 4MB.',
        variant: 'destructive',
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setImage(e.target?.result as string);
      setExtractedText('');
    };
    reader.readAsDataURL(file);
  };

  // ------------------------
  // SUBMIT / OCR EXECUTION
  // ------------------------
  const handleSubmit = async () => {
    if (!image) {
      toast({
        title: "No image selected",
        description: "Please upload an image first.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      setExtractedText('');

      console.log("📤 Sending image to server action…");

      // 🔥 FIX: Correct Next.js 15 server action invocation
      const result = await serverHandleImageToText(image);

      console.log("📥 Server returned:", result);

      setIsLoading(false);

      if (result?.success && result.data?.extractedText) {
        setExtractedText(result.data.extractedText);

        toast({
          title: "Success!",
          description: "Text extracted successfully.",
        });
      } else {
        toast({
          title: "Error",
          description: result?.error || "OCR failed.",
          variant: "destructive",
        });
      }
    } catch (err) {
      console.error("❌ Client-side OCR error:", err);
      setIsLoading(false);

      toast({
        title: "Unexpected Error",
        description: "OCR process failed unexpectedly.",
        variant: "destructive",
      });
    }
  };

  // ------------------------
  // COPY TO CLIPBOARD
  // ------------------------
  const handleCopy = () => {
    if (!extractedText) return;
    navigator.clipboard.writeText(extractedText);
    toast({ title: "Copied!" });
  };

  // ------------------------
  // RESET TOOL
  // ------------------------
  const handleReset = () => {
    setImage(null);
    setExtractedText('');
    setIsLoading(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // ------------------------
  // SEO JSON-LD FAQ SCHEMA
  // ------------------------
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Is TaskGuru’s Image to Text OCR tool free?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, it is 100% free with unlimited usage."
        }
      },
      {
        "@type": "Question",
        "name": "Is my uploaded image secure?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Your image is processed securely and never stored."
        }
      }
    ]
  };

  return (
    <>
      <Head>
        <title>Free Image to Text Converter | OCR Online - TaskGuru</title>
        <meta name="description" content="Convert images to text online using free OCR. Supports JPG, PNG, WEBP. Fast, accurate & secure." />
        <link rel="canonical" href="https://taskguru.online/tools/image-to-text" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </Head>

      {/* ---------------------- */}
      {/* INTRO SECTION */}
      {/* ---------------------- */}
      <section className="max-w-4xl mx-auto py-8 text-center space-y-4">
        <h3 className="text-3xl font-bold">Free Image to Text Converter (OCR) Online</h3>
        <p className="text-muted-foreground">
          Upload JPG, PNG, or WEBP and extract readable text instantly.  
          Fast, accurate & secure OCR technology.
        </p>
      </section>

      {/* ---------------------- */}
      {/* MAIN OCR TOOL UI */}
      {/* ---------------------- */}
      <Card className="w-full max-w-4xl mx-auto shadow-lg">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            

            {/* LEFT SIDE → Upload Image */}
            <div className="flex flex-col space-y-4">
              <h3 className="font-semibold text-xl text-center">Upload Image</h3>

              {image ? (
                <div className="relative aspect-video w-full rounded-lg overflow-hidden border">
                  <img src={image} alt="Uploaded" className="object-contain w-full h-full absolute top-0 left-0" />
                </div>
              ) : (
                <div
                  className="flex flex-col items-center justify-center space-y-4 p-12 border-2 border-dashed rounded-lg cursor-pointer hover:border-primary transition"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="w-10 h-10 text-muted-foreground" />
                  <p className="font-semibold">Click to upload</p>
                  <p className="text-sm text-muted-foreground">PNG, JPG, WEBP (Max 4MB)</p>
                </div>
              )}

              <Input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept="image/png, image/jpeg, image/webp"
                onChange={handleFileChange}
              />
            </div>


            {/* RIGHT SIDE → Extracted Text */}
            <div className="flex flex-col space-y-4">
              <h3 className="font-semibold text-lg text-center">Extracted Text Result</h3>

              <div className="relative h-full">
                {isLoading && <Skeleton className="absolute inset-0" />}
                <Textarea
                  className="h-full min-h-[200px] resize-none"
                  placeholder={isLoading ? "Extracting…" : "Text will appear here…"}
                  value={extractedText}
                  readOnly
                />
              </div>

              <Button onClick={handleCopy} disabled={!extractedText || isLoading} variant="outline">
                <Copy className="mr-2 h-4 w-4" /> Copy Text
              </Button>
            </div>
          </div>
        </CardContent>

        {image && (
          <CardFooter className="flex justify-center gap-4 p-4 border-t bg-muted/50">
            <Button variant="outline" onClick={handleReset}>
              <Trash2 className="mr-2 h-4 w-4" /> Reset
            </Button>

            <Button onClick={handleSubmit} disabled={isLoading}>
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <ScanText className="mr-2 h-4 w-4" />}
              Extract Text
            </Button>
          </CardFooter>
        )}
      </Card>

    </>
  );
}
