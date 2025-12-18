"use client";

import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
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
    education: "",
    projects: "",
    certifications: "",
    achievements: "",
    languages: "",
    interests: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

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
          <title>Resume</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 24px; color: #000; }
            h2 { margin-bottom: 4px; }
            h3 { margin-top: 16px; border-bottom: 1px solid #ddd; }
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
      <div className="flex justify-end">
        <Button onClick={printResume}>Download PDF</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* FORM */}
        <Card>
          <CardHeader>
            <CardTitle>Resume Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input name="name" placeholder="Full Name" onChange={handleChange} />
            <Input name="email" placeholder="Email" onChange={handleChange} />
            <Input name="phone" placeholder="Phone" onChange={handleChange} />
            <Input name="location" placeholder="Location" onChange={handleChange} />
            <Input name="linkedin" placeholder="LinkedIn / Portfolio" onChange={handleChange} />

            <Textarea name="summary" placeholder="Professional Summary" onChange={handleChange} />
            <Textarea name="skills" placeholder="Skills (one per line)" onChange={handleChange} />
            <Textarea name="experience" placeholder="Work Experience (one per line)" onChange={handleChange} />
            <Textarea name="education" placeholder="Education (one per line)" onChange={handleChange} />
            <Textarea name="projects" placeholder="Projects (one per line)" onChange={handleChange} />
            <Textarea name="certifications" placeholder="Certifications (one per line)" onChange={handleChange} />
            <Textarea name="achievements" placeholder="Achievements / Awards" onChange={handleChange} />
            <Textarea name="languages" placeholder="Languages" onChange={handleChange} />
            <Textarea name="interests" placeholder="Interests (optional)" onChange={handleChange} />
          </CardContent>
        </Card>

        {/* PREVIEW */}
        <Card>
          <CardContent ref={resumeRef} className="p-8 bg-white text-black space-y-3">
            <h2 className="text-2xl font-bold">{data.name || "Your Name"}</h2>
            <p className="text-sm">
              {data.email} | {data.phone} | {data.location}
            </p>
            {data.linkedin && <p className="text-sm">{data.linkedin}</p>}

            {data.summary && <><h3>Summary</h3><p>{data.summary}</p></>}
            {data.skills && <><h3>Skills</h3><ul>{list(data.skills).map((s,i)=><li key={i}>{s}</li>)}</ul></>}
            {data.experience && <><h3>Experience</h3><ul>{list(data.experience).map((s,i)=><li key={i}>{s}</li>)}</ul></>}
            {data.education && <><h3>Education</h3><ul>{list(data.education).map((s,i)=><li key={i}>{s}</li>)}</ul></>}
            {data.projects && <><h3>Projects</h3><ul>{list(data.projects).map((s,i)=><li key={i}>{s}</li>)}</ul></>}
            {data.certifications && <><h3>Certifications</h3><ul>{list(data.certifications).map((s,i)=><li key={i}>{s}</li>)}</ul></>}
            {data.achievements && <><h3>Achievements</h3><p>{data.achievements}</p></>}
            {data.languages && <><h3>Languages</h3><p>{data.languages}</p></>}
            {data.interests && <><h3>Interests</h3><p>{data.interests}</p></>}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

