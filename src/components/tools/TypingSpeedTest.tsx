'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import {
  Timer, RotateCcw, Trophy, Zap, Target,
  ChevronRight, HelpCircle, ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

/* ── Paragraphs ────────────────────────────────────────────── */
const PARAGRAPHS = [
  "The quick brown fox jumps over the lazy dog near the riverbank every single morning without fail regardless of the weather outside.",
  "Technology has changed the way people communicate with each other around the world making distances feel shorter than ever before in human history.",
  "Learning to type faster is one of the most valuable skills you can develop in the modern workplace where keyboards are used for almost everything.",
  "The internet has revolutionized how we access information turning what once took hours of library research into a matter of seconds with a search.",
  "Practice makes perfect and this is especially true when it comes to developing muscle memory for typing accurately at high speeds on any keyboard.",
  "Good communication skills are essential in both personal and professional life helping you express your ideas clearly and understand others better.",
  "Every great developer you know got there by solving problems they were not qualified to solve until they did and that is how skill is built.",
  "Reading books regularly improves your vocabulary your ability to focus and your general knowledge about the world in ways that screens cannot replicate.",
  "The best way to learn something new is to start before you feel ready because readiness is often just another word for procrastination in disguise.",
  "Building good habits takes consistent daily effort and the results may not be visible immediately but they compound over time into something remarkable.",
  "Accuracy in typing is more important than speed because every error you make costs more time to fix than it would have taken to type correctly.",
  "Remote work has made fast and accurate typing a non-negotiable skill for professionals across every industry from finance to marketing to engineering.",
];

const TIMER_OPTIONS = [30, 60, 120];

/* ── Schemas ────────────────────────────────────────────────── */
const toolSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Free Typing Speed Test Online — TaskGuru',
  url: 'https://www.taskguru.online/tools/typing-speed-test',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'All',
  description: 'Free typing speed test online — measure WPM and accuracy instantly. Choose 30, 60, or 120 second tests. No sign-up, no download. Works on any device.',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  publisher: {
    '@type': 'Organization',
    name: 'TaskGuru',
    url: 'https://www.taskguru.online',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is a good typing speed in WPM?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The average typing speed is 40 WPM. A good typist reaches 60-80 WPM. Professional typists type at 80-100 WPM. Anything above 100 WPM is considered excellent. Most office jobs expect 40-60 WPM minimum.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is WPM calculated?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'WPM (Words Per Minute) is calculated by dividing the total number of correctly typed characters by 5 (the average word length), then dividing by the number of minutes elapsed. Only correct characters count — errors reduce your WPM.',
      },
    },
    {
      '@type': 'Question',
      name: 'How can I improve my typing speed?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Practice daily for at least 15-20 minutes. Focus on accuracy first — speed follows naturally. Learn touch typing (using all fingers without looking at the keyboard). Start slow and gradually increase speed. Use all your fingers, not just two.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is typing accuracy?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Typing accuracy is the percentage of characters typed correctly out of the total characters typed. 95% or above is considered good accuracy. Professional typists maintain 98-99% accuracy even at high speeds.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I improve my typing speed from 30 WPM to 60 WPM?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Practice daily for 15-20 minutes focusing on accuracy first. Learn touch typing using all 10 fingers. Start at a comfortable speed and gradually increase. Most people go from 30 to 60 WPM within 4-6 weeks of consistent daily practice.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is a good typing speed for a student?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For students aged 8-12, 20-30 WPM is good. High school students typically type 30-45 WPM. College students average 40-60 WPM. The goal for any student should be reaching at least 40 WPM with 95%+ accuracy before entering the workforce.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does typing speed affect coding and developer performance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, indirectly. Faster typing reduces interruptions to your thought process while coding. Most experienced developers type 60-80 WPM. Beyond 80 WPM, thinking speed becomes the bottleneck rather than typing speed. Focus on accuracy to avoid constant backspacing.',
      },
    },
    {
      '@type': 'Question',
      name: 'What typing speed is required for BPO and data entry jobs?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most BPO and data entry jobs require a minimum of 40-60 WPM with at least 95% accuracy. Some roles at call centres and customer support companies test at 35 WPM minimum. Government data entry exams in India typically require 8,000-10,000 key depressions per hour, equivalent to roughly 30-35 WPM.',
      },
    },
  ],
};

/* ── Helpers ────────────────────────────────────────────────── */
function getRandomParagraph() {
  return PARAGRAPHS[Math.floor(Math.random() * PARAGRAPHS.length)];
}

function getRating(wpm: number) {
  if (wpm >= 100) return { label: 'Lightning Fast', emoji: '⚡', color: 'text-yellow-500' };
  if (wpm >= 80)  return { label: 'Excellent',      emoji: '🏆', color: 'text-green-500' };
  if (wpm >= 60)  return { label: 'Good',           emoji: '✅', color: 'text-blue-500' };
  if (wpm >= 40)  return { label: 'Average',        emoji: '👍', color: 'text-slate-500' };
  return { label: 'Keep Practicing', emoji: '💪', color: 'text-orange-500' };
}

/* ── Component ────────────────────────────────────────────────── */
export default function TypingSpeedTest() {
  const { toast } = useToast();
  const [timerOption, setTimerOption] = useState(60);
  const [paragraph, setParagraph] = useState(() => getRandomParagraph());
  const [input, setInput] = useState('');
  const [timeLeft, setTimeLeft] = useState(60);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [correctChars, setCorrectChars] = useState(0);
  const [errorChars, setErrorChars] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const calculateStats = useCallback((typedText: string, elapsed: number) => {
    const chars = typedText.length;
    const correct = typedText.split('').filter((c, i) => c === paragraph[i]).length;
    const errors = chars - correct;
    const minutes = elapsed / 60;
    const calculatedWpm = minutes > 0 ? Math.round((correct / 5) / minutes) : 0;
    const calculatedAccuracy = chars > 0 ? Math.round((correct / chars) * 100) : 100;

    setWpm(calculatedWpm);
    setAccuracy(calculatedAccuracy);
    setCorrectChars(correct);
    setErrorChars(errors);
  }, [paragraph]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length > paragraph.length) return;
    if (!started && value.length > 0) setStarted(true);
    setInput(value);
    if (value.length === paragraph.length) {
      endTest(value, timerOption - timeLeft + 1);
    }
  };

  useEffect(() => {
    if (started && !finished) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            endTest(input, timerOption);
            return 0;
          }
          calculateStats(input, timerOption - prev + 1);
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [started, finished]);

  const endTest = (finalInput: string, elapsed: number) => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    calculateStats(finalInput, elapsed);
    setFinished(true);
  };

  const reset = (newTimer = timerOption) => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setParagraph(getRandomParagraph());
    setInput('');
    setTimeLeft(newTimer);
    setStarted(false);
    setFinished(false);
    setWpm(0);
    setAccuracy(100);
    setCorrectChars(0);
    setErrorChars(0);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const handleTimerChange = (t: number) => {
    setTimerOption(t);
    reset(t);
  };

  const rating = getRating(wpm);

  const renderParagraph = () => {
    return paragraph.split('').map((char, i) => {
      let className = 'text-slate-400 dark:text-slate-500';
      if (i < input.length) {
        className = input[i] === char
          ? 'text-green-600 dark:text-green-400'
          : 'text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-900/20';
      }
      if (i === input.length) {
        className += ' border-l-2 border-blue-500 animate-pulse';
      }
      return (
        <span key={i} className={className}>
          {char}
        </span>
      );
    });
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ── TOOL CARD ── */}
      <Card className="w-full max-w-3xl mx-auto shadow-2xl mt-8 border-2 border-primary/10 rounded-[2rem] bg-white dark:bg-gray-900">
        <CardContent className="p-6 sm:p-10 space-y-6">

          {/* Timer selector */}
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <Timer className="w-4 h-4 text-primary" />
              <span className="text-sm font-bold text-slate-600 dark:text-slate-400">Duration</span>
            </div>
            <div className="flex gap-2">
              {TIMER_OPTIONS.map((t) => (
                <button
                  key={t}
                  onClick={() => handleTimerChange(t)}
                  className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all ${
                    timerOption === t
                      ? 'bg-primary text-white shadow-md'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {t}s
                </button>
              ))}
            </div>
          </div>

          {!finished ? (
            <>
              {/* Timer display */}
              <div className="flex items-center justify-between">
                <div className={`text-4xl font-black tabular-nums ${
                  timeLeft <= 10 && started ? 'text-red-500 animate-pulse' : 'text-slate-900 dark:text-white'
                }`}>
                  {timeLeft}
                  <span className="text-lg font-medium text-slate-400 ml-1">s</span>
                </div>
                {started && (
                  <div className="flex gap-6 text-sm">
                    <div className="text-center">
                      <p className="text-2xl font-black text-primary">{wpm}</p>
                      <p className="text-xs text-slate-400 uppercase tracking-wider">WPM</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-black text-green-500">{accuracy}%</p>
                      <p className="text-xs text-slate-400 uppercase tracking-wider">Accuracy</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Paragraph display */}
              <div
                className="p-5 bg-slate-50 dark:bg-slate-800 rounded-2xl font-mono text-lg leading-relaxed tracking-wide cursor-text select-none"
                onClick={() => inputRef.current?.focus()}
              >
                {renderParagraph()}
              </div>

              {/* Input */}
              <input
                ref={inputRef}
                value={input}
                onChange={handleInput}
                disabled={finished}
                autoFocus
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
                className="w-full p-4 rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-mono text-base focus:outline-none focus:border-primary transition-colors"
                placeholder={started ? '' : 'Start typing here to begin the test...'}
              />

              {/* Progress bar */}
              <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-300"
                  style={{ width: `${(input.length / paragraph.length) * 100}%` }}
                />
              </div>

              <div className="flex justify-between items-center">
                <p className="text-xs text-slate-400">
                  {input.length}/{paragraph.length} characters
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => reset()}
                  className="rounded-xl"
                >
                  <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
                  Restart
                </Button>
              </div>
            </>
          ) : (
            /* Results */
            <div className="space-y-6">
              <div className="text-center py-4">
                <div className="text-5xl mb-2">{rating.emoji}</div>
                <h3 className={`text-2xl font-black ${rating.color}`}>{rating.label}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Test Complete!</p>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'WPM', value: wpm, icon: <Zap className="w-4 h-4" />, color: 'text-primary' },
                  { label: 'Accuracy', value: `${accuracy}%`, icon: <Target className="w-4 h-4" />, color: 'text-green-500' },
                  { label: 'Correct', value: correctChars, icon: <Trophy className="w-4 h-4" />, color: 'text-blue-500' },
                  { label: 'Errors', value: errorChars, icon: <RotateCcw className="w-4 h-4" />, color: 'text-red-500' },
                ].map((stat) => (
                  <div key={stat.label} className="text-center p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl">
                    <div className={`flex justify-center mb-1 ${stat.color}`}>{stat.icon}</div>
                    <p className={`text-2xl font-black ${stat.color}`}>{stat.value}</p>
                    <p className="text-xs text-slate-400 uppercase tracking-wider">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* WPM benchmark */}
              <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl">
                <p className="text-xs font-black text-slate-400 uppercase tracking-wider mb-3">How You Compare</p>
                <div className="space-y-2">
                  {[
                    { label: 'Beginner',     range: '0–40 WPM',   active: wpm < 40 },
                    { label: 'Average',      range: '40–60 WPM',  active: wpm >= 40 && wpm < 60 },
                    { label: 'Good',         range: '60–80 WPM',  active: wpm >= 60 && wpm < 80 },
                    { label: 'Excellent',    range: '80–100 WPM', active: wpm >= 80 && wpm < 100 },
                    { label: 'Professional', range: '100+ WPM',   active: wpm >= 100 },
                  ].map((level) => (
                    <div key={level.label} className={`flex justify-between items-center px-3 py-1.5 rounded-lg text-sm ${
                      level.active
                        ? 'bg-primary text-white font-bold'
                        : 'text-slate-500 dark:text-slate-400'
                    }`}>
                      <span>{level.label}</span>
                      <span className="font-mono text-xs">{level.range}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <Button onClick={() => reset()} className="flex-1 rounded-xl font-bold h-11">
                  <RotateCcw className="w-4 h-4 mr-2" /> Try Again
                </Button>
                <Button
                  variant="outline"
                  onClick={() => { setParagraph(getRandomParagraph()); reset(); }}
                  className="flex-1 rounded-xl font-bold h-11"
                >
                  New Text
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* ── SEO ARTICLE ── */}
      <article className="max-w-5xl mx-auto px-6 py-16 space-y-14 text-slate-600 dark:text-slate-400 leading-relaxed">

        {/* Personal story */}
        <section className="space-y-5">
          <h2 className="text-3xl font-black text-slate-900 dark:text-white">
            Why I Built This Typing Speed Test
          </h2>
          <p className="text-lg">
            When preparing for technical assessments and interviews in the IT and BPO sectors,
            I noticed a recurring hurdle: strict typing speed requirements. As an engineering
            graduate, I knew the theory, but I quickly realized that raw keyboard speed is
            often the first filter recruiters use.
          </p>
          <p className="text-lg">
            Whether I was writing complex Next.js code to build <strong>TaskGuru</strong>,
            developing mobile apps in Flutter, or simply drafting cold emails to recruiters,
            my Words Per Minute (WPM) directly impacted my daily output. I wanted a clean,
            distraction-free environment to practice touch typing without being bombarded by
            pop-up ads or forced to create an account. That is exactly why I developed this tool.
          </p>
          <p className="text-lg">
            If you are currently job hunting, pair your typing practice with a strong application.
            Use our free{' '}
            <Link href="/tools/resume-maker" className="text-primary font-bold hover:underline">
              ATS-Friendly Resume Maker
            </Link>{' '}
            to ensure your CV passes automated screening systems just as smoothly as you
            pass your typing tests.
          </p>
        </section>

        {/* Reality section */}
        <section className="space-y-5">
          <h2 className="text-3xl font-black text-slate-900 dark:text-white">
            The Reality of Keyboard Skills in 2026
          </h2>
          <p className="text-lg">
            Even in the age of AI and voice-to-text, the keyboard remains the ultimate tool
            for professionals. The average person spends over 6 hours a day typing. A modest
            improvement from 40 WPM to 70 WPM effectively gives you back 30% of your keyboard
            time every single week.
          </p>
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            {[
              {
                emoji: '💼',
                title: 'BPO & Data Entry Roles',
                desc: 'Most data processing and customer support roles require a strict 40–60 WPM minimum with high accuracy to handle high ticket volumes.',
              },
              {
                emoji: '👨‍💻',
                title: 'Software Developers',
                desc: 'Coding requires typing complex syntax without looking down. Faster typing means fewer interruptions to your logical flow while debugging.',
              },
              {
                emoji: '✍️',
                title: 'Content Creators',
                desc: 'Writers and SEO experts draft thousands of words daily. Fast typing prevents creative blocks and keeps ideas flowing.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="p-6 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl space-y-3"
              >
                <span className="text-3xl">{item.emoji}</span>
                <h3 className="font-black text-slate-900 dark:text-white">{item.title}</h3>
                <p className="text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-lg mt-6">
            For creators who spend hours generating content, hitting writer&apos;s block is
            common. If you get stuck rewriting the same paragraph, use our{' '}
            <Link href="/tools/text-paraphraser" className="text-primary font-bold hover:underline">
              AI Text Paraphraser
            </Link>{' '}
            to instantly refresh your drafts while you focus on improving your raw typing speed here.
          </p>
        </section>

        {/* WPM standards */}
        <section className="space-y-5">
          <h2 className="text-3xl font-black text-slate-900 dark:text-white">
            Typing Speed Standards by Role
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-700">
            <table className="w-full text-sm">
              <thead className="bg-slate-900 text-white">
                <tr>
                  <th className="p-4 text-left font-bold">Role</th>
                  <th className="p-4 text-left font-bold">Min WPM</th>
                  <th className="p-4 text-left font-bold">Good WPM</th>
                  <th className="p-4 text-left font-bold">Accuracy</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 bg-white dark:bg-slate-900">
                {[
                  ['Data Entry / BPO', '35–40', '50–60', '95%+'],
                  ['Secretary / Admin', '50', '65–75', '98%+'],
                  ['Software Developer', '40', '60–80', '95%+'],
                  ['Content Writer', '50', '70–90', '97%+'],
                  ['Court Reporter', '100', '225+', '99%+'],
                  ['Average Office Worker', '35', '40–60', '90%+'],
                ].map(([role, min, good, acc]) => (
                  <tr key={role as string} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="p-4 font-medium text-slate-900 dark:text-white">{role as string}</td>
                    <td className="p-4 text-slate-600 dark:text-slate-400">{min as string}</td>
                    <td className="p-4 text-green-600 dark:text-green-400 font-medium">{good as string}</td>
                    <td className="p-4 text-slate-600 dark:text-slate-400">{acc as string}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Tips section */}
        <section className="space-y-5">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            How to Double Your Typing Speed — 4 Proven Methods
          </h2>
          <div className="space-y-3">
            {[
              {
                n: '1',
                tip: 'Master Touch Typing',
                desc: 'The most crucial step. Learn to use all 10 fingers without looking at the keyboard. Rely on the tactile bumps on the F and J keys to position your index fingers. Touch typists are consistently 40–50% faster than hunt-and-peck typists.',
              },
              {
                n: '2',
                tip: 'Prioritize Accuracy Over Speed',
                desc: 'It is a common trap to smash keys quickly. However, hitting backspace destroys your WPM. Aim for 98% accuracy — the speed will naturally follow your muscle memory over the following weeks.',
              },
              {
                n: '3',
                tip: 'Consistent Daily Practice',
                desc: 'Practicing for 15 minutes every single day is far more effective than practicing for two hours once a week. Consistency wires the brain. Use a Pomodoro timer to schedule your daily practice sessions.',
              },
              {
                n: '4',
                tip: 'Maintain Proper Posture',
                desc: 'Keep your wrists hovering slightly above the keyboard, sit up straight, and keep your screen at eye level to prevent fatigue during long coding or data entry sessions.',
              },
            ].map((item) => (
              <div
                key={item.n}
                className="flex gap-4 p-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl"
              >
                <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center font-black flex-shrink-0 text-sm">
                  {item.n}
                </div>
                <div>
                  <p className="font-bold text-slate-900 dark:text-white text-sm mb-1">{item.tip}</p>
                  <p className="text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="space-y-5">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-blue-600" /> Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {faqSchema.mainEntity.map((faq, i) => (
              <details
                key={i}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 cursor-pointer group"
              >
                <summary className="font-bold text-slate-900 dark:text-white list-none flex justify-between items-center text-sm">
                  {faq.name}
                  <span className="transition-transform group-open:rotate-180 text-slate-400 flex-shrink-0 ml-2">▼</span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed">{faq.acceptedAnswer.text}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Related tools */}
        <section className="border-t border-slate-100 dark:border-slate-800 pt-12 space-y-6">
          <h3 className="text-xl font-black text-slate-900 dark:text-white">
            More Free Productivity Tools
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { label: 'AI Text Paraphraser', sub: 'Rewrite any text instantly — free, no word limit', href: '/tools/text-paraphraser', color: 'hover:border-green-400' },
              { label: 'Grammar Checker', sub: 'Fix grammar and spelling errors — no sign-up', href: '/tools/grammar-checker', color: 'hover:border-blue-400' },
              { label: 'Word Counter', sub: 'Count words, characters, and reading time free', href: '/tools/word-counter', color: 'hover:border-yellow-400' },
              { label: 'Pomodoro Timer', sub: 'Structure your practice sessions with focus timer', href: '/tools/pomodoro-timer', color: 'hover:border-red-400' },
              { label: 'Resume Maker', sub: 'Build ATS-friendly resume free — no watermark', href: '/tools/resume-maker', color: 'hover:border-purple-400' },
              { label: 'AI Content Detector', sub: 'Check if text is AI-generated free', href: '/tools/ai-content-detector', color: 'hover:border-orange-400' },
            ].map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className={`flex items-center justify-between p-5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 ${tool.color} rounded-2xl transition-colors group shadow-sm hover:shadow-md`}
              >
                <div>
                  <p className="font-bold text-slate-900 dark:text-white text-sm">{tool.label}</p>
                  <p className="text-xs text-slate-500 mt-1">{tool.sub}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-primary transition-colors flex-shrink-0" />
              </Link>
            ))}
          </div>

          {/* Blog links */}
          <div className="mt-4 p-5 rounded-xl border bg-slate-50 dark:bg-slate-900 space-y-3">
            <p className="font-bold text-slate-900 dark:text-white text-sm">Related Reading</p>
            <div className="space-y-2">
              {[
                { href: '/blog/how-to-paraphrase-text', title: 'How to Paraphrase Text — Complete Guide' },
                { href: '/blog/how-to-make-resume-with-no-experience', title: 'How to Make a Resume With No Experience' },
                { href: '/blog/free-online-tools-students-2026-no-login', title: 'Free Online Tools for Students 2026 — No Login' },
                { href: '/blog/pomodoro-technique-guide', title: 'Pomodoro Technique — Complete Productivity Guide' },
              ].map((post) => (
                <Link
                  key={post.href}
                  href={post.href}
                  className="flex items-center gap-2 text-sm text-primary hover:underline"
                >
                  <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                  {post.title}
                </Link>
              ))}
            </div>
          </div>
        </section>

      </article>
    </>
  );
}
