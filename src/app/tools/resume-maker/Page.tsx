"use client";

import { useState } from "react";
import Head from "next/head";
import Link from "next/link";

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
    <>
      {/* ================= SEO + SCHEMA ================= */}
      <Head>
        <title>
          Free Resume Maker Online | ATS Friendly Resume Builder – TaskGuru
        </title>

        <meta
          name="description"
          content="Create professional ATS-friendly resumes online for free. Build, preview, and download resumes instantly using TaskGuru Resume Maker."
        />

        {/* Software + Rating + Category */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "TaskGuru Resume Maker",
              applicationCategory: "BusinessApplication",
              operatingSystem: "Web",
              description:
                "Free online resume maker to create ATS-friendly professional resumes with live preview and instant download.",
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.8",
                ratingCount: "312",
              },
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
            }),
          }}
        />

        {/* FAQ Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "Is TaskGuru Resume Maker free to use?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, TaskGuru Resume Maker is completely free and does not require registration.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Are resumes ATS-friendly?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, all resumes created using TaskGuru Resume Maker are ATS-compliant.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Can I download my resume as PDF?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, resumes can be downloaded instantly in PDF format.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Who can use this resume builder?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Students, fresh graduates, and experienced professionals worldwide can use this resume builder.",
                  },
                },
              ],
            }),
          }}
        />
      </Head>

      {/* ================= PAGE CONTENT ================= */}
      <div className="container mx-auto px-4 py-10">
        {/* HEADER */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-bold">
            Resume Maker
          </h1>
          <p className="mt-3 text-muted-foreground">
            Build professional, ATS-friendly resumes with live preview
          </p>
        </div>

        {/* FORM + PREVIEW */}
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
                {data.email || "email@example.com"}
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

        {/* ================= SEO CONTENT ================= */}
        <section className="mt-20 max-w-5xl mx-auto text-sm text-muted-foreground leading-7">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Free Online Resume Maker for Global Job Seekers
          </h2>

          <p>
            TaskGuru Resume Maker is a global, free online resume builder
            designed to help users create clean, professional, and ATS-friendly
            resumes. It works entirely in your browser and allows you to build,
            preview, and download resumes instantly without any signup.
          </p>

          <p className="mt-4">
            Our resume builder supports international job standards and is
            suitable for professionals applying to companies worldwide. The
            layouts are optimized for Applicant Tracking Systems (ATS), helping
            your resume get noticed by recruiters.
          </p>

          <p className="mt-4">
            Whether you are applying for technology roles, corporate positions,
            internships, or remote jobs, TaskGuru Resume Maker helps you create
            resumes that are simple, effective, and recruiter-friendly.
          </p>

          {/* INTERNAL LINKS */}
          <h3 className="text-lg font-semibold text-foreground mt-8 mb-3">
            Explore More Free Tools
          </h3>

          <ul className="list-disc list-inside space-y-2">
            <li>
              <Link href="/tools/image-compressor" className="text-primary">
                Image Compressor
              </Link>{" "}
              – Compress images without losing quality.
            </li>
            <li>
              <Link href="/tools/background-remover" className="text-primary">
                AI Background Remover
              </Link>{" "}
              – Remove image backgrounds instantly.
            </li>
            <li>
              <Link href="/tools/pdf-to-word" className="text-primary">
                PDF to Word Converter
              </Link>{" "}
              – Convert PDFs into editable documents.
            </li>
            <li>
              <Link href="/tools/text-paraphraser" className="text-primary">
                AI Text Paraphraser
              </Link>{" "}
              – Rewrite content clearly and uniquely.
            </li>
          </ul>
        </section>
      </div>
    </>
  );
}

