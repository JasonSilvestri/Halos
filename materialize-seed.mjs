#!/usr/bin/env node
// materialize-seed.mjs — writes bundled_files to disk deterministically.
// Usage: node materialize-seed.mjs <seed.json>

import fs from "node:fs";
import path from "node:path";
import process from "node:process";

function findRepoRootFromSeed(seedFilePath) {
    const norm = path.resolve(seedFilePath);
    const parts = norm.split(path.sep);
    const idx = parts.lastIndexOf("Halos");
    if (idx === -1) return path.dirname(norm); // fallback: next to seed
    const repoParts = parts.slice(0, idx);     // parent of the "Halos" folder
    return repoParts.length ? repoParts.join(path.sep) : path.sep;
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
let count = 0;

for (const bundle of seed.bundled_files) {
    let outPath;
    if (bundle.path.startsWith("Halos/") || bundle.path.startsWith("Halos\\")) {
        outPath = path.join(repoRoot, bundle.path.replace(/\//g, path.sep));
    } else {
        outPath = path.resolve(path.dirname(seedPath), bundle.path);
    }

    ensureDir(path.dirname(outPath));

    if (bundle.kind === "json") {
        fs.writeFileSync(outPath, JSON.stringify(bundle.json, null, 2), { encoding: "utf8" });
    } else if (bundle.kind === "text") {
        fs.writeFileSync(outPath, bundle.text, { encoding: "utf8" });
    } else {
        console.error(`Unknown kind '${bundle.kind}' for path '${bundle.path}'.`);
        process.exit(2);
    }
    console.log(`[OK] ${bundle.kind.toUpperCase()} → ${outPath}`);
    count++;
}

console.log(`[OK] Materialized ${count} files.`);
console.log("\nTo install and validate:");
console.log("  npm --prefix Halos/halo/halo.baby/gates install");
console.log("  npm --prefix Halos/halo/halo.baby/gates run next:validate:file -- .\\Halos\\halo\\halo.baby\\gates\\samples\\whatsnext.sample.json");
