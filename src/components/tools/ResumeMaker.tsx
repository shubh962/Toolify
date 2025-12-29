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
  if (d.role && d.role.length > 3) s += 10;
  if (d.summary && d.summary.length > 80 && hasVerb(d.summary)) s += 20;
  else if (d.summary && d.summary.length > 50) s += 10;

  const skillCount = d.skills
    ? d.skills.split(",").filter(Boolean).length
    : 0;
  if (skillCount >= 8) s += 15;
  else if (skillCount >= 5) s += 10;

  if (d.experience && d.experience.length > 120 && hasVerb(d.experience)) s += 20;
  else if (d.experience && d.experience.length > 80) s += 10;

  if (d.education) s += 10;
  if (d.projects && hasVerb(d.projects)) s += 5;

  return Math.min(s, 100);
};

/* ======================================================
   STEPS
====================================================== */

const steps = [
  "Contact Info",
  "Professional Profile",
  "Key Skills",
  "Work History",
  "Education",
  "Final Touches",
];

export default function ResumeMaker() {
  const [step, setStep] = useState(0);
  const [jd, setJd] = useState("");

  const [data, setData] = useState({
    name: "",
    role: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    github: "",
    portfolio: "",
    summary: "",
    skills: "",
    experience: "",
    education: "",
    projects: "",
    certifications: "",
    achievements: "",
    languages: "",
  });

  const onChange = (e: any) =>
    setData({ ...data, [e.target.name]: e.target.value });

  const listify = (t: string) =>
    t.split("\n").map(i => i.trim()).filter(Boolean);

  const handlePrint = () => {
    const t = document.title;
    document.title = `${data.name || "Resume"}_2025`;
    window.print();
    document.title = t;
  };

  const ats = calculateATS(data);

  /* ================= AUTO-FIT ================= */
  const summary = limitText(data.summary, 450);
  const skills = limitList(
    data.skills.split(",").map(s => s.trim()).filter(Boolean),
    12
  );
  const experience = limitList(listify(data.experience), 4);
  const projects = limitList(listify(data.projects), 2);
  const certifications = limitList(listify(data.certifications), 3);
  const achievements = limitList(listify(data.achievements), 3);
  const languages = limitList(listify(data.languages), 3);

  return (
    <div className="min-h-screen bg-slate-50/50">
      {/* ================= PRINT CSS (FIXED) ================= */}
      <style jsx global>{`
        /* SCREEN DEFAULT */
        .print-area {
          position: relative;
        }

        @media print {
          @page { size: A4; margin: 0; }
          body * { visibility: hidden; }
          .print-area, .print-area * { visibility: visible; }
          .print-area {
            position: fixed;
            top: 0;
            left: 0;
            width: 210mm;
            height: 297mm;
            padding: 15mm 18mm;
            background: white;
            overflow: hidden;
          }
          .no-print { display: none !important; }
        }
      `}</style>

      {/* ================= HEADER ================= */}
      <header className="no-print bg-white border-b py-4 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-2 rounded-lg">
              <FileText className="text-white" size={20} />
            </div>
            <h1 className="font-black text-xl">
              TASKGURU <span className="text-blue-600">RESUME</span>
            </h1>
          </div>
          <Button onClick={handlePrint} className="bg-green-600">
            <Download size={16} className="mr-2" /> Export PDF
          </Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* ================= BUILDER (ALL TEXT SAME) ================= */}
          <div className="no-print space-y-6">
            <Card className="shadow-lg">
              <CardHeader className="bg-slate-50 border-b">
                <div className="flex justify-between text-xs font-bold uppercase">
                  <span>Step {step + 1} / {steps.length}</span>
                  <span>{steps[step]}</span>
                </div>
                <Progress value={(step / (steps.length - 1)) * 100} />
              </CardHeader>

              <CardContent className="p-6 space-y-4">
                <div className="flex justify-between items-center bg-slate-900 text-white p-4 rounded-xl">
                  <div className="flex items-center gap-3">
                    <Target className="text-blue-400" />
                    <div>
                      <div className="text-[10px] uppercase">ATS Score</div>
                      <div className="text-xl font-black">{ats}%</div>
                    </div>
                  </div>
                  <div className="text-xs italic text-slate-400">
                    {ats >= 80 ? "Job-ready resume" : "Needs improvement"}
                  </div>
                </div>

                {step === 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <Input name="name" placeholder="Full Name" onChange={onChange} className="md:col-span-2" />
                    <Input name="role" placeholder="Professional Title" onChange={onChange} className="md:col-span-2" />
                    <Input name="email" placeholder="Email" onChange={onChange} />
                    <Input name="phone" placeholder="Phone" onChange={onChange} />
                    <Input name="location" placeholder="City, Country" onChange={onChange} />
                    <Input name="linkedin" placeholder="LinkedIn" onChange={onChange} />
                    <Input name="github" placeholder="GitHub" onChange={onChange} />
                    <Input name="portfolio" placeholder="Portfolio" onChange={onChange} />
                  </div>
                )}

                {step === 1 && (
                  <Textarea
                    name="summary"
                    className="h-40"
                    onChange={onChange}
                    placeholder="Results-driven professional with experience in..."
                  />
                )}

                {step === 2 && (
                  <Textarea
                    name="skills"
                    className="h-32"
                    onChange={onChange}
                    placeholder="HTML, CSS, JavaScript, React, Next.js"
                  />
                )}

                {step === 3 && (
                  <Textarea
                    name="experience"
                    className="h-52"
                    onChange={onChange}
                    placeholder="• Developed..."
                  />
                )}

                {step === 4 && (
                  <Textarea
                    name="education"
                    className="h-32"
                    onChange={onChange}
                    placeholder="B.Tech – 2023"
                  />
                )}

                {step === 5 && (
                  <>
                    <Textarea name="projects" placeholder="Projects" onChange={onChange} />
                    <Textarea name="certifications" placeholder="Certifications" onChange={onChange} />
                    <Textarea name="achievements" placeholder="Achievements" onChange={onChange} />
                    <Textarea name="languages" placeholder="Languages" onChange={onChange} />
                  </>
                )}

                <div className="flex gap-3 pt-6 border-t">
                  <Button variant="outline" disabled={step === 0} onClick={() => setStep(step - 1)} className="flex-1">
                    <ArrowLeft size={16} className="mr-2" /> Back
                  </Button>
                  {step < steps.length - 1 ? (
                    <Button onClick={() => setStep(step + 1)} className="flex-1 bg-blue-600">
                      Next <ArrowRight size={16} className="ml-2" />
                    </Button>
                  ) : (
                    <Button onClick={handlePrint} className="flex-1 bg-green-600">
                      <Download size={16} className="mr-2" /> Generate PDF
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* ================= PREVIEW ================= */}
          <div className="print-area bg-white shadow-2xl">
            <div className="border-b-2 border-slate-900 pb-5 mb-6">
              <h1 className="text-4xl font-black uppercase">{data.name || "YOUR NAME"}</h1>
              <h2 className="text-base font-bold uppercase text-blue-600 tracking-widest">
                {data.role || "PROFESSIONAL TITLE"}
              </h2>

              <div className="flex flex-wrap gap-4 text-[11px] mt-4 font-semibold text-slate-600">
                {data.email && <span className="flex gap-1"><Mail size={12} />{data.email}</span>}
                {data.phone && <span className="flex gap-1"><Phone size={12} />{data.phone}</span>}
                {data.location && <span className="flex gap-1"><MapPin size={12} />{data.location}</span>}
                {(data.linkedin || data.github || data.portfolio) && (
                  <span className="flex gap-1"><LinkIcon size={12} />Profile Links</span>
                )}
              </div>
            </div>

            <div className="space-y-5 text-[13px]">
              {summary && <Section title="Professional Summary" text={summary} />}
              {skills.length > 0 && (
                <ListSection title="Core Skills" items={skills} />
              )}
              {experience.length > 0 && (
                <ListSection title="Professional Experience" items={experience} />
              )}
              {projects.length > 0 && (
                <ListSection title="Projects" items={projects} />
              )}
              {data.education && (
                <ListSection title="Education" items={listify(data.education)} />
              )}
              {certifications.length > 0 && (
                <ListSection title="Certifications" items={certifications} />
              )}
              {achievements.length > 0 && (
                <ListSection title="Achievements" items={achievements} />
              )}
              {languages.length > 0 && (
                <ListSection title="Languages" items={languages} />
              )}
            </div>
          </div>
        </div>

        {/* ================= SEO TEXT (UNCHANGED) ================= */}
        <div className="no-print max-w-5xl mx-auto mt-24">
          <h2 className="text-4xl font-black mb-6">
            The Most Advanced Free ATS Resume Maker 2025
          </h2>
          <p>
            TaskGuru Resume Maker helps job seekers create ATS-friendly,
            recruiter-approved resumes in minutes. No graphics, no tables,
            no parsing issues.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ================= HELPERS ================= */

function Section({ title, text }: { title: string; text: string }) {
  return (
    <section>
      <div className="font-black uppercase text-[11px] border-b mb-1">{title}</div>
      <p>{text}</p>
    </section>
  );
}

function ListSection({ title, items }: { title: string; items: string[] }) {
  return (
    <section>
      <div className="font-black uppercase text-[11px] border-b mb-1">{title}</div>
      <ul className="space-y-1">
        {items.map((i, k) => (
          <li key={k} className="flex gap-2">
            <span className="text-blue-600 font-bold">•</span>
            <span>{i}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
