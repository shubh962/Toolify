'use client'; // Keep this as a client component for direct copy-paste

import Link from 'next/link';
import { ArrowRight, Zap } from 'lucide-react'; 
import Script from "next/script";

// ✅ 1. ALL 3 BLOG POSTS ARE DEFINED HERE 
const posts = [
  // --- नया ब्लॉग (The Ultimate Digital Productivity Toolkit) ---
  {
    // यह वह नया ब्लॉग है जिसका आपने कोड दिया था
    slug: 'the-ultimate-digital-productivity-toolkit', 
    title: 'The Ultimate Digital Productivity Toolkit: 6 Free AI Tools to Save You Hours',
    summary: 'Unleash peak efficiency with TaskGuru’s FREE AI productivity suite. Instantly convert PDF to Word, compress images, remove backgrounds, and use the AI Text Paraphraser.',
    date: 'October 15, 2025',
  },
  // --- पहला ब्लॉग (Master Post) ---
  {
    [span_0](start_span)slug: 'the-ultimate-taskguru-toolkit', // Your Master Post[span_0](end_span)
    [span_1](start_span)title: 'The Ultimate TaskGuru Toolkit: 6 Free AI Tools for Students & Professionals',[span_1](end_span)
    summary: 'Stop juggling multiple apps! [span_2](start_span)Discover TaskGuru\'s complete suite of free AI tools: PDF conversion, background removal, image compression, and more.',[span_2](end_span)
    [span_3](start_span)date: 'October 2, 2025',[span_3](end_span)
  },
  // --- दूसरा ब्लॉग (Projects & Presentations) ---
  {
    [span_4](start_span)slug: 'projects-presentations-ai-toolkit', // ⭐ YOUR NEW BLOG POST[span_4](end_span)
    [span_5](start_span)title: 'Beyond Essays: How TaskGuru\'s Free AI Tools Revolutionize Your Projects & Presentations',[span_5](end_span)
    summary: 'Elevate your academic and professional projects with TaskGuru\'s free AI tools. [span_6](start_span)From image optimization to document management and text rewriting, learn how to create stunning presentations and reports with ease.',[span_6](end_span)
    [span_7](start_span)date: 'October 9, 2025', // Make sure this date matches your blogSchema.datePublished[span_7](end_span)
  },
];

// ✅ 2. FAQ SCHEMA FOR THE LISTING PAGE
const faqSchema = {
    // ... (Your original FAQ Schema remains the same)
    "@context": "https://schema.org",
    [span_8](start_span)"@type": "FAQPage",[span_8](end_span)
    "mainEntity": [
      {
        "@type": "Question",
        [span_9](start_span)"name": "How often does TaskGuru publish new blog content?",[span_9](end_span)
        "acceptedAnswer": {
          "@type": "Answer",
          [span_10](start_span)"text": "TaskGuru publishes new insights, tool guides, and SEO optimization tips every week to help you stay ahead in productivity."[span_10](end_span)
        }
      },
      {
        "@type": "Question",
        [span_11](start_span)"name": "Are the tool comparison articles unbiased?",[span_11](end_span)
        "acceptedAnswer": {
          "@type": "Answer",
          [span_12](start_span)"text": "Yes, our guides focus on comparing features and user benefits objectively, explaining why TaskGuru's free, private tools offer superior value."[span_12](end_span)
        }
      },
    ]
};

// --- REACT COMPONENT ---
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
          [span_13](start_span)<p className="text-lg text-muted-foreground">Stay ahead of the curve with our AI productivity tips and tool comparisons.[span_13](end_span)</p>
        </header>

        {/* ✅ 3. Blog Post List - Now shows all 3 posts */}
        <div className="space-y-10">
          {posts.map((post) => (
            <article key={post.slug} className="p-6 border rounded-xl shadow-md hover:shadow-lg transition duration-300 dark:bg-gray-800">
              <Link href={`/blog/${post.slug}`} className="group block">
        
                <h2 className="text-2xl font-bold group-hover:text-primary transition-colors">
                  [span_14](start_span){post.title}[span_14](end_span)
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">{post.date}</p>
                <p className="mt-4 text-gray-700 dark:text-gray-300">{post.summary}</p>
                
                <p className="mt-4 inline-flex items-center text-primary font-medium">
                  Read Full Article 
                  [span_15](start_span)<ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />[span_15](end_span)
                </p>
              </Link>
            </article>
        
          [span_16](start_span)))} {/*[span_16](end_span) */}
        </div>
        
        {/* ✅ 4. FAQ Section for Listing Page */}
        [span_17](start_span)<section className="mt-14 pt-10 border-t border-gray-100 dark:border-gray-700"> {/* Added dark mode border[span_17](end_span) */}
            [span_18](start_span)<h2 className="text-3xl sm:text-3xl font-bold mb-6 text-center text-foreground"> {/* Added text-foreground[span_18](end_span) */}
               [span_19](start_span)Frequently Asked Questions (FAQ)❓[span_19](end_span)
            </h2>
            <div className="space-y-6">
              {faqSchema.mainEntity.map((item, index) => (
                [span_20](start_span)<div key={index} className="border-b pb-3 dark:border-gray-700"> {/* Added dark mode border[span_20](end_span) */}
                  [span_21](start_span)<h3 className="font-bold text-lg text-gray-900 dark:text-gray-100">{item.name}</h3> {/* Added dark mode text[span_21](end_span) */}
                  [span_22](start_span)<p className="text-gray-700 mt-1 dark:text-gray-300">{item.acceptedAnswer.text}</p> {/* Added dark mode text[span_22](end_span) */}
                </div>
              ))}
            </div>
        </section>

      </main>
    </>
  );
            }
