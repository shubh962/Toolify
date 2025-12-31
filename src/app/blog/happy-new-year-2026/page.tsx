"use client";

import React, { useEffect } from 'react';
import Link from 'next/link';
import Script from 'next/script';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { 
  PartyPopper, Zap, ShieldCheck, Heart, ArrowRight, Sparkles, 
  FileText, Scissors, Image as ImageIcon, ScanText, Calculator, BrainCircuit 
} from 'lucide-react';

export default function NewYearPost() {
  
  // ✅ Professional Confetti Animation (GIF se behtar version)
  useEffect(() => {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  }, []);

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

      <main className="max-w-6xl mx-auto px-6 py-24 font-sans selection:bg-indigo-100">
        
        {/* --- SECTION 1: SMOOTH NEW YEAR WISHING --- */}
        <motion.section 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center mb-32 relative"
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
            "Entering a new era of digital excellence. TaskGuru (Toolify) par aapka swagat hai."
          </p>
        </motion.section>

        {/* --- SECTION 2: TEXT & TOOLS --- */}
        <div className="space-y-32">
          
          {/* Authority Text Card */}
          <section className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                Engineering the Future of Productivity
              </h2>
              <div className="text-lg text-slate-600 dark:text-slate-400 space-y-4">
                <p>2025 humare liye seekhne ka saal tha, par <strong>2026 humare execution ka saal hai.</strong> Shubham Gautam ke vision ke saath, TaskGuru ab aapke digital workflow ko aur bhi asan banayega.</p>
                <div className="p-8 bg-indigo-600 text-white rounded-[2.5rem] shadow-xl italic font-bold">
                  "The journey has just begun. Many more innovative AI-powered tools are coming to TaskGuru in 2026 to simplify your digital workflow like never before."
                </div>
              </div>
            </motion.div>

            {/* Tools Grid */}
            <div className="grid grid-cols-2 gap-4">
              <ToolCard icon={Scissors} title="Background Remover" href="/tools/background-remover" color="bg-indigo-50 text-indigo-600" />
              <ToolCard icon={FileText} title="PDF to Word" href="/tools/pdf-to-word" color="bg-blue-50 text-blue-600" />
              <ToolCard icon={ImageIcon} title="Image Compressor" href="/tools/image-compressor" color="bg-green-50 text-green-600" />
              <ToolCard icon={BrainCircuit} title="AI Paraphraser" href="/tools/text-paraphraser" color="bg-purple-50 text-purple-600" />
            </div>
          </section>

          {/* Trust Section */}
          <section className="bg-slate-900 text-white p-12 rounded-[3.5rem] text-center relative overflow-hidden">
            <Sparkles className="absolute top-0 left-0 w-32 h-32 opacity-10" />
            <h2 className="text-3xl font-bold mb-6">Built on Integrity</h2>
            <p className="max-w-3xl mx-auto text-slate-400 text-lg mb-8">
              Hamari <strong>Zero-Storage Policy</strong> 2026 mein bhi barqaraar rahegi. Aapka data humesha aapke browser mein hi process hoga, server par nahi.
            </p>
            <div className="flex flex-wrap justify-center gap-8">
               <div className="flex items-center gap-2 text-sm font-bold"><ShieldCheck className="text-green-500"/> Private</div>
               <div className="flex items-center gap-2 text-sm font-bold"><Zap className="text-yellow-500"/> Fast</div>
               <div className="flex items-center gap-2 text-sm font-bold"><Heart className="text-red-500"/> Free</div>
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
    <Link href={href} className={`p-8 rounded-3xl flex flex-col items-center justify-center gap-3 transition-transform hover:scale-105 shadow-sm border border-transparent hover:border-slate-200 ${color}`}>
      <Icon className="w-8 h-8" />
      <span className="text-[10px] font-black uppercase tracking-widest text-center">{title}</span>
    </Link>
  );
}

