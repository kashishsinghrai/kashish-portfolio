import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    // ✅ Updated to your primary brand domain
    sitemap: "https://kashishsinghrai.vercel.app/sitemap.xml",
  };
}
