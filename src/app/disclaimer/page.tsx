import type { Metadata } from "next";
import { ShieldAlert, Info, Lock, Globe, Mail, AlertTriangle, Scale, Hammer, Zap, UserCheck } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Official Disclaimer | TaskGuru (Toolify) Transparency & Liability",
  description:
    "Official legal disclaimer for TaskGuru (Toolify). Understand the limitations of our AI-driven productivity tools, our data handling ethics, and user responsibilities.",
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
    <main className="max-w-5xl mx-auto px-6 py-20 text-gray-800 dark:text-gray-200 leading-relaxed font-sans">
      
      {/* 1. Header Section */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center p-4 bg-red-100 dark:bg-red-900/30 rounded-[2rem] mb-6 shadow-sm">
          <ShieldAlert className="w-10 h-10 text-red-600 dark:text-red-400" />
        </div>
        <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter text-gray-900 dark:text-white uppercase">
          Legal Disclaimer
        </h1>
        <p className="text-sm text-red-500 uppercase tracking-[0.3em] font-black">
          Revised: December 30, 2025
        </p>
      </div>

      <div className="space-y-12 text-lg">
        
        {/* Personal Introduction */}
        <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-3xl border-l-8 border-red-600 shadow-sm">
          <p className="italic font-medium leading-relaxed">
            <strong>Transparency at TaskGuru:</strong> My name is <strong>Shubham Gautam</strong>, and I built TaskGuru (Toolify) to provide a safe, free, and efficient digital workspace. However, every technology has its boundaries. This disclaimer is my commitment to being 100% honest with you about what our tools can and cannot do.
          </p>
        </div>

        {/* 2. Nature of Services - Detailed */}
        <section className="border-b pb-10 dark:border-gray-800">
          <h2 className="text-3xl font-bold flex items-center gap-3 text-indigo-700 dark:text-indigo-400 mb-6">
            <Info className="w-8 h-8" /> 1. Professional Nature of Services
          </h2>
          <p className="mb-6">
            TaskGuru is a diverse digital toolkit. We take immense pride in our 
            <strong> <Link href="/tools/background-remover" className="underline font-bold text-indigo-600">Background Removal AI</Link></strong>, 
            <strong> <Link href="/tools/merge-pdf" className="underline font-bold text-indigo-600">PDF Management</Link></strong>, and 
            <strong> <Link href="/tools/resume-maker" className="underline font-bold text-indigo-600">Creative Builders</Link></strong>. 
          </p>
          <p className="bg-white dark:bg-black/20 p-6 rounded-2xl border border-gray-100 dark:border-gray-800">
            <strong>Disclaimer:</strong> All services are provided as a "best-effort" utility. While our backend is engineered on <strong>Next.js Edge Runtime</strong> for maximum reliability, we do not warrant that our services will be 100% uninterrupted, completely secure from every conceivable threat, or that the results will be perfectly accurate for specialized professional use cases (e.g., medical or high-stakes legal documentation).
          </p>
        </section>

        {/* 3. AI Content Limitation - The "Human" Explanation */}
        <section className="bg-yellow-50 dark:bg-yellow-900/10 p-10 rounded-[3rem] border border-yellow-200 dark:border-yellow-900/30">
          <h2 className="text-3xl font-bold flex items-center gap-3 text-yellow-700 dark:text-yellow-500 mb-6">
            <AlertTriangle className="w-8 h-8" /> 2. AI-Driven Results & Hallucinations
          </h2>
          <p className="mb-6 leading-relaxed">
            Our platform utilizes advanced Machine Learning models to provide automation. However, AI is an evolving technology. Users must understand that AI-generated content can occasionally contain "hallucinations" or logical inaccuracies. 
          </p>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1 p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-yellow-100 dark:border-yellow-900/50">
                <h4 className="font-bold mb-2 flex items-center gap-2 text-sm uppercase tracking-wider text-gray-500">
                    <Hammer className="w-4 h-4" /> Verification Required
                </h4>
                <p className="text-sm">Users are solely responsible for verifying the accuracy of resumes, paraphrased text, or converted documents before submitting them for professional use.</p>
            </div>
            <div className="flex-1 p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-yellow-100 dark:border-yellow-900/50">
                <h4 className="font-bold mb-2 flex items-center gap-2 text-sm uppercase tracking-wider text-gray-500">
                    <Zap className="w-4 h-4" /> No Professional Advice
                </h4>
                <p className="text-sm">The tools on TaskGuru are for productivity purposes only and do not constitute professional, legal, or financial advice.</p>
            </div>
          </div>
        </section>

        {/* 4. Privacy & File Handling - Trust Factor */}
        <section className="border-b pb-10 dark:border-gray-800">
          <h2 className="text-3xl font-bold flex items-center gap-3 text-green-600 mb-6">
            <Lock className="w-8 h-8" /> 3. Data Integrity & "Zero-Storage"
          </h2>
          <p className="mb-6 leading-relaxed">
            As detailed in our <strong> <Link href="/privacy-policy" className="underline font-bold text-green-600">Privacy Policy</Link></strong>, TaskGuru processes files in volatile memory (RAM). We do not create permanent logs or backups of your sensitive documents. 
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            <strong>Security Note:</strong> While we employ industry-standard SSL encryption, the internet is not a completely closed system. We strongly advise users not to process highly confidential, classified, or government-protected information on any free online utility as a matter of common-sense security practice.
          </p>
        </section>

        {/* 5. Limitation of Liability - Hard Legal Protection */}
        <section className="bg-red-900 text-white p-12 rounded-[3.5rem] shadow-2xl relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-black flex items-center gap-4 mb-8">
                <Scale className="w-10 h-10 text-red-400" /> 4. Hard Limitation of Liability
            </h2>
            <p className="text-lg mb-6 opacity-90 leading-relaxed">
              Under no legal theory—whether in contract, tort, or otherwise—shall TaskGuru, its founder <strong>Shubham Gautam</strong>, or any third-party contributors be liable to you or any third party for any direct, indirect, or incidental damages. 
            </p>
            <p className="text-lg opacity-90 leading-relaxed font-bold border-l-4 border-red-400 pl-6 italic">
              "This includes but is not limited to: loss of revenue, loss of critical data, business interruption, or errors in output processing. Use of TaskGuru is strictly at your own risk."
            </p>
          </div>
        </section>

        {/* 6. External Entities */}
        <section className="border-b pb-10 dark:border-gray-800">
          <h2 className="text-3xl font-bold flex items-center gap-3 text-blue-600 mb-6">
            <Globe className="w-8 h-8" /> 5. External Third-Party Content
          </h2>
          <p className="leading-relaxed">
            TaskGuru may feature links to external websites, social platforms, or partner tools. We have no jurisdiction over the content, privacy settings, or cookies of these external entities. Clicking on any third-party link is done at the user's discretion and risk.
          </p>
        </section>

        {/* 7. Official Reach-Out (E-E-A-T Signal) */}
        <section className="mt-12 p-10 bg-gray-50 dark:bg-gray-900 rounded-3xl border-2 border-dashed border-gray-200 dark:border-gray-800">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
             <UserCheck className="w-8 h-8 text-indigo-600" /> Direct Legal & Support Inquiry
          </h2>
          <div className="flex flex-col md:flex-row gap-10">
            <div className="flex-1">
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                    For legal concerns, copyright claims (DMCA), or tool bug reports, please contact me directly. I personally audit these inquiries to maintain the platform's integrity.
                </p>
            </div>
            <div className="flex-1 flex flex-col gap-4">
                <div className="flex items-center gap-4 p-4 bg-white dark:bg-black rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
                    <Mail className="w-6 h-6 text-indigo-600" />
                    <div>
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Official Email</span>
                        <p className="font-bold">GautamShubham962@gmail.com</p>
                    </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-white dark:bg-black rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
                    <Globe className="w-6 h-6 text-indigo-600" />
                    <div>
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Main Domain</span>
                        <p className="font-bold underline">https://taskguru.online</p>
                    </div>
                </div>
            </div>
          </div>
        </section>
      </div>

      <footer className="mt-20 text-center text-sm text-gray-400 italic">
        TaskGuru (Toolify) is a human-first project by Shubham Gautam. By continuing, you agree to these legal boundaries.
      </footer>
    </main>
  );
}

