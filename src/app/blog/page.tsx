// src/app/blog/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Sparkles, BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog — Digital Strategy & Free Tool Guides | TaskGuru",
  description:
    "Expert guides on image compression, PDF tools, resume writing, SEO, and productivity. Free tips and deep dives from the TaskGuru team.",
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
  "Tech Explained": "bg-purple-100 text-purple-700",
  "Writing Skills": "bg-green-100 text-green-700",
  "Founder Story": "bg-blue-100 text-blue-700",
  "Productivity": "bg-blue-100 text-blue-700",
};

const posts = [
  // ✅ Founder story — earliest, most personal
  {
  slug: "free-productivity-tools-2026",
  title: "4 Free Tools Everyone Needs in 2026 — Password, Typing, PDF & Excel",
  summary: "A complete guide to four essential free browser-based tools — secure password generator, typing speed test, PDF to Excel converter, and Excel to PDF converter. No signup, no paywall.",
  date: "2026-02-01",
  displayDate: "February 1, 2026",
  category: "Productivity",
  featured: false,
},
  {
  slug: "why-i-built-free-image-compressor",
  title: "A Scholarship Form Said 20KB. My Photo Was 2MB. Here Is What Happened Next.",
  summary: "A college student needed to compress a photo to 20KB for his scholarship form. Every app had heavy ads or asked for payment. So he built his own free image compressor.",
  date: "2025-12-05",
  displayDate: "December 5, 2025",
  category: "Founder Story",
  featured: false,
},
  {
  slug: "why-i-built-free-image-to-text-ocr",
  title: "I Spent Hours Typing Text From an Image at Work. Then I Built a Free OCR Tool.",
  summary: "At work, copying text from an image manually took hours. Every free OCR tool online had limits or paywalls. So I built my own using Tesseract.js — completely free, private, no limits.",
  date: "2026-01-20",
  displayDate: "January 20, 2026",
  category: "Founder Story",
  featured: false,
},
  {
  slug: "why-i-built-free-pdf-merger",
  title: "A Government Portal Wanted One File. I Had Seven. Here Is What I Built.",
  summary: "A scholarship form required all documents as a single PDF. Merging them for free was nearly impossible. So I built a free PDF merger — no signup, no watermark, files stay on your device.",
  date: "2026-01-10",
  displayDate: "January 10, 2026",
  category: "Founder Story",
  featured: false,
},
  {
  slug: "why-i-built-free-pdf-to-word-converter",
  title: "I Could Not Edit a PDF in School. Years Later, I Built a Free PDF to Word Converter.",
  summary: "A school student spent hours trying to edit a PDF and found nothing. Years later, after completing B.Tech, he built a free PDF to Word converter so no one else has to.",
  date: "2025-12-20",
  displayDate: "December 20, 2025",
  category: "Founder Story",
  featured: false,
},
 {
  slug: "why-i-built-free-resume-maker",
  title: "Placement Season, MS Word Frustration, and Why I Built a Free Resume Maker",
  summary: "A B-Tech 3rd year student needed a resume for placement season. MS Word was too complex, websites had paywalls, apps had watermarks. So he built his own — free, clean, no watermark.",
  date: "2025-11-20",
  displayDate: "November 20, 2025",
  category: "Founder Story",
  featured: false,
},
  {
  slug: "why-i-built-free-qr-code-generator",
  title: "From Paytm to Project Submissions — Why I Built a Free QR Code Generator",
  summary: "I used QR codes since 2016 for Paytm. But when I needed one for my college project, every free tool charged money or generated codes that did not scan. So I built my own.",
  date: "2025-10-15",
  displayDate: "October 15, 2025",
  category: "Founder Story",
  featured: false,
},
  {
    slug: "why-i-built-taskguru",
    title: "Why I Built TaskGuru — The Story Behind the Free Tools",
    summary: "The personal story of how a B.Tech IT graduate from Kanpur built TaskGuru in 2025 — frustrated by paywalls, signup walls, and overpriced tools that should be free.",
    date: "2025-10-01",
    displayDate: "October 1, 2025",
    category: "Founder Story",
    featured: true,
  },
  // ✅ Jan 2026 blogs — oldest batch
  {
    slug: "image-compression-guide",
    title: "JPG vs WebP: Which Format Actually Boosts Your SEO Score?",
    summary: "Website speed is a ranking factor. We tested JPG, PNG, and WebP formats to see which one creates the fastest loading times for Google Core Web Vitals.",
    date: "2026-01-15",
    displayDate: "January 15, 2026",
    category: "SEO Masterclass",
    featured: false,
  },
  {
    slug: "resume-ats-secrets",
    title: "5 Hidden Keywords That ATS Scanners Look For in Your Resume",
    summary: "Stop getting auto-rejected by robots. We analyzed 5,000 resumes to find the exact keywords that trigger a Passed status in ATS software.",
    date: "2026-01-22",
    displayDate: "January 22, 2026",
    category: "Career Hacking",
    featured: true,
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
  // ✅ Feb 2026 blogs
  {
    slug: "zero-cost-freelancer-tools",
    title: 'The "Zero-Cost" Tech Stack: 5 Free Tools Every Freelancer Needs in 2026',
    summary: "Stop paying for expensive subscriptions. Discover 5 essential free tools that replace paid software for designers, marketers, and freelancers.",
    date: "2026-02-05",
    displayDate: "February 5, 2026",
    category: "Freelancing",
    featured: false,
  },
  {
    slug: "rent-vs-buy-financial-guide",
    title: "Rent vs. Buy: The Ultimate Financial Guide for 2026",
    summary: "Should you buy a house in 2026 or keep renting? We break down the math using the 50/30/20 rule and help you decide with our free EMI Calculator.",
    date: "2026-02-10",
    displayDate: "February 10, 2026",
    category: "Personal Finance",
    featured: false,
  },
  {
    slug: "local-first-web-apps-trend-2026",
    title: "The Rise of Local-First Web Apps: Why 2026 is the End of Paid Subscriptions",
    summary: "An editorial deep dive into how WebAssembly and Edge computing are killing expensive cloud subscriptions, making powerful web utilities free and private.",
    date: "2026-02-17",
    displayDate: "February 17, 2026",
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
  // ✅ March 2026 blogs — spread across full month
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
    slug: "extract-text-scanned-pdf",
    title: "How to Extract Text from a Scanned PDF for Free",
    summary: "Can't copy text from a scanned PDF? Here's the easiest fix — free, no software, takes 30 seconds. Works on any device.",
    date: "2026-03-04",
    displayDate: "March 4, 2026",
    category: "PDF Tools",
    featured: true,
  },
  {
    slug: "what-is-ocr-image-to-text",
    title: "What is OCR? How Image to Text Technology Works (2026 Guide)",
    summary: "A plain-English explanation of Optical Character Recognition — how it works, real-world use cases, accuracy tips, and how to extract text from any image for free.",
    date: "2026-03-07",
    displayDate: "March 7, 2026",
    category: "Tech Explained",
    featured: false,
  },
  {
    slug: "how-to-compress-images-without-losing-quality",
    title: "How to Compress Images Without Losing Quality (2026 Guide)",
    summary: "Learn how to compress JPG, PNG, and WebP images without visible quality loss. Covers formats, file size targets, common mistakes, and free tools.",
    date: "2026-03-10",
    displayDate: "March 10, 2026",
    category: "Image Optimization",
    featured: true,
  },
  {
    slug: "what-is-a-qr-code",
    title: "What is a QR Code and How Does It Work? (2026 Guide)",
    summary: "A complete plain-English guide to QR codes — what they are, how they encode data, types, real-world use cases in 2026, and how to create one free in 30 seconds.",
    date: "2026-03-12",
    displayDate: "March 12, 2026",
    category: "Tech Explained",
    featured: false,
  },
  {
    slug: "how-to-make-resume-with-no-experience",
    title: "How to Make a Resume With No Experience (2026 Guide)",
    summary: "A complete step-by-step guide for students and fresh graduates — what to include instead of work experience, how to write a strong summary, ATS tips, and common mistakes.",
    date: "2026-03-14",
    displayDate: "March 14, 2026",
    category: "Career Hacking",
    featured: false,
  },
  {
    slug: "how-to-convert-pdf-to-word-free",
    title: "How to Convert PDF to Word for Free (2026 Guide)",
    summary: "Convert any PDF to an editable Word document in seconds — no software, no sign-up, no file upload. Works on Windows, Mac, Android, and iOS.",
    date: "2026-03-16",
    displayDate: "March 16, 2026",
    category: "PDF Tools",
    featured: false,
  },
  {
  slug: "why-i-built-free-paraphraser",
  title: "My B-Tech Project Report and Why I Built a Free Paraphrasing Tool",
  summary: "A B-Tech student needed to paraphrase his project report. Every tool had grammar errors, word limits, or paywalls. So he built his own — free, no login, instant.",
  date: "2025-09-10",
  displayDate: "September 10, 2025",
  category: "Founder Story",
  featured: false,
},
  {
    slug: "how-to-paraphrase-text",
    title: "How to Paraphrase Text (Without Plagiarism) — 2026 Guide",
    summary: "5 proven paraphrasing techniques with before/after examples. Learn how to rewrite text correctly, avoid plagiarism, and when to use a free AI paraphrasing tool.",
    date: "2026-03-18",
    displayDate: "March 18, 2026",
    category: "Writing Skills",
    featured: false,
  },
  {
  slug: "why-free-background-remover",
  title: "A Scholarship Form, a Passport Photo, and Why I Built a Free Background Remover",
  summary: "A college student needed to remove a photo background for his scholarship form. Every free tool asked for money or signup. So he built his own.",
  date: "2025-08-15",
  displayDate: "August 15, 2025",
  category: "Founder Story",
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
    <>
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
