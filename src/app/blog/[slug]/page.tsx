import { notFound } from 'next/navigation';

// 💡 यह फ़ंक्शन आपके सारे ब्लॉग पोस्ट का डेटा fetch/import करेगा
import { getBlogPostDataBySlug } from '@/lib/blog-data'; 

export default async function DynamicBlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPostDataBySlug(params.slug);

  if (!post) {
    // अगर slug के लिए कोई डेटा नहीं मिला, तो 404 दिखाएँ
    notFound(); 
  }

  // 💡 यहाँ पोस्ट.कंटेंट को रेंडर करने का लॉजिक डालें
  return (
    <div className="max-w-4xl mx-auto py-10">
      <h1 className="text-4xl">{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content }} /> 
      {/* ...rest of your dynamic rendering logic */}
    </div>
  );
}
// अगर आप GitHub पर सीधा HTML/MDX यूज़ कर रहे हैं, तो यह और जटिल होगा।
// Next.js App Router में, डायनामिक कंटेंट को DB/CMS से fetch करना सबसे अच्छा तरीका है।
