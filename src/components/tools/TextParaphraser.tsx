'use client';

import { useState } from 'react';
import Script from 'next/script';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import {
  Loader2, Copy, Trash2, Wand2, UserCheck, Zap,
  ShieldCheck, Globe, PenTool, BookOpen, Scale, Search,
  ArrowRight,
} from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { handleTextParaphrasing } from '@/app/actions';

// ✅ FIX 1: Deduplicated FAQ — all 7 unique questions in ONE schema
// (was: 3 in schema + 4 duplicated manually below = duplicate content penalty)
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the best free AI text humanizer online?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "TaskGuru offers the best free AI paraphrasing tool and humanizer that rewrites ChatGPT text instantly to sound 100% natural and human-like. No signup, no word limits, completely free.",
      },
    },
    {
      "@type": "Question",
      "name": "How do I convert AI text to human text?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Paste your AI-generated text into TaskGuru's free paraphraser and click Paraphrase Now. The AI rewrites your content with natural sentence structures and vocabulary. For extra confidence, verify the result with TaskGuru's free AI Content Detector at taskguru.online/tools/ai-content-detector.",
      },
    },
    {
      "@type": "Question",
      "name": "Is this sentence rephraser free for students?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes — completely free for students, researchers, and writers. No daily limits, no hidden costs, no signup required. Paraphrase essays, research papers, and assignments instantly.",
      },
    },
    {
      "@type": "Question",
      "name": "How do I know if my paraphrased text will pass AI detection?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "After paraphrasing, use TaskGuru's free AI Content Detector to verify your human-like score. It checks whether your text reads as human-written or AI-generated, helping you ensure your content bypasses robotic fingerprints.",
      },
    },
    {
      "@type": "Question",
      "name": "Does AI paraphrasing affect SEO?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Quality AI paraphrasing improves SEO, not hurts it. Google values unique, readable content. TaskGuru rewrites text to sound natural and human, which improves readability scores and engagement — positive signals for search rankings. Low-quality article spinners that produce unreadable text do harm SEO.",
      },
    },
    {
      "@type": "Question",
      "name": "What is the character limit for paraphrasing?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "TaskGuru's free paraphraser supports up to 5,000 characters per request. For longer documents, process them section by section for best results.",
      },
    },
    {
      "@type": "Question",
      "name": "Is my text stored when I use the paraphraser?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. Your text is processed securely and is not stored on TaskGuru's servers. The paraphrasing happens in real-time and your content is never saved, shared, or used for training.",
      },
    },
  ],
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Free AI Text Humanizer & Paraphraser",
  "url": "https://taskguru.online/tools/text-paraphraser",
  "applicationCategory": "Utility",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "publisher": {
    "@type": "Organization",
    "name": "TaskGuru",
    "logo": "https://taskguru.online/logo.png",
  },
};

const MAX_CHARS = 5000;

export default function TextParaphraser() {
  const { toast } = useToast();
  const [inputText, setInputText] = useState<string>('');
  const [outputText, setOutputText] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!inputText.trim()) {
      toast({ title: "Empty Input", description: "Please enter some text to paraphrase.", variant: "destructive" });
      return;
    }
    if (inputText.length < 10) {
      toast({ title: "Too Short", description: "Please enter at least 10 characters.", variant: "destructive" });
      return;
    }
    if (inputText.length > MAX_CHARS) {
      toast({ title: "Too Long", description: `Please keep text under ${MAX_CHARS} characters.`, variant: "destructive" });
      return;
    }
    setIsLoading(true);
    setOutputText('');
    try {
      const result = await handleTextParaphrasing(inputText);
      if (result.success && result.data?.paraphrasedText) {
        setOutputText(result.data.paraphrasedText);
        toast({ title: "Success!", description: "Text paraphrased successfully." });
      } else {
        toast({ title: "Error", description: result.error || "Failed to process", variant: "destructive" });
      }
    } catch {
      toast({ title: "Error", description: "Something went wrong. Please try again.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (!outputText) return;
    navigator.clipboard.writeText(outputText);
    toast({ title: "Copied to clipboard!" });
  };

  const handleReset = () => {
    setInputText('');
    setOutputText('');
    setIsLoading(false);
  };

  const charCount = inputText.length;
  const isOverLimit = charCount > MAX_CHARS;

  return (
    <>
      <Script id="text-paraphraser-tool-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema) }} />
      <Script id="text-paraphraser-faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <section className="container mx-auto px-4">

        {/* ── TOOL CARD ── */}
        <Card className="w-full max-w-5xl mx-auto shadow-xl border-t-4 border-t-primary bg-card mt-8">
          <CardContent className="p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">

              {/* Input */}
              <div className="flex flex-col space-y-3">
                <label htmlFor="input-text" className="font-semibold text-lg">Paste Text to Rewrite</label>
                <Textarea
                  id="input-text"
                  className="h-80 resize-none text-base p-4 focus-visible:ring-primary"
                  placeholder="Enter text here to paraphrase and remove plagiarism..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  disabled={isLoading}
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Min: 10 chars</span>
                  <span className={isOverLimit ? "text-red-500 font-bold" : ""}>
                    {charCount} / {MAX_CHARS} chars{isOverLimit && " — too long"}
                  </span>
                </div>
              </div>

              {/* Output */}
              <div className="flex flex-col space-y-3">
                <div className="flex justify-between items-center h-7">
                  <label htmlFor="output-text" className="font-semibold text-lg">Paraphrased Output</label>
                  <Button onClick={handleCopy} disabled={!outputText || isLoading} variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                    <Copy className="mr-2 h-4 w-4" /> Copy Text
                  </Button>
                </div>
                <div className="relative">
                  {isLoading && (
                    <div className="absolute inset-0 z-10 bg-background/50 backdrop-blur-sm flex items-center justify-center rounded-md border">
                      <div className="flex flex-col items-center gap-2">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        <span className="text-sm font-medium">Rewriting text...</span>
                      </div>
                    </div>
                  )}
                  <Textarea
                    id="output-text"
                    className="h-80 resize-none bg-secondary/30 text-base p-4"
                    placeholder="Your unique, rephrased text will appear here."
                    value={outputText}
                    readOnly
                  />
                </div>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex justify-center gap-4 bg-muted/30 p-6 border-t">
            <Button variant="outline" size="lg" onClick={handleReset} disabled={isLoading} className="min-w-[120px]">
              <Trash2 className="mr-2 h-4 w-4" /> Clear
            </Button>
            <Button size="lg" onClick={handleSubmit} disabled={isLoading || !inputText || isOverLimit} className="min-w-[180px]">
              <Wand2 className="mr-2 h-4 w-4" /> Paraphrase Now
            </Button>
          </CardFooter>
        </Card>

        {/* ✅ FIX 2: AI Content Detector CTA — internal link */}
        <div className="max-w-5xl mx-auto mt-6">
          <div className="flex items-center justify-between p-4 bg-primary/5 border border-primary/20 rounded-2xl">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Search className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="font-bold text-sm text-foreground">Verify your result with AI Content Detector</p>
                <p className="text-xs text-muted-foreground">Check if your paraphrased text reads as 100% human-written</p>
              </div>
            </div>
            <Link
              href="/tools/ai-content-detector"
              className="flex items-center gap-1.5 px-4 py-2 bg-primary text-white font-bold text-sm rounded-xl hover:bg-primary/90 transition-colors flex-shrink-0"
            >
              Check Now <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <section className="max-w-5xl mx-auto mt-16">
          <h2 className="text-3xl font-bold text-center mb-10">Why Use Our Free Online Paraphrasing Tool?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: <ShieldCheck className="text-green-500 h-6 w-6" />, title: "Plagiarism Remover", desc: <>Our <strong>AI Text Rewriter</strong> completely changes sentence structures to create unique content. Perfect for academic essays and SEO articles.</> },
              { icon: <Zap className="text-blue-500 h-6 w-6" />, title: "Fast Article Spinner", desc: <>Use our <strong>Article Rewriter</strong> to spin text in seconds. It maintains the original meaning while changing words and structure naturally.</> },
              { icon: <Globe className="text-purple-500 h-6 w-6" />, title: "Unlimited & Free", desc: <>Unlike other tools, TaskGuru is a completely <strong>Free Paraphrasing Tool</strong>. No login required, no word limits. Paraphrase as much as you want.</> },
            ].map((item) => (
              <Card key={item.title} className="bg-card border-none shadow-md hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">{item.icon} {item.title}</CardTitle>
                </CardHeader>
                <CardContent><p className="text-muted-foreground text-sm">{item.desc}</p></CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* SEO Article */}
        <section className="max-w-4xl mx-auto my-20 space-y-14 text-muted-foreground leading-relaxed">

          <article>
            <h2 className="text-3xl font-bold text-foreground mb-5">Free AI Text to Human Text Converter & Paraphraser</h2>
            <p className="mb-4">
              In the era of ChatGPT, finding a reliable <strong>paraphrasing tool</strong> that sounds natural is difficult. Most standard &quot;article spinners&quot; just replace words with awkward synonyms, making text sound robotic. <strong>TaskGuru&apos;s AI Text Humanizer</strong> uses advanced machine learning to understand context before rewriting — creating content that sounds 100% human.
            </p>
            <p className="mb-4">
              Whether you want to <strong>convert AI text to human text</strong>, rewrite an essay, or rephrase a blog post for readability, our tool ensures high-quality output. After paraphrasing, use our{' '}
              {/* ✅ FIX 2: AI Content Detector internal link — in body text */}
              <Link href="/tools/ai-content-detector" className="text-primary font-semibold underline underline-offset-4 hover:text-primary/80">
                free AI Content Detector
              </Link>{' '}
              to verify your human-like score before publishing.
            </p>
          </article>

          <article>
            <h2 className="text-2xl font-semibold text-foreground mb-4">How to Make AI Text Sound Human?</h2>
            <p className="mb-4">Our <strong>AI Text Humanizer</strong> ensures your work flows naturally. Here is how our <strong>sentence rephraser</strong> works:</p>
            <ul className="list-disc list-inside space-y-3 ml-4">
              <li><strong>Context Analysis:</strong> The tool reads your AI-generated text to grasp the core meaning.</li>
              <li><strong>Natural Rephrasing:</strong> It acts as a smart <strong>text rewriter</strong>, breaking down robotic patterns and introducing conversational structures.</li>
              <li><strong>Smart Vocabulary:</strong> Finds the best contextual synonyms rather than complex, unnatural words.</li>
              <li><strong>Final Polish:</strong> Get human-quality content ready for publication or submission.</li>
            </ul>
          </article>

          <article>
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Who Needs an AI Paraphraser?</h2>
            <div className="grid md:grid-cols-2 gap-5">
              {[
                { icon: <UserCheck className="h-6 w-6 text-primary" />, title: "Students (Essay Rewriter)", desc: "Rephrase research papers and ensure your text sounds like it was written by a real student, not a machine. Perfect for improving clarity and avoiding plagiarism." },
                { icon: <PenTool className="h-6 w-6 text-primary" />, title: "Bloggers & Creators", desc: "Convert AI text to human text to bypass generic tones. Create engaging blog posts that connect with your actual audience and rank better on Google." },
                { icon: <Zap className="h-6 w-6 text-primary" />, title: "Freelance Writers", desc: "Save time on rewriting and editing. Use our AI humanizer to quickly refine drafts and increase your daily writing productivity." },
                { icon: <Globe className="h-6 w-6 text-primary" />, title: "Digital Marketers", desc: "Transform stiff AI marketing text into persuasive, conversational copy that drives clicks, engagement, and conversions." },
              ].map((item) => (
                <div key={item.title} className="bg-secondary/20 p-6 rounded-xl border border-border">
                  <div className="flex items-center gap-3 mb-3">{item.icon}<h3 className="font-bold text-lg text-foreground">{item.title}</h3></div>
                  <p className="text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </article>

          <article className="bg-muted/30 p-8 rounded-xl border border-border">
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
              <BookOpen className="text-primary h-6 w-6" /> Paraphrasing vs. Summarizing vs. Quoting
            </h2>
            <div className="space-y-5">
              {[
                { n: "1", title: "Paraphrasing (Rewriting)", desc: "Rewriting a passage in your own words while keeping the same meaning. Structure and vocabulary change completely. TaskGuru excels at this." },
                { n: "2", title: "Summarizing", desc: "Condensing the main ideas into a shorter version. It captures the gist but leaves out details. Different from paraphrasing — shorter, not just reworded." },
                { n: "3", title: "Quoting", desc: "Copying a passage word-for-word. You must always use quotation marks and cite the original author. Never paraphrase a quote without attribution." },
              ].map(item => (
                <div key={item.n}>
                  <h4 className="font-semibold text-foreground text-base">{item.n}. {item.title}</h4>
                  <p className="mt-1 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </article>

          <article>
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Search className="text-primary h-6 w-6" /> Does AI Paraphrasing Affect SEO?
            </h2>
            <p className="mb-4">
              Many users worry if using an <strong>AI text rewriter</strong> will harm their SEO. Google values <strong>unique, helpful, and natural content</strong>. TaskGuru creates human-quality text that improves readability and engagement — positive signals for search rankings. After paraphrasing, verify your content with our{' '}
              <Link href="/tools/ai-content-detector" className="text-primary font-semibold underline underline-offset-4 hover:text-primary/80">
                AI Content Detector
              </Link>{' '}
              to ensure it reads as genuine human writing.
            </p>
          </article>

          <article>
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Scale className="text-primary h-6 w-6" /> Ethical Use of Paraphrasing Tools
            </h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Academic Integrity:</strong> Use this tool to improve sentence structure and clarity, not to bypass learning. Always cite your original sources.</li>
              <li><strong>Copyright:</strong> Use for fair use purposes — commentary, research, or improving your own writing. Do not rewrite and republish others&apos; content as your own.</li>
            </ul>
          </article>

          <article>
            <h3 className="text-2xl font-semibold text-foreground mb-4">Tips for Best Results</h3>
            <ol className="list-decimal list-inside space-y-3 ml-2">
              <li><strong>Proofread Your Output:</strong> Always give the result a quick read to ensure it captures your intended meaning accurately.</li>
              <li><strong>Process in Chunks:</strong> For long documents, paraphrase section by section for better contextual focus.</li>
              <li><strong>Check Specific Data:</strong> Ensure proper nouns, dates, and figures remain unchanged in the output.</li>
              <li><strong>Verify with AI Detector:</strong> Use our <Link href="/tools/ai-content-detector" className="text-primary font-semibold underline underline-offset-4">AI Content Detector</Link> to confirm your final result reads as human-written.</li>
            </ol>
          </article>

        </section>

        {/* ✅ FIX 1: FAQ — now renders from single deduplicated schema (no duplicates) */}
        <section className="max-w-4xl mx-auto my-20 p-8 bg-card shadow-sm rounded-xl border">
          <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-5">
            {faqSchema.mainEntity.map((item, i) => (
              <details key={i} className="border-b border-border pb-5 last:border-b-0 last:pb-0 cursor-pointer group">
                <summary className="font-semibold text-base text-foreground list-none flex justify-between items-center">
                  {item.name}
                  <span className="transition-transform group-open:rotate-180 text-muted-foreground flex-shrink-0 ml-2 text-xs">▼</span>
                </summary>
                <p className="mt-3 text-muted-foreground text-sm leading-relaxed">{item.acceptedAnswer.text}</p>
              </details>
            ))}
          </div>
        </section>

        {/* ✅ FIX 2: Related tools — AI Content Detector as first link */}
        <section className="max-w-4xl mx-auto mb-20">
          <h3 className="text-xl font-black text-foreground mb-5 text-center">Explore More Free Tools</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: "AI Content Detector", href: "/tools/ai-content-detector", highlight: true },
              { label: "YouTube to PDF", href: "/tools/youtube-to-pdf" },
              { label: "Image to Text", href: "/tools/image-to-text" },
              { label: "Word Counter", href: "/tools/word-counter" },
              { label: "Resume Maker", href: "/tools/resume-maker" },
              { label: "PDF to Word", href: "/tools/pdf-to-word" },
              { label: "Image Compressor", href: "/tools/image-compressor" },
              { label: "Merge PDF", href: "/tools/merge-pdf" },
            ].map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className={`flex items-center justify-center p-3 rounded-xl text-sm font-semibold text-center transition-colors border ${
                  tool.highlight
                    ? "bg-primary/10 border-primary/30 text-primary hover:bg-primary/15"
                    : "bg-secondary/30 border-border text-foreground hover:bg-secondary/50"
                }`}
              >
                {tool.label} →
              </Link>
            ))}
          </div>
        </section>

      </section>
    </>
  );
}
