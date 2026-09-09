import { test, expect } from "@playwright/test";

test("video plays, seeks to chapters and remains inside the viewport", async ({ page }, info) => {
  await page.goto("/");
  await page.getByRole("link", { name: "1 dakikada izle" }).click();
  const video = page.getByLabel("Jarvis gerçek kullanım videosu");
  await expect(video).toBeVisible();
  await expect(video).toHaveAttribute("preload", "none");
  expect(await video.evaluate((el: HTMLVideoElement) => el.paused)).toBe(true);
  await page.getByRole("button", { name: /00:39 Kendi tercihlerin/ }).click();
  await expect
    .poll(() => video.evaluate((el: HTMLVideoElement) => el.readyState))
    .toBeGreaterThanOrEqual(2);
  await expect
    .poll(() => video.evaluate((el: HTMLVideoElement) => el.currentTime))
    .toBeGreaterThan(38);
  const duration = await video.evaluate((el: HTMLVideoElement) => el.duration);
  expect(duration).toBeGreaterThan(59);
  expect(duration).toBeLessThan(61);
  await video.evaluate((el: HTMLVideoElement) => el.pause());
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.getByText("Videonun yazılı açıklamasını oku", { exact: true }).click();
  await expect(
    page.getByText("Videoda sesli komut gösterimi bulunmaz.", { exact: false }),
  ).toBeVisible();
  await page
    .locator("#kullanim-videosu")
    .screenshot({ path: info.outputPath("product-video.png") });
});

test("video range requests, captions and poster are served", async ({ request }) => {
  const response = await request.get("/videos/jarvis-kullanim.mp4", {
    headers: { Range: "bytes=0-1023" },
  });
  expect(response.status()).toBe(206);
  expect((await response.body()).length).toBe(1024);
  expect(response.headers()["content-type"]).toContain("video/mp4");
  expect((await request.get("/videos/jarvis-kullanim-poster.jpg")).ok()).toBe(true);
  const captions = await request.get("/videos/jarvis-kullanim.tr.vtt");
  expect(await captions.text()).toContain("WEBVTT");
});
