'use client';
import { useState, useRef } from 'react';
import Image from 'next/image';
import type { Metadata } from 'next';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Upload, Download, Loader2, Image as ImageIcon, Trash2, ChevronDown } from 'lucide-react';
import { handleImageCompression } from '@/app/actions';

// ✅ SEO Metadata
export const metadata: Metadata = {
  title: 'Free Online Image Compressor Tool | TaskGuru',
  description:
    "Compress JPG, PNG, and WEBP images online with TaskGuru's free image compressor. Reduce size up to 80% without losing quality. Fast, secure, and 100% free.",
  keywords: [
    'free image compressor',
    'compress jpg online',
    'compress png online',
    'compress webp online',
    'reduce image size',
    'online image optimizer',
    'TaskGuru image compressor',
    'shrink image online',
    'best image compression tool'
  ],
  robots: 'index, follow',
  alternates: {
    canonical: 'https://taskguru.online/tools/image-compressor',
  },
  openGraph: {
    title: 'Free Online Image Compressor Tool | TaskGuru',
    description:
      'Compress JPG, PNG, WEBP images instantly using TaskGuru’s free AI-powered image compressor. Reduce file size up to 80% without losing quality.',
    url: 'https://taskguru.online/tools/image-compressor',
    siteName: 'TaskGuru',
    images: [
      {
        url: 'https://taskguru.online/assets/image-compressor-og.png',
        width: 1200,
        height: 630,
        alt: 'Image Compressor Tool',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Online Image Compressor | TaskGuru',
    description:
      'Compress images online instantly with TaskGuru’s free tool. Supports JPG, PNG, WEBP with up to 80% size reduction.',
    images: ['https://taskguru.online/assets/image-compressor-og.png'],
  },
};

export default function ImageCompressor() {
  const { toast } = useToast();
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [compressedImage, setCompressedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [quality, setQuality] = useState(80); // slider quality %
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({ title: 'File too large', description: 'Max 5MB allowed.', variant: 'destructive' });
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        setOriginalImage(e.target?.result as string);
        setCompressedImage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!originalImage) {
      toast({ title: "No image selected", description: "Upload an image first.", variant: "destructive" });
      return;
    }
    setIsLoading(true);
    setCompressedImage(null);

    const result = await handleImageCompression(originalImage, quality); // 👈 original function intact
    setIsLoading(false);

    if (result.success && result.data?.compressedDataUri) {
      setCompressedImage(result.data.compressedDataUri);
      toast({ title: "Success!", description: "Image compressed successfully." });
    } else {
      toast({ title: "Error", description: result.error, variant: "destructive" });
    }
  };

  const handleDownload = () => {
    if (!compressedImage) return;
    const link = document.createElement('a');
    link.href = compressedImage;
    link.download = 'compressed-image.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleReset = () => {
    setOriginalImage(null);
    setCompressedImage(null);
    setIsLoading(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="space-y-12">
      {/* Intro */}
      <section className="max-w-4xl mx-auto py-6 text-center space-y-4">
        <h1 className="text-3xl font-bold">Free Online Image Compressor – Reduce Size Without Losing Quality</h1>
        <p className="text-muted-foreground">
          TaskGuru’s <strong>Image Compressor</strong> helps you shrink JPG, PNG, and WEBP images online. 
          Reduce file size up to <strong>80%</strong> while keeping high-quality resolution. No signup required.
        </p>
      </section>

      {/* Main Tool */}
      <Card className="w-full max-w-4xl mx-auto shadow-lg">
        <CardContent className="p-6">
          {!originalImage ? (
            <div className="flex flex-col items-center justify-center space-y-4 p-12 border-2 border-dashed rounded-lg cursor-pointer hover:border-primary"
              onClick={() => fileInputRef.current?.click()}>
              <div className="p-4 bg-secondary rounded-full">
                <Upload className="w-10 h-10 text-muted-foreground" />
              </div>
              <p className="font-semibold">Click to upload or drag and drop</p>
              <p className="text-sm text-muted-foreground">PNG, JPG, WEBP (Max 5MB)</p>
              <Input ref={fileInputRef} type="file" className="hidden"
                accept="image/png, image/jpeg, image/webp" onChange={handleFileChange} />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-center">Original</h3>
                <div className="relative aspect-square border rounded-lg overflow-hidden">
                  <Image src={originalImage} alt="Original image" fill className="object-contain" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-center">Compressed</h3>
                <div className="relative aspect-square border rounded-lg bg-muted overflow-hidden">
                  {isLoading && <Loader2 className="w-12 h-12 animate-spin absolute inset-0 m-auto text-primary" />}
                  {compressedImage ? (
                    <Image src={compressedImage} alt="Compressed image" fill className="object-contain" />
                  ) : !isLoading && <ImageIcon className="w-16 h-16 m-auto text-muted-foreground" />}
                </div>
              </div>
            </div>
          )}
        </CardContent>

        {originalImage && (
          <CardFooter className="flex flex-col gap-4 bg-muted/50 border-t p-4">
            {/* Quality Slider */}
            <div className="w-full">
              <label htmlFor="quality" className="block text-sm font-medium mb-2">Compression Quality: {quality}%</label>
              <input
                id="quality"
                type="range"
                min="10"
                max="100"
                step="5"
                value={quality}
                onChange={(e) => setQuality(Number(e.target.value))}
                className="w-full accent-primary"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center gap-4 flex-wrap">
              <Button variant="outline" onClick={handleReset}><Trash2 className="mr-2 h-4 w-4" /> Reset</Button>
              <Button onClick={handleSubmit} disabled={isLoading || !!compressedImage}>
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                Compress Image
              </Button>
              <Button onClick={handleDownload} disabled={!compressedImage || isLoading}><Download className="mr-2 h-4 w-4" /> Download</Button>
            </div>
          </CardFooter>
        )}
      </Card>

      {/* Features */}
      <section className="max-w-4xl mx-auto py-10 grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold">Why Use TaskGuru Image Compressor?</h2>
          <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-4">
            <li>✔ Free online image compressor</li>
            <li>✔ Reduces file size up to 80%</li>
            <li>✔ Supports JPG, PNG, WEBP formats</li>
            <li>✔ No signup or installation needed</li>
            <li>✔ Works on desktop & mobile</li>
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-semibold">Common Use Cases</h2>
          <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-4">
            <li>🛍 Optimize product photos for e-commerce</li>
            <li>🌐 Speed up websites with lighter images</li>
            <li>📤 Upload faster to social media & emails</li>
            <li>📸 Save storage space on your device</li>
          </ul>
        </div>
      </section>

      {/* How To Guide */}
      <section className="max-w-4xl mx-auto py-10">
        <h2 className="text-xl font-semibold text-center">How to Compress Images Online?</h2>
        <ol className="list-decimal list-inside text-muted-foreground space-y-2 mt-4">
          <li>Upload your image (JPG, PNG, WEBP up to 5MB).</li>
          <li>Adjust the <strong>compression quality</strong> slider.</li>
          <li>Click <strong>Compress Image</strong> to start processing.</li>
          <li>Download your optimized image instantly.</li>
        </ol>
      </section>

      {/* FAQ */}
      <section className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6 text-center">❓ Frequently Asked Questions</h2>
        <FAQItem question="Is TaskGuru’s Image Compressor free?">Yes, it’s 100% free and requires no signup.</FAQItem>
        <FAQItem question="Which file formats are supported?">JPG, PNG, and WEBP up to 5MB.</FAQItem>
        <FAQItem question="Does it reduce image quality?">No, our tool balances small file size with high resolution.</FAQItem>
        <FAQItem question="Can I use it on mobile?">Yes, works on desktop, tablets, and smartphones.</FAQItem>
      </section>

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

// Sparkles icon
const Sparkles = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
    <path d="M12 2v2M4 12H2m20 0h-2M12 20v2m-7.07-7.07-1.41 1.41M19.07 4.93l-1.41 1.41M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41" />
  </svg>
);

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
