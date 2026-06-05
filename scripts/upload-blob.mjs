// Usage: BLOB_READ_WRITE_TOKEN=<token> node scripts/upload-blob.mjs <file> <pathname>
// Example: BLOB_READ_WRITE_TOKEN=xxx node scripts/upload-blob.mjs /private/tmp/the-digital-gym-youtube.mp4 video/the-digital-gym-youtube.mp4

import { put } from "@vercel/blob";
import { readFileSync } from "fs";
import { basename } from "path";

const [, , filePath, blobPathname] = process.argv;

if (!filePath) {
  console.error("Usage: node scripts/upload-blob.mjs <file> [blob-pathname]");
  process.exit(1);
}

if (!process.env.BLOB_READ_WRITE_TOKEN) {
  console.error("Missing BLOB_READ_WRITE_TOKEN env var");
  process.exit(1);
}

const pathname = blobPathname ?? `uploads/${basename(filePath)}`;
const file = readFileSync(filePath);
const contentType = filePath.endsWith(".mp4") ? "video/mp4" : "application/octet-stream";

console.log(`Uploading ${filePath} → ${pathname} ...`);
const blob = await put(pathname, file, { access: "public", contentType });
console.log(`\nDone! URL:\n${blob.url}`);
console.log(`\nAdd to essay frontmatter:\nvideoUrl: "${blob.url}"`);
