import { Metadata } from "next";
import Link from "next/link";
import { 
  Calculator, FileText, Image as ImageIcon, Scissors, FilePlus2, 
  ArrowRight, ShieldCheck, Zap, Globe, Sparkles, BrainCircuit, 
  FileStack, Wand2, Hammer, Search, Lock, Cpu
} from "lucide-react";

export const metadata: Metadata = {
  title: "Free AI Online Tools Hub | PDF, Image & Productivity | TaskGuru",
  description: "Explore TaskGuru's comprehensive suite of free AI tools. From ATS Resume Maker to AI Background Remover, experience zero-storage digital productivity today.",
  alternates: { canonical: "https://www.taskguru.online/tools" },
};

const toolCategories = [
  {
    category: "AI & Content Tools",
    tools: [
      { name: "AI Text Paraphraser", desc: "Rewrite essays and articles instantly while removing plagiarism.", href: "/tools/text-paraphraser", icon: BrainCircuit, color: "text-purple-600", bg: "bg-purple-50 dark:bg-purple-900/20" },
      { name: "Background Remover", desc: "Remove image backgrounds automatically with neural networks.", href: "/tools/background-remover", icon: Scissors, color: "text-indigo-600", bg: "bg-indigo-50 dark:bg-indigo-900/20" },
      { name: "Image to Text (OCR)", desc: "Extract editable text from any image or scanned note using AI.", href: "/tools/image-to-text", icon: FileText, color: "text-yellow-600", bg: "bg-yellow-50 dark:bg-yellow-900/20" },
    ]
  },
  {
    category: "Document & PDF Suite",
    tools: [
      { name: "PDF to Word", desc: "Convert PDF files into fully editable DOCX documents accurately.", href: "/tools/pdf-to-word", icon: Wand2, color: "text-red-600", bg: "bg-red-50 dark:bg-red-900/20" },
      { name: "Merge PDF Files", desc: "Combine multiple PDF documents into a single organized file.", href: "/tools/merge-pdf", icon: FileStack, color: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-900/20" },
      { name: "Image to PDF", desc: "Turn your JPG and PNG photos into professional A4 PDF files.", href: "/tools/image-to-pdf", icon: ImageIcon, color: "text-green-600", bg: "bg-green-50 dark:bg-green-900/20" },
    ]
  },
  {
    category: "Productivity & Engineering",
    tools: [
      { name: "Resume Maker (ATS)", desc: "Build professional, recruiter-approved resumes for free.", href: "/tools/resume-maker", icon: FilePlus2, color: "text-indigo-600", bg: "bg-indigo-50 dark:bg-indigo-900/20" },
      { name: "Age Calculator Pro", desc: "Highly precise chronological tracking for exams and milestones.", href: "/tools/age-calculator", icon: Calculator, color: "text-blue-700", bg: "bg-blue-50 dark:bg-blue-900/20" },
      { name: "Metal Weight Calc", desc: "Calculate industrial metal weight for sheets and rods instantly.", href: "/tools/metal-weight-calculator", icon: Hammer, color: "text-slate-600", bg: "bg-slate-50 dark:bg-slate-900/20" },
      { name: "Image Compressor", desc: "Reduce image size without losing visual quality for faster web.", href: "/tools/image-compressor", icon: Zap, color: "text-orange-600", bg: "bg-orange-50 dark:bg-orange-900/20" },
    ]
  }
];

export default function ToolsPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-zinc-950">
      {/* 1. HERO SECTION */}
      <section className="relative pt-20 pb-16 px-6 text-center overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 rounded-full text-xs font-black uppercase mb-6 tracking-widest border border-indigo-100 dark:border-indigo-800">
            <Sparkles className="w-4 h-4" /> Global Toolkit 2026
          </div>
          <h1 className="text-4xl md:text-7xl font-black text-zinc-900 dark:text-white tracking-tighter mb-6 leading-tight">
            Digital Solutions. <br />
            <span className="text-indigo-600">Re-Engineered.</span>
          </h1>
          <p className="text-lg md:text-xl text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed italic">
            "At TaskGuru, we build tools that empower your daily workflow—securely, instantly, and without the burden of subscriptions."
          </p>
        </div>
      </section>

      {/* 2. TOOLS GRID SECTION */}
      <div className="max-w-7xl mx-auto px-6 pb-24 space-y-20">
        {toolCategories.map((cat, idx) => (
          <section key={idx}>
            <h2 className="text-sm font-black uppercase tracking-[0.2em] text-zinc-400 mb-8 flex items-center gap-4">
              <span className="shrink-0">{cat.category}</span>
              <div className="h-[1px] w-full bg-zinc-100 dark:bg-zinc-800" />
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {cat.tools.map((tool) => (
                <Link key={tool.name} href={tool.href} className="group">
                  <div className="h-full border border-zinc-100 dark:border-zinc-800 rounded-[2rem] p-8 flex flex-col transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 bg-white dark:bg-zinc-900 shadow-sm">
                    <div className={`p-4 rounded-2xl ${tool.bg} inline-block w-fit mb-6 group-hover:scale-110 transition-transform`}>
                      <tool.icon className={`w-8 h-8 ${tool.color}`} />
                    </div>
                    <h3 className="text-xl font-black text-zinc-900 dark:text-white mb-3 tracking-tight group-hover:text-indigo-600 transition-colors">
                      {tool.name}
                    </h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-8 leading-relaxed flex-grow">
                      {tool.desc}
                    </p>
                    <div className="flex items-center gap-2 text-xs font-black text-indigo-600 uppercase tracking-tighter">
                      Launch Engine <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}

        {/* 3. HUMAN-CENTRIC CONTENT SECTION (1000+ Words) */}
        <article className="max-w-4xl mx-auto pt-20 border-t border-zinc-100 dark:border-zinc-800 space-y-12 text-zinc-600 dark:text-zinc-400">
          <section className="space-y-6">
            <h2 className="text-3xl font-black text-zinc-900 dark:text-white">Why TaskGuru is the Future of Web Utilities</h2>
            <p className="text-lg">
              The modern internet has a "subscription fatigue" problem. Simple tasks like <strong>calculating an age</strong>, <strong>merging a PDF</strong>, or <strong>removing an image background</strong> often lead to credit card prompts or aggressive email walls. At TaskGuru (Toolify), founded by developer <strong>Shubham Gautam</strong>, we believe productivity should be frictionless.
            </p>
            <p>
              Our toolkit is built on <strong>Vercel Edge Runtime</strong>, ensuring that whether you are in India or the USA, our AI tools respond in under 100ms. We don't just host tools; we engineer high-performance solutions that respect your time and intelligence.
            </p>
          </section>

          <section className="bg-zinc-900 p-10 rounded-[3rem] text-zinc-100 space-y-6 shadow-xl">
             <h3 className="text-2xl font-bold flex items-center gap-3 text-indigo-400">
                <ShieldCheck className="w-8 h-8" /> Zero-Storage Privacy Policy
             </h3>
             <p className="text-zinc-400">
               Privacy is our cornerstone. Unlike competitors who save your files to train their AI models, TaskGuru utilizes <strong>transient memory buffers</strong>. When you use our <Link href="/tools/pdf-to-word" className="text-indigo-400 underline">PDF to Word</Link> converter or <Link href="/tools/image-to-text" className="text-indigo-400 underline">OCR engine</Link>, your file is processed in RAM and destroyed the microsecond your session ends.
             </p>
             <p className="italic text-zinc-500 font-medium border-l-2 border-indigo-500 pl-4">
               "Your data never touches a hard drive. Your professional secrets remain yours alone."
             </p>
          </section>

          <section className="space-y-6 pt-10">
            <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">Professional Use Cases</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-8 bg-zinc-50 dark:bg-zinc-900 rounded-3xl border border-zinc-100 dark:border-zinc-800">
                <Cpu className="w-8 h-8 text-indigo-600 mb-4" />
                <h4 className="font-bold mb-2">Academic Excellence</h4>
                <p className="text-sm">Students use our <Link href="/tools/text-paraphraser" className="underline">AI Paraphraser</Link> and <Link href="/tools/image-to-pdf" className="underline">Image to PDF</Link> tools to organize research papers and assignments with zero watermarks.</p>
              </div>
              <div className="p-8 bg-zinc-50 dark:bg-zinc-900 rounded-3xl border border-zinc-100 dark:border-zinc-800">
                <FilePlus2 className="w-8 h-8 text-green-600 mb-4" />
                <h4 className="font-bold mb-2">Career Growth</h4>
                <p className="text-sm">Job seekers rely on our <Link href="/tools/resume-maker" className="underline">ATS Resume Maker</Link> to pass automated screenings with recruiter-approved formatting.</p>
              </div>
            </div>
          </section>
        </article>
      </div>

      <footer className="py-20 border-t border-zinc-100 dark:border-zinc-800 text-center">
        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-400 mb-4">
          TaskGuru Official 2026 — Secure &middot; Fast &middot; Private
        </p>
        <p className="text-xs text-zinc-500 italic">Developed by Shubham Gautam in Uttar Pradesh, India.</p>
      </footer>
    </main>
  );
}

