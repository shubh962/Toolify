"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  CheckCircle,
  AlertCircle,
  RefreshCw,
  Copy,
  Trash2,
  ArrowRight,
} from "lucide-react";

/* ─── Types ─────────────────────────────────────────────────────────────── */
interface Replacement {
  value: string;
}

interface GrammarMatch {
  message: string;
  offset: number;
  length: number;
  replacements: Replacement[];
  rule: {
    id: string;
    category: { id: string; name: string };
  };
  context: {
    text: string;
    offset: number;
    length: number;
  };
}

/* ─── Schemas ────────────────────────────────────────────────────────────── */
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is this grammar checker completely free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — 100% free, no account needed, no word limits. Paste your text and get corrections instantly.",
      },
    },
    {
      "@type": "Question",
      name: "What grammar errors does this tool detect?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It catches spelling mistakes, subject-verb disagreement, wrong tense, punctuation errors, article misuse (a/an/the), and style issues that make your writing unclear.",
      },
    },
    {
      "@type": "Question",
      name: "Does it work for non-native English speakers?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely. It's especially useful for ESL writers — catching missing articles, wrong prepositions, and incorrect verb forms that native speakers rarely explain.",
      },
    },
    {
      "@type": "Question",
      name: "Is my text stored or shared with anyone?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Your text is processed in real time via the LanguageTool API and is never stored on our servers.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use this for professional emails and resumes?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — it works great for emails, cover letters, essays, blog posts, and reports. For resumes specifically, pair it with our Resume Maker for best results.",
      },
    },
    {
      "@type": "Question",
      name: "How is this different from Grammarly?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Unlike Grammarly, this is entirely free with no sign-up required. It uses the LanguageTool open-source engine, trusted by millions of writers globally.",
      },
    },
  ],
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Free Grammar Checker — TaskGuru",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Any",
  url: "https://www.taskguru.online/tools/grammar-checker",
  description:
    "Free online grammar checker that detects spelling, punctuation, and grammar errors instantly. No account needed.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  provider: {
    "@type": "Organization",
    name: "TaskGuru",
    url: "https://www.taskguru.online",
  },
};

/* ─── Category Badge Colors ──────────────────────────────────────────────── */
const CATEGORY_COLORS: Record<string, string> = {
  TYPOS: "bg-red-100 text-red-700 border-red-200",
  GRAMMAR: "bg-orange-100 text-orange-700 border-orange-200",
  PUNCTUATION: "bg-yellow-100 text-yellow-700 border-yellow-200",
  STYLE: "bg-blue-100 text-blue-700 border-blue-200",
};

function getCategoryColor(id: string) {
  return CATEGORY_COLORS[id] ?? "bg-gray-100 text-gray-700 border-gray-200";
}

/* ─── Related Tools (from live sitemap) ─────────────────────────────────── */
const relatedTools = [
  {
    href: "/tools/text-paraphraser",
    label: "Text Paraphraser",
    desc: "Rewrite sentences that are correct but sound awkward",
  },
  {
    href: "/tools/word-counter",
    label: "Word Counter",
    desc: "Count words, characters, and reading time",
  },
  {
    href: "/tools/ai-content-detector",
    label: "AI Content Detector",
    desc: "Check if your text reads as AI-generated",
  },
  {
    href: "/tools/resume-maker",
    label: "Resume Maker",
    desc: "Build a clean, ATS-friendly resume for free",
  },
  {
    href: "/tools/pdf-to-word",
    label: "PDF to Word",
    desc: "Convert any PDF to editable Word document",
  },
  {
    href: "/blog/how-to-paraphrase-text",
    label: "How to Paraphrase Text",
    desc: "Learn when to rewrite vs. when to quote",
    isBlog: true,
  },
];

/* ─── Component ──────────────────────────────────────────────────────────── */
export default function GrammarChecker() {
  const [text, setText] = useState("");
  const [matches, setMatches] = useState<GrammarMatch[]>([]);
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const { toast } = useToast();

  const wordCount = text.trim()
    ? text.trim().split(/\s+/).filter(Boolean).length
    : 0;

  const handleChange = (val: string) => {
    setText(val);
    if (checked) {
      setChecked(false);
      setMatches([]);
    }
  };

  const checkGrammar = async () => {
    if (!text.trim()) {
      toast({ title: "Enter some text first.", variant: "destructive" });
      return;
    }

    setLoading(true);
    setMatches([]);
    setChecked(false);

    try {
      const body = new URLSearchParams({
        text,
        language: "en-US",
        enabledOnly: "false",
      });

      const res = await fetch("https://api.languagetool.org/v2/check", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
        body: body.toString(),
      });

      if (!res.ok) throw new Error(`API error: ${res.status}`);

      const data = await res.json();
      setMatches(data.matches ?? []);
      setChecked(true);
    } catch (err: unknown) {
      toast({
        title: "Check failed",
        description:
          err instanceof Error ? err.message : "Please try again in a moment.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const applyFix = useCallback(
    (match: GrammarMatch, replacement: string) => {
      const fixed =
        text.slice(0, match.offset) +
        replacement +
        text.slice(match.offset + match.length);
      setText(fixed);

      const diff = replacement.length - match.length;
      setMatches((prev) =>
        prev
          .filter((m) => m.offset !== match.offset)
          .map((m) =>
            m.offset > match.offset ? { ...m, offset: m.offset + diff } : m
          )
      );
    },
    [text]
  );

  const ignore = (offset: number) =>
    setMatches((prev) => prev.filter((m) => m.offset !== offset));

  const copyText = () => {
    navigator.clipboard.writeText(text);
    toast({ title: "Copied to clipboard!" });
  };

  const clearAll = () => {
    setText("");
    setMatches([]);
    setChecked(false);
  };

  const errorCount = matches.filter((m) =>
    ["TYPOS", "GRAMMAR"].includes(m.rule.category.id)
  ).length;

  const styleCount = matches.filter((m) =>
    ["STYLE", "PUNCTUATION"].includes(m.rule.category.id)
  ).length;

  return (
    <>
      {/* ── Canonical + Structured Data ─────────────────────────────────── */}
      <link
        rel="canonical"
        href="https://www.taskguru.online/tools/grammar-checker"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema) }}
      />

      <div className="space-y-8">

        {/* ── Input Card ───────────────────────────────────────────────── */}
        <div className="rounded-xl border bg-card p-5 space-y-4">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>
              {wordCount > 0 ? `${wordCount} words` : "Paste or type your text below"}
            </span>
            {text && (
              <button
                onClick={clearAll}
                className="flex items-center gap-1 hover:text-destructive transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Clear
              </button>
            )}
          </div>

          <Textarea
            value={text}
            onChange={(e) => handleChange(e.target.value)}
            placeholder="Paste your essay, email, cover letter, or any English text here..."
            rows={10}
            className="resize-none text-base leading-relaxed focus-visible:ring-1"
          />

          <div className="flex flex-wrap gap-3">
            <Button
              onClick={checkGrammar}
              disabled={loading || !text.trim()}
              className="gap-2"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Checking...
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4" />
                  Check Grammar
                </>
              )}
            </Button>

            {checked && (
              <Button variant="outline" onClick={copyText} className="gap-2">
                <Copy className="w-4 h-4" />
                Copy Corrected Text
              </Button>
            )}
          </div>
        </div>

        {/* ── Results Banner ───────────────────────────────────────────── */}
        {checked && (
          <div
            className={`rounded-xl border p-4 ${
              matches.length === 0
                ? "bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-800"
                : "bg-amber-50 border-amber-200 dark:bg-amber-950/20 dark:border-amber-800"
            }`}
          >
            {matches.length === 0 ? (
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 shrink-0" />
                <div>
                  <p className="font-semibold text-green-800 dark:text-green-400">
                    No issues found
                  </p>
                  <p className="text-sm text-green-700 dark:text-green-500">
                    Your text looks clean. Nice work.
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-amber-800 dark:text-amber-400">
                    {matches.length} issue{matches.length > 1 ? "s" : ""} found
                  </p>
                  <p className="text-sm text-amber-700 dark:text-amber-500">
                    {errorCount > 0 &&
                      `${errorCount} grammar/spelling error${errorCount > 1 ? "s" : ""}`}
                    {errorCount > 0 && styleCount > 0 && " · "}
                    {styleCount > 0 &&
                      `${styleCount} style/punctuation suggestion${styleCount > 1 ? "s" : ""}`}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── Issue Cards ──────────────────────────────────────────────── */}
        {matches.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-base font-semibold">
              Suggestions — {matches.length} found
            </h2>

            {matches.map((match, i) => {
              const catId = match.rule.category.id;
              const before = match.context.text.slice(0, match.context.offset);
              const error = match.context.text.slice(
                match.context.offset,
                match.context.offset + match.context.length
              );
              const after = match.context.text.slice(
                match.context.offset + match.context.length
              );

              return (
                <div
                  key={`${match.offset}-${i}`}
                  className="rounded-xl border bg-card p-4 space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1.5 flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge
                          variant="outline"
                          className={`text-xs ${getCategoryColor(catId)}`}
                        >
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
                    >
                      Ignore
                    </button>
                  </div>

                  {match.replacements.length > 0 && (
                    <div className="flex gap-2 flex-wrap items-center">
                      <span className="text-xs text-muted-foreground">
                        Fix:
                      </span>
                      {match.replacements.slice(0, 4).map((r, j) => (
                        <button
                          key={j}
                          onClick={() => applyFix(match, r.value)}
                          className="text-xs px-3 py-1 rounded-full border hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors font-medium"
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

        {/* ── SEO Content Block ────────────────────────────────────────── */}
        <div className="rounded-xl border bg-muted/30 p-6 space-y-5 text-sm leading-relaxed text-muted-foreground">
          <div className="space-y-2">
            <h2 className="text-lg font-bold text-foreground">
              Free Grammar Checker — Catch Every Error Before It Costs You
            </h2>
            <p>
              Whether you&apos;re writing a job application, a client email, a
              university essay, or a blog post — grammar errors are the one
              thing that can undermine an otherwise strong piece of writing.
              Readers notice them even when they don&apos;t consciously register
              them. Hiring managers filter candidates on them. Clients judge
              professionalism by them.
            </p>
            <p>
              This free grammar checker catches the errors your eyes skip over —
              wrong apostrophes, mismatched tenses, missing articles, comma
              splices, and subject-verb disagreements. Powered by the
              LanguageTool open-source engine and tuned for both native and
              non-native English speakers.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-base font-semibold text-foreground">
              What Gets Checked
            </h3>
            <ul className="space-y-1.5">
              {[
                "Spelling — catches typos and common misspellings",
                "Grammar — subject-verb agreement, wrong tense, incorrect verb forms",
                "Punctuation — missing commas, incorrect apostrophes, run-on sentences",
                "Articles — wrong usage of a, an, and the (critical for ESL writers)",
                "Style — wordy phrases, redundant words, passive voice overuse",
                "Confused words — your/you're, its/it's, then/than, fewer/less",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-2">
            <h3 className="text-base font-semibold text-foreground">
              How to Use It
            </h3>
            <ol className="space-y-1.5 list-decimal list-inside">
              <li>Paste your text into the box above — no word limit</li>
              <li>Click &ldquo;Check Grammar&rdquo;</li>
              <li>
                Review each suggestion card — click a fix to apply it, or
                &ldquo;Ignore&rdquo; if it doesn&apos;t fit your context
              </li>
              <li>Copy the corrected text when you&apos;re done</li>
            </ol>
            <p>
              The whole process takes under 60 seconds. No account, no
              extension, no subscription prompt.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-base font-semibold text-foreground">
              Why It&apos;s Better Than Manual Proofreading
            </h3>
            <p>
              When you re-read your own writing, your brain fills in what you
              meant to write — not what&apos;s actually on the page. This is
              called the proofreading blindspot, and it affects everyone,
              including professional writers. A grammar checker has no
              expectations about your intent. It reads exactly what&apos;s
              there. That&apos;s why running your text through a checker after
              writing — not during — is the most effective approach.
            </p>
            <p>
              Write first. Edit second. Check grammar third. In that order,
              your writing gets both authentic and polished.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-base font-semibold text-foreground">
              Common Grammar Mistakes This Tool Catches
            </h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                {
                  wrong: "I should of called earlier.",
                  right: "I should have called earlier.",
                },
                {
                  wrong: "There are less errors now.",
                  right: "There are fewer errors now.",
                },
                {
                  wrong: "The team are working on it.",
                  right: "The team is working on it.",
                },
                {
                  wrong: "Its a great opportunity.",
                  right: "It's a great opportunity.",
                },
                {
                  wrong: "She go to work everyday.",
                  right: "She goes to work every day.",
                },
                {
                  wrong: "We discussed about the issue.",
                  right: "We discussed the issue.",
                },
              ].map((ex, i) => (
                <div
                  key={i}
                  className="rounded-lg border bg-background p-3 space-y-1 text-xs"
                >
                  <p className="text-red-600 dark:text-red-400 line-through">
                    {ex.wrong}
                  </p>
                  <p className="text-green-700 dark:text-green-400 font-medium">
                    {ex.right}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-base font-semibold text-foreground">
              Works for Every Type of Writing
            </h3>
            <p>
              Students use it for essays and dissertation drafts. Professionals
              use it before sending client emails or submitting reports.
              Freelancers use it to polish blog posts before publishing.
              Non-native speakers use it to catch patterns they&apos;re still
              learning. There&apos;s no &ldquo;right&rdquo; type of user — if
              you write in English and care about quality, this tool is for you.
            </p>
          </div>
        </div>

        {/* ── Related Tools ────────────────────────────────────────────── */}
        <div className="space-y-4">
          <h2 className="text-base font-semibold">
            Pair With These Free Tools
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {relatedTools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group rounded-xl border bg-card p-4 hover:border-primary hover:bg-primary/5 transition-all space-y-1"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold group-hover:text-primary transition-colors">
                    {tool.label}
                  </p>
                  <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <p className="text-xs text-muted-foreground">{tool.desc}</p>
                {tool.isBlog && (
                  <span className="text-[10px] bg-muted px-1.5 py-0.5 rounded font-medium text-muted-foreground">
                    Blog
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>

        {/* ── FAQ ──────────────────────────────────────────────────────── */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqSchema.mainEntity.map((faq, i) => (
              <div key={i} className="rounded-xl border bg-card p-4">
                <h3 className="font-semibold mb-1 text-sm">{faq.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {faq.acceptedAnswer.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
