// src/app/blog/how-to-make-resume-with-no-experience/page.tsx
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How to Make a Resume With No Experience (2026 Guide) | TaskGuru',
  description:
    'Learn how to write a professional resume with no work experience in 2026. Step-by-step guide for students, fresh graduates, and career changers — with free templates.',
  alternates: {
    canonical: 'https://www.taskguru.online/blog/how-to-make-resume-with-no-experience',
  },
  openGraph: {
    title: 'How to Make a Resume With No Experience (2026 Guide)',
    description:
      'A complete guide to writing a resume when you have no work experience — covering skills, education, projects, and free ATS-friendly templates.',
    url: 'https://www.taskguru.online/blog/how-to-make-resume-with-no-experience',
    type: 'article',
  },
};

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'How to Make a Resume With No Experience (2026 Guide)',
  description:
    'A complete step-by-step guide to writing a professional resume with no work experience — for students, fresh graduates, and career changers.',
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
    '@id': 'https://www.taskguru.online/blog/how-to-make-resume-with-no-experience',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Can I make a resume with no work experience?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. A resume with no work experience should focus on education, skills, projects, volunteer work, certifications, and extracurricular activities. Employers understand that entry-level candidates lack work history and look for potential instead.',
      },
    },
    {
      '@type': 'Question',
      name: 'What should I put on a resume if I have no experience?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Include your education details, relevant skills (both technical and soft), personal or academic projects, volunteer experience, internships, certifications, and a strong professional summary that highlights your potential and enthusiasm.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long should a resume be for someone with no experience?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'One page is the standard for entry-level resumes. Keep it concise and focused. Recruiters spend an average of 7 seconds scanning a resume — a clean, scannable one-pager is always better than a padded two-pager.',
      },
    },
    {
      '@type': 'Question',
      name: 'Should I include a cover letter with no experience?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes — a cover letter is even more important when you lack experience. It gives you space to explain your enthusiasm, what you have learned through education and projects, and why you are a strong fit despite limited work history.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is an ATS and why does it matter for my resume?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'ATS stands for Applicant Tracking System. Most companies use ATS software to automatically filter resumes before a human sees them. An ATS-friendly resume uses standard formatting, clear headings, and keywords from the job description to pass these automated filters.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is it okay to list school projects on a resume?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Absolutely. Academic projects, capstone projects, and personal side projects demonstrate real skills and initiative. Describe what you built, what technologies or methods you used, and what the outcome was — just like you would for a real job.',
      },
    },
  ],
};

const TOC = [
  { href: '#reality-check', label: 'The Reality Check: Everyone Starts Here' },
  { href: '#what-to-include', label: 'What to Include Instead of Work Experience' },
  { href: '#structure', label: 'The Best Resume Structure for Beginners' },
  { href: '#summary', label: 'How to Write a Powerful Summary with No Experience' },
  { href: '#skills', label: 'Which Skills to List (and How)' },
  { href: '#ats', label: 'Making Your Resume ATS-Friendly' },
  { href: '#mistakes', label: 'Common Mistakes to Avoid' },
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
          <span className="text-slate-700 dark:text-slate-300">Resume Writing</span>
        </nav>

        {/* HERO */}
        <header className="mb-10">
          <div className="inline-block px-3 py-1 bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 text-xs font-black uppercase tracking-wider rounded-full mb-5">
            Career Hacking
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight mb-4">
            How to Make a Resume With No Experience
            <span className="block text-xl md:text-2xl font-semibold text-slate-400 dark:text-slate-500 mt-2">
              The Complete 2026 Guide for Students & Fresh Graduates
            </span>
          </h1>
          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500 dark:text-slate-400 mb-8">
            <span>By <strong className="text-slate-700 dark:text-slate-300">Shubham Gautam</strong></span>
            <span>·</span>
            <time dateTime="2026-03-14">March 14, 2026</time>
            <span>·</span>
            <span>9 min read</span>
          </div>

          {/* Quick Answer */}
          <div className="p-5 bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-500 rounded-r-2xl">
            <p className="text-xs font-black text-purple-600 dark:text-purple-400 uppercase tracking-wider mb-2">
              ⚡ Quick Answer
            </p>
            <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
              A resume with no work experience should highlight your <strong>education,
              skills, projects, and volunteer work</strong> instead. Use a clean one-page
              format, write a strong summary focused on potential, and make it
              ATS-friendly by mirroring keywords from the job description.
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
              You need a job to get experience. But you need experience to get a job. It is one
              of the most frustrating catch-22s in the modern job market — and almost every
              professional on the planet has faced it at some point.
            </p>
            <p>
              The good news: hiring managers know this too. Entry-level roles exist specifically
              for people without experience. The secret is knowing how to build a resume that
              makes your potential, skills, and enthusiasm shine — even when the work history
              section is empty.
            </p>
            <p>
              This guide walks you through exactly how to do that, step by step.
            </p>
          </div>

          {/* SECTION 1 */}
          <section>
            <h2 id="reality-check" className="text-2xl font-black text-slate-900 dark:text-white mb-4 pt-2 scroll-mt-20">
              The Reality Check: Everyone Starts Here
            </h2>
            <p className="mb-4">
              Before diving into tactics, let us address the mindset block that stops most
              people from even starting: the fear that their resume will look empty.
            </p>
            <p className="mb-6">
              Here is what experienced recruiters actually think when they see an entry-level
              resume: they are not comparing you to a 10-year veteran. They are asking one
              question — <strong>&quot;Does this person have the potential to learn and contribute?&quot;</strong>
            </p>

            <div className="grid md:grid-cols-3 gap-4">
              {[
                {
                  emoji: '🎓',
                  title: 'Fresh Graduate',
                  desc: 'You have academic projects, coursework, and theoretical knowledge that directly translates to workplace skills.',
                  color: 'bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-900',
                  tc: 'text-blue-700 dark:text-blue-300',
                },
                {
                  emoji: '🔄',
                  title: 'Career Changer',
                  desc: 'Your previous life experience contains transferable skills that many career-focused candidates simply do not have.',
                  color: 'bg-green-50 dark:bg-green-900/20 border-green-100 dark:border-green-900',
                  tc: 'text-green-700 dark:text-green-300',
                },
                {
                  emoji: '👶',
                  title: 'First Job Ever',
                  desc: 'School projects, hobbies, and personal initiatives demonstrate initiative — exactly what employers want to see.',
                  color: 'bg-orange-50 dark:bg-orange-900/20 border-orange-100 dark:border-orange-900',
                  tc: 'text-orange-700 dark:text-orange-300',
                },
              ].map((item) => (
                <div key={item.title} className={`p-5 border rounded-2xl ${item.color}`}>
                  <div className="text-2xl mb-2">{item.emoji}</div>
                  <h3 className={`font-black mb-2 text-sm ${item.tc}`}>{item.title}</h3>
                  <p className="text-xs leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 2 */}
          <section>
            <h2 id="what-to-include" className="text-2xl font-black text-slate-900 dark:text-white mb-4 pt-2 scroll-mt-20">
              What to Include Instead of Work Experience
            </h2>
            <p className="mb-6">
              Work experience is just one type of evidence that you can do a job. Here are
              powerful alternatives that recruiters genuinely value:
            </p>

            <div className="space-y-4">
              {[
                {
                  icon: '🏫',
                  title: 'Education',
                  priority: 'High Priority',
                  priorityColor: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
                  desc: 'List your degree, institution, graduation year, and GPA if above 3.0. Include relevant coursework, honours, or academic achievements that relate to the role.',
                  example: 'B.Tech Computer Science — CGPA 8.4/10 · Relevant: Data Structures, Web Development, Database Management',
                },
                {
                  icon: '💻',
                  title: 'Projects',
                  priority: 'High Priority',
                  priorityColor: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
                  desc: 'Academic assignments, personal side projects, hackathon submissions, or open source contributions all count. Describe what you built, what tools you used, and what the outcome was.',
                  example: 'Built a task management web app using React and Node.js — 200+ users, deployed on Vercel',
                },
                {
                  icon: '🤝',
                  title: 'Volunteer Work',
                  priority: 'Medium Priority',
                  priorityColor: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
                  desc: 'Any unpaid work — NGO contributions, community events, school committees — demonstrates responsibility, teamwork, and initiative. Treat it exactly like a job entry.',
                  example: 'Volunteered as Social Media Manager for local NGO — grew Instagram following from 200 to 2,400',
                },
                {
                  icon: '📜',
                  title: 'Certifications',
                  priority: 'Medium Priority',
                  priorityColor: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
                  desc: 'Online certifications from Google, Coursera, AWS, HubSpot, or LinkedIn Learning carry real weight — especially in tech, marketing, and finance roles.',
                  example: 'Google Digital Marketing Certificate · AWS Cloud Practitioner · Meta Social Media Marketing',
                },
                {
                  icon: '🏆',
                  title: 'Extracurriculars & Achievements',
                  priority: 'Supporting',
                  priorityColor: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400',
                  desc: 'Club leadership, sports captaincy, debate competitions, or any role where you led, organised, or achieved something measurable shows leadership potential.',
                  example: 'President, Coding Club (2024–2026) · Organised 3 hackathons with 150+ participants each',
                },
              ].map((item) => (
                <div key={item.title} className="p-5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xl">{item.icon}</span>
                    <h3 className="font-black text-slate-900 dark:text-white">{item.title}</h3>
                    <span className={`text-xs font-black px-2 py-0.5 rounded-full ml-auto ${item.priorityColor}`}>
                      {item.priority}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed mb-3">{item.desc}</p>
                  <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
                    <p className="text-xs font-black text-slate-400 uppercase mb-1">Example</p>
                    <p className="text-xs text-slate-600 dark:text-slate-400 italic">{item.example}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 3 */}
          <section>
            <h2 id="structure" className="text-2xl font-black text-slate-900 dark:text-white mb-4 pt-2 scroll-mt-20">
              The Best Resume Structure for Beginners
            </h2>
            <p className="mb-5">
              The order of sections matters. For a no-experience resume, lead with your
              strengths — not your gaps.
            </p>

            <div className="space-y-2">
              {[
                { order: '1', section: 'Contact Information', note: 'Name, email, phone, LinkedIn, GitHub/portfolio', must: true },
                { order: '2', section: 'Professional Summary', note: '3–4 lines. Your strongest selling point. Lead with skills and potential.', must: true },
                { order: '3', section: 'Skills', note: 'Technical and soft skills relevant to the role', must: true },
                { order: '4', section: 'Education', note: 'Degree, institution, GPA (if strong), relevant coursework', must: true },
                { order: '5', section: 'Projects', note: 'Your 2–3 best projects with measurable outcomes', must: true },
                { order: '6', section: 'Certifications', note: 'If you have any relevant ones', must: false },
                { order: '7', section: 'Volunteer Experience', note: 'Treat exactly like work experience', must: false },
                { order: '8', section: 'Extracurricular Activities', note: 'Only if they show leadership or achievement', must: false },
              ].map((item) => (
                <div key={item.order} className="flex items-center gap-3 p-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl">
                  <div className={`h-7 w-7 rounded-full flex items-center justify-center font-black flex-shrink-0 text-xs ${
                    item.must ? 'bg-purple-600 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
                  }`}>
                    {item.order}
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="font-bold text-slate-900 dark:text-white text-sm">{item.section}</span>
                    <span className="text-xs text-slate-400 ml-2 hidden sm:inline">— {item.note}</span>
                  </div>
                  <span className={`text-xs font-black flex-shrink-0 px-2 py-0.5 rounded-full ${
                    item.must
                      ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
                      : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
                  }`}>
                    {item.must ? 'Required' : 'Optional'}
                  </span>
                </div>
              ))}
            </div>

            <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
              Notice that <strong className="text-slate-700 dark:text-slate-300">Work Experience is not on this list</strong> — because you do not have it yet.
              That is completely fine. The sections above give recruiters everything they need
              to evaluate your potential.
            </p>
          </section>

          {/* CTA 1 */}
          <div className="flex flex-col sm:flex-row items-center gap-4 p-5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl">
            <div className="flex-1">
              <p className="font-bold text-slate-900 dark:text-white mb-1 text-sm">
                📄 Build Your Resume for Free — No Sign-Up
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Use TaskGuru&apos;s free Resume Maker with live ATS score, real-time preview,
                and PDF download. No watermarks.
              </p>
            </div>
            <Link
              href="/tools/resume-maker"
              className="flex-shrink-0 px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl transition-colors text-sm"
            >
              Build Resume Free →
            </Link>
          </div>

          {/* SECTION 4 */}
          <section>
            <h2 id="summary" className="text-2xl font-black text-slate-900 dark:text-white mb-4 pt-2 scroll-mt-20">
              How to Write a Powerful Summary With No Experience
            </h2>
            <p className="mb-5">
              The professional summary is the first thing a recruiter reads. For a
              no-experience resume, it is your most important section — and most people
              write it wrong.
            </p>

            <div className="space-y-4 mb-6">
              <div className="p-4 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/40 rounded-xl">
                <p className="text-xs font-black text-red-500 uppercase mb-2">❌ Weak Summary (What Not to Write)</p>
                <p className="text-sm italic text-slate-600 dark:text-slate-400">
                  &quot;I am a recent graduate looking for a job in marketing. I am a hard worker
                  and a fast learner. I have no experience but I am eager to learn.&quot;
                </p>
                <p className="text-xs text-red-500 mt-2">
                  This tells the recruiter nothing useful. Every candidate says this.
                </p>
              </div>

              <div className="p-4 bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-900/40 rounded-xl">
                <p className="text-xs font-black text-green-600 dark:text-green-400 uppercase mb-2">✅ Strong Summary (What to Write)</p>
                <p className="text-sm italic text-slate-600 dark:text-slate-400">
                  &quot;Digital Marketing graduate with hands-on experience managing social media
                  campaigns for a university-run NGO (2,000+ followers gained in 6 months).
                  Certified in Google Analytics and Meta Ads. Seeking a junior marketing role
                  where I can apply data-driven strategies to grow brand visibility.&quot;
                </p>
                <p className="text-xs text-green-600 dark:text-green-400 mt-2">
                  Specific. Quantified. Shows real skills. Zero mention of &quot;fast learner&quot;.
                </p>
              </div>
            </div>

            <div className="p-5 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl">
              <p className="font-black text-blue-700 dark:text-blue-300 text-sm mb-3">
                💡 The Summary Formula
              </p>
              <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                <strong>[Degree/Field]</strong> + <strong>[specific skill or project with a number]</strong> + <strong>[certification or tool you know]</strong> + <strong>[what you are looking for and what value you bring]</strong>
              </p>
            </div>
          </section>

          {/* SECTION 5 */}
          <section>
            <h2 id="skills" className="text-2xl font-black text-slate-900 dark:text-white mb-4 pt-2 scroll-mt-20">
              Which Skills to List (and How)
            </h2>
            <p className="mb-5">
              Skills are the backbone of a no-experience resume. Split them into two categories:
            </p>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="p-5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm">
                <h3 className="font-black text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                  <span className="text-lg">⚙️</span> Technical / Hard Skills
                </h3>
                <p className="text-xs text-slate-500 mb-3">Specific, teachable, measurable abilities</p>
                <div className="flex flex-wrap gap-2">
                  {['Python', 'React', 'Excel', 'Photoshop', 'SQL', 'Canva', 'SEO', 'Google Analytics', 'HTML/CSS', 'Figma'].map((skill) => (
                    <span key={skill} className="px-2 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-bold rounded-lg border border-blue-100 dark:border-blue-800">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div className="p-5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm">
                <h3 className="font-black text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                  <span className="text-lg">🧠</span> Soft Skills
                </h3>
                <p className="text-xs text-slate-500 mb-3">Interpersonal and behavioural abilities</p>
                <div className="flex flex-wrap gap-2">
                  {['Problem Solving', 'Team Collaboration', 'Communication', 'Time Management', 'Critical Thinking', 'Adaptability', 'Leadership', 'Attention to Detail'].map((skill) => (
                    <span key={skill} className="px-2 py-1 bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs font-bold rounded-lg border border-purple-100 dark:border-purple-800">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-5 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 rounded-r-2xl">
              <p className="text-xs font-black text-yellow-700 dark:text-yellow-400 uppercase mb-2">
                ⚠️ Golden Rule
              </p>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                Only list skills you can actually demonstrate in an interview. If you say you know
                Excel, a recruiter may ask you to use VLOOKUP on the spot. Never list a skill you
                cannot back up with at least a basic example.
              </p>
            </div>
          </section>

          {/* SECTION 6 */}
          <section>
            <h2 id="ats" className="text-2xl font-black text-slate-900 dark:text-white mb-4 pt-2 scroll-mt-20">
              Making Your Resume ATS-Friendly
            </h2>
            <p className="mb-5">
              Over 98% of Fortune 500 companies use Applicant Tracking Systems (ATS) to filter
              resumes before a human ever reads them. If your resume fails the ATS scan, it gets
              deleted automatically — no matter how qualified you are.
            </p>

            <div className="space-y-3 mb-6">
              {[
                {
                  do: true,
                  text: 'Use standard section headings: "Education", "Skills", "Projects" — not creative names like "My Journey" or "What I Bring"',
                },
                {
                  do: true,
                  text: 'Mirror keywords from the job description. If the job says "proficient in Microsoft Excel", use exactly those words — not "spreadsheet expert"',
                },
                {
                  do: true,
                  text: 'Use a single-column, clean layout. No tables, text boxes, or columns — ATS parsers read left to right, top to bottom',
                },
                {
                  do: true,
                  text: 'Save as .docx or PDF. Most ATS systems handle both, but .docx is universally safer',
                },
                {
                  do: false,
                  text: 'Do not use headers and footers — ATS often skips content in these areas entirely',
                },
                {
                  do: false,
                  text: 'Do not embed text in images or graphics — ATS cannot read it',
                },
              ].map((item, i) => (
                <div key={i} className={`flex gap-3 p-4 rounded-xl border ${
                  item.do
                    ? 'bg-green-50 dark:bg-green-900/10 border-green-100 dark:border-green-900/40'
                    : 'bg-red-50 dark:bg-red-900/10 border-red-100 dark:border-red-900/40'
                }`}>
                  <span className={`font-black text-base flex-shrink-0 ${item.do ? 'text-green-500' : 'text-red-500'}`}>
                    {item.do ? '✓' : '✗'}
                  </span>
                  <p className="text-sm leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 p-5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl">
              <div className="flex-1">
                <p className="font-bold text-slate-900 dark:text-white mb-1 text-sm">
                  Check Your ATS Score Instantly
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  TaskGuru&apos;s Resume Maker shows your real-time ATS score as you type — so you know
                  exactly what to fix before submitting.
                </p>
              </div>
              <Link
                href="/tools/resume-maker"
                className="flex-shrink-0 px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl transition-colors text-sm"
              >
                Check ATS Score →
              </Link>
            </div>
          </section>

          {/* SECTION 7 */}
          <section>
            <h2 id="mistakes" className="text-2xl font-black text-slate-900 dark:text-white mb-4 pt-2 scroll-mt-20">
              Common Mistakes to Avoid
            </h2>
            <div className="space-y-3">
              {[
                {
                  mistake: 'Writing "References available upon request"',
                  fix: 'Recruiters know this. It wastes space. Remove it entirely.',
                },
                {
                  mistake: 'Using an unprofessional email address',
                  fix: 'Create a clean gmail: firstname.lastname@gmail.com before applying anywhere.',
                },
                {
                  mistake: 'Making it more than one page',
                  fix: 'With no experience, one page is always better. A padded two-pager signals poor judgment.',
                },
                {
                  mistake: 'Using a fancy template with columns and graphics',
                  fix: 'Pretty templates often fail ATS parsing. Use a clean, single-column format instead.',
                },
                {
                  mistake: 'Listing responsibilities instead of achievements',
                  fix: 'Instead of "Helped with social media", write "Grew Instagram page from 200 to 800 followers in 3 months".',
                },
                {
                  mistake: 'Sending the same resume to every job',
                  fix: 'Customise the summary and skills section for each role. It takes 5 minutes and significantly improves your callback rate.',
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

          {/* CTA 2 */}
          <div className="p-6 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-2xl">
            <h3 className="font-black text-lg mb-2">Build Your Resume Right Now — Free</h3>
            <p className="text-purple-100 text-sm mb-4">
              TaskGuru&apos;s Resume Maker includes a real-time ATS score, live preview, Classic and
              Modern templates, and one-click PDF download. No sign-up. No watermarks. Ever.
            </p>
            <Link
              href="/tools/resume-maker"
              className="inline-block px-5 py-2.5 bg-white text-purple-700 font-bold rounded-xl hover:bg-purple-50 transition-colors text-sm"
            >
              Build My Resume Free →
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
              Having no work experience does not mean having nothing to offer. Projects,
              education, certifications, and volunteer work are all legitimate evidence of
              ability. The key is presenting them with the same professionalism and
              specificity you would give real job entries.
            </p>
            <p className="text-sm leading-relaxed">
              Quantify everything you can. Customise for each role. Keep it to one page.
              Make it ATS-friendly. These four rules alone will put your resume ahead of
              most entry-level applications — even the ones with experience listed.
            </p>
          </section>

          {/* RELATED ARTICLES */}
          <div className="pt-8 border-t border-slate-200 dark:border-slate-700">
            <h3 className="text-base font-black text-slate-900 dark:text-white mb-4">
              Related Articles
            </h3>
            <div className="grid md:grid-cols-2 gap-3">
              {[
                {
                  title: '5 Hidden Keywords ATS Scanners Look For in Your Resume',
                  href: '/blog/resume-ats-secrets',
                },
                {
                  title: 'How to Extract Text from a Scanned PDF for Free',
                  href: '/blog/extract-text-scanned-pdf',
                },
                {
                  title: 'The Zero-Cost Tech Stack for Freelancers in 2026',
                  href: '/blog/zero-cost-freelancer-tools',
                },
                {
                  title: 'What is OCR? How Image to Text Technology Works',
                  href: '/blog/what-is-ocr-image-to-text',
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
