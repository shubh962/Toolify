"use client";

import { useState } from "react";
import { jsPDF } from "jspdf";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Download, Mail, Phone, MapPin, Link as LinkIcon,
  Target, FileText, Zap, Award, HelpCircle,
  ShieldCheck, Globe, BookOpen, Briefcase,
} from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

/* ======================================================
   HELPERS
====================================================== */
const limitText = (t: string, max: number) =>
  t.length > max ? t.slice(0, max).trim() + "…" : t;

const limitList = (arr: string[], max: number) => arr.slice(0, max);

// ✅ FIX: Better ATS score — more granular
const calculateATS = (d: ResumeData) => {
  let s = 0;
  if (d.name) s += 10;
  if (d.email) s += 5;
  if (d.phone) s += 5;
  if (d.location) s += 5;
  if (d.jobTitle) s += 5;
  if (d.experience.length > 0) s += 20;
  if (d.education.length > 0) s += 15;
  if (d.skills.length >= 5) s += 15;
  if (d.summary.length > 50) s += 15;
  if (d.certifications) s += 5;
  return Math.min(s, 100);
};

/* ======================================================
   TYPES
====================================================== */
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
  skills: string[];
  skillsRaw: string;
  certifications: string;   // ✅ NEW
  languages: string;        // ✅ NEW
};

const INITIAL_DATA: ResumeData = {
  name: "", jobTitle: "", email: "", phone: "",
  location: "", website: "", summary: "",
  experience: [], education: [],
  skills: [], skillsRaw: "",
  certifications: "", languages: "",
};

/* ======================================================
   RESUME PREVIEW
====================================================== */
function ResumePreview({ data, template }: { data: ResumeData; template: string | null }) {
  const isModern = template === "modern";
  const isExecutive = template === "executive";

  if (!isModern && !isExecutive) {
    // ✅ Classic / Minimal
    return (
      <div id="resume-preview" className="bg-white text-black p-8 h-full shadow-inner overflow-y-auto text-left font-serif text-[13px]">
        <header className="border-b-2 border-gray-800 pb-4 mb-5">
          <h1 className="text-2xl font-bold uppercase tracking-widest">
            {limitText(data.name || "YOUR NAME", 40)}
          </h1>
          {data.jobTitle && <p className="text-sm font-semibold text-gray-600 mt-0.5">{data.jobTitle}</p>}
          <div className="flex flex-wrap gap-3 text-xs mt-2 text-gray-600">
            {data.email && <span className="flex items-center gap-1"><Mail size={10} />{data.email}</span>}
            {data.phone && <span className="flex items-center gap-1"><Phone size={10} />{data.phone}</span>}
            {data.location && <span className="flex items-center gap-1"><MapPin size={10} />{data.location}</span>}
            {data.website && <span className="flex items-center gap-1"><LinkIcon size={10} />{data.website}</span>}
          </div>
        </header>

        {data.summary && (
          <section className="mb-5">
            <h3 className="font-bold border-b border-gray-300 mb-2 uppercase text-xs tracking-wider">Professional Summary</h3>
            <p className="text-xs leading-relaxed">{limitText(data.summary, 500)}</p>
          </section>
        )}

        {/* ✅ FIX: limit raised 3→5 */}
        {data.experience.length > 0 && (
          <section className="mb-5">
            <h3 className="font-bold border-b border-gray-300 mb-2 uppercase text-xs tracking-wider">Work Experience</h3>
            <div className="space-y-3">
              {limitList(data.experience, 5).map((exp, i) => (
                <div key={i}>
                  <div className="flex justify-between font-bold text-xs">
                    <span>{exp.role}</span>
                    <span className="text-gray-600">{exp.duration}</span>
                  </div>
                  <div className="text-xs italic mb-1 text-gray-600">{exp.company}</div>
                  <p className="text-[11px] text-gray-700 whitespace-pre-line leading-relaxed">{limitText(exp.details, 300)}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ✅ FIX: limit raised 2→3 */}
        {data.education.length > 0 && (
          <section className="mb-5">
            <h3 className="font-bold border-b border-gray-300 mb-2 uppercase text-xs tracking-wider">Education</h3>
            <div className="space-y-2">
              {limitList(data.education, 3).map((edu, i) => (
                <div key={i} className="flex justify-between text-xs">
                  <div><span className="font-bold">{edu.degree}</span> — {edu.school}</div>
                  <span className="text-gray-600">{edu.year}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ✅ FIX: limit raised 10→15 */}
        {data.skills.length > 0 && (
          <section className="mb-5">
            <h3 className="font-bold border-b border-gray-300 mb-2 uppercase text-xs tracking-wider">Core Skills</h3>
            <div className="flex flex-wrap gap-1.5 text-xs">
              {limitList(data.skills, 15).map((skill, i) => (
                <span key={i} className="bg-gray-100 px-2 py-0.5 rounded border border-gray-200">{skill}</span>
              ))}
            </div>
          </section>
        )}

        {/* ✅ NEW: Certifications */}
        {data.certifications && (
          <section className="mb-5">
            <h3 className="font-bold border-b border-gray-300 mb-2 uppercase text-xs tracking-wider">Certifications</h3>
            <p className="text-xs leading-relaxed whitespace-pre-line">{data.certifications}</p>
          </section>
        )}

        {/* ✅ NEW: Languages */}
        {data.languages && (
          <section>
            <h3 className="font-bold border-b border-gray-300 mb-2 uppercase text-xs tracking-wider">Languages</h3>
            <p className="text-xs">{data.languages}</p>
          </section>
        )}
      </div>
    );
  }

  // Modern / Executive Layout
  return (
    <div id="resume-preview" className={`bg-white text-slate-800 p-0 h-full shadow-inner overflow-y-auto text-left font-sans flex flex-col text-[12px]`}>
      <header className={`${isExecutive ? "bg-stone-900" : "bg-slate-900"} text-white p-7`}>
        <h1 className="text-3xl font-black tracking-tight mb-1">{limitText(data.name || "YOUR NAME", 40)}</h1>
        {data.jobTitle && <p className={`${isExecutive ? "text-amber-400" : "text-blue-300"} text-sm font-semibold mb-2`}>{data.jobTitle}</p>}
        <p className="opacity-80 text-xs max-w-md">{limitText(data.summary, 200)}</p>
      </header>

      <div className="p-7 grid grid-cols-3 gap-6 flex-grow">
        <div className="col-span-2 space-y-5">
          {data.experience.length > 0 && (
            <section>
              <h3 className={`font-bold uppercase tracking-wider text-xs border-b-2 ${isExecutive ? "border-amber-500" : "border-blue-500"} mb-3 pb-1`}>Experience</h3>
              <div className="space-y-3">
                {limitList(data.experience, 5).map((exp, i) => (
                  <div key={i}>
                    <h4 className="font-bold text-xs">{exp.role}</h4>
                    <p className={`text-xs ${isExecutive ? "text-amber-600" : "text-blue-600"} font-bold mb-1`}>{exp.company} | {exp.duration}</p>
                    <p className="text-[11px] text-slate-600 leading-relaxed">{limitText(exp.details, 250)}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
          {data.education.length > 0 && (
            <section>
              <h3 className={`font-bold uppercase tracking-wider text-xs border-b-2 ${isExecutive ? "border-amber-500" : "border-blue-500"} mb-3 pb-1`}>Education</h3>
              {limitList(data.education, 3).map((edu, i) => (
                <div key={i} className="mb-1">
                  <div className="font-bold text-xs">{edu.school}</div>
                  <div className="text-[11px] text-slate-500">{edu.degree} — {edu.year}</div>
                </div>
              ))}
            </section>
          )}
        </div>
        <div className="col-span-1 bg-slate-50 p-4 -my-7 -mr-7 border-l space-y-5">
          <div className="pt-4 space-y-1 text-[11px] text-slate-600 break-words">
            {data.email && <div className="flex items-center gap-1"><Mail size={9} />{data.email}</div>}
            {data.phone && <div className="flex items-center gap-1"><Phone size={9} />{data.phone}</div>}
            {data.location && <div className="flex items-center gap-1"><MapPin size={9} />{data.location}</div>}
            {data.website && <div className="flex items-center gap-1"><LinkIcon size={9} />{data.website}</div>}
          </div>
          {data.skills.length > 0 && (
            <section>
              <h3 className="font-bold text-slate-900 uppercase tracking-wider text-[10px] mb-2">Skills</h3>
              <div className="flex flex-wrap gap-1">
                {limitList(data.skills, 12).map((skill, i) => (
                  <span key={i} className="bg-white border px-1.5 py-0.5 rounded text-[10px] font-bold text-slate-700">{skill}</span>
                ))}
              </div>
            </section>
          )}
          {data.certifications && (
            <section>
              <h3 className="font-bold text-slate-900 uppercase tracking-wider text-[10px] mb-2">Certifications</h3>
              <p className="text-[10px] text-slate-600 whitespace-pre-line">{data.certifications}</p>
            </section>
          )}
          {data.languages && (
            <section>
              <h3 className="font-bold text-slate-900 uppercase tracking-wider text-[10px] mb-2">Languages</h3>
              <p className="text-[10px] text-slate-600">{data.languages}</p>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

/* ======================================================
   MAIN COMPONENT
====================================================== */
export default function ResumeMaker({ template }: { template: string | null }) {
  const { toast } = useToast();
  const [data, setData] = useState<ResumeData>(INITIAL_DATA);
  const [atsScore, setAtsScore] = useState(0);

  const updateField = (field: keyof ResumeData, value: any) => {
    const newData = { ...data, [field]: value };
    setData(newData);
    setAtsScore(calculateATS(newData));
  };

  // ✅ FIX: Raised experience limit 3 → 5
  const addExperience = () => {
    if (data.experience.length >= 5) return;
    updateField("experience", [...data.experience, { role: "", company: "", duration: "", details: "" }]);
  };

  const updateExperience = (index: number, field: string, val: string) => {
    const newExp = [...data.experience];
    (newExp[index] as any)[field] = val;
    updateField("experience", newExp);
  };

  const removeExperience = (index: number) => {
    updateField("experience", data.experience.filter((_, i) => i !== index));
  };

  // ✅ FIX: Raised education limit 2 → 3
  const addEducation = () => {
    if (data.education.length >= 3) return;
    updateField("education", [...data.education, { degree: "", school: "", year: "" }]);
  };

  const updateEducation = (index: number, field: string, val: string) => {
    const newEdu = [...data.education];
    (newEdu[index] as any)[field] = val;
    updateField("education", newEdu);
  };

  const removeEducation = (index: number) => {
    updateField("education", data.education.filter((_, i) => i !== index));
  };

  // ✅ FIX: jsPDF download — no manual save required
  const handleDownload = () => {
    if (!data.name.trim()) {
      toast({ title: "Add your name first", description: "Fill in at least your name before downloading.", variant: "destructive" });
      return;
    }

    const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
    const W = 210;
    const margin = 18;
    const contentW = W - margin * 2;
    let y = margin;

    const addText = (text: string, fontSize: number, bold = false, color: [number, number, number] = [20, 20, 20]) => {
      doc.setFont("helvetica", bold ? "bold" : "normal");
      doc.setFontSize(fontSize);
      doc.setTextColor(...color);
      const lines = doc.splitTextToSize(text, contentW);
      lines.forEach((line: string) => {
        if (y > 272) { doc.addPage(); y = margin; }
        doc.text(line, margin, y);
        y += fontSize * 0.45;
      });
    };

    const addLine = (color: [number, number, number] = [200, 200, 200]) => {
      doc.setDrawColor(...color);
      doc.setLineWidth(0.3);
      doc.line(margin, y, W - margin, y);
      y += 4;
    };

    // ── HEADER
    doc.setFillColor(15, 23, 42);
    doc.rect(0, 0, W, 36, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.setTextColor(255, 255, 255);
    doc.text(data.name || "YOUR NAME", margin, 15);
    if (data.jobTitle) {
      doc.setFontSize(10);
      doc.setTextColor(147, 197, 253);
      doc.text(data.jobTitle, margin, 22);
    }
    // Contact line
    const contactParts = [data.email, data.phone, data.location, data.website].filter(Boolean);
    if (contactParts.length > 0) {
      doc.setFontSize(8);
      doc.setTextColor(148, 163, 184);
      doc.text(contactParts.join("  |  "), margin, 30);
    }
    y = 44;

    // ── SUMMARY
    if (data.summary.trim()) {
      addText("PROFESSIONAL SUMMARY", 8, true, [71, 85, 105]);
      y += 1;
      addLine();
      addText(data.summary, 9, false, [50, 50, 50]);
      y += 5;
    }

    // ── EXPERIENCE
    if (data.experience.filter(e => e.role).length > 0) {
      addText("WORK EXPERIENCE", 8, true, [71, 85, 105]);
      y += 1;
      addLine();
      data.experience.filter(e => e.role).forEach((exp) => {
        if (y > 260) { doc.addPage(); y = margin; }
        doc.setFont("helvetica", "bold");
        doc.setFontSize(10);
        doc.setTextColor(15, 23, 42);
        doc.text(exp.role, margin, y);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);
        doc.setTextColor(71, 85, 105);
        const rightText = exp.duration;
        doc.text(rightText, W - margin, y, { align: "right" });
        y += 5;
        if (exp.company) {
          doc.setFontSize(9);
          doc.setTextColor(37, 99, 235);
          doc.text(exp.company, margin, y);
          y += 5;
        }
        if (exp.details) {
          doc.setFontSize(8.5);
          doc.setTextColor(75, 85, 99);
          const lines = doc.splitTextToSize(exp.details, contentW);
          lines.forEach((line: string) => {
            if (y > 272) { doc.addPage(); y = margin; }
            doc.text(line, margin, y);
            y += 4.5;
          });
        }
        y += 3;
      });
      y += 2;
    }

    // ── EDUCATION
    if (data.education.filter(e => e.degree).length > 0) {
      addText("EDUCATION", 8, true, [71, 85, 105]);
      y += 1;
      addLine();
      data.education.filter(e => e.degree).forEach((edu) => {
        if (y > 270) { doc.addPage(); y = margin; }
        doc.setFont("helvetica", "bold");
        doc.setFontSize(9.5);
        doc.setTextColor(15, 23, 42);
        doc.text(edu.degree, margin, y);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);
        doc.setTextColor(71, 85, 105);
        doc.text(edu.year, W - margin, y, { align: "right" });
        y += 5;
        if (edu.school) {
          doc.setFontSize(9);
          doc.setTextColor(100, 116, 139);
          doc.text(edu.school, margin, y);
          y += 6;
        }
      });
      y += 2;
    }

    // ── SKILLS
    if (data.skills.length > 0) {
      addText("SKILLS", 8, true, [71, 85, 105]);
      y += 1;
      addLine();
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(50, 50, 50);
      const skillText = data.skills.slice(0, 15).join("  •  ");
      const skillLines = doc.splitTextToSize(skillText, contentW);
      skillLines.forEach((line: string) => {
        if (y > 272) { doc.addPage(); y = margin; }
        doc.text(line, margin, y);
        y += 5;
      });
      y += 2;
    }

    // ── CERTIFICATIONS
    if (data.certifications.trim()) {
      addText("CERTIFICATIONS", 8, true, [71, 85, 105]);
      y += 1;
      addLine();
      addText(data.certifications, 9, false, [50, 50, 50]);
      y += 3;
    }

    // ── LANGUAGES
    if (data.languages.trim()) {
      addText("LANGUAGES", 8, true, [71, 85, 105]);
      y += 1;
      addLine();
      addText(data.languages, 9, false, [50, 50, 50]);
    }

    // ── FOOTER
    const totalPages = (doc as any).internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(7);
      doc.setTextColor(160, 160, 160);
      doc.text("Generated by TaskGuru.online — Free Resume Maker", margin, 291);
      doc.text(`Page ${i} of ${totalPages}`, W - margin, 291, { align: "right" });
    }

    doc.save(`Resume-${data.name.replace(/\s+/g, "-") || "TaskGuru"}.pdf`);
    toast({ title: "✅ Resume Downloaded!", description: "PDF saved to your device." });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-20">

      {/* HEADER + ATS SCORE */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <FileText className="text-blue-600" /> Resume Editor
          </h2>
          <p className="text-slate-500 text-sm">Real-time ATS check. Fill in sections to improve your score.</p>
        </div>
        <Card className="w-full md:w-80 border-2 border-blue-100 bg-blue-50/50 dark:bg-blue-900/10 dark:border-blue-900">
          <CardContent className="p-4 flex items-center gap-4">
            <div className={`h-14 w-14 flex items-center justify-center rounded-full shadow-sm border font-black text-lg flex-shrink-0 ${
              atsScore >= 80 ? "bg-green-50 border-green-200 text-green-600" :
              atsScore >= 50 ? "bg-blue-50 border-blue-200 text-blue-600" :
              "bg-white border-blue-100 text-blue-600"
            }`}>
              {atsScore}%
            </div>
            <div className="flex-1">
              <div className="text-xs font-bold uppercase text-blue-400 mb-1.5">
                ATS Score — {atsScore >= 80 ? "Strong ✅" : atsScore >= 50 ? "Good 👍" : "Needs work"}
              </div>
              <Progress value={atsScore} className="h-2 bg-blue-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 h-[calc(100vh-200px)] min-h-[800px]">

        {/* LEFT: EDITOR */}
        <div className="space-y-6 overflow-y-auto pr-2 pb-20">

          {/* 1. PERSONAL INFO */}
         <Card className="dark:bg-slate-900 dark:border-slate-800">
            <CardHeader className="pb-3">
              <h3 className="font-bold text-sm uppercase text-slate-400 flex items-center gap-2">
                <Target size={16} /> Personal Details
              </h3>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input placeholder="Full Name *" value={data.name} onChange={e => updateField("name", e.target.value)} />
                <Input placeholder="Job Title (e.g. Software Developer)" value={data.jobTitle} onChange={e => updateField("jobTitle", e.target.value)} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Input placeholder="Email *" type="email" value={data.email} onChange={e => updateField("email", e.target.value)} />
                <Input placeholder="Phone" value={data.phone} onChange={e => updateField("phone", e.target.value)} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Input placeholder="Location (City, Country)" value={data.location} onChange={e => updateField("location", e.target.value)} />
                <Input placeholder="LinkedIn / Website" value={data.website} onChange={e => updateField("website", e.target.value)} />
              </div>
              <Textarea
                placeholder="Professional Summary — 3-4 sentences. Start with your title, years of experience, and top skills."
                value={data.summary}
                onChange={e => updateField("summary", e.target.value)}
                rows={3}
              />
            </CardContent>
          </Card>

          {/* 2. EXPERIENCE — ✅ FIX: 5 max */}
          <Card className="dark:bg-slate-900 dark:border-slate-800">
            <CardHeader className="pb-3 flex flex-row justify-between items-center">
              <h3 className="font-bold text-sm uppercase text-slate-400 flex items-center gap-2">
                <Briefcase size={16} /> Work Experience
              </h3>
              <Button variant="ghost" size="sm" onClick={addExperience} disabled={data.experience.length >= 5} className="text-xs">
                + Add {data.experience.length}/5
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              {data.experience.map((exp, i) => (
                <div key={i} className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-400 uppercase">Position {i + 1}</span>
                    <Button variant="ghost" size="sm" onClick={() => removeExperience(i)} className="text-red-400 hover:text-red-600 h-6 text-xs">Remove</Button>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <Input placeholder="Job Role / Title" value={exp.role} onChange={e => updateExperience(i, "role", e.target.value)} />
                    <Input placeholder="Company Name" value={exp.company} onChange={e => updateExperience(i, "company", e.target.value)} />
                  </div>
                  <Input placeholder="Duration (e.g. Jan 2022 – Present)" value={exp.duration} onChange={e => updateExperience(i, "duration", e.target.value)} />
                  <Textarea
                    placeholder="Key achievements — use action verbs: Led, Built, Improved, Managed, Delivered..."
                    value={exp.details}
                    onChange={e => updateExperience(i, "details", e.target.value)}
                    rows={2}
                  />
                </div>
              ))}
              {data.experience.length === 0 && (
                <p className="text-sm text-slate-400 italic text-center py-4">No experience added yet. Click + Add above.</p>
              )}
            </CardContent>
          </Card>

          {/* 3. EDUCATION — ✅ FIX: 3 max */}
          <Card className="dark:bg-slate-900 dark:border-slate-800">
            <CardHeader className="pb-3 flex flex-row justify-between items-center">
              <h3 className="font-bold text-sm uppercase text-slate-400 flex items-center gap-2">
                <BookOpen size={16} /> Education
              </h3>
              <Button variant="ghost" size="sm" onClick={addEducation} disabled={data.education.length >= 3} className="text-xs">
                + Add {data.education.length}/3
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              {data.education.map((edu, i) => (
                <div key={i} className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-400 uppercase">Degree {i + 1}</span>
                    <Button variant="ghost" size="sm" onClick={() => removeEducation(i)} className="text-red-400 hover:text-red-600 h-6 text-xs">Remove</Button>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <Input placeholder="Degree / Qualification" value={edu.degree} onChange={e => updateEducation(i, "degree", e.target.value)} />
                    <Input placeholder="School / University" value={edu.school} onChange={e => updateEducation(i, "school", e.target.value)} />
                  </div>
                  <Input placeholder="Year (e.g. 2018 – 2022)" value={edu.year} onChange={e => updateEducation(i, "year", e.target.value)} />
                </div>
              ))}
              {data.education.length === 0 && (
                <p className="text-sm text-slate-400 italic text-center py-4">No education added yet. Click + Add above.</p>
              )}
            </CardContent>
          </Card>

          {/* 4. SKILLS — ✅ FIX: 15 max */}
          <Card className="dark:bg-slate-900 dark:border-slate-800">
            <CardHeader className="pb-3">
              <h3 className="font-bold text-sm uppercase text-slate-400 flex items-center gap-2">
                <Zap size={16} /> Key Skills
              </h3>
            </CardHeader>
            <CardContent>
              <Input
                placeholder="Separate with commas: React, Node.js, Python, SEO, Project Management..."
                value={data.skillsRaw}
                onChange={e => {
                  updateField("skillsRaw", e.target.value);
                  updateField("skills", e.target.value.split(",").map(s => s.trim()).filter(Boolean));
                }}
              />
              <div className="flex flex-wrap gap-1.5 mt-3">
                {limitList(data.skills, 15).map((s, i) => s.trim() && (
                  <span key={i} className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-md font-bold">{s}</span>
                ))}
              </div>
              {data.skills.length > 0 && (
                <p className="text-[11px] text-slate-400 mt-2">{data.skills.length}/15 skills added</p>
              )}
            </CardContent>
          </Card>

          {/* 5. ✅ NEW: CERTIFICATIONS */}
          <Card className="dark:bg-slate-900 dark:border-slate-800">
            <CardHeader className="pb-3">
              <h3 className="font-bold text-sm uppercase text-slate-400 flex items-center gap-2">
                <Award size={16} /> Certifications <span className="text-[10px] normal-case font-normal text-slate-400">(optional)</span>
              </h3>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder={"AWS Certified Solutions Architect — 2024\nGoogle Analytics Certified — 2023\nPMP Certification — PMI"}
                value={data.certifications}
                onChange={e => updateField("certifications", e.target.value)}
                rows={2}
              />
            </CardContent>
          </Card>

          {/* 6. ✅ NEW: LANGUAGES */}
          <Card className="dark:bg-slate-900 dark:border-slate-800">
            <CardHeader className="pb-3">
              <h3 className="font-bold text-sm uppercase text-slate-400 flex items-center gap-2">
                <Globe size={16} /> Languages <span className="text-[10px] normal-case font-normal text-slate-400">(optional)</span>
              </h3>
            </CardHeader>
            <CardContent>
              <Input
                placeholder="English (Native), Hindi (Fluent), French (Basic)"
                value={data.languages}
                onChange={e => updateField("languages", e.target.value)}
              />
            </CardContent>
          </Card>

        </div>

        {/* RIGHT: LIVE PREVIEW */}
        <div className="relative bg-slate-200 dark:bg-slate-700 rounded-2xl overflow-hidden shadow-2xl border-4 border-slate-300 dark:border-slate-600 flex flex-col">
          <div className="bg-slate-800 text-white text-xs py-2.5 px-4 flex justify-between items-center">
            <span className="font-mono opacity-70">Live Preview — {template || "Classic"}</span>
            <Button
              size="sm"
              className="h-7 text-xs bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg px-3"
              onClick={handleDownload}
            >
              <Download size={12} className="mr-1" /> Download PDF
            </Button>
          </div>
          <div className="flex-1 overflow-auto bg-slate-500 p-6 flex justify-center">
            <div className="w-[210mm] min-h-[297mm] bg-white shadow-xl scale-[0.55] origin-top md:scale-[0.75] lg:scale-[0.65] transition-transform">
              <ResumePreview data={data} template={template} />
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
