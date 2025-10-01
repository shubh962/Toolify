import Link from 'next/link';
import Script from 'next/script';
import { Mail, Search, Clock, Shield } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Help Center & Support | TaskGuru Free AI Tools',
  description: 'Need help with PDF, Image Compressor, or OCR? Find instant answers to frequently asked questions about file conversion, privacy, and tool usage.',
  robots: 'index, follow',
};

// ✅ FAQ Schema for Google Rich Snippets
const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Why is my PDF to Word conversion failing?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Conversion can fail if the PDF file is too large (over 10MB) or is protected by strong encryption. Try compressing the PDF first or ensuring the file is unlocked."
        }
      },
      {
        "@type": "Question",
        "name": "Are my files deleted after using the tool?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Privacy is our top priority. All uploaded files (PDFs, images) are automatically and permanently deleted from our servers immediately after processing is complete."
        }
      },
      {
        "@type": "Question",
        "name": "How do I fix the 'Application Error' issue?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "This usually indicates a local browser caching issue. Try clearing your browser's cache and cookies for taskguru.online, or perform a hard refresh (Ctrl + Shift + R)."
        }
      },
      {
        "@type": "Question",
        "name": "Can I use the Image Compressor on PNG files?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, our Image Compressor supports PNG, JPG, and WEBP. For PNG, the tool focuses on lossless optimization (reducing metadata) as PNG is generally already highly optimized."
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
      
      <main className="max-w-4xl mx-auto px-4 py-16">
        
        {/* ✅ H1: Main Title */}
        <header className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-foreground mb-3">TaskGuru Help Center</h1>
          <p className="text-lg text-muted-foreground">Find instant answers to questions about our free AI tools (PDF, OCR, Paraphraser).</p>
        </header>

        {/* 1. Quick Access Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Link href="/privacy-policy" className="p-4 border rounded-lg shadow hover:shadow-lg transition-shadow bg-muted/30">
            <Shield className="w-6 h-6 text-indigo-600 mb-2" />
            <h2 className="font-semibold text-lg">Privacy & Security</h2>
            <p className="text-sm text-muted-foreground">Check how we handle your files.</p>
          </Link>
          <Link href="/blog" className="p-4 border rounded-lg shadow hover:shadow-lg transition-shadow bg-muted/30">
            <Search className="w-6 h-6 text-green-600 mb-2" />
            <h2 className="font-semibold text-lg">Tool Guides & SEO</h2>
            <p className="text-sm text-muted-foreground">Read step-by-step guides and tips.</p>
          </Link>
          <div className="p-4 border rounded-lg shadow bg-muted/30">
            <Clock className="w-6 h-6 text-yellow-600 mb-2" />
            <h2 className="font-semibold text-lg">Service Status</h2>
            <p className="text-sm text-muted-foreground">All tools currently operational.</p>
          </div>
        </div>

        {/* 2. Frequently Asked Questions (H2) */}
        <section className="mt-16 border-t pt-10">
          <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {/* FAQ List using map from the schema data (for seamless integration) */}
            {faqSchema.mainEntity.map((item, index) => (
              <div key={index} className="border-b pb-4 last:border-b-0">
                <h3 className="font-semibold text-xl text-foreground">{item.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 mt-2">{item.acceptedAnswer.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Direct Contact (H2) */}
        <section className="mt-16 p-6 bg-primary/10 rounded-xl text-center shadow-lg">
          <h2 className="text-3xl font-bold mb-4">Still Need Help?</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
            For specific tool errors, bug reports, or partnership inquiries, feel free to contact us.
          </p>
          <a 
            href="mailto:gautamshubham962@gmail.com" 
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-primary hover:bg-indigo-700 transition duration-300"
          >
            <Mail className="w-5 h-5 mr-2" /> Email Support
          </a>
          <p className="mt-3 text-sm text-muted-foreground">
            We typically respond within 24 hours.
          </p>
        </section>

      </main>
    </>
  );
}
