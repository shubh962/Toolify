import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/Header";
// ✅ ThemeProvider और ThemeToggle दोनों को इंपोर्ट करें
import { ThemeProvider } from "@/components/ThemeProvider"; 
import { ThemeToggle } from "@/components/ThemeToggle"; 

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";
import { Inter } from "next/font/google";
import Script from "next/script";
import Link from "next/link"; 

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  // ... (Metadata content)
  metadataBase: new URL("https://taskguru.online"),
  title: {
    default: "Toolify – Free Online Tools (PDF, Images & Text)",
    template: "%s • Toolify",
  },
  description:
    "Free tools: Background Remover, Image Compressor, PDF to Word, Text Paraphraser & Image to Text. No login required.",
  keywords:
    "free online tools, background remover, image compressor, pdf to word, text paraphraser, image to text, toolify, taskguru",
  robots: "index, follow",
  alternates: {
    canonical: "https://taskguru.online",
  },
  verification: {
    google: "XhRtp6rO2MNQX-BucHlUxVhNLbBPfdis_RzXY5ZodlU",
  },
  openGraph: {
    title: "Toolify – Free Online Tools",
    description:
      "Free Background Remover, Compressor, PDF, Text Paraphraser & more.",
    url: "https://taskguru.online",
    siteName: "Toolify",
    images: [
      { url: "https://taskguru.online/og-image.png", width: 1200, height: 630 },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Toolify – Free Online Tools",
    description:
      "Free Background Remover, Compressor, PDF tools, Paraphraser & more.",
    images: ["https://taskguru.online/og-image.png"],
    creator: "@YourHandle",
  },
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  const siteLdJson = {
    // ... (JSON-LD data)
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: "https://taskguru.online",
    name: "Toolify",
    description:
      "Free tools like Background Remover, Image Compressor, PDF to Word Converter, and Text Paraphraser.",
    publisher: {
      "@type": "Organization",
      name: "Toolify",
      logo: "https://taskguru.online/logo.png",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: "https://taskguru.online/tools/{search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  const orgLdJson = {
    // ... (JSON-LD data)
    "@context": "https://schema.org",
    "@type": "Organization",
    url: "https://taskguru.online",
    name: "Toolify",
    logo: "https://taskguru.online/logo.png",
    sameAs: [
      "https://www.facebook.com/share/1K97T5Q5wp/",
      "https://x.com/Shubham_962",
      "https://www.instagram.com/fact_fusion_s",
      "https://www.linkedin.com/in/Shubh962",
      "https://youtube.com/@factfusions0-x4k",
    ],
  };
  

  return (
    // 🛑 OLD: <html lang="en" className={`${inter.variable} dark`}>
    <html lang="en" suppressHydrationWarning> 
      <head>
        {/* ✅ JSON-LD (Website + Organization) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([siteLdJson, orgLdJson]),
          }}
        />

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
            gtag('config', 'G-XE6BHLH4J6');
          `}
        </Script>

        {/* ✅ Google Ads (global) */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2427221337462218"
          crossOrigin="anonymous"
        ></script>
      </head>
      {/* ✅ Body Tag में ThemeProvider से रैप करें */}
      <body className="font-body antialiased min-h-screen flex flex-col">
        <ThemeProvider 
          attribute="class" 
          defaultTheme="system" 
          enableSystem
        > 
          {/* ✅ ThemeToggle को इंपोर्ट करें और Header में प्रॉप के रूप में पास करें */}
          <Header themeToggle={<ThemeToggle />} /> 
          <main className="flex-1">{children}</main>
          <Toaster />

          {/* ✅ यहाँ से आपका FINAL FOOTER कोड शुरू होता है, जिसमें लीगल लिंक्स हैं */}
          <footer className="py-6 text-center text-gray-700 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
            <div className="container mx-auto px-6">
              
              {/* 1. Developer/Copyright/About Section */}
              <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4">
                <p>Developed with ❤️ by Shubham Gautam</p>
                <span className="hidden sm:inline">|</span>

                <Dialog>
                  <DialogTrigger asChild>
                    <button
                      className="hover:text-primary underline-offset-4 hover:underline"
                      aria-label="About & Copyright Information"
                    >
                      About & Copyright
                    </button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                      <DialogTitle className="text-2xl text-center mb-4">
                        About Toolify
                      </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-6">
                      <Card className="shadow-lg border">
                        <CardHeader>
                          <CardTitle className="text-xl">Our Mission</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3 text-sm text-muted-foreground">
                          <p>
                            <strong>Toolify</strong> simplifies daily online tasks
                            with smart, user-friendly tools. Founded by{" "}
                            <strong>Shubham Gautam</strong>.
                          </p>
                          <p>
                            We value seamless UX, privacy, and constant evolution.
                          </p>
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
                            <strong>© 2025 Toolify. All rights reserved.</strong>
                          </p>
                          <p>
                            Unauthorized reproduction or modification prohibited.
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              {/* ✅ 2. FIX: LEGAL LINKS (AdSense Required) */}
              <nav
                className="mt-6 flex gap-4 justify-center text-sm font-medium"
                aria-label="Legal Navigation"
              >
                <Link
                  href="/privacy-policy" 
                  className="text-gray-600 hover:text-primary transition-colors dark:text-gray-400 dark:hover:text-indigo-400"
                >
                  Privacy Policy
                </Link>
                <span className="text-gray-400 dark:text-gray-600">|</span>
                <Link
                  href="/terms" 
                  className="text-gray-600 hover:text-primary transition-colors dark:text-gray-400 dark:hover:text-indigo-400"
                >
                  Terms of Service
                </Link>
              </nav>
              {/* ------------------------------------------- */}

              {/* 3. Social Media Links */}
              <nav
                className="mt-4 flex gap-4 justify-center text-sm"
                aria-label="Footer navigation"
              >
                <ul className="flex gap-4">
                  <li>
                    <a
                      href="https://www.facebook.com/share/1K97T5Q5wp/"
                      target="_blank"
                      rel="noopener"
                    >
                      Facebook
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://x.com/Shubham_962"
                      target="_blank"
                      rel="noopener"
                    >
                      X
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.instagram.com/fact_fusion_s"
                      target="_blank"
                      rel="noopener"
                    >
                      Instagram
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.linkedin.com/in/Shubh962"
                      target="_blank"
                      rel="noopener"
                    >
                      LinkedIn
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://youtube.com/@factfusions0-x4k"
                      target="_blank"
                      rel="noopener"
                    >
                      YouTube
                    </a>
                  </li>
                </ul>
              </nav>

              <p className="mt-4 text-xs">© 2025 Toolify — All Rights Reserved</p>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
