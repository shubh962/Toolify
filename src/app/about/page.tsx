import Link from 'next/link';
import { Lightbulb, Code, ShieldCheck, Zap, UserCheck, Mail, MapPin } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About TaskGuru | Expert Digital Tools & Founder Story',
  description: 'Learn about TaskGuru, a platform by Shubham Gautam dedicated to secure, AI-driven digital productivity tools. Discover our commitment to privacy and data security.',
  robots: 'index, follow',
  keywords: ['TaskGuru about us', 'Shubham Gautam founder', 'secure online tools', 'AI productivity tools', 'Next.js developer'],
};

export default function AboutPage() {
  return (
    <main className="p-6 max-w-4xl mx-auto py-16">
      <h1 className="text-4xl font-extrabold mb-6 text-indigo-700 dark:text-indigo-400 text-center">
        Mission: Empowering Productivity Through Innovation
      </h1>
      
      {/* Intro Section */}
      <section className="mt-8 space-y-6 text-lg text-gray-700 dark:text-gray-300 border-b pb-8">
        <p>
          At <strong>TaskGuru</strong>, we believe that the most powerful digital tools should be accessible to everyone without the barrier of high costs or privacy concerns. Our suite of AI-powered utilities is designed to bridge the gap between complex technology and everyday user needs.
        </p>
        <p>
          Founded by <strong>Shubham Gautam</strong>, TaskGuru serves as a central hub for developers, creators, and professionals who need reliable tools that respect their data. Every tool on this platform is a result of rigorous testing and a commitment to high-performance web engineering.
        </p>
      </section>

      {/* Authority Section (E-E-A-T) */}
      <section className="mt-10">
        <h2 className="text-3xl font-bold mb-8 text-center text-foreground flex items-center justify-center gap-3 text-indigo-700 dark:text-indigo-400">
          <UserCheck className="w-6 h-6" /> The Expertise Behind the Platform
        </h2>
        <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-2xl shadow-sm border border-indigo-100 dark:border-indigo-900">
          <h3 className="text-2xl font-semibold mb-4 text-indigo-600 dark:text-indigo-400">
            Shubham Gautam — Founder & Lead Developer
          </h3>
          <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
            With a specialized background in Full-Stack Development and a deep focus on <strong>Next.js and AI Integration</strong>, Shubham built TaskGuru to solve real-world digital friction. His expertise ensures that TaskGuru doesn&apos;t just provide "tools," but offers enterprise-grade algorithms that handle tasks like image processing and PDF manipulation with surgical precision.
          </p>
          
          {/* Transparency: Contact & Location (Google loves this for Trust) */}
          <div className="flex flex-wrap gap-6 mt-6 pt-6 border-t border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Mail className="w-4 h-4 text-indigo-500" /> contact@taskguru.online
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <MapPin className="w-4 h-4 text-indigo-500" /> Uttar Pradesh, India
            </div>
          </div>
        </div>
      </section>

      {/* Technical Excellence */}
      <section className="mt-16">
        <h2 className="text-3xl font-bold mb-8 text-center text-indigo-700 dark:text-indigo-400">
          Why We Stand Out
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm transition hover:shadow-md">
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2 text-indigo-600">
              <Code className="w-5 h-5" /> Edge Computing Technology
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              We leverage Vercel&apos;s Edge Network and Next.js 14 to ensure that our tools process data at lightning speed, regardless of your location.
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm transition hover:shadow-md">
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2 text-green-600">
              <ShieldCheck className="w-5 h-5" /> Privacy-First Architecture
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              Security isn&apos;t an afterthought. We implement client-side processing where possible, ensuring your files never even hit a permanent server.
            </p>
          </div>
        </div>
      </section>

      {/* AdSense specific: Commitment to Quality */}
      <section className="mt-16 text-center bg-indigo-50 dark:bg-indigo-950/30 p-8 rounded-2xl">
        <h2 className="text-2xl font-bold mb-4">Our Quality Guarantee</h2>
        <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mb-6">
          Every piece of content and every tool on TaskGuru undergoes a manual review to ensure it meets our strict standards for accuracy and user helpfulness. We do not support "thin" or automated low-quality content.
        </p>
        <Link href="/" className="inline-flex items-center justify-center px-10 py-4 text-base font-bold rounded-full shadow-lg text-white bg-indigo-600 hover:bg-indigo-700 transition transform hover:scale-105">
          <Zap className="w-4 h-4 mr-2" /> Start Using Our Tools
        </Link>
      </section>
    </main>
  );
}

