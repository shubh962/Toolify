"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  ArrowRight,
  Download,
  Mail,
  Phone,
  MapPin,
  Link as LinkIcon,
  CheckCircle2,
  Target,
  FileText,
  Star,
  Zap,
  ShieldCheck,
  Award
} from "lucide-react";

/* ======================================================
   JOB-READY ATS + AUTO-FIT LOGIC (FINAL)
====================================================== */

const ACTION_VERBS = [
  "developed","built","designed","implemented","optimized","improved",
  "created","managed","tested","deployed","collaborated","automated",
  "analyzed","maintained","led","supported"
];

const hasVerb = (t: string) =>
  ACTION_VERBS.some(v => t.toLowerCase().includes(v));

const limitText = (t: string, max: number) =>
  t.length > max ? t.slice(0, max).trim() + "…" : t;

const limitList = (arr: string[], max: number) => arr.slice(0, max);

const calculateATS = (d: any) => {
  let s = 0;
  if (d.name && d.email && d.phone && d.location) s += 20;
  if (d.experience.length > 0) s += 20;
  if (d.education.length > 0) s += 20;
  if (d.skills.length > 0) s += 20;
  if (d.summary.length > 50) s += 20;
  return s;
};

/* ======================================================
   TEMPLATES & TYPES
====================================================== */

type ResumeData = {
  name: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  summary: string;
  experience: { role: string; company: string; duration: string; details: string }[];
  education: { degree: string; school: string; year: string }[];
  skills: string[];
};

const INITIAL_DATA: ResumeData = {
  name: "",
  email: "",
  phone: "",
  location: "",
  website: "",
  summary: "",
  experience: [],
  education: [],
  skills: [],
};

// --- PREVIEW COMPONENT ---
function ResumePreview({ data, template }: { data: ResumeData; template: string | null }) {
  // Simple "Classic" Layout (ATS Safe)
  if (template === "classic" || !template) {
    return (
      <div id="resume-preview" className="bg-white text-black p-10 h-full shadow-inner overflow-y-auto text-left font-serif">
        <header className="border-b-2 border-gray-800 pb-4 mb-6">
          <h1 className="text-3xl font-bold uppercase tracking-widest">{limitText(data.name || "YOUR NAME", 40)}</h1>
          <div className="flex flex-wrap gap-3 text-sm mt-2 text-gray-600">
            {data.email && <span className="flex items-center gap-1"><Mail size={12}/> {data.email}</span>}
            {data.phone && <span className="flex items-center gap-1"><Phone size={12}/> {data.phone}</span>}
            {data.location && <span className="flex items-center gap-1"><MapPin size={12}/> {data.location}</span>}
            {data.website && <span className="flex items-center gap-1"><LinkIcon size={12}/> {data.website}</span>}
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
                  <div>
                    <span className="font-bold">{edu.degree}</span>, {edu.school}
                  </div>
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

  // "Modern" Layout (Blue Accents)
  return (
    <div id="resume-preview" className="bg-white text-slate-800 p-0 h-full shadow-inner overflow-y-auto text-left font-sans flex flex-col h-full">
       <header className="bg-slate-900 text-white p-8">
          <h1 className="text-4xl font-black tracking-tight mb-2">{limitText(data.name || "YOUR NAME", 40)}</h1>
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
                      {data.email && <div><Mail size={10} className="inline mr-1"/> {data.email}</div>}
                      {data.phone && <div><Phone size={10} className="inline mr-1"/> {data.phone}</div>}
                      {data.location && <div><MapPin size={10} className="inline mr-1"/> {data.location}</div>}
                      {data.website && <div><LinkIcon size={10} className="inline mr-1"/> {data.website}</div>}
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

  // --- HANDLERS ---
  const updateField = (field: keyof ResumeData, value: any) => {
    const newData = { ...data, [field]: value };
    setData(newData);
    setAtsScore(calculateATS(newData));
  };

  const addExperience = () => {
    if (data.experience.length >= 3) return; // Limit
    updateField("experience", [...data.experience, { role: "", company: "", duration: "", details: "" }]);
  };

  const updateExperience = (index: number, field: string, val: string) => {
    const newExp = [...data.experience];
    (newExp[index] as any)[field] = val;
    updateField("experience", newExp);
  };

  const addEducation = () => {
    if (data.education.length >= 2) return; // Limit
    updateField("education", [...data.education, { degree: "", school: "", year: "" }]);
  };

  const updateEducation = (index: number, field: string, val: string) => {
    const newEdu = [...data.education];
    (newEdu[index] as any)[field] = val;
    updateField("education", newEdu);
  };

  const handleDownload = () => {
     window.print(); // Simple print to PDF for now
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      
      {/* HEADER + ATS SCORE */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-6">
         <div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2">
               <FileText className="text-blue-600"/> Resume Editor
            </h2>
            <p className="text-slate-500">Real-time ATS check enabled. Fill in the fields below.</p>
         </div>
         <Card className="w-full md:w-80 border-2 border-blue-100 bg-blue-50/50">
            <CardContent className="p-4 flex items-center gap-4">
               <div className="relative h-14 w-14 flex items-center justify-center bg-white rounded-full shadow-sm border border-blue-100 font-black text-blue-600 text-lg">
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
        
        {/* === LEFT: EDITOR === */}
        <div className="space-y-6 overflow-y-auto pr-2 custom-scrollbar pb-20">
          
          {/* 1. PERSONAL INFO */}
          <Card>
            <CardHeader className="pb-3"><h3 className="font-bold text-sm uppercase text-slate-400 flex items-center gap-2"><Target size={16}/> Personal Details</h3></CardHeader>
            <CardContent className="space-y-4">
               <div className="grid grid-cols-2 gap-4">
                  <Input placeholder="Full Name" value={data.name} onChange={e => updateField("name", e.target.value)} />
                  <Input placeholder="Job Title (e.g. Developer)" />
               </div>
               <div className="grid grid-cols-2 gap-4">
                  <Input placeholder="Email" value={data.email} onChange={e => updateField("email", e.target.value)} />
                  <Input placeholder="Phone" value={data.phone} onChange={e => updateField("phone", e.target.value)} />
               </div>
               <div className="grid grid-cols-2 gap-4">
                  <Input placeholder="Location (City, Country)" value={data.location} onChange={e => updateField("location", e.target.value)} />
                  <Input placeholder="Website / LinkedIn" value={data.website} onChange={e => updateField("website", e.target.value)} />
               </div>
               <Textarea placeholder="Professional Summary (Keep it punchy...)" value={data.summary} onChange={e => updateField("summary", e.target.value)} rows={3} />
            </CardContent>
          </Card>

          {/* 2. EXPERIENCE */}
          <Card>
            <CardHeader className="pb-3 flex flex-row justify-between items-center">
               <h3 className="font-bold text-sm uppercase text-slate-400 flex items-center gap-2"><BriefcaseIcon size={16}/> Work Experience</h3>
               <Button variant="ghost" size="sm" onClick={addExperience} disabled={data.experience.length >= 3}>+ Add</Button>
            </CardHeader>
            <CardContent className="space-y-6">
               {data.experience.map((exp, i) => (
                  <div key={i} className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-3">
                     <div className="grid grid-cols-2 gap-3">
                        <Input placeholder="Job Role" value={exp.role} onChange={e => updateExperience(i, "role", e.target.value)} />
                        <Input placeholder="Company Name" value={exp.company} onChange={e => updateExperience(i, "company", e.target.value)} />
                     </div>
                     <Input placeholder="Duration (e.g. 2020 - Present)" value={exp.duration} onChange={e => updateExperience(i, "duration", e.target.value)} />
                     <Textarea placeholder="Achievements (Use action verbs like 'Led', 'Built')" value={exp.details} onChange={e => updateExperience(i, "details", e.target.value)} rows={2} />
                  </div>
               ))}
               {data.experience.length === 0 && <p className="text-sm text-slate-400 italic text-center py-4">No experience added yet.</p>}
            </CardContent>
          </Card>

          {/* 3. SKILLS */}
          <Card>
             <CardHeader className="pb-3"><h3 className="font-bold text-sm uppercase text-slate-400 flex items-center gap-2"><Zap size={16}/> Key Skills</h3></CardHeader>
             <CardContent>
                <Input 
                   placeholder="Add skills separated by comma (React, SEO, Marketing...)" 
                   onChange={e => updateField("skills", e.target.value.split(","))} 
                />
                <div className="flex flex-wrap gap-2 mt-3">
                   {limitList(data.skills, 10).map((s, i) => s.trim() && (
                      <span key={i} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-md font-bold">{s}</span>
                   ))}
                </div>
             </CardContent>
          </Card>

        </div>

        {/* === RIGHT: LIVE PREVIEW === */}
        <div className="relative bg-slate-200 rounded-xl overflow-hidden shadow-2xl border-4 border-slate-300 flex flex-col">
            <div className="bg-slate-800 text-white text-xs py-2 px-4 flex justify-between items-center">
               <span className="font-mono opacity-70">Live Preview: {template || "Classic"} Mode</span>
               <div className="flex gap-2">
                  <Button size="sm" variant="secondary" className="h-6 text-xs" onClick={handleDownload}>
                     <Download size={12} className="mr-1"/> Download PDF
                  </Button>
               </div>
            </div>
            <div className="flex-1 overflow-auto bg-slate-500 p-8 flex justify-center">
               <div className="w-[210mm] min-h-[297mm] bg-white shadow-xl scale-[0.6] origin-top md:scale-[0.85] transition-transform">
                  <ResumePreview data={data} template={template} />
               </div>
            </div>
        </div>

      </div>
    </div>
  );
}

function BriefcaseIcon({ size }: { size: number }) {
  return <Award size={size} />;
              }
