"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type TemplateCategory =
  | "all"
  | "ats"
  | "one-column"
  | "two-column"
  | "classic"
  | "modern";

interface Template {
  id: string;
  name: string;
  categories: TemplateCategory[];
  supports: string[];
}

const templates: Template[] = [
  {
    id: "classic-ats",
    name: "Classic ATS",
    categories: ["all", "ats", "one-column", "classic"],
    supports: ["PDF"],
  },
  {
    id: "professional",
    name: "Professional",
    categories: ["all", "two-column", "modern"],
    supports: ["PDF", "DOCX"],
  },
  {
    id: "clean",
    name: "Clean",
    categories: ["all", "one-column", "modern"],
    supports: ["PDF"],
  },
  {
    id: "corporate",
    name: "Corporate",
    categories: ["all", "two-column", "classic"],
    supports: ["PDF", "DOCX"],
  },
];

export default function TemplateSelector({
  onSelect,
}: {
  onSelect: (templateId: string) => void;
}) {
  const [activeFilter, setActiveFilter] =
    useState<TemplateCategory>("all");

  const filteredTemplates =
    activeFilter === "all"
      ? templates
      : templates.filter((t) =>
          t.categories.includes(activeFilter)
        );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold">Select a template</h2>
        <p className="text-muted-foreground mt-1">
          Choose a professional resume template that fits your job role
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {[
          "all",
          "ats",
          "one-column",
          "two-column",
          "classic",
          "modern",
        ].map((filter) => (
          <button
            key={filter}
            onClick={() =>
              setActiveFilter(filter as TemplateCategory)
            }
            className={`rounded-full px-4 py-2 text-sm border transition
              ${
                activeFilter === filter
                  ? "border-primary text-primary bg-primary/5"
                  : "border-muted hover:bg-muted"
              }`}
          >
            {filter
              .replace("-", " ")
              .replace(/\b\w/g, (l) => l.toUpperCase())}
          </button>
        ))}
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <Card
            key={template.id}
            className="overflow-hidden hover:shadow-lg transition"
          >
            {/* Preview Placeholder */}
            <div className="h-48 bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center text-muted-foreground">
              Preview
            </div>

            <div className="p-4 space-y-3">
              <h3 className="font-semibold">
                {template.name}
              </h3>

              <div className="flex flex-wrap gap-2">
                {template.supports.map((s) => (
                  <span
                    key={s}
                    className="text-xs rounded-full bg-muted px-2 py-1"
                  >
                    {s}
                  </span>
                ))}
              </div>

              <Button
                className="w-full"
                onClick={() => onSelect(template.id)}
              >
                Use this template
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
