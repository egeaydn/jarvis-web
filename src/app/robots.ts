import type { MetadataRoute } from "next";
import { seoSettings } from "@/lib/seo";
export default function robots(): MetadataRoute.Robots {
  const { origin, indexable } = seoSettings();
  return {
    rules: { userAgent: "*", ...(indexable ? { allow: "/" } : { disallow: "/" }) },
    ...(indexable ? { sitemap: `${origin}/sitemap.xml` } : {}),
  };
}
