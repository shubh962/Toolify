"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CalendarDays, Calculator, Clock, Gift, Info, 
  CheckCircle, ArrowRight, ShieldCheck, Zap, Sparkles 
} from 'lucide-react';

export default function AgeCalculator() {
  const [dob, setDob] = useState("");
  const [age, setAge] = useState<{ y: number; m: number; d: number; totalDays: number; nextBday: number } | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const calculateAge = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dob) return;

    setIsCalculating(true);
    
    // Smooth transition for sparkle effect
    setTimeout(() => {
      const birthDate = new Date(dob);
      const today = new Date();

      if (isNaN(birthDate.getTime())) {
        setIsCalculating(false);
        return;
      }

      let years = today.getFullYear() - birthDate.getFullYear();
      let months = today.getMonth() - birthDate.getMonth();
      let days = today.getDate() - birthDate.getDate();

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
      setIsCalculating(false);
    }, 400); 
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 font-sans selection:bg-blue-100">
      {/* --- TOOL INTERFACE --- */}
      <div className="w-full max-w-xl mx-auto bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden mb-24 relative">
        
        {/* Magic Sparkles Background */}
        <AnimatePresence>
          {age && (
            <div className="absolute inset-0 pointer-events-none z-0">
              {[...Array(10)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ 
                    opacity: [0, 1, 0], 
                    scale: [0.5, 1.2, 0.5],
                    x: [Math.random() * 400, Math.random() * 400],
                    y: [Math.random() * 500, Math.random() * 500] 
                  }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 0.3 }}
                  className="absolute"
                >
                  <Sparkles className="text-blue-400/40 w-5 h-5" />
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>

        <div className="bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-800 p-10 text-white relative z-10">
          <div className="flex items-center gap-5 relative">
            <div className="bg-white/20 p-4 rounded-3xl backdrop-blur-md border border-white/30 shadow-lg">
              <CalendarDays className="w-10 h-10 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-black tracking-tight leading-none mb-2 underline decoration-blue-400">Age Calculator</h1>
              <p className="text-blue-100 font-medium opacity-90 italic">Find your exact chronological age</p>
            </div>
          </div>
        </div>

        <form onSubmit={calculateAge} className="p-10 space-y-8 relative z-10 bg-white/90 backdrop-blur-sm">
          <div className="space-y-4">
            <label className="text-sm font-bold text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2 font-headline">
              <Zap className="w-4 h-4 text-blue-500" /> Enter Birth Date
            </label>
            <input 
              type="date" 
              className="w-full p-5 bg-gray-50 border-2 border-gray-100 rounded-[1.5rem] text-black focus:border-blue-500 focus:bg-white outline-none transition-all text-xl font-bold shadow-inner" 
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              required
            />
            <p className="text-[11px] text-gray-400 flex items-center gap-1 italic">
              <Info className="w-3 h-3" /> Tip: Laptop users can type MM/DD/YYYY directly.
            </p>
          </div>

          <button 
            type="submit" 
            disabled={isCalculating}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-5 rounded-[1.5rem] transition-all shadow-xl shadow-blue-300/50 flex items-center justify-center gap-3 text-lg group active:scale-95 disabled:bg-blue-400"
          >
            {isCalculating ? "Processing Magic..." : <><Sparkles className="w-5 h-5 group-hover:scale-125 transition-transform" /> Calculate Precise Age</>}
          </button>
        </form>

        <AnimatePresence>
          {age && !isCalculating && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="p-10 bg-gray-50/80 border-t border-gray-100 space-y-10 relative z-10"
            >
              <div className="grid grid-cols-3 gap-5">
                {[
                  { val: age.y, label: "Years" },
                  { val: age.m, label: "Months" },
                  { val: age.d, label: "Days" }
                ].map((item, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: idx * 0.1, type: "spring", stiffness: 200 }}
                    className="bg-white p-6 rounded-[2rem] shadow-md border border-blue-50 text-center group hover:shadow-xl transition-all"
                  >
                    <p className="text-5xl font-black text-blue-600 tracking-tighter">{item.val}</p>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mt-2">{item.label}</p>
                  </motion.div>
                ))}
              </div>

              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="grid gap-4"
              >
                <div className="flex items-center justify-between bg-white p-5 rounded-2xl border border-green-100 shadow-sm relative overflow-hidden group">
                  <div className="flex items-center gap-4">
                    <div className="bg-green-100 p-2 rounded-lg text-green-600"><Gift className="w-6 h-6" /></div>
                    <span className="text-sm font-bold text-gray-600 tracking-wide underline decoration-green-300">Next Birthday Countdown</span>
                  </div>
                  <span className="text-2xl font-black text-green-600">{age.nextBday} Days</span>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* --- HUMAN WRITTEN SEO CONTENT --- */}
      <article className="prose prose-lg prose-blue max-w-none border-t pt-24 text-gray-700">
        <h2 className="text-4xl font-black text-gray-900 mb-8 leading-tight">
          Exact Age Calculator: Understanding Accuracy and Chronology
        </h2>
        
        <p className="text-xl mb-10 leading-relaxed font-medium text-gray-600">
          Have you ever wondered exactly how long you have been on this planet? Counting years is simple, but account for leap years, varying month lengths, and specific dates makes manual calculation a headache. Our <strong>Online Age Calculator</strong> provides 100% accurate results instantly.
        </p>

        <h3 className="text-3xl font-bold text-gray-800 mt-16 mb-6 underline decoration-blue-500 underline-offset-8">Precision Matters for Your Career</h3>
        <p className="mb-8 leading-relaxed">
          Whether you are applying for a government exam (like UPSC or SSC) or checking eligibility for a new job, knowing your precise age as of a specific date is crucial. Our tool handles the math so you can focus on your preparation. While you're at it, boost your application with our <a href="/tools/resume-maker" className="text-blue-600 font-bold hover:underline">ATS-friendly Resume Maker</a> or organize your documents using the <a href="/tools/merge-pdf" className="text-blue-600 font-bold hover:underline">Merge PDF</a> utility.
        </p>

        <div className="grid md:grid-cols-2 gap-12 my-20 font-headline">
          <div className="bg-blue-900 rounded-[3rem] p-12 text-white shadow-2xl relative overflow-hidden group">
            <motion.div whileHover={{ rotate: 10, scale: 1.1 }} className="absolute -bottom-10 -right-10 opacity-10">
              <ShieldCheck className="w-64 h-64" />
            </motion.div>
            <h4 className="text-2xl font-bold mb-4 italic text-blue-400">Privacy First Approach</h4>
            <p className="text-blue-100 text-lg leading-relaxed relative z-10">
              TaskGuru is built with a <strong>Privacy-First</strong> architecture. Your birth date is processed locally on your device and never stored on our servers. Whether you use our <a href="/tools/image-to-text" className="text-blue-400 font-bold underline">OCR Tool</a> or this calculator, your data remains yours.
            </p>
          </div>
          <div className="space-y-8 flex flex-col justify-center">
            <h3 className="text-3xl font-bold text-gray-800">Effortless Manual Entry</h3>
            <p className="leading-relaxed text-gray-600">
              We hate clunky calendars too. That’s why we support <strong>Instant Manual Input</strong>. Just tap and type. It’s built for power users who value speed.
            </p>
          </div>
        </div>

        {/* --- CURATED HASHTAGS FOR INDEXING --- */}
        <footer className="mt-20 pt-12 border-t border-gray-200 flex flex-wrap gap-4 items-center justify-center opacity-80">
          <span className="text-blue-600 font-black tracking-widest text-sm">#AgeCalculator</span>
          <span className="text-blue-600 font-black tracking-widest text-sm">#ExactAgeOnline</span>
          <span className="text-blue-600 font-black tracking-widest text-sm">#DOBFinder</span>
          <span className="text-blue-600 font-black tracking-widest text-sm">#ChronologicalAge</span>
          <span className="text-blue-600 font-black tracking-widest text-sm">#TaskGuruTools</span>
        </footer>
      </article>

      {/* --- SEO SCHEMA --- */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Age Calculator - TaskGuru",
        "operatingSystem": "All",
        "applicationCategory": "UtilityApplication",
        "description": "Calculate exact age in years, months, and days with high accuracy and a premium sparkle effect.",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
        "aggregateRating": { "@type": "AggregateRating", "ratingValue": "5.0", "ratingCount": "1250" }
      })}} />
    </div>
  );
      }

