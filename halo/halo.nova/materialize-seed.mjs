#!/usr/bin/env node
// materialize-seed.mjs — deterministic materializer (repo-root aware, 'gates/' beside seed)
// Usage:
//   node ./materialize-seed.mjs ./halo.nova.seed.json

import fs from "node:fs";
import path from "node:path";
import process from "node:process";

function readJson(p) {
    try {
        return JSON.parse(fs.readFileSync(p, "utf8"));
    } catch (e) {
        console.error(`[ERROR] Failed to read/parse JSON: ${p}\n${e.message}`);
        process.exit(2);
    }
}

function ensureDir(dir) {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function getRepoRootFromSeed(seedFullPath) {
    // Walk up from seed to find a folder named "Halos"; repo-root = parent of that.
    let cur = path.dirname(seedFullPath);
    while (true) {
        const leaf = path.basename(cur);
        if (leaf.toLowerCase() === "halos") {
            const parent = path.dirname(cur);
            return parent && parent !== cur ? parent : path.parse(cur).root;
        }
        const up = path.dirname(cur);
        if (!up || up === cur) return path.dirname(seedFullPath); // fallback: seed dir’s parent
        cur = up;
    }
}

function isHalosPrefixed(relPath) {
    return /^halos[\\/]/i.test(relPath);
}
function isGatesPrefixed(relPath) {
    return /^gates[\\/]/i.test(relPath);
}

function main() {
    const args = process.argv.slice(2);
    if (args.length < 1) {
        console.error("Usage: node ./materialize-seed.mjs <seed.json>");
        process.exit(2);
    }

    const seedArg = args[0];
    const seedFull = path.isAbsolute(seedArg) ? seedArg : path.resolve(process.cwd(), seedArg);
    if (!fs.existsSync(seedFull)) {
        console.error(`[ERROR] Seed file not found: ${seedFull}`);
        process.exit(2);
    }

    const seedDir = path.dirname(seedFull);
    const repoRoot = getRepoRootFromSeed(seedFull);
    const seedJson = readJson(seedFull);
    const bundles = seedJson.bundled_files ?? [];

    console.log(`[INFO] Seed      : ${seedFull}`);
    console.log(`[INFO] Seed Dir  : ${seedDir}`);
    console.log(`[INFO] Repo Root : ${repoRoot}`);
    console.log("");

    let written = 0;

    for (const bundle of bundles) {
        const raw = bundle.path;
        if (typeof raw !== "string" || !raw.length) {
            console.error("[ERROR] Invalid bundled_files entry: missing 'path' string.");
            process.exit(2);
        }

        // Normalize separators
        const relPath = raw.replace(/\//g, path.sep);
        let outPath;

        if (isHalosPrefixed(relPath)) {
            // Explicit repo-root write: Halos/... under repoRoot
            outPath = path.join(repoRoot, relPath);
            console.log(`[TRACE] mode=repo-root  in='${raw}'  out='${outPath}'`);
        } else if (isGatesPrefixed(relPath)) {
            // Sandbox-local write beside the seed
            outPath = path.join(seedDir, relPath);
            console.log(`[TRACE] mode=seed-local in='${raw}'  out='${outPath}'`);
        } else {
            // Default: treat as relative to seed dir
            outPath = path.join(seedDir, relPath);
            console.log(`[TRACE] mode=default    in='${raw}'  out='${outPath}'`);
        }

        ensureDir(path.dirname(outPath));

        if (bundle.kind === "json") {
            // Pretty-print with 2 spaces; UTF-8 (no BOM)
            fs.writeFileSync(outPath, JSON.stringify(bundle.json, null, 2), { encoding: "utf8" });
            console.log(`[OK] JSON → ${outPath}`);
        } else if (bundle.kind === "text") {
            fs.writeFileSync(outPath, bundle.text ?? "", { encoding: "utf8" });
            console.log(`[OK] TEXT → ${outPath}`);
        } else {
            console.error(`[ERROR] Unknown kind '${bundle.kind}' for path '${raw}'.`);
            process.exit(2);
        }

        written++;
    }

    console.log("");
    console.log(`[OK] Materialized ${written} files.`);
    console.log("");
    console.log("To install and validate (from halo.nova):");
    console.log("  cd ./gates");
    console.log("  npm install");
    console.log("  npm run next:validate:file -- ./samples/whatsnext.sample.json");
}

main();
