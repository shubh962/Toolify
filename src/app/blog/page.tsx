import Head from 'next/head';

export default function BlogPage() {
  return (
    <>
      <Head>
        <title>TaskGuru Blog | AI Tools, Productivity Tips & Free Utilities</title>
        <meta
          name="description"
          content="Read the latest from TaskGuru – explore AI tools, productivity hacks, online utilities, and how-to guides. Stay smart, work fast!"
        />
        <meta
          name="keywords"
          content="TaskGuru blog, free AI tools, productivity hacks, online tools, tech blog, tutorials, Next.js, image translator, PDF tools, smart utilities"
        />
        <meta property="og:title" content="TaskGuru Blog" />
        <meta property="og:description" content="Tips, tools, and tutorials to get the most from TaskGuru. Discover new ways to boost productivity!" />
        <meta property="og:url" content="https://taskguru.online/blog" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://taskguru.online/blog" />
      </Head>

      <main className="p-6 max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">📘 TaskGuru Blog</h1>
        <p className="mb-4 text-lg">
          Welcome to the official TaskGuru blog! 🚀 We’re here to help you make the most of our free tools — from smart AI utilities to coding shortcuts and productivity hacks.
        </p>
        <p className="mb-4 text-gray-700">
          Whether you’re a student, developer, creator, or professional — there’s something useful here for you. 💡
        </p>
        <p className="text-blue-600">
          📌 New articles coming soon. Bookmark this page or follow us on socials!
        </p>
      </main>
    </>
  );
}
