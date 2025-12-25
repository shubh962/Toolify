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
  Linkedin,
  Youtube,
  Github,
  ExternalLink,
  ShieldCheck,
  Zap,
  Mail,
  HelpCircle,
  Lock,
  ArrowUpRight,
  Info,
  Scale,
  FileText
} from "lucide-react";

import { Inter } from "next/font/google";
import Script from "next/script";
import Link from "next/link";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
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
  description:
    "TaskGuru offers 100% free AI tools. Convert PDF to Word, remove backgrounds, compress images, and paraphrase text instantly. No login required.",
  robots: "index, follow",
  verification: {
    google: "XhRtp6rO2MNQX-BucHlUxVhNLbBPfdis_RzXY5ZodlU",
  },
  keywords: "free ai tools, taskguru online, background remover free, pdf to word no login, image compressor online",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  
  const siteLdJson = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: "https://www.taskguru.online",
    name: "TaskGuru",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://www.taskguru.online/tools/{search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2427221337462218"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <Script
          id="ld-json"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteLdJson) }}
        />
      </head>

      <body className="font-sans antialiased min-h-screen flex flex-col bg-white dark:bg-gray-950 selection:bg-blue-600 selection:text-white">
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-XE6BHLH4J6" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XE6BHLH4J6');
          `}
        </Script>

        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header themeToggle={<ThemeToggle />} />
          
          <main className="flex-1">
            {children}
          </main>
          
          <Toaster />
          <GlobalShare />

          {/* --- 🛡️ ENHANCED LEGAL & COMPLIANCE FOOTER --- */}
          <footer className="py-20 bg-gray-50/50 dark:bg-gray-900/50 border-t border-gray-200 dark:border-gray-800">
            <div className="container mx-auto px-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                
                {/* 1. Brand & High-Engagement Socials */}
                <div className="space-y-8">
                  <div>
                    <h3 className="text-3xl font-black text-blue-600 tracking-tighter mb-4">TaskGuru</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-medium">
                      Replacing expensive SaaS with 100% free, private AI utilities. Engineered for global speed and military-grade data privacy.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-5 sm:flex gap-3">
                    <a href="https://github.com/Shubh962" target="_blank" className="p-3 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:text-gray-900 dark:hover:text-white hover:-translate-y-1 transition-all"><Github className="w-5 h-5" /></a>
                    <a href="https://facebook.com/share/1K97T5Q5wp/" target="_blank" className="p-3 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:text-blue-600 hover:-translate-y-1 transition-all"><Facebook className="w-5 h-5" /></a>
                    <a href="https://x.com/Shubham_962" target="_blank" className="p-3 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:text-sky-500 hover:-translate-y-1 transition-all"><Twitter className="w-5 h-5" /></a>
                    <a href="https://instagram.com/m_just_shubham" target="_blank" className="p-3 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:text-pink-600 hover:-translate-y-1 transition-all"><Instagram className="w-5 h-5" /></a>
                    <a href="https://youtube.com/@factfusions0-x4k" target="_blank" className="p-3 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:text-red-600 hover:-translate-y-1 transition-all"><Youtube className="w-5 h-5" /></a>
                  </div>
                </div>

                {/* 2. Primary Tool Categories (SEO) */}
                <div>
                  <h4 className="font-black text-gray-900 dark:text-white mb-6 uppercase text-[11px] tracking-[0.2em]">Free AI Tools</h4>
                  <nav className="flex flex-col gap-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                    <Link href="/tools/background-remover" className="hover:text-blue-600 transition-colors">Background Remover</Link>
                    <Link href="/tools/image-to-text" className="hover:text-blue-600 transition-colors">Image to Text (OCR)</Link>
                    <Link href="/tools/pdf-to-word" className="hover:text-blue-600 transition-colors">PDF to Word Converter</Link>
                    <Link href="/tools/resume-maker" className="hover:text-blue-600 transition-colors flex items-center gap-2">ATS Resume Maker <Zap className="w-3 h-3 text-yellow-500" /></Link>
                    <Link href="/tools/age-calculator" className="hover:text-blue-600 transition-colors">Age Calculator Online</Link>
                  </nav>
                </div>

                {/* 3. Company & Help (Crucial for Adsense) */}
                <div>
                  <h4 className="font-black text-gray-900 dark:text-white mb-6 uppercase text-[11px] tracking-[0.2em]">Resources</h4>
                  <nav className="flex flex-col gap-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                    <Link href="/about" className="hover:text-blue-600 transition-colors flex items-center gap-2 font-bold text-gray-900 dark:text-white">
                      <Info className="w-4 h-4 text-blue-500" /> About TaskGuru
                    </Link>
                    <Link href="/blog" className="hover:text-blue-600 transition-colors">Productivity Blog</Link>
                    <Link href="/help" className="hover:text-blue-600 transition-colors flex items-center gap-2"><HelpCircle className="w-4 h-4" /> Help Center</Link>
                    <Link href="/contact" className="hover:text-blue-600 transition-colors flex items-center gap-2"><Mail className="w-4 h-4" /> Contact Us</Link>
                    <a href="https://metatube-inspector.vercel.app" target="_blank" className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold hover:underline">
                       MetaTube Inspector <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </nav>
                </div>

                {/* 4. Legal Compliance (Essential for Trust) */}
                <div>
                  <h4 className="font-black text-gray-900 dark:text-white mb-6 uppercase text-[11px] tracking-[0.2em]">Legal & Compliance</h4>
                  <nav className="flex flex-col gap-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                    <Link href="/privacy-policy" className="hover:text-blue-600 flex items-center gap-2 font-bold text-green-600 dark:text-green-500">
                      <ShieldCheck className="w-4 h-4" /> Privacy Policy
                    </Link>
                    <Link href="/terms" className="hover:text-blue-600 flex items-center gap-2">
                      <Scale className="w-4 h-4" /> Terms of Service
                    </Link>
                    <Link href="/disclaimer" className="hover:text-blue-600 flex items-center gap-2">
                      <FileText className="w-4 h-4" /> Disclaimer
                    </Link>
                    
                    <Dialog>
                      <DialogTrigger asChild>
                        <button className="text-left hover:text-blue-600 font-bold underline underline-offset-4 decoration-blue-200">Legal Ownership</button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl rounded-[2.5rem] border-none shadow-2xl">
                        <DialogHeader><DialogTitle className="text-3xl font-black mb-4">Platform Transparency</DialogTitle></DialogHeader>
                        <div className="space-y-6">
                          <Card className="border-none bg-blue-50/50 dark:bg-blue-900/10 p-2">
                            <CardHeader><CardTitle className="text-lg">Project Goal</CardTitle></CardHeader>
                            <CardContent className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                              <strong>TaskGuru</strong> is a specialized AI ecosystem founded by <strong>Shubham Gautam</strong>. Our mission is to democratize premium software capabilities—making them free, secure, and accessible to everyone worldwide.
                            </CardContent>
                          </Card>
                          <div className="p-5 bg-red-50 dark:bg-red-900/10 rounded-2xl flex items-center gap-3">
                            <AlertTriangle className="text-red-500 h-6 w-6" />
                            <p className="text-xs text-red-600 dark:text-red-400 font-medium">
                              © 2025 TaskGuru AI. All algorithmic logic and proprietary branding are protected under international copyright laws.
                            </p>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </nav>
                </div>
              </div>

              {/* Bottom Copyright Area */}
              <div className="pt-10 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="text-center md:text-left">
                  <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.4em] mb-1">
                    © 2025 TASKGURU — OPEN WEB PRODUCTIVITY
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-600 italic">No Subscription Fees. No Data Harvesting. Pure Speed.</p>
                </div>
                <div className="flex flex-col items-center md:items-end">
                  <p className="text-sm font-bold text-gray-700 dark:text-gray-300">
                    Developed by <span className="text-blue-600 dark:text-blue-400 font-black underline decoration-2 underline-offset-4 decoration-blue-100">Shubham Gautam</span>
                  </p>
                </div>
              </div>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
