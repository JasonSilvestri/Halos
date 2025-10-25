#!/usr/bin/env node
// write-stamp.mjs — writes gates/.halo_stamp.json after successful validation

import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

function readJson(p) { return JSON.parse(fs.readFileSync(p, "utf8")); }
function sha256File(p) {
    const buf = fs.readFileSync(p);
    return crypto.createHash("sha256").update(buf).digest("hex");
}

function main() {
    const root = process.cwd(); // gates/
    const seedPath = path.resolve(root, "../halo.baby.seed.json");
    const seed = readJson(seedPath);
    const version = seed.envelope?._meta?.version || "0.0.0";
    const stampRel = seed.envelope?.policy?.stamp_file || "gates/.halo_stamp.json";
    const stampPath = path.resolve(root, path.basename(stampRel)); // inside gates/

    const filesToHash = [
        "schemas/halos-workflow.schema.json",
        "schemas/halos-whatsnext.schema.json",
        "schemas/halos-workitems.schema.json",
        "samples/whatsnext.sample.json",
        "samples/workitems.seed-echo.sample.json"
    ];

    const hashes = {};
    for (const f of filesToHash) {
        const p = path.resolve(root, f);
        if (fs.existsSync(p)) hashes[f] = sha256File(p);
    }

    // after computing file hashes:
    const envelope = JSON.stringify(seed.envelope);
    hashes["__envelope__"] = crypto.createHash("sha256").update(envelope).digest("hex");

    const stamp = {
        manifestId: "halos-baby-stamp",
        version,
        validatedUtc: new Date().toISOString(),
        hashes
    };
    fs.writeFileSync(stampPath, JSON.stringify(stamp, null, 2), { encoding: "utf8" });
    console.log(`[OK] Wrote stamp → ${path.relative(root, stampPath)}`);
}

main();
