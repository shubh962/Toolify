"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function ResumeMakerPage() {
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    summary: "",
    skills: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const skillsArray = data.skills
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-bold">Resume Maker</h1>
        <p className="mt-3 text-muted-foreground">
          Build your resume with live preview
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* FORM */}
        <Card>
          <CardHeader>
            <CardTitle>Resume Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Full Name</Label>
              <Input name="name" onChange={handleChange} />
            </div>

            <div>
              <Label>Email</Label>
              <Input name="email" onChange={handleChange} />
            </div>

            <div>
              <Label>Phone</Label>
              <Input name="phone" onChange={handleChange} />
            </div>

            <div>
              <Label>Professional Summary</Label>
              <Textarea name="summary" onChange={handleChange} />
            </div>

            <div>
              <Label>Skills (comma separated)</Label>
              <Textarea name="skills" onChange={handleChange} />
            </div>
          </CardContent>
        </Card>

        {/* PREVIEW */}
        <Card>
          <CardContent className="p-8 space-y-4">
            <h2 className="text-xl font-bold">
              {data.name || "Your Name"}
            </h2>
            <p className="text-sm text-muted-foreground">
              {data.email || "email@example.com"}{" "}
              {data.phone && ` | ${data.phone}`}
            </p>

            {data.summary && (
              <p className="text-sm">{data.summary}</p>
            )}

            {skillsArray.length > 0 && (
              <ul className="list-disc list-inside text-sm">
                {skillsArray.map((skill, i) => (
                  <li key={i}>{skill}</li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

