import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/Header";
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

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

// ✅ Global SEO Metadata (shortened & optimized)
export const metadata: Metadata = {
  title: "Toolify – Free Online Tools for PDF, Images & Text",
  description:
    "Free tools: Background Remover, Image Compressor, PDF to Word, Text Paraphraser & Image to Text. No login required.",
  keywords:
    "free online tools, background remover, image compressor, pdf to word, text paraphraser, image to text, toolify, taskguru",
  robots: "index, follow",
  metadataBase: new URL("https://taskguru.online"),
  alternates: {
    canonical: "/",
    languages: { en: "/" }, // ✅ hreflang
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
      {
        url: "https://taskguru.online/og-image.png",
        width: 1200,
        height: 630,
        alt: "Toolify – Free Online Tools",
      },
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

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} dark`}>
      <head>
        {/* ✅ JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              url: "https://taskguru.online",
              name: "Toolify",
              description:
                "Free tools like Background Remover, Image Compressor, PDF to Word Converter, and Text Paraphraser.",
              publisher: {
                "@type": "Person",
                name: "Shubham Gautam",
              },
              potentialAction: {
                "@type": "SearchAction",
                target: "https://taskguru.online/tools/{search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
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
      </head>
      <body className="font-body antialiased min-h-screen flex flex-col">
        {/* ✅ Interstitial Ad Script (lazy loaded) */}
        <Script id="interstitial-ad" strategy="lazyOnload">
          {`(function(d,z,s){
              s.src='https://'+d+'/401/'+z;
              try{(document.body||document.documentElement).appendChild(s)}catch(e){}
            })('groleegni.net',9694211,document.createElement('script'));`}
        </Script>

        {/* ✅ Header */}
        <Header />

        {/* ✅ Main Content */}
        <main className="flex-1">{children}</main>
        <Toaster />

        {/* ✅ Footer with Accessibility & Social */}
        <footer className="py-6 text-center text-gray-700">
          <div className="container mx-auto px-6">
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
                          <strong>Toolify</strong> is a digital platform crafted
                          to simplify your daily online tasks with smart,
                          reliable, and user-friendly tools. Founded by{" "}
                          <strong>Shubham Gautam</strong>.
                        </p>
                        <p>
                          We believe in delivering seamless experiences,
                          respecting user privacy, and constantly evolving to
                          serve better.
                        </p>
                        <p className="pt-3 text-center font-semibold text-base text-foreground/90 italic">
                          Toolify – Simple Tools. Smarter Life.
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
                          Unauthorized reproduction, redistribution, or
                          modification of any part of this website, its tools,
                          content, or code is strictly prohibited.
                        </p>
                        <p>
                          Toolify, its logo, and related services are
                          intellectual property of Shubham Gautam.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* ✅ Social links for SEO */}
            <nav
              className="mt-4 flex gap-4 justify-center text-sm"
              aria-label="Social links"
            >
              <a
                href="https://www.facebook.com/share/1K97T5Q5wp/"
                target="_blank"
                rel="noopener"
              >
                Facebook
              </a>
              <a
                href="https://x.com/Shubham_962?t=SvZlxFtavmlWZSp2o4H-bA&s=09"
                target="_blank"
                rel="noopener"
              >
                X
              </a>
              <a
                href="https://www.instagram.com/fact_fusion_s?igsh=a29wZG5uaXpscTlw"
                target="_blank"
                rel="noopener"
              >
                Instagram
              </a>
              <a
                href="https://www.linkedin.com/in/Shubh962"
                target="_blank"
                rel="noopener"
              >
                LinkedIn
              </a>
              <a
                href="https://youtube.com/@factfusions0-x4k?si=dmeUAuYn7I9TxRgy"
                target="_blank"
                rel="noopener"
              >
                YouTube
              </a>
            </nav>

            <p className="mt-4 text-xs">
              © 2025 Toolify — All Rights Reserved
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
