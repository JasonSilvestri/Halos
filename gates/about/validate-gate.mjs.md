# Halo\{\} Validators

A `Halo{}` uses AJV for JSON Schema validation. Below is a simple, reusable validator script you can run from the command line to validate any of the provided schemas or your own custom mixins.

### 1. Script `Halos/gates/tools/validate-gate.mjs`:

```js
 
 #!/usr/bin/env node
// Simple AJV-based validator for Halos Gates + custom mixins.
// Node 20.x compatible (ESM). No network fetch; local file $refs only.

import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import Ajv from "ajv";
import addFormats from "ajv-formats";

// ---------------------
// CLI args
// ---------------------
const args = process.argv.slice(2);
let schemaKey = "gate";
let filePath = null;

for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (a === "--schema" && args[i + 1]) {
        schemaKey = args[i + 1];
        i++;
    } else if (a === "--file" && args[i + 1]) {
        filePath = args[i + 1];
        i++;
    }
}

// If --file passed without path, try to read next arg or fall back to samples
if (args.includes("--file") && !filePath) {
    // default sample per schemaKey
    if (schemaKey === "workflow") filePath = "./samples/workitem.sample.json";
    else if (schemaKey === "whatsnext") filePath = "./samples/whatsnext.sample.json";
}

// ---------------------
// Resolve paths
// ---------------------
const ROOT = process.cwd(); // expect cwd = Halos/gates
const schemasDir = path.join(ROOT, "schemas");

// Map logical names to local schema files
const schemaMap = {
    gate: "lumina-gate.schema.json",
    envelope: "helix-lumina-envelope.schema.json",
    runner: "lumina-gate.config.schema.json",
    naming: "naming.schema.json",
    freeze: "freeze-shot.schema.json",
    workflow: "halos-workflow.schema.json",
    whatsnext: "halos-whatsnext.schema.json"
};

if (!schemaMap[schemaKey]) {
    console.error(`[ERROR] Unknown --schema '${schemaKey}'. Known keys: ${Object.keys(schemaMap).join(", ")}`);
    process.exit(2);
}

const schemaFilename = schemaMap[schemaKey];
const schemaPath = path.join(schemasDir, schemaFilename);

if (!fs.existsSync(schemaPath)) {
    console.error(`[ERROR] Schema not found: ${schemaPath}`);
    process.exit(2);
}

// If a file is required but not provided
if (args.includes("--file") && !filePath) {
    console.error("[ERROR] --file requires a path or a schema-provided default.");
    process.exit(2);
}

let data = null;
if (filePath) {
    const absFile = path.isAbsolute(filePath) ? filePath : path.join(ROOT, filePath);
    if (!fs.existsSync(absFile)) {
        console.error(`[ERROR] Data file not found: ${absFile}`);
        process.exit(2);
    }
    data = JSON.parse(fs.readFileSync(absFile, "utf8"));
}

// ---------------------
// AJV setup (local $ref)
// ---------------------
const ajv = new Ajv({
    strict: false,                // pragmatic: allow some non-critical looseness
    allErrors: true,
    allowUnionTypes: true,
    loadSchema: undefined         // no async loading; local only
});
addFormats(ajv);

// Preload all schemas in the directory so local $refs like "halos-workflow.schema.json" resolve
for (const entry of fs.readdirSync(schemasDir)) {
    if (entry.endsWith(".json")) {
        try {
            const raw = fs.readFileSync(path.join(schemasDir, entry), "utf8");
            const schema = JSON.parse(raw);
            // Prefer provided $id, otherwise use filename
            const id = schema.$id || entry;
            ajv.addSchema(schema, id);
        } catch (e) {
            console.warn(`[WARN] Skipping invalid schema file: ${entry} (${e.message})`);
        }
    }
}

// Compile the requested schema
let validate;
try {
    const primarySchemaRaw = JSON.parse(fs.readFileSync(schemaPath, "utf8"));
    const primaryId = primarySchemaRaw.$id || schemaFilename;
    validate = ajv.getSchema(primaryId) || ajv.compile(primarySchemaRaw);
} catch (e) {
    console.error(`[ERROR] Failed to compile schema '${schemaFilename}': ${e.message}`);
    process.exit(2);
}

// ---------------------
// Validate (if data provided) or just compile-check
// ---------------------
if (data) {
    const ok = validate(data);
    if (ok) {
        console.log(`[OK] ${schemaKey} ✓  (${schemaFilename})`);
        process.exit(0);
    } else {
        console.error(`[FAIL] ${schemaKey} ✗  (${schemaFilename})`);
        for (const err of validate.errors ?? []) {
            console.error(`- ${err.instancePath || "/"} ${err.message}`);
            if (err.params) console.error(`  params: ${JSON.stringify(err.params)}`);
        }
        process.exit(1);
    }
} else {
    // No data file: treat as “schema compile check”
    console.log(`[OK] Schema '${schemaFilename}' compiled successfully.`);
    process.exit(0);
}

 ```
 
- Results write to:
  `Halos/gates/samples/<timestamp>.sample.json`

- Schema is enforced; connection strings are redacted with a stable fingerprint hash.
- Markdown fence issues are reported in `warnings[]` to catch UI rendering hazards early.

---


### How to run validations (command examples)

#### 1. From repo root: `Halos/`:

```powershell
# validate workflow sample
npm --prefix "Halos/gates" run wf:validate:file -- --file "Halos/gates/samples/workitem.sample.json"

# validate what's-next sample
npm --prefix "Halos/gates" run next:validate:file -- --file "Halos/gates/samples/whatsnext.sample.json"
```

#### 2. From `Halos/gates/`:

```powershell
npm run wf:validate:file -- --file "./samples/workitem.sample.json"
npm run next:validate:file -- --file "./samples/whatsnext.sample.json"
```

---

## Navigation

- **Back to Home (repo root):** [`./README.md`](./README.md)

---

##### [Halos\{\} GitHub](https://github.com/JasonSilvestri/Halos)

###### Copyright © 2025 — All Rights Reserved by Jason Silvestri