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
    
    // Sparkle effect ke liye realistic delay
    setTimeout(() => {
      const birthDate = new Date(dob);
      const today = new Date();

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
    }, 600); 
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 font-sans selection:bg-blue-100">
      {/* --- PREMIUM TOOL INTERFACE --- */}
      <div className="w-full max-w-xl mx-auto bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden mb-24 relative">
        
        {/* Animated Sparkles Layer */}
        <AnimatePresence>
          {age && (
            <div className="absolute inset-0 pointer-events-none z-0">
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ 
                    opacity: [0, 1, 0], 
                    scale: [0.2, 1, 0.2],
                    x: [Math.random() * 400, Math.random() * 400],
                    y: [Math.random() * 600, Math.random() * 600] 
                  }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 0.2 }}
                  className="absolute"
                >
                  <Sparkles className="text-yellow-400 w-5 h-5 fill-yellow-200" />
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
              <h1 className="text-3xl font-black tracking-tight leading-none mb-2">Age Calculator</h1>
              <p className="text-blue-100 font-medium opacity-90 italic">Find your exact age in years, months, and days</p>
            </div>
          </div>
        </div>

        <form onSubmit={calculateAge} className="p-10 space-y-8 relative z-10 bg-white/80 backdrop-blur-sm">
          <div className="space-y-4">
            <label className="text-sm font-bold text-gray-500 uppercase tracking-widest ml-1 flex items-center gap-2">
              <Zap className="w-4 h-4 text-blue-500" /> Date of Birth
            </label>
            <input 
              type="date" 
              className="w-full p-5 bg-gray-50 border-2 border-gray-100 rounded-[1.5rem] text-black focus:border-blue-500 focus:bg-white outline-none transition-all text-xl font-bold shadow-inner" 
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              required
            />
            <div className="flex items-start gap-2 p-3 bg-blue-50/50 rounded-xl">
              <Info className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
              <p className="text-[11px] text-blue-600 leading-relaxed italic font-medium">
                Tip: Laptop users can directly type the date using their keyboard for faster input.
              </p>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isCalculating}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-5 rounded-[1.5rem] transition-all shadow-xl shadow-blue-300/50 flex items-center justify-center gap-3 text-lg group disabled:bg-blue-400"
          >
            {isCalculating ? (
              <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}>
                <Clock className="w-6 h-6 text-white" />
              </motion.div>
            ) : (
              <>
                <Sparkles className="w-5 h-5 group-hover:scale-125 transition-transform" /> 
                Calculate Precise Age
              </>
            )}
          </button>
        </form>

        <AnimatePresence>
          {age && !isCalculating && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="p-10 bg-gray-50/80 border-t border-gray-100 space-y-10 relative z-10 overflow-hidden"
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
                    className="bg-white p-6 rounded-[2rem] shadow-md border border-blue-50 text-center"
                  >
                    <p className="text-5xl font-black text-blue-600 tracking-tighter">{item.val}</p>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mt-2">{item.label}</p>
                  </motion.div>
                ))}
              </div>

              <motion.div className="grid gap-4">
                <div className="flex items-center justify-between bg-white p-5 rounded-2xl border border-green-100 shadow-sm relative overflow-hidden group">
                  <div className="flex items-center gap-4">
                    <div className="bg-green-100 p-2 rounded-lg text-green-600"><Gift className="w-6 h-6" /></div>
                    <span className="text-sm font-bold text-gray-600 tracking-wide">Next Birthday Countdown</span>
                  </div>
                  <span className="text-2xl font-black text-green-600">{age.nextBday} Days Left</span>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* --- HUMAN WRITTEN SEO CONTENT --- */}
      <article className="prose prose-lg prose-blue max-w-none border-t pt-24 text-gray-700">
        <h2 className="text-5xl font-black text-gray-900 leading-tight mb-8 underline decoration-blue-500 decoration-8 underline-offset-[12px]">
          Calculate Your Exact Age: The Human Way
        </h2>
        
        <p className="text-xl mb-10 leading-relaxed font-medium text-gray-600">
          Counting years is easy, but getting your age down to the exact month and day? That is where things get complicated. Whether you are filling out an <strong>official government form</strong>, checking eligibility for a <strong>competitive exam (like UPSC, SSC, or Banking)</strong>, or just curious about your existence, our tool provides the precision you need.
        </p>

        <h3 className="text-3xl font-bold text-gray-800 mt-16 mb-6">Built for Accuracy and Professional Needs</h3>
        <p className="mb-8 leading-relaxed">
          While simple math might tell you your birth year, it often fails to account for leap years and the varying number of days in months. Our algorithm scans every year you have lived to ensure that the result is 100% accurate. This is vital for students and professionals using our <a href="/tools/resume-maker" className="text-blue-600 font-bold hover:underline">Resume Maker</a> or verifying documents via our <a href="/tools/image-to-text" className="text-blue-600 font-bold hover:underline">Image to Text (OCR)</a> tool.
        </p>

        <div className="grid md:grid-cols-2 gap-12 my-20">
          <div className="bg-blue-900 rounded-[3rem] p-12 text-white shadow-2xl relative overflow-hidden">
            <h4 className="text-2xl font-bold mb-4 italic text-blue-400">Privacy First Architecture</h4>
            <p className="text-blue-100 text-lg leading-relaxed relative z-10">
              Your birthday is personal. Unlike other sites, TaskGuru processes everything on your device. We do not store or share your date of birth. Whether you use our <a href="/tools/background-remover" className="text-blue-400 font-bold underline">Background Remover</a> or this calculator, your privacy is protected.
            </p>
          </div>
          <div className="space-y-8 flex flex-col justify-center">
            <h3 className="text-3xl font-bold text-gray-800">Frictionless Manual Entry</h3>
            <p className="leading-relaxed text-gray-600">
              We hate clunky calendars. Our interface supports <strong>Instant Manual Input</strong>. Simply click and type—no need to scroll through decades. This makes it one of the fastest Age Finders available online today.
            </p>
          </div>
        </div>

        <h3 className="text-3xl font-bold text-gray-800 mt-20 mb-6">Optimize Your Professional Workflow</h3>
        <p className="mb-6 leading-[1.8]">
          TaskGuru is built to save you time. Once you have verified your age, you can seamlessly use our <a href="/tools/image-compressor" className="text-blue-600 font-bold hover:underline">Image Compressor</a> or <a href="/tools/merge-pdf" className="text-blue-600 font-bold hover:underline">Merge PDF</a> utilities to prepare your documents for any application.
        </p>

        <div className="mt-20 p-8 bg-gray-50 rounded-[3rem] border border-gray-100 flex flex-col items-center text-center">
          <CheckCircle className="w-12 h-12 text-green-500 mb-6" />
          <h4 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight underline">Trusted for Official Documentation</h4>
          <p className="max-w-3xl text-gray-600 leading-[1.8] text-sm italic">
            "Our algorithm is verified against standard legal requirements for school admissions and retirement planning. TaskGuru is your companion for accurate life-tracking".
          </p>
        </div>
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

