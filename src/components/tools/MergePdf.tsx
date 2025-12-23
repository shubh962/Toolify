'use client';

import { useState, useRef } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { 
  Upload, Download, Loader2, Trash2, FilePlus2, Layers, 
  ArrowRight, ShieldCheck, Zap, CheckCircle 
} from 'lucide-react';
import { Label } from '@/components/ui/label';
import Link from 'next/link';

// 👇 ACTIONS IMPORT
import { handleMergePdf, handleInsertPdf } from '@/app/actions';

export default function MergePdf() {
  const { toast } = useToast();
  
  // 🟢 LOGIC STATES
  const [mode, setMode] = useState<'merge' | 'insert'>('merge');
  const [files, setFiles] = useState<File[]>([]);
  const [mainFile, setMainFile] = useState<File | null>(null);
  const [insertFile, setInsertFile] = useState<File | null>(null);
  const [insertPage, setInsertPage] = useState<number>(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultPdfDataUri, setResultPdfDataUri] = useState<string | null>(null);

  const simpleInputRef = useRef<HTMLInputElement>(null);
  const mainInputRef = useRef<HTMLInputElement>(null);
  const insertInputRef = useRef<HTMLInputElement>(null);

  // 🟢 HELPERS
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  // 🟢 HANDLERS
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
      const result: any = await handleMergePdf(dataUris);
      if (result.success && result.data?.mergedPdfDataUri) {
        setResultPdfDataUri(result.data.mergedPdfDataUri);
        toast({ title: 'Success!', description: 'PDFs merged successfully.' });
      } else { throw new Error(result.error); }
    } catch (error: any) {
      toast({ title: 'Error', description: error.message || 'Merge failed.', variant: 'destructive' });
    } finally { setIsProcessing(false); }
  };

  const handleInsertMode = async () => {
    if (!mainFile || !insertFile) {
      toast({ title: 'Missing files', description: 'Please upload both PDFs.', variant: 'destructive' });
      return;
    }
    setIsProcessing(true);
    try {
      const mainBase64 = await fileToBase64(mainFile);
      const insertBase64 = await fileToBase64(insertFile);
      const result: any = await handleInsertPdf(mainBase64, insertBase64, insertPage);
      if (result.success && result.data?.mergedPdfDataUri) {
        setResultPdfDataUri(result.data.mergedPdfDataUri);
        toast({ title: 'Success!', description: `PDF inserted at page ${insertPage}.` });
      } else { throw new Error(result.error); }
    } catch (error: any) {
      toast({ title: 'Error', description: error.message || 'Insert failed.', variant: 'destructive' });
    } finally { setIsProcessing(false); }
  };

  const handleDownload = () => {
    if (!resultPdfDataUri) return;
    const link = document.createElement('a');
    link.href = resultPdfDataUri;
    link.download = mode === 'merge' ? 'merged-taskguru.pdf' : 'inserted-taskguru.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleReset = () => {
    setFiles([]); setMainFile(null); setInsertFile(null);
    setResultPdfDataUri(null); setInsertPage(1);
    if (simpleInputRef.current) simpleInputRef.current.value = '';
    if (mainInputRef.current) mainInputRef.current.value = '';
    if (insertInputRef.current) insertInputRef.current.value = '';
  };

  return (
    <div className="space-y-16">
      {/* 🌟 HERO SECTION */}
      <section className="max-w-4xl mx-auto text-center space-y-6 py-8">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-gray-900 dark:text-white">
          Free Online <span className="text-primary underline decoration-primary/20">PDF Merger & Inserter</span>
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Combine multiple PDFs or precisely insert pages. Private, secure, and 100% free.
        </p>
      </section>

      {/* 🟢 TOOL CARD */}
      <Card className="w-full max-w-5xl mx-auto shadow-2xl border-t-4 border-primary overflow-hidden">
        <div className="flex border-b bg-muted/20">
          <button
            onClick={() => { setMode('merge'); handleReset(); }}
            className={`flex-1 py-5 text-center font-bold transition-all ${
              mode === 'merge' ? 'bg-background text-primary border-b-2 border-primary' : 'text-muted-foreground'
            }`}
          >
            <Layers className="inline w-5 h-5 mr-2" /> Simple Merge
          </button>
          <button
            onClick={() => { setMode('insert'); handleReset(); }}
            className={`flex-1 py-5 text-center font-bold transition-all ${
              mode === 'insert' ? 'bg-background text-primary border-b-2 border-primary' : 'text-muted-foreground'
            }`}
          >
            <ArrowRight className="inline w-5 h-5 mr-2" /> Advanced Insert
          </button>
        </div>

        <CardContent className="p-8 space-y-8">
          {mode === 'merge' ? (
            <div className="space-y-6">
              <div
                className="flex flex-col items-center justify-center space-y-4 p-16 border-2 border-dashed rounded-2xl cursor-pointer hover:border-primary bg-primary/5 transition-all group"
                onClick={() => simpleInputRef.current?.click()}
              >
                <Upload className="w-12 h-12 text-primary group-hover:scale-110 transition-transform" />
                <p className="text-xl font-bold">Upload PDFs</p>
                <Input ref={simpleInputRef} type="file" className="hidden" accept="application/pdf" multiple onChange={handleSimpleFileChange} />
              </div>

              {files.length > 0 && (
                <div className="flex flex-wrap gap-2 p-4 bg-muted/30 rounded-xl">
                  {files.map((file, idx) => (
                    <span key={idx} className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full border border-primary/20">
                      {file.name}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <Label className="font-bold">1. Main PDF</Label>
                <div 
                  className="border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer hover:border-primary bg-muted/20"
                  onClick={() => mainInputRef.current?.click()}
                >
                  <span className="block truncate">{mainFile ? mainFile.name : "Upload Base PDF"}</span>
                  <Input ref={mainInputRef} type="file" className="hidden" accept="application/pdf" onChange={(e) => setMainFile(e.target.files?.[0] || null)} />
                </div>
              </div>
              <div className="space-y-3">
                <Label className="font-bold">2. PDF to Insert</Label>
                <div 
                  className="border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer hover:border-primary bg-muted/20"
                  onClick={() => insertInputRef.current?.click()}
                >
                  <span className="block truncate">{insertFile ? insertFile.name : "Upload Insert PDF"}</span>
                  <Input ref={insertInputRef} type="file" className="hidden" accept="application/pdf" onChange={(e) => setInsertFile(e.target.files?.[0] || null)} />
                </div>
              </div>
              <div className="md:col-span-2 flex flex-col sm:flex-row items-center justify-center gap-6 bg-primary/5 p-6 rounded-2xl">
                <Label className="font-bold">Insert AFTER Page:</Label>
                <Input 
                  type="number" min={1} value={insertPage} 
                  onChange={(e) => setInsertPage(parseInt(e.target.value) || 1)}
                  className="w-24 text-center font-bold"
                />
              </div>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex flex-col sm:flex-row justify-center gap-4 bg-muted/50 p-8 border-t">
          <Button variant="outline" onClick={handleReset} disabled={isProcessing} className="w-full sm:w-auto font-bold">
            <Trash2 className="mr-2 h-4 w-4" /> Reset
          </Button>

          <Button 
            size="lg" 
            onClick={mode === 'merge' ? handleSimpleMerge : handleInsertMode} 
            disabled={isProcessing || !!resultPdfDataUri}
            className="w-full sm:w-auto font-bold px-8"
          >
            {isProcessing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Layers className="mr-2 h-4 w-4" />}
            {mode === 'merge' ? 'Merge All' : 'Insert PDF'}
          </Button>

          <Button size="lg" onClick={handleDownload} disabled={!resultPdfDataUri} className="bg-green-600 hover:bg-green-700 w-full sm:w-auto font-bold px-8">
            <Download className="mr-2 h-4 w-4" /> Download PDF
          </Button>
        </CardFooter>
      </Card>

      {/* 🚀 SEO CONTENT */}
      <article className="max-w-4xl mx-auto px-4 py-12 border-t">
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <h2 className="text-3xl font-bold mb-8 text-center">Why Professionals Choose TaskGuru's PDF Merger?</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <ShieldCheck className="text-green-600 w-6 h-6" /> 100% Privacy
              </h3>
              <p className="text-muted-foreground text-sm">
                We use transient processing. Your files are merged in-memory and wiped instantly. No footprints.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Zap className="text-yellow-500 w-6 h-6" /> Fast & Advanced
              </h3>
              <p className="text-muted-foreground text-sm">
                Don't just stick files at the end. Insert pages precisely where they need to be with our Advanced Mode.
              </p>
            </div>
          </div>
          <p className="mt-12 text-center text-muted-foreground italic">
            Built for productivity. Designed for privacy. 100% Free.
          </p>
        </div>
      </article>
    </div>
  );
}

