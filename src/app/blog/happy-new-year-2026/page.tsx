"use client";

import React from 'react';
import Link from 'next/link';
import Script from 'next/script';
import { motion } from 'framer-motion';
import { 
  PartyPopper, Zap, ShieldCheck, Heart, ArrowRight, Sparkles, 
  FileText, Scissors, Image as ImageIcon, ScanText, Calculator, BrainCircuit, Rocket
} from 'lucide-react';

export default function NewYearPost() {
  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "Happy New Year 2026: AI Productivity at TaskGuru",
    "description": "Celebrate 2026 with TaskGuru. Founder Shubham Gautam outlines the new roadmap for secure AI utilities.",
    "author": { "@type": "Person", "name": "Shubham Gautam", "url": "https://taskguru.online/about" },
    "datePublished": "2025-12-31",
    "publisher": { "@type": "Organization", "name": "TaskGuru" }
  };

  return (
    <>
      <Script id="new-year-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <main className="max-w-6xl mx-auto px-6 py-24 font-sans selection:bg-indigo-100 min-h-screen overflow-hidden relative">
        
        {/* SECTION 1: WISHING WITH PURE CSS CELEBRATION */}
        <motion.section 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-32 relative z-10"
        >
          <div className="inline-flex items-center gap-2 px-6 py-2 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 rounded-full text-xs font-black uppercase tracking-widest mb-8 border border-indigo-100 dark:border-indigo-800">
            <PartyPopper className="w-4 h-4" /> Official 2026 Launch
          </div>
          
          <h1 className="text-6xl md:text-9xl font-black text-slate-900 dark:text-white tracking-tighter mb-8 leading-[0.85]">
            Happy <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
              New Year 2026
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-medium italic">
            "A new chapter in productivity begins today. TaskGuru (Toolify) par aapka swagat hai."
          </p>

          {/* GIF Style CSS Particles (No Library Needed) */}
          <div className="absolute inset-0 pointer-events-none -z-10">
            <div className="absolute top-0 left-1/4 w-2 h-8 bg-blue-500 rounded-full animate-bounce opacity-20" />
            <div className="absolute top-10 right-1/4 w-2 h-6 bg-pink-500 rounded-full animate-pulse opacity-20" />
            <div className="absolute bottom-0 left-1/3 w-2 h-10 bg-green-500 rounded-full animate-bounce opacity-20" />
          </div>
        </motion.section>

        {/* SECTION 2: TEXT & TOOLS */}
        <div className="space-y-32 relative z-10">
          <section className="grid lg:grid-cols-2 gap-12 items-center text-left">
            <div className="space-y-6">
              <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
                <Rocket className="text-indigo-600" /> Engineering 2026
              </h2>
              <div className="text-lg text-slate-600 dark:text-slate-400 space-y-4">
                <p>2025 humare liye seekhne ka saal tha, par <strong>2026 humare execution ka saal hai.</strong> Shubham Gautam ke vision ke saath, TaskGuru ab aapke digital workflow ko aur bhi asan banayega.</p>
                <div className="p-8 bg-indigo-600 text-white rounded-[2.5rem] shadow-xl italic font-bold">
                  "The journey has just begun. Many more innovative AI-powered tools are coming to TaskGuru in 2026 to simplify your digital workflow like never before."
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <ToolCard icon={Scissors} title="BG Remover" href="/tools/background-remover" color="bg-indigo-50 text-indigo-600" />
              <ToolCard icon={FileText} title="PDF to Word" href="/tools/pdf-to-word" color="bg-blue-50 text-blue-600" />
              <ToolCard icon={ImageIcon} title="Image Comp" href="/tools/image-compressor" color="bg-green-50 text-green-600" />
              <ToolCard icon={BrainCircuit} title="AI Paraphraser" href="/tools/text-paraphraser" color="bg-purple-50 text-purple-600" />
            </div>
          </section>
        </div>

        <footer className="mt-40 pt-12 border-t text-center text-[10px] font-black uppercase tracking-[0.5em] text-slate-400">
          TaskGuru Official 2026 — Product of Shubham Gautam
        </footer>
      </main>
    </>
  );
}

function ToolCard({ icon: Icon, title, href, color }: any) {
  return (
    <Link href={href} className={`p-8 rounded-3xl flex flex-col items-center justify-center gap-3 transition-all hover:scale-105 shadow-sm border border-transparent hover:border-slate-200 ${color}`}>
      <Icon className="w-8 h-8" />
      <span className="text-[10px] font-black uppercase tracking-widest text-center">{title}</span>
    </Link>
  );
}

