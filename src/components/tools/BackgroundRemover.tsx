'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import type { Metadata } from 'next';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Upload, Download, Loader2, Image as ImageIcon, Trash2, ChevronDown } from 'lucide-react';
import { handleBackgroundRemoval } from '@/app/actions';

// ✅ Page-level SEO metadata with high-search keywords
export const metadata: Metadata = {
  title: 'Free Online Background Remover Tool | TaskGuru',
  description:
    "Remove image backgrounds instantly with TaskGuru's free online background remover. Upload JPG, PNG, WEBP and download transparent images in seconds. 100% Free AI-powered background eraser.",
  keywords: [
    'free online background remover',
    'remove background from image',
    'AI background remover',
    'transparent background maker',
    'remove bg online',
    'image background remover tool',
    'jpg png webp background remover',
    'free background eraser',
    'online photo background remover',
    'TaskGuru background remover'
  ],
  robots: 'index, follow',
  alternates: {
    canonical: 'https://taskguru.online/tools/background-remover',
  },
  openGraph: {
    title: 'Free Online Background Remover Tool | TaskGuru',
    description:
      'Erase image backgrounds instantly using TaskGuru’s free AI-powered background remover tool. Upload PNG, JPG, WEBP and download transparent images without signup.',
    url: 'https://taskguru.online/tools/background-remover',
    siteName: 'TaskGuru',
    images: [
      {
        url: 'https://taskguru.online/assets/bg-remover-og.png',
        width: 1200,
        height: 630,
        alt: 'Background Remover Tool',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Online Background Remover | TaskGuru',
    description:
      'Remove photo backgrounds instantly with TaskGuru’s free online AI tool. Supports JPG, PNG, WEBP and downloads as transparent background.',
    images: ['https://taskguru.online/assets/bg-remover-og.png'],
  },
};

export default function BackgroundRemover() {
  const { toast } = useToast();
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
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
        setOriginalImage(e.target?.result as string);
        setProcessedImage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!originalImage) {
      toast({
        title: "No image selected",
        description: "Please upload an image first.",
        variant: "destructive",
      });
      return;
    }
    setIsLoading(true);
    setProcessedImage(null);
    const result = await handleBackgroundRemoval(originalImage);
    setIsLoading(false);

    if (result.success && result.data?.backgroundRemovedDataUri) {
      setProcessedImage(result.data.backgroundRemovedDataUri);
      toast({ title: "Success!", description: "Background removed successfully." });
    } else {
      toast({ title: "Error", description: result.error, variant: "destructive" });
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
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-12">
      {/* ✅ H1 SEO Optimized */}
      <h1 className="text-3xl font-bold text-center">
        Free Online Background Remover Tool – Erase Image Backgrounds Instantly
      </h1>
      <p className="text-center text-muted-foreground max-w-2xl mx-auto">
        TaskGuru’s AI-powered background remover helps you erase image backgrounds in seconds.
        Upload your photo (JPG, PNG, WEBP) and download a transparent background instantly.
        100% Free – No signup required.
      </p>

      {/* Main Tool Card */}
      <Card className="w-full max-w-4xl mx-auto shadow-lg">
        <CardContent className="p-6">
          {!originalImage ? (
            <div
              className="flex flex-col items-center justify-center space-y-4 p-12 border-2 border-dashed rounded-lg cursor-pointer hover:border-primary transition-colors"
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="p-4 bg-secondary rounded-full">
                <Upload className="w-10 h-10 text-muted-foreground" />
              </div>
              <div className="text-center">
                <p className="font-semibold">Click to upload or drag and drop</p>
                <p className="text-sm text-muted-foreground">PNG, JPG, WEBP (Max 4MB)</p>
              </div>
              <Input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept="image/png, image/jpeg, image/webp"
                onChange={handleFileChange}
              />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-lg text-center">Original</h3>
                <div className="relative aspect-square w-full rounded-lg overflow-hidden border">
                  <Image src={originalImage} alt="Original image with background" fill className="object-contain" />
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="font-semibold text-lg text-center">Result</h3>
                <div className="relative aspect-square w-full rounded-lg overflow-hidden border bg-muted">
                  {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center flex-col gap-4 bg-background/80 z-10">
                      <Loader2 className="w-12 h-12 animate-spin text-primary" />
                      <p className="text-muted-foreground">Removing background...</p>
                    </div>
                  )}
                  {processedImage ? (
                    <Image src={processedImage} alt="Image without background" fill className="object-contain" />
                  ) : (
                    !isLoading && (
                      <div className="flex items-center justify-center h-full text-muted-foreground">
                        <ImageIcon className="w-16 h-16" />
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          )}
        </CardContent>
        {originalImage && (
          <CardFooter className="flex justify-center gap-4 bg-muted/50 p-4 border-t">
            <Button variant="outline" onClick={handleReset}>
              <Trash2 className="mr-2 h-4 w-4" /> Reset
            </Button>
            <Button onClick={handleSubmit} disabled={isLoading || !!processedImage}>
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="mr-2 h-4 w-4" />
              )}
              Remove Background
            </Button>
            <Button onClick={handleDownload} disabled={!processedImage || isLoading}>
              <Download className="mr-2 h-4 w-4" /> Download
            </Button>
          </CardFooter>
        )}
      </Card>

      {/* ✅ FAQ Section */}
      <section className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6 text-center">❓ Frequently Asked Questions</h2>
        <FAQItem question="Is TaskGuru’s Background Remover free to use?">
          Yes! TaskGuru provides a 100% free online background remover tool. No signup required.
        </FAQItem>
        <FAQItem question="Which file formats are supported?">
          You can upload <strong>JPG, PNG, WEBP</strong> images (up to 4MB).
        </FAQItem>
        <FAQItem question="Do I need to install any software?">
          No. TaskGuru runs entirely in your browser. Just upload and download in seconds.
        </FAQItem>
        <FAQItem question="Is my data safe when I upload images?">
          Yes, your images are processed securely and are not stored on our servers.
        </FAQItem>
        <FAQItem question="Can I remove background from JPG and PNG images?">
          Absolutely! JPG, PNG, and WEBP formats are fully supported.
        </FAQItem>
        <FAQItem question="Is TaskGuru’s background remover AI-powered?">
          Yes, our tool uses AI to detect objects and separate them from the background instantly.
        </FAQItem>
        <FAQItem question="Can I use it on mobile devices?">
          Yes, TaskGuru works on mobile, tablet, and desktop devices.
        </FAQItem>
        <FAQItem question="Does it reduce the image quality?">
          No, TaskGuru keeps your image in high quality while removing the background.
        </FAQItem>
        <FAQItem question="Can I download images with transparent background?">
          Yes, after processing, you can download your image with a transparent background in PNG format.
        </FAQItem>
        <FAQItem question="Do I need to create an account?">
          No signup is required. Just upload, remove the background, and download instantly.
        </FAQItem>
      </section>
    </div>
  );
}

// ✅ Sparkles Icon
const Sparkles = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9.93 13.5A2.25 2.25 0 0 0 12 12a2.25 2.25 0 0 0-2.07-1.5" />
    <path d="M12 2v2" />
    <path d="m4.93 4.93 1.41 1.41" />
    <path d="M20 12h2" />
    <path d="m17.66 17.66 1.41 1.41" />
    <path d="M12 20v2" />
    <path d="m6.34 17.66-1.41 1.41" />
    <path d="M4 12H2" />
    <path d="m19.07 4.93-1.41 1.41" />
  </svg>
);

// ✅ FAQ Accordion Component
function FAQItem({ question, children }: { question: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b py-4">
      <button
        onClick={() => setOpen(!open)}
        className="flex justify-between items-center w-full text-left font-medium text-lg"
      >
        {question}
        <ChevronDown className={`w-5 h-5 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      <div
        className={`mt-2 text-muted-foreground transition-all duration-300 ease-in-out ${
          open ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        {children}
      </div>
    </div>
  );
}
