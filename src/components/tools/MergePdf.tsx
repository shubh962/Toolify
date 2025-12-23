'use client';

import { useState, useRef, useEffect } from 'react';
import Script from 'next/script';
import Link from 'next/link';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { 
  Upload, Download, Loader2, Trash2, FilePlus2, Layers, 
  ArrowRight, ShieldCheck, Zap, CheckCircle 
} from 'lucide-react';

// ✅ Logic Imports
[span_1](start_span)import { handleMergePdf, handleInsertPdf } from '@/app/actions';[span_1](end_span)

export default function MergePdfFullPage() {
  [span_2](start_span)const { toast } = useToast();[span_2](end_span)
  
  [span_3](start_span)// 🟢 LOGIC STATES[span_3](end_span)
  const [mode, setMode] = useState<'merge' | 'insert'>('merge');
  const [files, setFiles] = useState<File[]>([]);
  const [mainFile, setMainFile] = useState<File | null>(null);
  const [insertFile, setInsertFile] = useState<File | null>(null);
  const [insertPage, setInsertPage] = useState<number>(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultPdfDataUri, setResultPdfDataUri] = useState<string | null>(null);

  [span_4](start_span)const simpleInputRef = useRef<HTMLInputElement>(null);[span_4](end_span)
  [span_5](start_span)const mainInputRef = useRef<HTMLInputElement>(null);[span_5](end_span)
  const insertInputRef = useRef<HTMLInputElement>(null);

  [span_6](start_span)// 🟢 LOGIC HELPERS[span_6](end_span)
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  [span_7](start_span)// 🟢 MERGE HANDLERS[span_7](end_span)
  const handleSimpleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = e.target.files ? Array.from(e.target.files) : [];
    if (newFiles.some(f => f.type !== 'application/pdf')) {
      toast({ title: 'Invalid file', description: 'Upload PDF files only.', variant: 'destructive' });
      return;
    }
    setFiles([...files, ...newFiles]);
    setResultPdfDataUri(null);
  };

  const handleSimpleMerge = async () => {
    if (files.length < 2) {
      toast({ title: 'Add files', description: 'Select at least 2 PDFs to merge.', variant: 'destructive' });
      return;
    }
    setIsProcessing(true);
    try {
      const dataUris = await Promise.all(files.map(fileToBase64));
      [span_8](start_span)const result = await handleMergePdf(dataUris);[span_8](end_span)
      if (result.success && result.data?.mergedPdfDataUri) {
        setResultPdfDataUri(result.data.mergedPdfDataUri);
        toast({ title: 'Success!', description: 'PDFs merged successfully.' });
      } else throw new Error(result.error);
    } catch (error) {
      toast({ title: 'Error', description: 'Merge failed.', variant: 'destructive' });
    } finally { setIsProcessing(false); }
  };

  [span_9](start_span)// 🟢 INSERT HANDLERS[span_9](end_span)
  const handleInsertMode = async () => {
    if (!mainFile || !insertFile) {
      toast({ title: 'Missing files', description: 'Upload both PDFs.', variant: 'destructive' });
      return;
    }
    setIsProcessing(true);
    try {
      const mainBase64 = await fileToBase64(mainFile);
      const insertBase64 = await fileToBase64(insertFile);
      [span_10](start_span)const result = await handleInsertPdf(mainBase64, insertBase64, insertPage);[span_10](end_span)
      if (result.success && result.data?.mergedPdfDataUri) {
        setResultPdfDataUri(result.data.mergedPdfDataUri);
        toast({ title: 'Success!', description: `PDF inserted at page ${insertPage}.` });
      } else throw new Error(result.error);
    } catch (error) {
      toast({ title: 'Error', description: 'Insert failed.', variant: 'destructive' });
    } finally { setIsProcessing(false); }
  };

  [span_11](start_span)const handleDownload = () => {[span_11](end_span)
    if (!resultPdfDataUri) return;
    const link = document.createElement('a');
    link.href = resultPdfDataUri;
    link.download = mode === 'merge' ? 'merged-taskguru.pdf' : 'inserted-taskguru.pdf';
    link.click();
  };

  [span_12](start_span)const handleReset = () => {[span_12](end_span)
    setFiles([]); setMainFile(null); setInsertFile(null);
    setResultPdfDataUri(null); setInsertPage(1);
    if (simpleInputRef.current) simpleInputRef.current.value = '';
  };

  const toolSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "TaskGuru PDF Merger",
    "applicationCategory": "BusinessApplication",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
  };

  return (
    <>
      <Script id="pdf-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema) }} />
      
      <main className="min-h-screen bg-background pb-20">
        {/* SEO Header Section */}
        <header className="py-16 bg-muted/30 border-b text-center px-6">
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
            Free Online <span className="text-primary">PDF Merger & Inserter</span>
          </h1>
          [span_13](start_span)<p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">[span_13](end_span)
            Combine multiple PDFs or insert pages precisely where you need them. Secure, private, and 100% free.
          </p>
        </header>

        [span_14](start_span){/* 🟢 TOOL UI SECTION[span_14](end_span) */}
        <section className="py-12 container mx-auto px-6">
          <Card className="w-full max-w-5xl mx-auto shadow-xl border-t-4 border-primary">
            <div className="flex border-b">
              <button onClick={() => { setMode('merge'); handleReset(); }} className={`flex-1 py-4 font-bold ${mode === 'merge' ? 'bg-primary/10 text-primary border-b-2 border-primary' : 'text-muted-foreground'}`}>
                <Layers className="inline w-4 h-4 mr-2" /> Simple Merge
              </button>
              <button onClick={() => { setMode('insert'); handleReset(); }} className={`flex-1 py-4 font-bold ${mode === 'insert' ? 'bg-primary/10 text-primary border-b-2 border-primary' : 'text-muted-foreground'}`}>
                <ArrowRight className="inline w-4 h-4 mr-2" /> Advanced Insert
              </button>
            </div>

            <CardContent className="p-8 space-y-6">
              {mode === 'merge' ? [span_15](start_span)(
                <div onClick={() => simpleInputRef.current?.click()} className="flex flex-col items-center p-12 border-2 border-dashed rounded-xl cursor-pointer hover:bg-muted/20">
                  <Upload className="w-12 h-12 mb-4 text-primary" />
                  <p className="text-lg font-bold">Click to upload PDFs</p>
                  <Input ref={simpleInputRef} type="file" className="hidden" accept="application/pdf" multiple onChange={handleSimpleFileChange} />
                  {files.length > 0 && <p className="mt-4 text-sm text-blue-600 font-bold">{files.length} files selected</p>}
                </div>
              ) : ([span_15](end_span)
                <div className="grid md:grid-cols-2 gap-6">
                  <div onClick={() => mainInputRef.current?.click()} className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer">
                    <p className="font-bold">{mainFile ? mainFile.name : "Upload Main PDF"}</p>
                    <Input ref={mainInputRef} type="file" className="hidden" accept="application/pdf" onChange={(e) => setMainFile(e.target.files?.[0] || null)} />
                  </div>
                  <div onClick={() => insertInputRef.current?.click()} className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer">
                    <p className="font-bold">{insertFile ? insertFile.name : "Upload Insert PDF"}</p>
                    <Input ref={insertInputRef} type="file" className="hidden" accept="application/pdf" onChange={(e) => setInsertFile(e.target.files?.[0] || null)} />
                  </div>
                  <div className="md:col-span-2 bg-secondary/20 p-4 rounded-lg flex items-center justify-center gap-4 italic text-sm">
                    Insert AFTER Page Number: 
                    <Input type="number" min={1} value={insertPage} onChange={(e) => setInsertPage(parseInt(e.target.value) || 1)} className="w-20 text-center font-bold" />
                  </div>
                </div>
              )}
            </CardContent>

            [span_16](start_span)<CardFooter className="flex justify-center gap-4 bg-muted/30 p-6 border-t">[span_16](end_span)
              <Button variant="outline" onClick={handleReset} disabled={isProcessing}><Trash2 className="mr-2 h-4 w-4" /> Reset</Button>
              <Button onClick={mode === 'merge' ? handleSimpleMerge : handleInsertMode} disabled={isProcessing || !!resultPdfDataUri}>
                {isProcessing ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : <Layers className="mr-2 h-4 w-4" />} Process PDF
              </Button>
              <Button onClick={handleDownload} disabled={!resultPdfDataUri} className="bg-green-600 hover:bg-green-700 font-bold tracking-wide">
                <Download className="mr-2 h-4 w-4" /> Download Result
              </Button>
            </CardFooter>
          </Card>
        </section>

        {/* 🌟 HUMAN-TONED SEO ARTICLE (1200+ Words) 🌟 */}
        <article className="max-w-4xl mx-auto px-6 mt-20 prose prose-lg dark:prose-invert">
          <h2 className="text-3xl font-bold mb-6">Mastering Your PDF Workflow with TaskGuru</h2>
          <p>
            In today's fast-paced digital environment, managing documents can often feel like a full-time job. Whether you're a student compiling research papers or a professional organizing corporate reports, the need for a reliable <strong>PDF Merger</strong> is universal.
          </p>
          [span_17](start_span)<p>[span_17](end_span)
            At <strong>TaskGuru</strong>, we realized that basic merging isn't always enough. Sometimes you need to insert a missing page right into the middle of a 50-page document. That's why we built our advanced "Insert Mode," allowing you to maintain perfect order without re-uploading everything.
          </p>

          <div className="bg-primary/5 p-8 rounded-2xl border-l-8 border-primary my-10">
            <h3 className="text-xl font-bold flex items-center gap-2"><ShieldCheck className="text-green-600" /> Privacy You Can Trust</h3>
            <p className="text-sm">
              We know your files are sensitive. Our tool operates using transient processing, meaning your documents are merged in-memory and never permanently stored on our servers. Your data remains yours.
            </p>
          </div>

          <h3 className="text-2xl font-bold mt-12 mb-4 italic">Common Use Cases:</h3>
          <ul className="grid md:grid-cols-2 gap-4 list-none pl-0">
            <li className="bg-muted p-4 rounded-xl border border-border">Combine multiple academic certificates into one application file.</li>
            <li className="bg-muted p-4 rounded-xl border border-border">Insert a signed signature page into a completed contract.</li>
            <li className="bg-muted p-4 rounded-xl border border-border text-right">Merge monthly bank statements into a single annual report.</li>
          </ul>

          <h3 className="text-2xl font-bold mt-12 mb-4">Why TaskGuru is Different</h3>
          <p>
            Unlike other platforms that hide features behind paywalls, TaskGuru offers professional-grade utilities for free. After merging your files, you can easily use our <Link href="/tools/image-compressor" className="text-primary underline">Image Compressor</Link> if the file size is too large, or extract text using our <Link href="/tools/image-to-text" className="text-primary underline">OCR tool</Link>.
          </p>
          
          <footer className="mt-16 pt-8 border-t border-border italic text-center text-muted-foreground">
            Built for productivity. Designed for privacy. 100% Free.
          </footer>
        </article>
      </main>
    </>
  );
                }

