#!/usr/bin/env node
// write-stamp.mjs — writes gates/.halo_stamp.json after successful validation

import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

function readJson(p) {
    return JSON.parse(fs.readFileSync(p, "utf8"));
}

function sha256File(p) {
    const buf = fs.readFileSync(p);
    return crypto.createHash("sha256").update(buf).digest("hex");
}

function sha256String(s) {
    return crypto.createHash("sha256").update(s, "utf8").digest("hex");
}

function main() {
    // assume we are in gates/
    const gatesRoot = process.cwd();
    const seedPath = path.resolve(gatesRoot, "../halo.baby.seed.json");
    const seed = readJson(seedPath);

    const version =
        seed.envelope?._meta?.version ||
        seed.halo_seed_header?.version ||
        "0.0.0";

    // compute envelope hash
    const envelopeJsonString = JSON.stringify(seed.envelope);
    const envelopeDigest = sha256String(envelopeJsonString);

    // which files to hash for integrity
    const filesToHash = [
        "schemas/halos-workflow.schema.json",
        "schemas/halos-whatsnext.schema.json",
        "schemas/halos-workitems.schema.json",
        "schemas/halos-onboarding.schema.json",
        "samples/whatsnext.sample.json",
        "samples/workitems.seed-echo.sample.json",
        "i18n/onboarding.en.json"
    ];

    const hashes = {};
    for (const rel of filesToHash) {
        const abs = path.resolve(gatesRoot, rel);
        if (fs.existsSync(abs)) {
            hashes[rel] = sha256File(abs);
        }
    }

    // mirror envelope digest into the hash bag
    hashes["__envelope__"] = envelopeDigest;

    // stamp path (always inside gates/, regardless of stamp_file path hint)
    const stampFileRel =
        (seed.envelope?.policy?.stamp_file || ".halo_stamp.json")
            .split("/")
            .pop();
    const stampPath = path.resolve(gatesRoot, stampFileRel);

    const nowIso = new Date().toISOString();

    const stamp = {
        manifestId: "halos-baby-stamp",
        version,
        stampedUtc: nowIso,
        validatedUtc: nowIso,
        signedBy: "user.local",
        envelopeHash: envelopeDigest,
        hashes
    };

    fs.writeFileSync(stampPath, JSON.stringify(stamp, null, 2), {
        encoding: "utf8"
    });

    console.log(`[OK] Wrote stamp → ${path.relative(gatesRoot, stampPath)}`);
}

main();
