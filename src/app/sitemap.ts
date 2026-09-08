import type { MetadataRoute } from "next";
import { docs } from "@/lib/docs";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");
  return ["", "/download", "/support", "/changelog", ...docs.map((doc) => `/docs/${doc.slug}`)].map(
    (path) => ({ url: `${base}${path}` }),
  );
}
