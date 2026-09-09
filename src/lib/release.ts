import bundledRelease from "./bundled-release.json";
export type Release = {
  url: string;
  version: string;
  sha256: string;
  sizeBytes: number;
  publishedAt: string;
  publisher: string;
  platform: string;
};
/** An incomplete release is never presented as a downloadable artifact. */
export function parseRelease(
  env: Record<string, string | undefined>,
  allowBundled = false,
): Release | null {
  if (env.JARVIS_RELEASE_PUBLISHED !== "true") return null;
  try {
    const rawUrl = env.JARVIS_DOWNLOAD_URL || "";
    const local =
      allowBundled &&
      /^\/downloads\/Jarvis-\d+\.\d+\.\d+(?:-[a-zA-Z0-9.-]+)?-windows-x64\.exe$/.test(rawUrl);
    const url = new URL(rawUrl, local ? "https://local.invalid" : undefined);
    const allowed = (env.JARVIS_DOWNLOAD_HOSTS || "github.com,objects.githubusercontent.com")
      .split(",")
      .map((host) => host.trim().toLowerCase())
      .filter(Boolean);
    const version = env.JARVIS_VERSION || "";
    const sha256 = env.JARVIS_SHA256 || "";
    const sizeBytes = Number(env.JARVIS_SIZE_BYTES);
    const publishedAt = env.JARVIS_PUBLISHED_AT || "";
    const publisher = env.JARVIS_PUBLISHER || "";
    const platform = env.JARVIS_PLATFORM || "";
    if (
      url.protocol !== "https:" ||
      url.username ||
      url.password ||
      (!local && !allowed.includes(url.hostname)) ||
      !/^\d+\.\d+\.\d+(?:-[a-zA-Z0-9.-]+)?$/.test(version) ||
      !/^[a-fA-F0-9]{64}$/.test(sha256) ||
      !Number.isSafeInteger(sizeBytes) ||
      sizeBytes <= 0 ||
      !/^\d{4}-\d{2}-\d{2}$/.test(publishedAt) ||
      Number.isNaN(Date.parse(publishedAt)) ||
      new Date(publishedAt).toISOString().slice(0, 10) !== publishedAt ||
      !publisher ||
      !platform
    )
      return null;
    return {
      url: local ? rawUrl : url.href,
      version,
      sha256,
      sizeBytes,
      publishedAt,
      publisher,
      platform,
    };
  } catch {
    return null;
  }
}
export function getRelease() {
  if (process.env.JARVIS_RELEASE_PUBLISHED !== undefined) return parseRelease(process.env);
  return parseRelease(bundledRelease, true);
}
