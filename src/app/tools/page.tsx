import { Metadata } from "next";
import Link from "next/link";
import {
  Calculator, FileText, Image as ImageIcon, Scissors, FilePlus2,
  ArrowRight, ShieldCheck, Zap, Globe, Sparkles, BrainCircuit,
  FileStack, Wand2, Hammer, Lock, Cpu, Users, HelpCircle, Info
} from "lucide-react";

// ✅ FIX 1: Added openGraph
export const metadata: Metadata = {
  title: "Free AI Online Tools Hub | PDF, Image & Productivity | TaskGuru",
  description: "Comprehensive suite of free AI tools including ATS Resume Maker, Background Remover, and PDF utilities. No-login, secure browser-based tools.",
  alternates: { canonical: "https://www.taskguru.online/tools" },
  openGraph: {
    title: "Free AI Online Tools Hub | PDF, Image & Productivity | TaskGuru",
    description: "Comprehensive suite of free AI tools including ATS Resume Maker, Background Remover, and PDF utilities. No-login, secure browser-based tools.",
    type: "website",
    url: "https://www.taskguru.online/tools",
  },
};

const toolCategories = [
  {
    category: "AI & Content Tools",
    tools: [
      { name: "AI Text Paraphraser", desc: "Rewrite essays and articles instantly while removing plagiarism.", href: "/tools/text-paraphraser", icon: BrainCircuit, color: "text-purple-600", bg: "bg-purple-50 dark:bg-purple-950/30" },
      { name: "Background Remover", desc: "Remove image backgrounds automatically with neural networks.", href: "/tools/background-remover", icon: Scissors, color: "text-indigo-600", bg: "bg-indigo-50 dark:bg-indigo-950/30" },
      { name: "Image to Text (OCR)", desc: "Extract editable text from any image or scanned note using AI.", href: "/tools/image-to-text", icon: FileText, color: "text-yellow-600", bg: "bg-yellow-50 dark:bg-yellow-950/30" },
    ]
  },
  {
    category: "Document & PDF Suite",
    tools: [
      { name: "PDF to Word", desc: "Convert PDF files into fully editable DOCX documents accurately.", href: "/tools/pdf-to-word", icon: Wand2, color: "text-red-600", bg: "bg-red-50 dark:bg-red-950/30" },
      { name: "Merge PDF Files", desc: "Combine multiple PDF documents into a single organized file.", href: "/tools/merge-pdf", icon: FileStack, color: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-950/30" },
      { name: "Image to PDF", desc: "Turn your JPG and PNG photos into professional A4 PDF files.", href: "/tools/image-to-pdf", icon: ImageIcon, color: "text-green-600", bg: "bg-green-50 dark:bg-green-950/30" },
    ]
  },
  {
    category: "Productivity & Engineering",
    tools: [
      { name: "Resume Maker (ATS)", desc: "Build professional, recruiter-approved resumes for free.", href: "/tools/resume-maker", icon: FilePlus2, color: "text-indigo-600", bg: "bg-indigo-50 dark:bg-indigo-950/30" },
      { name: "Age Calculator Pro", desc: "Highly precise chronological tracking for exams and milestones.", href: "/tools/age-calculator", icon: Calculator, color: "text-blue-700", bg: "bg-blue-50 dark:bg-blue-950/30" },
      { name: "Metal Weight Calc", desc: "Calculate industrial metal weight for sheets and rods instantly.", href: "/tools/metal-weight-calculator", icon: Hammer, color: "text-slate-600", bg: "bg-slate-50 dark:bg-slate-900/50" },
      { name: "Image Compressor", desc: "Reduce image size without losing visual quality for faster web.", href: "/tools/image-compressor", icon: Zap, color: "text-orange-600", bg: "bg-orange-50 dark:bg-orange-950/30" },
    ]
  }
];

// ✅ FIX 2: Expanded to 4 FAQs for better content depth
const faqs = [
  {
    q: "Is TaskGuru really free?",
    a: "Yes. We use Google AdSense to fund our servers, keeping all tools free for students and professionals forever. No subscription, no credit card required.",
  },
  {
    q: "Will my files be stored on your servers?",
    a: "Absolutely not. Your files are processed in real-time in temporary memory and deleted instantly once the task is complete. We never store or share your data.",
  },
  {
    q: "Do I need to create an account to use TaskGuru?",
    a: "No account needed. All tools on TaskGuru work instantly without any sign-up or login. Just open the tool and start working.",
  },
  {
    q: "Which devices does TaskGuru work on?",
    a: "TaskGuru works on all devices — desktop, laptop, tablet, and mobile — directly in your browser. No app download or software installation required.",
  },
];

export default function ToolsPage() {
  return (
    // ✅ FIX 3: Consistent dark mode — using zinc-950 throughout
    <main className="min-h-screen bg-white dark:bg-zinc-950 font-sans">

      {/* HERO */}
      <section className="pt-20 pb-16 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1 bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 rounded-full text-xs font-black uppercase mb-6 tracking-widest border border-indigo-100 dark:border-indigo-900">
            <Sparkles className="w-4 h-4" /> Global Toolkit 2026
          </div>
          <h1 className="text-4xl md:text-7xl font-black text-zinc-900 dark:text-white tracking-tighter mb-6 leading-tight">
            Digital Tools. <span className="text-indigo-600">Simplified.</span>
          </h1>
          <p className="text-lg text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto italic">
            &quot;Professional grade AI utilities at your fingertips — no login, no subscription, 100% private.&quot;
          </p>
        </div>
      </section>

      {/* TOOLS GRID */}
      <div className="max-w-7xl mx-auto px-6 pb-24 space-y-20">
        {toolCategories.map((cat, idx) => (
          <section key={idx}>
            <h2 className="text-sm font-black uppercase tracking-[0.2em] text-zinc-400 mb-8 flex items-center gap-4">
              {cat.category}
              <div className="h-[1px] w-full bg-zinc-100 dark:bg-zinc-800" />
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {cat.tools.map((tool) => (
                <Link
                  key={tool.name}
                  href={tool.href}
                  className="group border border-zinc-100 dark:border-zinc-800 rounded-[2rem] p-8 hover:shadow-2xl transition-all hover:-translate-y-2 bg-white dark:bg-zinc-900 shadow-sm"
                >
                  <div className={`p-4 rounded-2xl ${tool.bg} inline-block mb-6`}>
                    <tool.icon className={`w-8 h-8 ${tool.color}`} />
                  </div>
                  <h3 className="text-xl font-black text-zinc-900 dark:text-white mb-2 tracking-tight group-hover:text-indigo-600 transition-colors">
                    {tool.name}
                  </h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6 leading-relaxed">
                    {tool.desc}
                  </p>
                  <div className="flex items-center gap-2 text-xs font-black text-indigo-600 uppercase tracking-tighter">
                    Launch Engine <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}

        {/* AUTHORITY CONTENT */}
        <article className="max-w-5xl mx-auto pt-20 border-t border-zinc-100 dark:border-zinc-800 space-y-20 text-zinc-600 dark:text-zinc-400 leading-relaxed">

          {/* What is TaskGuru */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 text-zinc-900 dark:text-white">
              <Info className="w-8 h-8 text-indigo-600" />
              <h2 className="text-3xl font-black tracking-tight">What is TaskGuru?</h2>
            </div>
            {/* ✅ FIX 4: Removed "Toolify" */}
            <p className="text-lg">
              TaskGuru is a comprehensive, browser-based AI ecosystem designed by{" "}
              <strong>Shubham Gautam</strong> to eliminate technical friction from your daily
              digital life. We provide a centralized hub for high-precision document conversion,
              AI-driven content rewriting, and industrial-grade calculators. Unlike traditional
              software, TaskGuru requires no installation and operates directly in your browser
              using <strong>Vercel&apos;s Edge Computing</strong> technology.
            </p>
          </section>

          {/* Why TaskGuru */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 text-zinc-900 dark:text-white">
              <Zap className="w-8 h-8 text-yellow-500" />
              <h2 className="text-3xl font-black tracking-tight">Why Choose TaskGuru in 2026?</h2>
            </div>
            <p>
              In an era of &quot;Subscription Fatigue,&quot; TaskGuru stands as a beacon of the open web.
              Most tools today trap your data behind a paywall or a forced sign-up. We built
              TaskGuru because we believe productivity tools should be as accessible as the air
              we breathe. Our focus in 2026 is on <strong>Zero-Latency Processing</strong>,
              meaning your files are converted, compressed, or rewritten in the blink of an eye.
            </p>
          </section>

          {/* Who Uses & Use Cases */}
          <section className="grid md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-zinc-900 dark:text-white">
                <Users className="w-6 h-6 text-indigo-600" />
                <h3 className="text-2xl font-black">Who Uses TaskGuru?</h3>
              </div>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Students:</strong> For summarizing notes and creating ATS-friendly resumes.</li>
                <li><strong>Developers:</strong> For quick OCR data extraction and file merging.</li>
                <li><strong>Engineers:</strong> Using our precise Metal Weight and Age calculators.</li>
                <li><strong>Freelancers:</strong> For professional PDF management without expensive SaaS costs.</li>
              </ul>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-zinc-900 dark:text-white">
                <HelpCircle className="w-6 h-6 text-red-500" />
                <h3 className="text-2xl font-black">Common Use Cases</h3>
              </div>
              <ul className="list-disc pl-5 space-y-2">
                <li>Converting scanned textbook photos into editable Word docs using OCR.</li>
                <li>Reducing high-res image sizes for faster website loading speeds.</li>
                <li>Splitting large project reports into individual PDF pages for easier sharing.</li>
                <li>Rephrasing technical content to improve readability and remove plagiarism.</li>
              </ul>
            </div>
          </section>

          {/* Integrity Policies */}
          <section className="bg-zinc-900 p-10 md:p-12 rounded-[3.5rem] text-zinc-100 shadow-2xl">
            <div className="space-y-6">
              <div className="flex items-center gap-3 text-indigo-400">
                <Lock className="w-8 h-8" />
                <h2 className="text-3xl font-black">Our 2026 Integrity Policies</h2>
              </div>
              <p>
                TaskGuru operates on a strict <strong>Zero-Storage Architecture</strong>. We do
                not store, view, or sell your data. Every file you process through our{" "}
                <Link href="/tools/pdf-to-word" className="text-indigo-400 underline font-bold hover:text-indigo-300">
                  PDF to Word
                </Link>{" "}
                converter or{" "}
                <Link href="/tools/image-to-text" className="text-indigo-400 underline font-bold hover:text-indigo-300">
                  OCR engine
                </Link>{" "}
                is handled in transient RAM.
              </p>
              <div className="grid sm:grid-cols-2 gap-4 text-sm font-medium">
                {[
                  "No Logs Kept",
                  "No Account Required",
                  "SSL Encrypted Tunnel",
                  "100% GDPR Compliant",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <ShieldCheck className="text-green-500 w-4 h-4 flex-shrink-0" /> {item}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ✅ FIX 5: Expanded FAQ — 4 questions */}
          <section className="space-y-8">
            <div className="flex items-center gap-3 text-zinc-900 dark:text-white">
              <HelpCircle className="w-8 h-8 text-blue-600" />
              <h2 className="text-3xl font-black tracking-tight">Frequently Asked Questions</h2>
            </div>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <details
                  key={i}
                  className="group p-6 border border-zinc-200 dark:border-zinc-800 rounded-3xl bg-zinc-50 dark:bg-zinc-900 cursor-pointer"
                >
                  <summary className="font-bold flex justify-between items-center text-zinc-900 dark:text-white">
                    {faq.q}
                    <ArrowRight className="w-4 h-4 flex-shrink-0 group-open:rotate-90 transition-transform" />
                  </summary>
                  <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>
          </section>

        </article>
      </div>

      {/* ✅ FIX 6: Removed duplicate footer — layout.tsx already has one */}

    </main>
  );
      }
