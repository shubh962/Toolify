"use client";

import { X, Plus, Sparkles, Upload, Linkedin, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface ResumeStartWizardProps {
  onStartNew: () => void;
  onClose: () => void;
}

export default function ResumeStartWizard({
  onStartNew,
  onClose,
}: ResumeStartWizardProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <Card className="w-full max-w-md rounded-2xl p-6 relative">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-muted-foreground hover:text-foreground"
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold">Let’s get started</h2>
          <p className="text-muted-foreground mt-1">
            How do you want to create your resume?
          </p>
        </div>

        {/* Options */}
        <div className="space-y-3">
          <WizardOption
            icon={<Plus />}
            title="Create new resume"
            onClick={onStartNew}
            primary
          />

          <WizardOption
            icon={<Sparkles />}
            title="Create with AI assistance"
            badge="Coming soon"
          />

          <WizardOption
            icon={<Upload />}
            title="Upload resume"
            badge="Coming soon"
          />

          <WizardOption
            icon={<Linkedin />}
            title="Create with LinkedIn profile"
            badge="Coming soon"
          />

          <WizardOption
            icon={<FileText />}
            title="Create from example"
            badge="Coming soon"
          />
        </div>
      </Card>
    </div>
  );
}

function WizardOption({
  icon,
  title,
  badge,
  onClick,
  primary = false,
}: {
  icon: React.ReactNode;
  title: string;
  badge?: string;
  onClick?: () => void;
  primary?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={!onClick}
      className={`w-full flex items-center justify-between rounded-xl border px-4 py-3 transition
        ${
          primary
            ? "border-primary bg-primary/5 hover:bg-primary/10"
            : "border-muted hover:bg-muted"
        }
        ${!onClick && "opacity-70 cursor-not-allowed"}
      `}
    >
      <div className="flex items-center gap-3">
        <div className="text-primary">{icon}</div>
        <span className="font-medium">{title}</span>
      </div>

      {badge && (
        <span className="text-xs rounded-full bg-muted px-2 py-1">
          {badge}
        </span>
      )}
    </button>
  );
}
