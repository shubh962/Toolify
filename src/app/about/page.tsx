import Link from 'next/link';
import { Lightbulb, Code, ShieldCheck, Zap, UserCheck } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About TaskGuru | Mission, Expertise, and Founder Story',
  description: 'TaskGuru is committed to simplifying digital tasks with free, secure, and AI-powered tools. Learn about our founder, Shubham Gautam, and our deep expertise in web development and AI integration.',
  robots: 'index, follow',
  keywords: ['TaskGuru about us', 'Shubham Gautam founder', 'online tool expertise', 'Next.js tools', 'free AI tools'],
};

export default function AboutPage() {
  return (
    <main className="p-6 max-w-4xl mx-auto py-16">
      <h1 className="text-4xl font-extrabold mb-6 text-indigo-700 dark:text-indigo-400 text-center">
        Our Mission: Simplify Your Digital Life
      </h1>
      
      {/* Intro Section - Expanded for Clarity */}
      <section className="mt-8 space-y-6 text-lg text-gray-700 dark:text-gray-300 border-b pb-8">
        <p>
          Welcome to TaskGuru – your comprehensive toolkit for smart online productivity. We believe that professional-grade tools for tasks like PDF conversion, image editing, and content writing should be free, secure, and instantly accessible to everyone, regardless of their technical background.
        </p>
        <p>
          TaskGuru was founded by Shubham Gautam with a single, clear goal: to eliminate the need for complicated software subscriptions and messy installations. Our platform is built from the ground up to deliver high-speed, accurate results directly through your browser, making complex tasks feel effortless.
        </p>
      </section>

      {/* --- NEW SECTION: OUR EXPERTISE & COMMITMENT (E-E-A-T) --- */}
      <section className="mt-10">
        <h2 className="text-3xl font-bold mb-8 text-center text-foreground flex items-center justify-center gap-3 text-indigo-700 dark:text-indigo-400">
          <UserCheck className="w-6 h-6 text-indigo-600 dark:text-indigo-400" /> The Expertise Behind TaskGuru
        </h2>
        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-indigo-200 dark:border-indigo-700">
          
          <h3 className="text-2xl font-semibold mb-3 text-indigo-600 dark:text-indigo-400 flex items-center gap-2">
            Meet the Founder: Shubham Gautam
          </h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            TaskGuru is a passion project led by Shubham Gautam, a professional with extensive 1+ years of experience in full-stack development, Next.js, and secure data handling. 
            This background ensures that every tool on TaskGuru is developed not just with speed in mind, but also with a focus on data accuracy, security, and enterprise-level reliability. We don't just use AI; we understand how to integrate it safely and effectively.
          </p>
          <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
            <li>Focus on real-world problem-solving for developers and creative professionals.</li>
            <li>Commitment to using only ethical and tested AI models for all features.</li>
          </ul>
        </div>
      </section>
      {/* ------------------------------------------------------------- */}

      {/* Why Choose Us - Detailed Section */}
      <section className="mt-12">
        <h2 className="text-3xl font-bold mb-8 text-center text-foreground flex items-center justify-center gap-3 text-indigo-700 dark:text-indigo-400">
          <Lightbulb className="w-6 h-6 text-yellow-600" /> Why Trust TaskGuru?
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Pillar 1: Technology */}
          <div className="p-4 border rounded-lg shadow-md hover:shadow-xl transition duration-300">
            <h3 className="text-xl font-semibold mb-2 flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
              <Code className="w-5 h-5" /> Modern Technology Foundation
            </h3>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-400 space-y-1">
              <li>Built on Next.js 14 for blazing-fast speed and excellent SEO performance.</li>
              <li>Utilizes cutting-edge AI (Artificial Intelligence) for accurate and complex tasks like background removal and text paraphrasing.</li>
              <li>Mobile-first design ensures a perfect experience on all devices.</li>
            </ul>
          </div>

          {/* Pillar 2: Security & Privacy (AdSense Requirement) */}
          <div className="p-4 border rounded-lg shadow-md hover:shadow-xl transition duration-300">
            <h3 className="text-xl font-semibold mb-2 flex items-center gap-2 text-green-600 dark:text-green-400">
              <ShieldCheck className="w-5 h-5" /> Our Commitment to Privacy
            </h3>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-400 space-y-1">
              <li>Zero File Storage: All uploaded files are deleted immediately after processing is complete (reinforcing your unique value).</li>
              <li>No mandatory sign-ups, keeping your usage anonymous and private.</li>
              <li>Clear <Link href="/privacy-policy" className="text-primary underline font-medium">Privacy Policy</Link> and <Link 
                href="/terms" className="text-primary underline font-medium">Terms of Service</Link> available for transparency.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to boost your productivity?</h2>
        <Link href="/" className="inline-flex items-center justify-center px-8 py-3 border border-transparent 
          text-base font-medium rounded-full shadow-lg text-white bg-indigo-600 hover:bg-indigo-700 transition duration-300">
          <Zap className="w-4 h-4 mr-2" /> Explore Our Free AI Toolkit
        </Link>
      </section>

    </main>
  );
}
