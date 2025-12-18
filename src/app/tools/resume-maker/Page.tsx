import type { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Free Resume Maker | ATS Friendly Resume Builder – TaskGuru",
  description:
    "Create professional ATS-friendly resumes online for free. Build, preview and download your resume instantly with TaskGuru Resume Maker.",
  robots: "index, follow",
};

export default function ResumeMakerPage() {
  return (
    <div className="container mx-auto px-4 py-10">
      {/* Header */}
      <div className="mb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-bold">
          Resume Maker
        </h1>
        <p className="mt-3 text-muted-foreground">
          Build a clean, professional, ATS-friendly resume in minutes
        </p>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Form Section */}
        <Card>
          <CardHeader>
            <CardTitle>Resume Details</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Resume form will be added here.
            </p>
          </CardContent>
        </Card>

        {/* Right: Preview Section */}
        <Card>
          <CardHeader>
            <CardTitle>Live Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Resume preview will be shown here.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
