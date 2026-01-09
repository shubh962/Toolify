'use client';

import { useState, useRef, DragEvent, useEffect } from 'react';
import Head from 'next/head';
import Script from 'next/script';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Upload, FileText, Trash2, Loader2, Download } from 'lucide-react';

// ✅ Import Client-Side Libraries
import * as pdfjsLib from 'pdfjs-dist';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import { saveAs } from 'file-saver';

export default function PdfToWord() {
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ✅ Worker Setup via CDN Critical for Client-Side Processing
  useEffect(() => {
    // Matches the version in your package.json (3.11.174)
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
  };

  const handleConvert = async () => {
    if (!file) return;
    setIsConverting(true);

    try {
      const arrayBuffer = await file.arrayBuffer();
      
      // 1. Load PDF Document
      const loadingTask = pdfjsLib.getDocument(arrayBuffer);
      const pdf = await loadingTask.promise;
      const totalPages = pdf.numPages;
      
      const docChildren = [];

      // 2. Extract Text from Each Page
      for (let i = 1; i <= totalPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        
        // Combine text items into a single string
        const pageText = textContent.items
          .map((item: any) => item.str)
          .join(' ');

        // Create a Word Paragraph
        docChildren.push(
          new Paragraph({
            children: [
              new TextRun({
                text: pageText,
                size: 24, // 12pt font size (Word uses half-points)
              }),
            ],
            spacing: { after: 200 }, // Add space after paragraph
          })
        );
        
        // Add a blank line between pages (optional)
        if (i < totalPages) {
           docChildren.push(new Paragraph({ text: "" })); 
        }
      }

      // 3. Generate Word Document (.docx)
      const doc = new Document({
        sections: [{ properties: {}, children: docChildren }],
      });

      // 4. Save and Download
      const blob = await Packer.toBlob(doc);
      saveAs(blob, `${file.name.replace('.pdf', '')}.docx`);

      toast({ title: 'Success', description: 'File converted successfully!' });
    } catch (error) {
      console.error(error);
      toast({ title: 'Error', description: 'Failed to process PDF. Please try a different file.', variant: 'destructive' });
    } finally {
      setIsConverting(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // ✅ SEO Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Is this PDF to Word tool free?",
        "acceptedAnswer": { "@type": "Answer", "text": "Yes, it is 100% free and unlimited." }
      },
      {
        "@type": "Question",
        "name": "Is my data safe?",
        "acceptedAnswer": { "@type": "Answer", "text": "Yes. This tool runs entirely in your browser. Your files are never uploaded to any server." }
      }
    ]
  };

  return (
    <>
      <Head>
        <title>Free Unlimited PDF to Word Converter | TaskGuru</title>
        <meta name="description" content="Convert unlimited PDFs to Word directly in your browser. No server uploads, 100% private and free." />
      </Head>
      
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

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
                <Upload className="w-8 h-8 text-muted-foreground" />
              </div>
              <div className="text-center">
                <p className="font-semibold">Click to upload or drag & drop</p>
                <p className="text-xs text-muted-foreground">Unlimited Size • 100% Private (Client Side)</p>
              </div>
              <Input ref={fileInputRef} type="file" className="hidden" accept="application/pdf" onChange={handleFileChange} />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center space-y-4 p-8 sm:p-12">
              <FileText className="w-12 h-12 text-primary" />
              <p className="font-semibold">{file.name}</p>
              <p className="text-sm text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>
          )}
        </CardContent>

        {file && (
          <CardFooter className="flex justify-center gap-4 bg-muted/50 p-4 border-t">
            <Button variant="outline" onClick={handleReset} disabled={isConverting}>
              <Trash2 className="mr-2 h-4 w-4" /> Reset
            </Button>
            <Button onClick={handleConvert} disabled={isConverting}>
              {isConverting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />}
              Convert & Download
            </Button>
          </CardFooter>
        )}
      </Card>
      
      {/* FAQ Section */}
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
