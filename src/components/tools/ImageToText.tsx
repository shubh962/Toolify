'use client';

import { useState, useRef } from 'react';
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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // ✅ FIX 1: Added file type validation
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

      // ✅ FIX 2: Removed empty logger — no unnecessary closure creation
      const worker = await createWorker('eng', 1);

      const { data: { text } } = await worker.recognize(image);
      await worker.terminate();

      const cleanText = text.trim();

      if (!cleanText) {
        toast({
          title: 'No text found',
          description: 'OCR completed but no readable text was detected. Try a sharper, well-lit image.',
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
      {/* HERO */}
      <section className="max-w-5xl mx-auto py-10 px-4 text-center space-y-4">
        <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1 text-xs font-semibold text-primary">
          <Sparkles className="w-3 h-3" />
          Free Online OCR · No Signup Required
        </span>

        {/* ✅ FIX 3: Changed <h1> to <h2> — parent page already has <h1> */}
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
          Image to Text Converter (OCR) — Free Online Tool
        </h2>

        <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
          Convert images into editable text in seconds. Upload a{' '}
          <strong>JPG, PNG, or WEBP photo</strong> and our OCR engine extracts
          the text for you — perfect for notes, receipts, documents, screenshots,
          and more. All processing happens in your browser, so your data stays private.
        </p>
        <p className="text-xs md:text-sm text-muted-foreground max-w-3xl mx-auto">
          Tip: For the <strong>best accuracy</strong>, use clear screenshots or
          well-lit photos with sharp text. Handwritten or blurry photos may give
          weaker results, but you can try multiple images until you&apos;re happy.
        </p>
      </section>

      {/* MAIN TOOL CARD */}
      <Card className="w-full max-w-5xl mx-auto shadow-xl border border-border/70">
        <CardContent className="p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* LEFT: UPLOAD */}
            <div className="flex flex-col space-y-4">
              <h3 className="font-semibold text-xl text-center flex items-center justify-center gap-2">
                <Upload className="w-5 h-5 text-primary" /> Upload Image
              </h3>
              {image ? (
                <div className="relative aspect-[3/5] w-full rounded-lg overflow-hidden border bg-muted">
                  <img
                    src={image}
                    alt="Uploaded for OCR text extraction"
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
                      Click to upload or drag &amp; drop
                    </p>
                    <p className="text-xs md:text-sm text-muted-foreground">
                      Supported: JPG, PNG, WEBP · Max size: 4MB
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
                <FileText className="w-5 h-5 text-primary" /> Extracted Text Result
              </h3>
              <div className="relative h-full">
                {isLoading && (
                  <Skeleton className="absolute inset-0 rounded-lg z-10" />
                )}
                <Textarea
                  className="h-full min-h-[240px] resize-none"
                  placeholder={
                    isLoading
                      ? 'Extracting text, please wait...'
                      : 'Text from your image will appear here.'
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
                <><ScanText className="mr-2 h-4 w-4" /> Extract Text</>
              )}
            </Button>
          </CardFooter>
        )}
      </Card>

      {/* HOW IT WORKS & BENEFITS */}
      <section className="max-w-5xl mx-auto px-4 mt-12 grid gap-8 md:grid-cols-2">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            Why Use TaskGuru Image to Text?
          </h2>
          <p className="text-sm md:text-base text-muted-foreground">
            Our OCR tool is designed to help students, creators, professionals,
            and everyday users save time. Instead of typing everything manually
            from a photo or screenshot, simply upload the image and copy the
            extracted text in one click.
          </p>
          <ul className="list-disc list-inside text-sm md:text-base text-muted-foreground space-y-2">
            <li><strong>100% browser-based:</strong> OCR runs on your device — no external server storage.</li>
            <li><strong>No signup or login:</strong> Open the tool, upload, and extract instantly.</li>
            <li><strong>Fast for screenshots &amp; documents:</strong> App screenshots and PDFs convert especially well.</li>
            <li><strong>Free forever:</strong> No watermarks, no paywalls, unlimited usage.</li>
          </ul>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-primary" />
            Camera Photos vs Screenshots
          </h2>
          <p className="text-sm md:text-base text-muted-foreground">
            Screenshots are usually crystal clear, so OCR accuracy is excellent.
            Camera photos can be blurry, tilted, or low-light, which makes
            recognition harder. Tips for better results:
          </p>
          <ul className="list-disc list-inside text-sm md:text-base text-muted-foreground space-y-2">
            <li>Hold your phone steady and capture text straight-on.</li>
            <li>Ensure bright lighting with no strong shadows.</li>
            <li>Move closer instead of zooming — larger text = better accuracy.</li>
            <li>For digital content, use a screenshot instead of a photo.</li>
          </ul>
          <p className="text-xs md:text-sm text-muted-foreground">
            Even if the first try isn&apos;t perfect, crop the image or retake
            the photo to improve recognition.
          </p>
        </div>
      </section>

      {/* USE CASES & TIPS */}
      <section className="max-w-5xl mx-auto px-4 mt-12 grid gap-8 md:grid-cols-2">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <BookText className="w-5 h-5 text-primary" /> Popular Use Cases
          </h2>
          <ul className="list-disc list-inside text-sm md:text-base text-muted-foreground space-y-2">
            <li><strong>Study notes:</strong> Capture board notes or printed handouts and convert to editable text.</li>
            <li><strong>Receipts &amp; bills:</strong> Extract totals, dates, and details for budgeting or tax records.</li>
            <li><strong>Documents &amp; letters:</strong> Convert printed pages into digital text for editing or sharing.</li>
            <li><strong>Website screenshots:</strong> Copy text from banners, locked PDFs, or interfaces where selection is disabled.</li>
            <li><strong>Translation:</strong> Extract text, then paste into translation or AI tools for further processing.</li>
          </ul>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" /> Pro Tips for Sharper OCR
          </h2>
          <ul className="list-disc list-inside text-sm md:text-base text-muted-foreground space-y-2">
            <li>Use high-contrast text (dark text on light background).</li>
            <li>Crop unnecessary borders so text fills most of the image.</li>
            <li>Avoid heavy filters or low-resolution screenshots from messengers.</li>
            <li>For multi-page documents, convert each page separately for better control.</li>
          </ul>
          <p className="text-xs md:text-sm text-muted-foreground">
            TaskGuru&apos;s OCR is optimized for <strong>English</strong>. Other
            languages may work depending on character clarity.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-5xl mx-auto px-4 my-12 md:my-16 p-6 md:p-8 bg-card shadow rounded-xl border border-border/70">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-2">
          <Languages className="w-6 h-6 text-primary" /> Frequently Asked Questions
        </h2>
        <div className="space-y-6 text-sm md:text-base text-muted-foreground">
          {[
            {
              q: "Is this Image to Text Converter free to use?",
              a: "Yes. TaskGuru's Image to Text Converter is completely free with no signup required. Convert as many images as you want with no watermark or credit system.",
            },
            {
              q: "Are my images stored on your servers?",
              a: "No. The OCR runs directly in your browser using Tesseract.js, so your images stay on your device. We do not store or analyze your files on any backend server.",
            },
            {
              q: "Why does OCR work better on screenshots than camera photos?",
              a: "Screenshots are crystal clear and perfectly aligned, making text easy for the OCR engine to read. Camera photos may include blur, noise, shadows, or perspective distortion. Hold your phone steady, use better lighting, and fill the frame with text for best results.",
            },
            {
              q: "Does it support handwritten text?",
              a: "The tool is primarily optimized for printed text. Some neat handwriting may be partially recognized, but we recommend typed or printed content for best results.",
            },
            {
              q: "What can I do after extracting the text?",
              a: "Copy the text with one click and use it anywhere — in notes, documents, email, or Google Docs. You can also paste it into the TaskGuru AI Paraphraser to rewrite or polish the content instantly.",
            },
          ].map((faq, i) => (
            <div key={i} className="border-b pb-4 last:border-b-0">
              <h3 className="font-semibold text-foreground mb-1">{i + 1}. {faq.q}</h3>
              <p>{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ✅ FIX 4: Replaced <a> tags with <Link> for instant navigation */}
      <section className="max-w-6xl mx-auto px-4 mt-12 mb-16">
        <h2 className="text-2xl font-bold text-center mb-4">
          Explore More Free Tools by TaskGuru
        </h2>
        <p className="text-sm md:text-base text-muted-foreground text-center max-w-3xl mx-auto mb-8">
          Work faster by combining this OCR with other TaskGuru tools. Compress
          images, convert PDFs, paraphrase extracted text, and manage your
          documents — all in one place.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { href: "/tools/pdf-to-word", icon: <FileText className="w-4 h-4 text-primary" />, title: "PDF to Word Converter", desc: "Convert PDFs into fully editable DOCX documents in a few clicks." },
            { href: "/tools/merge-pdf", icon: <FileText className="w-4 h-4 text-primary" />, title: "Merge PDF Files", desc: "Combine multiple PDFs into a single organized document." },
            { href: "/tools/image-to-pdf", icon: <FileText className="w-4 h-4 text-primary" />, title: "Image to PDF", desc: "Turn JPG & PNG images into clean A4 PDFs for assignments and ID cards." },
            { href: "/tools/text-paraphraser", icon: <BookText className="w-4 h-4 text-primary" />, title: "AI Text Paraphraser", desc: "Paste extracted text and instantly rewrite it with AI." },
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
