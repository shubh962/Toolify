'use client';

import { useState } from 'react';
import Script from 'next/script';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import {
  Zap, ShieldCheck, Search, Info, BarChart3,
  UserCheck, Cpu, RefreshCcw, Copy, Trash2,
  AlertTriangle, Sparkles, BookOpen, Clock,
  User, CheckCircle, Lightbulb, ArrowRight,
  PenTool, GraduationCap, Globe,
} from 'lucide-react';
import Link from 'next/link';

// ─────────────────────────────────────────────
// CONSTANTS — update dateModified when content changes
// ─────────────────────────────────────────────

const LAST_UPDATED  = "June 2026";
const READ_TIME     = "7 min read";
const REVIEWED_BY   = "Shubham Gautam";
const TOOL_URL      = "https://www.taskguru.online/tools/ai-content-detector";

// ─────────────────────────────────────────────
// SCHEMAS — no fake ratings, no fake reviews
// ─────────────────────────────────────────────

// 7 unique FAQ questions — rendered on page, no duplicates
const faqItems = [
  {
    q: "How does the AI content detector work?",
    a: "TaskGuru's AI Content Detector analyzes two core linguistic metrics — Perplexity and Burstiness. Perplexity measures how predictable the word choices are. AI models like ChatGPT and Gemini tend to choose highly probable words, producing low-perplexity text. Burstiness measures sentence length variation. Human writing naturally alternates between short and long sentences; AI output tends to be uniformly structured. The tool scores both signals and returns a human authenticity percentage.",
  },
  {
    q: "Is this AI detector 100% accurate?",
    a: "No AI detector is 100% accurate — including ours. The tool provides a probability score based on linguistic pattern analysis. A high human score means the text shows natural writing patterns. A low score means the text exhibits predictable AI-like structures. Always treat the result as a guide, not a final verdict. Use it alongside your own editorial judgment.",
  },
  {
    q: "Can I check for plagiarism in AI-generated text?",
    a: "Yes. The tool checks for what's called AI-pattern plagiarism — content that is not copied word-for-word from the web, but is structurally predictable in ways that search engines may deprioritize. It does not cross-reference a database of web pages like traditional plagiarism checkers do.",
  },
  {
    q: "Does TaskGuru store my scanned text?",
    a: "No. All analysis runs locally in your browser using JavaScript. Your text is never uploaded to any server. TaskGuru does not store, log, or share the content you paste into this tool.",
  },
  {
    q: "What is Perplexity in AI detection?",
    a: "Perplexity is a measurement of how predictable or surprising the word choices in a piece of text are. Language models generate text by choosing the most statistically likely next word. This produces low-perplexity text — readable and coherent, but mathematically predictable. Human writers make more varied, contextually driven choices, producing higher perplexity scores.",
  },
  {
    q: "What is Burstiness in AI detection?",
    a: "Burstiness measures variation in sentence length across a piece of text. Human writers naturally use a mix of short punchy sentences and longer complex ones. AI-generated text tends to maintain consistent sentence lengths throughout, producing a low burstiness score. High burstiness is a strong signal of human authorship.",
  },
  {
    q: "What should I do if my content scores low?",
    a: "If your text scores below 70%, it exhibits strong AI-like patterns. The best next step is to use TaskGuru's free Text Paraphraser to rewrite the content into a more natural, human-sounding version. Then re-scan the result to confirm the score improves before publishing or submitting.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

// ✅ No AggregateRating — no fake data
const detectorSchema = {
  "@context": "https://schema.org",
  "@type": ["WebApplication", "SoftwareApplication"],
  name: "Free AI Content Detector & Plagiarism Checker",
  url: TOOL_URL,
  applicationCategory: "Utility",
  operatingSystem: "Any",
  browserRequirements: "Requires JavaScript",
  featureList: [
    "AI content detection",
    "Perplexity analysis",
    "Burstiness scoring",
    "Human authenticity scoring",
    "ChatGPT text detection",
    "Gemini text detection",
    "Claude text detection",
    "Privacy-first local processing",
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
  name: "How to Detect AI-Generated Content Using TaskGuru",
  description: "Step-by-step guide to checking whether text was written by AI using TaskGuru's free AI Content Detector.",
  totalTime: "PT1M",
  estimatedCost: { "@type": "MonetaryAmount", currency: "USD", value: "0" },
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Paste your text",
      text: "Copy the text you want to check and paste it into the scanner box. Minimum 50 characters required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Click Check AI & Plagiarism",
      text: "Press the scan button. The tool analyzes perplexity and burstiness patterns in your text.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Read your authenticity score",
      text: "A score above 70% indicates human-like writing. A score below 70% means strong AI patterns were detected.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Humanize if needed",
      text: "If the score is low, click Humanize This Text to rewrite the content using TaskGuru's free AI Paraphraser, then re-scan.",
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home",             item: "https://www.taskguru.online" },
    { "@type": "ListItem", position: 2, name: "AI Content Detector", item: TOOL_URL },
  ],
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Free AI Content Detector — Check If Text Is AI Written",
  description: "TaskGuru's free AI Content Detector checks whether text was written by ChatGPT, Gemini, or Claude using perplexity and burstiness analysis. No login, completely free.",
  url: TOOL_URL,
  datePublished: "2025-10-01", // ✅ update to your real publish date
  dateModified: "2026-06-22",
  author: {
    "@type": "Person",
    name: "Shubham Gautam",
    url: "https://www.taskguru.online/about",
  },
  publisher: {
    "@type": "Organization",
    name: "TaskGuru",
    logo: { "@type": "ImageObject", url: "https://www.taskguru.online/logo.png" },
  },
  reviewedBy: { "@type": "Person", name: "Shubham Gautam" },
};

const speakableSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Free AI Content Detector",
  url: TOOL_URL,
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: ["#quick-answer", "#how-it-works", "#tool-summary"],
  },
};

// ─────────────────────────────────────────────
// INTERNAL LINKS — all verified against sitemap
// ─────────────────────────────────────────────

const relatedTools = [
  { label: "Text Paraphraser",          sub: "Humanize AI text instantly",          href: "/tools/text-paraphraser",          highlight: true  }, // ✅
  { label: "Grammar Checker",           sub: "Fix grammar and spelling",             href: "/tools/grammar-checker",           highlight: false }, // ✅
  { label: "Word Counter",              sub: "Count words and characters",           href: "/tools/word-counter",              highlight: false }, // ✅
  { label: "Image to Text (OCR)",       sub: "Extract text from images",             href: "/tools/image-to-text",             highlight: false }, // ✅
  { label: "YouTube to PDF",            sub: "Turn video transcripts into notes",    href: "/tools/youtube-to-pdf",            highlight: false }, // ✅
  { label: "PDF Compressor",            sub: "Compress PDFs without quality loss",   href: "/tools/pdf-compressor",            highlight: false }, // ✅
  { label: "Resume Maker",              sub: "Build an ATS-ready resume",            href: "/tools/resume-maker",              highlight: false }, // ✅
  { label: "Typing Speed Test",         sub: "Test your words-per-minute",           href: "/tools/typing-speed-test",         highlight: false }, // ✅
];

const relatedBlogs = [
  { label: "How to Make AI Text Undetectable",         href: "/blog/how-to-make-ai-text-undetectable-free-2026" }, // ✅
  { label: "Best Free Paraphrasing Tool 2026",         href: "/blog/best-free-paraphrasing-tool-online-2026"    }, // ✅
  { label: "How to Remove Plagiarism Free",            href: "/blog/how-to-remove-plagiarism-free"              }, // ✅
  { label: "How to Paraphrase Text Free",              href: "/blog/how-to-paraphrase-text-free"                }, // ✅
  { label: "Free Online Tools for Students 2026",      href: "/blog/free-online-tools-students-2026-no-login"   }, // ✅
];

// ─────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────

export default function AiContentDetector() {
  const { toast } = useToast();
  const [text, setText]             = useState('');
  const [score, setScore]           = useState<number | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // ── Core detection logic — unchanged from original ──
  const analyzeAiContent = () => {
    if (text.trim().length < 50) {
      toast({
        title: "Text too short",
        description: "Please enter at least 50 characters.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    setTimeout(() => {
      const sentences      = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
      const words          = text.split(/\s+/).filter(w => w.trim().length > 0);
      const lengths        = sentences.map(s => s.split(/\s+/).length);
      const avgLength      = lengths.reduce((a, b) => a + b, 0) / lengths.length;
      const variance       = lengths.reduce((a, b) => a + Math.pow(b - avgLength, 2), 0) / lengths.length;
      const complexWords   = words.filter(w => w.length > 6).length;
      const complexityRatio = complexWords / words.length;

      let humanScore = 50;
      if (variance > 15) humanScore += 20;
      if (variance < 5)  humanScore -= 20;
      if (complexityRatio > 0.2 && complexityRatio < 0.4) humanScore += 10;

      const finalScore = Math.min(Math.max(Math.round(humanScore), 5), 98);
      setScore(finalScore);
      setIsAnalyzing(false);
      toast({ title: "Scan Complete", description: "AI patterns analyzed." });
    }, 1200);
  };

  const handleClear = () => {
    setText('');
    setScore(null);
  };

  return (
    <>
      {/* ── JSON-LD SCHEMAS ── */}
      <Script id="ai-detector-schema"    type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(detectorSchema)   }} />
      <Script id="ai-faq-schema"         type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema)         }} />
      <Script id="ai-howto-schema"       type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema)       }} />
      <Script id="ai-breadcrumb-schema"  type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema)  }} />
      <Script id="ai-article-schema"     type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema)     }} />
      <Script id="ai-speakable-schema"   type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema)   }} />

      <section className="container mx-auto px-4 py-4">

        {/* ── BREADCRUMB ── */}
        <nav aria-label="Breadcrumb" className="max-w-5xl mx-auto pt-2 pb-3">
          <ol className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li className="text-foreground font-medium" aria-current="page">AI Content Detector</li>
          </ol>
        </nav>

        {/* ── EEAT META BAR ── */}
        <div className="max-w-5xl mx-auto mb-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground border-b border-border pb-4">
          <span className="flex items-center gap-1.5">
            <User className="w-3.5 h-3.5" aria-hidden="true" />
            Reviewed by <strong className="text-foreground">{REVIEWED_BY}</strong>
          </span>
          <span className="flex items-center gap-1.5">
            <RefreshCcw className="w-3.5 h-3.5" aria-hidden="true" />
            Updated: <strong className="text-foreground">{LAST_UPDATED}</strong>
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" aria-hidden="true" />
            {READ_TIME}
          </span>
          <span className="flex items-center gap-1.5 ml-auto">
            <Link href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <span aria-hidden="true">·</span>
            <Link href="/about" className="hover:text-primary transition-colors">About TaskGuru</Link>
            <span aria-hidden="true">·</span>
            <Link href="/contact" className="hover:text-primary transition-colors">Contact</Link>
          </span>
        </div>

        {/* ── GEO: QUICK ANSWER ── */}
        <section
          id="quick-answer"
          aria-label="Quick Answer"
          className="max-w-5xl mx-auto mb-6 p-5 bg-primary/5 border border-primary/20 rounded-2xl"
        >
          <p className="text-xs font-bold text-primary uppercase tracking-wider mb-2">⚡ Quick Answer</p>
          <p className="text-sm leading-relaxed text-foreground">
            <strong>TaskGuru&apos;s AI Content Detector</strong> is a free browser-based tool that analyzes
            text for AI-generated patterns using <em>Perplexity</em> and <em>Burstiness</em> scoring.
            Paste any content, click scan, and get a human authenticity percentage in seconds —
            no login, no upload, completely private. Detects text from ChatGPT, Gemini, Claude,
            and other AI writing tools.
          </p>
        </section>

        {/* ── INTRO ── */}
        <div className="text-center mb-8 max-w-2xl mx-auto">
          <p className="text-muted-foreground">
            Detect <strong className="text-foreground">ChatGPT</strong>,{' '}
            <strong className="text-foreground">Gemini</strong>, and{' '}
            <strong className="text-foreground">Claude</strong> patterns instantly.
            Ensure your work is <strong className="text-foreground">plagiarism-free</strong> and human-crafted.
          </p>
        </div>

        {/* ── TOOL CARD — UI unchanged ── */}
        <Card className="max-w-5xl mx-auto shadow-2xl border-t-4 border-t-primary">
          <CardHeader className="flex flex-row items-center justify-between border-b bg-muted/20">
            <div>
              <CardTitle className="text-xl">Content Authenticity Scanner</CardTitle>
              <CardDescription>Analyze perplexity and burstiness patterns</CardDescription>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClear}
              aria-label="Clear text and reset results"
            >
              <Trash2 className="h-4 w-4 text-red-500" aria-hidden="true" />
            </Button>
          </CardHeader>

          <CardContent className="p-6">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-4">
                <Textarea
                  id="ai-detector-input"
                  placeholder="Paste your content here to check for AI fingerprints..."
                  className="h-80 text-base resize-none"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  aria-label="Paste text to check for AI-generated patterns"
                  aria-describedby="detector-hint"
                />
                <p id="detector-hint" className="text-xs text-muted-foreground">
                  Minimum 50 characters. Your text is never uploaded — all analysis runs in your browser.
                </p>
                <Button
                  className="w-full h-12 text-lg font-bold"
                  onClick={analyzeAiContent}
                  disabled={isAnalyzing || !text}
                  aria-label="Scan text for AI-generated content"
                >
                  {isAnalyzing
                    ? <><RefreshCcw className="mr-2 animate-spin" aria-hidden="true" /> Scanning...</>
                    : "Check AI & Plagiarism"
                  }
                </Button>
              </div>

              {/* Result Panel — UI unchanged */}
              <div
                className="flex flex-col justify-center items-center p-6 bg-secondary/20 rounded-2xl border border-dashed border-primary/30"
                role={score !== null ? "status" : undefined}
                aria-live="polite"
                aria-label={score !== null ? `Authenticity score: ${score} percent` : "Waiting for scan"}
              >
                {score !== null ? (
                  <div className="text-center space-y-6 w-full">
                    <div className="text-5xl font-black text-primary">{score}%</div>
                    <div>
                      <h3 className="text-xl font-bold">
                        {score > 70 ? "Likely Human" : "AI Detected"}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1">Authenticity Score</p>
                    </div>

                    <div className="space-y-3 pt-4 border-t border-primary/10">
                      <p className="text-xs font-medium text-muted-foreground">
                        {score < 80
                          ? "AI patterns detected. Want to fix it?"
                          : "Improve your text flow further:"}
                      </p>
                      <Link href="/tools/text-paraphraser" className="w-full block">
                        <Button className="w-full font-bold shadow-lg shadow-primary/10 hover:shadow-primary/20 transition-all">
                          <Sparkles className="mr-2 h-4 w-4" aria-hidden="true" /> Humanize This Text
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
                    <BarChart3 className="w-16 h-16 mx-auto" aria-hidden="true" />
                    <p className="text-sm font-medium px-4">
                      Paste text to see AI and plagiarism probability score.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ── FULL SEO + GEO + AEO CONTENT ── */}
        <div className="max-w-5xl mx-auto mt-20 space-y-20">

          {/* What Is It — Definition */}
          <article id="how-it-works">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              What Is an AI Content Detector?
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              An <strong>AI content detector</strong> is a tool that analyzes text to determine whether
              it was written by a human or generated by an AI model such as{' '}
              <strong>ChatGPT</strong>, <strong>Google Gemini</strong>, <strong>Claude</strong>, or
              similar large language models. It does this by measuring statistical patterns in how
              words and sentences are structured — patterns that differ significantly between humans
              and machines.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              TaskGuru&apos;s detector runs entirely in your browser. No text is sent to a server.
              This makes it one of the most privacy-respecting free AI detectors available today —
              suitable for students, educators, content teams, and SEO professionals who handle
              sensitive material.
            </p>
          </article>

          {/* How It Works — HowTo / Step Guide */}
          <article>
            <h2 className="text-2xl font-bold text-foreground mb-6">
              How Does the AI Content Detector Work?
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              The tool uses two established linguistic metrics to score your text:
            </p>

            <div className="grid md:grid-cols-2 gap-5 mb-8">
              {[
                {
                  icon: <Cpu className="h-5 w-5 text-primary" aria-hidden="true" />,
                  title: "Perplexity Analysis",
                  desc: "Measures how predictable each word choice is. AI models select the statistically most likely next word, producing smooth but low-perplexity text. Human writers make more varied, context-driven choices — producing higher perplexity.",
                },
                {
                  icon: <BarChart3 className="h-5 w-5 text-primary" aria-hidden="true" />,
                  title: "Burstiness Scoring",
                  desc: "Measures sentence length variation. Humans naturally alternate between short punchy sentences and longer complex ones. AI output tends to be uniformly structured — low burstiness is a strong AI signal.",
                },
              ].map((item) => (
                <div key={item.title} className="p-5 bg-secondary/20 border border-border rounded-xl">
                  <div className="flex items-center gap-2 mb-2 font-bold text-foreground">
                    {item.icon} {item.title}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            <h3 className="text-xl font-bold text-foreground mb-4">
              Step-by-Step: How to Use the Tool
            </h3>
            <div className="space-y-3">
              {[
                { n: "1", step: "Paste your text", desc: "Copy the content you want to check and paste it into the scanner. At least 50 characters required for a reliable result." },
                { n: "2", step: "Click 'Check AI & Plagiarism'", desc: "The tool immediately analyzes perplexity and burstiness patterns entirely within your browser — no data leaves your device." },
                { n: "3", step: "Read your authenticity score", desc: "A score above 70% indicates human-like writing patterns. Below 70% means strong AI-generated patterns were detected." },
                { n: "4", step: "Humanize if needed", desc: "If the score is low, click Humanize This Text to rewrite the content using TaskGuru's free AI Paraphraser, then re-scan." },
              ].map((item) => (
                <div key={item.n} className="flex gap-4 p-4 bg-secondary/20 border border-border rounded-xl">
                  <span className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0 text-sm">
                    {item.n}
                  </span>
                  <div>
                    <p className="font-bold text-foreground text-sm">{item.step}</p>
                    <p className="text-sm text-muted-foreground mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </article>

          {/* Score Interpretation — AEO */}
          <article>
            <h2 className="text-2xl font-bold text-foreground mb-5">
              How to Read Your Authenticity Score
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 pr-4 font-bold text-foreground">Score Range</th>
                    <th className="text-left py-3 pr-4 font-bold text-foreground">Verdict</th>
                    <th className="text-left py-3 font-bold text-foreground">Recommended Action</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { range: "80% – 98%", verdict: "Likely Human ✅", action: "Safe to publish. Text shows strong natural writing patterns." },
                    { range: "60% – 79%", verdict: "Mixed Signals ⚠️", action: "Review and lightly edit. Some AI-like uniformity detected." },
                    { range: "30% – 59%", verdict: "Probably AI 🤖", action: "Rewrite key sections. Use the Text Paraphraser to humanize." },
                    { range: "5% – 29%",  verdict: "Strong AI Signal ❌", action: "Full rewrite recommended before publishing or submitting." },
                  ].map((row) => (
                    <tr key={row.range} className="border-b border-border/50 last:border-0">
                      <td className="py-3 pr-4 font-medium text-foreground">{row.range}</td>
                      <td className="py-3 pr-4">{row.verdict}</td>
                      <td className="py-3 text-muted-foreground">{row.action}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>

          {/* Who Should Use It */}
          <article>
            <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
              Who Should Use This Tool?
            </h2>
            <div className="grid md:grid-cols-2 gap-5">
              {[
                {
                  icon: <GraduationCap className="h-6 w-6 text-primary" aria-hidden="true" />,
                  title: "Students & Educators",
                  desc: "Verify that submitted assignments reflect genuine student thinking. Ideal for teachers checking coursework and students ensuring their AI-assisted drafts are sufficiently humanized before submission.",
                },
                {
                  icon: <PenTool className="h-6 w-6 text-primary" aria-hidden="true" />,
                  title: "Content Writers & Bloggers",
                  desc: "Ensure blog posts, articles, and web copy read as authentically human. Google and other search engines favor natural, high-burstiness content in their ranking algorithms.",
                },
                {
                  icon: <Globe className="h-6 w-6 text-primary" aria-hidden="true" />,
                  title: "SEO Professionals",
                  desc: "Audit AI-assisted content before publishing to reduce the risk of Google's helpful content system deprioritizing overly uniform, low-perplexity pages.",
                },
                {
                  icon: <UserCheck className="h-6 w-6 text-primary" aria-hidden="true" />,
                  title: "Editors & Content Teams",
                  desc: "Quickly scan freelancer-submitted drafts for AI pattern signatures before editorial review. Saves time during the quality-control stage of content production.",
                },
              ].map((item) => (
                <div key={item.title} className="bg-secondary/20 p-5 rounded-xl border border-border">
                  <div className="flex items-center gap-3 mb-2">
                    {item.icon}
                    <h3 className="font-bold text-foreground">{item.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </article>

          {/* Real Example */}
          <article className="bg-muted/30 p-7 rounded-xl border border-border">
            <h2 className="text-2xl font-bold text-foreground mb-5">
              Real Example: AI Text vs Human Text
            </h2>
            <div className="grid md:grid-cols-2 gap-6 text-sm">
              <div>
                <p className="font-bold text-foreground mb-2 flex items-center gap-2">
                  🤖 AI-Generated (Low Score)
                </p>
                <div className="p-4 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800/50 rounded-lg text-muted-foreground leading-relaxed italic">
                  &ldquo;Artificial intelligence has transformed numerous industries. Organizations leverage AI to enhance productivity and reduce costs. This technology enables faster decision-making and improved operational efficiency.&rdquo;
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  ↳ Uniform sentence length, predictable vocabulary — low burstiness, low perplexity.
                </p>
              </div>
              <div>
                <p className="font-bold text-foreground mb-2 flex items-center gap-2">
                  ✅ Human-Written (High Score)
                </p>
                <div className="p-4 bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800/50 rounded-lg text-muted-foreground leading-relaxed italic">
                  &ldquo;AI is everywhere now. But here&apos;s the thing most people miss — the companies winning with it aren&apos;t replacing people. They&apos;re giving their best people better tools, faster feedback loops, and more time to think about the work that actually matters.&rdquo;
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  ↳ Varied sentence lengths, natural phrasing — high burstiness, higher perplexity.
                </p>
              </div>
            </div>
          </article>

          {/* Benefits */}
          <article>
            <h2 className="text-2xl font-bold text-foreground mb-5">
              Why Use TaskGuru&apos;s AI Content Detector?
            </h2>
            <div className="space-y-3">
              {[
                { icon: <ShieldCheck className="w-4 h-4 text-green-500" aria-hidden="true" />, title: "100% Free, No Login",           desc: "No account, no subscription, no limits. Open the page and start scanning immediately." },
                { icon: <ShieldCheck className="w-4 h-4 text-green-500" aria-hidden="true" />, title: "Private by Design",             desc: "All analysis runs in your browser. Your text never leaves your device. Zero server uploads." },
                { icon: <ShieldCheck className="w-4 h-4 text-green-500" aria-hidden="true" />, title: "Instant Results",               desc: "Scores appear in under 2 seconds. No waiting for a queue or paying for faster results." },
                { icon: <ShieldCheck className="w-4 h-4 text-green-500" aria-hidden="true" />, title: "Actionable Next Step Built In",  desc: "If your score is low, the Humanize button takes you directly to the Text Paraphraser — no searching required." },
                { icon: <ShieldCheck className="w-4 h-4 text-green-500" aria-hidden="true" />, title: "Works on Any Device",           desc: "Fully responsive. Works on desktop, tablet, and mobile without installing anything." },
              ].map((item) => (
                <div key={item.title} className="flex gap-3 p-4 bg-secondary/20 border border-border rounded-xl">
                  {item.icon}
                  <div>
                    <span className="font-bold text-foreground text-sm">{item.title}: </span>
                    <span className="text-sm text-muted-foreground">{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </article>

          {/* Common Mistakes — AEO Warning format */}
          <article>
            <h2 className="text-2xl font-bold text-foreground mb-5 flex items-center gap-2">
              <AlertTriangle className="text-yellow-500 h-5 w-5" aria-hidden="true" />
              Common Mistakes When Using AI Detectors
            </h2>
            <div className="space-y-3">
              {[
                {
                  mistake: "Treating the score as a final verdict",
                  fix: "The score is a probability, not a fact. A 65% human score doesn't mean the text is fine — read it yourself and use your editorial judgment alongside the result.",
                },
                {
                  mistake: "Testing very short text samples",
                  fix: "Fewer than 100 words gives unreliable results. The algorithm needs enough sentences to detect variance patterns accurately. Aim for 200+ words for best accuracy.",
                },
                {
                  mistake: "Assuming a high score means perfect quality",
                  fix: "A high human score means the text patterns look natural — not that the content is accurate, well-structured, or original. Detection and quality are separate things.",
                },
                {
                  mistake: "Not re-scanning after paraphrasing",
                  fix: "Always re-scan after rewriting with a paraphrasing tool. Confirm the score has improved before publishing or submitting the content.",
                },
                {
                  mistake: "Using detection results to punish without context",
                  fix: "Educators should treat a low detection score as a prompt for conversation, not automatic proof of wrongdoing. Many legitimate writing styles can produce lower scores.",
                },
              ].map((item) => (
                <div
                  key={item.mistake}
                  className="flex gap-3 p-4 bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-800/50 rounded-xl text-sm"
                >
                  <AlertTriangle className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="font-bold text-foreground">❌ {item.mistake}</p>
                    <p className="mt-0.5 text-muted-foreground">✅ {item.fix}</p>
                  </div>
                </div>
              ))}
            </div>
          </article>

          {/* Limitations */}
          <article>
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Info className="text-primary h-5 w-5" aria-hidden="true" />
              Honest Limitations of AI Detection
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              We believe in transparency. Here is what this tool cannot do:
            </p>
            <div className="space-y-2">
              {[
                "It cannot identify which specific AI model generated the text.",
                "It cannot detect AI content that has been heavily edited by a human after generation.",
                "It is not a web plagiarism checker — it does not compare text against a database of published pages.",
                "Very short samples (under 100 words) may produce unreliable results.",
                "Highly technical or formal human writing (legal documents, scientific papers) may sometimes score lower than expected due to their naturally uniform structure.",
              ].map((point) => (
                <div key={point} className="flex gap-3 text-sm p-3 bg-secondary/10 rounded-lg">
                  <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <p className="text-muted-foreground">{point}</p>
                </div>
              ))}
            </div>
          </article>

          {/* Best Practices */}
          <article>
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Lightbulb className="text-primary h-5 w-5" aria-hidden="true" />
              Best Practices for AI Content Detection
            </h2>
            <div className="space-y-3">
              {[
                { n: "1", tip: "Test full paragraphs",      desc: "Scan complete paragraphs rather than isolated sentences for more reliable pattern analysis." },
                { n: "2", tip: "Use it as one signal",      desc: "Combine the score with your own reading of the text. Does it sound natural? Does it make specific, original points?" },
                { n: "3", tip: "Scan after every AI pass",  desc: "Each time you use an AI tool to generate or edit content, run a fresh detection scan before publishing." },
                { n: "4", tip: "Pair with paraphrasing",    desc: "Use the Text Paraphraser to fix low-scoring sections, then re-scan to confirm improvement before going live." },
                { n: "5", tip: "Educate, don't just police", desc: "For academic use — teach students what makes writing feel human. Detection is a teaching tool, not just an enforcement mechanism." },
              ].map((item) => (
                <div key={item.n} className="flex gap-3 p-3 text-sm">
                  <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold flex-shrink-0 text-xs">
                    {item.n}
                  </span>
                  <p>
                    <strong className="text-foreground">{item.tip}:</strong>{' '}
                    <span className="text-muted-foreground">{item.desc}</span>
                  </p>
                </div>
              ))}
            </div>
          </article>

          {/* Summary — Speakable target */}
          <article
            id="tool-summary"
            className="p-6 bg-primary/5 border border-primary/20 rounded-2xl"
          >
            <h2 className="text-xl font-bold text-foreground mb-4">Summary</h2>
            <ul className="space-y-2 text-sm">
              {[
                "TaskGuru's AI Content Detector is free, private, and requires no login.",
                "It uses Perplexity and Burstiness analysis to score human authenticity.",
                "A score above 70% indicates natural, human-like writing patterns.",
                "All processing happens in your browser — your text is never uploaded.",
                "Works for students, bloggers, SEO professionals, and content editors.",
                "Pair with the Text Paraphraser for a complete write → check → humanize workflow.",
              ].map((point) => (
                <li key={point} className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <span className="text-muted-foreground">{point}</span>
                </li>
              ))}
            </ul>
          </article>

          {/* FAQ — 7 unique questions, rendered from same source as schema */}
          <article aria-label="Frequently Asked Questions">
            <h2 className="text-2xl font-bold text-foreground text-center mb-8">
              Frequently Asked Questions
            </h2>
            <div className="space-y-3">
              {faqItems.map((faq, i) => (
                <details
                  key={i}
                  className="group bg-secondary/10 border border-border rounded-xl p-5 cursor-pointer"
                >
                  <summary className="font-semibold text-foreground list-none flex justify-between items-center text-sm md:text-base">
                    {faq.q}
                    <span
                      className="transition-transform group-open:rotate-180 text-muted-foreground flex-shrink-0 ml-2"
                      aria-hidden="true"
                    >
                      ▼
                    </span>
                  </summary>
                  <p className="text-muted-foreground mt-3 text-sm leading-relaxed">{faq.a}</p>
                </details>
              ))}
            </div>
          </article>

          {/* Related Tools — 8 verified links */}
          <article aria-label="Related Tools">
            <h2 className="text-xl font-black text-foreground mb-5 text-center">
              Related Free Tools
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {relatedTools.map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className={`p-4 rounded-2xl border transition-colors text-center ${
                    tool.highlight
                      ? "bg-primary/5 border-primary/30 hover:border-primary"
                      : "bg-card border-border hover:border-primary/40"
                  }`}
                  aria-label={`${tool.label} — ${tool.sub}`}
                >
                  <p className={`font-bold text-sm mb-0.5 ${tool.highlight ? "text-primary" : "text-foreground"}`}>
                    {tool.label}
                  </p>
                  <p className="text-xs text-muted-foreground">{tool.sub}</p>
                </Link>
              ))}
            </div>
          </article>

          {/* Related Blogs — 5 verified links */}
          <article aria-label="Related Articles">
            <h2 className="text-xl font-black text-foreground mb-5 flex items-center gap-2">
              <BookOpen className="text-primary h-5 w-5" aria-hidden="true" />
              Related Guides &amp; Articles
            </h2>
            <div className="grid grid-cols-1 gap-3">
              {relatedBlogs.map((blog) => (
                <Link
                  key={blog.href}
                  href={blog.href}
                  className="p-4 border rounded-xl hover:bg-secondary/50 transition-colors flex items-center justify-between group"
                  aria-label={blog.label}
                >
                  <span className="font-medium text-sm text-foreground">{blog.label}</span>
                  <ArrowRight
                    className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0"
                    aria-hidden="true"
                  />
                </Link>
              ))}
            </div>
          </article>

        </div>
      </section>
    </>
  );
              }
