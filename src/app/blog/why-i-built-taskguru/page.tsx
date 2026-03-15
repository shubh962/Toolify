// src/app/blog/why-i-built-taskguru/page.tsx
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Why I Built TaskGuru — The Story Behind the Free Tools | Shubham Gautam',
  description:
    'The personal story of how a B-Tech IT graduate from Kanpur built TaskGuru in 2025 — frustrated by paywalls, signup walls, and overpriced tools that should be free.',
  alternates: {
    canonical: 'https://www.taskguru.online/blog/why-i-built-taskguru',
  },
  openGraph: {
    title: 'Why I Built TaskGuru — The Story Behind the Free Tools',
    description:
      'How frustration with paywalls and signup walls led to building a free, private, browser-based productivity platform from scratch.',
    url: 'https://www.taskguru.online/blog/why-i-built-taskguru',
    type: 'article',
  },
};

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Why I Built TaskGuru — The Story Behind the Free Tools',
  description:
    'The personal story of how a B-Tech IT graduate from Kanpur built TaskGuru in 2025 — frustrated by paywalls, signup walls, and overpriced tools.',
  author: {
    '@type': 'Person',
    name: 'Shubham Gautam',
    url: 'https://www.taskguru.online/about',
    jobTitle: 'Developer & Founder, TaskGuru',
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'Axis Institute of Technology and Management, Kanpur (AKTU)',
    },
  },
  publisher: {
    '@type': 'Organization',
    name: 'TaskGuru',
    logo: { '@type': 'ImageObject', url: 'https://www.taskguru.online/logo.png' },
  },
  datePublished: '2025-11-01',
  dateModified: '2026-03-14',
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://www.taskguru.online/blog/why-i-built-taskguru',
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
          <span className="text-slate-700 dark:text-slate-300">Founder Story</span>
        </nav>

        {/* HERO */}
        <header className="mb-10">
          <div className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs font-black uppercase tracking-wider rounded-full mb-5">
            Founder Story
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white leading-tight mb-4">
            Why I Built TaskGuru
            <span className="block text-lg md:text-xl font-semibold text-slate-400 dark:text-slate-500 mt-2">
              The story behind the free tools — by Shubham Gautam
            </span>
          </h1>
          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500 dark:text-slate-400 mb-6">
            <span>By <strong className="text-slate-700 dark:text-slate-300">Shubham Gautam</strong></span>
            <span>·</span>
            <span>Founder, TaskGuru</span>
            <span>·</span>
            <time dateTime="2025-11-01">November 2025</time>
          </div>

          {/* Author card */}
          <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl">
            <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-black text-lg flex-shrink-0">
              S
            </div>
            <div>
              <p className="font-bold text-slate-900 dark:text-white text-sm">Shubham Gautam</p>
              <p className="text-xs text-slate-500">B.Tech IT — Axis Institute, Kanpur (AKTU) · Developer & Founder</p>
            </div>
          </div>
        </header>

        {/* BODY */}
        <div className="space-y-6 text-slate-700 dark:text-slate-300 leading-relaxed text-base">

          <p>
            Let me be honest with you — TaskGuru was not born out of a grand business plan or
            a startup vision. It was born out of pure frustration.
          </p>

          <p>
            It was 2025. I had just finished my B.Tech in Information Technology from Axis
            Institute of Technology and Management, Kanpur — affiliated with AKTU. Like most
            fresh graduates, I was working on personal projects, building things, learning by
            doing. And constantly — <em>constantly</em> — running into the same wall.
          </p>

          <h2 className="text-2xl font-black text-slate-900 dark:text-white pt-4">
            The Paywall Problem
          </h2>

          <p>
            I needed to remove a background from an image. Simple task, right? I went to the
            first tool that showed up on Google. It processed my image beautifully — and then
            showed me a blurred download button behind a paywall. &quot;Upgrade to Pro for ₹999/month.&quot;
          </p>

          <p>
            Fine. I tried another site. This one wanted me to create an account first. Email
            verification. Then it asked for my phone number. Just to remove a background.
          </p>

          <p>
            A third site had a &quot;free&quot; option — but it slapped a massive watermark across
            my image. Useless for anything professional.
          </p>

          <p>
            I remember thinking — <strong>why is this so hard?</strong> This is basic image
            processing. The technology exists. It is not expensive to run. Why is everyone
            hiding it behind walls?
          </p>

          <div className="p-5 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 rounded-r-2xl my-6">
            <p className="text-sm text-slate-700 dark:text-slate-300 italic leading-relaxed">
              &quot;I was a developer. I knew how these tools worked technically.
              The gap between what was possible and what was freely available
              to regular users felt wrong to me.&quot;
            </p>
          </div>

          <h2 className="text-2xl font-black text-slate-900 dark:text-white pt-4">
            The First Tool
          </h2>

          <p>
            So I built it myself. The very first TaskGuru tool was the
            <strong> AI Background Remover</strong> — the exact tool I had been trying to
            use that day. No paywall. No signup. No watermark. Just upload, process, download.
          </p>

          <p>
            I built it to solve my own problem first. But I quickly realized this was not just
            my problem — it was everyone&apos;s problem. Students trying to make professional
            photos for their resumes. Small business owners editing product images. Freelancers
            working on tight deadlines. Everyone was hitting the same walls.
          </p>

          <p>
            So I kept building.
          </p>

          <h2 className="text-2xl font-black text-slate-900 dark:text-white pt-4">
            Building Alone — The Real Challenge
          </h2>

          <p>
            I built TaskGuru completely alone. No co-founder, no team, no funding. Just me,
            my laptop, and a lot of late nights.
          </p>

          <p>
            The biggest challenge was not the coding — it was the <strong>debugging</strong>.
            Every tool had its own set of edge cases. A PDF that works perfectly in Chrome
            breaks in Safari. An image that compresses fine at 2MB throws an error at 4MB.
            A background removal that works on a white background fails on a complex scene.
          </p>

          <p>
            I spent more time debugging than building. But every bug I fixed made the tool
            more reliable for real users — and that kept me going.
          </p>

          <p>
            The second challenge was <strong>getting impressions</strong>. Building something
            is one thing. Getting people to find it and trust it is completely different.
            A new site from an unknown developer — why would anyone trust it with their files?
          </p>

          <p>
            The answer I chose was simple: <strong>do not ask for trust, earn it by design.</strong>
            Every TaskGuru tool processes files locally in your browser. Your files never reach
            my servers. I cannot see them even if I wanted to. That is not a marketing claim —
            it is how the code works.
          </p>

          <h2 className="text-2xl font-black text-slate-900 dark:text-white pt-4">
            What TaskGuru Is Today
          </h2>

          <p>
            TaskGuru now has 15+ free tools — PDF converters, image editors, text rewriters,
            resume builders, calculators, and more. Every single one is free. No signup.
            No watermark. No paywall.
          </p>

          <p>
            The site also has a companion app on the <strong>Amazon Appstore</strong> — something
            I never imagined when I built that first background remover tool.
          </p>

          <p>
            But the core mission has never changed from that frustrated afternoon in 2025:
            <strong> basic digital tools should be free, private, and accessible to everyone</strong> —
            whether you are a student in Kanpur, a freelancer in Mumbai, or a small business
            owner anywhere in the world.
          </p>

          <h2 className="text-2xl font-black text-slate-900 dark:text-white pt-4">
            Why I Am Telling You This
          </h2>

          <p>
            Because I want TaskGuru to feel like more than just a website. Behind every tool
            is a real person who built it to solve a real problem. When you use TaskGuru,
            you are not using some faceless corporate product — you are using something built
            by a developer who was sitting exactly where you are, frustrated by the same
            paywalls and signup walls.
          </p>

          <p>
            If TaskGuru saves you five minutes today — that is enough for me.
          </p>

          <div className="p-5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl mt-8">
            <p className="font-bold text-slate-900 dark:text-white mb-1 text-sm">Shubham Gautam</p>
            <p className="text-xs text-slate-500">Founder, TaskGuru · B.Tech IT, Axis Institute Kanpur (AKTU) · Made in India 🇮🇳</p>
          </div>

          {/* Related */}
          <div className="pt-8 border-t border-slate-200 dark:border-slate-700">
            <h3 className="text-base font-black text-slate-900 dark:text-white mb-4">
              Explore TaskGuru Tools
            </h3>
            <div className="grid md:grid-cols-2 gap-3">
              {[
                { title: 'Free AI Background Remover', href: '/tools/background-remover' },
                { title: 'Free PDF to Word Converter', href: '/tools/pdf-to-word' },
                { title: 'Free Image Compressor', href: '/tools/image-compressor' },
                { title: 'Free Resume Maker', href: '/tools/resume-maker' },
              ].map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-blue-400 transition-colors group"
                >
                  <p className="font-semibold text-sm text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                    {tool.title} →
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
