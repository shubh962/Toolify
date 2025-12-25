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
  ExternalLink,
  ShieldCheck,
  Zap,
  Mail,
  HelpCircle
} from "lucide-react";

import { Inter } from "next/font/google";
import Script from "next/script";
import Link from "next/link";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

// ✅ Compliance for Next.js 15
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.taskguru.online"),
  title: {
    default: "Toolify (TaskGuru) – Free AI Tools for PDF, Images & Text",
    template: "%s • Toolify (TaskGuru)",
  },
  description:
    "Free AI tools by Toolify (TaskGuru). Fast & secure Background Remover, Image Compressor, PDF Tools, and OCR. No login required for instant productivity.",
  robots: "index, follow",
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "https://www.taskguru.online",
    },
  },
  verification: {
    google: "XhRtp6rO2MNQX-BucHlUxVhNLbBPfdis_RzXY5ZodlU",
  },
  keywords: "toolify taskguru, free online tools, ai tools, background remover, image compressor, pdf to word, paraphraser, ocr",
  openGraph: {
    title: "Toolify (TaskGuru) – Free Online Tools",
    description: "Background Removal, Image Compression, and PDF tools. Fast & Private AI utilities.",
    url: "https://www.taskguru.online",
    siteName: "Toolify (TaskGuru)",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  
  const siteLdJson = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: "https://www.taskguru.online",
    name: "Toolify (TaskGuru)",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://www.taskguru.online/tools/{search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  const orgLdJson = {
    "@context": "https://schema.org",
    "@type": "Organization",
    url: "https://www.taskguru.online",
    name: "Toolify (TaskGuru)",
    logo: "https://www.taskguru.online/logo.png",
    sameAs: [
      "https://www.facebook.com/share/1K97T5Q5wp/",
      "https://x.com/Shubham_962",
      "https://www.instagram.com/m_just_shubham",
      "https://www.linkedin.com/in/Shubh962",
      "https://youtube.com/@factfusions0-x4k",
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([siteLdJson, orgLdJson]),
          }}
        />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2427221337462218"
          crossOrigin="anonymous"
        ></script>
      </head>

      <body className="font-sans antialiased min-h-screen flex flex-col bg-white dark:bg-gray-950 selection:bg-blue-100 selection:text-blue-900">
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XE6BHLH4J6"
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
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

          {/* --- ENHANCED COLUMNAR FOOTER --- */}
          <footer className="py-16 bg-gray-50/50 dark:bg-gray-900/50 border-t border-gray-200 dark:border-gray-800">
            <div className="container mx-auto px-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                
                {/* Brand Column */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-black text-blue-600 dark:text-blue-400 tracking-tighter mb-2">Toolify (TaskGuru)</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                      Premium AI toolkit designed for maximum productivity. Secure, lightning-fast, and 100% browser-based privacy.
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <a href="https://x.com/Shubham_962" target="_blank" className="p-2.5 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:text-sky-400 hover:-translate-y-1 transition-all"><Twitter className="w-5 h-5" /></a>
                    <a href="https://www.instagram.com/m_just_shubham" target="_blank" className="p-2.5 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:text-pink-600 hover:-translate-y-1 transition-all"><Instagram className="w-5 h-5" /></a>
                    <a href="https://youtube.com/@factfusions0-x4k" target="_blank" className="p-2.5 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:text-red-600 hover:-translate-y-1 transition-all"><Youtube className="w-5 h-5" /></a>
                  </div>
                </div>

                {/* Productivity Tools */}
                <div>
                  <h4 className="font-black text-gray-900 dark:text-white mb-6 uppercase text-[11px] tracking-[0.2em]">Productivity Tools</h4>
                  <nav className="flex flex-col gap-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                    <Link href="/tools/age-calculator" className="hover:text-blue-600 transition-colors flex items-center gap-2"><Zap className="w-3.5 h-3.5 text-yellow-500" /> Age Calculator Pro</Link>
                    <Link href="/tools/resume-maker" className="hover:text-blue-600 transition-colors">ATS Resume Maker</Link>
                    <Link href="/tools/background-remover" className="hover:text-blue-600 transition-colors">AI Background Remover</Link>
                    <Link href="/tools/image-compressor" className="hover:text-blue-600 transition-colors">Image Compressor</Link>
                  </nav>
                </div>

                {/* Partners & Support */}
                <div>
                  <h4 className="font-black text-gray-900 dark:text-white mb-6 uppercase text-[11px] tracking-[0.2em]">Partner Network</h4>
                  <nav className="flex flex-col gap-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                    <a 
                      href="https://metatube-inspector.vercel.app" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold hover:underline"
                    >
                      MetaTube Inspector <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <Link href="/blog" className="hover:text-blue-600 transition-colors flex items-center gap-2"><Link href="/blog" /> Latest Insights</Link>
                    <Link href="/help" className="hover:text-blue-600 transition-colors flex items-center gap-2"><HelpCircle className="w-3.5 h-3.5" /> Help Center</Link>
                    <Link href="/contact" className="hover:text-blue-600 transition-colors flex items-center gap-2"><Mail className="w-3.5 h-3.5" /> Contact Support</Link>
                  </nav>
                </div>

                {/* Trust & Legal */}
                <div>
                  <h4 className="font-black text-gray-900 dark:text-white mb-6 uppercase text-[11px] tracking-[0.2em]">Trust & Policy</h4>
                  <nav className="flex flex-col gap-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                    <Link href="/privacy-policy" className="hover:text-blue-600 transition-colors flex items-center gap-2"><ShieldCheck className="w-3.5 h-3.5 text-green-500" /> Privacy Policy</Link>
                    <Link href="/terms" className="hover:text-blue-600 transition-colors">Terms of Service</Link>
                    <Link href="/disclaimer" className="hover:text-blue-600 transition-colors">Disclaimer</Link>
                    
                    <Dialog>
                      <DialogTrigger asChild>
                        <button className="text-left hover:text-blue-600 transition-colors font-bold underline underline-offset-4 decoration-blue-200">About & Copyright</button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto rounded-[2rem]">
                        <DialogHeader><DialogTitle className="text-3xl font-black text-center mb-6">About TaskGuru</DialogTitle></DialogHeader>
                        <div className="space-y-6">
                          <Card className="border-none bg-blue-50/50 p-2"><CardHeader><CardTitle className="text-xl">Mission</CardTitle></CardHeader>
                          <CardContent className="text-sm leading-relaxed text-gray-600">
                            <strong>Toolify (TaskGuru)</strong> is a labor of love by <strong>Shubham Gautam</strong>. We aim to replace expensive software with free, private AI tools.
                          </CardContent></Card>
                          <Card className="border-none bg-red-50/50 p-2"><CardHeader><CardTitle className="flex items-center gap-2 text-destructive text-xl"><AlertTriangle className="h-5 w-5" /> Copyright Notice</CardTitle></CardHeader>
                          <CardContent className="text-sm text-gray-600">© 2025 Toolify (TaskGuru). All code and logic are proprietary. All rights reserved.</CardContent></Card>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </nav>
                </div>
              </div>

              {/* Bottom Attribution */}
              <div className="pt-10 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="space-y-1 text-center md:text-left">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">
                    © 2025 Toolify (TaskGuru) — Secure, Fast & Private AI Toolkit
                  </p>
                  <p className="text-xs text-gray-500 italic">
                    Designed for 10X Productivity. No Login. No Tracking.
                  </p>
                </div>
                <div className="text-center md:text-right">
                  <p className="text-sm font-bold text-gray-700 dark:text-gray-300">
                    Developed by <span className="text-blue-600 dark:text-blue-400 font-black underline decoration-2 underline-offset-4">Shubham Gautam</span>
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

