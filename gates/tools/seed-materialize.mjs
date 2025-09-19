#!/usr/bin/env node
// Materialize bundled_files from a halo seed JSON into a TARGET dir (default: 'gates').
// Usage:
//   node gates/tools/seed-materialize.mjs . seeds/halo.lumina.seed.json --to gates
//   node gates/tools/seed-materialize.mjs . seeds/halo.lumina.seed.json   (defaults to gates)

import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const argv = process.argv.slice(2);
const repoRootArg = argv[0] || ".";
const seedPathArg = argv[1] || "seeds/halo.lumina.seed.json";
const toFlagIdx = argv.indexOf("--to");
const TARGET_DIR = (toFlagIdx >= 0 && argv[toFlagIdx + 1]) ? argv[toFlagIdx + 1] : "gates";

const repoRoot = path.resolve(repoRootArg);
const seedPath = path.isAbsolute(seedPathArg) ? seedPathArg : path.join(repoRoot, seedPathArg);

if (!fs.existsSync(seedPath)) {
  console.error(`[ERROR] Seed not found: ${seedPath}`);
  process.exit(2);
}

const raw = fs.readFileSync(seedPath, "utf8");
const seed = JSON.parse(raw);

// Normalize any incoming "Halos/gates/**" or "Halos/gates/**"
// and reroot under TARGET_DIR/**.
const reroot = (p) => {
  let s = p.replace(/^[\\/]/, "").replace(/\\/g, "/");
  s = s.replace(/^Halos\/Halos\/Architecture\/Gates\//, "")
       .replace(/^Halos\/Architecture\/Gates\//, "");
  // Anything else (e.g., schemas/…) is left as-is but rerooted under TARGET_DIR
  return path.join(TARGET_DIR, s);
};

let count = 0;
for (const f of seed.bundled_files ?? []) {
  const rel = reroot(f.path);
  const abs = path.join(repoRoot, rel);
  fs.mkdirSync(path.dirname(abs), { recursive: true });
  if (f.kind === "json") fs.writeFileSync(abs, JSON.stringify(f.json, null, 2), "utf8");
  else if (f.kind === "text") fs.writeFileSync(abs, f.text, "utf8");
  else { console.warn(`[WARN] Unknown kind for ${rel}: ${f.kind}`); continue; }
  console.log(`[WRITE] ${path.relative(repoRoot, abs)}`);
  count++;
}

// Ensure core schemas live under TARGET_DIR/schemas
const schemasDir = path.join(repoRoot, TARGET_DIR, "schemas");
fs.mkdirSync(schemasDir, { recursive: true });

const ensureSchema = (name, content) => {
  const p = path.join(schemasDir, name);
  if (!fs.existsSync(p)) {
    fs.writeFileSync(p, JSON.stringify(content, null, 2), "utf8");
    console.log(`[WRITE] ${path.relative(repoRoot, p)}`);
  }
};

// Minimal placeholders (can be replaced later by your full versions)
ensureSchema("lumina-gate.schema.json", {
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "lumina-gate.schema.json",
  "title": "Lumina Gate Result (placeholder)",
  "type": "object",
  "additionalProperties": true
});
ensureSchema("halo-lumina-envelope.schema.json", {
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "halo-lumina-envelope.schema.json",
  "title": "Halo-Lumina Envelope (placeholder)",
  "type": "object",
  "additionalProperties": true
});
ensureSchema("lumina-gate.config.schema.json", {
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "lumina-gate.config.schema.json",
  "title": "Runner Config (placeholder)",
  "type": "object",
  "additionalProperties": true
});
ensureSchema("naming.schema.json", {
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "naming.schema.json",
  "title": "Naming Policy (placeholder)",
  "type": "object",
  "additionalProperties": true
});
ensureSchema("freeze-shot.schema.json", {
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "freeze-shot.schema.json",
  "title": "Freeze Shot (placeholder)",
  "type": "object",
  "additionalProperties": true
});

// Wrappers for single item and list
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
    "workItems": { "type": "array", "items": { "$ref": "halos-workitem.schema.json" } }
  },
  "required": ["workItems"],
  "additionalProperties": true
});

console.log(`[DONE] Materialized ${count} bundled file(s) into '${TARGET_DIR}'.`);
