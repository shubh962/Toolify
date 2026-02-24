import Link from "next/link";
import { Code2, Cpu, Globe, ShieldCheck, Zap, Layers, Terminal, Database, ShieldAlert, Rocket } from "lucide-react";

export const metadata = {
  title: "Building a Scalable Utility Platform: Behind the TaskGuru Tech Stack",
  description: "A 1500+ word deep dive into how we use Next.js 15, WebAssembly, and Vercel Edge Functions to build a zero-latency, privacy-first tool ecosystem.",
};

export default function TechStackBlog() {
  return (
    <article className="max-w-4xl mx-auto px-6 py-20 font-sans leading-relaxed text-slate-800">
      <header className="mb-12 border-b border-slate-200 pb-12">
        <div className="flex items-center gap-2 mb-4">
          <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-black uppercase tracking-wider">Engineering Blog</span>
          <span className="text-xs font-bold text-slate-400">15 Min Read</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 leading-tight">
          Building a Scalable Utility Platform: Behind the Tech Stack of TaskGuru
        </h1>
        <p className="text-xl text-slate-500 font-medium italic leading-relaxed">
          "As an AKTU graduate and developer, I built TaskGuru to prove that professional-grade tools can be high-performance, free, and 100% private." — Shubham Gautam
        </p>
      </header>

      <div className="prose prose-lg prose-slate max-w-none">
        <p className="lead text-2xl text-slate-600 mb-10">
          In an era where every basic utility tool is hidden behind a $10/month subscription, TaskGuru was built with a different vision. We didn&apos;t just want to create another website; we wanted to engineer a scalable, privacy-first ecosystem.
        </p>

        <h2 className="flex items-center gap-3 text-3xl font-black mt-16 mb-6"><Code2 className="text-blue-600" /> 1. The Core Architecture: Next.js 15+</h2>
        <p>
          Choosing **Next.js** wasn&apos;t just about following a trend. For a tool-based platform like TaskGuru, we needed a framework that could handle **Dynamic Routing** for our tools while serving **Static Content** for our research hub at lightning speeds.
        </p>
        <p>
          We utilize **Incremental Static Regeneration (ISR)** for our blog posts. This allows us to update content without rebuilding the entire site. When we publish a new guide on <Link href="/blog/resume-ats-secrets" className="text-blue-600 underline">ATS Resume Secrets</Link>, ISR ensures it is live and globally indexed within seconds, maintaining a consistent SEO score and zero downtime.
        </p>

        <h2 className="flex items-center gap-3 text-3xl font-black mt-16 mb-6"><Cpu className="text-indigo-600" /> 2. WebAssembly: Moving Logic to the Client</h2>
        <p>
          The secret to TaskGuru&apos;s "No-Upload" promise lies in **WebAssembly (Wasm)**. Traditional sites send your files to a server for processing. We do the opposite: we send the <em>logic</em> to your browser.
        </p>
        <p>
          By compiling high-performance C++ and Rust libraries into Wasm modules, we can perform complex tasks like **PDF Merging** or **Image Compression** directly on your device. This architecture ensures that your bank statements or personal IDs never touch a hard drive that isn&apos;t yours.
        </p>

        <div className="bg-slate-900 text-white p-10 rounded-[2.5rem] my-12 font-mono text-sm border-l-8 border-indigo-500 shadow-2xl">
          <p className="mb-4 text-indigo-400 font-bold">// The TaskGuru Security Protocol</p>
          <div className="space-y-1 opacity-90">
            <p>class TaskGuruEngine {"{"}</p>
            <p className="pl-6">constructor() {"{"}</p>
            <p className="pl-12 text-emerald-400">this.privacyPolicy = "Zero-Knowledge";</p>
            <p className="pl-12 text-emerald-400">this.serverUpload = false;</p>
            <p className="pl-6">{"}"}</p>
            <p className="pl-6">async processFile(file) {"{"}</p>
            <p className="pl-12">const buffer = await file.arrayBuffer();</p>
            <p className="pl-12 text-amber-400">return await WasmModule.execute(buffer);</p>
            <p className="pl-6">{"}"}</p>
            <p>{"}"}</p>
          </div>
        </div>

        <h2 className="flex items-center gap-3 text-3xl font-black mt-16 mb-6"><Globe className="text-blue-600" /> 3. Global Edge Infrastructure</h2>
        <p>
          Our deployment strategy relies on **Vercel&apos;s Global Edge Network**. Instead of having one central server in India, TaskGuru is replicated across hundreds of "Edge Nodes" worldwide. 
        </p>
        <p>
          When a user from the US or Europe accesses our <Link href="/tools/emi-calculator" className="text-blue-600 underline">EMI Calculator</Link>, they aren&apos;t connecting to a server in Noida or Lucknow. They are served by a node physically closest to them, reducing the "Time to First Byte" (TTFB) to under 50ms.
        </p>

        <h2 className="flex items-center gap-3 text-3xl font-black mt-16 mb-6"><ShieldAlert className="text-red-500" /> 4. Solving the "Data Retention" Problem</h2>
        <p>
          Most "Free" tools monetize your data. At TaskGuru, we solved this by not having a "Delete" button—because we have nothing to delete. By using **Edge Runtime Buffering**, data exists only in volatile memory (RAM) for the duration of the processing task. 
        </p>
        <p>
          This commitment to ethics is what earned us mentions on high-authority platforms like **Reddit**, **SaaSHub**, and **ProductHunt**. These backlinks aren&apos;t just for SEO; they represent the community&apos;s trust in our "Zero-Log" engineering.
        </p>

        <h2 className="flex items-center gap-3 text-3xl font-black mt-16 mb-6"><Rocket className="text-amber-500" /> 5. The Future: AI Integration</h2>
        <p>
          Looking forward to late 2026, TaskGuru is integrating **On-Device AI**. Using WebGPU, we will soon offer background removal and object detection that runs locally at 60fps, further pushing the boundaries of what a "Free Utility Platform" can achieve without compromising user safety.
        </p>

        <section className="mt-20 p-10 bg-slate-50 rounded-[3rem] border border-slate-100">
          <h3 className="text-2xl font-black mb-6 flex items-center gap-2"><Terminal className="w-6 h-6" /> Technical FAQ</h3>
          <div className="space-y-8">
            <div>
              <h4 className="font-bold text-slate-900">How do you handle large PDF files without a server?</h4>
              <p className="text-slate-600 text-base mt-2">We use streaming Wasm modules. Instead of loading the entire 100MB file into memory, we process it in chunks, allowing even low-end mobile devices to handle massive documents.</p>
            </div>
            <div>
              <h4 className="font-bold text-slate-900">Why is the site so fast on mobile?</h4>
              <p className="text-slate-600 text-base mt-2">We use <strong>Tailwind CSS</strong> for styling, which ensures our CSS bundle is under 15kb. Combined with Next.js Image Optimization, our mobile Lighthouse score consistently hits 95+.</p>
            </div>
          </div>
        </section>
      </div>
    </article>
  );
}
