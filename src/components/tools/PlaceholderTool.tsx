// ✅ FIX 1: Removed 'use client' — this component has no hooks or state
// ✅ FIX 1: metadata must be exported from a Server Component (page.tsx), not here
// Add this to your tools/[slug]/page.tsx generateMetadata instead:
//
//   if (!toolData) {
//     return { robots: { index: false, follow: false } }
//   }

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Wrench, Zap, Sparkles, Rocket, ShieldCheck, HeartHandshake, Info } from 'lucide-react';
import Link from 'next/link';

interface PlaceholderToolProps {
  title: string;
}

export default function PlaceholderTool({ title }: PlaceholderToolProps) {
  return (
    <div className="space-y-16 py-10 px-4 max-w-5xl mx-auto">

      {/* ANNOUNCEMENT CARD */}
      <Card className="w-full shadow-2xl border-4 border-dashed border-primary/30 rounded-[2.5rem] bg-gradient-to-b from-background to-muted/20 overflow-hidden">
        <CardContent className="flex flex-col items-center justify-center space-y-8 p-12 text-center">

          {/* ✅ FIX 5: Only one animation — removed animate-bounce to avoid jitter */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
            <div className="relative p-6 bg-white dark:bg-zinc-900 rounded-full inline-flex items-center gap-4 shadow-xl border border-primary/10">
              <Wrench className="h-10 w-10 text-primary" />
              <Zap className="h-10 w-10 text-yellow-500 animate-pulse" />
            </div>
          </div>

          <div className="max-w-2xl">
            <h3 className="text-3xl md:text-5xl font-black text-foreground tracking-tight mb-4 leading-tight">
              {title} –{' '}
              <span className="text-primary italic">Engineering the Future</span> 🚀
            </h3>

            <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
              We know you are excited to use the <strong>{title}</strong>, and so are we!
              Our development team is currently refining the algorithms to ensure this tool
              delivers unmatched speed and precision once it goes live on TaskGuru.
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
              <div className="flex items-center gap-3 bg-white dark:bg-zinc-800 p-4 rounded-2xl shadow-sm border border-border">
                <Sparkles className="text-accent w-6 h-6 flex-shrink-0" />
                <span className="text-sm font-bold italic text-muted-foreground uppercase">
                  AI-Optimized Engine
                </span>
              </div>
              <div className="flex items-center gap-3 bg-white dark:bg-zinc-800 p-4 rounded-2xl shadow-sm border border-border">
                <Rocket className="text-primary w-6 h-6 flex-shrink-0" />
                <span className="text-sm font-bold italic text-muted-foreground uppercase">
                  Zero-Latency Processing
                </span>
              </div>
            </div>

            <p className="mt-8 text-sm font-bold text-muted-foreground uppercase tracking-widest bg-muted py-2 px-6 rounded-full inline-block">
              Projected Deployment: Coming Soon
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center mt-4">
            <Button
              asChild size="lg"
              className="bg-primary hover:bg-primary/90 font-bold px-10 h-14 rounded-full shadow-lg transition-transform hover:scale-105"
            >
              <Link href="/">Explore 10+ Live Tools</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="px-10 h-14 rounded-full font-bold">
              <Link href="/blog">Read Productivity Guides</Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* SEO CONTENT */}
      {/* ✅ FIX 3: Removed prose classes — plain Tailwind throughout */}
      <article className="max-w-4xl mx-auto border-t pt-16 text-muted-foreground space-y-10">
        <h2 className="text-3xl font-black text-center text-gray-900 dark:text-white underline decoration-primary/20">
          Why Quality Takes Time: Our Vision for {title}
        </h2>

        {/* ✅ FIX 2: Removed "TaskGuru (Toolify)" */}
        <p className="text-lg leading-relaxed">
          At <strong>TaskGuru</strong>, our mission is to build reliable digital utilities that
          genuinely simplify your daily workflow. While we finalize the development of the{' '}
          <strong>{title}</strong>, our team is focused on delivering a tool that meets global
          standards of efficiency and user privacy.
        </p>

        <div className="space-y-8">
          <div className="flex gap-6 items-start">
            <div className="bg-primary/10 p-4 rounded-2xl flex-shrink-0">
              <ShieldCheck className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h4 className="font-bold text-xl mb-2 text-foreground">
                1. Privacy-First Architecture
              </h4>
              <p className="leading-relaxed">
                Just like our existing suite, the <strong>{title}</strong> will operate using
                transient memory processing. Your privacy is our absolute priority — files are
                never permanently stored on our servers, ensuring your data remains in your
                control at all times.
              </p>
            </div>
          </div>

          <div className="flex gap-6 items-start">
            <div className="bg-accent/10 p-4 rounded-2xl flex-shrink-0">
              <HeartHandshake className="w-8 h-8 text-accent" />
            </div>
            <div>
              <h4 className="font-bold text-xl mb-2 text-foreground">
                2. User-Centric Experience
              </h4>
              <p className="leading-relaxed">
                We aren&apos;t just writing code — we are building an experience. We are
                currently testing <strong>{title}</strong> with real users to ensure the
                interface is frictionless, requiring no sign-ups or hidden costs to get the
                job done.
              </p>
            </div>
          </div>

          <div className="flex gap-6 items-start border-l-4 border-primary/20 pl-6 bg-muted/20 p-6 rounded-r-2xl">
            <Info className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
            <p className="text-sm italic leading-relaxed">
              While you wait for this tool, we recommend using our live{' '}
              <strong>
                <Link href="/tools/background-remover" className="underline hover:text-primary">
                  AI Background Remover
                </Link>
              </strong>{' '}
              or our{' '}
              <strong>
                <Link href="/tools/image-compressor" className="underline hover:text-primary">
                  Image Compressor
                </Link>
              </strong>{' '}
              to handle your current creative needs.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-foreground">
            A Commitment to Free Productivity
          </h3>
          <p className="leading-relaxed">
            The modern web is filled with subscription traps. At TaskGuru, we remain dedicated
            to providing high-quality AI-powered tools at zero cost. We believe that
            professional productivity should be accessible to everyone — from students to
            freelance experts — without any financial barriers.
          </p>
        </div>

        {/* ✅ FIX 4: Removed local <footer> — replaced with simple attribution line */}
        <p className="text-center text-sm font-medium italic opacity-60 border-t pt-8">
          TaskGuru — Developed by Shubham Gautam. Always Secure, Fast, and Private.
        </p>
      </article>

    </div>
  );
}
