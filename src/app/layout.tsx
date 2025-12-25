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
  HelpCircle,
  Lock,
  ArrowUpRight
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
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#030712" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.taskguru.online"),
  title: {
    default: "TaskGuru AI • Free Online Productivity Tools (PDF, Images & Text)",
    template: "%s | TaskGuru",
  },
  description:
    "TaskGuru offers 100% free AI-powered tools. Convert PDF to Word, remove backgrounds, compress images, and paraphrase text instantly. Secure, private, and no login required.",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/apple-touch-icon.png", // Added for iOS SEO
  },
  alternates: {
    canonical: "/",
  },
  verification: {
    google: "XhRtp6rO2MNQX-BucHlUxVhNLbBPfdis_RzXY5ZodlU",
  },
  keywords: ["free ai tools", "taskguru online", "pdf to word converter", "remove bg online", "image compressor", "paraphrasing tool", "free resume maker"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  
  const siteLdJson = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: "https://www.taskguru.online",
    name: "TaskGuru",
    alternateName: "Toolify TaskGuru",
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
    name: "TaskGuru",
    logo: "https://www.taskguru.online/logo.png",
    contactPoint: {
      "@type": "ContactPoint",
      email: "contact@taskguru.online",
      contactType: "customer service"
    },
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
        {/* ✅ AdSense Auto-Ads (Better Placement) */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2427221337462218"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <Script
          id="ld-json"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([siteLdJson, orgLdJson]),
          }}
        />
      </head>

      <body className="font-sans antialiased min-h-screen flex flex-col bg-white dark:bg-gray-950 selection:bg-blue-600 selection:text-white">
        {/* ✅ Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XE6BHLH4J6"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XE6BHLH4J6', {
              page_path: window.location.pathname,
            });
          `}
        </Script>

        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header themeToggle={<ThemeToggle />} />
          
          {/* ✅ Added a dynamic spacer for Ads if needed */}
          <main className="flex-1">
            {children}
          </main>
          
          <Toaster />
          <GlobalShare />

          {/* --- ENHANCED GLOBAL FOOTER --- */}
          <footer className="py-20 bg-gray-50/80 dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800">
            <div className="container mx-auto px-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                
                {/* Brand Column */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-3xl font-black text-gray-900 dark:text-white tracking-tighter mb-4">
                      TaskGuru<span className="text-blue-600">.</span>
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
                      Replacing premium software with free, browser-based AI solutions. We prioritize your privacy with zero-server storage policy.
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <Link href="https://x.com/Shubham_962" target="_blank" className="p-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-500 transition-all group">
                      <Twitter className="w-4 h-4 group-hover:text-blue-500" />
                    </Link>
                    <Link href="https://linkedin.com/in/Shubh962" target="_blank" className="p-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-700 transition-all group">
                      <Linkedin className="w-4 h-4 group-hover:text-blue-700" />
                    </Link>
                  </div>
                </div>

                {/* Navigation 1 - SEO focused */}
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white mb-6 text-xs uppercase tracking-widest">Free PDF Tools</h4>
                  <nav className="flex flex-col gap-3 text-sm font-medium text-gray-600 dark:text-gray-400">
                    <Link href="/tools/pdf-to-word" className="hover:text-blue-600 flex items-center justify-between">PDF to Word <ArrowUpRight className="w-3 h-3 opacity-50" /></Link>
                    <Link href="/tools/merge-pdf" className="hover:text-blue-600">Merge PDF Online</Link>
                    <Link href="/tools/image-to-pdf" className="hover:text-blue-600">Image to PDF</Link>
                  </nav>
                </div>

                {/* Navigation 2 - SEO focused */}
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white mb-6 text-xs uppercase tracking-widest">AI Image Tools</h4>
                  <nav className="flex flex-col gap-3 text-sm font-medium text-gray-600 dark:text-gray-400">
                    <Link href="/tools/background-remover" className="hover:text-blue-600">Remove Background</Link>
                    <Link href="/tools/image-compressor" className="hover:text-blue-600">Compress Images</Link>
                    <Link href="/tools/image-to-text" className="hover:text-blue-600">Image to Text (OCR)</Link>
                  </nav>
                </div>

                {/* Compliance & Contact */}
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white mb-6 text-xs uppercase tracking-widest">Platform</h4>
                  <nav className="flex flex-col gap-3 text-sm font-medium text-gray-600 dark:text-gray-400">
                    <Link href="/about" className="hover:text-blue-600">About Our AI</Link>
                    <Link href="/contact" className="hover:text-blue-600">Contact Support</Link>
                    <Link href="/privacy-policy" className="hover:text-blue-600 flex items-center gap-2">
                      <Lock className="w-3 h-3" /> Privacy Policy
                    </Link>
                    <Link href="/terms" className="hover:text-blue-600">Terms & Service</Link>
                  </nav>
                </div>
              </div>

              {/* Bottom Copyright Area */}
              <div className="pt-10 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="text-center md:text-left">
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                    © 2025 TASKGURU AI SUITE — BY SHUBHAM GAUTAM
                  </p>
                  <p className="text-[10px] text-gray-500 mt-1">
                    Powered by Neural Processing. Zero Data Tracking Enabled.
                  </p>
                </div>
                
                <div className="flex items-center gap-6">
                  {/* ✅ Added for AdSense Compliance - Easy access to info */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <button className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline">
                        Developer & Transparency
                      </button>
                    </DialogTrigger>
                    <DialogContent className="max-w-xl rounded-3xl">
                      <DialogHeader>
                        <DialogTitle className="text-2xl font-black">Transparency Report</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl">
                          <p className="text-sm font-medium leading-relaxed">
                            <strong>TaskGuru</strong> is a self-funded project by <strong>Shubham Gautam</strong>. 
                            Our tools process data locally in your browser. We do not store, view, or sell your files.
                          </p>
                        </div>
                        <div className="flex items-center gap-4 p-4 border rounded-2xl">
                          <ShieldCheck className="text-green-500 w-8 h-8" />
                          <div className="text-xs">
                            <p className="font-bold">Security Verified</p>
                            <p className="text-gray-500">SSL Encrypted | No-Log Policy | Browser-Side Processing</p>
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
