# About: `write-stamp.mjs`

**Kind:** tool  
**Path:** `gates/tools/write-stamp.mjs`

---

## Purpose

Node.js utility used by the gates harness.

---

## Preview

```
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

function main() {
  const root = process.cwd(); // gates/
  const seedPath = path.resolve(root, "../halo.nova.seed.json");
  const seed = readJson(seedPath);

  const version = seed.envelope?._meta?.version || "0.0.0";
  const stampRel = seed.envelope?.policy?.stamp_file || "gates/.halo_stamp.json";
  const stampPath = path.resolve(root, path.basename(stampRel)); // inside gates/

  const filesToHash = [
    "schemas/halos-workflow-states.schema.json",
    "schemas/halos-whatsnext.schema.json",
    "schemas/halos-workitems.schema.json",
    "schemas/halos-onboarding.schema.json",
    "samples/whatsnext.sample.json",
    "samples/workitems.seed-echo.sample.json",
    "i18n/onboarding.en.json"
  ];

  const hashes = {};
  for (const f of filesToHash) {
    const p = path.resolve(root, f);
    if (fs.existsSync(p)) {
      hashes[f] = sha256File(p);
    }
  }

  // include envelope hash, because policy.envelope_hash_in_stamp === true
  const envelope = JSON.stringify(seed.envelope);
  const envelopeHash = crypto.createHash("sha256").update(envelope).digest("hex");
  hashes["__envelope__"] = envelopeHash;

  const nowIso = new Date().toISOString();
  const stamp = {
    manifestId: "halos-nova-stamp",
    version,
    stampedUtc: nowIso,
    validatedUtc: nowIso,
    envelopeHash,
    signedBy: "user.local",
    hashes
  };

  fs.writeFileSync(stampPath, JSON.stringify(stamp, null, 2), { encoding: "utf8" });
  console.log(`[OK] Wrote stamp → ${path.relative(root, stampPath)}`);
}

main();

```

---
