'use client';
import { useState, useRef } from 'react';
import Image from 'next/image';
import type { Metadata } from 'next';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/hooks/use-toast';
import { Upload, Download, Loader2, Image as ImageIcon, Trash2, ChevronDown } from 'lucide-react';
import { handleImageCompression } from '@/app/actions';

// ✅ SEO Metadata
export const metadata: Metadata = {
  title: 'Free Online Image Compressor Tool | TaskGuru',
  description:
    "Compress images (JPG, PNG, WEBP) online for free with TaskGuru's AI-powered image compressor. Reduce image size up to 80% without losing quality. Fast & secure.",
  robots: 'index, follow',
  alternates: {
    canonical: 'https://taskguru.online/tools/image-compressor',
  },
  openGraph: {
    title: 'Free Online Image Compressor Tool | TaskGuru',
    description:
      'Optimize and compress images instantly with TaskGuru’s free AI-powered tool. Upload JPG, PNG, WEBP and reduce file size without quality loss.',
    url: 'https://taskguru.online/tools/image-compressor',
    siteName: 'TaskGuru',
    images: [
      {
        url: 'https://taskguru.online/assets/image-compressor-og.png',
        width: 1200,
        height: 630,
        alt: 'TaskGuru Image Compressor Tool',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Online Image Compressor | TaskGuru',
    description:
      'Compress images online instantly with TaskGuru’s free AI-powered tool. Reduce JPG, PNG, WEBP file size up to 80% without quality loss.',
    images: ['https://taskguru.online/assets/image-compressor-og.png'],
  },
};

export default function ImageCompressor() {
  const { toast } = useToast();
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [compressedImage, setCompressedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [quality, setQuality] = useState<number>(80);
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
    const result = await handleImageCompression(originalImage, quality);
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
    setQuality(80);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="space-y-12">
      {/* Intro */}
      <section className="max-w-4xl mx-auto py-6 text-center space-y-4">
        <h1 className="text-3xl font-bold">Free Online Image Compressor – Reduce File Size Without Losing Quality</h1>
        <p className="text-muted-foreground">
          TaskGuru’s <strong>AI Image Compressor</strong> reduces file size for JPG, PNG, and WEBP images by up to 80% while keeping sharp quality.
          Upload, select compression quality, and download in seconds – free and secure.
        </p>
      </section>

      {/* Main Tool */}
      <Card className="w-full max-w-4xl mx-auto shadow-lg">
        <CardContent className="p-6 space-y-6">
          {!originalImage ? (
            <label
              htmlFor="file-upload"
              className="flex flex-col items-center justify-center space-y-4 p-12 border-2 border-dashed rounded-lg cursor-pointer hover:border-primary"
            >
              <div className="p-4 bg-secondary rounded-full">
                <Upload className="w-10 h-10 text-muted-foreground" />
              </div>
              <p className="font-semibold">Click to upload or drag and drop</p>
              <p className="text-sm text-muted-foreground">PNG, JPG, WEBP (Max 4MB)</p>
              <Input
                id="file-upload"
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept="image/png, image/jpeg, image/webp"
                onChange={handleFileChange}
              />
            </label>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-center">Original</h3>
                <div className="relative aspect-square border rounded-lg overflow-hidden">
                  <Image src={originalImage} alt="Original uploaded image before compression" fill className="object-contain" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-center">Compressed</h3>
                <div className="relative aspect-square border rounded-lg bg-muted overflow-hidden">
                  {isLoading && <Loader2 className="w-12 h-12 animate-spin absolute inset-0 m-auto text-primary" />}
                  {compressedImage ? (
                    <Image src={compressedImage} alt="Compressed image optimized with TaskGuru" fill className="object-contain" />
                  ) : !isLoading && <ImageIcon className="w-16 h-16 m-auto text-muted-foreground" />}
                </div>
              </div>
            </div>
          )}
        </CardContent>

        {/* ✅ Slider */}
        {originalImage && (
          <div className="max-w-md mx-auto space-y-4 px-6 pb-6">
            <div className="flex justify-between">
              <Label htmlFor="quality" className="font-semibold">Quality</Label>
              <span className="text-sm bg-secondary px-2 rounded">{quality}%</span>
            </div>
            <Slider
              id="quality"
              min={10}
              max={100}
              step={5}
              value={[quality]}
              onValueChange={(v) => setQuality(v[0])}
              disabled={isLoading}
            />
          </div>
        )}

        {originalImage && (
          <CardFooter className="flex justify-center gap-4 bg-muted/50 border-t p-4">
            <Button variant="outline" onClick={handleReset}><Trash2 className="mr-2 h-4 w-4" /> Reset</Button>
            <Button onClick={handleSubmit} disabled={isLoading || !!compressedImage}>
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
              Compress Image
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
            <li>✔ 100% Free online image compressor</li>
            <li>✔ AI-powered compression for high-quality results</li>
            <li>✔ Supports JPG, PNG, WEBP formats</li>
            <li>✔ No signup or software install needed</li>
            <li>✔ Works on desktop & mobile</li>
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-semibold">Common Use Cases</h2>
          <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-4">
            <li>🛍 Optimize product images for eCommerce</li>
            <li>👤 Reduce image size for profile pictures & resumes</li>
            <li>🎨 Prepare images for web & graphic design</li>
            <li>📸 Faster uploads for social media & sharing</li>
          </ul>
        </div>
      </section>

      {/* How To Guide */}
      <section className="max-w-4xl mx-auto py-10">
        <h2 className="text-xl font-semibold text-center">How to Compress Images Online?</h2>
        <ol className="list-decimal list-inside text-muted-foreground space-y-2 mt-4">
          <li>Upload your image (JPG, PNG, WEBP).</li>
          <li>Select desired quality with the slider.</li>
          <li>Click <strong>Compress Image</strong> to start optimization.</li>
          <li>Download your smaller file instantly.</li>
        </ol>
      </section>

      {/* FAQ */}
      <section className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6 text-center">❓ Frequently Asked Questions</h2>
        <FAQItem question="Is TaskGuru’s Image Compressor free?">Yes, 100% free and no signup required.</FAQItem>
        <FAQItem question="Which file formats are supported?">JPG, PNG, and WEBP images up to 4MB.</FAQItem>
        <FAQItem question="Can I use it on mobile?">Yes, works on desktop, tablet, and mobile browsers.</FAQItem>
        <FAQItem question="Does it reduce quality?">No, it reduces size while preserving sharp quality.</FAQItem>
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
          <a href="https://taskguru.online/tools/text-paraphraser" className="text-primary underline">Text Paraphraser</a>,{" "}
          <a href="https://taskguru.online/tools/pdf-to-word" className="text-primary underline">PDF to Word</a>,{" "}
          <a href="https://taskguru.online/tools/image-to-text" className="text-primary underline">Image to Text</a>
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
      <button onClick={() => setOpen(!open)} className="flex justify-between items-center w-full text-left font-medium text-lg" aria-expanded={open}>
        <h3 className="font-medium text-lg">{question}</h3>
        <ChevronDown className={`w-5 h-5 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      <div className={`mt-2 text-muted-foreground transition-all ${open ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        {children}
      </div>
    </div>
  );
}
