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

// ✅ SEO Metadata
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
        toast({ title: 'Invalid file', description: 'Upload JPG, PNG, WEBP only.', variant: 'destructive' });
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
        toast({ title: 'Error', description: 'Could not process image.', variant: 'destructive' });
        setIsLoading(false);
        return;
      }
      ctx.drawImage(img, 0, 0);
      const compressedDataUrl = canvas.toDataURL('image/jpeg', quality / 100);
      setCompressedImage(compressedDataUrl);
      const blob = atob(compressedDataUrl.split(',')[1]);
      setCompressedSize(blob.length);
      setIsLoading(false);
      toast({ title: 'Success!', description: 'Image compressed successfully.' });
    };
    img.onerror = () => {
      toast({ title: 'Error', description: 'Failed to load image.', variant: 'destructive' });
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
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const formatBytes = (bytes: number | null, decimals = 2) => {
    if (bytes === null) return 'N/A';
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + ' ' + ['Bytes','KB','MB','GB'][i];
  };

  return (
    <div className="space-y-12">
      {/* Intro */}
      <section className="max-w-4xl mx-auto py-6 text-center space-y-4">
        <h1 className="text-3xl font-bold">Free Online Image Compressor – Reduce JPG, PNG, WEBP File Size Instantly</h1>
        <p className="text-muted-foreground">
          TaskGuru’s <strong>Image Compressor</strong> reduces image file size while keeping high quality.  
          Upload JPG, PNG, WEBP and download lightweight, optimized images instantly — 100% free, no signup.
        </p>
      </section>

      {/* Tool */}
      <Card className="w-full max-w-5xl mx-auto shadow-lg">
        <CardContent className="p-6">
          {!originalImage ? (
            <div className="flex flex-col items-center justify-center space-y-4 p-12 border-2 border-dashed rounded-lg cursor-pointer hover:border-primary"
              onClick={() => fileInputRef.current?.click()}>
              <div className="p-4 bg-secondary rounded-full"><Upload className="w-10 h-10 text-muted-foreground" /></div>
              <p className="font-semibold">Click to upload or drag and drop</p>
              <p className="text-sm text-muted-foreground">PNG, JPG, WEBP</p>
              <Input ref={fileInputRef} type="file" className="hidden"
                accept="image/png, image/jpeg, image/webp" onChange={handleFileChange} />
            </div>
          ) : (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-center">Original</h3>
                  <div className="relative aspect-video border rounded-lg overflow-hidden">
                    <Image src={originalImage} alt="Original" fill className="object-contain" />
                  </div>
                  <p className="text-center text-sm mt-2">{formatBytes(originalFile?.size ?? 0)}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-center">Compressed</h3>
                  <div className="relative aspect-video border rounded-lg bg-muted overflow-hidden">
                    {isLoading && <Loader2 className="w-12 h-12 animate-spin absolute inset-0 m-auto text-primary" />}
                    {compressedImage ? (
                      <Image src={compressedImage} alt="Compressed" fill className="object-contain" />
                    ) : !isLoading && <ImageIcon className="w-16 h-16 m-auto text-muted-foreground" />}
                  </div>
                  <p className="text-center text-sm text-primary mt-2">{formatBytes(compressedSize)}</p>
                </div>
              </div>
              <div className="max-w-md mx-auto space-y-4">
                <div className="flex justify-between">
                  <Label htmlFor="quality" className="font-semibold">Quality</Label>
                  <span className="text-sm bg-secondary px-2 rounded">{quality}%</span>
                </div>
                <Slider id="quality" min={10} max={100} step={5} value={[quality]} onValueChange={(v)=>setQuality(v[0])} disabled={isLoading} />
              </div>
            </div>
          )}
        </CardContent>
        {originalImage && (
          <CardFooter className="flex justify-center gap-4 bg-muted/50 border-t p-4">
            <Button variant="outline" onClick={handleReset}><Trash2 className="mr-2 h-4 w-4" /> Reset</Button>
            <Button onClick={compressImage} disabled={isLoading}>
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
              Compress
            </Button>
            <Button onClick={handleDownload} disabled={!compressedImage || isLoading}><Download className="mr-2 h-4 w-4" /> Download</Button>
          </CardFooter>
        )}
      </Card>

      {/* Features */}
      <section className="max-w-4xl mx-auto py-10 grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold">Why Use TaskGuru Image Compressor?</h2>
          <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-4">
            <li>✔ 100% Free online tool</li>
            <li>✔ Compress JPG, PNG, WEBP easily</li>
            <li>✔ Smart compression keeps quality</li>
            <li>✔ Adjustable quality (10%–100%)</li>
            <li>✔ No signup or install required</li>
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-semibold">Use Cases</h2>
          <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-4">
            <li>🌐 Optimize images for faster websites</li>
            <li>📧 Reduce file size for email attachments</li>
            <li>📱 Save storage on mobile devices</li>
            <li>🛒 Compress product images for e-commerce</li>
          </ul>
        </div>
      </section>

      {/* How To */}
      <section className="max-w-4xl mx-auto py-10">
        <h2 className="text-xl font-semibold text-center">How to Compress Images Online?</h2>
        <ol className="list-decimal list-inside text-muted-foreground space-y-2 mt-4">
          <li>Upload your image (JPG, PNG, WEBP).</li>
          <li>Set compression quality (default 80%).</li>
          <li>Click <strong>Compress</strong> and download the result.</li>
        </ol>
      </section>

      {/* FAQ */}
      <section className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6 text-center">❓ Frequently Asked Questions</h2>
        <FAQItem question="Is TaskGuru’s Image Compressor free?">Yes, it’s 100% free and browser-based.</FAQItem>
        <FAQItem question="Which formats are supported?">JPG, PNG, and WEBP.</FAQItem>
        <FAQItem question="Will quality be reduced?">No, smart compression keeps sharpness.</FAQItem>
        <FAQItem question="Do I need an account?">No signup required.</FAQItem>
        <FAQItem question="Does it work on mobile?">Yes, it works on all devices.</FAQItem>
      </section>

      {/* JSON-LD FAQ Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context":"https://schema.org",
        "@type":"FAQPage",
        "mainEntity":[
          {"@type":"Question","name":"Is TaskGuru’s Image Compressor free?","acceptedAnswer":{"@type":"Answer","text":"Yes, it’s 100% free and works in-browser."}},
          {"@type":"Question","name":"Which formats are supported?","acceptedAnswer":{"@type":"Answer","text":"JPG, PNG, and WEBP are supported."}},
          {"@type":"Question","name":"Will quality be reduced?","acceptedAnswer":{"@type":"Answer","text":"No, smart compression keeps image sharpness."}},
          {"@type":"Question","name":"Do I need an account?","acceptedAnswer":{"@type":"Answer","text":"No, TaskGuru works without signup."}}
        ]
      })}} />

      {/* Footer */}
      <footer className="max-w-4xl mx-auto py-10 text-center text-muted-foreground">
        <p>
          Explore more on <a href="https://taskguru.online" className="text-primary underline">TaskGuru</a>:{" "}
          <a href="https://taskguru.online/blog" className="text-primary underline">Blog</a> |{" "}
          <a href="https://taskguru.online/about" className="text-primary underline">About</a> |{" "}
          <a href="https://taskguru.online/help" className="text-primary underline">Help</a>
        </p>
        <p className="mt-2">
          Try other free tools:{" "}
          <a href="https://taskguru.online/tools/background-remover" className="text-primary underline">Background Remover</a>,{" "}
          <a href="https://taskguru.online/tools/image-to-text" className="text-primary underline">Image to Text</a>,{" "}
          <a href="https://taskguru.online/tools/text-paraphraser" className="text-primary underline">Text Paraphraser</a>,{" "}
          <a href="https://taskguru.online/tools/pdf-to-word" className="text-primary underline">PDF to Word</a>
        </p>
        <p className="mt-4 text-xs">
          <a href="https://taskguru.online/privacy-policy" className="underline">Privacy Policy</a> |{" "}
          <a href="https://taskguru.online/terms" className="underline">Terms</a>
        </p>
      </footer>
    </div>
  );
}

// FAQ Accordion
function FAQItem({ question, children }: { question: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b py-4">
      <button onClick={() => setOpen(!open)} className="flex justify-between items-center w-full text-left font-medium text-lg">
        {question}
        <ChevronDown className={`w-5 h-5 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      <div className={`mt-2 text-muted-foreground transition-all ${open ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        {children}
      </div>
    </div>
  );
      }
