"use client";

import { useState, useCallback } from "react";
import Script from "next/script";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  CheckCircle, AlertCircle, RefreshCw, Copy,
  Trash2, ArrowRight, Clock, User, BookOpen,
  AlertTriangle, Lightbulb, Scale, FileText,
  PenTool, GraduationCap, Globe, Zap, Mail,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────
// NOTE ON WHAT WAS REMOVED vs KEPT
//
// REMOVED from original:
//   • <link rel="canonical"> — invalid in a client component body.
//     Your page.tsx generateMetadata already handles this.
//
//   • Raw <script type="application/ld+json"> tags — these render
//     inside <body>, not <head>, and cause hydration warnings.
//     Replaced with Next.js <Script> which handles placement correctly.
//
//   • BreadcrumbList schema — page.tsx already injects one via the
//     `other` field in generateMetadata. Having two is a duplicate.
//
// KEPT completely unchanged:
//   • All state, all handler functions, all API logic
//   • Entire UI — input card, results banner, issue cards, badges
//   • CATEGORY_COLORS, getCategoryColor
// ─────────────────────────────────────────────────────────────────

/* ─── Types — unchanged ──────────────────────────────────────────────────── */

interface Replacement { value: string }

interface GrammarMatch {
  message: string;
  offset: number;
  length: number;
  replacements: Replacement[];
  rule: { id: string; category: { id: string; name: string } };
  context: { text: string; offset: number; length: number };
}

/* ─── Constants ──────────────────────────────────────────────────────────── */

const LAST_UPDATED = "June 2026";
const READ_TIME    = "8 min read";
const REVIEWED_BY  = "Shubham Gautam";
const TOOL_URL     = "https://www.taskguru.online/tools/grammar-checker";

/* ─── Category Badge Colors — unchanged ─────────────────────────────────── */

const CATEGORY_COLORS: Record<string, string> = {
  TYPOS:       "bg-red-100 text-red-700 border-red-200",
  GRAMMAR:     "bg-orange-100 text-orange-700 border-orange-200",
  PUNCTUATION: "bg-yellow-100 text-yellow-700 border-yellow-200",
  STYLE:       "bg-blue-100 text-blue-700 border-blue-200",
};

function getCategoryColor(id: string) {
  return CATEGORY_COLORS[id] ?? "bg-gray-100 text-gray-700 border-gray-200";
}

/* ─── FAQ — single source for schema + render ────────────────────────────── */

const faqItems = [
  {
    q: "Is this grammar checker completely free?",
    a: "Yes — 100% free, no account needed, no word limits. Paste your text and get corrections instantly. No subscription prompts or upgrade paywalls.",
  },
  {
    q: "What grammar errors does this tool detect?",
    a: "It catches spelling mistakes, subject-verb disagreement, wrong tense, punctuation errors, article misuse (a/an/the), confused word pairs (your/you're, its/it's, then/than, fewer/less), and style issues that make your writing unclear.",
  },
  {
    q: "Does it work for non-native English speakers?",
    a: "Absolutely. It's especially useful for ESL writers — catching missing articles, wrong prepositions, and incorrect verb forms that native speakers rarely notice or explain clearly.",
  },
  {
    q: "Is my text stored or shared with anyone?",
    a: "Your text is sent to the LanguageTool API for real-time processing and is never stored on TaskGuru's servers. LanguageTool's own privacy policy governs their handling of API requests.",
  },
  {
    q: "Can I use this for professional emails and resumes?",
    a: "Yes — it works for emails, cover letters, essays, blog posts, and business reports. For resumes specifically, pair it with TaskGuru's free Resume Maker for best results.",
  },
  {
    q: "How is this different from Grammarly?",
    a: "Unlike Grammarly, TaskGuru's grammar checker is entirely free with no sign-up required. It uses the LanguageTool open-source engine. Grammarly's free tier limits corrections and requires an account.",
  },
  {
    q: "What is LanguageTool and is it reliable?",
    a: "LanguageTool is a widely-used open-source grammar and style checker. It powers grammar checking in hundreds of tools and integrations worldwide, and its English engine is considered one of the most thorough free grammar APIs available.",
  },
  {
    q: "What is the difference between grammar checking and proofreading?",
    a: "Grammar checking is automated — a tool analyzes sentence structure, word choice, and punctuation rules. Proofreading is manual — a human reviews content for context, tone, and clarity. The best approach uses both: run the grammar checker first, then proofread manually.",
  },
  {
    q: "Does this tool check for plagiarism?",
    a: "No — this is a grammar and spelling checker, not a plagiarism detector. For plagiarism and AI content checking, use TaskGuru's free AI Content Detector tool.",
  },
];

/* ─── Schemas — NO BreadcrumbList (page.tsx handles it) ─────────────────── */

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

// ✅ No AggregateRating — no fake reviews or ratings ever
const toolSchema = {
  "@context": "https://schema.org",
  "@type": ["WebApplication", "SoftwareApplication"],
  name: "Free Grammar Checker — TaskGuru",
  url: TOOL_URL,
  applicationCategory: "Utility",
  operatingSystem: "Any",
  browserRequirements: "Requires JavaScript",
  description:
    "Free online grammar checker powered by LanguageTool. Detects spelling, grammar, punctuation, article misuse, confused words, and style errors. No account needed.",
  featureList: [
    "Grammar and spelling detection",
    "Punctuation error correction",
    "Subject-verb agreement check",
    "Article misuse detection (a/an/the)",
    "Confused word pairs (your/you're, its/it's)",
    "Style and clarity suggestions",
    "LanguageTool API integration",
    "One-click fix application",
    "No login required",
    "No word limits",
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
  name: "How to Check Grammar Online Free Using TaskGuru",
  description:
    "Step-by-step guide to checking and fixing grammar, spelling, and punctuation errors using TaskGuru's free online grammar checker.",
  totalTime: "PT1M",
  estimatedCost: { "@type": "MonetaryAmount", currency: "USD", value: "0" },
  step: [
    { "@type": "HowToStep", position: 1, name: "Paste your text",          text: "Copy your essay, email, or any English text and paste it into the input box. No word limit." },
    { "@type": "HowToStep", position: 2, name: "Click Check Grammar",      text: "Press the button. The tool sends your text to the LanguageTool API and returns a categorised list of issues." },
    { "@type": "HowToStep", position: 3, name: "Review and apply fixes",   text: "Each issue card shows the error type, context, and suggested fixes. Click a fix to apply it, or Ignore to skip." },
    { "@type": "HowToStep", position: 4, name: "Copy corrected text",      text: "Once done, click Copy Corrected Text to copy the clean version to your clipboard." },
  ],
};

/* ─── Internal links — all verified against sitemap ─────────────────────── */

const relatedTools = [
  { href: "/tools/text-paraphraser",    label: "Text Paraphraser",    desc: "Rewrite correct but awkward sentences into natural prose"               }, // ✅
  { href: "/tools/word-counter",        label: "Word Counter",         desc: "Count words, characters, sentences, and reading time"                  }, // ✅
  { href: "/tools/ai-content-detector", label: "AI Content Detector",  desc: "Check whether your text reads as AI-generated or human-written"        }, // ✅
  { href: "/tools/resume-maker",        label: "Resume Maker",         desc: "Build a clean ATS-ready resume — grammar-check it before sending"      }, // ✅
  { href: "/tools/pdf-editor-pro",      label: "PDF Editor Pro",       desc: "Edit, annotate, and fill PDF documents directly in your browser"       }, // ✅
  { href: "/tools/image-to-text",       label: "Image to Text (OCR)",  desc: "Extract text from images, then run it through the grammar checker"     }, // ✅
  { href: "/tools/pdf-to-word",         label: "PDF to Word",          desc: "Convert PDFs to editable Word documents before grammar review"         }, // ✅
  { href: "/tools/typing-speed-test",   label: "Typing Speed Test",    desc: "Measure your words-per-minute and accuracy as you type"                }, // ✅
];

const relatedBlogs = [
  { href: "/blog/how-to-write-professional-english-emails", label: "How to Write Professional English Emails"          }, // ✅
  { href: "/blog/grammarly-free-vs-free-grammar-checker",   label: "Grammarly Free vs Free Grammar Checker — Compared" }, // ✅
  { href: "/blog/how-to-paraphrase-text",                   label: "How to Paraphrase Text Like a Pro"                 }, // ✅
  { href: "/blog/zero-cost-freelancer-tools",               label: "Zero-Cost Tools Every Freelancer Needs"            }, // ✅
  { href: "/blog/free-online-tools-students-2026-no-login", label: "Best Free Tools for Students in 2026"              }, // ✅
];

/* ─── Component ──────────────────────────────────────────────────────────── */

export default function GrammarChecker() {
  const [text, setText]         = useState("");
  const [matches, setMatches]   = useState<GrammarMatch[]>([]);
  const [loading, setLoading]   = useState(false);
  const [checked, setChecked]   = useState(false);
  const { toast }               = useToast();

  // ── wordCount — unchanged ──
  const wordCount = text.trim()
    ? text.trim().split(/\s+/).filter(Boolean).length
    : 0;

  // ── handleChange — unchanged ──
  const handleChange = (val: string) => {
    setText(val);
    if (checked) { setChecked(false); setMatches([]); }
  };

  // ── checkGrammar — unchanged ──
  const checkGrammar = async () => {
    if (!text.trim()) {
      toast({ title: "Enter some text first.", variant: "destructive" });
      return;
    }
    setLoading(true);
    setMatches([]);
    setChecked(false);
    try {
      const body = new URLSearchParams({ text, language: "en-US", enabledOnly: "false" });
      const res = await fetch("https://api.languagetool.org/v2/check", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded", Accept: "application/json" },
        body: body.toString(),
      });
      if (!res.ok) throw new Error(`API error: ${res.status}`);
      const data = await res.json();
      setMatches(data.matches ?? []);
      setChecked(true);
    } catch (err: unknown) {
      toast({
        title: "Check failed",
        description: err instanceof Error ? err.message : "Please try again in a moment.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // ── applyFix — unchanged ──
  const applyFix = useCallback(
    (match: GrammarMatch, replacement: string) => {
      const fixed = text.slice(0, match.offset) + replacement + text.slice(match.offset + match.length);
      setText(fixed);
      const diff = replacement.length - match.length;
      setMatches((prev) =>
        prev
          .filter((m) => m.offset !== match.offset)
          .map((m) => m.offset > match.offset ? { ...m, offset: m.offset + diff } : m)
      );
    },
    [text]
  );

  // ── ignore / copyText / clearAll — unchanged ──
  const ignore   = (offset: number) => setMatches((prev) => prev.filter((m) => m.offset !== offset));
  const copyText = () => { navigator.clipboard.writeText(text); toast({ title: "Copied to clipboard!" }); };
  const clearAll = () => { setText(""); setMatches([]); setChecked(false); };

  // ── errorCount / styleCount — unchanged ──
  const errorCount = matches.filter((m) => ["TYPOS", "GRAMMAR"].includes(m.rule.category.id)).length;
  const styleCount = matches.filter((m) => ["STYLE", "PUNCTUATION"].includes(m.rule.category.id)).length;

  return (
    <>
      {/*
        Schemas injected via Next.js Script — renders in <head>, not <body>.
        No BreadcrumbList here — page.tsx generateMetadata already injects one.
        No canonical here — page.tsx generateMetadata handles alternates.canonical.
      */}
      <Script id="gc-faq-schema"   type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema)   }} />
      <Script id="gc-tool-schema"  type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema)  }} />
      <Script id="gc-howto-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />

      <div className="space-y-10">

        {/* ── EEAT META BAR ────────────────────────────────────────────────── */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground border-b border-border pb-4">
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
          <span className="flex items-center gap-x-3 ml-auto flex-wrap">
            <Link href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <span aria-hidden="true">·</span>
            <Link href="/about" className="hover:text-primary transition-colors">About TaskGuru</Link>
            <span aria-hidden="true">·</span>
            <Link href="/contact" className="hover:text-primary transition-colors">Contact</Link>
          </span>
        </div>

        {/* ── GEO: QUICK ANSWER ────────────────────────────────────────────── */}
        <section
          id="quick-answer"
          aria-label="Quick Answer"
          className="p-5 bg-primary/5 border border-primary/20 rounded-2xl"
        >
          <p className="text-xs font-bold text-primary uppercase tracking-wider mb-2">⚡ Quick Answer</p>
          <p className="text-sm leading-relaxed text-foreground">
            <strong>TaskGuru&apos;s Free Grammar Checker</strong> uses the open-source{" "}
            <strong>LanguageTool</strong> engine to detect and fix spelling, grammar,
            punctuation, and style errors in English text instantly. Paste your content,
            click <em>Check Grammar</em>, and apply one-click fixes in under 60 seconds.
            No login, no word limits, completely free — works for students, writers,
            professionals, and non-native English speakers.
          </p>
        </section>

        {/* ── INPUT CARD — UI unchanged ────────────────────────────────────── */}
        <section aria-label="Grammar Checker Tool">
          <div className="rounded-xl border bg-card p-5 space-y-4">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>{wordCount > 0 ? `${wordCount} words` : "Paste or type your text below"}</span>
              {text && (
                <button
                  onClick={clearAll}
                  className="flex items-center gap-1 hover:text-destructive transition-colors"
                  aria-label="Clear all text and reset results"
                >
                  <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                  Clear
                </button>
              )}
            </div>

            <Textarea
              id="grammar-input"
              value={text}
              onChange={(e) => handleChange(e.target.value)}
              placeholder="Paste your essay, email, cover letter, or any English text here..."
              rows={10}
              className="resize-none text-base leading-relaxed focus-visible:ring-1"
              aria-label="Text input for grammar checking"
              aria-describedby="grammar-hint"
            />
            <p id="grammar-hint" className="sr-only">
              Paste English text and press Check Grammar to receive spelling and grammar suggestions.
            </p>

            <div className="flex flex-wrap gap-3">
              <Button
                onClick={checkGrammar}
                disabled={loading || !text.trim()}
                className="gap-2"
                aria-label="Check grammar and spelling"
              >
                {loading
                  ? <><RefreshCw className="w-4 h-4 animate-spin" aria-hidden="true" /> Checking...</>
                  : <><CheckCircle className="w-4 h-4" aria-hidden="true" /> Check Grammar</>
                }
              </Button>

              {checked && (
                <Button
                  variant="outline"
                  onClick={copyText}
                  className="gap-2"
                  aria-label="Copy corrected text to clipboard"
                >
                  <Copy className="w-4 h-4" aria-hidden="true" />
                  Copy Corrected Text
                </Button>
              )}
            </div>
          </div>

          {/* ── RESULTS BANNER — UI unchanged ── */}
          {checked && (
            <div
              role="status"
              aria-live="polite"
              className={`rounded-xl border p-4 mt-4 ${
                matches.length === 0
                  ? "bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-800"
                  : "bg-amber-50 border-amber-200 dark:bg-amber-950/20 dark:border-amber-800"
              }`}
            >
              {matches.length === 0 ? (
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 shrink-0" aria-hidden="true" />
                  <div>
                    <p className="font-semibold text-green-800 dark:text-green-400">No issues found</p>
                    <p className="text-sm text-green-700 dark:text-green-500">Your text looks clean. Nice work.</p>
                  </div>
                </div>
              ) : (
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" aria-hidden="true" />
                  <div>
                    <p className="font-semibold text-amber-800 dark:text-amber-400">
                      {matches.length} issue{matches.length > 1 ? "s" : ""} found
                    </p>
                    <p className="text-sm text-amber-700 dark:text-amber-500">
                      {errorCount > 0 && `${errorCount} grammar/spelling error${errorCount > 1 ? "s" : ""}`}
                      {errorCount > 0 && styleCount > 0 && " · "}
                      {styleCount > 0 && `${styleCount} style/punctuation suggestion${styleCount > 1 ? "s" : ""}`}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── ISSUE CARDS — UI unchanged ── */}
          {matches.length > 0 && (
            <div className="space-y-3 mt-4">
              <h2 className="text-base font-semibold">Suggestions — {matches.length} found</h2>
              {matches.map((match, i) => {
                const catId  = match.rule.category.id;
                const before = match.context.text.slice(0, match.context.offset);
                const error  = match.context.text.slice(match.context.offset, match.context.offset + match.context.length);
                const after  = match.context.text.slice(match.context.offset + match.context.length);
                return (
                  <div key={`${match.offset}-${i}`} className="rounded-xl border bg-card p-4 space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1.5 flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge variant="outline" className={`text-xs ${getCategoryColor(catId)}`}>
                            {match.rule.category.name}
                          </Badge>
                          <p className="text-sm font-medium">{match.message}</p>
                        </div>
                        <p className="text-xs text-muted-foreground font-mono truncate">
                          &ldquo;...{before}
                          <span className="bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-400 px-0.5 rounded">
                            {error}
                          </span>
                          {after}...&rdquo;
                        </p>
                      </div>
                      <button
                        onClick={() => ignore(match.offset)}
                        className="text-xs text-muted-foreground hover:text-foreground shrink-0 transition-colors"
                        aria-label={`Ignore suggestion: ${match.message}`}
                      >
                        Ignore
                      </button>
                    </div>
                    {match.replacements.length > 0 && (
                      <div className="flex gap-2 flex-wrap items-center">
                        <span className="text-xs text-muted-foreground">Fix:</span>
                        {match.replacements.slice(0, 4).map((r, j) => (
                          <button
                            key={j}
                            onClick={() => applyFix(match, r.value)}
                            className="text-xs px-3 py-1 rounded-full border hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors font-medium"
                            aria-label={`Apply fix: ${r.value || "remove"}`}
                          >
                            {r.value || "(remove)"}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            GEO · AEO · SEO CONTENT  ~2500 words
            Structured so ChatGPT / Gemini / Google AI Overview can
            extract direct answers from each section.
        ══════════════════════════════════════════════════════════════════ */}

        {/* What Is Grammar Checking */}
        <article className="rounded-xl border bg-muted/30 p-6 space-y-5 text-sm leading-relaxed text-muted-foreground">
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-foreground">
              Free Grammar Checker — Catch Every Error Before It Costs You
            </h2>
            <p>
              Whether you&apos;re writing a job application, a client email, a university
              essay, or a blog post — grammar errors are the one thing that can undermine an
              otherwise strong piece of writing. Readers notice them even when they
              don&apos;t consciously register them. Hiring managers filter candidates on them.
              Clients judge professionalism by them.
            </p>
            <p>
              This free grammar checker catches the errors your eyes skip over — wrong
              apostrophes, mismatched tenses, missing articles, comma splices, and
              subject-verb disagreements. Powered by the <strong className="text-foreground">LanguageTool</strong>{" "}
              open-source engine and tuned for both native and non-native English speakers.
              After fixing grammar, use the{" "}
              <Link href="/tools/text-paraphraser" className="text-primary font-medium hover:underline underline-offset-4">
                Text Paraphraser
              </Link>{" "}
              to improve sentence flow where the structure is correct but sounds stiff.
            </p>
          </div>

          {/* What Gets Checked */}
          <div className="space-y-2">
            <h3 className="text-base font-semibold text-foreground">What Gets Checked</h3>
            <ul className="space-y-1.5" role="list">
              {[
                "Spelling — catches typos and common misspellings instantly",
                "Grammar — subject-verb agreement, wrong tense, incorrect verb forms",
                "Punctuation — missing commas, incorrect apostrophes, run-on sentences",
                "Articles — wrong usage of a, an, and the (critical for ESL writers)",
                "Style — wordy phrases, redundant words, passive voice overuse",
                "Confused words — your/you're, its/it's, then/than, fewer/less",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* How to Use */}
          <div id="how-to-use" className="space-y-2">
            <h3 className="text-base font-semibold text-foreground">How to Use It</h3>
            <ol className="space-y-1.5 list-decimal list-inside">
              <li>Paste your text into the box above — no word limit</li>
              <li>Click &ldquo;Check Grammar&rdquo;</li>
              <li>Review each suggestion — click a fix to apply it, or &ldquo;Ignore&rdquo; if it doesn&apos;t fit your context</li>
              <li>Copy the corrected text when you&apos;re done</li>
            </ol>
            <p>The whole process takes under 60 seconds. No account, no extension, no subscription prompt.</p>
          </div>

          {/* Proofreading Blindspot */}
          <div className="space-y-2">
            <h3 className="text-base font-semibold text-foreground">Why It&apos;s Better Than Manual Proofreading</h3>
            <p>
              When you re-read your own writing, your brain fills in what you meant to write —
              not what&apos;s actually on the page. This is called the proofreading blindspot,
              and it affects everyone including professional writers. A grammar checker has no
              expectations about your intent. It reads exactly what&apos;s there.
            </p>
            <p>Write first. Edit second. Check grammar third. In that order, your writing gets both authentic and polished.</p>
          </div>

          {/* Common Mistakes — real examples */}
          <div className="space-y-2">
            <h3 className="text-base font-semibold text-foreground">Common Grammar Mistakes This Tool Catches</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { wrong: "I should of called earlier.",       right: "I should have called earlier."       },
                { wrong: "There are less errors now.",        right: "There are fewer errors now."         },
                { wrong: "The team are working on it.",       right: "The team is working on it."          },
                { wrong: "Its a great opportunity.",          right: "It's a great opportunity."           },
                { wrong: "She go to work everyday.",          right: "She goes to work every day."         },
                { wrong: "We discussed about the issue.",     right: "We discussed the issue."             },
                { wrong: "He is more smarter than her.",      right: "He is smarter than her."             },
                { wrong: "Between you and I, this is wrong.", right: "Between you and me, this is wrong."  },
              ].map((ex, i) => (
                <div key={i} className="rounded-lg border bg-background p-3 space-y-1 text-xs">
                  <p className="text-red-600 dark:text-red-400 line-through">{ex.wrong}</p>
                  <p className="text-green-700 dark:text-green-400 font-medium">{ex.right}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Works for Every Writer */}
          <div className="space-y-2">
            <h3 className="text-base font-semibold text-foreground">Works for Every Type of Writing</h3>
            <p>
              Students use it for essays and dissertation drafts. Professionals use it before
              sending client emails or submitting reports. Freelancers use it to polish blog
              posts before publishing. Non-native speakers use it to catch patterns they&apos;re
              still learning. There&apos;s no &ldquo;right&rdquo; type of user — if you write in
              English and care about quality, this tool is for you.
            </p>
          </div>
        </article>

        {/* Grammar Rules Guide */}
        <article className="space-y-5">
          <h2 className="text-xl font-bold text-foreground">
            Essential Grammar Rules Every Writer Should Know
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Understanding why errors happen helps you write better from the first draft — not
            just fix after the fact. These are the rules that catch most writers out, and that
            this tool checks automatically.
          </p>
          <div className="space-y-4">

            {/* Rule 1 */}
            <div className="rounded-xl border bg-card p-5">
              <h3 className="font-bold text-foreground mb-2 flex items-center gap-2 text-sm">
                <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-bold shrink-0">1</span>
                Subject-Verb Agreement
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                The verb must match the subject in number. A singular subject takes a singular
                verb; a plural subject takes a plural verb. This breaks most often with
                collective nouns (team, group, committee) and compound subjects.
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { wrong: "The team are ready for the match.",       right: "The team is ready for the match."       },
                  { wrong: "Each of the students have submitted.",    right: "Each of the students has submitted."    },
                ].map((ex, i) => (
                  <div key={i} className="rounded-lg border bg-background p-3 space-y-1 text-xs">
                    <p className="text-red-600 dark:text-red-400 line-through">{ex.wrong}</p>
                    <p className="text-green-700 dark:text-green-400 font-medium">{ex.right}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Rule 2 */}
            <div className="rounded-xl border bg-card p-5">
              <h3 className="font-bold text-foreground mb-2 flex items-center gap-2 text-sm">
                <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-bold shrink-0">2</span>
                Tense Consistency
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                Stay in one tense throughout a piece unless there is a logical reason to shift.
                Mixing past and present tense in the same paragraph confuses readers and signals
                careless editing.
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { wrong: "She walked in and says hello to everyone.",          right: "She walked in and said hello to everyone."          },
                  { wrong: "He submits the report and waited for feedback.",      right: "He submitted the report and waited for feedback."   },
                ].map((ex, i) => (
                  <div key={i} className="rounded-lg border bg-background p-3 space-y-1 text-xs">
                    <p className="text-red-600 dark:text-red-400 line-through">{ex.wrong}</p>
                    <p className="text-green-700 dark:text-green-400 font-medium">{ex.right}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Rule 3 */}
            <div className="rounded-xl border bg-card p-5">
              <h3 className="font-bold text-foreground mb-2 flex items-center gap-2 text-sm">
                <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-bold shrink-0">3</span>
                Confused Word Pairs
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                These are the errors spellcheckers miss because the wrong word is still a real
                word. Context is everything — and this is exactly where LanguageTool shines.
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { wrong: "Your going to love this.",          right: "You're going to love this."          },
                  { wrong: "The company changed it's policy.",  right: "The company changed its policy."     },
                  { wrong: "I should of known better.",         right: "I should have known better."         },
                  { wrong: "There going to be changes.",        right: "There are going to be changes."      },
                ].map((ex, i) => (
                  <div key={i} className="rounded-lg border bg-background p-3 space-y-1 text-xs">
                    <p className="text-red-600 dark:text-red-400 line-through">{ex.wrong}</p>
                    <p className="text-green-700 dark:text-green-400 font-medium">{ex.right}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </article>

        {/* Punctuation Guide */}
        <article className="rounded-xl border bg-muted/30 p-6 space-y-4">
          <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" aria-hidden="true" />
            Punctuation Guide — The Mistakes That Undermine Good Writing
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Punctuation is where many otherwise good writers lose credibility. A single
            misplaced apostrophe in a business email can override pages of strong content.
          </p>
          <div className="space-y-3 text-sm text-muted-foreground">
            {[
              {
                title: "The Apostrophe — It's vs. Its",
                body: "It's (with apostrophe) = it is or it has. Its (no apostrophe) = possessive. Simple test: replace it with 'it is'. If the sentence still makes sense, use the apostrophe. If not, leave it out.",
              },
              {
                title: "Comma Splices",
                body: "Joining two independent clauses with only a comma is a comma splice — one of the most common writing errors. Fix it with a semicolon, a conjunction, or by splitting into two sentences entirely.",
              },
              {
                title: "The Oxford Comma",
                body: "The comma before the final 'and' in a list matters. Without it: 'I thanked my parents, Oprah and God' — implying Oprah and God are your parents. With it: 'my parents, Oprah, and God' is unambiguous. Use it consistently.",
              },
              {
                title: "Hyphens in Compound Modifiers",
                body: "Hyphenate compound modifiers before the noun they modify: 'a well-written report'. No hyphen when the modifier comes after: 'The report was well written'. The rule: position determines whether the hyphen is needed.",
              },
            ].map((item) => (
              <div key={item.title} className="p-4 bg-card border border-border rounded-xl">
                <h3 className="font-bold text-foreground mb-1 text-sm">{item.title}</h3>
                <p className="leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </article>

        {/* Active vs Passive Voice */}
        <article className="space-y-4">
          <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
            <PenTool className="h-5 w-5 text-primary" aria-hidden="true" />
            Active vs. Passive Voice — When Each Is Right
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            The grammar checker flags passive voice as a style suggestion — not always as an
            error. Passive voice is not wrong. But over-relying on it makes writing feel
            distant and bureaucratic. Here&apos;s when to use each.
          </p>
          <div className="grid md:grid-cols-2 gap-5">
            <div className="rounded-xl border bg-card p-5">
              <h3 className="font-bold text-foreground mb-3 text-sm">✅ Active Voice — Use by Default</h3>
              <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                Subject does the action. Sentences are shorter, clearer, and more engaging.
                Use active voice for emails, blog posts, and business communication.
              </p>
              <div className="space-y-2 text-xs">
                {[
                  { p: "The report was submitted by the team on Friday.", a: "The team submitted the report on Friday." },
                  { p: "Mistakes were made during the presentation.", a: "The presenter made several mistakes." },
                ].map((ex, i) => (
                  <div key={i} className="rounded-lg border bg-background p-2.5 space-y-1">
                    <p className="text-muted-foreground line-through">{ex.p}</p>
                    <p className="text-green-700 dark:text-green-400 font-medium">{ex.a}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-xl border bg-card p-5">
              <h3 className="font-bold text-foreground mb-3 text-sm">⚠️ Passive Voice — Valid in These Cases</h3>
              <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                Use passive voice when the actor is unknown, unimportant, or deliberately
                omitted. Scientific writing and news often use it correctly.
              </p>
              <div className="space-y-2 text-xs">
                {[
                  { t: "The samples were collected at 6 AM.", n: "Actor not important — passive is correct here." },
                  { t: "The suspect was arrested last night.", n: "Standard in news writing — actor implied." },
                ].map((ex, i) => (
                  <div key={i} className="rounded-lg border bg-background p-2.5">
                    <p className="text-foreground font-medium">{ex.t}</p>
                    <p className="text-muted-foreground mt-1">✅ {ex.n}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            After writing, use the{" "}
            <Link href="/tools/word-counter" className="text-primary font-medium hover:underline underline-offset-4">
              Word Counter
            </Link>{" "}
            to check readability scores — passive voice overuse directly impacts these.
          </p>
        </article>

        {/* Email Writing Tips */}
        <article className="space-y-4">
          <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
            <Mail className="h-5 w-5 text-primary" aria-hidden="true" />
            Grammar Tips for Professional Email Writing
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Email is still the primary medium of professional communication. A grammar error
            in a client email can cost you credibility instantly. For a complete guide, read:{" "}
            <Link href="/blog/how-to-write-professional-english-emails" className="text-primary font-medium hover:underline underline-offset-4">
              How to Write Professional English Emails
            </Link>.
          </p>
          <div className="space-y-3">
            {[
              { n: "1", tip: "Check your subject line first",       desc: "Errors in subject lines are seen before the email is opened. Paste it into the grammar checker separately." },
              { n: "2", tip: "Salutation punctuation matters",      desc: "'Dear John,' needs a comma. Missing punctuation in a salutation signals carelessness from line one." },
              { n: "3", tip: "Avoid vague pronouns",                desc: "'It was decided that...' — who decided? Name the actor. Active voice with a named subject shows accountability." },
              { n: "4", tip: "Sign-off punctuation",                desc: "'Best regards,' needs a comma after it. 'Kind regards,' and 'Sincerely,' follow the same rule." },
              { n: "5", tip: "Read aloud before sending",           desc: "After grammar checking, read the email aloud once. Awkward rhythm signals a grammatically correct but still-broken sentence." },
            ].map((item) => (
              <div key={item.n} className="flex gap-3 text-sm p-4 bg-card rounded-xl border border-border">
                <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold shrink-0 text-xs">
                  {item.n}
                </span>
                <div>
                  <p className="font-bold text-foreground">{item.tip}</p>
                  <p className="text-muted-foreground mt-0.5 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </article>

        {/* Student + Business Examples */}
        <article className="space-y-5">
          <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-primary" aria-hidden="true" />
            Real Examples — Students &amp; Business
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-xl border bg-card p-5 space-y-3">
              <h3 className="font-bold text-foreground text-sm">🎓 Student Essay — Before &amp; After</h3>
              <div className="text-xs space-y-3">
                <div className="p-3 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800/40 rounded-lg">
                  <p className="font-semibold text-red-700 dark:text-red-400 mb-1">❌ Before</p>
                  <p className="text-muted-foreground leading-relaxed italic">
                    &ldquo;The experiment show that temperature have a direct affect on the rate of the reaction.
                    All result was recorded careful in the lab notebook.&rdquo;
                  </p>
                </div>
                <div className="p-3 bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800/40 rounded-lg">
                  <p className="font-semibold text-green-700 dark:text-green-400 mb-1">✅ After</p>
                  <p className="text-muted-foreground leading-relaxed italic">
                    &ldquo;The experiment shows that temperature has a direct effect on the rate of the reaction.
                    All results were recorded carefully in the lab notebook.&rdquo;
                  </p>
                </div>
                <p className="text-muted-foreground">Caught: subject-verb agreement, affect→effect, tense, adverb form.</p>
              </div>
            </div>
            <div className="rounded-xl border bg-card p-5 space-y-3">
              <h3 className="font-bold text-foreground text-sm">💼 Business Email — Before &amp; After</h3>
              <div className="text-xs space-y-3">
                <div className="p-3 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800/40 rounded-lg">
                  <p className="font-semibold text-red-700 dark:text-red-400 mb-1">❌ Before</p>
                  <p className="text-muted-foreground leading-relaxed italic">
                    &ldquo;Dear Mr Smith I wanted to reach out in regards to you&apos;re proposal from last week.
                    We are very interested to discuss this further at you&apos;re earliest convenience.&rdquo;
                  </p>
                </div>
                <div className="p-3 bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800/40 rounded-lg">
                  <p className="font-semibold text-green-700 dark:text-green-400 mb-1">✅ After</p>
                  <p className="text-muted-foreground leading-relaxed italic">
                    &ldquo;Dear Mr. Smith, I wanted to reach out regarding your proposal from last week.
                    We are very interested in discussing this further at your earliest convenience.&rdquo;
                  </p>
                </div>
                <p className="text-muted-foreground">Caught: missing comma, wordy phrase, you&apos;re→your (×2), preposition.</p>
              </div>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Grammar-checking your resume? Use the{" "}
            <Link href="/tools/resume-maker" className="text-primary font-medium hover:underline underline-offset-4">
              free Resume Maker
            </Link>{" "}
            to build and structure it. If your resume is in PDF, convert it with{" "}
            <Link href="/tools/pdf-to-word" className="text-primary font-medium hover:underline underline-offset-4">
              PDF to Word
            </Link>{" "}
            before editing.
          </p>
        </article>

        {/* SEO Writing Tips */}
        <article className="space-y-4">
          <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
            <Globe className="h-5 w-5 text-primary" aria-hidden="true" />
            Grammar &amp; SEO — Why Error-Free Content Ranks Higher
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Google&apos;s quality raters treat grammar and spelling as content quality signals.
            Pages with consistent errors correlate with lower EEAT scores. Here&apos;s how to
            use grammar checking as part of your SEO workflow.
          </p>
          <div className="space-y-3">
            {[
              { title: "Grammar-check every page before publishing",     desc: "Run new blog posts and landing pages through the checker before going live. Takes 60 seconds and removes a common quality failure." },
              { title: "Always check AI-generated content",              desc: "AI writing tools sometimes produce unusual constructions. Grammar-check AI output, then use the AI Content Detector to verify it reads as human." },
              { title: "Audit high-impression, low-CTR pages",           desc: "If a page ranks but doesn't get clicks, meta descriptions or titles may contain grammar errors. Errors in visible SERP text directly hurt CTR." },
              { title: "Pair grammar with Word Counter for readability", desc: "After checking grammar, use Word Counter to check sentence length distribution. Clean grammar + short average sentence length = best readability." },
            ].map((item, i) => (
              <div key={i} className="flex gap-3 text-sm p-4 bg-secondary/20 border border-border rounded-xl">
                <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <p className="font-bold text-foreground">{item.title}</p>
                  <p className="text-muted-foreground mt-0.5 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-sm text-muted-foreground">
            For AI-generated content, pair this with the{" "}
            <Link href="/tools/ai-content-detector" className="text-primary font-medium hover:underline underline-offset-4">
              AI Content Detector
            </Link>{" "}
            before publishing. For sections that need rewriting rather than just fixing, use the{" "}
            <Link href="/tools/text-paraphraser" className="text-primary font-medium hover:underline underline-offset-4">
              Text Paraphraser
            </Link>.
          </p>
        </article>

        {/* Who Should Use This */}
        <article className="space-y-5">
          <h2 className="text-xl font-bold text-foreground text-center">Who Should Use This Grammar Checker?</h2>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              { icon: <GraduationCap className="h-5 w-5 text-primary" aria-hidden="true" />, title: "Students",                    desc: "Catch subject-verb errors, tense issues, and article misuse in essays before submission. Works for IELTS, TOEFL, university coursework, and dissertation drafts." },
              { icon: <PenTool className="h-5 w-5 text-primary" aria-hidden="true" />,       title: "Bloggers & Content Writers",  desc: "Polish articles before publishing. Grammar errors on blogs signal low editorial standards to both readers and Google's quality systems." },
              { icon: <Globe className="h-5 w-5 text-primary" aria-hidden="true" />,         title: "Non-Native English Speakers", desc: "Detect missing articles, incorrect prepositions, and confused word pairs — patterns hardest to self-correct when English is not your first language." },
              { icon: <Zap className="h-5 w-5 text-primary" aria-hidden="true" />,           title: "Professionals & Freelancers", desc: "Proofread client emails, proposals, reports, and cover letters before sending. First impressions in professional writing depend on error-free text." },
            ].map((item) => (
              <div key={item.title} className="bg-secondary/20 p-5 rounded-xl border border-border">
                <div className="flex items-center gap-3 mb-2">{item.icon}<h3 className="font-bold text-foreground text-sm">{item.title}</h3></div>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </article>

        {/* Comparison Table */}
        <article className="rounded-xl border bg-muted/30 p-6">
          <h2 className="text-xl font-bold text-foreground mb-2 flex items-center gap-2">
            <Scale className="h-5 w-5 text-primary" aria-hidden="true" />
            TaskGuru vs Grammarly vs Microsoft Word
          </h2>
          <p className="text-sm text-muted-foreground mb-5">
            Full comparison:{" "}
            <Link href="/blog/grammarly-free-vs-free-grammar-checker" className="text-primary font-medium hover:underline underline-offset-4">
              Grammarly Free vs Free Grammar Checker
            </Link>.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 pr-4 font-bold text-foreground">Feature</th>
                  <th className="text-left py-3 pr-4 font-bold text-primary">TaskGuru ✅</th>
                  <th className="text-left py-3 pr-4 font-bold text-foreground">Grammarly</th>
                  <th className="text-left py-3 font-bold text-foreground">MS Word</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { f: "Free to use",              t: "✅ Yes",           g: "⚠️ Limited",        w: "❌ Paid"         },
                  { f: "Login required",           t: "✅ No",            g: "❌ Yes",            w: "❌ Yes"          },
                  { f: "Grammar detection",        t: "✅ Yes",           g: "✅ Yes",            w: "✅ Yes"          },
                  { f: "Style suggestions",        t: "✅ Yes",           g: "✅ Premium only",   w: "⚠️ Basic"        },
                  { f: "Works in browser",         t: "✅ Yes",           g: "✅ Extension only", w: "❌ Desktop only" },
                  { f: "No installation needed",   t: "✅ Yes",           g: "⚠️ Optional",      w: "❌ Required"     },
                  { f: "ESL support",              t: "✅ LanguageTool",  g: "✅ Yes",            w: "⚠️ Limited"      },
                  { f: "Privacy",                  t: "✅ API only",      g: "⚠️ Account data",  w: "⚠️ Cloud sync"  },
                ].map((row) => (
                  <tr key={row.f} className="border-b border-border/50 last:border-0">
                    <td className="py-3 pr-4 font-medium text-foreground">{row.f}</td>
                    <td className="py-3 pr-4 text-primary font-medium">{row.t}</td>
                    <td className="py-3 pr-4 text-muted-foreground">{row.g}</td>
                    <td className="py-3 text-muted-foreground">{row.w}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>

        {/* Common Mistakes to Avoid */}
        <article>
          <h2 className="text-xl font-bold text-foreground mb-5 flex items-center gap-2">
            <AlertTriangle className="text-yellow-500 h-5 w-5" aria-hidden="true" />
            Mistakes to Avoid When Using a Grammar Checker
          </h2>
          <div className="space-y-3">
            {[
              { m: "Accepting every suggestion without reading",  f: "Grammar tools follow rules — but context matters. 'The team are working on it' is correct British English. Always review before applying." },
              { m: "Running the checker while still drafting",    f: "Write your complete draft first, then check. Mid-draft checking interrupts flow and flags constructions you may rewrite anyway." },
              { m: "Relying on grammar check as your only edit",  f: "Grammar checking catches structural errors — not weak arguments or poor paragraph flow. It is one step, not the whole editing process." },
              { m: "Ignoring style suggestions",                  f: "Spelling errors are visible but style suggestions — passive voice, wordiness, redundancy — often have the biggest impact on readability." },
              { m: "Not re-checking after paraphrasing",         f: "If you use the Text Paraphraser to rewrite sections, always run grammar check again. Paraphrasing can occasionally introduce new issues." },
            ].map((item) => (
              <div key={item.m} className="flex gap-3 p-4 bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-800/50 rounded-xl text-sm">
                <AlertTriangle className="w-4 h-4 text-yellow-500 shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <p className="font-bold text-foreground">❌ {item.m}</p>
                  <p className="mt-0.5 text-muted-foreground">✅ {item.f}</p>
                </div>
              </div>
            ))}
          </div>
        </article>

        {/* Best Practices */}
        <article>
          <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Lightbulb className="text-primary h-5 w-5" aria-hidden="true" />
            Best Practices for Better English Writing
          </h2>
          <div className="space-y-3">
            {[
              { n: "1", t: "Write first, check after",              d: "Draft freely. Run the checker once your full draft is complete — not sentence by sentence." },
              { n: "2", t: "Read aloud before checking",            d: "Before using any tool, read your writing aloud. You'll catch awkward phrasing no tool can detect." },
              { n: "3", t: "Pair grammar with paraphrasing",        d: "After fixing errors, use the Text Paraphraser to improve flow where sentences are correct but sound stiff." },
              { n: "4", t: "Fix one category at a time",            d: "Fix all spelling first, then grammar, then style. Jumping between categories increases the chance of missing issues." },
              { n: "5", t: "Track your repeated errors",            d: "Note which error types appear most often. Awareness of your patterns leads to fewer first-draft errors over time." },
            ].map((item) => (
              <div key={item.n} className="flex gap-3 p-3 text-sm">
                <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold shrink-0 text-xs">{item.n}</span>
                <p><strong className="text-foreground">{item.t}:</strong>{" "}<span className="text-muted-foreground">{item.d}</span></p>
              </div>
            ))}
          </div>
        </article>

        {/* Summary — speakable target */}
        <article id="tool-summary" className="p-6 bg-primary/5 border border-primary/20 rounded-2xl">
          <h2 className="text-xl font-bold text-foreground mb-4">Summary</h2>
          <ul className="space-y-2 text-sm" role="list">
            {[
              "Powered by LanguageTool — a trusted open-source grammar engine used worldwide.",
              "Catches spelling, grammar, punctuation, article misuse, confused words, and style issues.",
              "100% free — no account, no word limits, no upgrade prompts, ever.",
              "One-click fixes applied directly in-place with correct offset recalculation.",
              "Works for students, professionals, bloggers, and non-native English speakers.",
              "Text is processed via LanguageTool API — never stored on TaskGuru servers.",
              "Pair with Text Paraphraser (flow) + AI Content Detector (authenticity) for a complete writing workflow.",
            ].map((point) => (
              <li key={point} className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                <span className="text-muted-foreground">{point}</span>
              </li>
            ))}
          </ul>
        </article>

        {/* Related Tools — 8 verified */}
        <article>
          <h2 className="text-base font-semibold mb-4">Pair With These Free Tools</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {relatedTools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group rounded-xl border bg-card p-4 hover:border-primary hover:bg-primary/5 transition-all space-y-1"
                aria-label={`${tool.label} — ${tool.desc}`}
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold group-hover:text-primary transition-colors">{tool.label}</p>
                  <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" aria-hidden="true" />
                </div>
                <p className="text-xs text-muted-foreground">{tool.desc}</p>
              </Link>
            ))}
          </div>
        </article>

        {/* Related Blogs — 5 verified */}
        <article>
          <h2 className="text-base font-semibold mb-4 flex items-center gap-2">
            <BookOpen className="text-primary h-4 w-4" aria-hidden="true" />
            Related Guides &amp; Articles
          </h2>
          <div className="space-y-3">
            {relatedBlogs.map((blog) => (
              <Link
                key={blog.href}
                href={blog.href}
                className="p-4 border rounded-xl hover:bg-secondary/50 transition-colors flex items-center justify-between group"
                aria-label={blog.label}
              >
                <span className="font-medium text-sm text-foreground">{blog.label}</span>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </article>

        {/* FAQ — 9 unique questions, same source as schema, accessible <details> */}
        <article aria-label="Frequently Asked Questions">
          <h2 className="text-xl font-bold mb-5">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqItems.map((faq, i) => (
              <details key={i} className="group rounded-xl border bg-card p-4 cursor-pointer">
                <summary className="font-semibold list-none flex justify-between items-center text-sm text-foreground">
                  {faq.q}
                  <span className="transition-transform group-open:rotate-180 text-muted-foreground shrink-0 ml-2" aria-hidden="true">▼</span>
                </summary>
                <p className="text-sm text-muted-foreground leading-relaxed mt-3">{faq.a}</p>
              </details>
            ))}
          </div>
        </article>

      </div>
    </>
  );
}
