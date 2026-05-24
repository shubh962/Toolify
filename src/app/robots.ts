import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/ads/", "/Ads/"],
    },
    sitemap: "https://www.taskguru.online/sitemap.xml",
    host: "www.taskguru.online",
  };
}
