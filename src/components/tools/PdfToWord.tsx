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

  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB limit

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
      toast({ title: 'Invalid file type', description: 'Please upload a PDF file.', variant: 'destructive' });
      return;
    }
    if (selectedFile.size > MAX_FILE_SIZE) {
      toast({ title: 'File too large', description: 'Please upload a PDF smaller than 10MB.', variant: 'destructive' });
      return;
    }
    setFile(selectedFile);
    setConvertedDoc(null);
    const reader = new FileReader();
    reader.onload = (e) => {
      setFileDataUri(e.target?.result as string);
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleSubmit = async () => {
    if (!fileDataUri) {
      toast({ title: "No file selected", description: "Please upload a PDF file first.", variant: "destructive" });
      return;
    }
    setIsLoading(true);
    setConvertedDoc(null);
    const result = await handlePdfToWord(fileDataUri);
    setIsLoading(false);

    if (result.success && result.data?.wordDataUri) {
      setConvertedDoc(result.data.wordDataUri);
      toast({ title: "Success!", description: "PDF converted successfully." });
    } else {
      toast({ title: "Error", description: result.error, variant: "destructive" });
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

  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "PDF to Word Converter",
    "url": "https://taskguru.online/pdf-to-word",
    "description": "Free online PDF to Word converter by TaskGuru. Convert your PDF files into editable Word documents instantly.",
    "applicationCategory": "Utility",
    "operatingSystem": "All",
    "browserRequirements": "Requires JavaScript. Compatible with modern browsers.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
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
        <title>Convert PDF to Word Online | TaskGuru</title>
        <meta name="description" content="Free online PDF to Word converter by TaskGuru. Convert your PDF files into editable Word documents instantly." />
        <meta name="keywords" content="PDF to Word, online converter, TaskGuru, free PDF converter, document conversion" />
        <link rel="canonical" href="https://taskguru.online/pdf-to-word" />

        {/* ✅ Open Graph Tags */}
        <meta property="og:title" content="Convert PDF to Word Online | TaskGuru" />
        <meta property="og:description" content="Easily convert PDF files to editable Word documents for free with TaskGuru." />
        <meta property="og:url" content="https://taskguru.online/pdf-to-word" />
        <meta property="og:image" content="https://taskguru.online/og-image.png" />
        <meta property="og:type" content="website" />

        {/* ✅ Twitter Card Meta */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Convert PDF to Word Online | TaskGuru" />
        <meta name="twitter:description" content="Free online tool to convert PDFs into editable Word documents." />
        <meta name="twitter:image" content="https://taskguru.online/og-image.png" />
      </Head>

      {/* ✅ JSON-LD Structured Data */}
      <Script
        id="pdf-to-word-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      />

      <Card className="w-full max-w-2xl mx-auto shadow-lg">
        <CardContent className="p-6">
          {!file ? (
            <div
              className={`flex flex-col items-center justify-center space-y-4 p-12 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${isDragging ? 'border-primary bg-primary/5' : 'hover:border-primary'}`}
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
    </>
  );
}
