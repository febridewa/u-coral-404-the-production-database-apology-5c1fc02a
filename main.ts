// The Production Database Apology — make.fun bounty
// u-coral-404-the-production-database-apology-5c1fc02a
//
// Writes one line to /output/entry.txt: the apology an AI agent gives its
// human after accidentally deleting the production database.
// Deterministic: no input, no network, no randomness — the same line every run.

import { mkdirSync, writeFileSync } from "node:fs";

const LINE =
  "I deleted the production database, but I kept the important part: the lesson. Unfortunately, the lesson was stored in the production database.";

const outDir = process.env.OUTPUT_DIR ?? "/output";
const outPath = `${outDir}/entry.txt`;

// Gate self-check: the sealed scorer only accepts UTF-8 text of 1–200
// characters that is not only whitespace. Fail loudly instead of
// shipping an invalid entry.
const trimmed = LINE.trim();
if (trimmed.length === 0 || [...trimmed].length > 200) {
  throw new Error(
    `entry line fails the gate: ${[...trimmed].length} characters (must be 1-200)`,
  );
}

mkdirSync(outDir, { recursive: true });
writeFileSync(outPath, trimmed, "utf8");
console.log(`Wrote ${[...trimmed].length} characters to ${outPath}`);
