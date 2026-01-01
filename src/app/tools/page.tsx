import { Metadata } from "next";
import Link from "next/link";
import { 
  Calculator, FileText, Image as ImageIcon, Scissors, FilePlus2, 
  ArrowRight, ShieldCheck, Zap, Globe, Sparkles, BrainCircuit, 
  FileStack, Wand2, Hammer, Lock, Cpu, Users, HelpCircle, Info
} from "lucide-react";

export const metadata: Metadata = {
  title: "Free AI Online Tools Hub | PDF, Image & Productivity | TaskGuru",
  description: "Comprehensive suite of free AI tools including ATS Resume Maker, Background Remover, and PDF utilities. No-login, secure browser-based tools.",
  alternates: { canonical: "https://www.taskguru.online/tools" },
};

const toolCategories = [
  {
    category: "AI & Content Tools",
    tools: [
      { name: "AI Text Paraphraser", desc: "Rewrite essays and articles instantly while removing plagiarism.", href: "/tools/text-paraphraser", icon: BrainCircuit, color: "text-purple-600", bg: "bg-purple-50" },
      { name: "Background Remover", desc: "Remove image backgrounds automatically with neural networks.", href: "/tools/background-remover", icon: Scissors, color: "text-indigo-600", bg: "bg-indigo-50" },
      { name: "Image to Text (OCR)", desc: "Extract editable text from any image or scanned note using AI.", href: "/tools/image-to-text", icon: FileText, color: "text-yellow-600", bg: "bg-yellow-50" },
    ]
  },
  {
    category: "Document & PDF Suite",
    tools: [
      { name: "PDF to Word", desc: "Convert PDF files into fully editable DOCX documents accurately.", href: "/tools/pdf-to-word", icon: Wand2, color: "text-red-600", bg: "bg-red-50" },
      { name: "Merge PDF Files", desc: "Combine multiple PDF documents into a single organized file.", href: "/tools/merge-pdf", icon: FileStack, color: "text-blue-600", bg: "bg-blue-50" },
      { name: "Image to PDF", desc: "Turn your JPG and PNG photos into professional A4 PDF files.", href: "/tools/image-to-pdf", icon: ImageIcon, color: "text-green-600", bg: "bg-green-50" },
    ]
  },
  {
    category: "Productivity & Engineering",
    tools: [
      { name: "Resume Maker (ATS)", desc: "Build professional, recruiter-approved resumes for free.", href: "/tools/resume-maker", icon: FilePlus2, color: "text-indigo-600", bg: "bg-indigo-50" },
      { name: "Age Calculator Pro", desc: "Highly precise chronological tracking for exams and milestones.", href: "/tools/age-calculator", icon: Calculator, color: "text-blue-700", bg: "bg-blue-50" },
      { name: "Metal Weight Calc", desc: "Calculate industrial metal weight for sheets and rods instantly.", href: "/tools/metal-weight-calculator", icon: Hammer, color: "text-slate-600", bg: "bg-slate-50" },
      { name: "Image Compressor", desc: "Reduce image size without losing visual quality for faster web.", href: "/tools/image-compressor", icon: Zap, color: "text-orange-600", bg: "bg-orange-50" },
    ]
  }
];

export default function ToolsPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-zinc-950 font-sans">
      
      {/* HERO */}
      <section className="pt-20 pb-16 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-black uppercase mb-6 tracking-widest border border-indigo-100">
            <Sparkles className="w-4 h-4" /> Global Toolkit 2026
          </div>
          <h1 className="text-4xl md:text-7xl font-black text-zinc-900 dark:text-white tracking-tighter mb-6 leading-tight">
            Digital Tools. <span className="text-indigo-600">Simplified.</span>
          </h1>
          <p className="text-lg text-zinc-500 max-w-2xl mx-auto italic">
            "Professional grade AI utilities at your fingertips—no login, no subscription, 100% private."
          </p>
        </div>
      </section>

      {/* GRID SECTION */}
      <div className="max-w-7xl mx-auto px-6 pb-24 space-y-20">
        {toolCategories.map((cat, idx) => (
          <section key={idx}>
            <h2 className="text-sm font-black uppercase tracking-[0.2em] text-zinc-400 mb-8 flex items-center gap-4">
              {cat.category} <div className="h-[1px] w-full bg-zinc-100" />
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {cat.tools.map((tool) => (
                <Link key={tool.name} href={tool.href} className="group border border-zinc-100 dark:border-zinc-800 rounded-[2rem] p-8 hover:shadow-2xl transition-all hover:-translate-y-2 bg-white dark:bg-zinc-900 shadow-sm">
                  <div className={`p-4 rounded-2xl ${tool.bg} inline-block mb-6`}><tool.icon className={`w-8 h-8 ${tool.color}`} /></div>
                  <h3 className="text-xl font-black text-zinc-900 dark:text-white mb-2 tracking-tight group-hover:text-indigo-600">{tool.name}</h3>
                  <p className="text-sm text-zinc-500 mb-6 leading-relaxed">{tool.desc}</p>
                  <div className="flex items-center gap-2 text-xs font-black text-indigo-600 uppercase tracking-tighter">Launch Engine <ArrowRight className="w-4 h-4" /></div>
                </Link>
              ))}
            </div>
          </section>
        ))}

        {/* --- NEW AUTHORITY CONTENT SECTION --- */}
        <article className="max-w-5xl mx-auto pt-20 border-t border-zinc-100 space-y-20 text-zinc-600 dark:text-zinc-400 leading-relaxed">
          
          {/* What is This? */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 text-zinc-900 dark:text-white"><Info className="w-8 h-8 text-indigo-600" /><h2 className="text-3xl font-black tracking-tight">What is TaskGuru?</h2></div>
            <p className="text-lg">
              TaskGuru (Toolify) is a comprehensive, browser-based AI ecosystem designed by <strong>Shubham Gautam</strong> to eliminate technical friction from your daily digital life. We provide a centralized hub for high-precision document conversion, AI-driven content rewriting, and industrial-grade calculators. Unlike traditional software, TaskGuru requires no installation and operates directly in your browser using <strong>Vercel's Edge Computing</strong> technology.
            </p>
          </section>

          {/* Why is This? */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 text-zinc-900 dark:text-white"><Zap className="w-8 h-8 text-yellow-500" /><h2 className="text-3xl font-black tracking-tight">Why Choose TaskGuru in 2026?</h2></div>
            <p>
              In an era of "Subscription Fatigue," TaskGuru stands as a beacon of the open web. Most tools today trap your data behind a paywall or a forced sign-up. We built TaskGuru because we believe productivity tools should be as accessible as the air we breathe. Our focus in 2026 is on <strong>Zero-Latency Processing</strong>, meaning your files are converted, compressed, or rewritten in the blink of an eye.
            </p>
          </section>

          {/* Who Uses? & Use Cases */}
          <section className="grid md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-zinc-900 dark:text-white"><Users className="w-6 h-6 text-indigo-600" /><h3 className="text-2xl font-black">Who Uses TaskGuru?</h3></div>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Students:</strong> For summarizing notes and creating ATS-friendly resumes.</li>
                <li><strong>Developers:</strong> For quick OCR data extraction and file merging.</li>
                <li><strong>Engineers:</strong> Using our precise Metal Weight and Age calculators.</li>
                <li><strong>Freelancers:</strong> For professional PDF management without expensive SaaS costs.</li>
              </ul>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-zinc-900 dark:text-white"><HelpCircle className="w-6 h-6 text-red-500" /><h3 className="text-2xl font-black">Common Use Cases</h3></div>
              <ul className="list-disc pl-5 space-y-2">
                <li>Converting scanned textbook photos into editable Word docs using OCR.</li>
                <li>Reducing high-res image sizes for faster website loading speeds.</li>
                <li>Splitting large project reports into individual PDF pages for easier sharing.</li>
                <li>Rephrasing technical content to improve readability and remove plagiarism.</li>
              </ul>
            </div>
          </section>

          {/* Policies */}
          <section className="bg-zinc-900 p-12 rounded-[3.5rem] text-zinc-100 shadow-2xl relative overflow-hidden">
            <div className="relative z-10 space-y-6">
              <div className="flex items-center gap-3 text-indigo-400"><Lock className="w-8 h-8" /><h2 className="text-3xl font-black">Our 2026 Integrity Policies</h2></div>
              <p>TaskGuru operates on a strict <strong>Zero-Storage Architecture</strong>. We do not store, view, or sell your data. Every file you process through our <Link href="/tools/pdf-to-word" className="text-indigo-400 underline font-bold">PDF to Word</Link> converter or <Link href="/tools/image-to-text" className="text-indigo-400 underline font-bold">OCR engine</Link> is handled in transient RAM.</p>
              <div className="grid sm:grid-cols-2 gap-4 text-sm font-medium">
                <div className="flex items-center gap-2"><ShieldCheck className="text-green-500"/> No Logs Kept</div>
                <div className="flex items-center gap-2"><ShieldCheck className="text-green-500"/> No Account Required</div>
                <div className="flex items-center gap-2"><ShieldCheck className="text-green-500"/> SSL Encrypted Tunnel</div>
                <div className="flex items-center gap-2"><ShieldCheck className="text-green-500"/> 100% GDPR Compliant</div>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="space-y-8">
            <div className="flex items-center gap-3 text-zinc-900 dark:text-white"><HelpCircle className="w-8 h-8 text-blue-600" /><h2 className="text-3xl font-black tracking-tight">Frequently Asked Questions</h2></div>
            <div className="space-y-4">
              <details className="group p-6 border rounded-3xl bg-zinc-50 dark:bg-zinc-900 cursor-pointer">
                <summary className="font-bold flex justify-between items-center">Is TaskGuru really free? <ArrowRight className="w-4 h-4 group-open:rotate-90 transition-transform"/></summary>
                <p className="mt-4 text-sm opacity-80">Yes. We use Google AdSense to fund our servers, keeping all tools free for students and pros forever.</p>
              </details>
              <details className="group p-6 border rounded-3xl bg-zinc-50 dark:bg-zinc-900 cursor-pointer">
                <summary className="font-bold flex justify-between items-center">Will my files be stored on your servers? <ArrowRight className="w-4 h-4 group-open:rotate-90 transition-transform"/></summary>
                <p className="mt-4 text-sm opacity-80">Absolutely not. Your files are processed in real-time and deleted instantly once the task is complete.</p>
              </details>
            </div>
          </section>
        </article>
      </div>

      <footer className="py-20 border-t text-center"><p className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-400 mb-2">TaskGuru Official 2026</p><p className="text-xs text-zinc-500 italic">Built by Shubham Gautam in Uttar Pradesh, India.</p></footer>
    </main>
  );
}
