import { Metadata } from "next";
import Link from "next/link";
import { tools } from "@/lib/tools";
import {
  ArrowRight, ShieldCheck, Zap, Sparkles,
  Lock, Users, Info, Globe, Star, TrendingUp,
  Cpu, Layers, RefreshCw, Search,
} from "lucide-react";
import Script from "next/script";

// ─── SEO Metadata ───────────────────────────────────────────────────
export const metadata: Metadata = {
  title: "Free Online Tools — PDF Converter, AI Paraphraser, Image Compressor | TaskGuru",
  description: `Access ${tools.length}+ free online tools including PDF to Word converter, free AI paraphraser, image background remover, OCR image to text, ATS resume builder, and more. No signup, no watermark, 100% private and free forever.`,
  alternates: { canonical: "https://www.taskguru.online/tools" },
  keywords: [
    "free online tools", "free pdf converter", "free ai paraphraser", "free image compressor",
    "free background remover", "free ocr tool", "free resume builder", "free pdf to word",
    "free merge pdf", "free word counter", "free grammar checker", "free qr code generator",
    "free typing speed test", "free pomodoro timer", "free invoice generator",
    "free tools no signup", "free tools no watermark", "free tools 100% private",
  ],
  openGraph: {
    title: "Free Online Tools — PDF, AI Writing, Image & More | TaskGuru",
    description: `${tools.length}+ free tools. No signup, no watermark, 100% private. Convert PDFs, compress images, paraphrase text, build resumes and more.`,
    type: "website",
    url: "https://www.taskguru.online/tools",
  },
};

// ─── Schema ─────────────────────────────────────────────────────────
const toolsPageSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Free Online Tools — TaskGuru",
  "description": `${tools.length}+ free online tools including PDF converter, AI paraphraser, image compressor, and more. No signup required.`,
  "url": "https://www.taskguru.online/tools",
  "publisher": {
    "@type": "Organization",
    "name": "TaskGuru",
    "url": "https://www.taskguru.online",
    "logo": "https://www.taskguru.online/logo.png",
  },
};

// ─── Category metadata ───────────────────────────────────────────────
const CATEGORY_META: Record<string, {
  label: string;
  seoTitle: string;
  desc: string;
  longDesc: string;
}> = {
  ai: {
    label: "AI & Writing Tools",
    seoTitle: "Free AI Writing Tools — Paraphraser, Content Detector, OCR",
    desc: "Powered by machine learning — rewrite, detect AI content, and extract text in seconds",
    longDesc: "Our free AI writing tools help students, bloggers, and professionals create better content faster. From the free AI paraphrasing tool that rewrites any text without word limits, to the free AI content detector that checks if text was written by ChatGPT or Gemini — these tools are used by thousands of writers daily with zero signup required.",
  },
  image: {
    label: "Free Image Tools",
    seoTitle: "Free Image Tools — Background Remover, Compressor, Image to PDF",
    desc: "Remove backgrounds, compress images, and convert photos — all in your browser",
    longDesc: "Professional image editing tools that run entirely in your browser. Our free AI background remover automatically detects subjects and removes backgrounds in one click. The free image compressor reduces JPG and PNG file sizes by up to 90% without visible quality loss — perfect for websites, email attachments, and social media.",
  },
  pdf: {
    label: "Free PDF Tools",
    seoTitle: "Free PDF Tools — Convert, Merge, Split, Compress, Sign & Edit PDF",
    desc: "Complete PDF suite — no Adobe Acrobat subscription needed",
    longDesc: "Everything you need to manage PDF files for free. Convert Word documents to PDF, merge multiple PDFs into one file, split large PDFs into separate pages, compress PDF file sizes for email, unlock password-protected PDFs, digitally sign documents, and edit PDF text — all without uploading to a server. Your files stay 100% private.",
  },
  utility: {
    label: "Free Utility Tools",
    seoTitle: "Free Utility Tools — Resume Maker, QR Generator, Grammar Checker & More",
    desc: "Everyday productivity tools to work smarter and faster",
    longDesc: "A collection of free productivity utilities that handle common daily tasks instantly. Build an ATS-friendly resume in minutes, generate custom QR codes for URLs and WiFi, check grammar and spelling errors, count words and characters, test your typing speed in WPM, track focus sessions with a Pomodoro timer, create professional invoices, and download YouTube thumbnails in HD — all free, no account needed.",
  },
  calculator: {
    label: "Free Calculators",
    seoTitle: "Free Online Calculators — Age, EMI, Metal Weight, Credit Card",
    desc: "Precision calculators for finance, engineering, and everyday decisions",
    longDesc: "Accurate calculators built for real-world use. Calculate your exact age in years, months, and days, compute loan EMI amounts for home or car loans, determine metal weight for industrial fabrication projects, and check credit card approval eligibility — all instantly, all free.",
  },
};

// ─── Category display order ──────────────────────────────────────────
const CATEGORY_ORDER = ["ai", "pdf", "image", "utility", "calculator"];

// ─── Helper: group tools by category ────────────────────────────────
function groupByCategory() {
  const grouped: Record<string, typeof tools> = {};
  CATEGORY_ORDER.forEach((cat) => { grouped[cat] = []; });
  tools.forEach((tool) => {
    const cat = tool.category || "utility";
    if (!grouped[cat]) grouped[cat] = [];
    grouped[cat].push(tool);
  });
  return grouped;
}

// ─── Helper: shorten tool title for compact display ──────────────────
function shortTitle(title: string) {
  return title
    .replace(/^Free\s+/i, "")
    .replace(/\s+Online$/i, "")
    .replace(/\s+\(No Upload.*?\)/i, "")
    .replace(/\s+—.*$/, "")
    .trim();
}

// ─── Stats ───────────────────────────────────────────────────────────
const stats = [
  { icon: <Users className="w-5 h-5" />, value: "10K+",          label: "Monthly Users"   },
  { icon: <Layers className="w-5 h-5" />, value: `${tools.length}+`, label: "Free Tools"  },
  { icon: <Globe className="w-5 h-5" />, value: "146+",           label: "Countries"       },
  { icon: <Star className="w-5 h-5" />,  value: "100%",           label: "Free Forever"    },
];

// ─── Why Choose ──────────────────────────────────────────────────────
const whyChoose = [
  {
    icon: <Lock className="w-6 h-6 text-green-600" />,
    title: "Zero-Storage Architecture",
    desc: "Your files are processed in temporary encrypted memory and deleted immediately after. We never store, log, or share your documents — ever. Safe for sensitive legal and financial files.",
  },
  {
    icon: <Zap className="w-6 h-6 text-yellow-500" />,
    title: "Edge Computing Speed",
    desc: "Built on Vercel's global Edge Network. Tools run on servers physically closest to you, delivering near-instant processing regardless of your location.",
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-blue-600" />,
    title: "No Account Required",
    desc: "Walk in, get your work done, walk out. No sign-up forms, no email verification, no password to remember. Just open the tool and start immediately.",
  },
  {
    icon: <Globe className="w-6 h-6 text-indigo-600" />,
    title: "Works on Any Device",
    desc: "All tools run directly in your browser — desktop, tablet, or mobile. Compatible with Chrome, Firefox, Safari, and Edge. No app download or software installation required.",
  },
  {
    icon: <Cpu className="w-6 h-6 text-purple-600" />,
    title: "AI-Powered Accuracy",
    desc: "Our AI tools use state-of-the-art machine learning models continuously updated with the latest research. OCR achieves 99%+ accuracy. Paraphrasing maintains full context and meaning.",
  },
  {
    icon: <RefreshCw className="w-6 h-6 text-teal-600" />,
    title: "Always Free, Always Updated",
    desc: "Funded by non-intrusive ads, TaskGuru remains permanently free. New tools are added regularly based on user feedback. No premium tier, no trial period, no credit card — ever.",
  },
];

// ─── Comparison ──────────────────────────────────────────────────────
const comparisons = [
  { feature: "100% Free Forever",          taskguru: true,  adobe: false, smallpdf: false },
  { feature: "No Account Required",        taskguru: true,  adobe: false, smallpdf: false },
  { feature: "No Watermarks on Output",    taskguru: true,  adobe: true,  smallpdf: false },
  { feature: "Privacy / No File Storage",  taskguru: true,  adobe: false, smallpdf: false },
  { feature: "Works on Mobile Browser",    taskguru: true,  adobe: true,  smallpdf: true  },
  { feature: "AI-Powered Tools",           taskguru: true,  adobe: true,  smallpdf: false },
  { feature: "Unlimited Usage",            taskguru: true,  adobe: false, smallpdf: false },
  { feature: "No File Size Limits",        taskguru: true,  adobe: false, smallpdf: false },
];

// ─── FAQs ────────────────────────────────────────────────────────────
const faqs = [
  {
    q: "Is TaskGuru really 100% free with no hidden costs?",
    a: "Yes, completely. TaskGuru is funded by non-intrusive Google AdSense advertisements. There are no premium tiers, no file size limits behind a paywall, no watermarks, and no credit card ever required. Every one of our 30+ tools is fully free, forever.",
  },
  {
    q: "Are my uploaded files safe and private on TaskGuru?",
    a: "Absolutely. TaskGuru uses a Zero-Storage Architecture — your files exist only in temporary encrypted RAM during processing. The moment your result is ready, the file is permanently deleted. We never store, analyze, or share your documents with any third party.",
  },
  {
    q: "Do I need to create an account to use any TaskGuru tool?",
    a: `No account needed whatsoever. All ${tools.length}+ tools on TaskGuru work instantly without any sign-up, login, or email verification. Just open the tool and start working immediately — no friction.`,
  },
  {
    q: "Which devices and browsers are supported?",
    a: "TaskGuru works on all modern devices — desktop, laptop, tablet, and mobile. It's compatible with Chrome, Firefox, Safari, and Edge on both Windows and macOS. No app download, no software installation, no OS restrictions.",
  },
  {
    q: "How accurate is the free AI paraphrasing tool?",
    a: "TaskGuru's free AI paraphraser uses context-aware language models that understand the full meaning of your text before rewriting. Unlike basic synonym-swappers, it restructures sentences to produce natural, human-sounding output while preserving the original meaning. After paraphrasing, you can verify the result with our free AI content detector.",
  },
  {
    q: "How accurate is the free OCR image to text tool?",
    a: "Our free OCR tool achieves 99%+ accuracy on clean, high-resolution scans. It supports 50+ languages and works on typed text in JPG, PNG, and PDF formats. Handwritten text accuracy depends on legibility but generally performs well on clear, printed handwriting.",
  },
  {
    q: "Can I use TaskGuru tools for commercial projects?",
    a: "Yes. There are no restrictions on how you use the output from our tools. You can use converted PDFs, compressed images, paraphrased text, generated QR codes, or created invoices for personal, academic, or commercial purposes without attribution.",
  },
  {
    q: "What makes TaskGuru different from iLovePDF, Smallpdf, or Adobe?",
    a: "Three things: it's genuinely free (no word limits, no file limits, no subscription), it requires no account, and it never stores your files. Most competitors offer a free tier that expires or restricts you heavily, then push you toward a paid plan. TaskGuru has no paid plan — everything is free to everyone.",
  },
];

// ─── Page Component ──────────────────────────────────────────────────
export default function ToolsPage() {
  const grouped = groupByCategory();

  return (
    <>
      <Script
        id="tools-page-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolsPageSchema) }}
      />

      <main className="min-h-screen bg-white dark:bg-zinc-950 font-sans">

        {/* ═══ HERO ═══ */}
        <section className="relative pt-20 pb-20 px-6 text-center overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
            style={{ backgroundImage: `radial-gradient(circle, #6366f1 1px, transparent 1px)`, backgroundSize: "40px 40px" }}
          />
          <div className="relative max-w-5xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 rounded-full text-xs font-black uppercase mb-8 tracking-widest border border-indigo-100 dark:border-indigo-900">
              <Sparkles className="w-3.5 h-3.5" /> {tools.length}+ Free Tools · No Sign-Up · 100% Private
            </div>
            <h1 className="text-4xl md:text-7xl font-black text-zinc-900 dark:text-white tracking-tighter mb-6 leading-[1.05]">
              Every Free Online Tool <br />
              <span className="text-indigo-600">You'll Ever Need.</span>
            </h1>
            <p className="text-lg md:text-xl text-zinc-500 dark:text-zinc-400 max-w-3xl mx-auto leading-relaxed mb-10">
              {tools.length}+ professional-grade tools for PDF conversion, AI writing, image editing,
              productivity, and calculations. No downloads, no subscriptions, no accounts — just open
              and use instantly from any device, anywhere in the world.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              {stats.map((s) => (
                <div key={s.label} className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl p-4">
                  <div className="text-indigo-600 dark:text-indigo-400 flex justify-center mb-1">{s.icon}</div>
                  <p className="text-xl font-black text-zinc-900 dark:text-white">{s.value}</p>
                  <p className="text-xs text-zinc-500 uppercase tracking-wide font-bold">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 md:px-6 pb-24 space-y-20">

          {/* ═══ ALL TOOLS — GROUPED BY CATEGORY ═══ */}
          <section>
            <div className="space-y-16">
              {CATEGORY_ORDER.map((catKey) => {
                const catTools = grouped[catKey];
                if (!catTools || catTools.length === 0) return null;
                const meta = CATEGORY_META[catKey];

                return (
                  <div key={catKey} id={catKey}>

                    {/* Category header */}
                    <div className="mb-8">
                      <div className="flex items-center gap-4 mb-3">
                        <h2 className="text-xs font-black uppercase tracking-[0.25em] text-zinc-400">
                          {meta.label}
                        </h2>
                        <div className="h-[1px] flex-1 bg-zinc-100 dark:bg-zinc-800" />
                        <span className="text-xs font-bold text-zinc-400 shrink-0">
                          {catTools.length} tools
                        </span>
                      </div>
                      <h3 className="text-xl md:text-2xl font-black text-zinc-900 dark:text-white mb-2">
                        {meta.seoTitle}
                      </h3>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-3xl leading-relaxed">
                        {meta.longDesc}
                      </p>
                    </div>

                    {/* Tools grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
                      {catTools.map((tool) => (
                        <Link
                          key={tool.slug}
                          href={`/tools/${tool.slug}`}
                          className="group relative flex flex-col items-center gap-2.5 p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-lg hover:shadow-indigo-500/10 hover:-translate-y-0.5 transition-all duration-200 text-center"
                        >
                          {/* Icon */}
                          <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/40 flex items-center justify-center transition-colors shrink-0">
                            <tool.icon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                          </div>

                          {/* Short title */}
                          <span className="text-[11px] font-semibold text-zinc-700 dark:text-zinc-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 leading-tight line-clamp-2 transition-colors">
                            {shortTitle(tool.title)}
                          </span>

                          {/* Free badge */}
                          <span className="text-[9px] font-black text-green-600 bg-green-50 dark:bg-green-950/30 px-2 py-0.5 rounded-full uppercase tracking-wide">
                            Free
                          </span>
                        </Link>
                      ))}
                    </div>

                    {/* View all link for category */}
                    <div className="mt-5 flex items-center gap-3">
                      <div className="h-[1px] flex-1 bg-zinc-100 dark:bg-zinc-800" />
                      <span className="text-xs text-zinc-400 font-medium">
                        {catTools.length} {meta.label.toLowerCase()} available above
                      </span>
                      <div className="h-[1px] flex-1 bg-zinc-100 dark:bg-zinc-800" />
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ═══ SEO LONG-TAIL TOOL DESCRIPTIONS ═══ */}
          <section className="border-t border-zinc-100 dark:border-zinc-800 pt-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-zinc-900 dark:text-white tracking-tight mb-4">
                Most Popular Free Tools — Explained
              </h2>
              <p className="text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto">
                Detailed guides on our most-used tools to help you get the most out of TaskGuru.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {[
                {
                  title: "Free AI Paraphrasing Tool — No Word Limit",
                  href: "/tools/text-paraphraser",
                  desc: "Our free AI paraphraser rewrites any text instantly without word limits. Unlike QuillBot's free tier which caps you at 125 words, TaskGuru lets you paraphrase full essays, blog posts, and articles in one go. The AI understands full context — not just swapping synonyms — so the output sounds genuinely human. Used by students to rewrite research papers, bloggers to refresh old content, and marketers to create multiple variations of ad copy.",
                  badge: "Most Used",
                },
                {
                  title: "Free PDF to Word Converter — Preserves Formatting",
                  href: "/tools/pdf-to-word",
                  desc: "Convert any PDF to an editable Word document (.docx) for free. Our converter preserves tables, headings, images, fonts, and column layouts — not just raw text extraction. Works for scanned PDFs too, using built-in OCR. No Microsoft Office needed. Your file is processed in your browser and never uploaded to a server, making it safe for confidential contracts, legal documents, and medical reports.",
                  badge: null,
                },
                {
                  title: "Free Image Background Remover — AI-Powered",
                  href: "/tools/background-remover",
                  desc: "Remove backgrounds from any image in one click using neural networks. No manual selection, no masking, no Photoshop. The AI automatically detects the subject — person, product, pet, or object — and cleanly removes the background. Download a transparent PNG instantly. Used widely for e-commerce product photos, LinkedIn profile pictures, YouTube thumbnails, and presentation slides.",
                  badge: null,
                },
                {
                  title: "Free OCR — Image to Text Converter Online",
                  href: "/tools/image-to-text",
                  desc: "Extract text from any image, screenshot, or scanned document using free OCR technology. Supports JPG, PNG, and PDF inputs with 99%+ accuracy on clean scans. Works for typed text in 50+ languages. Perfect for copying text from textbook photos, extracting data from screenshots, digitizing printed documents, and reading text from images that can't be copied.",
                  badge: null,
                },
                {
                  title: "Free ATS Resume Builder — Download PDF Instantly",
                  href: "/tools/resume-maker",
                  desc: "Build a professional, ATS-friendly resume in minutes without signing up. ATS (Applicant Tracking System) software screens most resumes before a human reads them — our templates are specifically designed to pass these filters. Fill in your details, preview the result, and download a clean PDF with no watermark. Used by thousands of job seekers, fresh graduates, and career changers monthly.",
                  badge: null,
                },
                {
                  title: "Free Image Compressor — Reduce Size Without Quality Loss",
                  href: "/tools/image-compressor",
                  desc: "Compress JPG, PNG, and WebP images by up to 90% without noticeable quality loss. Critical for website performance — large images slow down page load times and hurt Core Web Vitals scores, directly affecting Google rankings. Our smart compression algorithm keeps visual quality while dramatically reducing file size. Perfect for web developers optimizing sites, bloggers reducing upload sizes, and anyone sharing images by email.",
                  badge: null,
                },
              ].map((item) => (
                <div key={item.href} className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl p-7 hover:border-indigo-200 dark:hover:border-indigo-800 transition-colors">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h3 className="font-black text-zinc-900 dark:text-white text-base leading-snug">{item.title}</h3>
                    {item.badge && (
                      <span className="shrink-0 text-[10px] font-black uppercase px-2.5 py-1 rounded-full bg-indigo-600 text-white tracking-wider">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-4">{item.desc}</p>
                  <Link href={item.href} className="inline-flex items-center gap-1.5 text-xs font-black text-indigo-600 uppercase tracking-wider hover:gap-2.5 transition-all">
                    Use Free <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          </section>

          {/* ═══ WHY TASKGURU ═══ */}
          <section className="border-t border-zinc-100 dark:border-zinc-800 pt-16">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-5xl font-black text-zinc-900 dark:text-white tracking-tight mb-4">
                Why 10,000+ Users Choose TaskGuru
              </h2>
              <p className="text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
                We built TaskGuru because we were frustrated with tools that hide basic features behind
                paywalls, harvest your data, or require you to create yet another account. Here&apos;s what
                makes us genuinely different.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {whyChoose.map((item) => (
                <div key={item.title} className="p-7 bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl hover:border-indigo-200 dark:hover:border-indigo-800 transition-colors">
                  <div className="mb-4">{item.icon}</div>
                  <h3 className="font-black text-zinc-900 dark:text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ═══ COMPARISON TABLE ═══ */}
          <section>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-zinc-900 dark:text-white tracking-tight mb-4">
                TaskGuru vs The Competition
              </h2>
              <p className="text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto">
                See exactly how TaskGuru compares against Adobe Acrobat and Smallpdf on the features that matter most.
              </p>
            </div>
            <div className="overflow-x-auto rounded-2xl border border-zinc-200 dark:border-zinc-800">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
                    <th className="text-left px-6 py-4 font-black text-zinc-700 dark:text-zinc-300">Feature</th>
                    <th className="px-6 py-4 font-black text-indigo-600">TaskGuru ✦</th>
                    <th className="px-6 py-4 font-bold text-zinc-400">Adobe Acrobat</th>
                    <th className="px-6 py-4 font-bold text-zinc-400">Smallpdf</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                  {comparisons.map((row) => (
                    <tr key={row.feature} className="bg-white dark:bg-zinc-950 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors">
                      <td className="px-6 py-4 font-medium text-zinc-700 dark:text-zinc-300">{row.feature}</td>
                      <td className="px-6 py-4 text-center">{row.taskguru  ? <span className="text-green-500 font-black text-lg">✓</span> : <span className="text-red-400 font-black text-lg">✗</span>}</td>
                      <td className="px-6 py-4 text-center">{row.adobe    ? <span className="text-green-500 font-black text-lg">✓</span> : <span className="text-red-400 font-black text-lg">✗</span>}</td>
                      <td className="px-6 py-4 text-center">{row.smallpdf ? <span className="text-green-500 font-black text-lg">✓</span> : <span className="text-red-400 font-black text-lg">✗</span>}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-zinc-400 text-center mt-3">* Based on free tier features as of June 2026.</p>
          </section>

          {/* ═══ WHO USES TASKGURU ═══ */}
          <section className="bg-zinc-900 rounded-[3rem] p-10 md:p-16 text-white">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4">Built for Everyone</h2>
              <p className="text-zinc-400 max-w-xl mx-auto">
                From high school students to Fortune 500 professionals — TaskGuru serves users across 146 countries and every industry.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: "🎓", title: "Students", desc: "Paraphrase research papers without plagiarism, build ATS resumes for internship applications, compress assignment images for online submissions, and convert lecture notes to editable text using OCR." },
                { icon: "💼", title: "Professionals", desc: "Convert signed PDF contracts to editable Word documents, merge quarterly reports into one file, compress presentation assets for email delivery, and sign documents digitally without printing." },
                { icon: "🎨", title: "Designers & Creators", desc: "Remove image backgrounds for product photos and thumbnails, compress portfolio images for web without quality loss, convert image mockups to shareable PDFs, and download HD YouTube thumbnails." },
                { icon: "🔧", title: "Engineers & Finance", desc: "Calculate metal weight for fabrication projects, compute loan EMI for financial planning, extract text from technical drawings using OCR, check credit card eligibility, and manage project documentation." },
              ].map((item) => (
                <div key={item.title} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
                  <span className="text-3xl mb-4 block">{item.icon}</span>
                  <h3 className="font-black text-white mb-2">{item.title}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ═══ SEO AUTHORITY TEXT ═══ */}
          <section className="max-w-4xl mx-auto space-y-10 text-zinc-600 dark:text-zinc-400 leading-relaxed">

            <div>
              <h2 className="text-2xl md:text-3xl font-black text-zinc-900 dark:text-white mb-4 flex items-center gap-3">
                <Info className="w-7 h-7 text-indigo-600 flex-shrink-0" />
                What is TaskGuru?
              </h2>
              <p className="text-lg">
                TaskGuru is a browser-based AI productivity ecosystem built to solve a simple
                problem: too many essential digital tools are locked behind expensive subscriptions
                or forced account creation. TaskGuru solves this by offering{" "}
                <strong className="text-zinc-800 dark:text-zinc-200">{tools.length}+ professional-grade utilities</strong>{" "}
                — completely free, forever. Every tool from the{" "}
                <Link href="/tools/text-paraphraser" className="text-indigo-600 font-bold hover:underline">free AI paraphraser</Link>
                {" "}to the{" "}
                <Link href="/tools/pdf-editor-pro" className="text-indigo-600 font-bold hover:underline">free PDF editor</Link>
                {" "}runs directly in your browser — no installations, no accounts, no data stored.
              </p>
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-black text-zinc-900 dark:text-white mb-4 flex items-center gap-3">
                <TrendingUp className="w-7 h-7 text-indigo-600 flex-shrink-0" />
                The Free Tool Revolution in 2026
              </h2>
              <p>
                The digital tools landscape is shifting rapidly. As WebAssembly and Edge Computing
                mature, the processing power required to run AI-powered tools is increasingly
                available directly in the browser — without expensive server infrastructure.
                TaskGuru is at the forefront of this shift, delivering tools that once required
                costly Adobe subscriptions or desktop software installations — now free, instant,
                and accessible from any smartphone.
              </p>
              <p className="mt-4">
                In 2026, subscription fatigue is at an all-time high. The average professional
                spends over $200 per year on productivity software alone — for tools they use
                occasionally. TaskGuru eliminates this cost barrier entirely, ensuring that a
                student in a rural area has access to the same professional-grade PDF and AI tools
                as someone at a Fortune 500 company.
              </p>
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-black text-zinc-900 dark:text-white mb-4 flex items-center gap-3">
                <Lock className="w-7 h-7 text-green-600 flex-shrink-0" />
                Our Privacy-First Philosophy
              </h2>
              <p>
                Unlike many "free" tools that monetize through data harvesting, TaskGuru takes
                a fundamentally different approach. Every file you process — whether through our{" "}
                <Link href="/tools/pdf-to-word" className="text-indigo-600 font-bold hover:underline">free PDF to Word converter</Link>
                , our{" "}
                <Link href="/tools/background-remover" className="text-indigo-600 font-bold hover:underline">free background remover</Link>
                , our{" "}
                <Link href="/tools/unlock-pdf-no-upload" className="text-indigo-600 font-bold hover:underline">PDF unlock tool</Link>
                , or our{" "}
                <Link href="/tools/image-to-text" className="text-indigo-600 font-bold hover:underline">OCR tool</Link>{" "}
                — is processed in temporary encrypted memory and permanently deleted the moment
                your result is ready. We never build user profiles, never sell data to advertisers,
                and never retain access to your documents after your session ends. For tools like{" "}
                <Link href="/tools/esign-pdf-no-upload" className="text-indigo-600 font-bold hover:underline">PDF signing</Link>
                {" "}and{" "}
                <Link href="/tools/pdf-redactor" className="text-indigo-600 font-bold hover:underline">PDF redaction</Link>
                , processing happens entirely in your browser — your file never leaves your device.
              </p>
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-black text-zinc-900 dark:text-white mb-4">
                Long-Tail Searches That Bring You Here
              </h2>
              <p className="mb-5">
                People find TaskGuru while searching for specific free tool alternatives. Here are the most common searches:
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  "free pdf to word converter no email",
                  "free ai paraphraser no word limit",
                  "free background remover no signup",
                  "free image compressor without losing quality",
                  "free ocr image to text online",
                  "free ats resume builder no watermark",
                  "free merge pdf files online",
                  "free qr code generator no account",
                  "free grammar checker online",
                  "free typing speed test wpm",
                  "free invoice generator pdf",
                  "free pomodoro timer online",
                  "free word to pdf converter",
                  "free pdf compressor online",
                  "free unlock pdf without password",
                  "free sign pdf online no upload",
                  "free excel to pdf converter",
                  "free age calculator years months days",
                  "free emi calculator online",
                  "free youtube thumbnail downloader hd",
                  "quillbot alternative free unlimited",
                  "free ai content detector chatgpt",
                  "free word counter online",
                  "free password generator strong",
                ].map((kw) => (
                  <span key={kw} className="px-3 py-1.5 bg-zinc-50 dark:bg-zinc-900 rounded-full text-xs font-semibold border border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400">
                    {kw}
                  </span>
                ))}
              </div>
            </div>

          </section>

          {/* ═══ FAQ ═══ */}
          
                <section>
            <Script
              id="faq-schema"
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "FAQPage",
                  mainEntity: faqs.map((f) => ({
                    "@type": "Question",
                    name: f.q,
                    acceptedAnswer: { "@type": "Answer", text: f.a },
                  })),
                }),
              }}
            />
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-zinc-900 dark:text-white tracking-tight mb-3">
                Frequently Asked Questions
              </h2>
              <p className="text-zinc-500 dark:text-zinc-400">
                Everything you need to know about TaskGuru&apos;s {tools.length}+ free tools.
              </p>
            </div>
            <div className="max-w-3xl mx-auto space-y-3">
              {faqs.map((faq, i) => (
                <details
                  key={i}
                  className="group border border-zinc-200 dark:border-zinc-800 rounded-2xl bg-zinc-50 dark:bg-zinc-900 cursor-pointer overflow-hidden"
                >
                  <summary className="flex justify-between items-center px-6 py-5 font-bold text-zinc-900 dark:text-white list-none">
                    {faq.q}
                    <ArrowRight className="w-4 h-4 text-zinc-400 flex-shrink-0 group-open:rotate-90 transition-transform duration-200" />
                  </summary>
                  <div className="px-6 pb-5 text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed border-t border-zinc-100 dark:border-zinc-800 pt-4">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </section>

          {/* ═══ FINAL CTA ═══ */}
          <section className="text-center py-10">
            <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-3xl p-10 md:p-16 text-white max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-black mb-4">
                Stop Paying for Tools You Can Get Free
              </h2>
              <p className="text-indigo-200 mb-8 max-w-xl mx-auto leading-relaxed">
                Join 10,000+ users who&apos;ve switched to TaskGuru. No account. No credit card.
                No limits. {tools.length}+ powerful tools that just work.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {[
                  { label: "AI Paraphraser",     href: "/tools/text-paraphraser"    },
                  { label: "PDF to Word",        href: "/tools/pdf-to-word"         },
                  { label: "Remove Background",  href: "/tools/background-remover"  },
                  { label: "Extract Text (OCR)", href: "/tools/image-to-text"       },
                  { label: "Compress Image",     href: "/tools/image-compressor"    },
                  { label: "Build Resume",       href: "/tools/resume-maker"        },
                  { label: "Merge PDF",          href: "/tools/merge-pdf"           },
                  { label: "Grammar Checker",    href: "/tools/grammar-checker"     },
                ].map((cta) => (
                  <Link
                    key={cta.label}
                    href={cta.href}
                    className="bg-white text-indigo-700 font-black px-5 py-2.5 rounded-xl text-sm hover:bg-indigo-50 transition-colors"
                  >
                    {cta.label} →
                  </Link>
                ))}
              </div>
            </div>
          </section>

        </div>
      </main>
    </>
  );
}  
