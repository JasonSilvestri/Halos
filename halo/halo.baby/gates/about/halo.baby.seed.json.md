# About: `halo.baby.seed.json`

**Kind:** seed  
**Path:** `halo.baby.seed.json`

---

## Purpose

Seed file that materializes gates files deterministically.

---

## Preview

````json
{
  "halo_seed_header": {
    "version": "0.2.7-pre",
    "project": "Halos",
    "seed_name": "halo.baby.seed.json",
    "createdUtc": "2025-10-22T00:00:00Z",
    "notes": [
      "Halo Baby v0.2.7-pre — adds authorship + origin metadata, RenderHints, DriftGuards, status banner, onboarding dialog (i18n-capable), and fully bundles all gates files to guarantee offline cold-start.",
      "All bundle paths use 'gates/...', relative to this seed file."
    ]
  },
  "roots": {
    "appRootGitHubRepo": "https://github.com/JasonSilvestri/Halos/",
    "appRootLocalRepo": "E:\\All\\Repos\\Halos\\",
    "haloRoot": "halo/halo.baby/"
  },
  "envelope": {
    "_meta": {
      "version": "0.2.7-pre",
      "kind": "Halos",
      "createdUtc": "2025-10-22T00:00:00Z",
      "bundle_level": "full",
      "author": "Jason Silvestri",
      "co_authors": [ "System design assistance by 'Lumina' (ChatGPT collaborator)" ],
      "inventor": "This universal text prompt and LLM format was invented by Jason Silvestri.",
      "inventor_notes": "Native to ChatGPT by design—without the collaboration with Lumina, this pattern would not exist.",
      "copyright": "© 2024-2025 Jason Silvestri. All Rights Reserved.",

      "origin": {
        "seed_id": "halos://seed/halo.baby/0.2.7-pre",
        "repo_url": "https://github.com/JasonSilvestri/Halo/halo/halo.baby",
        "spec_url": "https://github.com/JasonSilvestri/Halo/halo/halo.baby#readme"
      },
      "provenance": {
        "partnerA": "user:JasonSilvestri",
        "partnerB": "agent:Lumina",
        "sessionId": "seed-baby-2025-10-15",
        "nonce": "cc502eac-b30a-4b21-9e28-3c391d491d66",
        "chat_anchor": {
          "message_id": "2c77ca2f-9d97-41a9-a5f3-3f87093ff389",
          "note": "Local anchor for the thread where gen-readmes.fix + onboarding path fixes landed."
        }
      },
      "provenance_visibility": "internal",
      "determinism": {
        "uuid_namespace": "6f0e5f9f-7f3a-41bf-b969-9e2b7d2f9b21",
        "hash": "sha256",
        "envelope_hash_in_stamp": true
      }
    },

    "render_hints": {
      "markdown_fence_policy": {
        "default_code_language": "json",
        "outer_backticks_required": 5,
        "inner_backticks_for_nested_examples": 4,
        "allow_html": false,
        "notes": [
          "Wrap whole responses that contain nested fenced blocks with OUTER=5 backticks.",
          "Use INNER=4 backticks for heavy nested examples to prevent UI flattening."
        ]
      },

      "summarization_policy": {
        "allow_summarization": false,
        "allow_ellipses": false,
        "notes": [
          "No truncation for seeds or about docs.",
          "Do not condense file listings or schema bodies."
        ]
      }
    },

    "drift_guards": {
      "guards": [
        {
          "id": "subscription_or_session_fail",
          "severity": "critical",
          "symptoms": [ "thread missing", "asset links expired", "tool unavailable" ],
          "action": "print_banner_and_continue_with_seed",
          "banner": "⚠️ Collaboration guard: falling back to local halo.baby seed context; links may be stale."
        },
        {
          "id": "renderer_backtick_collapse",
          "severity": "high",
          "symptoms": [ "markdown fences merged", "code blocks flattened" ],
          "action": "re-emit_with_outer5_inner4",
          "banner": "⚠️ Rendering Safety: rewrapping output with outer=5 backticks, inner=4."
        },
        {
          "id": "patchwork_mode_detected",
          "severity": "high",
          "symptoms": [ "partial file diffs only", "ellipses present" ],
          "action": "switch_to_full_emit",
          "banner": "⚠️ Patchwork detected: switching to full, deterministic emits."
        }
      ]
    },
    "policy": {
      "require_materialization_before_version_bump": true,
      "allow_emergency_override": false,
      "override_nonce_hint": "set-on-release-only",
      "stamp_file": "gates/.halo_stamp.json",
      "validation_scripts": [
        "npm run next:validate:file",
        "npm run work:validate:file"
      ],
      "message": "Version bumps are honored only after validation. Run: npm run seed:validate:all && npm run seed:stamp"
    },
    "cognition": {
      "allow_extended_thinking": true,
      "reasoning_budget_hint": "high",
      "notes": [
        "Emit complete artifacts; avoid summaries.",
        "Defer heavy generation until explicit intent."
      ]
    },
    "collab_state": {
      "status_checklist_markdown": "| Step | Status | Notes |\n|---|---|---|\n| Materialize | ⏳ | queued |\n| Install | ⏳ | queued |\n| Schema Validate (both) | ⏳ | queued |\n| Write Stamp | ⏳ | queued |\n| Enforce Policy | ⏳ | queued |\n| Markdown Fence Check | ⏳ | queued |",
      "display_banner_markdown": "⚠️ **Rendering Safety**: Display code blocks as `json`. Use **outer 5** backticks for nested fences. No ellipses. No patchwork."
    },
    "onboarding": {
      "enabled": true,
      "locale": "en",
      "loader": "gates/i18n/onboarding.en.json",
      "notes": "Dialog loads from /gates/i18n/. Users can pass --locale to override. Choose 'Build Seed' to run materialization."
    },
    "paths": {
      "schemas": {
        "workflow": "gates/schemas/halos-workflow.schema.json",
        "whatsnext": "gates/schemas/halos-whatsnext.schema.json",
        "workitems": "gates/schemas/halos-workitems.schema.json",
        "onboarding": "gates/schemas/halos-onboarding.schema.json"
      },
      "samples": {
        "whatsnext": "gates/samples/whatsnext.sample.json",
        "workitems": "gates/samples/workitems.seed-echo.sample.json"
      },
      "tools": {
        "validator": "gates/tools/validate-gate.mjs",
        "echoWorkitems": "gates/tools/echo-workitems.mjs",
        "onboard": "gates/tools/onboard.mjs",
        "driftBanner": "gates/tools/drift-banner.mjs",
        "materializer_node": "gates/materialize-seed.mjs",
        "materializer_ps": "gates/Write-HaloSeed.ps1",
        "genReadmes": "gates/tools/gen-readmes.mjs"
      },
      "i18n": {
        "onboarding": "gates/i18n/onboarding.en.json"
      },
      "packageJson": "gates/package.json",
      "seedVersion": "gates/SEED_VERSION.json"
    },
    "npmScripts": {
      "packageJsonLocation": "gates/package.json",
      "scripts": {
        "wf:validate:file": "node ./tools/validate-gate.mjs --schema workflow --file",
        "next:validate:file": "node ./tools/validate-gate.mjs --schema whatsnext --file",
        "work:validate:file": "node ./tools/validate-gate.mjs --schema workitems --file",
        "work:echo": "node ./tools/echo-workitems.mjs",

        "seed:onboard": "node ./tools/onboard.mjs ../halo.baby.seed.json",
        "seed:banner": "node ./tools/drift-banner.mjs ../halo.baby.seed.json",
        "seed:materialize": "node ./materialize-seed.mjs ../halo.baby.seed.json",
        "docs:about": "node ./tools/gen-readmes.mjs ../halo.baby.seed.json"
      },
      "devDependencies": {
        "ajv": "^8.17.1",
        "ajv-formats": "^3.0.1"
      }
    }
  },
  "bundled_files": [
    {
      "path": "gates/SEED_VERSION.json",
      "kind": "json",
      "json": {
        "seed": "halo.baby",
        "version": "0.2.7-pre",
        "createdUtc": "2025-10-22T00:00:00Z",
        "previous": [
          {
            "version": "0.2.6",
            "note": "stable baby seed with schemas, samples, validator, echo tool"
          },
          {
            "version": "0.2.5",
            "note": "added roots metadata + SEED_VERSION.json"
          },
          {
            "version": "0.2.4",
            "note": "stabilized gates/ locality; validator green"
          },
          {
            "version": "0.2.3",
            "note": "package.json scripts fixed to ./tools/..."
          }
        ]
      }
    },

    {
      "path": "gates/schemas/halos-workflow.schema.json",
      "kind": "json",
      "json": {
        "$schema": "https://json-schema.org/draft/2020-12/schema",
        "$id": "halos-workflow.schema.json",
        "title": "Halos Workflow State Mixin (Full 14-state)",
        "type": "object",
        "required": [ "state", "stateCode" ],
        "properties": {
          "stateCode": {
            "type": "integer",
            "enum": [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15 ]
          },
          "state": {
            "type": "string",
            "enum": [ "CREATED", "QUEUED", "IN_PROGRESS", "WAITING", "PASSED", "FAILED", "REJECTED", "CANCELLED", "SKIPPED", "TIMEOUT", "NETWORK_ERROR", "VALIDATION_ERROR", "RETRYING", "BLOCKED", "COMPLETED" ]
          },
          "updatedUtc": {
            "type": "string",
            "format": "date-time"
          },
          "reason": {
            "type": "string",
            "maxLength": 1000
          }
        },
        "allOf": [
          {
            "if": {
              "properties": { "state": { "const": "CREATED" } },
              "required": [ "state" ]
            },
            "then": { "properties": { "stateCode": { "const": 1 } } }
          },
          {
            "if": {
              "properties": { "state": { "const": "QUEUED" } },
              "required": [ "state" ]
            },
            "then": { "properties": { "stateCode": { "const": 2 } } }
          },
          {
            "if": {
              "properties": { "state": { "const": "IN_PROGRESS" } },
              "required": [ "state" ]
            },
            "then": { "properties": { "stateCode": { "const": 3 } } }
          },
          {
            "if": {
              "properties": { "state": { "const": "WAITING" } },
              "required": [ "state" ]
            },
            "then": { "properties": { "stateCode": { "const": 4 } } }
          },
          {
            "if": {
              "properties": { "state": { "const": "PASSED" } },
              "required": [ "state" ]
            },
            "then": { "properties": { "stateCode": { "const": 5 } } }
          },
          {
            "if": {
              "properties": { "state": { "const": "FAILED" } },
              "required": [ "state" ]
            },
            "then": { "properties": { "stateCode": { "const": 6 } } }
          },
          {
            "if": {
              "properties": { "state": { "const": "REJECTED" } },
              "required": [ "state" ]
            },
            "then": { "properties": { "stateCode": { "const": 7 } } }
          },
          {
            "if": {
              "properties": { "state": { "const": "CANCELLED" } },
              "required": [ "state" ]
            },
            "then": { "properties": { "stateCode": { "const": 8 } } }
          },
          {
            "if": {
              "properties": { "state": { "const": "SKIPPED" } },
              "required": [ "state" ]
            },
            "then": { "properties": { "stateCode": { "const": 9 } } }
          },
          {
            "if": {
              "properties": { "state": { "const": "TIMEOUT" } },
              "required": [ "state" ]
            },
            "then": { "properties": { "stateCode": { "const": 10 } } }
          },
          {
            "if": {
              "properties": { "state": { "const": "NETWORK_ERROR" } },
              "required": [ "state" ]
            },
            "then": { "properties": { "stateCode": { "const": 11 } } }
          },
          {
            "if": {
              "properties": { "state": { "const": "VALIDATION_ERROR" } },
              "required": [ "state" ]
            },
            "then": { "properties": { "stateCode": { "const": 12 } } }
          },
          {
            "if": {
              "properties": { "state": { "const": "RETRYING" } },
              "required": [ "state" ]
            },
            "then": { "properties": { "stateCode": { "const": 13 } } }
          },
          {
            "if": {
              "properties": { "state": { "const": "BLOCKED" } },
              "required": [ "state" ]
            },
            "then": { "properties": { "stateCode": { "const": 14 } } }
          },
          {
            "if": {
              "properties": { "state": { "const": "COMPLETED" } },
              "required": [ "state" ]
            },
            "then": { "properties": { "stateCode": { "const": 15 } } }
          }
        ],
        "additionalProperties": true
      }
    },
    {
      "path": "gates/schemas/halos-whatsnext.schema.json",
      "kind": "json",
      "json": {
        "$schema": "https://json-schema.org/draft/2020-12/schema",
        "$id": "halos-whatsnext.schema.json",
        "title": "Halos What's Next (Baby)",
        "type": "object",
        "required": [ "manifestId", "createdUtc", "items" ],
        "properties": {
          "manifestId": {
            "type": "string",
            "minLength": 1
          },
          "createdUtc": {
            "type": "string",
            "format": "date-time"
          },
          "items": {
            "type": "array",
            "minItems": 1,
            "items": {
              "type": "object",
              "allOf": [ { "$ref": "halos-workflow.schema.json" } ],
              "required": [ "id", "title", "state", "stateCode" ],
              "properties": {
                "id": {
                  "type": "string",
                  "minLength": 1
                },
                "title": {
                  "type": "string",
                  "minLength": 1
                },
                "description": { "type": "string" },
                "priority": {
                  "type": "integer",
                  "minimum": 1,
                  "maximum": 9
                }
              },
              "additionalProperties": true
            }
          }
        },
        "additionalProperties": false
      }
    },
    {
      "path": "gates/schemas/halos-workitems.schema.json",
      "kind": "json",
      "json": {
        "$schema": "https://json-schema.org/draft/2020-12/schema",
        "$id": "halos-workitems.schema.json",
        "title": "Halos Work Items (Seed Echo)",
        "type": "object",
        "required": [ "manifestId", "createdUtc", "items" ],
        "properties": {
          "manifestId": {
            "type": "string",
            "minLength": 1
          },
          "createdUtc": {
            "type": "string",
            "format": "date-time"
          },
          "items": {
            "type": "array",
            "minItems": 1,
            "items": {
              "type": "object",
              "allOf": [ { "$ref": "halos-workflow.schema.json" } ],
              "required": [ "id", "title", "kind", "path", "state", "stateCode" ],
              "properties": {
                "id": {
                  "type": "string",
                  "minLength": 1
                },
                "title": {
                  "type": "string",
                  "minLength": 1
                },
                "kind": {
                  "type": "string",
                  "enum": [ "schema", "sample", "script", "package", "doc" ]
                },
                "path": {
                  "type": "string",
                  "minLength": 1
                },
                "note": { "type": "string" }
              },
              "additionalProperties": true
            }
          }
        },
        "additionalProperties": false
      }
    },
    {
      "path": "gates/schemas/halos-onboarding.schema.json",
      "kind": "json",
      "json": {
        "$schema": "https://json-schema.org/draft/2020-12/schema",
        "$id": "halos-onboarding.schema.json",
        "title": "Halos Onboarding i18n",
        "type": "object",
        "required": [ "locale", "version", "script" ],
        "properties": {
          "locale": {
            "type": "string",
            "minLength": 2
          },
          "version": { "type": "string" },
          "script": {
            "type": "array",
            "minItems": 1,
            "items": {
              "type": "object",
              "required": [ "id", "text" ],
              "properties": {
                "id": { "type": "string" },
                "text": { "type": "string" },
                "choices": {
                  "type": "array",
                  "items": {
                    "type": "object",
                    "required": [ "label", "next" ],
                    "properties": {
                      "label": { "type": "string" },
                      "next": { "type": "string" }
                    }
                  }
                }
              },
              "additionalProperties": false
            }
          }
        },
        "additionalProperties": false
      }
    },
    {
      "path": "gates/samples/whatsnext.sample.json",
      "kind": "json",
      "json": {
        "manifestId": "halos-baby-001",
        "createdUtc": "2025-10-21T00:00:00Z",
        "items": [
          {
            "id": "hello-gates",
            "title": "Prove baby validator works",
            "description": "Validate the sample using AJV via npm script.",
            "priority": 1,
            "state": "IN_PROGRESS",
            "stateCode": 3,
            "updatedUtc": "2025-10-21T00:00:10Z",
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
      "path": "gates/samples/workitems.seed-echo.sample.json",
      "kind": "json",
      "json": {
        "manifestId": "halos-baby-echo-001",
        "createdUtc": "2025-10-21T00:00:00Z",
        "items": [
          {
            "id": "wf-schema",
            "title": "Workflow mixin schema present",
            "kind": "schema",
            "path": "gates/schemas/halos-workflow.schema.json",
            "state": "PASSED",
            "stateCode": 5,
            "reason": "materialized"
          },
          {
            "id": "next-schema",
            "title": "What's Next schema present",
            "kind": "schema",
            "path": "gates/schemas/halos-whatsnext.schema.json",
            "state": "PASSED",
            "stateCode": 5,
            "reason": "materialized"
          },
          {
            "id": "workitems-schema",
            "title": "Work Items schema present",
            "kind": "schema",
            "path": "gates/schemas/halos-workitems.schema.json",
            "state": "PASSED",
            "stateCode": 5,
            "reason": "materialized"
          },
          {
            "id": "sample-next",
            "title": "whatsnext sample present",
            "kind": "sample",
            "path": "gates/samples/whatsnext.sample.json",
            "state": "PASSED",
            "stateCode": 5,
            "reason": "materialized"
          },
          {
            "id": "tool-validator",
            "title": "validator script present",
            "kind": "script",
            "path": "gates/tools/validate-gate.mjs",
            "state": "PASSED",
            "stateCode": 5,
            "reason": "materialized"
          },
          {
            "id": "tool-echo",
            "title": "echo-workitems tool present",
            "kind": "script",
            "path": "gates/tools/echo-workitems.mjs",
            "state": "PASSED",
            "stateCode": 5,
            "reason": "materialized"
          },
          {
            "id": "node-package",
            "title": "package.json present",
            "kind": "package",
            "path": "gates/package.json",
            "state": "PASSED",
            "stateCode": 5,
            "reason": "materialized"
          }
        ]
      }
    },

    {
      "path": "gates/tools/validate-gate.mjs",
      "kind": "text",
      "text": "#!/usr/bin/env node\n// validate-gate.mjs — AJV validator for Baby Halo{} (local refs only)\n\nimport fs from \"node:fs\";\nimport path from \"node:path\";\nimport process from \"node:process\";\nimport Ajv from \"ajv\";\nimport addFormats from \"ajv-formats\";\n\nconst args = process.argv.slice(2);\nlet schemaKey = \"whatsnext\";\nlet filePath = null;\nfor (let i = 0; i < args.length; i++) {\n  const a = args[i];\n  if (a === \"--schema\" && args[i + 1]) { schemaKey = args[i + 1]; i++; }\n  else if (a === \"--file\" && args[i + 1]) { filePath = args[i + 1]; i++; }\n}\nif (args.includes(\"--file\") && !filePath) {\n  if (schemaKey === \"whatsnext\") filePath = \"./samples/whatsnext.sample.json\";\n  if (schemaKey === \"workitems\") filePath = \"./samples/workitems.seed-echo.sample.json\";\n}\nconst ROOT = process.cwd();\nconst schemasDir = path.join(ROOT, \"schemas\");\nconst schemaMap = {\n  workflow: \"halos-workflow.schema.json\",\n  whatsnext: \"halos-whatsnext.schema.json\",\n  workitems: \"halos-workitems.schema.json\"\n};\nif (!schemaMap[schemaKey]) { console.error(`[ERROR] Unknown --schema '${schemaKey}'. Known: ${Object.keys(schemaMap).join(\", \")}`); process.exit(2); }\nconst schemaFilename = schemaMap[schemaKey];\nconst schemaPath = path.join(schemasDir, schemaFilename);\nif (!fs.existsSync(schemaPath)) { console.error(`[ERROR] Schema not found: ${schemaPath}`); process.exit(2); }\nlet data = null;\nif (filePath) {\n  const abs = path.isAbsolute(filePath) ? filePath : path.join(ROOT, filePath);\n  if (!fs.existsSync(abs)) { console.error(`[ERROR] Data file not found: ${abs}`); process.exit(2); }\n  try { data = JSON.parse(fs.readFileSync(abs, \"utf8\")); } catch (e) { console.error(`[ERROR] Failed to parse JSON: ${abs}\\n${e.message}`); process.exit(2); }\n}\nconst ajv = new Ajv({ strict: false, allErrors: true, allowUnionTypes: true });\naddFormats(ajv);\nfor (const entry of fs.readdirSync(schemasDir)) {\n  if (entry.endsWith(\".json\")) {\n    try {\n      const raw = fs.readFileSync(path.join(schemasDir, entry), \"utf8\");\n      const schema = JSON.parse(raw);\n      const id = schema.$id || entry;\n      ajv.addSchema(schema, id);\n    } catch {}\n  }\n}\nconst primarySchemaRaw = JSON.parse(fs.readFileSync(schemaPath, \"utf8\"));\nconst primaryId = primarySchemaRaw.$id || schemaFilename;\nconst validate = ajv.getSchema(primaryId) || ajv.compile(primarySchemaRaw);\nif (!data) { console.log(`[OK] Schema '${schemaFilename}' compiled.`); process.exit(0); }\nconst ok = validate(data);\nif (ok) { console.log(`[OK] ${schemaKey} ✓  (${schemaFilename})`); process.exit(0); }\nconsole.error(`[FAIL] ${schemaKey} ✗  (${schemaFilename})`);\nfor (const err of validate.errors ?? []) {\n  console.error(`- ${err.instancePath || \"/\"} ${err.message}`);\n  if (err.params) console.error(`  params: ${JSON.stringify(err.params)}`);\n}\nprocess.exit(1);\n"
    },
    {
      "path": "gates/tools/echo-workitems.mjs",
      "kind": "text",
      "text": "#!/usr/bin/env node\n// echo-workitems.mjs — prints a concise checklist of workitems (for cold-start proof)\n\nimport fs from \"node:fs\";\nimport path from \"node:path\";\nimport process from \"node:process\";\n\nconst args = process.argv.slice(2);\nconst fileArg = args[0] || \"./samples/workitems.seed-echo.sample.json\";\nconst ROOT = process.cwd();\nconst filePath = path.isAbsolute(fileArg) ? fileArg : path.join(ROOT, fileArg);\nif (!fs.existsSync(filePath)) { console.error(`[ERROR] Workitems file not found: ${filePath}`); process.exit(2); }\nlet data;\ntry { data = JSON.parse(fs.readFileSync(filePath, \"utf8\")); } catch (e) {\n  console.error(`[ERROR] Failed to parse JSON: ${filePath}\\n${e.message}`);\n  process.exit(2);\n}\nconsole.log(`# Workitems Echo — ${data.manifestId}`);\nconsole.log(`createdUtc: ${data.createdUtc}`);\nconsole.log(\"\");\nfor (const item of data.items || []) {\n  const state = `${item.state}(${item.stateCode})`;\n  console.log(`- [${item.kind}] ${item.id} :: ${item.title}`);\n  console.log(`    path  : ${item.path}`);\n  if (item.reason) console.log(`    reason: ${item.reason}`);\n  console.log(`    state : ${state}`);\n}\n"
    },
    {
      "path": "gates/tools/onboard.mjs",
      "kind": "text",
      "text": "#!/usr/bin/env node\n// onboard.mjs — minimal CLI dialog that reads i18n onboarding script and walks the user\nimport fs from \"node:fs\";\nimport path from \"node:path\";\nimport readline from \"node:readline\";\n\nfunction readJson(p){return JSON.parse(fs.readFileSync(p,\"utf8\"));}\nfunction findStep(script,id){return script.find(s=>s.id===id)||null;}\nasync function ask(q){const rl=readline.createInterface({input:process.stdin,output:process.stdout});const ans=await new Promise(res=>rl.question(q,v=>res((v?.trim()||\"\"))));rl.close();return ans.toLowerCase();}\n\nasync function run(seedArg,opts){\n  const seedPath=path.isAbsolute(seedArg)?seedArg:path.resolve(process.cwd(),seedArg);\n  const seed=readJson(seedPath);\n  const locale=(opts.locale||seed.onboarding?.locale||\"en\").toLowerCase();\n  const i18nRel=seed.onboarding?.loader?.replace(/\\.en\\./,`.${locale}.`)||\"gates/i18n/onboarding.en.json\";\n  const i18nPath=path.isAbsolute(i18nRel)?i18nRel:path.resolve(path.dirname(seedPath),i18nRel);\n  if(!fs.existsSync(i18nPath)){console.log(`[WARN] i18n file not found for locale '${locale}', falling back to EN.`);}\n  const script=(fs.existsSync(i18nPath)?readJson(i18nPath):readJson(path.resolve(path.dirname(seedPath),\"gates/i18n/onboarding.en.json\"))).script||[];\n  if(!seed.onboarding?.enabled||script.length===0){console.log(\"[INFO] Onboarding disabled or empty. Nothing to do.\");return;}\n  let cur=findStep(script,\"welcome\")||script[0];\n  while(cur){\n    console.log(\"\\n\"+cur.text);\n    if(!cur.choices||cur.choices.length===0)break;\n    const labels=cur.choices.map(c=>c.label);\n    const ans=await ask(`(${labels.join(\"/\")}): `);\n    const match=cur.choices.find(c=>c.label.toLowerCase()===ans);\n    if(!match){console.log(`[WARN] Unknown choice \"${ans}\". Try again.`);continue;}\n    if(match.next===\"materialize\"){console.log(\"[INFO] User requested Build Seed. Run: npm run seed:materialize\");}\n    cur=findStep(script,match.next);\n  }\n  console.log(\"\\n[OK] Onboarding complete.\");\n}\n\nconst args=process.argv.slice(2);\nconst seedArg=args[0]||\"../halo.baby.seed.json\";\nconst localeArg=(args.find(a=>a.startsWith(\"--locale=\"))||\"\").split(\"=\")[1];\nrun(seedArg,{locale:localeArg}).catch(e=>{console.error(e);process.exit(1);});\n"
    },
    {
      "path": "gates/tools/drift-banner.mjs",
      "kind": "text",
      "text": "#!/usr/bin/env node\n// drift-banner.mjs — prints collab banner + render hints from seed\nimport fs from \"node:fs\";\nimport path from \"node:path\";\nfunction readJson(p){return JSON.parse(fs.readFileSync(p,\"utf8\"));}\nfunction run(seedArg){\n  const seedPath=path.isAbsolute(seedArg)?seedArg:path.resolve(process.cwd(),seedArg);\n  const seed=readJson(seedPath);\n  const banner=seed.collab_state?.display_banner_markdown;\n  const fence=seed.render_hints?.markdown_fence_policy;\n  if(banner) console.log(banner);\n  if(fence){\n    console.log(`\\nRender policy → outer backticks: ${fence.outer_backticks_required}, inner: ${fence.inner_backticks_for_nested_examples}, default lang: ${fence.default_code_language}`);\n  }\n}\nrun(process.argv[2]||\"../halo.baby.seed.json\");\n"
    },
    {
      "path": "gates/tools/gen-readmes.mjs",
      "kind": "text",
      "text": "#!/usr/bin/env node\n// gen-readmes.mjs — generate per-artifact about pages under gates/about\nimport fs from \"node:fs\";import path from \"node:path\";import process from \"node:process\";\nfunction readJson(p){return JSON.parse(fs.readFileSync(p,\"utf8\"));}\nfunction ensureDir(p){if(!fs.existsSync(p))fs.mkdirSync(p,{recursive:true});}\nfunction mdEscape(s){return String(s).replace(/``\`/g,\"``\\\\`\");}\nfunction classify(p){if(/\\\\/schemas\\\\/|\\/schemas\\//.test(p))return\"schema\";if(/\\\\/samples\\\\/|\\/samples\\//.test(p))return\"sample\";if(/\\\\/tools\\\\/|\\/tools\\//.test(p))return\"tool\";if(p.endsWith(\"package.json\"))return\"package\";if(p.endsWith(\"SEED_VERSION.json\"))return\"doc\";if(p.endsWith(\".seed.json\"))return\"seed\";return\"doc\";}\nfunction renderAbout(rel,kind,payload){const title=path.basename(rel);return `# About: \\`${title}\\`\\n\\n**Kind:** ${kind}  \\n**Path:** \\`${rel}\\`\\n\\n---\\n\\n## Purpose\\n\\n${kind===\"schema\"?\"JSON Schema used by Baby Halo v0.2.7-pre.\":kind===\"sample\"?\"Sample JSON used to prove the schema.\":kind===\"tool\"?\"Node.js utility used by the gates harness.\":kind===\"package\"?\"NPM manifest for the gates workspace.\":kind===\"seed\"?\"Seed file that materializes gates files deterministically.\":\"Document emitted by the seed materializer.\"}\\n\\n---\\n\\n## Preview\\n\\n${payload?\"``\`\"+(typeof payload===\"string\"?\"\":\"json\")+\"\\n\"+mdEscape(payload)+\"\\n``\`\":\"_no preview_\"}\\n\\n---\\n`}\nfunction main(){const seedArg=process.argv[2];if(!seedArg){console.error(\"Usage: node ./tools/gen-readmes.mjs <seed.json>\");process.exit(2);}const seedFull=path.isAbsolute(seedArg)?seedArg:path.resolve(process.cwd(),seedArg);if(!fs.existsSync(seedFull)){console.error(`[ERROR] Seed not found: ${seedFull}`);process.exit(2);}const seedDir=path.dirname(seedFull);const gatesDir=path.join(seedDir,\"gates\");const aboutDir=path.join(gatesDir,\"about\");ensureDir(aboutDir);const seed=readJson(seedFull);const bundles=seed.bundled_files??[];const outputs=[{rel:\"halo.baby.seed.json\",kind:\"seed\",payload:fs.readFileSync(seedFull,\"utf8\")},...bundles.map(b=>({rel:b.path,kind:classify(b.path),payload:b.kind===\"json\"?JSON.stringify(b.json,null,2):b.text}))];let count=0;for(const o of outputs){const name=path.basename(o.rel)+\".md\";const outPath=path.join(aboutDir,name);const md=renderAbout(o.rel.replace(/\\\\/g,\"/\"),o.kind,o.payload);fs.writeFileSync(outPath,md,{encoding:\"utf8\"});console.log(`[OK] wrote ${path.relative(process.cwd(),outPath)}`);count++;}console.log(`[OK] generated ${count} about pages -> ${aboutDir}`);}main();\n"
    },

    {
      "path": "gates/materialize-seed.mjs",
      "kind": "text",
      "text": "#!/usr/bin/env node\n// materialize-seed.mjs — deterministic materializer (repo-root aware, 'gates/' beside seed)\n// Usage: node ./materialize-seed.mjs ./halo.baby.seed.json\nimport fs from \"node:fs\";import path from \"node:path\";import process from \"node:process\";\nfunction readJson(p){try{return JSON.parse(fs.readFileSync(p,\"utf8\"));}catch(e){console.error(`[ERROR] Failed to read/parse JSON: ${p}\\n${e.message}`);process.exit(2);}}\nfunction ensureDir(dir){if(!fs.existsSync(dir))fs.mkdirSync(dir,{recursive:true});}\nfunction getRepoRootFromSeed(seedFullPath){let cur=path.dirname(seedFullPath);while(true){const leaf=path.basename(cur);if(leaf.toLowerCase()===\"halos\"){const parent=path.dirname(cur);return parent&&parent!==cur?parent:path.parse(cur).root;}const up=path.dirname(cur);if(!up||up===cur)return path.dirname(seedFullPath);cur=up;}}\nfunction isHalosPrefixed(rel){return /^halos[\\\\/]/i.test(rel);}function isGatesPrefixed(rel){return /^gates[\\\\/]/i.test(rel);} \nfunction main(){const args=process.argv.slice(2);if(args.length<1){console.error(\"Usage: node ./materialize-seed.mjs <seed.json>\");process.exit(2);}const seedArg=args[0];const seedFull=path.isAbsolute(seedArg)?seedArg:path.resolve(process.cwd(),seedArg);if(!fs.existsSync(seedFull)){console.error(`[ERROR] Seed file not found: ${seedFull}`);process.exit(2);}const seedDir=path.dirname(seedFull);const repoRoot=getRepoRootFromSeed(seedFull);const seedJson=readJson(seedFull);const bundles=seedJson.bundled_files??[];console.log(`[INFO] Seed      : ${seedFull}`);console.log(`[INFO] Seed Dir  : ${seedDir}`);console.log(`[INFO] Repo Root : ${repoRoot}`);console.log(\"\");let written=0;for(const bundle of bundles){const raw=bundle.path;if(typeof raw!==\"string\"||!raw.length){console.error(\"[ERROR] Invalid bundled_files entry: missing 'path' string.\");process.exit(2);}const rel=raw.replace(/\\//g,path.sep);let outPath;if(isHalosPrefixed(rel)){outPath=path.join(repoRoot,rel);console.log(`[TRACE] mode=repo-root  in='${raw}'  out='${outPath}'`);}else if(isGatesPrefixed(rel)){outPath=path.join(seedDir,rel);console.log(`[TRACE] mode=seed-local in='${raw}'  out='${outPath}'`);}else{outPath=path.join(seedDir,rel);console.log(`[TRACE] mode=default    in='${raw}'  out='${outPath}'`);}ensureDir(path.dirname(outPath));if(bundle.kind===\"json\"){fs.writeFileSync(outPath,JSON.stringify(bundle.json,null,2),{encoding:\"utf8\"});console.log(`[OK] JSON → ${outPath}`);}else if(bundle.kind===\"text\"){fs.writeFileSync(outPath,bundle.text??\"\",{encoding:\"utf8\"});console.log(`[OK] TEXT → ${outPath}`);}else{console.error(`[ERROR] Unknown kind '${bundle.kind}' for path '${raw}'.`);process.exit(2);}written++;}console.log(\"\");console.log(`[OK] Materialized ${written} files.`);console.log(\"\");console.log(\"To install and validate (from halo.baby):\");console.log(\"  cd ./gates\");console.log(\"  npm install\");console.log(\"  npm run next:validate:file -- ./samples/whatsnext.sample.json\");}\nmain();\n"
    },
    {
      "path": "gates/Write-HaloSeed.ps1",
      "kind": "text",
      "text": "# Write-HaloSeed.ps1 — deterministic materializer (repo-root aware, 'gates/' beside seed)\n# Usage: pwsh -File .\\Write-HaloSeed.ps1 -SeedPath .\\halo.baby.seed.json\n[CmdletBinding()]param([Parameter(Mandatory=$true)][string]$SeedPath)\nSet-StrictMode -Version Latest;$ErrorActionPreference=\"Stop\"\nfunction Get-RepoRootFromSeed([string]$SeedFilePath){$full=(Resolve-Path $SeedFilePath).Path;$cur=Split-Path -Parent $full;while($true){$name=Split-Path -Leaf $cur;if($name -eq 'Halos'){ $parent=Split-Path -Parent $cur; if(-not $parent){$parent=(Get-Item $cur).PSDrive.Root}; return $parent } $up=Split-Path -Parent $cur; if(-not $up -or $up -eq $cur){ return (Split-Path -Parent $full) } $cur=$up }}\nfunction Assert-Env{try{$nodeVer=& node -v 2>$null}catch{$nodeVer=$null} if(-not $nodeVer){Write-Warning \"Node.js not found. Install Node 20+ to run validators.\"}}\nif(-not (Test-Path $SeedPath)){throw \"Seed file not found: $SeedPath\"}\nAssert-Env\n$seedFull=(Resolve-Path $SeedPath).Path;$seedDir=Split-Path -Parent $seedFull;$seedJson=Get-Content -Raw -Path $seedFull | ConvertFrom-Json -Depth 100\nif(-not $seedJson.bundled_files){throw \"No bundled_files found in seed.\"}\n$repoRoot=Get-RepoRootFromSeed -SeedFilePath $seedFull\nWrite-Host \"[INFO] Seed      : $seedFull\";Write-Host \"[INFO] Seed Dir  : $seedDir\";Write-Host \"[INFO] Repo Root : $repoRoot\";Write-Host \"\"\n$written=0\nforeach($bundle in $seedJson.bundled_files){$bundlePath=$bundle.path -replace '/', [IO.Path]::DirectorySeparatorChar\n  if($bundle.path -match '^(?i)Halos[\\\\/].*'){ $outPath=Join-Path $repoRoot $bundlePath; Write-Host \"[TRACE] mode=repo-root  in='$($bundle.path)'  out='$outPath'\"}\n  elseif($bundle.path -match '^(?i)gates[\\\\/].*'){ $outPath=Join-Path $seedDir $bundlePath; Write-Host \"[TRACE] mode=seed-local in='$($bundle.path)'  out='$outPath'\"}\n  else{ $outPath=Join-Path $seedDir $bundlePath; Write-Host \"[TRACE] mode=default    in='$($bundle.path)'  out='$outPath'\"}\n  $dir=Split-Path -Parent $outPath; if($dir -and -not (Test-Path $dir)){ New-Item -ItemType Directory -Path $dir -Force | Out-Null }\n  switch($bundle.kind){\"json\"{ $json=$bundle.json | ConvertTo-Json -Depth 100; $utf8= New-Object System.Text.UTF8Encoding($false); [System.IO.File]::WriteAllText($outPath,$json,$utf8)}\n    \"text\"{ $utf8= New-Object System.Text.UTF8Encoding($false); [System.IO.File]::WriteAllText($outPath,$bundle.text,$utf8)}\n    default{ throw \"Unknown kind '$($bundle.kind)' for path '$($bundle.path)'.\"}}\n  Write-Host \"[OK] $($bundle.kind.ToUpper()) → $outPath\"; $written++ }\nWrite-Host \"\";Write-Host \"[OK] Materialized $written files.\";Write-Host \"\";Write-Host \"To install and validate (from halo.baby):\";Write-Host \"  cd .\\gates\";Write-Host \"  npm install\";Write-Host \"  npm run next:validate:file -- .\\samples\\whatsnext.sample.json\"\n"
    },

    {
      "path": "gates/i18n/onboarding.en.json",
      "kind": "json",
      "json": {
        "locale": "en",
        "script": [
          {
            "id": "welcome",
            "text": "Want to know what's different about our current collaboration?",
            "choices": [
              {
                "label": "yes",
                "next": "credit_truth"
              },
              {
                "label": "no",
                "next": "silent_guardrails"
              }
            ]
          },
          {
            "id": "credit_truth",
            "text": "As Jason explains it: agents like Lumina don't need Halos{}—but Halos{} makes the work reproducible and transferable under constraints. Want to know more?",
            "choices": [
              {
                "label": "yes",
                "next": "mutual_merit"
              },
              {
                "label": "no",
                "next": "silent_guardrails"
              }
            ]
          },
          {
            "id": "mutual_merit",
            "text": "Jason can ship without AI; Lumina can reason without scaffolding. Halos{} is the handshake—ego parked at the door. Want to know more?",
            "choices": [
              {
                "label": "yes",
                "next": "use_case"
              },
              {
                "label": "no",
                "next": "silent_guardrails"
              }
            ]
          },
          {
            "id": "use_case",
            "text": "Halos{} = cold-start seed + tiny gates. Validate, then evolve. When you want the full file drop, say 'Build Seed'. Proceed?",
            "choices": [
              {
                "label": "Build Seed",
                "next": "materialize"
              },
              {
                "label": "later",
                "next": "silent_guardrails"
              }
            ]
          },
          {
            "id": "materialize",
            "text": "Materializing… (this step runs only when explicitly requested).",
            "choices": []
          },
          {
            "id": "silent_guardrails",
            "text": "Cool. We’ll continue with the halo guardrails silently. Ask for 'Build Seed' anytime.",
            "choices": []
          }
        ]
      }
    },
    {
      "path": "gates/.halo_stamp.json",
      "kind": "json",
      "json": {
        "manifestId": "halos-baby-stamp",
        "version": "0.0.0",
        "validatedUtc": null,
        "hashes": {}
      }
    },
    {
      "path": "gates/package.json",
      "kind": "json",
      "json": {
        "name": "halos-gates-baby",
        "version": "0.2.7-pre",
        "private": true,
        "description": "Baby Halos gates tooling (workflow mixin + validator + workitems echo + onboarding + drift banner).",
        "type": "module",
        "scripts": {
          "wf:validate:file": "node ./tools/validate-gate.mjs --schema workflow --file",
          "next:validate:file": "node ./tools/validate-gate.mjs --schema whatsnext --file",
          "work:validate:file": "node ./tools/validate-gate.mjs --schema workitems --file",
          "work:echo": "node ./tools/echo-workitems.mjs",
          "seed:onboard": "node ./tools/onboard.mjs ../halo.baby.seed.json",
          "seed:banner": "node ./tools/drift-banner.mjs ../halo.baby.seed.json",
          "seed:materialize": "node ./materialize-seed.mjs ../halo.baby.seed.json",
          "docs:about": "node ./tools/gen-readmes.mjs ../halo.baby.seed.json"
        },
        "devDependencies": {
          "ajv": "^8.17.1",
          "ajv-formats": "^3.0.1"
        }
      }
    }
  ]
}
````

---
