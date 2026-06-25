import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "TaskGuru Apps — Free Android Apps for Resume, Career & Productivity",
  description:
    "Download free Android apps by TaskGuru. Pro Resume Maker builds ATS-friendly resumes with 9 templates, offline editing and instant PDF export. No login required.",
  keywords: [
    "free android apps", "resume maker app", "cv builder android",
    "ats resume app", "offline resume builder", "taskguru apps",
    "android productivity apps", "career apps android", "resume app no login",
  ],
  alternates: { canonical: "https://www.taskguru.online/apps" },
  openGraph: {
    title: "TaskGuru Apps — Free Android Apps for Resume & Productivity",
    description: "Privacy-first Android apps for resume building and productivity. Free, offline, no login.",
    url: "https://www.taskguru.online/apps",
    siteName: "TaskGuru",
    type: "website",
    images: [{ url: "https://www.taskguru.online/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "TaskGuru Apps — Free Android Apps",
    description: "Free Android apps for resume building and productivity. No login. No subscription.",
    creator: "@Shubham_962",
  },
};

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "TaskGuru Android Apps",
  description: "Free privacy-first Android applications for resume building, career growth and productivity.",
  url: "https://www.taskguru.online/apps",
  publisher: { "@type": "Organization", name: "TaskGuru", url: "https://www.taskguru.online" },
};

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
        text: "Pro Resume Maker is available on the Indus App Store at indusapp.store/d6vxlznp. Google Play version is coming soon.",
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <main className="bg-white dark:bg-gray-950 min-h-screen">

        {/* ── HERO ── */}
        <section className="relative overflow-hidden border-b border-gray-100 dark:border-gray-800">
          {/* Background accents */}
          <div className="absolute top-0 right-0 w-[340px] h-[340px] bg-gradient-to-bl from-violet-50 to-transparent dark:from-violet-950/30 dark:to-transparent pointer-events-none"
            style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }} />
          <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none"
            style={{ backgroundImage: "radial-gradient(circle, #6d28d9 1px, transparent 1px)", backgroundSize: "28px 28px" }} />

          <div className="relative max-w-5xl mx-auto px-6 py-24 text-center">
            {/* Breadcrumb */}
            <nav className="text-xs text-gray-400 mb-8 flex items-center justify-center gap-1.5">
              <Link href="/" className="hover:text-gray-600 transition-colors">Home</Link>
              <span>/</span>
              <span className="text-gray-600 dark:text-gray-300 font-semibold">Apps</span>
            </nav>

            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-50 dark:bg-violet-950/50 border border-violet-200 dark:border-violet-800 text-violet-700 dark:text-violet-300 text-[11px] font-black tracking-widest uppercase mb-7">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
              Free · Privacy First · No Login
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
              <Link href="#apps"
                className="px-7 py-3 bg-gray-950 dark:bg-white text-white dark:text-gray-950 rounded-2xl font-black text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all">
                View All Apps
              </Link>
              <Link href="/tools"
                className="px-7 py-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-2xl font-bold text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-all">
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

          <div className="grid lg:grid-cols-2 gap-8">

            {/* ── Pro Resume Maker — LIVE ── */}
            <article className="relative rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              {/* Live badge */}
              <span className="absolute top-6 right-6 flex items-center gap-1.5 px-3 py-1 bg-green-50 dark:bg-green-950/50 border border-green-200 dark:border-green-800 rounded-full text-[11px] font-black text-green-700 dark:text-green-400">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                LIVE
              </span>

              {/* Icon */}
              <div className="w-16 h-16 rounded-2xl bg-violet-50 dark:bg-violet-950/50 flex items-center justify-center mb-6 border border-violet-100 dark:border-violet-800">
                <svg className="w-8 h-8 text-violet-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                  <polyline points="10 9 9 9 8 9"/>
                </svg>
              </div>

              <h3 className="text-2xl font-black text-gray-950 dark:text-white mb-3 tracking-tight">
                Pro Resume Maker & CV Builder
              </h3>
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-sm mb-6">
                Build ATS-optimized resumes from your Android phone. 9 professional templates,
                instant PDF export, local ATS scoring and full offline support — no account needed.
              </p>

              {/* Feature chips */}
              <div className="flex flex-wrap gap-2 mb-8">
                {[
                  { label: "9 ATS Templates",   color: "bg-violet-50 dark:bg-violet-950/40 text-violet-700 dark:text-violet-300 border-violet-100 dark:border-violet-800" },
                  { label: "PDF Export",         color: "bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border-blue-100 dark:border-blue-800" },
                  { label: "Offline",            color: "bg-green-50 dark:bg-green-950/40 text-green-700 dark:text-green-300 border-green-100 dark:border-green-800" },
                  { label: "No Login",           color: "bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-100 dark:border-amber-800" },
                  { label: "ATS Score",          color: "bg-pink-50 dark:bg-pink-950/40 text-pink-700 dark:text-pink-300 border-pink-100 dark:border-pink-800" },
                  { label: "Cover Letter",       color: "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border-indigo-100 dark:border-indigo-800" },
                ].map(({ label, color }) => (
                  <span key={label} className={`px-3 py-1.5 rounded-xl border text-[11px] font-black ${color}`}>
                    {label}
                  </span>
                ))}
              </div>

              {/* Store buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <a href="https://indusapp.store/d6vxlznp" target="_blank" rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2.5 px-5 py-3 bg-gray-950 dark:bg-white text-white dark:text-gray-950 rounded-2xl font-black text-sm hover:opacity-90 transition-all shadow-md">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
                  </svg>
                  Download — Indus App Store
                </a>
                <Link href="/apps/pro-resume-maker"
                  className="flex-1 flex items-center justify-center px-5 py-3 border border-gray-200 dark:border-gray-700 rounded-2xl font-bold text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all">
                  Learn More →
                </Link>
              </div>

              {/* Google Play coming soon */}
              <div className="mt-3 flex items-center gap-2 px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-dashed border-gray-200 dark:border-gray-700 rounded-2xl">
                <span className="text-[10px] font-black uppercase tracking-widest text-amber-600 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 px-2 py-0.5 rounded-full">Soon</span>
                <span className="text-xs text-gray-400 font-semibold">Google Play — coming soon</span>
              </div>
            </article>

            {/* ── Smart Attendance — COMING SOON ── */}
            <article className="relative rounded-3xl border border-dashed border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/50 p-8">
              <span className="absolute top-6 right-6 px-3 py-1 bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-700 rounded-full text-[11px] font-black text-amber-700 dark:text-amber-400">
                COMING SOON
              </span>

              <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-6 border border-gray-200 dark:border-gray-700">
                <svg className="w-8 h-8 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
              </div>

              <h3 className="text-2xl font-black text-gray-950 dark:text-white mb-3 tracking-tight">
                Smart Attendance
              </h3>
              <p className="text-gray-400 dark:text-gray-500 leading-relaxed text-sm mb-6">
                Complete attendance and workforce management for businesses, schools and teams.
                Track attendance, manage salary records and generate reports from one app.
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {["Attendance Tracking", "Salary Management", "Reports", "Team Analytics"].map((f) => (
                  <span key={f} className="px-3 py-1.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-[11px] font-bold text-gray-400">
                    {f}
                  </span>
                ))}
              </div>

              <button disabled
                className="w-full py-3 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl text-sm font-bold text-gray-400 cursor-not-allowed">
                Notify Me When Live
              </button>
            </article>
          </div>
        </section>

        {/* ── TRUST PILLARS ── */}
        <section className="border-y border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/30">
          <div className="max-w-5xl mx-auto px-6 py-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "⚡", title: "Fast & Lightweight", body: "Optimized for everyday use on any Android device." },
              { icon: "🔒", title: "Privacy First",      body: "Minimal data collection. Offline-friendly. No tracking." },
              { icon: "🎯", title: "Purpose Built",      body: "Every feature solves a real problem. No bloat." },
              { icon: "🚀", title: "Regular Updates",    body: "Continuously improved based on real user feedback." },
            ].map(({ icon, title, body }) => (
              <div key={title} className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800">
                <div className="text-3xl mb-4">{icon}</div>
                <h3 className="font-black text-gray-950 dark:text-white mb-2 text-sm">{title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed">{body}</p>
              </div>
            ))}
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
              { q: "Are TaskGuru apps free?", a: "Yes. All TaskGuru apps are free. Core features need no subscription or account." },
              { q: "Do the apps work offline?", a: "Yes. Pro Resume Maker works fully offline — create, edit and export without any internet connection." },
              { q: "Where can I download Pro Resume Maker?", a: "Available now on the Indus App Store. Google Play version is coming soon." },
              { q: "Does the app need a login?", a: "No login, no email, no account. Open the app and start building your resume instantly." },
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
                { href: "/tools",                                    title: "Online Tools",   body: "40+ free PDF, image and AI writing tools." },
                { href: "/blog",                                     title: "Career Guides",  body: "Resume writing, ATS tips and interview prep." },
                { href: "/blog/how-to-make-resume-with-no-experience", title: "Resume Guide", body: "How to write a resume with no work experience." },
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
              Build Your Resume Today.
            </h2>
            <p className="text-gray-400 text-base leading-relaxed mb-8">
              9 ATS templates. Offline. No login. Export PDF instantly — free.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="https://indusapp.store/d6vxlznp" target="_blank" rel="noopener noreferrer"
                className="px-8 py-3.5 bg-white text-gray-950 rounded-2xl font-black text-sm hover:bg-gray-100 transition-all shadow-lg">
                Download on Indus App Store
              </a>
              <Link href="/tools/resume-maker"
                className="px-8 py-3.5 border border-gray-700 text-gray-300 rounded-2xl font-bold text-sm hover:bg-gray-800 transition-all">
                Try Web Version Free →
              </Link>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}

