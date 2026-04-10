"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

type TemplateCategory = "all" | "ats" | "fresher" | "classic" | "modern" | "creative";

interface Template {
  id: string;
  name: string;
  tag: string;
  tagColor: string;
  categories: TemplateCategory[];
  bestFor: string;
  atsScore: number;
  preview: React.ReactNode;
}

// ✅ Visual SVG previews for each template
function ClassicPreview() {
  return (
    <svg viewBox="0 0 160 200" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      {/* Header */}
      <rect x="0" y="0" width="160" height="50" fill="#1e293b" />
      <rect x="12" y="12" width="70" height="8" rx="2" fill="white" opacity="0.9" />
      <rect x="12" y="24" width="45" height="5" rx="1" fill="#94a3b8" />
      <rect x="12" y="33" width="100" height="4" rx="1" fill="#64748b" />
      {/* Section 1 */}
      <rect x="12" y="58" width="40" height="4" rx="1" fill="#334155" />
      <rect x="12" y="66" width="136" height="3" rx="1" fill="#e2e8f0" />
      <rect x="12" y="72" width="136" height="3" rx="1" fill="#e2e8f0" />
      <rect x="12" y="78" width="90" height="3" rx="1" fill="#e2e8f0" />
      {/* Section 2 */}
      <rect x="12" y="90" width="50" height="4" rx="1" fill="#334155" />
      <rect x="12" y="98" width="110" height="3" rx="1" fill="#e2e8f0" />
      <rect x="12" y="104" width="136" height="3" rx="1" fill="#e2e8f0" />
      <rect x="12" y="110" width="80" height="3" rx="1" fill="#e2e8f0" />
      {/* Skills */}
      <rect x="12" y="122" width="35" height="4" rx="1" fill="#334155" />
      <rect x="12" y="130" width="30" height="12" rx="3" fill="#dbeafe" />
      <rect x="46" y="130" width="28" height="12" rx="3" fill="#dbeafe" />
      <rect x="78" y="130" width="35" height="12" rx="3" fill="#dbeafe" />
      <rect x="12" y="146" width="32" height="12" rx="3" fill="#dbeafe" />
      <rect x="48" y="146" width="40" height="12" rx="3" fill="#dbeafe" />
    </svg>
  );
}

function ModernPreview() {
  return (
    <svg viewBox="0 0 160 200" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      {/* Left sidebar */}
      <rect x="0" y="0" width="52" height="200" fill="#1e40af" />
      <circle cx="26" cy="30" r="16" fill="#3b82f6" />
      <rect x="8" y="50" width="36" height="5" rx="2" fill="white" opacity="0.9" />
      <rect x="10" y="60" width="32" height="3" rx="1" fill="#93c5fd" />
      <rect x="10" y="67" width="32" height="3" rx="1" fill="#93c5fd" />
      <rect x="8" y="80" width="20" height="4" rx="1" fill="white" opacity="0.7" />
      <rect x="8" y="88" width="36" height="3" rx="1" fill="#bfdbfe" />
      <rect x="8" y="94" width="30" height="3" rx="1" fill="#bfdbfe" />
      <rect x="8" y="100" width="34" height="3" rx="1" fill="#bfdbfe" />
      <rect x="8" y="112" width="22" height="4" rx="1" fill="white" opacity="0.7" />
      <rect x="8" y="120" width="36" height="6" rx="3" fill="#3b82f6" />
      <rect x="8" y="130" width="28" height="6" rx="3" fill="#3b82f6" />
      <rect x="8" y="140" width="34" height="6" rx="3" fill="#3b82f6" />
      {/* Right content */}
      <rect x="60" y="12" width="60" height="7" rx="2" fill="#1e293b" />
      <rect x="60" y="23" width="40" height="4" rx="1" fill="#3b82f6" />
      <rect x="60" y="38" width="30" height="4" rx="1" fill="#334155" />
      <rect x="60" y="46" width="90" height="3" rx="1" fill="#94a3b8" />
      <rect x="60" y="52" width="85" height="3" rx="1" fill="#94a3b8" />
      <rect x="60" y="68" width="35" height="4" rx="1" fill="#334155" />
      <rect x="60" y="76" width="90" height="3" rx="1" fill="#94a3b8" />
      <rect x="60" y="82" width="78" height="3" rx="1" fill="#94a3b8" />
      <rect x="60" y="88" width="82" height="3" rx="1" fill="#94a3b8" />
      <rect x="60" y="100" width="38" height="4" rx="1" fill="#334155" />
      <rect x="60" y="108" width="90" height="3" rx="1" fill="#94a3b8" />
      <rect x="60" y="114" width="65" height="3" rx="1" fill="#94a3b8" />
    </svg>
  );
}

function MinimalPreview() {
  return (
    <svg viewBox="0 0 160 200" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="160" height="200" fill="#fafafa" />
      <rect x="16" y="16" width="80" height="9" rx="2" fill="#0f172a" />
      <rect x="16" y="28" width="50" height="5" rx="1" fill="#64748b" />
      <rect x="16" y="36" width="128" height="2" rx="1" fill="#e2e8f0" />
      <rect x="16" y="42" width="120" height="3" rx="1" fill="#94a3b8" />
      <rect x="16" y="48" width="100" height="3" rx="1" fill="#94a3b8" />
      <rect x="16" y="60" width="38" height="4" rx="1" fill="#0f172a" />
      <rect x="16" y="68" width="128" height="2" rx="1" fill="#e2e8f0" />
      <rect x="16" y="73" width="90" height="3" rx="1" fill="#94a3b8" />
      <rect x="16" y="79" width="110" height="3" rx="1" fill="#94a3b8" />
      <rect x="16" y="85" width="70" height="3" rx="1" fill="#94a3b8" />
      <rect x="16" y="96" width="42" height="4" rx="1" fill="#0f172a" />
      <rect x="16" y="104" width="128" height="2" rx="1" fill="#e2e8f0" />
      <rect x="16" y="109" width="100" height="3" rx="1" fill="#94a3b8" />
      <rect x="16" y="115" width="80" height="3" rx="1" fill="#94a3b8" />
      <rect x="16" y="126" width="30" height="4" rx="1" fill="#0f172a" />
      <rect x="16" y="134" width="25" height="8" rx="2" fill="#f1f5f9" />
      <rect x="44" y="134" width="30" height="8" rx="2" fill="#f1f5f9" />
      <rect x="77" y="134" width="25" height="8" rx="2" fill="#f1f5f9" />
      <rect x="105" y="134" width="35" height="8" rx="2" fill="#f1f5f9" />
    </svg>
  );
}

function ExecutivePreview() {
  return (
    <svg viewBox="0 0 160 200" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      {/* Gold accent top bar */}
      <rect x="0" y="0" width="160" height="6" fill="#b45309" />
      <rect x="0" y="6" width="160" height="50" fill="#1c1917" />
      <rect x="12" y="14" width="75" height="9" rx="2" fill="white" />
      <rect x="12" y="26" width="50" height="5" rx="1" fill="#d97706" />
      <rect x="12" y="35" width="100" height="3" rx="1" fill="#78716c" />
      {/* Divider */}
      <rect x="12" y="64" width="136" height="1" fill="#d97706" />
      {/* Summary */}
      <rect x="12" y="70" width="40" height="4" rx="1" fill="#1c1917" />
      <rect x="12" y="78" width="136" height="3" rx="1" fill="#78716c" />
      <rect x="12" y="84" width="120" height="3" rx="1" fill="#78716c" />
      {/* Experience */}
      <rect x="12" y="95" width="50" height="1" fill="#d97706" />
      <rect x="12" y="100" width="45" height="4" rx="1" fill="#1c1917" />
      <rect x="12" y="108" width="90" height="3" rx="1" fill="#78716c" />
      <rect x="12" y="114" width="136" height="3" rx="1" fill="#d4d4d8" />
      <rect x="12" y="120" width="110" height="3" rx="1" fill="#d4d4d8" />
      {/* Education */}
      <rect x="12" y="132" width="50" height="1" fill="#d97706" />
      <rect x="12" y="137" width="45" height="4" rx="1" fill="#1c1917" />
      <rect x="12" y="145" width="100" height="3" rx="1" fill="#78716c" />
      {/* Skills */}
      <rect x="12" y="157" width="28" height="10" rx="2" fill="#292524" />
      <rect x="44" y="157" width="35" height="10" rx="2" fill="#292524" />
      <rect x="83" y="157" width="25" height="10" rx="2" fill="#292524" />
    </svg>
  );
}

const templates: Template[] = [
  {
    id: "classic",
    name: "Classic ATS",
    tag: "Most Popular",
    tagColor: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
    categories: ["all", "ats", "classic"],
    bestFor: "Corporate, Finance, Engineering, Legal",
    atsScore: 100,
    preview: <ClassicPreview />,
  },
  {
    id: "modern",
    name: "Modern",
    tag: "Best for Design/Tech",
    tagColor: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300",
    categories: ["all", "modern", "creative"],
    bestFor: "Design, Marketing, Startups, Tech",
    atsScore: 78,
    preview: <ModernPreview />,
  },
  {
    id: "minimal",
    name: "Minimal",
    tag: "Clean & Simple",
    tagColor: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
    categories: ["all", "ats", "fresher", "classic"],
    bestFor: "Freshers, Students, Entry-level",
    atsScore: 95,
    preview: <MinimalPreview />,
  },
  {
    id: "executive",
    name: "Executive",
    tag: "Senior Level",
    tagColor: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
    categories: ["all", "modern", "classic"],
    bestFor: "Senior roles, Management, C-suite",
    atsScore: 88,
    preview: <ExecutivePreview />,
  },
];

const FILTERS: { value: TemplateCategory; label: string }[] = [
  { value: "all", label: "All Templates" },
  { value: "ats", label: "✅ ATS Friendly" },
  { value: "fresher", label: "🎓 Fresher / Student" },
  { value: "classic", label: "💼 Classic" },
  { value: "modern", label: "✨ Modern" },
  { value: "creative", label: "🎨 Creative" },
];

export default function TemplateSelector({
  onSelect,
}: {
  onSelect: (templateId: string) => void;
}) {
  const [activeFilter, setActiveFilter] = useState<TemplateCategory>("all");
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const filtered =
    activeFilter === "all"
      ? templates
      : templates.filter((t) => t.categories.includes(activeFilter));

  return (
    <div className="space-y-8 max-w-4xl mx-auto px-4 py-6">

      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-black text-slate-900 dark:text-white">
          Choose Your Resume Template
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm max-w-xl mx-auto">
          All templates are free. ATS score shown for each — higher is better for automated hiring systems.
        </p>
      </div>

      {/* Filter pills */}
      <div className="flex flex-wrap gap-2 justify-center">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setActiveFilter(f.value)}
            className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all border ${
              activeFilter === f.value
                ? "bg-primary text-white border-primary shadow-md"
                : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-primary/50"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Template grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {filtered.map((t) => (
          <div
            key={t.id}
            className={`group relative rounded-2xl border-2 overflow-hidden transition-all cursor-pointer ${
              hoveredId === t.id
                ? "border-primary shadow-xl shadow-primary/10 -translate-y-1"
                : "border-slate-200 dark:border-slate-700 hover:border-primary/50"
            }`}
            onMouseEnter={() => setHoveredId(t.id)}
            onMouseLeave={() => setHoveredId(null)}
            onClick={() => onSelect(t.id)}
          >
            {/* Template Preview */}
            <div className="h-48 bg-white dark:bg-slate-50 flex items-center justify-center p-3">
              {t.preview}
            </div>

            {/* Info */}
            <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 space-y-3">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-black text-slate-900 dark:text-white text-sm">{t.name}</h3>
                <span className={`text-[10px] font-black px-2 py-0.5 rounded-full flex-shrink-0 ${t.tagColor}`}>
                  {t.tag}
                </span>
              </div>

              <p className="text-xs text-slate-500">{t.bestFor}</p>

              {/* ATS Score bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] font-bold text-slate-400">
                  <span>ATS Score</span>
                  <span className={t.atsScore >= 90 ? "text-green-500" : t.atsScore >= 75 ? "text-blue-500" : "text-orange-500"}>
                    {t.atsScore}%
                  </span>
                </div>
                <div className="h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${t.atsScore >= 90 ? "bg-green-500" : t.atsScore >= 75 ? "bg-blue-500" : "bg-orange-500"}`}
                    style={{ width: `${t.atsScore}%` }}
                  />
                </div>
              </div>

              <Button
                size="sm"
                className="w-full rounded-xl font-bold text-xs h-8"
                onClick={(e) => { e.stopPropagation(); onSelect(t.id); }}
              >
                {hoveredId === t.id ? (
                  <><CheckCircle className="w-3 h-3 mr-1" /> Use Template</>
                ) : (
                  "Use Template"
                )}
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Country note */}
      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl text-center">
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          🇺🇸 <strong>USA/Canada:</strong> Use Classic ATS for corporate roles ·
          🇬🇧 <strong>UK/Australia:</strong> Classic or Minimal — no photo required ·
          🇮🇳 <strong>India:</strong> Minimal for freshers, Classic for experienced ·
          🌍 <strong>All templates</strong> are internationally accepted
        </p>
      </div>

    </div>
  );
}
