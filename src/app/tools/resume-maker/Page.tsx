"use client";

import { useState } from "react";
import type { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export const metadata: Metadata = {
  title: "Free Resume Maker | ATS Friendly Resume Builder – TaskGuru",
  description:
    "Create professional ATS-friendly resumes online for free. Build, preview and download your resume instantly with TaskGuru Resume Maker.",
};

export default function ResumeMakerPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    summary: "",
    skills: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mx-auto px-4 py-10">
      {/* Header */}
      <div className="mb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-bold">
          Resume Maker
        </h1>
        <p className="mt-3 text-muted-foreground">
          Build a clean, professional, ATS-friendly resume
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* FORM */}
        <Card>
          <CardHeader>
            <CardTitle>Personal Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Shubham Gautam"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                placeholder="example@email.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                name="phone"
                placeholder="+91 9XXXXXXXXX"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label htmlFor="summary">Professional Summary</Label>
              <Textarea
                id="summary"
                name="summary"
                placeholder="Brief professional summary..."
                value={formData.summary}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label htmlFor="skills">Skills (comma separated)</Label>
              <Textarea
                id="skills"
                name="skills"
                placeholder="React, Next.js, Tailwind, Firebase"
                value={formData.skills}
                onChange={handleChange}
              />
            </div>
          </CardContent>
        </Card>

        {/* PREVIEW PLACEHOLDER */}
        <Card>
          <CardHeader>
            <CardTitle>Live Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Live resume preview will appear here in the next step.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

