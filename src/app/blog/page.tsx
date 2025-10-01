// src/app/blog/page.tsx

'use client';

import Link from 'next/link';
import { ArrowRight, Zap } from 'lucide-react'; 
import Script from "next/script";

// ✅ 1. ALL BLOG POSTS ARE DEFINED HERE
const posts = [
  {
    slug: 'the-ultimate-taskguru-toolkit', // आपकी Master Post
    title: 'The Ultimate TaskGuru Toolkit: 6 Free AI Tools for Students & Professionals',
    summary: 'Stop juggling multiple apps! Discover TaskGuru\'s complete suite of free AI tools: PDF conversion, background removal, image compression, and more.',
    date: 'October 2, 2025',
  },
];

// ✅ 2. FAQ SCHEMA FOR THE LISTING PAGE
const faqSchema = {
    // ... (Your original FAQ Schema remains the same)
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How often does TaskGuru publish new blog content?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "TaskGuru publishes new insights, tool guides, and SEO optimization tips every week to help you stay ahead in productivity."
        }
      },
      {
        "@type": "Question",
        "name": "Are the tool comparison articles unbiased?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, our guides focus on comparing features and user benefits objectively, explaining why TaskGuru's free, private tools offer superior value."
        }
      },
    ]
};


export default function BlogPage() {
  return (
    <>
      <Script
        id="faq-schema-blog-listing"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main className="max-w-4xl mx-auto px-4 py-16">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-foreground mb-3">TaskGuru Insights & Guides</h1>
          <p className="text-lg text-muted-foreground">Stay ahead of the curve with our AI productivity tips and tool comparisons.</p>
        </header>

        {/* ✅ 3. Blog Post List */}
        <div className="space-y-10">
          {posts.map((post) => (
            <article key={post.slug} className="p-6 border rounded-xl shadow-md hover:shadow-lg transition duration-300 dark:bg-gray-800">
              <Link href={`/blog/${post.slug}`} className="group block">
                <h2 className="text-2xl font-bold group-hover:text-primary transition-colors">
                  {post.title}
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">{post.date}</p>
                <p className="mt-4 text-gray-700 dark:text-gray-300">{post.summary}</p>
                <p className="mt-4 inline-flex items-center text-primary font-medium">
                  Read Full Article 
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </p>
              </Link>
            </article>
          ))}
        </div>
        
        {/* ✅ 4. FAQ Section for Listing Page */}
        <section className="mt-14 pt-10 border-t border-gray-100">
            <h2 className="text-3xl sm:text-3xl font-bold mb-6 text-center">
               Frequently Asked Questions (FAQ)❓
            </h2>
            <div className="space-y-6">
              {faqSchema.mainEntity.map((item, index) => (
                <div key={index} className="border-b pb-3">
                  <h3 className="font-bold text-lg text-gray-900">{item.name}</h3>
                  <p className="text-gray-700 mt-1">{item.acceptedAnswer.text}</p>
                </div>
              ))}
            </div>
        </section>

      </main>
    </>
  );
}
