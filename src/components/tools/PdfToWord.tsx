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
  // Working Code (State)
  const [file, setFile] = useState<File | null>(null);
  const [fileDataUri, setFileDataUri] = useState<string | null>(null);
  const [convertedDoc, setConvertedDoc] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

  // Working Code (Handlers)
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
    // 🛑 WORKING CODE UNTOUCHED 🛑
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
  // 🛑 WORKING CODE ENDS 🛑

  // ✅ UPDATED FAQ Schema for SEO/AdSense
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Is TaskGuru's PDF to Word converter free, and is there a file size limit?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, our converter is 100% free with no sign-up required. The maximum file size supported is 10MB to ensure fast processing and optimal server performance."
        }
      },
      {
        "@type": "Question",
        "name": "Will the document formatting be preserved during the conversion?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "TaskGuru uses advanced conversion technology designed to preserve the original PDF layout, fonts, images, and tables as accurately as possible when converting to an editable DOCX format."
        }
      },
      {
        "@type": "Question",
        "name": "Is it safe and secure to upload confidential PDF documents?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, your security is our priority. Uploaded files are processed over a secure connection and are immediately deleted from our servers after the conversion is complete, ensuring your data remains private."
        }
      }
    ]
  };

  const webappSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "PDF to Word Converter",
    "url": "https://taskguru.online/tools/pdf-to-word",
    "description": "Free online PDF to Word converter by TaskGuru. Convert PDF into editable Word documents instantly while preserving formatting.",
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
      {/* ✅ SEO Meta Tags (High-Reach Keywords) */}
      <Head>
        <title>Free PDF to Word Converter Online: Keep Formatting | TaskGuru DOCX Tool</title>
        <meta
          name="description"
          content="Free, fast & secure tool to convert PDF to Word online (DOCX). Preserve all original formatting, tables, and images. Get editable Word files instantly."
        />
        <meta
          name="keywords"
          content="pdf to word, pdf to word converter, convert pdf to word, free pdf converter, edit pdf, convert pdf, online pdf tools, pdf to docx, pdf formatting, convert pdf to editable word, pdf to microsoft word free, pdf to docx online free"
        />
        <link rel="canonical" href="https://taskguru.online/tools/pdf-to-word" />
      </Head>

      {/* ✅ Structured Data */}
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Script id="webapp-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webappSchema) }} />

      {/* ✅ Converter UI */}
      <Card className="w-full max-w-2xl mx-auto shadow-lg my-6">
        <CardContent className="p-4 sm:p-6">
          {!file ? (
            <div
              className={`flex flex-col items-center justify-center space-y-4 p-8 sm:p-12 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
                isDragging ? 'border-primary bg-primary/5' : 'hover:border-primary'
              }`}
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
            >
              <div className="p-4 bg-secondary rounded-full">
                <Upload className="w-8 h-8 sm:w-10 sm:h-10 text-muted-foreground" />
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
            <div className="flex flex-col items-center justify-center space-y-4 p-8 sm:p-12">
              <FileText className="w-12 h-12 sm:w-16 sm:h-16 text-primary" />
              <p className="font-semibold text-center break-words">{file.name}</p>
              <p className="text-sm text-muted-foreground">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
            </div>
          )}
        </CardContent>

        {file && (
          <CardFooter className="flex flex-wrap justify-center gap-3 sm:gap-4 bg-muted/50 p-4 border-t">
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

      {/* 🛑 DELETED: Old "You may also like" Section (क्योंकि अब MoreTools है) */}

      {/* ✅ UPDATED FAQ Section (Simple structure to solve the copy issue) */}
      <section className="max-w-3xl mx-auto my-8 sm:my-12 p-6 bg-white dark:bg-gray-900 shadow rounded-lg border border-gray-100 dark:border-gray-800">
        <h2 className="text-xl sm:text-2xl font-bold mb-6 text-gray-900 dark:text-white">Frequently Asked Questions</h2>
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
