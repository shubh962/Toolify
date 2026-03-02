import { Metadata } from "next";
import Link from "next/link";
import {
  Calculator, FileText, Image as ImageIcon, Scissors, FilePlus2,
  ArrowRight, ShieldCheck, Zap, Sparkles, BrainCircuit,
  FileStack, Wand2, Hammer, Lock, Users, HelpCircle, Info,
  Globe, Star, TrendingUp, Clock, Award, CheckCircle2,
  BarChart3, Cpu, Layers, Fingerprint, RefreshCw
} from "lucide-react";

export const metadata: Metadata = {
  title: "Free AI Online Tools Hub | PDF, Image & Productivity | TaskGuru",
  description: "Comprehensive suite of free AI tools including ATS Resume Maker, Background Remover, Image Compressor, OCR, and PDF utilities. No login required. 100% private and secure.",
  alternates: { canonical: "https://www.taskguru.online/tools" },
  openGraph: {
    title: "Free AI Online Tools Hub | PDF, Image & Productivity | TaskGuru",
    description: "Comprehensive suite of free AI tools. No login, no subscription, 100% private.",
    type: "website",
    url: "https://www.taskguru.online/tools",
  },
};

const toolCategories = [
  {
    category: "AI & Content Tools",
    description: "Powered by machine learning — process content in seconds",
    accent: "indigo",
    tools: [
      {
        name: "AI Text Paraphraser",
        desc: "Rewrite essays and articles instantly while removing plagiarism.",
        longDesc: "Used by 10,000+ students and bloggers monthly",
        href: "/tools/text-paraphraser",
        icon: BrainCircuit,
        color: "text-purple-600",
        bg: "bg-purple-50 dark:bg-purple-950/30",
        badge: "Most Popular",
      },
      {
        name: "Background Remover",
        desc: "Remove image backgrounds automatically with neural networks.",
        longDesc: "One-click AI removal — no manual masking needed",
        href: "/tools/background-remover",
        icon: Scissors,
        color: "text-indigo-600",
        bg: "bg-indigo-50 dark:bg-indigo-950/30",
        badge: null,
      },
      {
        name: "Image to Text (OCR)",
        desc: "Extract editable text from any image or scanned document.",
        longDesc: "Supports 50+ languages with 99%+ accuracy",
        href: "/tools/image-to-text",
        icon: FileText,
        color: "text-yellow-600",
        bg: "bg-yellow-50 dark:bg-yellow-950/30",
        badge: null,
      },
    ],
  },
  {
    category: "Document & PDF Suite",
    description: "Professional PDF tools — no Adobe Acrobat needed",
    accent: "blue",
    tools: [
      {
        name: "PDF to Word",
        desc: "Convert PDF files into fully editable DOCX documents accurately.",
        longDesc: "Preserves tables, headers, fonts, and formatting",
        href: "/tools/pdf-to-word",
        icon: Wand2,
        color: "text-red-600",
        bg: "bg-red-50 dark:bg-red-950/30",
        badge: "New",
      },
      {
        name: "Merge PDF Files",
        desc: "Combine multiple PDF documents into a single organized file.",
        longDesc: "Drag, reorder, and merge unlimited PDFs",
        href: "/tools/merge-pdf",
        icon: FileStack,
        color: "text-blue-600",
        bg: "bg-blue-50 dark:bg-blue-950/30",
        badge: null,
      },
      {
        name: "Image to PDF",
        desc: "Turn your JPG and PNG photos into professional A4 PDF files.",
        longDesc: "Batch convert multiple images at once",
        href: "/tools/image-to-pdf",
        icon: ImageIcon,
        color: "text-green-600",
        bg: "bg-green-50 dark:bg-green-950/30",
        badge: null,
      },
    ],
  },
  {
    category: "Productivity & Engineering",
    description: "Precision calculators and builders for professionals",
    accent: "slate",
    tools: [
      {
        name: "Resume Maker (ATS)",
        desc: "Build professional, recruiter-approved resumes for free.",
        longDesc: "Templates proven to pass ATS filters",
        href: "/tools/resume-maker",
        icon: FilePlus2,
        color: "text-indigo-600",
        bg: "bg-indigo-50 dark:bg-indigo-950/30",
        badge: "Free",
      },
      {
        name: "Age Calculator Pro",
        desc: "Highly precise chronological tracking for exams and milestones.",
        longDesc: "Shows age in years, months, days, and hours",
        href: "/tools/age-calculator",
        icon: Calculator,
        color: "text-blue-700",
        bg: "bg-blue-50 dark:bg-blue-950/30",
        badge: null,
      },
      {
        name: "Metal Weight Calc",
        desc: "Calculate industrial metal weight for sheets and rods instantly.",
        longDesc: "Supports 15+ metal types and shapes",
        href: "/tools/metal-weight-calculator",
        icon: Hammer,
        color: "text-slate-600",
        bg: "bg-slate-50 dark:bg-slate-900/50",
        badge: null,
      },
      {
        name: "Image Compressor",
        desc: "Reduce image size by up to 90% without losing visual quality.",
        longDesc: "Supports JPG, PNG, WebP formats",
        href: "/tools/image-compressor",
        icon: Zap,
        color: "text-orange-600",
        bg: "bg-orange-50 dark:bg-orange-950/30",
        badge: null,
      },
    ],
  },
];

const stats = [
  { icon: <Users className="w-5 h-5" />, value: "10K+", label: "Monthly Users" },
  { icon: <Layers className="w-5 h-5" />, value: "14+", label: "Free Tools" },
  { icon: <Globe className="w-5 h-5" />, value: "50+", label: "Languages" },
  { icon: <Star className="w-5 h-5" />, value: "100%", label: "Free Forever" },
];

const whyChoose = [
  {
    icon: <Lock className="w-6 h-6 text-green-600" />,
    title: "Zero-Storage Architecture",
    desc: "Your files are processed in temporary encrypted memory and deleted immediately after. We never store, log, or share your documents — ever.",
  },
  {
    icon: <Zap className="w-6 h-6 text-yellow-500" />,
    title: "Edge Computing Speed",
    desc: "Built on Vercel's global Edge Network. Tools run on servers physically closest to you, delivering near-instant processing regardless of your location.",
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-blue-600" />,
    title: "No Account Required",
    desc: "Walk in, get your work done, walk out. No sign-up forms, no email verification, no password to remember. Just open the tool and use it.",
  },
  {
    icon: <Globe className="w-6 h-6 text-indigo-600" />,
    title: "Works Everywhere",
    desc: "All tools run directly in your browser — desktop, tablet, or mobile. No app download, no software installation, no OS restrictions.",
  },
  {
    icon: <Cpu className="w-6 h-6 text-purple-600" />,
    title: "AI-Powered Accuracy",
    desc: "Our tools use state-of-the-art machine learning models continuously updated with the latest research. Accuracy improves automatically over time.",
  },
  {
    icon: <RefreshCw className="w-6 h-6 text-teal-600" />,
    title: "Always Free, Always Updated",
    desc: "Funded by non-intrusive ads, TaskGuru remains permanently free. New tools are added regularly based on user feedback and emerging needs.",
  },
];

const comparisons = [
  { feature: "100% Free", taskguru: true, adobe: false, smallpdf: false },
  { feature: "No Account Required", taskguru: true, adobe: false, smallpdf: false },
  { feature: "No Watermarks", taskguru: true, adobe: true, smallpdf: false },
  { feature: "Privacy / No File Storage", taskguru: true, adobe: false, smallpdf: false },
  { feature: "Works on Mobile", taskguru: true, adobe: true, smallpdf: true },
  { feature: "AI-Powered Tools", taskguru: true, adobe: true, smallpdf: false },
  { feature: "Unlimited Usage", taskguru: true, adobe: false, smallpdf: false },
];

const faqs = [
  {
    q: "Is TaskGuru really 100% free with no hidden costs?",
    a: "Yes, completely. TaskGuru is funded by non-intrusive Google AdSense advertisements. There are no premium tiers, no file size limits behind a paywall, no watermarks, and no credit card ever required. Every tool is fully free, forever.",
  },
  {
    q: "Are my uploaded files safe and private?",
    a: "Absolutely. TaskGuru uses a Zero-Storage Architecture — your files exist only in temporary encrypted RAM during processing. The moment your result is ready, the file is permanently deleted from our servers. We never store, analyze, or share your documents.",
  },
  {
    q: "Do I need to create an account to use TaskGuru?",
    a: "No account needed whatsoever. All 14+ tools on TaskGuru work instantly without any sign-up, login, or email verification. Just open the tool and start working immediately.",
  },
  {
    q: "Which devices and browsers does TaskGuru support?",
    a: "TaskGuru works on all modern devices — desktop, laptop, tablet, and mobile. It's compatible with Chrome, Firefox, Safari, and Edge. No app download or software installation is required.",
  },
  {
    q: "How accurate are the AI tools like OCR and Paraphraser?",
    a: "Our OCR tool achieves 99%+ accuracy on clean, high-resolution scans and supports 50+ languages. The AI Paraphraser uses context-aware language models to maintain meaning while improving clarity. Both tools are continuously updated as AI research advances.",
  },
  {
    q: "Can I use TaskGuru tools for commercial projects?",
    a: "Yes. There are no restrictions on how you use the output from our tools. You can use converted PDFs, compressed images, or paraphrased text for personal, academic, or commercial purposes.",
  },
];

export default function ToolsPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-zinc-950 font-sans">

      {/* ═══ HERO ═══ */}
      <section className="relative pt-20 pb-20 px-6 text-center overflow-hidden">
        {/* Background grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
          style={{
            backgroundImage: `radial-gradient(circle, #6366f1 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
        <div className="relative max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 rounded-full text-xs font-black uppercase mb-8 tracking-widest border border-indigo-100 dark:border-indigo-900">
            <Sparkles className="w-3.5 h-3.5" /> 14+ Free Tools · No Sign-Up · 100% Private
          </div>
          <h1 className="text-4xl md:text-7xl font-black text-zinc-900 dark:text-white tracking-tighter mb-6 leading-[1.05]">
            Every Tool You Need.{" "}
            <span className="text-indigo-600">Always Free.</span>
          </h1>
          <p className="text-lg md:text-xl text-zinc-500 dark:text-zinc-400 max-w-3xl mx-auto leading-relaxed mb-10">
            TaskGuru is a browser-based AI productivity suite built for students, professionals,
            and creators. Convert PDFs, compress images, extract text, build resumes — all
            without downloading software or creating an account.
          </p>

          {/* Stats bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {stats.map((s) => (
              <div
                key={s.label}
                className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl p-4"
              >
                <div className="text-indigo-600 dark:text-indigo-400 flex justify-center mb-1">
                  {s.icon}
                </div>
                <p className="text-xl font-black text-zinc-900 dark:text-white">{s.value}</p>
                <p className="text-xs text-zinc-500 uppercase tracking-wide font-bold">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 pb-24 space-y-24">

        {/* ═══ TOOLS GRID ═══ */}
        {toolCategories.map((cat, idx) => (
          <section key={idx}>
            <div className="mb-10">
              <h2 className="text-sm font-black uppercase tracking-[0.2em] text-zinc-400 flex items-center gap-4 mb-2">
                {cat.category}
                <div className="h-[1px] w-full bg-zinc-100 dark:bg-zinc-800" />
              </h2>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm">{cat.description}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {cat.tools.map((tool) => (
                <Link
                  key={tool.name}
                  href={tool.href}
                  className="group relative border border-zinc-100 dark:border-zinc-800 rounded-[2rem] p-7 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 hover:-translate-y-2 bg-white dark:bg-zinc-900"
                >
                  {/* Badge */}
                  {tool.badge && (
                    <span className="absolute top-5 right-5 text-[10px] font-black uppercase px-2.5 py-1 rounded-full bg-indigo-600 text-white tracking-wider">
                      {tool.badge}
                    </span>
                  )}
                  <div className={`p-4 rounded-2xl ${tool.bg} inline-block mb-5`}>
                    <tool.icon className={`w-7 h-7 ${tool.color}`} />
                  </div>
                  <h3 className="text-lg font-black text-zinc-900 dark:text-white mb-2 tracking-tight group-hover:text-indigo-600 transition-colors">
                    {tool.name}
                  </h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-2 leading-relaxed">
                    {tool.desc}
                  </p>
                  <p className="text-xs text-zinc-400 dark:text-zinc-500 mb-5 font-medium">
                    {tool.longDesc}
                  </p>
                  <div className="flex items-center gap-2 text-xs font-black text-indigo-600 uppercase tracking-wider group-hover:gap-3 transition-all">
                    Use Free <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}

        {/* ═══ WHY TASKGURU ═══ */}
        <section className="border-t border-zinc-100 dark:border-zinc-800 pt-20">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-5xl font-black text-zinc-900 dark:text-white tracking-tight mb-4">
              Why 10,000+ Users Choose TaskGuru
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              We built TaskGuru because we were frustrated with tools that hide basic features behind
              paywalls, harvest your data, or require you to create yet another account. Here's what
              makes us different.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChoose.map((item) => (
              <div
                key={item.title}
                className="p-7 bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl hover:border-indigo-200 dark:hover:border-indigo-800 transition-colors"
              >
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
              See how TaskGuru stacks up against popular paid alternatives.
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
                    <td className="px-6 py-4 text-center">
                      {row.taskguru
                        ? <span className="text-green-500 font-black text-lg">✓</span>
                        : <span className="text-red-400 font-black text-lg">✗</span>}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {row.adobe
                        ? <span className="text-green-500 font-black text-lg">✓</span>
                        : <span className="text-red-400 font-black text-lg">✗</span>}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {row.smallpdf
                        ? <span className="text-green-500 font-black text-lg">✓</span>
                        : <span className="text-red-400 font-black text-lg">✗</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-zinc-400 text-center mt-3">
            * Based on free tier features as of March 2026.
          </p>
        </section>

        {/* ═══ WHO USES TASKGURU ═══ */}
        <section className="bg-zinc-900 rounded-[3rem] p-10 md:p-16 text-white">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
              Built for Everyone
            </h2>
            <p className="text-zinc-400 max-w-xl mx-auto">
              From high school students to Fortune 500 professionals — TaskGuru serves users
              across every industry and skill level.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: "🎓",
                title: "Students",
                desc: "Summarize lecture notes with OCR, build ATS resumes for internship applications, and compress assignment images for online submissions.",
              },
              {
                icon: "💼",
                title: "Professionals",
                desc: "Convert signed PDF contracts to editable Word documents, merge quarterly reports, and compress presentation assets for email delivery.",
              },
              {
                icon: "🎨",
                title: "Designers & Creators",
                desc: "Remove image backgrounds for product photos, compress portfolio images for web, and convert image mockups to shareable PDFs.",
              },
              {
                icon: "🔧",
                title: "Engineers",
                desc: "Calculate metal weight for fabrication projects, extract text from technical drawings using OCR, and manage project documentation efficiently.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors"
              >
                <span className="text-3xl mb-4 block">{item.icon}</span>
                <h3 className="font-black text-white mb-2">{item.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ SEO AUTHORITY TEXT ═══ */}
        <section className="max-w-4xl mx-auto space-y-8 text-zinc-600 dark:text-zinc-400 leading-relaxed">
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-zinc-900 dark:text-white mb-4 flex items-center gap-3">
              <Info className="w-7 h-7 text-indigo-600 flex-shrink-0" />
              What is TaskGuru?
            </h2>
            <p className="text-lg">
              TaskGuru is a browser-based AI productivity ecosystem founded by{" "}
              <strong className="text-zinc-800 dark:text-zinc-200">Shubham Gautam</strong> in
              January 2024. The platform was created out of a simple frustration: too many essential
              digital tools were locked behind expensive subscriptions or forced account creation.
              TaskGuru solves this by offering 14+ professional-grade utilities — completely free,
              forever — funded by non-intrusive advertisements.
            </p>
          </div>

          <div>
            <h2 className="text-2xl md:text-3xl font-black text-zinc-900 dark:text-white mb-4 flex items-center gap-3">
              <TrendingUp className="w-7 h-7 text-indigo-600 flex-shrink-0" />
              The Free Tool Revolution in 2026
            </h2>
            <p>
              The digital tools landscape is changing rapidly. As WebAssembly and Edge Computing
              mature, the processing power required to run AI tools is increasingly available
              directly in the browser — without expensive server infrastructure. TaskGuru is at
              the forefront of this shift, leveraging modern web technologies to deliver tools
              that once required desktop software installations or costly cloud subscriptions.
            </p>
            <p className="mt-4">
              In 2026, subscription fatigue is at an all-time high. The average professional
              spends over $200 per year on productivity software alone. TaskGuru exists to
              eliminate this cost barrier entirely — ensuring that a student in a rural area
              has access to the same quality tools as a professional at a Fortune 500 company.
            </p>
          </div>

          <div>
            <h2 className="text-2xl md:text-3xl font-black text-zinc-900 dark:text-white mb-4 flex items-center gap-3">
              <Lock className="w-7 h-7 text-green-600 flex-shrink-0" />
              Our Privacy-First Philosophy
            </h2>
            <p>
              Unlike many free tools that monetize through data harvesting, TaskGuru takes a
              fundamentally different approach. Every file you upload — whether to our{" "}
              <Link href="/tools/pdf-to-word" className="text-indigo-600 font-bold hover:underline">
                PDF to Word converter
              </Link>
              , our{" "}
              <Link href="/tools/background-remover" className="text-indigo-600 font-bold hover:underline">
                Background Remover
              </Link>
              , or our{" "}
              <Link href="/tools/image-to-text" className="text-indigo-600 font-bold hover:underline">
                OCR tool
              </Link>{" "}
              — is processed in temporary encrypted memory and permanently deleted the moment
              your result is ready. We never build profiles of our users, never sell data to
              advertisers, and never retain access to your documents after your session ends.
            </p>
          </div>
        </section>

        {/* ═══ FAQ ═══ */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-zinc-900 dark:text-white tracking-tight mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400">
              Everything you need to know about TaskGuru's free tools.
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
              No limits. Just powerful tools that work.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { label: "Compress Image", href: "/tools/image-compressor" },
                { label: "PDF to Word", href: "/tools/pdf-to-word" },
                { label: "Remove Background", href: "/tools/background-remover" },
                { label: "Extract Text (OCR)", href: "/tools/image-to-text" },
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
  );
}
