'use client';

import { useState, useRef, DragEvent } from 'react';
import Head from 'next/head';
import Script from 'next/script';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Upload, FileText, Trash2, Loader2, Download, Wand2 } from 'lucide-react';
import { handlePdfToWord } from '@/app/actions';

export default function PdfToWord() {
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [fileDataUri, setFileDataUri] = useState<string | null>(null);
  const [convertedDoc, setConvertedDoc] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    validateAndSetFile(selectedFile);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    validateAndSetFile(droppedFile);
  };

  const validateAndSetFile = (selectedFile?: File) => {
    if (!selectedFile) return;
    if (selectedFile.type !== 'application/pdf') {
      toast({ title: 'Invalid file', description: 'Please upload a PDF file.', variant: 'destructive' });
      return;
    }
    if (selectedFile.size > MAX_FILE_SIZE) {
      toast({ title: 'File too large', description: 'Max size 10MB.', variant: 'destructive' });
      return;
    }
    setFile(selectedFile);
    setConvertedDoc(null);
    const reader = new FileReader();
    reader.onload = (e) => setFileDataUri(e.target?.result as string);
    reader.readAsDataURL(selectedFile);
  };

  const handleSubmit = async () => {
    if (!fileDataUri) {
      toast({ title: 'No file', description: 'Upload a PDF first.', variant: 'destructive' });
      return;
    }
    setIsLoading(true);
    setConvertedDoc(null);
    const result = await handlePdfToWord(fileDataUri);
    setIsLoading(false);

    if (result.success && result.data?.wordDataUri) {
      setConvertedDoc(result.data.wordDataUri);
      toast({ title: 'Success!', description: 'PDF converted.' });
    } else {
      toast({ title: 'Error', description: result.error, variant: 'destructive' });
    }
  };

  const handleDownload = () => {
    if (!convertedDoc) return;
    const link = document.createElement('a');
    link.href = convertedDoc;
    const originalFileName = file?.name.replace(/\.pdf$/i, '') || 'converted';
    link.download = `${originalFileName}.docx`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleReset = () => {
    setFile(null);
    setFileDataUri(null);
    setConvertedDoc(null);
    setIsLoading(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // ✅ FAQ Schema (includes all question keywords)
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How to convert PDF to Word?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Upload your PDF to TaskGuru’s PDF to Word converter, click Convert to Word, and download the editable DOCX instantly."
        }
      },
      {
        "@type": "Question",
        "name": "How to convert Word to PDF?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Use Word’s built-in Export as PDF or upload a .docx file to TaskGuru’s Word to PDF converter to download a PDF in seconds."
        }
      },
      {
        "@type": "Question",
        "name": "How to convert Word file to PDF?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Open the document, go to File → Save As → choose PDF. For a quick online method, use TaskGuru’s free Word to PDF tool."
        }
      },
      {
        "@type": "Question",
        "name": "How to convert Word to PDF in laptop?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "On a laptop, you can export from Microsoft Word or use TaskGuru’s online Word to PDF converter in your browser."
        }
      },
      {
        "@type": "Question",
        "name": "How to convert PDF to Word in laptop?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Open TaskGuru in your laptop’s browser, upload the PDF, click Convert to Word, then download the .docx file."
        }
      }
    ]
  };

  // ✅ Organization/WebApp Schema (lightweight)
  const webappSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "PDF to Word Converter",
    "url": "https://taskguru.online/pdf-to-word",
    "description": "Free online PDF to Word converter by TaskGuru. Convert PDF into editable Word documents instantly. Also convert Word to PDF.",
    "applicationCategory": "Utility",
    "operatingSystem": "All",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "publisher": {
      "@type": "Organization",
      "name": "TaskGuru",
      "url": "https://taskguru.online",
      "logo": "https://taskguru.online/logo.png"
    }
  };

  return (
    <>
      {/* ✅ SEO Meta Tags */}
      <Head>
        <title>Free PDF to Word Converter Online | Convert PDF to Word & Word to PDF | TaskGuru</title>
        <meta
          name="description"
          content="Convert PDF to Word online with TaskGuru. Free, fast PDF to Word converter that preserves formatting. Also convert Word to PDF with one click."
        />
        <meta
          name="keywords"
          content="pdf to word, pdf to word converter, convert pdf to word, word to pdf, word to pdf converter, free pdf converter, edit pdf, convert pdf, online pdf tools, convert word to pdf, convert pdf to word in laptop, convert word to pdf in laptop, how to convert pdf to word, how to convert word to pdf, how to convert word file to pdf"
        />
        <link rel="canonical" href="https://taskguru.online/pdf-to-word" />

        {/* OG Meta */}
        <meta property="og:title" content="Free PDF to Word Converter | TaskGuru" />
        <meta property="og:description" content="Easily convert PDFs to editable Word documents or back to PDF for free. No signup." />
        <meta property="og:url" content="https://taskguru.online/pdf-to-word" />
        <meta property="og:image" content="https://taskguru.online/og-image-pdf-word.jpg" />
        <meta property="og:type" content="website" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Free PDF to Word Converter Online" />
        <meta name="twitter:description" content="Convert PDF to Word & Word to PDF free online with TaskGuru." />
        <meta name="twitter:image" content="https://taskguru.online/og-image-pdf-word.jpg" />
      </Head>

      {/* ✅ Structured Data */}
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Script id="webapp-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webappSchema) }} />

      {/* ✅ Converter UI */}
      <Card className="w-full max-w-2xl mx-auto shadow-lg">
        <CardContent className="p-6">
          {!file ? (
            <div
              className={`flex flex-col items-center justify-center space-y-4 p-12 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
                isDragging ? 'border-primary bg-primary/5' : 'hover:border-primary'
              }`}
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
            >
              <div className="p-4 bg-secondary rounded-full">
                <Upload className="w-10 h-10 text-muted-foreground" />
              </div>
              <div className="text-center">
                <p className="font-semibold">Click to upload or drag & drop</p>
                <p className="text-sm text-muted-foreground">PDF (Max 10MB)</p>
              </div>
              <Input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept="application/pdf"
                onChange={handleFileChange}
              />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center space-y-4 p-12">
              <FileText className="w-16 h-16 text-primary" />
              <p className="font-semibold text-center">{file.name}</p>
              <p className="text-sm text-muted-foreground">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
            </div>
          )}
        </CardContent>

        {file && (
          <CardFooter className="flex justify-center gap-4 bg-muted/50 p-4 border-t">
            <Button variant="outline" onClick={handleReset} disabled={isLoading}>
              <Trash2 className="mr-2 h-4 w-4" /> Reset
            </Button>
            <Button onClick={handleSubmit} disabled={isLoading || !!convertedDoc}>
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
              Convert to Word
            </Button>
            <Button onClick={handleDownload} disabled={!convertedDoc || isLoading}>
              <Download className="mr-2 h-4 w-4" /> Download
            </Button>
          </CardFooter>
        )}
      </Card>

      {/* ✅ Internal Linking Block */}
      <section className="max-w-3xl mx-auto my-12 p-6 bg-muted/50 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">You may also like</h2>
        <ul className="list-disc list-inside space-y-2">
          <li><a href="/word-to-pdf" className="text-primary hover:underline">Convert Word to PDF</a></li>
          <li><a href="/pdf-compressor" className="text-primary hover:underline">Compress PDF Files</a></li>
          <li><a href="/merge-pdf" className="text-primary hover:underline">Merge PDF Files</a></li>
          <li><a href="/split-pdf" className="text-primary hover:underline">Split PDF into Pages</a></li>
          <li><a href="/tools/image-compressor" className="text-primary hover:underline">Image Compressor</a></li>
          <li><a href="/tools/background-remover" className="text-primary hover:underline">Background Remover</a></li>
          <li><a href="/tools/image-to-text" className="text-primary hover:underline">Image to Text (OCR)</a></li>
          <li><a href="/text-paraphraser" className="text-primary hover:underline">AI Text Paraphraser</a></li>
        </ul>
      </section>

      {/* ✅ Visible FAQ Section */}
      <section className="max-w-3xl mx-auto my-12 p-6 bg-white shadow rounded-lg">
        <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4 text-left">
          <div>
            <h3 className="font-semibold">How to convert PDF to Word?</h3>
            <p>Upload your PDF file, click <em>Convert to Word</em>, and download the editable .docx instantly using TaskGuru.</p>
          </div>
          <div>
            <h3 className="font-semibold">How to convert Word to PDF?</h3>
            <p>Use Word’s Export as PDF, or upload your .docx to TaskGuru’s Word to PDF tool to download a PDF in seconds.</p>
          </div>
          <div>
            <h3 className="font-semibold">How to convert Word file to PDF?</h3>
            <p>Open the file in Word → File → Save As → PDF. For a quick online method, use TaskGuru’s free converter.</p>
          </div>
          <div>
            <h3 className="font-semibold">How to convert Word to PDF in laptop?</h3>
            <p>On a laptop, either export from Microsoft Word or use TaskGuru’s browser-based Word to PDF converter.</p>
          </div>
          <div>
            <h3 className="font-semibold">How to convert PDF to Word in laptop?</h3>
            <p>Open TaskGuru in your browser, upload the PDF, click Convert, and download the .docx file—all on your laptop.</p>
          </div>
        </div>
      </section>
    </>
  );
}
