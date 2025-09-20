#!/usr/bin/env node
// Halos AJV validator (CWD-agnostic)
// Node 20.x ESM

import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import Ajv from "ajv";
import addFormats from "ajv-formats";

// ---------------------
// Resolve dirs relative to this file
// ---------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const GATES_DIR = path.resolve(__dirname, "..");             // Halos/gates
const SCHEMAS_DIR = path.join(GATES_DIR, "schemas");         // Halos/gates/schemas

// ---------------------
// CLI args
// ---------------------
const args = process.argv.slice(2);
let schemaKey = "gate";
let filePath = null;

for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (a === "--schema" && args[i + 1]) { schemaKey = args[++i]; }
    else if (a === "--file" && args[i + 1]) { filePath = args[++i]; }
}

// If --file passed without path, use defaults per schema
if (args.includes("--file") && !filePath) {
    if (schemaKey === "workflow") filePath = path.join(GATES_DIR, "samples", "workitem.sample.json");
    else if (schemaKey === "whatsnext") filePath = path.join(GATES_DIR, "samples", "whatsnext.sample.json");
}

// Map logical names to local schema files
const schemaMap = {
    gate: "lumina-gate.schema.json",
    envelope: "halo-lumina-envelope.schema.json", // <- renamed
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
const schemaPath = path.join(SCHEMAS_DIR, schemaFilename);

if (!fs.existsSync(schemaPath)) {
    console.error(`[ERROR] Schema not found: ${schemaPath}`);
    process.exit(2);
}

if (args.includes("--file") && !filePath) {
    console.error("[ERROR] --file requires a path or a schema-provided default.");
    process.exit(2);
}

let data = null;
if (filePath) {
    const absFile = path.isAbsolute(filePath) ? filePath : path.resolve(process.cwd(), filePath);
    if (!fs.existsSync(absFile)) {
        console.error(`[ERROR] Data file not found: ${absFile}`);
        process.exit(2);
    }
    data = JSON.parse(fs.readFileSync(absFile, "utf8"));
}

// ---------------------
// AJV setup (local $ref)
// ---------------------
const ajv = new Ajv({ strict: false, allErrors: true, allowUnionTypes: true });
addFormats(ajv);

// Preload all schemas in the directory so local $refs resolve
for (const entry of fs.readdirSync(SCHEMAS_DIR)) {
    if (entry.endsWith(".json")) {
        try {
            const raw = fs.readFileSync(path.join(SCHEMAS_DIR, entry), "utf8");
            const schema = JSON.parse(raw);
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

// Validate (if data provided) or just compile-check
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
    console.log(`[OK] Schema '${schemaFilename}' compiled successfully.`);
    process.exit(0);
}
