"use client";

import Link from "next/link";
import { tools } from "@/lib/tools";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Zap,
  Globe,
  MousePointer2,
  CheckCircle2,
  Lock,
  Cpu,
  Rocket,
  FileText,
  ImageIcon,
  Gift,
  Search,
  PencilLine,
  Youtube,
  Languages,
  Briefcase,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import NewsletterForm from "@/components/NewsletterForm";
import { useMemo } from "react";

// ✅ ALL blogs pool — 3 random ones shown on homepage each load
const ALL_POSTS = [
  {
    slug: "how-to-paraphrase-text",
    title: "How to Paraphrase Text (Without Plagiarism)",
    summary: "5 proven techniques to rewrite sentences, avoid plagiarism, and improve your writing instantly.",
    category: "Writing Skills",
    color: "text-green-600",
  },
  {
    slug: "what-is-ocr-image-to-text",
    title: "What is OCR? How Image to Text Technology Works",
    summary: "A plain-English guide to Optical Character Recognition — how it works and how to use it free.",
    category: "Tech Explained",
    color: "text-purple-600",
  },
  {
    slug: "how-to-compress-images-without-losing-quality",
    title: "How to Compress Images Without Losing Quality",
    summary: "Step-by-step guide to compressing JPG, PNG, and WebP images for faster websites.",
    category: "Image Optimization",
    color: "text-blue-600",
  },
  {
    slug: "how-to-convert-pdf-to-word-free",
    title: "How to Convert PDF to Word for Free",
    summary: "No software, no sign-up, no upload. Convert any PDF to editable Word in seconds.",
    category: "PDF Tools",
    color: "text-orange-600",
  },
  {
    slug: "what-is-a-qr-code",
    title: "What is a QR Code and How Does It Work?",
    summary: "Everything about QR codes — history, anatomy, types, use cases, and how to create one free.",
    category: "Tech Explained",
    color: "text-red-600",
  },
  {
    slug: "how-to-make-resume-with-no-experience",
    title: "How to Make a Resume With No Experience",
    summary: "Complete guide for students and fresh graduates — what to include instead of work experience.",
    category: "Career Hacking",
    color: "text-purple-600",
  },
  {
    slug: "resume-ats-secrets",
    title: "5 Hidden Keywords That ATS Scanners Look For",
    summary: "Stop getting auto-rejected. Learn the exact keywords that get your resume past filters.",
    category: "Career Hacking",
    color: "text-purple-600",
  },
  {
    slug: "extract-text-scanned-pdf",
    title: "How to Extract Text from a Scanned PDF for Free",
    summary: "Can't copy text from a scanned PDF? Here's the easiest fix — free, no software, 30 seconds.",
    category: "PDF Tools",
    color: "text-orange-600",
  },
  {
    slug: "local-first-web-apps-trend-2026",
    title: "The Rise of Local-First Web Apps in 2026",
    summary: "How WebAssembly and Edge computing are killing expensive cloud subscriptions.",
    category: "Tech Trends",
    color: "text-teal-600",
  },
  {
    slug: "image-compression-guide",
    title: "JPG vs WebP: Which Format Boosts Your SEO Score?",
    summary: "We tested JPG, PNG, and WebP to find which creates the fastest Core Web Vitals scores.",
    category: "SEO Masterclass",
    color: "text-green-600",
  },
];

// ✅ Shuffle function — runs client-side only, no hydration error
function getRandomPosts(count: number) {
  const shuffled = [...ALL_POSTS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export default function Home() {
  // ✅ useMemo ensures shuffle runs once per mount, not on every render
  const featuredPosts = useMemo(() => getRandomPosts(3), []);

  return (
    <>
      {/* 🚀 HERO */}
      <section className="relative overflow-hidden py-24 md:py-40 text-center bg-gradient-to-br from-slate-950 via-primary to-indigo-950">
        <div className="container mx-auto px-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-white/90 text-sm font-bold mb-8 backdrop-blur-md border border-white/20">
            <Gift className="w-4 h-4 text-accent" /> 100% Free Forever • No Credit Card Required
          </div>
          <h1 className="text-5xl md:text-8xl font-black tracking-tight text-white mb-8 leading-[1.05]">
            Unlimited <span className="text-accent">Free Online Tools</span> <br />
            No Sign-Up, No Catch.
          </h1>
          <p className="mt-6 text-lg md:text-2xl max-w-4xl mx-auto text-white/80 leading-relaxed font-medium">
            Access the internet&apos;s most powerful suite of Free PDF Tools, Free AI Writing
            Assistants, and Free Image Editors. Stop paying for SaaS subscriptions today.
          </p>
          <div className="mt-12 flex flex-col sm:flex-row justify-center gap-6">
            <Button
              size="lg"
              asChild
              className="bg-white text-primary hover:bg-gray-100 font-black text-xl px-12 h-16 rounded-full shadow-2xl transition-all hover:scale-105"
            >
              <Link href="#tools">Use All Tools for Free</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 📰 BLOG SECTION — shuffles on every page load */}
      <section className="py-12 bg-white dark:bg-gray-950 border-b border-gray-100 dark:border-gray-800">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
                Latest Digital Insights
              </h2>
              <p className="text-gray-500 mt-2 font-medium">
                Expert guides on productivity, file security, and career growth.
              </p>
            </div>
            <Link
              href="/blog"
              className="hidden md:flex items-center text-primary font-bold hover:underline"
            >
              View All Articles <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>

          {/* ✅ 3 random blogs — different every page load */}
          <div className="grid md:grid-cols-3 gap-8">
            {featuredPosts.map((post) => (
              <Link href={`/blog/${post.slug}`} key={post.slug} className="group">
                <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 hover:shadow-lg transition-all h-full flex flex-col justify-between">
                  <div>
                    <span className={`text-xs font-black uppercase tracking-wider ${post.color}`}>
                      {post.category}
                    </span>
                    <h3 className="mt-3 text-xl font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="mt-2 text-gray-500 text-sm leading-relaxed">{post.summary}</p>
                  </div>
                  <div className="mt-4 flex items-center text-sm font-bold text-gray-900 dark:text-white">
                    Read Guide <ArrowRight className="ml-2 w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-6 text-center md:hidden">
            <Link href="/blog" className="text-primary font-bold text-sm hover:underline">
              View All Articles →
            </Link>
          </div>
        </div>
      </section>

      {/* 🛠️ TOOLS GRID */}
      <section id="tools" className="py-20 md:py-32 bg-background">
        <div className="container mx-auto px-6">
          <div className="mb-16 border-b pb-12">
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-gray-900 dark:text-white uppercase">
              The Ultimate Free Toolkit
            </h2>
            <p className="mt-4 text-xl text-muted-foreground font-medium">
              High-speed utilities including our Free Background Remover, Free Image to Text,
              and Free PDF Merger.
            </p>
          </div>

          {tools && tools.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {tools.map((tool) => (
                <Link href={`/tools/${tool.slug}`} key={tool.slug} className="group">
                  <Card className="w-full h-full flex flex-col transition-all duration-500 hover:shadow-2xl hover:-translate-y-3 border-2 border-muted rounded-[2.5rem] bg-card">
                    <CardHeader className="p-8">
                      <div className="flex justify-between items-start mb-6">
                        <div className="bg-primary/5 p-5 rounded-2xl group-hover:bg-primary group-hover:text-white transition-all duration-500">
                          <tool.icon className="w-10 h-10" />
                        </div>
                        <span className="px-3 py-1 bg-green-500/10 text-green-600 text-[10px] font-black uppercase rounded-full border border-green-500/20">
                          100% Free
                        </span>
                      </div>
                      <CardTitle className="text-2xl font-black">{tool.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="px-8 flex-grow">
                      <p className="text-muted-foreground font-medium leading-relaxed">
                        {tool.description}
                      </p>
                    </CardContent>
                    <CardFooter className="px-8 pb-8 pt-4">
                      <div className="flex items-center text-sm font-black text-primary group-hover:translate-x-3 transition-transform uppercase tracking-widest">
                        Start for Free <ArrowRight className="ml-2 h-5 w-5" />
                      </div>
                    </CardFooter>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-muted-foreground">
              <p className="text-lg font-medium">Tools loading... Please refresh the page.</p>
            </div>
          )}
        </div>
      </section>

      {/* 🚀 SEO CONTENT SECTION */}
      <section className="py-24 bg-background border-t">
        <article className="container mx-auto px-6 max-w-5xl">
          <div className="text-muted-foreground space-y-20 font-medium">

            <header className="text-center">
              <h2 className="text-4xl md:text-7xl font-black text-foreground mb-6 leading-tight">
                The World&apos;s Most Reliable <br />
                <span className="text-primary italic">Free AI-Powered Productivity Suite</span>
              </h2>
              <p className="text-xl leading-relaxed max-w-4xl mx-auto">
                TaskGuru is engineered to solve the most common digital hurdles faced
                by millions of users globally. In an era where every simple online task is hidden
                behind a paywall, TaskGuru stands as a beacon of accessibility, offering a
                comprehensive array of free online tools designed for quality, privacy, and speed.
              </p>
            </header>

            {/* PDF Section */}
            <div className="space-y-10">
              <h3 className="text-3xl md:text-4xl font-black text-foreground flex items-center gap-4">
                <FileText className="text-primary h-10 w-10" /> Professional Free PDF Solutions
              </h3>
              <p>
                PDF management is one of the most searched categories on the internet. Whether
                you are a student, a legal professional, or a small business owner, the need for
                a Free PDF to Word Converter or a Free PDF Merger is constant.
              </p>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    title: "Free PDF to Word",
                    body: "Experience the best free PDF to Word conversion engine. We use advanced layout reconstruction technology to ensure your Word files look identical to the original PDF.",
                  },
                  {
                    title: "Free Merge PDF",
                    body: "Stop searching for how to merge PDFs for free. TaskGuru offers a high-speed, unlimited free PDF merger. Simply drag and drop your files and generate a single unified document.",
                  },
                  {
                    title: "Free Image to PDF",
                    body: "Convert your JPGs, PNGs, and WebPs into high-quality PDF portfolios. Perfect for creating digital document submissions without losing pixel quality.",
                  },
                ].map((item) => (
                  <div key={item.title} className="bg-muted/30 p-8 rounded-[2rem] border border-muted">
                    <h4 className="font-black text-foreground mb-4">{item.title}</h4>
                    <p className="text-sm">{item.body}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Writing Section */}
            <div className="bg-slate-950 p-10 md:p-12 rounded-[3rem] text-white border-4 border-primary/20">
              <h3 className="text-3xl font-black mb-8 flex items-center gap-4 text-accent">
                <Cpu className="h-10 w-10" /> AI-Driven Writing Ecosystem
              </h3>
              <p className="text-lg text-slate-300 mb-10">
                Artificial Intelligence is changing the way we create content. At TaskGuru, we
                integrate cutting-edge Neural Language Processing to provide tools that were once
                only available to large enterprises.
              </p>
              <div className="space-y-12">
                {[
                  {
                    title: "Free AI Paraphraser & Rewriter",
                    desc: "Our Free AI Text Paraphraser is designed for those looking to rewrite content while maintaining the original meaning. Ideal for SEO experts and students, it uses context-aware models to ensure your content is human-readable and plagiarism-free.",
                    quote: "\"How do I rewrite an essay for free?\"",
                    note: "TaskGuru's AI Paraphraser is the answer for students and bloggers worldwide.",
                    reverse: false,
                  },
                  {
                    title: "Free Image to Text (OCR)",
                    desc: "Manually typing data from a scanned document is a thing of the past. Our Free OCR tool extracts text from images with high accuracy. From receipts to handwritten notes, get your text instantly for free.",
                    quote: "\"Best free image to text converter online.\"",
                    note: "TaskGuru supports multiple languages for OCR processing.",
                    reverse: true,
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className={`flex flex-col ${item.reverse ? "md:flex-row-reverse" : "md:flex-row"} gap-8 items-center ${item.reverse ? "border-t border-white/10 pt-10" : ""}`}
                  >
                    <div className="flex-1">
                      <h4 className="text-2xl font-bold mb-4">{item.title}</h4>
                      <p className="text-slate-400">{item.desc}</p>
                    </div>
                    <div className="flex-1 bg-white/5 p-6 rounded-3xl border border-white/10">
                      <p className="italic text-sm">{item.quote}</p>
                      <p className="text-xs mt-2 text-slate-500">{item.note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Image Tools */}
            <div className="space-y-10">
              <h3 className="text-3xl font-black text-foreground flex items-center gap-4">
                <ImageIcon className="text-primary h-10 w-10" /> Free Visual & Image Tools
              </h3>
              <p>
                Visual content is the language of the internet. Our suite includes powerful free
                image editors that usually cost hundreds of dollars in professional software.
              </p>
              <div className="grid md:grid-cols-2 gap-10">
                <div className="space-y-4">
                  <h4 className="text-xl font-bold text-foreground">Free Background Remover Online</h4>
                  <p>
                    Our AI automatically detects edges and removes backgrounds in one click. No
                    masking or manual selection required — professional grade and 100% free.
                  </p>
                </div>
                <div className="space-y-4">
                  <h4 className="text-xl font-bold text-foreground">Free Image Compressor</h4>
                  <p>
                    Use our free online image compressor to reduce file size by up to 90% without
                    losing visible quality. Perfect for WebP, JPG, and PNG formats.
                  </p>
                </div>
              </div>
            </div>

            {/* Niche tools */}
            <div className="border-y py-16 space-y-12">
              <h3 className="text-3xl font-black text-foreground text-center">
                Niche Tools for Specialized Tasks
              </h3>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  { icon: Briefcase, title: "Free Resume Maker 2026", body: "Land your dream job with our free ATS-friendly resume builder. Choose from templates proven to bypass recruitment filters." },
                  { icon: Search, title: "Free Age Calculator", body: "A simple, fast free online age calculator. Find out your exact age in years, months, and days for job applications or personal milestones." },
                  { icon: Languages, title: "Free Document Editor", body: "Edit your text, format your documents, and prepare them for export with our distraction-free free online editor interface." },
                ].map((item) => (
                  <div key={item.title} className="text-center p-8 bg-primary/5 rounded-[3rem]">
                    <item.icon className="mx-auto h-12 w-12 text-primary mb-6" />
                    <h4 className="font-bold text-foreground mb-4">{item.title}</h4>
                    <p className="text-sm">{item.body}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Mission */}
            <div className="space-y-8">
              <h3 className="text-3xl font-black text-foreground">
                The TaskGuru Mission: Why We Stay Free
              </h3>
              <p>
                The internet was built to be open and helpful. Unfortunately, &quot;subscription
                fatigue&quot; has made it harder for people to access basic digital tools. At
                TaskGuru, our mission is to provide an unrestricted free productivity hub.
              </p>
              <p>
                We maintain a <strong>Zero-Storage Architecture</strong>. This means that unlike
                many other &quot;free&quot; sites, we never store your data to sell to advertisers
                or train large models without your consent. When you use our Free PDF to Word
                converter or Free Background Remover, your data is processed and instantly purged.
              </p>
            </div>

            {/* Keywords */}
            <div className="bg-primary/5 p-10 md:p-12 rounded-[4rem] text-center">
              <h3 className="text-2xl font-black text-foreground mb-8">
                What People Search for on TaskGuru
              </h3>
              <div className="flex flex-wrap justify-center gap-4">
                {[
                  "Free PDF to Word No Email",
                  "Free Background Remover AI",
                  "Best Free AI Paraphraser 2026",
                  "Free Online Image to Text",
                  "Free Bulk Image Compressor",
                  "Free Resume Builder No Cost",
                  "Free Merge PDF Without Watermark",
                  "Free JPG to PDF Converter",
                  "Free Age Calculator Online",
                  "Free Text Rewriter Online",
                  "Free WebP to JPG",
                  "Free Online Productivity Tools",
                  "Extract Text from Scanned PDF Free",
                  "Compress Image Without Losing Quality",
                ].map((kw) => (
                  <span
                    key={kw}
                    className="px-5 py-2 bg-white dark:bg-gray-800 rounded-full text-xs font-bold border border-primary/20 shadow-sm text-primary"
                  >
                    {kw}
                  </span>
                ))}
              </div>
            </div>

            {/* ✅ FIX: Removed local <footer> tag — replaced with plain div */}
            <div className="pt-20 text-center">
              <h3 className="text-4xl font-black text-foreground mb-6">
                Built for Creators, Students, and Professionals
              </h3>
              <p className="max-w-4xl mx-auto italic text-lg">
                TaskGuru is more than just a toolset — it is a movement to keep the web functional
                for everyone. We are constantly expanding our library to include the latest free
                AI modules and PDF processing updates. Thank you for choosing TaskGuru as your
                primary digital workspace.
              </p>
              <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 opacity-40 font-black text-xl tracking-tighter uppercase italic">
                <span>Fast</span>
                <span>Secure</span>
                <span>Unlimited</span>
                <span>100% Free</span>
              </div>
            </div>

          </div>
        </article>
      </section>

      {/* 📬 NEWSLETTER */}
      <section className="py-24 bg-primary text-primary-foreground rounded-[2rem] md:rounded-[3rem] mx-4 md:mx-6 mb-24 shadow-2xl border-4 border-white/10">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-8">Elevate Your Workflow for Free</h2>
          <p className="text-xl mb-12 opacity-90 max-w-2xl mx-auto">
            Get notified whenever we launch new free AI tools or productivity updates.
          </p>
          <NewsletterForm />
          <p className="mt-8 text-[10px] font-black uppercase tracking-[0.3em] opacity-60">
            Free forever • Privacy Protected • Global Standard
          </p>
        </div>
      </section>
    </>
  );
}
