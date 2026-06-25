import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pro Resume Maker & CV Builder — Free ATS Resume App for Android",
  description:
    "Build ATS-friendly resumes on Android with 9 professional templates, instant PDF export, local ATS scoring and offline editing. No login. No subscription. Free.",
  keywords: [
    "pro resume maker", "cv builder android", "ats resume app free",
    "offline resume builder", "resume maker no login", "pdf resume export android",
    "ats score app", "cover letter builder", "resume templates android",
    "free resume app 2026", "Ai Resume Maker",
  ],
  alternates: { canonical: "https://www.taskguru.online/apps/pro-resume-maker" },
  openGraph: {
    title: "Pro Resume Maker & CV Builder — Free ATS Resume App",
    description: "9 ATS templates, PDF export, offline editing, ATS scoring — free Android app. No login required.",
    url: "https://www.taskguru.online/apps/pro-resume-maker",
    siteName: "TaskGuru",
    type: "website",
    images: [{ url: "https://www.taskguru.online/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pro Resume Maker — Free ATS Resume App for Android",
    description: "9 ATS templates, PDF export, offline. No login. Free Android app.",
    creator: "@Shubham_962",
  },
};

const appSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Pro Resume Maker & CV Builder",
  operatingSystem: "Android",
  applicationCategory: "BusinessApplication",
  description:
    "Build ATS-friendly resumes with 9 professional templates, instant PDF export, ATS scoring and offline editing. No login required.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  author: { "@type": "Person", name: "Shubham Gautam", url: "https://github.com/shubh962" },
  publisher: { "@type": "Organization", name: "TaskGuru", url: "https://www.taskguru.online" },
  url: "https://indusapp.store/d6vxlznp",
  downloadUrl: "https://indusapp.store/d6vxlznp",
  featureList: [
    "9 ATS-Optimized Resume Templates",
    "Instant PDF Export",
    "Offline Resume Editing",
    "Local ATS Score Checker",
    "Cover Letter Builder",
    "No Login Required",
    "Privacy First",
  ],
  screenshot: "https://www.taskguru.online/og-image.png",
  aggregateRating: { "@type": "AggregateRating", ratingValue: "4.5", ratingCount: "10" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is Pro Resume Maker free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Pro Resume Maker is completely free to download and use. No subscription or in-app purchase is required for core features.",
      },
    },
    {
      "@type": "Question",
      name: "Does Pro Resume Maker work without internet?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The app works fully offline. You can create, edit and export your resume as PDF without any internet connection.",
      },
    },
    {
      "@type": "Question",
      name: "What is an ATS resume?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "ATS stands for Applicant Tracking System. Companies use ATS software to filter resumes before a human reads them. An ATS-friendly resume uses clean formatting and relevant keywords so it passes the filter.",
      },
    },
    {
      "@type": "Question",
      name: "Which Android versions does the app support?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Pro Resume Maker supports Android 6.0 and above.",
      },
    },
    {
      "@type": "Question",
      name: "Where can I download Pro Resume Maker?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Download it from the Indus App Store at indusapp.store/d6vxlznp. Google Play version is coming soon.",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.taskguru.online" },
    { "@type": "ListItem", position: 2, name: "Apps", item: "https://www.taskguru.online/apps" },
    { "@type": "ListItem", position: 3, name: "Pro Resume Maker", item: "https://www.taskguru.online/apps/pro-resume-maker" },
  ],
};

export default function ProResumeMakerPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <main className="bg-white dark:bg-gray-950 min-h-screen">

        {/* ── HERO ── */}
        <section className="relative overflow-hidden border-b border-gray-100 dark:border-gray-800">
          <div className="absolute top-0 right-0 w-[320px] h-[320px] bg-gradient-to-bl from-violet-50 to-transparent dark:from-violet-950/30 pointer-events-none"
            style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }} />
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{ backgroundImage: "radial-gradient(circle, #6d28d9 1px, transparent 1px)", backgroundSize: "28px 28px" }} />

          <div className="relative max-w-5xl mx-auto px-6 py-20">
            {/* Breadcrumb */}
            <nav className="text-xs text-gray-400 mb-8 flex items-center gap-1.5">
              <Link href="/" className="hover:text-gray-600 transition-colors">Home</Link>
              <span>/</span>
              <Link href="/apps" className="hover:text-gray-600 transition-colors">Apps</Link>
              <span>/</span>
              <span className="text-gray-600 dark:text-gray-300 font-semibold">Pro Resume Maker</span>
            </nav>

            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-12">
              {/* Left */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-violet-50 dark:bg-violet-950/50 border border-violet-100 dark:border-violet-800 flex items-center justify-center">
                    <svg className="w-7 h-7 text-violet-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                      <polyline points="14 2 14 8 20 8"/>
                      <line x1="16" y1="13" x2="8" y2="13"/>
                      <line x1="16" y1="17" x2="8" y2="17"/>
                    </svg>
                  </div>
                  <span className="flex items-center gap-1.5 px-3 py-1 bg-green-50 dark:bg-green-950/40 border border-green-200 dark:border-green-800 rounded-full text-[11px] font-black text-green-700 dark:text-green-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    LIVE ON INDUS APP STORE
                  </span>
                </div>

                <h1 className="text-4xl md:text-5xl font-black text-gray-950 dark:text-white tracking-[-0.04em] leading-[1.04] mb-4">
                  Pro Resume Maker<br />
                  <span className="bg-gradient-to-r from-violet-600 to-indigo-500 bg-clip-text text-transparent">
                    & CV Builder
                  </span>
                </h1>

                <p className="text-base text-gray-500 dark:text-gray-400 leading-relaxed mb-7 max-w-lg">
                  Build ATS-optimized resumes on your Android phone. 9 professional templates,
                  instant PDF export, local ATS scoring and full offline support.
                  No login. No subscription. Free.
                </p>

                {/* Feature chips */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {[
                    { label: "9 ATS Templates",  cls: "bg-violet-50 dark:bg-violet-950/40 text-violet-700 dark:text-violet-300 border-violet-100 dark:border-violet-800" },
                    { label: "PDF Export",        cls: "bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border-blue-100 dark:border-blue-800" },
                    { label: "Offline",           cls: "bg-green-50 dark:bg-green-950/40 text-green-700 dark:text-green-300 border-green-100 dark:border-green-800" },
                    { label: "ATS Score",         cls: "bg-pink-50 dark:bg-pink-950/40 text-pink-700 dark:text-pink-300 border-pink-100 dark:border-pink-800" },
                    { label: "Cover Letter",      cls: "bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-100 dark:border-amber-800" },
                    { label: "No Login",          cls: "bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700" },
                  ].map(({ label, cls }) => (
                    <span key={label} className={`px-3 py-1.5 rounded-xl border text-[11px] font-black ${cls}`}>
                      {label}
                    </span>
                  ))}
                </div>

                {/* Download buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <a href="https://indusapp.store/d6vxlznp" target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-6 py-3.5 bg-gray-950 dark:bg-white text-white dark:text-gray-950 rounded-2xl font-black text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
                    </svg>
                    Download — Indus App Store
                  </a>
                  <div className="flex items-center gap-2 px-5 py-3.5 bg-gray-50 dark:bg-gray-800 border border-dashed border-gray-200 dark:border-gray-700 rounded-2xl cursor-not-allowed">
                    <span className="text-[10px] font-black uppercase tracking-widest text-amber-600 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-700 px-2 py-0.5 rounded-full whitespace-nowrap">Soon</span>
                    <span className="text-xs text-gray-400 font-semibold">Google Play</span>
                  </div>
                </div>
              </div>

              {/* Right: stats card */}
              <div className="lg:w-72 w-full shrink-0">
                <div className="rounded-3xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6 space-y-4">
                  {[
                    { label: "Templates",    value: "9",      sub: "ATS-optimized" },
                    { label: "Price",        value: "Free",   sub: "No subscription" },
                    { label: "Login",        value: "None",   sub: "Zero account needed" },
                    { label: "Works",        value: "Offline",sub: "No internet required" },
                    { label: "Platform",     value: "Android",sub: "Android 6.0+" },
                  ].map(({ label, value, sub }) => (
                    <div key={label} className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-800 last:border-0">
                      <span className="text-xs font-semibold text-gray-400">{label}</span>
                      <div className="text-right">
                        <p className="text-sm font-black text-gray-950 dark:text-white">{value}</p>
                        <p className="text-[10px] text-gray-400">{sub}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── FEATURES ── */}
        <section className="max-w-5xl mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <p className="text-[11px] font-black uppercase tracking-[0.14em] text-violet-600 mb-3">Features</p>
            <h2 className="text-3xl font-black text-gray-950 dark:text-white tracking-tight">Everything You Need</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: "📄", title: "9 ATS Templates",      body: "Clean layouts designed to pass Applicant Tracking Systems and reach human recruiters." },
              { icon: "📊", title: "ATS Score Checker",    body: "Check your resume's ATS compatibility score instantly — no external API, fully local." },
              { icon: "💾", title: "Instant PDF Export",   body: "Export a high-quality PDF resume directly from your phone in seconds." },
              { icon: "📶", title: "Full Offline Support", body: "Create and edit resumes without internet. Your data stays on your device." },
              { icon: "✉️", title: "Cover Letter Builder", body: "Write a matching cover letter alongside your resume in the same app." },
              { icon: "🔒", title: "No Login Required",    body: "No account, no email, no password. Open the app and start building." },
            ].map(({ icon, title, body }) => (
              <div key={title} className="rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 hover:border-violet-200 dark:hover:border-violet-800 hover:shadow-md transition-all">
                <div className="text-2xl mb-4">{icon}</div>
                <h3 className="font-black text-gray-950 dark:text-white text-sm mb-2">{title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── WHO IT'S FOR ── */}
        <section className="border-y border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/30">
          <div className="max-w-5xl mx-auto px-6 py-16">
            <div className="text-center mb-10">
              <p className="text-[11px] font-black uppercase tracking-[0.14em] text-violet-600 mb-3">Who It&apos;s For</p>
              <h2 className="text-3xl font-black text-gray-950 dark:text-white tracking-tight">Perfect For</h2>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                "Fresh Graduates", "Students", "Working Professionals",
                "Career Switchers", "Internship Applicants", "Freelancers",
                "First-Time Job Seekers", "Returning to Work",
              ].map((label) => (
                <span key={label}
                  className="px-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl text-sm font-bold text-gray-700 dark:text-gray-300 shadow-sm">
                  {label}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="max-w-3xl mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <p className="text-[11px] font-black uppercase tracking-[0.14em] text-violet-600 mb-3">FAQ</p>
            <h2 className="text-3xl font-black text-gray-950 dark:text-white tracking-tight">Common Questions</h2>
          </div>
          <div className="space-y-4">
            {[
              { q: "Is Pro Resume Maker free?", a: "Yes. Completely free. No subscription or in-app purchase needed for any core feature." },
              { q: "Does it work without internet?", a: "Yes. Create, edit and export your resume as PDF fully offline. Your data never leaves your device." },
              { q: "What is an ATS resume?", a: "ATS (Applicant Tracking System) software filters resumes before a recruiter sees them. ATS-friendly resumes use clean formatting and relevant keywords to pass the filter." },
              { q: "Which Android versions are supported?", a: "Android 6.0 and above." },
              { q: "Where can I download it?", a: "Available on the Indus App Store now. Google Play coming soon." },
            ].map(({ q, a }) => (
              <div key={q} className="rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
                <h3 className="font-black text-gray-950 dark:text-white text-sm mb-2">{q}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── RELATED GUIDES ── */}
        <section className="border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/30 py-16">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-xl font-black text-gray-950 dark:text-white mb-8 tracking-tight">Related Resume Guides</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { href: "/blog/how-to-make-resume-with-no-experience", title: "Resume With No Experience", body: "How to write a strong resume as a fresher or student." },
                { href: "/blog/resume-ats-secrets",                    title: "ATS Resume Secrets",        body: "The exact keywords and formatting ATS scanners look for." },
                { href: "/blog/how-to-write-professional-english-emails", title: "Professional Email Guide", body: "Write emails that get replies from recruiters." },
              ].map(({ href, title, body }) => (
                <Link key={href} href={href}
                  className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 hover:border-violet-300 dark:hover:border-violet-700 hover:shadow-md transition-all">
                  <h3 className="font-black text-gray-950 dark:text-white text-sm mb-2">{title} →</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed">{body}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-20 bg-gray-950 dark:bg-black">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-black text-white tracking-tight mb-4">
              Start Building Your Resume.
            </h2>
            <p className="text-gray-400 text-base leading-relaxed mb-8">
              Free. Offline. No login. 9 ATS templates. Export PDF in seconds.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="https://indusapp.store/d6vxlznp" target="_blank" rel="noopener noreferrer"
                className="px-8 py-3.5 bg-white text-gray-950 rounded-2xl font-black text-sm hover:bg-gray-100 transition-all shadow-lg">
                Download on Indus App Store
              </a>
              <Link href="/tools/resume-maker"
                className="px-8 py-3.5 border border-gray-700 text-gray-300 rounded-2xl font-bold text-sm hover:bg-gray-800 transition-all">
                Try Web Resume Builder →
              </Link>
            </div>
          </div>
        </section>

      </main>
    </>
  );
                }
