// src/app/blog/page.tsx

'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Script from 'next/script';

// ✅ 1. ALL BLOG POSTS ARE DEFINED HERE (Updated with the new SEO Post)
const posts = [
  // 🌟 NEWEST POST (SEO Optimized & Long Form) 🌟
  {
    slug: 'best-free-online-tools-2026',
    title: '10 Best Free Online Tools to Simplify Your Digital Tasks in 2026',
    summary:
      'Stop paying for expensive software subscriptions. Discover how TaskGuru’s AI-powered tools for PDF editing, image processing, and content creation can handle your daily tasks for free with zero sign-ups.',
    date: 'December 23, 2025',
  },

  // 🌟 Previous Posts
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

// ✅ 2. FAQ SCHEMA
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How often does TaskGuru publish new blog content?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'TaskGuru publishes new insights, tool guides, and productivity articles every week to keep you updated with the latest free AI utilities.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are TaskGuru blog articles SEO friendly?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. All TaskGuru blogs are written with long-form content, expert insights, and internal linking to provide maximum value to users and search engines.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are TaskGuru AI tools really free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. TaskGuru provides high-quality AI tools without requiring logins, subscriptions, or hidden fees.',
      },
    },
  ],
};

export default function BlogPage() {
  // ✅ Update featured post to the newest one
  const featuredPostSlug = 'best-free-online-tools-2026';

  return (
    <>
      <Script
        id="faq-schema-blog-listing"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main className="max-w-4xl mx-auto px-4 py-16">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-extrabold mb-3">
            TaskGuru Insights & Guides (ज्ञान)
          </h1>
          <p className="text-lg text-muted-foreground">
            Practical AI productivity guides, free tool reviews, and honest tech comparisons for India and the World.
          </p>
        </header>

        {/* BLOG LIST */}
        <div className="space-y-10">
          {posts.map((post) => (
            <article
              key={post.slug}
              className={`p-6 border rounded-xl shadow-md hover:shadow-lg transition ${
                post.slug === featuredPostSlug
                  ? 'border-2 border-blue-600 ring-2 ring-blue-600/20 bg-blue-50/30'
                  : 'bg-card'
              }`}
            >
              <Link href={`/blog/${post.slug}`} className="group block">
                <h2 className="text-2xl font-bold group-hover:text-blue-600 transition-colors">
                  {post.title}
                  {post.slug === featuredPostSlug && (
                    <span className="ml-3 inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full bg-blue-600 text-white animate-pulse">
                      FEATURED GUIDE ⭐
                    </span>
                  )}
                </h2>

                <p className="mt-2 text-sm text-muted-foreground font-medium">{post.date}</p>
                <p className="mt-4 text-gray-700 dark:text-gray-300 leading-relaxed italic">
                  &quot;{post.summary}&quot;
                </p>

                <p className="mt-4 inline-flex items-center text-blue-600 font-bold">
                  Read Full In-Depth Article
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </p>
              </Link>
            </article>
          ))}
        </div>

        {/* FAQ SECTION */}
        <section className="mt-20 pt-10 border-t border-gray-200">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
            Common Questions about TaskGuru Guides
          </h2>

          <div className="grid gap-6 md:grid-cols-1">
            {faqSchema.mainEntity.map((item, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-xl border border-gray-100 shadow-sm">
                <h3 className="font-bold text-lg text-gray-900 mb-2">Q: {item.name}</h3>
                <p className="text-gray-700 leading-relaxed">
                  A: {item.acceptedAnswer.text}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}

