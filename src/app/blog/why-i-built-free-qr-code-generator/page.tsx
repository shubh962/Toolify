// src/app/blog/why-i-built-free-qr-code-generator/page.tsx
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'From Paytm to Project Submissions — Why I Built a Free QR Code Generator | TaskGuru',
  description:
    'I used QR codes since 2016 for Paytm payments. But when I needed to generate a free QR code for my college project, every tool either charged money or gave QR codes that did not even scan.',
  alternates: {
    canonical: 'https://www.taskguru.online/blog/why-i-built-free-qr-code-generator',
  },
  openGraph: {
    title: 'From Paytm to Project Submissions — Why I Built a Free QR Code Generator',
    description:
      'A real story about college projects, broken QR codes, and why free QR code generators are not actually free.',
    url: 'https://www.taskguru.online/blog/why-i-built-free-qr-code-generator',
    type: 'article',
  },
};

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'From Paytm to Project Submissions — Why I Built a Free QR Code Generator',
  description:
    'A real story about a developer who used QR codes since 2016 but could not find a free QR code generator that actually worked without payment or signup.',
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
  datePublished: '2025-10-15',
  dateModified: '2025-10-15',
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://www.taskguru.online/blog/why-i-built-free-qr-code-generator',
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
          <span className="text-slate-700 dark:text-slate-300">Why I Built Free QR Generator</span>
        </nav>

        {/* HERO */}
        <header className="mb-10">
          <div className="inline-block px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-black uppercase tracking-wider rounded-full mb-5">
            Founder Story
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white leading-tight mb-4">
            From Paytm Payments to Broken QR Codes — Why I Built a Free QR Code Generator
          </h1>
          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500 dark:text-slate-400 mb-6">
            <span>By <strong className="text-slate-700 dark:text-slate-300">Shubham Gautam</strong></span>
            <span>·</span>
            <span>Founder, TaskGuru</span>
            <span>·</span>
            <time dateTime="2025-10-15">October 15, 2025</time>
          </div>

          {/* Author card */}
          <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl">
            <div className="w-12 h-12 rounded-full bg-slate-800 dark:bg-slate-600 flex items-center justify-center text-white font-black text-lg flex-shrink-0">
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
            I have been using QR codes since 2016 — back when Paytm made them the default
            way to pay for everything in India. Scan, pay, done. Simple. I never thought
            much about how they worked or how they were made. They were just there, and they
            worked.
          </p>

          <p>
            That changed during my college project submission.
          </p>

          <h2 className="text-2xl font-black text-slate-900 dark:text-white pt-4">
            The College Project Problem
          </h2>

          <p>
            Our project required us to store data in a QR code — basically generate a
            custom QR code that contained specific project details. I thought this would
            be straightforward. I opened Excel first, thinking there might be a built-in
            option. There was not. I struggled with it for a while, tried a few workarounds,
            nothing worked cleanly.
          </p>

          <p>
            So I went to YouTube. Searched &quot;how to make free QR code.&quot; YouTube recommended
            several websites. I clicked the first one, entered my data, generated the QR code.
            Looked fine. Then I tried to download it.
          </p>

          <p>
            <em>Sign up to download.</em>
          </p>

          <p>
            Next site. Generated the QR code. Clicked download.
          </p>

          <p>
            <em>Upgrade to Pro — ₹399/month.</em>
          </p>

          <p>
            Fine. Third site — this one actually let me download for free. I printed it,
            went to scan it with my phone to verify it worked before submission.
          </p>

          <p>
            It did not scan.
          </p>

          <div className="p-5 bg-slate-50 dark:bg-slate-800 border-l-4 border-slate-400 rounded-r-2xl my-6">
            <p className="text-sm text-slate-700 dark:text-slate-300 italic leading-relaxed">
              &quot;The QR code looked perfect. Clean, sharp, properly sized.
              But every scanner I tried just could not read it.
              A free QR code generator that generates broken QR codes
              is not a free QR code generator — it is a waste of time.&quot;
            </p>
          </div>

          <h2 className="text-2xl font-black text-slate-900 dark:text-white pt-4">
            The Decision to Build My Own
          </h2>

          <p>
            At this point I had spent more time searching for a working free QR code generator
            than the actual task would have taken me to code manually. I am a full stack
            developer. I know how QR codes work technically. The encoding standards are
            open. There is no reason a basic QR code generator should be behind a paywall
            or produce broken output.
          </p>

          <p>
            I already had TaskGuru running at this point with the background remover and
            the text paraphraser. Adding a QR code generator was a natural next step.
            I built it, tested it thoroughly — scanning the output from multiple devices
            and apps before considering it done — and added it to the site.
          </p>

          <p>
            <strong>Free. No login. No signup. Generates a QR code in seconds.
            Downloads as a clean PNG. And most importantly — it actually scans.</strong>
          </p>

          <h2 className="text-2xl font-black text-slate-900 dark:text-white pt-4">
            Then My Friend Needed a Barcode
          </h2>

          <p>
            Around the same time, a friend of mine was dealing with a similar problem.
            He needed to encode an identity number in a barcode — the kind you see on
            product packaging and ID cards. He had been struggling with it for a while,
            trying different tools, hitting the same walls I had hit with QR codes.
            Paywalls. Signups. Tools that generated barcodes that scanners could not read.
          </p>

          <p>
            He came to me asking if I knew a reliable free option. I did not — at that
            moment. But I had just built a QR code generator. Adding barcode support
            to the same tool made complete sense.
          </p>

          <p>
            So the tool became a <strong>QR code and barcode generator</strong> — both
            in one place. Generate a QR code for a URL, a WiFi network, contact details,
            or any text. Generate barcodes in EAN, UPC, CODE128 formats. All free.
            All working. All downloadable without an account.
          </p>

          <h2 className="text-2xl font-black text-slate-900 dark:text-white pt-4">
            What Makes a Good Free QR Code Generator
          </h2>

          <p>
            After going through all those broken tools, I had a clear idea of what a
            genuinely useful free QR code generator needs:
          </p>

          <div className="space-y-3 my-4">
            {[
              { point: 'It must actually scan', desc: 'Sounds obvious but apparently is not. Every QR code generated by TaskGuru is tested to work with standard smartphone cameras and scanning apps.' },
              { point: 'No login wall', desc: 'You should not need an account to generate a QR code. It is a utility, not a subscription service.' },
              { point: 'High resolution download', desc: 'A QR code that looks pixelated when printed is useless. TaskGuru generates clean PNG files suitable for both screen and print use.' },
              { point: 'Multiple formats', desc: 'Sometimes you need a QR code. Sometimes you need a barcode. Both should be available in the same tool without switching sites.' },
            ].map((item) => (
              <div key={item.point} className="flex gap-3 p-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl">
                <span className="text-green-500 font-black flex-shrink-0 mt-0.5">✓</span>
                <div>
                  <p className="font-bold text-slate-900 dark:text-white text-sm mb-0.5">{item.point}</p>
                  <p className="text-xs leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-black text-slate-900 dark:text-white pt-4">
            For Anyone Who Has Searched &quot;Free QR Code Generator&quot;
          </h2>

          <p>
            If you have ever typed &quot;free QR code generator online&quot; into Google and spent
            20 minutes going through sites that charge money, require signups, or generate
            codes that do not actually work — I built this tool for you.
          </p>

          <p>
            One tool. QR codes and barcodes. Free. No account. Works. Downloads instantly.
            That is it.
          </p>

          <div className="p-5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl mt-8">
            <p className="font-bold text-slate-900 dark:text-white mb-1 text-sm">Shubham Gautam</p>
            <p className="text-xs text-slate-500">
              Founder, TaskGuru · B.Tech IT, Axis Institute Kanpur (AKTU) · Made in India 🇮🇳
            </p>
          </div>

          {/* CTA */}
          <div className="p-5 bg-slate-900 dark:bg-slate-800 rounded-2xl">
            <p className="font-bold text-white mb-2 text-sm">
              ⬛ Free QR Code & Barcode Generator
            </p>
            <p className="text-xs text-slate-400 mb-3">
              Generate QR codes and barcodes in seconds. No login. No payment. High resolution PNG download.
            </p>
            <Link
              href="/tools/qr-barcode-generator"
              className="inline-block px-5 py-2.5 bg-white text-slate-900 font-bold rounded-xl hover:bg-slate-100 transition-colors text-sm"
            >
              Create QR Code Free →
            </Link>
          </div>

          {/* Related */}
          <div className="pt-8 border-t border-slate-200 dark:border-slate-700">
            <h3 className="text-base font-black text-slate-900 dark:text-white mb-4">
              Related Stories & Tools
            </h3>
            <div className="grid md:grid-cols-2 gap-3">
              {[
                { title: 'Why I Built TaskGuru', href: '/blog/why-i-built-taskguru' },
                { title: 'Free Background Remover Story', href: '/blog/why-free-background-remover' },
                { title: 'What is a QR Code?', href: '/blog/what-is-a-qr-code' },
                { title: 'Free Image Compressor', href: '/tools/image-compressor' },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-slate-400 transition-colors group"
                >
                  <p className="font-semibold text-sm text-slate-900 dark:text-white group-hover:text-slate-600 transition-colors">
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
