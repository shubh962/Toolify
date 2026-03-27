// src/app/blog/why-free-background-remover/page.tsx
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Why I Built a Free Background Remover — A College Student\'s Story | TaskGuru',
  description:
    'A college student needed to remove a photo background for his scholarship form. Every free tool asked for money or signup. So he built his own — for free.',
  alternates: {
    canonical: 'https://www.taskguru.online/blog/why-free-background-remover',
  },
  openGraph: {
    title: 'Why I Built a Free Background Remover — A College Student\'s Story',
    description:
      'A real story about scholarship forms, passport photos, and why every "free" background remover isn\'t actually free.',
    url: 'https://www.taskguru.online/blog/why-free-background-remover',
    type: 'article',
  },
};

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Why I Built a Free Background Remover — A College Student\'s Story',
  description:
    'A real story about needing a background remover for a scholarship form and every tool asking for money or signup.',
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
  datePublished: '2025-08-15',
  dateModified: '2025-08-15',
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://www.taskguru.online/blog/why-free-background-remover',
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
          <span className="text-slate-700 dark:text-slate-300">Background Remover Story</span>
        </nav>

        {/* HERO */}
        <header className="mb-10">
          <div className="inline-block px-3 py-1 bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 text-xs font-black uppercase tracking-wider rounded-full mb-5">
            Founder Story
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white leading-tight mb-4">
            A Scholarship Form, a Passport Photo, and Why I Built a Free Background Remover
          </h1>
          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500 dark:text-slate-400 mb-6">
            <span>By <strong className="text-slate-700 dark:text-slate-300">Shubham Gautam</strong></span>
            <span>·</span>
            <span>Founder, TaskGuru</span>
            <span>·</span>
            <time dateTime="2025-08-15">August 15, 2025</time>
          </div>

          {/* Author card */}
          <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl">
            <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center text-white font-black text-lg flex-shrink-0">
              S
            </div>
            <div>
              <p className="font-bold text-slate-900 dark:text-white text-sm">Shubham Gautam</p>
              <p className="text-xs text-slate-500">B.Tech IT — Axis Institute, Kanpur · Developer & Founder, TaskGuru</p>
            </div>
          </div>
        </header>

        {/* BODY */}
        <div className="space-y-6 text-slate-700 dark:text-slate-300 leading-relaxed text-base">

          <p>
            It was sometime in 2025. I was sitting in my hostel room, filling out a scholarship
            form online. Everything was going smoothly until I hit one field — <em>passport size
            photograph with white background.</em>
          </p>

          <p>
            I had taken a photo on my phone. Decent enough. But the background was whatever
            was behind me at the time — a wall, some clutter, definitely not white. Not
            scholarship-form-white anyway.
          </p>

          <p>
            Simple problem, I thought. I will just remove the background online. Takes two
            minutes max.
          </p>

          <h2 className="text-2xl font-black text-slate-900 dark:text-white pt-4">
            Two Minutes Turned Into Forty
          </h2>

          <p>
            I opened Chrome and searched &quot;free image background remover.&quot; Clicked the first
            result. Uploaded my photo. Watched the loading spinner go round and round.
            It actually worked — the background was gone, clean edges, looked good.
          </p>

          <p>
            Then I clicked download.
          </p>

          <p>
            <em>Sign up to download your image.</em>
          </p>

          <p>
            Fine. I went to the next site. Same thing — upload, process, wait. This one
            was slower. The result was not as clean but okay. Clicked download.
          </p>

          <p>
            <em>Upgrade to Pro — ₹799/month.</em>
          </p>

          <p>
            I am a college student filling out a scholarship form. I do not have ₹799 for
            a background remover I will use once.
          </p>

          <p>
            Third site. Actually downloaded — but with a massive watermark stamped
            across the middle of my face. Completely unusable for an official form.
          </p>

          <div className="p-5 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded-r-2xl my-6">
            <p className="text-sm text-slate-700 dark:text-slate-300 italic leading-relaxed">
              &quot;I just wanted a white background on my passport photo.
              I spent forty minutes and had nothing to show for it.&quot;
            </p>
          </div>

          <h2 className="text-2xl font-black text-slate-900 dark:text-white pt-4">
            The Thought That Started Everything
          </h2>

          <p>
            Sitting there frustrated, I had one clear thought — <strong>I am a developer.
            I know how background removal works. It is not magic. Why is everyone
            hiding it behind a paywall?</strong>
          </p>

          <p>
            And then the second thought — if I am going through this, how many other
            students are going through the exact same thing? How many people are filling
            out job applications, government forms, college admission documents — and
            getting stuck at this same stupid step?
          </p>

          <p>
            That day I started working on a background remover. No paywall. No signup.
            No watermark. Just upload, remove background, download. Done.
          </p>

          <h2 className="text-2xl font-black text-slate-900 dark:text-white pt-4">
            July to August 2025 — Building TaskGuru
          </h2>

          <p>
            I started building in July 2025. The background remover was the first tool.
            By August 2025, I had an early version of TaskGuru live — with the background
            remover as the main feature.
          </p>

          <p>
            Everything runs in your browser. Your photo never goes to any server. The
            AI processes it locally on your device — so there are zero privacy concerns.
            That part was important to me because I was uploading my own face to these
            sites and had no idea where those images were going.
          </p>

          <p>
            The scholarship form? I submitted it the same week I launched the tool.
            White background, clean edges, no watermark, no payment, no signup.
            Exactly what I needed forty minutes earlier.
          </p>

          <h2 className="text-2xl font-black text-slate-900 dark:text-white pt-4">
            Why This Story Matters
          </h2>

          <p>
            I tell this story because I think it explains why TaskGuru exists better
            than any marketing copy could. Every tool on this site was built because
            someone — usually me — needed it and could not find a free version that
            actually worked without strings attached.
          </p>

          <p>
            The background remover was first. Then came the PDF tools, the image
            compressor, the OCR tool, the resume builder. Each one has a similar story
            behind it — a real need, a frustrating paywall, and a decision to just
            build the solution instead.
          </p>

          <p>
            If you are a student, a job seeker, a small business owner, or just someone
            who needs to get something done without paying for yet another subscription —
            TaskGuru was built for you.
          </p>

          <div className="p-5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl mt-8">
            <p className="font-bold text-slate-900 dark:text-white mb-1 text-sm">Shubham Gautam</p>
            <p className="text-xs text-slate-500">
              Founder, TaskGuru · B.Tech IT, Axis Institute Kanpur (AKTU) · Started July 2025 · Made in India 🇮🇳
            </p>
          </div>

          {/* CTA */}
          <div className="p-5 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl">
            <p className="font-bold text-slate-900 dark:text-white mb-2 text-sm">
              Try the Free Background Remover
            </p>
            <p className="text-xs text-slate-500 mb-3">
              No signup. No watermark. No payment. Works on any device.
            </p>
            <Link
              href="/tools/background-remover"
              className="inline-block px-5 py-2.5 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl transition-colors text-sm"
            >
              Remove Background Free →
            </Link>
          </div>

          {/* Related */}
          <div className="pt-8 border-t border-slate-200 dark:border-slate-700">
            <h3 className="text-base font-black text-slate-900 dark:text-white mb-4">
              More from TaskGuru
            </h3>
            <div className="grid md:grid-cols-2 gap-3">
              {[
                { title: 'Why I Built TaskGuru', href: '/blog/why-i-built-taskguru' },
                { title: 'Free Image Compressor', href: '/tools/image-compressor' },
                { title: 'Free PDF to Word', href: '/tools/pdf-to-word' },
                { title: 'Free Resume Maker', href: '/tools/resume-maker' },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-red-400 transition-colors group"
                >
                  <p className="font-semibold text-sm text-slate-900 dark:text-white group-hover:text-red-600 transition-colors">
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
