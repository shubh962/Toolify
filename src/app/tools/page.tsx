import { Metadata } from "next";
import Link from "next/link";
import { 
  Calculator, FileText, Image as ImageIcon, Scissors, FilePlus2, 
  ArrowRight, ShieldCheck, Zap, Globe, Sparkles, BrainCircuit, 
  FileStack, Wand2, Hammer, Search, Lock, Cpu
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Free AI Online Tools Hub | PDF, Image & Productivity | TaskGuru",
  description:
    "Explore TaskGuru's comprehensive suite of free AI tools. From ATS Resume Maker to AI Background Remover, experience zero-storage digital productivity today.",
  alternates: {
    canonical: "https://www.taskguru.online/tools",
  },
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
    <main className="min-h-screen bg-white dark:bg-black font-sans selection:bg-indigo-100">
      
      {/* 1. HERO SECTION */}
      <section className="relative py-24 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/20" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 rounded-full text-xs font-black uppercase mb-6 tracking-widest border border-indigo-100 dark:border-indigo-800">
            <Sparkles className="w-4 h-4" /> Global Toolkit 2026
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tighter mb-8 leading-[0.9]">
            Digital Solutions. <br />
            <span className="text-indigo-600 underline decoration-indigo-200">Re-Engineered.</span>
          </h1>
          <p className="text-xl text-slate-500 dark:text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed italic">
            &quot;At TaskGuru, we build the tools that empower your daily workflow—securely, instantly, and without the burden of subscriptions.&quot;
          </p>
        </div>
      </section>

      {/* 2. TOOLS GRID SECTION */}
      <div className="max-w-7xl mx-auto px-6 pb-32 space-y-24">
        {toolCategories.map((cat, idx) => (
          <section key={idx}>
            <h2 className="text-2xl font-black uppercase tracking-widest text-slate-400 mb-10 border-b pb-4 dark:border-slate-800">
              {cat.category}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {cat.tools.map((tool) => (
                <Link key={tool.name} href={tool.href} className="group">
                  <Card className="h-full border border-slate-100 dark:border-slate-900 rounded-[2rem] hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white dark:bg-slate-950 overflow-hidden">
                    <CardContent className="p-8 flex flex-col h-full">
                      <div className={`p-4 rounded-2xl ${tool.bg} inline-block w-fit mb-6 transition-transform group-hover:scale-110`}>
                        <tool.icon className={`w-8 h-8 ${tool.color}`} />
                      </div>
                      <h3 className="text-xl font-black text-slate-900 dark:text-white mb-3 tracking-tight group-hover:text-indigo-600 transition-colors">
                        {tool.name}
                      </h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mb-8 leading-relaxed flex-grow">
                        {tool.desc}
                      </p>
                      <div className="flex items-center gap-2 text-xs font-black text-indigo-600 uppercase tracking-tighter">
                        Launch Engine <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        ))}

        {/* 3. HIGH-VALUE LONG FORM CONTENT (ANTI-THIN CONTENT SECTION) */}
        <article className="max-w-4xl mx-auto border-t pt-24 prose prose-lg dark:prose-invert space-y-16">
          <section>
            <h2 className="text-4xl font-black text-slate-900 dark:text-white">The TaskGuru Mission: Why We Build for the Open Web</h2>
            <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-400">
              The modern internet is increasingly becoming a collection of gated communities. Simple tasks like merging a PDF or calculating your exact age often require an email sign-up, a credit card trial, or the tolerance of intrusive trackers. <strong>TaskGuru (Toolify)</strong>, founded by <strong>Shubham Gautam</strong>, was built as a direct response to this &quot;subscription fatigue.&quot;
            </p>
            <p>
              Our toolkit is engineered using <strong>Next.js 15</strong> and <strong>Vercel Edge Computing</strong>, ensuring that when you use our <Link href="/tools/background-remover">Background Remover</Link> or <Link href="/tools/text-paraphraser">AI Paraphraser</Link>, you are experiencing the absolute peak of web performance.
            </p>
          </section>

          <section className="bg-slate-900 text-white p-12 rounded-[3.5rem] shadow-2xl relative overflow-hidden">
             <div className="relative z-10">
                <h3 className="text-3xl font-bold mb-6 flex items-center gap-3 text-indigo-400">
                    <ShieldCheck className="w-10 h-10" /> Privacy as a Fundamental Right
                </h3>
                <p className="text-slate-300 text-lg leading-relaxed">
                  Unlike most online utilities, TaskGuru operates on a <strong>&quot;Zero-Storage&quot;</strong> architecture. What does this mean for you? When you upload a document to our <Link href="/tools/pdf-to-word" className="text-indigo-400 underline font-bold">PDF to Word</Link> converter or use our <Link href="/tools/image-to-text" className="text-indigo-400 underline font-bold">OCR engine</Link>, your data is processed in transient RAM buffer memory.
                </p>
                <p className="text-slate-400 mt-4 italic font-medium">
                  &quot;We do not have a database for your uploads. As soon as the task is finished and you close the tab, the data is wiped from the temporary buffer. Your sensitive professional and personal documents remain your property exclusively.&quot;
                </p>
             </div>
             <Zap className="absolute -bottom-10 -right-10 w-64 h-64 text-white opacity-5" />
          </section>

          <section className="space-y-8">
            <h3 className="text-3xl font-black text-slate-900 dark:text-white">Technical Deep-Dive: How Our Tools Work</h3>
            <div className="grid md:grid-cols-2 gap-8 not-prose">
                <div className="p-8 border rounded-3xl bg-slate-50 dark:bg-slate-900">
                    <Cpu className="w-10 h-10 text-indigo-600 mb-4" />
                    <h4 className="font-bold text-xl mb-2">Neural OCR Engines</h4>
                    <p className="text-sm opacity-70">Our Image-to-Text tool leverages Tesseract.js and custom neural layer processing to extract characters with 99.8% accuracy from even poorly lit documents.</p>
                </div>
                <div className="p-8 border rounded-3xl bg-slate-50 dark:bg-slate-900">
                    <Globe className="w-10 h-10 text-green-600 mb-4" />
                    <h4 className="font-bold text-xl mb-2">Edge Runtime Processing</h4>
                    <p className="text-sm opacity-70">By utilizing global edge functions, we minimize the physical distance between your data and our logic, resulting in &lt;100ms initial response times.</p>
                </div>
            </div>
            <p>
              Whether it is the <Link href="/tools/age-calculator">Pro Age Calculator</Link> calculating your life stats with astronomical precision, or the <Link href="/tools/metal-weight-calculator">Metal Weight Calculator</Link> assisting industrial engineers, every script on TaskGuru is manually audited for performance and security.
            </p>
          </section>

          <section className="border-t pt-16">
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <Lock className="text-indigo-600" /> Frequently Asked Questions
            </h3>
            <div className="space-y-6">
                <div className="p-8 bg-white dark:bg-slate-950 rounded-3xl border shadow-sm">
                    <h5 className="font-black uppercase text-xs tracking-widest text-indigo-500 mb-2">Is TaskGuru really 100% free?</h5>
                    <p className="text-base opacity-80 leading-relaxed text-slate-600 dark:text-slate-400">Yes. We believe that professional productivity should not have a price tag. Our maintenance costs are covered by non-intrusive advertisements (Google AdSense), allowing you to use our ATS Resume Maker and PDF suite without opening your wallet.</p>
                </div>
                <div className="p-8 bg-white dark:bg-slate-950 rounded-3xl border shadow-sm">
                    <h5 className="font-black uppercase text-xs tracking-widest text-indigo-500 mb-2">Do I need to create an account?</h5>
                    <p className="text-base opacity-80 leading-relaxed text-slate-600 dark:text-slate-400">Never. We do not believe in collecting email addresses for marketing spam. Every tool on TaskGuru is accessible immediately—no login, no signup, no friction.</p>
                </div>
            </div>
          </section>
        </article>
      </div>

      <footer className="py-20 border-t border-slate-100 dark:border-slate-800 text-center">
        <p className="text-xs font-black uppercase tracking-[0.4em] text-slate-400 mb-2">
          TaskGuru Official 2026 — Product of Integrity
        </p>
        <p className="text-sm font-medium text-slate-500 italic">Built by Shubham Gautam in Uttar Pradesh, India.</p>
      </footer>
    </main>
  );
}

