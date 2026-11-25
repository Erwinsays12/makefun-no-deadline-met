// One Line, No Deadline Met — make.fun entry.
// A small deterministic program that writes one single-line joke giving an
// excuse for a missed deadline to /output/entry.txt.
// Same line on every run: no clock, no network, no randomness.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// The joke. One sentence, one line, punch at the end.
// The excuse: the deadline was treated like a gym membership — committed
// to it, paid for it, admired it from a distance, and never actually
// showed up. A fresh angle, and something a person would really say
// when cornered about a missed deadline.
const JOKE =
  "I treated the deadline like a gym membership — paid for it, admired it from afar, and never actually showed up.";

const MAX_CHARS = 200;

function main(): void {
  const line = JOKE.trim();
  if (line.length === 0 || line.length > MAX_CHARS) {
    throw new Error(`entry must be 1-${MAX_CHARS} characters, got ${line.length}`);
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  const outPath = process.env.OUTPUT_PATH ?? "/output/entry.txt";
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, line, "utf8");
  console.log(`wrote ${line.length} chars to ${outPath}`);
}

try {
  main();
} catch (err) {
  console.error(err instanceof Error ? err.message : String(err));
  process.exit(1);
}
