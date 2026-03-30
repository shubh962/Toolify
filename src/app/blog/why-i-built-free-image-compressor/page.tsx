// src/app/blog/why-i-built-free-image-compressor/page.tsx
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Scholarship Form, 20KB Limit, and Why I Built a Free Image Compressor | TaskGuru',
  description:
    'A college student needed to compress a photo to 20KB for his scholarship form. Every app had heavy ads or asked for payment. So he built his own free image compressor.',
  alternates: {
    canonical: 'https://www.taskguru.online/blog/why-i-built-free-image-compressor',
  },
  openGraph: {
    title: 'Scholarship Form, 20KB Limit, and Why I Built a Free Image Compressor',
    description:
      'A real story about a 20KB photo limit, multiple useless apps, and why a developer decided to build his own free image compression tool.',
    url: 'https://www.taskguru.online/blog/why-i-built-free-image-compressor',
    type: 'article',
  },
};

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Scholarship Form, 20KB Limit, and Why I Built a Free Image Compressor',
  description:
    'A real story about a college student who needed to compress a photo to 20KB for a scholarship form and every app either showed heavy ads or asked for payment.',
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
  datePublished: '2025-12-05',
  dateModified: '2025-12-05',
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://www.taskguru.online/blog/why-i-built-free-image-compressor',
  },
};

export default function BlogPost() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <div className="max-w-2xl mx-auto px-4 py-12 md:py-16">

        {/* BREADCRUMB */}
        <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-8">
          <Link href="/blog" className="hover:text-blue-600 transition-colors font-medium">Blog</Link>
          <span>/</span>
          <span className="text-slate-700 dark:text-slate-300">Why I Built Free Image Compressor</span>
        </nav>

        {/* HERO */}
        <header className="mb-10">
          <div className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs font-black uppercase tracking-wider rounded-full mb-5">
            Founder Story
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white leading-tight mb-4">
            A Scholarship Form Said 20KB. My Photo Was 2MB. Here Is What Happened Next.
          </h1>
          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500 dark:text-slate-400 mb-6">
            <span>By <strong className="text-slate-700 dark:text-slate-300">Shubham Gautam</strong></span>
            <span>·</span>
            <span>Founder, TaskGuru</span>
            <span>·</span>
            <time dateTime="2025-12-05">December 5, 2025</time>
          </div>

          {/* Author card */}
          <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl">
            <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-black text-lg flex-shrink-0">
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
            If you have ever filled out an online scholarship form, government application,
            or college admission portal in India, you know the drill. Every field has a
            specific requirement. Name — exactly as on certificate. Date of birth — DD/MM/YYYY
            format only. Photo — maximum 20KB, JPG format, white background.
          </p>

          <p>
            That last one. The photo size limit. That one gets everyone.
          </p>

          <h2 className="text-2xl font-black text-slate-900 dark:text-white pt-4">
            20KB — A Number That Feels Impossible
          </h2>

          <p>
            I was filling out a scholarship form during my college days. Everything was
            going smoothly until I hit the photo upload field. Maximum size: 20KB.
          </p>

          <p>
            I checked my photo. It was a decent passport size photo I had clicked on my
            phone. Size: 2.4MB. That is 120 times larger than what the form allowed.
          </p>

          <p>
            I needed to <strong>compress the image</strong> — reduce it from 2.4MB down
            to under 20KB without making it look like a pixelated mess. Because a blurry
            photo on a scholarship form is not going to help anyone.
          </p>

          <h2 className="text-2xl font-black text-slate-900 dark:text-white pt-4">
            The App Store Trap
          </h2>

          <p>
            I went to the Play Store and searched for image compressor. Downloaded the
            first result. Opened it, selected my photo, clicked compress.
          </p>

          <p>
            An ad played. Then another. Then a banner appeared across the bottom of the
            screen. Then a popup offered me a premium subscription to remove the ads.
            I closed the popup, tried to compress again — another ad. The actual
            compression happened somewhere between the fourth and fifth ad, but
            the output quality was so bad the photo was unusable.
          </p>

          <p>
            I uninstalled it and downloaded another app. This one looked cleaner.
            Selected my photo. Adjusted the quality slider. The preview looked okay.
            Clicked save.
          </p>

          <p>
            <em>Upgrade to Pro to save compressed images. ₹299/month.</em>
          </p>

          <p>
            I tried three more apps. Same pattern — either buried in ads, asking for
            payment, or producing such low quality output that the compressed image
            looked nothing like the original photo.
          </p>

          <div className="p-5 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 rounded-r-2xl my-6">
            <p className="text-sm text-slate-700 dark:text-slate-300 italic leading-relaxed">
              &quot;I just needed to reduce image size in KB — a basic task that
              every government portal in India requires. Five apps later,
              I still had a 2.4MB photo and a scholarship form waiting.&quot;
            </p>
          </div>

          <h2 className="text-2xl font-black text-slate-900 dark:text-white pt-4">
            Adding It to TaskGuru
          </h2>

          <p>
            By this point I already had the background remover, paraphraser, and QR
            code generator on TaskGuru. Image compression was an obvious next addition —
            and honestly one I should have built sooner given how common this problem is.
          </p>

          <p>
            The goal was simple: let someone upload an image, choose their target file
            size or quality level, and download the compressed version. No ads. No
            payment. No account. Works directly in the browser so the image never
            gets uploaded to any server.
          </p>

          <p>
            Getting the compression right took time — the balance between reducing file
            size and maintaining enough quality for official documents required careful
            testing. A photo compressed to 20KB should still look like you, not like
            a painting of you.
          </p>

          <p>
            Eventually I got it working properly and added it to the site. Free image
            compressor — compress JPG and PNG images online, reduce image size in KB,
            download instantly. No watermark. No subscription. No ads.
          </p>

          <h2 className="text-2xl font-black text-slate-900 dark:text-white pt-4">
            Why This Problem Is So Common in India
          </h2>

          <p>
            Indian government portals and scholarship forms almost universally have
            strict file size limits — usually between 20KB and 100KB for photos.
            These limits exist for technical reasons but they create a real problem
            for anyone using a modern smartphone, because phone cameras now produce
            photos that are 2MB to 10MB by default.
          </p>

          <p>
            The gap between what your phone produces and what the form accepts is
            massive. And the tools available to bridge that gap — at least the free
            ones — are mostly terrible. Filled with ads, paywalls, and compression
            algorithms that destroy quality.
          </p>

          <p>
            If you have ever needed to <strong>reduce image size without losing quality</strong>
            for a form submission — this is exactly the tool I built for that situation.
          </p>

          <div className="p-5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl mt-8">
            <p className="font-bold text-slate-900 dark:text-white mb-1 text-sm">Shubham Gautam</p>
            <p className="text-xs text-slate-500">
              Founder, TaskGuru · B.Tech IT, Axis Institute Kanpur (AKTU) · Made in India 🇮🇳
            </p>
          </div>

          {/* CTA */}
          <div className="p-5 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl">
            <p className="font-bold text-slate-900 dark:text-white mb-2 text-sm">
              Free Image Compressor — No Ads, No Payment
            </p>
            <p className="text-xs text-slate-500 mb-3">
              Compress JPG and PNG images online. Reduce image size in KB without losing quality.
              Works in your browser — your photo never leaves your device.
            </p>
            <Link
              href="/tools/image-compressor"
              className="inline-block px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors text-sm"
            >
              Compress Image Free →
            </Link>
          </div>

          {/* Related */}
          <div className="pt-8 border-t border-slate-200 dark:border-slate-700">
            <h3 className="text-base font-black text-slate-900 dark:text-white mb-4">
              Related Stories & Tools
            </h3>
            <div className="grid md:grid-cols-2 gap-3">
              {[
                { title: 'Why I Built Free Background Remover', href: '/blog/why-free-background-remover' },
                { title: 'How to Compress Images Without Losing Quality', href: '/blog/how-to-compress-images-without-losing-quality' },
                { title: 'Free PDF Compressor', href: '/tools/pdf-compressor' },
                { title: 'Free Image to PDF', href: '/tools/image-to-pdf' },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-blue-400 transition-colors group"
                >
                  <p className="font-semibold text-sm text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
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
