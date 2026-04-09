'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import Script from 'next/script';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';

import {
  Upload, Loader2, Copy, Trash2, ScanText, FileText,
  Sparkles, ShieldCheck, Clock, BookText, Languages, Search
} from 'lucide-react';

// ✅ SEO OPTIMIZED SCHEMAS
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How can I convert image to text for free without signup?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "TaskGuru provides a 100% free online OCR tool to convert images into editable text instantly without any registration or signup.",
      },
    },
    {
      "@type": "Question",
      "name": "Does this OCR tool support handwritten notes?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, our advanced OCR engine can extract text from clear handwritten notes, screenshots, and printed documents with high accuracy.",
      },
    },
    {
      "@type": "Question",
      "name": "Is my data safe when using the Image to Text converter?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Absolutely. All image processing happens locally in your browser. We do not upload or store your images on our servers.",
      },
    }
  ],
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Free Image to Text Converter (OCR)",
  "url": "https://taskguru.online/tools/image-to-text",
  "applicationCategory": "Utility",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "publisher": {
    "@type": "Organization",
    "name": "TaskGuru",
    "logo": "https://taskguru.online/logo.png",
  },
};

export default function ImageToText() {
  const { toast } = useToast();

  const [image, setImage] = useState<string | null>(null);
  const [extractedText, setExtractedText] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast({
        title: 'Invalid File',
        description: 'Please upload a JPG, PNG, or WEBP image.',
        variant: 'destructive',
      });
      return;
    }

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

  const handleSubmit = async () => {
    if (!image) {
      toast({
        title: 'No image selected',
        description: 'Please upload an image first.',
        variant: 'destructive',
      });
      return;
    }

    try {
      setIsLoading(true);
      setExtractedText('');
      const { createWorker } = await import('tesseract.js');
      const worker = await createWorker('eng', 1);
      const { data: { text } } = await worker.recognize(image);
      await worker.terminate();

      const cleanText = text.trim();
      if (!cleanText) {
        toast({
          title: 'No text found',
          description: 'OCR completed but no readable text was detected.',
          variant: 'destructive',
        });
      } else {
        toast({ title: 'Success!', description: 'Text extracted successfully.' });
      }

      setExtractedText(cleanText);
    } catch (error) {
      console.error('OCR error:', error);
      toast({
        title: 'OCR failed',
        description: 'Failed to extract text. Please try with a clearer photo.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (!extractedText) return;
    navigator.clipboard.writeText(extractedText);
    toast({ title: 'Copied to clipboard!' });
  };

  const handleReset = () => {
    setImage(null);
    setExtractedText('');
    setIsLoading(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <>
      <Script
        id="image-to-text-tool-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema) }}
      />
      <Script
        id="image-to-text-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* HERO */}
      <section className="max-w-5xl mx-auto py-10 px-4 text-center space-y-4">
        <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1 text-xs font-semibold text-primary">
          <Sparkles className="w-3 h-3" />
          Free Online OCR · No Signup Required
        </span>

        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground">
          Free Image to Text Converter (OCR Online)
        </h1>

        <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
          Instantly <strong className="text-foreground">convert image to text</strong> with our free online OCR tool. [span_3](start_span)Perfect for extracting text from screenshots, scanned documents, and handwritten notes without any registration.[span_3](end_span)
        </p>
      </section>

      {/* MAIN TOOL CARD */}
      <Card className="w-full max-w-5xl mx-auto shadow-xl border border-border/70 bg-card">
        <CardContent className="p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col space-y-4">
              <h3 className="font-semibold text-xl text-center flex items-center justify-center gap-2">
                <Upload className="w-5 h-5 text-primary" /> Upload Photo
              </h3>
              {image ? (
                <div className="relative aspect-[3/4] w-full rounded-lg overflow-hidden border bg-muted">
                  <img src={image} alt="Uploaded for OCR" className="object-contain w-full h-full" />
                </div>
              ) : (
                <div
                  className="flex flex-col items-center justify-center space-y-4 p-10 border-2 border-dashed rounded-xl cursor-pointer hover:border-primary transition-colors h-full bg-muted/40"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="w-10 h-10 text-muted-foreground" />
                  <p className="font-semibold">Click to upload or drag & drop</p>
                  <p className="text-xs text-muted-foreground text-center">Supported: JPG, PNG, WEBP · Max: 4MB</p>
                </div>
              )}
              <Input ref={fileInputRef} type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
            </div>

            <div className="flex flex-col space-y-4">
              <h3 className="font-semibold text-xl text-center flex items-center justify-center gap-2">
                <FileText className="w-5 h-5 text-primary" /> Extracted Result
              </h3>
              <div className="relative h-full">
                {isLoading && <Skeleton className="absolute inset-0 rounded-lg z-10" />}
                <Textarea
                  className="h-full min-h-[300px] resize-none p-4"
                  placeholder={isLoading ? 'Extracting text...' : 'Extracted text will appear here.'}
                  value={extractedText}
                  readOnly
                />
              </div>
              <Button onClick={handleCopy} disabled={!extractedText || isLoading} variant="outline" className="w-full">
                <Copy className="mr-2 h-4 w-4" /> Copy Text
              </Button>
            </div>
          </div>
        </CardContent>

        {image && (
          <CardFooter className="flex gap-4 bg-muted/60 p-4 border-t justify-center">
            <Button variant="outline" onClick={handleReset}><Trash2 className="mr-2 h-4 w-4" /> Reset</Button>
            <Button onClick={handleSubmit} disabled={isLoading}>
              {isLoading ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : <ScanText className="mr-2 h-4 w-4" />} 
              Extract Text
            </Button>
          </CardFooter>
        )}
      </Card>

      {/* 🚀 SEO CONTENT SECTION */}
      <section className="max-w-5xl mx-auto px-4 mt-20 space-y-16 leading-relaxed">
        
        <article className="prose prose-slate dark:prose-invert max-w-none">
          <h2 className="text-3xl font-bold flex items-center gap-2">
            <Search className="text-primary h-8 w-8" /> 
            Convert Photo to Text Free Online
          </h2>
          <p className="text-lg text-muted-foreground">
            Searching for a fast way to <strong className="text-foreground">extract text from image</strong>? Our <strong>Online OCR (Optical Character Recognition)</strong> tool is designed to help you digitize documents, notes, and screenshots in seconds. [span_4](start_span)Whether you need to <strong>convert handwritten notes to text</strong> or copy data from a locked PDF screenshot, TaskGuru is your go-to productivity hub.[span_4](end_span)
          </p>
        </article>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="p-6 border-none shadow-md bg-secondary/20">
            <h3 className="font-bold text-xl mb-3 flex items-center gap-2">
              <ShieldCheck className="text-green-500" /> Private & Secure
            </h3>
            <p className="text-sm">We value your privacy. [span_5](start_span)Your images are processed directly in your browser and are <strong className="text-foreground">never uploaded to any server</strong>.[span_5](end_span)</p>
          </Card>
          <Card className="p-6 border-none shadow-md bg-secondary/20">
            <h3 className="font-bold text-xl mb-3 flex items-center gap-2">
              <Clock className="text-blue-500" /> Save Time
            </h3>
            <p className="text-sm">Stop manual typing! [span_6](start_span)Easily <strong>convert image to editable text</strong> and boost your productivity for assignments or research work.[span_6](end_span)</p>
          </Card>
          <Card className="p-6 border-none shadow-md bg-secondary/20">
            <h3 className="font-bold text-xl mb-3 flex items-center gap-2">
              <Languages className="text-purple-500" /> Multi-Format Support
            </h3>
            [span_7](start_span)[span_8](start_span)<p className="text-sm">Our OCR engine supports <strong>JPG, PNG, and WEBP</strong> formats, ensuring high accuracy for all types of images and documents.[span_7](end_span)[span_8](end_span)</p>
          </Card>
        </div>

        <article className="bg-muted/30 p-8 rounded-2xl border">
          <h2 className="text-2xl font-bold mb-4">How to Use the Image to Text Converter?</h2>
          <ol className="list-decimal pl-5 space-y-4 marker:text-primary marker:font-bold">
            [span_9](start_span)[span_10](start_span)<li><strong>Upload:</strong> Choose a clear image or screenshot from your device.[span_9](end_span)[span_10](end_span)</li>
            [span_11](start_span)<li><strong>Process:</strong> Click "Extract Text" to let our AI-powered OCR analyze the image.[span_11](end_span)</li>
            <li><strong>Copy & Edit:</strong> Once the text appears, copy it to your clipboard. [span_12](start_span)[span_13](start_span)You can then use our <Link href="/tools/text-paraphraser" className="text-primary font-bold underline">AI Paraphraser</Link> to refine the content.[span_12](end_span)[span_13](end_span)</li>
          </ol>
        </article>

        <article>
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqSchema.mainEntity.map((faq, index) => (
              <div key={index} className="border-b pb-4 last:border-0">
                <h4 className="font-bold text-lg text-foreground mb-2">{faq.name}</h4>
                <p className="text-muted-foreground">{faq.acceptedAnswer.text}</p>
              </div>
            ))}
          </div>
        </article>
      </section>

      {/* 🔗 INTERNAL LINKING SECTION */}
      <section className="max-w-6xl mx-auto px-4 mt-20 mb-16 border-t pt-16 text-center">
        <h2 className="text-2xl font-bold mb-8">Boost Your Productivity with More Free Tools</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { href: "/tools/text-paraphraser", title: "AI Text Humanizer", desc: "Instantly rewrite extracted text to sound 100% human-like." },
            { href: "/tools/pdf-to-word", title: "PDF to Word", desc: "Convert any scanned PDF into a fully editable DOCX file." },
            { href: "/tools/image-to-pdf", title: "Image to PDF", desc: "Combine multiple photos into a clean, professional PDF." },
            { href: "/tools/merge-pdf", title: "Merge PDF Files", desc: "Organize your study notes by merging multiple PDFs into one." }
          ].map((tool) => (
            <Link key={tool.href} href={tool.href}>
              <div className="p-5 border rounded-2xl hover:shadow-lg transition bg-card h-full text-left flex flex-col justify-between">
                <div>
                  <h3 className="font-bold mb-2 text-primary">{tool.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{tool.desc}</p>
                </div>
                <span className="mt-4 text-xs font-bold text-primary">Explore Tool →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
