// src/app/head.tsx
// src/app/head.tsx
export default function Head() {
  return (
    <>
      {/* ✅ Title + Description handled in layout.tsx metadata 
          (no need to duplicate here) */}

      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta charSet="UTF-8" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="en" />

      {/* ✅ Canonical for safety (layout.tsx already handles dynamic canonical) */}
      <link rel="canonical" href="https://taskguru.online" />

      {/* ⚡ Structured Data - Keep only ONE version (remove from layout.tsx if you want to keep here) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "TaskGuru",
            url: "https://taskguru.online",
            potentialAction: {
              "@type": "SearchAction",
              target: "https://taskguru.online/tools/{search_term_string}",
              "query-input": "required name=search_term_string",
            },
          }),
        }}
      />
    </>
  );
}
