'use client';
import { useState, useRef } from 'react';
import Head from 'next/head';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Upload, Combine, Trash2, Loader2, Download, FileText } from 'lucide-react';
import { handleMergePdfs } from '@/app/actions';

export default function MergePdf() {
  const { toast } = useToast();
  const [files, setFiles] = useState<File[]>([]);
  const [fileDataUris, setFileDataUris] = useState<string[]>([]);
  const [convertedDoc, setConvertedDoc] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (selectedFiles) {
      const newFiles = Array.from(selectedFiles).filter(file => {
        if (file.type !== 'application/pdf') {
          toast({
            title: 'Invalid file type',
            description: `${file.name} is not a PDF and will be ignored.`,
            variant: 'destructive',
          });
          return false;
        }
        return true;
      });

      const allFiles = [...files, ...newFiles];
      setFiles(allFiles);
      setConvertedDoc(null);

      const readerPromises = newFiles.map(file => {
        return new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target?.result as string);
          reader.readAsDataURL(file);
        });
      });

      Promise.all(readerPromises).then(newUris => {
        setFileDataUris(prevUris => [...prevUris, ...newUris]);
      });
    }
  };

  const handleSubmit = async () => {
    if (fileDataUris.length < 2) {
      toast({ title: "Not enough files", description: "Please upload at least two PDF files to merge.", variant: "destructive" });
      return;
    }
    setIsLoading(true);
    setConvertedDoc(null);
    const result = await handleMergePdfs(fileDataUris);
    setIsLoading(false);

    if (result.success && result.data?.wordDataUri) {
      setConvertedDoc(result.data.wordDataUri);
      toast({ title: "Success!", description: "PDFs merged into a Word document." });
    } else {
      toast({ title: "Error", description: result.error, variant: "destructive" });
    }
  };

  const handleDownload = () => {
    if (!convertedDoc) return;
    const link = document.createElement('a');
    link.href = convertedDoc;
    link.download = 'merged_document.docx';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleReset = () => {
    setFiles([]);
    setFileDataUris([]);
    setConvertedDoc(null);
    setIsLoading(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <>
      <Head>
        <title>Merge PDF to Word - Combine PDFs Online Free | TaskGuru</title>
        <meta name="description" content="Easily merge multiple PDF files into a single Word document. Free online PDF merger tool by TaskGuru. Fast, secure, and easy to use." />
        <meta name="keywords" content="merge pdf, combine pdfs, pdf to word, online pdf merger, pdf combiner, TaskGuru tools" />
        <link rel="canonical" href="https://taskguru.online/tools/merge-pdf" />

        {/* Open Graph */}
        <meta property="og:title" content="Merge PDF to Word - Free Online PDF Merger | TaskGuru" />
        <meta property="og:description" content="Merge multiple PDFs into one Word file easily with TaskGuru's free PDF combiner tool." />
        <meta property="og:url" content="https://taskguru.online/tools/merge-pdf" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://taskguru.online/og-images/merge-pdf.png" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Merge PDF to Word - Free Online Tool | TaskGuru" />
        <meta name="twitter:description" content="Combine PDF files into a Word document with TaskGuru. Simple and secure online tool." />
        <meta name="twitter:image" content="https://taskguru.online/og-images/merge-pdf.png" />
        <meta name="twitter:site" content="@TaskGuruTools" />

        {/* JSON-LD Schema Markup */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Merge PDF to Word",
            "operatingSystem": "All",
            "applicationCategory": "Utility",
            "description": "Free tool to merge multiple PDF files into a single Word document.",
            "url": "https://taskguru.online/tools/merge-pdf",
            "author": {
              "@type": "Organization",
              "name": "TaskGuru"
            }
          })
        }} />
      </Head>

      {/* Actual Page UI Below */}
      <Card className="w-full max-w-2xl mx-auto shadow-lg">
        <CardContent className="p-6">
          {files.length === 0 ? (
            <div
              className="flex flex-col items-center justify-center space-y-4 p-12 border-2 border-dashed rounded-lg cursor-pointer hover:border-primary transition-colors"
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="p-4 bg-secondary rounded-full">
                <Upload className="w-10 h-10 text-muted-foreground" />
              </div>
              <div className="text-center">
                <p className="font-semibold">Click to upload or drag and drop</p>
                <p className="text-sm text-muted-foreground">Select multiple PDFs</p>
              </div>
              <Input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept="application/pdf"
                multiple
                onChange={handleFileChange}
              />
            </div>
          ) : (
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Selected Files ({files.length})</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-60 overflow-y-auto p-2 rounded-md border">
                {files.map((file, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 bg-secondary rounded">
                    <FileText className="h-5 w-5 text-primary" />
                    <span className="truncate text-sm">{file.name}</span>
                  </div>
                ))}
              </div>
              <Button onClick={() => fileInputRef.current?.click()} variant="outline" className="w-full">
                <Upload className="mr-2 h-4 w-4"/> Add More Files
              </Button>
            </div>
          )}
        </CardContent>

        {files.length > 0 && (
          <CardFooter className="flex justify-center gap-4 bg-muted/50 p-4 border-t">
            <Button variant="outline" onClick={handleReset} disabled={isLoading}>
              <Trash2 className="mr-2 h-4 w-4" /> Reset
            </Button>
            <Button onClick={handleSubmit} disabled={isLoading || files.length < 2 || !!convertedDoc}>
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Combine className="mr-2 h-4 w-4" />
              )}
              Merge to Word
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
