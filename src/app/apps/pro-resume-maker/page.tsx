import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Pro Resume Maker & CV Builder | ATS Resume App for Android | TaskGuru",
  description:
    "Create ATS-friendly resumes with 9 professional templates. Offline resume builder with instant PDF export, no login required and privacy-first design.",
  keywords: [
    "resume maker",
    "cv builder",
    "ats resume",
    "resume app",
    "resume templates",
    "pdf resume",
    "android resume maker",
    "job resume",
    "cv maker",
  ],
  alternates: {
    canonical: "https://www.taskguru.online/apps/pro-resume-maker",
  },
  openGraph: {
    title: "Pro Resume Maker & CV Builder",
    description:
      "Professional ATS-friendly resume builder with offline editing and instant PDF export.",
    url: "https://www.taskguru.online/apps/pro-resume-maker",
    siteName: "TaskGuru",
    type: "website",
  },
};

export default function ProResumeMakerPage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-12">

      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/">Home</Link> /
        <Link href="/apps"> Apps</Link> /
        <span> Pro Resume Maker</span>
      </nav>

      <h1 className="text-5xl font-bold mb-6">
        Pro Resume Maker & CV Builder
      </h1>

      <p className="text-xl text-gray-600 mb-8">
        Build ATS-friendly resumes directly from your Android phone with
        professional templates, instant PDF export and offline editing.
      </p>

      <div className="flex flex-wrap gap-4 mb-12">

        <a
          href="https://indusapp.store/d6vxlznp"
          target="_blank"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold"
        >
          Download from Indus App Store
        </a>

        <Link
          href="/blog/how-to-make-resume-with-no-experience"
          className="border px-6 py-3 rounded-lg font-semibold"
        >
          Resume Guide
        </Link>

      </div>

      <section className="grid md:grid-cols-2 gap-10 mb-16">

        <div>

          <h2 className="text-3xl font-bold mb-4">
            Why Choose Pro Resume Maker?
          </h2>

          <ul className="space-y-3">

            <li>✅ 9 ATS-Friendly Resume Templates</li>

            <li>✅ Instant PDF Export</li>

            <li>✅ Offline Resume Builder</li>

            <li>✅ No Login Required</li>

            <li>✅ Privacy First</li>

            <li>✅ Professional CV Layouts</li>

          </ul>

        </div>

        <div>

          <h2 className="text-3xl font-bold mb-4">
            Perfect For
          </h2>

          <ul className="space-y-3">

            <li>• Freshers</li>

            <li>• Students</li>

            <li>• Working Professionals</li>

            <li>• Career Switchers</li>

            <li>• Internship Applicants</li>

          </ul>

        </div>

      </section>

      <section className="mb-16">

        <h2 className="text-3xl font-bold mb-6">
          Key Features
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          <div className="border rounded-xl p-6">
            <h3 className="font-bold text-xl mb-2">
              ATS Optimized
            </h3>

            <p>
              Clean layouts designed to improve compatibility with Applicant
              Tracking Systems.
            </p>
          </div>

          <div className="border rounded-xl p-6">
            <h3 className="font-bold text-xl mb-2">
              Professional Templates
            </h3>

            <p>
              Choose from multiple modern resume designs suitable for every
              profession.
            </p>
          </div>

          <div className="border rounded-xl p-6">
            <h3 className="font-bold text-xl mb-2">
              Offline Editing
            </h3>

            <p>
              Build and edit resumes anytime without an internet connection.
            </p>
          </div>

        </div>

      </section>

      <section className="mb-16">

        <h2 className="text-3xl font-bold mb-6">
          Related Resume Guides
        </h2>

        <ul className="space-y-3">

          <li>
            <Link
              className="text-blue-600"
              href="/blog/how-to-make-resume-with-no-experience"
            >
              How to Make a Resume With No Experience
            </Link>
          </li>

          <li>
            <Link
              className="text-blue-600"
              href="/blog/resume-ats-secrets"
            >
              ATS Resume Secrets
            </Link>
          </li>

          <li>
            <Link
              className="text-blue-600"
              href="/blog/how-to-write-professional-english-emails"
            >
              Professional Email Writing Guide
            </Link>
          </li>

        </ul>

      </section>

      <section className="bg-gray-100 rounded-2xl p-10 text-center">

        <h2 className="text-4xl font-bold mb-4">
          Start Building Your Resume Today
        </h2>

        <p className="text-lg mb-8">
          Create a professional ATS-friendly resume in minutes and export it as
          PDF directly from your Android device.
        </p>

        <a
          href="https://indusapp.store/d6vxlznp"
          target="_blank"
          className="inline-block bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-bold"
        >
          Download Pro Resume Maker
        </a>

      </section>

    </main>
  );
}
