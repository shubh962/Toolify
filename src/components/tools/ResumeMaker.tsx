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

  const match =
    jdKeywords.length === 0
      ? 0
      : Math.round((matched.length / jdKeywords.length) * 100);

  return { match, missing: [] };
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

  return (
    <>
      {/* ================= RESUME BUILDER TOOL ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* LEFT */}
        <Card>
          <CardHeader>
            <CardTitle>
              Step {currentStep + 1} of {steps.length}: {steps[currentStep]}
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* ATS */}
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium">ATS Score</span>
                <span className="font-bold">{ats.score}%</span>
              </div>

              <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary"
                  style={{ width: `${ats.score}%` }}
                />
              </div>
            </div>

            {/* JD MATCH */}
            <Textarea
              placeholder="Paste Job Description here"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            />

            {/* FORM STEPS */}
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
                <Input name="portfolio" placeholder="Portfolio URL" onChange={handleChange} />
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
                <Textarea name="courses" placeholder="Courses / Certifications" onChange={handleChange} />
              </>
            )}

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
                <Button>Download PDF</Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* RIGHT */}
        <Card>
          <CardContent ref={resumeRef} className="bg-white p-6 text-sm">
            <h1>{data.name || "YOUR NAME"}</h1>
            <h2>{data.role}</h2>
            <p>{data.location} | {data.email} | {data.phone}</p>

            {data.summary && <p>{data.summary}</p>}
            {data.experience && <ul>{list(data.experience).map((i,k)=><li key={k}>{i}</li>)}</ul>}
            {data.education && <ul>{list(data.education).map((i,k)=><li key={k}>{i}</li>)}</ul>}
            {data.projects && <ul>{list(data.projects).map((i,k)=><li key={k}>{i}</li>)}</ul>}
            {data.skills && <p>{data.skills}</p>}
          </CardContent>
        </Card>
      </div>

      {/* ================= SEO SECTION – PDF MERGER STYLE ================= */}
      <section className="mt-24 border-t pt-16">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">
            The Most Advanced Resume Maker: Why TaskGuru is Built Differently
          </h2>

          <p className="text-muted-foreground mb-6">
            Creating a professional resume should not be complicated. TaskGuru
            Resume Maker is designed for speed, clarity, and ATS compatibility,
            helping job seekers build resumes that recruiters actually read.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mt-10">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-2">
                  1. ATS Optimized Resume Builder
                </h3>
                <p className="text-sm text-muted-foreground">
                  Our resume maker analyzes key resume sections and ensures
                  compatibility with applicant tracking systems used globally.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-2">
                  2. Job Description Keyword Matching
                </h3>
                <p className="text-sm text-muted-foreground">
                  Paste any job description and instantly see how well your
                  resume matches the role using smart keyword analysis.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-2">
                  3. Step-by-Step Resume Creation
                </h3>
                <p className="text-sm text-muted-foreground">
                  Guided steps help students, fresh graduates, and professionals
                  create clean resumes without confusion.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-2">
                  4. Free & Browser Based
                </h3>
                <p className="text-sm text-muted-foreground">
                  No signup, no watermark, no installation. Build resumes
                  instantly from any device.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
            }

