"use client";

import Link from "next/link";
import { tools } from "@/lib/tools";
import {
  ArrowRight, ShieldCheck, Zap, Globe, CheckCircle2,
  FileText, ImageIcon, PencilLine, Briefcase, Search,
  Languages, Cpu, Lock, Star, ChevronDown,
  FileInput, Sparkles, MousePointer2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import NewsletterForm from "@/components/NewsletterForm";
import { useMemo, useState } from "react";
import Script from "next/script";

/* ──────────────────────────────────────────────────────
   DATA
────────────────────────────────────────────────────── */

const ALL_POSTS = [
  { slug: "how-to-paraphrase-text",                        title: "How to Paraphrase Text (Without Plagiarism)",        summary: "5 proven techniques to rewrite sentences, avoid plagiarism, and improve your writing instantly.",   category: "Writing Skills",     color: "text-green-600"  },
  { slug: "what-is-ocr-image-to-text",                     title: "What is OCR? How Image to Text Technology Works",    summary: "A plain-English guide to OCR — how it works and how to use it for free.",                           category: "Tech Explained",     color: "text-purple-600" },
  { slug: "how-to-compress-images-without-losing-quality", title: "How to Compress Images Without Losing Quality",      summary: "Step-by-step guide to compressing JPG, PNG, and WebP images for faster websites.",                   category: "Image Optimization", color: "text-blue-600"   },
  { slug: "how-to-convert-pdf-to-word-free",               title: "How to Convert PDF to Word for Free",                summary: "No software, no sign-up, no upload. Convert any PDF to editable Word in seconds.",                   category: "PDF Tools",          color: "text-orange-600" },
  { slug: "what-is-a-qr-code",                             title: "What is a QR Code and How Does It Work?",           summary: "Everything about QR codes — history, anatomy, types, use cases, and how to create one free.",     category: "Tech Explained",     color: "text-red-600"    },
  { slug: "how-to-make-resume-with-no-experience",         title: "How to Make a Resume With No Experience",           summary: "Complete guide for students and fresh graduates — what to include instead of work experience.",   category: "Career Hacking",     color: "text-purple-600" },
  { slug: "resume-ats-secrets",                            title: "5 Hidden Keywords That ATS Scanners Look For",      summary: "Stop getting auto-rejected. Learn the exact keywords that get your resume past filters.",           category: "Career Hacking",     color: "text-purple-600" },
  { slug: "extract-text-scanned-pdf",                      title: "How to Extract Text from a Scanned PDF",            summary: "Can't copy text from a scanned PDF? Here's the easiest fix — free, no software, 30 seconds.",      category: "PDF Tools",          color: "text-orange-600" },
  { slug: "local-first-web-apps-trend-2026",               title: "The Rise of Local-First Web Apps in 2026",          summary: "How WebAssembly and Edge computing are killing expensive cloud subscriptions.",                    category: "Tech Trends",        color: "text-teal-600"   },
  { slug: "image-compression-guide",                       title: "JPG vs WebP: Which Format Boosts Your SEO Score?", summary: "We tested JPG, PNG, and WebP to find which creates the fastest Core Web Vitals scores.",            category: "SEO Masterclass",    color: "text-green-600"  },
];

function getRandomPosts(count: number) {
  return [...ALL_POSTS].sort(() => Math.random() - 0.5).slice(0, count);
}

const CATEGORIES = [
  { key: "all",        label: "All Tools",   emoji: "✨" },
  { key: "ai",         label: "AI Writing",  emoji: "🤖" },
  { key: "pdf",        label: "PDF",         emoji: "📄" },
  { key: "image",      label: "Image",       emoji: "🖼️" },
  { key: "utility",    label: "Utility",     emoji: "⚙️" },
  { key: "calculator", label: "Calculator",  emoji: "🔢" },
];

const HERO_CHIPS = [
  { icon: FileText,   label: "PDF to Word",    sub: "Free · No email",    href: "/tools/pdf-to-word",        cls: "bg-orange-50 dark:bg-orange-950/40 text-orange-500" },
  { icon: ImageIcon,  label: "BG Remover",     sub: "AI · Free",          href: "/tools/background-remover", cls: "bg-violet-50 dark:bg-violet-950/40 text-violet-600" },
  { icon: PencilLine, label: "AI Paraphraser", sub: "Free · Unlimited",   href: "/tools/text-paraphraser",   cls: "bg-blue-50 dark:bg-blue-950/40 text-blue-600"       },
  { icon: Briefcase,  label: "Resume Builder", sub: "ATS · Free",         href: "/tools/resume-maker",       cls: "bg-green-50 dark:bg-green-950/40 text-green-600"    },
  { icon: ImageIcon,  label: "Compress Image", sub: "Free · No limit",    href: "/tools/image-compressor",   cls: "bg-pink-50 dark:bg-pink-950/40 text-pink-600"       },
  { icon: FileText,   label: "Merge PDF",      sub: "Free · Instant",     href: "/tools/merge-pdf",          cls: "bg-amber-50 dark:bg-amber-950/40 text-amber-600"    },
];

const FAQ_ITEMS = [
  {
    q: "Are TaskGuru tools really free?",
    a: "Yes — every tool on TaskGuru is permanently free. No free trial, no credit card, no account required. Open any tool and use it immediately.",
  },
  {
    q: "Do I need to create an account?",
    a: "No. Every tool works without signing up or logging in. There is no account system on TaskGuru at all.",
  },
  {
    q: "Is my data safe when using TaskGuru tools?",
    a: "Yes — completely safe. All tools process files locally in your browser. Your files and text are never uploaded to TaskGuru's servers and are deleted from memory when you close the tab.",
  },
  {
    q: "What kind of tools does TaskGuru offer?",
    a: `TaskGuru offers ${tools.length}+ free browser-based tools covering PDF conversion (PDF to Word, Merge PDF, Compress PDF, Split PDF), AI writing (paraphraser, grammar checker, AI content detector), image tools (background remover, compressor, image to text OCR), productivity (resume maker, QR code generator, typing speed test), and calculators.`,
  },
  {
    q: "Can I use TaskGuru on my phone?",
    a: "Yes — all tools are fully responsive and work on any device including iPhone and Android in Chrome, Safari, and Firefox. No app download required.",
  },
  {
    q: "How does the free PDF to Word converter work?",
    a: "Upload your PDF file, click Convert, and download the editable Word document. The conversion runs in your browser using WebAssembly. Your PDF is never sent to a server.",
  },
  {
    q: "What is the best free online paraphrasing tool?",
    a: "TaskGuru's free AI paraphraser rewrites text to sound natural and human-like using a context-aware AI model. It works for essays, blog posts, emails, and marketing copy — no word limit, no signup.",
  },
  {
    q: "How do I remove a background from an image for free?",
    a: "Use TaskGuru's free AI background remover. Upload your image, and the AI automatically detects and removes the background in seconds. Download the transparent PNG immediately — no editing skills required.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

/* ──────────────────────────────────────────────────────
   TOOL CARD — new design, actual usable cards
────────────────────────────────────────────────────── */
const TOOL_COLORS: Record<string, string> = {
  pdf:        "bg-orange-50 dark:bg-orange-950/30 text-orange-600",
  image:      "bg-pink-50 dark:bg-pink-950/30 text-pink-600",
  ai:         "bg-violet-50 dark:bg-violet-950/30 text-violet-600",
  utility:    "bg-blue-50 dark:bg-blue-950/30 text-blue-600",
  calculator: "bg-green-50 dark:bg-green-950/30 text-green-600",
};

const TOOL_BADGE_COLORS: Record<string, string> = {
  pdf:        "bg-orange-100 dark:bg-orange-950/50 text-orange-600 dark:text-orange-400",
  image:      "bg-pink-100 dark:bg-pink-950/50 text-pink-600 dark:text-pink-400",
  ai:         "bg-violet-100 dark:bg-violet-950/50 text-violet-600 dark:text-violet-400",
  utility:    "bg-blue-100 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400",
  calculator: "bg-green-100 dark:bg-green-950/50 text-green-600 dark:text-green-400",
};

/* ──────────────────────────────────────────────────────
   PAGE
────────────────────────────────────────────────────── */
export default function Home() {
  const featuredPosts     = useMemo(() => getRandomPosts(3), []);
  const [search, setSearch]           = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [openFaq, setOpenFaq]         = useState<number | null>(null);

  const filteredTools = useMemo(() => tools.filter((t) => {
    const matchCat = activeCategory === "all" || t.category === activeCategory;
    const matchQ   = t.title.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchQ;
  }), [search, activeCategory]);

  return (
    <>
      {/* FAQ Schema for People Also Ask */}
      <Script id="home-faq-schema" type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* ══════════════════════════════════════════
          🚀 HERO
      ══════════════════════════════════════════ */}
      <section
        aria-label="Hero"
        className="relative overflow-hidden bg-white dark:bg-gray-950 min-h-[92vh] flex flex-col items-center justify-center text-center px-6 py-28"
      >
        {/* BG accents */}
        <div className="absolute top-0 right-0 w-[420px] h-[420px] bg-gradient-to-bl from-violet-100/80 to-transparent dark:from-violet-950/30 dark:to-transparent pointer-events-none"
          style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }} aria-hidden="true" />
        <div className="absolute bottom-0 left-0 w-[280px] h-[280px] bg-gradient-to-tr from-amber-50 to-transparent dark:from-amber-950/20 dark:to-transparent pointer-events-none"
          style={{ clipPath: "polygon(0 100%, 0 0, 100% 100%)" }} aria-hidden="true" />
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.055] pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle, #6d28d9 1px, transparent 1px)", backgroundSize: "28px 28px" }} aria-hidden="true" />

        <div className="relative z-10 max-w-3xl w-full flex flex-col items-center">

          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-50 dark:bg-violet-950/60 border border-violet-200 dark:border-violet-800 text-violet-700 dark:text-violet-300 text-[11px] font-black tracking-[0.08em] uppercase mb-8" aria-label={`${tools.length}+ free tools, zero subscriptions`}>
            <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" aria-hidden="true" />
            {tools.length}+ Tools · Zero Subscriptions · No Login
          </div>

          {/* H1 */}
          <h1 className="text-5xl md:text-6xl lg:text-[70px] font-black text-gray-950 dark:text-white leading-[1.04] tracking-[-0.04em] mb-6">
            Free Online Tools —<br />
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-violet-600 to-indigo-500 bg-clip-text text-transparent">
                No Login, No Catch.
              </span>
              <span className="absolute -bottom-1 left-0 right-0 h-[5px] bg-amber-400 rounded-full" aria-hidden="true" />
            </span>
          </h1>

          {/* GEO: Quick Answer */}
          <p className="text-base md:text-lg text-gray-500 dark:text-gray-400 max-w-xl leading-relaxed font-medium mb-10">
            PDF converter, AI paraphraser, background remover, image compressor, grammar checker,
            and resume builder — all free, all instant, all private. Open any tool and start
            in seconds. No account. No watermark. No subscription.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 mb-12 w-full max-w-sm sm:max-w-none">
            <Button size="lg" asChild
              className="bg-gray-950 hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-100 dark:text-gray-950 text-white font-black text-sm px-8 h-12 rounded-2xl shadow-lg hover:shadow-xl transition-all border-0">
              <Link href="#tools">
                <Zap className="w-4 h-4 mr-2" aria-hidden="true" />
                Explore All {tools.length} Free Tools
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild
              className="border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 font-bold text-sm px-8 h-12 rounded-2xl transition-all">
              <Link href="/blog">
                Read Free Guides <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
              </Link>
            </Button>
          </div>

          {/* Quick-access chips */}
          <p className="text-[10px] font-black uppercase tracking-[0.14em] text-gray-400 mb-3">
            Jump straight in →
          </p>
          <div className="flex flex-wrap justify-center gap-2" role="list" aria-label="Popular tools">
            {HERO_CHIPS.map(({ icon: Icon, label, sub, href, cls }) => (
              <Link key={label} href={href} role="listitem"
                aria-label={`${label} — ${sub}`}
                className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-sm hover:border-violet-400 hover:shadow-md hover:-translate-y-0.5 transition-all">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${cls}`} aria-hidden="true">
                  <Icon className="w-4 h-4" aria-hidden="true" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-black text-gray-900 dark:text-white leading-none">{label}</p>
                  <p className="text-[10px] text-gray-400 leading-none mt-0.5">{sub}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Trust bar */}
        <div className="relative z-10 mt-14 flex flex-wrap justify-center gap-x-8 gap-y-3" aria-label="Trust signals">
          {[
            { icon: ShieldCheck,  label: "Zero Data Stored"  },
            { icon: Zap,          label: "Instant Results"   },
            { icon: Globe,        label: "Works Worldwide"   },
            { icon: CheckCircle2, label: "No Sign-Up Ever"   },
            { icon: Lock,         label: "100% Private"      },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-1.5 text-xs font-semibold text-gray-400 dark:text-gray-500">
              <Icon className="w-3.5 h-3.5 text-violet-500" aria-hidden="true" />
              {label}
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          📊 STATS BAR
      ══════════════════════════════════════════ */}
      <section aria-label="Platform stats" className="border-y border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/30">
        <div className="container mx-auto px-6 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: `${tools.length}+`, label: "Free Tools",          sub: "All categories covered"  },
              { value: "0",               label: "Sign-ups Required",    sub: "Open and use instantly"  },
              { value: "100%",            label: "Always Free",          sub: "No freemium. Ever."      },
              { value: "0 KB",            label: "Data We Store",        sub: "Files deleted immediately"},
            ].map(({ value, label, sub }) => (
              <div key={label} className="space-y-0.5">
                <p className="text-3xl md:text-4xl font-black text-gray-950 dark:text-white tracking-tight">{value}</p>
                <p className="text-sm font-black text-gray-700 dark:text-gray-300">{label}</p>
                <p className="text-[10px] text-gray-400 font-medium">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          ⚡ HOW IT WORKS — 3 steps
      ══════════════════════════════════════════ */}
      <section aria-label="How it works" className="py-20 bg-white dark:bg-gray-950 border-b border-gray-100 dark:border-gray-800">
        <div className="container mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-[11px] font-black uppercase tracking-[0.14em] text-violet-600 mb-3">Zero Friction</p>
            <h2 className="text-3xl md:text-4xl font-black text-gray-950 dark:text-white tracking-tight">
              How TaskGuru Works
            </h2>
            <p className="mt-3 text-gray-500 text-sm max-w-xl mx-auto leading-relaxed">
              No accounts, no queues, no watermarks. Every tool runs directly in your browser
              — processing happens on your device, not our servers.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                icon: MousePointer2,
                step: "01",
                color: "bg-violet-50 dark:bg-violet-950/40 text-violet-600",
                title: "Open any free tool",
                body: "Pick a tool from the grid below. No account, no download — it opens instantly in your browser.",
              },
              {
                icon: FileInput,
                step: "02",
                color: "bg-blue-50 dark:bg-blue-950/40 text-blue-600",
                title: "Drop your file or paste text",
                body: "Upload a PDF, image, or paste your content. Everything stays on your device — nothing leaves your browser.",
              },
              {
                icon: Sparkles,
                step: "03",
                color: "bg-green-50 dark:bg-green-950/40 text-green-600",
                title: "Get results instantly",
                body: "Download your converted file, copy your rewritten text, or save your result. Done in seconds. No watermark.",
              },
            ].map(({ icon: Icon, step, color, title, body }) => (
              <div key={title} className="relative flex flex-col items-center text-center p-8 rounded-3xl border border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/30 hover:border-violet-200 dark:hover:border-violet-800 hover:shadow-lg transition-all">
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-gray-950 dark:bg-white text-white dark:text-gray-950 text-[10px] font-black tracking-[0.15em] rounded-full">
                  STEP {step}
                </div>
                <div className={`w-14 h-14 rounded-2xl ${color} flex items-center justify-center mb-5 mt-2`} aria-hidden="true">
                  <Icon className="w-7 h-7" aria-hidden="true" />
                </div>
                <h3 className="font-black text-gray-950 dark:text-white text-base mb-2">{title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="#tools"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-2xl bg-violet-600 hover:bg-violet-700 text-white font-black text-sm transition-all shadow-lg shadow-violet-600/25 hover:shadow-violet-600/40">
              Try a Free Tool Now <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          📱 APP BANNER
      ══════════════════════════════════════════ */}
      <section aria-label="Mobile app download" className="py-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full text-white/90 text-xs font-bold mb-3 backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse inline-block" aria-hidden="true" />
                Now Available on Mobile
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-white leading-tight">
                Pro Resume Maker &amp; CV Builder
              </h2>
              <p className="text-white/80 text-sm mt-1 font-medium">
                Build ATS-friendly resumes on your phone · 9 Professional Templates · Free
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">

              {/* Indus App Store */}
              <a href="https://indusapp.store/d6vxlznp" target="_blank" rel="noopener noreferrer"
                aria-label="Download Pro Resume Maker on Indus App Store"
                className="flex items-center gap-3 px-5 py-3 bg-white rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all min-w-[180px]">
                <div className="w-9 h-9 bg-gradient-to-br from-orange-500 to-pink-500 rounded-xl flex items-center justify-center shrink-0" aria-hidden="true">
                  <span className="text-white font-black text-sm">IN</span>
                </div>
                <div className="text-left">
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider leading-none font-bold">Download on</p>
                  <p className="text-sm font-black text-gray-900 leading-tight">Indus App Store</p>
                </div>
              </a>

              {/* ✅ Google Play — Now Live */}
              <a
                href="https://play.google.com/store/apps/details?id=com.shubham.proresumemakerapp"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Download Pro Resume Maker on Google Play"
                className="flex items-center gap-3 px-5 py-3 bg-white rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all min-w-[180px]"
              >
                <div className="w-9 h-9 bg-gradient-to-br from-green-500 to-blue-500 rounded-xl flex items-center justify-center shrink-0" aria-hidden="true">
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M3 3.5L13.5 12L3 20.5V3.5Z" />
                  </svg>
                </div>
                <div className="text-left">
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider leading-none font-bold">Get it on</p>
                  <p className="text-sm font-black text-gray-900 leading-tight">Google Play</p>
                </div>
              </a>

            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          📰 BLOG — Featured Articles
      ══════════════════════════════════════════ */}
      <section aria-label="Featured guides and articles" className="py-16 bg-white dark:bg-gray-950 border-b border-gray-100 dark:border-gray-800">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-end mb-8">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.14em] text-violet-600 mb-2">Free Guides &amp; Tutorials</p>
              <h2 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white tracking-tight">
                Latest Digital Insights
              </h2>
              <p className="text-gray-500 mt-1 text-sm font-medium">
                Expert guides on productivity, PDF tools, and career growth.
              </p>
            </div>
            <Link href="/blog" className="hidden md:flex items-center text-violet-600 font-bold hover:underline text-sm gap-1">
              View All <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {featuredPosts.map((post) => (
              <Link href={`/blog/${post.slug}`} key={post.slug} className="group">
                <article className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 hover:border-violet-200 dark:hover:border-violet-800 hover:shadow-lg transition-all h-full flex flex-col justify-between">
                  <div>
                    <span className={`text-[10px] font-black uppercase tracking-wider ${post.color}`}>{post.category}</span>
                    <h3 className="mt-2 text-base font-black text-gray-900 dark:text-white group-hover:text-violet-600 transition-colors leading-snug">{post.title}</h3>
                    <p className="mt-2 text-gray-500 text-xs leading-relaxed">{post.summary}</p>
                  </div>
                  <div className="mt-5 flex items-center text-xs font-bold text-violet-600 dark:text-violet-400 group-hover:gap-2 gap-1 transition-all">
                    Read Free Guide <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </div>
                </article>
              </Link>
            ))}
          </div>
          <div className="mt-6 text-center md:hidden">
            <Link href="/blog" className="text-violet-600 font-bold text-sm hover:underline">
              View All Articles →
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          🛠️ TOOLS GRID — Redesigned Cards
      ══════════════════════════════════════════ */}
      <section id="tools" aria-label="All free online tools" className="py-16 bg-gray-50/50 dark:bg-gray-900/20">
        <div className="container mx-auto px-4 md:px-6">

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.14em] text-violet-600 mb-2">
                All Free · No Login · Instant Results
              </p>
              <h2 className="text-2xl md:text-3xl font-black tracking-tight text-gray-900 dark:text-white">
                Free Online Tools
              </h2>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 font-medium">
                {tools.length} tools · Runs in your browser · Zero signup
              </p>
            </div>
            <Link href="/tools"
              className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-violet-300 dark:border-violet-700 text-violet-700 dark:text-violet-300 font-bold text-sm hover:bg-violet-50 dark:hover:bg-violet-950/40 transition-all">
              Browse All <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>

          {/* Search bar */}
          <div className="relative mb-4 max-w-md">
            <label htmlFor="tool-search" className="sr-only">Search free tools</label>
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" aria-hidden="true" />
            <input
              id="tool-search"
              type="search"
              placeholder="Search free tools — e.g. PDF, grammar, resume..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-400/30 focus:border-violet-400 transition-all shadow-sm"
              aria-label="Search free online tools"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs font-bold"
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          {/* Category tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide" role="tablist" aria-label="Tool categories">
            {CATEGORIES.map((cat) => (
              <button key={cat.key}
                role="tab"
                aria-selected={activeCategory === cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold border transition-all ${
                  activeCategory === cat.key
                    ? "bg-gray-950 dark:bg-white text-white dark:text-gray-950 border-gray-950 dark:border-white shadow-sm"
                    : "bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:border-violet-400 hover:text-violet-600"
                }`}>
                <span aria-hidden="true">{cat.emoji}</span> {cat.label}
              </button>
            ))}
          </div>

          {/* Results count */}
          <p className="text-xs text-gray-400 mb-5 font-medium" aria-live="polite">
            Showing{" "}
            <span className="font-black text-gray-900 dark:text-white">{filteredTools.length}</span>{" "}
            free tool{filteredTools.length !== 1 ? "s" : ""}
            {search && <span> for &ldquo;{search}&rdquo;</span>}
          </p>

          {/* Grid */}
          {filteredTools.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredTools.map((tool) => {
                const iconBg   = TOOL_COLORS[tool.category]   ?? "bg-violet-50 dark:bg-violet-950/30 text-violet-600";
                const badgeCls = TOOL_BADGE_COLORS[tool.category] ?? "bg-violet-100 dark:bg-violet-950/50 text-violet-600";
                return (
                  <Link
                    href={`/tools/${tool.slug}`}
                    key={tool.slug}
                    aria-label={`${tool.title} — free, no login required`}
                    className="group flex flex-col gap-3 p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 hover:border-violet-300 dark:hover:border-violet-700 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
                  >
                    {/* Icon + badge row */}
                    <div className="flex items-center justify-between">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${iconBg}`} aria-hidden="true">
                        <tool.icon className="w-5 h-5" aria-hidden="true" />
                      </div>
                      <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${badgeCls}`}>
                        Free
                      </span>
                    </div>

                    {/* Title */}
                    <div>
                      <h3 className="text-sm font-black text-gray-900 dark:text-white leading-snug group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                        {tool.title}
                      </h3>
                      {tool.description && (
                        <p className="mt-1 text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-2">
                          {tool.description}
                        </p>
                      )}
                    </div>

                    {/* CTA row */}
                    <div className="mt-auto flex items-center justify-between">
                      <span className="text-[10px] text-gray-400 font-medium">No login required</span>
                      <span className="text-xs font-black text-violet-600 dark:text-violet-400 flex items-center gap-1 group-hover:gap-2 transition-all">
                        Use Free <ArrowRight className="w-3 h-3" aria-hidden="true" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20 text-gray-400">
              <p className="text-5xl mb-4" role="img" aria-label="magnifying glass">🔍</p>
              <p className="font-black text-base text-gray-700 dark:text-gray-300">
                No tools found for &ldquo;{search}&rdquo;
              </p>
              <p className="text-sm text-gray-400 mt-1 mb-5">Try a different keyword or browse all categories</p>
              <button
                onClick={() => { setSearch(""); setActiveCategory("all"); }}
                className="px-5 py-2 rounded-full bg-violet-600 text-white font-bold text-sm hover:bg-violet-700 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}

          {/* Browse all CTA */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/tools"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-2xl bg-gray-950 dark:bg-white text-white dark:text-gray-950 font-black text-sm hover:opacity-90 transition-all shadow-lg">
              View All {tools.length} Free Tools <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════
          ✨ WHY TASKGURU
      ══════════════════════════════════════════ */}
      <section aria-label="Why TaskGuru" className="border-y border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950 py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-[11px] font-black uppercase tracking-[0.14em] text-violet-600 mb-3">Why TaskGuru</p>
            <h2 className="text-3xl md:text-4xl font-black text-gray-950 dark:text-white tracking-tight">
              Built Different. Not Just Another Tools Site.
            </h2>
            <p className="mt-3 text-gray-500 text-sm max-w-xl mx-auto">
              Every decision we make — architecture, pricing, privacy — is different from the typical tool site model.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {[
              { icon: ShieldCheck, color: "text-violet-600 bg-violet-50 dark:bg-violet-950/40", title: "Zero-Storage Architecture",    body: "Your files are processed in your browser and deleted instantly. We never store, sell, or share your data — not even temporarily." },
              { icon: Zap,         color: "text-amber-600 bg-amber-50 dark:bg-amber-950/40",    title: "Instant Browser Processing",   body: "No server queues. No upload delays. Tools run locally in your browser so results are instant regardless of your location." },
              { icon: Globe,       color: "text-blue-600 bg-blue-50 dark:bg-blue-950/40",       title: "Works Everywhere, Always",     body: "All 40+ tools work on any device, any browser, anywhere in the world. No app download. No region restrictions." },
              { icon: CheckCircle2,color: "text-green-600 bg-green-50 dark:bg-green-950/40",    title: "No Login. No Paywall. Ever.",  body: "Every tool is permanently free. No freemium bait. No credit card required. Open a tool and use it — that's it." },
              { icon: Lock,        color: "text-pink-600 bg-pink-50 dark:bg-pink-950/40",       title: "No Ads Inside Tools",          body: "We keep the tool experience clean. Ads only appear outside the tool interface — never interrupting your workflow." },
              { icon: Star,        color: "text-indigo-600 bg-indigo-50 dark:bg-indigo-950/40", title: "Always Up to Date",            body: "We continuously update tools with the latest AI models and processing libraries. You always get the newest version — free." },
            ].map(({ icon: Icon, color, title, body }) => (
              <div key={title} className="bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 hover:border-violet-200 dark:hover:border-violet-800 hover:shadow-md transition-all">
                <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center mb-4`} aria-hidden="true">
                  <Icon className="w-5 h-5" aria-hidden="true" />
                </div>
                <h3 className="font-black text-gray-950 dark:text-white text-sm mb-2">{title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          📝 SEO / GEO CONTENT
      ══════════════════════════════════════════ */}
      <section aria-label="About TaskGuru tools" className="py-20 bg-gray-50/50 dark:bg-gray-900/20 border-t border-gray-100 dark:border-gray-800">
        <article className="container mx-auto px-6 max-w-5xl">
          <div className="space-y-16 text-gray-600 dark:text-gray-400 font-medium">

            {/* Lede */}
            <header className="text-center max-w-3xl mx-auto">
              <p className="text-[11px] font-black uppercase tracking-[0.14em] text-violet-600 mb-4">About TaskGuru</p>
              <h2 className="text-4xl md:text-5xl font-black text-gray-950 dark:text-white tracking-tight leading-tight mb-6">
                The Free Online Toolkit<br />
                <span className="bg-gradient-to-r from-violet-600 to-indigo-500 bg-clip-text text-transparent">
                  For Everyone.
                </span>
              </h2>
              <p className="text-base leading-relaxed text-gray-500">
                TaskGuru is a free productivity platform with {tools.length}+ browser-based tools covering
                PDF conversion, AI writing, image editing, resume building and more. Every tool is permanently
                free, requires no account, and stores zero user data.
              </p>
            </header>

            {/* PDF section */}
            <div className="space-y-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-950/40 flex items-center justify-center shrink-0" aria-hidden="true">
                  <FileText className="w-5 h-5 text-orange-500" aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-black text-gray-950 dark:text-white">Free PDF Tools — Convert, Merge, Split</h3>
              </div>
              <p className="text-sm leading-relaxed">
                PDF management is one of the most searched categories online. Whether you need a{" "}
                <strong className="text-gray-800 dark:text-gray-200">free PDF to Word converter</strong>,
                a <strong className="text-gray-800 dark:text-gray-200">free PDF merger</strong>, or a{" "}
                <strong className="text-gray-800 dark:text-gray-200">free image to PDF tool</strong>, TaskGuru
                covers every PDF use case — no software download, no upload limit, no watermark.
              </p>
              <div className="grid md:grid-cols-3 gap-5">
                {[
                  { title: "Free PDF to Word",  body: "Advanced layout reconstruction converts PDFs to fully editable Word documents. No formatting loss. No email required.", href: "/tools/pdf-to-word" },
                  { title: "Free Merge PDF",     body: "Combine multiple PDF files instantly. Drag, drop and merge — no file size limit, no watermark, no login.", href: "/tools/merge-pdf" },
                  { title: "Free Image to PDF",  body: "Convert JPG, PNG or WebP images into a high-quality PDF in seconds. Batch convert multiple images at once.", href: "/tools/image-to-pdf" },
                ].map(({ title, body, href }) => (
                  <Link key={title} href={href}
                    className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 hover:border-orange-300 dark:hover:border-orange-700 hover:shadow-md transition-all group">
                    <h4 className="font-black text-gray-950 dark:text-white text-sm mb-2 group-hover:text-orange-600 transition-colors">{title}</h4>
                    <p className="text-xs leading-relaxed mb-3">{body}</p>
                    <span className="text-xs font-bold text-orange-600 flex items-center gap-1">Use Free <ArrowRight className="w-3 h-3" aria-hidden="true" /></span>
                  </Link>
                ))}
              </div>
            </div>

            {/* AI Writing */}
            <div className="bg-gray-950 dark:bg-gray-900 p-8 md:p-12 rounded-3xl border border-gray-800">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-violet-950/60 flex items-center justify-center shrink-0" aria-hidden="true">
                  <Cpu className="w-5 h-5 text-violet-400" aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-black text-white">Free AI Writing Tools</h3>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-8">
                AI writing tools that were once enterprise-only are now free on TaskGuru. Our{" "}
                <strong className="text-white">free AI paraphraser</strong> and{" "}
                <strong className="text-white">free OCR image-to-text</strong> tool use context-aware models
                to deliver human-readable, accurate output instantly.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { title: "Free AI Paraphraser & Text Rewriter", href: "/tools/text-paraphraser", body: "Rewrite essays, articles and social posts while maintaining original meaning. Ideal for students, bloggers and SEO professionals. No word limit. No login." },
                  { title: "Free OCR — Image to Text",            href: "/tools/image-to-text",    body: "Extract text from any image, scanned PDF or screenshot with high accuracy. Supports multiple languages. Results in seconds — no upload, no account." },
                ].map(({ title, body, href }) => (
                  <Link key={title} href={href}
                    className="bg-white/5 hover:bg-white/10 p-6 rounded-2xl border border-white/10 hover:border-violet-500/40 transition-all group">
                    <h4 className="font-bold text-white text-sm mb-2 group-hover:text-violet-300 transition-colors">{title}</h4>
                    <p className="text-gray-400 text-xs leading-relaxed mb-3">{body}</p>
                    <span className="text-xs font-bold text-violet-400 flex items-center gap-1">Use Free <ArrowRight className="w-3 h-3" aria-hidden="true" /></span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Image tools */}
            <div className="space-y-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-pink-50 dark:bg-pink-950/40 flex items-center justify-center shrink-0" aria-hidden="true">
                  <ImageIcon className="w-5 h-5 text-pink-500" aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-black text-gray-950 dark:text-white">Free Image Editing Tools</h3>
              </div>
              <p className="text-sm leading-relaxed">
                Professional image editing used to cost hundreds of dollars. TaskGuru&apos;s{" "}
                <strong className="text-gray-800 dark:text-gray-200">free background remover</strong> uses
                AI edge detection to remove backgrounds in one click. The{" "}
                <strong className="text-gray-800 dark:text-gray-200">free image compressor</strong> reduces
                file size by up to 90% without visible quality loss, supporting JPG, PNG and WebP.
              </p>
              <div className="grid md:grid-cols-2 gap-5">
                {[
                  { title: "Free AI Background Remover", href: "/tools/background-remover", body: "Remove any background automatically using AI edge detection. One click — no selection tools, no masking, no Photoshop subscription." },
                  { title: "Free Image Compressor",      href: "/tools/image-compressor",   body: "Compress JPG, PNG and WebP images by up to 90% without losing visible quality. Perfect for websites, social media and email attachments." },
                ].map(({ title, body, href }) => (
                  <Link key={title} href={href}
                    className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 hover:border-pink-300 dark:hover:border-pink-700 hover:shadow-md transition-all group">
                    <h4 className="font-black text-gray-950 dark:text-white text-sm mb-2 group-hover:text-pink-600 transition-colors">{title}</h4>
                    <p className="text-xs leading-relaxed mb-3">{body}</p>
                    <span className="text-xs font-bold text-pink-600 flex items-center gap-1">Use Free <ArrowRight className="w-3 h-3" aria-hidden="true" /></span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Niche tools */}
            <div className="space-y-8">
              <h3 className="text-2xl font-black text-gray-950 dark:text-white text-center">More Free Tools for Every Task</h3>
              <div className="grid md:grid-cols-3 gap-5">
                {[
                  { icon: Briefcase,  color: "bg-green-50 dark:bg-green-950/40 text-green-600",  title: "Free Resume Builder 2026",  href: "/tools/resume-maker",    body: "Build ATS-optimized resumes with templates proven to bypass recruitment filters. Export PDF instantly. No login." },
                  { icon: Search,     color: "bg-blue-50 dark:bg-blue-950/40 text-blue-600",     title: "Free Age Calculator Online", href: "/tools/age-calculator",  body: "Calculate your exact age in years, months and days instantly. Used for job applications, legal documents and more." },
                  { icon: Languages,  color: "bg-amber-50 dark:bg-amber-950/40 text-amber-600",  title: "Free Grammar Checker",      href: "/tools/grammar-checker", body: "Check and fix grammar, spelling and punctuation errors in any text. Instant results. No account required." },
                ].map(({ icon: Icon, color, title, body, href }) => (
                  <Link key={title} href={href}
                    className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 hover:border-violet-200 dark:hover:border-violet-800 hover:shadow-md transition-all text-center group">
                    <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center mx-auto mb-4`} aria-hidden="true">
                      <Icon className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <h4 className="font-black text-gray-950 dark:text-white text-sm mb-2 group-hover:text-violet-600 transition-colors">{title}</h4>
                    <p className="text-xs leading-relaxed text-gray-500 mb-3">{body}</p>
                    <span className="text-xs font-bold text-violet-600 flex items-center justify-center gap-1">Use Free <ArrowRight className="w-3 h-3" aria-hidden="true" /></span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Mission */}
            <div className="space-y-5 max-w-3xl mx-auto text-center">
              <h3 className="text-2xl font-black text-gray-950 dark:text-white">Why TaskGuru Stays Free</h3>
              <p className="text-sm leading-relaxed">
                The internet was built to be open. Subscription fatigue has locked basic tools behind paywalls.
                TaskGuru&apos;s mission is to keep professional-grade tools permanently free and accessible to
                everyone — students, freelancers, professionals, and businesses worldwide.
              </p>
              <p className="text-sm leading-relaxed">
                Our{" "}
                <strong className="text-gray-800 dark:text-gray-200">zero-storage architecture</strong>{" "}
                means your files are processed in your browser and deleted immediately. We never store your
                data to sell to advertisers or train AI models without consent.
              </p>
              <Link href="#tools"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-2xl bg-violet-600 hover:bg-violet-700 text-white font-black text-sm transition-all shadow-lg shadow-violet-600/20 mt-2">
                Start Using Free Tools <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>

          </div>
        </article>
      </section>

      {/* ══════════════════════════════════════════
          ❓ FAQ — People Also Ask / AEO
      ══════════════════════════════════════════ */}
      <section aria-label="Frequently asked questions" className="py-20 bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="text-center mb-12">
            <p className="text-[11px] font-black uppercase tracking-[0.14em] text-violet-600 mb-3">FAQ</p>
            <h2 className="text-3xl font-black text-gray-950 dark:text-white tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-500 text-sm mt-3 leading-relaxed">
              Everything you need to know about TaskGuru&apos;s free tools.
            </p>
          </div>
          <div className="space-y-3">
            {FAQ_ITEMS.map((item, i) => (
              <div key={i}
                className="border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden bg-gray-50 dark:bg-gray-900"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left focus:outline-none focus:ring-2 focus:ring-violet-400/30 focus:ring-inset"
                  aria-expanded={openFaq === i}
                  aria-controls={`faq-answer-${i}`}
                  id={`faq-question-${i}`}
                >
                  <span className="font-black text-gray-900 dark:text-white text-sm pr-4">{item.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-200 ${openFaq === i ? "rotate-180 text-violet-600" : ""}`}
                    aria-hidden="true"
                  />
                </button>
                {openFaq === i && (
                  <div
                    id={`faq-answer-${i}`}
                    role="region"
                    aria-labelledby={`faq-question-${i}`}
                    className="px-5 pb-5"
                  >
                    <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed border-t border-gray-100 dark:border-gray-800 pt-4">
                      {item.a}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          📬 NEWSLETTER
      ══════════════════════════════════════════ */}
      <section aria-label="Newsletter signup" className="py-24 bg-gray-950 dark:bg-black rounded-[2rem] md:rounded-[3rem] mx-4 md:mx-6 mb-24 shadow-2xl">
        <div className="container mx-auto px-6 text-center">
          <p className="text-[11px] font-black uppercase tracking-[0.14em] text-violet-400 mb-4">Stay in the Loop</p>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
            Elevate Your Workflow for Free
          </h2>
          <p className="text-base mb-10 text-gray-400 max-w-xl mx-auto leading-relaxed">
            Get notified when we launch new free AI tools or productivity updates. No spam. Unsubscribe anytime.
          </p>
          <NewsletterForm />
          <p className="mt-8 text-[10px] font-black uppercase tracking-[0.3em] text-gray-600">
            Free forever · Privacy Protected · Global Standard
          </p>
        </div>
      </section>

    </>
  );
                }
