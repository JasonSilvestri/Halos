# Halo\{\} Validators

A `Halo{}` uses AJV for JSON Schema validation. Below is a simple, reusable validator script you can run from the command line to validate any of the provided schemas or your own custom mixins.

### 1. Script `Halos/halo/halo.baby/gates/tools/validate-gate.mjs`:

```js
 
#!/usr/bin/env node
// validate-gate.mjs — AJV validator for Baby Halo{} (local refs only)

import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import Ajv from "ajv";
import addFormats from "ajv-formats";

const args = process.argv.slice(2);
let schemaKey = "whatsnext";
let filePath = null;
for (let i = 0; i < args.length; i++) {
  const a = args[i];
  if (a === "--schema" && args[i + 1]) { schemaKey = args[i + 1]; i++; }
  else if (a === "--file" && args[i + 1]) { filePath = args[i + 1]; i++; }
}
if (args.includes("--file") && !filePath) {
  if (schemaKey === "whatsnext") filePath = "./samples/whatsnext.sample.json";
  if (schemaKey === "workitems") filePath = "./samples/workitems.seed-echo.sample.json";
}
const ROOT = process.cwd();
const schemasDir = path.join(ROOT, "schemas");
const schemaMap = {
  workflow: "halos-workflow.schema.json",
  whatsnext: "halos-whatsnext.schema.json",
  workitems: "halos-workitems.schema.json"
};
if (!schemaMap[schemaKey]) { console.error(`[ERROR] Unknown --schema '${schemaKey}'. Known: ${Object.keys(schemaMap).join(", ")}`); process.exit(2); }
const schemaFilename = schemaMap[schemaKey];
const schemaPath = path.join(schemasDir, schemaFilename);
if (!fs.existsSync(schemaPath)) { console.error(`[ERROR] Schema not found: ${schemaPath}`); process.exit(2); }
let data = null;
if (filePath) {
  const abs = path.isAbsolute(filePath) ? filePath : path.join(ROOT, filePath);
  if (!fs.existsSync(abs)) { console.error(`[ERROR] Data file not found: ${abs}`); process.exit(2); }
  try { data = JSON.parse(fs.readFileSync(abs, "utf8")); } catch (e) { console.error(`[ERROR] Failed to parse JSON: ${abs}\n${e.message}`); process.exit(2); }
}
const ajv = new Ajv({ strict: false, allErrors: true, allowUnionTypes: true });
addFormats(ajv);
for (const entry of fs.readdirSync(schemasDir)) {
  if (entry.endsWith(".json")) {
    try {
      const raw = fs.readFileSync(path.join(schemasDir, entry), "utf8");
      const schema = JSON.parse(raw);
      const id = schema.$id || entry;
      ajv.addSchema(schema, id);
    } catch {}
  }
}
const primarySchemaRaw = JSON.parse(fs.readFileSync(schemaPath, "utf8"));
const primaryId = primarySchemaRaw.$id || schemaFilename;
const validate = ajv.getSchema(primaryId) || ajv.compile(primarySchemaRaw);
if (!data) { console.log(`[OK] Schema '${schemaFilename}' compiled.`); process.exit(0); }
const ok = validate(data);
if (ok) { console.log(`[OK] ${schemaKey} ✓  (${schemaFilename})`); process.exit(0); }
console.error(`[FAIL] ${schemaKey} ✗  (${schemaFilename})`);
for (const err of validate.errors ?? []) {
  console.error(`- ${err.instancePath || "/"} ${err.message}`);
  if (err.params) console.error(`  params: ${JSON.stringify(err.params)}`);
}
process.exit(1);


 ```
 
- Results write to:
  `Halos/halo/halo.baby/gates/samples/<timestamp>.sample.json`

- Schema is enforced; connection strings are redacted with a stable fingerprint hash.
- Markdown fence issues are reported in `warnings[]` to catch UI rendering hazards early.

---


### How to run validations (command examples)

#### 1. From repo root: `Halos/`:

```powershell
# validate workflow sample
npm --prefix "Halos/halo/halo.baby/gates" run wf:validate:file -- --file "Halos/halo/halo.baby/gates/samples/workitem.sample.json"

# validate what's-next sample
npm --prefix "Halos/halo/halo.baby/gates" run next:validate:file -- --file "Halos/halo/halo.baby/gates/samples/whatsnext.sample.json"
```

#### 2. From `Halos/halo/halo.baby/gates/`:

```powershell
npm run wf:validate:file -- --file "./samples/workitem.sample.json"
npm run next:validate:file -- --file "./samples/whatsnext.sample.json"
```

---

## Halo\{\} Packages

- **See Halo\{\} Package:** [`./package.json.md`](./package.json.md)

---

## Navigation

- **Back to Home (repo root):** [`../../README.md`](../../README.md)

---


##### [Halos\{\} GitHub](https://github.com/JasonSilvestri/Halos)

###### Copyright © 2025 — All Rights Reserved by Jason Silvestri