'use client';
import { useState, useRef } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Upload, Loader2, Copy, Trash2, ScanText } from 'lucide-react';
import { handleImageToText } from '@/app/actions';
import { Textarea } from '@/components/ui/textarea';
import { Skeleton } from '@/components/ui/skeleton';

export default function ImageToText() {
  const { toast } = useToast();
  const [image, setImage] = useState<string | null>(null);
  const [extractedText, setExtractedText] = useState<string>('');
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
        setImage(e.target?.result as string);
        setExtractedText('');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!image) {
      toast({ title: "No image selected", description: "Please upload an image first.", variant: "destructive" });
      return;
    }
    setIsLoading(true);
    setExtractedText('');
    const result = await handleImageToText(image);
    setIsLoading(false);

    if (result.success && result.data?.extractedText) {
      setExtractedText(result.data.extractedText);
      toast({ title: "Success!", description: "Text extracted successfully." });
    } else {
      toast({ title: "Error", description: result.error, variant: "destructive" });
    }
  };

  const handleCopy = () => {
    if (!extractedText) return;
    navigator.clipboard.writeText(extractedText);
    toast({ title: "Copied to clipboard!" });
  };

  const handleReset = () => {
    setImage(null);
    setExtractedText('');
    setIsLoading(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <>
      <Head>
        <title>Free Image to Text Converter Online | Extract Text from Images - TaskGuru</title>
        <meta
          name="description"
          content="Convert images to text online free with TaskGuru OCR tool. Extract text from JPG, PNG, WEBP instantly. Best image to text converter with OCR. How to extract text from image? Use TaskGuru online converter."
        />
        <meta
          name="keywords"
          content="image to text, image to text converter online, extract text from image, OCR online, convert image to text, best image to text converter, free image to text tool, scan image to text, photo to text converter, picture to text online, how to convert image to text, what is OCR, extract text online free, text recognition from images"
        />
        <link rel="canonical" href="https://www.taskguru.online/tools/image-to-text" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Free Image to Text Converter Online | TaskGuru" />
        <meta property="og:description" content="Extract text from images online free. Upload JPG, PNG, WEBP and convert into editable text instantly using OCR." />
        <meta property="og:url" content="https://www.taskguru.online/tools/image-to-text" />
        <meta property="og:image" content="https://www.taskguru.online/og-image-to-text.jpg" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Image to Text Converter Online Free | TaskGuru" />
        <meta name="twitter:description" content="Free OCR tool to extract text from images online. How to convert image to text? Use TaskGuru now." />
        <meta name="twitter:image" content="https://www.taskguru.online/og-image-to-text.jpg" />

        {/* JSON-LD FAQ Schema with question keywords */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "How to extract text from image online?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "You can extract text from image online free using TaskGuru’s Image to Text Converter. Upload PNG, JPG, or WEBP and get editable text instantly."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Which is the best free image to text converter?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "TaskGuru provides the best free image to text converter online using OCR. Fast, accurate, and no login required."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Can I convert a scanned photo to text?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, TaskGuru’s OCR image to text tool can extract text from scanned photos and pictures."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How do I convert a picture into editable text?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Simply upload your picture (JPG, PNG, WEBP) to TaskGuru’s free converter and click Extract. The tool will give you editable text."
                  }
                }
              ]
            })
          }}
        />
      </Head>

      <Card className="w-full max-w-4xl mx-auto shadow-lg">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col space-y-4">
              <h1 className="font-semibold text-xl text-center">Image to Text Converter Online Free</h1>
              {image ? (
                <div className="relative aspect-video w-full rounded-lg overflow-hidden border">
                  <Image src={image} alt="Uploaded for OCR" layout="fill" objectFit="contain" />
                </div>
              ) : (
                <div
                  className="flex flex-col items-center justify-center space-y-4 p-12 border-2 border-dashed rounded-lg cursor-pointer hover:border-primary transition-colors h-full"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <div className="p-4 bg-secondary rounded-full">
                    <Upload className="w-10 h-10 text-muted-foreground" />
                  </div>
                  <div className="text-center">
                    <p className="font-semibold">Click to upload or drag and drop</p>
                    <p className="text-sm text-muted-foreground">PNG, JPG, WEBP (Max 4MB)</p>
                  </div>
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
            <div className="flex flex-col space-y-4">
              <h2 className="font-semibold text-lg text-center">Extracted Text Result</h2>
              <div className="relative h-full">
                {isLoading && <Skeleton className="absolute inset-0" />}
                <Textarea
                  className="h-full min-h-[200px] resize-none"
                  placeholder={isLoading ? "Extracting text, please wait..." : "Text from your image will appear here."}
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
          <CardFooter className="flex justify-center gap-4 bg-muted/50 p-4 border-t">
            <Button variant="outline" onClick={handleReset}>
              <Trash2 className="mr-2 h-4 w-4" /> Reset
            </Button>
            <Button onClick={handleSubmit} disabled={isLoading || !!extractedText}>
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <ScanText className="mr-2 h-4 w-4" />
              )}
              Extract Text
            </Button>
          </CardFooter>
        )}
      </Card>
    </>
  );
}
