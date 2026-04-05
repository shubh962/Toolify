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

// ✅ Paragraphs pool — outside component
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
];

const TIMER_OPTIONS = [30, 60, 120];

// ✅ FAQ schema — outside component
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
  ],
};

function getRandomParagraph() {
  return PARAGRAPHS[Math.floor(Math.random() * PARAGRAPHS.length)];
}

function getRating(wpm: number) {
  if (wpm >= 100) return { label: 'Lightning Fast', emoji: '⚡', color: 'text-yellow-500' };
  if (wpm >= 80) return { label: 'Excellent', emoji: '🏆', color: 'text-green-500' };
  if (wpm >= 60) return { label: 'Good', emoji: '✅', color: 'text-blue-500' };
  if (wpm >= 40) return { label: 'Average', emoji: '👍', color: 'text-slate-500' };
  return { label: 'Keep Practicing', emoji: '💪', color: 'text-orange-500' };
}

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

  // ✅ Calculate stats
  const calculateStats = useCallback((typedText: string, elapsed: number) => {
    const words = typedText.trim().split(/\s+/).filter(Boolean).length;
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

  // ✅ Start timer on first keypress
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Don't allow typing beyond paragraph length
    if (value.length > paragraph.length) return;

    if (!started && value.length > 0) {
      setStarted(true);
    }

    setInput(value);

    // Auto finish when paragraph completed
    if (value.length === paragraph.length) {
      endTest(value, timerOption - timeLeft + 1);
    }
  };

  // ✅ Timer
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

  // ✅ Render paragraph with color coding
  const renderParagraph = () => {
    return paragraph.split('').map((char, i) => {
      let className = 'text-slate-400 dark:text-slate-500'; // untyped
      if (i < input.length) {
        className = input[i] === char
          ? 'text-green-600 dark:text-green-400'  // correct
          : 'text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-900/20'; // wrong
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

              {/* Hidden input */}
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
                <div className={`text-5xl mb-2`}>{rating.emoji}</div>
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
                    { label: 'Beginner', range: '0-40 WPM', active: wpm < 40 },
                    { label: 'Average', range: '40-60 WPM', active: wpm >= 40 && wpm < 60 },
                    { label: 'Good', range: '60-80 WPM', active: wpm >= 60 && wpm < 80 },
                    { label: 'Excellent', range: '80-100 WPM', active: wpm >= 80 && wpm < 100 },
                    { label: 'Professional', range: '100+ WPM', active: wpm >= 100 },
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
                  onClick={() => {
                    setParagraph(getRandomParagraph());
                    reset();
                  }}
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

        <section className="space-y-5">
          <h2 className="text-3xl font-black text-slate-900 dark:text-white">
            Why Typing Speed Matters in 2026
          </h2>
          <p className="text-lg">
            The average professional spends over 6 hours per day typing — emails, documents,
            messages, code, reports. Even a modest improvement in typing speed compounds into
            hours saved every week. A person typing at 40 WPM who improves to 70 WPM effectively
            gets back 30% of their keyboard time.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { emoji: '💼', title: 'Workplace Productivity', desc: 'Most jobs require 40-60 WPM minimum. Faster typists complete reports, emails, and documentation significantly quicker.' },
              { emoji: '👨‍💻', title: 'Developers & Writers', desc: 'Coding and writing both benefit enormously from typing speed. Less time on mechanics means more focus on thinking.' },
              { emoji: '🎓', title: 'Students', desc: 'Note-taking speed, essay writing, and exam performance all improve with faster, more accurate typing.' },
            ].map((item) => (
              <div key={item.title} className="p-6 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl space-y-3">
                <span className="text-3xl">{item.emoji}</span>
                <h3 className="font-black text-slate-900 dark:text-white">{item.title}</h3>
                <p className="text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-5">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            How to Improve Your Typing Speed
          </h2>
          <div className="space-y-3">
            {[
              { n: '1', tip: 'Practice daily — even 15 minutes', desc: 'Consistency matters more than session length. Daily short practice builds muscle memory faster than occasional long sessions.' },
              { n: '2', tip: 'Focus on accuracy first', desc: 'Speed follows accuracy naturally. Typing fast with errors is slower than typing moderately with perfect accuracy.' },
              { n: '3', tip: 'Learn touch typing', desc: 'Using all 10 fingers without looking at the keyboard is the single biggest speed improvement available to most people.' },
              { n: '4', tip: 'Start slow, build up', desc: 'Deliberately type slower than you think you should. Perfect slow repetition is how muscle memory is built.' },
              { n: '5', tip: 'Test regularly', desc: 'Track your WPM and accuracy over time. Visible progress is the best motivation to keep practicing.' },
            ].map((item) => (
              <div key={item.n} className="flex gap-4 p-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl">
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
          <h3 className="text-xl font-black text-slate-900 dark:text-white">More Free Tools</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { label: 'AI Text Paraphraser', sub: 'Rewrite any text instantly', href: '/tools/text-paraphraser', color: 'hover:border-green-400' },
              { label: 'Resume Maker', sub: 'Build ATS-friendly resume free', href: '/tools/resume-maker', color: 'hover:border-purple-400' },
              { label: 'PDF to Word', sub: 'Convert PDF to editable Word', href: '/tools/pdf-to-word', color: 'hover:border-orange-400' },
              { label: 'Image Compressor', sub: 'Reduce image size free', href: '/tools/image-compressor', color: 'hover:border-blue-400' },
            ].map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className={`flex items-center justify-between p-5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 ${tool.color} rounded-2xl transition-colors group`}
              >
                <div>
                  <p className="font-bold text-slate-900 dark:text-white text-sm">{tool.label}</p>
                  <p className="text-xs text-slate-500">{tool.sub}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors flex-shrink-0" />
              </Link>
            ))}
          </div>
        </section>

      </article>
    </>
  );
}
