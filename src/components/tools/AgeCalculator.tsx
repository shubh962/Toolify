"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CalendarDays, Gift, Clock, Zap, Sparkles, HeartPulse,
  Target, Activity, ShieldCheck, CheckCircle, PartyPopper, Cake
} from 'lucide-react';
import Link from 'next/link';

// ✅ FIXED: faqSchema added for JSON-LD structured data
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: 'How accurate is this age calculator?',
      acceptedAnswer: {
        "@type": "Answer",
        text: 'Our system follows standard Gregorian calendar logic, ensuring leap years and month variances are calculated with 100% precision.',
      },
    },
    {
      "@type": "Question",
      name: 'Is my birth date data secure?',
      acceptedAnswer: {
        "@type": "Answer",
        text: 'Absolutely. TaskGuru uses client-side processing — the logic runs entirely on your device, not our server. Your personal data is never collected.',
      },
    },
    {
      "@type": "Question",
      name: 'Does it handle leap years?',
      acceptedAnswer: {
        "@type": "Answer",
        text: 'Yes. Every February 29th in your lifetime is included in the total days count. Your age is always accurate to the final day.',
      },
    },
    {
      "@type": "Question",
      name: 'Can I use this for official forms?',
      acceptedAnswer: {
        "@type": "Answer",
        text: 'While we are highly accurate, always cross-verify with your official birth certificate for critical legal applications.',
      },
    },
  ],
};

export default function AgeCalculator() {
  const [dob, setDob] = useState("");
  const [age, setAge] = useState<{
    y: number; m: number; d: number;
    totalDays: number; nextBday: number;
    expectedRemaining: number;
    totalWeeks: number;
    totalHours: number;
    bdayEmoji: string;
    isAdvanceWish: boolean;
    isTodayBirthday: boolean;
  } | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [error, setError] = useState("");

  const calculateAge = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!dob) return;

    const birthDate = new Date(dob);
    const today = new Date();

    // ✅ FIX 1: Validate date properly
    if (isNaN(birthDate.getTime())) {
      setError("Please enter a valid date of birth.");
      return;
    }
    if (birthDate > today) {
      setError("Date of birth cannot be in the future.");
      return;
    }

    setIsCalculating(true);

    setTimeout(() => {
      let years = today.getFullYear() - birthDate.getFullYear();
      let months = today.getMonth() - birthDate.getMonth();
      let days = today.getDate() - birthDate.getDate();

      const isTodayBirthday =
        today.getMonth() === birthDate.getMonth() &&
        today.getDate() === birthDate.getDate();

      if (months < 0 || (months === 0 && days < 0)) { years--; months += 12; }
      if (days < 0) {
        const prevMonthLastDay = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
        days += prevMonthLastDay;
        months--;
      }

      const totalDays = Math.floor((today.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24));
      const totalWeeks = Math.floor(totalDays / 7);
      const totalHours = totalDays * 24;

      // ✅ FIX 2: Better "years remaining" logic — no harsh messages
      const avgLifeExpectancy = 80;
      const expectedRemaining = Math.max(avgLifeExpectancy - years, 0);

      let nextBdayDate = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());
      if (nextBdayDate < today && !isTodayBirthday) nextBdayDate.setFullYear(today.getFullYear() + 1);

      const nextBday = isTodayBirthday
        ? 0
        : Math.ceil((nextBdayDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

      let emoji = "😎";
      let isAdvance = false;
      if (isTodayBirthday) { emoji = "🎂🥳🎉"; }
      else if (nextBday <= 30) { emoji = "🎈🎂"; isAdvance = true; }
      else if (nextBday <= 90) { emoji = "😊"; }

      setAge({
        y: years, m: months, d: days, totalDays, totalWeeks, totalHours,
        nextBday, expectedRemaining, bdayEmoji: emoji,
        isAdvanceWish: isAdvance, isTodayBirthday
      });
      setIsCalculating(false);
    }, 600);
  };

  return (
    <div
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} /> className="max-w-6xl mx-auto px-4 py-10 font-sans selection:bg-blue-100 selection:text-blue-900">

      {/* CALCULATOR INTERFACE */}
      <div className="w-full max-w-xl mx-auto bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden mb-24 relative">
        <div className="bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-800 p-10 text-white text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="inline-flex bg-white/20 p-4 rounded-3xl backdrop-blur-md border border-white/30 mb-4"
          >
            <CalendarDays className="w-10 h-10" />
          </motion.div>
          <h2 className="text-3xl font-black tracking-tight mb-2 uppercase tracking-widest">
            Age Calculator
          </h2>
        </div>

        <form onSubmit={calculateAge} className="p-10 space-y-6 bg-white">
          <div className="space-y-4 text-center">
            <label className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] block">
              Select Your Date of Birth
            </label>
            <input
              type="date"
              className="w-full p-6 bg-gray-50 border-2 border-gray-100 rounded-[2rem] text-black focus:border-blue-500 outline-none transition-all text-2xl font-bold text-center"
              value={dob}
              onChange={(e) => { setDob(e.target.value); setError(""); }}
              required
              max={new Date().toISOString().split("T")[0]}
            />
            {/* ✅ FIX 3: Show validation error */}
            {error && (
              <p className="text-red-500 text-sm font-medium">{error}</p>
            )}
          </div>
          <button
            type="submit"
            disabled={isCalculating}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-black py-5 rounded-[2rem] transition-all shadow-xl flex items-center justify-center gap-3 text-xl active:scale-95"
          >
            {isCalculating
              ? "Calculating..."
              : <><Activity className="w-6 h-6" /> Get My Results</>
            }
          </button>
        </form>

        <AnimatePresence>
          {age && !isCalculating && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-10 bg-gray-50/50 border-t border-gray-100 space-y-8"
            >
              {/* Birthday Messages */}
              {age.isTodayBirthday && (
                <motion.div
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 p-6 rounded-[2rem] text-white text-center shadow-xl border-4 border-white/50 space-y-2"
                >
                  <div className="flex justify-center gap-2">
                    <Cake className="w-8 h-8 animate-bounce" />
                    <PartyPopper className="w-8 h-8 animate-pulse" />
                  </div>
                  <h2 className="text-2xl font-black">Happy Birthday! 🎉</h2>
                  <p className="font-bold text-lg">
                    You are exactly {age.y} years old today! {age.bdayEmoji}
                  </p>
                </motion.div>
              )}

              {age.isAdvanceWish && !age.isTodayBirthday && (
                <div className="bg-gradient-to-r from-pink-500 to-rose-500 p-4 rounded-2xl text-white text-center shadow-lg flex items-center justify-center gap-3 font-bold italic">
                  <Gift className="w-6 h-6 animate-bounce" />
                  <span>Your birthday is coming soon! {age.bdayEmoji}</span>
                </div>
              )}

              {/* Main Age Display */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { v: age.y, l: "Years" },
                  { v: age.m, l: "Months" },
                  { v: age.d, l: "Days" }
                {faqSchema.mainEntity.map((item, i) => (
                  <details key={i} className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-5 cursor-pointer group">
                <summary className="font-bold text-gray-900 dark:text-white list-none flex justify-between items-center text-sm p-6 rounded-[2.5rem] shadow-lg border-2 border-blue-50 text-center">
                    <p className="text-5xl font-black text-blue-600 tracking-tighter mb-1">{item.v}</p>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{item.l}</p>
                  </div>
                ))}
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-3xl border border-gray-100 flex flex-col items-center">
                  <span className="text-3xl mb-1">{age.bdayEmoji}</span>
                  <p className="text-[10px] font-bold text-gray-400 uppercase text-center">Next Birthday</p>
                  <p className="text-sm font-black text-gray-700">
                    {age.nextBday === 0 ? "Today! 🎉" : `${age.nextBday} Days`}
                  </p>
                </div>
                {/* ✅ FIX 4: Better "years remaining" display — positive framing */}
                <div className="bg-white p-4 rounded-3xl border border-gray-100 flex flex-col items-center shadow-sm">
                  <HeartPulse className="text-red-500 w-6 h-6 mb-1" />
                  <p className="text-[10px] font-bold text-gray-400 uppercase leading-none text-center">
                    Est. Ahead
                  </p>
                  <p className="text-sm font-black text-gray-700">
                    {age.expectedRemaining > 0
                      ? `~${age.expectedRemaining} More Years`
                      : "Living Beyond Average! 💪"}
                  </p>
                </div>
                <div className="bg-white p-4 rounded-3xl border border-gray-100 flex flex-col items-center shadow-sm">
                  <Target className="text-indigo-500 w-6 h-6 mb-1" />
                  <p className="text-[10px] font-bold text-gray-400 uppercase text-center">Weeks Lived</p>
                  <p className="text-sm font-black text-gray-700">{age.totalWeeks.toLocaleString()}</p>
                </div>
                <div className="bg-white p-4 rounded-3xl border border-gray-100 flex flex-col items-center shadow-sm">
                  <Clock className="text-orange-500 w-6 h-6 mb-1" />
                  <p className="text-[10px] font-bold text-gray-400 uppercase">Hours Lived</p>
                  <p className="text-sm font-black text-gray-700">{age.totalHours.toLocaleString()}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ✅ FIX 5: Removed prose classes — plain Tailwind only */}
      {/* ✅ FIX 6: Removed text-justify */}
      <article className="max-w-none border-t pt-20 text-gray-700 font-sans leading-relaxed space-y-16">

        <header className="mb-12 text-center">
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 leading-tight mb-6 tracking-tighter">
            The Ultimate Guide to Age Calculation: Why Precision Matters
          </h2>
          <p className="text-xl text-gray-500 max-w-3xl mx-auto italic font-medium">
            Counting years is simple, but tracking the rhythm of your life down to the last day is an art form.
          </p>
        </header>

        {/* Section 1 */}
        <section className="space-y-5">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-800 border-l-8 border-blue-600 pl-6">
            The Science Behind Time Tracking
          </h3>
          <p className="text-base md:text-lg text-gray-600 leading-relaxed">
            Have you ever wondered why manual age calculation often feels slightly &quot;off&quot;? It&apos;s because
            our modern calendar system is a complex tapestry of leap years, varying month lengths, and solar
            synchronization. While you might assume your age is just a subtraction of two years, our{" "}
            <strong>Age Calculator Pro</strong> dives deeper into solar orbits. Every four years, our planet
            grants us an extra 24 hours (February 29th) to keep seasonal cycles aligned. Without accounting
            for these leap cycles, your &quot;exact age&quot; would drift by nearly a day every four years.
          </p>
          <p className="text-base md:text-lg text-gray-600 leading-relaxed">
            Precision is paramount, especially when life milestones are at stake. Whether you are applying
            for a specialized government role, calculating retirement eligibility, or simply reflecting on
            personal growth, every day counts. Our algorithm ensures that every February 29th you&apos;ve
            lived through is accounted for — a level of accuracy that basic subtraction simply cannot match.
          </p>
        </section>

        {/* Section 2 */}
        <div className="bg-gradient-to-br from-gray-50 to-blue-50 p-10 md:p-12 rounded-[3rem] border border-blue-100 shadow-inner">
          <h3 className="text-2xl md:text-3xl font-black text-blue-900 mb-8 flex items-center gap-4">
            <ShieldCheck className="w-8 h-8 text-blue-600 flex-shrink-0" /> Professional Applications & Eligibility
          </h3>
          <p className="text-gray-700 mb-8 leading-relaxed">
            In the professional world, time is more than a metric — it&apos;s a gatekeeper. Major competitive
            examinations across the globe have strict &quot;Age as on&quot; cutoff dates. A single day&apos;s discrepancy
            can be the difference between a successful application and an automated rejection.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-blue-100">
              <h4 className="font-bold text-blue-700 mb-2 uppercase text-xs tracking-widest">Global Examinations</h4>
              <p className="text-sm text-gray-600">For civil services and defense roles, eligibility is calculated down to the day. Accuracy is not optional.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-blue-100">
              <h4 className="font-bold text-blue-700 mb-2 uppercase text-xs tracking-widest">Financial Milestones</h4>
              <p className="text-sm text-gray-600">Pension funds and insurance policies rely on exact chronological data to determine premiums and eligibility.</p>
            </div>
          </div>
        </div>

        {/* Section 3 */}
        <section className="space-y-5">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-800">
            Life in Numbers: Beyond Years
          </h3>
          <p className="text-base md:text-lg text-gray-600 leading-relaxed">
            We often view our lives in stagnant blocks of &quot;Years.&quot; But what if we looked at finer details?
            Our calculator transforms your journey into fascinating statistics. Have you realized you have
            lived for thousands of weeks? Understanding the sheer magnitude of hours you&apos;ve been gifted
            encourages a more proactive approach to time management.
          </p>
          <p className="text-base md:text-lg text-gray-600 leading-relaxed">
            Every hour is an opportunity to learn a new skill, and every week is a chance to build a new
            habit. By seeing your life as a collection of <strong>Hours Lived</strong>, you begin to
            appreciate the value of the present moment.
          </p>
        </section>

        {/* Section 4 - Privacy */}
        <section className="py-14 bg-gray-900 text-white rounded-[3rem] px-10 md:px-12 relative overflow-hidden">
          <Zap className="absolute -bottom-10 -left-10 w-56 h-56 text-blue-500 opacity-10" />
          <h3 className="text-2xl md:text-3xl font-black mb-6 text-blue-400">
            Privacy: Our Immutable Commitment
          </h3>
          <p className="text-lg text-gray-300 mb-8 leading-relaxed">
            In an era of digital surveillance, your date of birth is sensitive personal data. Most online
            &quot;free&quot; tools store your input to build advertising profiles.{" "}
            <strong>TaskGuru is different.</strong>
          </p>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="bg-white/10 p-7 rounded-2xl backdrop-blur-md border border-white/10">
              <ShieldCheck className="text-green-400 mb-3 w-6 h-6" />
              <h5 className="font-bold mb-2 uppercase text-xs tracking-widest">Zero Server Storage</h5>
              <p className="text-sm opacity-80 leading-relaxed">Calculations happen entirely in your browser. Your data never leaves your device.</p>
            </div>
            <div className="bg-white/10 p-7 rounded-2xl backdrop-blur-md border border-white/10">
              <CheckCircle className="text-blue-400 mb-3 w-6 h-6" />
              <h5 className="font-bold mb-2 uppercase text-xs tracking-widest">No Login Required</h5>
              <p className="text-sm opacity-80 leading-relaxed">Instant access without tracking, profiling, or storing your information.</p>
            </div>
          </div>
        </section>

        {/* Section 5 - FAQ */}
        <section className="bg-gray-50 p-10 md:p-12 rounded-[3rem] border border-gray-200">
          <h3 className="text-2xl md:text-3xl font-black text-gray-900 mb-10 text-center">
            Frequently Asked Questions
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: <Sparkles className="w-5 h-5" />,
                q: "How accurate is this calculator?",
                a: "Our system follows standard Gregorian calendar logic, ensuring leap years and month variances are calculated with 100% precision.",
              },
              {
                icon: <Target className="w-5 h-5" />,
                q: "Is my birth date data secure?",
                a: "Absolutely. TaskGuru uses client-side processing — the logic runs entirely on your device, not our server. Privacy is baked into our code.",
              },
              {
                icon: <Clock className="w-5 h-5" />,
                q: "Does it handle leap years?",
                a: "Yes. Every February 29th in your lifetime is included in the total days count. Your age will always be accurate to the final day.",
              },
              {
                icon: <CheckCircle className="w-5 h-5" />,
                q: "Can I use this for official forms?",
                a: "While we are highly accurate, always cross-verify with your official birth certificate for critical legal applications.",
              },
            {faqSchema.mainEntity.map((item, i) => (
              <div key={i} className="space-y-3">
                <h4 className="font-bold text-blue-600 text-base flex items-center gap-2">
                  {item.name}
                </h4>
                <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{item.acceptedAnswer.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ✅ FIX 7: Removed spammy hashtags footer — replaced with clean CTA */}
        <div className="text-center pt-6 pb-2">
          <p className="text-gray-400 text-sm max-w-2xl mx-auto leading-relaxed">
            Explore other free tools on TaskGuru:{" "}
            <Link href="/tools/image-compressor" className="text-blue-500 font-bold hover:underline">
              Image Compressor
            </Link>
            {" · "}
            <Link href="/tools/background-remover" className="text-blue-500 font-bold hover:underline">
              Background Remover
            </Link>
            {" · "}
            <Link href="/tools/pdf-to-word" className="text-blue-500 font-bold hover:underline">
              PDF to Word
            </Link>
          </p>
        </div>

      </article>

      {/* ✅ FIX 8: Removed fake rating data from schema. Moved to parent page ideally,
          but kept here without fraudulent ratingCount */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "TaskGuru Age Calculator",
            "operatingSystem": "All",
            "applicationCategory": "UtilityApplication",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            }
          })
        }}
      />
    </div>
  );
}
