import Link from 'next/link';
import Image from 'next/image';
import { ShieldCheck, UserCheck, Mail, MapPin, Globe, Award, Lock, Coffee, Cpu, Zap, Layers, Heart, Search, ShieldAlert } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About TaskGuru | Our Journey, Expertise, and Security Standards',
  description: 'Discover the story of TaskGuru, founded by Shubham Gautam. Learn about our AI-driven tools, data privacy commitment, and mission to simplify your digital tasks.',
  robots: 'index, follow',
};

export default function AboutPage() {
  return (
    <main className="p-6 max-w-5xl mx-auto py-20 font-sans leading-relaxed text-gray-800 dark:text-gray-200">
      {/* 1. HERO SECTION */}
      <section className="text-center mb-20">
        <h1 className="text-4xl md:text-6xl font-black mb-6 text-indigo-700 dark:text-indigo-400">
          More Than Just Tools: The Story of TaskGuru
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto italic leading-relaxed">
          I started TaskGuru because I was tired of paywalls, annoying ads, and tools that felt like they were spying on me.
        </p>
      </section>

      {/* 2. THE FOUNDER'S JOURNEY - Photo Section Integrated */}
      <section className="grid md:grid-cols-3 gap-12 items-center mb-24 border-b pb-16 dark:border-gray-800">
        <div className="md:col-span-1">
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-1 rounded-3xl shadow-2xl transition-transform hover:scale-105">
            <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl text-center">
                
                {/* PHOTO CONTAINER - Optimized for Speed */}
                <div className="w-32 h-32 mx-auto mb-4 relative overflow-hidden rounded-full border-4 border-indigo-100 dark:border-indigo-900 bg-indigo-50 dark:bg-gray-800 flex items-center justify-center">
                    {/* INSTRUCTIONS: 
                        1. Apni photo 'shubham.jpg' naam se 'public' folder mein daalein.
                        2. Niche wala <Image /> tag auto-optimize karega.
                    */}
                    <Image 
                        src="/shubham.jpg" 
                        alt="Shubham Gautam"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 128px, 128px"
                        priority 
                      
                        onError={(e) => {
                            const target = e.target as HTMLElement;
                            target.style.display = 'none';
                        }}
                    />
                    <span className="text-3xl font-bold text-indigo-600">SG</span>
                </div>

                <h2 className="text-2xl font-bold">Shubham Gautam</h2>
                <p className="text-indigo-500 font-medium">Founder & Developer</p>
                <div className="mt-4 flex justify-center gap-2">
                    <span className="px-3 py-1 bg-indigo-50 dark:bg-indigo-950 text-[10px] font-bold uppercase rounded-full">Next.js Expert</span>
                    <span className="px-3 py-1 bg-indigo-50 dark:bg-indigo-950 text-[10px] font-bold uppercase rounded-full">AI Architect</span>
                </div>
            </div>
          </div>
        </div>
        
        <div className="md:col-span-2 space-y-6">
          <h3 className="text-3xl font-bold flex items-center gap-2">
            <Heart className="text-red-500" /> A Passion for Simplicity
          </h3>
          <p className="text-lg leading-relaxed">
            Hi, I’m Shubham. My journey with TaskGuru didn’t start in a boardroom; it started at my desk at midnight. Like many developers and students, I often needed to perform quick digital tasks—compressing a PDF, converting an image, or generating code snippets. 
          </p>
          <p className="text-lg leading-relaxed">
            What should have been a 10-second task always turned into a 10-minute struggle. Most sites were cluttered with "Download Now" buttons that were actually ads, or they asked for my credit card just to remove a background from a photo. I felt the internet deserved better.
          </p>
          <p className="text-lg leading-relaxed font-semibold text-indigo-600 dark:text-indigo-400">
            So, I used my background in Full-Stack Development and AI to build a platform that is fast, ethical, and actually helpful.
          </p>
        </div>
      </section>

      {/* 3. TECHNICAL EXPERTISE */}
      <section className="mb-24">
        <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Under the Hood of TaskGuru</h2>
            <p className="text-gray-600 dark:text-gray-400">We don't use generic scripts. We engineer solutions.</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4 p-8 bg-gray-50 dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 transition hover:shadow-lg">
            <div className="flex items-center gap-3 text-indigo-600">
                <Cpu className="w-8 h-8" />
                <h4 className="text-xl font-bold">Cutting-Edge AI Models</h4>
            </div>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              For our image and content tools, we leverage advanced Machine Learning models. Whether it’s removing a complex background or paraphrasing text, our algorithms analyze the semantic structure of the data to ensure the output is professional and accurate. We constantly update our models to keep up with the latest in AI research.
            </p>
          </div>
          
          <div className="space-y-4 p-8 bg-gray-50 dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 transition hover:shadow-lg">
            <div className="flex items-center gap-3 text-indigo-600">
                <Layers className="w-8 h-8" />
                <h4 className="text-xl font-bold">Edge Computing for Speed</h4>
            </div>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Traditional websites process your files on a single slow server. At TaskGuru, we use <strong>Vercel's Edge Network</strong>. This means the tool runs on a server physically closest to you. The result? Processing that happens in milliseconds, even for large files.
            </p>
          </div>
        </div>
      </section>

      {/* 4. PRIVACY & SECURITY SECTION */}
      <section className="mb-24 bg-indigo-900 text-white p-10 md:p-16 rounded-[3rem] shadow-2xl overflow-hidden relative">
        <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-8 flex items-center gap-4">
                <ShieldCheck className="w-12 h-12 text-green-400" /> Your Data is Sacred
            </h2>
            <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-4">
                    <h4 className="text-xl font-bold flex items-center gap-2">
                        <Lock className="w-5 h-5" /> The Zero-Log Promise
                    </h4>
                    <p className="text-indigo-100 leading-relaxed">
                        Many free sites monetize your data. At TaskGuru, your files never touch a persistent database. When you upload a file, it exists in a temporary, encrypted memory buffer. The moment you download the result and close the tab, that data is wiped from the universe.
                    </p>
                </div>
                <div className="space-y-4">
                    <h4 className="text-xl font-bold flex items-center gap-2">
                        <ShieldAlert className="w-5 h-5" /> No Cookies for Tracking
                    </h4>
                    <p className="text-indigo-100 leading-relaxed">
                        I value your anonymity. We don't force you to create accounts or sign up for newsletters just to use a tool. You can walk in, get your work done, and walk out without leaving a digital footprint. This is the foundation of digital trust.
                    </p>
                </div>
            </div>
        </div>
      </section>

      {/* 5. QUALITY STANDARDS */}
      <section className="mb-24 text-center">
        <Search className="w-16 h-16 text-indigo-500 mx-auto mb-6" />
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Quality Standards</h2>
        <div className="max-w-4xl mx-auto space-y-6 text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            <p>
                Every single tool on TaskGuru is manually tested by our small but dedicated team. We don't believe in "Low Value Content." If a tool isn't 100% reliable or if a guide isn't truly helpful, it doesn't get published. 
            </p>
            <p>
                We focus on <strong>Manual Curation</strong>. This means we are constantly refining our UI, making sure our tutorials are easy to follow, and ensuring our code is bug-free. We are not a mass-produced "bot" site; we are a human-driven project aimed at solving real-world digital friction.
            </p>
        </div>
      </section>

      {/* 6. CONTACT SECTION */}
      <section className="border-t pt-16 dark:border-gray-800">
        <div className="bg-gray-50 dark:bg-gray-900 p-10 rounded-3xl">
            <h3 className="text-2xl font-bold mb-8 text-center">Let's Keep In Touch</h3>
            <div className="flex flex-wrap justify-around gap-10">
                <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-white dark:bg-gray-800 shadow-md rounded-full flex items-center justify-center mb-3">
                        <Mail className="text-indigo-600" />
                    </div>
                    <span className="text-sm font-bold uppercase tracking-widest text-gray-400">Email</span>
                    <span className="text-lg">GautamShubham962@Gmail.Com</span>
                </div>
                <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-white dark:bg-gray-800 shadow-md rounded-full flex items-center justify-center mb-3">
                        <MapPin className="text-indigo-600" />
                    </div>
                    <span className="text-sm font-bold uppercase tracking-widest text-gray-400">Based In</span>
                    <span className="text-lg">Uttar Pradesh, India</span>
                </div>
                <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-white dark:bg-gray-800 shadow-md rounded-full flex items-center justify-center mb-3">
                        <Award className="text-indigo-600" />
                    </div>
                    <span className="text-sm font-bold uppercase tracking-widest text-gray-400">Founded</span>
                    <span className="text-lg">January 2024</span>
                </div>
            </div>
            <div className="mt-12 text-center text-gray-500 text-sm italic">
                TaskGuru is a project by Shubham Gautam. Read our <Link href="/privacy-policy" className="underline hover:text-indigo-600">Privacy Policy</Link> and <Link href="/terms" className="underline hover:text-indigo-600">Terms of Use</Link>.
            </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <div className="text-center mt-20">
        <Link href="/" className="inline-flex items-center px-10 py-5 bg-indigo-600 text-white font-bold rounded-full shadow-2xl hover:bg-indigo-700 transition transform hover:scale-105">
            <Zap className="w-5 h-5 mr-2" /> Start Exploring Our Tools
        </Link>
      </div>
    </main>
  );
}

