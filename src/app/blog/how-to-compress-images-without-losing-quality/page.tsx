// src/app/blog/how-to-compress-images-without-losing-quality/page.tsx
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How to Compress Images Without Losing Quality (2026 Guide) | TaskGuru',
  description:
    'Learn how to compress JPG, PNG, and WebP images without losing quality. Step-by-step guide covering compression tools, formats, and best practices for faster websites.',
  alternates: {
    canonical: 'https://www.taskguru.online/blog/how-to-compress-images-without-losing-quality',
  },
  openGraph: {
    title: 'How to Compress Images Without Losing Quality (2026 Guide)',
    description:
      'Everything you need to know about image compression — formats, tools, and techniques to reduce file sizes without sacrificing visual quality.',
    url: 'https://www.taskguru.online/blog/how-to-compress-images-without-losing-quality',
    type: 'article',
  },
};

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'How to Compress Images Without Losing Quality (2026 Guide)',
  description:
    'A complete guide to image compression — covering formats, free tools, and step-by-step techniques to reduce image file sizes without visible quality loss.',
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
    '@id': 'https://www.taskguru.online/blog/how-to-compress-images-without-losing-quality',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Can I compress images without losing quality?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Using lossless compression (PNG, WebP lossless) you can reduce file sizes without any quality loss. Even lossy compression at moderate settings (70-85% quality) is visually indistinguishable from the original to the human eye.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the best image format for websites?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'WebP is the best format for websites in 2026. It offers 25-35% smaller files than JPEG at equivalent quality and supports both transparent backgrounds and lossless compression. All major browsers support it.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much can I compress an image?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most JPEG and PNG images can be compressed by 60-90% without visible quality loss using modern compression algorithms. A 2MB photograph can often be reduced to under 200KB while looking identical on screen.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does compressing images affect SEO?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, positively. Google uses page speed as a ranking factor. Compressed images load faster, improving your Core Web Vitals score — particularly Largest Contentful Paint (LCP) — which directly impacts search rankings.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between lossy and lossless compression?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Lossy compression permanently removes some image data to achieve smaller sizes — JPEG uses this method. Lossless compression reduces file size without removing any data, so the image is identical to the original when decoded — PNG and WebP lossless use this method.',
      },
    },
  ],
};

const TOC = [
  { href: '#what-is', label: 'What Is Image Compression?' },
  { href: '#why-it-matters', label: 'Why It Matters for SEO' },
  { href: '#formats', label: 'JPG vs PNG vs WebP Compared' },
  { href: '#how-to', label: 'How to Compress Images Step by Step' },
  { href: '#targets', label: 'File Size Targets by Use Case' },
  { href: '#mistakes', label: 'Common Mistakes to Avoid' },
  { href: '#advanced', label: 'Advanced Tips for Power Users' },
  { href: '#faq', label: 'Frequently Asked Questions' },
];

export default function BlogPost() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* PAGE WRAPPER */}
      <div className="max-w-3xl mx-auto px-4 py-12 md:py-16">

        {/* ── BREADCRUMB ── */}
        <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-8">
          <Link href="/blog" className="hover:text-blue-600 transition-colors font-medium">Blog</Link>
          <span>/</span>
          <span className="text-slate-700 dark:text-slate-300">Image Compression</span>
        </nav>

        {/* ── HERO ── */}
        <header className="mb-10">
          <div className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs font-black uppercase tracking-wider rounded-full mb-5">
            SEO Masterclass
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight mb-4">
            How to Compress Images Without Losing Quality
            <span className="block text-xl md:text-2xl font-semibold text-slate-400 dark:text-slate-500 mt-2">
              The Complete 2026 Guide
            </span>
          </h1>
          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500 dark:text-slate-400 mb-8">
            <span>By <strong className="text-slate-700 dark:text-slate-300">Shubham Gautam</strong></span>
            <span>·</span>
            <time dateTime="2026-03-14">March 14, 2026</time>
            <span>·</span>
            <span>10 min read</span>
          </div>

          {/* Quick Answer */}
          <div className="p-5 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 rounded-r-2xl">
            <p className="text-xs font-black text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2">
              ⚡ Quick Answer
            </p>
            <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
              Yes — compress images 60–90% without visible quality loss.
              Use <strong>WebP format</strong>, aim for <strong>under 150KB per image</strong>,
              and use a free browser-based compressor. Your visitors won&apos;t notice —
              but Google will reward you with better rankings.
            </p>
          </div>
        </header>

        {/* ── TABLE OF CONTENTS ── */}
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

        {/* ── BODY ── */}
        <div className="space-y-12 text-slate-600 dark:text-slate-400 leading-relaxed">

          {/* INTRO */}
          <div className="space-y-4 text-base">
            <p>
              Have you ever visited a website that took forever to load? Chances are, unoptimized
              images were the culprit. Images are the single biggest contributor to slow page speeds —
              and slow pages cost you visitors, rankings, and revenue.
            </p>
            <p>
              Whether you are a blogger, an e-commerce store owner, a web developer, or just someone
              who shares a lot of photos online, learning how to compress images properly is one of
              the most valuable digital skills you can build. This guide covers everything — what
              image compression is, why it matters for SEO, which formats to use, and how to
              compress images for free without sacrificing quality.
            </p>
          </div>

          {/* SECTION 1 */}
          <section>
            <h2 id="what-is" className="text-2xl font-black text-slate-900 dark:text-white mb-4 pt-2 scroll-mt-20">
              What Is Image Compression?
            </h2>
            <p className="mb-6">
              Image compression is the process of reducing the file size of an image by removing or
              encoding data more efficiently. Think of it like packing a suitcase — you can fit much
              more by folding clothes neatly instead of throwing them in randomly. The image looks
              the same on screen, but the file takes up far less space.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-5 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-2xl">
                <h3 className="font-black text-orange-700 dark:text-orange-300 mb-2">
                  🔻 Lossy Compression
                </h3>
                <p className="text-sm leading-relaxed">
                  Permanently removes some data for smaller files. JPEG is lossy.
                  At 75–85% quality the difference is invisible but file size drops{' '}
                  <strong>60–80%</strong>. Best for photographs.
                </p>
              </div>
              <div className="p-5 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl">
                <h3 className="font-black text-green-700 dark:text-green-300 mb-2">
                  ✅ Lossless Compression
                </h3>
                <p className="text-sm leading-relaxed">
                  Reduces file size without removing any data. PNG is lossless —
                  quality is pixel-perfect. Best for logos, icons, and screenshots.
                </p>
              </div>
            </div>
          </section>

          {/* SECTION 2 */}
          <section>
            <h2 id="why-it-matters" className="text-2xl font-black text-slate-900 dark:text-white mb-4 pt-2 scroll-mt-20">
              Why Image Compression Matters for SEO
            </h2>
            <p className="mb-6">
              Most people think compression is just about saving storage. It is much more — it
              directly affects your Google rankings.
            </p>
            <div className="space-y-5">
              {[
                {
                  num: '01',
                  title: 'Page Speed Is a Google Ranking Factor',
                  body: 'Google officially uses page speed as a ranking signal. Core Web Vitals — particularly Largest Contentful Paint (LCP) — are directly impacted by image file sizes. A page with 5MB of uncompressed images scores poorly on Google Lighthouse.',
                },
                {
                  num: '02',
                  title: 'Bounce Rate and User Experience',
                  body: 'Users abandon websites that take more than 3 seconds to load. On mobile connections (60%+ of web traffic), large uncompressed images cause slow loads and high bounce rates — which Google interprets as poor quality.',
                },
                {
                  num: '03',
                  title: 'Mobile-First Indexing',
                  body: 'Google uses the mobile version of your site as the primary index. Mobile users are often on slower connections. Unoptimized images hurt your rankings on both mobile and desktop searches.',
                },
                {
                  num: '04',
                  title: 'Hosting Costs and Bandwidth',
                  body: 'Every byte counts when you pay for hosting. Smaller images mean lower CDN bandwidth costs, faster server response times, and a more scalable site as traffic grows.',
                },
              ].map((item) => (
                <div key={item.num} className="flex gap-4 p-5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl shadow-sm">
                  <span className="text-2xl font-black text-slate-200 dark:text-slate-700 flex-shrink-0 leading-none">
                    {item.num}
                  </span>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white mb-1">{item.title}</h3>
                    <p className="text-sm leading-relaxed">{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CTA 1 */}
          <div className="flex flex-col sm:flex-row items-center gap-4 p-5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl">
            <div className="flex-1">
              <p className="font-bold text-slate-900 dark:text-white mb-1 text-sm">
                🚀 Try TaskGuru&apos;s Free Image Compressor
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Compress JPG and PNG by up to 90% in your browser. No uploads. No sign-up.
              </p>
            </div>
            <Link
              href="/tools/image-compressor"
              className="flex-shrink-0 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors text-sm"
            >
              Compress Free →
            </Link>
          </div>

          {/* SECTION 3 */}
          <section>
            <h2 id="formats" className="text-2xl font-black text-slate-900 dark:text-white mb-4 pt-2 scroll-mt-20">
              Image Formats Compared: JPG vs PNG vs WebP
            </h2>
            <p className="mb-5">
              Choosing the right format is half the battle. The format determines both the
              maximum quality achievable and the minimum file size possible.
            </p>
            <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-700 mb-6">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-900 text-white">
                  <tr>
                    <th className="p-4 font-bold">Format</th>
                    <th className="p-4 font-bold">Type</th>
                    <th className="p-4 font-bold">Transparency</th>
                    <th className="p-4 font-bold">Best For</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 bg-white dark:bg-slate-900">
                  {[
                    ['JPEG', 'Lossy', '❌', 'Photos, hero images, blog thumbnails'],
                    ['PNG', 'Lossless', '✅', 'Logos, icons, screenshots'],
                    ['WebP', 'Both', '✅', 'Everything — best all-round web format'],
                    ['AVIF', 'Both', '✅', 'Next-gen, smaller than WebP'],
                    ['SVG', 'Vector', '✅', 'Icons, illustrations, infinitely scalable'],
                  ].map(([fmt, type, trans, best]) => (
                    <tr key={fmt as string} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="p-4 font-black text-slate-900 dark:text-white">{fmt as string}</td>
                      <td className="p-4">{type as string}</td>
                      <td className="p-4">{trans as string}</td>
                      <td className="p-4 text-slate-500">{best as string}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-5 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl">
              <h3 className="font-black text-blue-700 dark:text-blue-300 mb-2">
                💡 Why WebP Is the Best Choice in 2026
              </h3>
              <p className="text-sm leading-relaxed">
                Google developed WebP specifically for the web. It delivers{' '}
                <strong>25–35% smaller files than JPEG at equivalent quality</strong> and supports
                transparency like PNG. Chrome, Safari, Firefox, and Edge all support it fully.
                Convert your images to WebP when uploading to websites — and keep originals as backups.
              </p>
            </div>
          </section>

          {/* SECTION 4 */}
          <section>
            <h2 id="how-to" className="text-2xl font-black text-slate-900 dark:text-white mb-4 pt-2 scroll-mt-20">
              How to Compress Images Step by Step
            </h2>
            <p className="mb-5">
              You do not need expensive software. Here is the exact process professionals use:
            </p>
            <div className="space-y-3">
              {[
                {
                  n: '1',
                  title: 'Start from the original source file',
                  desc: 'Always compress from the highest-quality original. Never re-compress an already-compressed image — each lossy pass permanently degrades quality.',
                },
                {
                  n: '2',
                  title: 'Resize to display dimensions first',
                  desc: 'A 4000×3000px image displayed at 800×600px wastes 25× the bandwidth. Resize to actual display dimensions before compressing — this alone often reduces file size by 80%.',
                },
                {
                  n: '3',
                  title: 'Choose the right format',
                  desc: 'Use WebP for web images. Use JPEG for photographs where transparency is not needed. Use PNG only for logos or images requiring crisp transparency.',
                },
                {
                  n: '4',
                  title: 'Set the compression level',
                  desc: 'For JPEG, 75–85% quality is the sweet spot — visually identical to 100% but 60–70% smaller. For WebP, quality 80 is excellent.',
                },
                {
                  n: '5',
                  title: 'Use a free browser-based tool',
                  desc: "Upload to TaskGuru's Image Compressor. Your file never leaves your device — no privacy risk, no upload delays, instant result.",
                },
              ].map((step) => (
                <div key={step.n} className="flex gap-4 p-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl shadow-sm">
                  <div className="h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-black flex-shrink-0 text-sm">
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

          {/* SECTION 5 */}
          <section>
            <h2 id="targets" className="text-2xl font-black text-slate-900 dark:text-white mb-4 pt-2 scroll-mt-20">
              File Size Targets by Use Case
            </h2>
            <p className="mb-5">
              How much to compress depends on where the image appears. Use these targets:
            </p>
            <div className="grid md:grid-cols-2 gap-3">
              {[
                { use: 'Blog article images', target: 'Under 100KB', note: "Readers won't notice any difference" },
                { use: 'Hero / banner images', target: 'Under 300KB', note: 'Quality matters more — use WebP' },
                { use: 'Product photos', target: 'Under 150KB', note: 'Balance quality and speed' },
                { use: 'Thumbnails', target: 'Under 40KB', note: 'Heavy compression is fine' },
                { use: 'Logos and icons', target: 'Under 20KB', note: 'Use SVG when possible' },
                { use: 'Email images', target: 'Under 80KB', note: 'Email clients add their own compression' },
              ].map((item) => (
                <div key={item.use} className="p-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-slate-900 dark:text-white text-sm">{item.use}</span>
                    <span className="text-xs font-black text-green-700 bg-green-100 dark:bg-green-900/30 dark:text-green-400 px-2 py-0.5 rounded-full">
                      {item.target}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">{item.note}</p>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 6 */}
          <section>
            <h2 id="mistakes" className="text-2xl font-black text-slate-900 dark:text-white mb-4 pt-2 scroll-mt-20">
              Common Mistakes to Avoid
            </h2>
            <div className="space-y-3">
              {[
                {
                  mistake: 'Re-compressing an already-compressed image',
                  fix: 'Always compress from the original source file. Each lossy pass permanently degrades quality.',
                },
                {
                  mistake: 'Using PNG for photographs',
                  fix: 'PNG produces unnecessarily large files for complex photos. Use JPEG or WebP instead.',
                },
                {
                  mistake: 'Not resizing before compressing',
                  fix: 'Compression reduces file size but does not change pixel dimensions. Resize first for maximum savings.',
                },
                {
                  mistake: 'Ignoring mobile preview',
                  fix: 'An image fine on desktop may look pixelated on a high-DPI mobile screen. Preview on multiple devices.',
                },
                {
                  mistake: 'Forgetting alt text',
                  fix: 'Add descriptive alt text to every image. It helps both SEO ranking and accessibility.',
                },
              ].map((item) => (
                <div key={item.mistake} className="flex gap-3 p-4 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/40 rounded-xl">
                  <span className="text-red-500 font-black text-base flex-shrink-0">✗</span>
                  <div>
                    <p className="font-bold text-red-700 dark:text-red-400 text-sm mb-0.5">{item.mistake}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{item.fix}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 7 */}
          <section>
            <h2 id="advanced" className="text-2xl font-black text-slate-900 dark:text-white mb-4 pt-2 scroll-mt-20">
              Advanced Tips for Power Users
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="font-black text-slate-900 dark:text-white mb-2">
                  Use Responsive Images with srcset
                </h3>
                <p className="text-sm mb-3">
                  The HTML <code className="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-xs font-mono">srcset</code>{' '}
                  attribute serves different image sizes based on screen width. A mobile user gets a
                  small image; a desktop user gets a larger one — no JavaScript required:
                </p>
                <pre className="bg-slate-900 text-green-400 p-4 rounded-xl text-xs overflow-x-auto leading-relaxed">
{`<img
  src="image-800.webp"
  srcset="image-400.webp 400w, image-800.webp 800w, image-1200.webp 1200w"
  sizes="(max-width: 600px) 400px, 800px"
  alt="Description of image"
  loading="lazy"
>`}
                </pre>
              </div>

              <div>
                <h3 className="font-black text-slate-900 dark:text-white mb-2">
                  Add loading=&quot;lazy&quot; to All Images
                </h3>
                <p className="text-sm">
                  Lazy loading delays off-screen images until the user scrolls near them.
                  Add{' '}
                  <code className="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-xs font-mono">loading="lazy"</code>{' '}
                  to your image tags — the browser handles the rest with no JavaScript.
                  Reduces initial page load time significantly on long pages.
                </p>
              </div>

              <div>
                <h3 className="font-black text-slate-900 dark:text-white mb-2">
                  Use a CDN for Image Delivery
                </h3>
                <p className="text-sm">
                  A Content Delivery Network serves images from servers geographically close to
                  your users. Combined with WebP images, a CDN makes your site feel instantaneous
                  worldwide. Cloudflare&apos;s free tier is a great starting point.
                </p>
              </div>

              <div>
                <h3 className="font-black text-slate-900 dark:text-white mb-2">
                  Test with Google PageSpeed Insights
                </h3>
                <p className="text-sm">
                  After optimizing, test at{' '}
                  <a
                    href="https://pagespeed.web.dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    pagespeed.web.dev
                  </a>
                  . The tool shows exactly how much each image slows your page.
                  Aim for an LCP score under 2.5 seconds on mobile.
                </p>
              </div>
            </div>
          </section>

          {/* CTA 2 */}
          <div className="p-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl">
            <h3 className="font-black text-lg mb-2">Ready to Optimize Your Images?</h3>
            <p className="text-blue-100 text-sm mb-4">
              Use TaskGuru&apos;s free Image Compressor to reduce file sizes by up to 90% instantly.
              No upload to servers — everything happens in your browser.
            </p>
            <Link
              href="/tools/image-compressor"
              className="inline-block px-5 py-2.5 bg-white text-blue-700 font-bold rounded-xl hover:bg-blue-50 transition-colors text-sm"
            >
              Try Free Image Compressor →
            </Link>
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
              Image compression is one of the highest-impact optimizations you can make for any
              website. The difference between an unoptimized and well-optimized image set can be
              the difference between a 5-second load and a 1-second load — and that directly
              affects your SEO rankings, bounce rate, and conversions.
            </p>
            <p className="text-sm leading-relaxed">
              Switch to WebP, resize to display dimensions, run through a free compressor.
              Most images compress 60–90% with zero visible difference. Your visitors
              won&apos;t notice — but Google will.
            </p>
          </section>

          {/* ✅ FIXED: Related articles now only link to EXISTING blog folders */}
          <div className="pt-8 border-t border-slate-200 dark:border-slate-700">
            <h3 className="text-base font-black text-slate-900 dark:text-white mb-4">
              Related Articles
            </h3>
            <div className="grid md:grid-cols-2 gap-3">
              {[
                {
                  title: 'JPG vs WebP: Which Format Boosts Your SEO Score?',
                  href: '/blog/image-compression-guide',
                },
                {
                  title: 'How to Extract Text from a Scanned PDF for Free',
                  href: '/blog/extract-text-scanned-pdf',
                },
                {
                  title: '5 Hidden Keywords ATS Scanners Look For',
                  href: '/blog/resume-ats-secrets',
                },
                {
                  title: 'The Rise of Local-First Web Apps in 2026',
                  href: '/blog/local-first-web-apps-trend-2026',
                },
              ].map((post) => (
                <Link
                  key={post.href}
                  href={post.href}
                  className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-blue-400 dark:hover:border-blue-600 transition-colors group"
                >
                  <p className="font-semibold text-sm text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
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
          
