import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

export const metadata: Metadata = {
  title: "TaskGuru Apps — Free Android Apps for Resume, Career & Productivity",
  description:
    "Download free Android apps by TaskGuru. Pro Resume Maker is now on Google Play — build ATS-friendly resumes with 9 templates, offline editing and instant PDF export. No login required.",
  keywords: [
    "free android apps", "resume maker app", "cv builder android",
    "ats resume app", "offline resume builder", "taskguru apps",
    "android productivity apps", "career apps android", "resume app no login",
    "resume maker google play", "pro resume maker android",
  ],
  alternates: { canonical: "https://www.taskguru.site/apps" },
  openGraph: {
    title: "TaskGuru Apps — Free Android Apps for Resume & Productivity",
    description: "Privacy-first Android apps for resume building and productivity. Now on Google Play. Free, offline, no login.",
    url: "https://www.taskguru.site/apps",
    siteName: "TaskGuru",
    type: "website",
    images: [{ url: "https://www.taskguru.site/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "TaskGuru Apps — Free Android Apps",
    description: "Pro Resume Maker is now on Google Play. Free, offline, no login. No subscription.",
    creator: "@Shubham_962",
  },
};

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "TaskGuru Android Apps",
  description: "Free privacy-first Android applications for resume building, career growth and productivity.",
  url: "https://www.taskguru.site/apps",
  publisher: { "@type": "Organization", name: "TaskGuru", url: "https://www.taskguru.site" },
};

// ✅ FAQ updated — Google Play now live
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Are TaskGuru Android apps free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. All TaskGuru apps are free to download and use. Core features require no subscription or account.",
      },
    },
    {
      "@type": "Question",
      name: "Do TaskGuru apps work offline?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Pro Resume Maker works fully offline. You can create, edit and export resumes without an internet connection.",
      },
    },
    {
      "@type": "Question",
      name: "Where can I download the Pro Resume Maker app?",
      acceptedAnswer: {
        "@type": "Answer",
    
        text: "Pro Resume Maker is now available on Google Play at play.google.com/store/apps/details?id=com.shubham.proresumemakerapp and on the Indus App Store at indusapp.store/d6vxlznp.",
      },
    },
    {
      "@type": "Question",
      name: "Does Pro Resume Maker require login?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Pro Resume Maker requires no account, no login and no email. Open the app and start building your resume immediately.",
      },
    },
  ],
};

export default function AppsPage() {
  return (
    <>
      {/* JSON-LD Schemas */}
      <Script
        id="apps-collection-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <Script
        id="apps-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main className="bg-white dark:bg-gray-950 min-h-screen">

        {/* ── HERO ── */}
        <section className="relative overflow-hidden border-b border-gray-100 dark:border-gray-800">
          {/* Background accents */}
          <div
            className="absolute top-0 right-0 w-[340px] h-[340px] bg-gradient-to-bl from-violet-50 to-transparent dark:from-violet-950/30 dark:to-transparent pointer-events-none"
            style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }}
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none"
            style={{ backgroundImage: "radial-gradient(circle, #6d28d9 1px, transparent 1px)", backgroundSize: "28px 28px" }}
            aria-hidden="true"
          />

          <div className="relative max-w-5xl mx-auto px-6 py-24 text-center">
            {/* Breadcrumb */}
            <nav className="text-xs text-gray-400 mb-8 flex items-center justify-center gap-1.5" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-gray-600 transition-colors">Home</Link>
              <span aria-hidden="true">/</span>
              <span className="text-gray-600 dark:text-gray-300 font-semibold" aria-current="page">Apps</span>
            </nav>

            {/* ✅ Eyebrow updated — mentions Google Play */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-50 dark:bg-green-950/40 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 text-[11px] font-black tracking-widest uppercase mb-7">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" aria-hidden="true" />
              Now on Google Play · Free · No Login
            </div>

            <h1 className="text-5xl md:text-6xl font-black text-gray-950 dark:text-white leading-[1.03] tracking-[-0.04em] mb-5">
              Android Apps Built<br />
              <span className="bg-gradient-to-r from-violet-600 to-indigo-500 bg-clip-text text-transparent">
                For Real Work.
              </span>
            </h1>

            <p className="text-base md:text-lg text-gray-500 dark:text-gray-400 max-w-xl mx-auto leading-relaxed mb-8">
              Lightweight, offline-friendly Android apps that solve everyday career
              and productivity problems. No subscriptions. No unnecessary permissions.
            </p>

            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="#apps"
                className="px-7 py-3 bg-gray-950 dark:bg-white text-white dark:text-gray-950 rounded-2xl font-black text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
              >
                View All Apps
              </Link>
              <Link
                href="/tools"
                className="px-7 py-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-2xl font-bold text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
              >
                Online Tools →
              </Link>
            </div>
          </div>
        </section>

        {/* ── APPS GRID ── */}
        <section id="apps" className="max-w-5xl mx-auto px-6 py-20">
          <div className="text-center mb-14">
            <p className="text-[11px] font-black uppercase tracking-[0.14em] text-violet-600 mb-3">Available Now</p>
            <h2 className="text-3xl md:text-4xl font-black text-gray-950 dark:text-white tracking-tight">
              Our Android Apps
            </h2>
          </div>

          <div className="max-w-lg mx-auto">

            {/* ── Pro Resume Maker — LIVE ── */}
            <article className="relative rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

              {/* Live badge */}
              <div className="absolute top-6 right-6 flex items-center gap-1.5 px-3 py-1 bg-green-50 dark:bg-green-950/40 border border-green-200 dark:border-green-800 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" aria-hidden="true" />
                <span className="text-[10px] font-black uppercase tracking-widest text-green-700 dark:text-green-400">Live</span>
              </div>

              {/* App icon */}
              <div className="w-16 h-16 rounded-2xl bg-violet-50 dark:bg-violet-950/50 border border-violet-100 dark:border-violet-800 flex items-center justify-center mb-6" aria-hidden="true">
                <svg className="w-8 h-8 text-violet-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14,2 14,8 20,8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                  <polyline points="10,9 9,9 8,9"/>
                </svg>
              </div>

              <h3 className="text-2xl font-black text-gray-950 dark:text-white mb-2 tracking-tight">
                Pro Resume Maker &amp; CV Builder
              </h3>
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-sm mb-5">
                Build ATS-friendly resumes with 9 professional templates. Instant PDF export,
                offline editing, local ATS score checker and cover letter builder — all in one app.
              </p>

              {/* Feature tags */}
              <div className="flex flex-wrap gap-2 mb-7">
                {["9 ATS Templates", "Offline", "PDF Export", "ATS Score", "No Login", "Cover Letter"].map((f) => (
                  <span key={f} className="px-3 py-1.5 rounded-xl border border-violet-100 dark:border-violet-900 bg-violet-50 dark:bg-violet-950/30 text-[11px] font-bold text-violet-700 dark:text-violet-400">
                    {f}
                  </span>
                ))}
              </div>

              {/* Download buttons — Google Play primary, Indus secondary */}
              <div className="space-y-3">

                {/* Google Play — PRIMARY */}
                <a
                  href="https://play.google.com/store/apps/details?id=com.shubham.proresumemakerapp"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Download Pro Resume Maker on Google Play"
                  className="flex items-center justify-center gap-3 w-full px-5 py-3.5 bg-gray-950 dark:bg-white text-white dark:text-gray-950 rounded-2xl font-black text-sm hover:opacity-90 transition-all shadow-md"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M3 3.5L13.5 12L3 20.5V3.5Z" />
                  </svg>
                  Download on Google Play
                </a>

                {/* Indus + Learn More row */}
                <div className="flex gap-3">
                  <a
                    href="https://indusapp.store/d6vxlznp"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Download Pro Resume Maker on Indus App Store"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-2xl font-bold text-xs text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
                  >
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
                    </svg>
                    Indus App Store
                  </a>
                  <Link
                    href="/apps/pro-resume-maker"
                    className="flex-1 flex items-center justify-center px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-2xl font-bold text-xs text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
                  >
                    Learn More →
                  </Link>
                </div>
              </div>
            </article>


          </div>
        </section>

        {/* ── TRUST PILLARS ── */}
        <section className="border-y border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/30" aria-label="App quality pillars">
          <div className="max-w-5xl mx-auto px-6 py-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "⚡", title: "Fast & Lightweight", body: "Optimized for everyday use on any Android device." },
              { icon: "🔒", title: "Privacy First",      body: "Minimal data collection. Offline-friendly. No tracking." },
              { icon: "🎯", title: "Purpose Built",      body: "Every feature solves a real problem. No bloat." },
              { icon: "🚀", title: "Regular Updates",    body: "Continuously improved based on real user feedback." },
            ].map(({ icon, title, body }) => (
              <div key={title} className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800">
                <div className="text-3xl mb-4" aria-hidden="true">{icon}</div>
                <h3 className="font-black text-gray-950 dark:text-white mb-2 text-sm">{title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="max-w-3xl mx-auto px-6 py-20" aria-label="Frequently asked questions">
          <div className="text-center mb-12">
            <p className="text-[11px] font-black uppercase tracking-[0.14em] text-violet-600 mb-3">FAQ</p>
            <h2 className="text-3xl font-black text-gray-950 dark:text-white tracking-tight">Common Questions</h2>
          </div>
          <div className="space-y-4">
            {[
              {
                q: "Is Pro Resume Maker free?",
                a: "Yes. Pro Resume Maker is completely free to download and use. Core features need no subscription or account.",
              },
              {
                q: "Do the apps work offline?",
                a: "Yes. Pro Resume Maker works fully offline — create, edit and export without any internet connection.",
              },
              {
                q: "Where can I download Pro Resume Maker?",
                a: "Available now on Google Play and the Indus App Store. Search 'Pro Resume Maker' on Google Play or visit play.google.com/store/apps/details?id=com.shubham.proresumemakerapp",
              },
              {
                q: "Does the app need a login?",
                a: "No login, no email, no account. Open the app and start building your resume instantly.",
              },
            ].map(({ q, a }) => (
              <div key={q} className="rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-6">
                <h3 className="font-black text-gray-950 dark:text-white text-sm mb-2">{q}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── INTERNAL LINKS ── */}
        <section className="bg-gray-50/50 dark:bg-gray-900/30 border-t border-gray-100 dark:border-gray-800 py-16">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-xl font-black text-gray-950 dark:text-white mb-8 tracking-tight">Explore More</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { href: "/tools",                                       title: "Online Tools",  body: "40+ free PDF, image and AI writing tools." },
                { href: "/blog",                                        title: "Career Guides", body: "Resume writing, ATS tips and interview prep." },
                { href: "/blog/how-to-make-resume-with-no-experience",  title: "Resume Guide",  body: "How to write a resume with no work experience." },
              ].map(({ href, title, body }) => (
                <Link
                  key={href}
                  href={href}
                  className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 hover:border-violet-300 dark:hover:border-violet-700 hover:shadow-md transition-all"
                >
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
              Build Your Resume Today.
            </h2>
            <p className="text-gray-400 text-base leading-relaxed mb-8">
              9 ATS templates. Offline. No login. Export PDF instantly — free.
            </p>
            {/* ✅ Google Play PRIMARY in CTA */}
            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4">
              <a
                href="https://play.google.com/store/apps/details?id=com.shubham.proresumemakerapp"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Download Pro Resume Maker on Google Play"
                className="flex items-center justify-center gap-2.5 px-8 py-3.5 bg-white text-gray-950 rounded-2xl font-black text-sm hover:bg-gray-100 transition-all shadow-lg"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M3 3.5L13.5 12L3 20.5V3.5Z" />
                </svg>
                Download on Google Play
              </a>
              <a
                href="https://indusapp.store/d6vxlznp"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Download on Indus App Store"
                className="flex items-center justify-center gap-2 px-8 py-3.5 border border-gray-700 text-gray-300 rounded-2xl font-bold text-sm hover:bg-gray-800 transition-all"
              >
                Indus App Store
              </a>
              <Link
                href="/tools/resume-maker"
                className="flex items-center justify-center px-8 py-3.5 border border-gray-700 text-gray-300 rounded-2xl font-bold text-sm hover:bg-gray-800 transition-all"
              >
                Try Web Version Free →
              </Link>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}
