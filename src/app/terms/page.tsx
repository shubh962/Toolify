import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Scale, ShieldAlert, Gavel, FileText, Mail, Info, UserCheck, ShieldCheck, Zap } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Service | TaskGuru (Toolify) Official Usage Policy',
  description: 'Read the comprehensive Terms of Service for TaskGuru (Toolify). Learn about our acceptable use policy, intellectual property rights, and founder Shubham Gautam\'s commitment to a secure web.',
  alternates: {
    canonical: 'https://www.taskguru.online/terms',
  },
};

export default function TermsPage() {
  // Google Rich Results (JSON-LD) for FAQ
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Is TaskGuru free to use?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, TaskGuru (Toolify) provides professional-grade AI and digital productivity tools completely free of charge."
        }
      },
      {
        "@type": "Question",
        "name": "Who owns the files I upload to TaskGuru?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You retain 100% ownership of your files. We only process them temporarily to provide the requested service."
        }
      }
    ]
  };

  return (
    <main className="p-6 max-w-5xl mx-auto py-20 font-sans leading-relaxed text-gray-800 dark:text-gray-200">
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* HEADER SECTION */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center p-4 bg-indigo-50 dark:bg-indigo-900/30 rounded-full mb-4 shadow-sm">
          <Scale className="w-10 h-10 text-indigo-600" />
        </div>
        <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight text-gray-900 dark:text-white">
          Terms of Service & Usage Ethics
        </h1>
        <p className="text-sm text-indigo-500 uppercase tracking-widest font-bold">
          Last Updated: December 30, 2025
        </p>
      </div>

      <div className="space-y-12 text-lg">
        
        <div className="bg-indigo-50 dark:bg-gray-900/50 p-8 rounded-3xl border-l-8 border-indigo-600 shadow-sm">
          <p className="italic">
            <strong>Welcome to TaskGuru:</strong> By using our platform (also known as Toolify), you are entering into a legal agreement with us. These terms ensure that we maintain a safe, high-speed, and helpful environment for everyone. If you do not agree to these standards, we kindly ask you to stop using our services immediately.
          </p>
        </div>

        {/* 1. Introduction & Mission */}
        <section>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-3 text-gray-900 dark:text-white">
            <UserCheck className="w-7 h-7 text-indigo-600" /> 1. Introduction to TaskGuru
          </h2>
          <p className="mb-4">
            TaskGuru is a passion-led project founded by <strong>Shubham Gautam</strong>. Our mission is to provide professional digital utilities—ranging from AI-powered background removal to secure PDF processing—without the burden of subscriptions or data mining.
          </p>
          <p>
            When we refer to "Services," we mean all tools, content, and features available at taskguru.online. These terms govern your access to these services and explain your responsibilities as a user.
          </p>
        </section>

        {/* 2. Acceptable Use Policy - DETAILED */}
        <section className="bg-white dark:bg-gray-950 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-gray-900 dark:text-white">
            <ShieldAlert className="w-7 h-7 text-red-600" /> 2. Acceptable Use Policy
          </h2>
          <p className="mb-6">
            To protect our server infrastructure and ensure fair access for all users, you agree not to misuse our tools. Prohibited activities include:
          </p>
          <ul className="grid md:grid-cols-2 gap-4 list-none">
            <li className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl text-sm border-l-4 border-red-500">
              <strong>Illegal Content:</strong> Uploading or processing material that promotes hate speech, violence, or illegal acts.
            </li>
            <li className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl text-sm border-l-4 border-red-500">
              <strong>System Abuse:</strong> Attempting to DDoS our servers or bypass our rate-limiting systems.
            </li>
            <li className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl text-sm border-l-4 border-red-500">
              <strong>Automated Scraping:</strong> Using bots or scripts to "scrape" our tool interfaces for third-party commercial use.
            </li>
            <li className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl text-sm border-l-4 border-red-500">
              <strong>Malware:</strong> Uploading files containing viruses, Trojans, or any code intended to harm TaskGuru or its visitors.
            </li>
          </ul>
        </section>

        {/* 3. Intellectual Property */}
        <section>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-3 text-gray-900 dark:text-white">
            <Gavel className="w-7 h-7 text-indigo-600" /> 3. Intellectual Property Rights
          </h2>
          <p className="mb-4 leading-relaxed">
            The unique design, custom tool logic, branding, and original articles on TaskGuru are the exclusive property of <strong>Shubham Gautam</strong>. Unauthorized duplication of our UI or tool logic is strictly prohibited.
          </p>
          <div className="bg-indigo-50 dark:bg-gray-900/50 p-6 rounded-2xl border border-indigo-100 dark:border-indigo-800">
            <h4 className="font-bold mb-2">User Ownership:</h4>
            <p className="text-sm">You retain full ownership of the files you upload. TaskGuru does not claim any rights over your documents or images. We only process them temporarily to provide you with the finished output.</p>
          </div>
        </section>

        {/* 4. Disclaimer of Liability - CRITICAL FOR ADSENSE */}
        <section className="bg-red-50 dark:bg-red-950/20 p-10 rounded-[3rem] border border-red-100 dark:border-red-900/30">
          <h2 className="text-3xl font-bold mb-6 text-red-700 dark:text-red-400 flex items-center gap-3">
            <ShieldCheck className="w-8 h-8" /> 4. Disclaimer of Warranties
          </h2>
          <p className="mb-6 font-medium text-red-900 dark:text-red-200">
            TaskGuru provides its services on an "AS IS" and "AS AVAILABLE" basis. We strive for 100% accuracy, but we cannot guarantee that the results of AI tools will always be perfect.
          </p>
          <p className="text-sm italic leading-relaxed text-red-800 dark:text-red-300">
            <strong>Limitation of Liability:</strong> Under no legal circumstances shall TaskGuru, or its developer Shubham Gautam, be liable for any data loss, financial loss, or incidental damages arising from the use or inability to use our tools. Your use of taskguru.online is entirely at your own risk.
          </p>
        </section>

        {/* 5. Service Evolution */}
        <section>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-3 text-gray-900 dark:text-white">
            <Zap className="w-7 h-7 text-indigo-600" /> 5. Service Evolution & Termination
          </h2>
          <p>
            The digital landscape changes quickly. We reserve the right to modify, pause, or permanently discontinue any specific tool (such as our background remover or PDF converter) without notice. We also reserve the right to ban IP addresses found violating our acceptable use policy.
          </p>
        </section>

        {/* 6. Contact & Legal Inquiry */}
        <section className="pt-12 border-t border-gray-200 dark:border-gray-800">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3 text-gray-900 dark:text-white">
            <Mail className="w-8 h-8 text-indigo-600" /> 6. Professional Inquiries
          </h2>
          <div className="p-10 bg-gray-900 dark:bg-black text-white rounded-[3rem] shadow-2xl text-center border-b-8 border-indigo-600">
            <p className="text-xs uppercase tracking-widest opacity-60 mb-4 font-bold">Official Support & Legal</p>
            <p className="text-2xl md:text-3xl font-black text-indigo-400 mb-2">
              GautamShubham962@gmail.com
            </p>
            <p className="text-sm opacity-80">We typically review all legal and service-related inquiries within 48-72 hours.</p>
          </div>
        </section>

      </div>
      
      <footer className="mt-20 text-center text-sm text-gray-500 italic border-t pt-10">
        TaskGuru (Toolify) – Designed for Privacy. Engineered for a Faster Web. © 2025.
      </footer>
    </main>
  );
}

