#!/usr/bin/env node
// AJV-based validator for Halos Gates + mixins. Node 20.x (ESM).
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
    if (a === "--schema" && args[i + 1]) { schemaKey = args[i + 1]; i++; }
    else if (a === "--file" && args[i + 1]) { filePath = args[i + 1]; i++; }
}

// ---------------------
// Locate Gates root (robust): walk up until we find a /schemas folder
// ---------------------
let ROOT = process.cwd(); // prefer running inside Halos/Architecture/Gates
const findSchemasDir = (start) => {
    let cur = start;
    for (let i = 0; i < 6; i++) {
        const candidate = path.join(cur, "schemas");
        if (fs.existsSync(candidate) && fs.statSync(candidate).isDirectory()) return { root: cur, schemasDir: candidate };
        const up = path.dirname(cur);
        if (up === cur) break;
        cur = up;
    }
    return null;
};
const located = findSchemasDir(ROOT) || findSchemasDir(path.join(ROOT, "Halos", "Architecture", "Gates"));
if (!located) {
    console.error(`[ERROR] Could not locate a 'schemas' directory near ${ROOT}`);
    process.exit(2);
}
ROOT = located.root;
const schemasDir = located.schemasDir;

// Map logical names to local schema files
const schemaMap = {
    gate: "lumina-gate.schema.json",
    envelope: "helix-lumina-envelope.schema.json",
    runner: "lumina-gate.config.schema.json",
    naming: "naming.schema.json",
    freeze: "freeze-shot.schema.json",
    workflow: "halos-workflow.schema.json",
    workitem: "halos-workitem.schema.json",
    "workitem-list": "halos-workitem-list.schema.json",
    whatsnext: "halos-whatsnext.schema.json"
};

if (!schemaMap[schemaKey]) {
    console.error(`[ERROR] Unknown --schema '${schemaKey}'. Known keys: ${Object.keys(schemaMap).join(", ")}`);
    process.exit(2);
}

// Default files when --file is passed with no path
if (args.includes("--file") && !filePath) {
    if (schemaKey === "workflow" || schemaKey === "workitem") filePath = "./samples/workitem.sample.item.json";
    else if (schemaKey === "workitem-list") filePath = "./samples/workitem.sample.json";
    else if (schemaKey === "whatsnext") filePath = "./samples/whatsnext.sample.json";
}

// Resolve schema file
const schemaFilename = schemaMap[schemaKey];
const schemaPath = path.join(schemasDir, schemaFilename);
if (!fs.existsSync(schemaPath)) {
    console.error(`[ERROR] Schema not found: ${schemaPath}`);
    process.exit(2);
}

// Load data if requested
let data = null;
if (args.includes("--file")) {
    if (!filePath) {
        console.error("[ERROR] --file requires a path or a schema-provided default.");
        process.exit(2);
    }
    const absFile = path.isAbsolute(filePath) ? filePath : path.join(ROOT, filePath);
    if (!fs.existsSync(absFile)) {
        console.error(`[ERROR] Data file not found: ${absFile}`);
        process.exit(2);
    }
    data = JSON.parse(fs.readFileSync(absFile, "utf8"));
}

// AJV setup
const ajv = new Ajv({ strict: false, allErrors: true, allowUnionTypes: true });
addFormats(ajv);

// Preload all schemas in dir for local $refs
for (const entry of fs.readdirSync(schemasDir)) {
    if (entry.endsWith(".json")) {
        try {
            const raw = fs.readFileSync(path.join(schemasDir, entry), "utf8");
            const schema = JSON.parse(raw);
            const id = schema.$id || entry;
            ajv.addSchema(schema, id);
        } catch (e) {
            console.warn(`[WARN] Skipping invalid schema file: ${entry} (${e.message})`);
        }
    }
}

// Compile and validate
let validate;
try {
    const primarySchemaRaw = JSON.parse(fs.readFileSync(schemaPath, "utf8"));
    const primaryId = primarySchemaRaw.$id || schemaFilename;
    validate = ajv.getSchema(primaryId) || ajv.compile(primarySchemaRaw);
} catch (e) {
    console.error(`[ERROR] Failed to compile schema '${schemaFilename}': ${e.message}`);
    process.exit(2);
}

if (data) {
    const ok = validate(data);
    if (ok) { console.log(`[OK] ${schemaKey} ✓  (${schemaFilename})`); process.exit(0); }
    console.error(`[FAIL] ${schemaKey} ✗  (${schemaFilename})`);
    for (const err of validate.errors ?? []) {
        console.error(`- ${err.instancePath || "/"} ${err.message}`);
        if (err.params) console.error(`  params: ${JSON.stringify(err.params)}`);
    }
    process.exit(1);
} else {
    console.log(`[OK] Schema '${schemaFilename}' compiled successfully.`);
    process.exit(0);
}
