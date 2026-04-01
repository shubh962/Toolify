import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/Header";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ThemeToggle } from "@/components/ThemeToggle";
import GlobalShare from "@/components/GlobalShare";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertTriangle,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Github,
  ExternalLink,
  ShieldCheck,
  Zap,
  Mail,
  HelpCircle,
  Info,
  Scale,
  FileText,
  Map,
  CheckCircle2,
} from "lucide-react";
import { Sora } from "next/font/google";
import Script from "next/script";
import Link from "next/link";
import React from "react";

const sora = Sora({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sora",
  weight: ["400", "500", "600", "700", "800"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#030712" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.taskguru.online"),
  title: {
    default: "TaskGuru AI • 100% Free Online PDF, Image & Text Tools",
    template: "%s | TaskGuru",
  },
  description: "Free AI-powered tools for everyone. Convert PDF to Word, remove image backgrounds, compress images, and more. No login required. 100% private.",
  keywords: "free ai tools, taskguru online, background remover free, pdf to word no login, image compressor online, resume maker 2026",
  authors: [{ name: "Shubham Gautam", url: "https://www.taskguru.online" }],
  creator: "Shubham Gautam",
  publisher: "TaskGuru",
  verification: { google: "XhRtp6rO2MNQX-BucHlUxVhNLbBPfdis_RzXY5ZodlU" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={sora.variable}>
      <body className="font-sans antialiased min-h-screen flex flex-col bg-white dark:bg-gray-950 selection:bg-blue-600 selection:text-white">
        
        {/* Adsterra Global Scripts */}
        <Script src="https://pl27365402.profitablecpmratenetwork.com/ae/52/0f/ae520f3c967ee911772a55229589d894.js" strategy="lazyOnload" />
        <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2427221337462218" crossOrigin="anonymous" strategy="afterInteractive" />

        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header themeToggle={<ThemeToggle />} />
          
          <main className="flex-1">
            {children}

            {/* --- ADSense Approval Text Section (2000+ Words Context) --- */}
            <section className="container mx-auto px-6 py-20 border-t border-gray-100 dark:border-gray-800 bg-gray-50/20">
              <div className="max-w-4xl mx-auto space-y-12 text-gray-600 dark:text-gray-400 leading-relaxed">
                
                <div className="text-center space-y-4">
                  <h2 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">The TaskGuru Mission: Democratizing Professional AI Tools</h2>
                  <p className="text-lg font-medium text-blue-600">Why we built the internet's most transparent productivity suite.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="p-8 bg-white dark:bg-gray-900 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <ShieldCheck className="text-green-500" /> Privacy First
                    </h3>
                    <p className="text-sm">Unlike other platforms that store your PDFs or images on their servers, TaskGuru processes almost everything locally in your browser. Your data never leaves your device, ensuring total institutional-grade privacy.</p>
                  </div>
                  <div className="p-8 bg-white dark:bg-gray-900 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <Zap className="text-yellow-500" /> No Login Required
                    </h3>
                    <p className="text-sm">We believe speed is a feature. You shouldn't have to create an account or verify an email just to compress a single image. TaskGuru is, and always will be, 100% free with no sign-ups.</p>
                  </div>
                </div>

                <div className="prose prose-blue dark:prose-invert max-w-none space-y-6">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">A Deep Dive into Our Tool Ecosystem</h3>
                  <p>In the digital age of 2026, productivity shouldn't be hidden behind a paywall. Developed by <strong>Shubham Gautam</strong>, TaskGuru was born out of the necessity to provide students, creators, and professionals in India and globally with high-performance tools that don't compromise on security.</p>
                  
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white">Our Core Utilities:</h4>
                  <ul className="space-y-4 list-none pl-0">
                    <li className="flex items-start gap-3"><CheckCircle2 className="text-blue-500 mt-1 w-5 h-5" /> <strong>Advanced PDF Suite:</strong> Convert PDF to Word (DOCX) with high-fidelity formatting. Our engine intelligently extracts text and tables, maintaining the original layout for seamless editing.</li>
                    <li className="flex items-start gap-3"><CheckCircle2 className="text-blue-500 mt-1 w-5 h-5" /> <strong>AI Image Processor:</strong> Use our background remover to isolate subjects in seconds. Perfect for e-commerce owners and social media influencers who need clean product shots instantly.</li>
                    <li className="flex items-start gap-3"><CheckCircle2 className="text-blue-500 mt-1 w-5 h-5" /> <strong>Resume Maker 2.0:</strong> Built for the modern job market. Create professional, ATS-friendly resumes without fighting with Word templates.</li>
                  </ul>

                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-12">Commitment to Global Standards</h3>
                  <p>TaskGuru follows strict web accessibility and performance guidelines. We optimize our assets so that users on low-bandwidth connections in rural areas can still access the same powerful AI features as those in tech hubs. Our codebase, built on Next.js 15, ensures that every interaction is snappy and every tool is reliable.</p>
                </div>

                {/* --- Adsterra Native Ad Block --- */}
                <div className="py-10 flex flex-col items-center justify-center border-y border-gray-100 dark:border-gray-800">
                  <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-4">Advertisement</span>
                  <div id="container-d39855ca15bcb0b839000465de518edb"></div>
                  <Script
                    id="adsterra-native-banner"
                    src="https://pl29034152.profitablecpmratenetwork.com/d39855ca15bcb0b839000465de518edb/invoke.js"
                    strategy="lazyOnload"
                    data-cfasync="false"
                  />
                </div>
              </div>
            </section>
          </main>

          <Toaster />
          <GlobalShare />

          <footer className="py-20 bg-gray-50/50 dark:bg-gray-900/50 border-t border-gray-200 dark:border-gray-800">
            <div className="container mx-auto px-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                <div className="space-y-6">
                  <h3 className="text-3xl font-black text-blue-600 tracking-tighter mb-4">TaskGuru</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-medium">The internet&apos;s favorite 100% free AI toolkit. Made in India 🇮🇳.</p>
                  <div className="grid grid-cols-5 sm:flex gap-3">
                    {[{ href: "https://github.com/Shubh962", icon: <Github className="w-5 h-5" />, label: "GitHub" }, { href: "https://x.com/Shubham_962", icon: <Twitter className="w-5 h-5" />, label: "Twitter" }, { href: "https://instagram.com/m_just_shubham", icon: <Instagram className="w-5 h-5" />, label: "Instagram" }].map((s) => (
                      <a key={s.label} href={s.href} target="_blank" className="p-3 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:-translate-y-1 transition-all">{s.icon}</a>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-black text-gray-900 dark:text-white mb-6 uppercase text-[11px] tracking-[0.2em]">Resources</h4>
                  <nav className="flex flex-col gap-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                    <Link href="/about" className="hover:text-blue-600 transition-colors">About TaskGuru</Link>
                    <Link href="/blog" className="hover:text-blue-600 transition-colors">Productivity Blog</Link>
                    <Link href="/help" className="hover:text-blue-600 transition-colors">Help Center</Link>
                    <Link href="/contact" className="hover:text-blue-600 transition-colors">Contact Support</Link>
                  </nav>
                </div>
                <div>
                  <h4 className="font-black text-gray-900 dark:text-white mb-6 uppercase text-[11px] tracking-[0.2em]">Popular Tools</h4>
                  <nav className="flex flex-col gap-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                    <Link href="/tools/background-remover" className="hover:text-blue-600">Background Remover</Link>
                    <Link href="/tools/pdf-to-word" className="hover:text-blue-600">PDF to Word</Link>
                    <Link href="/tools/resume-maker" className="hover:text-blue-600">Resume Maker</Link>
                  </nav>
                </div>
                <div>
                  <h4 className="font-black text-gray-900 dark:text-white mb-6 uppercase text-[11px] tracking-[0.2em]">Legal</h4>
                  <nav className="flex flex-col gap-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                    <Link href="/privacy-policy" className="hover:text-blue-600">Privacy Policy</Link>
                    <Link href="/terms" className="hover:text-blue-600">Terms of Use</Link>
                    <Link href="/disclaimer" className="hover:text-blue-600">Disclaimer</Link>
                  </nav>
                </div>
              </div>
              <div className="pt-10 border-t border-gray-200 dark:border-gray-800 text-center">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em]">© 2026 TASKGURU — BEYOND DIGITAL BOUNDARIES</p>
                <p className="text-sm font-bold text-gray-700 dark:text-gray-300 mt-4">Developed by Shubham Gautam</p>
              </div>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
