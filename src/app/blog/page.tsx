// src/app/blog/page.tsx

'use client';

import Link from 'next/link';
import { ArrowRight, Zap } from 'lucide-react'; 
import Script from "next/script";

// ✅ 1. ALL BLOG POSTS ARE DEFINED HERE (NOW 4 POSTS)
const posts = [
    // 1st Post 
    {
        slug: 'the-ultimate-taskguru-toolkit', 
        title: "The Ultimate TaskGuru Toolkit: 6 Free AI Tools for Students & Professionals",
        summary: "Stop juggling multiple apps! Discover TaskGuru's complete suite of free AI tools: PDF conversion, background removal, image compression, and more.",
        date: 'October 2, 2025',
    },
    // 2nd Post 
    {
        slug: 'projects-presentations-ai-toolkit',
        title: "Beyond Essays: How TaskGuru's Free AI Tools Revolutionize Your Projects & Presentations",
        summary: "Elevate your academic and professional projects with TaskGuru's free AI tools. From image optimization to document management and text rewriting, learn how to create stunning presentations and reports with ease.",
        date: 'October 9, 2025',
    },
    // 3rd Post 
    {
        slug: 'streamline-remote-workflow',
        title: "TaskGuru: The Professional's Free AI Toolkit",
        summary: "Elevate your academic and professional projects instantly with TaskGuru's free AI tools. This is the Updated data for peak productivity.",
        date: 'October 21, 2025',
    },
    // 🌟 NEW 4th Post (The latest optimized post targeting high-intent AI keywords) 🌟
    {
        slug: 'ai-document-power-up',
        title: "AI Document Power-Up: Free Tools to Summarize & Chat with Any Document (PDF, Word, Text)",
        summary: "Instantly summarize lengthy PDFs, generate key takeaways, and ask questions to your documents using TaskGuru’s new, free AI document analysis tool. Essential for research and study.",
        date: 'November 9, 2025', // Updated date to reflect the latest post
    },
{
    slug: 'free-ai-tools-for-students-2025',
    title: "Top 10 Free AI Tools for Students in 2025 (No Login Required)",
    summary: "Discover the most powerful free AI tools every student must use in 2025. Rewrite notes, convert PDFs, extract text, compress files, and boost productivity using TaskGuru’s fast, no-login tools.",
    date: 'December 3, 2025',
},
    
];

// ✅ 2. FAQ SCHEMA FOR THE LISTING PAGE (Updated with a highly relevant AI question)
const faqSchema = {
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
        {
            "@type": "Question",
            "name": "Can I use the AI PDF Summarizer for free?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, TaskGuru offers a powerful AI PDF Summarizer and 'Chat with Document' tool that is completely free to use without limits or watermarks for all users."
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
                <section className="mt-14 pt-10 border-t border-gray-100 dark:border-gray-700">
                    <h2 className="text-3xl sm:text-3xl font-bold mb-6 text-center text-foreground">
                        Frequently Asked Questions (FAQ)❓
                    </h2>
                    <div className="space-y-6">
                        {faqSchema.mainEntity.map((item, index) => (
                            <div key={index} className="border-b pb-3 dark:border-gray-700">
                                <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100">{item.name}</h3>
                                <p className="text-gray-700 mt-1 dark:text-gray-300">{item.acceptedAnswer.text}</p>
                            </div>
                        ))}
                    </div>
                </section>

            </main>
        </>
    );
}
