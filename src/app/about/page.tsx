import Link from "next/link";
import Image from "next/image";
import {
  ShieldCheck,
  Mail,
  MapPin,
  Award,
  Lock,
  Cpu,
  Zap,
  Layers,
  Heart,
  Search,
  ShieldAlert,
  BookOpen,
  Users,
  Globe,
} from "lucide-react";
import type { Metadata } from "next";

// ✅ Fixed metadata
export const metadata: Metadata = {
  title: "About TaskGuru | Our Story, Mission & Privacy Standards",
  description:
    "Discover the story of TaskGuru, founded by Shubham Gautam. Learn about our AI-driven free tools, zero-storage data policy, and mission to make the web accessible for everyone.",
  alternates: {
    canonical: "https://www.taskguru.online/about",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "About TaskGuru | Our Story, Mission & Privacy Standards",
    description:
      "Meet Shubham Gautam, founder of TaskGuru. Learn how we build free, private, and fast tools for everyone.",
    type: "website",
    url: "https://www.taskguru.online/about",
  },
};

const stats = [
  { icon: <BookOpen className="w-6 h-6" />, value: "14+", label: "Free Tools" },
  { icon: <Users className="w-6 h-6" />, value: "10K+", label: "Monthly Users" },
  { icon: <Globe className="w-6 h-6" />, value: "50+", label: "Languages Supported" },
  { icon: <Award className="w-6 h-6" />, value: "2024", label: "Founded" },
];

export default function AboutPage() {
  return (
    <main className="p-6 max-w-5xl mx-auto py-20 font-sans leading-relaxed text-gray-800 dark:text-gray-200">

      {/* 1. Hero */}
      <section className="text-center mb-20">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-50 text-indigo-700 rounded-full text-xs font-black uppercase mb-6 border border-indigo-100">
          Made in India 🇮🇳
        </div>
        <h1 className="text-4xl md:text-6xl font-black mb-6 text-gray-900 dark:text-white leading-tight tracking-tight">
          More Than Just Tools:{" "}
          <span className="text-indigo-600">The Story of TaskGuru</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-500 dark:text-gray-400 max-w-3xl mx-auto italic leading-relaxed">
          &quot;I started TaskGuru because I was tired of paywalls, annoying ads,
          and tools that felt like they were spying on me.&quot;
        </p>

        {/* Stats bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
          {stats.map((s) => (
            <div
              key={s.label}
              className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900 rounded-2xl p-5"
            >
              <div className="text-indigo-600 flex justify-center mb-2">{s.icon}</div>
              <p className="text-2xl font-black text-gray-900 dark:text-white">{s.value}</p>
              <p className="text-xs text-gray-500 uppercase tracking-wide font-bold">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Founder Story */}
      <section className="grid md:grid-cols-3 gap-12 items-center mb-24 border-b pb-16 dark:border-gray-800">
        <div className="md:col-span-1">
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-1 rounded-3xl shadow-2xl">
            <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl text-center">
              <div className="w-32 h-32 mx-auto mb-4 relative overflow-hidden rounded-full border-4 border-indigo-100 dark:border-indigo-900 bg-indigo-50 dark:bg-gray-800">
                {/* ✅ Your actual photo — make sure /public/shubham.jpg exists */}
                <Image
                  src="/shubham.jpg"
                  alt="Shubham Gautam — Founder of TaskGuru"
                  fill
                  className="object-cover"
                  sizes="128px"
                  priority
                />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Shubham Gautam
              </h2>
              <p className="text-indigo-500 font-medium text-sm mt-1">
                Founder & Lead Developer
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {["Next.js", "AI Tools", "Full-Stack"].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 rounded-full text-[10px] font-bold uppercase tracking-wider border border-indigo-100 dark:border-indigo-900"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-2 space-y-5">
          <h3 className="text-3xl font-bold flex items-center gap-2">
            <Heart className="text-red-500 w-7 h-7" /> A Passion for Simplicity
          </h3>
          <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
            Hi, I&apos;m Shubham. My journey with TaskGuru didn&apos;t start in a boardroom — it
            started at my desk at midnight. Like many developers and students, I constantly
            needed to perform quick digital tasks: compressing a PDF, converting an image,
            removing a background.
          </p>
          <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
            What should have been a 10-second task always turned into a 10-minute struggle.
            Most sites were cluttered with fake &quot;Download Now&quot; buttons, or they asked
            for a credit card just to remove a background. I felt the internet deserved better.
          </p>
          <p className="text-lg leading-relaxed font-semibold text-indigo-600 dark:text-indigo-400">
            So I used my background in Full-Stack Development to build a platform that is
            fast, ethical, and actually helpful — and kept it 100% free.
          </p>
        </div>
      </section>

      {/* 3. Technical Expertise */}
      <section className="mb-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Under the Hood of TaskGuru
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            We don&apos;t use generic scripts. We engineer real solutions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              icon: <Cpu className="w-8 h-8" />,
              title: "Advanced AI Models",
              body: "For image and content tools, we use machine learning models trained for accuracy. Whether removing a complex background or paraphrasing text, our algorithms analyze semantic structure to produce professional results — and are updated continuously.",
            },
            {
              icon: <Layers className="w-8 h-8" />,
              title: "Edge Computing for Speed",
              body: "Traditional websites process your files on a single slow server. TaskGuru uses Vercel's Edge Network — meaning tools run on servers physically closest to you. The result: near-instant processing, even for large files.",
            },
            {
              icon: <Lock className="w-8 h-8" />,
              title: "Zero-Storage Architecture",
              body: "Every file you upload is processed in temporary encrypted memory and deleted the moment your result is ready. Nothing is ever written to a permanent database. Your files stay private — always.",
            },
            {
              icon: <Zap className="w-8 h-8" />,
              title: "Built on Next.js 15",
              body: "TaskGuru is built on Next.js 15 with the App Router, giving us server-side rendering, static generation, and edge functions — all in one stack. This means faster pages, better SEO, and a smoother experience for you.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="space-y-4 p-8 bg-gray-50 dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 hover:shadow-lg transition"
            >
              <div className="flex items-center gap-3 text-indigo-600">
                {item.icon}
                <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                  {item.title}
                </h4>
              </div>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Privacy Section — ✅ Fixed contradicting cookie claim */}
      <section className="mb-24 bg-indigo-900 text-white p-10 md:p-16 rounded-[3rem] shadow-2xl">
        <h2 className="text-3xl md:text-5xl font-bold mb-8 flex items-center gap-4">
          <ShieldCheck className="w-12 h-12 text-green-400" /> Your Data is Protected
        </h2>
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-4">
            <h4 className="text-xl font-bold flex items-center gap-2 text-indigo-200">
              <Lock className="w-5 h-5" /> The Zero-Storage Promise
            </h4>
            <p className="text-indigo-100 leading-relaxed text-sm">
              Many free sites monetize your data. At TaskGuru, your files never touch a
              persistent database. When you upload a file, it exists in a temporary
              encrypted memory buffer only. The moment your result is ready, that data
              is permanently wiped from our servers.
            </p>
          </div>
          <div className="space-y-4">
            {/* ✅ Fixed — no longer contradicts AdSense cookie disclosure */}
            <h4 className="text-xl font-bold flex items-center gap-2 text-indigo-200">
              <ShieldAlert className="w-5 h-5" /> Transparent Advertising
            </h4>
            <p className="text-indigo-100 leading-relaxed text-sm">
              To keep TaskGuru free, we display ads via Google AdSense. We are fully
              transparent about this — Google may use cookies to show relevant ads.
              You can manage your ad preferences anytime at{" "}
              <a
                href="https://www.google.com/settings/ads"
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-indigo-300 hover:text-white"
              >
                google.com/settings/ads
              </a>
              . We never sell your personal data.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Quality Standards */}
      <section className="mb-24 text-center">
        <Search className="w-16 h-16 text-indigo-500 mx-auto mb-6" />
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
          Our Quality Standards
        </h2>
        <div className="max-w-4xl mx-auto space-y-6 text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
          <p>
            Every tool on TaskGuru is manually tested before publishing. We don&apos;t
            believe in low-value content. If a tool isn&apos;t reliable or a guide
            isn&apos;t genuinely helpful, it doesn&apos;t go live.
          </p>
          <p>
            We focus on <strong className="text-gray-800 dark:text-gray-200">manual curation</strong> — 
            constantly refining our UI, ensuring tutorials are easy to follow, and keeping 
            our code bug-free. TaskGuru is a human-driven project solving real-world 
            digital friction, not a mass-produced bot site.
          </p>
        </div>

        {/* ✅ Values grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
          {[
            { emoji: "🚀", label: "Fast" },
            { emoji: "🔒", label: "Private" },
            { emoji: "💸", label: "Free Forever" },
            { emoji: "🧑‍💻", label: "Human-Made" },
          ].map((v) => (
            <div
              key={v.label}
              className="bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-5"
            >
              <p className="text-3xl mb-2">{v.emoji}</p>
              <p className="font-bold text-gray-800 dark:text-gray-200 text-sm">{v.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Contact */}
      <section className="border-t pt-16 dark:border-gray-800">
        <div className="bg-gray-50 dark:bg-gray-900 p-10 rounded-3xl border border-gray-100 dark:border-gray-800">
          <h3 className="text-2xl font-bold mb-8 text-center text-gray-900 dark:text-white">
            Let&apos;s Keep In Touch
          </h3>
          <div className="flex flex-wrap justify-around gap-10">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-white dark:bg-gray-800 shadow-md rounded-full flex items-center justify-center mb-3 text-indigo-600">
                <Mail className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">
                Email Support
              </span>
              {/* ✅ Fixed email capitalization */}
              <span className="text-base font-medium text-gray-700 dark:text-gray-300">
                GautamShubham962@gmail.com
              </span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-white dark:bg-gray-800 shadow-md rounded-full flex items-center justify-center mb-3 text-indigo-600">
                <MapPin className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">
                Base Location
              </span>
              <span className="text-base font-medium text-gray-700 dark:text-gray-300">
                Uttar Pradesh, India
              </span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-white dark:bg-gray-800 shadow-md rounded-full flex items-center justify-center mb-3 text-indigo-600">
                <Award className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">
                Established
              </span>
              <span className="text-base font-medium text-gray-700 dark:text-gray-300">
                January 2024
              </span>
            </div>
          </div>
          <div className="mt-10 text-center text-gray-500 text-sm italic">
            TaskGuru is a project by Shubham Gautam. Read our{" "}
            <Link href="/privacy-policy" className="underline hover:text-indigo-600">
              Privacy Policy
            </Link>{" "}
            and{" "}
            <Link href="/terms" className="underline hover:text-indigo-600">
              Terms of Use
            </Link>
            .
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <div className="text-center mt-20">
        <Link
          href="/#tools"
          className="inline-flex items-center px-10 py-5 bg-indigo-600 text-white font-bold rounded-full shadow-2xl hover:bg-indigo-700 transition transform hover:scale-105"
        >
          <Zap className="w-5 h-5 mr-2" /> Start Exploring Our Free Tools
        </Link>
      </div>
    </main>
  );
      }
