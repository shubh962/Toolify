"use client";

import { useState } from "react";
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

/* ======================================================
   HELPERS
====================================================== */

const limitText = (t: string, max: number) =>
  t.length > max ? t.slice(0, max).trim() + "…" : t;

const limitList = (arr: string[], max: number) => arr.slice(0, max);

const calculateATS = (d: ResumeData) => {
  let s = 0;
  if (d.name && d.email && d.phone && d.location) s += 20;
  if (d.experience.length > 0) s += 20;
  if (d.education.length > 0) s += 20;
  if (d.skills.length > 0) s += 20;
  if (d.summary.length > 50) s += 20;
  return s;
};

/* ======================================================
   TYPES
====================================================== */

type ResumeData = {
  name: string;
  jobTitle: string; // ✅ FIX 1: Added missing jobTitle field
  email: string;
  phone: string;
  location: string;
  website: string;
  summary: string;
  experience: { role: string; company: string; duration: string; details: string }[];
  education: { degree: string; school: string; year: string }[];
  skills: string[];
  skillsRaw: string; // ✅ FIX 5: Controlled value for skills input
};

const INITIAL_DATA: ResumeData = {
  name: "",
  jobTitle: "",
  email: "",
  phone: "",
  location: "",
  website: "",
  summary: "",
  experience: [],
  education: [],
  skills: [],
  skillsRaw: "",
};

/* ======================================================
   ✅ FIX 6: BriefcaseIcon moved to top — no hoisting issues
====================================================== */
function BriefcaseIcon({ size }: { size: number }) {
  return <Award size={size} />;
}

/* ======================================================
   RESUME PREVIEW
====================================================== */
function ResumePreview({ data, template }: { data: ResumeData; template: string | null }) {
  if (template === "classic" || !template) {
    return (
      <div id="resume-preview" className="bg-white text-black p-10 h-full shadow-inner overflow-y-auto text-left font-serif">
        <header className="border-b-2 border-gray-800 pb-4 mb-6">
          <h1 className="text-3xl font-bold uppercase tracking-widest">
            {limitText(data.name || "YOUR NAME", 40)}
          </h1>
          {/* ✅ FIX 1: jobTitle now shows in preview */}
          {data.jobTitle && (
            <p className="text-sm font-semibold text-gray-600 mt-1">{data.jobTitle}</p>
          )}
          <div className="flex flex-wrap gap-3 text-sm mt-2 text-gray-600">
            {data.email && <span className="flex items-center gap-1"><Mail size={12} /> {data.email}</span>}
            {data.phone && <span className="flex items-center gap-1"><Phone size={12} /> {data.phone}</span>}
            {data.location && <span className="flex items-center gap-1"><MapPin size={12} /> {data.location}</span>}
            {data.website && <span className="flex items-center gap-1"><LinkIcon size={12} /> {data.website}</span>}
          </div>
        </header>

        {data.summary && (
          <section className="mb-6">
            <h3 className="font-bold border-b border-gray-300 mb-2 uppercase text-sm">Professional Summary</h3>
            <p className="text-sm leading-relaxed">{limitText(data.summary, 400)}</p>
          </section>
        )}

        {data.experience.length > 0 && (
          <section className="mb-6">
            <h3 className="font-bold border-b border-gray-300 mb-2 uppercase text-sm">Experience</h3>
            <div className="space-y-4">
              {limitList(data.experience, 3).map((exp, i) => (
                <div key={i}>
                  <div className="flex justify-between font-bold text-sm">
                    <span>{exp.role}</span>
                    <span>{exp.duration}</span>
                  </div>
                  <div className="text-sm italic mb-1">{exp.company}</div>
                  <p className="text-xs text-gray-700 whitespace-pre-line">{limitText(exp.details, 200)}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {data.education.length > 0 && (
          <section className="mb-6">
            <h3 className="font-bold border-b border-gray-300 mb-2 uppercase text-sm">Education</h3>
            <div className="space-y-2">
              {limitList(data.education, 2).map((edu, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <div><span className="font-bold">{edu.degree}</span>, {edu.school}</div>
                  <span>{edu.year}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {data.skills.length > 0 && (
          <section>
            <h3 className="font-bold border-b border-gray-300 mb-2 uppercase text-sm">Core Skills</h3>
            <div className="flex flex-wrap gap-2 text-sm">
              {limitList(data.skills, 10).map((skill, i) => (
                <span key={i} className="bg-gray-100 px-2 py-1 rounded text-xs border border-gray-200">{skill}</span>
              ))}
            </div>
          </section>
        )}
      </div>
    );
  }

  // Modern Layout
  return (
    <div id="resume-preview" className="bg-white text-slate-800 p-0 h-full shadow-inner overflow-y-auto text-left font-sans flex flex-col">
      <header className="bg-slate-900 text-white p-8">
        <h1 className="text-4xl font-black tracking-tight mb-1">
          {limitText(data.name || "YOUR NAME", 40)}
        </h1>
        {/* ✅ FIX 1: jobTitle in modern template */}
        {data.jobTitle && (
          <p className="text-blue-300 text-sm font-semibold mb-2">{data.jobTitle}</p>
        )}
        <p className="opacity-80 text-sm max-w-md">{limitText(data.summary, 150)}</p>
      </header>

      <div className="p-8 grid grid-cols-3 gap-8 flex-grow">
        <div className="col-span-2 space-y-6">
          {data.experience.length > 0 && (
            <section>
              <h3 className="font-bold text-slate-900 uppercase tracking-wider text-xs border-b-2 border-blue-500 mb-3 pb-1">Experience</h3>
              <div className="space-y-4">
                {limitList(data.experience, 3).map((exp, i) => (
                  <div key={i}>
                    <h4 className="font-bold text-sm">{exp.role}</h4>
                    <p className="text-xs text-blue-600 font-bold mb-1">{exp.company} | {exp.duration}</p>
                    <p className="text-xs text-slate-600 leading-relaxed">{limitText(exp.details, 200)}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
          {data.education.length > 0 && (
            <section>
              <h3 className="font-bold text-slate-900 uppercase tracking-wider text-xs border-b-2 border-blue-500 mb-3 pb-1">Education</h3>
              {limitList(data.education, 2).map((edu, i) => (
                <div key={i} className="mb-2">
                  <div className="font-bold text-sm">{edu.school}</div>
                  <div className="text-xs text-slate-500">{edu.degree} — {edu.year}</div>
                </div>
              ))}
            </section>
          )}
        </div>

        <div className="col-span-1 bg-slate-50 p-4 -my-8 -mr-8 border-l">
          <div className="mt-8 space-y-6">
            <section>
              <h3 className="font-bold text-slate-900 uppercase tracking-wider text-xs mb-3">Contact</h3>
              <div className="space-y-2 text-xs text-slate-600 break-words">
                {data.email && <div><Mail size={10} className="inline mr-1" /> {data.email}</div>}
                {data.phone && <div><Phone size={10} className="inline mr-1" /> {data.phone}</div>}
                {data.location && <div><MapPin size={10} className="inline mr-1" /> {data.location}</div>}
                {data.website && <div><LinkIcon size={10} className="inline mr-1" /> {data.website}</div>}
              </div>
            </section>
            {data.skills.length > 0 && (
              <section>
                <h3 className="font-bold text-slate-900 uppercase tracking-wider text-xs mb-3">Skills</h3>
                <div className="flex flex-wrap gap-1">
                  {limitList(data.skills, 8).map((skill, i) => (
                    <span key={i} className="bg-white border px-2 py-1 rounded text-[10px] font-bold text-slate-700">{skill}</span>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ======================================================
   MAIN COMPONENT
====================================================== */

export default function ResumeMaker({ template }: { template: string | null }) {
  const [data, setData] = useState<ResumeData>(INITIAL_DATA);
  const [atsScore, setAtsScore] = useState(0);

  const updateField = (field: keyof ResumeData, value: any) => {
    const newData = { ...data, [field]: value };
    setData(newData);
    setAtsScore(calculateATS(newData));
  };

  const addExperience = () => {
    if (data.experience.length >= 3) return;
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

  const addEducation = () => {
    if (data.education.length >= 2) return;
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

  // ✅ FIX 4: Print only #resume-preview using print styles
  const handleDownload = () => {
    const el = document.getElementById("resume-preview");
    if (!el) return;
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;
    printWindow.document.write(`
      <html>
        <head>
          <title>Resume — TaskGuru</title>
          <style>
            body { margin: 0; font-family: serif; }
            @page { size: A4; margin: 0; }
          </style>
        </head>
        <body>${el.outerHTML}</body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-20">

      {/* HEADER + ATS SCORE */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <FileText className="text-blue-600" /> Resume Editor
          </h2>
          <p className="text-slate-500">Real-time ATS check enabled. Fill in the fields below.</p>
        </div>
        <Card className="w-full md:w-80 border-2 border-blue-100 bg-blue-50/50">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="h-14 w-14 flex items-center justify-center bg-white rounded-full shadow-sm border border-blue-100 font-black text-blue-600 text-lg flex-shrink-0">
              {atsScore}%
            </div>
            <div className="flex-1">
              <div className="text-xs font-bold uppercase text-blue-400 mb-1">ATS Strength</div>
              <Progress value={atsScore} className="h-2 bg-blue-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 h-[calc(100vh-200px)] min-h-[800px]">

        {/* LEFT: EDITOR */}
        <div className="space-y-6 overflow-y-auto pr-2 pb-20">

          {/* 1. PERSONAL INFO */}
          <Card>
            <CardHeader className="pb-3">
              <h3 className="font-bold text-sm uppercase text-slate-400 flex items-center gap-2">
                <Target size={16} /> Personal Details
              </h3>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input
                  placeholder="Full Name"
                  value={data.name}
                  onChange={e => updateField("name", e.target.value)}
                />
                {/* ✅ FIX 1: Job Title is now controlled */}
                <Input
                  placeholder="Job Title (e.g. Developer)"
                  value={data.jobTitle}
                  onChange={e => updateField("jobTitle", e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  placeholder="Email"
                  value={data.email}
                  onChange={e => updateField("email", e.target.value)}
                />
                <Input
                  placeholder="Phone"
                  value={data.phone}
                  onChange={e => updateField("phone", e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  placeholder="Location (City, Country)"
                  value={data.location}
                  onChange={e => updateField("location", e.target.value)}
                />
                <Input
                  placeholder="Website / LinkedIn"
                  value={data.website}
                  onChange={e => updateField("website", e.target.value)}
                />
              </div>
              <Textarea
                placeholder="Professional Summary (Keep it punchy — 3 to 4 sentences)"
                value={data.summary}
                onChange={e => updateField("summary", e.target.value)}
                rows={3}
              />
            </CardContent>
          </Card>

          {/* 2. EXPERIENCE */}
          <Card>
            <CardHeader className="pb-3 flex flex-row justify-between items-center">
              <h3 className="font-bold text-sm uppercase text-slate-400 flex items-center gap-2">
                <BriefcaseIcon size={16} /> Work Experience
              </h3>
              <Button
                variant="ghost" size="sm"
                onClick={addExperience}
                disabled={data.experience.length >= 3}
              >
                + Add
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              {data.experience.map((exp, i) => (
                <div key={i} className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-400 uppercase">Position {i + 1}</span>
                    <Button
                      variant="ghost" size="sm"
                      onClick={() => removeExperience(i)}
                      className="text-red-400 hover:text-red-600 h-6 text-xs"
                    >
                      Remove
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      placeholder="Job Role"
                      value={exp.role}
                      onChange={e => updateExperience(i, "role", e.target.value)}
                    />
                    <Input
                      placeholder="Company Name"
                      value={exp.company}
                      onChange={e => updateExperience(i, "company", e.target.value)}
                    />
                  </div>
                  <Input
                    placeholder="Duration (e.g. 2020 - Present)"
                    value={exp.duration}
                    onChange={e => updateExperience(i, "duration", e.target.value)}
                  />
                  <Textarea
                    placeholder="Achievements — use action verbs like 'Led', 'Built', 'Improved'"
                    value={exp.details}
                    onChange={e => updateExperience(i, "details", e.target.value)}
                    rows={2}
                  />
                </div>
              ))}
              {data.experience.length === 0 && (
                <p className="text-sm text-slate-400 italic text-center py-4">
                  No experience added yet. Click + Add above.
                </p>
              )}
            </CardContent>
          </Card>

          {/* ✅ FIX 2: Education section with working + Add button */}
          <Card>
            <CardHeader className="pb-3 flex flex-row justify-between items-center">
              <h3 className="font-bold text-sm uppercase text-slate-400 flex items-center gap-2">
                <BookOpen size={16} /> Education
              </h3>
              <Button
                variant="ghost" size="sm"
                onClick={addEducation}
                disabled={data.education.length >= 2}
              >
                + Add
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              {data.education.map((edu, i) => (
                <div key={i} className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-400 uppercase">Degree {i + 1}</span>
                    <Button
                      variant="ghost" size="sm"
                      onClick={() => removeEducation(i)}
                      className="text-red-400 hover:text-red-600 h-6 text-xs"
                    >
                      Remove
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      placeholder="Degree / Qualification"
                      value={edu.degree}
                      onChange={e => updateEducation(i, "degree", e.target.value)}
                    />
                    <Input
                      placeholder="School / University"
                      value={edu.school}
                      onChange={e => updateEducation(i, "school", e.target.value)}
                    />
                  </div>
                  <Input
                    placeholder="Year (e.g. 2018 - 2022)"
                    value={edu.year}
                    onChange={e => updateEducation(i, "year", e.target.value)}
                  />
                </div>
              ))}
              {data.education.length === 0 && (
                <p className="text-sm text-slate-400 italic text-center py-4">
                  No education added yet. Click + Add above.
                </p>
              )}
            </CardContent>
          </Card>

          {/* 3. SKILLS */}
          <Card>
            <CardHeader className="pb-3">
              <h3 className="font-bold text-sm uppercase text-slate-400 flex items-center gap-2">
                <Zap size={16} /> Key Skills
              </h3>
            </CardHeader>
            <CardContent>
              {/* ✅ FIX 5: Controlled value — stays in sync on reset */}
              <Input
                placeholder="Add skills separated by comma (React, SEO, Marketing...)"
                value={data.skillsRaw}
                onChange={e => {
                  updateField("skillsRaw", e.target.value);
                  updateField("skills", e.target.value.split(",").map(s => s.trim()).filter(Boolean));
                }}
              />
              <div className="flex flex-wrap gap-2 mt-3">
                {limitList(data.skills, 10).map((s, i) => s.trim() && (
                  <span key={i} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-md font-bold">{s}</span>
                ))}
              </div>
            </CardContent>
          </Card>

        </div>

        {/* RIGHT: LIVE PREVIEW */}
        <div className="relative bg-slate-200 rounded-xl overflow-hidden shadow-2xl border-4 border-slate-300 flex flex-col">
          <div className="bg-slate-800 text-white text-xs py-2 px-4 flex justify-between items-center">
            <span className="font-mono opacity-70">Live Preview: {template || "Classic"} Mode</span>
            <Button size="sm" variant="secondary" className="h-6 text-xs" onClick={handleDownload}>
              <Download size={12} className="mr-1" /> Download PDF
            </Button>
          </div>
          <div className="flex-1 overflow-auto bg-slate-500 p-8 flex justify-center">
            <div className="w-[210mm] min-h-[297mm] bg-white shadow-xl scale-[0.6] origin-top md:scale-[0.85] transition-transform">
              <ResumePreview data={data} template={template} />
            </div>
          </div>
        </div>

      </div>

      {/* ✅ FIX 7: SEO article section added */}
      <article className="max-w-4xl mx-auto space-y-14 border-t pt-16 text-slate-600 dark:text-slate-400 leading-relaxed">

        <section className="space-y-5">
          <h2 className="text-3xl font-black text-slate-900 dark:text-white">
            Free Online Resume Builder — ATS-Optimized
          </h2>
          <p className="text-lg">
            Creating a resume that passes <strong>Applicant Tracking Systems (ATS)</strong> is
            one of the most critical steps in a modern job search. Most companies today use
            automated software to scan and filter resumes before a human ever reads them.
            TaskGuru&apos;s Resume Maker is designed from the ground up to help your resume
            pass these filters and land in front of hiring managers.
          </p>
          <p>
            Unlike complicated desktop software or subscription-based platforms, our builder
            works entirely in your browser — no sign-up, no credit card, and no watermarks
            on your downloaded PDF.
          </p>
        </section>

        <section className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: <ShieldCheck className="w-8 h-8 text-blue-600" />,
              title: "ATS-Safe Templates",
              desc: "Our Classic template uses single-column, clean formatting that all major ATS systems can parse correctly — no tables, no text boxes.",
            },
            {
              icon: <Zap className="w-8 h-8 text-yellow-500" />,
              title: "Real-Time Score",
              desc: "The ATS score updates as you type, telling you exactly what sections are missing so you can hit 100% before applying.",
            },
            {
              icon: <Globe className="w-8 h-8 text-green-600" />,
              title: "100% Private",
              desc: "Your resume data stays in your browser. Nothing is sent to any server. Download your PDF directly from the preview.",
            },
          ].map((item) => (
            <div key={item.title} className="p-6 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl space-y-3">
              {item.icon}
              <h3 className="font-black text-slate-900 dark:text-white">{item.title}</h3>
              <p className="text-sm">{item.desc}</p>
            </div>
          ))}
        </section>

        <section className="space-y-5">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            How to Write an ATS-Friendly Resume
          </h2>
          <div className="space-y-4">
            {[
              { n: "1", title: "Use a clean, single-column layout", desc: "Avoid tables, text boxes, columns, headers/footers, and graphics. ATS parsers read left-to-right, top-to-bottom." },
              { n: "2", title: "Mirror keywords from the job description", desc: "Identify 5–10 keywords from the job posting and use them naturally in your summary, skills, and experience sections." },
              { n: "3", title: "Use standard section headings", desc: "Stick to: Work Experience, Education, Skills, Summary. Avoid creative headings like 'My Journey' or 'What I Do'." },
              { n: "4", title: "Start bullet points with action verbs", desc: "Led, Built, Managed, Developed, Improved — these signal achievement and are highly weighted by both ATS and human reviewers." },
            ].map((tip) => (
              <div key={tip.n} className="flex gap-4">
                <div className="h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold flex-shrink-0 text-sm">
                  {tip.n}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white mb-1">{tip.title}</h4>
                  <p className="text-sm">{tip.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-5">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-blue-600" /> Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {[
              {
                q: "Is this resume builder completely free?",
                a: "Yes — completely free with no hidden fees, no sign-up required, and no watermarks on the downloaded PDF.",
              },
              {
                q: "Will my resume data be stored or shared?",
                a: "No. Your resume data exists only in your browser's memory. When you close the tab, nothing is saved to any server.",
              },
              {
                q: "Which template should I use — Classic or Modern?",
                a: "For most corporate job applications, use the Classic template. It is fully ATS-compatible. The Modern template is better for creative roles like design, marketing, or startups where visual appeal matters.",
              },
              {
                q: "How do I download my resume as a PDF?",
                a: "Click the 'Download PDF' button in the preview panel. A print dialog will open — select 'Save as PDF' from your printer options. We recommend saving at A4 size with no margins.",
              },
              {
                q: "What is an ATS score and why does it matter?",
                a: "ATS (Applicant Tracking System) is software used by 98% of Fortune 500 companies to filter resumes. A higher ATS score means your resume has all the key sections filled in, improving your chances of passing the initial automated screen.",
              },
            ].map((faq, i) => (
              <details
                key={i}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 cursor-pointer group"
              >
                <summary className="font-bold text-slate-900 dark:text-white list-none flex justify-between items-center">
                  {faq.q}
                  <HelpCircle className="w-4 h-4 text-slate-400 flex-shrink-0 ml-2" />
                </summary>
                <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="space-y-5 border-t border-slate-100 dark:border-slate-800 pt-10">
          <h3 className="text-xl font-black text-slate-900 dark:text-white">Related Free Tools</h3>
          <div className="flex flex-wrap gap-3">
            {[
              { label: "PDF to Word Converter", href: "/tools/pdf-to-word" },
              { label: "Image to Text (OCR)", href: "/tools/image-to-text" },
              { label: "AI Text Paraphraser", href: "/tools/text-paraphraser" },
              { label: "Merge PDF Files", href: "/tools/merge-pdf" },
            ].map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="px-4 py-2 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 text-blue-600 dark:text-blue-400 rounded-full text-sm font-semibold hover:bg-blue-100 transition-colors"
              >
                {tool.label} →
              </Link>
            ))}
          </div>
        </section>

      </article>
    </div>
  );
}
