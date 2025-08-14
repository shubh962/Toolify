'use client';

import { useState, useRef } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Upload, Download, Loader2, Image as ImageIcon, Trash2 } from 'lucide-react';
import { handleBackgroundRemoval } from '@/app/actions';
import { Skeleton } from '@/components/ui/skeleton';

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
      toast({ title: "No image selected", description: "Please upload an image first.", variant: "destructive" });
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
    <>
      <Head>
        <title>Free Background Remover Tool Online | TaskGuru</title>
        <meta name="description" content="Remove image background instantly using TaskGuru's free Background Remover tool. No login required. Supports JPG, PNG, WEBP." />
        <meta name="keywords" content="Background remover, remove image background, transparent background, online tool, TaskGuru" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://taskguru.online/tools/background-remover" />

        {/* Open Graph */}
        <meta property="og:title" content="Free Background Remover Tool Online | TaskGuru" />
        <meta property="og:description" content="Remove image background instantly using TaskGuru's free Background Remover tool. No login required." />
        <meta property="og:url" content="https://taskguru.online/tools/background-remover" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://taskguru.online/assets/bg-remover-og.png" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Free Background Remover Tool Online | TaskGuru" />
        <meta name="twitter:description" content="Remove image background instantly using TaskGuru's free Background Remover tool." />
        <meta name="twitter:image" content="https://taskguru.online/assets/bg-remover-og.png" />

        {/* Schema Markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "Background Remover Tool",
              "url": "https://taskguru.online/tools/background-remover",
              "applicationCategory": "PhotoEditingApplication",
              "operatingSystem": "All",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "reviewCount": "173"
              }
            }),
          }}
        />
      </Head>

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
                  <Image src={originalImage} alt="Original" layout="fill" objectFit="contain" />
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
                    <Image src={processedImage} alt="Background removed" layout="fill" objectFit="contain" />
                  ) : (
                    !isLoading && <div className="flex items-center justify-center h-full text-muted-foreground"><ImageIcon className="w-16 h-16" /></div>
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
    </>
  );
}

const Sparkles = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="https://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
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
