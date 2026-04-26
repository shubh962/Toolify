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
  description:
    "Free AI-powered tools for everyone. Convert PDF to Word, remove image backgrounds, compress images, extract text via OCR, and paraphrase content instantly. No login required. 100% private.",
  keywords:
    "free ai tools, taskguru online, background remover free, pdf to word no login, image compressor online, resume maker 2026, ocr free, image to text free, merge pdf free",
  authors: [{ name: "Shubham Gautam", url: "https://www.taskguru.online" }],
  creator: "Shubham Gautam",
  publisher: "TaskGuru",
  alternates: { canonical: "https://www.taskguru.online" },
  openGraph: {
    type: "website",
    url: "https://www.taskguru.online",
    title: "TaskGuru AI • 100% Free Online PDF, Image & Text Tools",
    description:
      "Free AI-powered tools — PDF converter, background remover, image compressor, OCR, resume builder. No login. 100% private.",
    siteName: "TaskGuru",
    images: [
      {
        url: "https://www.taskguru.online/og-image.png",
        width: 1200,
        height: 630,
        alt: "TaskGuru — Free AI Tools",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TaskGuru AI • 100% Free Online Tools",
    description: "Free PDF, image, and AI writing tools. No login. No subscription.",
    creator: "@Shubham_962",
    images: ["https://www.taskguru.online/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: { google: "XhRtp6rO2MNQX-BucHlUxVhNLbBPfdis_RzXY5ZodlU" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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

  const orgLdJson = {
    "@context": "https://schema.org",
    "@type": "Organization",
    url: "https://www.taskguru.online",
    name: "TaskGuru",
    logo: "https://www.taskguru.online/logo.png",
    sameAs: [
      "https://github.com/Shubh962",
      "https://facebook.com/share/1K97T5Q5wp/",
      "https://x.com/Shubham_962",
      "https://www.instagram.com/m_just_shubham",
      "https://youtube.com/@factfusions0-x4k",
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning className={sora.variable}>
      <body className="font-sans antialiased min-h-screen flex flex-col bg-white dark:bg-gray-950 selection:bg-blue-600 selection:text-white">
        {/* ANALYTICS & ADSENSE */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XE6BHLH4J6"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-XE6BHLH4J6');`}
        </Script>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2427221337462218"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />

        {/* ADSTERRA SOCIAL BAR */}
        <Script
          id="adsterra-social-bar"
          src="https://pl27365402.profitablecpmratenetwork.com/ae/52/0f/ae520f3c967ee911772a55229589d894.js"
          strategy="lazyOnload"
        />

        {/* JSON-LD */}
        <Script
          id="ld-json"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([siteLdJson, orgLdJson]),
          }}
        />

        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header themeToggle={<ThemeToggle />} />

          {/* ── 728×90 DESKTOP LEADERBOARD ─────────────────────────────
              Served from /public/ads/banner-728x90.html
              iframe src="/ads/..." = taskguru.online origin = Adsterra verified ✅
          ───────────────────────────────────────────────────────── */}
         <div className="hidden md:flex flex-col items-center justify-center w-full bg-gray-50/60 dark:bg-gray-900/60 border-b border-gray-100 dark:border-gray-800 mt-20" // Added mt-20
  style={{ minHeight: "110px" }} >
            <p className="text-[9px] text-gray-400 uppercase tracking-widest font-bold mb-1">Advertisement</p>
            <iframe
              src="/ads/banner-728x90.html"
              width="728"
              height="90"
              frameBorder="0"
              scrolling="no"
              title="Advertisement"
              style={{ display: "block", overflow: "hidden" }}
            />
          </div>

          {/* ── 320×50 MOBILE BANNER ─────────────────────────────────
              Static iframe — same domain = always loads
              Sticky version inline below (no component needed)
          ───────────────────────────────────────────────────────── */}
          <div className="flex md:hidden justify-center items-center bg-gray-50/60 dark:bg-gray-900/60 border-b border-gray-100 dark:border-gray-800" style={{ minHeight: "58px" }}>
            <iframe
              src="/ads/banner-320x50.html"
              width="320"
              height="50"
              frameBorder="0"
              scrolling="no"
              title="Advertisement"
              style={{ display: "block", overflow: "hidden" }}
            />
          </div>

          {/* pb-16 on mobile leaves space for sticky bottom banner */}
          <main className="flex-1 pb-[62px] md:pb-0">{children}</main>

          {/* ── 300×250 RECTANGLE — DESKTOP ONLY ─────────────────────
              Static iframe — highest CPM format globally
          ───────────────────────────────────────────────────────── */}
          <div className="hidden md:flex flex-col items-center w-full py-6 border-t border-gray-100 dark:border-gray-800 bg-gray-50/20 dark:bg-gray-900/20">
            <p className="text-[9px] text-gray-400 uppercase tracking-widest font-bold mb-3">Sponsored</p>
            <iframe
              src="/ads/banner-300x250.html"
              width="300"
              height="250"
              frameBorder="0"
              scrolling="no"
              title="Advertisement"
              style={{ display: "block", overflow: "hidden" }}
            />
          </div>

          {/* ── NATIVE BANNER ── */}
          <div className="w-full border-t border-gray-100 dark:border-gray-800 bg-gray-50/30 dark:bg-gray-900/30 py-6 flex flex-col items-center">
            <p className="text-[9px] text-gray-400 uppercase tracking-widest font-bold mb-3">
              Sponsored
            </p>
            <div
              id="container-d39855ca15bcb0b839000465de518edb"
              className="w-full max-w-5xl flex justify-center px-4"
            />
            <Script
              id="adsterra-native"
              src="https://pl29034152.profitablecpmratenetwork.com/d39855ca15bcb0b839000465de518edb/invoke.js"
              strategy="lazyOnload"
              data-cfasync="false"
            />
          </div>

          <Toaster />
          <GlobalShare />

         {/* ── FINAL SMART POPUNDER LOGIC ── */}
<Script id="adsterra-smart-capping" strategy="afterInteractive">
  {`
    (function() {
      // 1. Double-loading protection
      if (window.adsterra_logic_running) return;
      window.adsterra_logic_running = true;

      const AD_URL = 'https://pl29209918.profitablecpmratenetwork.com/27/ef/d9/27efd9b5d96e77f31282f288b5d9ca58.js';
      
      const triggerPop = () => {
        console.log("TaskGuru: Triggering Popunder...");
        const s = document.createElement('script');
        s.src = AD_URL;
        s.async = true;
        document.body.appendChild(s);
        // DOM cleanup to prevent multiple script tags
        setTimeout(() => { if(s && s.parentNode) s.parentNode.removeChild(s); }, 3000);
      };

      // Initial Delay: 20 Seconds
      setTimeout(function() {
        triggerPop();

        // Repeat Cycle: 5 Minutes
        setInterval(function() {
          triggerPop();
        }, 300000); 

      }, 20000);
    })();
  `}
</Script>

          {/* ── STICKY BOTTOM MOBILE BANNER ── */}
<div
  id="utility-tray-bottom" // Changed from "sticky-ad-mobile" to prevent ad-block detection
  className="fixed bottom-0 left-0 right-0 z-[9999] flex md:hidden justify-center items-center bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 shadow-[0_-4px_12px_rgba(0,0,0,0.1)]"
  style={{ 
    height: "62px", 
    paddingBottom: "env(safe-area-inset-bottom, 0px)",
    display: "flex", // Force flex display
    pointerEvents: "auto" // Ensure the banner is clickable
  }}
>
  <iframe
    src="/ads/banner-320x50.html"
    width="320"
    height="50"
    frameBorder="0"
    scrolling="no"
    title="Sponsored Content"
    style={{ display: "block", overflow: "hidden", border: "none" }}
  />
</div>

          <footer className="py-20 bg-gray-50/50 dark:bg-gray-900/50 border-t border-gray-200 dark:border-gray-800">
            <div className="container mx-auto px-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-3xl font-black text-blue-600 tracking-tighter mb-4">
                      TaskGuru
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-medium">
                      The internet&apos;s favorite 100% free AI toolkit.
                      High-performance utilities designed for global
                      productivity, privacy, and speed.
                    </p>
                  </div>
                  <div className="grid grid-cols-5 sm:flex gap-3">
                    {[
                      {
                        href: "https://github.com/Shubh962",
                        icon: <Github className="w-5 h-5" />,
                        label: "GitHub",
                      },
                      {
                        href: "https://facebook.com/share/1K97T5Q5wp/",
                        icon: <Facebook className="w-5 h-5" />,
                        label: "Facebook",
                      },
                      {
                        href: "https://x.com/Shubham_962",
                        icon: <Twitter className="w-5 h-5" />,
                        label: "Twitter",
                      },
                      {
                        href: "https://www.instagram.com/m_just_shubham",
                        icon: <Instagram className="w-5 h-5" />,
                        label: "Instagram",
                      },
                      {
                        href: "https://youtube.com/@factfusions0-x4k",
                        icon: <Youtube className="w-5 h-5" />,
                        label: "YouTube",
                      },
                    ].map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                        className="p-3 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:-translate-y-1 transition-all group"
                      >
                        {social.icon}
                      </a>
                    ))}
                  </div>
                  <a
                    href="https://www.amazon.in/TECH-GAUTAM-TaskGuru-AI/dp/B0GJRW5RXR"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm hover:border-orange-400 hover:-translate-y-1 transition-all w-fit"
                  >
                    <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-black text-sm">a</span>
                    </div>
                    <div className="text-left">
                      <p className="text-[10px] text-gray-400 uppercase tracking-wider leading-none">
                        Available on
                      </p>
                      <p className="text-sm font-black text-gray-900 dark:text-white leading-tight">
                        Amazon Appstore
                      </p>
                    </div>
                  </a>
                </div>

                <div>
                  <h4 className="font-black text-gray-900 dark:text-white mb-6 uppercase text-[11px] tracking-[0.2em]">
                    Resources
                  </h4>
                  <nav className="flex flex-col gap-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                    <Link
                      href="/about"
                      className="hover:text-blue-600 flex items-center gap-2 font-bold text-gray-900 dark:text-white"
                    >
                      <Info className="w-4 h-4 text-blue-500" /> About TaskGuru
                    </Link>
                    <Link href="/blog" className="hover:text-blue-600">
                      Productivity Blog
                    </Link>
                    <Link
                      href="/help"
                      className="hover:text-blue-600 flex items-center gap-2"
                    >
                      <HelpCircle className="w-4 h-4" /> Help Center
                    </Link>
                    <Link
                      href="/contact"
                      className="hover:text-blue-600 flex items-center gap-2"
                    >
                      <Mail className="w-4 h-4" /> Contact Support
                    </Link>
                    <Link
                      href="/sitemap.xml"
                      className="hover:text-blue-600 flex items-center gap-2"
                    >
                      <Map className="w-4 h-4" /> XML Sitemap
                    </Link>
                  </nav>
                </div>

                <div>
                  <h4 className="font-black text-gray-900 dark:text-white mb-6 uppercase text-[11px] tracking-[0.2em]">
                    Popular Free Tools
                  </h4>
                  <nav className="flex flex-col gap-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                    <Link
                      href="/tools/background-remover"
                      className="hover:text-blue-600"
                    >
                      Background Remover
                    </Link>
                    <Link
                      href="/tools/text-paraphraser"
                      className="hover:text-blue-600"
                    >
                      AI Text Paraphraser
                    </Link>
                    <Link
                      href="/tools/image-compressor"
                      className="hover:text-blue-600"
                    >
                      Image Compressor
                    </Link>
                    <Link
                      href="/tools/pdf-to-word"
                      className="hover:text-blue-600"
                    >
                      PDF to Word
                    </Link>
                    <Link
                      href="/tools/resume-maker"
                      className="hover:text-blue-600 flex items-center gap-2"
                    >
                      Resume Maker <Zap className="w-3 h-3 text-yellow-500" />
                    </Link>
                    <Link
                      href="/tools/qr-barcode-generator"
                      className="hover:text-blue-600"
                    >
                      QR Code Generator
                    </Link>
                  </nav>
                </div>

                <div>
                  <h4 className="font-black text-gray-900 dark:text-white mb-6 uppercase text-[11px] tracking-[0.2em]">
                    Legal & Partners
                  </h4>
                  <nav className="flex flex-col gap-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                    <a
                      href="https://metatube-inspector.vercel.app"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold hover:underline"
                    >
                      MetaTube Inspector <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <Link
                      href="/privacy-policy"
                      className="hover:text-blue-600 flex items-center gap-2 font-bold text-green-600 dark:text-green-500"
                    >
                      <ShieldCheck className="w-4 h-4" /> Privacy Policy
                    </Link>
                    <Link
                      href="/terms"
                      className="hover:text-blue-600 flex items-center gap-2"
                    >
                      <Scale className="w-4 h-4" /> Terms of Use
                    </Link>
                    <Link
                      href="/disclaimer"
                      className="hover:text-blue-600 flex items-center gap-2"
                    >
                      <FileText className="w-4 h-4" /> Disclaimer
                    </Link>

                    <Dialog>
                      <DialogTrigger asChild>
                        <button className="text-left hover:text-blue-600 font-bold underline underline-offset-4 decoration-blue-200">
                          Legal Ownership
                        </button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl rounded-[2.5rem]">
                        <DialogHeader>
                          <DialogTitle className="text-3xl font-black mb-4">
                            Platform Transparency
                          </DialogTitle>
                        </DialogHeader>
                        <div className="space-y-6">
                          <Card className="border-none bg-blue-50/50 dark:bg-blue-900/10 p-2">
                            <CardHeader>
                              <CardTitle className="text-lg">
                                Mission Statement
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="text-sm text-gray-600 dark:text-gray-400">
                              <strong>TaskGuru</strong> is a specialized AI
                              utility project developed and maintained by{" "}
                              <strong>Shubham Gautam</strong>. We believe
                              premium software should be accessible, free, and
                              private for everyone.
                            </CardContent>
                          </Card>
                          <div className="p-4 bg-red-50 dark:bg-red-900/10 rounded-2xl flex items-center gap-3">
                            <AlertTriangle className="text-red-500 h-5 w-5" />
                            <p className="text-xs text-red-600 dark:text-red-400">
                              © {new Date().getFullYear()} TaskGuru. All
                              algorithmic logic is proprietary. Any
                              unauthorized reproduction or duplication is
                              strictly prohibited.
                            </p>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </nav>
                </div>
              </div>

              {/* Bottom bar */}
              <div className="pt-10 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="text-center md:text-left">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em] mb-1">
                    © {new Date().getFullYear()} TASKGURU — BEYOND DIGITAL BOUNDARIES
                  </p>
                  <p className="text-xs text-gray-500 italic">
                    No Subscription. No Tracking. Institutional Privacy.
                  </p>
                </div>
                <div className="text-center md:text-right">
                  <p className="text-sm font-bold text-gray-700 dark:text-gray-300">
                    Developed by{" "}
                    <span className="text-blue-600 font-black underline decoration-2 underline-offset-4 decoration-blue-100">
                      Shubham Gautam
                    </span>
                  </p>
                  <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-widest">
                    Made in India 🇮🇳
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
