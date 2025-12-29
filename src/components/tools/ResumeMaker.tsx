"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  ArrowRight,
  Download,
  Mail,
  Phone,
  MapPin,
  Link as LinkIcon,
} from "lucide-react";

/* ================= ATS SCORE ================= */
const atsScore = (d: any) => {
  let s = 0;
  if (d.name && d.email && d.phone) s += 20;
  if (d.summary) s += 15;
  if (d.skills) s += 15;
  if (d.experience) s += 20;
  if (d.education) s += 10;
  if (d.projects) s += 5;
  if (d.certifications) s += 5;
  if (d.achievements) s += 5;
  if (d.languages) s += 5;
  return Math.min(s, 100);
};

const steps = [
  "Personal Details",
  "Professional Summary",
  "Skills",
  "Experience",
  "Education",
  "Optional Sections",
];

export default function ResumeMaker() {
  const [step, setStep] = useState(0);
  const [d, setD] = useState({
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
    setD({ ...d, [e.target.name]: e.target.value });

  const list = (t: string) =>
    t.split("\n").map((i) => i.trim()).filter(Boolean);

  const printPDF = () => {
    document.title = `${d.name || "Resume"}`;
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 bg-white text-slate-900">
      {/* ================= PRINT LOCK ================= */}
      <style jsx global>{`
        @media print {
          @page {
            size: A4;
            margin: 0;
          }
          html,
          body {
            width: 210mm;
            height: 297mm;
            margin: 0;
            overflow: hidden;
          }
          body * {
            visibility: hidden;
          }
          .print-area,
          .print-area * {
            visibility: visible;
          }
          .print-area {
            position: absolute;
            left: 0;
            top: 0;
            width: 210mm;
            height: 297mm;
            padding: 18mm;
            box-sizing: border-box;
            overflow: hidden;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      {/* ================= BUILDER ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* FORM */}
        <Card className="no-print shadow-xl">
          <CardContent className="p-6 space-y-4">
            <div className="font-bold text-blue-600">
              Step {step + 1}/{steps.length} – {steps[step]}
            </div>

            <div className="text-sm font-semibold">
              ATS Score: {atsScore(d)}%
            </div>

            {step === 0 && (
              <>
                <Input name="name" placeholder="Full Name" onChange={onChange} />
                <Input name="role" placeholder="Professional Title" onChange={onChange} />
                <Input name="email" placeholder="Email" onChange={onChange} />
                <Input name="phone" placeholder="Phone" onChange={onChange} />
                <Input name="location" placeholder="City, Country" onChange={onChange} />
                <Input name="linkedin" placeholder="LinkedIn (optional)" onChange={onChange} />
                <Input name="github" placeholder="GitHub (optional)" onChange={onChange} />
                <Input name="portfolio" placeholder="Portfolio (optional)" onChange={onChange} />
              </>
            )}

            {step === 1 && (
              <Textarea
                name="summary"
                className="h-40"
                onChange={onChange}
                placeholder="Results-driven professional with hands-on experience in modern technologies, problem-solving, and delivering business-ready solutions. Seeking to contribute skills to a growth-oriented organization."
              />
            )}

            {step === 2 && (
              <Textarea
                name="skills"
                className="h-32"
                onChange={onChange}
                placeholder="HTML, CSS, JavaScript, React, Next.js, Node.js"
              />
            )}

            {step === 3 && (
              <Textarea
                name="experience"
                className="h-40"
                onChange={onChange}
                placeholder="• Built responsive applications
• Improved performance by 30%"
              />
            )}

            {step === 4 && (
              <Textarea
                name="education"
                className="h-32"
                onChange={onChange}
                placeholder="B.Tech in Information Technology – 2023"
              />
            )}

            {step === 5 && (
              <>
                <Textarea name="projects" placeholder="Projects (optional)" onChange={onChange} />
                <Textarea name="certifications" placeholder="Certifications (optional)" onChange={onChange} />
                <Textarea name="achievements" placeholder="Achievements (optional)" onChange={onChange} />
                <Textarea name="languages" placeholder="Languages (optional)" onChange={onChange} />
              </>
            )}

            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                disabled={step === 0}
                onClick={() => setStep(step - 1)}
                className="flex-1"
              >
                <ArrowLeft size={16} className="mr-2" /> Back
              </Button>

              {step < steps.length - 1 ? (
                <Button onClick={() => setStep(step + 1)} className="flex-1 bg-blue-600">
                  Next <ArrowRight size={16} className="ml-2" />
                </Button>
              ) : (
                <Button onClick={printPDF} className="flex-1 bg-green-600">
                  <Download size={16} className="mr-2" /> Download PDF
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* RESUME */}
        <div className="print-area shadow-xl">
          <div className="border-b-2 border-black pb-3 mb-4">
            <h1 className="text-3xl font-extrabold uppercase">{d.name || "YOUR NAME"}</h1>
            <h2 className="text-sm uppercase text-blue-600">{d.role}</h2>
          </div>

          <div className="flex flex-wrap gap-3 text-xs mb-4">
            {d.email && <span className="flex gap-1"><Mail size={12} />{d.email}</span>}
            {d.phone && <span className="flex gap-1"><Phone size={12} />{d.phone}</span>}
            {d.location && <span className="flex gap-1"><MapPin size={12} />{d.location}</span>}
            {(d.linkedin || d.github || d.portfolio) && (
              <span className="flex gap-1"><LinkIcon size={12} />Links</span>
            )}
          </div>

          <div className="space-y-3 text-sm">
            {d.summary && <Section title="Summary" text={d.summary} />}
            {d.skills && <Section title="Skills" text={d.skills} />}
            {d.experience && <ListSection title="Experience" items={list(d.experience)} />}
            {d.projects && <ListSection title="Projects" items={list(d.projects)} />}
            {d.education && <ListSection title="Education" items={list(d.education)} />}
            {d.certifications && <ListSection title="Certifications" items={list(d.certifications)} />}
            {d.achievements && <ListSection title="Achievements" items={list(d.achievements)} />}
            {d.languages && <ListSection title="Languages" items={list(d.languages)} />}
          </div>
        </div>
      </div>

      {/* ================= SEO CONTENT ================= */}
      <article className="no-print max-w-5xl mx-auto mt-24 text-slate-700 leading-relaxed">
        <h2 className="text-4xl font-black mb-6">
          Free ATS Resume Maker – Create a Job-Winning Resume in 2025
        </h2>

        <p>
          TaskGuru Resume Maker is a professional, ATS-optimized online tool
          designed to help job seekers create clean, recruiter-friendly resumes
          without design complexity. Unlike traditional resume builders that
          rely on heavy graphics and tables, TaskGuru focuses on structured
          content that Applicant Tracking Systems can easily parse.
        </p>

        <h3 className="text-2xl font-bold mt-8 mb-3">
          Why ATS-Friendly Resumes Matter
        </h3>
        <p>
          Over 90% of companies use ATS software to filter resumes before a human
          recruiter ever sees them. Improper formatting, images, or multi-column
          layouts often cause qualified candidates to be rejected automatically.
          TaskGuru eliminates these issues by enforcing a single-column,
          text-based layout with standardized headings.
        </p>

        <h3 className="text-2xl font-bold mt-8 mb-3">
          One-Page Resume – Industry Standard
        </h3>
        <p>
          Recruiters spend an average of 6–7 seconds scanning a resume. A concise
          one-page resume improves readability, clarity, and impact. TaskGuru
          enforces a strict A4 one-page layout, ensuring your resume never spills
          onto extra pages.
        </p>

        <h3 className="text-2xl font-bold mt-8 mb-3">
          Who Should Use TaskGuru Resume Maker?
        </h3>
        <ul className="list-disc pl-6">
          <li>Freshers and recent graduates</li>
          <li>Software developers and IT professionals</li>
          <li>BPO and technical support candidates</li>
          <li>Career switchers and freelancers</li>
        </ul>

        <h3 className="text-2xl font-bold mt-8 mb-3">
          Frequently Asked Questions
        </h3>
        <p><strong>Is this resume maker free?</strong><br />Yes. 100% free with unlimited PDF downloads.</p>
        <p><strong>Does it work on mobile?</strong><br />Yes. Fully responsive.</p>
        <p><strong>Is my data stored?</strong><br />No. Everything stays in your browser.</p>
      </article>
    </div>
  );
}

/* ===== Helper Components ===== */
function Section({ title, text }: any) {
  return (
    <section>
      <div className="font-bold uppercase text-xs border-b mb-1">{title}</div>
      <p>{text}</p>
    </section>
  );
}

function ListSection({ title, items }: any) {
  return (
    <section>
      <div className="font-bold uppercase text-xs border-b mb-1">{title}</div>
      <ul className="list-disc pl-5">
        {items.map((i: string, k: number) => (
          <li key={k}>{i}</li>
        ))}
      </ul>
    </section>
  );
}
