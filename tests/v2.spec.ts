import { test, expect } from "@playwright/test";

test("komut örnekleri JavaScript kapalıyken de okunur", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  try {
    const page = await context.newPage();
    await page.goto("http://127.0.0.1:3000/commands");
    await expect(page.locator(".command-card")).toHaveCount(10);
    await expect(page.locator(".command-card").first()).toHaveCSS("opacity", "1");
    await expect(page.getByRole("heading", { name: "Hesap makinesini aç." })).toBeVisible();
  } finally {
    await context.close();
  }
});

test("komut kataloğu arama, kategori, boş durum ve bağlantı", async ({ page }, info) => {
  await page.goto("/commands");
  await expect(page.locator(".command-card")).toHaveCount(10);
  await page.getByRole("button", { name: "Dosyalar", exact: true }).click();
  await expect(page.locator(".command-card")).toHaveCount(3);
  await page.getByRole("searchbox", { name: "Komutlarda ara" }).fill("İNDİRİLENLER");
  await expect(page.locator(".command-card")).toHaveCount(1);
  await page.getByRole("link", { name: "İlgili rehber" }).click();
  await expect(page).toHaveURL(/docs\/komutlar#dosyalar$/);
  await expect(page.locator("#dosyalar")).toBeVisible();
  await page.goto("/commands");
  await page.getByRole("searchbox").fill("olmayanbirkomut");
  await expect(page.locator(".command-card")).toHaveCount(0);
  await page.getByRole("button", { name: "Filtreleri sıfırla" }).click();
  await expect(page.locator(".command-card")).toHaveCount(10);
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
  ).toBeTruthy();
  await page.screenshot({ path: info.outputPath("catalog.png") });
});

test("MDX içeriği, kalıcı okuma teması ve destek taslağı", async ({ page }, info) => {
  await page.goto("/docs/kurulum");
  await expect(page.locator("#ortam pre")).toContainText("python -m venv .venv");
  await page.getByRole("button", { name: /Okuma temasını değiştir/ }).click();
  await expect(page.locator("html")).toHaveAttribute("data-docs-theme", "light");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-docs-theme", "light");
  await page.screenshot({ path: info.outputPath("docs-light.png"), fullPage: true });
  await page.getByRole("button", { name: /Okuma temasını değiştir/ }).click();
  await expect(page.locator("html")).toHaveAttribute("data-docs-theme", "dark");
  await page.goto("/support");
  const href = await page.getByRole("link", { name: "E-posta taslağını aç" }).getAttribute("href");
  const url = new URL(href!);
  expect(url.pathname).toBe("egeaydin.dev@gmail.com");
  expect(url.searchParams.get("body")).toContain("Tekrarlama adımları");
});

test("reaktör kaydırmayla ayrılır, birleşir ve sade görünüme geçer", async ({ page }, info) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await page.evaluate(() => (document.documentElement.style.scrollBehavior = "auto"));
  const reactor = page.locator("#reaktor");
  const scroll = async (progress: number) =>
    reactor.evaluate((el, p) => {
      const rect = el.getBoundingClientRect();
      window.scrollTo(0, scrollY + rect.top + (rect.height - innerHeight) * p);
    }, progress);
  await scroll(0.05);
  await expect(page.locator(".reactor-canvas canvas")).toBeVisible({ timeout: 20000 });
  await expect(page.locator(".reactor-canvas")).toHaveCSS("opacity", "1");
  await expect(reactor).toHaveAttribute("data-phase", "0");
  await page.screenshot({ path: info.outputPath("reactor-assembled.png") });
  await scroll(0.5);
  await expect(reactor).toHaveAttribute("data-phase", "1");
  await page.screenshot({ path: info.outputPath("reactor-exploded.png") });
  await scroll(0.95);
  await expect(reactor).toHaveAttribute("data-phase", "2");
  await page.getByRole("button", { name: "Sade görünüme geç" }).click();
  await expect(page.locator(".reactor-fallback")).toBeVisible();
  await expect(page.locator(".reactor-canvas canvas")).toHaveCount(0);
  expect(errors).toEqual([]);
});

test("azaltılmış hareket ve WebGL kaybı için görsel yedek", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#reaktor");
  await expect(page.locator(".reactor-fallback")).toBeVisible();
  await expect(page.locator(".reactor-canvas canvas")).toHaveCount(0);
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await expect(page.locator(".reactor-canvas canvas")).toBeVisible();
  await page.locator(".reactor-canvas canvas").dispatchEvent("webglcontextlost");
  await expect(page.locator(".reactor-fallback")).toBeVisible();
});
