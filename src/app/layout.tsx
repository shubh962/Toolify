import type { Metadata } from "next";
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

// ==========================================================
// ✅ FIXED BRANDING + METADATA FOR TOOLIFY (TASKGURU)
// ==========================================================

export const metadata: Metadata = {
  metadataBase: new URL("https://www.taskguru.online"),

  title: {
    default: "Toolify (TaskGuru) – Free AI Tools for PDF, Images & Text",
    template: "%s • Toolify (TaskGuru)",
  },

  description:
    "Toolify (TaskGuru) provides free AI tools including PDF converters, background remover, image compressor, OCR, paraphraser and productivity utilities. Fast, secure, and no login required.",

  robots: "index, follow",

  alternates: {
    canonical: "/", 
  },

  verification: {
    google: "XhRtp6rO2MNQX-BucHlUxVhNLbBPfdis_RzXY5ZodlU",
  },

  keywords:
    "toolify taskguru, free online tools, ai tools, background remover, image compressor, pdf to word, paraphraser, ocr, image to text",

  openGraph: {
    title: "Toolify (TaskGuru) – Free Online Tools",
    description:
      "Use Toolify (TaskGuru) for Background Removal, Image Compression, PDF tools, AI paraphrasing & more.",
    url: "https://www.taskguru.online",
    siteName: "Toolify (TaskGuru)",
    images: [
      {
        url: "https://www.taskguru.online/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Toolify (TaskGuru) – Free Online Tools",
    description:
      "Free Background Remover, OCR, Image Compressor, PDF to Word, Paraphraser & AI utilities.",
    images: ["https://www.taskguru.online/og-image.png"],
    creator: "@YourHandle",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  
  // ==========================================================
  // ✅ UPDATED JSON-LD SCHEMA WITH TOOLIFY (TASKGURU)
  // ==========================================================

  const siteLdJson = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: "https://www.taskguru.online",
    name: "Toolify (TaskGuru)",
    description:
      "Toolify (TaskGuru) offers free AI tools like Background Remover, Image Compressor, PDF Converter, and Text Paraphraser.",
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
      "https://www.instagram.com/fact_fusion_s",
      "https://www.linkedin.com/in/Shubh962",
      "https://youtube.com/@factfusions0-x4k",
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([siteLdJson, orgLdJson]),
          }}
        />

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XE6BHLH4J6"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XE6BHLH4J6');
          `}
        </Script>

        {/* Google Ads */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2427221337462218"
          crossOrigin="anonymous"
        ></script>
      </head>

      <body className="font-body antialiased min-h-screen flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          
          {/* Header */}
          <Header themeToggle={<ThemeToggle />} />

          {/* Page Content */}
          <main className="flex-1">{children}</main>

          <Toaster />

          {/* ----------------------------- */}
          {/* FOOTER — Already Perfect */}
          {/* ----------------------------- */}

          <footer className="py-6 text-center text-gray-700 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
            <div className="container mx-auto px-6">

              <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4">
                <p>Developed with ❤️ by Shubham Gautam</p>
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
                            <strong>Toolify (TaskGuru)</strong> simplifies daily
                            online tasks with smart, user-friendly AI tools. Founded by{" "}
                            <strong>Shubham Gautam</strong>.
                          </p>
                          <p>We value seamless UX, privacy, and innovation.</p>
                        </CardContent>
                      </Card>

                      <Card className="shadow-lg border-destructive/50">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2 text-destructive text-xl">
                            <AlertTriangle className="h-5 w-5" />
                            Copyright Warning
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3 text-sm text-muted-foreground">
                          <p>
                            <strong>© 2025 Toolify (TaskGuru). All rights reserved.</strong>
                          </p>
                          <p>Unauthorized reproduction prohibited.</p>
                        </CardContent>
                      </Card>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              {/* Legal Links */}
              <nav className="mt-6 flex gap-4 justify-center text-sm font-medium">
                <Link href="/blog">Blog</Link>
                <span>|</span>
                <Link href="/privacy-policy">Privacy Policy</Link>
                <span>|</span>
                <Link href="/terms">Terms of Service</Link>
                <span>|</span>
                <Link href="/about">About</Link>
                <span>|</span>
                <Link href="/help">Help</Link>
              </nav>

              {/* Social Links */}
              <nav className="mt-4 flex gap-6 justify-center text-sm">
                <ul className="flex gap-4">
                  <li>
                    <a
                      href="https://www.facebook.com/share/1K97T5Q5wp/"
                      target="_blank"
                      rel="noopener"
                    >
                      <Facebook className="w-4 h-4" /> Facebook
                    </a>
                  </li>

                  <li>
                    <a
                      href="https://x.com/Shubham_962"
                      target="_blank"
                      rel="noopener"
                    >
                      <Twitter className="w-4 h-4" /> X
                    </a>
                  </li>

                  <li>
                    <a
                      href="https://www.instagram.com/fact_fusion_s"
                      target="_blank"
                      rel="noopener"
                    >
                      <Instagram className="w-4 h-4" /> Instagram
                    </a>
                  </li>

                  <li>
                    <a
                      href="https://www.linkedin.com/in/Shubh962"
                      target="_blank"
                      rel="noopener"
                    >
                      <Linkedin className="w-4 h-4" /> LinkedIn
                    </a>
                  </li>

                  <li>
                    <a
                      href="https://youtube.com/@factfusions0-x4k"
                      target="_blank"
                      rel="noopener"
                    >
                      <Youtube className="w-4 h-4" /> YouTube
                    </a>
                  </li>
                </ul>
              </nav>

              <p className="mt-4 text-xs">
                © 2025 Toolify (TaskGuru) — All Rights Reserved
              </p>
            </div>
          </footer>

        </ThemeProvider>
      </body>
    </html>
  );
}
