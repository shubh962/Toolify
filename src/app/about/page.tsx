// app/about/page.tsx

export default function AboutPage() {
  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-4">About TaskGuru</h1>
      <p className="text-lg text-gray-700">
        Welcome to TaskGuru – your all-in-one destination for smart online tools!
        Our mission is to simplify your digital life by providing free, easy-to-use, and effective utilities.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Why TaskGuru?</h2>
      <ul className="list-disc list-inside text-gray-700 space-y-1">
        <li>Fast & reliable tools</li>
        <li>No login required</li>
        <li>Mobile & SEO friendly</li>
        <li>Secure & privacy-focused</li>
      </ul>
    </main>
  );
}
