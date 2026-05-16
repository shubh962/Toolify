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
  ArrowRight, CheckCircle,
} from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { handleTextParaphrasing } from '@/app/actions';

// ✅ FIXED: 7 UNIQUE FAQ questions — no duplicates
// PDF had same 3 questions in schema AND rendered on page = duplicate content
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the best free AI text humanizer online?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "TaskGuru offers the best free AI paraphrasing tool and humanizer that rewrites ChatGPT text instantly to sound 100% natural and human-like. No signup, no word limits, completely free.",
      },
    },
    {
      "@type": "Question",
      name: "How do I convert AI text to human text for free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Paste your AI-generated text into the box above and click Paraphrase Now. TaskGuru's AI rewrites the sentence structure and vocabulary to create a natural, human-sounding version. After paraphrasing, verify the result with our free AI Content Detector tool.",
      },
    },
    {
      "@type": "Question",
      name: "Is this paraphrasing tool free for students?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — completely free for students, researchers, and writers with no daily limits, no word count restrictions, and no hidden costs. No account required.",
      },
    },
    {
      "@type": "Question",
      name: "How many words can I paraphrase at once?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "TaskGuru's paraphraser supports up to 5,000 characters (approximately 800-1,000 words) per session. For longer documents, process them section by section for best results.",
      },
    },
    {
      "@type": "Question",
      name: "Will the paraphrased text pass AI detection?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "TaskGuru rewrites content to sound natural and human-like. After paraphrasing, use our free AI Content Detector to verify the human-like score of your text before submitting or publishing.",
      },
    },
    {
      "@type": "Question",
      name: "Does AI paraphrasing affect SEO?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Used correctly, AI paraphrasing improves SEO by creating unique content. Google values helpful, readable, and unique content. TaskGuru produces human-quality output that improves readability scores rather than harming them. Avoid cheap spinners that produce unreadable keyword-stuffed text.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between paraphrasing and summarizing?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Paraphrasing rewrites the full content in different words while keeping the same meaning and length. Summarizing condenses the main ideas into a shorter version. TaskGuru is a paraphrasing tool — it rewrites your text at the same length with improved clarity.",
      },
    },
  ],
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Free AI Text Humanizer & Paraphraser",
  url: "https://www.taskguru.online/tools/text-paraphraser",
  applicationCategory: "Utility",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  publisher: {
    "@type": "Organization",
    name: "TaskGuru",
    logo: "https://www.taskguru.online/logo.png",
  },
};

const MAX_CHARS = 5000;

export default function TextParaphraser() {
  const { toast } = useToast();
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

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
        toast({ title: "✅ Done!", description: "Text paraphrased successfully." });
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
    setCopied(true);
    toast({ title: "Copied to clipboard!" });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setInputText('');
    setOutputText('');
    setIsLoading(false);
    setCopied(false);
  };

  const charCount = inputText.length;
  const isOverLimit = charCount > MAX_CHARS;

  return (
    <>
      <Script id="text-paraphraser-tool-schema" type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema) }} />
      <Script id="text-paraphraser-faq-schema" type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <section className="container mx-auto px-4">

        {/* ── TOOL CARD ── */}
        <Card className="w-full max-w-5xl mx-auto shadow-xl border-t-4 border-t-primary bg-card mt-8">
          <CardContent className="p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">

              {/* Input */}
              <div className="flex flex-col space-y-3">
                <label htmlFor="input-text" className="font-semibold text-lg">
                  Paste Text to Rewrite
                </label>
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
                  <label htmlFor="output-text" className="font-semibold text-lg">
                    Paraphrased Output
                  </label>
                  <Button
                    onClick={handleCopy}
                    disabled={!outputText || isLoading}
                    variant="ghost"
                    size="sm"
                    className="text-primary hover:text-primary/80"
                  >
                    {copied
                      ? <><CheckCircle className="mr-1.5 h-4 w-4 text-green-500" /> Copied!</>
                      : <><Copy className="mr-2 h-4 w-4" /> Copy Text</>
                    }
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

                {/* ✅ NEW: AI Content Detector CTA — appears after paraphrasing */}
                {outputText && (
                  <Link
                    href="/tools/ai-content-detector"
                    className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl hover:border-blue-400 transition-colors group text-sm"
                  >
                    <div>
                      <p className="font-bold text-blue-700 dark:text-blue-300">Check with AI Content Detector</p>
                      <p className="text-xs text-slate-500">Verify your text passes AI detection</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-blue-400 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                  </Link>
                )}
              </div>

            </div>
          </CardContent>

          <CardFooter className="flex justify-center gap-4 bg-muted/30 p-6 border-t">
            <Button variant="outline" size="lg" onClick={handleReset} disabled={isLoading} className="min-w-[120px]">
              <Trash2 className="mr-2 h-4 w-4" /> Clear
            </Button>
            <Button
              size="lg"
              onClick={handleSubmit}
              disabled={isLoading || !inputText || isOverLimit}
              className="min-w-[180px]"
            >
              <Wand2 className="mr-2 h-4 w-4" />
              {isLoading ? "Paraphrasing..." : "Paraphrase Now"}
            </Button>
          </CardFooter>
        </Card>

        {/* ── FEATURES GRID ── */}
        <section className="max-w-5xl mx-auto mt-20">
          <h2 className="text-3xl font-bold text-center mb-10">Why Use Our Free Online Paraphrasing Tool?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: <ShieldCheck className="text-green-500 h-6 w-6" />, title: "Plagiarism Remover", desc: "Our AI Text Rewriter completely restructures sentences to help you create unique content — perfect for academic essays and SEO articles." },
              { icon: <Zap className="text-blue-500 h-6 w-6" />, title: "Fast Article Spinner", desc: "Spin text in seconds. Maintains the original meaning while completely changing the words and sentence structure." },
              { icon: <Globe className="text-purple-500 h-6 w-6" />, title: "Unlimited & Free", desc: "No login required, no word limits, no daily caps. Paraphrase as much as you want — completely free, forever." },
            ].map((item) => (
              <Card key={item.title} className="bg-card border-none shadow-md hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">{item.icon} {item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* ── SEO CONTENT ── */}
        <section className="max-w-4xl mx-auto my-20 space-y-14 text-muted-foreground leading-relaxed">

          <article>
            <h2 className="text-3xl font-bold text-foreground mb-5">Free AI Text to Human Text Converter & Paraphraser</h2>
            <p className="mb-4">
              In the era of ChatGPT, finding a reliable <strong>paraphrasing tool</strong> that sounds natural is difficult.
              Most standard article spinners just replace words with awkward synonyms.
              <strong> TaskGuru&apos;s AI Text Humanizer</strong> understands context before rewriting — producing content that sounds 100% human.
            </p>
            <p>
              Whether you want to <strong>convert AI text to human text</strong>, rewrite an essay, or rephrase a blog post,
              our tool delivers high-quality output. After paraphrasing, verify your results with our{' '}
              <Link href="/tools/ai-content-detector" className="text-primary font-bold hover:underline underline-offset-4">
                free AI Content Detector
              </Link>{' '}
              to ensure your text passes AI detection.
            </p>
          </article>

          <article>
            <h2 className="text-2xl font-bold text-foreground mb-4">How to Make AI Text Sound Human?</h2>
            <div className="space-y-3">
              {[
                { title: "Context Analysis", desc: "The tool reads your AI-generated text to grasp the core meaning before rewriting." },
                { title: "Natural Rephrasing", desc: "Acts as a smart text rewriter — breaks down robotic patterns and introduces conversational structures." },
                { title: "Smart Vocabulary", desc: "Finds the best contextual synonyms rather than complex, unnatural word swaps." },
                { title: "Final Polish", desc: "Get content ready for publication or academic submission that flows naturally." },
              ].map((item) => (
                <div key={item.title} className="flex gap-3 p-4 bg-secondary/20 border border-border rounded-xl">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-foreground">{item.title}: </span>
                    <span className="text-sm">{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </article>

          <article>
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Who Needs an AI Paraphraser?</h2>
            <div className="grid md:grid-cols-2 gap-5">
              {[
                { icon: <UserCheck className="h-6 w-6 text-primary" />, title: "Students (Essay Rewriter)", desc: "Rephrase research papers and ensure your text sounds like it was written by a real student, not an AI. Great for B.Tech, MBA, and university assignments." },
                { icon: <PenTool className="h-6 w-6 text-primary" />, title: "Bloggers & Creators", desc: "Convert AI text to human text to bypass generic tones. Create engaging, readable blog posts that connect with your audience." },
                { icon: <Zap className="h-6 w-6 text-primary" />, title: "Freelance Writers", desc: "Save time on rewriting and editing. Use our AI humanizer to quickly refine drafts and increase your daily writing productivity." },
                { icon: <Globe className="h-6 w-6 text-primary" />, title: "Digital Marketers", desc: "Transform stiff AI marketing text into persuasive, conversational copy that drives clicks and conversions." },
              ].map((item) => (
                <div key={item.title} className="bg-secondary/20 p-5 rounded-xl border border-border">
                  <div className="flex items-center gap-3 mb-2">{item.icon}<h3 className="font-bold text-foreground">{item.title}</h3></div>
                  <p className="text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </article>

          <article className="bg-muted/30 p-7 rounded-xl border border-border">
            <h2 className="text-2xl font-bold text-foreground mb-5 flex items-center gap-2">
              <BookOpen className="text-primary h-6 w-6" /> Paraphrasing vs. Summarizing vs. Quoting
            </h2>
            <div className="space-y-4">
              {[
                { n: "1", title: "Paraphrasing (Rewriting)", desc: "Rewriting a passage in your own words while keeping the same meaning and length. TaskGuru excels at this." },
                { n: "2", title: "Summarizing", desc: "Taking the main ideas and condensing them into a shorter version. It captures the gist but leaves out details." },
                { n: "3", title: "Quoting", desc: "Copying word-for-word. You must always use quotation marks and cite the original author." },
              ].map((item) => (
                <div key={item.n}>
                  <h4 className="font-semibold text-foreground">{item.n}. {item.title}</h4>
                  <p className="mt-1 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </article>

          <article>
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Search className="text-primary h-6 w-6" /> Does AI Paraphrasing Affect SEO?
            </h2>
            <p className="mb-3">
              Used correctly, AI paraphrasing <strong>improves SEO</strong>. Google values unique, helpful, and natural content.
              TaskGuru creates human-quality text that improves readability scores and keeps readers engaged — both positive ranking signals.
            </p>
            <p>
              Avoid cheap spinners that produce unreadable keyword-stuffed output. After paraphrasing with TaskGuru,
              verify your content with our{' '}
              <Link href="/tools/ai-content-detector" className="text-primary font-bold hover:underline underline-offset-4">
                AI Content Detector
              </Link>{' '}
              to ensure top quality before publishing.
            </p>
          </article>

          <article>
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Scale className="text-primary h-6 w-6" /> Ethical Use of Paraphrasing Tools
            </h2>
            <div className="space-y-2">
              {[
                { title: "Academic Integrity", desc: "Use this tool to understand complex texts or improve sentence structure — not to bypass learning. Always cite your sources." },
                { title: "Copyright", desc: "Use for fair use purposes like commentary, research, or news reporting. Do not rewrite and republish full copyrighted works." },
              ].map((item) => (
                <div key={item.title} className="flex gap-3 text-sm p-3 bg-secondary/10 rounded-lg">
                  <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <p><strong className="text-foreground">{item.title}:</strong> {item.desc}</p>
                </div>
              ))}
            </div>
          </article>
<article>
            <h3 className="text-2xl font-bold text-foreground mb-4">Tips for Best Results</h3>
            <div className="space-y-3">
              {[
                { n: "1", tip: "Proofread Your Output", desc: "Always review the final result to ensure it captures your intended meaning correctly." },
                { n: "2", tip: "Process in Chunks", desc: "For long documents, paraphrase section by section so the AI maintains better context focus." },
                { n: "3", tip: "Check Specific Data", desc: "Verify that proper nouns, dates, and figures remain accurate in the output." },
                { n: "4", tip: "Verify with AI Detector", desc: "After paraphrasing, use our AI Content Detector to confirm your text reads as human-written." },
              ].map((item) => (
                <div key={item.n} className="flex gap-3 p-3 text-sm">
                  <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold flex-shrink-0 text-xs">{item.n}</span>
                  <p><strong className="text-foreground">{item.tip}:</strong> {item.desc}</p>
                </div>
              ))}
            </div>
          </article>

        </section>

        {/* ── FAQ SECTION — ✅ NO DUPLICATES — 7 unique questions ── */}
        <section className="max-w-4xl mx-auto my-20 p-8 bg-card shadow-sm rounded-xl border">
          <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqSchema.mainEntity.map((item, i) => (
              <details
                key={i}
                className="group bg-secondary/10 border border-border rounded-xl p-5 cursor-pointer"
              >
                <summary className="font-semibold text-foreground list-none flex justify-between items-center text-sm md:text-base">
                  {item.name}
                  <span className="transition-transform group-open:rotate-180 text-muted-foreground flex-shrink-0 ml-2">▼</span>
                </summary>
                <p className="text-muted-foreground mt-3 text-sm leading-relaxed">{item.acceptedAnswer.text}</p>
              </details>
            ))}
          </div>
        </section>

        {/* ✅ NEW: Internal Links Section — replaces broken "Explore More Tools" grid */}
        <section className="max-w-4xl mx-auto mb-20">
          <h3 className="text-xl font-black text-foreground mb-5 text-center">Explore More Free Tools</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: "AI Content Detector", sub: "Check if text is AI written", href: "/tools/ai-content-detector", highlight: true },
              { label: "YouTube to PDF", sub: "Convert video to notes", href: "/tools/youtube-to-pdf", highlight: false },
              { label: "Image to Text", sub: "Extract text from images", href: "/tools/image-to-text", highlight: false },
              { label: "Word Counter", sub: "Count words & characters", href: "/tools/word-counter", highlight: false },
            ].map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className={`p-4 rounded-2xl border transition-colors group text-center ${
                  tool.highlight
                    ? "bg-primary/5 border-primary/30 hover:border-primary"
                    : "bg-card border-border hover:border-primary/40"
                }`}
              >
                <p className={`font-bold text-sm mb-0.5 ${tool.highlight ? "text-primary" : "text-foreground"}`}>
                  {tool.label}
                </p>
                <p className="text-xs text-muted-foreground">{tool.sub}</p>
              </Link>
            ))}
          </div>
        </section>

      </section>
    </>
  );
}
          
