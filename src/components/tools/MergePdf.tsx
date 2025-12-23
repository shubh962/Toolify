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

// 👇 ACTIONS IMPORT: handleInsertPdf and handleMergePdf
import { handleMergePdf, handleInsertPdf } from '@/app/actions';

export default function MergePdf() {
  const { toast } = useToast();
  
  // 🟢 STATES (Unchanged Working Logic)
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

  // 🟢 HANDLERS (Unchanged Working Logic)
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
      } else { throw new Error(result.error); }
    } catch (error) {
      toast({ title: 'Error', description: error instanceof Error ? error.message : 'Merge failed.', variant: 'destructive' });
    } finally { setIsProcessing(false); }
  };

  const handleInsertMode = async () => {
    if (!mainFile || !insertFile) {
      toast({ title: 'Missing files', description: 'Please upload both PDFs.', variant: 'destructive' });
      return;
    }
    setIsProcessing(true);
    setResultPdfDataUri(null);
    try {
      const mainBase64 = await fileToBase64(mainFile);
      const insertBase64 = await fileToBase64(insertFile);
      const result = await handleInsertPdf(mainBase64, insertBase64, insertPage);
      if (result.success && result.data?.mergedPdfDataUri) {
        setResultPdfDataUri(result.data.mergedPdfDataUri);
        toast({ title: 'Success!', description: `PDF inserted at page ${insertPage}.` });
      } else { throw new Error(result.error); }
    } catch (error) {
      toast({ title: 'Error', description: error instanceof Error ? error.message : 'Insert failed.', variant: 'destructive' });
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
      {/* 🌟 HUMAN-TONED HERO SECTION */}
      <section className="max-w-4xl mx-auto text-center space-y-6 py-8">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-gray-900 dark:text-white">
          Free Online <span className="text-primary underline decoration-primary/20">PDF Merger & Inserter</span>
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Stop struggling with scattered documents. Whether you need to combine reports or 
          [span_0](start_span)[span_1](start_span)precisely insert a page into a contract, TaskGuru handles it in seconds—privately and for free[span_0](end_span)[span_1](end_span).
        </p>
      </section>

      {/* 🟢 TOOL INTERFACE CARD */}
      <Card className="w-full max-w-5xl mx-auto shadow-2xl border-t-4 border-primary overflow-hidden">
        <div className="flex border-b bg-muted/20">
          <button
            onClick={() => { setMode('merge'); handleReset(); }}
            className={`flex-1 py-5 text-center font-bold transition-all ${
              mode === 'merge' ? 'bg-background text-primary border-b-2 border-primary' : 'text-muted-foreground hover:bg-muted/50'
            }`}
          >
            [span_2](start_span)<Layers className="inline w-5 h-5 mr-2" /> Simple Merge[span_2](end_span)
          </button>
          <button
            onClick={() => { setMode('insert'); handleReset(); }}
            className={`flex-1 py-5 text-center font-bold transition-all ${
              mode === 'insert' ? 'bg-background text-primary border-b-2 border-primary' : 'text-muted-foreground hover:bg-muted/50'
            }`}
          >
            [span_3](start_span)<ArrowRight className="inline w-5 h-5 mr-2" /> Advanced Insert[span_3](end_span)
          </button>
        </div>

        <CardContent className="p-8 space-y-8">
          {mode === 'merge' ? (
            <div className="space-y-6">
              <div
                className="flex flex-col items-center justify-center space-y-4 p-16 border-2 border-dashed rounded-2xl cursor-pointer hover:border-primary bg-primary/5 hover:bg-primary/10 transition-all group"
                onClick={() => simpleInputRef.current?.click()}
              >
                <div className="p-5 bg-white rounded-full shadow-sm group-hover:scale-110 transition-transform">
                  <Upload className="w-12 h-12 text-primary" />
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold">Upload Multiple PDFs</p>
                  [span_4](start_span)<p className="text-muted-foreground">Drag & drop or click to select 2 or more files[span_4](end_span)</p>
                </div>
                <Input ref={simpleInputRef} type="file" className="hidden" accept="application/pdf" multiple onChange={handleSimpleFileChange} />
              </div>

              {files.length > 0 && (
                <div className="p-4 bg-muted/30 rounded-xl border">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3">Selected Documents:</h3>
                  <div className="flex flex-wrap gap-2">
                    {files.map((file, idx) => (
                      <span key={idx} className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full border border-primary/20">
                        [span_5](start_span){file.name}[span_5](end_span)
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-3">
                [span_6](start_span)<Label className="font-bold text-lg">1. Main Document[span_6](end_span)</Label>
                <div 
                  className="border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer hover:border-primary bg-muted/20 hover:bg-muted/40 transition-all"
                  onClick={() => mainInputRef.current?.click()}
                >
                  {mainFile ? (
                    [span_7](start_span)<div className="text-primary font-bold truncate">{mainFile.name}[span_7](end_span)</div>
                  ) : (
                    <div className="text-muted-foreground flex flex-col items-center">
                      <Upload className="w-8 h-8 mb-2" />
                      [span_8](start_span)<span>Upload Base PDF[span_8](end_span)</span>
                    </div>
                  )}
                  <Input ref={mainInputRef} type="file" className="hidden" accept="application/pdf" onChange={(e) => setMainFile(e.target.files?.[0] || null)} />
                </div>
              </div>

              <div className="space-y-3">
                <Label className="font-bold text-lg">2. [span_9](start_span)PDF to Insert[span_9](end_span)</Label>
                <div 
                  className="border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer hover:border-primary bg-muted/20 hover:bg-muted/40 transition-all"
                  onClick={() => insertInputRef.current?.click()}
                >
                  {insertFile ? (
                    [span_10](start_span)<div className="text-primary font-bold truncate">{insertFile.name}[span_10](end_span)</div>
                  ) : (
                    <div className="text-muted-foreground flex flex-col items-center">
                      <Upload className="w-8 h-8 mb-2" />
                      [span_11](start_span)<span>Upload Insert PDF[span_11](end_span)</span>
                    </div>
                  )}
                  <Input ref={insertInputRef} type="file" className="hidden" accept="application/pdf" onChange={(e) => setInsertFile(e.target.files?.[0] || null)} />
                </div>
              </div>

              <div className="md:col-span-2 bg-primary/5 p-6 rounded-2xl border border-primary/10 flex flex-col sm:flex-row items-center justify-center gap-6">
                <Label className="font-bold text-gray-800 dark:text-gray-200">Insert AFTER Page Number:</Label>
                <div className="flex items-center gap-3">
                  <Input 
                    type="number" min={1} value={insertPage} 
                    onChange={(e) => setInsertPage(parseInt(e.target.value) || 1)}
                    className="w-24 text-center font-black text-lg border-primary/30"
                  />
                  [span_12](start_span)<span className="text-xs text-muted-foreground italic">(Example: Type "2" to insert after page 2)[span_12](end_span)</span>
                </div>
              </div>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex justify-center gap-4 bg-muted/50 border-t p-8">
          <Button variant="outline" size="lg" onClick={handleReset} disabled={isProcessing} className="font-bold">
            [span_13](start_span)[span_14](start_span)<Trash2 className="mr-2 h-5 w-5" /> Reset[span_13](end_span)[span_14](end_span)
          </Button>

          {mode === 'merge' ? (
            <Button size="lg" onClick={handleSimpleMerge} disabled={isProcessing || files.length < 2 || !!resultPdfDataUri} className="font-bold px-8">
              {isProcessing ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Layers className="mr-2 h-5 w-5" />}
              [span_15](start_span)Merge All Documents[span_15](end_span)
            </Button>
          ) : (
            <Button size="lg" onClick={handleInsertMode} disabled={isProcessing || !mainFile || !insertFile || !!resultPdfDataUri} className="font-bold px-8">
              {isProcessing ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <FilePlus2 className="mr-2 h-5 w-5" />}
              [span_16](start_span)Apply Insertion[span_16](end_span)
            </Button>
          )}

          <Button size="lg" onClick={handleDownload} disabled={!resultPdfDataUri || isProcessing} className="bg-green-600 hover:bg-green-700 font-bold px-8 text-white">
            [span_17](start_span)<Download className="mr-2 h-5 w-5" /> Download PDF[span_17](end_span)
          </Button>
        </CardFooter>
      </Card>

      {/* 🚀 HIGH-VALUE HUMAN CONTENT SECTION */}
      <article className="max-w-4xl mx-auto px-4 py-12 border-t">
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">Why Professionals Choose TaskGuru's PDF Merger?</h2>
          
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div className="space-y-4">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <ShieldCheck className="text-green-600 w-6 h-6" /> 100% Privacy by Design
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                We believe your documents are your business. Unlike many "cloud-based" competitors, 
                our <strong>PDF Merger online</strong> operates using transient memory processing. 
                [span_18](start_span)Your files are merged and wiped instantly—we never store your data[span_18](end_span).
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Zap className="text-yellow-500 w-6 h-6" /> Advanced "Insert" Technology
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Sometimes you don't just want to combine files; you need to insert a signed signature 
                page or an appendix right into the middle of a report. [span_19](start_span)Our **Advanced Insert Mode** lets you pick the exact page number for seamless integration[span_19](end_span).
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-bold mt-12 mb-6">Mastering Your PDF Workflow</h2>
          <p>
            Combining files is just the beginning. After merging your documents, you might find that 
            the final file size is too large for email attachments. We recommend using our 
            <Link href="/tools/image-compressor" className="text-primary font-bold hover:underline"> Free Image Compressor</Link> 
            to reduce the resolution of internal graphics without losing text clarity.
          </p>
          
          <div className="bg-muted p-8 rounded-[2.5rem] my-12 border border-border">
            <h3 className="text-2xl font-bold mb-4 text-center">Frequently Asked Questions</h3>
            <div className="space-y-6">
              <details className="cursor-pointer group">
                <summary className="font-bold text-lg list-none flex justify-between items-center bg-white dark:bg-zinc-900 p-4 rounded-xl shadow-sm">
                  Is TaskGuru PDF Merger really free?
                  <span className="text-primary group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="p-4 text-muted-foreground">
                  [span_20](start_span)Yes, it is 100% free with no hidden charges, watermarks, or daily limits[span_20](end_span).
                </p>
              </details>
              <details className="cursor-pointer group">
                <summary className="font-bold text-lg list-none flex justify-between items-center bg-white dark:bg-zinc-900 p-4 rounded-xl shadow-sm">
                  Can I merge files on my mobile phone?
                  <span className="text-primary group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="p-4 text-muted-foreground">
                  Absolutely! Our tool is fully responsive and works perfectly on Android and iOS browsers.
                </p>
              </details>
            </div>
          </div>
        </div>
      </article>

      <footer className="mt-12 pt-8 border-t text-center italic text-muted-foreground">
        Built with ❤️ for a more productive web. [span_21](start_span)100% Secure & Fast[span_21](end_span).
      </footer>
    </div>
  );
}

