#!/usr/bin/env node
// materialize-seed.mjs
// Usage: node materialize-seed.mjs halo.baby.seed.json
import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const [, , seedPathArg] = process.argv;
if (!seedPathArg) {
    console.error("Usage: node materialize-seed.mjs <seed.json>");
    process.exit(2);
}
const seedPath = path.resolve(seedPathArg);
if (!fs.existsSync(seedPath)) {
    console.error(`Seed file not found: ${seedPath}`);
    process.exit(2);
}

const seed = JSON.parse(fs.readFileSync(seedPath, "utf8"));
if (!seed.bundled_files) {
    console.error("No bundled_files found in seed.");
    process.exit(2);
}

for (const bundle of seed.bundled_files) {
    const outPath = path.resolve(bundle.path);
    const dir = path.dirname(outPath);
    fs.mkdirSync(dir, { recursive: true });
    if (bundle.kind === "json") {
        fs.writeFileSync(outPath, JSON.stringify(bundle.json, null, 2), { encoding: "utf8" });
    } else if (bundle.kind === "text") {
        fs.writeFileSync(outPath, bundle.text, { encoding: "utf8" });
    } else {
        console.error(`Unknown kind '${bundle.kind}' for path '${bundle.path}'.`);
        process.exit(2);
    }
}
console.log(`[OK] Materialized ${seed.bundled_files.length} files to 'Halos/halo/halo.baby/gates/'.`);
console.log("\nTo install and validate:");
console.log("  npm --prefix Halos/halo/halo.baby/gates install");
console.log("  npm --prefix Halos/halo/halo.baby/gates run next:validate:file -- --file Halos/halo/halo.baby/gates/samples/whatsnext.sample.json");
