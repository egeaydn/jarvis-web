import type { MetadataRoute } from "next";
export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_SITE_URL;
  const indexable = process.env.SITE_INDEXABLE === "true" && !!base;
  return {
    rules: { userAgent: "*", ...(indexable ? { allow: "/" } : { disallow: "/" }) },
    ...(indexable ? { sitemap: `${base?.replace(/\/$/, "")}/sitemap.xml` } : {}),
  };
}
