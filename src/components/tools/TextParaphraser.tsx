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
  ArrowRight, CheckCircle, AlertTriangle, Lightbulb,
  Clock, User, RefreshCw,
} from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { handleTextParaphrasing } from '@/app/actions';

// ─────────────────────────────────────────────
// SCHEMAS
// ─────────────────────────────────────────────

// 7 UNIQUE FAQ questions — no schema/render duplicates
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
        text: "TaskGuru's paraphraser supports up to 5,000 characters (approximately 800–1,000 words) per session. For longer documents, process them section by section for best results.",
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

// ✅ aggregateRating REMOVED — fake ratings violate Google's structured data policy
// Add it back only when you collect real user ratings on-site
const toolSchema = {
  "@context": "https://schema.org",
  "@type": ["WebApplication", "SoftwareApplication"],
  name: "Free AI Text Humanizer & Paraphraser",
  url: "https://www.taskguru.online/tools/text-paraphraser",
  applicationCategory: "Utility",
  operatingSystem: "Any",
  browserRequirements: "Requires JavaScript",
  featureList: [
    "AI text humanizer",
    "Paraphrase text online",
    "Convert AI text to human text",
    "Plagiarism remover",
    "Essay rewriter",
    "Article spinner",
  ],
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
  },
  publisher: {
    "@type": "Organization",
    name: "TaskGuru",
    url: "https://www.taskguru.online",
    logo: {
      "@type": "ImageObject",
      url: "https://www.taskguru.online/logo.png",
    },
  },
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Paraphrase Text Using TaskGuru AI Paraphraser",
  description: "Step-by-step guide to converting AI-generated or robotic text into natural, human-sounding content using TaskGuru's free paraphrasing tool.",
  totalTime: "PT1M",
  estimatedCost: {
    "@type": "MonetaryAmount",
    currency: "USD",
    value: "0",
  },
  step: [
    {
      "@type": "HowToStep",
      name: "Paste your text",
      text: "Copy and paste the text you want to paraphrase into the left input box. Supports up to 5,000 characters per session.",
      position: 1,
    },
    {
      "@type": "HowToStep",
      name: "Click Paraphrase Now",
      text: "Press the Paraphrase Now button. TaskGuru's AI will analyze the full context of your text before rewriting.",
      position: 2,
    },
    {
      "@type": "HowToStep",
      name: "Review the output",
      text: "Read the paraphrased result in the right panel. The AI preserves your original meaning while rewriting sentences for natural flow.",
      position: 3,
    },
    {
      "@type": "HowToStep",
      name: "Copy and verify",
      text: "Click Copy Text to copy the output. Then run it through the free AI Content Detector to confirm it reads as human-written.",
      position: 4,
    },
  ],
};

// ✅ /tools removed from breadcrumb — not in sitemap, would 404
// Breadcrumb goes: Home → Text Paraphraser (2 levels, both verified in sitemap)
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://www.taskguru.online",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Text Paraphraser",
      item: "https://www.taskguru.online/tools/text-paraphraser",
    },
  ],
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Free AI Text Humanizer & Paraphraser — Convert AI Text to Human Text",
  description: "TaskGuru's free AI paraphrasing tool humanizes AI-generated text instantly. No login, no limits. Perfect for students, bloggers, writers, and marketers.",
  url: "https://www.taskguru.online/tools/text-paraphraser",
  // ✅ Update datePublished to the actual date this page first went live on your site
  datePublished: "2024-01-01",
  // ✅ dateModified matches sitemap lastmod: 2026-06-22
  dateModified: "2026-06-22",
  author: {
    "@type": "Person",
    name: "Shubham Gautam",
    url: "https://www.taskguru.online/about",
  },
  publisher: {
    "@type": "Organization",
    name: "TaskGuru",
    logo: {
      "@type": "ImageObject",
      url: "https://www.taskguru.online/logo.png",
    },
  },
  reviewedBy: {
    "@type": "Person",
    name: "Shubham Gautam",
  },
};

const speakableSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Free AI Text Humanizer & Paraphraser",
  url: "https://www.taskguru.online/tools/text-paraphraser",
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: ["#quick-answer", "#how-to-steps", "#tool-summary"],
  },
};

// ─────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────

const MAX_CHARS = 5000;
// ✅ Fixed: was "June 2025" — updated to match sitemap lastmod year
const LAST_UPDATED = "June 2026";
const READ_TIME = "6 min read";
const REVIEWED_BY = "Shubham Gautam";

// ─────────────────────────────────────────────
// INTERNAL LINKS — all verified against sitemap
// ─────────────────────────────────────────────

const internalLinks = [
  {
    label: "AI Content Detector",
    sub: "Check if text is AI written",
    href: "/tools/ai-content-detector",  // ✅ in sitemap
    highlight: true,
  },
  {
    label: "YouTube to PDF",
    sub: "Convert video to notes",
    href: "/tools/youtube-to-pdf",        // ✅ in sitemap
    highlight: false,
  },
  {
    label: "Image to Text",
    sub: "Extract text from images",
    href: "/tools/image-to-text",         // ✅ in sitemap
    highlight: false,
  },
  {
    label: "Word Counter",
    sub: "Count words & characters",
    href: "/tools/word-counter",          // ✅ in sitemap
    highlight: false,
  },
  {
    label: "Grammar Checker",
    sub: "Fix grammar and spelling",
    href: "/tools/grammar-checker",       // ✅ in sitemap
    highlight: false,
  },
  {
    label: "Resume Maker",
    sub: "Build a professional resume",
    href: "/tools/resume-maker",          // ✅ in sitemap
    highlight: false,
  },
  {
    label: "PDF Compressor",
    sub: "Compress PDF free online",
    href: "/tools/pdf-compressor",        // ✅ in sitemap
    highlight: false,
  },
  {
    label: "QR Code Generator",
    sub: "Create QR codes instantly",
    href: "/tools/qr-barcode-generator",  // ✅ in sitemap (fixed from /qr-code-generator)
    highlight: false,
  },
  {
    label: "Undetectable AI Guide",
    sub: "Make AI text undetectable",
    href: "/blog/how-to-make-ai-text-undetectable-free-2026", // ✅ in sitemap
    highlight: false,
  },
  {
    label: "Typing Speed Test",
    sub: "Test your WPM speed",
    href: "/tools/typing-speed-test",     // ✅ in sitemap
    highlight: false,
  },
  {
    label: "Remove Plagiarism",
    sub: "How to remove plagiarism free",
    href: "/blog/how-to-remove-plagiarism-free", // ✅ in sitemap
    highlight: false,
  },
  {
    label: "Paraphrase Blog",
    sub: "How to paraphrase for free",
    href: "/blog/best-free-paraphrasing-tool-online-2026", // ✅ in sitemap
    highlight: false,
  },
];

// ─────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────

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
      {/* ── JSON-LD SCHEMAS ── */}
      <Script
        id="text-paraphraser-tool-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema) }}
      />
      <Script
        id="text-paraphraser-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Script
        id="text-paraphraser-howto-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <Script
        id="text-paraphraser-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id="text-paraphraser-article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Script
        id="text-paraphraser-speakable-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }}
      />

      <section className="container mx-auto px-4">

        {/* ── BREADCRUMB — 2 levels, both verified in sitemap ── */}
        <nav aria-label="Breadcrumb" className="max-w-5xl mx-auto pt-4 pb-2">
          <ol className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <li>
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-foreground font-medium" aria-current="page">
              Text Paraphraser
            </li>
          </ol>
        </nav>

        {/* ── EEAT META BAR ── */}
        <div className="max-w-5xl mx-auto mb-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground border-b border-border pb-4">
          <span className="flex items-center gap-1.5">
            <User className="w-3.5 h-3.5" aria-hidden="true" />
            Reviewed by <strong className="text-foreground">{REVIEWED_BY}</strong>
          </span>
          <span className="flex items-center gap-1.5">
            <RefreshCw className="w-3.5 h-3.5" aria-hidden="true" />
            Updated: <strong className="text-foreground">{LAST_UPDATED}</strong>
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" aria-hidden="true" />
            {READ_TIME}
          </span>
        </div>

        {/* ── GEO: QUICK ANSWER ── */}
        <section
          id="quick-answer"
          aria-label="Quick Answer"
          className="max-w-5xl mx-auto mb-8 p-5 bg-primary/5 border border-primary/20 rounded-2xl"
        >
          <p className="text-xs font-bold text-primary uppercase tracking-wider mb-2">
            ⚡ Quick Answer
          </p>
          <p className="text-sm leading-relaxed text-foreground">
            <strong>TaskGuru&apos;s AI Text Paraphraser</strong> is a free tool that rewrites AI-generated
            or robotic text into natural, human-sounding content. Paste up to 5,000 characters,
            click <em>Paraphrase Now</em>, and get a fully rewritten version in under 10 seconds —
            no login, no limits, completely free. Best for students, bloggers, freelance writers,
            and digital marketers.
          </p>
        </section>

        {/* ── TOOL CARD ── */}
        <Card className="w-full max-w-5xl mx-auto shadow-xl border-t-4 border-t-primary bg-card">
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
                  aria-label="Input text to paraphrase"
                  aria-describedby="char-counter"
                />
                <div
                  id="char-counter"
                  className="flex justify-between text-sm text-muted-foreground"
                >
                  <span>Min: 10 chars</span>
                  <span
                    className={isOverLimit ? "text-red-500 font-bold" : ""}
                    aria-live="polite"
                  >
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
                    aria-label="Copy paraphrased text to clipboard"
                  >
                    {copied
                      ? <><CheckCircle className="mr-1.5 h-4 w-4 text-green-500" aria-hidden="true" /> Copied!</>
                      : <><Copy className="mr-2 h-4 w-4" aria-hidden="true" /> Copy Text</>
                    }
                  </Button>
                </div>

                <div className="relative">
                  {isLoading && (
                    <div
                      className="absolute inset-0 z-10 bg-background/50 backdrop-blur-sm flex items-center justify-center rounded-md border"
                      role="status"
                      aria-live="polite"
                    >
                      <div className="flex flex-col items-center gap-2">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" aria-hidden="true" />
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
                    aria-label="Paraphrased output text"
                    aria-live="polite"
                  />
                </div>

                {/* Post-paraphrase CTA */}
                {outputText && (
                  <Link
                    href="/tools/ai-content-detector"
                    className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl hover:border-blue-400 transition-colors group text-sm"
                    aria-label="Verify output with AI Content Detector"
                  >
                    <div>
                      <p className="font-bold text-blue-700 dark:text-blue-300">
                        Check with AI Content Detector
                      </p>
                      <p className="text-xs text-slate-500">
                        Verify your text passes AI detection
                      </p>
                    </div>
                    <ArrowRight
                      className="w-4 h-4 text-blue-400 group-hover:translate-x-1 transition-transform flex-shrink-0"
                      aria-hidden="true"
                    />
                  </Link>
                )}
              </div>

            </div>
          </CardContent>

          <CardFooter className="flex justify-center gap-4 bg-muted/30 p-6 border-t">
            <Button
              variant="outline"
              size="lg"
              onClick={handleReset}
              disabled={isLoading}
              className="min-w-[120px]"
              aria-label="Clear all text"
            >
              <Trash2 className="mr-2 h-4 w-4" aria-hidden="true" /> Clear
            </Button>
            <Button
              size="lg"
              onClick={handleSubmit}
              disabled={isLoading || !inputText || isOverLimit}
              className="min-w-[180px]"
              aria-label="Paraphrase the input text"
            >
              <Wand2 className="mr-2 h-4 w-4" aria-hidden="true" />
              {isLoading ? "Paraphrasing..." : "Paraphrase Now"}
            </Button>
          </CardFooter>
        </Card>

        {/* ── FEATURES GRID ── */}
        <section className="max-w-5xl mx-auto mt-20" aria-label="Key Features">
          <h2 className="text-3xl font-bold text-center mb-10">
            Why Use Our Free Online Paraphrasing Tool?
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <ShieldCheck className="text-green-500 h-6 w-6" aria-hidden="true" />,
                title: "Plagiarism Remover",
                desc: "Our AI Text Rewriter completely restructures sentences to help you create unique content — perfect for academic essays and SEO articles.",
              },
              {
                icon: <Zap className="text-blue-500 h-6 w-6" aria-hidden="true" />,
                title: "Fast Article Spinner",
                desc: "Spin text in seconds. Maintains the original meaning while completely changing the words and sentence structure.",
              },
              {
                icon: <Globe className="text-purple-500 h-6 w-6" aria-hidden="true" />,
                title: "Unlimited & Free",
                desc: "No login required, no word limits, no daily caps. Paraphrase as much as you want — completely free, forever.",
              },
            ].map((item) => (
              <Card
                key={item.title}
                className="bg-card border-none shadow-md hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    {item.icon} {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* ── SEO + GEO + AEO CONTENT ── */}
        <section className="max-w-4xl mx-auto my-20 space-y-14 text-muted-foreground leading-relaxed">

          {/* What Is This Tool */}
          <article>
            <h2 className="text-3xl font-bold text-foreground mb-5">
              Free AI Text to Human Text Converter &amp; Paraphraser
            </h2>
            <p className="mb-4">
              In the era of ChatGPT, finding a reliable <strong>paraphrasing tool</strong> that
              sounds natural is difficult. Most standard article spinners just replace words with
              awkward synonyms. <strong>TaskGuru&apos;s AI Text Humanizer</strong> understands
              context before rewriting — producing content that sounds 100% human.
            </p>
            <p>
              Whether you want to <strong>convert AI text to human text</strong>, rewrite an essay,
              or rephrase a blog post, our tool delivers high-quality output. After paraphrasing,
              verify your results with our{' '}
              <Link
                href="/tools/ai-content-detector"
                className="text-primary font-bold hover:underline underline-offset-4"
              >
                free AI Content Detector
              </Link>{' '}
              to ensure your text passes AI detection.
            </p>
          </article>

          {/* Step-by-Step Guide — HowTo / AEO */}
          <article id="how-to-steps">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              How to Make AI Text Sound Human?
            </h2>
            <div className="space-y-3">
              {[
                {
                  n: "1",
                  step: "Paste your text",
                  desc: "Copy any AI-generated, robotic, or plagiarised content and paste it into the left box. Supports up to 5,000 characters.",
                },
                {
                  n: "2",
                  step: "Click Paraphrase Now",
                  desc: "Hit the button. TaskGuru's AI reads the full context — not just word-by-word — before rewriting.",
                },
                {
                  n: "3",
                  step: "Review the output",
                  desc: "Read the result. The sentence structure, flow, and vocabulary will be completely refreshed.",
                },
                {
                  n: "4",
                  step: "Copy and verify",
                  desc: "Copy the result and run it through our AI Content Detector to confirm it reads as human-written before publishing.",
                },
              ].map((item) => (
                <div
                  key={item.n}
                  className="flex gap-4 p-4 bg-secondary/20 border border-border rounded-xl"
                >
                  <span className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0 text-sm">
                    {item.n}
                  </span>
                  <div>
                    <p className="font-bold text-foreground text-sm">{item.step}</p>
                    <p className="text-sm mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </article>

          {/* How the AI Works */}
          <article>
            <h2 className="text-2xl font-bold text-foreground mb-5">
              How Does the AI Paraphraser Work?
            </h2>
            <div className="space-y-3">
              {[
                {
                  title: "Context Analysis",
                  desc: "The tool reads your AI-generated text to grasp the core meaning before rewriting — not just scanning word by word.",
                },
                {
                  title: "Natural Rephrasing",
                  desc: "Acts as a smart text rewriter — breaks down robotic patterns and introduces conversational structures that feel human.",
                },
                {
                  title: "Smart Vocabulary",
                  desc: "Finds the best contextual synonyms rather than complex, unnatural word swaps that confuse readers.",
                },
                {
                  title: "Final Polish",
                  desc: "Produces content ready for publication or academic submission that flows naturally from sentence to sentence.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex gap-3 p-4 bg-secondary/20 border border-border rounded-xl"
                >
                  <CheckCircle
                    className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <div>
                    <span className="font-bold text-foreground">{item.title}: </span>
                    <span className="text-sm">{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </article>

          {/* Who Should Use This */}
          <article>
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              Who Needs an AI Paraphraser?
            </h2>
            <div className="grid md:grid-cols-2 gap-5">
              {[
                {
                  icon: <UserCheck className="h-6 w-6 text-primary" aria-hidden="true" />,
                  title: "Students (Essay Rewriter)",
                  desc: "Rephrase research papers and ensure your text sounds like it was written by a real student, not an AI. Great for B.Tech, MBA, and university assignments.",
                },
                {
                  icon: <PenTool className="h-6 w-6 text-primary" aria-hidden="true" />,
                  title: "Bloggers & Creators",
                  desc: "Convert AI text to human text to bypass generic tones. Create engaging, readable blog posts that connect with your audience.",
                },
                {
                  icon: <Zap className="h-6 w-6 text-primary" aria-hidden="true" />,
                  title: "Freelance Writers",
                  desc: "Save time on rewriting and editing. Use our AI humanizer to quickly refine drafts and increase your daily writing productivity.",
                },
                {
                  icon: <Globe className="h-6 w-6 text-primary" aria-hidden="true" />,
                  title: "Digital Marketers",
                  desc: "Transform stiff AI marketing text into persuasive, conversational copy that drives clicks and conversions.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="bg-secondary/20 p-5 rounded-xl border border-border"
                >
                  <div className="flex items-center gap-3 mb-2">
                    {item.icon}
                    <h3 className="font-bold text-foreground">{item.title}</h3>
                  </div>
                  <p className="text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </article>

          {/* Comparison Table */}
          <article className="bg-muted/30 p-7 rounded-xl border border-border">
            <h2 className="text-2xl font-bold text-foreground mb-5 flex items-center gap-2">
              <BookOpen className="text-primary h-6 w-6" aria-hidden="true" />
              Paraphrasing vs. Summarizing vs. Quoting
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 pr-4 font-bold text-foreground">Method</th>
                    <th className="text-left py-3 pr-4 font-bold text-foreground">Output Length</th>
                    <th className="text-left py-3 pr-4 font-bold text-foreground">Meaning Preserved?</th>
                    <th className="text-left py-3 font-bold text-foreground">Best For</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      method: "Paraphrasing ✅",
                      length: "Same as original",
                      meaning: "Yes",
                      best: "Essays, blogs, unique content",
                    },
                    {
                      method: "Summarizing",
                      length: "Shorter (50–70%)",
                      meaning: "Main ideas only",
                      best: "Reports, notes, overviews",
                    },
                    {
                      method: "Quoting",
                      length: "Exact copy",
                      meaning: "Word-for-word",
                      best: "Academic citations, references",
                    },
                    {
                      method: "Spinning (cheap)",
                      length: "Same",
                      meaning: "Often distorted",
                      best: "Not recommended for quality",
                    },
                  ].map((row) => (
                    <tr key={row.method} className="border-b border-border/50 last:border-0">
                      <td className="py-3 pr-4 font-medium text-foreground">{row.method}</td>
                      <td className="py-3 pr-4">{row.length}</td>
                      <td className="py-3 pr-4">{row.meaning}</td>
                      <td className="py-3">{row.best}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs mt-4 text-muted-foreground">
              TaskGuru specializes in paraphrasing — the only method that creates fully unique
              content at the same depth as the original.
            </p>
          </article>

          {/* Common Mistakes — AEO Warning format */}
          <article>
            <h2 className="text-2xl font-bold text-foreground mb-5 flex items-center gap-2">
              <AlertTriangle className="text-yellow-500 h-5 w-5" aria-hidden="true" />
              Common Mistakes to Avoid
            </h2>
            <div className="space-y-3">
              {[
                {
                  mistake: "Paraphrasing without reviewing",
                  fix: "Always read the output before using it. AI can occasionally miss nuance or change the meaning of a technical term.",
                },
                {
                  mistake: "Using spinners instead of humanizers",
                  fix: "Cheap word-swap spinners produce unreadable text. TaskGuru rewrites at the sentence level — the result actually makes sense.",
                },
                {
                  mistake: "Ignoring proper nouns and data",
                  fix: "Numbers, names, dates, and statistics can shift during paraphrasing. Always verify specific facts in the output.",
                },
                {
                  mistake: "Paraphrasing entire long documents at once",
                  fix: "For best results, process long content in 500–800 word sections so the AI maintains full context focus.",
                },
                {
                  mistake: "Skipping the AI detection check",
                  fix: "After paraphrasing, run the result through our AI Content Detector before submitting or publishing.",
                },
              ].map((item) => (
                <div
                  key={item.mistake}
                  className="flex gap-3 p-4 bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-800/50 rounded-xl text-sm"
                >
                  <AlertTriangle
                    className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="font-bold text-foreground">❌ {item.mistake}</p>
                    <p className="mt-0.5 text-muted-foreground">✅ {item.fix}</p>
                  </div>
                </div>
              ))}
            </div>
          </article>

          {/* SEO Impact */}
          <article>
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Search className="text-primary h-6 w-6" aria-hidden="true" />
              Does AI Paraphrasing Affect SEO?
            </h2>
            <p className="mb-3">
              Used correctly, AI paraphrasing <strong>improves SEO</strong>. Google values unique,
              helpful, and natural content. TaskGuru creates human-quality text that improves
              readability scores and keeps readers engaged — both positive ranking signals.
            </p>
            <p>
              Avoid cheap spinners that produce unreadable keyword-stuffed output. After
              paraphrasing with TaskGuru, verify your content with our{' '}
              <Link
                href="/tools/ai-content-detector"
                className="text-primary font-bold hover:underline underline-offset-4"
              >
                AI Content Detector
              </Link>{' '}
              to ensure top quality before publishing.
            </p>
          </article>

          {/* Ethical Use */}
          <article>
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Scale className="text-primary h-6 w-6" aria-hidden="true" />
              Ethical Use of Paraphrasing Tools
            </h2>
            <div className="space-y-2">
              {[
                {
                  title: "Academic Integrity",
                  desc: "Use this tool to understand complex texts or improve sentence structure — not to bypass learning. Always cite your sources.",
                },
                {
                  title: "Copyright",
                  desc: "Use for fair use purposes like commentary, research, or news reporting. Do not rewrite and republish full copyrighted works.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex gap-3 text-sm p-3 bg-secondary/10 rounded-lg"
                >
                  <CheckCircle
                    className="w-4 h-4 text-primary flex-shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <p>
                    <strong className="text-foreground">{item.title}:</strong> {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </article>

          {/* Tips for Best Results */}
          <article>
            <h3 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Lightbulb className="text-primary h-5 w-5" aria-hidden="true" />
              Tips for Best Results
            </h3>
            <div className="space-y-3">
              {[
                {
                  n: "1",
                  tip: "Proofread Your Output",
                  desc: "Always review the final result to ensure it captures your intended meaning correctly.",
                },
                {
                  n: "2",
                  tip: "Process in Chunks",
                  desc: "For long documents, paraphrase section by section so the AI maintains better context focus.",
                },
                {
                  n: "3",
                  tip: "Check Specific Data",
                  desc: "Verify that proper nouns, dates, and figures remain accurate in the output.",
                },
                {
                  n: "4",
                  tip: "Verify with AI Detector",
                  desc: "After paraphrasing, use our AI Content Detector to confirm your text reads as human-written.",
                },
              ].map((item) => (
                <div key={item.n} className="flex gap-3 p-3 text-sm">
                  <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold flex-shrink-0 text-xs">
                    {item.n}
                  </span>
                  <p>
                    <strong className="text-foreground">{item.tip}:</strong> {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </article>

          {/* Alternatives Comparison */}
          <article>
            <h2 className="text-2xl font-bold text-foreground mb-5">
              Alternatives to TaskGuru Paraphraser
            </h2>
            <p className="mb-4 text-sm">
              There are several AI paraphrasing tools online. Here&apos;s how they compare
              to TaskGuru:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 pr-4 font-bold text-foreground">Tool</th>
                    <th className="text-left py-3 pr-4 font-bold text-foreground">Free?</th>
                    <th className="text-left py-3 pr-4 font-bold text-foreground">Login Required?</th>
                    <th className="text-left py-3 font-bold text-foreground">Human Quality</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { tool: "TaskGuru ✅", free: "Yes, unlimited", login: "No", quality: "High" },
                    { tool: "QuillBot", free: "Limited (free plan)", login: "Yes", quality: "High" },
                    { tool: "Grammarly", free: "Limited", login: "Yes", quality: "High" },
                    { tool: "Spinbot", free: "Yes", login: "No", quality: "Low (word-swap)" },
                    { tool: "Wordtune", free: "Limited", login: "Yes", quality: "High" },
                  ].map((row) => (
                    <tr key={row.tool} className="border-b border-border/50 last:border-0">
                      <td className="py-3 pr-4 font-medium text-foreground">{row.tool}</td>
                      <td className="py-3 pr-4">{row.free}</td>
                      <td className="py-3 pr-4">{row.login}</td>
                      <td className="py-3">{row.quality}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs mt-3 text-muted-foreground">
              TaskGuru is the only tool that&apos;s fully free, requires no account, and produces
              human-quality output — making it the best choice for everyday use.
            </p>
          </article>

          {/* Summary — Speakable target */}
          <article
            id="tool-summary"
            className="p-6 bg-primary/5 border border-primary/20 rounded-2xl"
          >
            <h2 className="text-xl font-bold text-foreground mb-4">Summary</h2>
            <ul className="space-y-2 text-sm">
              {[
                "TaskGuru's AI Text Paraphraser rewrites any text to sound completely natural and human.",
                "It's 100% free — no login, no word limits, no daily caps.",
                "Supports up to 5,000 characters per session (~800–1,000 words).",
                "Best used by students, bloggers, writers, and digital marketers.",
                "Always verify results with our free AI Content Detector before publishing.",
                "Works for essays, blog posts, SEO content, marketing copy, and more.",
              ].map((point) => (
                <li key={point} className="flex items-start gap-2">
                  <CheckCircle
                    className="w-4 h-4 text-primary flex-shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </article>

        </section>

        {/* ── FAQ SECTION ── */}
        <section
          className="max-w-4xl mx-auto my-20 p-8 bg-card shadow-sm rounded-xl border"
          aria-label="Frequently Asked Questions"
        >
          <h2 className="text-3xl font-bold mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {faqSchema.mainEntity.map((item, i) => (
              <details
                key={i}
                className="group bg-secondary/10 border border-border rounded-xl p-5 cursor-pointer"
              >
                <summary className="font-semibold text-foreground list-none flex justify-between items-center text-sm md:text-base">
                  {item.name}
                  <span
                    className="transition-transform group-open:rotate-180 text-muted-foreground flex-shrink-0 ml-2"
                    aria-hidden="true"
                  >
                    ▼
                  </span>
                </summary>
                <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
                  {item.acceptedAnswer.text}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* ── INTERNAL LINKS — 12 links, all verified against sitemap ── */}
        <section className="max-w-4xl mx-auto mb-20" aria-label="Explore More Free Tools">
          <h3 className="text-xl font-black text-foreground mb-5 text-center">
            Explore More Free Tools
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {internalLinks.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className={`p-4 rounded-2xl border transition-colors group text-center ${
                  tool.highlight
                    ? "bg-primary/5 border-primary/30 hover:border-primary"
                    : "bg-card border-border hover:border-primary/40"
                }`}
                aria-label={`${tool.label} — ${tool.sub}`}
              >
                <p
                  className={`font-bold text-sm mb-0.5 ${
                    tool.highlight ? "text-primary" : "text-foreground"
                  }`}
                >
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
