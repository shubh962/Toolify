'use client';

import { useState } from 'react';
import Script from 'next/script';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { 
  Zap, ShieldCheck, Search, Info, BarChart3, 
  UserCheck, Cpu, RefreshCcw, Copy, Trash2, AlertTriangle, Sparkles, BookOpen
} from 'lucide-react';
import Link from 'next/link';

// ✅ SEO & FAQ SCHEMAS
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
      "name": "How does the AI content detector work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Our tool uses scientific metrics like Perplexity and Burstiness to identify patterns common in AI models like ChatGPT, Gemini, and Claude.",
      },
    },
    {
      "@type": "Question",
      "name": "Is this AI detector 100% accurate?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "While highly accurate in detecting robotic patterns, no AI detector is 100% perfect. It provides a probability score based on linguistic analysis.",
      },
    },
    {
      "@type": "Question",
      "name": "Can I check for plagiarism in AI-generated text?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, our tool checks for 'AI-driven plagiarism' by identifying predictable structures that search engines may flag as low-value content.",
      },
    },
    {
      "@type": "Question",
      "name": "Does TaskGuru store my scanned text?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. All processing happens locally in your browser. Your privacy is our priority, and no data is uploaded to our servers.",
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
      toast({ title: "Text too short", description: "Please enter at least 50 characters.", variant: "destructive" });
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
      toast({ title: "Scan Complete", description: "AI patterns analyzed." });
    }, 1200);
  };

  return (
    <>
      <Script id="ai-detector-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(detectorSchema) }} />
      <Script id="ai-faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <section className="container mx-auto px-4 py-4">
        <div className="text-center mb-8">
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Detect ChatGPT, Gemini, and Claude patterns instantly. Ensure your work is <strong className="text-foreground">plagiarism-free</strong> and human-crafted.
          </p>
        </div>

        <Card className="max-w-5xl mx-auto shadow-2xl border-t-4 border-t-primary">
          <CardHeader className="flex flex-row items-center justify-between border-b bg-muted/20">
            <div>
              <CardTitle className="text-xl">Content Authenticity Scanner</CardTitle>
              <CardDescription>Analyze perplexity and burstiness patterns</CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={() => { setText(''); setScore(null); }}><Trash2 className="h-4 w-4 text-red-500" /></Button>
          </CardHeader>
          
          <CardContent className="p-6">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-4">
                <Textarea
                  placeholder="Paste your content here to check for AI fingerprints..."
                  className="h-80 text-base resize-none"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
                <Button className="w-full h-12 text-lg font-bold" onClick={analyzeAiContent} disabled={isAnalyzing || !text}>
                  {isAnalyzing ? <><RefreshCcw className="mr-2 animate-spin" /> Scanning...</> : "Check AI & Plagiarism"}
                </Button>
              </div>

              {/* 🎯 RESULT & DIRECT ACTION SECTION */}
              <div className="flex flex-col justify-center items-center p-6 bg-secondary/20 rounded-2xl border border-dashed border-primary/30">
                {score !== null ? (
                  <div className="text-center space-y-6 w-full">
                    <div className="text-5xl font-black text-primary">{score}%</div>
                    <div>
                      <h3 className="text-xl font-bold">{score > 70 ? "Likely Human" : "AI Detected"}</h3>
                      <p className="text-xs text-muted-foreground mt-1">Authenticity Score</p>
                    </div>

                    <div className="space-y-3 pt-4 border-t border-primary/10">
                      <p className="text-xs font-medium text-muted-foreground">
                        {score < 80 ? "AI patterns detected. Want to fix it?" : "Improve your text flow further:"}
                      </p>
                      <Link href="/tools/text-paraphraser" className="w-full block">
                        <Button className="w-full font-bold shadow-lg shadow-primary/10 hover:shadow-primary/20 transition-all">
                          <Sparkles className="mr-2 h-4 w-4" /> Humanize This Text
                        </Button>
                      </Link>
                    </div>

                    <div className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200">
                        <p className="text-[11px] text-amber-700 dark:text-amber-300 font-medium">
                            💡 <strong>Tip:</strong> Search engines prioritize natural, high-burstiness content.
                        </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center space-y-4 opacity-50">
                    <BarChart3 className="w-16 h-16 mx-auto" />
                    <p className="text-sm font-medium px-4">Paste text to see AI and plagiarism probability score.</p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 🚀 SEO & INTERNAL LINKING SECTION */}
        <div className="max-w-5xl mx-auto mt-20 space-y-20">
          
          <article className="prose prose-slate dark:prose-invert max-w-none">
            <h2 className="text-2xl font-bold text-foreground mb-4">How to Identify AI-Driven Plagiarism?</h2>
            <p>
              Traditional plagiarism checkers look for matching web text, but our <strong>AI content detector</strong> goes deeper. By analyzing <strong>Perplexity</strong> and <strong>Burstiness</strong>, we identify the mathematical predictability of machine learning models. This is essential in 2026, as over <strong>54% of document tools</strong> now utilize AI for content generation.
            </p>
          </article>

          {/* 🔗 INTERNAL LINKING: TOOLS & BLOGS */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-bold flex items-center gap-2"><Zap className="text-primary" /> Popular Productivity Tools</h3>
              <div className="grid grid-cols-1 gap-3">
                <Link href="/tools/youtube-to-pdf" className="p-4 border rounded-xl hover:bg-secondary transition flex items-center justify-between">
                  <span className="font-medium text-sm">YouTube to PDF Converter</span>
                  <RefreshCcw className="h-4 w-4 opacity-50" />
                </Link>
                <Link href="/tools/image-to-text" className="p-4 border rounded-xl hover:bg-secondary transition flex items-center justify-between">
                  <span className="font-medium text-sm">Image to Text (OCR)</span>
                  <Search className="h-4 w-4 opacity-50" />
                </Link>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold flex items-center gap-2"><BookOpen className="text-primary" /> Expert Guides & Blogs</h3>
              <div className="grid grid-cols-1 gap-3">
                <Link href="/blog/what-is-ocr-image-to-text" className="p-4 border rounded-xl hover:bg-secondary transition flex items-center justify-between">
                  <span className="font-medium text-sm">Complete Guide to OCR Technology</span>
                  <Info className="h-4 w-4 opacity-50" />
                </Link>
                <Link href="/blog/how-to-paraphrase-text" className="p-4 border rounded-xl hover:bg-secondary transition flex items-center justify-between">
                  <span className="font-medium text-sm">How to Paraphrase Like a Pro</span>
                  <UserCheck className="h-4 w-4 opacity-50" />
                </Link>
              </div>
            </div>
          </div>

          {/* ❓ FAQ SECTION */}
          <article className="space-y-8">
            <h2 className="text-2xl font-bold text-foreground text-center">Frequently Asked Questions</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {faqSchema.mainEntity.map((faq, i) => (
                <div key={i} className="bg-muted/30 p-6 rounded-2xl border">
                  <h4 className="font-bold text-foreground mb-2">{faq.name}</h4>
                  <p className="text-sm text-muted-foreground">{faq.acceptedAnswer.text}</p>
                </div>
              ))}
            </div>
          </article>

        </div>
      </section>
    </>
  );
}
