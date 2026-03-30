// src/app/blog/why-i-built-free-resume-maker/page.tsx
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Placement Season, MS Word Frustration, and Why I Built a Free Resume Maker | TaskGuru',
  description:
    'A B-Tech 3rd year student needed a resume for placement season. MS Word was too complex, websites had paywalls, and apps asked money to download. So he built his own free resume maker.',
  alternates: {
    canonical: 'https://www.taskguru.online/blog/why-i-built-free-resume-maker',
  },
  openGraph: {
    title: 'Placement Season, MS Word Frustration, and Why I Built a Free Resume Maker',
    description:
      'A real story about placement season, resume paywalls, and spam ads — and why a B-Tech student decided to build his own free resume builder.',
    url: 'https://www.taskguru.online/blog/why-i-built-free-resume-maker',
    type: 'article',
  },
};

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Placement Season, MS Word Frustration, and Why I Built a Free Resume Maker',
  description:
    'A real story about a B-Tech student who needed a resume for placement season and every tool either charged money or bombarded with spam ads.',
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
  datePublished: '2025-11-20',
  dateModified: '2025-11-20',
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://www.taskguru.online/blog/why-i-built-free-resume-maker',
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
          <span className="text-slate-700 dark:text-slate-300">Why I Built Free Resume Maker</span>
        </nav>

        {/* HERO */}
        <header className="mb-10">
          <div className="inline-block px-3 py-1 bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 text-xs font-black uppercase tracking-wider rounded-full mb-5">
            Founder Story
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white leading-tight mb-4">
            Placement Season, MS Word Frustration, and Why I Built a Free Resume Maker
          </h1>
          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500 dark:text-slate-400 mb-6">
            <span>By <strong className="text-slate-700 dark:text-slate-300">Shubham Gautam</strong></span>
            <span>·</span>
            <span>Founder, TaskGuru</span>
            <span>·</span>
            <time dateTime="2025-11-20">November 20, 2025</time>
          </div>

          {/* Author card */}
          <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl">
            <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center text-white font-black text-lg flex-shrink-0">
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
            Third year of B.Tech. Placement season had started. Companies were coming
            to campus. Every student needed one thing — a resume. A clean, professional,
            properly formatted resume that would not get rejected in the first five seconds.
          </p>

          <p>
            I sat down to make mine. Should be simple. I am an IT student — documents
            are kind of our thing.
          </p>

          <h2 className="text-2xl font-black text-slate-900 dark:text-white pt-4">
            MS Word — Too Complex for a Simple Task
          </h2>

          <p>
            First I opened MS Word. There are resume templates built in — I had heard.
            Found them. Clicked one. It opened with placeholder text everywhere, linked
            text boxes that broke when I tried to edit them, formatting that shifted
            every time I added a line. I spent an hour trying to make it look decent.
            The alignment kept going off. Margins were inconsistent. Every time I fixed
            one thing something else moved.
          </p>

          <p>
            MS Word is powerful — but for someone who just wants a clean resume without
            spending an hour fighting with text boxes, it is unnecessarily complex.
          </p>

          <h2 className="text-2xl font-black text-slate-900 dark:text-white pt-4">
            Online Resume Builders — Paywalls and Spam
          </h2>

          <p>
            I gave up on Word and searched for free resume builder online. Clicked the
            first result. The interface was clean. I filled in my details — name,
            education, skills, projects. The preview looked great. Professional,
            well-formatted, exactly what I needed.
          </p>

          <p>
            Clicked download.
          </p>

          <p>
            <em>Upgrade to Premium to download. ₹699/month.</em>
          </p>

          <p>
            Next site. This one had a free download option. I filled in everything again —
            because of course there was no way to carry my data from the previous site.
            Clicked download. A PDF started generating. Then the site redirected me to
            an ad. Then another ad. Then a popup asking me to install an app. By the time
            I got back to my resume, the session had timed out and my data was gone.
          </p>

          <p>
            I downloaded an app from the Play Store. Better experience — until it asked
            for money to remove the watermark from the downloaded PDF. A resume with a
            watermark is not a resume you can send to a company.
          </p>

          <div className="p-5 bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-500 rounded-r-2xl my-6">
            <p className="text-sm text-slate-700 dark:text-slate-300 italic leading-relaxed">
              &quot;Every single option either charged money, showed spam ads,
              or put a watermark on the final PDF. Making a resume —
              something every student and job seeker needs — had
              become an obstacle course.&quot;
            </p>
          </div>

          <h2 className="text-2xl font-black text-slate-900 dark:text-white pt-4">
            Building It During College Hours
          </h2>

          <p>
            I had TaskGuru running at this point with a few tools already live. I decided
            to build a resume maker and add it to the site. Not a fancy AI resume writer —
            just a clean, straightforward builder where you fill in your details and get
            a properly formatted PDF. No watermark. No payment. No account required.
          </p>

          <p>
            I worked on it in parallel — during college hours when I had free periods,
            and after college in the evenings. It took time to get the PDF formatting
            right. Resume layout looks simple but getting it to render consistently across
            different devices and screen sizes required a lot of testing.
          </p>

          <p>
            Eventually I got it working. I deployed it, made it searchable on Google,
            and added it to TaskGuru. Clean templates. Fill in your details. Download
            as PDF. No money. No watermark. No spam.
          </p>

          <h2 className="text-2xl font-black text-slate-900 dark:text-white pt-4">
            Why This Tool Matters More Than Most
          </h2>

          <p>
            A resume is not optional. If you are a student looking for an internship,
            a fresh graduate applying for your first job, or someone switching careers —
            you need one. And you should not have to pay for the basic ability to
            create and download it.
          </p>

          <p>
            The students who can least afford subscriptions are often the ones who need
            a good resume the most. That felt wrong to me. So I built the free version.
          </p>

          <p>
            The TaskGuru resume maker is not the most feature-rich builder on the internet.
            But it does what matters — gives you a clean, <strong>ATS-friendly resume</strong>
            that you can download as a PDF without paying anyone anything. Built by a
            student who went through the same frustration, for every student going through
            the same thing.
          </p>

          <div className="p-5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl mt-8">
            <p className="font-bold text-slate-900 dark:text-white mb-1 text-sm">Shubham Gautam</p>
            <p className="text-xs text-slate-500">
              Founder, TaskGuru · B.Tech IT, Axis Institute Kanpur (AKTU) · Made in India 🇮🇳
            </p>
          </div>

          {/* CTA */}
          <div className="p-5 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-2xl">
            <p className="font-bold text-slate-900 dark:text-white mb-2 text-sm">
              Build Your Resume — Free, No Watermark
            </p>
            <p className="text-xs text-slate-500 mb-3">
              Fill in your details, pick a template, download as PDF. No account. No payment. No watermark.
            </p>
            <Link
              href="/tools/resume-maker"
              className="inline-block px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl transition-colors text-sm"
            >
              Create Resume Free →
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
                { title: '5 Hidden ATS Resume Secrets', href: '/blog/resume-ats-secrets' },
                { title: 'How to Make Resume With No Experience', href: '/blog/how-to-make-resume-with-no-experience' },
                { title: 'Free PDF to Word Converter', href: '/tools/pdf-to-word' },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-purple-400 transition-colors group"
                >
                  <p className="font-semibold text-sm text-slate-900 dark:text-white group-hover:text-purple-600 transition-colors">
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
