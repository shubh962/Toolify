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
} from "lucide-react";

/* ================= ATS SCORE ================= */
const calcATS = (d: any) => {
  let s = 0;
  if (d.name && d.email && d.phone) s += 20;
  if (d.summary) s += 20;
  if (d.skills) s += 20;
  if (d.experience) s += 25;
  if (d.education) s += 15;
  return Math.min(s, 100);
};

const steps = [
  "Personal",
  "Summary",
  "Skills",
  "Experience",
  "Education",
];

export default function ResumeMaker() {
  const [step, setStep] = useState(0);
  const [d, setD] = useState({
    name: "",
    role: "",
    email: "",
    phone: "",
    location: "",
    summary: "",
    skills: "",
    experience: "",
    education: "",
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
      {/* ================= PRINT LOCK (FINAL) ================= */}
      <style jsx global>{`
        @media print {
          @page {
            size: A4;
            margin: 0;
          }

          html, body {
            width: 210mm;
            height: 297mm;
            margin: 0;
            padding: 0;
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

          /* FORCE REMOVE BROWSER HEADER/FOOTER */
          header, footer {
            display: none !important;
          }

          .no-print {
            display: none !important;
          }
        }
      `}</style>

      {/* ================= BUILDER ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* ================= FORM ================= */}
        <Card className="no-print shadow-xl">
          <CardContent className="p-6 space-y-5">
            <div className="font-bold text-blue-600">
              Step {step + 1} / {steps.length} – {steps[step]}
            </div>

            <div className="text-sm font-semibold">
              ATS Score: {calcATS(d)}%
            </div>

            {step === 0 && (
              <>
                <Input name="name" placeholder="Full Name" onChange={onChange} />
                <Input name="role" placeholder="Professional Title" onChange={onChange} />
                <Input name="email" placeholder="Email" onChange={onChange} />
                <Input name="phone" placeholder="Phone" onChange={onChange} />
                <Input name="location" placeholder="Location" onChange={onChange} />
              </>
            )}

            {step === 1 && (
              <>
                <Textarea
                  name="summary"
                  className="h-40"
                  onChange={onChange}
                  placeholder="Results-driven professional with experience in modern technologies, problem-solving, and delivering business-ready solutions. Seeking to contribute skills in a growth-focused organization."
                />
                <p className="text-xs italic text-slate-500">
                  3–4 lines only. No “I”, no story.
                </p>
              </>
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
                placeholder="• Built responsive web applications
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

            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                disabled={step === 0}
                onClick={() => setStep(step - 1)}
                className="flex-1"
              >
                <ArrowLeft size={16} className="mr-2" />
                Back
              </Button>

              {step < steps.length - 1 ? (
                <Button
                  onClick={() => setStep(step + 1)}
                  className="flex-1 bg-blue-600"
                >
                  Next
                  <ArrowRight size={16} className="ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={printPDF}
                  className="flex-1 bg-green-600"
                >
                  <Download size={16} className="mr-2" />
                  Download PDF
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* ================= RESUME (PRINT AREA) ================= */}
        <div className="print-area shadow-xl">
          <div className="border-b-2 border-black pb-3 mb-5">
            <h1 className="text-3xl font-extrabold uppercase">
              {d.name || "YOUR NAME"}
            </h1>
            <h2 className="text-sm font-semibold uppercase text-blue-600">
              {d.role || "PROFESSIONAL TITLE"}
            </h2>
          </div>

          <div className="flex flex-wrap gap-4 text-xs mb-5">
            {d.email && <span className="flex items-center gap-1"><Mail size={12} />{d.email}</span>}
            {d.phone && <span className="flex items-center gap-1"><Phone size={12} />{d.phone}</span>}
            {d.location && <span className="flex items-center gap-1"><MapPin size={12} />{d.location}</span>}
          </div>

          <div className="space-y-4 text-sm leading-relaxed">
            {d.summary && (
              <section>
                <div className="font-bold uppercase text-xs border-b mb-1">Summary</div>
                <p>{d.summary}</p>
              </section>
            )}

            {d.skills && (
              <section>
                <div className="font-bold uppercase text-xs border-b mb-1">Skills</div>
                <p>{d.skills}</p>
              </section>
            )}

            {d.experience && (
              <section>
                <div className="font-bold uppercase text-xs border-b mb-1">Experience</div>
                <ul className="list-disc pl-5">
                  {list(d.experience).map((i, k) => <li key={k}>{i}</li>)}
                </ul>
              </section>
            )}

            {d.education && (
              <section>
                <div className="font-bold uppercase text-xs border-b mb-1">Education</div>
                <ul className="list-disc pl-5">
                  {list(d.education).map((i, k) => <li key={k}>{i}</li>)}
                </ul>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
