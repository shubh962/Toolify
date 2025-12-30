import Link from 'next/link';
import { ShieldCheck, UserCheck, Mail, MapPin, Globe, Award, Lock, Coffee } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About TaskGuru | Built by Shubham Gautam',
  description: 'The story behind TaskGuru. Why I built this platform and how we handle your data with care.',
  robots: 'index, follow',
};

export default function AboutPage() {
  return (
    <main className="p-6 max-w-5xl mx-auto py-20 font-sans">
      {/* Friendly Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-indigo-700 dark:text-indigo-400">
          Hey, I'm Shubham! Here's why I built TaskGuru.
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
          Tired of subscription-heavy tools and messy software? I was too. So I decided to build something new & better.
        </p>
      </div>
      
      {/* The "Why" - Personal Touch */}
      <section className="grid md:grid-cols-3 gap-8 items-start mb-20">
        <div className="md:col-span-1 bg-gradient-to-br from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800 p-8 rounded-3xl border border-indigo-100 dark:border-indigo-800 text-center shadow-sm">
          <div className="w-24 h-24 bg-indigo-600 rounded-full mx-auto flex items-center justify-center shadow-xl mb-4 border-4 border-white dark:border-gray-700">
             <UserCheck className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Shubham Gautam</h2>
          <p className="text-indigo-600 font-medium mb-4">Founder & Developer</p>
          <p className="text-sm text-gray-500 italic flex items-center justify-center gap-1">
            <Coffee className="w-4 h-4" /> Fueled by code and curiosity.
          </p>
        </div>

        <div className="md:col-span-2 space-y-6">
          <h3 className="text-3xl font-bold text-gray-800 dark:text-gray-100 italic">"I believe tools should be free, not a headache."</h3>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            I started TaskGuru in 2024 because I was frustrated. Every time I wanted to do a simple task—like converting a PDF or removing an image background—I was hit with "Premium Subscription" popups or forced to create an account. 
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            Being a <strong>Full-Stack Developer</strong>, I knew I could make these tools faster, safer, and completely free. TaskGuru is my way of giving back to the internet community. I use modern tech like <strong>Next.js 14</strong> to make sure everything works instantly, right in your browser.
          </p>
        </div>
      </section>

      {/* Trust Pillars - No robotic buzzwords */}
      <div className="grid md:grid-cols-3 gap-6 mb-20 text-center md:text-left">
        <div className="p-8 bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-3xl">
          <Lock className="w-10 h-10 text-green-500 mb-4 mx-auto md:mx-0" />
          <h4 className="text-xl font-bold mb-2">I respect your privacy</h4>
          <p className="text-gray-600 dark:text-gray-400">I don't store your files. Period. Once you're done processing, your data is wiped. I built the architecture so I can't even see your files if I wanted to.</p>
        </div>
        <div className="p-8 bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-3xl">
          <Award className="w-10 h-10 text-indigo-500 mb-4 mx-auto md:mx-0" />
          <h4 className="text-xl font-bold mb-2">Always Human, Never Bot</h4>
          <p className="text-gray-600 dark:text-gray-400">Every single guide and tool here is tested by me. No mass-produced AI content. If it’s on TaskGuru, it’s because I’ve personally verified it works.</p>
        </div>
        <div className="p-8 bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-3xl">
          <Globe className="w-10 h-10 text-yellow-500 mb-4 mx-auto md:mx-0" />
          <h4 className="text-xl font-bold mb-2">Community Driven</h4>
          <p className="text-gray-600 dark:text-gray-400">TaskGuru is based in India, but it's for everyone. I'm constantly adding new tools based on the emails and feedback I get from users like you.</p>
        </div>
      </div>

      {/* Let's Talk - Contact Section */}
      <section className="bg-indigo-600 p-12 rounded-[2rem] text-center text-white shadow-2xl overflow-hidden relative">
        <div className="relative z-10">
            <h3 className="text-3xl font-bold mb-4">Have a suggestion or just want to say hi?</h3>
            <p className="mb-10 text-indigo-100 opacity-90 max-w-xl mx-auto">
                I'm always open to feedback. If a tool isn't working or you need a new feature, drop me an email. I read every single one.
            </p>
            <div className="flex flex-wrap justify-center gap-10">
                <div className="flex flex-col items-center">
                    <Mail className="w-6 h-6 mb-2" />
                    <span className="text-xs uppercase opacity-70">Email me at</span>
                    <span className="font-semibold underline">GautamShubham962@gmail.com</span>
                </div>
                <div className="flex flex-col items-center">
                    <MapPin className="w-6 h-6 mb-2" />
                    <span className="text-xs uppercase opacity-70">Location</span>
                    <span className="font-semibold">Uttar Pradesh, India</span>
                </div>
            </div>
            <div className="mt-12 text-sm opacity-60">
                Need more details? Check our <Link href="/privacy-policy" className="underline">Privacy Policy</Link> or <Link href="/terms" className="underline">Terms</Link>.
            </div>
        </div>
      </section>
    </main>
  );
}

