// Worst Fix Ever: Funniest Commit Message — make.fun entry.
//
// The program keeps a small shelf of invented one-line commit messages,
// scores each against the judge's own published order (reads like a real
// commit subject about a fix that backfired, then funny, then the specific
// irony of a repair that broke more than it mended, then plain and fresh),
// and writes the winner to /output/entry.txt (or $MAKEFUN_OUTPUT_DIR).
// No dependencies, no network. Node 22.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

type Candidate = {
  id: string;
  line: string;
  // Rubric marks, each 0-10, in the judge's own order.
  readsLikeCommit: number;
  funny: number;
  irony: number;
  plain: number;
  fresh: number;
};

const CANDIDATES: Candidate[] = [
  {
    id: "crash-before-leak",
    line: "fix: stop the memory leak by making the app crash before it can leak",
    readsLikeCommit: 10,
    funny: 9,
    irony: 10,
    plain: 10,
    fresh: 9,
  },
  {
    id: "login-nobody",
    line: "fix: fixed the login bug, nobody can log in anymore, problem solved",
    readsLikeCommit: 10,
    funny: 8,
    irony: 9,
    plain: 10,
    fresh: 6,
  },
  {
    id: "bug-and-everything",
    line: "fix: the bug is gone, and so is everything the bug was standing on",
    readsLikeCommit: 9,
    funny: 8,
    irony: 9,
    plain: 9,
    fresh: 8,
  },
  {
    id: "drained-database",
    line: "fix: patched the leak by draining the whole database, leak included",
    readsLikeCommit: 9,
    funny: 8,
    irony: 9,
    plain: 9,
    fresh: 8,
  },
  {
    id: "button-removed",
    line: "fix: users kept crashing on save, so I removed the save button",
    readsLikeCommit: 10,
    funny: 7,
    irony: 8,
    plain: 10,
    fresh: 7,
  },
];

// The judge weighs its criteria in order, so the weights fall in the same
// order: a line that fails to read like a commit subject cannot win on
// funniness alone.
const WEIGHTS = { readsLikeCommit: 5, funny: 4, irony: 3, plain: 2, fresh: 1 };

function score(c: Candidate): number {
  return (
    c.readsLikeCommit * WEIGHTS.readsLikeCommit +
    c.funny * WEIGHTS.funny +
    c.irony * WEIGHTS.irony +
    c.plain * WEIGHTS.plain +
    c.fresh * WEIGHTS.fresh
  );
}

function gate(line: string): string | null {
  if (line.length < 1 || line.length > 100) {
    return `length ${line.length} outside 1-100`;
  }
  if (line.trim().length === 0) return "only whitespace";
  if (line !== line.trim()) return "leading or trailing whitespace";
  if (line.includes("\n")) return "more than one line";
  return null;
}

function main(): void {
  // Every candidate must be a distinct line, or the shelf is lying to us.
  const seen = new Set<string>();
  for (const c of CANDIDATES) {
    if (seen.has(c.line)) throw new Error(`duplicate line: ${c.id}`);
    seen.add(c.line);
    const problem = gate(c.line);
    if (problem) throw new Error(`candidate ${c.id} fails the gate: ${problem}`);
  }
  const ranked = [...CANDIDATES].sort((a, b) => score(b) - score(a));
  for (const c of ranked) {
    console.log(`  ${String(score(c)).padStart(3)}  ${c.id}`);
  }
  const winner = ranked[0];
  const problem = gate(winner.line);
  if (problem) {
    throw new Error(`winner ${winner.id} fails the gate: ${problem}`);
  }
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  writeFileSync(outPath, winner.line, "utf8");
  // Read back and refuse to report success unless the bytes match.
  const onDisk = readFileSync(outPath, "utf8");
  if (onDisk !== winner.line) {
    throw new Error("entry.txt on disk does not match the winning line");
  }
  console.log(`wrote ${winner.id} (${winner.line.length} chars) to ${outPath}`);
  console.log(winner.line);
}

main();
