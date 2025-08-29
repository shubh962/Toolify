'use client';
import { useState, useRef } from 'react';
import Image from 'next/image';
import type { Metadata } from 'next';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import {
  Upload,
  Download,
  Loader2,
  Trash2,
  Wand2,
  ImageIcon,
  ChevronDown,
} from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';

// ✅ Page-level SEO metadata
export const metadata: Metadata = {
  title: 'Free Online Image Compressor Tool | TaskGuru',
  description:
    "Compress JPG, PNG, WEBP images online with TaskGuru's free AI-powered image compressor. Reduce image file size without losing quality. Fast, secure & 100% free.",
  keywords: [
    'free image compressor',
    'compress jpg online',
    'compress png online',
    'webp compressor',
    'reduce image file size',
    'image optimizer',
    'online photo compressor',
    'TaskGuru image tools'
  ],
  robots: 'index, follow',
  alternates: {
    canonical: 'https://taskguru.online/tools/image-compressor',
  },
  openGraph: {
    title: 'Free Online Image Compressor Tool | TaskGuru',
    description:
      'Compress images online using TaskGuru’s free AI-powered tool. Supports JPG, PNG, and WEBP formats. Reduce size without losing quality.',
    url: 'https://taskguru.online/tools/image-compressor',
    siteName: 'TaskGuru',
    images: [
      {
        url: 'https://taskguru.online/assets/og-image-compressor.png',
        width: 1200,
        height: 630,
        alt: 'Free Image Compressor Tool',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Online Image Compressor | TaskGuru',
    description:
      'Reduce image file size instantly with TaskGuru’s free online image compressor. Works with JPG, PNG, WEBP formats.',
    images: ['https://taskguru.online/assets/og-image-compressor.png'],
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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast({
          title: 'Invalid file type',
          description: 'Please upload an image file (PNG, JPG, WEBP).',
          variant: 'destructive',
        });
        return;
      }
      setOriginalFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setOriginalImage(e.target?.result as string);
        setCompressedImage(null);
        setCompressedSize(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const compressImage = () => {
    if (!originalImage || !originalFile) return;

    setIsLoading(true);
    setCompressedImage(null);
    setCompressedSize(null);

    const img = document.createElement('img');
    img.src = originalImage;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        toast({
          title: 'Error',
          description: 'Could not process image.',
          variant: 'destructive',
        });
        setIsLoading(false);
        return;
      }
      ctx.drawImage(img, 0, 0);

      const compressedDataUrl = canvas.toDataURL('image/jpeg', quality / 100);
      setCompressedImage(compressedDataUrl);

      const blob = atob(compressedDataUrl.split(',')[1]);
      const size = blob.length;
      setCompressedSize(size);

      setIsLoading(false);
      toast({
        title: 'Success!',
        description: 'Image compressed successfully.',
      });
    };
    img.onerror = () => {
      toast({
        title: 'Error',
        description: 'Failed to load image for compression.',
        variant: 'destructive',
      });
      setIsLoading(false);
    };
  };

  const handleDownload = () => {
    if (!compressedImage) return;
    const link = document.createElement('a');
    link.href = compressedImage;
    link.download = `compressed-${originalFile?.name.replace(/\.[^/.]+$/, '')}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleReset = () => {
    setOriginalImage(null);
    setOriginalFile(null);
    setCompressedImage(null);
    setCompressedSize(null);
    setIsLoading(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatBytes = (bytes: number | null, decimals = 2) => {
    if (bytes === null) return 'N/A';
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-12">
      {/* ✅ SEO H1 Heading */}
      <h1 className="text-3xl font-bold text-center">
        Free Online Image Compressor – Reduce JPG, PNG, WEBP File Size Instantly
      </h1>
      <p className="text-center text-muted-foreground max-w-2xl mx-auto">
        TaskGuru’s AI-powered Image Compressor reduces file size while keeping your photos sharp.
        Upload JPG, PNG, or WEBP images and download a lightweight version instantly. 100% Free – No signup required.
      </p>

      {/* Main Tool */}
      <Card className="w-full max-w-5xl mx-auto shadow-lg">
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
                <p className="text-sm text-muted-foreground">PNG, JPG, WEBP</p>
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
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg text-center">Original Image</h3>
                  <div className="relative aspect-video w-full rounded-lg overflow-hidden border">
                    <Image src={originalImage} alt="Original" fill className="object-contain" />
                  </div>
                  <p className="text-center text-sm font-medium">
                    {formatBytes(originalFile?.size ?? 0)}
                  </p>
                </div>
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg text-center">Compressed Image</h3>
                  <div className="relative aspect-video w-full rounded-lg overflow-hidden border bg-muted">
                    {isLoading && (
                      <div className="absolute inset-0 flex items-center justify-center flex-col gap-4 bg-background/80 z-10">
                        <Loader2 className="w-12 h-12 animate-spin text-primary" />
                        <p className="text-muted-foreground">Compressing...</p>
                      </div>
                    )}
                    {compressedImage ? (
                      <Image src={compressedImage} alt="Compressed" fill className="object-contain" />
                    ) : (
                      !isLoading && (
                        <div className="flex items-center justify-center h-full text-muted-foreground">
                          <ImageIcon className="w-16 h-16" />
                        </div>
                      )
                    )}
                  </div>
                  <p className="text-center text-sm font-medium text-primary">
                    {formatBytes(compressedSize)}
                  </p>
                </div>
              </div>

              <div className="max-w-md mx-auto space-y-4 pt-4">
                <div className="flex justify-between items-center">
                  <Label htmlFor="quality" className="font-semibold">
                    Quality
                  </Label>
                  <span className="px-2 py-1 text-sm rounded-md bg-secondary text-secondary-foreground font-medium">
                    {quality}%
                  </span>
                </div>
                <Slider
                  id="quality"
                  min={10}
                  max={100}
                  step={5}
                  value={[quality]}
                  onValueChange={(value) => setQuality(value[0])}
                  disabled={isLoading}
                />
              </div>
            </div>
          )}
        </CardContent>

        {originalImage && (
          <CardFooter className="flex justify-center gap-4 bg-muted/50 p-4 border-t">
            <Button variant="outline" onClick={handleReset} disabled={isLoading}>
              <Trash2 className="mr-2 h-4 w-4" /> Reset
            </Button>
            <Button onClick={compressImage} disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Wand2 className="mr-2 h-4 w-4" />
              )}
              Compress
            </Button>
            <Button onClick={handleDownload} disabled={!compressedImage || isLoading}>
              <Download className="mr-2 h-4 w-4" /> Download
            </Button>
          </CardFooter>
        )}
      </Card>

      {/* ✅ FAQ Section */}
      <section className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6 text-center">❓ Frequently Asked Questions</h2>
        <FAQItem question="Is TaskGuru’s Image Compressor free to use?">
          Yes! It’s 100% free and works directly in your browser.
        </FAQItem>
        <FAQItem question="Which file formats are supported?">
          You can upload <strong>JPG, PNG, WEBP</strong> images.
        </FAQItem>
        <FAQItem question="Will compression reduce image quality?">
          No, our tool uses smart compression to reduce size while keeping high quality.
        </FAQItem>
        <FAQItem question="Do I need to create an account?">
          Nope! TaskGuru’s tool works without signup.
        </FAQItem>
        <FAQItem question="Can I adjust the compression level?">
          Yes, you can control image quality from 10% to 100%.
        </FAQItem>
        <FAQItem question="Does it work on mobile devices?">
          Absolutely! It works on desktop, tablet, and mobile.
        </FAQItem>
        <FAQItem question="Is it safe to compress my photos here?">
          Yes. Processing happens in-browser, and your images are never stored on our servers.
        </FAQItem>
      </section>
    </div>
  );
}

// ✅ FAQ Accordion
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
