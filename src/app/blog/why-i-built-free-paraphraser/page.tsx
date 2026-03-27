// src/app/blog/why-i-built-free-paraphraser/page.tsx
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My B-Tech Project Report and Why I Built a Free Paraphrasing Tool | TaskGuru',
  description:
    'A B-Tech final year student needed to paraphrase his project report. Every free tool had grammar errors, word limits, and paywalls. So he built his own — free, no login, instant.',
  alternates: {
    canonical: 'https://www.taskguru.online/blog/why-i-built-free-paraphraser',
  },
  openGraph: {
    title: 'My B-Tech Project Report and Why I Built a Free Paraphrasing Tool',
    description:
      'A real story about broken English, project deadlines, and why every free paraphrase online tool is not actually free.',
    url: 'https://www.taskguru.online/blog/why-i-built-free-paraphraser',
    type: 'article',
  },
};

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'My B-Tech Project Report and Why I Built a Free Paraphrasing Tool',
  description:
    'A real story about a B-Tech student who needed to paraphrase his project report and every free paraphrasing tool either had grammar errors, word limits, or charged money.',
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
  datePublished: '2025-09-10',
  dateModified: '2025-09-10',
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://www.taskguru.online/blog/why-i-built-free-paraphraser',
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
          <span className="text-slate-700 dark:text-slate-300">Why I Built Free Paraphraser</span>
        </nav>

        {/* HERO */}
        <header className="mb-10">
          <div className="inline-block px-3 py-1 bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 text-xs font-black uppercase tracking-wider rounded-full mb-5">
            Founder Story
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white leading-tight mb-4">
            My B-Tech Project Report, Broken English, and Why I Built a Free Paraphrasing Tool
          </h1>
          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500 dark:text-slate-400 mb-6">
            <span>By <strong className="text-slate-700 dark:text-slate-300">Shubham Gautam</strong></span>
            <span>·</span>
            <span>Founder, TaskGuru</span>
            <span>·</span>
            <time dateTime="2025-09-10">September 10, 2025</time>
          </div>

          {/* Author card */}
          <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl">
            <div className="w-12 h-12 rounded-full bg-green-600 flex items-center justify-center text-white font-black text-lg flex-shrink-0">
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
            Final year of B.Tech. Project report submission coming up. I had done the actual
            work — the coding, the testing, the documentation. But when I read back what I
            had written, the English was rough. Sentences that made sense in my head but
            looked awkward on paper. Technical content that needed to sound more professional
            for a formal academic report.
          </p>

          <p>
            I needed to <strong>paraphrase a paragraph</strong> — actually, several paragraphs.
            Rewrite them in cleaner, more professional English without changing the meaning.
            Simple enough task, I thought.
          </p>

          <h2 className="text-2xl font-black text-slate-900 dark:text-white pt-4">
            The Problem With &quot;Free&quot; Paraphrasing Tools
          </h2>

          <p>
            I searched &quot;paraphrase online free&quot; and clicked the first result. Pasted my
            paragraph. The tool processed it and gave me back — honestly — something worse
            than what I had written. Grammar mistakes that were not in my original. Sentences
            that did not make sense. It had changed the words but broken the meaning completely.
          </p>

          <p>
            Okay, different tool. This one looked more professional. Better interface. I pasted
            my text, clicked paraphrase, and the result was actually decent. I went to copy it —
          </p>

          <p>
            <em>Subscribe to copy. ₹499/month.</em>
          </p>

          <p>
            For a final year student with a deadline the next morning, paying for a
            paraphrasing subscription was not an option. I tried another tool. This one
            had a free tier — but a 200 word limit. My report sections were 400-500 words
            each. I would have to split everything, paraphrase in chunks, reassemble.
            What should have been a 10 minute job was turning into an hour of juggling
            multiple tabs and copy-pasting.
          </p>

          <div className="p-5 bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 rounded-r-2xl my-6">
            <p className="text-sm text-slate-700 dark:text-slate-300 italic leading-relaxed">
              &quot;A 10 minute job had turned into an hour of frustration.
              Paywalls, word limits, grammar errors — all from tools
              that called themselves free.&quot;
            </p>
          </div>

          <h2 className="text-2xl font-black text-slate-900 dark:text-white pt-4">
            The Thought That Changed Everything
          </h2>

          <p>
            Sitting there frustrated, I had a thought — <strong>I already have a website.
            TaskGuru already has a background remover. Could I add a text paraphraser
            as the next tool?</strong>
          </p>

          <p>
            I knew it would take time to build properly. But the problem I was facing was
            real — and I was certain thousands of other students were facing the exact same
            thing every day. B.Tech students writing project reports. College students
            working on essays. Content writers trying to rephrase online for free.
            Everyone hitting the same walls — grammar errors, word limits, paywalls.
          </p>

          <h2 className="text-2xl font-black text-slate-900 dark:text-white pt-4">
            Building the Paraphraser
          </h2>

          <p>
            I started working on the text paraphraser after the background remover was stable.
            It took longer than expected — debugging AI integrations always does. Getting the
            output to actually make sense, preserve meaning, fix grammar instead of breaking
            it — all of that required a lot of testing and iteration.
          </p>

          <p>
            But eventually it was ready. And when I tested it on those same project report
            paragraphs that had frustrated me — it worked. Clean output. No grammar errors.
            Meaning preserved. Professional English. And most importantly — <strong>completely
            free, no login required, no word limit.</strong>
          </p>

          <p>
            What had taken me 10 minutes of struggling and tab-switching now took
            literally 2 seconds.
          </p>

          <h2 className="text-2xl font-black text-slate-900 dark:text-white pt-4">
            Why No Login Wall Matters
          </h2>

          <p>
            Most paraphrasing tools make you create an account before you can use them
            properly. I deliberately did not do this with TaskGuru. When you are a student
            at 11pm trying to finish a report due tomorrow, you do not want to verify an
            email address. You want to <strong>paraphrase your paragraph</strong> and get
            back to work.
          </p>

          <p>
            No login. No signup. No email verification. Just paste your text, click
            paraphrase, copy the result. Done.
          </p>

          <h2 className="text-2xl font-black text-slate-900 dark:text-white pt-4">
            Two Tools, One Mission
          </h2>

          <p>
            By the time the paraphraser launched, TaskGuru had two tools — the background
            remover and the text paraphraser. Both born from the same frustration. Both
            solving real problems that students and professionals face every day. Both
            completely free with no login wall.
          </p>

          <p>
            These two tools are still the heart of TaskGuru. The background remover brings
            in users who need professional photos without expensive software. The paraphraser
            brings in students, writers, and content creators who need to <strong>rephrase
            online free</strong> without hitting a paywall every time.
          </p>

          <p>
            If you have ever searched &quot;paraphrase essay free&quot; or &quot;paraphrase a paragraph
            online&quot; and hit a wall — this tool was built specifically for that moment.
          </p>

          <div className="p-5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl mt-8">
            <p className="font-bold text-slate-900 dark:text-white mb-1 text-sm">Shubham Gautam</p>
            <p className="text-xs text-slate-500">
              Founder, TaskGuru · B.Tech IT, Axis Institute Kanpur (AKTU) · Made in India 🇮🇳
            </p>
          </div>

          {/* CTA */}
          <div className="p-5 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl">
            <p className="font-bold text-slate-900 dark:text-white mb-2 text-sm">
              Try the Free AI Paraphraser
            </p>
            <p className="text-xs text-slate-500 mb-3">
              No login. No word limit. No payment. Paraphrase any paragraph in 2 seconds.
            </p>
            <Link
              href="/tools/text-paraphraser"
              className="inline-block px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition-colors text-sm"
            >
              Paraphrase Free Now →
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
                { title: 'How to Paraphrase Text', href: '/blog/how-to-paraphrase-text' },
                { title: 'Free Resume Maker', href: '/tools/resume-maker' },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-green-400 transition-colors group"
                >
                  <p className="font-semibold text-sm text-slate-900 dark:text-white group-hover:text-green-600 transition-colors">
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

