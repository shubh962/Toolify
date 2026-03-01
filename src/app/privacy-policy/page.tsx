import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import {
  ShieldCheck,
  Lock,
  Eye,
  Globe,
  Mail,
  ShieldAlert,
  FileSearch,
  Scale,
  Fingerprint,
  Cookie,
  UserCheck,
  RefreshCw,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | TaskGuru — Secure & Transparent Data Standards",
  description:
    "Read the TaskGuru Privacy Policy. We detail our Zero-Storage guarantee, Google AdSense compliance, DART cookies, GDPR rights, and data security practices.",
  alternates: {
    canonical: "https://www.taskguru.online/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <main className="p-6 max-w-4xl mx-auto py-20 font-sans leading-relaxed text-gray-800 dark:text-gray-200">

      {/* Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center p-4 bg-indigo-50 dark:bg-indigo-900/30 rounded-full mb-4 shadow-sm">
          <ShieldCheck className="w-10 h-10 text-indigo-600" />
        </div>
        <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight text-gray-900 dark:text-white">
          Privacy Policy
        </h1>
        {/* ✅ Updated to 2026 */}
        <p className="text-sm text-indigo-500 uppercase tracking-widest font-bold">
          Effective Date: January 1, 2026 · Last Updated: March 1, 2026
        </p>
      </div>

      <div className="space-y-12 text-base md:text-lg">

        {/* Personal intro */}
        <div className="bg-indigo-50 dark:bg-gray-900/50 p-8 rounded-3xl border-l-8 border-indigo-600 shadow-sm">
          <p className="italic leading-relaxed">
            <strong>A Personal Message:</strong> I am Shubham Gautam, the founder of
            TaskGuru. I believe privacy is a basic human right — not just a legal checkbox.
            This policy gives you a clear, honest look at how we handle your information.
            We don&apos;t hide behind jargon. We build for humans.
          </p>
        </div>

        {/* 1. Overview */}
        <section>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-3 text-gray-900 dark:text-white">
            <Eye className="w-7 h-7 text-indigo-600" /> 1. Overview
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-400 leading-relaxed">
            TaskGuru (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) operates the website{" "}
            <strong>taskguru.online</strong>. This Privacy Policy explains what information
            we collect, how we use it, and what rights you have over your data. By using
            our website, you agree to the practices described in this policy.
          </p>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            Most of our tools work completely anonymously. We do not require sign-up,
            credit card details, or social media login to use any of our core features.
          </p>
        </section>

        {/* 2. Information We Collect */}
        <section>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-gray-900 dark:text-white">
            <Fingerprint className="w-7 h-7 text-indigo-600" /> 2. Information We Collect
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: <Fingerprint className="w-4 h-4 text-indigo-500" />,
                title: "Personal Information",
                body: "We only receive your name or email if you voluntarily contact us for support via email. We never collect this automatically and never share it with third parties or marketing firms.",
              },
              {
                icon: <Globe className="w-4 h-4 text-indigo-500" />,
                title: "Log Data",
                body: "When you visit our site, we automatically collect standard log data including your IP address, browser type, pages visited, and time spent. This data is retained for up to 30 days for security and performance monitoring only.",
              },
              {
                icon: <Cookie className="w-4 h-4 text-indigo-500" />,
                title: "Cookies",
                body: "We use cookies to improve your experience and to serve relevant advertisements. You can instruct your browser to refuse all cookies or indicate when a cookie is being sent.",
              },
              {
                icon: <FileSearch className="w-4 h-4 text-indigo-500" />,
                title: "Uploaded Files",
                body: "Files you upload for processing (PDFs, images, documents) are processed in temporary memory and immediately deleted after your result is ready. They are never written to permanent storage or shared.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="p-6 border border-gray-100 dark:border-gray-800 rounded-2xl"
              >
                <h3 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                  {item.icon} {item.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Google AdSense & Advertising — MOST IMPORTANT FOR ADSENSE APPROVAL */}
        <section className="bg-indigo-600 p-8 md:p-10 rounded-[2.5rem] text-white shadow-xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3">
            <ShieldAlert className="w-8 h-8 text-indigo-200" /> 3. Advertising & Third-Party Cookies
          </h2>
          <p className="mb-6 opacity-95 leading-relaxed">
            To keep TaskGuru 100% free, we display advertisements through{" "}
            <strong>Google AdSense</strong>. Google, as a third-party vendor, uses cookies
            to serve ads based on your prior visits to our website and other sites on the
            internet.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white/10 p-6 rounded-2xl border border-white/20">
              <h4 className="font-bold mb-3 text-lg">DART Cookies</h4>
              <p className="text-sm leading-relaxed opacity-90">
                Google uses the <strong>DART cookie</strong> to serve ads based on your
                visits to our site and other sites on the internet. The DART cookie does
                not track personal details like your name or email address — only your
                general interests to show more relevant ads.
              </p>
            </div>
            <div className="bg-white/10 p-6 rounded-2xl border border-white/20">
              <h4 className="font-bold mb-3 text-lg">Third-Party Vendors</h4>
              <p className="text-sm leading-relaxed opacity-90">
                Third-party ad servers or ad networks use technologies like cookies,
                JavaScript, or web beacons in their advertisements. These are sent
                directly to your browser. TaskGuru has no access to or control over
                the cookies used by third-party advertisers.
              </p>
            </div>
          </div>

          {/* Opt-out — required by AdSense */}
          <div className="bg-white p-6 md:p-8 rounded-2xl text-indigo-900">
            <h4 className="font-bold mb-3 flex items-center gap-2 text-lg">
              <Lock className="w-5 h-5 text-indigo-600" /> Your Ad Privacy Controls
            </h4>
            <p className="text-sm mb-5 leading-relaxed">
              You can opt out of personalized advertising at any time. Google provides
              tools to manage your ad preferences:
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="https://www.google.com/settings/ads"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center bg-indigo-600 text-white px-5 py-3 rounded-xl font-black text-sm hover:bg-indigo-700 transition"
              >
                Manage Google Ad Settings →
              </a>
              <a
                href="https://www.google.com/policies/privacy/partners/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center bg-indigo-50 text-indigo-700 px-5 py-3 rounded-xl font-bold text-sm hover:bg-indigo-100 transition"
              >
                Google Privacy & Partners →
              </a>
            </div>
          </div>
        </section>

        {/* 4. Zero Storage Architecture */}
        <section>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-gray-900 dark:text-white">
            <FileSearch className="w-7 h-7 text-green-600" /> 4. Zero-Storage File Processing
          </h2>
          <p className="mb-6 text-gray-600 dark:text-gray-400">
            For a tool-based platform, how your files are handled is the most critical
            privacy factor. TaskGuru uses edge runtime processing with the following
            commitment:
          </p>
          <div className="p-6 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 mb-4">
            <div className="flex flex-wrap gap-3 items-center text-sm font-black text-indigo-600 uppercase tracking-widest mb-4">
              <span className="bg-indigo-100 px-3 py-1 rounded-lg">Upload</span>
              <span>→</span>
              <span className="bg-indigo-100 px-3 py-1 rounded-lg">Encrypt</span>
              <span>→</span>
              <span className="bg-indigo-100 px-3 py-1 rounded-lg">Process</span>
              <span>→</span>
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-lg">Purge</span>
            </div>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              {[
                "Files are held in temporary encrypted memory (RAM) only — never written to disk",
                "Files are automatically deleted immediately after processing is complete",
                "No file metadata is retained after your session ends",
                "We never share, sell, or analyze your uploaded files",
              ].map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-green-500 flex-shrink-0">✓</span> {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 5. How We Use Your Information */}
        <section>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-3 text-gray-900 dark:text-white">
            <UserCheck className="w-7 h-7 text-indigo-600" /> 5. How We Use Your Information
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-400">
            We use the information we collect only for the following purposes:
          </p>
          <ul className="space-y-2 text-gray-600 dark:text-gray-400">
            {[
              "To operate and improve the TaskGuru platform and tools",
              "To monitor and protect against security threats and abuse",
              "To respond to support requests you send us by email",
              "To display relevant advertisements via Google AdSense",
              "To analyze aggregate traffic patterns and improve performance",
            ].map((item) => (
              <li key={item} className="flex gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-xl text-sm">
                <span className="text-indigo-500 flex-shrink-0">→</span> {item}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-gray-500">
            We do <strong>not</strong> sell your personal information. We do not use your
            data for automated decision-making or profiling.
          </p>
        </section>

        {/* 6. GDPR — ✅ New section */}
        <section className="border border-indigo-100 dark:border-indigo-900 rounded-2xl p-6 md:p-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-3 text-gray-900 dark:text-white">
            <Globe className="w-7 h-7 text-indigo-600" /> 6. Your Rights (GDPR & Global Users)
          </h2>
          <p className="mb-4 text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
            If you are located in the European Economic Area (EEA) or the United Kingdom,
            you have the following rights regarding your personal data under GDPR:
          </p>
          <div className="grid md:grid-cols-2 gap-3">
            {[
              { right: "Right to Access", desc: "Request a copy of the personal data we hold about you." },
              { right: "Right to Rectification", desc: "Request correction of any inaccurate personal data." },
              { right: "Right to Erasure", desc: "Request deletion of your personal data where applicable." },
              { right: "Right to Object", desc: "Object to processing of your data for direct marketing." },
              { right: "Right to Data Portability", desc: "Receive your data in a structured, machine-readable format." },
              { right: "Right to Withdraw Consent", desc: "Withdraw consent at any time where we rely on it." },
            ].map((item) => (
              <div key={item.right} className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
                <p className="font-bold text-gray-800 dark:text-white text-sm mb-1">{item.right}</p>
                <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-gray-500">
            To exercise any of these rights, contact us at{" "}
            <strong>GautamShubham962@gmail.com</strong>. We will respond within 30 days.
          </p>
        </section>

        {/* 7. California / CCPA — ✅ New section */}
        <section>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-3 text-gray-900 dark:text-white">
            <Scale className="w-7 h-7 text-indigo-600" /> 7. California Privacy Rights (CCPA)
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
            If you are a California resident, you have rights under the California Consumer
            Privacy Act (CCPA) including the right to know what personal information we
            collect, the right to delete it, and the right to opt out of the sale of your
            personal information.
          </p>
          <div className="bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-800 rounded-2xl p-5">
            <p className="text-sm font-bold text-yellow-800 dark:text-yellow-400">
              📢 Important: TaskGuru does NOT sell personal information to third parties.
              We never have and never will.
            </p>
          </div>
        </section>

        {/* 8. Children's Privacy */}
        <section>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-3 text-gray-900 dark:text-white">
            <ShieldCheck className="w-7 h-7 text-indigo-600" /> 8. Children&apos;s Privacy
          </h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            TaskGuru does not knowingly collect personally identifiable information from
            children under the age of 13. If you are a parent or guardian and believe your
            child has provided us with personal information, please contact us immediately
            at <strong>GautamShubham962@gmail.com</strong>. We will promptly delete any
            such information from our records upon verification.
          </p>
        </section>

        {/* 9. Policy Updates */}
        <section>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-3 text-gray-900 dark:text-white">
            <RefreshCw className="w-7 h-7 text-indigo-600" /> 9. Changes to This Policy
          </h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            We may update this Privacy Policy from time to time. Any changes will be
            posted on this page with an updated &quot;Last Updated&quot; date at the top.
            We encourage you to review this policy periodically. Continued use of TaskGuru
            after any changes constitutes your acceptance of the updated policy.
          </p>
        </section>

        {/* 10. Contact */}
        <section className="pt-8 border-t border-gray-200 dark:border-gray-800">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-gray-900 dark:text-white">
            <Mail className="w-7 h-7 text-indigo-600" /> 10. Contact Us
          </h2>
          <p className="mb-6 text-gray-600 dark:text-gray-400">
            If you have any questions about this Privacy Policy, your data, or our
            practices, please contact us:
          </p>
          <div className="p-8 md:p-10 bg-gray-900 dark:bg-black text-white rounded-[2.5rem] shadow-2xl text-center border-b-8 border-indigo-600">
            <p className="text-xs uppercase tracking-[0.2em] opacity-60 mb-3 font-black">
              Privacy & Support Contact
            </p>
            <p className="text-xl md:text-3xl font-black text-indigo-400 mb-3 break-all">
              GautamShubham962@gmail.com
            </p>
            <p className="text-sm opacity-70 max-w-md mx-auto mb-4">
              I personally monitor this inbox. I aim to respond to all privacy-related
              inquiries within 2 business days.
            </p>
            <p className="text-xs opacity-50">
              TaskGuru · Developed by Shubham Gautam · Made in India 🇮🇳
            </p>
          </div>
        </section>

      </div>

      {/* ✅ Fixed footer — 2026, removed "Toolify" */}
      <footer className="mt-20 text-center text-sm text-gray-500 border-t pt-10">
        <p className="mb-2 font-bold uppercase tracking-widest">
          © {new Date().getFullYear()} TaskGuru — All Rights Reserved
        </p>
        <p className="italic">Built for speed. Designed for privacy. Engineered for you.</p>
        <div className="flex justify-center gap-6 mt-4 text-xs">
          <Link href="/terms" className="hover:text-indigo-600 transition-colors">
            Terms of Use
          </Link>
          <Link href="/disclaimer" className="hover:text-indigo-600 transition-colors">
            Disclaimer
          </Link>
          <Link href="/contact" className="hover:text-indigo-600 transition-colors">
            Contact
          </Link>
        </div>
      </footer>
    </main>
  );
}
