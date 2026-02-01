'use client';

import Link from 'next/link';
import { ArrowRight, Sparkles, BookOpen } from 'lucide-react';
import Script from 'next/script';

// ✅ CONFIGURATION: Only listing the 3 Active Articles we created
const posts = [
  {
    slug: 'youtube-thumbnail-guide',
    title: 'The Science of Click-Through Rates: Why 1080p Thumbnails Win',
    summary: 'A deep dive into viewer psychology. Learn why high-resolution, emotionally charged thumbnails get 300% more clicks than standard images.',
    date: 'January 28, 2026',
    category: 'YouTube Growth',
    featured: true,
  },
  {
    slug: 'resume-ats-secrets',
    title: '5 Hidden Keywords That ATS Scanners Look For in Your Resume',
    summary: 'Stop getting auto-rejected by robots. We analyzed 5,000 resumes to find the exact keywords that trigger a "Passed" status in ATS software.',
    date: 'January 25, 2026',
    category: 'Career Hacking',
    featured: true,
  },
  {
    slug: 'image-compression-guide',
    title: 'JPG vs WebP: Which Format Actually Boosts Your SEO Score?',
    summary: 'Website speed is a ranking factor. We tested JPG, PNG, and WebP formats to see which one creates the fastest loading times for Google Core Web Vitals.',
    date: 'January 22, 2026',
    category: 'SEO Masterclass',
    featured: true,
  },
];

// ✅ FAQ SCHEMA (Good for SEO)
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
  ],
};

export default function BlogPage() {
  return (
    <>
      <Script
        id="faq-schema-blog-listing"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main className="max-w-5xl mx-auto px-6 py-20 font-sans">
        <header className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 text-blue-700 rounded-full text-xs font-black uppercase mb-6 border border-blue-100">
            <BookOpen className="w-3.5 h-3.5" /> TaskGuru Research Hub
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight text-slate-900 leading-[1.1]">
            Digital Strategy & <br className="hidden md:block"/> <span className="text-blue-600">Technical Deep Dives</span>
          </h1>
          <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
            Expert analysis on algorithms, file optimization, and career growth. 
            We decode the tech so you can work smarter.
          </p>
        </header>

        {/* BLOG LIST */}
        <div className="grid gap-8">
          {posts.map((post) => (
            <article
              key={post.slug}
              className={`group relative p-8 md:p-10 rounded-[2.5rem] transition-all duration-300 border bg-white border-blue-100 shadow-xl shadow-blue-900/5 hover:border-blue-300`}
            >
              <Link href={`/blog/${post.slug}`} className="block">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                  <div className="flex items-center gap-3">
                     <span className="px-3 py-1 text-[10px] font-black uppercase tracking-wider rounded-full bg-blue-600 text-white">
                        {post.category}
                     </span>
                     <span className="text-xs font-bold text-slate-400">{post.date}</span>
                  </div>
                  
                  {/* FEATURED BADGE */}
                  <span className="flex items-center gap-1.5 text-xs font-bold text-amber-500">
                    <Sparkles className="w-4 h-4" /> EDITOR'S CHOICE
                  </span>
                </div>

                <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-4 leading-tight group-hover:text-blue-600 transition-colors">
                  {post.title}
                </h2>

                <p className="text-slate-600 text-lg leading-relaxed font-medium opacity-90 mb-8 max-w-3xl">
                  {post.summary}
                </p>

                <div className="flex items-center text-sm font-black text-blue-600 uppercase tracking-widest group-hover:translate-x-2 transition-transform">
                  Read Analysis <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </Link>
            </article>
          ))}
        </div>

        {/* FOOTER FAQ */}
        <section className="mt-32 pt-16 border-t border-slate-100">
          <h2 className="text-3xl font-black mb-12 text-center tracking-tight text-slate-900">
            Frequently Asked Questions
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {faqSchema.mainEntity.map((item, index) => (
              <div key={index} className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100">
                <h3 className="font-bold text-lg text-slate-900 mb-3">
                   {item.name}
                </h3>
                <p className="text-slate-600 leading-relaxed text-sm">
                    {item.acceptedAnswer.text}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
