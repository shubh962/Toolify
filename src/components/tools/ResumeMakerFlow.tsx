"use client";

import { useState } from "react";
import ResumeStartWizard from "@/components/resume/ResumeStartWizard";
import TemplateSelector from "@/components/resume/TemplateSelector";
import ResumeMaker from "@/components/tools/ResumeMaker";

type Step = "wizard" | "templates" | "builder";

export default function ResumeMakerFlow() {
  const [step, setStep] = useState<Step>("wizard");
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  return (
    <>
      {step === "wizard" && (
        <ResumeStartWizard
          onStartNew={() => setStep("templates")}
          onClose={() => setStep("templates")}
        />
      )}

      {step === "templates" && (
        <TemplateSelector
          onSelect={(templateId) => {
            setSelectedTemplate(templateId);
            setStep("builder");
          }}
        />
      )}

      {step === "builder" && (
        <ResumeMaker template={selectedTemplate} />
      )}
    </>
  );
}
