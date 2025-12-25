import Link from "next/link";
import { tools } from "@/lib/tools";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight, Sparkles, ShieldCheck, Zap, Globe, MousePointer2, CheckCircle2, Lock, Cpu, Rocket, FileText, ImageIcon, ZapOff, Gift } from "lucide-react";
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
        name: "Are these online tools really 100% free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, TaskGuru provides 100% free online tools including PDF converters, image compressors, and AI paraphrasers. There are no hidden fees, no subscriptions, and no credit cards required.",
        },
      },
      {
        "@type": "Question",
        name: "Is there a limit on the free PDF to Word converter?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Unlike other sites, our free tools have generous limits. You can merge PDFs, remove backgrounds, and rewrite text for free as many times as you need.",
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

      {/* 🚀 GLOBAL HERO SECTION - FOCUSED ON "FREE" */}
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
            Access the internet&apos;s most powerful suite of **Free PDF Tools**, **Free AI Writing Assistants**, 
            and **Free Image Editors**. Stop paying for SaaS subscriptions today.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row justify-center gap-6">
            <Button size="lg" asChild className="bg-white text-primary hover:bg-gray-100 font-black text-xl px-12 h-16 rounded-full shadow-2xl transition-all hover:scale-105">
              <Link href="#tools">Use All Tools for Free</Link>
            </Button>
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
              High-speed utilities including our Free Background Remover, Free Image to Text, and Free PDF Merger.
            </p>
          </div>

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
        </div>
      </section>

      {/* 🚀 MASSIVE SEO SECTION - "FREE" KEYWORD OPTIMIZED */}
      <section className="py-24 bg-background">
        <article className="container mx-auto px-6 max-w-5xl">
          <div className="prose prose-xl dark:prose-invert max-w-none text-muted-foreground space-y-20 font-medium">
            
            <header className="text-center">
              <h2 className="text-4xl md:text-7xl font-black text-foreground mb-6 leading-tight">
                Your Global Destination for <br />
                <span className="text-primary italic">Free Digital Utilities</span>
              </h2>
              <p className="text-xl">
                Searching for the best free online tools shouldn&apos;t be a struggle. TaskGuru (Toolify) offers a comprehensive library of professional utilities to help you work faster without spending a dime.
              </p>
            </header>

            {/* Section 1: Free PDF Tools */}
            <div className="space-y-8">
              <h3 className="text-3xl font-black text-foreground flex items-center gap-3">
                <FileText className="text-primary h-8 w-8" /> Free PDF Conversion & Management
              </h3>
              <p>
                The most common search queries today revolve around <strong>Free PDF to Word Converters</strong> and <strong>Free PDF Mergers</strong>. TaskGuru delivers exactly that. Our tools allow you to:
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-muted/50 rounded-2xl border border-muted">
                  <h4 className="font-bold text-foreground mb-2">Free PDF to Word</h4>
                  <p className="text-sm">Convert complex documents to editable formats for free. No email required, no watermarks, and 100% formatting retention.</p>
                </div>
                <div className="p-6 bg-muted/50 rounded-2xl border border-muted">
                  <h4 className="font-bold text-foreground mb-2">Free Merge PDF</h4>
                  <p className="text-sm">Combine unlimited PDF files into one single document. Our free online merger is the fastest in the industry.</p>
                </div>
              </div>
            </div>

            {/* Section 2: Free AI Writing */}
            <div className="p-12 rounded-[3rem] bg-slate-900 text-white shadow-2xl">
              <h3 className="text-3xl font-black mb-6">Free AI Paraphraser & Content Tools</h3>
              <p className="text-lg text-slate-300 mb-8">
                Content is king, but creating it can be expensive. Use our <strong>Free AI Text Paraphraser</strong> to rewrite articles, essays, and reports. Our <strong>Free Image to Text (OCR)</strong> tool allows you to extract data from any image without paying for premium software.
              </p>
              <ul className="grid md:grid-cols-2 gap-4 list-none p-0">
                <li className="flex items-center gap-2"><CheckCircle2 className="text-accent h-5 w-5" /> Free Online Text Rewriter</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="text-accent h-5 w-5" /> Free Plagiarism-Free Content</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="text-accent h-5 w-5" /> Free Image Background Remover</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="text-accent h-5 w-5" /> Free ATS Resume Builder</li>
              </ul>
            </div>

            {/* Section 3: Industry Specific Free Tools */}
            <div className="space-y-8">
              <h3 className="text-3xl font-black text-foreground">A Tool for Every Need—Always Free</h3>
              <div className="space-y-6">
                <div className="border-l-4 border-primary pl-6">
                  <h5 className="text-xl font-bold text-foreground">Free Tools for Students</h5>
                  <p>Students often search for &quot;How to convert image to PDF for free&quot; or &quot;Free age calculator online.&quot; TaskGuru provides these essential student utilities in a clean, ad-free environment.</p>
                </div>
                <div className="border-l-4 border-primary pl-6">
                  <h5 className="text-xl font-bold text-foreground">Free Tools for Developers</h5>
                  <p>Optimize your web assets with our <strong>Free Image Compressor</strong>. Reduce file sizes for faster page loads without the expensive API costs of other platforms.</p>
                </div>
              </div>
            </div>

            {/* Section 4: Search-Friendly Keyword Cloud */}
            <div className="text-center space-y-8">
              <h3 className="text-2xl font-black text-foreground">Popular Free Searches on TaskGuru</h3>
              <div className="flex flex-wrap justify-center gap-3">
                {[
                  "Free Background Remover Online",
                  "Free PDF to Word Converter No Sign Up",
                  "Free Image to Text OCR",
                  "Free Resume Maker 2025",
                  "Free Online Age Calculator",
                  "Free Bulk Image Compressor",
                  "Free AI Text Rewriter",
                  "Free Merge PDF Tool",
                  "Free Image to PDF Converter",
                  "Free WebP to JPG Converter"
                ].map((kw) => (
                  <span key={kw} className="px-4 py-2 bg-primary/5 rounded-full text-sm font-bold border border-primary/10">
                    {kw}
                  </span>
                ))}
              </div>
            </div>

            <footer className="text-center pt-20 border-t">
              <h3 className="text-3xl font-black text-foreground mb-4">No Subscriptions. No Limits. Just Free.</h3>
              <p className="max-w-3xl mx-auto italic">
                At TaskGuru, we believe that basic digital tasks should not be gated behind a paywall. Our mission is to keep these professional tools free for everyone, everywhere.
              </p>
            </footer>

          </div>
        </article>
      </section>

      {/* 📬 NEWSLETTER */}
      <section className="py-24 bg-primary text-primary-foreground rounded-[3rem] mx-6 mb-24 shadow-2xl border-4 border-white/10">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-8">Get More Free Tools</h2>
          <p className="text-xl mb-12 opacity-90 max-w-2xl mx-auto">
            Join our mailing list to receive updates whenever we launch new free AI capabilities.
          </p>
          <NewsletterForm />
          <p className="mt-8 text-[10px] font-black uppercase tracking-[0.3em] opacity-60">
            Free forever • Privacy Protected • No Spam
          </p>
        </div>
      </section>
    </>
  );
}
