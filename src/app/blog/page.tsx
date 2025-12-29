'use client';

import Link from 'next/link';
import { ArrowRight, Sparkles, BookOpen } from 'lucide-react';
import Script from 'next/script';

// ✅ 1. ALL BLOG POSTS DEFINED (Including your new guide)
const posts = [
  {
    slug: 'mastering-digital-productivity-taskguru-toolkit', // New Blog Added
    title: 'Revolutionizing Digital Productivity: The Comprehensive Guide to TaskGuru Utilities (2000+ Words)',
    summary:
      'A professional deep-dive into mastering the TaskGuru toolkit. Learn the technical foundations and expert workflows for our free ATS Resume Maker, Background Remover, OCR, and engineering calculators to achieve professional results without expensive subscriptions.',
    date: 'December 29, 2025',
    category: 'Authority Guide',
  },
  {
    slug: 'best-utility-tools-2025-26', 
    title: '10 Best Free Utility Tools of 2025-26: The Ultimate 5,000+ Word Definitive Guide',
    summary:
      'The most comprehensive, data-driven analysis of browser-based software ever published. Master the digital era with our 5,000-word deep dive into the best free utility tools—from AI background removal to precision engineering calculators. Stop paying for SaaS today.',
    date: 'December 27, 2025',
    category: 'Master Manual',
  },
  {
    slug: '10-best-free-online-tools-2026', 
    title: '10 Best Free Online AI Tools (2026): Ultimate SaaS Alternatives to Save $1000/Year',
    summary:
      'Looking for the best free online tools in 2026? This expert-verified guide reveals the top AI-powered software alternatives for PDF editing, graphic design, and document automation. Master the anti-subscription workflow.',
    date: 'December 25, 2025',
    category: 'Expert Guide',
  },
  {
    slug: 'free-ai-tools-that-replace-paid-software-2025',
    title: 'Free AI Tools That Can Replace Paid Software in 2025 (No Subscription Needed)',
    summary:
      'Tired of monthly software subscriptions? This detailed, human-written guide explains how free AI tools can fully replace paid software for images, PDFs, resumes, and everyday productivity in 2025.',
    date: 'December 19, 2025',
  },
  {
    slug: 'anti-subscription-guide-free-ai-tools',
    title: "The 'Anti-Subscription' Guide: 8 Free AI Tools to Save Your Wallet | TaskGuru",
    summary:
      "Stop paying monthly fees for basic tasks. 🚫💸 Discover the 'Anti-Subscription' stack: 8 free tools for PDFs, Images, Resumes, and Text. Save $100s/month starting today.",
    date: 'December 19, 2025',
  },
  {
    slug: 'stop-paying-for-saas-free-ai-tools',
    title: 'Stop Paying for SaaS: Build Your $0 Productivity Tech Stack | TaskGuru',
    summary:
      "Stop burning budget on basic software. Learn how to build a powerful productivity stack for $0 using TaskGuru’s free AI tools. No credit card. No login.",
    date: 'December 18, 2025',
  },
  {
    slug: 'ultimate-ai-toolkit-free-tools',
    title:
      'द अल्टीमेट AI टूलकिट: छात्रों और पेशेवरों के लिए निःशुल्क ऑनलाइन उत्पादकता टूल (भारत और विश्व)',
    summary:
      'TaskGuru पर 2000+ शब्दों का गहन विश्लेषण! PDF, इमेज एडिटिंग, टेक्स्ट पैराफ़्रेज़िंग और फ़ाइल सुरक्षा के लिए सर्वश्रेष्ठ AI टूल खोजें।',
    date: 'December 12, 2025',
  },
  {
    slug: 'free-ai-tools-for-students-2025',
    title: 'Top 10 Free AI Tools for Students in 2025 (No Login Required)',
    summary:
      'Discover the most powerful free AI tools every student must use in 2025. Rewrite notes, convert PDFs, extract text, compress files, and boost productivity.',
    date: 'December 3, 2025',
  },
  {
    slug: 'ai-document-power-up',
    title: 'AI Document Power-Up: Free Tools to Summarize & Chat with Any Document',
    summary:
      'Instantly summarize PDFs, generate key takeaways, and chat with documents using TaskGuru’s free AI document analysis tools.',
    date: 'November 9, 2025',
  },
  {
    slug: 'streamline-remote-workflow',
    title: "TaskGuru: The Professional's Free AI Toolkit (Remote Workflow)",
    summary:
      'Boost academic and professional productivity with TaskGuru’s free AI tools for efficient remote work.',
    date: 'October 21, 2025',
  },
  {
    slug: 'projects-presentations-ai-toolkit',
    title: 'How TaskGuru’s Free AI Tools Revolutionize Projects & Presentations',
    summary:
      'From image optimization to document management, learn how TaskGuru helps create professional projects and presentations.',
    date: 'October 9, 2025',
  },
  {
    slug: 'the-ultimate-taskguru-toolkit',
    title: 'The Ultimate TaskGuru Toolkit: 6 Free AI Tools for Students & Professionals',
    summary:
      'Discover TaskGuru’s complete suite of free AI tools including PDF conversion, background removal, and image compression.',
    date: 'October 2, 2025',
  },
];

// ✅ 2. UPDATED FAQ SCHEMA
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How can TaskGuru help with digital productivity?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'TaskGuru provides free AI-powered utilities like the ATS Resume Maker, Image Background Remover, and OCR tools to eliminate technical friction and streamline professional workflows.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are TaskGuru AI tools really free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. TaskGuru provides high-quality AI tools like PDF converters, background removers, and paraphrasers without requiring logins, subscriptions, or hidden fees.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is an ATS-friendly resume?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'An ATS-friendly resume uses standard text-based layouts and fonts that Applicant Tracking Systems can parse easily. TaskGuru’s Resume Maker enforces these standards automatically.',
      },
    },
  ],
};

export default function BlogPage() {
  // ✅ Featured post set to the new 2,000-word productivity guide
  const featuredPostSlug = 'mastering-digital-productivity-taskguru-toolkit';

  return (
    <>
      <Script
        id="faq-schema-blog-listing"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main className="max-w-4xl mx-auto px-4 py-16">
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-full text-xs font-black uppercase mb-4">
            <BookOpen className="w-4 h-4" /> TaskGuru Knowledge Hub
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter text-slate-900 dark:text-white">
            Insights & Productivity Guides (ज्ञान)
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 font-medium max-w-2xl mx-auto">
            Deep-dive AI reviews, 2026 productivity blueprints, and 
            practical guides to help you master the &quot;Anti-Subscription&quot; workflow.
          </p>
        </header>

        {/* BLOG LIST */}
        <div className="space-y-10">
          {posts.map((post) => (
            <article
              key={post.slug}
              className={`group p-8 border rounded-[2rem] transition-all duration-300 ${
                post.slug === featuredPostSlug
                  ? 'border-2 border-blue-600 ring-4 ring-blue-600/10 bg-blue-50/30 dark:bg-blue-900/5'
                  : 'bg-white dark:bg-slate-950 hover:border-blue-200 dark:hover:border-blue-900 shadow-md hover:shadow-xl'
              }`}
            >
              <Link href={`/blog/${post.slug}`} className="block">
                <div className="flex justify-between items-start mb-4">
                  <p className="text-xs font-black text-blue-600 uppercase tracking-widest">{post.date}</p>
                  {post.slug === featuredPostSlug && (
                    <span className="flex items-center gap-1 px-3 py-1 text-[10px] font-black rounded-full bg-blue-600 text-white animate-pulse">
                      <Sparkles className="w-3 h-3" /> FEATURED AUTHORITY GUIDE
                    </span>
                  )}
                </div>

                <h2 className="text-2xl md:text-3xl font-black group-hover:text-blue-600 transition-colors leading-tight mb-4 text-slate-900 dark:text-white">
                  {post.title}
                </h2>

                <p className="text-slate-600 dark:text-slate-400 leading-relaxed italic font-medium">
                  &quot;{post.summary}&quot;
                </p>

                <div className="mt-8 flex items-center text-sm font-black text-blue-600 uppercase tracking-widest group-hover:translate-x-2 transition-transform">
                  Read Full Authority Guide
                  <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </Link>
            </article>
          ))}
        </div>

        {/* FAQ SECTION */}
        <section className="mt-24 pt-16 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-3xl font-black mb-10 text-center tracking-tight text-slate-900 dark:text-white">
            Common Questions about TaskGuru Guides
          </h2>

          <div className="grid gap-6">
            {faqSchema.mainEntity.map((item, index) => (
              <div key={index} className="bg-slate-50 dark:bg-slate-900/50 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800">
                <h3 className="font-black text-lg text-slate-900 dark:text-white mb-3 flex gap-2">
                   <span className="text-blue-600">Q:</span> {item.name}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                  <span className="font-bold text-slate-400">A:</span> {item.acceptedAnswer.text}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
