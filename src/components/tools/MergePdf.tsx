'use client';
import { useState, useRef } from 'react';
import type { Metadata } from 'next';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Upload, Download, Loader2, Trash2, FilePlus2 } from 'lucide-react';

// 🛑 WARNING: आपको इस एक्शन को अपने app/actions.ts में बनाना होगा!
// यह फ़ंक्शन फ़ाइलों को Base64 स्ट्रिंग्स के रूप में लेगा और एक Base64 स्ट्रिंग लौटाएगा।
import { handleMergePdf } from '@/app/actions'; 

// ✅ SEO Metadata (No Change)
export const metadata: Metadata = {
  title: 'Free Online PDF Merger Tool | Combine PDF Files Instantly | TaskGuru',
  description:
    "Merge multiple PDF files into a single document with TaskGuru's free online PDF merger. Fast, secure, and no watermark. Works on mobile & desktop.",
  keywords: [
    'merge pdf',
    'combine pdf online',
    'pdf merger free',
    'join pdf files',
    'online pdf combiner',
    'merge pdf without watermark',
    'taskguru pdf tools'
  ],
  robots: 'index, follow',
  alternates: {
    canonical: 'https://taskguru.online/tools/merge-pdf',
  },
  openGraph: {
    title: 'Free Online PDF Merger | TaskGuru',
    description:
      'Combine multiple PDF files into one document instantly with TaskGuru’s free PDF Merger tool. No signup, no watermark.',
    url: 'https://taskguru.online/tools/merge-pdf',
    siteName: 'TaskGuru',
    images: [
      {
        url: 'https://taskguru.online/assets/og-merge-pdf.png',
        width: 1200,
        height: 630,
        alt: 'TaskGuru PDF Merger Tool',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free PDF Merger Tool | TaskGuru',
    description:
      'Merge PDF files online for free with TaskGuru’s secure PDF merger. Works on mobile & desktop.',
    images: ['https://taskguru.online/assets/og-merge-pdf.png'],
  },
};

export default function MergePdf() {
  const { toast } = useToast();
  // 🛑 WORKING CODE UNTOUCHED 🛑 (State management)
  const [files, setFiles] = useState<File[]>([]);
  const [isMerging, setIsMerging] = useState(false);
  const [mergedPdfDataUri, setMergedPdfDataUri] = useState<string | null>(null); // नया स्टेट जोड़ा
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = e.target.files ? Array.from(e.target.files) : [];
    if (newFiles.some(f => f.type !== 'application/pdf')) {
      toast({ title: 'Invalid file', description: 'Upload PDF files only.', variant: 'destructive' });
      return;
    }
    setFiles([...files, ...newFiles]);
    setMergedPdfDataUri(null); // नई फ़ाइलें जोड़ने पर आउटपुट साफ़ करें
  };

  const handleMerge = async () => {
    if (files.length < 2) {
      toast({ title: 'Add at least 2 PDFs', description: 'Select multiple PDF files to merge.', variant: 'destructive' });
      return;
    }
    setIsMerging(true);
    setMergedPdfDataUri(null);

    try {
      // ✅ FIX: फ़ाइलों को Base64 में बदलें
      const filePromises = files.map(file => {
        return new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      });

      const dataUris = await Promise.all(filePromises);
      
      // 🛑 WORKING LOGIC CALL (You must implement this server action)
      const result = await handleMergePdf(dataUris); 
      
      if (result.success && result.data?.mergedPdfDataUri) {
        setMergedPdfDataUri(result.data.mergedPdfDataUri);
        toast({ title: 'Success!', description: 'PDF files merged successfully.' });
      } else {
        toast({ title: 'Error', description: result.error || 'Failed to merge PDFs due to a server error.', variant: 'destructive' });
      }

    } catch (error) {
      console.error(error);
      toast({ title: 'Error', description: 'An unexpected error occurred during processing.', variant: 'destructive' });
    } finally {
      setIsMerging(false);
    }
  };

  const handleDownload = () => {
    if (!mergedPdfDataUri) return;
    const link = document.createElement('a');
    link.href = mergedPdfDataUri;
    link.download = `merged-taskguru.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  const handleReset = () => {
    setFiles([]);
    setMergedPdfDataUri(null);
  };
  // 🛑 WORKING CODE ENDS 🛑

  // ✅ High-Content FAQ Schema for SEO/AdSense
  const faqSchema = {
    "@context":"https://schema.org",
    "@type":"FAQPage",
    "mainEntity":[
      {"@type":"Question","name":"Is TaskGuru’s PDF Merger free?","acceptedAnswer":{"@type":"Answer","text":"Yes, TaskGuru’s PDF Merger is 100% free, requires no signup, and includes no watermarks or hidden charges."}},
      {"@type":"Question","name":"Will my PDF files be safe and secure?","acceptedAnswer":{"@type":"Answer","text":"Security is paramount. Your files are merged over a secure connection and are permanently deleted from our servers immediately after the merging process is complete."}},
      {"@type":"Question","name":"Is there a file size or page limit for merging PDFs?","acceptedAnswer":{"@type":"Answer","text":"While we recommend merging standard-sized PDFs for optimal performance, TaskGuru handles multiple files and pages without the restrictions often found on paid platforms."}},
      {"@type":"Question","name":"Can I merge PDFs on mobile?","acceptedAnswer":{"@type":"Answer","text":"Yes, TaskGuru PDF Merger is fully responsive and works seamlessly on Android, iOS, tablets, and desktop browsers."}}
    ]
  };

  // 🛑 DELETED: Old FAQItem function (to remove accordion)
  // 🛑 DELETED: Old Footer with duplicate internal links

  return (
    <div className="space-y-12">
      {/* Intro */}
      <section className="max-w-4xl mx-auto py-6 text-center space-y-4">
        <h3 className="text-3xl font-bold">Free Online PDF Merger – Combine PDF Files Instantly</h3>
        <p className="text-muted-foreground">
          TaskGuru’s <strong>PDF Merger</strong> lets you upload multiple PDFs and combine them into one file.  
          It’s fast, secure, 100% free, and works on all devices with no watermarks.
        </p>
      </section>

      {/* Tool */}
      <Card className="w-full max-w-5xl mx-auto shadow-lg">
        <CardContent className="p-6 space-y-6">
          <div
            className="flex flex-col items-center justify-center space-y-4 p-12 border-2 border-dashed rounded-lg cursor-pointer hover:border-primary"
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="p-4 bg-secondary rounded-full">
              <Upload className="w-10 h-10 text-muted-foreground" />
            </div>
            <p className="font-semibold">Click to upload or drag & drop PDFs</p>
            <p className="text-sm text-muted-foreground">Upload 2 or more PDF files</p>
            <Input ref={fileInputRef} type="file" className="hidden" accept="application/pdf" multiple onChange={handleFileChange} />
          </div>

          {files.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Selected Files ({files.length} files)</h3>
              <ul className="list-disc list-inside text-muted-foreground max-h-40 overflow-y-auto">
                {files.map((file, idx) => <li key={idx}>{file.name}</li>)}
              </ul>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-center gap-4 bg-muted/50 border-t p-4">
            <Button variant="outline" onClick={handleReset} disabled={isMerging}><Trash2 className="mr-2 h-4 w-4" /> Reset</Button>
            <Button onClick={handleMerge} disabled={isMerging || files.length < 2 || !!mergedPdfDataUri}>
              {isMerging ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <FilePlus2 className="mr-2 h-4 w-4" />
              )}
              Merge PDFs
            </Button>
            <Button onClick={handleDownload} disabled={!mergedPdfDataUri || isMerging}>
              <Download className="mr-2 h-4 w-4" /> Download
            </Button>
          </CardFooter>
      </Card>

      {/* Features */}
      <section className="max-w-4xl mx-auto py-10 grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold">Why Use TaskGuru PDF Merger?</h2>
          <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-4">
            <li>✔ Free & easy PDF combiner</li>
            <li>✔ Merge unlimited PDF files</li>
            <li>✔ No watermark or signup needed</li>
            <li>✔ Secure file handling (deleted instantly)</li>
            <li>✔ Works on PC & mobile</li>
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-semibold">Use Cases</h2>
          <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-4">
            <li>📚 Combine notes, eBooks, and study material</li>
            <li>📄 Merge invoices or reports into one PDF</li>
            <li>🛒 Organize product catalogs</li>
            <li>👩‍💼 Bundle resumes, contracts, and proposals</li>
          </ul>
        </div>
      </section>

      {/* How To */}
      <section className="max-w-4xl mx-auto py-10">
        <h2 className="text-xl font-semibold text-center">How to Merge PDF Files Online?</h2>
        <ol className="list-decimal list-inside text-muted-foreground space-y-2 mt-4">
          <li>Upload two or more PDF files (JPG, PNG, WEBP).</li>
          <li>Click <strong>Merge PDFs</strong> to combine them.</li>
          <li>Download the final merged PDF instantly.</li>
        </ol>
      </section>

      {/* ✅ UPDATED FAQ Section (High-Content, Simple structure) */}
      <section className="max-w-4xl mx-auto my-8 sm:my-12 p-6 bg-white dark:bg-gray-900 shadow rounded-lg border border-gray-100 dark:border-gray-800">
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

      {/* JSON-LD FAQ Schema (Moved to bottom) */}
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} 
      />

    </div>
  );
}
