"use client";

import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setData({ ...data, [e.target.name]: e.target.value });

  const list = (text: string) =>
    text.split("\n").map((i) => i.trim()).filter(Boolean);

  const printResume = () => {
    if (!resumeRef.current) return;
    const win = window.open("", "", "width=900,height=650");
    if (!win) return;
    win.document.write(`<html><body>${resumeRef.current.innerHTML}</body></html>`);
    win.document.close();
    win.print();
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* LEFT – STEPPER FORM */}
      <Card>
        <CardHeader>
          <CardTitle>
            Step {currentStep + 1} of {steps.length}: {steps[currentStep]}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
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
            <Textarea
              name="summary"
              placeholder="Professional summary (2–3 lines)"
              onChange={handleChange}
            />
          )}

          {currentStep === 3 && (
            <Textarea
              name="experience"
              placeholder="Work experience (one bullet per line)"
              onChange={handleChange}
            />
          )}

          {currentStep === 4 && (
            <Textarea
              name="education"
              placeholder="Education (one bullet per line)"
              onChange={handleChange}
            />
          )}

          {currentStep === 5 && (
            <Textarea
              name="projects"
              placeholder="Projects (one bullet per line)"
              onChange={handleChange}
            />
          )}

          {currentStep === 6 && (
            <>
              <Textarea
                name="skills"
                placeholder="Skills (comma or line separated)"
                onChange={handleChange}
              />
              <Textarea
                name="courses"
                placeholder="Courses / Certifications"
                onChange={handleChange}
              />
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

      {/* RIGHT – LIVE PREVIEW */}
      <Card>
        <CardContent ref={resumeRef} className="bg-white p-6 text-sm">
          <h1 className="text-xl font-bold text-center">{data.name || "YOUR NAME"}</h1>
          <p className="text-center">{data.role}</p>
          <p className="text-center text-xs">
            {data.location} | {data.email} | {data.phone}
          </p>

          <hr className="my-2" />

          {data.summary && <p>{data.summary}</p>}

          {data.experience && (
            <>
              <h3 className="font-bold mt-3">Experience</h3>
              <ul>{list(data.experience).map((i, k) => <li key={k}>• {i}</li>)}</ul>
            </>
          )}

          {data.education && (
            <>
              <h3 className="font-bold mt-3">Education</h3>
              <ul>{list(data.education).map((i, k) => <li key={k}>• {i}</li>)}</ul>
            </>
          )}

          {data.projects && (
            <>
              <h3 className="font-bold mt-3">Projects</h3>
              <ul>{list(data.projects).map((i, k) => <li key={k}>• {i}</li>)}</ul>
            </>
          )}

          {data.skills && (
            <>
              <h3 className="font-bold mt-3">Skills</h3>
              <p>{data.skills}</p>
            </>
          )}

          {data.courses && (
            <>
              <h3 className="font-bold mt-3">Courses</h3>
              <p>{data.courses}</p>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
