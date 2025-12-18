"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface ResumeMakerProps {
  title?: string;
  description?: string;
}

export default function ResumeMaker({}: ResumeMakerProps) {
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

      {/* LIVE PREVIEW */}
      <Card>
        <CardContent className="p-8 space-y-4">
          <h2 className="text-xl font-bold">
            {data.name || "Your Name"}
          </h2>
          <p className="text-sm text-muted-foreground">
            {data.email || "email@example.com"}
            {data.phone && ` | ${data.phone}`}
          </p>

          {data.summary && (
            <p className="text-sm leading-relaxed">{data.summary}</p>
          )}

          {skillsArray.length > 0 && (
            <ul className="list-disc list-inside text-sm space-y-1">
              {skillsArray.map((skill, i) => (
                <li key={i}>{skill}</li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
