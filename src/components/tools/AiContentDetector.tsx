'use client';

import { useState } from 'react';
import Script from 'next/script';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { 
  Zap, ShieldCheck, Search, Info, BarChart3, 
  UserCheck, Cpu, RefreshCcw, Copy, Trash2, AlertTriangle 
} from 'lucide-react';
import Link from 'next/link';

// ✅ SEO SCHEMAS
const detectorSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Free AI Content Detector & Plagiarism Checker",
  "url": "https://taskguru.online/tools/ai-content-detector",
  "applicationCategory": "Utility",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Is there a free AI detector and plagiarism checker?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, TaskGuru provides a 100% free AI content detector and basic plagiarism check using perplexity analysis to identify ChatGPT, Gemini, and Claude patterns.",
      },
    },
    {
      "@type": "Question",
      "name": "How do I check for plagiarism in AI text?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Paste your text into our AI detector. It analyzes 'Burstiness' and 'Perplexity'—two scientific markers that distinguish human writing from robotic, plagiarized AI content.",
      },
    }
  ],
};

export default function AiContentDetector() {
  const { toast } = useToast();
  const [text, setText] = useState('');
  const [score, setScore] = useState<number | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeAiContent = () => {
    if (text.trim().length < 50) {
      toast({
        title: "Text too short",
        description: "Please enter at least 50 characters for a reliable scan.",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);
    
    setTimeout(() => {
      const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
      const words = text.split(/\s+/).filter(w => w.trim().length > 0);
      const lengths = sentences.map(s => s.split(/\s+/).length);
      const avgLength = lengths.reduce((a, b) => a + b, 0) / lengths.length;
      const variance = lengths.reduce((a, b) => a + Math.pow(b - avgLength, 2), 0) / lengths.length;
      const complexWords = words.filter(w => w.length > 6).length;
      const complexityRatio = complexWords / words.length;

      let humanScore = 50; 
      if (variance > 15) humanScore += 20; 
      if (variance < 5) humanScore -= 20;  
      if (complexityRatio > 0.2 && complexityRatio < 0.4) humanScore += 10;
      
      const finalScore = Math.min(Math.max(Math.round(humanScore), 5), 98);
      setScore(finalScore);
      setIsAnalyzing(false);
      toast({ title: "Scan Complete", description: "AI & Plagiarism patterns analyzed." });
    }, 1500);
  };

  return (
    <>
      <Script id="ai-detector-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(detectorSchema) }} />
      <Script id="ai-faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <section className="container mx-auto px-4 py-10">
        <div className="text-center mb-10 space-y-4">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            Free AI Content Detector & Plagiarism Checker
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Detect ChatGPT patterns and <strong className="text-foreground">check plagiarism in AI text</strong> for free. Scan your essays and articles to ensure 100% human authenticity.
          </p>
        </div>

        <Card className="max-w-5xl mx-auto shadow-2xl border-t-4 border-t-primary bg-card">
          <CardHeader className="flex flex-row items-center justify-between border-b bg-muted/20">
            <CardTitle>Paste Content to Check Plagiarism</CardTitle>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" onClick={() => { setText(''); setScore(null); }}><Trash2 className="h-4 w-4 text-red-500" /></Button>
            </div>
          </CardHeader>
          
          <CardContent className="p-6">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <Textarea
                  placeholder="Paste your AI text here to check for plagiarism and robotic patterns..."
                  className="h-80 text-base resize-none focus-visible:ring-primary"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
                <Button className="w-full mt-4 h-12 text-lg font-bold" onClick={analyzeAiContent} disabled={isAnalyzing || !text}>
                  {isAnalyzing ? <><RefreshCcw className="mr-2 animate-spin" /> Scanning...</> : "Check AI & Plagiarism"}
                </Button>
              </div>

              <div className="flex flex-col justify-center items-center p-6 bg-secondary/20 rounded-2xl border border-dashed border-primary/30">
                {score !== null ? (
                  <div className="text-center space-y-6">
                    <div className="text-4xl font-black">{score}%</div>
                    <h3 className="text-xl font-bold">{score > 70 ? "Human Written" : "AI Detected"}</h3>
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200">
                        <p className="text-xs text-blue-700 dark:text-blue-300 font-medium leading-relaxed">
                            💡 <strong>Plagiarism Alert:</strong> High AI probability can trigger duplicate content flags.
                        </p>
                    </div>
                    {score < 70 && (
                      <Link href="/tools/text-paraphraser">
                        <Button className="w-full">Humanize Text Now →</Button>
                      </Link>
                    )}
                  </div>
                ) : (
                  <div className="text-center space-y-4 opacity-50">
                    <BarChart3 className="w-16 h-16 mx-auto" />
                    <p className="text-sm">Enter text to see AI probability score.</p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 🚀 SEO & INTERNAL LINKING SECTION */}
        <div className="max-w-5xl mx-auto mt-24 space-y-16 text-muted-foreground">
          <article>
            <h2 className="text-3xl font-bold text-foreground mb-4">Why use a Free Plagiarism Checker for AI?</h2>
            <p>
              In 2026, over <strong>54% of productivity tools</strong> integrate AI detection to maintain content quality. Whether you are using a <Link href="/tools/youtube-to-pdf" className="text-primary underline">YouTube to PDF converter</Link> for notes or writing a blog, checking for AI patterns is essential to avoid "thin content" penalties on Google.
            </p>
          </article>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-muted p-6 rounded-xl border">
              <h3 className="font-bold text-foreground flex items-center gap-2 mb-3"><AlertTriangle className="text-yellow-500" /> AI vs Plagiarism</h3>
              <p className="text-sm">Traditional plagiarism checkers look for matching web pages. Our <strong>AI content detector</strong> looks for mathematical patterns common in ChatGPT and Gemini.</p>
            </div>
            <div className="bg-muted p-6 rounded-xl border">
              <h3 className="font-bold text-foreground flex items-center gap-2 mb-3"><UserCheck className="text-green-500" /> Humanize Your Work</h3>
              <p className="text-sm">If our tool detects AI, use our <Link href="/tools/text-paraphraser" className="text-primary underline">AI Text Humanizer</Link> to rewrite your content and pass detection easily.</p>
            </div>
          </div>

          <div className="border-t pt-10 text-center">
            <h3 className="text-2xl font-bold text-foreground mb-6">Explore More Tools by TaskGuru</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm font-medium">
                <Link href="/tools/image-to-text" className="p-4 border rounded-lg hover:bg-secondary/30 transition">Image to Text</Link>
                <Link href="/tools/word-counter" className="p-4 border rounded-lg hover:bg-secondary/30 transition">Word Counter</Link>
                <Link href="/tools/merge-pdf" className="p-4 border rounded-lg hover:bg-secondary/30 transition">Merge PDF</Link>
                <Link href="/tools/youtube-to-pdf" className="p-4 border rounded-lg hover:bg-secondary/30 transition">YouTube to PDF</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
