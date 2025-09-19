#!/usr/bin/env node
// Node 20.x, ESM. Materialize bundled_files from a halo seed JSON to disk.
// Usage: node ./tools/seed-materialize.mjs ../.. ./halo.lumina.seed.json
import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const [, , repoRootArg = ".", seedPathArg = "halo.lumina.seed.json"] = process.argv;
const repoRoot = path.resolve(repoRootArg);
const seedPath = path.isAbsolute(seedPathArg) ? seedPathArg : path.join(repoRoot, seedPathArg);

if (!fs.existsSync(seedPath)) {
    console.error(`[ERROR] Seed not found: ${seedPath}`);
    process.exit(2);
}

const raw = fs.readFileSync(seedPath, "utf8");
const seed = JSON.parse(raw);

const normalizeGatesPath = (p) => {
    // Collapse accidental "Halos/Halos/…" to "Halos/…"
    const fixed = p.replace(/(^|\/)Halos\/Halos\//g, "$1Halos/");
    // Also collapse if someone injected platform backslashes:
    return fixed.replace(/(^|[\\/])Halos[\\/]+Halos[\\/]/g, "$1Halos/");
};

let written = 0;
for (const f of seed.bundled_files ?? []) {
    let rel = normalizeGatesPath(f.path);
    // Force canonical Gates dir root:
    rel = rel.replace(/^Halos\/?Architecture\/Gates\//, "Halos/Architecture/Gates/")
        .replace(/^Halos\/Halos\/Architecture\/Gates\//, "Halos/Architecture/Gates/");
    const abs = path.join(repoRoot, rel);
    fs.mkdirSync(path.dirname(abs), { recursive: true });
    if (f.kind === "json") {
        fs.writeFileSync(abs, JSON.stringify(f.json, null, 2), "utf8");
    } else if (f.kind === "text") {
        fs.writeFileSync(abs, f.text, "utf8");
    } else {
        console.warn(`[WARN] Unknown kind for ${rel}: ${f.kind}`);
        continue;
    }
    console.log(`[WRITE] ${path.relative(repoRoot, abs)}`);
    written++;
}

// Write minimal core schemas if missing (gate/envelope/runner/naming/freeze)
const schemasDir = path.join(repoRoot, "Halos/Architecture/Gates/schemas");
fs.mkdirSync(schemasDir, { recursive: true });
const ensureSchema = (name, content) => {
    const p = path.join(schemasDir, name);
    if (!fs.existsSync(p)) {
        fs.writeFileSync(p, JSON.stringify(content, null, 2), "utf8");
        console.log(`[WRITE] schemas/${name}`);
    }
};

ensureSchema("lumina-gate.schema.json", {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "$id": "lumina-gate.schema.json",
    "title": "Lumina Gate Result (minimal placeholder)",
    "type": "object",
    "additionalProperties": true
});
ensureSchema("helix-lumina-envelope.schema.json", {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "$id": "helix-lumina-envelope.schema.json",
    "title": "Helix-Lumina Envelope (minimal placeholder)",
    "type": "object",
    "additionalProperties": true
});
ensureSchema("lumina-gate.config.schema.json", {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "$id": "lumina-gate.config.schema.json",
    "title": "Runner Config (minimal placeholder)",
    "type": "object",
    "additionalProperties": true
});
ensureSchema("naming.schema.json", {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "$id": "naming.schema.json",
    "title": "Naming Policy (minimal placeholder)",
    "type": "object",
    "additionalProperties": true
});
ensureSchema("freeze-shot.schema.json", {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "$id": "freeze-shot.schema.json",
    "title": "Freeze Shot (minimal placeholder)",
    "type": "object",
    "additionalProperties": true
});

// Add wrappers so workflow mixin can validate a single item or a list:
ensureSchema("halos-workitem.schema.json", {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "$id": "halos-workitem.schema.json",
    "title": "Halos Work Item (workflow mixin)",
    "type": "object",
    "allOf": [{ "$ref": "halos-workflow.schema.json" }],
    "properties": {
        "id": { "type": "string", "minLength": 1 },
        "type": { "type": "string" }
    },
    "required": ["id", "state", "stateCode"],
    "additionalProperties": true
});
ensureSchema("halos-workitem-list.schema.json", {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "$id": "halos-workitem-list.schema.json",
    "title": "Halos Work Item List",
    "type": "object",
    "properties": {
        "manifestId": { "type": "string" },
        "createdUtc": { "type": "string", "format": "date-time" },
        "workItems": {
            "type": "array",
            "items": { "$ref": "halos-workitem.schema.json" }
        }
    },
    "required": ["workItems"],
    "additionalProperties": true
});

console.log(`[DONE] Materialized ${written} bundled file(s) and ensured core schemas.`);
