#!/usr/bin/env node
// materialize-seed.mjs
// Usage: node materialize-seed.mjs <path-to-seed.json>
import fs from "node:fs";
import path from "node:path";
import process from "node:process";

function findRepoRootFromSeed(seedFilePath) {
    // seedFilePath example:
    // E:\All\Repos\Halos\halo\halo.baby\halo.baby.seed.json
    const parts = seedFilePath.split(path.sep);
    const idx = parts.lastIndexOf("Halos");
    if (idx === -1) {
        // Fallback: use the seed's directory
        return path.dirname(seedFilePath);
    }
    // repo root is the parent of the "Halos" directory
    const repoRootParts = parts.slice(0, idx);
    const repoRoot = repoRootParts.length ? repoRootParts.join(path.sep) : path.sep;
    return repoRoot || path.sep;
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

const seed = JSON.parse(fs.readFileSync(seedPath, "utf8"));
if (!seed.bundled_files) {
    console.error("No bundled_files found in seed.");
    process.exit(2);
}

const repoRoot = findRepoRootFromSeed(seedPath);

let count = 0;
for (const bundle of seed.bundled_files) {
    // If bundle.path starts with 'Halos' we write it under <repoRoot>\Halos\...
    // Otherwise treat it as relative to the seed directory.
    let outPath;
    if (bundle.path.startsWith("Halos" + path.sep) || bundle.path.startsWith("Halos/")) {
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
console.log("  npm --prefix Halos/halo/halo.baby/gates run next:validate:file -- --file Halos/halo/halo.baby/gates/samples/whatsnext.sample.json");
