import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ShieldCheck, Lock, Eye, Globe, Mail, ShieldAlert, FileSearch, Scale } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy | TaskGuru (Toolify) Secure AI Tools',
  description: 'Learn how TaskGuru handles your data. Our Privacy Policy covers our Zero-Storage guarantee, Google AdSense compliance, and how we protect your uploaded files.',
  alternates: {
    canonical: 'https://www.taskguru.online/privacy-policy',
  },
};

export default function PrivacyPolicyPage() {
  return (
    <main className="p-6 max-w-5xl mx-auto py-16 min-h-screen font-sans">
      
      {/* HEADER SECTION */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center p-4 bg-indigo-50 dark:bg-indigo-900/30 rounded-full mb-4 shadow-sm">
          <ShieldCheck className="w-10 h-10 text-indigo-600" />
        </div>
        <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight text-gray-900 dark:text-white">
          Privacy Policy & Data Ethics
        </h1>
        <p className="text-sm text-indigo-500 uppercase tracking-widest font-bold">
          Effective Date: December 30, 2025
        </p>
      </div>

      <div className="space-y-12 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
        
        <div className="bg-indigo-50 dark:bg-gray-900/50 p-8 rounded-3xl border-l-8 border-indigo-600 shadow-sm">
          <p className="italic">
            <strong>A Note from Shubham:</strong> I built TaskGuru (Toolify) with a "Privacy by Design" philosophy. Unlike giant corporations that treat your data as a product, I treat it as a temporary responsibility. This policy is written in plain English so you know exactly how we protect your digital footprint.
          </p>
        </div>

        {/* 1. Information Collection - Expanded */}
        <section>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-gray-900 dark:text-white">
            <Eye className="w-7 h-7 text-indigo-600" /> 1. Transparent Information Collection
          </h2>
          <p className="mb-6">
            The foundation of TaskGuru is anonymity. We do not require you to create an account, provide a credit card, or verify your identity to use our core AI tools. Our data collection is limited to what is strictly necessary for the technical operation of the site.
          </p>
          <div className="space-y-6">
            <div className="p-6 border border-gray-100 dark:border-gray-800 rounded-2xl">
              <h3 className="font-bold text-gray-900 dark:text-white mb-2 underline decoration-indigo-500">A. Personal Information</h3>
              <p>We do not collect any personal data automatically. The only time we receive your name or email address is if you choose to reach out to us via our official contact channels. This information is used solely to respond to your inquiry and is never sold to third-party marketing lists.</p>
            </div>
            <div className="p-6 border border-gray-100 dark:border-gray-800 rounded-2xl">
              <h3 className="font-bold text-gray-900 dark:text-white mb-2 underline decoration-indigo-500">B. Technical Usage Data</h3>
              <p>To ensure our servers can handle traffic effectively, we collect non-identifying technical data. This includes your IP address (anonymized), browser type, and the duration of your visit. This helps us optimize our Next.js infrastructure and identify if any specific tool is experiencing technical lag.</p>
            </div>
          </div>
        </section>

        {/* 2. Advertising - Detailed for AdSense Approval */}
        <section className="bg-indigo-600 p-10 rounded-[3rem] text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Globe className="w-8 h-8 text-indigo-200" /> 2. Google AdSense & Third-Party Cookies
            </h2>
            <p className="mb-6 opacity-90 leading-relaxed">
              TaskGuru is a free resource. To pay for the expensive high-performance servers and AI APIs we use, we display advertisements provided by Google AdSense. This requires us to comply with specific transparency standards regarding how cookies are used.
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-sm">
                <h4 className="font-bold mb-3 flex items-center gap-2"><ShieldAlert className="w-5 h-5" /> The DART Cookie</h4>
                <p className="text-sm opacity-90">Google uses the DART cookie to serve ads based on your previous browsing history on the web. This allows the ads you see to be relevant to your interests.</p>
              </div>
              <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-sm">
                <h4 className="font-bold mb-3 flex items-center gap-2"><Lock className="w-5 h-5" /> Your Choice (Opt-Out)</h4>
                <p className="text-sm opacity-90">You are in control. You can disable personalized ads at any time by visiting the Google Ad Settings or using browser extensions that block tracking cookies.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Zero-Storage - EEAT and Trust */}
        <section>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-gray-900 dark:text-white">
            <FileSearch className="w-7 h-7 text-green-600" /> 3. Deep Dive into File Security
          </h2>
          <p className="mb-6">
            For a tool-based site like ours, the "Low Value" label is often avoided by proving technical superiority in data handling. Here is the technical breakdown of how we handle your uploads:
          </p>
          <div className="space-y-4">
            <div className="p-6 bg-gray-50 dark:bg-gray-900 rounded-3xl">
              <h4 className="font-bold mb-2">The Life Cycle of Your Upload</h4>
              <p className="text-sm md:text-base mb-4">When you upload a file (like an image for background removal), it is sent through a secure SSL tunnel to a temporary execution environment. It is not stored on a hard drive; it exists only in the RAM (temporary memory) during the processing phase.</p>
              <div className="flex gap-4 items-center text-indigo-600 font-bold text-sm">
                <span>Upload</span> ➜ <span>Process (RAM)</span> ➜ <span>Download</span> ➜ <span>Wipe</span>
              </div>
            </div>
            <p className="text-sm italic text-gray-500">
              *Note: We do not maintain any logs of the contents of your files. Our system is designed to "forget" your file the moment you download the result.
            </p>
          </div>
        </section>

        {/* 4. Children's Privacy */}
        <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3 text-gray-900 dark:text-white">
                <Scale className="w-7 h-7 text-indigo-600" /> 4. Children&apos;s Online Privacy
            </h2>
            <p>
                Protecting the privacy of the young is especially important. TaskGuru does not knowingly collect or solicit any information from anyone under the age of 13. In the event that we learn that we have collected personal information from a child under age 13 without parental consent, we will delete that information as quickly as possible.
            </p>
        </section>

        {/* 5. Contact Section */}
        <section className="pt-10 border-t border-gray-200 dark:border-gray-800">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 text-gray-900 dark:text-white">
            <Mail className="w-8 h-8 text-indigo-600" /> 5. Direct Privacy Support
          </h2>
          <p className="mb-8">
            Privacy is a dynamic field. If you have any technical questions about our encryption methods, or if you believe there is a security flaw in our AI tools, I want to hear from you directly.
          </p>
          <div className="p-8 bg-gray-900 dark:bg-black text-white rounded-[2.5rem] shadow-2xl text-center">
            <p className="text-sm uppercase tracking-widest opacity-60 mb-2 font-bold">Primary Developer Contact</p>
            <p className="text-2xl md:text-3xl font-black text-indigo-400 mb-2 break-all">
              GautamShubham962@gmail.com
            </p>
            <p className="text-sm opacity-80">I personally review and reply to all privacy-related inquiries within 48 hours.</p>
          </div>
        </section>

      </div>
      
      <footer className="mt-20 text-center text-sm text-gray-500 border-t pt-10">
        <p className="mb-2">Copyright © 2025 TaskGuru (Toolify). All rights reserved.</p>
        <p className="italic underline decoration-indigo-300">Building a safer, faster, and more transparent internet, one tool at a time.</p>
      </footer>
    </main>
  );
}

