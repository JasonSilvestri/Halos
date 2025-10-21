#!/usr/bin/env node
// materialize-seed.mjs — repo-root aware for 'Halos/...', seed-local for 'gates/...'
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
            const parent = path.dirname(cur) || path.parse(cur).root;
            return parent;
        }
        const up = path.dirname(cur);
        if (!up || up === cur) return path.dirname(full);
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

let seed;
try {
    seed = JSON.parse(fs.readFileSync(seedPath, "utf8"));
} catch (e) {
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
console.log(`[INFO] Repo Root : ${repoRoot}\n`);

let count = 0;
for (const bundle of seed.bundled_files) {
    const normalized = bundle.path.replace(/\//g, path.sep);
    let outPath, mode;
    if (/^Halos[\\/]/i.test(bundle.path)) {
        outPath = path.join(repoRoot, normalized);
        mode = "repo-root";
    } else if (/^gates[\\/]/i.test(bundle.path)) {
        outPath = path.join(seedDir, normalized);
        mode = "seed-local";
    } else {
        outPath = path.join(seedDir, normalized);
        mode = "default";
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

    console.log(`[TRACE] mode=${mode} in='${bundle.path}' → out='${outPath}'`);
    console.log(`[OK] ${bundle.kind.toUpperCase()} → ${outPath}`);
    count++;
}

console.log(`\n[OK] Materialized ${count} files.`);
console.log("\nTo install and validate (from halo.baby):");
console.log("  cd ./gates");
console.log("  npm install");
console.log("  npm run next:validate:file -- .\\samples\\whatsnext.sample.json");
