'use client';

import { useState, useRef, DragEvent, useEffect } from 'react';
import Head from 'next/head';
import Script from 'next/script';
import Link from 'next/link';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Upload, FileText, Trash2, Loader2, Download, CheckCircle, ShieldCheck, Zap, Globe, Lock, ArrowRight } from 'lucide-react';

// ✅ Client-Side Libraries
import * as pdfjsLib from 'pdfjs-dist';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import { saveAs } from 'file-saver';

export default function PdfToWord() {
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [convertedBlob, setConvertedBlob] = useState<Blob | null>(null); 
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) validateAndSetFile(selectedFile);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    validateAndSetFile(droppedFile);
  };

  const validateAndSetFile = (f: File) => {
    if (f.type !== 'application/pdf') {
      toast({ title: 'Error', description: 'Only PDF files allowed', variant: 'destructive' });
      return;
    }
    setFile(f);
    setConvertedBlob(null);
  };

  const handleConvert = async () => {
    if (!file) return;
    setIsConverting(true);
    setConvertedBlob(null);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const loadingTask = pdfjsLib.getDocument(arrayBuffer);
      const pdf = await loadingTask.promise;
      const totalPages = pdf.numPages;
      
      const docChildren = [];

      for (let i = 1; i <= totalPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        
        const items = textContent.items.map((item: any) => ({
          str: item.str,
          y: item.transform[5],
        }));

        let currentLineText = "";
        let lastY = -1;

        items.forEach((item) => {
           if (lastY !== -1 && Math.abs(item.y - lastY) > 10) {
              if(currentLineText.trim()) {
                 docChildren.push(
                    new Paragraph({
                       children: [new TextRun({ text: currentLineText, size: 24 })],
                       spacing: { after: 120 },
                    })
                 );
              }
              currentLineText = "";
           }
           currentLineText += item.str + " ";
           lastY = item.y;
        });

        if (currentLineText.trim()) {
           docChildren.push(new Paragraph({ children: [new TextRun({ text: currentLineText, size: 24 })] }));
        }
        
        if (i < totalPages) {
           docChildren.push(new Paragraph({ text: "" })); 
        }
      }

      const doc = new Document({
        sections: [{ properties: {}, children: docChildren }],
      });

      const blob = await Packer.toBlob(doc);
      setConvertedBlob(blob);

      toast({ title: 'Success', description: 'Conversion complete! Click Download to save.' });
    } catch (error) {
      console.error(error);
      toast({ title: 'Error', description: 'Failed to process PDF.', variant: 'destructive' });
    } finally {
      setIsConverting(false);
    }
  };

  const handleDownload = () => {
    if (convertedBlob && file) {
      saveAs(convertedBlob, `${file.name.replace('.pdf', '')}.docx`);
      toast({ title: 'Downloaded', description: 'File saved to your device.' });
    }
  };

  const handleReset = () => {
    setFile(null);
    setConvertedBlob(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How do I convert a PDF to Word for free?",
        "acceptedAnswer": { "@type": "Answer", "text": "Simply upload your PDF to TaskGuru's converter. Our tool processes the file in your browser and instantly provides a download link for the editable Word document." }
      },
      {
        "@type": "Question",
        "name": "Is it safe to convert sensitive PDFs here?",
        "acceptedAnswer": { "@type": "Answer", "text": "Yes, it is 100% safe. TaskGuru uses Client-Side technology, meaning your file never leaves your computer and is never uploaded to any server." }
      },
       {
        "@type": "Question",
        "name": "Can I edit the converted Word document?",
        "acceptedAnswer": { "@type": "Answer", "text": "Yes! The output is a standard Microsoft Word (.docx) file that you can edit in MS Word, Google Docs, or LibreOffice." }
      }
    ]
  };

  return (
    <>
      <Head>
        <title>Free PDF to Word Converter Online (Unlimited & Secure) | TaskGuru</title>
        <meta name="description" content="Convert PDF to Word for free with TaskGuru. No file size limits, no sign-up, and 100% private. Turn scanned PDFs into editable DOCX files instantly." />
      </Head>
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* --- TOOL INTERFACE --- */}
      <Card className="w-full max-w-2xl mx-auto shadow-2xl my-10 border-2 border-primary/10 rounded-[2rem] bg-white dark:bg-gray-900">
        <CardContent className="p-6 sm:p-10">
          {!file ? (
            <div
              className={`flex flex-col items-center justify-center space-y-6 p-10 sm:p-16 border-3 border-dashed rounded-[2rem] cursor-pointer transition-all duration-300 ${
                isDragging ? 'border-primary bg-primary/5 scale-105' : 'border-gray-200 hover:border-primary/50 hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
            >
              <div className="p-6 bg-blue-50 text-blue-600 rounded-full shadow-sm animate-bounce">
                <Upload className="w-10 h-10" />
              </div>
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-black text-gray-800 dark:text-white">Upload PDF File</h2>
                <p className="text-gray-500 font-medium">Drag & Drop or Click to Browse</p>
                <p className="text-xs text-blue-500 font-bold bg-blue-50 dark:bg-blue-900/30 inline-block px-3 py-1 rounded-full">
                  No Limits • No Server Uploads
                </p>
              </div>
              <Input ref={fileInputRef} type="file" className="hidden" accept="application/pdf" onChange={handleFileChange} />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center space-y-6 p-10">
              <div className="relative">
                <FileText className="w-20 h-20 text-red-500 drop-shadow-lg" />
                <div className="absolute -bottom-2 -right-2 bg-green-500 text-white p-1 rounded-full border-4 border-white dark:border-gray-900">
                    <CheckCircle className="w-4 h-4" />
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white break-all">{file.name}</h3>
                <p className="text-sm text-gray-500 font-medium">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
            </div>
          )}
        </CardContent>

        {file && (
          <CardFooter className="flex flex-col sm:flex-row justify-center gap-4 bg-gray-50/80 dark:bg-gray-800/50 p-6 border-t backdrop-blur-sm rounded-b-[2rem]">
            {!convertedBlob ? (
                <>
                    <Button variant="outline" size="lg" onClick={handleReset} disabled={isConverting} className="w-full sm:w-auto rounded-xl h-12">
                    <Trash2 className="mr-2 h-4 w-4" /> Change File
                    </Button>
                    <Button size="lg" onClick={handleConvert} disabled={isConverting} className="w-full sm:w-auto rounded-xl h-12 text-lg font-bold shadow-lg shadow-blue-500/20">
                    {isConverting ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Zap className="mr-2 h-5 w-5 fill-current" />}
                    Convert to Word
                    </Button>
                </>
            ) : (
                <>
                    <Button variant="ghost" onClick={handleReset} className="text-gray-500 hover:text-red-500">
                        Convert Another
                    </Button>
                    <Button size="lg" onClick={handleDownload} className="w-full sm:w-auto rounded-xl h-14 text-lg font-bold bg-green-600 hover:bg-green-700 text-white shadow-xl shadow-green-500/30 animate-pulse">
                        <Download className="mr-2 h-6 w-6" /> Download Word File
                    </Button>
                </>
            )}
          </CardFooter>
        )}
      </Card>

      {/* --- SEO STRUCTURED CONTENT (Featured Snippet Optimized) --- */}
      <article className="max-w-4xl mx-auto px-6 py-16 space-y-16">
        
        {/* 1. H1 + Direct Answer (Featured Snippet Target) */}
        <section className="text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white tracking-tight leading-tight">
            Convert PDF to Word <span className="text-blue-600">Free Online</span>
          </h1>
          
          <div className="bg-blue-50 dark:bg-blue-900/10 p-8 rounded-3xl border border-blue-100 dark:border-blue-900 text-left">
            <h2 className="text-lg font-bold text-blue-700 dark:text-blue-300 mb-2 uppercase tracking-wide text-xs">Quick Summary</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed font-medium">
              TaskGuru allows you to <strong>convert PDF to Word for free</strong> instantly without any software installation. 
              Simply upload your PDF file, and our browser-based tool extracts the text to create an <strong>editable Microsoft Word document (.docx)</strong>. 
              Unlike other converters, TaskGuru processes files <strong>100% on your device</strong> (Client-Side), ensuring maximum privacy and unlimited file sizes.
              No email, no sign-up, and no watermarks required.
            </p>
          </div>
        </section>

        {/* 2. How It Works (Step-by-Step) */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">How to Convert PDF to Word Online?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700">
                <span className="text-4xl font-black text-gray-200 dark:text-gray-700">01</span>
                <h3 className="text-xl font-bold mt-2 mb-3">Upload PDF</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Drag and drop your file into the box above. We support large files (50MB+).</p>
            </div>
            <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700">
                <span className="text-4xl font-black text-gray-200 dark:text-gray-700">02</span>
                <h3 className="text-xl font-bold mt-2 mb-3">Auto Conversion</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Our intelligent tool reads your PDF text layers and converts them to Word format instantly.</p>
            </div>
            <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700">
                <span className="text-4xl font-black text-gray-200 dark:text-gray-700">03</span>
                <h3 className="text-xl font-bold mt-2 mb-3">Download DOCX</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Click the download button to save your new editable document. No waiting queues.</p>
            </div>
          </div>
        </section>

        {/* 3. Key Benefits (Why Choose Us) */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Why Use TaskGuru PDF Converter?</h2>
          <div className="space-y-4">
            <div className="flex gap-4 items-start">
                <div className="p-3 bg-green-100 text-green-600 rounded-lg"><ShieldCheck className="w-6 h-6" /></div>
                <div>
                    <h3 className="text-lg font-bold">100% Safe & Private</h3>
                    <p className="text-gray-600 dark:text-gray-400">Your files never leave your computer. We use client-side processing, so hacking or data theft is impossible.</p>
                </div>
            </div>
            <div className="flex gap-4 items-start">
                <div className="p-3 bg-purple-100 text-purple-600 rounded-lg"><Globe className="w-6 h-6" /></div>
                <div>
                    <h3 className="text-lg font-bold">Unlimited Conversions</h3>
                    <p className="text-gray-600 dark:text-gray-400">Convert as many files as you want. There are no daily limits and no file size restrictions.</p>
                </div>
            </div>
            <div className="flex gap-4 items-start">
                <div className="p-3 bg-orange-100 text-orange-600 rounded-lg"><Zap className="w-6 h-6" /></div>
                <div>
                    <h3 className="text-lg font-bold">Works on All Devices</h3>
                    <p className="text-gray-600 dark:text-gray-400">Whether you are on Windows, Mac, Android, or iPhone, our tool works perfectly in your browser.</p>
                </div>
            </div>
          </div>
        </section>

        {/* 4. Internal Linking (Boost SEO) */}
        <section className="bg-gray-50 dark:bg-gray-800/50 p-8 rounded-3xl">
          <h2 className="text-2xl font-bold mb-6">Explore More Free Tools</h2>
          <div className="grid md:grid-cols-2 gap-4">
             <Link href="/tools/resume-maker" className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-xl border hover:border-blue-500 transition-colors group">
                <span className="font-semibold text-gray-700 dark:text-gray-300 group-hover:text-blue-600">Create a Free Resume</span>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600" />
             </Link>
             <Link href="/tools/image-to-text" className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-xl border hover:border-blue-500 transition-colors group">
                <span className="font-semibold text-gray-700 dark:text-gray-300 group-hover:text-blue-600">Image to Text Converter</span>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600" />
             </Link>
             <Link href="/tools/background-remover" className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-xl border hover:border-blue-500 transition-colors group">
                <span className="font-semibold text-gray-700 dark:text-gray-300 group-hover:text-blue-600">Remove Backgrounds Free</span>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600" />
             </Link>
          </div>
        </section>

        {/* 5. FAQ Section (Schema Optimized) */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqSchema.mainEntity.map((faq, index) => (
                <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-2xl p-6 hover:shadow-sm transition-shadow">
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">{faq.name}</h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{faq.acceptedAnswer.text}</p>
                </div>
            ))}
          </div>
        </section>

      </article>
    </>
  );
}
