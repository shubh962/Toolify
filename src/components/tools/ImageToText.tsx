'use client';

import { useState, useRef } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';

import {
  Upload,
  Loader2,
  Copy,
  Trash2,
  ScanText,
  FileText,
  Sparkles,
  ShieldCheck,
  Clock,
  BookText,
  Languages,
} from 'lucide-react';

export default function ImageToText() {
  const { toast } = useToast();

  const [image, setImage] = useState<string | null>(null);
  const [extractedText, setExtractedText] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // ------------------------
  // FILE UPLOAD HANDLER
  // ------------------------
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 4 * 1024 * 1024) {
      toast({
        title: 'File too large',
        description: 'Please upload an image smaller than 4MB (max 4MB).',
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

  // ------------------------
  // OCR VIA TESSERACT.JS
  // ------------------------
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

      // 🔁 Dynamic import – safe for Next.js
      const { createWorker } = await import('tesseract.js');

      const worker = await createWorker('eng', 1, {
        logger: (m) => {
          // console.log(m); // enable if you want progress in console
        },
      });

      const {
        data: { text },
      } = await worker.recognize(image);

      await worker.terminate();

      const cleanText = text.trim();

      if (!cleanText) {
        toast({
          title: 'No clear text found',
          description:
            'OCR completed but no readable text was detected. Try uploading a sharper, well-lit image or a screenshot.',
          variant: 'destructive',
        });
      }

      setExtractedText(cleanText);

      toast({
        title: 'Success!',
        description: 'Text extracted successfully using OCR.',
      });
    } catch (error) {
      console.error('❌ Tesseract OCR error:', error);
      toast({
        title: 'OCR failed',
        description:
          'Failed to extract text from image. Please try with a clearer or well-lit photo.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // ------------------------
  // COPY TO CLIPBOARD
  // ------------------------
  const handleCopy = () => {
    if (!extractedText) return;
    navigator.clipboard.writeText(extractedText);
    toast({ title: 'Copied to clipboard!' });
  };

  // ------------------------
  // RESET TOOL
  // ------------------------
  const handleReset = () => {
    setImage(null);
    setExtractedText('');
    setIsLoading(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <>
      {/* HERO / INTRO */}
      <section className="max-w-5xl mx-auto py-10 px-4 text-center space-y-4">
        <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1 text-xs font-semibold text-primary">
          <Sparkles className="w-3 h-3" />
          Free Online OCR • No Signup Required
        </span>
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
          Image to Text Converter (OCR) – Free Online Tool
        </h1>
        <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
          Convert images into editable text in seconds. Upload a{' '}
          <strong>JPG, PNG, or WEBP photo</strong> and our OCR engine extracts the text
          for you — perfect for notes, receipts, documents, screenshots, and more. All
          processing happens in your browser, so your data stays private.
        </p>
        <p className="text-xs md:text-sm text-muted-foreground max-w-3xl mx-auto">
          Tip: For the <strong>best accuracy</strong>, use clear screenshots or
          well-lit photos with sharp text. Handwritten or blurry photos may give
          weaker results, but you can still try multiple images until you’re happy.
        </p>
      </section>

      {/* MAIN TOOL CARD */}
      <Card className="w-full max-w-5xl mx-auto shadow-xl border border-border/70">
        <CardContent className="p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* LEFT: IMAGE UPLOAD / PREVIEW */}
            <div className="flex flex-col space-y-4">
              <h2 className="font-semibold text-xl text-center flex items-center justify-center gap-2">
                <Upload className="w-5 h-5 text-primary" />
                Upload Image
              </h2>

              {image ? (
                <div className="relative aspect-[3/5] w-full rounded-lg overflow-hidden border bg-muted">
                  <img
                    src={image}
                    alt="Uploaded for OCR"
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
                      Supported: JPG, PNG, WEBP • Max size: 4MB
                    </p>
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

            {/* RIGHT: OCR RESULT */}
            <div className="flex flex-col space-y-4">
              <h2 className="font-semibold text-xl text-center flex items-center justify-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Extracted Text Result
              </h2>
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

        {/* ACTION BUTTONS */}
        {image && (
          <CardFooter className="flex flex-col md:flex-row items-center justify-center gap-4 bg-muted/60 p-4 border-t">
            <Button
              variant="outline"
              onClick={handleReset}
              className="w-full md:w-auto"
            >
              <Trash2 className="mr-2 h-4 w-4" /> Reset
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full md:w-auto"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Extracting…
                </>
              ) : (
                <>
                  <ScanText className="mr-2 h-4 w-4" />
                  Extract Text
                </>
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
            Why use TaskGuru Image to Text Converter?
          </h2>
          <p className="text-sm md:text-base text-muted-foreground">
            Our Image to Text Converter (OCR) is designed to help students,
            creators, professionals, and everyday users save time. Instead of
            typing everything manually from a photo or screenshot, you can simply
            upload the image and copy the extracted text in one click.
          </p>
          <ul className="list-disc list-inside text-sm md:text-base text-muted-foreground space-y-2">
            <li>
              <strong>100% browser-based:</strong> The OCR runs on your device,
              so your images are not stored on any external server.
            </li>
            <li>
              <strong>No signup or login:</strong> Just open the tool, upload an
              image, and start extracting text.
            </li>
            <li>
              <strong>Fast for screenshots &amp; documents:</strong> Screenshots of
              apps, web pages, and PDFs convert especially well.
            </li>
            <li>
              <strong>Free forever:</strong> Use it as many times as you want with
              no watermarks or paywalls.
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-primary" />
            Best results: camera photos vs screenshots
          </h2>
          <p className="text-sm md:text-base text-muted-foreground">
            Screenshots are usually very sharp, so OCR accuracy is excellent.
            Camera photos can sometimes be blurry, tilted, or low-light, which
            makes recognition harder. You can still use photos, but keep these
            tips in mind:
          </p>
          <ul className="list-disc list-inside text-sm md:text-base text-muted-foreground space-y-2">
            <li>Hold your phone steady and capture the text from the front.</li>
            <li>Ensure the lighting is bright and there are no strong shadows.</li>
            <li>
              Avoid zooming too much; instead, move closer so the text is large
              and clear.
            </li>
            <li>
              If the text is very small, take a screenshot (for digital content)
              or move closer (for printed pages).
            </li>
          </ul>
          <p className="text-xs md:text-sm text-muted-foreground">
            Even if the first try is not perfect, you can crop the image,
            retake the photo, or try another angle to improve recognition.
          </p>
        </div>
      </section>

      {/* USE CASES & TIPS */}
      <section className="max-w-5xl mx-auto px-4 mt-12 grid gap-8 md:grid-cols-2">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <BookText className="w-5 h-5 text-primary" />
            Popular use cases
          </h2>
          <ul className="list-disc list-inside text-sm md:text-base text-muted-foreground space-y-2">
            <li>
              <strong>Study notes:</strong> Capture notes from the board, slides,
              or printed handouts and convert them into editable text.
            </li>
            <li>
              <strong>Receipts &amp; bills:</strong> Extract totals, dates, and
              important information from receipts for budgeting or tax records.
            </li>
            <li>
              <strong>Documents &amp; letters:</strong> Convert printed pages into
              digital text that you can edit or share.
            </li>
            <li>
              <strong>Website screenshots:</strong> Copy text from banners,
              locked PDFs, or interfaces where selection is disabled.
            </li>
            <li>
              <strong>Translation and summarization:</strong> After extracting
              text, you can paste it into translation or AI tools for further
              processing.
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" />
            Pro tips for sharper OCR
          </h2>
          <ul className="list-disc list-inside text-sm md:text-base text-muted-foreground space-y-2">
            <li>Use high-contrast text (dark text on light background).</li>
            <li>
              Crop unnecessary borders before uploading so that the text occupies
              most of the image.
            </li>
            <li>
              Avoid heavy filters or low-resolution screenshots taken from
              messengers or status images.
            </li>
            <li>
              For multi-page documents, convert each page separately for better
              control.
            </li>
          </ul>
          <p className="text-xs md:text-sm text-muted-foreground">
            TaskGuru’s OCR currently focuses on <strong>English (eng)</strong>.
            For other languages you can still experiment, but the accuracy will
            depend on the characters and clarity of the image.
          </p>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="max-w-5xl mx-auto px-4 my-12 md:my-16 p-6 md:p-8 bg-card shadow rounded-xl border border-border/70">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-2">
          <Languages className="w-6 h-6 text-primary" />
          Frequently Asked Questions
        </h2>
        <div className="space-y-6 text-left text-sm md:text-base text-muted-foreground">
          <div className="border-b pb-4 last:border-b-0">
            <h3 className="font-semibold text-foreground mb-1">
              1. Is this Image to Text Converter free to use?
            </h3>
            <p>
              Yes. TaskGuru’s Image to Text Converter is completely free with no
              signup required. You can convert as many images as you want without
              any watermark or credit system.
            </p>
          </div>
          <div className="border-b pb-4 last:border-b-0">
            <h3 className="font-semibold text-foreground mb-1">
              2. Are my images stored on your servers?
            </h3>
            <p>
              No. The OCR runs directly in your browser using Tesseract.js, so
              your images stay on your device. We do not store or analyze your
              files on any backend server, which makes this tool a great choice
              for sensitive documents.
            </p>
          </div>
          <div className="border-b pb-4 last:border-b-0">
            <h3 className="font-semibold text-foreground mb-1">
              3. Why does OCR work better on screenshots than on camera photos?
            </h3>
            <p>
              Screenshots are usually crystal clear and perfectly aligned, so the
              text is easy for the OCR engine to read. Camera photos may include
              blur, noise, shadows, or perspective distortion, which can reduce
              accuracy. Try holding your phone steady, using better lighting, and
              filling the frame with text for better results.
            </p>
          </div>
          <div className="border-b pb-4 last:border-b-0">
            <h3 className="font-semibold text-foreground mb-1">
              4. Does it support handwritten text?
            </h3>
            <p>
              The tool is primarily optimized for printed text. Some neat and
              clearly written handwriting may be partially recognized, but we
              recommend typed or printed content whenever possible.
            </p>
          </div>
          <div className="pb-2">
            <h3 className="font-semibold text-foreground mb-1">
              5. What can I do after extracting the text?
            </h3>
            <p>
              Once the text appears in the result box, you can copy it with one
              click and use it anywhere — in notes, documents, email, Google
              Docs, or AI tools. You can also paste it into other TaskGuru tools
              like the <strong>AI Paraphraser</strong> to rewrite or polish the
              content instantly.
            </p>
          </div>
        </div>
      </section>

      {/* EXPLORE MORE TOOLS – ALL 6 */}
      <section className="max-w-6xl mx-auto px-4 mt-12 mb-16">
        <h2 className="text-2xl font-bold text-center mb-6">
          Explore More Free Tools by TaskGuru
        </h2>
        <p className="text-sm md:text-base text-muted-foreground text-center max-w-3xl mx-auto mb-8">
          Work faster by combining this OCR with other tools from TaskGuru. Compress
          images, convert PDFs, paraphrase extracted text, and manage your documents
          — all in one place.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <a href="/tools/pdf-to-word">
            <div className="p-4 border rounded-xl hover:shadow-md transition cursor-pointer bg-card h-full flex flex-col justify-between">
              <div className="space-y-2">
                <h3 className="font-bold flex items-center gap-2">
                  <FileText className="w-4 h-4 text-primary" />
                  PDF to Word Converter
                </h3>
                <p className="text-xs text-muted-foreground">
                  Convert your PDF files into fully editable DOCX documents in a
                  few clicks — perfect for resumes, reports, and assignments.
                </p>
              </div>
              <p className="mt-3 text-xs font-semibold text-primary">
                Use Tool →
              </p>
            </div>
          </a>

          <a href="/tools/merge-pdf">
            <div className="p-4 border rounded-xl hover:shadow-md transition cursor-pointer bg-card h-full flex flex-col justify-between">
              <div className="space-y-2">
                <h3 className="font-bold flex items-center gap-2">
                  <FileText className="w-4 h-4 text-primary" />
                  Merge PDF Files Online
                </h3>
                <p className="text-xs text-muted-foreground">
                  Combine multiple PDF files into a single, organized document.
                  Ideal for project files, ebooks, and scanned pages.
                </p>
              </div>
              <p className="mt-3 text-xs font-semibold text-primary">
                Use Tool →
              </p>
            </div>
          </a>

          <a href="/tools/image-compressor">
            <div className="p-4 border rounded-xl hover:shadow-md transition cursor-pointer bg-card h-full flex flex-col justify-between">
              <div className="space-y-2">
                <h3 className="font-bold flex items-center gap-2">
                  <Upload className="w-4 h-4 text-primary" />
                  Image Compressor
                </h3>
                <p className="text-xs text-muted-foreground">
                  Reduce image size without visible quality loss. Perfect for
                  faster websites, emails, and uploads.
                </p>
              </div>
              <p className="mt-3 text-xs font-semibold text-primary">
                Use Tool →
              </p>
            </div>
          </a>

          <a href="/tools/background-remover">
            <div className="p-4 border rounded-xl hover:shadow-md transition cursor-pointer bg-card h-full flex flex-col justify-between">
              <div className="space-y-2">
                <h3 className="font-bold flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-primary" />
                  Background Remover (AI)
                </h3>
                <p className="text-xs text-muted-foreground">
                  Remove backgrounds from product photos, portraits, or graphics
                  instantly using AI.
                </p>
              </div>
              <p className="mt-3 text-xs font-semibold text-primary">
                Use Tool →
              </p>
            </div>
          </a>

          <a href="/tools/image-to-pdf">
            <div className="p-4 border rounded-xl hover:shadow-md transition cursor-pointer bg-card h-full flex flex-col justify-between">
              <div className="space-y-2">
                <h3 className="font-bold flex items-center gap-2">
                  <FileText className="w-4 h-4 text-primary" />
                  Image to PDF Converter
                </h3>
                <p className="text-xs text-muted-foreground">
                  Turn JPG &amp; PNG images into clean A4 PDFs — great for
                  submitting assignments, ID cards, and scanned documents.
                </p>
              </div>
              <p className="mt-3 text-xs font-semibold text-primary">
                Use Tool →
              </p>
            </div>
          </a>

          <a href="/tools/text-paraphraser">
            <div className="p-4 border rounded-xl hover:shadow-md transition cursor-pointer bg-card h-full flex flex-col justify-between">
              <div className="space-y-2">
                <h3 className="font-bold flex items-center gap-2">
                  <BookText className="w-4 h-4 text-primary" />
                  AI Text Paraphraser
                </h3>
                <p className="text-xs text-muted-foreground">
                  Paste your extracted text and instantly rewrite it in a cleaner,
                  more professional way with AI.
                </p>
              </div>
              <p className="mt-3 text-xs font-semibold text-primary">
                Use Tool →
              </p>
            </div>
          </a>
        </div>
      </section>
    </>
  );
}
