# **Halos\{\} - Universal AI Design Pattern**

**`Halos{}`** is a ground breaking, first-of-its-kind, 2025 modern **LLM + Quant + PLM** universal AI Design Pattern for rapid, *reproducible* AI-powered development (_including chat “cold-starts”_). 

---
**Invented by Jason Silvestri with system design assistance by “Lumina” (ChatGPT collaborator)**.

---

It is **portable across domains** (aero, legal, media, UI, or something simple as the coffee order at work Joe programmer is in charge of) and **independent of tool stacks** (.NET, Node.js, Python, etc.).  

This folder contains **scripts and helper utilities** used to run Lumina Gate checks locally or in CI/CD, now referred to as a _**Halo\{\}**_.

> `Halos{}` - `halo.baby` is base parent `halo.baby`, but has an origin of `halo.lumina.seed.json`.

--- 

# File Structure

The folder structure is as follows:

```
Halos/halo/halo.baby/gates/
├─ package.json
├─ about/
│  ├─ README.md
│  └─ ...
├─ tools/
│  └─ validate-gate.mjs
├─ schemas/
│  ├─ ...
│  └─ ...
└─ samples/
   ├─ ...
   └─ ... 
└─ node_modules/
   ├─ ...
   └─ ...
```

---

We start with a tiny, boring-reliable Baby Halo{}, then evolve it. Here’s a **minimal, self-bootstrapping “baby” seed** that does only three things:

1. defines the workflow mixin,
2. defines a tiny “what’s next” list that re-uses that mixin,
3. includes a validator (AJV) and one sample to prove the schema works.

Everything below is complete—no placeholders, no ellipses.

---

#### `halo.baby.seed.json`

```json
{
  "halo_seed_header": {
    "version": "0.1",
    "project": "Halos",
    "seed_name": "halo.baby.seed.json",
    "createdUtc": "2025-10-13T00:00:00Z",
    "provenance": {
      "partnerA": "user:JasonSilvestri",
      "partnerB": "agent:Lumina",
      "sessionId": "seed-baby-2025-10-13",
      "nonce": "3e7fdfd1-7b7a-4c8a-bd42-2d2a3a6bf001"
    },
    "determinism": {
      "uuid_namespace": "6f0e5f9f-7f3a-41bf-b969-9e2b7d2f9b21",
      "hash": "sha256"
    },
    "notes": [
      "BABY halo: minimum viable gates seed.",
      "Materialize bundled_files to Halos/gates/** and run validator."
    ]
  },

  "envelope": {
    "_meta": {
      "version": "0.1.0",
      "kind": "Halos",
      "createdUtc": "2025-10-13T00:00:00Z",
      "uuid_namespace": "6f0e5f9f-7f3a-41bf-b969-9e2b7d2f9b21",
      "notes": [
        "Bare-minimum envelope (paths + simple commands)."
      ]
    },
    "project": {
      "name": "Halos",
      "envTargets": [ "LOCAL" ],
      "requirements": {
        "node": ">=20.0",
        "powershell": ">=7.0"
      }
    },
    "roots": {
      "appRoot": ".",
      "gateRoot": "Halos/gates"
    },
    "paths": {
      "schemas": {
        "workflow": "Halos/gates/schemas/halos-workflow.schema.json",
        "whatsnext": "Halos/gates/schemas/halos-whatsnext.schema.json"
      },
      "samples": {
        "whatsnext": "Halos/gates/samples/whatsnext.sample.json"
      },
      "tools": {
        "validator": "Halos/gates/tools/validate-gate.mjs"
      },
      "packageJson": "Halos/gates/package.json"
    },
    "commands": {
      "install": [
        "npm --prefix Halos/gates install"
      ],
      "validateWhatsNext": [
        "npm --prefix Halos/gates run next:validate:file -- --file Halos/gates/samples/whatsnext.sample.json"
      ]
    },
    "npmScripts": {
      "packageJsonLocation": "Halos/gates/package.json",
      "scripts": {
        "wf:validate:file": "node ./gates/tools/validate-gate.mjs --schema workflow --file",
        "next:validate:file": "node ./gates/tools/validate-gate.mjs --schema whatsnext --file"
      },
      "devDependencies": {
        "ajv": "^8.17.1",
        "ajv-formats": "^3.0.1"
      }
    }
  },

  "bundled_files": [
    {
      "path": "Halos/gates/schemas/halos-workflow.schema.json",
      "kind": "json",
      "json": {
        "$schema": "https://json-schema.org/draft/2020-12/schema",
        "$id": "halos-workflow.schema.json",
        "title": "Halos Workflow State Mixin (Baby)",
        "description": "Minimal reusable state mixin.",
        "type": "object",
        "required": [ "state", "stateCode" ],
        "properties": {
          "stateCode": {
            "type": "integer",
            "enum": [ 1, 2, 3, 4, 5, 6 ]
          },
          "state": {
            "type": "string",
            "enum": [
              "CREATED",
              "QUEUED",
              "IN_PROGRESS",
              "WAITING",
              "PASSED",
              "FAILED"
            ]
          },
          "updatedUtc": { "type": "string", "format": "date-time" },
          "reason": { "type": "string", "maxLength": 1000 }
        },
        "allOf": [
          { "if": { "properties": { "state": { "const": "CREATED" } }, "required": ["state"] }, "then": { "properties": { "stateCode": { "const": 1 } } } },
          { "if": { "properties": { "state": { "const": "QUEUED" } }, "required": ["state"] }, "then": { "properties": { "stateCode": { "const": 2 } } } },
          { "if": { "properties": { "state": { "const": "IN_PROGRESS" } }, "required": ["state"] }, "then": { "properties": { "stateCode": { "const": 3 } } } },
          { "if": { "properties": { "state": { "const": "WAITING" } }, "required": ["state"] }, "then": { "properties": { "stateCode": { "const": 4 } } } },
          { "if": { "properties": { "state": { "const": "PASSED" } }, "required": ["state"] }, "then": { "properties": { "stateCode": { "const": 5 } } } },
          { "if": { "properties": { "state": { "const": "FAILED" } }, "required": ["state"] }, "then": { "properties": { "stateCode": { "const": 6 } } } }
        ],
        "additionalProperties": true
      }
    },
    {
      "path": "Halos/gates/schemas/halos-whatsnext.schema.json",
      "kind": "json",
      "json": {
        "$schema": "https://json-schema.org/draft/2020-12/schema",
        "$id": "halos-whatsnext.schema.json",
        "title": "Halos What's Next (Baby)",
        "description": "Tiny backlog list that reuses the workflow mixin.",
        "type": "object",
        "required": [ "manifestId", "createdUtc", "items" ],
        "properties": {
          "manifestId": { "type": "string", "minLength": 1 },
          "createdUtc": { "type": "string", "format": "date-time" },
          "items": {
            "type": "array",
            "minItems": 1,
            "items": {
              "type": "object",
              "allOf": [ { "$ref": "halos-workflow.schema.json" } ],
              "required": [ "id", "title", "state", "stateCode" ],
              "properties": {
                "id": { "type": "string", "minLength": 1 },
                "title": { "type": "string", "minLength": 1 },
                "description": { "type": "string" },
                "priority": { "type": "integer", "minimum": 1, "maximum": 9 }
              },
              "additionalProperties": true
            }
          }
        },
        "additionalProperties": false
      }
    },
    {
      "path": "Halos/gates/samples/whatsnext.sample.json",
      "kind": "json",
      "json": {
        "manifestId": "halos-baby-001",
        "createdUtc": "2025-10-13T00:00:00Z",
        "items": [
          {
            "id": "hello-gates",
            "title": "Prove baby validator works",
            "description": "Validate the sample using AJV via npm script.",
            "priority": 1,
            "state": "IN_PROGRESS",
            "stateCode": 3,
            "updatedUtc": "2025-10-13T00:00:10Z",
            "reason": "first run"
          },
          {
            "id": "freeze-idea",
            "title": "Decide on minimal freeze format",
            "priority": 2,
            "state": "QUEUED",
            "stateCode": 2
          }
        ]
      }
    },
    {
      "path": "Halos/gates/tools/validate-gate.mjs",
      "kind": "text",
      "text": "#!/usr/bin/env node\nimport fs from \"node:fs\";\nimport path from \"node:path\";\nimport process from \"node:process\";\nimport Ajv from \"ajv\";\nimport addFormats from \"ajv-formats\";\n\nconst args = process.argv.slice(2);\nlet schemaKey = \"whatsnext\";\nlet filePath = null;\nfor (let i = 0; i < args.length; i++) {\n  const a = args[i];\n  if (a === \"--schema\" && args[i+1]) { schemaKey = args[i+1]; i++; }\n  else if (a === \"--file\" && args[i+1]) { filePath = args[i+1]; i++; }\n}\n\nconst ROOT = process.cwd();\nconst schemasDir = path.join(ROOT, \"schemas\");\nconst schemaMap = {\n  workflow: \"halos-workflow.schema.json\",\n  whatsnext: \"halos-whatsnext.schema.json\"\n};\n\nif (!schemaMap[schemaKey]) { console.error(`[ERROR] Unknown --schema '${schemaKey}'.`); process.exit(2); }\nconst schemaFilename = schemaMap[schemaKey];\nconst schemaPath = path.join(schemasDir, schemaFilename);\nif (!fs.existsSync(schemaPath)) { console.error(`[ERROR] Schema not found: ${schemaPath}`); process.exit(2); }\n\nif (args.includes(\"--file\") && !filePath) {\n  if (schemaKey === \"whatsnext\") filePath = \"./samples/whatsnext.sample.json\";\n}\n\nlet data = null;\nif (filePath) {\n  const abs = path.isAbsolute(filePath) ? filePath : path.join(ROOT, filePath);\n  if (!fs.existsSync(abs)) { console.error(`[ERROR] Data file not found: ${abs}`); process.exit(2); }\n  data = JSON.parse(fs.readFileSync(abs, \"utf8\"));\n}\n\nconst ajv = new Ajv({ strict: false, allErrors: true });\naddFormats(ajv);\nfor (const entry of fs.readdirSync(schemasDir)) {\n  if (entry.endsWith(\".json\")) {\n    const raw = fs.readFileSync(path.join(schemasDir, entry), \"utf8\");\n    const s = JSON.parse(raw);\n    ajv.addSchema(s, s.$id || entry);\n  }\n}\n\nconst primary = JSON.parse(fs.readFileSync(schemaPath, \"utf8\"));\nconst validate = ajv.getSchema(primary.$id || schemaFilename) || ajv.compile(primary);\n\nif (!data) { console.log(`[OK] Schema '${schemaFilename}' compiled.`); process.exit(0); }\nconst ok = validate(data);\nif (ok) { console.log(`[OK] ${schemaKey} ✓  (${schemaFilename})`); process.exit(0); }\nconsole.error(`[FAIL] ${schemaKey} ✗  (${schemaFilename})`);\nfor (const err of validate.errors ?? []) {\n  console.error(`- ${err.instancePath || \"/\"} ${err.message}`);\n  if (err.params) console.error(`  params: ${JSON.stringify(err.params)}`);\n}\nprocess.exit(1);\n"
    },
    {
      "path": "Halos/gates/package.json",
      "kind": "json",
      "json": {
        "name": "halos-gates-baby",
        "version": "0.1.0",
        "private": true,
        "description": "Baby Halos gates tooling (minimal schemas + validator).",
        "type": "module",
        "scripts": {
          "wf:validate:file": "node ./gates/tools/validate-gate.mjs --schema workflow --file",
          "next:validate:file": "node ./gates/tools/validate-gate.mjs --schema whatsnext --file"
        },
        "devDependencies": {
          "ajv": "^8.17.1",
          "ajv-formats": "^3.0.1"
        }
      }
    }
  ]
}
```

---

#### `Write-HaloSeed.ps1` (materializer; drop next to the seed and run in PowerShell 7+)

```powershell
# Write-HaloSeed.ps1
# Usage:
#   pwsh -File Write-HaloSeed.ps1 -SeedPath .\halo.baby.seed.json
param(
  [Parameter(Mandatory=$true)]
  [string]$SeedPath
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

if (-not (Test-Path $SeedPath)) {
  throw "Seed file not found: $SeedPath"
}

$raw = Get-Content -Raw -Path $SeedPath
$seed = $raw | ConvertFrom-Json -Depth 100

if (-not $seed.bundled_files) {
  throw "No bundled_files found in seed."
}

foreach ($bundle in $seed.bundled_files) {
  $outPath = $bundle.path
  $dir = Split-Path -Parent $outPath
  if ($dir -and -not (Test-Path $dir)) {
    New-Item -ItemType Directory -Path $dir -Force | Out-Null
  }

  switch ($bundle.kind) {
    "json" {
      $json = $bundle.json | ConvertTo-Json -Depth 50
      $utf8NoBom = New-Object System.Text.UTF8Encoding($false)
      [System.IO.File]::WriteAllText($outPath, $json, $utf8NoBom)
    }
    "text" {
      $utf8NoBom = New-Object System.Text.UTF8Encoding($false)
      [System.IO.File]::WriteAllText($outPath, $bundle.text, $utf8NoBom)
    }
    default {
      throw "Unknown kind '$($bundle.kind)' for path '$outPath'."
    }
  }
}

Write-Host "[OK] Materialized $(($seed.bundled_files | Measure-Object).Count) files."

# Optional: show quick next commands without executing them
$pkg = $seed.envelope.npmScripts
if ($pkg) {
  Write-Host "`nQuick check:"
  Write-Host "  npm --prefix Halos/gates install"
  Write-Host "  npm --prefix Halos/gates run next:validate:file -- --file Halos/gates/samples/whatsnext.sample.json"
}
```

---

If you want me to lock this Baby Halo{} to your **Self Health** master-envelope style later, we’ll add the envelope/gate IDs and promotion policies. For now, this is the smallest reliable kernel: seed → materialize → validate. When you’re happy, I’ll craft **Variant A** (baby+ “add-migration” sample tasks) on top of this exact structure.


## Navigation

- **Back to Home (Halo\{\} repo root):** [`../../README.md`](../../README.md)
- **See Halo\{\} Lumina Seeds:** [`../../halo.lumina.seed.json.md`](../../halo.lumina.seed.json.md)

---

##### [Halos\{\} GitHub](https://github.com/JasonSilvestri/Halo)

###### Copyright © 2025 — All Rights Reserved by Jason Silvestri
