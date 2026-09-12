import { test, expect } from "@playwright/test";
import { seoSettings, pageMetadata, serializeJsonLd } from "../src/lib/seo";
import { docs } from "../src/lib/docs";

test("SEO publication gate rejects local and malformed origins", () => {
  for (const url of [
    undefined,
    "garbage",
    "http://jarvis.example.com",
    "https://localhost",
    "https://localhost.",
    "https://127.0.0.1",
    "https://[::1]",
    "https://jarvis.local",
    "https://jarvis.test",
    "https://jarvis.example.com/docs",
    "https://jarvis.example.com?x=1",
    "https://user:password@jarvis.example.com",
  ]) {
    expect(seoSettings({ NEXT_PUBLIC_SITE_URL: url, SITE_INDEXABLE: "true" }).indexable, url).toBe(
      false,
    );
  }
  expect(
    seoSettings({ NEXT_PUBLIC_SITE_URL: "https://jarvis.example.com/", SITE_INDEXABLE: "true" }),
  ).toEqual({ origin: "https://jarvis.example.com", indexable: true });
  expect(
    seoSettings({ NEXT_PUBLIC_SITE_URL: "https://jarvis.example.com", SITE_INDEXABLE: "false" })
      .indexable,
  ).toBe(false);
});

test("SEO metadata canonical and sharing title belong to each page", () => {
  const meta = pageMetadata("/docs/kurulum", "Windows kurulumu", "Kurulum rehberi", {
    NEXT_PUBLIC_SITE_URL: "https://jarvis.example.com",
  });
  expect(meta.alternates?.canonical).toBe("https://jarvis.example.com/docs/kurulum");
  expect(meta.openGraph).toMatchObject({
    title: "Windows kurulumu · Jarvis",
    url: "https://jarvis.example.com/docs/kurulum",
  });
  expect(meta.twitter).toMatchObject({
    title: "Windows kurulumu · Jarvis",
    description: "Kurulum rehberi",
  });
  expect(pageMetadata("/", "Jarvis", "Asistan", {}).alternates).toBeUndefined();
});

test("SEO JSON-LD escapes script injection", () => {
  const text = serializeJsonLd({ name: "</script><script>alert(1)</script>" });
  expect(text).not.toContain("<");
  expect(JSON.parse(text).name).toBe("</script><script>alert(1)</script>");
});

test("SEO initial HTML has unique metadata and readable FAQ answers", async ({ request }) => {
  const titles = new Set<string>();
  const descriptions = new Set<string>();
  for (const path of [
    "/",
    "/download",
    "/commands",
    "/support",
    "/changelog",
    ...docs.map((doc) => `/docs/${doc.slug}`),
  ]) {
    const response = await request.get(path);
    expect(response.status(), path).toBe(200);
    const html = await response.text();
    expect(html).toContain('lang="tr"');
    expect(html.match(/<h1(?:\s|>)/g)?.length, path).toBe(1);
    const title = html.match(/<title>([\s\S]*?)<\/title>/)?.[1] || "";
    const description = html.match(/<meta name="description" content="([^"]+)"/)?.[1] || "";
    expect(title.length, path).toBeGreaterThan(5);
    expect(description.length, path).toBeGreaterThan(20);
    expect(titles.has(title), `Duplicate title: ${path}`).toBe(false);
    expect(descriptions.has(description), `Duplicate description: ${path}`).toBe(false);
    titles.add(title);
    descriptions.add(description);
    expect(html, path).toMatch(/<meta name="robots" content="[^"]*noindex/);
    expect(html, path).not.toContain('rel="canonical"');
    const schemas = [
      ...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g),
    ].map((match) => JSON.parse(match[1]));
    if (path === "/") {
      expect(html).toContain("<details");
      expect(html).toContain("Hayır. Model yanıtları");
      expect(schemas.some((s) => s["@type"] === "WebSite")).toBe(true);
    }
    if (path === "/download")
      expect(schemas.some((s) => s["@type"] === "SoftwareApplication" && s.softwareVersion)).toBe(
        true,
      );
    if (path.startsWith("/docs/"))
      expect(
        schemas.some((s) => s["@type"] === "TechArticle" && s.dateModified === docs.find((doc) => path === `/docs/${doc.slug}`)?.updatedAt),
      ).toBe(true);
  }
  const robots = await (await request.get("/robots.txt")).text();
  expect(robots).toContain("Disallow: /");
  const sitemap = await (await request.get("/sitemap.xml")).text();
  expect(sitemap).not.toContain("<loc>");
  expect((await request.get("/page-that-does-not-exist")).status()).toBe(404);
});
