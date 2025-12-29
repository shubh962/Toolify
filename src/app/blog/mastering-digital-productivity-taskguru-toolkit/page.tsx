import React from "react";
import Link from "next/link"; // Added for internal navigation
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { 
  FileText, 
  Image as ImageIcon, 
  Scaling, 
  Languages, 
  Calculator, 
  Hammer, 
  Merge, 
  Type, 
  ShieldCheck, 
  Zap,
  BarChart3, 
  Globe, 
  Lock, 
  MousePointer2,
  CheckCircle2,
  ExternalLink // Added for CTA icons
} from "lucide-react";

export const metadata = {
  title: "Mastering Digital Productivity: The Ultimate TaskGuru Toolkit Guide",
  description: "Learn how to use TaskGuru's free AI tools like Resume Maker, Background Remover, and more to boost your workflow.",
  alternates: {
    canonical: "https://www.taskguru.online/blog/mastering-digital-productivity-taskguru-toolkit",
  },
};

export default function BlogPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16 bg-white text-slate-900 font-sans selection:bg-blue-100">
      
      {/* ================= HERO SECTION ================= */}
      <header className="text-center mb-24">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-sm font-bold mb-6">
          <Zap size={16} fill="currentColor" /> 2026 Productivity Report
        </div>
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 text-slate-900 leading-[1.1]">
          Revolutionizing Digital Productivity: The Comprehensive Guide to <span className="text-blue-600">TaskGuru Utilities</span>
        </h1>
        <p className="text-2xl text-slate-500 max-w-4xl mx-auto font-medium leading-relaxed">
          In an era defined by rapid digital transformation, TaskGuru provides the high-performance, 
          free AI-powered tools needed to eliminate technical friction and streamline professional workflows.
        </p>
      </header>

      {/* ================= INTRODUCTION ================= */}
      <section className="prose prose-slate max-w-none mb-24 border-b pb-16">
        <h2 className="text-3xl font-black mb-6 uppercase tracking-tight text-slate-900">The Modern Digital Challenge</h2>
        <div className="grid md:grid-cols-2 gap-12 text-lg text-slate-600">
          <p>
            Professional workflows often grind to a halt when faced with simple but tedious tasks: converting file formats, 
            calculating precise measurements, or drafting job-ready documents. <strong>TaskGuru</strong> has emerged as a 
            premier destination for these needs, offering a centralized &quot;all-in-one&quot; toolkit designed for efficiency.
          </p>
          <p>
            This guide provides an exhaustive deep dive into our primary utilities, exploring their technical foundations, 
            practical applications, and how they empower users to achieve professional-grade results without expensive 
            SaaS subscriptions or intrusive watermarks.
          </p>
        </div>
      </section>

      {/* ================= TOOL 1: RESUME MAKER ================= */}
      <section className="mb-32 group">
        <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
                <div className="bg-blue-600 p-4 rounded-3xl text-white shadow-lg shadow-blue-200 group-hover:scale-110 transition-transform">
                    <FileText size={40} />
                </div>
                <div>
                    <h2 className="text-4xl font-black uppercase tracking-tight text-slate-900">1. Professional Resume Maker</h2>
                    <p className="text-blue-600 font-bold text-sm uppercase tracking-widest">ATS-Optimized Engine</p>
                </div>
            </div>
            <Link href="/tools/resume-maker" className="hidden md:flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-md">
                Try Tool Now <ExternalLink size={16} />
            </Link>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-12">
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-2xl font-bold text-slate-900">Engineering Career Success in the ATS Era</h3>
            <p className="text-slate-600 text-lg">
              The modern job market is governed by <strong>Applicant Tracking Systems (ATS)</strong>. 
              Most graphic-heavy templates from standard word processors are unreadable by these digital gatekeepers. 
              The TaskGuru <strong>free resume builder</strong> enforces a single-column, text-heavy layout optimized for 
              maximum &quot;parsing compatibility&quot;.
            </p>
            <div className="bg-slate-50 p-6 rounded-2xl border-l-4 border-blue-600 italic text-slate-700">
              &quot;Recruiters spend an average of 6–7 seconds scanning a resume. TaskGuru ensures your data is 
              structured for immediate impact during that critical window.&quot;
            </div>
          </div>
          <Card className="bg-blue-600 text-white border-none shadow-xl p-8 rounded-[2rem]">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-white"><MousePointer2 size={24} /> Workflow</h3>
            <ul className="space-y-6 text-sm font-semibold opacity-90">
              <li className="flex gap-4 text-white">
                <span className="flex-none w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">01</span>
                <span>Input data into the guided form steps.</span>
              </li>
              <li className="flex gap-4 text-white">
                <span className="flex-none w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">02</span>
                <span>Monitor real-time ATS scoring for 80%+ compatibility.</span>
              </li>
              <li className="flex gap-4 text-white">
                <span className="flex-none w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">03</span>
                <span>Generate a text-based, searchable PDF instantly.</span>
              </li>
            </ul>
          </Card>
        </div>
        <Link href="/tools/resume-maker" className="md:hidden w-full flex justify-center items-center gap-2 bg-blue-600 text-white px-6 py-4 rounded-xl font-bold mb-8">
            Build My Resume <ExternalLink size={16} />
        </Link>

        <Accordion type="single" collapsible className="w-full bg-slate-50 rounded-2xl px-6">
          <AccordionItem value="faq-1" className="border-slate-200">
            <AccordionTrigger className="font-bold text-lg py-6 text-slate-900">Is this resume maker truly free?</AccordionTrigger>
            <AccordionContent className="text-slate-600 pb-6">
              Absolutely. TaskGuru provides unlimited PDF exports with no hidden paywalls, subscription tiers, or watermarks.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="faq-2" className="border-none">
            <AccordionTrigger className="font-bold text-lg py-6 text-slate-900">How does the ATS matching logic work?</AccordionTrigger>
            <AccordionContent className="text-slate-600 pb-6">
              Our algorithm analyzes section presence, contact data integrity, and the use of industry-specific action verbs.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      {/* ================= TOOL 2: BACKGROUND REMOVER ================= */}
      <section className="mb-32 group">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <div className="flex items-center gap-4">
                <div className="bg-purple-600 p-4 rounded-3xl text-white shadow-lg shadow-purple-200 group-hover:scale-110 transition-transform">
                    <ImageIcon size={40} />
                </div>
                <h2 className="text-4xl font-black uppercase tracking-tight text-slate-900">2. Advanced Background Remover</h2>
            </div>
            <Link href="/tools/background-remover" className="inline-flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-purple-700 transition-all shadow-md w-fit">
                Start Removing <ExternalLink size={16} />
            </Link>
        </div>
        <p className="text-xl text-slate-600 mb-10 leading-relaxed">
          In a world dominated by social media and e-commerce, high-quality imagery is essential. Our 
          AI-powered background remover uses deep learning to distinguish between subjects and 
          surroundings with unmatched precision.
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: "AI Automation", desc: "Automated neural networks identify foreground subjects and render backgrounds transparent in seconds.", icon: <Zap className="text-purple-600" /> },
            { title: "Efficiency", desc: "Reduce 15 minutes of manual masking in Photoshop to a 3-second automated process for complex subjects.", icon: <BarChart3 className="text-purple-600" /> },
            { title: "Transparency", desc: "Download high-resolution PNG files ready for professional marketing, ads, or profile photos.", icon: <Globe className="text-purple-600" /> }
          ].map((feature, i) => (
            <div key={i} className="p-8 bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
              <div className="mb-4 bg-purple-50 p-3 rounded-xl w-fit">{feature.icon}</div>
              <h4 className="font-bold text-xl mb-3 text-slate-900">{feature.title}</h4>
              <p className="text-slate-500 text-sm leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= TOOL 3: IMAGE COMPRESSOR ================= */}
      <section className="mb-32">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <div className="flex items-center gap-4">
                <div className="bg-green-600 p-4 rounded-3xl text-white shadow-lg shadow-green-200">
                    <Scaling size={40} />
                </div>
                <h2 className="text-4xl font-black uppercase tracking-tight text-slate-900">3. High-Fidelity Image Compressor</h2>
            </div>
            <Link href="/tools/image-compressor" className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-700 transition-all shadow-md w-fit">
                Compress Now <ExternalLink size={16} />
            </Link>
        </div>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="prose prose-slate max-w-none text-lg text-slate-600">
            <p>
              Large image files are the primary cause of slow website speeds. Our compressor utilizes 
              lossy and lossless algorithms to shrink file sizes without compromising visual integrity.
            </p>
            <ul className="space-y-4 font-medium text-slate-900">
              <li className="flex gap-2 items-center"><CheckCircle2 className="text-green-600" /> Boost SEO with faster page loads</li>
              <li className="flex gap-2 items-center"><CheckCircle2 className="text-green-600" /> Save storage on cloud drives</li>
              <li className="flex gap-2 items-center"><CheckCircle2 className="text-green-600" /> Multiple file batch processing</li>
            </ul>
          </div>
          <div className="bg-slate-900 p-10 rounded-[3rem] text-white">
            <h4 className="text-2xl font-bold mb-4 flex items-center gap-2 text-green-400">Optimization Guide</h4>
            <p className="opacity-70 text-sm leading-relaxed mb-6">
              For standard web usage, a compression level of 70-80% is recommended. This maintains 
              retina-ready quality while reducing the payload by up to 90%.
            </p>
            <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-green-500 w-[80%]" />
            </div>
            <p className="mt-4 text-[10px] uppercase font-bold tracking-widest opacity-40">Recommended Settings</p>
          </div>
        </div>
      </section>

      {/* ================= TOOL 4: IMAGE-TO-TEXT ================= */}
      <section className="mb-32">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <div className="flex items-center gap-4">
                <div className="bg-orange-600 p-4 rounded-3xl text-white shadow-lg shadow-orange-200">
                    <Type size={40} />
                </div>
                <h2 className="text-4xl font-black uppercase tracking-tight text-slate-900">4. Intelligent Image-to-Text (OCR)</h2>
            </div>
            <Link href="/tools/image-to-text" className="inline-flex items-center gap-2 bg-orange-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-orange-700 transition-all shadow-md w-fit">
                Extract Text <ExternalLink size={16} />
            </Link>
        </div>
        <Card className="border-none bg-slate-50 p-10 rounded-[2.5rem] shadow-none">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-slate-900">Unlocking Static Data</h3>
              <p className="text-slate-600 leading-relaxed mb-6">
                Extract editable data from non-searchable screenshots or physical documents using Optical 
                Character Recognition (OCR). This tool eliminates manual data entry from receipts, 
                invoices, or academic texts.
              </p>
              <div className="flex flex-wrap gap-2">
                {['Receipts', 'Book Pages', 'Invoices', 'Handwritten Notes'].map(tag => (
                  <span key={tag} className="px-3 py-1 bg-white border rounded-full text-xs font-bold text-slate-500 uppercase">{tag}</span>
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
                <h4 className="font-bold mb-2 flex items-center gap-2 text-slate-900"><Globe size={18} className="text-orange-600" /> Multi-Language Support</h4>
                <p className="text-sm text-slate-500">Our OCR engine is trained on diverse scripts, including Latin and Devanagari, for global professional use.</p>
              </div>
              <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
                <h4 className="font-bold mb-2 flex items-center gap-2 text-slate-900"><Lock size={18} className="text-orange-600" /> Privacy Focused</h4>
                <p className="text-sm text-slate-500">Your documents are processed locally in-browser; TaskGuru never stores your personal data on our servers.</p>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* ================= ADDITIONAL TOOLS GRID ================= */}
      <section className="mb-32 border-t pt-24">
        <h2 className="text-3xl font-black text-center mb-16 uppercase tracking-widest text-slate-900">More Essential Utilities</h2>
        <div className="grid md:grid-cols-2 gap-10">
          <Link href="/tools/merge-pdf" className="block group">
            <Card className="p-8 rounded-[2rem] border-slate-100 group-hover:border-red-600 transition-colors shadow-none h-full">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-red-600 p-3 rounded-2xl text-white"><Merge size={24} /></div>
                <h3 className="text-2xl font-bold text-slate-900">PDF Merger</h3>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed mb-4">
                Handle project reporting with ease by combining separate PDFs into a single document. 
                Our merger maintains file sequence and integrity.
              </p>
              <span className="text-red-600 font-bold text-sm flex items-center gap-1">Try Now <ExternalLink size={14}/></span>
            </Card>
          </Link>

          <Link href="/tools/age-calculator" className="block group">
            <Card className="p-8 rounded-[2rem] border-slate-100 group-hover:border-teal-600 transition-colors shadow-none h-full">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-teal-600 p-3 rounded-2xl text-white"><Calculator size={24} /></div>
                <h3 className="text-2xl font-bold text-slate-900">Age Calculator</h3>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed mb-4">
                Calculate exact ages down to the minute. Perfect for insurance forms, legal filings, 
                and chronological medical records.
              </p>
              <span className="text-teal-600 font-bold text-sm flex items-center gap-1">Try Now <ExternalLink size={14}/></span>
            </Card>
          </Link>

          <Link href="/tools/metal-weight-calculator" className="block group">
            <Card className="p-8 rounded-[2rem] border-slate-100 group-hover:border-zinc-800 transition-colors shadow-none h-full">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-zinc-800 p-3 rounded-2xl text-white"><Hammer size={24} /></div>
                <h3 className="text-2xl font-bold text-slate-900">Metal Weight Calculator</h3>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed mb-4">
                Essential for construction and engineering. Calculate the weight of bars, pipes, and 
                sheets across materials with precision.
              </p>
              <span className="text-zinc-800 font-bold text-sm flex items-center gap-1">Try Now <ExternalLink size={14}/></span>
            </Card>
          </Link>

          <Link href="/tools/text-paraphraser" className="block group">
            <Card className="p-8 rounded-[2rem] border-slate-100 group-hover:border-blue-600 transition-colors shadow-none h-full">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-blue-600 p-3 rounded-2xl text-white"><Languages size={24} /></div>
                <h3 className="text-2xl font-bold text-slate-900">Text Paraphraser</h3>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed mb-4">
                Refine your writing voice. Our AI rewrite assistant helps find synonyms and alternate 
                sentence structures to improve tone.
              </p>
              <span className="text-blue-600 font-bold text-sm flex items-center gap-1">Try Now <ExternalLink size={14}/></span>
            </Card>
          </Link>
        </div>
      </section>

      {/* ================= CONCLUSION ================= */}
      <footer className="mt-40 text-center pb-20">
        <h2 className="text-5xl font-black mb-8 leading-tight text-slate-900">Master Your Workflow with <br /><span className="text-blue-600 underline">TaskGuru Excellence</span></h2>
        <p className="text-xl text-slate-500 max-w-2xl mx-auto mb-12">
          As digital productivity needs continue to evolve, TaskGuru remains dedicated to providing free, 
          privacy-focused, and high-performance solutions for students and professionals worldwide.
        </p>
        <div className="flex flex-col md:flex-row items-center justify-center gap-10 border-t pt-10">
          <p className="text-slate-400 text-sm font-black uppercase tracking-[0.3em]">
            © 2026 TASKGURU TOOLKIT — EMPOWERING SUCCESS
          </p>
        </div>
      </footer>
    </div>
  );
}
