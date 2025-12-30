import Link from 'next/link';
import Script from 'next/script';
import { Mail, Search, Clock, Shield, LifeBuoy, AlertCircle, CheckCircle, Zap } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Help Center & Support | TaskGuru Official Toolkit Guide',
  description: 'Instant answers for PDF conversion, Image Compression, and AI tools. Learn how Shubham Gautam and the TaskGuru team ensure your digital success.',
  robots: 'index, follow',
};

// ✅ FAQ Schema for Google Rich Snippets
const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Why is my PDF conversion failing on TaskGuru?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Failures usually occur due to file size limits (currently 10MB) or strong password protection. Ensure your PDF is unlocked and optimized before uploading for the best results."
        }
      },
      {
        "@type": "Question",
        "name": "How does TaskGuru handle my private documents?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We follow a strict Zero-Log policy. Files are processed in temporary RAM and are permanently wiped from our server memory the moment your session ends."
        }
      },
      {
        "@type": "Question",
        "name": "Is the Image Compressor lossless?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, for PNG and WEBP, we focus on removing unnecessary metadata. For JPG, we use smart compression to reduce size while maintaining 95%+ visual quality."
        }
      }
    ]
};

export default function HelpPage() {
  return (
    <>
      <Script
        id="help-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      <main className="max-w-5xl mx-auto px-6 py-20 font-sans leading-relaxed text-gray-800 dark:text-gray-200">
        
        {/* ✅ Hero Section */}
        <header className="text-center mb-20">
          <div className="inline-flex items-center justify-center p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-2xl mb-6">
            <LifeBuoy className="w-10 h-10 text-indigo-600" />
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white mb-6 tracking-tight">
            How Can We Help You Today?
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Welcome to the TaskGuru Support Hub. From technical troubleshooting to privacy inquiries, find everything you need to master our digital tools.
          </p>
        </header>

        {/* 1. Trust & Authority Section (E-E-A-T) */}
        <section className="mb-20 grid md:grid-cols-2 gap-8 items-center bg-gray-50 dark:bg-gray-900 p-10 rounded-[3rem] border border-gray-100 dark:border-gray-800">
          <div>
            <h2 className="text-3xl font-bold mb-4 flex items-center gap-2">
              <Zap className="text-indigo-600" /> Smart Troubleshooting
            </h2>
            <p className="text-lg mb-6 text-gray-600 dark:text-gray-400">
              TaskGuru isn&apos;t just a collection of scripts; it&apos;s a carefully engineered platform by <strong>Shubham Gautam</strong>. We use Next.js 15 and Edge Computing to ensure that 99% of tasks are completed in under 3 seconds. If you encounter an error, it is often due to local browser settings or network interruptions.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm font-medium">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" /> 
                <span>Hard Refresh: Press <strong>Ctrl + Shift + R</strong> to clear local cache errors.</span>
              </li>
              <li className="flex items-start gap-2 text-sm font-medium">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" /> 
                <span>File Limits: Ensure files are under 10MB for stable processing.</span>
              </li>
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Link href="/privacy-policy" className="p-6 bg-white dark:bg-gray-800 rounded-3xl shadow-sm border hover:border-indigo-500 transition-all group">
              <Shield className="w-8 h-8 text-indigo-600 mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="font-bold">Privacy First</h3>
              <p className="text-xs text-gray-500 mt-1">Learn how we wipe your data.</p>
            </Link>
            <Link href="/blog" className="p-6 bg-white dark:bg-gray-800 rounded-3xl shadow-sm border hover:border-green-500 transition-all group">
              <Search className="w-8 h-8 text-green-600 mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="font-bold">Guides</h3>
              <p className="text-xs text-gray-500 mt-1">Pro tips for every tool.</p>
            </Link>
          </div>
        </section>

        {/* 2. Detailed FAQ Section (H2) */}
        <section className="mb-24">
          <h2 className="text-4xl font-black mb-12 text-center text-gray-900 dark:text-white underline decoration-indigo-500 underline-offset-8">
            Frequently Asked Questions
          </h2>
          <div className="grid gap-8">
            {faqSchema.mainEntity.map((item, index) => (
              <div key={index} className="group p-8 border border-gray-100 dark:border-gray-800 rounded-[2rem] hover:bg-white dark:hover:bg-gray-900 transition-colors shadow-sm">
                <div className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="font-extrabold text-2xl text-gray-800 dark:text-gray-100 mb-3 tracking-tight">
                      {item.name}
                    </h3>
                    <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                      {item.acceptedAnswer.text}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Deep Dive: Why TaskGuru? (Anti-Low-Value Section) */}
        <section className="mb-24 prose dark:prose-invert max-w-none">
          <h2 className="text-3xl font-bold mb-6">Our Commitment to Technical Excellence</h2>
          <p className="text-lg mb-4">
            At TaskGuru, we understand that the internet is flooded with "generic" tool websites. Many of these sites are built using outdated PHP scripts that compromise your security. We took a different path. 
          </p>
          <div className="p-8 bg-indigo-600 text-white rounded-3xl my-8">
            <h4 className="text-xl font-bold mb-2 flex items-center gap-2">
              <AlertCircle /> Why we are different:
            </h4>
            <p className="mb-0">
              Every tool in our toolkit is manually verified and optimized for the <strong>2025 web standards</strong>. We don&apos;t just "convert" files; we ensure the structural integrity of your data remains intact throughout the process.
            </p>
          </div>
        </section>

        {/* 4. Contact & Support (H2) */}
        <section className="p-10 md:p-16 bg-gray-900 text-white rounded-[3rem] text-center shadow-2xl">
          <h2 className="text-4xl font-black mb-6">Didn&apos;t Find Your Answer?</h2>
          <p className="text-xl text-gray-400 mb-10 max-w-xl mx-auto">
            Whether it&apos;s a bug report or a feature request, I personally read every email. Let&apos;s make TaskGuru better together.
          </p>
          <div className="flex flex-col items-center gap-4">
            <a 
              href="mailto:gautamshubham962@gmail.com" 
              className="inline-flex items-center justify-center px-10 py-5 text-lg font-bold rounded-full shadow-lg text-white bg-indigo-600 hover:bg-indigo-700 transition transform hover:scale-105"
            >
              <Mail className="w-6 h-6 mr-3" /> Contact Support Team
            </a>
            <p className="mt-4 text-sm font-medium text-gray-500 uppercase tracking-widest">
              Current Response Time: &lt; 24 Hours
            </p>
          </div>
        </section>

        <footer className="mt-20 pt-10 border-t text-center text-sm text-gray-500 italic">
          TaskGuru (Toolify) Support Hub — Last Audit: December 2025. All systems operational.
        </footer>
      </main>
    </>
  );
}

