"use client";

import Link from "next/link";
import { tools } from "@/lib/tools";
import {
  ArrowRight, ShieldCheck, Zap, Globe, CheckCircle2,
  FileText, ImageIcon, PencilLine, Briefcase, Search,
  Languages, Cpu, Lock, Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import NewsletterForm from "@/components/NewsletterForm";
import { useMemo, useState } from "react";

const ALL_POSTS = [
  { slug: "how-to-paraphrase-text",                       title: "How to Paraphrase Text (Without Plagiarism)",         summary: "5 proven techniques to rewrite sentences, avoid plagiarism, and improve your writing instantly.",              category: "Writing Skills",       color: "text-green-600"  },
  { slug: "what-is-ocr-image-to-text",                    title: "What is OCR? How Image to Text Technology Works",     summary: "A plain-English guide to Optical Character Recognition — how it works and how to use it free.",               category: "Tech Explained",       color: "text-purple-600" },
  { slug: "how-to-compress-images-without-losing-quality",title: "How to Compress Images Without Losing Quality",      summary: "Step-by-step guide to compressing JPG, PNG, and WebP images for faster websites.",                           category: "Image Optimization",   color: "text-blue-600"   },
  { slug: "how-to-convert-pdf-to-word-free",              title: "How to Convert PDF to Word for Free",                 summary: "No software, no sign-up, no upload. Convert any PDF to editable Word in seconds.",                           category: "PDF Tools",            color: "text-orange-600" },
  { slug: "what-is-a-qr-code",                            title: "What is a QR Code and How Does It Work?",            summary: "Everything about QR codes — history, anatomy, types, use cases, and how to create one free.",                category: "Tech Explained",       color: "text-red-600"    },
  { slug: "how-to-make-resume-with-no-experience",        title: "How to Make a Resume With No Experience",            summary: "Complete guide for students and fresh graduates — what to include instead of work experience.",              category: "Career Hacking",       color: "text-purple-600" },
  { slug: "resume-ats-secrets",                           title: "5 Hidden Keywords That ATS Scanners Look For",       summary: "Stop getting auto-rejected. Learn the exact keywords that get your resume past filters.",                     category: "Career Hacking",       color: "text-purple-600" },
  { slug: "extract-text-scanned-pdf",                     title: "How to Extract Text from a Scanned PDF for Free",    summary: "Can't copy text from a scanned PDF? Here's the easiest fix — free, no software, 30 seconds.",                category: "PDF Tools",            color: "text-orange-600" },
  { slug: "local-first-web-apps-trend-2026",              title: "The Rise of Local-First Web Apps in 2026",           summary: "How WebAssembly and Edge computing are killing expensive cloud subscriptions.",                              category: "Tech Trends",          color: "text-teal-600"   },
  { slug: "image-compression-guide",                      title: "JPG vs WebP: Which Format Boosts Your SEO Score?",  summary: "We tested JPG, PNG, and WebP to find which creates the fastest Core Web Vitals scores.",                      category: "SEO Masterclass",      color: "text-green-600"  },
];

function getRandomPosts(count: number) {
  return [...ALL_POSTS].sort(() => Math.random() - 0.5).slice(0, count);
}

const CATEGORIES = [
  { key: "all",        label: "All Tools"  },
  { key: "ai",         label: "AI Writing" },
  { key: "pdf",        label: "PDF"        },
  { key: "image",      label: "Image"      },
  { key: "utility",    label: "Utility"    },
  { key: "calculator", label: "Calculator" },
];

const HERO_CHIPS = [
  { icon: FileText,   label: "PDF to Word",    sub: "Free",      href: "/tools/pdf-to-word",         cls: "bg-orange-50 dark:bg-orange-950/40 text-orange-500" },
  { icon: ImageIcon,  label: "BG Remover",     sub: "AI · Free", href: "/tools/background-remover",  cls: "bg-violet-50 dark:bg-violet-950/40 text-violet-600" },
  { icon: PencilLine, label: "AI Paraphraser", sub: "Free",      href: "/tools/text-paraphraser",    cls: "bg-blue-50 dark:bg-blue-950/40 text-blue-600"       },
  { icon: Briefcase,  label: "Resume Builder", sub: "ATS · Free",href: "/tools/resume-maker",        cls: "bg-green-50 dark:bg-green-950/40 text-green-600"    },
  { icon: ImageIcon,  label: "Compress Image", sub: "Free",      href: "/tools/image-compressor",    cls: "bg-pink-50 dark:bg-pink-950/40 text-pink-600"       },
  { icon: FileText,   label: "Merge PDF",      sub: "Free",      href: "/tools/merge-pdf",           cls: "bg-amber-50 dark:bg-amber-950/40 text-amber-600"    },
];

export default function Home() {
  const featuredPosts = useMemo(() => getRandomPosts(3), []);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredTools = useMemo(() => tools.filter((t) => {
    const matchCat = activeCategory === "all" || t.category === activeCategory;
    const matchQ   = t.title.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchQ;
  }), [search, activeCategory]);

  return (
    <>

      {/* ══════════════════════════════════════════
          🚀 HERO — Premium Light
      ══════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-white dark:bg-gray-950 min-h-[94vh] flex flex-col items-center justify-center text-center px-6 py-28">

        {/* Corner accents */}
        <div className="absolute top-0 right-0 w-[380px] h-[380px] bg-gradient-to-bl from-violet-100 to-transparent dark:from-violet-950/40 dark:to-transparent pointer-events-none"
          style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }} />
        <div className="absolute bottom-0 left-0 w-[260px] h-[260px] bg-gradient-to-tr from-amber-50 to-transparent dark:from-amber-950/20 dark:to-transparent pointer-events-none"
          style={{ clipPath: "polygon(0 100%, 0 0, 100% 100%)" }} />
        {/* Dot grid */}
        <div className="absolute inset-0 opacity-[0.035] dark:opacity-[0.06] pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle, #6d28d9 1px, transparent 1px)", backgroundSize: "28px 28px" }} />

        <div className="relative z-10 max-w-3xl w-full flex flex-col items-center">

          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-50 dark:bg-violet-950/60 border border-violet-200 dark:border-violet-800 text-violet-700 dark:text-violet-300 text-[11px] font-black tracking-[0.08em] uppercase mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
            {tools.length}+ Tools · Zero Subscriptions · No Login
          </div>

          {/* H1 — SEO: primary keyword in first 6 words */}
          <h1 className="text-5xl md:text-6xl lg:text-[72px] font-black text-gray-950 dark:text-white leading-[1.03] tracking-[-0.04em] mb-5">
            Free Online Tools —<br />
            No Login,{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-violet-600 to-indigo-500 bg-clip-text text-transparent">No Catch.</span>
              <span className="absolute -bottom-1 left-0 right-0 h-[5px] bg-amber-400 rounded-full" />
            </span>
          </h1>

          <p className="text-base md:text-lg text-gray-500 dark:text-gray-400 max-w-xl leading-relaxed font-medium mb-9">
            Free PDF converter, AI writer, background remover, image compressor and resume builder —
            open any tool and start in seconds. No account. No watermark. No subscription. Ever.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12 w-full max-w-sm sm:max-w-none">
            <Button size="lg" asChild className="bg-gray-950 hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-100 dark:text-gray-950 text-white font-black text-sm px-8 h-12 rounded-2xl shadow-md hover:shadow-lg transition-all border-0 w-full sm:w-auto">
              <Link href="#tools"><Zap className="w-4 h-4 mr-2" />Explore All Free Tools</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 font-bold text-sm px-8 h-12 rounded-2xl transition-all w-full sm:w-auto">
              <Link href="/blog">Read Free Guides <ArrowRight className="w-4 h-4 ml-2" /></Link>
            </Button>
          </div>

          {/* Quick-access chips */}
          <p className="text-[10px] font-black uppercase tracking-[0.14em] text-gray-400 mb-3">Jump straight into a free tool</p>
          <div className="flex flex-wrap justify-center gap-2">
            {HERO_CHIPS.map(({ icon: Icon, label, sub, href, cls }) => (
              <Link key={label} href={href}
                className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-sm hover:border-violet-400 hover:shadow-md hover:-translate-y-0.5 transition-all">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${cls}`}>
                  <Icon className="w-4 h-4" />
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
        <div className="relative z-10 mt-14 flex flex-wrap justify-center gap-x-8 gap-y-3">
          {[
            { icon: ShieldCheck,  label: "Zero Data Stored"   },
            { icon: Zap,          label: "Instant Results"    },
            { icon: Globe,        label: "Works Worldwide"    },
            { icon: CheckCircle2, label: "No Sign-Up Ever"    },
            { icon: Lock,         label: "100% Private"       },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-1.5 text-xs font-semibold text-gray-400 dark:text-gray-500">
              <Icon className="w-3.5 h-3.5 text-violet-500" />
              {label}
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          📊 STATS BAR
      ══════════════════════════════════════════ */}
      <section className="border-y border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/30">
        <div className="container mx-auto px-6 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: `${tools.length}+`, label: "Free Tools"         },
              { value: "0",               label: "Sign-ups Required"  },
              { value: "100%",            label: "Always Free"        },
              { value: "0 KB",            label: "Data Stored"        },
            ].map(({ value, label }) => (
              <div key={label}>
                <p className="text-3xl font-black text-gray-950 dark:text-white tracking-tight">{value}</p>
                <p className="text-xs text-gray-400 font-semibold mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          📱 APP DOWNLOAD BANNER
      ══════════════════════════════════════════ */}
      <section className="py-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full text-white/90 text-xs font-bold mb-3 backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse inline-block" />
                Now Available on Mobile
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-white leading-tight">
                Pro Resume Maker & CV Builder
              </h2>
              <p className="text-white/80 text-sm mt-1 font-medium">
                Build ATS-friendly resumes on your phone · 9 Professional Templates · Free
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
              <a href="https://indusapp.store/d6vxlznp" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 px-5 py-3 bg-white rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all min-w-[180px]">
                <div className="w-9 h-9 bg-gradient-to-br from-orange-500 to-pink-500 rounded-xl flex items-center justify-center shrink-0">
                  <span className="text-white font-black text-sm">IN</span>
                </div>
                <div className="text-left">
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider leading-none font-bold">Download on</p>
                  <p className="text-sm font-black text-gray-900 leading-tight">Indus App Store</p>
                </div>
              </a>
              <div className="relative flex items-center gap-3 px-5 py-3 bg-white/10 border border-white/20 rounded-2xl min-w-[180px] cursor-not-allowed backdrop-blur-sm">
                <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-2.5 py-0.5 bg-yellow-400 text-yellow-900 text-[9px] font-black uppercase tracking-widest rounded-full whitespace-nowrap shadow">Coming Soon</span>
                <div className="w-9 h-9 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none"><path d="M3 3.5L13.5 12L3 20.5V3.5Z" fill="white" fillOpacity="0.5"/></svg>
                </div>
                <div className="text-left">
                  <p className="text-[10px] text-white/50 uppercase tracking-wider leading-none font-bold">Get it on</p>
                  <p className="text-sm font-black text-white/60 leading-tight">Google Play</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          📰 BLOG SECTION
      ══════════════════════════════════════════ */}
      <section className="py-14 bg-white dark:bg-gray-950 border-b border-gray-100 dark:border-gray-800">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-end mb-8">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.14em] text-violet-600 mb-2">Free Guides & Tutorials</p>
              <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
                Latest Digital Insights
              </h2>
              <p className="text-gray-500 mt-1 text-sm font-medium">Expert guides on productivity, PDF tools and career growth.</p>
            </div>
            <Link href="/blog" className="hidden md:flex items-center text-primary font-bold hover:underline text-sm">
              View All Articles <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {featuredPosts.map((post) => (
              <Link href={`/blog/${post.slug}`} key={post.slug} className="group">
                <article className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 hover:border-violet-200 dark:hover:border-violet-800 hover:shadow-lg transition-all h-full flex flex-col justify-between">
                  <div>
                    <span className={`text-[10px] font-black uppercase tracking-wider ${post.color}`}>{post.category}</span>
                    <h3 className="mt-2 text-base font-black text-gray-900 dark:text-white group-hover:text-primary transition-colors leading-snug">{post.title}</h3>
                    <p className="mt-2 text-gray-500 text-xs leading-relaxed">{post.summary}</p>
                  </div>
                  <div className="mt-4 flex items-center text-xs font-bold text-gray-900 dark:text-white">
                    Read Free Guide <ArrowRight className="ml-1.5 w-3.5 h-3.5" />
                  </div>
                </article>
              </Link>
            ))}
          </div>
          <div className="mt-6 text-center md:hidden">
            <Link href="/blog" className="text-primary font-bold text-sm hover:underline">View All Articles →</Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          🛠️ TOOLS GRID — Premium Redesign
      ══════════════════════════════════════════ */}
      <section id="tools" className="py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 md:px-6">

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.14em] text-violet-600 mb-2">All Free · No Login · Instant</p>
              <h2 className="text-2xl md:text-3xl font-black tracking-tight text-gray-900 dark:text-white">
                Free Online Tools
              </h2>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 font-medium">
                {tools.length} tools · Works in your browser · Zero signup
              </p>
            </div>
            <Link href="/tools"
              className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-violet-300 dark:border-violet-700 text-violet-700 dark:text-violet-300 font-bold text-sm hover:bg-violet-50 dark:hover:bg-violet-950/40 transition-all">
              Browse All Tools <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Search */}
          <div className="relative mb-4 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search free tools..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-400/30 focus:border-violet-400 transition-all"
            />
          </div>

          {/* Category tabs */}
          <div className="flex gap-2 overflow-x-auto pb-1 mb-4 scrollbar-hide">
            {CATEGORIES.map((cat) => (
              <button key={cat.key} onClick={() => setActiveCategory(cat.key)}
                className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-bold border transition-all ${
                  activeCategory === cat.key
                    ? "bg-gray-950 dark:bg-white text-white dark:text-gray-950 border-gray-950 dark:border-white shadow-sm"
                    : "bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:border-violet-400 hover:text-violet-600 dark:hover:text-violet-400"
                }`}>
                {cat.label}
              </button>
            ))}
          </div>

          {/* Results count */}
          <p className="text-xs text-gray-400 mb-5 font-medium">
            Showing <span className="font-black text-gray-900 dark:text-white">{filteredTools.length}</span> free tool{filteredTools.length !== 1 ? "s" : ""}
          </p>

          {/* Grid */}
          {filteredTools.length > 0 ? (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-3">
              {filteredTools.map((tool) => (
                <Link href={`/tools/${tool.slug}`} key={tool.slug}
                  className="group flex flex-col items-center justify-center gap-2 p-3 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 hover:border-violet-400 dark:hover:border-violet-600 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 text-center min-h-[88px]">
                  <div className="w-9 h-9 rounded-xl bg-violet-50 dark:bg-violet-950/40 group-hover:bg-violet-100 dark:group-hover:bg-violet-900/40 flex items-center justify-center transition-colors shrink-0">
                    <tool.icon className="w-5 h-5 text-violet-600 dark:text-violet-400" />
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-semibold text-gray-700 dark:text-gray-300 leading-tight line-clamp-2">
                    {tool.title
                      .replace("Free ", "").replace(" Online", "")
                      .replace(" (No Upload)", "").replace(" — ", " ")
                      .split("—")[0].trim()}
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-gray-400">
              <p className="text-4xl mb-3">🔍</p>
              <p className="font-semibold text-sm">No tools found for &quot;{search}&quot;</p>
              <button onClick={() => { setSearch(""); setActiveCategory("all"); }}
                className="mt-4 text-violet-600 text-sm font-bold hover:underline">
                Clear filters
              </button>
            </div>
          )}

          {/* Mobile view all */}
          <div className="mt-8 text-center">
            <Link href="/tools"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gray-950 dark:bg-white text-white dark:text-gray-950 font-bold text-sm hover:opacity-90 transition-all shadow-md">
              View All {tools.length} Free Tools <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          ✨ WHY TASKGURU — 3-column value props
      ══════════════════════════════════════════ */}
      <section className="border-y border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/30 py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-[11px] font-black uppercase tracking-[0.14em] text-violet-600 mb-3">Why TaskGuru</p>
            <h2 className="text-3xl font-black text-gray-950 dark:text-white tracking-tight">
              Built Different. Not Just Another Tools Site.
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: ShieldCheck, color: "text-violet-600 bg-violet-50 dark:bg-violet-950/40", title: "Zero-Storage Architecture",  body: "Your files are processed in your browser and deleted instantly. We never store, sell, or share your data — not even temporarily." },
              { icon: Zap,         color: "text-amber-600 bg-amber-50 dark:bg-amber-950/40",    title: "Instant Browser Processing",  body: "No server queues. No upload delays. Tools run locally in your browser so results are instant regardless of your location." },
              { icon: Globe,       color: "text-blue-600 bg-blue-50 dark:bg-blue-950/40",       title: "Works Everywhere, Always",    body: "All 40+ tools work on any device, any browser, anywhere in the world. No app download. No region restrictions." },
              { icon: CheckCircle2,color: "text-green-600 bg-green-50 dark:bg-green-950/40",    title: "No Login. No Paywall. Ever.", body: "Every tool is permanently free. No freemium bait. No credit card required. Open a tool and use it — that's it." },
              { icon: Lock,        color: "text-pink-600 bg-pink-50 dark:bg-pink-950/40",       title: "No Ads in Your Tools",        body: "We keep the tool experience clean. Ads only appear outside the tool interface — never interrupting your workflow." },
              { icon: Star,        color: "text-indigo-600 bg-indigo-50 dark:bg-indigo-950/40", title: "Always Up to Date",           body: "We continuously update tools with the latest AI models and processing libraries. You always get the newest version — free." },
            ].map(({ icon: Icon, color, title, body }) => (
              <div key={title} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 hover:border-violet-200 dark:hover:border-violet-800 hover:shadow-md transition-all">
                <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center mb-4`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-black text-gray-950 dark:text-white text-sm mb-2">{title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          📝 SEO CONTENT — AEO/GEO optimised
      ══════════════════════════════════════════ */}
      <section className="py-20 bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800">
        <article className="container mx-auto px-6 max-w-5xl">
          <div className="space-y-20 text-gray-600 dark:text-gray-400 font-medium">

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
                TaskGuru is a free productivity platform with {tools.length}+ browser-based tools covering PDF conversion,
                AI writing, image editing, resume building and more. Every tool is permanently free, requires no account
                and stores zero user data.
              </p>
            </header>

            {/* PDF */}
            <div className="space-y-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-950/40 flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5 text-orange-500" />
                </div>
                <h3 className="text-2xl font-black text-gray-950 dark:text-white">Free PDF Tools — Convert, Merge, Split</h3>
              </div>
              <p className="text-sm leading-relaxed">
                PDF management is one of the most searched categories online. Whether you need a
                <strong className="text-gray-800 dark:text-gray-200"> free PDF to Word converter</strong>,
                a <strong className="text-gray-800 dark:text-gray-200">free PDF merger</strong> or a
                <strong className="text-gray-800 dark:text-gray-200"> free image to PDF tool</strong>, TaskGuru
                covers every PDF use case — no software download, no upload limit, no watermark.
              </p>
              <div className="grid md:grid-cols-3 gap-5">
                {[
                  { title: "Free PDF to Word",   body: "Advanced layout reconstruction converts PDFs to fully editable Word documents. No formatting loss. No email required." },
                  { title: "Free Merge PDF",      body: "Combine unlimited PDF files instantly. Drag, drop and merge — no file size limit, no watermark, no login." },
                  { title: "Free Image to PDF",   body: "Convert JPG, PNG or WebP images into a high-quality PDF portfolio in seconds. Batch convert multiple images at once." },
                ].map(({ title, body }) => (
                  <div key={title} className="bg-gray-50 dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800">
                    <h4 className="font-black text-gray-950 dark:text-white text-sm mb-2">{title}</h4>
                    <p className="text-xs leading-relaxed">{body}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Writing */}
            <div className="bg-gray-950 dark:bg-gray-900 p-8 md:p-12 rounded-3xl border border-gray-800">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-violet-950/60 flex items-center justify-center shrink-0">
                  <Cpu className="w-5 h-5 text-violet-400" />
                </div>
                <h3 className="text-2xl font-black text-white">Free AI Writing Tools</h3>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-8">
                AI writing tools that were once enterprise-only are now free on TaskGuru. Our
                <strong className="text-white"> free AI paraphraser</strong> and
                <strong className="text-white"> free OCR image-to-text</strong> tool use
                context-aware models to deliver human-readable, accurate output instantly.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { title: "Free AI Paraphraser & Text Rewriter", body: "Rewrite essays, articles and social posts while maintaining original meaning. Ideal for students, bloggers and SEO professionals. No word limit. No login." },
                  { title: "Free OCR — Image to Text",            body: "Extract text from any image, scanned PDF or screenshot with high accuracy. Supports multiple languages. Results in seconds — no upload, no account." },
                ].map(({ title, body }) => (
                  <div key={title} className="bg-white/5 p-6 rounded-2xl border border-white/10">
                    <h4 className="font-bold text-white text-sm mb-2">{title}</h4>
                    <p className="text-gray-400 text-xs leading-relaxed">{body}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Image */}
            <div className="space-y-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-pink-50 dark:bg-pink-950/40 flex items-center justify-center shrink-0">
                  <ImageIcon className="w-5 h-5 text-pink-500" />
                </div>
                <h3 className="text-2xl font-black text-gray-950 dark:text-white">Free Image Editing Tools</h3>
              </div>
              <p className="text-sm leading-relaxed">
                Professional image editing used to cost hundreds of dollars. TaskGuru's
                <strong className="text-gray-800 dark:text-gray-200"> free background remover</strong> uses
                AI edge detection to remove backgrounds in one click — no manual masking. The
                <strong className="text-gray-800 dark:text-gray-200"> free image compressor</strong> reduces
                file size by up to 90% without visible quality loss, supporting JPG, PNG and WebP.
              </p>
              <div className="grid md:grid-cols-2 gap-5">
                {[
                  { title: "Free AI Background Remover", body: "Remove any background automatically using AI edge detection. One click — no selection tools, no masking, no Photoshop subscription." },
                  { title: "Free Image Compressor",       body: "Compress JPG, PNG and WebP images by up to 90% without losing visible quality. Perfect for websites, social media and email attachments." },
                ].map(({ title, body }) => (
                  <div key={title} className="bg-gray-50 dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800">
                    <h4 className="font-black text-gray-950 dark:text-white text-sm mb-2">{title}</h4>
                    <p className="text-xs leading-relaxed">{body}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Niche tools */}
            <div className="space-y-8">
              <h3 className="text-2xl font-black text-gray-950 dark:text-white text-center">More Free Tools for Every Task</h3>
              <div className="grid md:grid-cols-3 gap-5">
                {[
                  { icon: Briefcase, color: "bg-green-50 dark:bg-green-950/40 text-green-600", title: "Free Resume Builder 2026",  body: "Build ATS-optimized resumes with templates proven to bypass recruitment filters. Export PDF instantly. No login." },
                  { icon: Search,    color: "bg-blue-50 dark:bg-blue-950/40 text-blue-600",    title: "Free Age Calculator Online", body: "Calculate your exact age in years, months and days instantly. Used for job applications, legal documents and more." },
                  { icon: Languages, color: "bg-amber-50 dark:bg-amber-950/40 text-amber-600", title: "Free Grammar Checker",      body: "Check and fix grammar, spelling and punctuation errors in any text. Instant results. No account required." },
                ].map(({ icon: Icon, color, title, body }) => (
                  <div key={title} className="bg-gray-50 dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 text-center">
                    <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center mx-auto mb-4`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="font-black text-gray-950 dark:text-white text-sm mb-2">{title}</h4>
                    <p className="text-xs leading-relaxed">{body}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Mission */}
            <div className="space-y-5 max-w-3xl mx-auto text-center">
              <h3 className="text-2xl font-black text-gray-950 dark:text-white">Why TaskGuru Stays Free</h3>
              <p className="text-sm leading-relaxed">
                The internet was built to be open. Subscription fatigue has locked basic tools behind paywalls.
                TaskGuru's mission is to keep professional-grade tools permanently free and accessible to everyone —
                students, freelancers, professionals and businesses worldwide.
              </p>
              <p className="text-sm leading-relaxed">
                Our <strong className="text-gray-800 dark:text-gray-200">zero-storage architecture</strong> means
                your files are processed in your browser and deleted immediately. We never store your data to sell
                to advertisers or train AI models without consent. When you use our free PDF to Word converter or
                free background remover, your privacy is absolute.
              </p>
            </div>

            {/* Keyword cloud — AEO signal */}
            <div className="bg-gray-50 dark:bg-gray-900 p-8 md:p-10 rounded-3xl border border-gray-100 dark:border-gray-800 text-center">
              <h3 className="text-lg font-black text-gray-950 dark:text-white mb-6">What People Search for on TaskGuru</h3>
              <div className="flex flex-wrap justify-center gap-3">
                {[
                  "Free PDF to Word No Email",       "Free Background Remover AI",
                  "Best Free AI Paraphraser 2026",   "Free Online Image to Text OCR",
                  "Free Bulk Image Compressor",       "Free Resume Builder No Login",
                  "Free Merge PDF No Watermark",      "Free JPG to PDF Converter",
                  "Free Age Calculator Online",       "Free Text Rewriter AI",
                  "Free WebP to JPG",                 "Extract Text Scanned PDF Free",
                  "Compress Image Without Losing Quality", "Free Grammar Checker Online",
                  "ATS Resume Builder Free 2026",     "Free QR Code Generator",
                ].map((kw) => (
                  <span key={kw} className="px-4 py-2 bg-white dark:bg-gray-800 rounded-full text-xs font-bold border border-violet-100 dark:border-violet-900 text-violet-700 dark:text-violet-300 shadow-sm">
                    {kw}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </article>
      </section>

      {/* ══════════════════════════════════════════
          📬 NEWSLETTER
      ══════════════════════════════════════════ */}
      <section className="py-24 bg-gray-950 dark:bg-black rounded-[2rem] md:rounded-[3rem] mx-4 md:mx-6 mb-24 shadow-2xl">
        <div className="container mx-auto px-6 text-center">
          <p className="text-[11px] font-black uppercase tracking-[0.14em] text-violet-400 mb-4">Stay in the Loop</p>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">Elevate Your Workflow for Free</h2>
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
