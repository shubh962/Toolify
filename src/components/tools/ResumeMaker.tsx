"use client";

import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

type Template = "modern" | "minimal" | "tech";

export default function ResumeMaker() {
  const resumeRef = useRef<HTMLDivElement>(null);
  const [template, setTemplate] = useState<Template>("modern");

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
          <title>Resume</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 24px; color: #000; }
            h2 { margin-bottom: 4px; }
            h3 { margin-top: 16px; border-bottom: 1px solid #ddd; }
            ul { padding-left: 20px; }
            p { margin: 6px 0; }
            .tech h3 { border-bottom: 2px solid #000; }
            .modern h2 { letter-spacing: 0.5px; }
            .minimal h3 { border: none; text-transform: uppercase; }
          </style>
        </head>
        <body>${content}</body>
      </html>
    `);

    win.document.close();
    win.print();
  };

  const Section = ({ title, children }: { title: string; children: any }) =>
    children ? (
      <>
        <h3>{title}</h3>
        {children}
      </>
    ) : null;

  return (
    <div className="space-y-8">
      {/* ACTIONS */}
      <div className="flex flex-wrap gap-3 justify-between">
        <div className="flex gap-2">
          <Button
            variant={template === "modern" ? "default" : "outline"}
            onClick={() => setTemplate("modern")}
          >
            Modern
          </Button>
          <Button
            variant={template === "minimal" ? "default" : "outline"}
            onClick={() => setTemplate("minimal")}
          >
            Minimal
          </Button>
          <Button
            variant={template === "tech" ? "default" : "outline"}
            onClick={() => setTemplate("tech")}
          >
            Tech
          </Button>
        </div>
        <Button onClick={printResume}>Download PDF</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* FORM */}
        <Card>
          <CardHeader>
            <CardTitle>Resume Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
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
          <CardContent
            ref={resumeRef}
            className={`p-8 bg-white text-black space-y-3 ${template}`}
          >
            <h2 className="text-2xl font-bold">{data.name || "Your Name"}</h2>
            <p className="text-sm">
              {data.email} | {data.phone} | {data.location}
            </p>
            {data.linkedin && <p className="text-sm">{data.linkedin}</p>}

            <Section title="Summary">{data.summary && <p>{data.summary}</p>}</Section>

            <Section title="Skills">
              {data.skills && <ul>{list(data.skills).map((s,i)=><li key={i}>{s}</li>)}</ul>}
            </Section>

            <Section title="Experience">
              {data.experience && <ul>{list(data.experience).map((s,i)=><li key={i}>{s}</li>)}</ul>}
            </Section>

            <Section title="Education">
              {data.education && <ul>{list(data.education).map((s,i)=><li key={i}>{s}</li>)}</ul>}
            </Section>

            <Section title="Projects">
              {data.projects && <ul>{list(data.projects).map((s,i)=><li key={i}>{s}</li>)}</ul>}
            </Section>

            <Section title="Certifications">
              {data.certifications && <ul>{list(data.certifications).map((s,i)=><li key={i}>{s}</li>)}</ul>}
            </Section>

            <Section title="Achievements">
              {data.achievements && <p>{data.achievements}</p>}
            </Section>

            <Section title="Languages">
              {data.languages && <p>{data.languages}</p>}
            </Section>

            <Section title="Interests">
              {data.interests && <p>{data.interests}</p>}
            </Section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

