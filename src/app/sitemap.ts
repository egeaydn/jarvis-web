import type { MetadataRoute } from "next";
import { docs } from "@/lib/docs";
import { seoSettings } from "@/lib/seo";
export default function sitemap(): MetadataRoute.Sitemap {
  const { origin: base, indexable } = seoSettings();
  if (!base || !indexable) return [];
  return ["", "/commands", "/download", "/support", "/changelog"]
    .map((path) => ({ url: `${base}${path}` }))
    .concat(docs.map((doc) => ({ url: `${base}/docs/${doc.slug}`, lastModified: doc.updatedAt })));
}
