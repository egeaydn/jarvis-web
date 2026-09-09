import type { Metadata } from "next";

export const siteDescription =
  "Jarvis, Windows için Türkçe yapay zekâ masaüstü asistanıdır. Sesli veya yazılı komutlarla uygulama aç, dosya bul ve not al. Kendi API anahtarınla kullan.";

/** A local or malformed preview URL must never enable public indexing. */
export function seoSettings(env: Record<string, string | undefined> = process.env) {
  let origin: string | null = null;
  try {
    const url = new URL(env.NEXT_PUBLIC_SITE_URL || "");
    const host = url.hostname.toLowerCase().replace(/\.$/, "");
    url.hostname = host;
    if (
      url.protocol === "https:" &&
      !url.username &&
      !url.password &&
      !url.port &&
      url.pathname === "/" &&
      !url.search &&
      !url.hash &&
      host.includes(".") &&
      !host.includes(":") &&
      !/^\d+(?:\.\d+)*$/.test(host) &&
      !/(^|\.)(localhost|local|internal|test|invalid)$/.test(host)
    )
      origin = url.origin;
  } catch {
    /* Unconfigured previews remain non-indexable. */
  }
  return { origin, indexable: !!origin && env.SITE_INDEXABLE === "true" };
}

export function pageMetadata(
  path: string,
  title: string,
  description: string,
  env: Record<string, string | undefined> = process.env,
): Metadata {
  const { origin } = seoSettings(env);
  const fullTitle = path === "/" ? title : `${title} · Jarvis`;
  return {
    title: { absolute: fullTitle },
    description,
    ...(origin ? { alternates: { canonical: `${origin}${path}` } } : {}),
    openGraph: {
      title: fullTitle,
      description,
      type: "website",
      locale: "tr_TR",
      siteName: "Jarvis",
      ...(origin ? { url: `${origin}${path}` } : {}),
    },
    twitter: { card: "summary_large_image", title: fullTitle, description },
  };
}

export function absoluteSiteUrl(path: string) {
  const { origin } = seoSettings();
  return origin ? `${origin}${path}` : undefined;
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  if (!seoSettings().origin) return null;
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteSiteUrl(item.path),
    })),
  };
}

export function serializeJsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
