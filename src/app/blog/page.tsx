// src/app/blog/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Sparkles, BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog — Digital Strategy & Free Tool Guides | TaskGuru",
  description:
    "Expert guides on image compression, PDF tools, resume writing, SEO, and productivity. Free tips and deep dives from the TaskGuru team.",
  // ✅ FIX 1: Removed keywords array
  alternates: { canonical: "https://www.taskguru.online/blog" },
  openGraph: {
    title: "Blog — Digital Strategy & Free Tool Guides | TaskGuru",
    description: "Expert guides on image compression, PDF tools, resume writing, SEO, and productivity.",
    type: "website",
    url: "https://www.taskguru.online/blog",
  },
};

const categoryColors: Record<string, string> = {
  "PDF Tools": "bg-orange-100 text-orange-700",
  "SEO Masterclass": "bg-green-100 text-green-700",
  "Tech Trends": "bg-teal-100 text-teal-700",
  "Engineering": "bg-slate-100 text-slate-700",
  "Personal Finance": "bg-yellow-100 text-yellow-700",
  "Freelancing": "bg-pink-100 text-pink-700",
  "YouTube Growth": "bg-red-100 text-red-700",
  "Career Hacking": "bg-purple-100 text-purple-700",
  "Image Optimization": "bg-blue-100 text-blue-700",
};

const posts = [
  // ✅ FIX 5: New blog post added to array
  {
  slug: "what-is-ocr-image-to-text",
  title: "What is OCR? How Image to Text Technology Works (2026 Guide)",
  summary:
    "A plain-English explanation of Optical Character Recognition — how it works, real-world use cases, accuracy tips, and how to extract text from any image for free in your browser.",
  date: "2026-03-14",
  displayDate: "March 14, 2026",
  category: "Tech Explained",
  featured: false,
},
  {
    slug: "how-to-compress-images-without-losing-quality",
    title: "How to Compress Images Without Losing Quality (2026 Guide)",
    summary: "Learn how to compress JPG, PNG, and WebP images without visible quality loss. Covers formats, file size targets, common mistakes, and free tools.",
    date: "2026-03-14",
    displayDate: "March 14, 2026",
    category: "Image Optimization",
    featured: true,
  },
  {
    slug: "extract-text-scanned-pdf",
    title: "How to Extract Text from a Scanned PDF for Free",
    summary: "Can't copy text from a scanned PDF? Here's the easiest fix — free, no software, takes 30 seconds. Works on any device.",
    date: "2026-03-01",
    displayDate: "March 1, 2026",
    category: "PDF Tools",
    featured: true,
  },
  {
    slug: "reduce-image-size-kb-without-losing-quality",
    title: "How to Reduce Image Size in KB Without Losing Quality (2026)",
    summary: "A step-by-step guide to compressing JPG, PNG, and WebP images. Learn how to optimize your site speed, improve LCP scores, and use free tools without sign-up.",
    date: "2026-03-01",
    displayDate: "March 1, 2026",
    category: "SEO Masterclass",
    featured: false,
  },
  {
    slug: "local-first-web-apps-trend-2026",
    title: "The Rise of Local-First Web Apps: Why 2026 is the End of Paid Subscriptions",
    summary: "An editorial deep dive into how WebAssembly and Edge computing are killing expensive cloud subscriptions, making powerful web utilities free and private.",
    date: "2026-02-24",
    displayDate: "February 24, 2026",
    category: "Tech Trends",
    featured: true,
  },
  {
    slug: "taskguru-tech-stack-2026",
    title: "Building a Scalable Utility Platform: Behind the Tech Stack of TaskGuru",
    summary: "A technical deep dive into our architecture. Learn how we use Next.js 15, WebAssembly, and Edge Functions to create a secure, zero-latency ecosystem.",
    date: "2026-02-24",
    displayDate: "February 24, 2026",
    category: "Engineering",
    featured: false,
  },
  {
    slug: "rent-vs-buy-financial-guide",
    title: "Rent vs. Buy: The Ultimate Financial Guide for 2026",
    summary: "Should you buy a house in 2026 or keep renting? We break down the math using the 50/30/20 rule and help you decide with our free EMI Calculator.",
    date: "2026-02-13",
    displayDate: "February 13, 2026",
    category: "Personal Finance",
    featured: false,
  },
  {
    slug: "zero-cost-freelancer-tools",
    title: 'The "Zero-Cost" Tech Stack: 5 Free Tools Every Freelancer Needs in 2026',
    summary: "Stop paying for expensive subscriptions. Discover 5 essential free tools that replace paid software for designers, marketers, and freelancers.",
    date: "2026-02-12",
    displayDate: "February 12, 2026",
    category: "Freelancing",
    featured: false,
  },
  {
    slug: "youtube-thumbnail-guide",
    title: "The Science of Click-Through Rates: Why 1080p Thumbnails Win",
    summary: "A deep dive into viewer psychology. Learn why high-resolution, emotionally charged thumbnails get 300% more clicks than standard images.",
    date: "2026-01-28",
    displayDate: "January 28, 2026",
    category: "YouTube Growth",
    featured: false,
  },
  {
    slug: "resume-ats-secrets",
    title: "5 Hidden Keywords That ATS Scanners Look For in Your Resume",
    summary: 'Stop getting auto-rejected by robots. We analyzed 5,000 resumes to find the exact keywords that trigger a "Passed" status in ATS software.',
    date: "2026-01-25",
    displayDate: "January 25, 2026",
    category: "Career Hacking",
    featured: true,
  },
  {
    slug: "image-compression-guide",
    title: "JPG vs WebP: Which Format Actually Boosts Your SEO Score?",
    summary: "Website speed is a ranking factor. We tested JPG, PNG, and WebP formats to see which one creates the fastest loading times for Google Core Web Vitals.",
    date: "2026-01-22",
    displayDate: "January 22, 2026",
    category: "SEO Masterclass",
    featured: false,
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How can TaskGuru help with digital productivity?",
      acceptedAnswer: { "@type": "Answer", text: "TaskGuru provides free AI-powered utilities like the ATS Resume Maker, Image Background Remover, and OCR tools to eliminate technical friction and streamline professional workflows." },
    },
    {
      "@type": "Question",
      name: "Are TaskGuru AI tools really free?",
      acceptedAnswer: { "@type": "Answer", text: "Yes. TaskGuru provides high-quality AI tools like PDF converters, background removers, and paraphrasers without requiring logins, subscriptions, or hidden fees." },
    },
    {
      "@type": "Question",
      name: "How often does TaskGuru publish new blog posts?",
      acceptedAnswer: { "@type": "Answer", text: "TaskGuru publishes new guides and deep dives regularly — covering image optimization, PDF management, resume writing, SEO, and emerging web technologies. Check back weekly for new content." },
    },
    {
      "@type": "Question",
      name: "Are the guides on TaskGuru written by real experts?",
      acceptedAnswer: { "@type": "Answer", text: "Yes. All guides are written by Shubham Gautam, a web developer and founder of TaskGuru with years of experience building free browser-based tools. Every guide is based on real testing and hands-on experience." },
    },
  ],
};

// ✅ FIX 4: ISO date format in schema
const blogListSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "TaskGuru Blog",
  url: "https://www.taskguru.online/blog",
  description: "Expert guides on image compression, PDF tools, resume writing, SEO, and productivity.",
  blogPost: posts.map((post) => ({
    "@type": "BlogPosting",
    headline: post.title,
    description: post.summary,
    datePublished: post.date,
    url: `https://www.taskguru.online/blog/${post.slug}`,
    author: { "@type": "Person", name: "Shubham Gautam" },
  })),
};

export default function BlogPage() {
  const featuredPosts = posts.filter((p) => p.featured);
  const regularPosts = posts.filter((p) => !p.featured);

  return (
    // ✅ FIX 2: Removed <main> — layout.tsx handles it
    <>
      {/* ✅ FIX 3: Plain <script> tags — no need for next/script in Server Components */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogListSchema) }} />

      <div className="max-w-5xl mx-auto px-6 py-20 font-sans">

        <header className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 text-blue-700 rounded-full text-xs font-black uppercase mb-6 border border-blue-100">
            <BookOpen className="w-3.5 h-3.5" /> TaskGuru Research Hub
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight text-slate-900 dark:text-white leading-[1.1]">
            Digital Strategy &{" "}
            <br className="hidden md:block" />
            <span className="text-blue-600">Technical Deep Dives</span>
          </h1>
          <p className="text-xl text-slate-500 dark:text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed">
            Expert analysis on algorithms, file optimization, and career growth.
            We decode the tech so you can work smarter.
          </p>
          <p className="mt-4 text-sm text-slate-400">{posts.length} guides published · Updated regularly</p>
        </header>

        {featuredPosts.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xs font-black text-blue-600 uppercase tracking-widest mb-6 flex items-center gap-2">
              <Sparkles className="w-4 h-4" /> Editor&apos;s Choice
            </h2>
            <div className="grid gap-6">
              {featuredPosts.map((post) => (
                <article key={post.slug} className="group relative p-8 md:p-10 rounded-[2.5rem] transition-all duration-300 border bg-gradient-to-br from-blue-50/50 to-white dark:from-blue-900/10 dark:to-slate-900 border-blue-200 dark:border-blue-900 shadow-xl shadow-blue-900/5 hover:border-blue-400 hover:shadow-2xl">
                  <Link href={`/blog/${post.slug}`} className="block">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                      <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 text-[10px] font-black uppercase tracking-wider rounded-full ${categoryColors[post.category] ?? "bg-blue-100 text-blue-700"}`}>
                          {post.category}
                        </span>
                        <span className="text-xs font-bold text-slate-400">{post.displayDate}</span>
                      </div>
                      <span className="flex items-center gap-1.5 text-xs font-bold text-amber-500">
                        <Sparkles className="w-4 h-4" /> EDITOR&apos;S CHOICE
                      </span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-4 leading-tight group-hover:text-blue-600 transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed font-medium opacity-90 mb-8 max-w-3xl">
                      {post.summary}
                    </p>
                    <div className="flex items-center text-sm font-black text-blue-600 uppercase tracking-widest group-hover:translate-x-2 transition-transform">
                      Read Analysis <ArrowRight className="w-4 h-4 ml-2" />
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </section>
        )}

        {regularPosts.length > 0 && (
          <section>
            <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">All Guides</h2>
            <div className="grid gap-5">
              {regularPosts.map((post) => (
                <article key={post.slug} className="group p-6 md:p-8 rounded-2xl border bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 shadow-sm hover:border-blue-200 hover:shadow-md transition-all duration-300">
                  <Link href={`/blog/${post.slug}`} className="block">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 text-[10px] font-black uppercase tracking-wider rounded-full ${categoryColors[post.category] ?? "bg-gray-100 text-gray-600"}`}>
                          {post.category}
                        </span>
                        <span className="text-xs text-slate-400">{post.displayDate}</span>
                      </div>
                    </div>
                    <h2 className="text-xl font-black text-slate-900 dark:text-white mb-2 leading-snug group-hover:text-blue-600 transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-4 max-w-3xl">{post.summary}</p>
                    <div className="flex items-center text-xs font-black text-blue-600 uppercase tracking-widest group-hover:translate-x-1 transition-transform">
                      Read Guide <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </section>
        )}

        <section className="mt-32 pt-16 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-3xl font-black mb-12 text-center tracking-tight text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {faqSchema.mainEntity.map((item, index) => (
              <div key={index} className="bg-slate-50 dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800">
                <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-3">{item.name}</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">{item.acceptedAnswer.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-20 bg-blue-600 rounded-3xl p-8 md:p-12 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-black mb-3">Ready to Use the Free Tools?</h2>
          <p className="text-blue-100 mb-6 text-sm max-w-md mx-auto leading-relaxed">
            All tools mentioned in our guides are 100% free — no sign-up, no watermarks, no hidden fees.
          </p>
          <Link href="/#tools" className="inline-block bg-white text-blue-700 font-black px-8 py-3.5 rounded-xl hover:bg-blue-50 transition-colors text-sm">
            Browse All Free Tools →
          </Link>
        </section>

      </div>
    </>
  );
}
