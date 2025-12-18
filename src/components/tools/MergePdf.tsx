'use client';

import { useState, useRef } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Upload, Download, Loader2, Trash2, FilePlus2, Layers, ArrowRight } from 'lucide-react';
import { Label } from '@/components/ui/label'; // Ensure this exists or use standard label

// 👇 ACTIONS IMPORT UPDATE: handleInsertPdf bhi add kiya hai
import { handleMergePdf, handleInsertPdf } from '@/app/actions'; 

export default function MergePdf() {
  const { toast } = useToast();
  
  // 🟢 STATE: Mode Selection ('merge' = Simple, 'insert' = Advanced)
  const [mode, setMode] = useState<'merge' | 'insert'>('merge');

  // 🟢 STATE: Simple Merge
  const [files, setFiles] = useState<File[]>([]);
  
  // 🟢 STATE: Insert PDF
  const [mainFile, setMainFile] = useState<File | null>(null);
  const [insertFile, setInsertFile] = useState<File | null>(null);
  const [insertPage, setInsertPage] = useState<number>(1);

  // 🟢 STATE: Common
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultPdfDataUri, setResultPdfDataUri] = useState<string | null>(null);

  // Refs for file inputs
  const simpleInputRef = useRef<HTMLInputElement>(null);
  const mainInputRef = useRef<HTMLInputElement>(null);
  const insertInputRef = useRef<HTMLInputElement>(null);

  /* =========================================================
     HELPER: File to Base64
     ========================================================= */
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  /* =========================================================
     HANDLERS: Simple Merge
     ========================================================= */
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
    setResultPdfDataUri(null);

    try {
      const dataUris = await Promise.all(files.map(fileToBase64));
      const result = await handleMergePdf(dataUris);
      
      if (result.success && result.data?.mergedPdfDataUri) {
        setResultPdfDataUri(result.data.mergedPdfDataUri);
        toast({ title: 'Success!', description: 'PDFs merged successfully.' });
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      toast({ title: 'Error', description: error instanceof Error ? error.message : 'Merge failed.', variant: 'destructive' });
    } finally {
      setIsProcessing(false);
    }
  };

  /* =========================================================
     HANDLERS: Insert PDF
     ========================================================= */
  const handleInsertMode = async () => {
    if (!mainFile || !insertFile) {
      toast({ title: 'Missing files', description: 'Please upload both Main PDF and Insert PDF.', variant: 'destructive' });
      return;
    }
    if (insertPage < 1) {
      toast({ title: 'Invalid Page', description: 'Page number must be 1 or greater.', variant: 'destructive' });
      return;
    }

    setIsProcessing(true);
    setResultPdfDataUri(null);

    try {
      const mainBase64 = await fileToBase64(mainFile);
      const insertBase64 = await fileToBase64(insertFile);
      
      // Backend Call
      const result = await handleInsertPdf(mainBase64, insertBase64, insertPage);

      if (result.success && result.data?.mergedPdfDataUri) {
        setResultPdfDataUri(result.data.mergedPdfDataUri);
        toast({ title: 'Success!', description: `PDF inserted at page ${insertPage}.` });
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      toast({ title: 'Error', description: error instanceof Error ? error.message : 'Insert failed.', variant: 'destructive' });
    } finally {
      setIsProcessing(false);
    }
  };

  /* =========================================================
     COMMON: Reset & Download
     ========================================================= */
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
    setFiles([]);
    setMainFile(null);
    setInsertFile(null);
    setResultPdfDataUri(null);
    setInsertPage(1);
    // Reset file inputs
    if (simpleInputRef.current) simpleInputRef.current.value = '';
    if (mainInputRef.current) mainInputRef.current.value = '';
    if (insertInputRef.current) insertInputRef.current.value = '';
  };

  /* =========================================================
     UI RENDER
     ========================================================= */
  return (
    <div className="space-y-12">
      {/* Intro */}
      <section className="max-w-4xl mx-auto py-6 text-center space-y-4">
        <h3 className="text-3xl font-bold">Free Online PDF Merger & Inserter</h3>
        <p className="text-muted-foreground">
          Combine multiple PDFs into one, or insert a PDF into specific pages of another document.
        </p>
      </section>

      {/* Main Tool Card */}
      <Card className="w-full max-w-5xl mx-auto shadow-lg">
        
        {/* TABS HEADER */}
        <div className="flex border-b">
          <button
            onClick={() => { setMode('merge'); handleReset(); }}
            className={`flex-1 py-4 text-center font-semibold transition-colors ${
              mode === 'merge' ? 'bg-primary/10 text-primary border-b-2 border-primary' : 'text-muted-foreground hover:bg-muted'
            }`}
          >
            <Layers className="inline w-4 h-4 mr-2" /> Merge Files (Simple)
          </button>
          <button
            onClick={() => { setMode('insert'); handleReset(); }}
            className={`flex-1 py-4 text-center font-semibold transition-colors ${
              mode === 'insert' ? 'bg-primary/10 text-primary border-b-2 border-primary' : 'text-muted-foreground hover:bg-muted'
            }`}
          >
            <ArrowRight className="inline w-4 h-4 mr-2" /> Insert PDF (Advanced)
          </button>
        </div>

        <CardContent className="p-6 space-y-6">
          
          {/* ---------------- MODE 1: SIMPLE MERGE ---------------- */}
          {mode === 'merge' && (
            <div className="space-y-6">
              <div
                className="flex flex-col items-center justify-center space-y-4 p-12 border-2 border-dashed rounded-lg cursor-pointer hover:border-primary bg-muted/20"
                onClick={() => simpleInputRef.current?.click()}
              >
                <div className="p-4 bg-secondary rounded-full">
                  <Upload className="w-10 h-10 text-muted-foreground" />
                </div>
                <div className="text-center">
                  <p className="font-semibold">Click to upload PDFs</p>
                  <p className="text-sm text-muted-foreground">Select 2 or more files</p>
                </div>
                <Input ref={simpleInputRef} type="file" className="hidden" accept="application/pdf" multiple onChange={handleSimpleFileChange} />
              </div>

              {files.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-muted-foreground">Selected Files:</h3>
                  <div className="flex flex-wrap gap-2">
                    {files.map((file, idx) => (
                      <span key={idx} className="px-3 py-1 bg-secondary text-secondary-foreground text-xs rounded-full">
                        {file.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ---------------- MODE 2: INSERT PDF ---------------- */}
          {mode === 'insert' && (
            <div className="grid md:grid-cols-2 gap-6">
              {/* Left: Main PDF */}
              <div className="space-y-3">
                <Label className="font-semibold">1. Main PDF (Base Document)</Label>
                <div 
                  className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-primary bg-muted/20"
                  onClick={() => mainInputRef.current?.click()}
                >
                  {mainFile ? (
                    <div className="text-primary font-medium truncate">{mainFile.name}</div>
                  ) : (
                    <div className="text-muted-foreground text-sm flex flex-col items-center">
                      <Upload className="w-6 h-6 mb-2" />
                      <span>Upload Main PDF</span>
                    </div>
                  )}
                  <Input ref={mainInputRef} type="file" className="hidden" accept="application/pdf" onChange={(e) => setMainFile(e.target.files?.[0] || null)} />
                </div>
              </div>

              {/* Right: Insert PDF */}
              <div className="space-y-3">
                <Label className="font-semibold">2. PDF to Insert (To add inside)</Label>
                <div 
                  className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-primary bg-muted/20"
                  onClick={() => insertInputRef.current?.click()}
                >
                  {insertFile ? (
                    <div className="text-primary font-medium truncate">{insertFile.name}</div>
                  ) : (
                    <div className="text-muted-foreground text-sm flex flex-col items-center">
                      <Upload className="w-6 h-6 mb-2" />
                      <span>Upload Insert PDF</span>
                    </div>
                  )}
                  <Input ref={insertInputRef} type="file" className="hidden" accept="application/pdf" onChange={(e) => setInsertFile(e.target.files?.[0] || null)} />
                </div>
              </div>

              {/* Bottom: Page Number */}
              <div className="md:col-span-2 bg-secondary/30 p-4 rounded-lg flex flex-col sm:flex-row items-center justify-center gap-4">
                <Label className="whitespace-nowrap font-medium">Insert AFTER Page Number:</Label>
                <Input 
                  type="number" 
                  min={1} 
                  value={insertPage} 
                  onChange={(e) => setInsertPage(parseInt(e.target.value) || 1)}
                  className="w-24 text-center font-bold"
                />
                <span className="text-xs text-muted-foreground">(e.g., enter "2" to insert after page 2)</span>
              </div>
            </div>
          )}

        </CardContent>

        {/* Footer Actions */}
        <CardFooter className="flex justify-center gap-4 bg-muted/50 border-t p-4">
          <Button variant="outline" onClick={handleReset} disabled={isProcessing}>
            <Trash2 className="mr-2 h-4 w-4" /> Reset
          </Button>

          {/* Conditional Action Button */}
          {mode === 'merge' ? (
            <Button onClick={handleSimpleMerge} disabled={isProcessing || files.length < 2 || !!resultPdfDataUri}>
              {isProcessing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Layers className="mr-2 h-4 w-4" />}
              Merge All Files
            </Button>
          ) : (
            <Button onClick={handleInsertMode} disabled={isProcessing || !mainFile || !insertFile || !!resultPdfDataUri}>
              {isProcessing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <FilePlus2 className="mr-2 h-4 w-4" />}
              Insert PDF
            </Button>
          )}

          <Button onClick={handleDownload} disabled={!resultPdfDataUri || isProcessing} variant="default" className="bg-green-600 hover:bg-green-700">
            <Download className="mr-2 h-4 w-4" /> Download PDF
          </Button>
        </CardFooter>
      </Card>

      {/* SEO Content & FAQ (Kept same for SEO value) */}
      <section className="max-w-4xl mx-auto py-10 grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold">Why Use TaskGuru?</h2>
          <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-4">
            <li>✔ <strong>Two Modes:</strong> Simple Merge & Advanced Insert</li>
            <li>✔ <strong>Secure:</strong> Files deleted instantly</li>
            <li>✔ <strong>No Limits:</strong> Merge unlimited files for free</li>
          </ul>
        </div>
        <div>
           {/* You can keep your existing use cases here */}
           <h2 className="text-xl font-semibold">How to Insert PDF?</h2>
           <ol className="list-decimal list-inside text-muted-foreground space-y-2 mt-4">
             <li>Select "Insert PDF (Advanced)" tab.</li>
             <li>Upload your <strong>Main PDF</strong>.</li>
             <li>Upload the <strong>Second PDF</strong>.</li>
             <li>Type the <strong>Page Number</strong> where you want to insert.</li>
           </ol>
        </div>
      </section>
    </div>
  );
}
