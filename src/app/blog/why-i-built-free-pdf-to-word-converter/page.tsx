// src/app/blog/why-i-built-free-pdf-to-word-converter/page.tsx
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'I Could Not Edit a PDF in School. Years Later, I Built a Free PDF to Word Converter | TaskGuru',
  description:
    'A student struggled to edit a PDF and wasted hours searching for a solution. Years later, after completing his degree, he built a free PDF to Word converter so no one else has to go through the same frustration.',
  alternates: {
    canonical: 'https://www.taskguru.online/blog/why-i-built-free-pdf-to-word-converter',
  },
  openGraph: {
    title: 'I Could Not Edit a PDF in School. Years Later, I Built a Free PDF to Word Converter.',
    description:
      'From a frustrated school student to a developer who built the solution — the real story behind TaskGuru\'s free PDF to Word converter.',
    url: 'https://www.taskguru.online/blog/why-i-built-free-pdf-to-word-converter',
    type: 'article',
  },
};

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'I Could Not Edit a PDF in School. Years Later, I Built a Free PDF to Word Converter.',
  description:
    'The personal story behind TaskGuru\'s free PDF to Word converter — from a school student who could not find a working free solution to a developer who built one for everyone.',
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
  datePublished: '2025-12-20',
  dateModified: '2025-12-20',
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://www.taskguru.online/blog/why-i-built-free-pdf-to-word-converter',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How do I convert a PDF to Word for free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Go to TaskGuru\'s free PDF to Word converter, upload your PDF file, and download the editable Word document instantly. No signup, no payment, no watermark. The conversion happens in your browser — your file never gets uploaded to any server.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I edit a PDF without paying for software?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. The easiest way is to convert the PDF to a Word document first using a free online converter like TaskGuru. Once it is a .docx file, you can edit it in Microsoft Word, Google Docs, or LibreOffice — all of which have free options.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is it safe to convert sensitive PDFs online?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'With TaskGuru, yes — because your file never leaves your device. The conversion runs entirely in your browser using JavaScript. Most other online converters upload your file to their servers, which is a serious privacy risk for sensitive documents.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why can\'t I just edit a PDF directly?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'PDFs are designed for viewing and printing, not editing. The text is stored as a fixed layout rather than editable characters. To edit a PDF, you need either expensive software like Adobe Acrobat Pro, or you convert it to a Word document first using a free converter.',
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
          <span className="text-slate-700 dark:text-slate-300">PDF to Word Story</span>
        </nav>

        {/* HERO */}
        <header className="mb-10">
          <div className="inline-block px-3 py-1 bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300 text-xs font-black uppercase tracking-wider rounded-full mb-5">
            Founder Story
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white leading-tight mb-4">
            I Could Not Edit a PDF in School. Years Later, I Built a Free PDF to Word Converter.
          </h1>
          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500 dark:text-slate-400 mb-6">
            <span>By <strong className="text-slate-700 dark:text-slate-300">Shubham Gautam</strong></span>
            <span>·</span>
            <span>Founder, TaskGuru</span>
            <span>·</span>
            <time dateTime="2025-12-20">December 20, 2025</time>
            <span>·</span>
            <span>5 min read</span>
          </div>

          {/* Author card */}
          <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl">
            <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center text-white font-black text-lg flex-shrink-0">
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
            I was in school when I first ran into this problem. I had a PDF — something I needed
            for a personal project — and I needed to edit it. Change a few details, update some
            text, make it actually useful. Simple enough, I thought.
          </p>

          <p>
            I had no idea that editing a PDF was one of those things that sounds obvious but
            turns out to be genuinely difficult without the right tools.
          </p>

          <h2 className="text-2xl font-black text-slate-900 dark:text-white pt-4">
            The Problem Nobody Tells You About PDFs
          </h2>

          <p>
            PDFs are not meant to be edited. That is actually the whole point of them — a PDF
            looks exactly the same on every device, every screen, every printer. The tradeoff
            is that the text is locked into a fixed layout. You cannot just click on it and
            start typing the way you would in a Word document.
          </p>

          <p>
            I did not know this at the time. I just knew I had a PDF I needed to change and
            could not figure out how.
          </p>

          <p>
            I searched online. Found some results — most of them pointed to Adobe Acrobat Pro,
            which cost money I did not have as a school student. I searched YouTube. Watched
            several videos. Followed the steps. None of them actually worked for my specific
            situation, or the tools they recommended were paywalled.
          </p>

          <div className="p-5 bg-orange-50 dark:bg-orange-900/20 border-l-4 border-orange-500 rounded-r-2xl my-6">
            <p className="text-sm text-slate-700 dark:text-slate-300 italic leading-relaxed">
              &quot;I wasted hours searching for a free way to edit a PDF.
              YouTube, Google, forums — nothing worked. I eventually
              gave up and found a different way to solve my original
              problem. But I never forgot how frustrating that was.&quot;
            </p>
          </div>

          <h2 className="text-2xl font-black text-slate-900 dark:text-white pt-4">
            Years Later — The Memory Came Back
          </h2>

          <p>
            Fast forward several years. I had completed my B.Tech in Information Technology
            from Axis Institute in Kanpur. I had built several tools for TaskGuru by this
            point — background remover, text paraphraser, QR code generator, image compressor.
          </p>

          <p>
            One day I was thinking about what to build next. And that memory from school came
            back clearly — the hours wasted trying to edit a PDF, the dead ends on YouTube,
            the paywalled tools.
          </p>

          <p>
            I did some research. How many people search for &quot;convert PDF to Word free&quot; every
            month? The number was staggering — millions of searches globally. Students,
            professionals, small business owners, job seekers. Everyone runs into this at
            some point. And the free solutions available were still mostly terrible — requiring
            sign-ups, charging for downloads, or producing output with broken formatting.
          </p>

          <p>
            The problem I had faced as a school student was still unsolved for most people.
          </p>

          <h2 className="text-2xl font-black text-slate-900 dark:text-white pt-4">
            Building the PDF to Word Converter
          </h2>

          <p>
            I built TaskGuru&apos;s <strong>free PDF to Word converter</strong> with one goal:
            make the conversion genuinely free, genuinely private, and genuinely useful.
          </p>

          <p>
            The key technical decision was to run everything in the browser. Your PDF file
            never gets uploaded to any server — the conversion happens locally on your device
            using JavaScript. This matters for two reasons:
          </p>

          <div className="space-y-3 my-4">
            {[
              {
                title: 'Privacy',
                desc: 'Sensitive documents — contracts, medical records, financial statements, legal papers — should never be uploaded to a random server just because you need to edit them. With TaskGuru, they never are.',
              },
              {
                title: 'Speed',
                desc: 'No upload queue, no server processing time. The conversion is instant because everything runs on your own device.',
              },
            ].map((item) => (
              <div key={item.title} className="flex gap-3 p-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl">
                <span className="text-orange-500 font-black flex-shrink-0 mt-0.5">✓</span>
                <div>
                  <p className="font-bold text-slate-900 dark:text-white text-sm mb-0.5">{item.title}</p>
                  <p className="text-xs leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-black text-slate-900 dark:text-white pt-4">
            Who This Tool Is For
          </h2>

          <p>
            If you have ever needed to <strong>convert a PDF to Word</strong> and hit a paywall,
            this was built for you. Specifically:
          </p>

          <div className="space-y-2 my-4">
            {[
              'Students who need to edit a template or form that was sent as a PDF',
              'Professionals who received a contract in PDF and need to add their details',
              'Job seekers who found a resume template in PDF format',
              'Anyone who needs to extract and reuse text from a PDF document',
              'Small business owners updating documents without paying for Acrobat Pro',
            ].map((item) => (
              <div key={item} className="flex gap-3 items-start">
                <span className="text-orange-500 font-black flex-shrink-0 mt-0.5 text-sm">→</span>
                <p className="text-sm leading-relaxed">{item}</p>
              </div>
            ))}
          </div>

          <p>
            The school version of me would have found this incredibly useful. That is
            enough reason to have built it.
          </p>

          <div className="p-5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl mt-8">
            <p className="font-bold text-slate-900 dark:text-white mb-1 text-sm">Shubham Gautam</p>
            <p className="text-xs text-slate-500">
              Founder, TaskGuru · B.Tech IT, Axis Institute Kanpur (AKTU) · Made in India 🇮🇳
            </p>
          </div>

          {/* CTA */}
          <div className="p-5 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-2xl">
            <p className="font-bold text-slate-900 dark:text-white mb-2 text-sm">
              Free PDF to Word Converter — No Signup, No Paywall
            </p>
            <p className="text-xs text-slate-500 mb-3">
              Convert any PDF to an editable Word document in seconds.
              Your file never leaves your device. Works on Windows, Mac, Android, iOS.
            </p>
            <Link
              href="/tools/pdf-to-word"
              className="inline-block px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition-colors text-sm"
            >
              Convert PDF to Word Free →
            </Link>
          </div>

          {/* FAQ Section */}
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
                { title: 'Why I Built TaskGuru', href: '/blog/why-i-built-taskguru' },
                { title: 'How to Convert PDF to Word Free', href: '/blog/how-to-convert-pdf-to-word-free' },
                { title: 'Free Merge PDF Tool', href: '/tools/merge-pdf' },
                { title: 'Free PDF Compressor', href: '/tools/pdf-compressor' },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-orange-400 transition-colors group"
                >
                  <p className="font-semibold text-sm text-slate-900 dark:text-white group-hover:text-orange-600 transition-colors">
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
