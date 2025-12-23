import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/Header";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ThemeToggle } from "@/components/ThemeToggle";

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
} from "lucide-react";

import { Inter } from "next/font/google";
import Script from "next/script";
import Link from "next/link";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

// ✅ FIX: Moved Viewport to a dedicated export for Next.js 15 compliance
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5, // Improved accessibility for mobile users
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.taskguru.online"),

  title: {
    default: "Toolify (TaskGuru) – Free AI Tools for PDF, Images & Text",
    template: "%s • Toolify (TaskGuru)",
  },

  // ✅ FIX: Shortened Meta Description (Original was 187 chars, now 152)
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
    // ✅ FIX: Added Hreflang for global English audience
    languages: {
      "en-US": "https://www.taskguru.online",
    },
  },

  verification: {
    google: "XhRtp6rO2MNQX-BucHlUxVhNLbBPfdis_RzXY5ZodlU",
  },

  keywords:
    "toolify taskguru, free online tools, ai tools, background remover, image compressor, pdf to word, paraphraser, ocr",

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

        {/* ✅ FIX: Google Ads script with proper loading strategy */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2427221337462218"
          crossOrigin="anonymous"
        ></script>
      </head>

      <body className="font-sans antialiased min-h-screen flex flex-col">
        {/* ✅ FIX: Defer non-critical GA scripts to improve INP speed */}
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
          <main className="flex-1">{children}</main>
          <Toaster />

          <footer className="py-8 text-center text-gray-700 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
            <div className="container mx-auto px-6">
              <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4">
                <p>Developed by <strong>Shubham Gautam</strong></p>
                <span className="hidden sm:inline">|</span>

                <Dialog>
                  <DialogTrigger asChild>
                    <button className="hover:text-primary underline-offset-4 hover:underline">
                      About & Copyright
                    </button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="text-2xl text-center mb-4">
                        About Toolify (TaskGuru)
                      </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-6">
                      <Card className="shadow-lg border">
                        <CardHeader>
                          <CardTitle className="text-xl">Our Mission</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3 text-sm text-muted-foreground">
                          <p>
                            <strong>Toolify (TaskGuru)</strong> simplifies online tasks with smart AI tools. Built by <strong>Shubham Gautam</strong> with a focus on privacy and UX.
                          </p>
                        </CardContent>
                      </Card>
                      <Card className="shadow-lg border-destructive/50">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2 text-destructive text-xl">
                            <AlertTriangle className="h-5 w-5" />
                            Copyright Notice
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3 text-sm text-muted-foreground">
                          <p>© 2025 Toolify (TaskGuru). All rights reserved.</p>
                        </CardContent>
                      </Card>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <nav className="mt-6 flex flex-wrap gap-4 justify-center text-sm font-medium">
                <Link href="/blog">Blog</Link>
                <Link href="/privacy-policy">Privacy Policy</Link>
                <Link href="/terms">Terms of Service</Link>
                <Link href="/about">About</Link>
                <Link href="/help">Help Center</Link>
                <Link href="/contact">Contact Us</Link>
                <Link href="/disclaimer">Disclaimer</Link>
              </nav>

              <nav className="mt-6 flex gap-6 justify-center">
                <a href="https://www.facebook.com/share/1K97T5Q5wp/" target="_blank" rel="noopener" className="flex items-center gap-1 hover:text-blue-600">
                  <Facebook className="w-4 h-4" /> <span className="sr-only">Facebook</span>
                </a>
                <a href="https://x.com/Shubham_962" target="_blank" rel="noopener" className="flex items-center gap-1 hover:text-sky-400">
                  <Twitter className="w-4 h-4" /> <span className="sr-only">Twitter</span>
                </a>
                <a href="https://www.instagram.com/m_just_shubham" target="_blank" rel="noopener" className="flex items-center gap-1 hover:text-pink-600">
                  <Instagram className="w-4 h-4" /> <span className="sr-only">Instagram</span>
                </a>
              </nav>

              <p className="mt-6 text-xs text-muted-foreground">
                © 2025 Toolify (TaskGuru) — Secure, Fast & Private AI Toolkit
              </p>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
