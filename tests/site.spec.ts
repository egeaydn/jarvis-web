import { expect, test } from "@playwright/test";
import { parseRelease } from "../src/lib/release";
import { searchDocs } from "../src/lib/docs";

test("ana sayfa, senaryo geçişi ve mobil taşma", async ({ page }, info) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Daha az tıkla.");
  await page.getByRole("button", { name: "Dosyalarını bul" }).click();
  await expect(page.getByText("proje-sunumu.pdf", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Aklındakini kaydet" }).click();
  await expect(page.getByText("Notlar koleksiyonuna eklendi", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Güne başla" }).click();
  await expect(page.getByText("Tarayıcı açıldı", { exact: true })).toBeVisible();
  const widths = await page.evaluate(() => ({
    content: document.documentElement.scrollWidth,
    viewport: window.innerWidth,
  }));
  expect(widths.content).toBeLessThanOrEqual(widths.viewport);
  await page.getByRole("button", { name: "Jarvis tamamen çevrimdışı çalışıyor mu?" }).click();
  await expect(page.getByText("Hayır. Model yanıtları", { exact: false })).toBeVisible();
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path: info.outputPath("home.png"), fullPage: true });
  expect(errors).toEqual([]);
});

test("arama, klavye kapatma ve belgeye geçiş", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Belgelerde ara" }).click();
  const query = page.getByRole("textbox", { name: "Belgelerde ara" });
  await query.fill("MIKROFON");
  await expect(
    page.getByRole("dialog").getByRole("link", { name: /Sesli kullanım/ }),
  ).toBeVisible();
  await query.fill("xyzzzyolmayan");
  await expect(page.getByText("Sonuç bulunamadı.", { exact: false })).toBeVisible();
  await query.fill("sağlayıcı");
  await page
    .getByRole("dialog")
    .getByRole("link", { name: /AI sağlayıcıları/ })
    .click();
  await expect(page).toHaveURL(/\/docs\/saglayicilar$/);
  await page.keyboard.press("Control+k");
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
});

test("beta indirme ve kurulum rehberi", async ({ page }) => {
  await page.goto("/download");
  await expect(page.getByRole("link", { name: "Windows için indir", exact: true })).toHaveAttribute("href", /\/downloads\/Jarvis-.*\.exe$/);
  await expect(page.getByRole("link", { name: "Kurulum rehberini oku" })).toBeVisible();
  await page.getByRole("link", { name: "Kurulum rehberini oku" }).click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Windows kurulumu");
});

test("belgeler, destek, sürümler ve 404", async ({ page }, info) => {
  for (const route of [
    "/docs/baslangic",
    "/docs/kurulum",
    "/docs/saglayicilar",
    "/docs/sesli-kullanim",
    "/docs/komutlar",
    "/docs/gizlilik",
    "/docs/sorun-giderme",
    "/docs/guncellemeler",
    "/support",
    "/changelog",
  ]) {
    const response = await page.goto(route);
    expect(response?.status(), route).toBe(200);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
      route,
    ).toBeTruthy();
  }
  await page.goto("/docs/kurulum");
  await page.screenshot({ path: info.outputPath("docs.png"), fullPage: true });
  const response = await page.goto("/docs/olmayan-belge");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Başka bir yol");
});

test("mobil menü ve azaltılmış hareket", async ({ page, isMobile }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  if (isMobile) {
    await page.getByRole("button", { name: "Menüyü aç" }).click();
    await page
      .getByRole("navigation", { name: "Mobil menü", exact: true })
      .getByRole("link", { name: "Dokümantasyon" })
      .click();
    await expect(page).toHaveURL(/\/docs\/baslangic$/);
    await expect(
      page.getByRole("navigation", { name: "Mobil menü", exact: true }),
    ).not.toBeVisible();
  }
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe(
    "auto",
  );
});

test("temel içerik JavaScript olmadan okunur", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:3000/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await page.getByRole("link", { name: "Windows için indir", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Jarvis for Windows" })).toBeVisible();
  await context.close();
});

test("release doğrulaması ve Türkçe arama", () => {
  expect(parseRelease({})).toBeNull();
  const release = {
    JARVIS_RELEASE_PUBLISHED: "true",
    JARVIS_DOWNLOAD_URL: "https://github.com/example/project/releases/download/v1.0.0/Jarvis.exe",
    JARVIS_VERSION: "1.0.0",
    JARVIS_SHA256: "a".repeat(64),
    JARVIS_SIZE_BYTES: "1048576",
    JARVIS_PUBLISHED_AT: "2026-09-08",
    JARVIS_PUBLISHER: "Test Publisher",
    JARVIS_PLATFORM: "Windows test",
  };
  expect(parseRelease(release)?.version).toBe("1.0.0");
  expect(
    parseRelease({ ...release, JARVIS_DOWNLOAD_URL: "https://untrusted.example/Jarvis.exe" }),
  ).toBeNull();
  expect(
    parseRelease({ ...release, JARVIS_DOWNLOAD_URL: "http://github.com/example.exe" }),
  ).toBeNull();
  expect(parseRelease({ ...release, JARVIS_SHA256: "bad" })).toBeNull();
  expect(parseRelease({ ...release, JARVIS_SIZE_BYTES: "-1" })).toBeNull();
  expect(parseRelease({ ...release, JARVIS_PUBLISHED_AT: "2026-02-31" })).toBeNull();
  expect(parseRelease({ ...release, JARVIS_RELEASE_PUBLISHED: "false" })).toBeNull();
  expect(searchDocs("MIKROFON").map((doc) => doc.slug)).toContain("sesli-kullanim");
  expect(searchDocs("saglayici").map((doc) => doc.slug)).toContain("saglayicilar");
});

test("kopyalama geri bildirimi ve izin hatası", async ({ page }) => {
  await page.goto("/support");
  await page.evaluate(() =>
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: {
        writeText: async (text: string) => {
          document.documentElement.dataset.copied = text;
        },
      },
    }),
  );
  await page.getByRole("button", { name: "Kodu kopyala" }).click();
  await expect(page.getByRole("button", { name: "Kodu kopyala" })).toContainText("Kopyalandı");
  expect(await page.evaluate(() => document.documentElement.dataset.copied)).toContain(
    "Uygulama sürümü:",
  );
  await page.evaluate(() =>
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: {
        writeText: async () => {
          throw new Error("Permission denied");
        },
      },
    }),
  );
  await page.getByRole("button", { name: "Kodu kopyala" }).click();
  await expect(page.getByRole("status")).toContainText("Panoya erişilemedi");
});

test("320 piksel ekran ve paylaşım görseli", async ({ page, request }, info) => {
  await page.setViewportSize({ width: 320, height: 800 });
  for (const path of ["/", "/download", "/docs/kurulum"]) {
    await page.goto(path);
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
      path,
    ).toBeTruthy();
  }
  const image = await request.get("/opengraph-image");
  expect(image.ok()).toBeTruthy();
  expect(image.headers()["content-type"]).toContain("image/png");
  await page.setViewportSize({
    width: info.project.name === "mobile" ? 390 : 1440,
    height: info.project.name === "mobile" ? 844 : 1000,
  });
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.locator(".hero-copy")).toHaveCSS("opacity", "1");
  await expect(page.locator(".hero > [data-reveal]")).toHaveCSS("opacity", "1");
  await page.screenshot({ path: info.outputPath("first-screen.png") });
});
