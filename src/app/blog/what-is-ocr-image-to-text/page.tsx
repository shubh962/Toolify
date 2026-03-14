// src/app/blog/what-is-ocr-image-to-text/page.tsx
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'What is OCR? How Image to Text Technology Works (2026 Guide) | TaskGuru',
  description:
    'Learn what OCR (Optical Character Recognition) is, how it works, and how to extract text from images and scanned PDFs for free — no software required.',
  alternates: {
    canonical: 'https://www.taskguru.online/blog/what-is-ocr-image-to-text',
  },
  openGraph: {
    title: 'What is OCR? How Image to Text Technology Works',
    description:
      'A complete plain-English guide to Optical Character Recognition — what it is, how it works, and how to use it free in your browser today.',
    url: 'https://www.taskguru.online/blog/what-is-ocr-image-to-text',
    type: 'article',
  },
};

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'What is OCR? How Image to Text Technology Works (2026 Guide)',
  description:
    'A complete plain-English guide to Optical Character Recognition — what it is, how it works, and how to use free online OCR tools to extract text from images and scanned PDFs.',
  author: {
    '@type': 'Person',
    name: 'Shubham Gautam',
    url: 'https://www.taskguru.online/about',
  },
  publisher: {
    '@type': 'Organization',
    name: 'TaskGuru',
    logo: { '@type': 'ImageObject', url: 'https://www.taskguru.online/logo.png' },
  },
  datePublished: '2026-03-14',
  dateModified: '2026-03-14',
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://www.taskguru.online/blog/what-is-ocr-image-to-text',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What does OCR stand for?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'OCR stands for Optical Character Recognition. It is a technology that reads text from images, scanned documents, and photographs and converts it into editable, searchable digital text.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is OCR accurate?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Modern AI-powered OCR tools achieve 95-99% accuracy on clear, high-resolution images with standard fonts. Accuracy drops on handwritten text, low-resolution scans, or images with complex backgrounds.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can OCR read handwriting?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, but with lower accuracy than printed text. Modern AI-powered OCR engines like Google Vision can read clear handwriting reasonably well. Cursive or messy handwriting remains challenging for most tools.',
      },
    },
    {
      '@type': 'Question',
      name: 'What image formats work with OCR?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most OCR tools support JPG, PNG, WEBP, BMP, and TIFF image formats. For best results use a clear, high-resolution image (at least 300 DPI) with good contrast between text and background.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between OCR and a screenshot?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A screenshot captures an image of text — you can see the words but cannot copy or edit them. OCR converts that image into actual selectable, editable text characters that you can paste into any document.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I use OCR on a scanned PDF?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Scanned PDFs are essentially image files — OCR reads the text from each page image and makes it selectable and copyable. TaskGuru\'s Image to Text tool supports this workflow.',
      },
    },
  ],
};

const TOC = [
  { href: '#what-is-ocr', label: 'What Is OCR?' },
  { href: '#how-it-works', label: 'How Does OCR Work?' },
  { href: '#history', label: 'A Brief History of OCR' },
  { href: '#use-cases', label: 'Real-World Use Cases' },
  { href: '#how-to-use', label: 'How to Extract Text from an Image (Free)' },
  { href: '#tips', label: 'Tips for Best OCR Accuracy' },
  { href: '#limitations', label: 'Limitations of OCR' },
  { href: '#faq', label: 'Frequently Asked Questions' },
];

export default function BlogPost() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="max-w-3xl mx-auto px-4 py-12 md:py-16">

        {/* BREADCRUMB */}
        <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-8">
          <Link href="/blog" className="hover:text-blue-600 transition-colors font-medium">Blog</Link>
          <span>/</span>
          <span className="text-slate-700 dark:text-slate-300">What is OCR</span>
        </nav>

        {/* HERO */}
        <header className="mb-10">
          <div className="inline-block px-3 py-1 bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 text-xs font-black uppercase tracking-wider rounded-full mb-5">
            Tech Explained
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight mb-4">
            What is OCR?
            <span className="block text-xl md:text-2xl font-semibold text-slate-400 dark:text-slate-500 mt-2">
              How Image to Text Technology Works — Plain English Guide
            </span>
          </h1>
          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500 dark:text-slate-400 mb-8">
            <span>By <strong className="text-slate-700 dark:text-slate-300">Shubham Gautam</strong></span>
            <span>·</span>
            <time dateTime="2026-03-14">March 14, 2026</time>
            <span>·</span>
            <span>8 min read</span>
          </div>

          {/* Quick Answer */}
          <div className="p-5 bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-500 rounded-r-2xl">
            <p className="text-xs font-black text-purple-600 dark:text-purple-400 uppercase tracking-wider mb-2">
              ⚡ Quick Answer
            </p>
            <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
              <strong>OCR (Optical Character Recognition)</strong> is the technology that reads
              text from images and converts it into editable digital characters. It is how your
              phone can scan a receipt, how banks process cheques, and how you can copy text from
              a photo — all without typing a single word manually.
            </p>
          </div>
        </header>

        {/* TABLE OF CONTENTS */}
        <div className="mb-10 p-5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl">
          <p className="font-black text-slate-900 dark:text-white text-sm mb-3">📋 Table of Contents</p>
          <ol className="space-y-1.5">
            {TOC.map((item, i) => (
              <li key={item.href} className="flex items-center gap-2 text-sm">
                <span className="text-slate-400 font-mono text-xs w-5">{i + 1}.</span>
                <a href={item.href} className="text-blue-600 dark:text-blue-400 hover:underline">
                  {item.label}
                </a>
              </li>
            ))}
          </ol>
        </div>

        {/* BODY */}
        <div className="space-y-12 text-slate-600 dark:text-slate-400 leading-relaxed">

          {/* INTRO */}
          <div className="space-y-4 text-base">
            <p>
              You are looking at a photograph of a business card. You need the phone number from it.
              Instead of squinting at the screen and typing it out manually, you simply take a
              screenshot, run it through an OCR tool, and the number appears — ready to copy.
            </p>
            <p>
              That is OCR in action. It is one of the most practically useful technologies in
              everyday digital life, yet most people have no idea how it works or that they are
              already using it dozens of times a week. This guide explains everything in plain
              English — no engineering degree required.
            </p>
          </div>

          {/* SECTION 1 */}
          <section>
            <h2 id="what-is-ocr" className="text-2xl font-black text-slate-900 dark:text-white mb-4 pt-2 scroll-mt-20">
              What Is OCR?
            </h2>
            <p className="mb-4">
              OCR stands for <strong>Optical Character Recognition</strong>. It is a technology that
              identifies and extracts text from images, scanned documents, and photographs —
              converting visual representations of letters into actual digital text characters that
              a computer can read, search, copy, and edit.
            </p>
            <p className="mb-6">
              The key distinction: a photograph of a document is just pixels to a computer. OCR
              teaches the computer to recognise which clusters of pixels form the letter &quot;A&quot;,
              which form &quot;B&quot;, and so on — then reassemble them into readable text.
            </p>

            <div className="grid md:grid-cols-3 gap-4">
              {[
                {
                  emoji: '📷',
                  title: 'Input',
                  desc: 'An image, photo, screenshot, or scanned document containing text',
                  color: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800',
                  titleColor: 'text-blue-700 dark:text-blue-300',
                },
                {
                  emoji: '🧠',
                  title: 'OCR Engine',
                  desc: 'AI reads pixel patterns and identifies characters, words, and lines',
                  color: 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800',
                  titleColor: 'text-purple-700 dark:text-purple-300',
                },
                {
                  emoji: '📝',
                  title: 'Output',
                  desc: 'Editable, selectable, searchable digital text you can copy and paste',
                  color: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',
                  titleColor: 'text-green-700 dark:text-green-300',
                },
              ].map((item) => (
                <div key={item.title} className={`p-5 border rounded-2xl ${item.color}`}>
                  <div className="text-2xl mb-2">{item.emoji}</div>
                  <h3 className={`font-black mb-2 ${item.titleColor}`}>{item.title}</h3>
                  <p className="text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 2 */}
          <section>
            <h2 id="how-it-works" className="text-2xl font-black text-slate-900 dark:text-white mb-4 pt-2 scroll-mt-20">
              How Does OCR Work?
            </h2>
            <p className="mb-6">
              Modern OCR is powered by machine learning and neural networks. Here is what happens
              under the hood when you upload an image to an OCR tool:
            </p>

            <div className="space-y-3">
              {[
                {
                  n: '1',
                  title: 'Image Pre-Processing',
                  desc: 'The engine first cleans up the image — straightening skewed text, increasing contrast, removing noise, and converting to greyscale. This dramatically improves accuracy on low-quality scans.',
                  color: 'bg-blue-600',
                },
                {
                  n: '2',
                  title: 'Layout Analysis',
                  desc: 'The engine maps the structure of the page — identifying separate text blocks, columns, headers, tables, and paragraphs. This helps it process multi-column documents correctly instead of mixing lines.',
                  color: 'bg-indigo-600',
                },
                {
                  n: '3',
                  title: 'Character Segmentation',
                  desc: 'Each line of text is broken into individual characters. The engine identifies where one letter ends and the next begins — a surprisingly complex task for connected scripts or cursive handwriting.',
                  color: 'bg-violet-600',
                },
                {
                  n: '4',
                  title: 'Character Recognition',
                  desc: 'Each segmented character is compared against a trained model containing thousands of examples of every character in multiple fonts and sizes. The closest match wins — this is where the AI does its heavy lifting.',
                  color: 'bg-purple-600',
                },
                {
                  n: '5',
                  title: 'Language Model Post-Processing',
                  desc: 'The raw character output is passed through a language model that checks if the result makes sense. "Th3 quick br0wn fox" gets corrected to "The quick brown fox" using context and dictionary lookup.',
                  color: 'bg-pink-600',
                },
              ].map((step) => (
                <div key={step.n} className="flex gap-4 p-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl shadow-sm">
                  <div className={`h-8 w-8 rounded-full ${step.color} text-white flex items-center justify-center font-black flex-shrink-0 text-sm`}>
                    {step.n}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1">{step.title}</h4>
                    <p className="text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 3 */}
          <section>
            <h2 id="history" className="text-2xl font-black text-slate-900 dark:text-white mb-4 pt-2 scroll-mt-20">
              A Brief History of OCR
            </h2>
            <p className="mb-6">
              OCR is older than most people realise — and its evolution mirrors the history of
              computing itself.
            </p>
            <div className="space-y-0">
              {[
                {
                  year: '1914',
                  event: 'Emanuel Goldberg develops a machine that reads characters and converts them to telegraph code — the first primitive OCR device.',
                },
                {
                  year: '1950s',
                  event: 'IBM and others develop the first commercial OCR machines to read printed characters for banking and postal sorting. Each machine weighs hundreds of kilograms.',
                },
                {
                  year: '1974',
                  event: 'Ray Kurzweil invents the first omni-font OCR — able to read any printed font. Used to create reading machines for the blind.',
                },
                {
                  year: '1990s',
                  event: 'OCR becomes software — ABBYY FineReader and Tesseract (developed by HP, later open-sourced by Google) bring OCR to desktop computers.',
                },
                {
                  year: '2010s',
                  event: 'Deep learning transforms OCR accuracy. Google Lens, Apple Live Text, and Microsoft Azure OCR achieve near-human accuracy on printed text.',
                },
                {
                  year: '2020s',
                  event: 'OCR moves to the browser. WebAssembly-powered engines like Tesseract.js run entirely client-side — no server required, full privacy guaranteed.',
                },
              ].map((item, i, arr) => (
                <div key={item.year} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="h-8 w-8 rounded-full bg-slate-900 dark:bg-slate-700 text-white flex items-center justify-center font-black flex-shrink-0 text-xs">
                      ●
                    </div>
                    {i < arr.length - 1 && (
                      <div className="w-0.5 h-full bg-slate-200 dark:bg-slate-700 my-1" />
                    )}
                  </div>
                  <div className="pb-5">
                    <span className="text-xs font-black text-slate-400 uppercase tracking-wider">{item.year}</span>
                    <p className="text-sm leading-relaxed mt-0.5">{item.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 4 */}
          <section>
            <h2 id="use-cases" className="text-2xl font-black text-slate-900 dark:text-white mb-4 pt-2 scroll-mt-20">
              Real-World Use Cases
            </h2>
            <p className="mb-6">
              OCR is not a niche technology — it powers dozens of tools you use every day without
              realising it.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                {
                  emoji: '🏦',
                  title: 'Banking & Finance',
                  desc: 'Banks use OCR to process cheques, read account numbers, and digitise paper statements automatically. ATMs use OCR to read deposited cheques in real time.',
                },
                {
                  emoji: '📚',
                  title: 'Students & Researchers',
                  desc: 'Extracting quotes from scanned textbooks, digitising handwritten lecture notes, and converting physical research papers into searchable documents.',
                },
                {
                  emoji: '🏥',
                  title: 'Healthcare',
                  desc: 'Converting doctor prescriptions, patient records, and medical forms into digital databases. Reduces manual data entry errors significantly.',
                },
                {
                  emoji: '⚖️',
                  title: 'Legal',
                  desc: 'Law firms digitise thousands of paper documents for discovery. OCR makes them searchable — finding a specific clause in 10,000 pages takes seconds.',
                },
                {
                  emoji: '📦',
                  title: 'Logistics & Retail',
                  desc: 'Reading shipping labels, invoices, and purchase orders automatically. Warehouse systems use OCR to track packages without manual scanning.',
                },
                {
                  emoji: '♿',
                  title: 'Accessibility',
                  desc: 'Screen readers use OCR to read text from images aloud for visually impaired users. Apple Live Text and Google Lens both use OCR for this purpose.',
                },
              ].map((item) => (
                <div key={item.title} className="p-5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl shadow-sm">
                  <div className="text-2xl mb-2">{item.emoji}</div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-1">{item.title}</h3>
                  <p className="text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA 1 */}
          <div className="flex flex-col sm:flex-row items-center gap-4 p-5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl">
            <div className="flex-1">
              <p className="font-bold text-slate-900 dark:text-white mb-1 text-sm">
                🔍 Try TaskGuru&apos;s Free Image to Text Tool
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Extract text from JPG, PNG, or WEBP images instantly. No upload to servers. No sign-up.
              </p>
            </div>
            <Link
              href="/tools/image-to-text"
              className="flex-shrink-0 px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl transition-colors text-sm"
            >
              Extract Text Free →
            </Link>
          </div>

          {/* SECTION 5 */}
          <section>
            <h2 id="how-to-use" className="text-2xl font-black text-slate-900 dark:text-white mb-4 pt-2 scroll-mt-20">
              How to Extract Text from an Image for Free
            </h2>
            <p className="mb-5">
              You do not need to install any software. Here is the exact process using
              TaskGuru&apos;s free browser-based OCR tool:
            </p>
            <div className="space-y-3">
              {[
                {
                  n: '1',
                  title: 'Prepare your image',
                  desc: "Take a clear, well-lit photo or screenshot of the text you need. The clearer the image, the better the accuracy. Avoid shadows, blur, or extreme angles.",
                },
                {
                  n: '2',
                  title: 'Upload to the tool',
                  desc: "Go to TaskGuru's Image to Text tool and drag your image into the upload area, or click to browse. Supports JPG, PNG, and WEBP formats up to 10MB.",
                },
                {
                  n: '3',
                  title: 'Wait for processing',
                  desc: "The Tesseract OCR engine runs entirely in your browser — no server upload. Processing takes 5-15 seconds depending on image size and your device.",
                },
                {
                  n: '4',
                  title: 'Copy the extracted text',
                  desc: "The recognised text appears in the output panel. Click Copy to paste it directly into Word, Google Docs, your email, or any other application.",
                },
              ].map((step) => (
                <div key={step.n} className="flex gap-4 p-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl shadow-sm">
                  <div className="h-8 w-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-black flex-shrink-0 text-sm">
                    {step.n}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-1">{step.title}</h4>
                    <p className="text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 6 */}
          <section>
            <h2 id="tips" className="text-2xl font-black text-slate-900 dark:text-white mb-4 pt-2 scroll-mt-20">
              Tips for Best OCR Accuracy
            </h2>
            <p className="mb-5">
              OCR accuracy depends heavily on image quality. Follow these tips to get the best results:
            </p>
            <div className="grid md:grid-cols-2 gap-3">
              {[
                { tip: '📐 Use high resolution', desc: 'Scan or photograph at 300 DPI or higher. Low-resolution images produce garbled output.' },
                { tip: '💡 Good lighting', desc: 'Ensure even lighting with no shadows across the text. Natural daylight works best for photographs.' },
                { tip: '📏 Keep it straight', desc: 'Text should be horizontal. Tilted or rotated text reduces accuracy significantly even in modern engines.' },
                { tip: '🖤 High contrast', desc: 'Black text on white background achieves the highest accuracy. Avoid coloured backgrounds with coloured text.' },
                { tip: '🔤 Standard fonts', desc: 'Printed fonts work best. Decorative, handwritten, or unusual fonts are harder for OCR to read correctly.' },
                { tip: '🚫 Avoid noise', desc: "Remove watermarks, stamps, or background patterns from the image if possible before running OCR." },
              ].map((item) => (
                <div key={item.tip} className="p-4 bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-900/40 rounded-xl">
                  <p className="font-bold text-green-700 dark:text-green-400 text-sm mb-1">{item.tip}</p>
                  <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 7 */}
          <section>
            <h2 id="limitations" className="text-2xl font-black text-slate-900 dark:text-white mb-4 pt-2 scroll-mt-20">
              Limitations of OCR
            </h2>
            <p className="mb-5">
              OCR is powerful but not perfect. Understanding the limitations helps you use it
              more effectively and know when to try a different approach.
            </p>

            <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-700 mb-6">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-900 text-white">
                  <tr>
                    <th className="p-4 font-bold">Scenario</th>
                    <th className="p-4 font-bold">OCR Accuracy</th>
                    <th className="p-4 font-bold">Why</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 bg-white dark:bg-slate-900">
                  {[
                    ['Printed text, clear scan', '95–99%', 'Ideal conditions for pattern matching'],
                    ['Printed text, photo (phone)', '88–95%', 'Slight distortion from camera angle'],
                    ['Handwritten (neat)', '70–85%', 'No consistent font pattern to match'],
                    ['Handwritten (cursive)', '40–65%', 'Characters merge — hard to segment'],
                    ['Low resolution (<150 DPI)', '50–70%', 'Not enough pixel data per character'],
                    ['Coloured / complex background', '60–80%', 'Noise interferes with character detection'],
                  ].map(([scenario, accuracy, why]) => (
                    <tr key={scenario as string} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="p-4 font-medium text-slate-900 dark:text-white">{scenario as string}</td>
                      <td className="p-4">
                        <span className={`text-xs font-black px-2 py-0.5 rounded-full ${
                          (accuracy as string).startsWith('9') ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                          : (accuracy as string).startsWith('8') ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                          : (accuracy as string).startsWith('7') ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                          : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                        }`}>
                          {accuracy as string}
                        </span>
                      </td>
                      <td className="p-4 text-slate-500 text-xs">{why as string}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-5 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 rounded-r-2xl">
              <p className="text-xs font-black text-yellow-700 dark:text-yellow-400 uppercase tracking-wider mb-2">
                ⚠️ Important Note
              </p>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                OCR cannot extract text from images where the text is part of the design itself
                — for example, text embedded inside a logo as curved paths. In those cases, the
                text exists as shapes, not characters, and OCR cannot read it.
              </p>
            </div>
          </section>

          {/* CTA 2 */}
          <div className="p-6 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-2xl">
            <h3 className="font-black text-lg mb-2">Extract Text from Any Image — Free</h3>
            <p className="text-purple-100 text-sm mb-4">
              TaskGuru&apos;s Image to Text tool uses Tesseract OCR running entirely in your browser.
              Your images never leave your device — complete privacy, instant results.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/tools/image-to-text"
                className="inline-block px-5 py-2.5 bg-white text-purple-700 font-bold rounded-xl hover:bg-purple-50 transition-colors text-sm"
              >
                Try Image to Text →
              </Link>
              <Link
                href="/tools/pdf-to-word"
                className="inline-block px-5 py-2.5 bg-purple-500 hover:bg-purple-400 text-white font-bold rounded-xl transition-colors text-sm"
              >
                PDF to Word →
              </Link>
            </div>
          </div>

          {/* FAQ */}
          <section>
            <h2 id="faq" className="text-2xl font-black text-slate-900 dark:text-white mb-5 pt-2 scroll-mt-20">
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
          </section>

          {/* CONCLUSION */}
          <section className="p-6 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl">
            <h2 className="text-xl font-black text-slate-900 dark:text-white mb-3">
              Final Thoughts
            </h2>
            <p className="text-sm leading-relaxed mb-3">
              OCR has gone from a room-sized machine to a technology that runs instantly in your
              browser — for free. Whether you need to copy text from a photo, digitise a scanned
              document, or extract data from a receipt, modern OCR tools make it effortless.
            </p>
            <p className="text-sm leading-relaxed">
              The key to great results is image quality. Start with a clear, high-contrast,
              well-lit image, and modern OCR will do the rest with 95%+ accuracy. For printed
              text, it is nearly indistinguishable from typing it yourself — in a fraction of
              the time.
            </p>
          </section>

          {/* RELATED ARTICLES — all existing folders */}
          <div className="pt-8 border-t border-slate-200 dark:border-slate-700">
            <h3 className="text-base font-black text-slate-900 dark:text-white mb-4">
              Related Articles
            </h3>
            <div className="grid md:grid-cols-2 gap-3">
              {[
                {
                  title: 'How to Extract Text from a Scanned PDF for Free',
                  href: '/blog/extract-text-scanned-pdf',
                },
                {
                  title: 'How to Compress Images Without Losing Quality',
                  href: '/blog/how-to-compress-images-without-losing-quality',
                },
                {
                  title: 'JPG vs WebP: Which Format Boosts Your SEO?',
                  href: '/blog/image-compression-guide',
                },
                {
                  title: 'The Rise of Local-First Web Apps in 2026',
                  href: '/blog/local-first-web-apps-trend-2026',
                },
              ].map((post) => (
                <Link
                  key={post.href}
                  href={post.href}
                  className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-purple-400 dark:hover:border-purple-600 transition-colors group"
                >
                  <p className="font-semibold text-sm text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    {post.title} →
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
