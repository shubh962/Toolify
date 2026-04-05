// src/app/blog/why-i-built-free-pdf-merger/page.tsx
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'A Government Portal Wanted One File. I Had Seven. Here Is What I Built | TaskGuru',
  description:
    'A scholarship form required all documents in a single PDF. Merging them for free turned out to be nearly impossible. So I built a free PDF merger — no signup, no paywall, works in your browser.',
  alternates: {
    canonical: 'https://www.taskguru.online/blog/why-i-built-free-pdf-merger',
  },
  openGraph: {
    title: 'A Government Portal Wanted One File. I Had Seven. Here Is What I Built.',
    description:
      'The real story behind TaskGuru\'s free PDF merger — a scholarship form, a government portal, and hours of wasted time.',
    url: 'https://www.taskguru.online/blog/why-i-built-free-pdf-merger',
    type: 'article',
  },
};

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'A Government Portal Wanted One File. I Had Seven. Here Is What I Built.',
  description:
    'The personal story behind TaskGuru\'s free PDF merger — how a scholarship form submission led to building a free, private, browser-based PDF combining tool.',
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
  datePublished: '2026-01-10',
  dateModified: '2026-01-10',
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://www.taskguru.online/blog/why-i-built-free-pdf-merger',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How do I merge PDF files for free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Go to TaskGuru\'s free PDF merger, upload your PDF files, arrange them in order, and click Merge. The combined PDF downloads instantly. No signup, no payment, no watermark. Everything runs in your browser — your files never get uploaded to any server.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I merge PDF files without installing software?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. TaskGuru\'s PDF merger works entirely in your browser — no software download or installation required. It works on Windows, Mac, Android, and iOS using Chrome, Safari, Firefox, or Edge.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is it safe to merge sensitive documents online?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'With TaskGuru, yes — because your files never leave your device. The merging happens locally in your browser using JavaScript. Most other online PDF mergers upload your files to their servers, which is a serious privacy risk for official documents like certificates, ID proofs, and financial records.',
      },
    },
    {
      '@type': 'Question',
      name: 'How many PDF files can I merge at once?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'TaskGuru\'s free PDF merger supports merging multiple PDF files in a single session with no file count limit. You can drag and drop to reorder the files before merging.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why do government portals ask for a single PDF file?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Government portals typically have a single file upload field to simplify document management on their end. Instead of processing multiple attachments, they require everything — application form, certificates, ID proof, photographs — combined into one PDF file.',
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
          <span className="text-slate-700 dark:text-slate-300">Why I Built Free PDF Merger</span>
        </nav>

        {/* HERO */}
        <header className="mb-10">
          <div className="inline-block px-3 py-1 bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300 text-xs font-black uppercase tracking-wider rounded-full mb-5">
            Founder Story
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white leading-tight mb-4">
            A Government Portal Wanted One File. I Had Seven. Here Is What I Built.
          </h1>
          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500 dark:text-slate-400 mb-6">
            <span>By <strong className="text-slate-700 dark:text-slate-300">Shubham Gautam</strong></span>
            <span>·</span>
            <span>Founder, TaskGuru</span>
            <span>·</span>
            <time dateTime="2026-01-10">January 10, 2026</time>
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
            The scholarship form was straightforward enough. Fill in your details, attach
            your documents, submit. Standard government portal stuff.
          </p>

          <p>
            Except for one requirement buried in the instructions:
            <strong> &quot;Upload all documents as a single PDF file.&quot;</strong>
          </p>

          <p>
            I had seven separate files. My application form. Mark sheets. Caste certificate.
            Income certificate. Bank details. Photograph. Aadhar copy. All individual PDFs
            and JPGs sitting in different folders on my phone.
          </p>

          <p>
            Combining them into one file — I had absolutely no idea how to do it.
          </p>

          <h2 className="text-2xl font-black text-slate-900 dark:text-white pt-4">
            The Search That Went Nowhere
          </h2>

          <p>
            I searched online for how to merge PDF files for free. The results looked
            promising. I clicked the first one. Uploaded my files. The tool processed
            them. I clicked download.
          </p>

          <p>
            <em>Sign up to download your merged PDF.</em>
          </p>

          <p>
            I tried the next result. This one worked — but added a watermark across every
            page. A scholarship application with &quot;PDF24 — Free Trial&quot; stamped on each
            page is not going to impress anyone reviewing it.
          </p>

          <p>
            Third site. Uploaded all seven files. The site processed for a few minutes,
            then showed an error. My files were gone. I had to start over.
          </p>

          <p>
            I downloaded an app. It merged the files but the output was 47MB — the portal
            had a 5MB limit. The app had a compression feature, but that was behind a
            premium subscription.
          </p>

          <div className="p-5 bg-orange-50 dark:bg-orange-900/20 border-l-4 border-orange-500 rounded-r-2xl my-6">
            <p className="text-sm text-slate-700 dark:text-slate-300 italic leading-relaxed">
              &quot;I spent more time trying to merge seven files into one
              than I had spent filling out the entire scholarship application.
              A task that should take thirty seconds was taking hours.&quot;
            </p>
          </div>

          <h2 className="text-2xl font-black text-slate-900 dark:text-white pt-4">
            Why This Problem Exists Everywhere
          </h2>

          <p>
            After going through this, I realized the problem was not unique to me. Government
            portals across India — scholarship applications, job applications, college
            admissions, scheme enrollments — almost all of them have single-file upload
            requirements. And almost nobody knows how to merge PDFs easily.
          </p>

          <p>
            The tools that exist either:
          </p>

          <div className="space-y-2 my-4">
            {[
              'Require you to create an account before downloading',
              'Add watermarks to the output',
              'Upload your files to their servers — a serious privacy concern for official documents',
              'Charge for basic features like downloading or compressing',
              'Fail silently and lose your uploaded files',
            ].map((item, i) => (
              <div key={i} className="flex gap-3 items-start p-3 bg-red-50 dark:bg-red-900/10 rounded-xl">
                <span className="text-red-500 font-black flex-shrink-0 text-sm">✗</span>
                <p className="text-sm leading-relaxed">{item}</p>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-black text-slate-900 dark:text-white pt-4">
            Building the PDF Merger
          </h2>

          <p>
            I already had several tools running on TaskGuru. Adding a PDF merger was
            something I kept putting off because merging PDFs is technically more complex
            than it sounds — you need to handle different PDF versions, page sizes, embedded
            fonts, and image quality.
          </p>

          <p>
            But after my own scholarship form experience, I stopped putting it off.
          </p>

          <p>
            The tool I built uses <strong>pdf-lib</strong> — a JavaScript library that
            runs entirely in your browser. Your files never get uploaded to any server.
            The merging happens locally on your device, which means:
          </p>

          <div className="space-y-3 my-4">
            {[
              { title: 'Complete privacy', desc: 'Your certificates, ID proofs, and financial documents stay on your device. Nobody else sees them.' },
              { title: 'No file size surprises', desc: 'You can see the output size before downloading and decide if you need to compress it separately.' },
              { title: 'No watermarks', desc: 'The output PDF is clean. No trial stamps, no service branding, nothing except your actual content.' },
              { title: 'Drag to reorder', desc: 'You can drag your uploaded files into the correct order before merging — so your documents come out exactly as you need them.' },
            ].map((item) => (
              <div key={item.title} className="flex gap-3 p-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl">
                <span className="text-green-500 font-black flex-shrink-0 mt-0.5">✓</span>
                <div>
                  <p className="font-bold text-slate-900 dark:text-white text-sm mb-0.5">{item.title}</p>
                  <p className="text-xs leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-black text-slate-900 dark:text-white pt-4">
            Who Needs This Tool Most
          </h2>

          <p>
            If you have ever faced any of these situations, this tool was built for you:
          </p>

          <div className="space-y-2 my-4">
            {[
              'Students submitting scholarship or college applications on government portals',
              'Job seekers who need to combine a CV, cover letter, and certificates into one file',
              'Professionals submitting proposals or reports as a single document',
              'Anyone dealing with government forms that require multiple documents in one upload',
              'Small business owners combining invoices, receipts, or contracts for clients',
            ].map((item, i) => (
              <div key={i} className="flex gap-3 items-start">
                <span className="text-orange-500 font-black flex-shrink-0 mt-0.5 text-sm">→</span>
                <p className="text-sm leading-relaxed">{item}</p>
              </div>
            ))}
          </div>

          <p>
            The scholarship form situation from my own experience — that exact problem —
            is what this tool solves. In about thirty seconds, without an account,
            without paying anything, without your documents touching anyone else&apos;s server.
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
              Merge PDF Files Free — No Signup, No Watermark
            </p>
            <p className="text-xs text-slate-500 mb-3">
              Combine multiple PDFs into one file instantly. Drag to reorder.
              Your files never leave your device. Works on all devices.
            </p>
            <Link
              href="/tools/merge-pdf"
              className="inline-block px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition-colors text-sm"
            >
              Merge PDF Files Free →
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
                { title: 'Why I Built Free PDF to Word Converter', href: '/blog/why-i-built-free-pdf-to-word-converter' },
                { title: 'How to Extract Text from a Scanned PDF', href: '/blog/extract-text-scanned-pdf' },
                { title: 'Free PDF Compressor', href: '/tools/pdf-compressor' },
                { title: 'Free Split PDF Tool', href: '/tools/split-pdf' },
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
