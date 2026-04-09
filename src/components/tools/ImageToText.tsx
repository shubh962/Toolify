'use client';

import { useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';

import {
  Upload, Loader2, Copy, Trash2, ScanText, FileText,
  Sparkles, ShieldCheck, Clock, BookText, Languages,
} from 'lucide-react';

export default function ImageToText() {
  const { toast } = useToast();

  const [image, setImage] = useState<string | null>(null);
  const [extractedText, setExtractedText] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
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
  }, [toast]);

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
          description: 'OCR completed but no readable text was detected. Try a clearer image.',
          variant: 'destructive',
        });
      } else {
        toast({ title: 'Success!', description: 'Text extracted successfully.' });
      }

      setExtractedText(cleanText);
    } catch (error) {
      console.error('Tesseract OCR error:', error);
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
      {/* HERO - Rich with primary keywords */}
      <section className="max-w-5xl mx-auto py-10 px-4 text-center space-y-4">
        <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1 text-xs font-semibold text-primary">
          <Sparkles className="w-3 h-3" />
          Free Online OCR · No Signup Required
        </span>

        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
          Free Image to Text Converter (OCR Online)
        </h2>

        <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
          Instantly <strong>extract text from image</strong>, screenshot, or photo using our 
          free <strong>image to text converter</strong>. Perfect <strong>photo to text converter</strong> 
          for converting pictures to text, handwritten notes, receipts, and documents — 
          all processed privately in your browser.
        </p>
        <p className="text-xs md:text-sm text-muted-foreground max-w-3xl mx-auto">
          Best for <strong>screenshot to text</strong>, <strong>convert image to text online</strong>, 
          and quick digitization of printed or handwritten content.
        </p>
      </section>

      {/* MAIN TOOL CARD */}
      <Card className="w-full max-w-5xl mx-auto shadow-xl border border-border/70">
        <CardContent className="p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* LEFT: UPLOAD */}
            <div className="flex flex-col space-y-4">
              <h3 className="font-semibold text-xl text-center flex items-center justify-center gap-2">
                <Upload className="w-5 h-5 text-primary" /> Upload Image for OCR
              </h3>
              {image ? (
                <div className="relative aspect-[3/5] w-full rounded-lg overflow-hidden border bg-muted">
                  <img
                    src={image}
                    alt="Uploaded image ready for extract text from image using OCR"
                    className="object-contain w-full h-full"
                  />
                </div>
              ) : (
                <div
                  className="flex flex-col items-center justify-center space-y-4 p-10 border-2 border-dashed rounded-xl cursor-pointer hover:border-primary transition-colors h-full bg-muted/40"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <div className="p-4 bg-secondary rounded-full">
                    <Upload className="w-10 h-10 text-muted-foreground" />
                  </div>
                  <div className="text-center space-y-1">
                    <p className="font-semibold text-foreground">
                      Click or drag &amp; drop your image
                    </p>
                    <p className="text-xs md:text-sm text-muted-foreground">
                      JPG, PNG, WEBP • Max 4MB<br />
                      Ideal for screenshot to text and photo to text conversion
                    </p>
                  </div>
                </div>
              )}
              <Input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept="image/png,image/jpeg,image/webp"
                onChange={handleFileChange}
              />
            </div>

            {/* RIGHT: RESULT */}
            <div className="flex flex-col space-y-4">
              <h3 className="font-semibold text-xl text-center flex items-center justify-center gap-2">
                <FileText className="w-5 h-5 text-primary" /> Extracted Text
              </h3>
              <div className="relative h-full">
                {isLoading && (
                  <Skeleton className="absolute inset-0 rounded-lg z-10" />
                )}
                <Textarea
                  className="h-full min-h-[240px] resize-none"
                  placeholder={
                    isLoading
                      ? 'Extracting text with OCR... Please wait'
                      : 'Your extracted text will appear here...'
                  }
                  value={extractedText}
                  readOnly
                />
              </div>
              <Button
                onClick={handleCopy}
                disabled={!extractedText || isLoading}
                variant="outline"
              >
                <Copy className="mr-2 h-4 w-4" /> Copy Text
              </Button>
            </div>
          </div>
        </CardContent>

        {image && (
          <CardFooter className="flex flex-col md:flex-row items-center justify-center gap-4 bg-muted/60 p-4 border-t">
            <Button variant="outline" onClick={handleReset} className="w-full md:w-auto">
              <Trash2 className="mr-2 h-4 w-4" /> Reset
            </Button>
            <Button onClick={handleSubmit} disabled={isLoading} className="w-full md:w-auto">
              {isLoading ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Extracting…</>
              ) : (
                <><ScanText className="mr-2 h-4 w-4" /> Extract Text from Image</>
              )}
            </Button>
          </CardFooter>
        )}
      </Card>

      {/* WHY USE + BENEFITS */}
      <section className="max-w-5xl mx-auto px-4 mt-12 grid gap-8 md:grid-cols-2">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            Why Use Our Free Image to Text Converter?
          </h2>
          <p className="text-sm md:text-base text-muted-foreground">
            Quickly <strong>convert image to text online</strong> without any signup. 
            Our browser-based OCR tool helps you <strong>extract text from image</strong>, 
            screenshots, and photos in seconds — saving hours of manual typing.
          </p>
          <ul className="list-disc list-inside text-sm md:text-base text-muted-foreground space-y-2">
            <li><strong>100% Private:</strong> Image OCR runs locally in your browser.</li>
            <li><strong>No Signup:</strong> Start using the <strong>picture to text</strong> tool instantly.</li>
            <li><strong>Great for Screenshots:</strong> Excellent <strong>screenshot to text</strong> accuracy.</li>
            <li><strong>Free Forever:</strong> Unlimited <strong>image to text</strong> conversions.</li>
          </ul>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-primary" />
            Best Results: Screenshots vs Camera Photos
          </h2>
          <p className="text-sm md:text-base text-muted-foreground">
            For best <strong>handwriting to text</strong> and printed text results, use clear screenshots. 
            Camera photos can work but need good lighting and focus.
          </p>
          <ul className="list-disc list-inside text-sm md:text-base text-muted-foreground space-y-2">
            <li>Use well-lit, straight-on photos for better OCR.</li>
            <li>Screenshots give near-perfect <strong>extract text from image</strong> results.</li>
            <li>Crop the image to focus only on the text area.</li>
          </ul>
        </div>
      </section>

      {/* USE CASES */}
      <section className="max-w-5xl mx-auto px-4 mt-12 grid gap-8 md:grid-cols-2">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <BookText className="w-5 h-5 text-primary" /> Popular Use Cases for Image OCR
          </h2>
          <ul className="list-disc list-inside text-sm md:text-base text-muted-foreground space-y-2">
            <li><strong>Study Notes:</strong> Convert board notes or textbooks into editable text.</li>
            <li><strong>Receipts &amp; Bills:</strong> Extract details using <strong>photo to text converter</strong>.</li>
            <li><strong>Documents:</strong> Digitize printed papers with <strong>image to text converter</strong>.</li>
            <li><strong>Screenshots:</strong> Copy text from apps, websites, or locked PDFs using <strong>screenshot to text</strong>.</li>
            <li><strong>Handwritten Notes:</strong> Partial support for neat <strong>handwriting to text</strong>.</li>
          </ul>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" /> Pro Tips for Better OCR Results
          </h2>
          <ul className="list-disc list-inside text-sm md:text-base text-muted-foreground space-y-2">
            <li>Use high-contrast text (dark on light background).</li>
            <li>Crop tightly around the text before uploading.</li>
            <li>Avoid blurry or low-resolution images.</li>
            <li>For best <strong>convert image to text online</strong> results, use screenshots whenever possible.</li>
          </ul>
        </div>
      </section>

      {/* FAQ - Naturally includes keywords */}
      <section className="max-w-5xl mx-auto px-4 my-12 md:my-16 p-6 md:p-8 bg-card shadow rounded-xl border border-border/70">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-2">
          <Languages className="w-6 h-6 text-primary" /> Frequently Asked Questions
        </h2>
        <div className="space-y-6 text-sm md:text-base text-muted-foreground">
          {[
            {
              q: "Is this Image to Text Converter really free?",
              a: "Yes. Our <strong>free OCR online</strong> tool requires no signup and has no limits. Convert as many images as you need.",
            },
            {
              q: "Is my data safe when using extract text from image tool?",
              a: "Completely safe. Everything runs in your browser using Tesseract.js. Your images are never uploaded or stored on our servers.",
            },
            {
              q: "Does it support handwriting to text?",
              a: "It works best with printed text and clear screenshots. Neat handwriting can sometimes be recognized, but results vary.",
            },
            {
              q: "Why is screenshot to text more accurate than camera photos?",
              a: "Screenshots are sharp and perfectly aligned, making <strong>extract text from image</strong> much easier for the OCR engine.",
            },
            {
              q: "What can I do with the extracted text?",
              a: "Copy it instantly and use it in documents, notes, or paste into our AI Paraphraser tool to refine the content.",
            },
          ].map((faq, i) => (
            <div key={i} className="border-b pb-4 last:border-b-0">
              <h3 className="font-semibold text-foreground mb-1">{i + 1}. {faq.q}</h3>
              <p dangerouslySetInnerHTML={{ __html: faq.a }} />
            </div>
          ))}
        </div>
      </section>

      {/* RELATED TOOLS */}
      <section className="max-w-6xl mx-auto px-4 mt-12 mb-16">
        <h2 className="text-2xl font-bold text-center mb-4">
          More Free Productivity Tools
        </h2>
        <p className="text-sm md:text-base text-muted-foreground text-center max-w-3xl mx-auto mb-8">
          Combine our <strong>image to text converter</strong> with other tools to boost your workflow.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { href: "/tools/pdf-to-word", icon: <FileText className="w-4 h-4 text-primary" />, title: "PDF to Word Converter", desc: "Convert scanned PDFs into editable text documents." },
            { href: "/tools/merge-pdf", icon: <FileText className="w-4 h-4 text-primary" />, title: "Merge PDF Files", desc: "Combine multiple PDFs into one organized file." },
            { href: "/tools/image-to-pdf", icon: <FileText className="w-4 h-4 text-primary" />, title: "Image to PDF Converter", desc: "Turn photos into clean, professional PDFs." },
            { href: "/tools/text-paraphraser", icon: <BookText className="w-4 h-4 text-primary" />, title: "AI Text Paraphraser", desc: "Polish and rewrite your extracted text instantly." },
          ].map((tool) => (
            <Link key={tool.href} href={tool.href}>
              <div className="p-4 border rounded-xl hover:shadow-md transition cursor-pointer bg-card h-full flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="font-bold flex items-center gap-2">
                    {tool.icon} {tool.title}
                  </h3>
                  <p className="text-xs text-muted-foreground">{tool.desc}</p>
                </div>
                <p className="mt-3 text-xs font-semibold text-primary">Use Tool →</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
