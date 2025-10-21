#!/usr/bin/env node
// materialize-seed.mjs — deterministic materializer (repo-root aware, verbose)
// Usage: node materialize-seed.mjs <seed.json>

import fs from "node:fs";
import path from "node:path";
import process from "node:process";

function findRepoRootFromSeed(seedFilePath) {
    const full = path.resolve(seedFilePath);
    let cur = path.dirname(full);
    while (true) {
        const base = path.basename(cur);
        if (base.toLowerCase() === "halos") {
            // repo root is the parent of 'Halos'
            const parent = path.dirname(cur) || path.parse(cur).root;
            return parent;
        }
        const up = path.dirname(cur);
        if (!up || up === cur) {
            // fallback to seed directory
            return path.dirname(full);
        }
        cur = up;
    }
}

function ensureDir(dir) {
    fs.mkdirSync(dir, { recursive: true });
}

const [, , seedArg] = process.argv;
if (!seedArg) {
    console.error("Usage: node materialize-seed.mjs <seed.json>");
    process.exit(2);
}

const seedPath = path.resolve(seedArg);
if (!fs.existsSync(seedPath)) {
    console.error(`Seed file not found: ${seedPath}`);
    process.exit(2);
}

const seedText = fs.readFileSync(seedPath, "utf8");
let seed;
try { seed = JSON.parse(seedText); } catch (e) {
    console.error(`Failed to parse JSON: ${seedPath}\n${e.message}`);
    process.exit(2);
}

if (!seed.bundled_files) {
    console.error("No bundled_files found in seed.");
    process.exit(2);
}

const repoRoot = findRepoRootFromSeed(seedPath);
const seedDir = path.dirname(seedPath);

console.log(`[INFO] Seed      : ${seedPath}`);
console.log(`[INFO] Seed Dir  : ${seedDir}`);
console.log(`[INFO] Repo Root : ${repoRoot}`);
console.log("");

let count = 0;
for (const bundle of seed.bundled_files) {
    const normalized = bundle.path.replace(/\//g, path.sep);
    let outPath;
    if (/^Halos[\\/]/i.test(bundle.path)) {
        outPath = path.join(repoRoot, normalized);
    } else {
        outPath = path.join(seedDir, normalized);
    }

    ensureDir(path.dirname(outPath));

    if (bundle.kind === "json") {
        fs.writeFileSync(outPath, JSON.stringify(bundle.json, null, 2), "utf8");
    } else if (bundle.kind === "text") {
        fs.writeFileSync(outPath, bundle.text, "utf8");
    } else {
        console.error(`Unknown kind '${bundle.kind}' for path '${bundle.path}'.`);
        process.exit(2);
    }

    console.log(`[OK] ${bundle.kind.toUpperCase()} → ${outPath}`);
    count++;
}

console.log(`\n[OK] Materialized ${count} files.`);
console.log("\nTo install and validate:");
console.log("  npm --prefix gates install");
console.log("  npm --prefix gates run next:validate:file -- .\\gates\\samples\\whatsnext.sample.json");
