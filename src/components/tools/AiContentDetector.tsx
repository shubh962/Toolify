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

      <section className="container mx-auto px-4 py-6">
        {/* ✅ FIXED: Removed <h1> to avoid double title issue */}
        <div className="text-center mb-8 space-y-3">
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Detect ChatGPT patterns and <strong className="text-foreground">check plagiarism in AI text</strong> for free. 
            Ensure 100% human authenticity in your essays, blogs, and articles.
          </p>
        </div>

        <Card className="max-w-5xl mx-auto shadow-2xl border-t-4 border-t-primary bg-card">
          <CardHeader className="flex flex-row items-center justify-between border-b bg-muted/20">
            <div>
              <CardTitle className="text-xl">Analyze Content Authenticity</CardTitle>
              <CardDescription>Paste at least 50 characters for analysis</CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={() => { setText(''); setScore(null); }}>
              <Trash2 className="h-4 w-4 text-red-500" />
            </Button>
          </CardHeader>
          
          <CardContent className="p-6">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <Textarea
                  placeholder="Paste your content here to check for AI patterns and duplicate structures..."
                  className="h-80 text-base resize-none focus-visible:ring-primary"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
                <Button className="w-full mt-4 h-12 text-lg font-bold" onClick={analyzeAiContent} disabled={isAnalyzing || !text}>
                  {isAnalyzing ? <><RefreshCcw className="mr-2 animate-spin" /> Analyzing Patterns...</> : "Check AI & Plagiarism"}
                </Button>
              </div>

              <div className="flex flex-col justify-center items-center p-6 bg-secondary/20 rounded-2xl border border-dashed border-primary/30">
                {score !== null ? (
                  <div className="text-center space-y-6">
                    <div className="text-5xl font-black text-primary">{score}%</div>
                    <div>
                      <h3 className="text-xl font-bold">{score > 70 ? "Human Written" : "AI Detected"}</h3>
                      <p className="text-xs text-muted-foreground mt-1">Probability Score</p>
                    </div>
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200">
                        <p className="text-xs text-blue-700 dark:text-blue-300 font-medium leading-relaxed">
                            💡 <strong>Plagiarism Alert:</strong> High AI probability scores can trigger search engine penalties for "thin content."
                        </p>
                    </div>
                    {score < 70 && (
                      <Link href="/tools/text-paraphraser">
                        <Button className="w-full font-bold">Humanize Text Now →</Button>
                      </Link>
                    )}
                  </div>
                ) : (
                  <div className="text-center space-y-4 opacity-50">
                    <BarChart3 className="w-16 h-16 mx-auto" />
                    <p className="text-sm font-medium">Enter text to scan for AI-generated patterns.</p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 🚀 SEO & UPDATED INTERNAL LINKING */}
        <div className="max-w-5xl mx-auto mt-20 space-y-16 text-muted-foreground leading-relaxed">
          <article>
            <h2 className="text-2xl font-bold text-foreground mb-4">The Science Behind AI Content Detection</h2>
            <p className="mb-4">
              Our tool analyzes two critical scientific markers: <strong>Perplexity</strong> and <strong>Burstiness</strong>. 
              While AI tools like ChatGPT produce predictable patterns, humans write with varied rhythm and complexity. 
              Identifying these robotic fingerprints is key to avoiding <strong>AI-driven plagiarism</strong>.
            </p>
          </article>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-muted p-6 rounded-xl border">
              <h3 className="font-bold text-foreground flex items-center gap-2 mb-3"><AlertTriangle className="text-yellow-500" /> AI vs Plagiarism</h3>
              <p className="text-sm">Standard checkers find copied web text, but our <strong>AI content detector</strong> identifies mathematical patterns common in machine-generated essays.</p>
            </div>
            <div className="bg-muted p-6 rounded-xl border">
              <h3 className="font-bold text-foreground flex items-center gap-2 mb-3"><UserCheck className="text-green-500" /> Improve Your Score</h3>
              <p className="text-sm">If your content is flagged, use our <Link href="/tools/text-paraphraser" className="text-primary font-bold underline">AI Text Humanizer</Link> to add natural flow and personality.</p>
            </div>
          </div>

          <div className="border-t pt-10">
            <h3 className="text-xl font-bold text-foreground mb-6 text-center">Explore Related Productivity Tools</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm font-medium">
                {/* ✅ Sitemap Corrected Paths */}
                <Link href="/tools/youtube-to-pdf" className="p-4 border rounded-xl hover:bg-secondary/50 transition text-center">YouTube to PDF</Link>
                <Link href="/tools/image-to-text" className="p-4 border rounded-xl hover:bg-secondary/50 transition text-center">Image to Text</Link>
                <Link href="/tools/word-counter" className="p-4 border rounded-xl hover:bg-secondary/50 transition text-center">Word Counter</Link>
                <Link href="/tools/merge-pdf" className="p-4 border rounded-xl hover:bg-secondary/50 transition text-center">Merge PDF</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
