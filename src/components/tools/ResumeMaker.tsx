"use client";

import { useState, useCallback } from "react";
import { jsPDF } from "jspdf";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Download, Mail, Phone, MapPin, Link as LinkIcon,
  Target, FileText, Zap, Award, Globe,
  BookOpen, Briefcase, Code, ChevronDown, Palette,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

/* ============================================================
   TYPES
============================================================ */
type ResumeData = {
  name: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  summary: string;
  experience: { role: string; company: string; duration: string; details: string }[];
  education: { degree: string; school: string; year: string }[];
  // ✅ FIX: skills as string[] only, controlled via skillsInput string
  skills: string[];
  projects: { name: string; tech: string; description: string; link: string }[];
  certifications: string;
  languages: string;
  awards: string;
};

const INITIAL_DATA: ResumeData = {
  name: "", jobTitle: "", email: "", phone: "",
  location: "", website: "", summary: "",
  experience: [], education: [],
  skills: [],
  projects: [],
  certifications: "", languages: "", awards: "",
};

/* ============================================================
   TEMPLATES
============================================================ */
const TEMPLATES = [
  { id: "classic", label: "Classic ATS", color: "bg-slate-900" },
  { id: "modern", label: "Modern", color: "bg-blue-700" },
  { id: "minimal", label: "Minimal", color: "bg-white border" },
  { id: "executive", label: "Executive", color: "bg-stone-900" },
];

/* ============================================================
   ATS SCORE
============================================================ */
const calcATS = (d: ResumeData) => {
  let s = 0;
  if (d.name) s += 8;
  if (d.email) s += 6;
  if (d.phone) s += 4;
  if (d.location) s += 4;
  if (d.jobTitle) s += 6;
  if (d.summary.length > 50) s += 12;
  if (d.experience.length > 0) s += 20;
  if (d.education.length > 0) s += 15;
  if (d.skills.length >= 5) s += 15;
  if (d.projects.length > 0) s += 5;
  if (d.certifications) s += 5;
  return Math.min(s, 100);
};

const lim = (t: string, n: number) => t.length > n ? t.slice(0, n) + "…" : t;

/* ============================================================
   RESUME PREVIEW COMPONENT
============================================================ */
function ResumePreview({ data, template }: { data: ResumeData; template: string }) {

  if (template === "modern") {
    return (
      <div id="resume-preview" className="bg-white text-slate-800 min-h-full font-sans flex flex-col text-[11px]">
        <header className="bg-blue-700 text-white px-8 py-6">
          <h1 className="text-2xl font-black">{data.name || "YOUR NAME"}</h1>
          {data.jobTitle && <p className="text-blue-200 font-semibold text-sm mt-0.5">{data.jobTitle}</p>}
          <div className="flex flex-wrap gap-3 mt-2 text-blue-100 text-[10px]">
            {data.email && <span><Mail size={8} className="inline mr-0.5" />{data.email}</span>}
            {data.phone && <span><Phone size={8} className="inline mr-0.5" />{data.phone}</span>}
            {data.location && <span><MapPin size={8} className="inline mr-0.5" />{data.location}</span>}
            {data.website && <span><LinkIcon size={8} className="inline mr-0.5" />{data.website}</span>}
          </div>
        </header>
        <div className="px-8 py-5 grid grid-cols-3 gap-6">
          <div className="col-span-2 space-y-4">
            {data.summary && <Section title="Summary"><p className="text-[10px] leading-relaxed">{lim(data.summary, 400)}</p></Section>}
            {data.experience.length > 0 && (
              <Section title="Experience">
                {data.experience.slice(0,5).map((e, i) => (
                  <div key={i} className="mb-3">
                    <div className="flex justify-between"><span className="font-bold text-[11px]">{e.role}</span><span className="text-[10px] text-slate-400">{e.duration}</span></div>
                    <p className="text-blue-600 text-[10px] font-semibold">{e.company}</p>
                    {e.details && <p className="text-[10px] text-slate-600 mt-1 leading-relaxed whitespace-pre-line">{lim(e.details, 250)}</p>}
                  </div>
                ))}
              </Section>
            )}
            {data.projects.length > 0 && (
              <Section title="Projects">
                {data.projects.slice(0,4).map((p, i) => (
                  <div key={i} className="mb-2">
                    <span className="font-bold text-[11px]">{p.name}</span>
                    {p.tech && <span className="ml-2 text-[9px] text-blue-500 font-semibold">[{p.tech}]</span>}
                    {p.description && <p className="text-[10px] text-slate-600 mt-0.5 leading-relaxed">{lim(p.description, 150)}</p>}
                  </div>
                ))}
              </Section>
            )}
            {data.education.length > 0 && (
              <Section title="Education">
                {data.education.slice(0,3).map((e, i) => (
                  <div key={i} className="flex justify-between mb-1">
                    <div><span className="font-bold text-[11px]">{e.degree}</span><span className="text-slate-500 text-[10px]"> — {e.school}</span></div>
                    <span className="text-[10px] text-slate-400">{e.year}</span>
                  </div>
                ))}
              </Section>
            )}
          </div>
          <div className="col-span-1 space-y-4 border-l pl-4">
            {data.skills.length > 0 && (
              <div>
                <h4 className="font-black text-[10px] uppercase text-slate-400 mb-2">Skills</h4>
                <div className="flex flex-wrap gap-1">{data.skills.slice(0,15).map((s,i)=><span key={i} className="bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded text-[9px] font-bold">{s}</span>)}</div>
              </div>
            )}
            {data.certifications && <div><h4 className="font-black text-[10px] uppercase text-slate-400 mb-1">Certifications</h4><p className="text-[10px] text-slate-600 whitespace-pre-line">{data.certifications}</p></div>}
            {data.languages && <div><h4 className="font-black text-[10px] uppercase text-slate-400 mb-1">Languages</h4><p className="text-[10px] text-slate-600">{data.languages}</p></div>}
            {data.awards && <div><h4 className="font-black text-[10px] uppercase text-slate-400 mb-1">Awards</h4><p className="text-[10px] text-slate-600 whitespace-pre-line">{data.awards}</p></div>}
          </div>
        </div>
      </div>
    );
  }

  if (template === "executive") {
    return (
      <div id="resume-preview" className="bg-white text-stone-800 min-h-full font-serif text-[11px]">
        <header className="bg-stone-900 text-white px-8 py-5 border-b-4 border-amber-500">
          <h1 className="text-2xl font-bold tracking-wide">{data.name || "YOUR NAME"}</h1>
          {data.jobTitle && <p className="text-amber-400 font-semibold text-sm mt-0.5">{data.jobTitle}</p>}
          <div className="flex flex-wrap gap-3 mt-2 text-stone-300 text-[10px]">
            {data.email && <span>{data.email}</span>}
            {data.phone && <span>{data.phone}</span>}
            {data.location && <span>{data.location}</span>}
          </div>
        </header>
        <div className="px-8 py-5 space-y-4">
          {data.summary && <ExecSection title="Executive Profile"><p className="text-[10px] leading-relaxed">{lim(data.summary, 400)}</p></ExecSection>}
          {data.experience.length > 0 && (
            <ExecSection title="Professional Experience">
              {data.experience.slice(0,5).map((e,i) => (
                <div key={i} className="mb-3">
                  <div className="flex justify-between"><span className="font-bold text-[11px]">{e.role}</span><span className="text-[10px] text-stone-500">{e.duration}</span></div>
                  <p className="text-amber-700 text-[10px] font-semibold italic">{e.company}</p>
                  {e.details && <p className="text-[10px] mt-1 leading-relaxed whitespace-pre-line text-stone-700">{lim(e.details, 250)}</p>}
                </div>
              ))}
            </ExecSection>
          )}
          <div className="grid grid-cols-2 gap-6">
            {data.education.length > 0 && (
              <ExecSection title="Education">
                {data.education.slice(0,3).map((e,i) => (
                  <div key={i} className="mb-2"><p className="font-bold text-[10px]">{e.degree}</p><p className="text-[10px] text-stone-500">{e.school} · {e.year}</p></div>
                ))}
              </ExecSection>
            )}
            {data.skills.length > 0 && (
              <ExecSection title="Core Competencies">
                <div className="flex flex-wrap gap-1">{data.skills.slice(0,12).map((s,i)=><span key={i} className="bg-stone-100 border border-stone-200 text-stone-700 px-2 py-0.5 rounded text-[9px] font-bold">{s}</span>)}</div>
              </ExecSection>
            )}
          </div>
          {data.certifications && <ExecSection title="Certifications"><p className="text-[10px] whitespace-pre-line text-stone-700">{data.certifications}</p></ExecSection>}
        </div>
      </div>
    );
  }

  if (template === "minimal") {
    return (
      <div id="resume-preview" className="bg-white text-slate-900 min-h-full font-sans px-10 py-8 text-[11px]">
        <div className="mb-6">
          <h1 className="text-2xl font-black text-slate-900">{data.name || "YOUR NAME"}</h1>
          {data.jobTitle && <p className="text-slate-500 text-sm">{data.jobTitle}</p>}
          <div className="flex flex-wrap gap-3 mt-1 text-slate-400 text-[10px]">
            {data.email && <span>{data.email}</span>}
            {data.phone && <span>{data.phone}</span>}
            {data.location && <span>{data.location}</span>}
            {data.website && <span>{data.website}</span>}
          </div>
        </div>
        {data.summary && <MinSection title="About"><p className="text-[10px] leading-relaxed text-slate-600">{lim(data.summary, 400)}</p></MinSection>}
        {data.experience.length > 0 && (
          <MinSection title="Experience">
            {data.experience.slice(0,5).map((e,i)=>(
              <div key={i} className="mb-3">
                <div className="flex justify-between"><span className="font-bold text-[11px]">{e.role}</span><span className="text-[10px] text-slate-400">{e.duration}</span></div>
                <p className="text-slate-500 text-[10px]">{e.company}</p>
                {e.details && <p className="text-[10px] text-slate-600 mt-0.5 leading-relaxed whitespace-pre-line">{lim(e.details, 200)}</p>}
              </div>
            ))}
          </MinSection>
        )}
        {data.projects.length > 0 && (
          <MinSection title="Projects">
            {data.projects.slice(0,4).map((p,i)=>(
              <div key={i} className="mb-2">
                <span className="font-bold text-[11px]">{p.name}</span>
                {p.tech && <span className="ml-1 text-[9px] text-slate-400">{p.tech}</span>}
                {p.description && <p className="text-[10px] text-slate-500 leading-relaxed">{lim(p.description, 120)}</p>}
              </div>
            ))}
          </MinSection>
        )}
        {data.education.length > 0 && (
          <MinSection title="Education">
            {data.education.slice(0,3).map((e,i)=>(
              <div key={i} className="flex justify-between mb-1 text-[10px]">
                <span><strong>{e.degree}</strong> — {e.school}</span>
                <span className="text-slate-400">{e.year}</span>
              </div>
            ))}
          </MinSection>
        )}
        {data.skills.length > 0 && (
          <MinSection title="Skills">
            <p className="text-[10px] text-slate-600">{data.skills.slice(0,15).join(" · ")}</p>
          </MinSection>
        )}
        {data.certifications && <MinSection title="Certifications"><p className="text-[10px] text-slate-600 whitespace-pre-line">{data.certifications}</p></MinSection>}
        {data.languages && <MinSection title="Languages"><p className="text-[10px] text-slate-600">{data.languages}</p></MinSection>}
      </div>
    );
  }

  // ✅ Classic ATS (default)
  return (
    <div id="resume-preview" className="bg-white text-black min-h-full font-serif px-8 py-8 text-[11px]">
      <header className="border-b-2 border-gray-800 pb-4 mb-5">
        <h1 className="text-2xl font-bold uppercase tracking-widest">{data.name || "YOUR NAME"}</h1>
        {data.jobTitle && <p className="text-sm font-semibold text-gray-600 mt-0.5">{data.jobTitle}</p>}
        <div className="flex flex-wrap gap-3 text-[10px] mt-2 text-gray-600">
          {data.email && <span className="flex items-center gap-0.5"><Mail size={9} />{data.email}</span>}
          {data.phone && <span className="flex items-center gap-0.5"><Phone size={9} />{data.phone}</span>}
          {data.location && <span className="flex items-center gap-0.5"><MapPin size={9} />{data.location}</span>}
          {data.website && <span className="flex items-center gap-0.5"><LinkIcon size={9} />{data.website}</span>}
        </div>
      </header>

      {data.summary && <ATSSection title="Professional Summary"><p className="text-[10px] leading-relaxed">{lim(data.summary, 500)}</p></ATSSection>}

      {data.experience.length > 0 && (
        <ATSSection title="Work Experience">
          {data.experience.slice(0,5).map((e,i)=>(
            <div key={i} className="mb-3">
              <div className="flex justify-between font-bold text-[11px]"><span>{e.role}</span><span className="text-gray-500 font-normal">{e.duration}</span></div>
              <p className="text-[10px] italic text-gray-500 mb-0.5">{e.company}</p>
              {e.details && <p className="text-[10px] text-gray-700 whitespace-pre-line leading-relaxed">{lim(e.details, 300)}</p>}
            </div>
          ))}
        </ATSSection>
      )}

      {data.projects.length > 0 && (
        <ATSSection title="Projects">
          {data.projects.slice(0,4).map((p,i)=>(
            <div key={i} className="mb-2">
              <span className="font-bold text-[11px]">{p.name}</span>
              {p.tech && <span className="ml-2 text-[9px] text-gray-500 font-semibold">({p.tech})</span>}
              {p.link && <span className="ml-2 text-[9px] text-gray-400">{p.link}</span>}
              {p.description && <p className="text-[10px] text-gray-700 mt-0.5 leading-relaxed">{lim(p.description, 150)}</p>}
            </div>
          ))}
        </ATSSection>
      )}

      {data.education.length > 0 && (
        <ATSSection title="Education">
          {data.education.slice(0,3).map((e,i)=>(
            <div key={i} className="flex justify-between text-[10px] mb-1">
              <div><strong>{e.degree}</strong>, {e.school}</div>
              <span className="text-gray-500">{e.year}</span>
            </div>
          ))}
        </ATSSection>
      )}

      {data.skills.length > 0 && (
        <ATSSection title="Core Skills">
          <div className="flex flex-wrap gap-1.5">
            {data.skills.slice(0,15).map((s,i)=><span key={i} className="bg-gray-100 px-2 py-0.5 rounded border border-gray-200 text-[10px]">{s}</span>)}
          </div>
        </ATSSection>
      )}

      {data.certifications && <ATSSection title="Certifications"><p className="text-[10px] whitespace-pre-line leading-relaxed">{data.certifications}</p></ATSSection>}
      {data.languages && <ATSSection title="Languages"><p className="text-[10px]">{data.languages}</p></ATSSection>}
      {data.awards && <ATSSection title="Awards & Achievements"><p className="text-[10px] whitespace-pre-line leading-relaxed">{data.awards}</p></ATSSection>}
    </div>
  );
}

// ── Section helpers
function ATSSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-5">
      <h3 className="font-bold border-b border-gray-300 mb-2 uppercase text-[10px] tracking-wider">{title}</h3>
      {children}
    </section>
  );
}
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-3">
      <h3 className="font-black text-[10px] uppercase tracking-wider text-slate-400 border-b-2 border-blue-500 pb-1 mb-2">{title}</h3>
      {children}
    </section>
  );
}
function ExecSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-4">
      <h3 className="font-bold text-[10px] uppercase tracking-widest text-amber-600 border-b border-amber-300 pb-1 mb-2">{title}</h3>
      {children}
    </section>
  );
}
function MinSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-4">
      <h3 className="font-black text-[10px] uppercase text-slate-900 mb-1.5">{title}</h3>
      {children}
    </section>
  );
}

/* ============================================================
   MAIN COMPONENT
============================================================ */
export default function ResumeMaker({ template: initialTemplate }: { template: string | null }) {
  const { toast } = useToast();
  const [data, setData] = useState<ResumeData>(INITIAL_DATA);
  const [atsScore, setAtsScore] = useState(0);
  // ✅ FIX: Template can be changed after filling data
  const [template, setTemplate] = useState(initialTemplate || "classic");
  const [showTemplatePicker, setShowTemplatePicker] = useState(false);
  // ✅ FIX: Skills controlled separately as string
  const [skillsInput, setSkillsInput] = useState("");

  const updateField = useCallback((field: keyof ResumeData, value: any) => {
    setData(prev => {
      const next = { ...prev, [field]: value };
      setAtsScore(calcATS(next));
      return next;
    });
  }, []);

  // ✅ FIX: Skills update — separate state for input, array for data
  const handleSkillsChange = (val: string) => {
    setSkillsInput(val);
    const arr = val.split(",").map(s => s.trim()).filter(Boolean);
    updateField("skills", arr);
  };

  // Experience
  const addExp = () => { if (data.experience.length >= 5) return; updateField("experience", [...data.experience, { role: "", company: "", duration: "", details: "" }]); };
  const updExp = (i: number, f: string, v: string) => { const n = [...data.experience]; (n[i] as any)[f] = v; updateField("experience", n); };
  const remExp = (i: number) => updateField("experience", data.experience.filter((_, j) => j !== i));

  // Education
  const addEdu = () => { if (data.education.length >= 3) return; updateField("education", [...data.education, { degree: "", school: "", year: "" }]); };
  const updEdu = (i: number, f: string, v: string) => { const n = [...data.education]; (n[i] as any)[f] = v; updateField("education", n); };
  const remEdu = (i: number) => updateField("education", data.education.filter((_, j) => j !== i));

  // Projects
  const addProj = () => { if (data.projects.length >= 5) return; updateField("projects", [...data.projects, { name: "", tech: "", description: "", link: "" }]); };
  const updProj = (i: number, f: string, v: string) => { const n = [...data.projects]; (n[i] as any)[f] = v; updateField("projects", n); };
  const remProj = (i: number) => updateField("projects", data.projects.filter((_, j) => j !== i));

  // ✅ jsPDF Download with current template
  const handleDownload = () => {
    if (!data.name.trim()) {
      toast({ title: "Add your name first", variant: "destructive" });
      return;
    }
    const doc = new jsPDF({ unit: "mm", format: "a4" });
    const W = 210, margin = 18, cW = W - margin * 2;
    let y = margin;

    const nl = (t: string, s: number, b = false, col: [number,number,number] = [20,20,20]) => {
      doc.setFont("helvetica", b ? "bold" : "normal");
      doc.setFontSize(s);
      doc.setTextColor(...col);
      doc.splitTextToSize(t, cW).forEach((l: string) => {
        if (y > 272) { doc.addPage(); y = margin; }
        doc.text(l, margin, y);
        y += s * 0.42;
      });
    };

    const hr = (col: [number,number,number] = [210,210,210]) => {
      doc.setDrawColor(...col);
      doc.line(margin, y, W - margin, y);
      y += 4;
    };

    const sect = (title: string) => {
      y += 3;
      nl(title, 7.5, true, [100, 116, 139]);
      y += 0.5;
      hr();
    };

    // Header
    const hColor: [number,number,number] = template === "executive" ? [28,25,23] : template === "modern" ? [29,78,216] : [15,23,42];
    const accentColor: [number,number,number] = template === "executive" ? [180,83,9] : [147,197,253];
    doc.setFillColor(...hColor);
    doc.rect(0, 0, W, 38, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(17);
    doc.setTextColor(255, 255, 255);
    doc.text(data.name || "YOUR NAME", margin, 14);
    if (data.jobTitle) {
      doc.setFontSize(10);
      doc.setTextColor(...accentColor);
      doc.text(data.jobTitle, margin, 21);
    }
    const contact = [data.email, data.phone, data.location, data.website].filter(Boolean).join("  |  ");
    if (contact) {
      doc.setFontSize(8);
      doc.setTextColor(148, 163, 184);
      doc.text(contact, margin, 30);
    }
    y = 46;

    if (data.summary) { sect("PROFESSIONAL SUMMARY"); nl(data.summary, 9, false, [60,60,60]); y += 3; }

    if (data.experience.filter(e => e.role).length > 0) {
      sect("WORK EXPERIENCE");
      data.experience.filter(e => e.role).forEach(e => {
        if (y > 260) { doc.addPage(); y = margin; }
        doc.setFont("helvetica", "bold"); doc.setFontSize(10); doc.setTextColor(15,23,42);
        doc.text(e.role, margin, y);
        if (e.duration) { doc.setFont("helvetica","normal"); doc.setFontSize(8.5); doc.setTextColor(100,116,139); doc.text(e.duration, W-margin, y, { align: "right" }); }
        y += 5;
        if (e.company) { doc.setFontSize(9); doc.setTextColor(37,99,235); doc.text(e.company, margin, y); y += 5; }
        if (e.details) { nl(e.details, 8.5, false, [75,85,99]); }
        y += 2;
      });
    }

    if (data.projects.filter(p => p.name).length > 0) {
      sect("PROJECTS");
      data.projects.filter(p => p.name).forEach(p => {
        if (y > 265) { doc.addPage(); y = margin; }
        doc.setFont("helvetica","bold"); doc.setFontSize(10); doc.setTextColor(15,23,42);
        const projTitle = p.tech ? `${p.name}  [${p.tech}]` : p.name;
        doc.text(projTitle, margin, y); y += 5;
        if (p.description) nl(p.description, 8.5, false, [75,85,99]);
        y += 2;
      });
    }

    if (data.education.filter(e => e.degree).length > 0) {
      sect("EDUCATION");
      data.education.filter(e => e.degree).forEach(e => {
        doc.setFont("helvetica","bold"); doc.setFontSize(10); doc.setTextColor(15,23,42);
        doc.text(e.degree, margin, y);
        if (e.year) { doc.setFont("helvetica","normal"); doc.setFontSize(8.5); doc.setTextColor(100,116,139); doc.text(e.year, W-margin, y, { align: "right" }); }
        y += 5;
        if (e.school) { doc.setFontSize(9); doc.setTextColor(100,116,139); doc.text(e.school, margin, y); y += 5; }
      });
    }

    if (data.skills.length > 0) {
      sect("SKILLS");
      nl(data.skills.slice(0,15).join("  •  "), 9, false, [50,50,50]);
      y += 3;
    }

    if (data.certifications) { sect("CERTIFICATIONS"); nl(data.certifications, 9, false, [50,50,50]); y += 3; }
    if (data.languages) { sect("LANGUAGES"); nl(data.languages, 9, false, [50,50,50]); y += 3; }
    if (data.awards) { sect("AWARDS & ACHIEVEMENTS"); nl(data.awards, 9, false, [50,50,50]); }

    const pg = (doc as any).internal.getNumberOfPages();
    for (let i = 1; i <= pg; i++) {
      doc.setPage(i);
      doc.setFontSize(7); doc.setTextColor(180,180,180);
      doc.text("Generated by TaskGuru.online — Free Resume Maker", margin, 291);
      doc.text(`Page ${i}/${pg}`, W-margin, 291, { align: "right" });
    }

    doc.save(`Resume-${data.name.replace(/\s+/g,"-")}.pdf`);
    toast({ title: "✅ Resume Downloaded!", description: `${template} template · PDF saved.` });
  };

  const inp = "w-full px-3 py-2 text-sm border-2 border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-primary transition-colors";
  const cardCls = "dark:bg-slate-900 dark:border-slate-800";

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">

      {/* TOP BAR — ATS + Template Switcher */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <FileText className="text-blue-600 w-5 h-5" /> Resume Editor
          </h2>
          <p className="text-slate-500 text-xs mt-0.5">Fill in details · switch templates anytime · download PDF</p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {/* ✅ ATS Score */}
          <div className="flex items-center gap-3 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-900">
            <div className={`h-11 w-11 flex items-center justify-center rounded-full font-black text-sm flex-shrink-0 ${atsScore >= 80 ? "bg-green-100 text-green-600" : atsScore >= 50 ? "bg-blue-100 text-blue-600" : "bg-white text-blue-600"}`}>
              {atsScore}%
            </div>
            <div className="w-24">
              <p className="text-[10px] font-black text-blue-400 uppercase mb-1">ATS Score</p>
              <Progress value={atsScore} className="h-1.5 bg-blue-200" />
            </div>
          </div>

          {/* ✅ Template Switcher — change anytime without losing data */}
          <div className="relative">
            <button
              onClick={() => setShowTemplatePicker(p => !p)}
              className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold text-slate-700 dark:text-slate-300 hover:border-primary transition-colors"
            >
              <Palette className="w-4 h-4 text-primary" />
              {TEMPLATES.find(t => t.id === template)?.label || "Classic"}
              <ChevronDown className={`w-3 h-3 transition-transform ${showTemplatePicker ? "rotate-180" : ""}`} />
            </button>
            {showTemplatePicker && (
              <div className="absolute right-0 top-12 z-50 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl p-2 w-48">
                <p className="text-[10px] font-black text-slate-400 uppercase px-2 pb-2">Switch Template</p>
                {TEMPLATES.map(t => (
                  <button
                    key={t.id}
                    onClick={() => { setTemplate(t.id); setShowTemplatePicker(false); toast({ title: `✅ ${t.label} applied`, description: "Your data is preserved." }); }}
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-left transition-colors ${template === t.id ? "bg-primary/10 text-primary font-bold" : "hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"}`}
                  >
                    <div className={`w-4 h-4 rounded-full ${t.color} flex-shrink-0`} />
                    {t.label}
                    {template === t.id && <span className="ml-auto text-[10px]">✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Download button */}
          <Button onClick={handleDownload} className="h-10 rounded-xl font-bold bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-500/20 px-5">
            <Download className="w-4 h-4 mr-2" /> Download PDF
          </Button>
        </div>
      </div>

      {/* EDITOR + PREVIEW */}
      <div className="grid lg:grid-cols-2 gap-6 min-h-[85vh]">

        {/* LEFT: FORM */}
        <div className="space-y-5 overflow-y-auto pr-1 pb-10 max-h-[85vh]">

          {/* Personal */}
          <Card className={cardCls}>
            <CardHeader className="pb-2"><h3 className="font-bold text-xs uppercase text-slate-400 flex items-center gap-1.5"><Target size={14} /> Personal Details</h3></CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <input className={inp} placeholder="Full Name *" value={data.name} onChange={e => updateField("name", e.target.value)} />
                <input className={inp} placeholder="Job Title (e.g. Web Developer)" value={data.jobTitle} onChange={e => updateField("jobTitle", e.target.value)} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <input className={inp} placeholder="Email *" type="email" value={data.email} onChange={e => updateField("email", e.target.value)} />
                <input className={inp} placeholder="Phone" value={data.phone} onChange={e => updateField("phone", e.target.value)} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <input className={inp} placeholder="City, Country" value={data.location} onChange={e => updateField("location", e.target.value)} />
                <input className={inp} placeholder="LinkedIn / Website" value={data.website} onChange={e => updateField("website", e.target.value)} />
              </div>
              <textarea className={`${inp} resize-none h-20`} placeholder="Professional Summary — 3-4 sentences. Title, years of experience, key strengths." value={data.summary} onChange={e => updateField("summary", e.target.value)} />
            </CardContent>
          </Card>

          {/* Experience */}
          <Card className={cardCls}>
            <CardHeader className="pb-2 flex flex-row justify-between items-center">
              <h3 className="font-bold text-xs uppercase text-slate-400 flex items-center gap-1.5"><Briefcase size={14} /> Work Experience</h3>
              <button onClick={addExp} disabled={data.experience.length >= 5} className="text-xs font-bold text-primary disabled:opacity-40 hover:underline">+ Add ({data.experience.length}/5)</button>
            </CardHeader>
            <CardContent className="space-y-4">
              {data.experience.length === 0 && <p className="text-xs text-slate-400 italic text-center py-3">Click + Add to add work experience</p>}
              {data.experience.map((e, i) => (
                <div key={i} className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 space-y-2.5">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black text-slate-400 uppercase">Position {i+1}</span>
                    <button onClick={() => remExp(i)} className="text-[10px] text-red-400 hover:text-red-600 font-bold">Remove</button>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <input className={inp} placeholder="Job Role / Title" value={e.role} onChange={ev => updExp(i,"role",ev.target.value)} />
                    <input className={inp} placeholder="Company Name" value={e.company} onChange={ev => updExp(i,"company",ev.target.value)} />
                  </div>
                  <input className={inp} placeholder="Duration (Jan 2022 – Present)" value={e.duration} onChange={ev => updExp(i,"duration",ev.target.value)} />
                  <textarea className={`${inp} resize-none h-16`} placeholder="Achievements: Led team of 5, Increased revenue by 20%, Built REST API..." value={e.details} onChange={ev => updExp(i,"details",ev.target.value)} />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Projects ✅ NEW */}
          <Card className={cardCls}>
            <CardHeader className="pb-2 flex flex-row justify-between items-center">
              <h3 className="font-bold text-xs uppercase text-slate-400 flex items-center gap-1.5"><Code size={14} /> Projects</h3>
              <button onClick={addProj} disabled={data.projects.length >= 5} className="text-xs font-bold text-primary disabled:opacity-40 hover:underline">+ Add ({data.projects.length}/5)</button>
            </CardHeader>
            <CardContent className="space-y-4">
              {data.projects.length === 0 && <p className="text-xs text-slate-400 italic text-center py-3">Add personal or academic projects</p>}
              {data.projects.map((p, i) => (
                <div key={i} className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 space-y-2.5">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black text-slate-400 uppercase">Project {i+1}</span>
                    <button onClick={() => remProj(i)} className="text-[10px] text-red-400 hover:text-red-600 font-bold">Remove</button>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <input className={inp} placeholder="Project Name" value={p.name} onChange={ev => updProj(i,"name",ev.target.value)} />
                    <input className={inp} placeholder="Tech Stack (React, Node.js...)" value={p.tech} onChange={ev => updProj(i,"tech",ev.target.value)} />
                  </div>
                  <input className={inp} placeholder="GitHub/Live link (optional)" value={p.link} onChange={ev => updProj(i,"link",ev.target.value)} />
                  <textarea className={`${inp} resize-none h-14`} placeholder="What it does, your role, impact..." value={p.description} onChange={ev => updProj(i,"description",ev.target.value)} />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Education */}
          <Card className={cardCls}>
            <CardHeader className="pb-2 flex flex-row justify-between items-center">
              <h3 className="font-bold text-xs uppercase text-slate-400 flex items-center gap-1.5"><BookOpen size={14} /> Education</h3>
              <button onClick={addEdu} disabled={data.education.length >= 3} className="text-xs font-bold text-primary disabled:opacity-40 hover:underline">+ Add ({data.education.length}/3)</button>
            </CardHeader>
            <CardContent className="space-y-4">
              {data.education.length === 0 && <p className="text-xs text-slate-400 italic text-center py-3">Click + Add to add education</p>}
              {data.education.map((e, i) => (
                <div key={i} className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 space-y-2.5">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black text-slate-400 uppercase">Degree {i+1}</span>
                    <button onClick={() => remEdu(i)} className="text-[10px] text-red-400 hover:text-red-600 font-bold">Remove</button>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <input className={inp} placeholder="Degree / Qualification" value={e.degree} onChange={ev => updEdu(i,"degree",ev.target.value)} />
                    <input className={inp} placeholder="School / University" value={e.school} onChange={ev => updEdu(i,"school",ev.target.value)} />
                  </div>
                  <input className={inp} placeholder="Year (2020 – 2024)" value={e.year} onChange={ev => updEdu(i,"year",ev.target.value)} />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Skills ✅ FIXED */}
          <Card className={cardCls}>
            <CardHeader className="pb-2"><h3 className="font-bold text-xs uppercase text-slate-400 flex items-center gap-1.5"><Zap size={14} /> Skills</h3></CardHeader>
            <CardContent className="space-y-3">
              <input
                className={inp}
                placeholder="Type skills separated by commas: React, Node.js, Python, Excel, SEO..."
                value={skillsInput}
                onChange={e => handleSkillsChange(e.target.value)}
              />
              {data.skills.length > 0 && (
                <>
                  <div className="flex flex-wrap gap-1.5">
                    {data.skills.slice(0,15).map((s,i) => (
                      <span key={i} className="flex items-center gap-1 px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-lg font-bold">
                        {s}
                        <button
                          onClick={() => {
                            const next = data.skills.filter((_,j) => j !== i);
                            updateField("skills", next);
                            setSkillsInput(next.join(", "));
                          }}
                          className="ml-0.5 text-blue-400 hover:text-red-500 leading-none"
                        >×</button>
                      </span>
                    ))}
                  </div>
                  <p className="text-[10px] text-slate-400">{data.skills.length}/15 skills · click × to remove</p>
                </>
              )}
            </CardContent>
          </Card>

          {/* More Options */}
          <Card className={cardCls}>
            <CardHeader className="pb-2"><h3 className="font-bold text-xs uppercase text-slate-400 flex items-center gap-1.5"><Award size={14} /> More Options</h3></CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider block mb-1.5">Certifications</label>
                <textarea className={`${inp} resize-none h-16`} placeholder={"AWS Certified · 2024\nGoogle Analytics Certified · 2023"} value={data.certifications} onChange={e => updateField("certifications", e.target.value)} />
              </div>
              <div>
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider block mb-1.5">Languages</label>
                <input className={inp} placeholder="English (Native), Hindi (Fluent), French (Basic)" value={data.languages} onChange={e => updateField("languages", e.target.value)} />
              </div>
              <div>
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider block mb-1.5">Awards & Achievements</label>
                <textarea className={`${inp} resize-none h-14`} placeholder={"Best Employee Q3 2023\nFirst Prize — National Hackathon 2022"} value={data.awards} onChange={e => updateField("awards", e.target.value)} />
              </div>
            </CardContent>
          </Card>

        </div>

        {/* RIGHT: LIVE PREVIEW */}
         <div className="flex flex-col rounded-2xl overflow-hidden border-4 border-slate-300 dark:border-slate-600 shadow-2xl bg-slate-200 dark:bg-slate-700">
          <div className="bg-slate-800 text-white text-xs py-2.5 px-4 flex justify-between items-center flex-shrink-0">
            <span className="font-mono opacity-60 text-[10px]">Preview · {TEMPLATES.find(t=>t.id===template)?.label}</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowTemplatePicker(p => !p)}
                className="text-[10px] font-bold text-slate-300 hover:text-white flex items-center gap-1"
              >
                <Palette className="w-3 h-3" /> Change
              </button>
              <Button size="sm" className="h-6 text-[10px] bg-green-600 hover:bg-green-700 text-white font-bold px-3 rounded-lg" onClick={handleDownload}>
                <Download size={10} className="mr-1" /> PDF
              </Button>
            </div>
          </div>
          <div className="flex-1 overflow-auto bg-slate-500 p-4 flex justify-center">
            <div className="w-[210mm] min-h-[297mm] bg-white shadow-xl scale-[0.50] origin-top md:scale-[0.70] lg:scale-[0.62] transition-transform">
              <ResumePreview data={data} template={template} />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
