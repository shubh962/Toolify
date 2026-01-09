import AgeCalculator from "@/components/tools/AgeCalculator";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Online Age Calculator Pro - TaskGuru",
  description: "Calculate your exact age in years, months, and days. Fast, accurate, and privacy-focused age finder.",
};

export default function AgeCalculatorPage() {
  return (
    <div className="min-h-screen pt-20">
      {/* Page Title for SEO (Hidden from UI) */}
      <h1 className="sr-only">Online Age Calculator Pro</h1>
      
      {/* Main Premium Component */}
      <AgeCalculator />
    </div>
  );
}
