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
    role: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    github: "",
    portfolio: "",
    kaggle: "",
    experience: "",
    education: "",
    projects: "",
    courses: "",
    skills: "",
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
          <style>
            body {
              font-family: "Times New Roman", serif;
              color: #000;
              padding: 24px;
            }
            h1 {
              text-align: center;
              font-size: 28px;
              letter-spacing: 1px;
              margin-bottom: 4px;
            }
            h2 {
              text-align: center;
              font-size: 14px;
              font-weight: normal;
              margin-bottom: 6px;
            }
            .center {
              text-align: center;
              font-size: 12px;
            }
            hr {
              border: none;
              border-top: 1px solid #000;
              margin: 10px 0;
            }
            .section {
              margin-top: 16px;
            }
            .section-title {
              background: #dbeaf5;
              padding: 4px 8px;
              font-weight: bold;
              text-transform: uppercase;
              font-size: 13px;
            }
            ul {
              margin-top: 6px;
              padding-left: 18px;
            }
            li {
              margin-bottom: 4px;
              font-size: 13px;
            }
            p {
              font-size: 13px;
              margin: 4px 0;
            }
            a {
              color: #000;
              text-decoration: none;
            }
          </style>
        </head>
        <body>${content}</body>
      </html>
    `);

    win.document.close();
    win.print();
  };

  return (
    <div className="space-y-6">
      {/* ACTION */}
      <div className="flex justify-end">
        <Button onClick={printResume}>Download PDF</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* FORM */}
        <Card>
          <CardHeader>
            <CardTitle>Resume Details (Industry Level)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Input name="name" placeholder="Full Name" onChange={handleChange} />
            <Input name="role" placeholder="Job Title (e.g. Machine Learning Engineer)" onChange={handleChange} />

            <Input name="email" placeholder="Email" onChange={handleChange} />
            <Input name="phone" placeholder="Phone" onChange={handleChange} />
            <Input name="location" placeholder="City, Country" onChange={handleChange} />

            <Input name="linkedin" placeholder="LinkedIn URL" onChange={handleChange} />
            <Input name="github" placeholder="GitHub URL" onChange={handleChange} />
            <Input name="portfolio" placeholder="Portfolio / Website URL" onChange={handleChange} />
            <Input name="kaggle" placeholder="Kaggle / LeetCode URL" onChange={handleChange} />

            <Textarea name="experience" placeholder="Work Experience (one bullet per line)" onChange={handleChange} />
            <Textarea name="education" placeholder="Education (one bullet per line)" onChange={handleChange} />
            <Textarea name="projects" placeholder="Projects (one bullet per line)" onChange={handleChange} />
            <Textarea name="courses" placeholder="Courses / Certifications" onChange={handleChange} />
            <Textarea name="skills" placeholder="Skills (comma or line separated)" onChange={handleChange} />
          </CardContent>
        </Card>

        {/* PREVIEW */}
        <Card>
          <CardContent ref={resumeRef} className="bg-white p-6">
            <h1>{data.name || "YOUR NAME"}</h1>
            <h2>{data.role || "PROFESSIONAL TITLE"}</h2>

            <p className="center">
              {data.location} | {data.email} | {data.phone}
            </p>

            <div className="center">
              {data.linkedin && (
                <div>
                  LinkedIn:{" "}
                  <a href={data.linkedin} target="_blank" rel="noreferrer">
                    {data.linkedin}
                  </a>
                </div>
              )}
              {data.github && (
                <div>
                  GitHub:{" "}
                  <a href={data.github} target="_blank" rel="noreferrer">
                    {data.github}
                  </a>
                </div>
              )}
              {data.portfolio && (
                <div>
                  Portfolio:{" "}
                  <a href={data.portfolio} target="_blank" rel="noreferrer">
                    {data.portfolio}
                  </a>
                </div>
              )}
              {data.kaggle && (
                <div>
                  Kaggle:{" "}
                  <a href={data.kaggle} target="_blank" rel="noreferrer">
                    {data.kaggle}
                  </a>
                </div>
              )}
            </div>

            <hr />

            {data.experience && (
              <div className="section">
                <div className="section-title">Work Experience</div>
                <ul>{list(data.experience).map((i, k) => <li key={k}>{i}</li>)}</ul>
              </div>
            )}

            {data.education && (
              <div className="section">
                <div className="section-title">Education</div>
                <ul>{list(data.education).map((i, k) => <li key={k}>{i}</li>)}</ul>
              </div>
            )}

            {data.projects && (
              <div className="section">
                <div className="section-title">Projects</div>
                <ul>{list(data.projects).map((i, k) => <li key={k}>{i}</li>)}</ul>
              </div>
            )}

            {data.courses && (
              <div className="section">
                <div className="section-title">Courses</div>
                <ul>{list(data.courses).map((i, k) => <li key={k}>{i}</li>)}</ul>
              </div>
            )}

            {data.skills && (
              <div className="section">
                <div className="section-title">Skills</div>
                <p>{data.skills}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

