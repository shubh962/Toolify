import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/Header";
// Theme System Imports
import { ThemeProvider } from "@/components/ThemeProvider"; 
import { ThemeToggle } from "@/components/ThemeToggle"; 

// Lucide Icons for Social Links and UI
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react"; // ✅ Social Icons Imported
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
          {/* ✅ Header में ThemeToggle पास किया गया */}
          <Header themeToggle={<ThemeToggle />} /> 
          <main className="flex-1">{children}</main>
          <Toaster />

          {/* ✅ FINAL FOOTER CODE WITH ALL LINKS */}
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

              {/* 2. LEGAL LINKS AND BLOG LINK HERE (ABOUT ADDED) */}
              <nav
                className="mt-6 flex gap-4 justify-center text-sm font-medium"
                aria-label="Legal Navigation"
              >
                {/* BLOG LINK */}
                <Link
                  href="/blog" 
                  className="text-gray-600 hover:text-primary transition-colors dark:text-gray-400 dark:hover:text-indigo-400"
                >
                  Blog
                </Link>
                <span className="text-gray-400 dark:text-gray-600">|</span>
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
                {/* 👇👇 ABOUT LINK ADDED HERE 👇👇 */}
                <span className="text-gray-400 dark:text-gray-600">|</span>
                <Link
                  href="/about" 
                  className="text-gray-600 hover:text-primary transition-colors dark:text-gray-400 dark:hover:text-indigo-400"
                >
                  About
                </Link>
                {/* 👆👆 ABOUT LINK ADDED HERE 👆👆 */}
                <span className="text-gray-400 dark:text-gray-600">|</span>
                 <Link
                  href="/help" 
                  className="text-gray-600 hover:text-primary transition-colors dark:text-gray-400 dark:hover:text-indigo-400"
                >
                  Help
                </Link>
              </nav>

              {/* 3. SOCIAL MEDIA LINKS WITH ICONS */}
              <nav
                className="mt-4 flex gap-6 justify-center text-sm"
                aria-label="Footer social links"
              >
                <ul className="flex gap-4">
                  <li>
                    <a href="https://www.facebook.com/share/1K97T5Q5wp/" target="_blank" rel="noopener" className="flex items-center gap-1.5 text-gray-600 hover:text-primary transition-colors dark:text-gray-400 dark:hover:text-indigo-400">
                      <Facebook className="w-4 h-4" /> Facebook
                    </a>
                  </li>
                  <li>
                    <a href="https://x.com/Shubham_962" target="_blank" rel="noopener" className="flex items-center gap-1.5 text-gray-600 hover:text-primary transition-colors dark:text-gray-400 dark:hover:text-indigo-400">
                      <Twitter className="w-4 h-4" /> X
                    </a>
                  </li>
                  <li>
                    <a href="https://www.instagram.com/fact_fusion_s" target="_blank" rel="noopener" className="flex items-center gap-1.5 text-gray-600 hover:text-primary transition-colors dark:text-gray-400 dark:hover:text-indigo-400">
                      <Instagram className="w-4 h-4" /> Instagram
                    </a>
                  </li>
                  <li>
                    <a href="https://www.linkedin.com/in/Shubh962" target="_blank" rel="noopener" className="flex items-center gap-1.5 text-gray-600 hover:text-primary transition-colors dark:text-gray-400 dark:hover:text-indigo-400">
                      <Linkedin className="w-4 h-4" /> LinkedIn
                    </a>
                  </li>
                  <li>
                    <a href="https://youtube.com/@factfusions0-x4k" target="_blank" rel="noopener" className="flex items-center gap-1.5 text-gray-600 hover:text-primary transition-colors dark:text-gray-400 dark:hover:text-indigo-400">
                      <Youtube className="w-4 h-4" /> YouTube
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
