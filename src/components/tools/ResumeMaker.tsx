"use client";

import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function ResumeMaker() {
  const resumeRef = useRef<HTMLDivElement>(null);

  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    summary: "",
    skills: "",
    experience: "",
    projects: "",
    education: "",
    certifications: "",
    achievements: "",
    languages: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setData({ ...data, [e.target.name]: e.target.value });

  const list = (text: string) =>
    text.split("\n").map((i) => i.trim()).filter(Boolean);

  const printResume = () => {
    if (!resumeRef.current) return;

    const content = resumeRef.current.innerHTML;
    const win = window.open("", "", "width=900,height=650");
    if (!win) return;

    win.document.write(`
      <html>
        <head>
          <title>Professional Resume</title>
          <meta name="description" content="ATS friendly professional resume generated using free resume builder">
          <style>
            body { font-family: Arial, sans-serif; padding: 24px; color: #000; }
            h2 { margin-bottom: 4px; }
            h3 { margin-top: 18px; border-bottom: 1px solid #ddd; padding-bottom: 4px; }
            ul { padding-left: 20px; }
            p { margin: 6px 0; }
          </style>
        </head>
        <body>${content}</body>
      </html>
    `);

    win.document.close();
    win.print();
  };

  return (
    <div className="space-y-8">
      {/* SEO INTRO (VISIBLE TEXT) */}
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold">
          Free Professional Resume Builder (ATS Friendly)
        </h2>
        <p className="mt-2 text-muted-foreground">
          Build a job-ready, ATS-friendly professional resume online.
          Ideal for freshers, experienced professionals, IT jobs,
          corporate roles, and job hunting in 2025.
        </p>
      </div>

      {/* ACTION BAR */}
      <div className="flex justify-end">
        <Button onClick={printResume}>
          Download Resume PDF
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* FORM */}
        <Card>
          <CardHeader>
            <CardTitle>Resume Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Input name="name" placeholder="Full Name" onChange={handleChange} />
            <Input name="email" placeholder="Email Address" onChange={handleChange} />
            <Input name="phone" placeholder="Phone Number" onChange={handleChange} />
            <Input name="location" placeholder="City, Country" onChange={handleChange} />
            <Input name="linkedin" placeholder="LinkedIn / Portfolio URL" onChange={handleChange} />

            <Textarea name="summary" placeholder="Professional Summary (ATS optimized)" onChange={handleChange} />
            <Textarea name="skills" placeholder="Key Skills (one per line)" onChange={handleChange} />
            <Textarea name="experience" placeholder="Work Experience (one per line)" onChange={handleChange} />
            <Textarea name="projects" placeholder="Projects (one per line)" onChange={handleChange} />
            <Textarea name="education" placeholder="Education Details" onChange={handleChange} />
            <Textarea name="certifications" placeholder="Certifications" onChange={handleChange} />
            <Textarea name="achievements" placeholder="Achievements / Awards" onChange={handleChange} />
            <Textarea name="languages" placeholder="Languages Known" onChange={handleChange} />
          </CardContent>
        </Card>

        {/* PROFESSIONAL PREVIEW */}
        <Card>
          <CardContent ref={resumeRef} className="bg-white text-black p-0">
            <div className="grid grid-cols-3 min-h-[1000px]">

              {/* LEFT SIDEBAR */}
              <div className="col-span-1 bg-slate-100 p-6 space-y-6">
                <div>
                  <h2 className="text-xl font-bold">
                    {data.name || "Your Name"}
                  </h2>
                  <p className="text-xs text-slate-700 mt-2">
                    {data.email}<br />
                    {data.phone}<br />
                    {data.location}
                  </p>
                  {data.linkedin && (
                    <p className="text-xs mt-2 break-all">
                      {data.linkedin}
                    </p>
                  )}
                </div>

                {data.skills && (
                  <div>
                    <h3 className="text-sm font-semibold uppercase">
                      Skills
                    </h3>
                    <ul className="text-xs mt-2 space-y-1">
                      {list(data.skills).map((s, i) => (
                        <li key={i}>• {s}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {data.languages && (
                  <div>
                    <h3 className="text-sm font-semibold uppercase">
                      Languages
                    </h3>
                    <p className="text-xs mt-2">
                      {data.languages}
                    </p>
                  </div>
                )}

                {data.certifications && (
                  <div>
                    <h3 className="text-sm font-semibold uppercase">
                      Certifications
                    </h3>
                    <ul className="text-xs mt-2 space-y-1">
                      {list(data.certifications).map((s, i) => (
                        <li key={i}>• {s}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* MAIN CONTENT */}
              <div className="col-span-2 p-8 space-y-6">
                {data.summary && (
                  <div>
                    <h3 className="text-sm font-semibold uppercase">
                      Professional Summary
                    </h3>
                    <p className="text-sm mt-2 leading-relaxed">
                      {data.summary}
                    </p>
                  </div>
                )}

                {data.experience && (
                  <div>
                    <h3 className="text-sm font-semibold uppercase">
                      Work Experience
                    </h3>
                    <ul className="text-sm mt-2 space-y-2">
                      {list(data.experience).map((s, i) => (
                        <li key={i}>• {s}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {data.projects && (
                  <div>
                    <h3 className="text-sm font-semibold uppercase">
                      Projects
                    </h3>
                    <ul className="text-sm mt-2 space-y-2">
                      {list(data.projects).map((s, i) => (
                        <li key={i}>• {s}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {data.education && (
                  <div>
                    <h3 className="text-sm font-semibold uppercase">
                      Education
                    </h3>
                    <ul className="text-sm mt-2 space-y-2">
                      {list(data.education).map((s, i) => (
                        <li key={i}>• {s}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {data.achievements && (
                  <div>
                    <h3 className="text-sm font-semibold uppercase">
                      Achievements
                    </h3>
                    <p className="text-sm mt-2">
                      {data.achievements}
                    </p>
                  </div>
                )}
              </div>

            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

