"use client";

import React from 'react';
import Link from 'next/link';
import Script from 'next/script';
import { motion } from 'framer-motion';
import { 
  PartyPopper, Zap, ShieldCheck, Heart, ArrowRight, Sparkles, 
  FileText, Scissors, Image as ImageIcon, ScanText, Calculator, BrainCircuit 
} from 'lucide-react';

export default function NewYearPost() {
  
  // ✅ Google Rich Results (JSON-LD) for Article & FAQ
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "Happy New Year 2026: The Future of AI Productivity at TaskGuru",
    "description": "Celebrate 2026 with TaskGuru. Explore our vision for faster, private AI tools and discover how we're simplifying digital workflows.",
    "author": {
      "@type": "Person",
      "name": "Shubham Gautam",
      "url": "https://taskguru.online/about"
    },
    "publisher": {
      "@type": "Organization",
      "name": "TaskGuru",
      "logo": {
        "@type": "ImageObject",
        "url": "https://taskguru.online/logo.png"
      }
    },
    "datePublished": "2025-12-31",
    "dateModified": "2025-12-31"
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What are TaskGuru's plans for 2026?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "In 2026, TaskGuru is focusing on extreme speed optimization and the launch of many more innovative AI-powered tools to simplify digital tasks."
        }
      }
    ]
  };

  return (
    <>
      {/* ✅ Schema Injection for Google Rich Results */}
      <Script
        id="new-year-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([structuredData, faqSchema]) }}
      />

      <main className="p-6 max-w-5xl mx-auto py-20 font-sans leading-relaxed text-gray-800 dark:text-gray-200 overflow-hidden">
        
        {/* ANIMATED HERO */}
        <motion.section 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <div className="inline-flex bg-indigo-100 dark:bg-indigo-900/30 p-6 rounded-[2.5rem] mb-8">
            <PartyPopper className="w-16 h-16 text-indigo-600" />
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter">
            Happy New Year <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
              🎊 2026 🎊
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto italic font-medium">
            "A new chapter in productivity begins today. TaskGuru (Toolify) par aapka swagat hai."
          </p>
        </motion.section>

        {/* CONTENT SECTION */}
        <article className="space-y-16">
          <div className="bg-gray-900 text-white p-12 rounded-[3.5rem] shadow-2xl relative overflow-hidden">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Sparkles className="text-indigo-400" /> Shaping 2026 Together
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              2025 foundation ka saal tha, par **2026 evolution ka saal hai.** TaskGuru, jise **Shubham Gautam** ne banaya hai, aapke liye naye benchmarks set karega.
            </p>
            <div className="p-8 border-l-4 border-indigo-500 bg-white/5 rounded-r-3xl">
              <p className="text-2xl font-black italic text-indigo-400">
                "The journey has just begun. Many more innovative AI-powered tools are coming to TaskGuru in 2026 to simplify your digital workflow like never before."
              </p>
            </div>
          </div>

          {/* TOOLS GRID */}
          <section>
            <h2 className="text-3xl font-black mb-10 text-center flex items-center justify-center gap-3">
              <Zap className="text-yellow-500" /> Discover Our 2026 Toolkit
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <ToolLink icon={Scissors} title="AI Background Remover" href="/tools/background-remover" color="text-indigo-600" />
              <ToolLink icon={FileText} title="PDF to Word Converter" href="/tools/pdf-to-word" color="text-blue-600" />
              <ToolLink icon={ImageIcon} title="Image Compressor" href="/tools/image-compressor" color="text-green-600" />
              <ToolLink icon={BrainCircuit} title="AI Text Paraphraser" href="/tools/text-paraphraser" color="text-purple-600" />
              <ToolLink icon={ScanText} title="Image to Text OCR" href="/tools/image-to-text" color="text-yellow-600" />
              <ToolLink icon={Calculator} title="Pro Age Calculator" href="/tools/age-calculator" color="text-red-600" />
            </div>
          </section>
        </article>

        <footer className="mt-20 pt-10 border-t text-center text-sm font-black uppercase tracking-[0.3em] text-gray-400">
          Happy New Year 2026 — TaskGuru Official
        </footer>
      </main>
    </>
  );
}

function ToolLink({ icon: Icon, title, href, color }: { icon: any, title: string, href: string, color: string }) {
  return (
    <Link href={href} className="group p-6 bg-gray-50 dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 flex flex-col items-center text-center transition-all hover:shadow-xl hover:-translate-y-1">
      <Icon className={`w-10 h-10 mb-4 transition-transform group-hover:scale-110 ${color}`} />
      <h3 className="font-extrabold text-sm uppercase tracking-wider mb-2">{title}</h3>
      <span className="text-xs font-bold text-indigo-600 flex items-center gap-1">
        Launch Tool <ArrowRight className="w-3 h-3" />
      </span>
    </Link>
  );
}
