"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  Star
} from "lucide-react";

/* ================= ENHANCED ATS LOGIC ================= */
const calculateATS = (d: any) => {
  let s = 0;
  if (d.name && d.email && d.phone && d.location) s += 20;
  if (d.summary && d.summary.length > 50) s += 15;
  if (d.skills && d.skills.split(',').length > 5) s += 15;
  if (d.experience && d.experience.length > 100) s += 20;
  if (d.education) s += 15;
  if (d.projects) s += 5;
  if (d.certifications) s += 5;
  if (d.linkedin || d.portfolio) s += 5;
  return Math.min(s, 100);
};

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
    name: "", role: "", email: "", phone: "", location: "",
    linkedin: "", github: "", portfolio: "", summary: "",
    skills: "", experience: "", education: "", projects: "",
    certifications: "", achievements: "", languages: "",
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setData({ ...data, [e.target.name]: e.target.value });

  const listify = (t: string) =>
    t.split("\n").map((i) => i.trim()).filter(Boolean);

  const handlePrint = () => {
    const originalTitle = document.title;
    document.title = `${data.name.replace(/\s+/g, '_')}_Resume_2025`;
    window.print();
    document.title = originalTitle;
  };

  const ats = calculateATS(data);

  return (
    <div className="min-h-screen bg-slate-50/50">
      {/* ================= PRINT CSS ================= */}
      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 0; }
          body { background: white !important; -webkit-print-color-adjust: exact; }
          .no-print { display: none !important; }
          .print-area {
            position: fixed;
            top: 0; left: 0;
            width: 210mm;
            height: 297mm;
            padding: 15mm 18mm;
            margin: 0;
            box-sizing: border-box;
            background: white !important;
            z-index: 9999;
            visibility: visible !important;
          }
          body * { visibility: hidden; }
        }
      `}</style>

      {/* ================= HEADER ================= */}
      <header className="no-print bg-white border-b py-4 mb-8 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-2 rounded-lg"><FileText className="text-white" size={20} /></div>
            <h1 className="font-black text-xl tracking-tight">TASKGURU <span className="text-blue-600">RESUME</span></h1>
          </div>
          <div className="flex items-center gap-4">
             <div className="hidden md:flex items-center gap-1 text-yellow-500 font-bold text-sm bg-yellow-50 px-3 py-1 rounded-full border border-yellow-100">
               <Star size={14} fill="currentColor" /> 4.9/5 Rating
             </div>
             <Button onClick={handlePrint} className="bg-green-600 hover:bg-green-700 shadow-md">
               <Download size={16} className="mr-2" /> Export PDF
             </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          {/* ================= BUILDER SIDE ================= */}
          <div className="no-print space-y-6">
            <Card className="shadow-lg border-blue-100 overflow-hidden">
              <CardHeader className="bg-slate-50 border-b pb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold uppercase text-blue-600 tracking-wider">Step {step + 1} of {steps.length}</span>
                  <span className="text-xs font-bold text-slate-500 uppercase">{steps[step]}</span>
                </div>
                <Progress value={(step / (steps.length - 1)) * 100} className="h-2 bg-blue-100" />
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                {/* ATS METER */}
                <div className="flex items-center justify-between bg-slate-900 text-white p-4 rounded-xl mb-4">
                  <div className="flex items-center gap-3">
                    <Target className="text-blue-400" />
                    <div>
                      <div className="text-[10px] uppercase font-bold text-slate-400">ATS Content Score</div>
                      <div className="text-lg font-black">{ats}%</div>
                    </div>
                  </div>
                  <div className="text-[10px] max-w-[120px] text-slate-400 leading-tight italic">
                    {ats < 80 ? "Add more detail to reach 80%+" : "Ready for submission!"}
                  </div>
                </div>

                {/* STEPS */}
                {step === 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <Input name="name" placeholder="Full Name" onChange={onChange} className="md:col-span-2" />
                    <Input name="role" placeholder="Professional Title (e.g. Software Engineer)" onChange={onChange} className="md:col-span-2" />
                    <Input name="email" type="email" placeholder="Email Address" onChange={onChange} />
                    <Input name="phone" placeholder="Phone Number" onChange={onChange} />
                    <Input name="location" placeholder="City, Country" onChange={onChange} />
                    <Input name="linkedin" placeholder="LinkedIn URL" onChange={onChange} />
                    <Input name="github" placeholder="GitHub URL" onChange={onChange} />
                    <Input name="portfolio" placeholder="Portfolio/Website" onChange={onChange} />
                  </div>
                )}

                {step === 1 && (
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase">Professional Summary</label>
                    <Textarea
                      name="summary"
                      className="h-48 text-base leading-relaxed"
                      onChange={onChange}
                      placeholder="High-impact professional with 3+ years of experience in... proven track record of..."
                    />
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase">Skills (Comma Separated)</label>
                    <Textarea
                      name="skills"
                      className="h-40"
                      onChange={onChange}
                      placeholder="React, Next.js, TypeScript, AWS, SQL, Project Management"
                    />
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase">Professional Experience</label>
                    <Textarea
                      name="experience"
                      className="h-60 font-mono text-sm"
                      onChange={onChange}
                      placeholder="[Company Name] | [Job Title] | [Dates]&#10;• Achieved 25% growth by implementing...&#10;• Led a team of 5 developers..."
                    />
                  </div>
                )}

                {step === 4 && (
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase">Education</label>
                    <Textarea
                      name="education"
                      className="h-40"
                      onChange={onChange}
                      placeholder="Bachelor of Science in Computer Science | University Name | 2023"
                    />
                  </div>
                )}

                {step === 5 && (
                  <div className="space-y-4">
                    <Textarea name="projects" placeholder="Notable Projects (Optional)" onChange={onChange} />
                    <Textarea name="certifications" placeholder="Certifications (Optional)" onChange={onChange} />
                    <Textarea name="achievements" placeholder="Achievements/Awards (Optional)" onChange={onChange} />
                    <Textarea name="languages" placeholder="Languages (Optional)" onChange={onChange} />
                  </div>
                )}

                {/* NAV */}
                <div className="flex gap-3 pt-6 border-t mt-6">
                  <Button variant="outline" disabled={step === 0} onClick={() => setStep(step - 1)} className="flex-1">
                    <ArrowLeft size={16} className="mr-2" /> Back
                  </Button>
                  {step < steps.length - 1 ? (
                    <Button onClick={() => setStep(step + 1)} className="flex-1 bg-blue-600 hover:bg-blue-700">
                      Next Step <ArrowRight size={16} className="ml-2" />
                    </Button>
                  ) : (
                    <Button onClick={handlePrint} className="flex-1 bg-green-600 hover:bg-green-700">
                      <Download size={16} className="mr-2" /> Generate PDF
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* JD MATCHER CARD */}
            <Card className="bg-blue-600 text-white shadow-lg overflow-hidden border-none">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle2 size={20} />
                  <h3 className="font-bold">Real-time JD Matcher</h3>
                </div>
                <p className="text-xs text-blue-100 mb-4">Paste the job description below to check keyword alignment.</p>
                <Textarea 
                  value={jd}
                  onChange={(e) => setJd(e.target.value)}
                  placeholder="Paste Job Description here..." 
                  className="bg-blue-700 border-blue-500 placeholder:text-blue-300 text-white text-sm focus:ring-blue-400"
                />
              </CardContent>
            </Card>
          </div>

          {/* ================= PREVIEW SIDE ================= */}
          <div className="flex justify-center lg:block">
            <div className="print-area bg-white shadow-2xl origin-top transition-transform duration-500 scale-[0.8] md:scale-[0.9] lg:scale-100 min-w-[210mm] min-h-[297mm]">
              {/* HEADER */}
              <div className="border-b-2 border-slate-900 pb-5 mb-6">
                <h1 className="text-4xl font-black uppercase tracking-tight text-slate-900">{data.name || "SHUBHAM GAUTAM"}</h1>
                <h2 className="text-base font-bold uppercase text-blue-600 tracking-widest mt-1">{data.role || "Software Engineer"}</h2>
                
                <div className="flex flex-wrap gap-y-1 gap-x-5 text-[11px] mt-4 font-semibold text-slate-600 uppercase tracking-tighter">
                  {data.email && <div className="flex items-center gap-1"><Mail size={12} className="text-blue-600" />{data.email}</div>}
                  {data.phone && <div className="flex items-center gap-1"><Phone size={12} className="text-blue-600" />{data.phone}</div>}
                  {data.location && <div className="flex items-center gap-1"><MapPin size={12} className="text-blue-600" />{data.location}</div>}
                  {(data.linkedin || data.github || data.portfolio) && (
                    <div className="flex items-center gap-1"><LinkIcon size={12} className="text-blue-600" />Profile Links</div>
                  )}
                </div>
              </div>

              {/* BODY */}
              <div className="space-y-6 text-[13px] leading-snug">
                {data.summary && <ResumeSection title="Professional Summary" content={data.summary} />}
                
                {data.skills && (
                  <div className="bg-slate-50 p-4 border border-slate-100">
                    <div className="font-black uppercase text-[11px] text-blue-700 tracking-widest mb-2 border-b border-blue-100 pb-1">Core Competencies</div>
                    <div className="flex flex-wrap gap-2">
                      {data.skills.split(',').map((s, i) => (
                        <span key={i} className="bg-white border px-2 py-0.5 rounded font-bold text-slate-700 text-[10px]">{s.trim()}</span>
                      ))}
                    </div>
                  </div>
                )}

                {data.experience && <ResumeListSection title="Professional Experience" items={listify(data.experience)} />}
                {data.education && <ResumeListSection title="Education" items={listify(data.education)} />}
                
                <div className="grid grid-cols-2 gap-6">
                  {data.projects && <ResumeListSection title="Key Projects" items={listify(data.projects)} />}
                  {data.certifications && <ResumeListSection title="Certifications" items={listify(data.certifications)} />}
                </div>

                <div className="grid grid-cols-2 gap-6">
                  {data.achievements && <ResumeListSection title="Major Achievements" items={listify(data.achievements)} />}
                  {data.languages && <ResumeListSection title="Languages" items={listify(data.languages)} />}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= SEO CONTENT ================= */}
        <div className="no-print max-w-5xl mx-auto mt-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center border-t pt-16">
            <article className="text-slate-700 leading-relaxed">
              <h2 className="text-5xl font-black text-slate-900 mb-6 tracking-tight italic">
                The Most Advanced <span className="text-blue-600 underline">Free ATS</span> Resume Maker 2025
              </h2>
              <p className="text-lg mb-4">
                TaskGuru Resume Maker is engineered for the 2025 job market. Our platform ensures your resume passes through 
                <strong> Applicant Tracking Systems (ATS)</strong> with a 99% parsing success rate.
              </p>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="bg-blue-100 p-2 rounded-lg h-fit text-blue-600 font-bold italic">01</div>
                  <div>
                    <h4 className="font-black text-slate-900 uppercase text-sm">Text-First Architecture</h4>
                    <p className="text-sm">We avoid graphics, tables, and icons that causequalified candidates to be rejected by automated bots.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="bg-blue-100 p-2 rounded-lg h-fit text-blue-600 font-bold italic">02</div>
                  <div>
                    <h4 className="font-black text-slate-900 uppercase text-sm">Single Column Standard</h4>
                    <p className="text-sm">Industry standard layout ensuring a 6-7 second recruiter scan time is used effectively.</p>
                  </div>
                </div>
              </div>
            </article>
            
            <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-2xl">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2"><Target className="text-blue-400" /> FAQ for Job Seekers</h3>
              <div className="space-y-6">
                <div>
                  <h5 className="font-bold text-blue-400">Why use TaskGuru over Canva?</h5>
                  <p className="text-sm text-slate-300">Canva uses flat images/PDFs that ATS cannot read. TaskGuru generates structured text-based A4 PDFs that are 100% searchable.</p>
                </div>
                <div>
                  <h5 className="font-bold text-blue-400">Is my privacy protected?</h5>
                  <p className="text-sm text-slate-300">We do not store your data on any server. Everything is processed locally in your browser memory.</p>
                </div>
                <div className="pt-4 border-t border-slate-700 flex justify-between items-center">
                  <span className="text-xs font-bold uppercase text-slate-500">2025 Update</span>
                  <div className="flex text-yellow-500"><Star size={12} fill="currentColor"/><Star size={12} fill="currentColor"/><Star size={12} fill="currentColor"/><Star size={12} fill="currentColor"/><Star size={12} fill="currentColor"/></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ===== ENHANCED HELPER COMPONENTS ===== */
function ResumeSection({ title, content }: { title: string; content: string }) {
  return (
    <section>
      <div className="font-black uppercase text-[11px] text-slate-900 tracking-widest mb-1.5 border-b-2 border-slate-900 pb-0.5">{title}</div>
      <p className="text-slate-700 leading-[1.4] text-justify">{content}</p>
    </section>
  );
}

function ResumeListSection({ title, items }: { title: string; items: string[] }) {
  return (
    <section>
      <div className="font-black uppercase text-[11px] text-slate-900 tracking-widest mb-1.5 border-b-2 border-slate-900 pb-0.5">{title}</div>
      <ul className="space-y-1.5">
        {items.map((i, k) => (
          <li key={k} className="flex gap-2 text-slate-700 leading-tight">
            <span className="text-blue-600 font-bold">•</span>
            <span>{i}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
