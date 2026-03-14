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
    logo: {
      '@type': 'ImageObject',
      url: 'https://www.taskguru.online/logo.png',
    },
  },
  datePublished: '2026-01-15',
  dateModified: '2026-03-01',
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

export default function BlogPost() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <article className="max-w-3xl mx-auto px-4 py-16 prose prose-slate dark:prose-invert prose-lg max-w-none">

        {/* HERO */}
        <div className="not-prose mb-12">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
            <span>/</span>
            <span>Image Compression</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight mb-6">
            How to Compress Images Without Losing Quality
            <span className="block text-2xl font-semibold text-slate-500 dark:text-slate-400 mt-3">
              The Complete 2026 Guide
            </span>
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span>By <strong className="text-slate-700 dark:text-slate-300">Shubham Gautam</strong></span>
            <span>·</span>
            <span>Updated March 2026</span>
            <span>·</span>
            <span>10 min read</span>
          </div>

          {/* Quick Answer Box */}
          <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl">
            <p className="text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2">
              Quick Answer
            </p>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              Yes — you can compress images significantly without visible quality loss.
              Use <strong>WebP format</strong> for web images, aim for{' '}
              <strong>under 150KB per image</strong>, and use a free browser-based compressor
              to avoid server uploads. Most images compress 60–90% with zero noticeable difference.
            </p>
          </div>
        </div>

        {/* INTRO */}
        <p>
          Have you ever visited a website that took forever to load? Chances are, unoptimized
          images were the culprit. Images are the single biggest contributor to slow page speeds —
          and slow pages cost you visitors, rankings, and revenue.
        </p>
        <p>
          Whether you are a blogger, an e-commerce store owner, a web developer, or just someone
          who shares a lot of photos online, learning how to compress images properly is one of the
          most valuable digital skills you can build. This guide covers everything — what image
          compression actually is, why it matters for SEO, which formats to use, and how to
          compress images for free without sacrificing quality.
        </p>

        {/* TABLE OF CONTENTS */}
        <div className="not-prose my-8 p-6 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl">
          <p className="font-bold text-slate-900 dark:text-white mb-4">Table of Contents</p>
          <ol className="space-y-2 text-sm">
            {[
              ['#what-is', 'What Is Image Compression?'],
              ['#why-it-matters', 'Why Image Compression Matters for SEO'],
              ['#formats', 'Image Formats Compared: JPG vs PNG vs WebP'],
              ['#how-to', 'How to Compress Images Step by Step'],
              ['#targets', 'File Size Targets by Use Case'],
              ['#mistakes', 'Common Mistakes to Avoid'],
              ['#advanced', 'Advanced Tips for Power Users'],
              ['#faq', 'Frequently Asked Questions'],
            ].map(([href, label]) => (
              <li key={href as string}>
                <a
                  href={href as string}
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {label as string}
                </a>
              </li>
            ))}
          </ol>
        </div>

        {/* SECTION 1 */}
        <h2 id="what-is">What Is Image Compression?</h2>
        <p>
          Image compression is the process of reducing the file size of an image by removing or
          encoding data more efficiently. Think of it like packing a suitcase — you can fit much
          more by folding clothes neatly instead of throwing them in randomly. The image looks the
          same on screen, but the file takes up far less space on disk and network.
        </p>
        <p>There are two fundamental types of compression:</p>

        <div className="not-prose grid md:grid-cols-2 gap-6 my-6">
          <div className="p-6 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-2xl">
            <h3 className="font-black text-orange-700 dark:text-orange-300 text-lg mb-2">
              Lossy Compression
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Permanently removes some image data to achieve smaller files. JPEG is lossy.
              At moderate settings (75–85% quality), the visual difference is nearly invisible
              but file size drops by <strong>60–80%</strong>. Best for photographs.
            </p>
          </div>
          <div className="p-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl">
            <h3 className="font-black text-green-700 dark:text-green-300 text-lg mb-2">
              Lossless Compression
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Reduces file size without removing any data. The image reconstructs perfectly.
              PNG is lossless. Files are larger than lossy, but quality is pixel-perfect.
              Best for logos, icons, screenshots.
            </p>
          </div>
        </div>

        {/* SECTION 2 */}
        <h2 id="why-it-matters">Why Image Compression Matters for SEO</h2>
        <p>
          Most people think image compression is just about saving storage space. It is much more
          than that — it directly affects your Google rankings.
        </p>
        <h3>1. Page Speed Is a Google Ranking Factor</h3>
        <p>
          Google officially uses page speed as a ranking signal. The Core Web Vitals metrics —
          particularly <strong>Largest Contentful Paint (LCP)</strong> — are directly impacted
          by image file sizes. A page with 5MB of uncompressed images will score poorly on
          Google Lighthouse, pushing you down in search results compared to competitors with
          optimized images.
        </p>
        <h3>2. Bounce Rate and User Experience</h3>
        <p>
          Research consistently shows that users abandon websites that take more than 3 seconds
          to load. On mobile connections (which account for over 60% of web traffic globally),
          large uncompressed images are the direct cause of slow loads and high bounce rates.
          Google notices high bounce rates and interprets them as poor quality content.
        </p>
        <h3>3. Mobile-First Indexing</h3>
        <p>
          Google now uses the mobile version of your site as the primary index. Mobile users are
          often on slower connections. If your images are not optimized for mobile, your rankings
          suffer even for desktop searches.
        </p>
        <h3>4. Hosting Costs and Bandwidth</h3>
        <p>
          Every byte counts when you are paying for hosting. Smaller images mean lower CDN
          bandwidth costs, faster server response times, and a more scalable site as traffic grows.
        </p>

        {/* CTA BOX */}
        <div className="not-prose my-8 p-6 bg-primary/5 border border-primary/20 rounded-2xl flex flex-col sm:flex-row items-center gap-4">
          <div className="flex-1">
            <p className="font-bold text-slate-900 dark:text-white mb-1">
              Try TaskGuru&apos;s Free Image Compressor
            </p>
            <p className="text-sm text-muted-foreground">
              Compress JPG and PNG files by up to 90% directly in your browser.
              No upload to servers. No sign-up required.
            </p>
          </div>
          <Link
            href="/tools/image-compressor"
            className="flex-shrink-0 px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-colors text-sm"
          >
            Compress Images Free →
          </Link>
        </div>

        {/* SECTION 3 */}
        <h2 id="formats">Image Formats Compared: JPG vs PNG vs WebP</h2>
        <p>
          Choosing the right format is half the battle. The format you choose determines both
          the maximum quality achievable and the minimum file size possible.
        </p>

        <div className="not-prose overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-700 my-6">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-900 text-white">
              <tr>
                <th className="p-4 font-bold">Format</th>
                <th className="p-4 font-bold">Compression</th>
                <th className="p-4 font-bold">Transparency</th>
                <th className="p-4 font-bold">Best For</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 bg-white dark:bg-slate-900">
              {[
                ['JPEG', 'Lossy', '❌ No', 'Photos, hero images, blog thumbnails'],
                ['PNG', 'Lossless', '✅ Yes', 'Logos, icons, screenshots, text images'],
                ['WebP', 'Both', '✅ Yes', 'Everything — best all-round web format'],
                ['AVIF', 'Both', '✅ Yes', 'Next-gen, smaller than WebP (growing support)'],
                ['SVG', 'Vector', '✅ Yes', 'Icons, illustrations, infinitely scalable'],
              ].map(([fmt, comp, trans, best]) => (
                <tr key={fmt as string}>
                  <td className="p-4 font-bold text-slate-900 dark:text-white">{fmt as string}</td>
                  <td className="p-4 text-slate-600 dark:text-slate-400">{comp as string}</td>
                  <td className="p-4">{trans as string}</td>
                  <td className="p-4 text-slate-600 dark:text-slate-400">{best as string}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3>Why WebP Is the Best Choice in 2026</h3>
        <p>
          Google developed WebP specifically for the web. It delivers <strong>25–35% smaller
          files than JPEG at equivalent quality</strong> and supports transparency like PNG.
          Every major browser — Chrome, Safari, Firefox, Edge — fully supports WebP. If you
          are still using only JPEG and PNG on your website in 2026, you are leaving significant
          performance gains on the table.
        </p>
        <p>
          The practical recommendation: convert your PNG and JPEG images to WebP when uploading
          to websites. Keep the originals as backups. Most modern image compressors, including
          TaskGuru&apos;s free tool, support WebP output.
        </p>

        {/* SECTION 4 */}
        <h2 id="how-to">How to Compress Images Step by Step</h2>
        <p>
          You do not need expensive software to compress images professionally. Here is the
          exact process:
        </p>

        <div className="not-prose space-y-4 my-6">
          {[
            {
              n: '1',
              title: 'Start from the original source file',
              desc: 'Always compress from the highest-quality original. Never re-compress an already-compressed image — each lossy pass degrades quality further. Keep originals in a backup folder.',
            },
            {
              n: '2',
              title: 'Resize to the display dimensions first',
              desc: 'A 4000×3000px image displayed at 800×600px is wasting 25× the bandwidth. Resize to actual display dimensions before compressing. This alone often reduces file size by 80%.',
            },
            {
              n: '3',
              title: 'Choose the right format',
              desc: 'Use WebP for web images. Use JPEG for photographs where transparency is not needed. Use PNG only for logos or images requiring crisp transparency.',
            },
            {
              n: '4',
              title: 'Set compression level',
              desc: 'For JPEG, 75–85% quality is the sweet spot — visually identical to 100% but 60–70% smaller. For WebP, quality 80 is excellent. Test by looking at the image at 100% zoom.',
            },
            {
              n: '5',
              title: 'Use a free online tool',
              desc: 'Upload to a browser-based compressor like TaskGuru\'s Image Compressor. Your file never leaves your device — no privacy risk, no upload delays.',
            },
          ].map((step) => (
            <div key={step.n} className="flex gap-4 p-5 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800">
              <div className="h-9 w-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-black flex-shrink-0">
                {step.n}
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-1">{step.title}</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* SECTION 5 */}
        <h2 id="targets">File Size Targets by Use Case</h2>
        <p>
          There is no single right answer for how much to compress — it depends on where the
          image appears and how prominently it is displayed. Here are practical targets:
        </p>

        <div className="not-prose grid md:grid-cols-2 gap-4 my-6">
          {[
            { use: 'Blog article images', target: 'Under 100KB', note: 'Readers won\'t notice any quality difference' },
            { use: 'Hero / banner images', target: 'Under 300KB', note: 'Quality matters more here — use WebP' },
            { use: 'Product photos', target: 'Under 150KB', note: 'Balance quality and speed for conversions' },
            { use: 'Thumbnails', target: 'Under 40KB', note: 'Small display size — heavy compression is fine' },
            { use: 'Logos and icons', target: 'Under 20KB', note: 'Use SVG when possible — infinitely scalable' },
            { use: 'Email images', target: 'Under 80KB', note: 'Email clients add their own compression pass' },
          ].map((item) => (
            <div key={item.use} className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl">
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-slate-900 dark:text-white text-sm">{item.use}</span>
                <span className="text-xs font-bold text-green-600 bg-green-50 dark:bg-green-900/30 px-2 py-1 rounded-full">{item.target}</span>
              </div>
              <p className="text-xs text-slate-500">{item.note}</p>
            </div>
          ))}
        </div>
        
        {/* SECTION 6 */}
        <h2 id="mistakes">Common Image Compression Mistakes to Avoid</h2>

        <div className="not-prose space-y-4 my-6">
          {[
            {
              mistake: 'Re-compressing an already-compressed image',
              fix: 'Always compress from the original source file. Each lossy pass permanently degrades quality.',
            },
            {
              mistake: 'Using PNG for photographs',
              fix: 'PNG is lossless and produces unnecessarily large files for complex photographic images. Use JPEG or WebP instead.',
            },
            {
              mistake: 'Not resizing before compressing',
              fix: 'Compression reduces file size but does not change pixel dimensions. Resize to display size first for maximum savings.',
            },
            {
              mistake: 'Ignoring mobile preview',
              fix: 'An image that looks fine on desktop might look pixelated on a high-DPI mobile screen. Preview on multiple devices.',
            },
            {
              mistake: 'Forgetting alt text',
              fix: 'Image optimization includes adding descriptive alt text. This helps both SEO ranking and screen-reader accessibility.',
            },
          ].map((item) => (
            <div key={item.mistake} className="flex gap-3 p-4 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900 rounded-xl">
              <div className="flex-shrink-0 mt-1">
                <span className="text-red-500 font-black text-lg">✗</span>
              </div>
              <div>
                <p className="font-bold text-red-700 dark:text-red-400 text-sm mb-1">{item.mistake}</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">{item.fix}</p>
              </div>
            </div>
          ))}
        </div>

        {/* SECTION 7 */}
        <h2 id="advanced">Advanced Tips for Power Users</h2>

        <h3>Use Responsive Images with srcset</h3>
        <p>
          The HTML <code>srcset</code> attribute lets you serve different image sizes based on
          the user&apos;s screen. A mobile user gets a small image; a desktop user gets a larger
          one. This is one of the most impactful web performance optimizations available and
          requires no extra tools — just smart HTML:
        </p>
        <pre className="bg-slate-900 text-green-400 p-4 rounded-xl text-sm overflow-x-auto">
{`<img
  src="image-800.webp"
  srcset="image-400.webp 400w, image-800.webp 800w, image-1200.webp 1200w"
  sizes="(max-width: 600px) 400px, 800px"
  alt="Description of image"
  loading="lazy"
>`}
        </pre>

        <h3>Add loading=&quot;lazy&quot; to All Images</h3>
        <p>
          Lazy loading delays loading off-screen images until the user scrolls near them. Add{' '}
          <code>loading=&quot;lazy&quot;</code> to your image tags and the browser handles the
          rest — no JavaScript required. This reduces initial page load time significantly on
          long pages.
        </p>

        <h3>Use a CDN for Image Delivery</h3>
        <p>
          A Content Delivery Network serves your images from servers geographically close to
          your users. Combined with compressed WebP images, a CDN can make your site feel
          instantaneous anywhere in the world. Cloudflare&apos;s free tier is a great starting
          point for most small websites.
        </p>

        <h3>Check Your Score with Google PageSpeed Insights</h3>
        <p>
          After optimizing your images, test your site at{' '}
          <a
            href="https://pagespeed.web.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            pagespeed.web.dev
          </a>
          . The tool highlights remaining issues and shows exactly how much each image is slowing
          your page down. Aim for an LCP score under 2.5 seconds on mobile.
        </p>

        {/* SECOND CTA */}
        <div className="not-prose my-10 p-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl">
          <h3 className="font-black text-xl mb-2">Ready to Optimize Your Images?</h3>
          <p className="text-blue-100 text-sm mb-4">
            Use TaskGuru&apos;s free Image Compressor to reduce your image file sizes by up to 90%
            instantly. No upload to servers — everything happens in your browser.
          </p>
          <Link
            href="/tools/image-compressor"
            className="inline-block px-6 py-3 bg-white text-blue-700 font-bold rounded-xl hover:bg-blue-50 transition-colors text-sm"
          >
            Try Free Image Compressor →
          </Link>
        </div>

        {/* FAQ */}
        <h2 id="faq">Frequently Asked Questions</h2>

        <div className="not-prose space-y-3 my-6">
          {faqSchema.mainEntity.map((faq, i) => (
            <details
              key={i}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-5 cursor-pointer group"
            >
              <summary className="font-bold text-slate-900 dark:text-white list-none flex justify-between items-center">
                {faq.name}
                <span className="transition-transform group-open:rotate-180 text-slate-400 flex-shrink-0 ml-2 text-xs">▼</span>
              </summary>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {faq.acceptedAnswer.text}
              </p>
            </details>
          ))}
        </div>

        {/* CONCLUSION */}
        <h2>Final Thoughts</h2>
        <p>
          Image compression is one of the highest-impact optimizations you can make for any
          website. The difference between an unoptimized and well-optimized image set can be the
          difference between a 5-second page load and a 1-second page load — and that directly
          affects your SEO rankings, bounce rate, and conversions.
        </p>
        <p>
          The best part? It takes very little effort. Switch to WebP format, resize images to
          display dimensions, and run them through a free compressor. Most images compress 60–90%
          with zero visible quality difference. Your visitors will not notice the compression —
          but Google will.
        </p>

        {/* RELATED POSTS */}
        <div className="not-prose mt-16 pt-10 border-t border-slate-200 dark:border-slate-700">
          <h3 className="text-lg font-black text-slate-900 dark:text-white mb-6">Related Articles</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { title: 'Best Free PDF Tools for Students in 2026', href: '/blog/best-free-pdf-tools-for-students' },
              { title: 'What is OCR? How Image to Text Technology Works', href: '/blog/what-is-ocr-image-to-text' },
              { title: 'How to Make a Resume That Passes ATS Screening', href: '/blog/how-to-make-ats-friendly-resume' },
              { title: 'JPG vs PNG vs WebP — Which Format Should You Use?', href: '/blog/jpg-vs-png-vs-webp' },
            ].map((post) => (
              <Link
                key={post.href}
                href={post.href}
                className="p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-blue-400 transition-colors group"
              >
                <p className="font-semibold text-sm text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {post.title} →
                </p>
              </Link>
            ))}
          </div>
        </div>

      </article>
    </>
  );
}
