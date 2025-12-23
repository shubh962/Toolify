import type { Metadata } from "next";
import { ShieldAlert, Info, Lock, Globe, Mail, AlertTriangle, Scale } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Official Disclaimer | TaskGuru (Toolify) Usage Policy",
  description:
    "Official disclaimer for TaskGuru (Toolify). Understand our AI tool limitations, zero-storage privacy policy, and user responsibilities.",
  alternates: {
    canonical: "https://www.taskguru.online/disclaimer",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function DisclaimerPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-16 text-gray-800 dark:text-gray-200 leading-relaxed">
      {/* Header Section */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center p-3 bg-red-100 dark:bg-red-900/30 rounded-full mb-4">
          <ShieldAlert className="w-8 h-8 text-red-600 dark:text-red-400" />
        </div>
        <h1 className="text-4xl font-black mb-4 tracking-tight">Legal Disclaimer</h1>
        <p className="text-sm text-muted-foreground uppercase tracking-widest font-bold">
          Last updated: December 2025
        </p>
      </div>

      <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
        <p className="bg-muted p-6 rounded-2xl border-l-4 border-primary italic">
          Welcome to <strong>TaskGuru (Toolify)</strong>. Transparency is at the heart of our mission. This disclaimer is designed to protect both the user and the platform by outlining the boundaries of our digital services and AI-powered utilities.
        </p>

        {/* General Information Section */}
        <section>
          <h2 className="text-2xl font-bold flex items-center gap-2 text-primary">
            <Info className="w-6 h-6" /> 1. Nature of Services
          </h2>
          <p>
            TaskGuru (Toolify) provides a diverse suite of productivity tools—including 
            <strong> <Link href="/tools/background-remover" className="underline">Background Removers</Link></strong>, 
            <strong> <Link href="/tools/merge-pdf" className="underline">PDF Mergers</Link></strong>, and 
            <strong> <Link href="/tools/resume-maker" className="underline">Resume Builders</Link></strong>. 
            All services are provided on an "as-is" and "as-available" basis. While we strive for 99.9% uptime, we do not guarantee uninterrupted access or error-free outputs for every specific use case.
          </p>
        </section>

        {/* AI Content Section - Crucial for AdSense */}
        <section className="bg-yellow-50 dark:bg-yellow-900/10 p-8 rounded-[2rem] border border-yellow-200 dark:border-yellow-800">
          <h2 className="text-2xl font-bold flex items-center gap-2 text-yellow-700 dark:text-yellow-500">
            <AlertTriangle className="w-6 h-6" /> 2. AI-Generated Outputs
          </h2>
          <p>
            Many of our tools leverage advanced machine learning models. Please be aware that AI-generated content can occasionally contain inaccuracies, hallucinations, or unexpected artifacts. We strongly recommend that users manually verify all critical outputs—especially professional resumes or legal PDF merges—before final use.
          </p>
        </section>

        {/* Privacy & File Handling Section */}
        <section>
          <h2 className="text-2xl font-bold flex items-center gap-2 text-green-600">
            <Lock className="w-6 h-6" /> 3. Data Privacy & "Zero-Storage" Policy
          </h2>
          <p>
            In alignment with our <strong> <Link href="/privacy-policy" className="underline">Privacy Policy</Link></strong>, TaskGuru employs transient processing. This means your files are processed in volatile memory and are not stored permanently on our servers. However, users are advised not to upload highly sensitive or classified government documents as an added layer of self-precaution.
          </p>
        </section>

        {/* Limitation of Liability Section */}
        <section>
          <h2 className="text-2xl font-bold flex items-center gap-2 text-red-600">
            <Scale className="w-6 h-6" /> 4. Limitation of Liability
          </h2>
          <p>
            Under no circumstances shall TaskGuru, its founder <strong>Shubham Gautam</strong>, or its affiliates be held liable for any direct, indirect, or consequential damages resulting from the use of our tools. This includes, but is not limited to, loss of data, loss of profits, or errors in document processing. Use of this platform is entirely at your own risk.
          </p>
        </section>

        {/* External Links Section */}
        <section>
          <h2 className="text-2xl font-bold flex items-center gap-2 text-blue-600">
            <Globe className="w-6 h-6" /> 5. External Third-Party Links
          </h2>
          <p>
            Our website may include links to external sites (e.g., social media or educational resources). TaskGuru has no control over the privacy practices or content of these third-party websites and assumes no responsibility for their policies.
          </p>
        </section>

        {/* Contact Details Section */}
        <section className="mt-12 pt-8 border-t border-border">
          <h2 className="text-2xl font-bold mb-4">Questions or Concerns?</h2>
          <p className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-primary" /> 
            <strong>Email:</strong> 
            <a href="mailto:gautamshubham962@gmail.com" className="text-primary hover:underline font-bold ml-1">
              gautamshubham962@gmail.com
            </a>
          </p>
          <p className="flex items-center gap-2 mt-2">
            <Globe className="w-5 h-5 text-primary" /> 
            <strong>Official Website:</strong> 
            <Link href="/" className="text-primary hover:underline font-bold ml-1">
              https://taskguru.online
            </Link>
          </p>
        </section>
      </div>

      <footer className="mt-20 text-center text-sm text-muted-foreground italic">
        TaskGuru (Toolify) is committed to providing free, high-quality tools while maintaining absolute transparency with our community.
      </footer>
    </main>
  );
}

