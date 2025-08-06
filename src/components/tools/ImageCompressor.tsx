'use client';
import { useState, useRef } from 'react';
import Head from 'next/head';
import Image from 'next/image';
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
} from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';

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

      const compressedDataUrl = canvas.toDataURL(
        'image/jpeg',
        quality / 100
      );
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
    <>
      <Head>
        <title>Image Compressor - Compress Images Online Free | TaskGuru</title>
        <meta
          name="description"
          content="Compress JPG, PNG, WEBP images online using TaskGuru's free AI image compressor. Reduce file size without quality loss."
        />
        <meta
          name="keywords"
          content="image compressor, compress jpg, compress png, webp compressor, reduce image size, online image compression, TaskGuru tools"
        />
        <link
          rel="canonical"
          href="https://www.taskguru.online/tools/image-compressor"
        />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Image Compressor - TaskGuru" />
        <meta
          property="og:description"
          content="Compress images online with our free AI-powered image compressor. Supports JPG, PNG, and WEBP. Fast and secure."
        />
        <meta
          property="og:url"
          content="https://www.taskguru.online/tools/image-compressor"
        />
        <meta
          property="og:image"
          content="https://www.taskguru.online/og-image-compressor.jpg"
        />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Image Compressor - TaskGuru" />
        <meta
          name="twitter:description"
          content="Free online image compressor to reduce size without losing quality. Works with JPG, PNG, WEBP formats."
        />
        <meta
          name="twitter:image"
          content="https://www.taskguru.online/og-image-compressor.jpg"
        />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebPage',
              name: 'Image Compressor - TaskGuru',
              description:
                'Compress images online using TaskGuru’s free image compressor. Fast, secure, AI-powered image size reduction.',
              url: 'https://www.taskguru.online/tools/image-compressor',
              publisher: {
                '@type': 'Organization',
                name: 'TaskGuru',
                url: 'https://www.taskguru.online',
                logo: {
                  '@type': 'ImageObject',
                  url: 'https://www.taskguru.online/logo.png',
                },
              },
            }),
          }}
        />
      </Head>

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
                    <Image src={originalImage} alt="Original" layout="fill" objectFit="contain" />
                  </div>
                  <p className="text-center text-sm font-medium">{formatBytes(originalFile?.size ?? 0)}</p>
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
                      <Image src={compressedImage} alt="Compressed" layout="fill" objectFit="contain" />
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
                  <Label htmlFor="quality" className="font-semibold">Quality</Label>
                  <span className="px-2 py-1 text-sm rounded-md bg-secondary text-secondary-foreground font-medium">{quality}%</span>
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
    </>
  );
}
