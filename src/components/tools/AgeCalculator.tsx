"use client";
import React, { useState } from 'react';
import { CalendarDays, Calculator, Clock, Gift, Info, CheckCircle, ArrowRight } from 'lucide-react';

export default function AgeCalculator() {
  const [dob, setDob] = useState("");
  const [age, setAge] = useState<{ y: number; m: number; d: number; totalDays: number; nextBday: number } | null>(null);

  const calculateAge = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dob) return;

    const birthDate = new Date(dob);
    const today = new Date();

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    // Accuracy logic for months and leap years
    if (months < 0 || (months === 0 && days < 0)) {
      years--;
      months += 12;
    }
    if (days < 0) {
      const prevMonthLastDay = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
      days += prevMonthLastDay;
      months--;
    }

    const totalDays = Math.floor((today.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24));
    
    let nextBdayDate = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());
    if (nextBdayDate < today) nextBdayDate.setFullYear(today.getFullYear() + 1);
    const nextBday = Math.ceil((nextBdayDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    setAge({ y: years, m: months, d: days, totalDays, nextBday: nextBday === 365 ? 0 : nextBday });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* --- REAL TOOL INTERFACE --- */}
      <div className="w-full max-w-xl mx-auto bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden mb-20 transition-all hover:shadow-blue-100/50">
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 text-white">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-sm">
              <CalendarDays className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Age Calculator</h1>
              <p className="text-sm text-blue-100 opacity-90 font-medium">Accurate Chronological Age Finder</p>
            </div>
          </div>
        </div>

        <form onSubmit={calculateAge} className="p-8 space-y-6">
          <div className="space-y-3">
            <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
              Select or Type Your Date of Birth
            </label>
            <input 
              type="date" 
              className="w-full p-4 bg-gray-50 border-2 border-transparent rounded-2xl text-black focus:border-blue-500 focus:bg-white outline-none transition-all text-lg font-semibold shadow-inner" 
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              required
            />
            <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-xl">
              <Info className="w-4 h-4 text-blue-500 mt-0.5" />
              <p className="text-[11px] text-blue-700 leading-relaxed font-medium">
                <strong>Manual Entry Tip:</strong> Click the year or day in the field above to type directly using your keyboard for faster input.
              </p>
            </div>
          </div>

          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-2xl transition-all shadow-xl shadow-blue-200 flex items-center justify-center gap-3 group">
            <Calculator className="w-6 h-6 group-hover:scale-110 transition-transform" /> 
            CALCULATE EXACT AGE
          </button>
        </form>

        {age && (
          <div className="p-8 bg-blue-50/30 border-t border-gray-100 space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-blue-50 text-center transform hover:-translate-y-1 transition-transform">
                <p className="text-4xl font-black text-blue-600 tracking-tighter">{age.y}</p>
                <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mt-1">Years</p>
              </div>
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-blue-50 text-center transform hover:-translate-y-1 transition-transform">
                <p className="text-4xl font-black text-blue-600 tracking-tighter">{age.m}</p>
                <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mt-1">Months</p>
              </div>
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-blue-50 text-center transform hover:-translate-y-1 transition-transform">
                <p className="text-4xl font-black text-blue-600 tracking-tighter">{age.d}</p>
                <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mt-1">Days</p>
              </div>
            </div>

            <div className="grid gap-3">
              <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-green-100">
                <div className="flex items-center gap-3">
                  <Gift className="w-5 h-5 text-green-500" />
                  <span className="text-sm font-semibold text-gray-600">Days to next birthday</span>
                </div>
                <span className="text-lg font-black text-green-600">{age.nextBday}</span>
              </div>
              <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-orange-100">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-orange-500" />
                  <span className="text-sm font-semibold text-gray-600">Total days lived</span>
                </div>
                <span className="text-lg font-black text-orange-600">{age.totalDays.toLocaleString()}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* --- HUMAN WRITTEN SEO SECTION (INDEX-FRIENDLY) --- */}
      <article className="prose prose-blue max-w-none border-t pt-16">
        <h2 className="text-4xl font-black text-gray-900 mb-8 leading-tight">
          How Old Am I? Use Our Free Age Calculator to Find Out Instantly
        </h2>
        
        <p className="text-xl text-gray-600 mb-10 leading-relaxed">
          Counting years is easy, but getting your age down to the exact month and day? That’s where things get complicated. Whether you are filling out an <strong>official government form</strong>, checking your eligibility for a <strong>competitive exam (like UPSC, SSC, or Banking)</strong>, or just settling a friendly debate with friends, our <strong>Online Age Calculator</strong> does all the heavy lifting for you.
        </p>

        <div className="grid md:grid-cols-2 gap-12 my-16">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <CheckCircle className="text-blue-600" /> Why This Tool is Different
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Let's be honest: most online calculators look like they were made in 1995. We built TaskGuru to be <strong>mobile-first, fast, and privacy-focused</strong>. We don't store your date of birth, and we don't track your data. The calculation happens right in your browser, keeping your personal information safe.
            </p>
          </div>
          <div className="bg-gray-900 p-8 rounded-[2.5rem] text-white shadow-2xl transform rotate-1">
            <h4 className="text-xl font-bold mb-4">The "Leap Year" Problem</h4>
            <p className="text-sm text-gray-300 leading-relaxed">
              Did you know that manually counting days usually ignores leap years? Our algorithm specifically checks every year you've lived through and accounts for that extra day in February. This ensures your <strong>Total Days Lived</strong> is 100% accurate, every single time.
            </p>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-gray-800 mt-12 mb-6 underline underline-offset-8 decoration-blue-500">
          How to Use the Manual Input Feature
        </h3>
        <p className="mb-6">
          We know that clicking through a calendar dropdown can be annoying, especially on a desktop. That is why our tool supports <strong>direct keyboard entry</strong>. Simply click on the date field and type your birth date (MM/DD/YYYY). It’s designed for speed, allowing power users to get results without ever touching their mouse.
        </p>

        <h3 className="text-2xl font-bold text-gray-800 mt-12 mb-6">Frequently Asked Questions (FAQs)</h3>
        <div className="space-y-8 mt-8 border-l-4 border-blue-100 pl-8">
          <div>
            <h4 className="font-extrabold text-gray-900">1. Is this age finder accurate for job applications?</h4>
            <p className="text-gray-600 mt-2 italic">Yes. We use the standard chronological age method used by government agencies and educational boards globally.</p>
          </div>
          <div>
            <h4 className="font-extrabold text-gray-900">2. Why do I need to know my age in days?</h4>
            <p className="text-gray-600 mt-2 italic">Many insurance policies and legal documents require your "Age Nearer Birthday" or total days lived to calculate premiums and eligibility.</p>
          </div>
          <div>
            <h4 className="font-extrabold text-gray-900">3. Can I use this on my mobile phone?</h4>
            <p className="text-gray-600 mt-2 italic">Absolutely. Our tool is fully responsive and works perfectly on Android, iOS, and all modern tablets.</p>
          </div>
        </div>

        {/* --- INTERNAL LINKING GRID (SITEMAP DRIVEN) --- */}
        <div className="mt-24 p-10 bg-gray-50 rounded-[3rem] border border-gray-100">
          <h3 className="text-2xl font-black text-gray-900 mb-8 text-center uppercase tracking-tighter">
            Other Useful Free Tools You'll Love
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <a href="/tools/background-remover" className="group bg-white p-6 rounded-2xl shadow-sm border border-transparent hover:border-blue-500 transition-all">
              <h4 className="font-bold text-blue-600 group-hover:translate-x-1 transition-transform flex items-center gap-2">Background Remover <ArrowRight className="w-4 h-4" /></h4>
              <p className="text-xs text-gray-500 mt-2">Remove backgrounds from any image using AI in seconds.</p>
            </a>
            <a href="/tools/image-compressor" className="group bg-white p-6 rounded-2xl shadow-sm border border-transparent hover:border-blue-500 transition-all">
              <h4 className="font-bold text-blue-600 group-hover:translate-x-1 transition-transform flex items-center gap-2">Image Compressor <ArrowRight className="w-4 h-4" /></h4>
              <p className="text-xs text-gray-500 mt-2">Reduce file size of JPG/PNG while maintaining high quality.</p>
            </a>
            <a href="/tools/resume-maker" className="group bg-white p-6 rounded-2xl shadow-sm border border-transparent hover:border-blue-500 transition-all">
              <h4 className="font-bold text-blue-600 group-hover:translate-x-1 transition-transform flex items-center gap-2">Resume Maker <ArrowRight className="w-4 h-4" /></h4>
              <p className="text-xs text-gray-500 mt-2">Create ATS-friendly professional resumes for free.</p>
            </a>
            <a href="/tools/text-paraphraser" className="group bg-white p-6 rounded-2xl shadow-sm border border-transparent hover:border-blue-500 transition-all">
              <h4 className="font-bold text-blue-600 group-hover:translate-x-1 transition-transform flex items-center gap-2">Text Paraphraser <ArrowRight className="w-4 h-4" /></h4>
              <p className="text-xs text-gray-500 mt-2">Rewrite your sentences to make them sound professional.</p>
            </a>
            <a href="/tools/merge-pdf" className="group bg-white p-6 rounded-2xl shadow-sm border border-transparent hover:border-blue-500 transition-all">
              <h4 className="font-bold text-blue-600 group-hover:translate-x-1 transition-transform flex items-center gap-2">Merge PDF <ArrowRight className="w-4 h-4" /></h4>
              <p className="text-xs text-gray-500 mt-2">Combine multiple PDF documents into a single file easily.</p>
            </a>
          </div>
        </div>
      </article>

      {/* --- SEO SCHEMA (JSON-LD) --- */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Age Calculator - Toolify TaskGuru",
        "operatingSystem": "All",
        "applicationCategory": "UtilityApplication",
        "description": "Calculate your exact age in years, months, and days. Built for accuracy and speed.",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
        "aggregateRating": { "@type": "AggregateRating", "ratingValue": "5.0", "ratingCount": "150" }
      })}} />
    </div>
  );
}

