#!/usr/bin/env node
// enforce-ready.mjs — blocks version bump until materialization + validation have stamped readiness

import fs from "node:fs";
import path from "node:path";

function readJson(p) {
    try { return JSON.parse(fs.readFileSync(p, "utf8")); }
    catch (e) { return null; }
}

function main() {
    const root = process.cwd();
    const seedPath = path.resolve(root, "../halo.baby.seed.json"); // run from gates/
    const seed = readJson(seedPath);
    if (!seed) { console.error("[FAIL] Seed not found or unreadable."); process.exit(2); }

    const policy = seed.envelope?.policy || {};
    const stampRel = policy.stamp_file || "gates/.halo_stamp.json";
    const stampPath = path.resolve(root, stampRel.replace(/^gates[\\/]/, "")); // already in gates/
    const stamp = readJson(stampPath);

    const version = seed.envelope?._meta?.version || "0.0.0";
    if (!policy.require_materialization_before_version_bump) {
        console.log("[OK] Policy not enforced. (noop)");
        process.exit(0);
    }

    if (!stamp) {
        console.error("[FAIL] No stamp present. Run validation & stamping first.");
        console.error(policy.message || "Run: npm run seed:validate:all && npm run seed:stamp");
        process.exit(1);
    }

    if (!stamp.validatedUtc) {
        console.error("[FAIL] Stamp exists but not validated. Run: npm run seed:validate:all && npm run seed:stamp");
        process.exit(1);
    }


    if (stamp.version !== version) {
        console.error(`[FAIL] Stamp version (${stamp.version}) does not match seed version (${version}). Re-validate & stamp.`);
        process.exit(1);
    }
    //const envelopeHash = crypto.createHash("sha256").update(JSON.stringify(seed.envelope)).digest("hex");

    //if (stamp.hashes?.["__envelope__"] !== envelopeHash) {
    //    console.error("[FAIL] Envelope changed since stamp. Re-validate & stamp.");
    //    process.exit(1);
    //}
    console.log(`[OK] Ready: ${version} stamped at ${stamp.validatedUtc}`);
}

main();
