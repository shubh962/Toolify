import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title:
    "TaskGuru Apps - Privacy First Android Apps for Resume, Career & Productivity",
  description:
    "Discover TaskGuru Android apps designed for students, professionals, businesses and job seekers. Create ATS-friendly resumes, manage attendance and improve productivity with fast, privacy-first applications.",
  keywords: [
    "TaskGuru Apps",
    "Resume Builder",
    "CV Maker",
    "ATS Resume Builder",
    "Smart Attendance",
    "Attendance Tracker",
    "Android Productivity Apps",
    "Resume App",
    "Career Apps",
  ],
  alternates: {
    canonical: "https://taskguru.online/apps",
  },
  openGraph: {
    title: "TaskGuru Apps",
    description:
      "Privacy-first Android applications built for productivity, resume creation and business management.",
    url: "https://taskguru.online/apps",
    siteName: "TaskGuru",
    type: "website",
  },
};

const apps = [
  {
    title: "Pro Resume Maker & CV Builder",
    description:
      "Create ATS-friendly resumes with professional templates, offline editing, PDF export and no login required.",
    url: "/apps/pro-resume-maker",
    badge: "LIVE",
    icon: "📄",
    features: [
      "ATS Templates",
      "PDF Export",
      "Offline",
      "No Login",
    ],
  },
  {
    title: "Smart Attendance",
    description:
      "Attendance tracking, salary management, reports and productivity tools for teams and businesses.",
    url: "#",
    badge: "Coming Soon",
    icon: "📊",
    features: [
      "Attendance",
      "Reports",
      "Salary",
      "Analytics",
    ],
  },
];

const schema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "TaskGuru Apps",
  description:
    "Privacy-first Android applications for resume building, attendance management and productivity.",
  url: "https://taskguru.online/apps",
};

export default function AppsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema),
        }}
      />

      <main className="bg-white min-h-screen">

        {/* HERO */}

        <section className="border-b">

          <div className="max-w-7xl mx-auto px-6 py-20">

            <div className="max-w-4xl mx-auto text-center">

              <span className="inline-flex rounded-full bg-indigo-100 text-indigo-700 px-4 py-2 text-sm font-semibold">

                Privacy First Android Apps

              </span>

              <h1 className="mt-8 text-5xl md:text-6xl font-black tracking-tight text-gray-900">

                Simple Android Apps

                <br />

                Built For Real Life

              </h1>

              <p className="mt-8 text-xl text-gray-600 leading-9">

                TaskGuru develops modern Android applications that help students,

                professionals and businesses solve everyday problems.

                From ATS-friendly resume creation to attendance management,

                every app is designed with privacy, speed and simplicity in mind.

              </p>

              <div className="mt-10 flex flex-wrap justify-center gap-4">

                <Link
                  href="#apps"
                  className="rounded-xl bg-indigo-600 px-8 py-4 text-white font-semibold hover:bg-indigo-700 transition"
                >
                  Explore Apps
                </Link>

                <Link
                  href="/blog"
                  className="rounded-xl border border-gray-300 px-8 py-4 font-semibold hover:bg-gray-50 transition"
                >
                  Read Guides
                </Link>

              </div>

            </div>

          </div>

        </section>
                {/* Featured Apps */}

        <section
          id="apps"
          className="max-w-7xl mx-auto px-6 py-20"
        >
          <div className="text-center max-w-3xl mx-auto">

            <span className="text-indigo-600 font-semibold uppercase tracking-wider">
              Featured Applications
            </span>

            <h2 className="mt-4 text-4xl font-black text-gray-900">
              Android Apps Built For Productivity
            </h2>

            <p className="mt-6 text-lg leading-8 text-gray-600">
              Every TaskGuru application focuses on solving a real problem with
              clean design, offline support and a privacy-first experience.
              No unnecessary complexity. Just useful software that works.
            </p>

          </div>

          <div className="grid lg:grid-cols-2 gap-10 mt-16">

            {/* Resume */}

            <article className="rounded-3xl border border-gray-200 p-8 hover:shadow-xl transition-all duration-300">

              <div className="flex items-center justify-between">

                <div className="text-6xl">
                  📄
                </div>

                <span className="rounded-full bg-green-100 text-green-700 px-4 py-2 text-sm font-bold">
                  LIVE
                </span>

              </div>

              <h3 className="mt-8 text-3xl font-bold text-gray-900">
                Pro Resume Maker & CV Builder
              </h3>

              <p className="mt-5 text-gray-600 leading-8">

                Create ATS-friendly resumes using professional templates,
                export high-quality PDF files instantly and build a modern
                resume without creating an account.

              </p>

              <div className="grid grid-cols-2 gap-3 mt-8">

                <div className="rounded-xl bg-gray-50 p-4">

                  ✅ ATS Friendly

                </div>

                <div className="rounded-xl bg-gray-50 p-4">

                  📄 PDF Export

                </div>

                <div className="rounded-xl bg-gray-50 p-4">

                  📱 Offline Support

                </div>

                <div className="rounded-xl bg-gray-50 p-4">

                  🔒 No Login

                </div>

              </div>

              <div className="flex gap-4 mt-10">

                <a
                  href="https://indusapp.store/d6vxlznp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white py-4 text-center font-semibold transition"
                >
                  Download App
                </a>

                <Link
                  href="/apps/pro-resume-maker"
                  className="flex-1 rounded-xl border border-gray-300 hover:bg-gray-50 py-4 text-center font-semibold transition"
                >
                  Learn More
                </Link>

              </div>

            </article>

            {/* Smart Attendance */}

            <article className="rounded-3xl border border-gray-200 p-8 hover:shadow-xl transition-all duration-300">

              <div className="flex items-center justify-between">

                <div className="text-6xl">
                  📊
                </div>

                <span className="rounded-full bg-yellow-100 text-yellow-700 px-4 py-2 text-sm font-bold">
                  COMING SOON
                </span>

              </div>

              <h3 className="mt-8 text-3xl font-bold text-gray-900">
                Smart Attendance
              </h3>

              <p className="mt-5 text-gray-600 leading-8">

                A complete attendance and workforce management solution
                designed for businesses, schools and teams. Track attendance,
                salary records and reports from one simple application.

              </p>

              <div className="grid grid-cols-2 gap-3 mt-8">

                <div className="rounded-xl bg-gray-50 p-4">

                  📍 Attendance

                </div>

                <div className="rounded-xl bg-gray-50 p-4">

                  💰 Salary

                </div>

                <div className="rounded-xl bg-gray-50 p-4">

                  📈 Reports

                </div>

                <div className="rounded-xl bg-gray-50 p-4">

                  👥 Teams

                </div>

              </div>

              <button
                disabled
                className="mt-10 w-full rounded-xl bg-gray-200 py-4 font-semibold text-gray-600 cursor-not-allowed"
              >
                Coming Soon
              </button>

            </article>

          </div>

        </section>

        {/* Trust Section */}

        <section className="bg-gray-50 py-20">

          <div className="max-w-7xl mx-auto px-6">

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

              <div className="bg-white rounded-2xl p-8">

                <div className="text-4xl">⚡</div>

                <h3 className="mt-5 font-bold text-xl">
                  Fast
                </h3>

                <p className="mt-3 text-gray-600">
                  Lightweight applications optimized for everyday use.
                </p>

              </div>

              <div className="bg-white rounded-2xl p-8">

                <div className="text-4xl">🔒</div>

                <h3 className="mt-5 font-bold text-xl">
                  Privacy First
                </h3>

                <p className="mt-3 text-gray-600">
                  Minimal data collection and offline-friendly workflows.
                </p>

              </div>

              <div className="bg-white rounded-2xl p-8">

                <div className="text-4xl">🎯</div>

                <h3 className="mt-5 font-bold text-xl">
                  Purpose Built
                </h3>

                <p className="mt-3 text-gray-600">
                  Every feature exists to solve a real productivity problem.
                </p>

              </div>

              <div className="bg-white rounded-2xl p-8">

                <div className="text-4xl">🚀</div>

                <h3 className="mt-5 font-bold text-xl">
                  Regular Updates
                </h3>

                <p className="mt-3 text-gray-600">
                  Continuous improvements based on real user feedback.
                </p>

              </div>

            </div>

          </div>

        </section>
                {/* Why TaskGuru */}

        <section className="py-24 bg-white">

          <div className="max-w-7xl mx-auto px-6">

            <div className="max-w-4xl mx-auto text-center">

              <span className="text-indigo-600 font-semibold uppercase tracking-widest">
                Why TaskGuru
              </span>

              <h2 className="mt-4 text-4xl md:text-5xl font-black text-gray-900">
                Android Apps Built Around Real Problems
              </h2>

              <p className="mt-8 text-lg leading-9 text-gray-600">

                TaskGuru develops Android applications that focus on
                productivity, career growth and business management.
                Every application is designed with simplicity, privacy and
                performance as the primary goals instead of unnecessary
                complexity.

              </p>

            </div>

          </div>

        </section>

        {/* Long SEO Content */}

        <section className="pb-24">

          <div className="max-w-6xl mx-auto px-6">

            <article className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700">

              <h2>

                Productivity Apps That Save Time Every Day

              </h2>

              <p>

                Finding reliable Android applications can be difficult.
                Many apps require account creation, subscriptions or collect
                unnecessary personal information before users can access
                basic functionality.

                TaskGuru follows a different approach.

                Every application is designed to provide a clean experience
                with modern interfaces, fast performance and features that
                solve real everyday challenges for students,
                professionals and businesses.

              </p>

              <h2>

                Professional Resume Builder for Students and Job Seekers

              </h2>

              <p>

                Pro Resume Maker helps users create ATS-friendly resumes
                using professional templates optimized for recruiters and
                Applicant Tracking Systems.

                Users can create resumes offline, export PDF files instantly,
                customize multiple sections and update their resume whenever
                required without mandatory registration.

              </p>

              <h2>

                Attendance Management Made Simple

              </h2>

              <p>

                Smart Attendance is designed to simplify attendance tracking,
                salary management and employee records for organizations,
                schools and growing businesses.

                Instead of managing spreadsheets manually, users can organize
                attendance records and generate reports from a single
                application.

              </p>

              <h2>

                Privacy First Philosophy

              </h2>

              <p>

                Privacy is an important part of every TaskGuru product.

                Applications focus on collecting only the information
                necessary for functionality while keeping the overall
                experience lightweight and user friendly.

              </p>

            </article>

          </div>

        </section>

        {/* Stats */}

        <section className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white py-24">

          <div className="max-w-7xl mx-auto px-6">

            <div className="grid md:grid-cols-4 gap-10 text-center">

              <div>

                <div className="text-5xl font-black">

                  2+

                </div>

                <p className="mt-3 text-indigo-100">

                  Android Apps

                </p>

              </div>

              <div>

                <div className="text-5xl font-black">

                  30+

                </div>

                <p className="mt-3 text-indigo-100">

                  Productivity Tools

                </p>

              </div>

              <div>

                <div className="text-5xl font-black">

                  100%

                </div>

                <p className="mt-3 text-indigo-100">

                  Privacy Focused

                </p>

              </div>

              <div>

                <div className="text-5xl font-black">

                  24×7

                </div>

                <p className="mt-3 text-indigo-100">

                  Accessible Anywhere

                </p>

              </div>

            </div>

          </div>

        </section>

        {/* Internal Navigation */}

        <section className="py-24 bg-gray-50">

          <div className="max-w-7xl mx-auto px-6">

            <h2 className="text-4xl font-black text-center text-gray-900">

              Explore More Resources

            </h2>

            <div className="grid md:grid-cols-3 gap-8 mt-14">

              <Link
                href="/tools"
                className="bg-white rounded-2xl p-8 border hover:shadow-lg transition"
              >

                <h3 className="text-2xl font-bold">

                  Online Tools

                </h3>

                <p className="mt-4 text-gray-600">

                  Free productivity tools for PDF, images,
                  text and daily work.

                </p>

              </Link>

              <Link
                href="/guides"
                className="bg-white rounded-2xl p-8 border hover:shadow-lg transition"
              >

                <h3 className="text-2xl font-bold">

                  Career Guides

                </h3>

                <p className="mt-4 text-gray-600">

                  Learn resume writing, interview preparation
                  and productivity tips.

                </p>

              </Link>

              <Link
                href="/blog"
                className="bg-white rounded-2xl p-8 border hover:shadow-lg transition"
              >

                <h3 className="text-2xl font-bold">

                  Latest Articles

                </h3>

                <p className="mt-4 text-gray-600">

                  Explore in-depth tutorials,
                  technology insights and practical resources.

                </p>

              </Link>

            </div>

          </div>

        </section>
                {/* FAQ */}

        <section className="py-24 bg-white">

          <div className="max-w-5xl mx-auto px-6">

            <div className="text-center">

              <span className="text-indigo-600 font-semibold uppercase tracking-widest">
                Frequently Asked Questions
              </span>

              <h2 className="mt-4 text-4xl font-black text-gray-900">
                Everything You Need To Know
              </h2>

            </div>

            <div className="mt-14 space-y-8">

              <div className="border rounded-2xl p-8">

                <h3 className="text-2xl font-bold">

                  What is TaskGuru?

                </h3>

                <p className="mt-4 text-gray-600 leading-8">

                  TaskGuru is a productivity platform that provides Android
                  applications, online utilities and educational guides for
                  students, professionals and businesses.

                </p>

              </div>

              <div className="border rounded-2xl p-8">

                <h3 className="text-2xl font-bold">

                  Which Android apps are available?

                </h3>

                <p className="mt-4 text-gray-600 leading-8">

                  TaskGuru currently offers Pro Resume Maker & CV Builder and
                  is expanding with Smart Attendance and additional
                  productivity applications.

                </p>

              </div>

              <div className="border rounded-2xl p-8">

                <h3 className="text-2xl font-bold">

                  Are TaskGuru apps free?

                </h3>

                <p className="mt-4 text-gray-600 leading-8">

                  Most core features are available without subscriptions,
                  allowing users to complete essential tasks quickly and
                  efficiently.

                </p>

              </div>

              <div className="border rounded-2xl p-8">

                <h3 className="text-2xl font-bold">

                  Why choose TaskGuru Apps?

                </h3>

                <p className="mt-4 text-gray-600 leading-8">

                  TaskGuru focuses on privacy-first experiences, modern user
                  interfaces, offline support and practical features that
                  solve everyday productivity and career challenges.

                </p>

              </div>

            </div>

          </div>

        </section>

        {/* CTA */}

        <section className="py-24 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700">

          <div className="max-w-5xl mx-auto px-6 text-center">

            <h2 className="text-5xl font-black text-white">

              Build Faster. Work Smarter.

            </h2>

            <p className="mt-8 text-xl leading-9 text-indigo-100">

              Discover Android applications and productivity resources
              designed to simplify work, career growth and everyday tasks.

            </p>

            <div className="flex flex-wrap justify-center gap-5 mt-12">

              <a
                href="https://indusapp.store/d6vxlznp"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl bg-white text-indigo-700 px-10 py-4 font-bold hover:scale-105 transition"
              >

                Download Resume Maker

              </a>

              <Link
                href="/guides"
                className="rounded-xl border border-white text-white px-10 py-4 font-bold hover:bg-white hover:text-indigo-700 transition"
              >

                Explore Guides

              </Link>

            </div>

          </div>

        </section>

      </main>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What is TaskGuru?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "TaskGuru is a platform offering Android apps, productivity tools and educational resources.",
                },
              },
              {
                "@type": "Question",
                name: "Which apps are available?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Pro Resume Maker & CV Builder is available, with Smart Attendance coming soon.",
                },
              },
              {
                "@type": "Question",
                name: "Are TaskGuru apps free?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Most core features are available without subscriptions or mandatory accounts.",
                },
              },
              {
                "@type": "Question",
                name: "Why use TaskGuru?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "TaskGuru builds privacy-first Android applications designed for productivity, career growth and business management.",
                },
              },
            ],
          }),
        }}
      />

    </>
  );
}
