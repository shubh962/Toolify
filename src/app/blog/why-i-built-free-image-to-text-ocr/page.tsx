// src/app/blog/why-i-built-free-image-to-text-ocr/page.tsx
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'I Spent Hours Typing Text From an Image at Work. Then I Built a Free OCR Tool | TaskGuru',
  description:
    'At work, I needed to extract text from an image. Manually retyping it took hours. Every free OCR tool online had paywalls or poor accuracy. So I built my own using Tesseract.js — completely free.',
  alternates: {
    canonical: 'https://www.taskguru.online/blog/why-i-built-free-image-to-text-ocr',
  },
  openGraph: {
    title: 'I Spent Hours Typing Text From an Image at Work. Then I Built a Free OCR Tool.',
    description:
      'The real story behind TaskGuru\'s free Image to Text converter — a frustrating workday, manual retyping, and a decision to build a better solution.',
    url: 'https://www.taskguru.online/blog/why-i-built-free-image-to-text-ocr',
    type: 'article',
  },
};

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'I Spent Hours Typing Text From an Image at Work. Then I Built a Free OCR Tool.',
  description:
    'The personal story behind TaskGuru\'s free image to text converter — built using Tesseract.js after manually retyping text from images at work proved to be a massive waste of time.',
  author: {
    '@type': 'Person',
    name: 'Shubham Gautam',
    url: 'https://www.taskguru.online/about',
    jobTitle: 'Developer & Founder, TaskGuru',
  },
  publisher: {
    '@type': 'Organization',
    name: 'TaskGuru',
    logo: { '@type': 'ImageObject', url: 'https://www.taskguru.online/logo.png' },
  },
  datePublished: '2026-01-20',
  dateModified: '2026-01-20',
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://www.taskguru.online/blog/why-i-built-free-image-to-text-ocr',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How do I extract text from an image for free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Go to TaskGuru\'s free Image to Text tool, upload your image (JPG, PNG, or screenshot), and the OCR engine will extract all readable text instantly. Copy the result with one click. No signup, no payment, no file size limits.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is OCR and how does it work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'OCR stands for Optical Character Recognition. It is a technology that analyzes the shapes of characters in an image and converts them into digital text. TaskGuru uses Tesseract.js — an open-source OCR engine originally developed by HP and now maintained by Google — running entirely in your browser.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I extract text from a scanned PDF?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Take a screenshot of the scanned PDF page, or export it as an image, then upload it to TaskGuru\'s Image to Text tool. The OCR engine will extract all readable text from the image.',
      },
    },
    {
      '@type': 'Question',
      name: 'How accurate is the free OCR tool?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Tesseract.js achieves high accuracy on clear, well-lit images with standard fonts. Accuracy is best on typed or printed text. Handwritten text and very small fonts may have lower accuracy. For best results, use high-resolution images with good contrast.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is my image uploaded to a server when I use this tool?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. TaskGuru\'s Image to Text tool runs Tesseract.js locally in your browser. Your image never gets sent to any server. All processing happens on your own device, making it completely private.',
      },
    },
  ],
};

export default function BlogPost() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="max-w-2xl mx-auto px-4 py-12 md:py-16">

        {/* BREADCRUMB */}
        <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-8">
          <Link href="/blog" className="hover:text-blue-600 transition-colors font-medium">Blog</Link>
          <span>/</span>
          <span className="text-slate-700 dark:text-slate-300">Why I Built Free OCR Tool</span>
        </nav>

        {/* HERO */}
        <header className="mb-10">
          <div className="inline-block px-3 py-1 bg-teal-100 dark:bg-teal-900/40 text-teal-700 dark:text-teal-300 text-xs font-black uppercase tracking-wider rounded-full mb-5">
            Founder Story
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white leading-tight mb-4">
            I Spent Hours Typing Text From an Image at Work. Then I Built a Free OCR Tool.
          </h1>
          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500 dark:text-slate-400 mb-6">
            <span>By <strong className="text-slate-700 dark:text-slate-300">Shubham Gautam</strong></span>
            <span>·</span>
            <span>Founder, TaskGuru</span>
            <span>·</span>
            <time dateTime="2026-01-20">January 20, 2026</time>
            <span>·</span>
            <span>5 min read</span>
          </div>

          {/* Author card */}
          <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl">
            <div className="w-12 h-12 rounded-full bg-teal-600 flex items-center justify-center text-white font-black text-lg flex-shrink-0">
              S
            </div>
            <div>
              <p className="font-bold text-slate-900 dark:text-white text-sm">Shubham Gautam</p>
              <p className="text-xs text-slate-500">B.Tech IT — Axis Institute, Kanpur (AKTU) · Developer & Founder, TaskGuru</p>
            </div>
          </div>
        </header>

        {/* BODY */}
        <div className="space-y-6 text-slate-700 dark:text-slate-300 leading-relaxed text-base">

          <p>
            It was a regular workday. I had received an image — a screenshot of some data
            I needed to work with. The information was right there, clearly visible on screen.
            Numbers, names, details. All I needed to do was get that text into a document
            so I could actually use it.
          </p>

          <p>
            What I did not realize at the time was how much of my day I was about to lose
            to the simple act of retyping.
          </p>

          <h2 className="text-2xl font-black text-slate-900 dark:text-white pt-4">
            Manual Retyping — The Hidden Time Thief
          </h2>

          <p>
            I started typing. Line by line, checking the image, typing, checking again.
            It sounds simple but the cognitive load of constantly switching between reading
            an image and typing accurately is surprisingly draining. You lose your place.
            You misread characters. You have to go back and correct errors.
          </p>

          <p>
            What should have been a five minute task took most of an hour. And the worst
            part — I knew there had to be a better way. Text extraction from images is not
            a new problem. The technology to solve it has existed for decades. Why was I
            sitting here typing manually like it was 1995?
          </p>

          <div className="p-5 bg-teal-50 dark:bg-teal-900/20 border-l-4 border-teal-500 rounded-r-2xl my-6">
            <p className="text-sm text-slate-700 dark:text-slate-300 italic leading-relaxed">
              &quot;The technology to read text from images has existed for
              decades. It is called OCR — Optical Character Recognition.
              But every free tool I found online either had poor accuracy,
              strict file limits, or asked for payment to do something
              that should be completely free.&quot;
            </p>
          </div>

          <h2 className="text-2xl font-black text-slate-900 dark:text-white pt-4">
            What I Found Online
          </h2>

          <p>
            I searched for free image to text converters online. Found several. The first
            had a 1MB file size limit — my image was 3MB. The second had decent accuracy
            but required an account to copy the extracted text. The third produced output
            so garbled it was faster to just retype manually.
          </p>

          <p>
            One tool worked reasonably well — but limited free users to five conversions
            per day. A paid subscription unlocked unlimited use. For a tool doing something
            this fundamental, that felt unreasonable.
          </p>

          <h2 className="text-2xl font-black text-slate-900 dark:text-white pt-4">
            Building It With Tesseract.js
          </h2>

          <p>
            I already had TaskGuru running with several tools. Adding image to text
            extraction was the natural next step — and I knew exactly what technology
            to use.
          </p>

          <p>
            <strong>Tesseract.js</strong> is a JavaScript port of Tesseract — one of the
            most accurate open-source OCR engines in the world. It was originally developed
            by HP in the 1980s and has been maintained by Google since 2006. The JavaScript
            version runs entirely in the browser, which meant I could build an OCR tool
            that processes images locally — without uploading anything to a server.
          </p>

          <p>
            This was important to me. People use image to text tools for sensitive content —
            scanned documents, receipts, medical records, financial statements. Those files
            should not be uploaded to a random server just because someone needs to extract
            the text from them.
          </p>

          <div className="space-y-3 my-4">
            {[
              {
                title: 'Runs in your browser',
                desc: 'Tesseract.js processes your image locally using your device\'s computing power. No server upload, no privacy risk.',
              },
              {
                title: 'No file size limits',
                desc: 'Because there is no server involved, there is no artificial limit on how large your image can be.',
              },
              {
                title: 'No conversion limits',
                desc: 'Extract text from as many images as you need. No daily cap, no subscription required.',
              },
              {
                title: 'Multi-language support',
                desc: 'Tesseract supports over 100 languages. The tool works for English text and many other languages.',
              },
            ].map((item) => (
              <div key={item.title} className="flex gap-3 p-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl">
                <span className="text-teal-500 font-black flex-shrink-0 mt-0.5">✓</span>
                <div>
                  <p className="font-bold text-slate-900 dark:text-white text-sm mb-0.5">{item.title}</p>
                  <p className="text-xs leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-black text-slate-900 dark:text-white pt-4">
            When Is This Tool Most Useful
          </h2>

          <div className="space-y-2 my-4">
            {[
              'Extracting data from screenshots when copy-paste is not available',
              'Converting scanned documents into editable text',
              'Copying text from photos of printed documents, books, or signs',
              'Extracting information from receipts, invoices, or business cards',
              'Making image-based PDFs searchable by extracting their text content',
              'Saving time on data entry tasks at work',
            ].map((item, i) => (
              <div key={i} className="flex gap-3 items-start">
                <span className="text-teal-500 font-black flex-shrink-0 mt-0.5 text-sm">→</span>
                <p className="text-sm leading-relaxed">{item}</p>
              </div>
            ))}
          </div>

          <p>
            That workday where I spent an hour retyping text from an image — that was
            the last time I ever did that manually. The tool I built handles it in seconds.
            And now it does the same for anyone who needs it, completely free.
          </p>

          <div className="p-5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl mt-8">
            <p className="font-bold text-slate-900 dark:text-white mb-1 text-sm">Shubham Gautam</p>
            <p className="text-xs text-slate-500">
              Founder, TaskGuru · B.Tech IT, Axis Institute Kanpur (AKTU) · Made in India 🇮🇳
            </p>
          </div>

          {/* CTA */}
          <div className="p-5 bg-teal-50 dark:bg-teal-900/20 border border-teal-200 dark:border-teal-800 rounded-2xl">
            <p className="font-bold text-slate-900 dark:text-white mb-2 text-sm">
              Extract Text From Any Image — Free, Instant, Private
            </p>
            <p className="text-xs text-slate-500 mb-3">
              Upload any image and get the text in seconds. Powered by Tesseract.js.
              No signup. No limits. Your image never leaves your device.
            </p>
            <Link
              href="/tools/image-to-text"
              className="inline-block px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl transition-colors text-sm"
            >
              Extract Text Free →
            </Link>
          </div>

          {/* FAQ */}
          <div className="pt-8 space-y-4">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">
              Frequently Asked Questions
            </h2>
            <div className="space-y-3">
              {faqSchema.mainEntity.map((faq, i) => (
                <details
                  key={i}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-5 cursor-pointer group"
                >
                  <summary className="font-bold text-slate-900 dark:text-white list-none flex justify-between items-center text-sm">
                    {faq.name}
                    <span className="transition-transform group-open:rotate-180 text-slate-400 flex-shrink-0 ml-2">▼</span>
                  </summary>
                  <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {faq.acceptedAnswer.text}
                  </p>
                </details>
              ))}
            </div>
          </div>

          {/* Related */}
          <div className="pt-8 border-t border-slate-200 dark:border-slate-700">
            <h3 className="text-base font-black text-slate-900 dark:text-white mb-4">
              Related Stories & Tools
            </h3>
            <div className="grid md:grid-cols-2 gap-3">
              {[
                { title: 'What is OCR? Complete Guide', href: '/blog/what-is-ocr-image-to-text' },
                { title: 'Extract Text from Scanned PDF', href: '/blog/extract-text-scanned-pdf' },
                { title: 'Why I Built Free PDF to Word', href: '/blog/why-i-built-free-pdf-to-word-converter' },
                { title: 'Free Background Remover', href: '/tools/background-remover' },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-teal-400 transition-colors group"
                >
                  <p className="font-semibold text-sm text-slate-900 dark:text-white group-hover:text-teal-600 transition-colors">
                    {item.title} →
                  </p>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
