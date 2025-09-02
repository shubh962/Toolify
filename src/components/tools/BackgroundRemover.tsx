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

// ✅ SEO Metadata
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
        toast({ title: 'File too large', description: 'Max 4MB allowed.', variant: 'destructive' });
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
      toast({ title: "No image selected", description: "Upload an image first.", variant: "destructive" });
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
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="space-y-12">
      {/* Intro */}
      <section className="max-w-4xl mx-auto py-6 text-center space-y-4">
        <h1 className="text-3xl font-bold">Free Online Background Remover – Erase Image Backgrounds Instantly</h1>
        <p className="text-muted-foreground">
          TaskGuru’s <strong>AI Background Remover</strong> lets you remove backgrounds from JPG, PNG, WEBP images online free.  
          Upload your photo, click remove, and download a transparent background instantly — no signup required.
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
              <p className="text-sm text-muted-foreground">PNG, JPG, WEBP (Max 4MB)</p>
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
                <h3 className="text-lg font-semibold text-center">Result</h3>
                <div className="relative aspect-square border rounded-lg bg-muted overflow-hidden">
                  {isLoading && <Loader2 className="w-12 h-12 animate-spin absolute inset-0 m-auto text-primary" />}
                  {processedImage ? (
                    <Image src={processedImage} alt="Background removed" fill className="object-contain" />
                  ) : !isLoading && <ImageIcon className="w-16 h-16 m-auto text-muted-foreground" />}
                </div>
              </div>
            </div>
          )}
        </CardContent>
        {originalImage && (
          <CardFooter className="flex justify-center gap-4 bg-muted/50 border-t p-4">
            <Button variant="outline" onClick={handleReset}><Trash2 className="mr-2 h-4 w-4" /> Reset</Button>
            <Button onClick={handleSubmit} disabled={isLoading || !!processedImage}>
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
              Remove Background
            </Button>
            <Button onClick={handleDownload} disabled={!processedImage || isLoading}><Download className="mr-2 h-4 w-4" /> Download</Button>
          </CardFooter>
        )}
      </Card>

      {/* Features */}
      <section className="max-w-4xl mx-auto py-10 grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold">Why Use TaskGuru Background Remover?</h2>
          <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-4">
            <li>✔ 100% Free online background remover</li>
            <li>✔ AI-powered accuracy for clean results</li>
            <li>✔ Supports JPG, PNG, WEBP images</li>
            <li>✔ No signup or software install needed</li>
            <li>✔ Works on desktop & mobile</li>
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-semibold">Common Use Cases</h2>
          <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-4">
            <li>🛍 Create product images with white/transparent background</li>
            <li>👤 Make profile pictures clean & professional</li>
            <li>🎨 Graphic design & marketing creatives</li>
            <li>📸 Remove unwanted backgrounds from photos</li>
          </ul>
        </div>
      </section>

      {/* How To Guide */}
      <section className="max-w-4xl mx-auto py-10">
        <h2 className="text-xl font-semibold text-center">How to Remove Background from an Image Online?</h2>
        <ol className="list-decimal list-inside text-muted-foreground space-y-2 mt-4">
          <li>Upload your image (JPG, PNG, WEBP).</li>
          <li>Click <strong>Remove Background</strong> to start processing.</li>
          <li>Download your transparent background image instantly.</li>
        </ol>
      </section>

      {/* FAQ */}
      <section className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6 text-center">❓ Frequently Asked Questions</h2>
        <FAQItem question="Is TaskGuru’s Background Remover free?">Yes, 100% free and no signup required.</FAQItem>
        <FAQItem question="Which file formats are supported?">JPG, PNG, and WEBP images up to 4MB.</FAQItem>
        <FAQItem question="Can I use it on mobile?">Yes, works on desktop, tablet, and mobile browsers.</FAQItem>
        <FAQItem question="Does it reduce quality?">No, it keeps high image quality with transparent background.</FAQItem>
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
          <a href="https://taskguru.online/tools/image-to-text" className="text-primary underline">Image to Text</a>,{" "}
          <a href="https://taskguru.online/tools/text-paraphraser" className="text-primary underline">Text Paraphraser</a>,{" "}
          <a href="https://taskguru.online/tools/pdf-to-word" className="text-primary underline">PDF to Word</a>,{" "}
          <a href="https://taskguru.online/tools/image-compressor" className="text-primary underline">Image Compressor</a>
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
