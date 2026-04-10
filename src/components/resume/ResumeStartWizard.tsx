"use client";

import { Plus, Sparkles, Upload, Linkedin, FileText, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ResumeStartWizardProps {
  onStartNew: () => void;
  onClose: () => void;
}

export default function ResumeStartWizard({
  onStartNew,
  onClose,
}: ResumeStartWizardProps) {
  return (
    // ✅ FIX: Removed fixed modal overlay — now inline, no page blocking
    <div className="max-w-2xl mx-auto px-4 py-12">

      {/* Header */}
      <div className="text-center mb-10 space-y-3">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-2">
          <FileText className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-3xl font-black text-slate-900 dark:text-white">
          Build Your Resume
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm max-w-md mx-auto">
          Free, no signup, no watermark. Choose how you want to get started.
        </p>
      </div>

      {/* Options */}
      <div className="space-y-3">

        {/* ✅ Primary — Create new */}
        <button
          onClick={onStartNew}
          className="w-full flex items-center justify-between rounded-2xl border-2 border-primary bg-primary/5 hover:bg-primary/10 px-5 py-4 transition-all group"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
              <Plus className="w-5 h-5" />
            </div>
            <div className="text-left">
              <p className="font-black text-slate-900 dark:text-white text-sm">Start from scratch</p>
              <p className="text-xs text-slate-500">Choose a template and fill in your details</p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
        </button>

        {/* Coming soon options */}
        {[
          { icon: <Sparkles className="w-5 h-5" />, title: "Create with AI assistance", sub: "Auto-fill sections from job description" },
          { icon: <Upload className="w-5 h-5" />, title: "Upload existing resume", sub: "Improve and reformat your current CV" },
          { icon: <Linkedin className="w-5 h-5" />, title: "Import from LinkedIn", sub: "Auto-populate from your LinkedIn profile" },
          { icon: <FileText className="w-5 h-5" />, title: "Start from example", sub: "Use a pre-filled resume as your base" },
        ].map((item) => (
          <div
            key={item.title}
            className="w-full flex items-center justify-between rounded-2xl border border-slate-200 dark:border-slate-700 px-5 py-4 opacity-60 cursor-not-allowed bg-slate-50 dark:bg-slate-900"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 flex-shrink-0">
                {item.icon}
              </div>
              <div className="text-left">
                <p className="font-bold text-slate-600 dark:text-slate-400 text-sm">{item.title}</p>
                <p className="text-xs text-slate-400">{item.sub}</p>
              </div>
            </div>
            <span className="text-[10px] font-black px-2 py-1 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-500 flex-shrink-0">
              COMING SOON
            </span>
          </div>
        ))}
      </div>

      {/* Trust indicators */}
      <div className="mt-8 flex flex-wrap justify-center gap-4 text-xs text-slate-400 font-medium">
        {[
          "✅ 100% Free",
          "✅ No Signup Required",
          "✅ No Watermark",
          "✅ ATS Optimized",
          "✅ Private — No Upload",
        ].map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>

    </div>
  );
}
