"use client";

import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

/* ---------------- ATS SCORE ---------------- */
function calculateATSScore(data: any) {
  let score = 0;
  const missing: string[] = [];

  if (data.name && data.email && data.phone) score += 15;
  else missing.push("Personal details");

  if (data.linkedin || data.github || data.portfolio) score += 10;
  else missing.push("Profile links");

  if (data.summary) score += 15;
  else missing.push("Professional summary");

  if (data.experience) score += 25;
  else missing.push("Work experience");

  if (data.education) score += 15;
  else missing.push("Education");

  if (data.projects) score += 10;
  else missing.push("Projects");

  if (data.skills) score += 10;
  else missing.push("Skills");

  return { score, missing };
}

/* ---------------- JD MATCH ---------------- */
function extractKeywords(text: string) {
  return Array.from(
    new Set(
      text
        .toLowerCase()
        .replace(/[^a-z0-9 ]/g, "")
        .split(" ")
        .filter((w) => w.length > 3)
    )
  );
}

function calculateJDMatch(resumeText: string, jdText: string) {
  if (!jdText) return { match: 0, missing: [] };

  const jdKeywords = extractKeywords(jdText);
  const resumeKeywords = extractKeywords(resumeText);

  const matched = jdKeywords.filter((k) =>
    resumeKeywords.includes(k)
  );
  const missing = jdKeywords.filter(
    (k) => !resumeKeywords.includes(k)
  );

  const match =
    jdKeywords.length === 0
      ? 0
      : Math.round((matched.length / jdKeywords.length) * 100);

  return { match, missing };
}

/* ---------------- STEPS ---------------- */
const steps = [
  "Personal Details",
  "Links & Profiles",
  "Professional Summary",
  "Work Experience",
  "Education",
  "Projects",
  "Skills & Courses",
];

export default function ResumeMaker() {
  const resumeRef = useRef<HTMLDivElement>(null);
  const [currentStep, setCurrentStep] = useState(0);

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
    experience: "",
    education: "",
    projects: "",
    skills: "",
    courses: "",
  });

  const [jobDescription, setJobDescription] = useState("");

  const ats = calculateATSScore(data);

  const resumeText = `
    ${data.summary}
    ${data.experience}
    ${data.education}
    ${data.projects}
    ${data.skills}
    ${data.courses}
  `;

  const jdMatch = calculateJDMatch(resumeText, jobDescription);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setData({ ...data, [e.target.name]: e.target.value });

  const list = (text: string) =>
    text.split("\n").map((i) => i.trim()).filter(Boolean);

  const printResume = () => {
    if (!resumeRef.current) return;
    const win = window.open("", "", "width=900,height=650");
    if (!win) return;
    win.document.write(`
      <html>
        <head>
          <style>
            body { font-family: "Times New Roman", serif; padding: 24px; }
            h1 { text-align:center; font-size:24px; margin-bottom:4px; }
            h2 { text-align:center; font-size:14px; margin-bottom:8px; }
            h3 { margin-top:16px; }
            p, li { font-size:13px; }
          </style>
        </head>
        <body>${resumeRef.current.innerHTML}</body>
      </html>
    `);
    win.document.close();
    win.print();
  };

  return (
    <>
      {/* ================= SEO TEXT (ALWAYS VISIBLE) ================= */}
      <section className="mb-16 max-w-5xl mx-auto px-4 text-sm text-muted-foreground leading-7">
        <h2 className="text-xl font-semibold text-foreground mb-4">
          Free Online Resume Maker – ATS Friendly Resume Builder
        </h2>

        <p>
          TaskGuru Resume Maker is a free online resume builder that helps users
          create professional, ATS-friendly resumes for global job applications.
          The tool works directly in your browser without requiring signup or
          installation.
        </p>

        <p className="mt-4">
          This resume builder includes ATS score analysis, job description
          keyword matching, and step-by-step resume creation. It is suitable for
          students, fresh graduates, and experienced professionals worldwide.
        </p>

        <p className="mt-4">
          You can build resumes for corporate roles, remote jobs, internships,
          and technical positions. All resumes are clean, readable, and optimized
          for modern applicant tracking systems.
        </p>
      </section>

      {/* ================= MAIN TOOL ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* LEFT – FORM */}
        <Card>
          <CardHeader>
            <CardTitle>
              Step {currentStep + 1} of {steps.length}: {steps[currentStep]}
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* ATS SCORE */}
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium">ATS Score</span>
                <span className="font-bold">{ats.score}%</span>
              </div>

              <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                <div
                  className={`h-full ${
                    ats.score >= 80
                      ? "bg-green-500"
                      : ats.score >= 50
                      ? "bg-yellow-500"
                      : "bg-red-500"
                  }`}
                  style={{ width: `${ats.score}%` }}
                />
              </div>

              {ats.missing.length > 0 && (
                <p className="text-xs text-muted-foreground mt-1">
                  Missing: {ats.missing.join(", ")}
                </p>
              )}
            </div>

            {/* JD MATCH */}
            <div>
              <h4 className="font-semibold text-sm mb-1">
                Job Description Match
              </h4>

              <Textarea
                placeholder="Paste Job Description here"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
              />

              {jobDescription && (
                <>
                  <div className="flex justify-between text-sm mt-2">
                    <span>JD Match</span>
                    <span className="font-bold">{jdMatch.match}%</span>
                  </div>

                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full ${
                        jdMatch.match >= 70
                          ? "bg-green-500"
                          : jdMatch.match >= 40
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`}
                      style={{ width: `${jdMatch.match}%` }}
                    />
                  </div>
                </>
              )}
            </div>

            {/* STEP CONTENT */}
            {currentStep === 0 && (
              <>
                <Input name="name" placeholder="Full Name" onChange={handleChange} />
                <Input name="role" placeholder="Job Title" onChange={handleChange} />
                <Input name="email" placeholder="Email" onChange={handleChange} />
                <Input name="phone" placeholder="Phone" onChange={handleChange} />
                <Input name="location" placeholder="City, Country" onChange={handleChange} />
              </>
            )}

            {currentStep === 1 && (
              <>
                <Input name="linkedin" placeholder="LinkedIn URL" onChange={handleChange} />
                <Input name="github" placeholder="GitHub URL" onChange={handleChange} />
                <Input name="portfolio" placeholder="Portfolio / Website URL" onChange={handleChange} />
              </>
            )}

            {currentStep === 2 && (
              <Textarea name="summary" placeholder="Professional summary" onChange={handleChange} />
            )}

            {currentStep === 3 && (
              <Textarea name="experience" placeholder="Work experience" onChange={handleChange} />
            )}

            {currentStep === 4 && (
              <Textarea name="education" placeholder="Education" onChange={handleChange} />
            )}

            {currentStep === 5 && (
              <Textarea name="projects" placeholder="Projects" onChange={handleChange} />
            )}

            {currentStep === 6 && (
              <>
                <Textarea name="skills" placeholder="Skills" onChange={handleChange} />
                <Textarea name="courses" placeholder="Courses" onChange={handleChange} />
              </>
            )}

            {/* NAVIGATION */}
            <div className="flex justify-between pt-4">
              <Button
                variant="outline"
                disabled={currentStep === 0}
                onClick={() => setCurrentStep((s) => s - 1)}
              >
                Back
              </Button>

              {currentStep < steps.length - 1 ? (
                <Button onClick={() => setCurrentStep((s) => s + 1)}>
                  Next
                </Button>
              ) : (
                <Button onClick={printResume}>Download PDF</Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* RIGHT – PREVIEW */}
        <Card>
          <CardContent ref={resumeRef} className="bg-white p-6 text-sm">
            <h1>{data.name || "YOUR NAME"}</h1>
            <h2>{data.role}</h2>
            <p style={{ textAlign: "center" }}>
              {data.location} | {data.email} | {data.phone}
            </p>

            {data.summary && <p>{data.summary}</p>}
            {data.experience && <><h3>Experience</h3><ul>{list(data.experience).map((i,k)=><li key={k}>{i}</li>)}</ul></>}
            {data.education && <><h3>Education</h3><ul>{list(data.education).map((i,k)=><li key={k}>{i}</li>)}</ul></>}
            {data.projects && <><h3>Projects</h3><ul>{list(data.projects).map((i,k)=><li key={k}>{i}</li>)}</ul></>}
            {data.skills && <><h3>Skills</h3><p>{data.skills}</p></>}
            {data.courses && <><h3>Courses</h3><p>{data.courses}</p></>}
          </CardContent>
        </Card>
      </div>
    </>
  );
                }

