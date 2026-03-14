import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  FileQuestion, MoveLeft, Home,
  ShieldCheck, Zap, Cpu, Code2, BookOpen,
} from "lucide-react";

export default function NotFound() {
  return (
    // ✅ FIX 5: Removed hardcoded bg-white — supports dark mode
    <div className="min-h-screen">

      {/* 404 Header */}
      <div className="h-[70vh] flex flex-col items-center justify-center text-center px-4 space-y-8 border-b border-slate-100 dark:border-slate-800">
        <div className="relative">
          {/* ✅ FIX 6: Removed animate-ping — too distracting on error page */}
          <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-full">
            <FileQuestion className="w-16 h-16 text-red-500" />
          </div>
        </div>

        <div className="space-y-4 max-w-md">
          <h1 className="text-4xl font-black text-slate-900 dark:text-white">
            404 — Page Not Found
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            The page you are looking for might have been updated or moved.
            Use the buttons below to find what you need.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            asChild
            variant="outline"
            className="h-12 px-8 border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
          >
            <Link href="/blog">
              <MoveLeft className="w-4 h-4 mr-2" /> Explore Blog
            </Link>
          </Button>
          <Button
            asChild
            className="h-12 px-8 bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-200"
          >
            <Link href="/">
              <Home className="w-4 h-4 mr-2" /> Return Home
            </Link>
          </Button>
        </div>
      </div>

      {/* SEO Content */}
      {/* ✅ FIX 1: Removed prose classes — plain Tailwind */}
      <article className="max-w-4xl mx-auto px-6 py-20 font-sans leading-relaxed text-slate-700 dark:text-slate-400">

        <header className="mb-12">
          <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-6 uppercase tracking-tight">
            TaskGuru: The Engineering Behind Digital Freedom
          </h2>
          <p className="text-xl font-medium text-slate-500 dark:text-slate-400 italic">
            &quot;We didn&apos;t just build a website — we engineered a privacy-first utility
            ecosystem.&quot; — Shubham Gautam, Founder.
          </p>
        </header>

        <div className="space-y-12">

          <section className="space-y-4">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <ShieldCheck className="text-green-600 w-6 h-6" /> Our Core Mission: Privacy by Default
            </h3>
            <p>
              TaskGuru was founded with a single, uncompromising goal: to provide
              high-quality digital utilities without harvesting user data. As an AKTU
              graduate with an IT background, Shubham Gautam observed a disturbing trend
              where &quot;free&quot; tools were secretly uploading sensitive documents — Aadhaar
              cards, bank statements, and private photos — to insecure cloud servers.
            </p>
            <p>
              TaskGuru solved this by implementing <strong>Client-Side Architecture</strong>.
              When you use a TaskGuru tool, the code executes directly in your browser&apos;s RAM.
              Your data never touches any server. This &quot;Zero-Knowledge&quot; approach is what
              separates TaskGuru from legacy utility sites.
            </p>
          </section>

          <section className="bg-slate-50 dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 space-y-4">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Cpu className="text-indigo-600 w-6 h-6" /> Technical Excellence: WebAssembly & Edge
            </h3>
            <p>
              To achieve near-instant performance, TaskGuru leverages{' '}
              <strong>WebAssembly (Wasm)</strong> and <strong>Vercel Edge Functions</strong>.
              By deploying logic to global edge nodes, pages are served from the location
              physically closest to the user — ensuring that even complex tasks like PDF
              merging or image compression happen in milliseconds.
            </p>
            <p>
              The tech stack is built on Next.js 15, optimised for Core Web Vitals.
              TaskGuru maintains a near-perfect Lighthouse score by prioritising Largest
              Contentful Paint (LCP) and Cumulative Layout Shift (CLS) — ensuring a
              stable, fast experience for mobile users who account for over 60% of traffic.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Zap className="text-amber-500 w-6 h-6" /> Why Every Tool on TaskGuru Is Free
            </h3>
            <p>
              The internet is plagued by micro-subscription models. Basic digital tasks —
              compressing an image, formatting a resume, converting a PDF — should not
              be hidden behind paywalls. By optimising infrastructure costs through
              Edge computing, TaskGuru is able to keep all tools completely free for
              students, freelancers, and professionals worldwide.
            </p>
          </section>

          <section className="grid md:grid-cols-2 gap-6">
            <div className="border border-slate-100 dark:border-slate-800 p-6 rounded-3xl bg-white dark:bg-slate-900">
              <h4 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                <Code2 className="w-5 h-5 text-blue-500" /> Productivity Tools
              </h4>
              <p className="text-sm leading-relaxed">
                From image compression to PDF management and QR code generation,
                TaskGuru provides the browser-based utilities needed for modern
                professional workflows.
              </p>
            </div>
            <div className="border border-slate-100 dark:border-slate-800 p-6 rounded-3xl bg-white dark:bg-slate-900">
              <h4 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-teal-500" /> Educational Hub
              </h4>
              <p className="text-sm leading-relaxed">
                The TaskGuru blog publishes in-depth guides on image optimisation,
                PDF tools, resume writing, OCR technology, and digital productivity
                for students and professionals.
              </p>
            </div>
          </section>

          {/* ✅ FIX 7: Expanded to 4 FAQs */}
          <section className="border-t border-slate-100 dark:border-slate-800 pt-10 space-y-5">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white text-center">
              Frequently Asked Questions
            </h3>
            <div className="space-y-4">
              {[
                {
                  q: 'Is TaskGuru really safe for my documents?',
                  a: 'Absolutely. All processing is local — TaskGuru never sees, stores, or shares your files. You can use many tools offline once the page has loaded.',
                },
                {
                  q: 'How do I contact the developer?',
                  a: 'You can reach Shubham Gautam through the Contact page on TaskGuru for tool requests, bug reports, or technical collaborations.',
                },
                {
                  q: 'Are there any hidden fees or subscriptions?',
                  a: 'No. Every tool on TaskGuru is completely free — no credit card, no sign-up, no premium tier. This will not change.',
                },
                {
                  q: 'What tools does TaskGuru offer?',
                  a: 'TaskGuru offers 15+ free tools including Image Compressor, PDF to Word, Merge PDF, Split PDF, PDF Compressor, Background Remover, OCR Image to Text, QR Code Generator, Resume Maker, EMI Calculator, Age Calculator, and more.',
                },
              ].map((faq, i) => (
                <div key={i} className="bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 rounded-2xl">
                  <p className="font-bold text-slate-900 dark:text-white mb-2 text-sm">{faq.q}</p>
                  <p className="text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Quick links */}
          <section className="border-t border-slate-100 dark:border-slate-800 pt-10 space-y-5">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Popular Pages
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <p className="text-xs font-black text-slate-400 uppercase tracking-wider mb-3">
                  Free Tools
                </p>
                {[
                  { label: 'Image Compressor', href: '/tools/image-compressor' },
                  { label: 'Resume Maker', href: '/tools/resume-maker' },
                  { label: 'PDF to Word', href: '/tools/pdf-to-word' },
                  { label: 'Merge PDF', href: '/tools/merge-pdf' },
                  // ✅ FIX 3: Removed /tools/pdf-tools (doesn't exist)
                  { label: 'PDF Compressor', href: '/tools/pdf-compressor' },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block text-sm hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {link.label} →
                  </Link>
                ))}
              </div>
              <div className="space-y-2">
                <p className="text-xs font-black text-slate-400 uppercase tracking-wider mb-3">
                  Blog Guides
                </p>
                {[
                  { label: 'Image Compression Guide', href: '/blog/how-to-compress-images-without-losing-quality' },
                  { label: 'What is OCR?', href: '/blog/what-is-ocr-image-to-text' },
                  { label: 'PDF to Word Guide', href: '/blog/how-to-convert-pdf-to-word-free' },
                  { label: 'ATS Resume Tips', href: '/blog/resume-ats-secrets' },
                  { label: 'What is a QR Code?', href: '/blog/what-is-a-qr-code' },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block text-sm hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {link.label} →
                  </Link>
                ))}
              </div>
              <div className="space-y-2">
                <p className="text-xs font-black text-slate-400 uppercase tracking-wider mb-3">
                  Legal & Trust
                </p>
                {[
                  { label: 'Privacy Policy', href: '/privacy-policy' },
                  { label: 'Terms of Service', href: '/terms' },
                  { label: 'About Us', href: '/about' },
                  { label: 'Contact', href: '/contact' },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block text-sm hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {link.label} →
                  </Link>
                ))}
              </div>
            </div>
          </section>

        </div>
      </article>

      {/* ✅ FIX 2: Removed local <footer> — layout.tsx already has footer */}

    </div>
  );
                  }
                
