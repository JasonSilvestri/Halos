#!/usr/bin/env node
// validate-gate.mjs — AJV validator for Baby Halo{} (local refs only)

import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import Ajv from "ajv";
import addFormats from "ajv-formats";

// ---------------------
// CLI
// ---------------------
const args = process.argv.slice(2);
let schemaKey = "whatsnext";
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

// If --file passed without a path, pick sensible default
if (args.includes("--file") && !filePath) {
    if (schemaKey === "whatsnext") filePath = "./samples/whatsnext.sample.json";
}

// ---------------------
// Resolve
// ---------------------
const ROOT = process.cwd();           // expected cwd = .../gates
const schemasDir = path.join(ROOT, "schemas");

const schemaMap = {
    workflow: "halos-workflow.schema.json",
    whatsnext: "halos-whatsnext.schema.json"
};

if (!schemaMap[schemaKey]) {
    console.error(`[ERROR] Unknown --schema '${schemaKey}'. Known: ${Object.keys(schemaMap).join(", ")}`);
    process.exit(2);
}

const schemaFilename = schemaMap[schemaKey];
const schemaPath = path.join(schemasDir, schemaFilename);

if (!fs.existsSync(schemaPath)) {
    console.error(`[ERROR] Schema not found: ${schemaPath}`);
    process.exit(2);
}

let data = null;
if (filePath) {
    const abs = path.isAbsolute(filePath) ? filePath : path.join(ROOT, filePath);
    if (!fs.existsSync(abs)) {
        console.error(`[ERROR] Data file not found: ${abs}`);
        process.exit(2);
    }
    try {
        data = JSON.parse(fs.readFileSync(abs, "utf8"));
    } catch (e) {
        console.error(`[ERROR] Failed to parse JSON: ${abs}\n${e.message}`);
        process.exit(2);
    }
}

// ---------------------
// AJV
// ---------------------
const ajv = new Ajv({ strict: false, allErrors: true, allowUnionTypes: true });
addFormats(ajv);

// Preload all schemas (so $ref by $id works locally)
for (const entry of fs.readdirSync(schemasDir)) {
    if (entry.endsWith(".json")) {
        try {
            const raw = fs.readFileSync(path.join(schemasDir, entry), "utf8");
            const schema = JSON.parse(raw);
            const id = schema.$id || entry;
            ajv.addSchema(schema, id);
        } catch {
            // Skip invalid schema files quietly (none expected in baby)
        }
    }
}

const primarySchemaRaw = JSON.parse(fs.readFileSync(schemaPath, "utf8"));
const primaryId = primarySchemaRaw.$id || schemaFilename;
const validate = ajv.getSchema(primaryId) || ajv.compile(primarySchemaRaw);

// ---------------------
// Validate
// ---------------------
if (!data) {
    console.log(`[OK] Schema '${schemaFilename}' compiled.`);
    process.exit(0);
}

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
