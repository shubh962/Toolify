'use client';
import { useState, useRef } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Script from 'next/script';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Upload, Loader2, Copy, Trash2, ScanText } from 'lucide-react';
import { handleImageToText as serverHandleImageToText } from '@/app/actions';
import { Textarea } from '@/components/ui/textarea';
import { Skeleton } from '@/components/ui/skeleton';

export default function ImageToText() {
  const { toast } = useToast();
  // 🛑 WORKING CODE UNTOUCHED 🛑
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
  // 🛑 WORKING CODE ENDS 🛑


  // ✅ UPDATED JSON-LD FAQ Schema (High-Content for SEO/AdSense)
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Is TaskGuru’s Image to Text OCR tool completely free?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, our Image to Text converter uses powerful OCR technology and is 100% free to use. There are no limits on how many photos or scans you can process."
        }
      },
      {
        "@type": "Question",
        "name": "Can I extract text from handwritten or low-quality scanned images?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "TaskGuru's OCR is optimized for high accuracy on printed text. While it attempts to recognize handwritten text, performance is best on clearly scanned or photographed documents and typed text."
        }
      },
      {
        "@type": "Question",
        "name": "Is my uploaded image data secure and private?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Your privacy is guaranteed. Images uploaded for OCR are processed instantly over a secure connection and are permanently deleted from our servers immediately after the text is extracted."
        }
      }
    ]
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
        
        <link rel="canonical" href="https://taskguru.online/tools/image-to-text" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Free Image to Text Converter Online | TaskGuru" />
        <meta property="og:description" content="Extract text from images online free. Upload JPG, PNG, WEBP and convert into editable text instantly using OCR." />
        <meta property="og:url" content="https://taskguru.online/tools/image-to-text" />
        <meta property="og:image" content="https://www.taskguru.online/og-image-to-text.jpg" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Image to Text Converter Online Free | TaskGuru" />
        <meta name="twitter:description" content="Free OCR tool to extract text from images online. How to convert image to text? Use TaskGuru now." />
        <meta name="twitter:image" content="https://www.taskguru.online/og-image-to-text.jpg" />

        {/* JSON-LD FAQ Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema)
          }}
        />
      </Head>

      {/* Intro Section */}
      <section className="max-w-4xl mx-auto py-8 text-center space-y-4">
        {/* ✅ SEO FIX: H1 को H3 में बदला गया */}
        <h3 className="text-3xl font-bold">Free Image to Text Converter (OCR) Online</h3>
        <p className="text-muted-foreground">
          Convert images into editable text instantly with our free <strong>Image to Text Converter</strong>. 
          Upload PNG, JPG, or WEBP files and extract text using powerful <strong>OCR (Optical Character Recognition)</strong> technology. 
          No signup required — fast, accurate, and secure.
        </p>
      </section>

      {/* OCR Tool (Main Upload/Work Area) */}
      <Card className="w-full max-w-4xl mx-auto shadow-lg">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col space-y-4">
              <h3 className="font-semibold text-xl text-center">Upload Image</h3>
              {image ? (
                <div className="relative aspect-video w-full rounded-lg overflow-hidden border">
                  {/* Replaced Next/Image layout="fill" with basic <img> for simpler handling */}
                  <img src={image} alt="Uploaded for OCR" className="object-contain w-full h-full absolute top-0 left-0" />
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
              <h3 className="font-semibold text-lg text-center">Extracted Text Result</h3>
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

      {/* ✅ NEW: Before and After Demo Section (Performance Optimized) */}
      <section className="max-w-4xl mx-auto py-10">
        <h2 className="text-2xl font-bold text-center mb-8 text-foreground">
          See the Accuracy: Image to Editable Text Demo
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-muted/50 dark:bg-gray-800 rounded-xl shadow-inner">
          
          {/* Before Image */}
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-3 text-red-500">ORIGINAL (Before OCR)</h3>
            <div className="relative aspect-video rounded-lg overflow-hidden border-2 border-red-400 dark:border-red-600">
              <Image 
                src="/tool-previews/ocr-before.png" 
                alt="Original scanned image or photo" 
                fill 
                className="object-contain"
                loading="lazy" 
                sizes="(max-width: 768px) 50vw, 30vw"
              />
            </div>
          </div>
          
          {/* After Image */}
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-3 text-green-500">PROCESSED (After OCR)</h3>
            <div className="relative aspect-video rounded-lg overflow-hidden border-2 border-green-400 dark:border-green-600">
              <Image 
                src="/tool-previews/ocr-after.png" 
                alt="Extracted text result" 
                fill 
                className="object-contain"
                loading="lazy" 
                sizes="(max-width: 768px) 50vw, 30vw"
              />
            </div>
          </div>
          
        </div>
      </section>
      {/* 🛑 END OF NEW SECTION 🛑 */}


      {/* Features Section */}
      <section className="max-w-4xl mx-auto py-10 grid md:grid-cols-2 gap-8">
        <div>
          {/* ✅ H2 को H3 में बदला गया */}
          <h3 className="text-xl font-semibold">Why use TaskGuru Image to Text Converter?</h3>
          <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-4">
            <li>✔ 100% Free online OCR tool</li>
            <li>✔ Extract text from images (JPG, PNG, WEBP)</li>
            <li>✔ Convert scanned photos into editable text</li>
            <li>✔ Copy and download text easily</li>
            <li>✔ Works on mobile & desktop</li>
            <li>✔ No registration required</li>
          </ul>
        </div>
        <div>
          {/* ✅ H2 को H3 में बदला गया */}
          <h3 className="text-xl font-semibold">Supported Use Cases</h3>
          <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-4">
            <li>📸 Extract notes from handwritten images</li>
            <li>📄 Convert scanned documents into text</li>
            <li>📚 Digitize books, receipts, or forms</li>
            <li>🌐 Translate text after extraction</li>
            <li>📧 Copy text directly into Word or Email</li>
          </ul>
        </div>
      </section>

      {/* How To Guide */}
      <section className="max-w-4xl mx-auto py-10">
        <h2 className="text-xl font-semibold text-center">How to Convert Image to Text Online?</h2>
        <ol className="list-decimal list-inside text-muted-foreground space-y-2 mt-4">
          <li>Upload your image (JPG, PNG, WEBP) by clicking the upload box.</li>
          <li>Click on <strong>Extract Text</strong> to start OCR processing.</li>
          <li>Copy or download the extracted text instantly.</li>
        </ol>
        <p className="mt-4 text-center">
          That’s it! Your image is now converted into editable text for free.
        </p>
      </section>

      {/* ✅ UPDATED FAQ Section (H2 maintained) */}
      <section className="max-w-4xl mx-auto my-8 sm:my-12 p-6 bg-white dark:bg-gray-900 shadow rounded-lg border border-gray-100 dark:border-gray-800">
        <h2 className="text-xl sm:text-2xl font-bold mb-6 text-gray-900 dark:text-white">Frequently Asked Questions (FAQ)</h2>
        <div className="space-y-6 text-left">
          {faqSchema.mainEntity.map((item, index) => (
            <div key={index} className="border-b pb-4 last:border-b-0">
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white">{item.name}</h3>
              <p className="text-gray-600 dark:text-gray-400 mt-2">{item.acceptedAnswer.text}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
