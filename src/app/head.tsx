// src/app/head.tsx
export default function Head() {
  return (
    <>
      <title>TaskGuru - Free Online Tools</title>
      <meta name="description" content="TaskGuru offers free tools like background remover, text utilities, and more." />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta charSet="UTF-8" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="en" />
      
      {/* Structured Data for Bing/Google */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "TaskGuru",
            url: "https://www.taskguru.online",
          }),
        }}
      />
    </>
  );
}
