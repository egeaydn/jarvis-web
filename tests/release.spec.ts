import { test, expect } from "@playwright/test";
import { parseRelease } from "../src/lib/release";
import bundled from "../src/lib/bundled-release.json";

test("bundled release only accepts a versioned local EXE", () => {
  expect(parseRelease(bundled)).toBeNull();
  expect(parseRelease(bundled, true)?.url).toBe(bundled.JARVIS_DOWNLOAD_URL);
  for (const url of ["//evil.example/a.exe", "/downloads/../secret.exe", "/images/a.exe", "/downloads/test.exe?x=1"]) {
    expect(parseRelease({ ...bundled, JARVIS_DOWNLOAD_URL: url }, true)).toBeNull();
  }
  expect(parseRelease({ ...bundled, JARVIS_SHA256: "bad" }, true)).toBeNull();
  expect(parseRelease({ ...bundled, JARVIS_RELEASE_PUBLISHED: "false" }, true)).toBeNull();
});

test("served release metadata, checksum and EXE size match", async ({ request }) => {
  const manifest = await request.get("/downloads/release.json");
  expect(manifest.ok()).toBeTruthy();
  expect(await manifest.json()).toEqual(bundled);
  const file = await request.head(bundled.JARVIS_DOWNLOAD_URL);
  expect(file.ok()).toBeTruthy();
  expect(file.headers()["content-length"]).toBe(bundled.JARVIS_SIZE_BYTES);
  const checksum = await request.get(`${bundled.JARVIS_DOWNLOAD_URL}.sha256`);
  expect((await checksum.text()).split(" ")[0]).toBe(bundled.JARVIS_SHA256);
});
