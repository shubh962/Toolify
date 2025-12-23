import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclaimer | Toolify (TaskGuru)",
  description:
    "Official disclaimer of Toolify (TaskGuru) explaining AI tool limitations, data handling practices, and user responsibilities.",
  alternates: {
    canonical: "https://taskguru.online/disclaimer",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function DisclaimerPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12 text-gray-800 leading-relaxed">
      <h1 className="text-3xl font-bold mb-6">Disclaimer</h1>

      <p className="text-sm text-gray-500 mb-6">
        Last updated: December 2025
      </p>

      <p className="mb-6">
        Welcome to <strong>Toolify (TaskGuru)</strong>. This disclaimer explains
        the limitations and responsibilities associated with the use of our
        website and tools. By continuing to use this platform, you agree to the
        terms described below.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">
        General Information
      </h2>
      <p className="mb-4">
        Toolify (TaskGuru) provides online utilities designed to assist users in
        completing digital tasks efficiently. All services are offered on an
        <strong> “as available” </strong> basis without any warranties. We do not
        guarantee accuracy, availability, or suitability for every use case.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">
        No Professional Advice
      </h2>
      <p className="mb-4">
        Outputs generated using our tools are intended for general informational
        purposes only. They should not be treated as professional, legal,
        financial, or technical advice. Users are responsible for how they use
        the generated results.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">
        AI-Generated Content
      </h2>
      <p className="mb-4">
        Some tools on Toolify (TaskGuru) rely on artificial intelligence. AI
        outputs may occasionally produce inaccurate or unexpected results. We
        strongly recommend reviewing and validating all generated content before
        use.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">
        File Processing & Privacy
      </h2>
      <p className="mb-4">
        Uploaded files are processed temporarily to perform the requested
        operation and are not intentionally stored. Toolify (TaskGuru) is not
        responsible for data loss or misuse arising from user uploads. Avoid
        sharing sensitive information.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">
        Limitation of Liability
      </h2>
      <p className="mb-4">
        To the fullest extent permitted by law, Toolify (TaskGuru), its team, and
        affiliates shall not be liable for any damages resulting from the use or
        inability to use this website or its tools. Use of the platform is at
        your own risk.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">
        External Links
      </h2>
      <p className="mb-4">
        This website may contain links to external websites. We do not control
        their content or policies and are not responsible for any consequences
        arising from visiting third-party links.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">
        Updates to This Disclaimer
      </h2>
      <p className="mb-4">
        This disclaimer may be updated periodically. Continued use of the site
        after changes are published indicates acceptance of the revised terms.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">
        Contact Details
      </h2>
      <p>
        For any questions regarding this disclaimer, contact us at:
        <br />
        📧 <strong>Email:</strong> gautamshubham962@gmail.com <br />
        🌐 <strong>Website:</strong> https://taskguru.online
      </p>
    </main>
  );
}

