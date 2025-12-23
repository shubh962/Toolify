import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ShieldCheck, Lock, Eye, Globe, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy | TaskGuru (Toolify) Secure AI Tools',
  description: 'Learn how TaskGuru handles your data. Our Privacy Policy covers our Zero-Storage guarantee, Google AdSense compliance, and how we protect your uploaded files.',
  alternates: {
    canonical: 'https://www.taskguru.online/privacy-policy',
  },
};

export default function PrivacyPolicyPage() {
  return (
    <main className="p-6 max-w-4xl mx-auto py-16 min-h-screen">
      
      {/* HEADER SECTION */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
          <ShieldCheck className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-4xl font-black mb-4 tracking-tight text-gray-900 dark:text-white">
          Privacy Policy
        </h1>
        <p className="text-sm text-muted-foreground uppercase tracking-widest font-bold">
          Effective Date: October 30, 2025
        </p>
      </div>

      <div className="space-y-10 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
        
        <p className="bg-muted/50 p-6 rounded-2xl border-l-4 border-primary italic">
          At TaskGuru (Toolify), your privacy is our core mission. This policy details how we handle information when you use our free AI-powered tools. By using our site, you agree to the practices described herein.
        </p>

        {/* 1. Information Collection */}
        <section>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
            <Eye className="w-6 h-6 text-primary" /> 1. Information We Collect
          </h2>
          <p className="mb-4">
            Most of our tools are designed to work without requiring a login. We only collect data necessary to maintain and improve our services:
          </p>
          <ul className="list-disc list-inside ml-4 space-y-3 marker:text-primary">
            <li>
              <strong>Personal Information:</strong> We only collect names or email addresses if you voluntarily contact us or subscribe to our updates.
            </li>
            <li>
              <strong>Usage Data (Anonymous Analytics):</strong> We use tools like Google Analytics to track pages visited, time spent on site, and device types. This data is fully anonymized and used strictly to improve site performance.
            </li>
          </ul>
        </section>

        {/* 2. Google AdSense & Advertising (MANDATORY FOR APPROVAL) */}
        <section className="bg-primary/5 p-8 rounded-[2rem] border border-primary/10">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
            <Globe className="w-6 h-6 text-primary" /> 2. Google AdSense & Advertising
          </h2>
          <p className="mb-4 text-sm md:text-base">
            To provide our tools for free, we serve advertisements via Google AdSense. Google, as a third-party vendor, uses cookies to serve ads based on your visits to TaskGuru and other sites on the internet.
          </p>
          <ul className="list-disc list-inside ml-4 space-y-3 text-sm md:text-base marker:text-primary">
            <li>
              <strong>DART Cookies:</strong> Google’s use of the DART cookie enables it to serve ads to users based on their visit to our site and other sites.
            </li>
            <li>
              <strong>Opt-Out:</strong> Users may opt out of personalized advertising by visiting the <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-bold">Google Ad Settings</a> page.
            </li>
          </ul>
        </section>

        {/* 3. File Security (EEAT Factor) */}
        <section>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
            <Lock className="w-6 h-6 text-green-600" /> 3. Our "Zero-Storage" Guarantee
          </h2>
          <p className="mb-6">
            Unlike many cloud competitors, TaskGuru prioritizes the sanctity of your documents:
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-5 border rounded-2xl bg-white dark:bg-zinc-900 shadow-sm">
                <h4 className="font-bold mb-2">Instant Deletion</h4>
                <p className="text-sm text-muted-foreground">Files uploaded to our AI/Image tools are never permanently stored. They are wiped from our cache immediately after processing.</p>
            </div>
            <div className="p-5 border rounded-2xl bg-white dark:bg-zinc-900 shadow-sm">
                <h4 className="font-bold mb-2">Browser-Side Processing</h4>
                <p className="text-sm text-muted-foreground">When possible, tools process data directly in your browser (Client-Side), meaning your sensitive data never even leaves your device.</p>
            </div>
          </div>
        </section>

        {/* 4. Contact & Updates */}
        <section className="pt-8 border-t border-border">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
            <Mail className="w-6 h-6 text-primary" /> 4. Contact Us
          </h2>
          <p className="mb-4">
            We may update this policy periodically to reflect changes in our tools or legal requirements. If you have any questions regarding this policy, please contact us.
          </p>
          <p className="p-6 bg-muted rounded-2xl font-bold text-center">
            Email: <a href="mailto:GautamShubham962@gmail.com" className="text-primary hover:underline">GautamShubham962@gmail.com</a>
          </p>
        </section>

      </div>
      
      <footer className="mt-16 text-center text-sm text-muted-foreground italic">
        Last updated: December 2025. TaskGuru (Toolify) is committed to global data protection standards.
      </footer>
    </main>
  );
}

