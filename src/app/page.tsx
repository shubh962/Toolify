import Link from "next/link";
import { tools } from "@/lib/tools";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight, Sparkles, ShieldCheck, Zap, Globe, MousePointer2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import NewsletterForm from "@/components/NewsletterForm";
import Script from "next/script";

export default function Home() {
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Is Toolify (TaskGuru) free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, Toolify is 100% free to use. All tools work instantly in your browser with no login or subscription required.",
        },
      },
      {
        "@type": "Question",
        name: "Are my files secure on TaskGuru?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Absolutely. TaskGuru uses a Zero-Storage policy. Files are processed in transient memory and deleted permanently immediately after use.",
        },
      },
      {
        "@type": "Question",
        name: "Do I need to install software for PDF or Image tools?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No installation is needed. All TaskGuru tools function directly in any modern web browser across mobile and desktop devices.",
        },
      },
    ],
  };

  return (
    <>
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />

      {/* 🚀 HERO SECTION - FIXED H1 */}
      <section className="relative overflow-hidden py-24 md:py-36 text-center bg-gradient-to-br from-primary via-primary/95 to-indigo-950">
        <div className="container mx-auto px-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-white/90 text-sm font-bold mb-8 backdrop-blur-md border border-white/20">
            <Zap className="w-4 h-4 text-yellow-400" /> All Tools Now 100% Free
          </div>
          {/* ✅ THE ONLY H1 ON THE PAGE */}
          <h1 className="text-4xl md:text-7xl font-black tracking-tight text-white mb-8 leading-[1.1]">
            Simplify Digital Workflow with <br />
            <span className="text-accent underline decoration-accent/30 italic">TaskGuru AI Suite</span>
          </h1>
          <p className="mt-6 text-lg md:text-2xl max-w-3xl mx-auto text-white/80 leading-relaxed font-medium">
            The ultimate productivity hub. Convert PDFs, compress images, and 
            leverage AI to rewrite content. Private, secure, and lightning fast.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row justify-center gap-6">
            <Button size="lg" asChild className="bg-white text-primary hover:bg-gray-100 font-black text-xl px-10 h-16 rounded-full shadow-2xl">
              <Link href="#tools">Explore Free Tools</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-white border-white/40 hover:bg-white/10 h-16 rounded-full px-10 font-bold">
              <Link href="/about">Meet the Founder</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 🛠️ TOOLS GRID SECTION */}
      <section id="tools" className="py-20 md:py-32 bg-background">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6 border-b pb-12">
            <div className="max-w-2xl text-left">
              {/* ✅ CHANGED TO H2 */}
              <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-gray-900 dark:text-white">
                Professional Toolkit
              </h2>
              <p className="mt-4 text-xl text-muted-foreground font-medium">
                High-performance utilities engineered for modern creators and businesses.
              </p>
            </div>
            <div className="hidden md:block">
              <span className="text-xs font-black text-primary bg-primary/10 px-6 py-3 rounded-full uppercase tracking-[0.2em] border border-primary/20">
                Live Status: Operational
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {tools.map((tool) => (
              <Link
                href={`/tools/${tool.slug}`}
                key={tool.slug}
                className="group flex h-full"
                prefetch={!tool.isPlaceholder}
              >
                <Card className="w-full flex flex-col transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] hover:-translate-y-2 border-2 border-muted bg-card overflow-hidden rounded-[2rem]">
                  <CardHeader className="p-8">
                    <div className="flex justify-between items-start mb-4">
                      <div className="bg-primary/5 p-5 rounded-2xl group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-inner">
                        <tool.icon className="w-10 h-10" />
                      </div>
                      {tool.isGenAI && (
                        <span className="flex items-center gap-1 px-4 py-1.5 rounded-full text-[10px] font-black uppercase bg-accent text-accent-foreground tracking-tighter shadow-sm border border-accent/20">
                          <Sparkles className="w-3 h-3" /> AI Powered
                        </span>
                      )}
                    </div>
                    {/* ✅ TOOL TITLES ARE H3 */}
                    <CardTitle className="pt-2 text-2xl font-black">
                      {tool.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-8 flex-grow">
                    <p className="text-muted-foreground leading-relaxed font-medium">
                      {tool.description}
                    </p>
                  </CardContent>
                  <CardFooter className="px-8 pb-8 pt-4">
                    <div className="flex items-center text-sm font-black text-primary group-hover:translate-x-2 transition-transform uppercase tracking-wider">
                      Open Tool <ArrowRight className="ml-2 h-5 w-5" />
                    </div>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 🛡️ TRUST SECTION */}
      <section className="py-24 bg-muted/20 border-y relative">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-16 text-center">
            <div className="space-y-4">
              <div className="bg-white dark:bg-zinc-900 w-20 h-20 rounded-3xl shadow-xl flex items-center justify-center mx-auto mb-8 rotate-3 hover:rotate-0 transition-transform">
                <ShieldCheck className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-black">Privacy Obsessed</h3>
              <p className="text-muted-foreground font-medium">Zero-storage policy. Your files are processed in-memory and wiped instantly.</p>
            </div>
            <div className="space-y-4">
              <div className="bg-white dark:bg-zinc-900 w-20 h-20 rounded-3xl shadow-xl flex items-center justify-center mx-auto mb-8 -rotate-3 hover:rotate-0 transition-transform">
                <MousePointer2 className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-2xl font-black">Friction-Free</h3>
              <p className="text-muted-foreground font-medium">No account creation. No credit cards. No waiting. Just professional tools.</p>
            </div>
            <div className="space-y-4">
              <div className="bg-white dark:bg-zinc-900 w-20 h-20 rounded-3xl shadow-xl flex items-center justify-center mx-auto mb-8 rotate-6 hover:rotate-0 transition-transform">
                <Globe className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-2xl font-black">Global Access</h3>
              <p className="text-muted-foreground font-medium">Optimized for every device. Access your workspace from any browser worldwide.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 🚀 EXTENDED SEO CONTENT */}
      <section className="py-24 md:py-36 bg-background">
        <article className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-black mb-12 text-center leading-tight">
            The Internet's Favorite <br />
            <span className="text-primary italic">Productivity Suite</span>
          </h2>

          <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground space-y-10 font-medium leading-relaxed">
            <p className="text-xl">
              Welcome to <strong>TaskGuru (Toolify)</strong>, the definitive hub for free, 
              AI-enhanced digital utilities. While the web becomes cluttered with expensive 
              subscriptions, we remain dedicated to keeping essential tools accessible to everyone.
            </p>

            <h3 className="text-3xl font-black text-foreground">Why TaskGuru is Different</h3>
            <p>
              Unlike standard "free" sites that bombard you with pop-ups or store your 
              private documents, TaskGuru is built on a <strong>Privacy-First</strong> architecture. 
              Our suite of tools—including the <strong>Resume Maker</strong>, <strong>PDF Inserter</strong>, 
              and <strong>AI Paraphraser</strong>—leverages cutting-edge algorithms to 
              process data securely and efficiently.
            </p>

            <div className="p-8 bg-primary/5 rounded-[2.5rem] border-2 border-primary/10 italic text-foreground shadow-inner">
                "Our mission is simple: To provide professional-grade software capability 
                directly in your browser, for free, forever."
            </div>

            <h3 className="text-3xl font-black text-foreground">A Tool for Every Task</h3>
            <p>
              Whether you are a student perfecting a thesis or a developer optimizing 
              assets for a new app, our suite scales with your needs. Our 
              <strong> Image Compressor</strong> ensures your web resolution remains 
              crisp while keeping file sizes minimal, and our <strong>OCR (Image to Text)</strong> 
              technology extracts data with over 99% accuracy.
            </p>
          </div>
        </article>
      </section>

      {/* 📬 NEWSLETTER */}
      <section className="py-24 bg-primary text-primary-foreground rounded-[3rem] mx-6 mb-24 shadow-[0_50px_100px_rgba(0,0,0,0.3)] border-4 border-white/10">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-black mb-8">Join the Productivity Club</h2>
            <p className="text-xl mb-12 text-primary-foreground/90 font-medium">
              We deploy new AI capabilities every month. Stay updated with the latest 
              automation tips and new tool releases.
            </p>
            <NewsletterForm />
            <p className="mt-8 text-xs font-bold opacity-60 uppercase tracking-widest">
              Zero Spam. Total Privacy. One-Click Unsubscribe.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
