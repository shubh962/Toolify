// app/layout.js
export const metadata = {
  title: "Toolify - Free Online Tools",
  description: "Toolify provides free tools like background remover, image compressor, and many more.",
  keywords: ["background remover", "image compressor", "free online tools", "Toolify", "SEO tools"],
  verification: {
    google: "j1D8UM6F1hAWIwPinZ9EQaAhrXkIf662vG7Aj6OR4JU"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* This section is handled automatically by metadata above in Next.js 13+ */}
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
