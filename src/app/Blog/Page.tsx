import Head from 'next/head';

export default function BlogPage() {
  return (
    <>
      <Head>
        <title>TaskGuru Blog | Tips, Tools & Tutorials</title>
        <meta name="description" content="Explore TaskGuru Blog for smart tools, productivity hacks, coding tutorials & online utilities." />
        <meta name="keywords" content="TaskGuru blog, coding tips, online tools, productivity hacks, nextjs blog, AI tools, utilities, free tools" />
        <link rel="canonical" href="https://taskguru.online/blog" />
      </Head>

      <main className="p-6 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">TaskGuru Blog</h1>
        <p className="mb-4">
          Welcome to the official TaskGuru blog! 🚀 Here, we share tutorials, updates, and smart tips to get the best out of our tools.
        </p>
        <p className="mb-4 text-gray-700">
          Stay tuned for new content coming soon. ✨
        </p>
      </main>
    </>
  );
}
