"use client";

import React from 'react';
import Link from 'next/link';
import Script from 'next/script';
import { motion } from 'framer-motion';
import { 
  PartyPopper, Rocket, ArrowRight, 
  FileText, Scissors, Image as ImageIcon, BrainCircuit, Zap
} from 'lucide-react';

export default function NewYearGreetings() {
  
  // SEO Structured Data for Google Rich Results
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "Happy New Year 2026: The Future of TaskGuru AI",
    "description": "Celebrate 2026 with TaskGuru. Explore our high-performance AI toolkit and our vision for secure digital productivity.",
    "author": { "@type": "Person", "name": "Shubham Gautam" },
    "datePublished": "2025-12-31",
    "publisher": { "@type": "Organization", "name": "TaskGuru" }
  };

  return (
    <>
      <Script id="new-year-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <main className="min-h-screen bg-white dark:bg-black font-sans selection:bg-indigo-100 overflow-hidden pb-20">
        
        {/* --- SECTION 1: NEW YEAR GREETING --- */}
        <section className="relative pt-32 pb-24 px-6 text-center border-b border-gray-100 dark:border-gray-900">
          {/* Simple confetti animation */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 800, opacity: [0, 1, 0], rotate: 360 }}
                transition={{ duration: Math.random() * 4 + 3, repeat: Infinity, delay: Math.random() * 5 }}
                className="absolute w-2 h-2 rounded-full"
                style={{ 
                    left: `${Math.random() * 100}%`, 
                    backgroundColor: ['#6366f1', '#ec4899', '#22c55e', '#f59e0b'][i % 4] 
                }}
              />
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-6 py-2 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 rounded-full text-xs font-black uppercase tracking-widest mb-10 border border-indigo-100 dark:border-indigo-800"
          >
            <PartyPopper className="w-4 h-4" /> Global Productivity Update 2026
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-9xl font-black text-slate-900 dark:text-white tracking-tighter mb-10 leading-[0.85]"
          >
            Happy <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
              New Year 2026
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-xl md:text-3xl text-slate-500 dark:text-slate-400 max-w-4xl mx-auto font-medium leading-relaxed italic"
          >
            As we step into 2026, the entire TaskGuru team is incredibly grateful for the amazing journey we've shared with all of you this past year. It's been a time of huge growth, valuable lessons, and most importantly — building tools that actually make your daily work easier.
          </motion.p>
        </section>

        {/* --- SECTION 2: WHAT'S COMING IN 2026 --- */}
        <section className="max-w-6xl mx-auto px-6 py-24">
          <div className="grid lg:grid-cols-2 gap-20 items-start">
            
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-10 text-left"
            >
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-4">
                <Rocket className="text-indigo-600 w-12 h-12" /> What's Next in 2026
              </h2>
              
              <div className="space-y-8 text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                <p>
                  Honestly, 2025 was all about learning, experimenting, and getting the foundation rock-solid. We listened to your feedback, fixed what needed fixing, and figured out what really matters to you.
                </p>
                
                <p>
                  Now, 2026 is going to be different — it's our year to deliver. Led by Shubham's vision, we're focused on shipping powerful, reliable tools that fit seamlessly into your everyday workflow. No fluff, just real solutions that save you time and frustration.
                </p>
                
                <p>
                  We're putting extra love into speed, privacy, and making everything feel intuitive. You'll see new AI features rolling out steadily throughout the year — each one designed to handle those repetitive tasks that slow you down, so you can focus on the work you actually enjoy.
                </p>
                
                <div className="p-10 bg-indigo-600 text-white rounded-[3rem] shadow-2xl relative overflow-hidden group">
                  <p className="text-2xl md:text-3xl font-bold italic relative z-10 leading-snug">
                    We're just getting started. So many exciting AI-powered tools are on the way in 2026 — all built to make your digital life simpler and smoother than ever.
                  </p>
                  <Zap className="absolute -bottom-10 -right-10 w-48 h-48 opacity-10 group-hover:scale-110 transition-transform" />
                </div>
              </div>
            </motion.div>

            {/* Tools Grid */}
            <div className="space-y-12">
                <h3 className="text-2xl font-black uppercase tracking-widest text-indigo-600 text-center md:text-left">Jump Into Your Toolkit</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <ToolCard icon={Scissors} title="AI BG Remover" href="/tools/background-remover" color="bg-indigo-50 text-indigo-600" />
                    <ToolCard icon={FileText} title="PDF to Word" href="/tools/pdf-to-word" color="bg-blue-50 text-blue-600" />
                    <ToolCard icon={ImageIcon} title="Image Compressor" href="/tools/image-compressor" color="bg-green-50 text-green-600" />
                    <ToolCard icon={BrainCircuit} title="AI Paraphraser" href="/tools/text-paraphraser" color="bg-purple-50 text-purple-600" />
                </div>
            </div>
          </div>
        </section>

        <footer className="mt-24 py-16 border-t border-slate-100 dark:border-slate-800 text-center">
          <p className="text-[10px] font-black uppercase tracking-[0.6em] text-slate-400">
            TaskGuru Official 2026 — Secure · Fast · Private
          </p>
          <p className="text-xs mt-4 text-slate-300 dark:text-slate-700">
            Proudly built by Shubham Gautam in Uttar Pradesh, India.
          </p>
        </footer>
      </main>
    </>
  );
}

function ToolCard({ icon: Icon, title, href, color }: any) {
  return (
    <motion.div whileHover={{ y: -5 }} className="h-full">
      <Link href={href} className={`p-10 rounded-[3rem] flex flex-col items-center justify-center gap-4 transition-all h-full shadow-sm border border-transparent hover:border-slate-200 hover:shadow-2xl ${color}`}>
        <Icon className="w-10 h-10" />
        <span className="text-xs font-black uppercase tracking-widest text-center">{title}</span>
        <div className="mt-2 flex items-center gap-1 text-[10px] font-bold uppercase opacity-60">
            Explore <ArrowRight className="w-3 h-3" />
        </div>
      </Link>
    </motion.div>
  );
}
