'use client';

import { useState } from 'react';
import Head from 'next/head';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, Upload, FileText, Download } from 'lucide-react';

export default function PdfToWord() {
  const [file, setFile] = useState<File | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [converted, setConverted] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
      setConverted(false);
    }
  };

  const handleConvert = () => {
    if (!file) return;
    setIsConverting(true);
    setTimeout(() => {
      setIsConverting(false);
      setConverted(true);
    }, 2000);
  };

  const handleDownload = () => {
    // Temporary download (replace with backend-generated file)
    const blob = new Blob(['Sample Word Content'], {
      type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'converted.docx';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      {/* ✅ SEO Meta Tags */}
      <Head>
        <title>Free Online PDF to Word Converter | Convert PDF to DOCX | TaskGuru</title>
        <meta
          name="description"
          content="Convert PDF to Word documents online with TaskGuru’s free PDF to Word converter. Preserve formatting, fast conversion, and no watermark."
        />
        <meta
          name="keywords"
          content="
            pdf to word,
            convert pdf online,
            pdf to docx free,
            online pdf converter,
            pdf to word without watermark,
            free pdf tools,
            taskguru pdf to word converter"
        />
        <link rel="canonical" href="https://taskguru.online/tools/pdf-to-word" />
      </Head>

      {/* ✅ Hero Section */}
      <section className="max-w-4xl mx-auto text-center py-10 space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">
          Free PDF to Word Converter
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Convert your PDF documents into fully editable Word files instantly.  
          <strong>No watermarks, no signup, 100% free.</strong>
        </p>
      </section>

      {/* ✅ Main Card */}
      <Card className="w-full max-w-3xl mx-auto shadow-xl border rounded-2xl">
        <CardContent className="p-8 text-center space-y-6">
          {/* Upload Box */}
          <label
            htmlFor="file-upload"
            className="flex flex-col items-center justify-center w-full h-40 cursor-pointer border-2 border-dashed rounded-xl hover:bg-muted/30 transition"
          >
            <Upload className="h-10 w-10 text-muted-foreground mb-2" />
            <span className="text-sm text-muted-foreground">
              Click to upload or drag & drop your PDF here
            </span>
            <Input
              id="file-upload"
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>

          {/* File Selected */}
          {file && (
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground bg-muted/20 p-2 rounded-md">
              <FileText className="h-4 w-4" />
              {file.name}
            </div>
          )}
        </CardContent>

        {/* Action Buttons */}
        <CardFooter className="flex flex-col sm:flex-row justify-center gap-4 bg-muted/50 border-t p-6">
          <Button
            size="lg"
            onClick={handleConvert}
            disabled={isConverting || !file}
            className="px-6 py-2 text-lg rounded-xl shadow-md"
          >
            {isConverting ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              <Upload className="mr-2 h-5 w-5" />
            )}
            {isConverting ? 'Converting...' : 'Convert to Word'}
          </Button>

          {converted && (
            <Button
              size="lg"
              onClick={handleDownload}
              className="px-6 py-2 text-lg rounded-xl shadow-md"
              variant="outline"
            >
              <Download className="mr-2 h-5 w-5" /> Download Word File
            </Button>
          )}
        </CardFooter>
      </Card>

      {/* ✅ SEO Content Section */}
      <section className="max-w-4xl mx-auto my-12 p-6 bg-muted/30 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">Why Use TaskGuru’s PDF to Word Converter?</h2>
        <p className="mb-4">
          TaskGuru’s <strong>free PDF to Word tool</strong> helps you transform PDF documents into fully editable
          Word files with just a single click. Unlike other converters, our tool ensures high-quality formatting
          and is completely watermark-free.
        </p>
        <h3 className="text-xl font-semibold mt-6 mb-2">Frequently Asked Questions</h3>
        <ul className="space-y-3 text-muted-foreground">
          <li>
            <strong>1. Is TaskGuru’s PDF to Word converter free?</strong><br />
            ✅ Yes, our tool is 100% free and requires no signup.
          </li>
          <li>
            <strong>2. Will my formatting be preserved?</strong><br />
            ✅ Yes, we ensure that fonts, tables, and layouts remain intact during conversion.
          </li>
          <li>
            <strong>3. Can I convert multiple PDFs?</strong><br />
            ✅ Yes, you can convert unlimited files, one at a time, without restrictions.
          </li>
          <li>
            <strong>4. Is my data secure?</strong><br />
            ✅ Absolutely. Your files are never stored; all conversions happen securely.
          </li>
        </ul>
      </section>

      {/* ✅ Footer with internal links */}
      <footer className="max-w-4xl mx-auto py-10 mt-12 text-center text-muted-foreground">
        <p>
          Explore more on{' '}
          <a href="https://taskguru.online" className="text-primary underline">
            TaskGuru
          </a>
          :{' '}
          <a href="https://taskguru.online/blog" className="text-primary underline">
            Blog
          </a>{' '}
          |{' '}
          <a href="https://taskguru.online/about" className="text-primary underline">
            About
          </a>{' '}
          |{' '}
          <a href="https://taskguru.online/help" className="text-primary underline">
            Help
          </a>
        </p>
        <p className="mt-2">
          Try other free tools:{' '}
          <a
            href="https://taskguru.online/tools/text-paraphraser"
            className="text-primary underline"
          >
            Text Paraphraser
          </a>
          ,{' '}
          <a
            href="https://taskguru.online/tools/image-compressor"
            className="text-primary underline"
          >
            Image Compressor
          </a>
          ,{' '}
          <a
            href="https://taskguru.online/tools/background-remover"
            className="text-primary underline"
          >
            Background Remover
          </a>
          ,{' '}
          <a
            href="https://taskguru.online/tools/merge-pdf"
            className="text-primary underline"
          >
            Merge PDF
          </a>
        </p>
        <p className="mt-4 text-xs">
          <a href="https://taskguru.online/privacy-policy" className="underline">
            Privacy Policy
          </a>{' '}
          |{' '}
          <a href="https://taskguru.online/terms" className="underline">
            Terms
          </a>
        </p>
      </footer>
    </>
  );
}
