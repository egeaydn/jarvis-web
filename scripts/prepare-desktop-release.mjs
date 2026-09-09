import { copyFile, mkdir, readFile, stat, writeFile } from "node:fs/promises";
import { createReadStream } from "node:fs";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";
import path from "node:path";

// Copy only the explicitly selected EXE, never application settings or user data.
const [source, version] = process.argv.slice(2);
if (!source || !/^\d+\.\d+\.\d+(?:-[a-zA-Z0-9.-]+)?$/.test(version || "")) {
  throw new Error("Usage: npm run release:prepare -- <Jarvis.exe> <desktop-version>");
}
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourcePath = path.resolve(source);
const sourceInfo = await stat(sourcePath);
if (!sourceInfo.isFile() || path.extname(sourcePath).toLowerCase() !== ".exe")
  throw new Error("Select an EXE file.");
const hashFile = async (file) => {
  const hash = createHash("sha256");
  for await (const chunk of createReadStream(file)) hash.update(chunk);
  return hash.digest("hex");
};
const filename = `Jarvis-${version}-windows-x64.exe`;
const directory = path.join(root, "public", "downloads");
await mkdir(directory, { recursive: true });
const destination = path.join(directory, filename);
const sha256 = await hashFile(sourcePath);
try {
  await copyFile(sourcePath, destination, 1); // Versioned files must never be silently overwritten.
} catch (error) {
  if (error.code !== "EEXIST" || (await hashFile(destination)) !== sha256) throw error;
}
if ((await hashFile(destination)) !== sha256) throw new Error("Copied artifact checksum mismatch.");
const bytes = await readFile(destination);
if (
  bytes[0] !== 0x4d ||
  bytes[1] !== 0x5a ||
  bytes.readUInt16LE(bytes.readUInt32LE(0x3c) + 4) !== 0x8664
)
  throw new Error("Expected a Windows x64 executable.");
const manifest = {
  JARVIS_RELEASE_PUBLISHED: "true",
  JARVIS_DOWNLOAD_URL: `/downloads/${filename}`,
  JARVIS_VERSION: version,
  JARVIS_SHA256: sha256,
  JARVIS_SIZE_BYTES: String(sourceInfo.size),
  JARVIS_PUBLISHED_AT: new Date().toISOString().slice(0, 10),
  JARVIS_PUBLISHER: "Ege Aydın",
  JARVIS_PLATFORM: "Windows x64 · Beta",
};
await writeFile(path.join(directory, `${filename}.sha256`), `${sha256}  ${filename}\n`);
await writeFile(path.join(directory, "release.json"), JSON.stringify(manifest, null, 2) + "\n");
await writeFile(
  path.join(root, "src/lib/bundled-release.json"),
  JSON.stringify(manifest, null, 2) + "\n",
);
console.log(`Prepared ${filename} (${sourceInfo.size} bytes), SHA-256: ${sha256}`);
