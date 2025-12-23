
import Link from "next/link";
import { tools } from "@/lib/tools";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight, Sparkles, ShieldCheck, Zap, Globe } from "lucide-react";
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
          text: "Yes, Toolify is 100% free to use. All tools work instantly in your browser with no login required.",
        },
      },
      {
        "@type": "Question",
        name: "Are my files secure?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Toolify never stores files on its servers. All processing is secure and temporary.",
        },
      },
      {
        "@type": "Question",
        name: "Do I need to install anything?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No installation needed. Toolify works directly on any device with a browser.",
        },
      },
      {
        "@type": "Question",
        name: "Who can use Toolify?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Students, professionals, creators, and businesses use Toolify for AI tools, PDF tools, and image utilities.",
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

      {/* HERO SECTION */}
      <section className="relative overflow-hidden py-20 md:py-32 text-center bg-gradient-to-br from-primary via-primary/90 to-indigo-900">
        <div className="container mx-auto px-6 relative z-10">
          <h1 className="text-4xl md:text-7xl font-black tracking-tight text-white mb-6">
            Simplify Your Work with <br />
            <span className="text-accent underline decoration-accent/30">TaskGuru AI Tools</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl max-w-3xl mx-auto text-white/80 leading-relaxed">
            All-in-one platform for your digital needs. Convert PDFs, enhance images, 
            and use AI power to rewrite text. No subscriptions. No limits. Just efficiency.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" asChild className="bg-white text-primary hover:bg-gray-100 font-bold text-lg px-8">
              <Link href="#tools">Get Started Free</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-white border-white/40 hover:bg-white/10">
              <Link href="/blog">Read Guides</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* TOOLS GRID SECTION */}
      <section id="tools" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4 border-b pb-8">
            <div className="max-w-2xl text-left">
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
                Our Premium Tool Suite
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                High-performance utilities designed for modern workflows. Select a tool to start processing.
              </p>
            </div>
            <div className="hidden md:block">
              <span className="text-sm font-bold text-primary bg-primary/10 px-4 py-2 rounded-full uppercase tracking-widest">
                Updated Weekly
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {tools.map((tool) => (
              <Link
                href={`/tools/${tool.slug}`}
                key={tool.slug}
                className="group flex h-full"
                prefetch={!tool.isPlaceholder}
              >
                <Card className="w-full flex flex-col transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] border border-border bg-card overflow-hidden">
                  <div className="h-2 bg-primary/10 group-hover:bg-primary transition-colors" />
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <div className="bg-primary/5 p-4 rounded-2xl group-hover:bg-primary group-hover:text-white transition-all duration-300">
                        <tool.icon className="w-10 h-10" />
                      </div>
                      {tool.isGenAI && (
                        <span className="flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-black uppercase bg-accent text-accent-foreground tracking-tighter shadow-sm">
                          <Sparkles className="w-3 h-3" />
                          AI Tech
                        </span>
                      )}
                    </div>
                    <CardTitle className="pt-4 text-2xl font-bold">
                      {tool.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-muted-foreground leading-relaxed">
                      {tool.description}
                    </p>
                  </CardContent>
                  <CardFooter className="bg-muted/30 py-4">
                    <div className="flex items-center text-sm font-bold text-primary group-hover:underline">
                      Launch Tool{" "}
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-2" />
                    </div>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* NEW: TRUST & FEATURES SECTION (Crucial for AdSense) */}
      <section className="py-20 bg-muted/30 border-y">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12 text-center">
            <div className="flex flex-col items-center">
              <div className="bg-white p-6 rounded-full shadow-sm mb-6">
                <ShieldCheck className="w-12 h-12 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Privacy First</h3>
              <p className="text-muted-foreground">We never see your files. Everything is processed in transient memory and wiped instantly.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-white p-6 rounded-full shadow-sm mb-6">
                <Zap className="w-12 h-12 text-yellow-500" />
              </div>
              <h3 className="text-xl font-bold mb-3">Light Speed</h3>
              <p className="text-muted-foreground">Built on Next.js 14 for millisecond response times and lag-free file conversions.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-white p-6 rounded-full shadow-sm mb-6">
                <Globe className="w-12 h-12 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Global Access</h3>
              <p className="text-muted-foreground">Universal tools accessible from any mobile, tablet, or desktop browser worldwide.</p>
            </div>
          </div>
        </div>
      </section>

      {/* EXTENDED SEO CONTENT - STRUCTURED FOR READABILITY */}
      <section className="py-20 md:py-28 bg-background">
        <article className="container mx-auto px-6 max-w-4xl">
          <header className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent italic">
              Empowering Digital Productivity
            </h2>
            <div className="h-1.5 w-24 bg-primary mx-auto rounded-full" />
          </header>

          <div className="prose prose-lg prose-slate max-w-none text-muted-foreground space-y-8">
            <p>
              Welcome to <strong>TaskGuru (Toolify)</strong>, the internet’s favorite destination for free, AI-enhanced utility tools. In an era where every simple digital task requires a subscription, we are committed to keeping essential tools free, private, and open for everyone.
            </p>

            <h3 className="text-2xl font-bold text-foreground mt-12">How Toolify (TaskGuru) Helps You Daily</h3>
            <p>
              Managing multiple file formats can be a nightmare. Our platform simplifies these complex tasks into single-click solutions:
            </p>
            <ul className="grid md:grid-cols-2 gap-4 list-none pl-0">
              <li className="bg-muted p-4 rounded-xl border-l-4 border-primary italic">"Need to edit a scanned document? Use our PDF to Word converter."</li>
              <li className="bg-muted p-4 rounded-xl border-l-4 border-accent italic text-right">"Optimizing images for a website? Our compressor handles it in seconds."</li>
            </ul>

            <h3 className="text-2xl font-bold text-foreground mt-12">No Login, No Credit Card – Ever.</h3>
            <p>
              The biggest hurdle to online productivity is the "Sign-up Wall." We believe that to be useful, a tool must be friction-less. That’s why TaskGuru requires no registration. You land on the site, process your file, and get back to your work. This philosophy has made us a preferred choice for students and busy professionals globally.
            </p>

            <h3 className="text-2xl font-bold text-foreground mt-12">A Focus on Data Integrity</h3>
            <p>
              Is it safe to upload files? Absolutely. Unlike many competitors, TaskGuru does not scrape your data. We use industry-standard encryption protocols during processing. Whether you are using our <strong>AI Paraphraser</strong> or <strong>Merge PDF</strong> tool, your data is handled with the highest security standards.
            </p>
          </div>
        </article>
      </section>

      {/* NEWSLETTER */}
      <section className="py-20 bg-primary text-primary-foreground rounded-[2rem] mx-4 mb-20 shadow-2xl">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Join the Productivity Club</h2>
            <p className="text-lg mb-10 text-primary-foreground/80">
              We release new AI tools every month. Get notified first and learn 
              new ways to automate your daily digital tasks.
            </p>
            <NewsletterForm />
            <p className="mt-6 text-sm opacity-60">
              Your email is safe with us. One-click unsubscribe at any time.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
