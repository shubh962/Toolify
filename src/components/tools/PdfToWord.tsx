'use client';

import { useState, useRef, DragEvent, useEffect } from 'react';
import Head from 'next/head';
import Script from 'next/script';
import Link from 'next/link';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Upload, FileText, Trash2, Loader2, Download, CheckCircle, ShieldCheck, Zap, Globe, Lock, ArrowRight, BookOpen, Laptop, Briefcase, GraduationCap, AlertCircle, Sparkles } from 'lucide-react';

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
      },
      {
        "@type": "Question",
        "name": "Does this tool support large PDF files?",
        "acceptedAnswer": { "@type": "Answer", "text": "Absolutely. Because the conversion happens on your own device, there are no server upload limits. You can convert files larger than 100MB easily." }
      },
      {
        "@type": "Question",
        "name": "Do I need to install any software?",
        "acceptedAnswer": { "@type": "Answer", "text": "No. TaskGuru works entirely in your web browser (Chrome, Safari, Firefox, Edge). No downloads, plugins, or extensions are required." }
      }
    ]
  };

  return 

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
      <article className="max-w-5xl mx-auto px-6 py-16 space-y-20 font-sans text-gray-600 dark:text-gray-300">
        
        {/* 1. H1 + Direct Answer (Featured Snippet Target) */}
        <section className="text-center space-y-8">
          <h1 className="text-5xl md:text-7xl font-black text-gray-900 dark:text-white tracking-tight leading-none">
            Convert PDF to Word <span className="text-blue-600">Free Online</span>
          </h1>
          
          <div className="bg-blue-50 dark:bg-blue-900/10 p-8 md:p-10 rounded-[2.5rem] border border-blue-100 dark:border-blue-900 text-left max-w-4xl mx-auto shadow-sm">
            <div className="flex items-center gap-3 mb-4">
                <Sparkles className="w-5 h-5 text-blue-600" />
                <h2 className="text-sm font-bold text-blue-700 dark:text-blue-300 uppercase tracking-widest">Quick Answer</h2>
            </div>
            <p className="text-lg md:text-xl text-gray-800 dark:text-gray-200 leading-relaxed font-medium">
              TaskGuru provides the fastest way to <strong>convert PDF to Word for free</strong>. 
              Our advanced browser-based tool extracts text from your PDF and reconstructs it into an <strong>editable Microsoft Word document (.docx)</strong> instantly. 
              Unlike traditional converters, TaskGuru processes files <strong>100% on your device</strong> (Client-Side Technology). 
              This ensures <strong>military-grade privacy</strong> and allows you to convert unlimited files of any size without uploading data to a server.
            </p>
          </div>
        </section>

        {/* 2. How It Works (Step-by-Step) */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-4">How to Convert PDF to Word Online?</h2>
            <p className="text-lg max-w-2xl mx-auto">Follow these three simple steps to transform your static PDF into an editable document in seconds.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-[2rem] bg-white dark:bg-gray-800 shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-700 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Upload className="w-24 h-24" />
                </div>
                <span className="text-5xl font-black text-blue-600/20 mb-4 block">01</span>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Upload File</h3>
                <p className="leading-relaxed">Drag and drop your PDF into the converter box. We support drag-and-drop for ease of use. Large files (50MB, 100MB+) are fully supported.</p>
            </div>
            <div className="p-8 rounded-[2rem] bg-white dark:bg-gray-800 shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-700 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Zap className="w-24 h-24" />
                </div>
                <span className="text-5xl font-black text-blue-600/20 mb-4 block">02</span>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Instant Processing</h3>
                <p className="leading-relaxed">Our WebAssembly engine reads your PDF structure locally. It identifies text lines, paragraphs, and pages without sending data to the cloud.</p>
            </div>
            <div className="p-8 rounded-[2rem] bg-white dark:bg-gray-800 shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-700 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Download className="w-24 h-24" />
                </div>
                <span className="text-5xl font-black text-blue-600/20 mb-4 block">03</span>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Save & Edit</h3>
                <p className="leading-relaxed">A green "Download Word File" button appears instantly. Click it to save your .docx file, ready for editing in Microsoft Word or Google Docs.</p>
            </div>
          </div>
        </section>

        {/* 3. Key Benefits (Detailed Breakdown) */}
        <section className="bg-gray-50 dark:bg-gray-800/30 p-10 md:p-16 rounded-[3rem]">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-12 text-center">Why TaskGuru is the Best Choice?</h2>
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
            <div className="flex gap-5">
                <div className="w-14 h-14 rounded-2xl bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center flex-shrink-0 text-blue-600">
                    <ShieldCheck className="w-7 h-7" />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">100% Privacy Guarantee</h3>
                    <p className="leading-relaxed">Most online converters upload your files to their servers, creating a risk of data breaches. TaskGuru is different. Your file stays on your computer. You can even disconnect the internet after loading the page, and it will still work!</p>
                </div>
            </div>
            <div className="flex gap-5">
                <div className="w-14 h-14 rounded-2xl bg-green-100 dark:bg-green-900/50 flex items-center justify-center flex-shrink-0 text-green-600">
                    <Globe className="w-7 h-7" />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Unlimited File Size</h3>
                    <p className="leading-relaxed">Server-based tools have limits (e.g., 5MB or 10MB) to save costs. Since we use your device's processing power, there are no limits. Convert a 200-page thesis or a 500MB legal bundle without errors.</p>
                </div>
            </div>
            <div className="flex gap-5">
                <div className="w-14 h-14 rounded-2xl bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center flex-shrink-0 text-purple-600">
                    <Laptop className="w-7 h-7" />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Cross-Platform Compatibility</h3>
                    <p className="leading-relaxed">Whether you are using Windows 11, macOS, Linux (Ubuntu), Android, or iOS, our tool works perfectly. No need to install heavy software like Adobe Acrobat or Microsoft Office.</p>
                </div>
            </div>
            <div className="flex gap-5">
                <div className="w-14 h-14 rounded-2xl bg-orange-100 dark:bg-orange-900/50 flex items-center justify-center flex-shrink-0 text-orange-600">
                    <Zap className="w-7 h-7" />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Lightning Fast Speed</h3>
                    <p className="leading-relaxed">Skip the upload and download queues. Traditional tools waste time uploading your file to the cloud. TaskGuru converts locally in milliseconds, saving you valuable time.</p>
                </div>
            </div>
          </div>
        </section>

        {/* 4. Deep Dive: Real World Use Cases */}
        <section>
          <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-8">Who Needs This Tool?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="border border-gray-200 dark:border-gray-700 p-8 rounded-3xl hover:border-blue-500 transition-colors">
                <GraduationCap className="w-10 h-10 text-gray-400 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Students & Researchers</h3>
                <p className="text-sm">Easily extract text from PDF journals, research papers, or assignments to quote in your essays without retyping manually.</p>
            </div>
            <div className="border border-gray-200 dark:border-gray-700 p-8 rounded-3xl hover:border-blue-500 transition-colors">
                <Briefcase className="w-10 h-10 text-gray-400 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">HR & Recruiters</h3>
                <p className="text-sm">Candidates often send resumes in PDF. Convert them to Word to add notes, reformat for clients, or mask personal details.</p>
            </div>
            <div className="border border-gray-200 dark:border-gray-700 p-8 rounded-3xl hover:border-blue-500 transition-colors">
                <BookOpen className="w-10 h-10 text-gray-400 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Legal Professionals</h3>
                <p className="text-sm">Convert contracts and legal agreements into editable drafts. Make changes, track revisions, and re-sign without starting from scratch.</p>
            </div>
          </div>
        </section>

        {/* 5. Client-Side vs Server-Side Comparison */}
        <section>
          <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-8">Why "Client-Side" is Better?</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse rounded-2xl overflow-hidden shadow-lg">
                <thead className="bg-gray-900 text-white">
                    <tr>
                        <th className="p-4 md:p-6 text-lg">Feature</th>
                        <th className="p-4 md:p-6 text-lg bg-blue-600">TaskGuru (Client-Side)</th>
                        <th className="p-4 md:p-6 text-lg bg-gray-800">Others (Server-Side)</th>
                    </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    <tr>
                        <td className="p-4 md:p-6 font-bold">Privacy</td>
                        <td className="p-4 md:p-6 text-green-600 font-bold">100% Private (No Uploads)</td>
                        <td className="p-4 md:p-6 text-red-500">Files Uploaded to Cloud</td>
                    </tr>
                    <tr>
                        <td className="p-4 md:p-6 font-bold">File Size Limit</td>
                        <td className="p-4 md:p-6 text-green-600 font-bold">Unlimited (Even 1GB+)</td>
                        <td className="p-4 md:p-6">Usually 10MB - 50MB</td>
                    </tr>
                    <tr>
                        <td className="p-4 md:p-6 font-bold">Speed</td>
                        <td className="p-4 md:p-6 text-green-600 font-bold">Instant (No Upload Time)</td>
                        <td className="p-4 md:p-6">Slow (Depends on Internet)</td>
                    </tr>
                    <tr>
                        <td className="p-4 md:p-6 font-bold">Cost</td>
                        <td className="p-4 md:p-6 text-green-600 font-bold">Free Forever</td>
                        <td className="p-4 md:p-6">Subscription for Pro</td>
                    </tr>
                </tbody>
            </table>
          </div>
        </section>

        {/* 6. Tips for Best Results */}
        <section className="bg-yellow-50 dark:bg-yellow-900/10 p-8 rounded-3xl border border-yellow-200 dark:border-yellow-800">
             <div className="flex items-center gap-3 mb-4">
                <AlertCircle className="w-6 h-6 text-yellow-600" />
                <h2 className="text-xl font-bold text-yellow-800 dark:text-yellow-200">Tips for Best Conversion Results</h2>
            </div>
            <ul className="list-disc pl-5 space-y-3 text-yellow-900/80 dark:text-yellow-100/80">
                <li><strong>Avoid Scanned PDFs:</strong> If your PDF is a photo of a document (scanned), this tool might only extract blank text. For images, use our <Link href="/tools/image-to-text" className="underline font-bold">Image to Text (OCR)</Link> tool instead.</li>
                <li><strong>Standard Fonts:</strong> PDFs created with standard fonts (Arial, Times New Roman) convert most accurately.</li>
                <li><strong>Check Formatting:</strong> While we preserve text perfectly, complex layouts (tables, floating images) might need minor adjustments in Word after conversion.</li>
            </ul>
        </section>

        {/* 7. Internal Linking (Boost SEO) */}
        <section className="bg-gray-50 dark:bg-gray-800/50 p-10 rounded-[2.5rem]">
          <h2 className="text-2xl font-bold mb-8 text-center">Explore More Free Productivity Tools</h2>
          <div className="grid md:grid-cols-2 gap-6">
             <Link href="/tools/resume-maker" className="flex items-center justify-between p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 hover:border-blue-500 hover:shadow-lg transition-all group">
                <div className="flex items-center gap-4">
                    <span className="p-3 bg-blue-100 text-blue-600 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors">📄</span>
                    <div>
                        <span className="font-bold text-gray-900 dark:text-white block">Create a Free Resume</span>
                        <span className="text-xs text-gray-500">ATS-Friendly Templates</span>
                    </div>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-blue-600" />
             </Link>
             <Link href="/tools/image-to-text" className="flex items-center justify-between p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 hover:border-green-500 hover:shadow-lg transition-all group">
                <div className="flex items-center gap-4">
                     <span className="p-3 bg-green-100 text-green-600 rounded-xl group-hover:bg-green-600 group-hover:text-white transition-colors">📝</span>
                    <div>
                        <span className="font-bold text-gray-900 dark:text-white block">Image to Text Converter</span>
                        <span className="text-xs text-gray-500">Extract Text from Images</span>
                    </div>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-green-600" />
             </Link>
             <Link href="/tools/background-remover" className="flex items-center justify-between p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 hover:border-purple-500 hover:shadow-lg transition-all group">
                <div className="flex items-center gap-4">
                     <span className="p-3 bg-purple-100 text-purple-600 rounded-xl group-hover:bg-purple-600 group-hover:text-white transition-colors">🖼️</span>
                    <div>
                        <span className="font-bold text-gray-900 dark:text-white block">Background Remover</span>
                        <span className="text-xs text-gray-500">Transparent PNGs Instantly</span>
                    </div>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-purple-600" />
             </Link>
             <Link href="/tools/age-calculator" className="flex items-center justify-between p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 hover:border-pink-500 hover:shadow-lg transition-all group">
                <div className="flex items-center gap-4">
                     <span className="p-3 bg-pink-100 text-pink-600 rounded-xl group-hover:bg-pink-600 group-hover:text-white transition-colors">📅</span>
                    <div>
                        <span className="font-bold text-gray-900 dark:text-white block">Age Calculator</span>
                        <span className="text-xs text-gray-500">Exact Date Calculation</span>
                    </div>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-pink-600" />
             </Link>
          </div>
        </section>

        {/* 8. FAQ Section (Schema Optimized) */}
        <section>
          <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqSchema.mainEntity.map((faq, index) => (
                <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-2xl p-6 hover:shadow-sm transition-shadow bg-white dark:bg-gray-900">
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
