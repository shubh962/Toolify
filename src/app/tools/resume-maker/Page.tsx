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
      {/* Header */}
      <div className="mb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-bold">
          Resume Maker
        </h1>
        <p className="mt-3 text-muted-foreground">
          Live preview updates as you type
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
              <Input
                name="name"
                placeholder="Shubham Gautam"
                value={data.name}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label>Email</Label>
              <Input
                name="email"
                placeholder="example@email.com"
                value={data.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label>Phone</Label>
              <Input
                name="phone"
                placeholder="+91 9XXXXXXXXX"
                value={data.phone}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label>Professional Summary</Label>
              <Textarea
                name="summary"
                placeholder="Brief professional summary"
                value={data.summary}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label>Skills (comma separated)</Label>
              <Textarea
                name="skills"
                placeholder="React, Next.js, Tailwind"
                value={data.skills}
                onChange={handleChange}
              />
            </div>
          </CardContent>
        </Card>

        {/* LIVE PREVIEW */}
        <Card>
          <CardContent className="p-8 space-y-6">
            <div className="text-center border-b pb-4">
              <h2 className="text-2xl font-bold">
                {data.name || "Your Name"}
              </h2>
              <p className="text-sm text-muted-foreground">
                {data.email || "email@example.com"}{" "}
                {data.phone && " | "} {data.phone}
              </p>
            </div>

            {data.summary && (
              <section>
                <h3 className="font-semibold mb-2">Summary</h3>
                <p className="text-sm leading-relaxed">
                  {data.summary}
                </p>
              </section>
            )}

            {skillsArray.length > 0 && (
              <section>
                <h3 className="font-semibold mb-2">Skills</h3>
                <ul className="list-disc list-inside text-sm space-y-1">
                  {skillsArray.map((skill, index) => (
                    <li key={index}>{skill}</li>
                  ))}
                </ul>
              </section>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

