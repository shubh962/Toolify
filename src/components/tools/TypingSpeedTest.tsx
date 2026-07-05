'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Script from 'next/script';
import Link from 'next/link';
import {
  Timer, RotateCcw, Trophy, Zap, Target,
  ArrowRight, CheckCircle, Clock, User, RefreshCw,
  TrendingUp, Star,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

/* ─── Constants ────────────────────────────────────────────── */
const LAST_UPDATED   = 'June 2026';
const READ_TIME      = '6 min read';
const REVIEWED_BY    = 'Shubham Gautam';
const BEST_WPM_KEY   = 'taskguru_typing_best_wpm';

/* ─── Paragraphs by difficulty ─────────────────────────────── */
const PARAGRAPHS = {
  easy: [
    "The quick brown fox jumps over the lazy dog near the riverbank every single morning without fail.",
    "Learning to type faster is one of the most valuable skills you can develop in the modern workplace.",
    "Good communication skills are essential in both personal and professional life every single day.",
    "Practice makes perfect and this is especially true when it comes to developing muscle memory for typing.",
    "Reading books regularly improves your vocabulary your ability to focus and your general knowledge.",
    "Remote work has made fast and accurate typing a non-negotiable skill for professionals everywhere.",
    "The best way to learn something new is to start before you feel ready because readiness takes time.",
    "Building good habits takes consistent daily effort and the results compound over time into something great.",
  ],
  medium: [
    "Technology has changed the way people communicate with each other around the world making distances feel shorter than ever before in human history.",
    "The internet has revolutionized how we access information turning what once took hours of library research into a matter of seconds with a search.",
    "Every great developer you know got there by solving problems they were not qualified to solve until they did and that is how real skill is built.",
    "Accuracy in typing is more important than speed because every error you make costs more time to fix than it would have taken to type correctly.",
    "Building good habits takes consistent daily effort and the results may not be visible immediately but they compound over time into something remarkable.",
    "Whether you are writing complex code, drafting a business proposal, or replying to emails — typing speed directly influences your daily productivity output.",
    "The average professional types for over four hours every single workday. Improving your speed by just twenty percent saves you nearly an hour per day.",
  ],
  hard: [
    "In software engineering, the ability to translate abstract logical constructs into syntactically correct code without interruption requires a combination of cognitive clarity and precise keyboard fluency that comes only from deliberate practice.",
    "Data entry professionals are frequently evaluated not merely on the raw volume of keystrokes per hour but on their sustained accuracy across extended shifts, where even a momentary lapse in concentration can cascade into costly correction cycles.",
    "Court reporters and stenographers routinely achieve transcription speeds exceeding two hundred words per minute using specialized chorded keyboards, demonstrating that with sufficient dedicated practice the apparent ceiling of human typing speed is significantly higher than most people assume.",
    "The relationship between typing proficiency and knowledge-worker productivity is non-linear: at lower speeds, every additional ten words per minute yields disproportionate workflow improvements, but beyond approximately eighty words per minute, cognitive processing rather than physical keystroke velocity becomes the primary constraint.",
  ],
};

const TIMER_OPTIONS = [30, 60, 120];
type Difficulty = 'easy' | 'medium' | 'hard';

/* ─── Helpers ──────────────────────────────────────────────── */
function getRandomParagraph(difficulty: Difficulty) {
  const list = PARAGRAPHS[difficulty];
  return list[Math.floor(Math.random() * list.length)];
}

function getRating(wpm: number) {
  if (wpm >= 100) return { label: 'Lightning Fast', emoji: '⚡', color: 'text-yellow-500' };
  if (wpm >= 80)  return { label: 'Excellent',      emoji: '🏆', color: 'text-green-500'  };
  if (wpm >= 60)  return { label: 'Good',           emoji: '✅', color: 'text-blue-500'   };
  if (wpm >= 40)  return { label: 'Average',        emoji: '👍', color: 'text-slate-500'  };
  return              { label: 'Keep Practicing', emoji: '💪', color: 'text-orange-500' };
}

function getBestWpm(): number {
  try { return parseInt(localStorage.getItem(BEST_WPM_KEY) ?? '0', 10) || 0; } catch { return 0; }
}

function saveBestWpm(wpm: number) {
  try { localStorage.setItem(BEST_WPM_KEY, String(wpm)); } catch { /* no-op */ }
}

/* ─── FAQ ──────────────────────────────────────────────────── */
const faqItems = [
  { q: 'What is a good typing speed in WPM?',                          a: 'The average typing speed is 40 WPM. A good typist reaches 60–80 WPM. Professional typists type at 80–100 WPM. Anything above 100 WPM is considered excellent. Most office jobs expect 40–60 WPM minimum.' },
  { q: 'How is WPM calculated?',                                        a: 'WPM (Words Per Minute) is calculated by dividing the total number of correctly typed characters by 5 (the average word length), then dividing by the number of minutes elapsed. Only correct characters count — errors reduce your WPM.' },
  { q: 'How can I improve my typing speed?',                            a: 'Practice daily for at least 15–20 minutes. Focus on accuracy first — speed follows naturally. Learn touch typing (using all fingers without looking at the keyboard). Start slow and gradually increase speed.' },
  { q: 'What is typing accuracy?',                                      a: 'Typing accuracy is the percentage of characters typed correctly out of the total characters typed. 95% or above is considered good accuracy. Professional typists maintain 98–99% accuracy even at high speeds.' },
  { q: 'How do I improve from 30 WPM to 60 WPM?',                      a: 'Practice daily for 15–20 minutes focusing on accuracy first. Learn touch typing using all 10 fingers. Most people reach 60 WPM within 4–6 weeks of consistent daily practice.' },
  { q: 'What is a good typing speed for a student?',                    a: 'For students aged 8–12, 20–30 WPM is good. High school students typically type 30–45 WPM. College students average 40–60 WPM. The goal should be reaching 40 WPM with 95%+ accuracy before entering the workforce.' },
  { q: 'Does typing speed affect coding performance?',                   a: 'Yes, indirectly. Faster typing reduces interruptions to your thought process while coding. Most experienced developers type 60–80 WPM. Beyond 80 WPM, thinking speed becomes the bottleneck — focus on accuracy to avoid constant backspacing.' },
  { q: 'What typing speed is required for BPO and data entry jobs?',    a: 'Most BPO and data entry jobs require 40–60 WPM with at least 95% accuracy. Government data entry exams in India typically require 8,000–10,000 key depressions per hour (roughly 30–35 WPM).' },
  { q: 'What is CPM in typing?',                                         a: 'CPM (Characters Per Minute) counts every character typed correctly, not grouped into words. It is more granular than WPM and is useful for data entry roles where character volume matters more than word count. CPM ÷ 5 = approximate WPM.' },
];

/* ─── Schemas ──────────────────────────────────────────────── */
const toolSchema = {
  '@context': 'https://schema.org',
  '@type': ['WebApplication', 'SoftwareApplication'],
  name: 'Free Typing Speed Test Online — TaskGuru',
  url: 'https://www.taskguru.online/tools/typing-speed-test',
  applicationCategory: 'Utility',
  operatingSystem: 'Any',
  browserRequirements: 'Requires JavaScript',
  description: 'Free typing speed test online — measure WPM, CPM, and accuracy instantly. Choose 30, 60, or 120 second tests. Three difficulty levels. No sign-up, no download. Works on any device.',
  featureList: [
    'WPM (Words Per Minute) measurement',
    'CPM (Characters Per Minute) measurement',
    'Accuracy percentage tracking',
    'Three difficulty levels (Easy, Medium, Hard)',
    'Three timer options (30s, 60s, 120s)',
    'Live WPM display during test',
    'Personal best WPM tracking',
    'Real-time character highlighting',
  ],
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD', availability: 'https://schema.org/InStock' },
  publisher: { '@type': 'Organization', name: 'TaskGuru', url: 'https://www.taskguru.online', logo: { '@type': 'ImageObject', url: 'https://www.taskguru.online/logo.png' } },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Take the Free Typing Speed Test on TaskGuru',
  description: 'Step-by-step guide to measuring your WPM and accuracy using the free TaskGuru typing speed test.',
  totalTime: 'PT2M',
  estimatedCost: { '@type': 'MonetaryAmount', currency: 'USD', value: '0' },
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Choose your settings',  text: 'Select a test duration (30s, 60s, or 120s) and difficulty level (Easy, Medium, Hard).' },
    { '@type': 'HowToStep', position: 2, name: 'Start typing',          text: 'Click the input field and start typing the displayed text. The timer starts automatically on your first keystroke.' },
    { '@type': 'HowToStep', position: 3, name: 'View your results',     text: 'When the timer ends, see your WPM, CPM, accuracy, correct characters, and errors.' },
    { '@type': 'HowToStep', position: 4, name: 'Practice and improve',  text: 'Click Try Again to retake the test or New Text for a fresh paragraph. Your personal best WPM is saved automatically.' },
  ],
};

/* ─── Component ────────────────────────────────────────────── */
export default function TypingSpeedTest() {
  const { toast }                         = useToast();
  const [timerOption, setTimerOption]     = useState(60);
  const [difficulty, setDifficulty]       = useState<Difficulty>('medium');
  const [paragraph, setParagraph]         = useState(() => getRandomParagraph('medium'));
  const [input, setInput]                 = useState('');
  const [timeLeft, setTimeLeft]           = useState(60);
  const [started, setStarted]             = useState(false);
  const [finished, setFinished]           = useState(false);
  const [wpm, setWpm]                     = useState(0);
  const [cpm, setCpm]                     = useState(0);
  const [accuracy, setAccuracy]           = useState(100);
  const [correctChars, setCorrectChars]   = useState(0);
  const [errorChars, setErrorChars]       = useState(0);
  const [bestWpm, setBestWpm]             = useState(0);
  const [isNewBest, setIsNewBest]         = useState(false);
  const inputRef   = useRef<HTMLInputElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => { setBestWpm(getBestWpm()); }, []);

  /* ── All original calculation logic — unchanged ── */
  const calculateStats = useCallback((typedText: string, elapsed: number) => {
    const chars    = typedText.length;
    const correct  = typedText.split('').filter((c, i) => c === paragraph[i]).length;
    const errors   = chars - correct;
    const minutes  = elapsed / 60;
    const calculatedWpm      = minutes > 0 ? Math.round((correct / 5) / minutes) : 0;
    const calculatedCpm      = minutes > 0 ? Math.round(correct / minutes) : 0;
    const calculatedAccuracy = chars > 0 ? Math.round((correct / chars) * 100) : 100;
    setWpm(calculatedWpm);
    setCpm(calculatedCpm);
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
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [started, finished]);

  const endTest = (finalInput: string, elapsed: number) => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    calculateStats(finalInput, elapsed);
    setFinished(true);
    // Save best WPM
    const finalWpm = Math.round((finalInput.split('').filter((c, i) => c === paragraph[i]).length / 5) / (elapsed / 60));
    const prev = getBestWpm();
    if (finalWpm > prev) { saveBestWpm(finalWpm); setBestWpm(finalWpm); setIsNewBest(true); }
  };

  const reset = (newTimer = timerOption, newDifficulty = difficulty) => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setParagraph(getRandomParagraph(newDifficulty));
    setInput('');
    setTimeLeft(newTimer);
    setStarted(false);
    setFinished(false);
    setWpm(0);
    setCpm(0);
    setAccuracy(100);
    setCorrectChars(0);
    setErrorChars(0);
    setIsNewBest(false);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const handleTimerChange = (t: number) => { setTimerOption(t); reset(t, difficulty); };
  const handleDifficultyChange = (d: Difficulty) => { setDifficulty(d); reset(timerOption, d); };

  const rating = getRating(wpm);

  const renderParagraph = () => {
    return paragraph.split('').map((char, i) => {
      let className = 'text-slate-400 dark:text-slate-500';
      if (i < input.length) {
        className = input[i] === char
          ? 'text-green-600 dark:text-green-400'
          : 'text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-900/20';
      }
      if (i === input.length) className += ' border-l-2 border-blue-500 animate-pulse';
      return <span key={i} className={className}>{char}</span>;
    });
  };

  const difficultyColors: Record<Difficulty, string> = {
    easy:   'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 border-green-300',
    medium: 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-blue-300',
    hard:   'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300 border-red-300',
  };

  return (
    <>
      <Script id="typing-tool-schema"  type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema)  }} />
      <Script id="typing-faq-schema"   type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema)   }} />
      <Script id="typing-howto-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />

      {/* ── EEAT META BAR ── */}
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground border-b border-border pb-4 mb-6">
        <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5" aria-hidden="true" />Reviewed by <strong className="text-foreground">{REVIEWED_BY}</strong></span>
        <span className="flex items-center gap-1.5"><RefreshCw className="w-3.5 h-3.5" aria-hidden="true" />Updated: <strong className="text-foreground">{LAST_UPDATED}</strong></span>
        <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" aria-hidden="true" />{READ_TIME}</span>
        <span className="flex items-center gap-x-3 ml-auto">
          <Link href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link>
          <span aria-hidden="true">·</span>
          <Link href="/about" className="hover:text-primary transition-colors">About</Link>
          <span aria-hidden="true">·</span>
          <Link href="/contact" className="hover:text-primary transition-colors">Contact</Link>
        </span>
      </div>

      {/* ── QUICK ANSWER ── */}
      <section id="quick-answer" aria-label="Quick Answer" className="p-5 bg-primary/5 border border-primary/20 rounded-2xl mb-6">
        <p className="text-xs font-bold text-primary uppercase tracking-wider mb-2">⚡ Quick Answer</p>
        <p className="text-sm leading-relaxed text-foreground">
          <strong>TaskGuru&apos;s Free Typing Speed Test</strong> measures your WPM (Words Per Minute), CPM (Characters Per Minute), and accuracy in real time. Choose 30s, 60s, or 120s test duration, select difficulty (Easy/Medium/Hard), and start typing. No login, no download — works on any device.
        </p>
      </section>

      {/* ── TOOL CARD ── */}
      <Card className="w-full max-w-3xl mx-auto shadow-2xl mt-8 border-2 border-primary/10 rounded-[2rem] bg-white dark:bg-gray-900">
        <CardContent className="p-6 sm:p-10 space-y-6">

          {/* Controls row */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Timer */}
            <div className="flex items-center gap-2">
              <Timer className="w-4 h-4 text-primary" aria-hidden="true" />
              <span className="text-sm font-bold text-slate-600 dark:text-slate-400">Duration</span>
              <div className="flex gap-1.5" role="group" aria-label="Test duration">
                {TIMER_OPTIONS.map((t) => (
                  <button key={t} onClick={() => handleTimerChange(t)}
                    className={`px-3 py-1.5 rounded-full text-sm font-bold transition-all ${timerOption === t ? 'bg-primary text-white shadow-md' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'}`}
                    aria-label={`${t} second test`} aria-pressed={timerOption === t}
                  >{t}s</button>
                ))}
              </div>
            </div>

            {/* Difficulty */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-slate-600 dark:text-slate-400">Difficulty</span>
              <div className="flex gap-1.5" role="group" aria-label="Difficulty level">
                {(['easy', 'medium', 'hard'] as Difficulty[]).map((d) => (
                  <button key={d} onClick={() => handleDifficultyChange(d)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold capitalize transition-all border ${difficulty === d ? difficultyColors[d] : 'bg-slate-100 dark:bg-slate-800 text-slate-500 border-transparent hover:border-slate-300'}`}
                    aria-label={`${d} difficulty`} aria-pressed={difficulty === d}
                  >{d}</button>
                ))}
              </div>
            </div>

            {/* Personal best */}
            {bestWpm > 0 && (
              <div className="flex items-center gap-1.5 text-xs font-bold text-yellow-600 dark:text-yellow-400">
                <Star className="w-3.5 h-3.5" aria-hidden="true" /> Best: {bestWpm} WPM
              </div>
            )}
          </div>

          {!finished ? (
            <>
              {/* Timer + live stats */}
              <div className="flex items-center justify-between">
                <div className={`text-4xl font-black tabular-nums ${timeLeft <= 10 && started ? 'text-red-500 animate-pulse' : 'text-slate-900 dark:text-white'}`} aria-live="polite" aria-label={`${timeLeft} seconds remaining`}>
                  {timeLeft}<span className="text-lg font-medium text-slate-400 ml-1">s</span>
                </div>
                {started && (
                  <div className="flex gap-6 text-sm">
                    <div className="text-center">
                      <p className="text-2xl font-black text-primary" aria-live="polite">{wpm}</p>
                      <p className="text-xs text-slate-400 uppercase tracking-wider">WPM</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-black text-blue-500" aria-live="polite">{cpm}</p>
                      <p className="text-xs text-slate-400 uppercase tracking-wider">CPM</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-black text-green-500" aria-live="polite">{accuracy}%</p>
                      <p className="text-xs text-slate-400 uppercase tracking-wider">Accuracy</p>
                    </div>
                    {errorChars > 0 && (
                      <div className="text-center">
                        <p className="text-2xl font-black text-red-500" aria-live="polite">{errorChars}</p>
                        <p className="text-xs text-slate-400 uppercase tracking-wider">Errors</p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Paragraph display */}
              <div
                className="p-5 bg-slate-50 dark:bg-slate-800 rounded-2xl font-mono text-lg leading-relaxed tracking-wide cursor-text select-none"
                onClick={() => inputRef.current?.focus()}
                aria-label="Text to type — click to focus input"
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
                aria-label="Type the displayed text here"
              />

              {/* Progress bar */}
              <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden" role="progressbar" aria-valuenow={Math.round((input.length / paragraph.length) * 100)} aria-valuemin={0} aria-valuemax={100}>
                <div className="h-full bg-primary rounded-full transition-all duration-300" style={{ width: `${(input.length / paragraph.length) * 100}%` }} />
              </div>

              <div className="flex justify-between items-center">
                <p className="text-xs text-slate-400" aria-live="polite">{input.length}/{paragraph.length} characters</p>
                <Button variant="outline" size="sm" onClick={() => reset()} className="rounded-xl" aria-label="Restart typing test">
                  <RotateCcw className="w-3.5 h-3.5 mr-1.5" aria-hidden="true" /> Restart
                </Button>
              </div>
            </>
          ) : (
            /* Results */
            <div className="space-y-6">
              <div className="text-center py-4">
                <div className="text-5xl mb-2" role="img" aria-label={rating.label}>{rating.emoji}</div>
                <h3 className={`text-2xl font-black ${rating.color}`}>{rating.label}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Test Complete!</p>
                {isNewBest && (
                  <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300 rounded-full text-xs font-bold">
                    <Star className="w-3.5 h-3.5" aria-hidden="true" /> New Personal Best!
                  </div>
                )}
              </div>

              {/* Stats grid — now includes CPM */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { label: 'WPM',      value: wpm,           icon: <Zap className="w-4 h-4" aria-hidden="true" />,        color: 'text-primary'      },
                  { label: 'CPM',      value: cpm,           icon: <TrendingUp className="w-4 h-4" aria-hidden="true" />, color: 'text-blue-500'     },
                  { label: 'Accuracy', value: `${accuracy}%`,icon: <Target className="w-4 h-4" aria-hidden="true" />,     color: 'text-green-500'    },
                  { label: 'Correct',  value: correctChars,  icon: <Trophy className="w-4 h-4" aria-hidden="true" />,     color: 'text-indigo-500'   },
                  { label: 'Errors',   value: errorChars,    icon: <RotateCcw className="w-4 h-4" aria-hidden="true" />,  color: 'text-red-500'      },
                  { label: 'Best WPM', value: bestWpm,       icon: <Star className="w-4 h-4" aria-hidden="true" />,       color: 'text-yellow-500'   },
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
                    { label: 'Beginner',     range: '0–40 WPM',   active: wpm < 40                     },
                    { label: 'Average',      range: '40–60 WPM',  active: wpm >= 40 && wpm < 60          },
                    { label: 'Good',         range: '60–80 WPM',  active: wpm >= 60 && wpm < 80          },
                    { label: 'Excellent',    range: '80–100 WPM', active: wpm >= 80 && wpm < 100         },
                    { label: 'Professional', range: '100+ WPM',   active: wpm >= 100                     },
                  ].map((level) => (
                    <div key={level.label} className={`flex justify-between items-center px-3 py-1.5 rounded-lg text-sm ${level.active ? 'bg-primary text-white font-bold' : 'text-slate-500 dark:text-slate-400'}`}>
                      <span>{level.label}</span>
                      <span className="font-mono text-xs">{level.range}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <Button onClick={() => reset()} className="flex-1 rounded-xl font-bold h-11" aria-label="Try the test again">
                  <RotateCcw className="w-4 h-4 mr-2" aria-hidden="true" /> Try Again
                </Button>
                <Button variant="outline" onClick={() => { setParagraph(getRandomParagraph(difficulty)); reset(); }} className="flex-1 rounded-xl font-bold h-11" aria-label="Get new text and try again">
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
          <h2 className="text-3xl font-black text-slate-900 dark:text-white">Why I Built This Typing Speed Test</h2>
          <p className="text-lg">
            When preparing for technical assessments and interviews in the IT and BPO sectors, I noticed a recurring hurdle: strict typing speed requirements. As an engineering graduate, I knew the theory, but I quickly realized that raw keyboard speed is often the first filter recruiters use.
          </p>
          <p className="text-lg">
            Whether I was writing complex Next.js code to build <strong>TaskGuru</strong>, developing mobile apps in Flutter, or drafting cold emails to recruiters, my Words Per Minute (WPM) directly impacted my daily output. I wanted a clean, distraction-free environment to practice without being bombarded by pop-up ads. That is exactly why I developed this tool.
          </p>
          <p className="text-lg">
            If you are currently job hunting, pair your typing practice with a strong application. Use our free{' '}
            <Link href="/tools/resume-maker" className="text-primary font-bold hover:underline">ATS-Friendly Resume Maker</Link>{' '}
            to ensure your CV passes automated screening systems just as smoothly as you pass your typing tests.
          </p>
        </section>

        <section className="space-y-5">
          <h2 className="text-3xl font-black text-slate-900 dark:text-white">The Reality of Keyboard Skills in 2026</h2>
          <p className="text-lg">
            Even in the age of AI and voice-to-text, the keyboard remains the primary tool for knowledge workers. The average professional spends over 4 hours a day typing. Improving from 40 WPM to 70 WPM effectively recovers 30% of your keyboard time every week.
          </p>
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            {[
              { emoji: '💼', title: 'BPO & Data Entry Roles',  desc: 'Most data processing and customer support roles require a strict 40–60 WPM minimum with high accuracy to handle high ticket volumes.' },
              { emoji: '👨‍💻', title: 'Software Developers',    desc: 'Coding requires typing complex syntax without looking down. Faster typing means fewer interruptions to your logical flow while debugging.' },
              { emoji: '✍️', title: 'Content Creators',        desc: 'Writers and SEO experts draft thousands of words daily. Fast typing prevents creative blocks and keeps ideas flowing at full speed.' },
            ].map((item) => (
              <div key={item.title} className="p-6 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl space-y-3">
                <span className="text-3xl" role="img" aria-label={item.title}>{item.emoji}</span>
                <h3 className="font-black text-slate-900 dark:text-white">{item.title}</h3>
                <p className="text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* WPM standards table */}
        <section className="space-y-5">
          <h2 className="text-3xl font-black text-slate-900 dark:text-white">Typing Speed Standards by Role</h2>
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
                  ['Data Entry / BPO',     '35–40', '50–60',  '95%+'],
                  ['Secretary / Admin',    '50',    '65–75',  '98%+'],
                  ['Software Developer',   '40',    '60–80',  '95%+'],
                  ['Content Writer',       '50',    '70–90',  '97%+'],
                  ['Court Reporter',       '100',   '225+',   '99%+'],
                  ['Average Office Worker','35',    '40–60',  '90%+'],
                ].map(([role, min, good, acc]) => (
                  <tr key={role} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="p-4 font-medium text-slate-900 dark:text-white">{role}</td>
                    <td className="p-4 text-slate-600 dark:text-slate-400">{min}</td>
                    <td className="p-4 text-green-600 dark:text-green-400 font-medium">{good}</td>
                    <td className="p-4 text-slate-600 dark:text-slate-400">{acc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Tips */}
        <section className="space-y-5">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">How to Double Your Typing Speed — 4 Proven Methods</h2>
          <div className="space-y-3">
            {[
              { n: '1', tip: 'Master Touch Typing',         desc: 'The most crucial step. Learn to use all 10 fingers without looking at the keyboard. Rely on the tactile bumps on the F and J keys. Touch typists are consistently 40–50% faster than hunt-and-peck typists.' },
              { n: '2', tip: 'Prioritise Accuracy Over Speed', desc: 'A common trap is rushing to increase WPM. However, hitting backspace destroys your score. Aim for 98% accuracy — the speed will naturally follow your muscle memory over the following weeks.' },
              { n: '3', tip: 'Consistent Daily Practice',   desc: 'Practising for 15 minutes every single day is far more effective than 2 hours once a week. Consistency wires the brain. Use the Pomodoro Timer to schedule daily practice sessions.' },
              { n: '4', tip: 'Maintain Proper Posture',     desc: 'Keep your wrists hovering slightly above the keyboard, sit up straight, and keep your screen at eye level to prevent fatigue during long typing or coding sessions.' },
            ].map((item) => (
              <div key={item.n} className="flex gap-4 p-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl">
                <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center font-black flex-shrink-0 text-sm">{item.n}</div>
                <div>
                  <p className="font-bold text-slate-900 dark:text-white text-sm mb-1">{item.tip}</p>
                  <p className="text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Summary */}
        <section id="tool-summary" className="p-6 bg-primary/5 border border-primary/20 rounded-2xl">
          <h2 className="text-xl font-black text-slate-900 dark:text-white mb-4">Summary</h2>
          <ul className="space-y-2 text-sm" role="list">
            {[
              'Measures WPM, CPM, accuracy, correct characters, and errors.',
              'Three test durations: 30s, 60s, 120s — choose based on your focus level.',
              'Three difficulty levels: Easy, Medium, Hard — progress systematically.',
              'Personal best WPM saved in your browser automatically.',
              'CPM (Characters Per Minute) shown for data entry and BPO preparation.',
              'No account, no download, works on desktop and mobile.',
            ].map((point) => (
              <li key={point} className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" aria-hidden="true" /><span>{point}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* FAQ */}
        <section className="space-y-5">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqItems.map((faq, i) => (
              <details key={i} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 cursor-pointer group">
                <summary className="font-bold text-slate-900 dark:text-white list-none flex justify-between items-center text-sm">
                  {faq.q}
                  <span className="transition-transform group-open:rotate-180 text-slate-400 flex-shrink-0 ml-2" aria-hidden="true">▼</span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Related tools */}
        <section className="border-t border-slate-100 dark:border-slate-800 pt-12 space-y-6">
          <h3 className="text-xl font-black text-slate-900 dark:text-white">More Free Productivity Tools</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { label: 'AI Text Paraphraser',  sub: 'Rewrite any text instantly — free, no word limit',    href: '/tools/text-paraphraser',    color: 'hover:border-green-400'  }, // ✅
              { label: 'Grammar Checker',      sub: 'Fix grammar and spelling errors — no sign-up',        href: '/tools/grammar-checker',     color: 'hover:border-blue-400'   }, // ✅
              { label: 'Word Counter',         sub: 'Count words, characters, and reading time free',      href: '/tools/word-counter',        color: 'hover:border-yellow-400' }, // ✅
              { label: 'Pomodoro Timer',       sub: 'Structure your practice sessions with focus timer',   href: '/tools/pomodoro-timer',      color: 'hover:border-red-400'    }, // ✅
              { label: 'Resume Maker',         sub: 'Build ATS-friendly resume free — no watermark',       href: '/tools/resume-maker',        color: 'hover:border-purple-400' }, // ✅
              { label: 'AI Content Detector',  sub: 'Check if text is AI-generated free',                  href: '/tools/ai-content-detector', color: 'hover:border-orange-400' }, // ✅
            ].map((tool) => (
              <Link key={tool.href} href={tool.href}
                className={`flex items-center justify-between p-5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 ${tool.color} rounded-2xl transition-colors group shadow-sm hover:shadow-md`}
                aria-label={`${tool.label} — ${tool.sub}`}
              >
                <div>
                  <p className="font-bold text-slate-900 dark:text-white text-sm">{tool.label}</p>
                  <p className="text-xs text-slate-500 mt-1">{tool.sub}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-primary transition-colors flex-shrink-0" aria-hidden="true" />
              </Link>
            ))}
          </div>
          {/* Blog links — all verified in sitemap */}
          <div className="mt-4 p-5 rounded-xl border bg-slate-50 dark:bg-slate-900 space-y-2">
            <p className="font-bold text-slate-900 dark:text-white text-sm">Related Reading</p>
            {[
              { href: '/blog/how-to-paraphrase-text',                   title: 'How to Paraphrase Text — Complete Guide'             }, // ✅
              { href: '/blog/how-to-make-resume-with-no-experience',    title: 'How to Make a Resume With No Experience'             }, // ✅
              { href: '/blog/free-online-tools-students-2026-no-login', title: 'Free Online Tools for Students 2026 — No Login'      }, // ✅
              { href: '/blog/zero-cost-freelancer-tools',               title: 'Zero-Cost Tools Every Freelancer Needs'              }, // ✅ (replaced broken blog link)
            ].map((post) => (
              <Link key={post.href} href={post.href} className="flex items-center gap-2 text-sm text-primary hover:underline" aria-label={post.title}>
                <ArrowRight className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />{post.title}
              </Link>
            ))}
          </div>
        </section>

      </article>
    </>
  );
}
