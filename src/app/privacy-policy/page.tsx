import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ShieldCheck, Lock, Eye, Globe, Mail, ShieldAlert, FileSearch, Scale, Fingerprint } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy | TaskGuru (Toolify) - Secure AI Data Standards',
  description: 'Read the comprehensive TaskGuru Privacy Policy. We detail our Zero-Storage guarantee, Google AdSense compliance, DART cookies, and data encryption.',
  alternates: {
    canonical: 'https://www.taskguru.online/privacy-policy',
  },
};

export default function PrivacyPolicyPage() {
  return (
    <main className="p-6 max-w-5xl mx-auto py-20 font-sans leading-relaxed text-gray-800 dark:text-gray-200">
      
      {/* 1. HEADER SECTION */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center p-4 bg-indigo-50 dark:bg-indigo-900/30 rounded-full mb-4 shadow-sm">
          <ShieldCheck className="w-10 h-10 text-indigo-600" />
        </div>
        <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight text-gray-900 dark:text-white">
          Privacy Policy & Ethics
        </h1>
        <p className="text-sm text-indigo-500 uppercase tracking-widest font-bold">
          Effective Date: December 30, 2025
        </p>
      </div>

      <div className="space-y-12 text-lg">
        
        {/* Personal Intro */}
        <div className="bg-indigo-50 dark:bg-gray-900/50 p-8 rounded-3xl border-l-8 border-indigo-600 shadow-sm">
          <p className="italic leading-relaxed">
            <strong>A Personal Message:</strong> I am Shubham Gautam, the founder of TaskGuru. I believe that privacy isn&apos;t just a legal requirement—it&apos;s a basic human right. This policy is written to give you a clear, honest look at how we handle your information. We don&apos;t hide behind robots; we build for humans.
          </p>
        </div>

        {/* 2. INFORMATION COLLECTION */}
        <section>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-gray-900 dark:text-white">
            <Eye className="w-7 h-7 text-indigo-600" /> 1. What Data Do We Actually Need?
          </h2>
          <p className="mb-6">
            At TaskGuru, our primary goal is utility without intrusion. Most of our tools work completely anonymously. We do not require you to sign up, provide credit card details, or log in via social media to use our core AI productivity features.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 border border-gray-100 dark:border-gray-800 rounded-2xl">
              <h3 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                <Fingerprint className="w-4 h-4 text-indigo-500" /> Identity Data
              </h3>
              <p className="text-sm">We only receive your personal information (name or email) if you explicitly choose to contact us for support. We never share this with marketing firms.</p>
            </div>
            <div className="p-6 border border-gray-100 dark:border-gray-800 rounded-2xl">
              <h3 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                <Globe className="w-4 h-4 text-indigo-500" /> Technical Logs
              </h3>
              <p className="text-sm">We collect basic server logs (IP address, browser type) to protect against DDoS attacks and to ensure our Next.js infrastructure is performing at peak speed.</p>
            </div>
          </div>
        </section>

        {/* 3. ADSENSE & COOKIES - HIGHLY VISIBLE FOR REVIEWER */}
        <section className="bg-indigo-600 p-10 rounded-[3rem] text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <ShieldAlert className="w-8 h-8 text-indigo-200" /> 2. Advertising & Cookies Disclosure
            </h2>
            <p className="mb-8 opacity-95 leading-relaxed">
              To keep TaskGuru free, we display advertisements via <strong>Google AdSense</strong>. Google, as a third-party vendor, uses cookies to serve ads based on your visits to our site and other sites on the web.
            </p>
            
            <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-md border border-white/20">
                <h4 className="font-bold mb-3">Understanding DART Cookies</h4>
                <p className="text-sm leading-relaxed">
                  Google&apos;s use of the <strong>DART cookie</strong> enables it to serve ads to our users based on their visit to our site and other sites on the Internet. This cookie does NOT track personal details like your name or physical address; it only tracks your interests to show relevant ads.
                </p>
              </div>

              {/* HIGHLY VISIBLE OPT-OUT LINK FOR ADSENSE APPROVAL */}
              <div className="bg-white p-8 rounded-3xl text-indigo-900 shadow-2xl transform md:scale-105">
                <h4 className="font-bold mb-3 flex items-center gap-2 text-xl italic">
                  <Lock className="w-6 h-6 text-indigo-600" /> Your Privacy Control
                </h4>
                <p className="text-sm mb-6 leading-relaxed font-medium">
                  Google wants you to be in control. You can opt-out of personalized advertising and manage your ad preferences at any time by visiting this official link:
                </p>
                <a 
                  href="https://www.google.com/settings/ads" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center justify-center w-full bg-indigo-600 text-white px-6 py-4 rounded-xl font-black text-center hover:bg-indigo-700 transition shadow-lg"
                >
                  MANAGE GOOGLE AD SETTINGS →
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 4. DATA SECURITY - THE TOOL ENGINE */}
        <section>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-gray-900 dark:text-white">
            <FileSearch className="w-7 h-7 text-green-600" /> 3. Our "Zero-Storage" Engineering
          </h2>
          <p className="mb-6">
            For a tool-based platform, the most critical privacy factor is how your files are handled. At TaskGuru, we utilize <strong>Edge Runtime processing</strong>. Here is our technical commitment:
          </p>
          <div className="space-y-6">
            <div className="p-6 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800">
              <h4 className="font-bold mb-2">Temporary RAM Buffering</h4>
              <p className="text-sm leading-relaxed mb-4">
                When you upload a document for processing, it is held in a temporary encrypted buffer in the server&apos;s memory (RAM). It is never written to a permanent hard drive or database.
              </p>
              <div className="flex gap-4 items-center text-xs font-black text-indigo-600 uppercase tracking-widest bg-white dark:bg-gray-800 p-3 rounded-lg inline-flex">
                <span>Upload</span> ➜ <span>Encrypt</span> ➜ <span>Process</span> ➜ <span>Purge</span>
              </div>
            </div>
            <p className="text-sm text-gray-500 italic">
              *Verification: Our serverless logs are configured to automatically scrub any file metadata every 60 minutes, ensuring no trail is left behind.
            </p>
          </div>
        </section>

        {/* 5. CHILDREN'S PRIVACY */}
        <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3 text-gray-900 dark:text-white">
                <Scale className="w-7 h-7 text-indigo-600" /> 4. Protecting Minor Privacy
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
                TaskGuru does not knowingly collect any personally identifiable information from children under the age of 13. If you are a parent and believe your child has provided us with data, please contact us immediately, and we will perform an emergency wipe of our communication logs.
            </p>
        </section>

        {/* 6. CONTACT SECTION */}
        <section className="pt-12 border-t border-gray-200 dark:border-gray-800">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 text-gray-900 dark:text-white">
            <Mail className="w-8 h-8 text-indigo-600" /> 5. Contact the Lead Developer
          </h2>
          <p className="mb-8">
            Privacy policies shouldn&apos;t be a dead-end street. If you have questions about our AI models, our security headers, or how we integrated Google AdSense, please reach out.
          </p>
          <div className="p-10 bg-gray-900 dark:bg-black text-white rounded-[3rem] shadow-2xl text-center border-b-8 border-indigo-600">
            <p className="text-xs uppercase tracking-[0.2em] opacity-60 mb-4 font-black">Official Support Channel</p>
            <p className="text-2xl md:text-4xl font-black text-indigo-400 mb-4 break-all selection:bg-indigo-500 selection:text-white">
              GautamShubham962@gmail.com
            </p>
            <p className="text-sm opacity-80 max-w-md mx-auto">
              I personally monitor this inbox to ensure TaskGuru remains a safe and transparent environment for everyone.
            </p>
          </div>
        </section>

      </div>
      
      <footer className="mt-20 text-center text-sm text-gray-500 border-t pt-10">
        <p className="mb-2 font-bold uppercase tracking-widest">© 2025 TaskGuru (Toolify)</p>
        <p className="italic">Built for speed. Designed for privacy. Engineered for you.</p>
      </footer>
    </main>
  );
}

