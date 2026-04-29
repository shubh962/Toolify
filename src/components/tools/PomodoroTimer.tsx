"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import {
  Play, Pause, RotateCcw, SkipForward, Plus, Trash2,
  CheckCircle, Settings, X, Volume2, VolumeX, ArrowRight,
} from "lucide-react";

/* ── Types ───────────────────────────────────────────────────── */
type Mode = "pomodoro" | "shortBreak" | "longBreak";

interface Task {
  id: string;
  text: string;
  done: boolean;
  pomodoros: number;
}

interface TimerSettings {
  pomodoro: number;
  shortBreak: number;
  longBreak: number;
  longBreakInterval: number;
  autoStartBreaks: boolean;
  autoStartPomodoros: boolean;
  soundEnabled: boolean;
}

/* ── FAQ Schema ──────────────────────────────────────────────── */
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the Pomodoro Technique?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Pomodoro Technique is a time management method developed by Francesco Cirillo. You work for 25 minutes (one Pomodoro), then take a 5-minute short break. After 4 Pomodoros, you take a longer 15–30 minute break. This cycle helps maintain focus and prevent burnout.",
      },
    },
    {
      "@type": "Question",
      name: "How long should a Pomodoro session be?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The classic Pomodoro session is 25 minutes of focused work followed by a 5-minute break. However, you can customize the duration. Some people prefer 50-minute sessions with 10-minute breaks for deep work tasks.",
      },
    },
    {
      "@type": "Question",
      name: "How many Pomodoros should I do per day?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most productivity experts recommend 8–12 Pomodoros per day for knowledge workers. Beginners should start with 4–6. Quality of focus matters more than quantity — it's better to complete 6 focused Pomodoros than 12 distracted ones.",
      },
    },
    {
      "@type": "Question",
      name: "Can I customize the Pomodoro timer duration?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. TaskGuru's Pomodoro timer lets you customize work session length, short break, and long break durations. You can also set how many sessions before a long break and toggle auto-start for breaks and sessions.",
      },
    },
    {
      "@type": "Question",
      name: "Does this Pomodoro timer work without installation?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — it runs entirely in your browser. No app download, no sign-up, no installation needed. Just open the page and start your first Pomodoro session immediately.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between short break and long break in Pomodoro?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A short break (5 minutes) comes after every Pomodoro session and is meant for quick rest — stretch, grab water, rest your eyes. A long break (15–30 minutes) comes after completing 4 Pomodoros and allows deeper recovery before the next focus cycle.",
      },
    },
    {
      "@type": "Question",
      name: "Is the Pomodoro Technique effective for studying?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The Pomodoro Technique is one of the most studied and proven methods for student productivity. The built-in breaks prevent mental fatigue, the time pressure reduces procrastination, and the session tracking gives a clear sense of progress.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use this timer for tasks other than studying?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely. The Pomodoro timer works for any focused work — coding, writing, design, reading, email processing, creative projects, or any task that benefits from structured focus intervals.",
      },
    },
  ],
};

/* ── Constants ───────────────────────────────────────────────── */
const DEFAULT_SETTINGS: TimerSettings = {
  pomodoro: 25,
  shortBreak: 5,
  longBreak: 15,
  longBreakInterval: 4,
  autoStartBreaks: false,
  autoStartPomodoros: false,
  soundEnabled: true,
};

const MODE_LABELS: Record<Mode, string> = {
  pomodoro: "Focus",
  shortBreak: "Short Break",
  longBreak: "Long Break",
};

const MODE_COLORS: Record<Mode, string> = {
  pomodoro: "text-red-500",
  shortBreak: "text-green-500",
  longBreak: "text-blue-500",
};

const MODE_BG: Record<Mode, string> = {
  pomodoro: "bg-red-500",
  shortBreak: "bg-green-500",
  longBreak: "bg-blue-500",
};

const RELATED_TOOLS = [
  { href: "/tools/typing-speed-test", label: "Typing Speed Test", desc: "Measure your WPM while you work" },
  { href: "/tools/word-counter", label: "Word Counter", desc: "Track writing progress per session" },
  { href: "/tools/grammar-checker", label: "Grammar Checker", desc: "Polish your writing after focus sessions" },
  { href: "/tools/text-paraphraser", label: "Text Paraphraser", desc: "Rewrite content during break time" },
  { href: "/tools/resume-maker", label: "Resume Maker", desc: "Build your resume with focused Pomodoro sessions" },
  { href: "/blog/free-online-tools-students-2026-no-login", label: "Free Tools for Students 2026", desc: "Every tool a student needs — no login" },
];

/* ── Sound Generator ─────────────────────────────────────────── */
function playBeep(ctx: AudioContext, type: "work" | "break") {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.frequency.value = type === "work" ? 880 : 440;
  osc.type = "sine";
  gain.gain.setValueAtTime(0.5, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.8);
}

/* ── SVG Progress Ring ───────────────────────────────────────── */
function ProgressRing({
  progress, mode, children,
}: {
  progress: number;
  mode: Mode;
  children: React.ReactNode;
}) {
  const radius = 110;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - progress * circumference;

  const strokeColor =
    mode === "pomodoro" ? "#ef4444" :
    mode === "shortBreak" ? "#22c55e" : "#3b82f6";

  return (
    <div className="relative flex items-center justify-center">
      <svg width="260" height="260" className="-rotate-90">
        <circle cx="130" cy="130" r={radius}
          fill="none" stroke="currentColor"
          strokeWidth="8"
          className="text-muted/20"
        />
        <circle cx="130" cy="130" r={radius}
          fill="none" stroke={strokeColor}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-1000 ease-linear"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}

/* ── Main Component ──────────────────────────────────────────── */
export default function PomodoroTimer() {
  const [settings, setSettings] = useState<TimerSettings>(DEFAULT_SETTINGS);
  const [tempSettings, setTempSettings] = useState<TimerSettings>(DEFAULT_SETTINGS);
  const [mode, setMode] = useState<Mode>("pomodoro");
  const [timeLeft, setTimeLeft] = useState(DEFAULT_SETTINGS.pomodoro * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [sessions, setSessions] = useState(0);
  const [totalToday, setTotalToday] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const [activeTask, setActiveTask] = useState<string | null>(null);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const { toast } = useToast();

  /* total seconds for current mode */
  const totalSeconds = settings[
    mode === "pomodoro" ? "pomodoro" :
    mode === "shortBreak" ? "shortBreak" : "longBreak"
  ] * 60;

  const progress = 1 - timeLeft / totalSeconds;

  /* ── Timer tick ──────────────────────────────────────────── */
  const tick = useCallback(() => {
    setTimeLeft((prev) => {
      if (prev <= 1) {
        handleComplete();
        return 0;
      }
      return prev - 1;
    });
  }, [mode, sessions, settings]);

  const handleComplete = useCallback(() => {
    setIsRunning(false);
    if (intervalRef.current) clearInterval(intervalRef.current);

    if (settings.soundEnabled) {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioContext();
      }
      playBeep(audioCtxRef.current, mode === "pomodoro" ? "break" : "work");
    }

    if (mode === "pomodoro") {
      const newSessions = sessions + 1;
      setSessions(newSessions);
      setTotalToday((t) => t + 1);

      if (activeTask) {
        setTasks((prev) =>
          prev.map((t) =>
            t.id === activeTask ? { ...t, pomodoros: t.pomodoros + 1 } : t
          )
        );
      }

      const isLongBreak = newSessions % settings.longBreakInterval === 0;
      const nextMode: Mode = isLongBreak ? "longBreak" : "shortBreak";

      toast({
        title: "🍅 Pomodoro complete!",
        description: isLongBreak
          ? `Great work! Take a ${settings.longBreak}-minute long break.`
          : `Nice! Take a ${settings.shortBreak}-minute break.`,
      });

      setMode(nextMode);
      setTimeLeft(settings[isLongBreak ? "longBreak" : "shortBreak"] * 60);

      if (settings.autoStartBreaks) {
        setTimeout(() => setIsRunning(true), 500);
      }
    } else {
      toast({
        title: "☕ Break over!",
        description: "Ready for your next focus session?",
      });
      setMode("pomodoro");
      setTimeLeft(settings.pomodoro * 60);
      if (settings.autoStartPomodoros) {
        setTimeout(() => setIsRunning(true), 500);
      }
    }
  }, [mode, sessions, settings, activeTask]);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(tick, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, tick]);

  /* ── Update document title ───────────────────────────────── */
  useEffect(() => {
    const mm = String(Math.floor(timeLeft / 60)).padStart(2, "0");
    const ss = String(timeLeft % 60).padStart(2, "0");
    document.title = isRunning
      ? `${mm}:${ss} — ${MODE_LABELS[mode]} | TaskGuru`
      : "Pomodoro Timer | TaskGuru";
    return () => { document.title = "TaskGuru"; };
  }, [timeLeft, isRunning, mode]);

  /* ── Mode switch ─────────────────────────────────────────── */
  const switchMode = (m: Mode) => {
    setMode(m);
    setIsRunning(false);
    setTimeLeft(
      settings[m === "pomodoro" ? "pomodoro" :
      m === "shortBreak" ? "shortBreak" : "longBreak"] * 60
    );
  };

  /* ── Reset ───────────────────────────────────────────────── */
  const reset = () => {
    setIsRunning(false);
    setTimeLeft(totalSeconds);
  };

  /* ── Skip ────────────────────────────────────────────────── */
  const skip = () => handleComplete();

  /* ── Settings save ───────────────────────────────────────── */
  const saveSettings = () => {
    setSettings(tempSettings);
    setTimeLeft(
      tempSettings[mode === "pomodoro" ? "pomodoro" :
      mode === "shortBreak" ? "shortBreak" : "longBreak"] * 60
    );
    setIsRunning(false);
    setShowSettings(false);
    toast({ title: "Settings saved!" });
  };

  /* ── Task management ─────────────────────────────────────── */
  const addTask = () => {
    if (!newTask.trim()) return;
    const task: Task = {
      id: Date.now().toString(),
      text: newTask.trim(),
      done: false,
      pomodoros: 0,
    };
    setTasks((prev) => [...prev, task]);
    setNewTask("");
  };

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    if (activeTask === id) setActiveTask(null);
  };

  /* ── Format time ─────────────────────────────────────────── */
  const formatTime = (secs: number) => {
    const m = String(Math.floor(secs / 60)).padStart(2, "0");
    const s = String(secs % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  /* ── Keyboard shortcuts ──────────────────────────────────── */
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) return;
      if (e.code === "Space") {
        e.preventDefault();
        setIsRunning((r) => !r);
      }
      if (e.code === "KeyR") reset();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [totalSeconds]);

  /* ── Render ──────────────────────────────────────────────── */
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="space-y-8">

        {/* ── Mode Tabs ──────────────────────────────────────── */}
        <div className="flex justify-center gap-2 flex-wrap">
          {(["pomodoro", "shortBreak", "longBreak"] as Mode[]).map((m) => (
            <button
              key={m}
              onClick={() => switchMode(m)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                mode === m
                  ? `${MODE_BG[m]} text-white shadow-md`
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {MODE_LABELS[m]}
            </button>
          ))}
        </div>

        {/* ── Timer Card ─────────────────────────────────────── */}
        <div className="rounded-2xl border bg-card p-6 space-y-6">

          {/* Active task label */}
          {activeTask && (
            <div className="text-center">
              <Badge variant="outline" className="text-xs gap-1">
                🍅 {tasks.find((t) => t.id === activeTask)?.text ?? "Task"}
              </Badge>
            </div>
          )}

          {/* Ring + Time */}
          <div className="flex justify-center">
            <ProgressRing progress={progress} mode={mode}>
              <div className="text-center space-y-1">
                <p className={`text-6xl font-bold tabular-nums tracking-tight ${MODE_COLORS[mode]}`}>
                  {formatTime(timeLeft)}
                </p>
                <p className="text-sm text-muted-foreground font-medium">
                  {MODE_LABELS[mode]}
                </p>
                <p className="text-xs text-muted-foreground">
                  Session {sessions % settings.longBreakInterval + 1} of {settings.longBreakInterval}
                </p>
              </div>
            </ProgressRing>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={reset}
              className="p-2.5 rounded-full hover:bg-muted transition-colors text-muted-foreground"
              title="Reset (R)"
            >
              <RotateCcw className="w-5 h-5" />
            </button>

            <Button
              onClick={() => setIsRunning((r) => !r)}
              size="lg"
              className={`w-36 gap-2 text-base font-bold rounded-full ${
                mode === "pomodoro" ? "bg-red-500 hover:bg-red-600" :
                mode === "shortBreak" ? "bg-green-500 hover:bg-green-600" :
                "bg-blue-500 hover:bg-blue-600"
              } text-white`}
            >
              {isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              {isRunning ? "Pause" : "Start"}
            </Button>

            <button
              onClick={skip}
              className="p-2.5 rounded-full hover:bg-muted transition-colors text-muted-foreground"
              title="Skip"
            >
              <SkipForward className="w-5 h-5" />
            </button>
          </div>

          {/* Keyboard shortcut hint */}
          <p className="text-center text-xs text-muted-foreground">
            Press <kbd className="px-1.5 py-0.5 rounded border bg-muted text-xs font-mono">Space</kbd> to start/pause
          </p>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-3 pt-2 border-t">
            {[
              { label: "Today", value: totalToday },
              { label: "This Cycle", value: sessions % settings.longBreakInterval || (sessions > 0 ? settings.longBreakInterval : 0) },
              { label: "Total", value: sessions },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Settings Panel ─────────────────────────────────── */}
        <div className="rounded-xl border bg-card overflow-hidden">
          <button
            onClick={() => {
              setTempSettings(settings);
              setShowSettings((s) => !s);
            }}
            className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-center gap-2 font-semibold text-sm">
              <Settings className="w-4 h-4" />
              Timer Settings
            </div>
            <X className={`w-4 h-4 text-muted-foreground transition-transform ${showSettings ? "" : "rotate-45"}`} />
          </button>

          {showSettings && (
            <div className="p-4 border-t space-y-5">
              {/* Duration inputs */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { key: "pomodoro" as keyof TimerSettings, label: "Focus (min)" },
                  { key: "shortBreak" as keyof TimerSettings, label: "Short Break" },
                  { key: "longBreak" as keyof TimerSettings, label: "Long Break" },
                ].map(({ key, label }) => (
                  <div key={key} className="space-y-1">
                    <label className="text-xs text-muted-foreground font-medium">
                      {label}
                    </label>
                    <Input
                      type="number"
                      min={1}
                      max={90}
                      value={tempSettings[key] as number}
                      onChange={(e) =>
                        setTempSettings((s) => ({
                          ...s,
                          [key]: Math.max(1, parseInt(e.target.value) || 1),
                        }))
                      }
                      className="text-center font-semibold"
                    />
                  </div>
                ))}
              </div>

              {/* Long break interval */}
              <div className="space-y-1">
                <label className="text-xs text-muted-foreground font-medium">
                  Long break after (sessions)
                </label>
                <Input
                  type="number"
                  min={1}
                  max={10}
                  value={tempSettings.longBreakInterval}
                  onChange={(e) =>
                    setTempSettings((s) => ({
                      ...s,
                      longBreakInterval: Math.max(1, parseInt(e.target.value) || 4),
                    }))
                  }
                  className="w-24 text-center font-semibold"
                />
              </div>

              {/* Toggles */}
              <div className="space-y-3">
                {[
                  { key: "autoStartBreaks" as keyof TimerSettings, label: "Auto-start breaks" },
                  { key: "autoStartPomodoros" as keyof TimerSettings, label: "Auto-start focus sessions" },
                  { key: "soundEnabled" as keyof TimerSettings, label: "Sound notifications" },
                ].map(({ key, label }) => (
                  <div key={key} className="flex items-center justify-between">
                    <span className="text-sm">{label}</span>
                    <button
                      onClick={() =>
                        setTempSettings((s) => ({ ...s, [key]: !s[key] }))
                      }
                      className={`w-10 h-5 rounded-full transition-colors relative ${
                        tempSettings[key] ? "bg-primary" : "bg-muted"
                      }`}
                    >
                      <span
                        className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${
                          tempSettings[key] ? "translate-x-5" : "translate-x-0.5"
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>

              <Button onClick={saveSettings} className="w-full">
                Save Settings
              </Button>
            </div>
          )}
        </div>

        {/* ── Task Manager ───────────────────────────────────── */}
        <div className="rounded-xl border bg-card p-4 space-y-4">
          <h2 className="font-semibold text-sm flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-primary" />
            Task List — Track Your Focus Sessions
          </h2>

          {/* Add task */}
          <div className="flex gap-2">
            <Input
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addTask()}
              placeholder="What are you working on?"
              className="flex-1"
            />
            <Button onClick={addTask} size="icon" variant="outline">
              <Plus className="w-4 h-4" />
            </Button>
          </div>

          {/* Task list */}
          {tasks.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              Add a task to track your Pomodoros
            </p>
          ) : (
            <div className="space-y-2">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => setActiveTask(activeTask === task.id ? null : task.id)}
                  className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                    activeTask === task.id
                      ? "border-primary bg-primary/5"
                      : "hover:bg-muted/50"
                  }`}
                >
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleTask(task.id); }}
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                      task.done ? "border-green-500 bg-green-500" : "border-muted-foreground"
                    }`}
                  >
                    {task.done && <CheckCircle className="w-3 h-3 text-white" />}
                  </button>

                  <span className={`flex-1 text-sm ${task.done ? "line-through text-muted-foreground" : ""}`}>
                    {task.text}
                  </span>

                  {task.pomodoros > 0 && (
                    <span className="text-xs text-muted-foreground">
                      🍅 {task.pomodoros}
                    </span>
                  )}

                  <button
                    onClick={(e) => { e.stopPropagation(); deleteTask(task.id); }}
                    className="text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── SEO Content ────────────────────────────────────── */}
        <div className="rounded-xl border bg-muted/30 p-6 space-y-6 text-sm leading-relaxed text-muted-foreground">

          <div className="space-y-2">
            <h2 className="text-lg font-bold text-foreground">
              Free Pomodoro Timer — Stay Focused, Get More Done
            </h2>
            <p>
              The Pomodoro Technique is one of the most proven time management methods in the world. Developed by Francesco Cirillo in the late 1980s, it breaks your work into 25-minute focused sessions — called Pomodoros — separated by short breaks. The structure keeps your brain engaged, prevents burnout, and makes even the most overwhelming tasks feel manageable.
            </p>
            <p>
              This free online Pomodoro timer works directly in your browser — no download, no account, no setup. Start your first session in under 10 seconds.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-base font-bold text-foreground">
              How the Pomodoro Technique Works
            </h3>
            <div className="space-y-2">
              {[
                { step: "1", title: "Choose a task", desc: "Add it to the task list and set it as active" },
                { step: "2", title: "Work for 25 minutes", desc: "One focused Pomodoro — no distractions, no switching" },
                { step: "3", title: "Take a 5-minute break", desc: "Step away, stretch, breathe — fully rest your focus" },
                { step: "4", title: "Every 4 Pomodoros", desc: "Take a longer 15–30 minute break to fully recover" },
              ].map((item) => (
                <div key={item.step} className="flex gap-3 items-start">
                  <span className="w-6 h-6 rounded-full bg-primary/10 text-primary font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {item.step}
                  </span>
                  <div>
                    <span className="font-semibold text-foreground">{item.title} — </span>
                    {item.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-base font-bold text-foreground">
              Why Pomodoro Works — The Science
            </h3>
            <p>
              Our brains aren&apos;t designed for hours of unbroken concentration. Attention naturally degrades after 20–30 minutes of sustained focus. The Pomodoro Technique works with this biology rather than against it — the 25-minute sessions fit the natural focus window, and the breaks allow the brain to consolidate what it just processed.
            </p>
            <p>
              Research on the technique consistently shows improvements in focus quality, reduced procrastination, and better task estimation. The time pressure of a ticking timer also activates a mild form of urgency that reduces distraction.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-base font-bold text-foreground">
              Pomodoro Timer Features — Everything You Need
            </h3>
            <div className="grid sm:grid-cols-2 gap-2">
              {[
                "25/5/15 default Pomodoro intervals",
                "Fully customizable session lengths",
                "Visual circular progress ring",
                "Audio notification on completion",
                "Auto-start breaks and sessions",
                "Built-in task list with session tracking",
                "Pomodoro count per task",
                "Session statistics — daily and total",
                "Keyboard shortcut — Space to start/pause",
                "Browser tab countdown display",
                "Long break interval control",
                "No account, no install, completely free",
              ].map((feature) => (
                <div key={feature} className="flex items-start gap-2 text-xs">
                  <CheckCircle className="w-3.5 h-3.5 text-green-500 mt-0.5 shrink-0" />
                  {feature}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-base font-bold text-foreground">
              Who Uses the Pomodoro Timer
            </h3>
            <p>
              <strong className="text-foreground">Students</strong> use it for exam preparation, essay writing, and revision sessions — the structured breaks prevent the kind of mental exhaustion that makes studying ineffective after a few hours.
            </p>
            <p>
              <strong className="text-foreground">Developers and designers</strong> use it to maintain deep focus during complex coding or creative tasks, using break times to step back and evaluate their work from a fresh perspective.
            </p>
            <p>
              <strong className="text-foreground">Writers and content creators</strong> use it to hit word count targets without burning out — a 25-minute writing sprint is far more productive than an unfocused two-hour session.
            </p>
            <p>
              <strong className="text-foreground">Remote workers</strong> use it to create structure in environments with no natural work/break boundaries, preventing the blurred days that lead to both overwork and underperformance.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-base font-bold text-foreground">
              Tips to Get the Most from Your Pomodoro Sessions
            </h3>
            <ul className="space-y-1.5">
              {[
                "Write down your task before starting — vague goals produce vague sessions",
                "Close unnecessary tabs and silence your phone before starting",
                "During breaks, genuinely stop working — don't check Slack or email",
                "If a thought interrupts you, write it down and return to it later",
                "Track your Pomodoros per task to improve future time estimates",
                "Adjust session length if 25 minutes doesn't fit your work type — 50/10 works better for some",
              ].map((tip) => (
                <li key={tip} className="flex items-start gap-2">
                  <ArrowRight className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Related Tools ───────────────────────────────────── */}
        <div className="space-y-4">
          <h2 className="text-base font-semibold">
            Tools That Pair Well With Pomodoro
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {RELATED_TOOLS.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group rounded-xl border bg-card p-4 hover:border-primary hover:bg-primary/5 transition-all space-y-1"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold group-hover:text-primary transition-colors">
                    {tool.label}
                  </p>
                  <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <p className="text-xs text-muted-foreground">{tool.desc}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* ── FAQ ─────────────────────────────────────────────── */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqSchema.mainEntity.map((faq, i) => (
              <div key={i} className="rounded-xl border bg-card p-4">
                <h3 className="font-semibold text-sm mb-1">{faq.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {faq.acceptedAnswer.text}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </>
  );
            }
