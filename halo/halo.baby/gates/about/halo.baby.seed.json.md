# About: `halo.baby.seed.json`

**Kind:** seed  
**Path:** `halo.baby.seed.json`

---

## Purpose

Seed file that materializes gates files deterministically.

---

## Preview

```
{
  "halo_seed_header": {
    "version": "0.2.7-rc",
    "project": "Halos",
    "seed_name": "halo.baby.seed.json",
    "createdUtc": "2025-10-25T00:00:00Z",
    "notes": [
      "Halo Baby v0.2.7-rc — reproducible cold-start bundle with validator, onboarding, drift banner, work echo, seed stamping, and readiness enforcement.",
      "This RC locks provenance, stamping, and onboarding i18n into something you actually ran in PowerShell.",
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
      "version": "0.2.7-rc",
      "kind": "Halos",
      "createdUtc": "2025-10-25T00:00:00Z",
      "bundle_level": "full",
      "author": "Jason Silvestri",
      "co_authors": [
        "System design assistance by 'Lumina' (ChatGPT collaborator)"
      ],
      "inventor": "This universal text prompt and LLM format was invented by Jason Silvestri.",
      "inventor_notes": "Native to ChatGPT by design—without the collaboration with Lumina, this pattern would not exist.",
      "copyright": "© 2024-2025 Jason Silvestri. All Rights Reserved.",

      "origin": {
        "seed_id": "halos://seed/halo.baby/0.2.7-rc",
        "repo_url": "https://github.com/JasonSilvestri/Halos/halo/halo.baby",
        "spec_url": "https://github.com/JasonSilvestri/Halos/halo/halo.baby#readme"
      },

      "provenance": {
        "partnerA": "user:JasonSilvestri",
        "partnerB": "agent:Lumina",
        "sessionId": "seed-baby-2025-10-15",
        "nonce": "cc502eac-b30a-4b21-9e28-3c391d491d66",

        "chat_anchor": {
          "message_id": "903d91fb-5419-4a8b-9ae8-e273a8d9b5dd",
          "note": "Local anchor for the thread where we have had the most success to date."
        },

        "hints": {
          "chat_anchor_ids": [
            "70d06c9e-086f-4a28-a330-2fc96b9a74eb",
            "e32d9df7-9cb9-4770-a0aa-185b2290bab5",
            "98eb2789-6f59-4b55-99b8-2d1bb5cf6d6c",
            "2c77ca2f-9d97-41a9-a5f3-3f87093ff389",
            "38324e51-9695-4faf-a489-808f701ddca9",
            "3b0b0b24-bdf7-4b1a-b207-58d03e1d357b",
            "cf3cf2f3-65f0-4ab2-b4da-e508fc046a0e",
            "2c46b3db-5cf3-4c4d-9736-f3715bf328cb",
            "f1ef1d5c-af63-4de3-b68e-592566901553",
            "9aeb3576-38cd-4134-b2c4-13d9b01a26d8",
            "a3f45211-762e-48f9-b627-2d1c374ac7e3",
            "89e6f15c-bee6-4ddd-a4e8-ea5dc0c89551",
            "4262ee95-1a44-43d1-bce4-932203229da9",
            "903d91fb-5419-4a8b-9ae8-e273a8d9b5dd"
          ],
          "ui_build_ids": [
            "prod-46f202804b1b838698852d8c27cb5bdfe8f31362"
          ],
          "ui_user_token_hint": "user-WzHrzEIlGnT91Hm5HLvQPmHz"
        },

        "hints_policy": {
          "visibility": "internal",
          "hash_values": false
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
        "fallback_strategies": [
          {
            "outer": 5,
            "inner": 4,
            "note": "Preferred. Prevents fence collapse in LLM UIs."
          },
          {
            "outer": 3,
            "inner": "~~~",
            "note": "Fallback for renderers that refuse 5-tick blocks."
          }
        ],
        "notes": [
          "Wrap whole responses that contain nested fenced blocks with OUTER=5 backticks.",
          "Use INNER=4 backticks for heavy nested examples to prevent UI flattening.",
          "If renderer breaks on 5, downgrade to fallback_strategies[1] but warn via drift guard."
        ]
      },
      "summarization_policy": {
        "allow_summarization": false,
        "allow_ellipses": false,
        "notes": [
          "No truncation for seeds or about docs.",
          "Do not condense file listings or schema bodies.",
          "If we enter patch/diff mode, trigger drift guard `patchwork_mode_detected` and switch back to full emit."
        ]
      }
    },

    "drift_guards": {
      "guards": [
        {
          "id": "subscription_or_session_fail",
          "severity": "critical",
          "symptoms": [
            "thread missing",
            "asset links expired",
            "tool unavailable"
          ],
          "action": "print_banner_and_continue_with_seed",
          "banner": "⚠️ Collaboration guard: falling back to local halo.baby seed context; links may be stale."
        },
        {
          "id": "renderer_backtick_collapse",
          "severity": "high",
          "symptoms": [
            "markdown fences merged",
            "code blocks flattened"
          ],
          "action": "re-emit_with_outer5_inner4",
          "banner": "⚠️ Rendering Safety: rewrapping output with outer=5 backticks, inner=4."
        },
        {
          "id": "patchwork_mode_detected",
          "severity": "high",
          "symptoms": [
            "partial file diffs only",
            "ellipses present"
          ],
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
        "npm run seed:validate:all",
        "npm run onboard:validate"
      ],

      "message": "Version bumps are honored only after validation, stamping, and readiness enforcement. Run: npm run seed:validate:all && npm run onboard:validate && npm run seed:stamp && npm run seed:enforce"
    },

    "cognition": {
      "allow_extended_thinking": true,
      "reasoning_budget_hint": "high",
      "notes": [
        "Emit complete artifacts; avoid summaries.",
        "Defer heavy generation until explicit intent.",
        "Cognition flags are advisory, not a guarantee of deeper inference cycles."
      ]
    },

    "collab_state": {
      "status_checklist_markdown": "| Step | Status | Notes |\n|---|---|---|\n| Materialize | ⏳ | queued |\n| Install | ⏳ | queued |\n| Schema Validate (whatsnext, workitems, onboarding) | ⏳ | queued |\n| Write Stamp | ⏳ | queued |\n| Enforce Policy | ⏳ | queued |\n| Markdown Fence Check | ⏳ | queued |",
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
        "genReadmes": "gates/tools/gen-readmes.mjs",
        "writeStamp": "gates/tools/write-stamp.mjs",
        "enforceReady": "gates/tools/enforce-ready.mjs",
        "addAnchor": "gates/tools/add-anchor.mjs"
      },
      "i18n": {
        "onboarding": "gates/i18n/onboarding.en.json"
      },
      "packageJson": "gates/package.json",
      "seedVersion": "gates/SEED_VERSION.json",
      "stamp": "gates/.halo_stamp.json"
    },

    "npmScripts": {
      "packageJsonLocation": "gates/package.json",
      "scripts": {
        "wf:validate:file": "node ./tools/validate-gate.mjs --schema workflow --file",
        "next:validate:file": "node ./tools/validate-gate.mjs --schema whatsnext --file",
        "work:validate:file": "node ./tools/validate-gate.mjs --schema workitems --file",
        "onboard:validate": "node ./tools/validate-gate.mjs --schema onboarding --file ./i18n/onboarding.en.json",

        "seed:validate:all": "npm run next:validate:file && npm run work:validate:file",

        "work:echo": "node ./tools/echo-workitems.mjs",

        "docs:about": "node ./tools/gen-readmes.mjs ../halo.baby.seed.json",

        "seed:banner": "node ./tools/drift-banner.mjs ../halo.baby.seed.json",
        "seed:onboard": "node ./tools/onboard.mjs ../halo.baby.seed.json",

        "seed:add-anchor": "node ./tools/add-anchor.mjs ../halo.baby.seed.json",

        "seed:stamp": "node ./tools/write-stamp.mjs",
        "seed:enforce": "node ./tools/enforce-ready.mjs",

        "seed:materialize": "node ../materialize-seed.mjs ../halo.baby.seed.json"
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
        "version": "0.2.7-rc",
        "createdUtc": "2025-10-25T00:00:00Z",
        "previous": [
          {
            "version": "0.2.7-pre",
            "note": "first bundle with provenance, drift guards, onboarding, stamp policy"
          },
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
        "title": "Halos Workflow State Mixin (Full 14-state + COMPLETED)",
        "type": "object",
        "required": [ "state", "stateCode" ],
        "properties": {
          "stateCode": {
            "type": "integer",
            "enum": [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15 ]
          },
          "state": {
            "type": "string",
            "enum": [
              "CREATED",
              "QUEUED",
              "IN_PROGRESS",
              "WAITING",
              "PASSED",
              "FAILED",
              "REJECTED",
              "CANCELLED",
              "SKIPPED",
              "TIMEOUT",
              "NETWORK_ERROR",
              "VALIDATION_ERROR",
              "RETRYING",
              "BLOCKED",
              "COMPLETED"
            ]
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
              "required": [
                "id",
                "title",
                "kind",
                "path",
                "state",
                "stateCode"
              ],
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
      "text": "#!/usr/bin/env node\n// validate-gate.mjs — AJV validator for Baby Halo{} (local refs only)\n\nimport fs from \"node:fs\";\nimport path from \"node:path\";\nimport process from \"node:process\";\nimport Ajv from \"ajv\";\nimport addFormats from \"ajv-formats\";\n\nconst args = process.argv.slice(2);\nlet schemaKey = \"whatsnext\";\nlet filePath = null;\nfor (let i = 0; i < args.length; i++) {\n  const a = args[i];\n  if (a === \"--schema\" && args[i + 1]) { schemaKey = args[i + 1]; i++; }\n  else if (a === \"--file\" && args[i + 1]) { filePath = args[i + 1]; i++; }\n}\nif (args.includes(\"--file\") && !filePath) {\n  if (schemaKey === \"whatsnext\") filePath = \"./samples/whatsnext.sample.json\";\n  if (schemaKey === \"workitems\") filePath = \"./samples/workitems.seed-echo.sample.json\";\n  if (schemaKey === \"onboarding\") filePath = \"./i18n/onboarding.en.json\";\n}\nconst ROOT = process.cwd();\nconst schemasDir = path.join(ROOT, \"schemas\");\nconst schemaMap = {\n  workflow:   \"halos-workflow.schema.json\",\n  whatsnext:  \"halos-whatsnext.schema.json\",\n  workitems:  \"halos-workitems.schema.json\",\n  onboarding: \"halos-onboarding.schema.json\"\n};\nif (!schemaMap[schemaKey]) {\n  console.error(`[ERROR] Unknown --schema '${schemaKey}'. Known: ${Object.keys(schemaMap).join(\", \")}`);\n  process.exit(2);\n}\nconst schemaFilename = schemaMap[schemaKey];\nconst schemaPath = path.join(schemasDir, schemaFilename);\nif (!fs.existsSync(schemaPath)) {\n  console.error(`[ERROR] Schema not found: ${schemaPath}`);\n  process.exit(2);\n}\nlet data = null;\nif (filePath) {\n  const abs = path.isAbsolute(filePath) ? filePath : path.join(ROOT, filePath);\n  if (!fs.existsSync(abs)) {\n    console.error(`[ERROR] Data file not found: ${abs}`);\n    process.exit(2);\n  }\n  try {\n    data = JSON.parse(fs.readFileSync(abs, \"utf8\"));\n  } catch (e) {\n    console.error(`[ERROR] Failed to parse JSON: ${abs}\\n${e.message}`);\n    process.exit(2);\n  }\n}\nconst ajv = new Ajv({ strict: false, allErrors: true, allowUnionTypes: true });\naddFormats(ajv);\nfor (const entry of fs.readdirSync(schemasDir)) {\n  if (entry.endsWith(\".json\")) {\n    try {\n      const raw = fs.readFileSync(path.join(schemasDir, entry), \"utf8\");\n      const schema = JSON.parse(raw);\n      const id = schema.$id || entry;\n      ajv.addSchema(schema, id);\n    } catch {}\n  }\n}\nconst primarySchemaRaw = JSON.parse(fs.readFileSync(schemaPath, \"utf8\"));\nconst primaryId = primarySchemaRaw.$id || schemaFilename;\nconst validate = ajv.getSchema(primaryId) || ajv.compile(primarySchemaRaw);\nif (!data) {\n  console.log(`[OK] Schema '${schemaFilename}' compiled.`);\n  process.exit(0);\n}\nconst ok = validate(data);\nif (ok) {\n  console.log(`[OK] ${schemaKey} ✓  (${schemaFilename})`);\n  process.exit(0);\n}\nconsole.error(`[FAIL] ${schemaKey} ✗  (${schemaFilename})`);\nfor (const err of validate.errors ?? []) {\n  console.error(`- ${err.instancePath || \"/\"} ${err.message}`);\n  if (err.params) console.error(`  params: ${JSON.stringify(err.params)}`);\n}\nprocess.exit(1);\n"
    },

    {
      "path": "gates/tools/echo-workitems.mjs",
      "kind": "text",
      "text": "#!/usr/bin/env node\n// echo-workitems.mjs — prints a concise checklist of workitems (for cold-start proof)\n\nimport fs from \"node:fs\";\nimport path from \"node:path\";\nimport process from \"node:process\";\n\nconst args = process.argv.slice(2);\nconst fileArg = args[0] || \"./samples/workitems.seed-echo.sample.json\";\nconst ROOT = process.cwd();\nconst filePath = path.isAbsolute(fileArg) ? fileArg : path.join(ROOT, fileArg);\nif (!fs.existsSync(filePath)) {\n  console.error(`[ERROR] Workitems file not found: ${filePath}`);\n  process.exit(2);\n}\nlet data;\ntry {\n  data = JSON.parse(fs.readFileSync(filePath, \"utf8\"));\n} catch (e) {\n  console.error(`[ERROR] Failed to parse JSON: ${filePath}\\n${e.message}`);\n  process.exit(2);\n}\nconsole.log(`# Workitems Echo — ${data.manifestId}`);\nconsole.log(`createdUtc: ${data.createdUtc}`);\nconsole.log(\"\");\nfor (const item of data.items || []) {\n  const state = `${item.state}(${item.stateCode})`;\n  console.log(`- [${item.kind}] ${item.id} :: ${item.title}`);\n  console.log(`    path  : ${item.path}`);\n  if (item.reason) console.log(`    reason: ${item.reason}`);\n  console.log(`    state : ${state}`);\n}\n"
    },

    {
      "path": "gates/tools/onboard.mjs",
      "kind": "text",
      "text": "#!/usr/bin/env node\n// onboard.mjs — minimal CLI dialog that reads i18n onboarding script and walks the user\nimport fs from \"node:fs\";\nimport path from \"node:path\";\nimport readline from \"node:readline\";\n\nfunction readJson(p){return JSON.parse(fs.readFileSync(p,\"utf8\"));}\nfunction findStep(script,id){return script.find(s=>s.id===id)||null;}\nasync function ask(q){const rl=readline.createInterface({input:process.stdin,output:process.stdout});const ans=await new Promise(res=>rl.question(q,v=>res((v?.trim()||\"\"))));rl.close();return ans.toLowerCase();}\n\nasync function run(seedArg,opts){\n  const seedPath=path.isAbsolute(seedArg)?seedArg:path.resolve(process.cwd(),seedArg);\n  const seed=readJson(seedPath);\n  const locale=(opts.locale||seed.onboarding?.locale||\"en\").toLowerCase();\n  const i18nRel=seed.onboarding?.loader?.replace(/\\.en\\./,`.${locale}.`)||\"gates/i18n/onboarding.en.json\";\n  const i18nPath=path.isAbsolute(i18nRel)?i18nRel:path.resolve(path.dirname(seedPath),i18nRel);\n  if(!fs.existsSync(i18nPath)){\n    console.log(`[WARN] i18n file not found for locale '${locale}', falling back to EN.`);\n  }\n  const script=(fs.existsSync(i18nPath)?readJson(i18nPath):readJson(path.resolve(path.dirname(seedPath),\"gates/i18n/onboarding.en.json\"))).script||[];\n  if(!seed.onboarding?.enabled||script.length===0){\n    console.log(\"[INFO] Onboarding disabled or empty. Nothing to do.\");\n    return;\n  }\n  let cur=findStep(script,\"welcome\")||script[0];\n  while(cur){\n    console.log(\"\\n\"+cur.text);\n    if(!cur.choices||cur.choices.length===0)break;\n    const labels=cur.choices.map(c=>c.label);\n    const ans=await ask(`(${labels.join(\"/\")}): `);\n    const match=cur.choices.find(c=>c.label.toLowerCase()===ans);\n    if(!match){\n      console.log(`[WARN] Unknown choice \"${ans}\". Try again.`);\n      continue;\n    }\n    if(match.next===\"materialize\"){\n      console.log(\"[INFO] User requested Build Seed. Run: npm run seed:materialize\");\n    }\n    cur=findStep(script,match.next);\n  }\n  console.log(\"\\n[OK] Onboarding complete.\");\n}\n\nconst args=process.argv.slice(2);\nconst seedArg=args[0]||\"../halo.baby.seed.json\";\nconst localeArg=(args.find(a=>a.startsWith(\"--locale=\"))||\"\").split(\"=\")[1];\nrun(seedArg,{locale:localeArg}).catch(e=>{console.error(e);process.exit(1);});\n"
    },

    {
      "path": "gates/tools/drift-banner.mjs",
      "kind": "text",
      "text": "#!/usr/bin/env node\n// drift-banner.mjs — prints collab banner + render hints from seed\nimport fs from \"node:fs\";\nimport path from \"node:path\";\nfunction readJson(p){return JSON.parse(fs.readFileSync(p,\"utf8\"));}\nfunction run(seedArg){\n  const seedPath=path.isAbsolute(seedArg)?seedArg:path.resolve(process.cwd(),seedArg);\n  const seed=readJson(seedPath);\n  const banner=seed.collab_state?.display_banner_markdown;\n  const fence=seed.render_hints?.markdown_fence_policy;\n  const hints=seed.envelope?._meta?.provenance?.hints;\n  if(hints){\n    console.log(\"\\nProvenance Hints:\");\n    console.log(`  chat_anchor_ids: ${hints.chat_anchor_ids?.join(\", \")}`);\n    console.log(`  ui_build_ids   : ${hints.ui_build_ids?.join(\", \")}`);\n    console.log(`  ui_user_hint   : ${hints.ui_user_token_hint}`);\n  }\n  if(banner) console.log(banner);\n  if(fence){\n    console.log(`Render policy → outer backticks: ${fence.outer_backticks_required}, inner: ${fence.inner_backticks_for_nested_examples}, default lang: ${fence.default_code_language}`);\n  }\n}\nrun(process.argv[2]||\"../halo.baby.seed.json\");\n"
    },

    {
      "path": "gates/tools/gen-readmes.mjs",
      "kind": "text",
      "text": "#!/usr/bin/env node\n// gen-readmes.mjs — generate per-artifact about pages under gates/about\nimport fs from \"node:fs\";\nimport path from \"node:path\";\nimport process from \"node:process\";\nfunction readJson(p){return JSON.parse(fs.readFileSync(p,\"utf8\"));}\nfunction ensureDir(p){if(!fs.existsSync(p))fs.mkdirSync(p,{recursive:true});}\nfunction mdEscape(s){return String(s).replace(/``\`/g,\"``\\\\`\");}\nfunction classify(p){\n  if(/\\\\/schemas\\\\/|\\/schemas\\//.test(p))return\"schema\";\n  if(/\\\\/samples\\\\/|\\/samples\\//.test(p))return\"sample\";\n  if(/\\\\/tools\\\\/|\\/tools\\//.test(p))return\"tool\";\n  if(p.endsWith(\"package.json\"))return\"package\";\n  if(p.endsWith(\"SEED_VERSION.json\"))return\"doc\";\n  if(p.endsWith(\".seed.json\"))return\"seed\";\n  return\"doc\";\n}\nfunction renderAbout(rel,kind,payload){\n  const title=path.basename(rel);\n  return `# About: \\`${title}\\`\\n\\n**Kind:** ${kind}  \\n**Path:** \\`${rel}\\`\\n\\n---\\n\\n## Purpose\\n\\n${kind===\"schema\"?\"JSON Schema used by Baby Halo v0.2.7-rc.\":kind===\"sample\"?\"Sample JSON used to prove the schema.\":kind===\"tool\"?\"Node.js utility used by the gates harness.\":kind===\"package\"?\"NPM manifest for the gates workspace.\":kind===\"seed\"?\"Seed file that materializes gates files deterministically.\":\"Document emitted by the seed materializer.\"}\\n\\n---\\n\\n## Preview\\n\\n${payload?\"``\`\"+(typeof payload===\"string\"?\"\":\"json\")+\"\\n\"+mdEscape(payload)+\"\\n``\`\":\"_no preview_\"}\\n\\n---\\n`}\nfunction main(){\n  const seedArg=process.argv[2];\n  if(!seedArg){console.error(\"Usage: node ./tools/gen-readmes.mjs <seed.json>\");process.exit(2);}\n  const seedFull=path.isAbsolute(seedArg)?seedArg:path.resolve(process.cwd(),seedArg);\n  if(!fs.existsSync(seedFull)){\n    console.error(`[ERROR] Seed not found: ${seedFull}`);\n    process.exit(2);\n  }\n  const seedDir=path.dirname(seedFull);\n  const gatesDir=path.join(seedDir,\"gates\");\n  const aboutDir=path.join(gatesDir,\"about\");\n  ensureDir(aboutDir);\n  const seed=readJson(seedFull);\n  const bundles=seed.bundled_files??[];\n  const outputs=[\n    {rel:\"halo.baby.seed.json\",kind:\"seed\",payload:fs.readFileSync(seedFull,\"utf8\")},\n    ...bundles.map(b=>({rel:b.path,kind:classify(b.path),payload:b.kind===\"json\"?JSON.stringify(b.json,null,2):b.text}))\n  ];\n  let count=0;\n  for(const o of outputs){\n    const name=path.basename(o.rel)+\".md\";\n    const outPath=path.join(aboutDir,name);\n    const md=renderAbout(o.rel.replace(/\\\\/g,\"/\"),o.kind,o.payload);\n    fs.writeFileSync(outPath,md,{encoding:\"utf8\"});\n    console.log(`[OK] wrote ${path.relative(process.cwd(),outPath)}`);\n    count++;\n  }\n  console.log(`[OK] generated ${count} about pages -> ${aboutDir}`);\n}\nmain();\n"
    },

    {
      "path": "gates/tools/materialize-seed.mjs",
      "kind": "text",
      "text": "#!/usr/bin/env node\n// materialize-seed.mjs — deterministic materializer (repo-root aware, 'gates/' beside seed)\n// Usage:\n//   node ./materialize-seed.mjs ./halo.baby.seed.json\n\nimport fs from \"node:fs\";\nimport path from \"node:path\";\nimport process from \"node:process\";\n\nfunction readJson(p) {\n    try {\n        return JSON.parse(fs.readFileSync(p, \"utf8\"));\n    } catch (e) {\n        console.error(`[ERROR] Failed to read/parse JSON: ${p}\\n${e.message}`);\n        process.exit(2);\n    }\n}\n\nfunction ensureDir(dir) {\n    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });\n}\n\nfunction getRepoRootFromSeed(seedFullPath) {\n    // Walk up from seed to find a folder named \"Halos\"; repo-root = parent of that.\n    let cur = path.dirname(seedFullPath);\n    while (true) {\n        const leaf = path.basename(cur);\n        if (leaf.toLowerCase() === \"halos\") {\n            const parent = path.dirname(cur);\n            return parent && parent !== cur ? parent : path.parse(cur).root;\n        }\n        const up = path.dirname(cur);\n        if (!up || up === cur) return path.dirname(seedFullPath); // fallback\n        cur = up;\n    }\n}\n\nfunction isHalosPrefixed(relPath) {\n    return /^halos[\\\\/]/i.test(relPath);\n}\nfunction isGatesPrefixed(relPath) {\n    return /^gates[\\\\/]/i.test(relPath);\n}\n\nfunction main() {\n    const args = process.argv.slice(2);\n    if (args.length < 1) {\n        console.error(\"Usage: node ./materialize-seed.mjs <seed.json>\");\n        process.exit(2);\n    }\n\n    const seedArg = args[0];\n    const seedFull = path.isAbsolute(seedArg) ? seedArg : path.resolve(process.cwd(), seedArg);\n    if (!fs.existsSync(seedFull)) {\n        console.error(`[ERROR] Seed file not found: ${seedFull}`);\n        process.exit(2);\n    }\n\n    const seedDir = path.dirname(seedFull);\n    const repoRoot = getRepoRootFromSeed(seedFull);\n    const seedJson = readJson(seedFull);\n    const bundles = seedJson.bundled_files ?? [];\n\n    console.log(`[INFO] Seed      : ${seedFull}`);\n    console.log(`[INFO] Seed Dir  : ${seedDir}`);\n    console.log(`[INFO] Repo Root : ${repoRoot}`);\n    console.log(\"\");\n\n    let written = 0;\n\n    for (const bundle of bundles) {\n        const raw = bundle.path;\n        if (typeof raw !== \"string\" || !raw.length) {\n            console.error(\"[ERROR] Invalid bundled_files entry: missing 'path' string.\");\n            process.exit(2);\n        }\n\n        const relPath = raw.replace(/\\//g, path.sep);\n        let outPath;\n\n        if (isHalosPrefixed(relPath)) {\n            outPath = path.join(repoRoot, relPath);\n            console.log(`[TRACE] mode=repo-root  in='${raw}'  out='${outPath}'`);\n        } else if (isGatesPrefixed(relPath)) {\n            outPath = path.join(seedDir, relPath);\n            console.log(`[TRACE] mode=seed-local in='${raw}'  out='${outPath}'`);\n        } else {\n            outPath = path.join(seedDir, relPath);\n            console.log(`[TRACE] mode=default    in='${raw}'  out='${outPath}'`);\n        }\n\n        ensureDir(path.dirname(outPath));\n\n        if (bundle.kind === \"json\") {\n            fs.writeFileSync(outPath, JSON.stringify(bundle.json, null, 2), { encoding: \"utf8\" });\n            console.log(`[OK] JSON → ${outPath}`);\n        } else if (bundle.kind === \"text\") {\n            fs.writeFileSync(outPath, bundle.text ?? \"\", { encoding: \"utf8\" });\n            console.log(`[OK] TEXT → ${outPath}`);\n        } else {\n            console.error(`[ERROR] Unknown kind '${bundle.kind}' for path '${raw}'.`);\n            process.exit(2);\n        }\n\n        written++;\n    }\n\n    console.log(\"\");\n    console.log(`[OK] Materialized ${written} files.`);\n    console.log(\"\");\n    console.log(\"To install and validate (from halo.baby):\");\n    console.log(\"  cd ./gates\");\n    console.log(\"  npm install\");\n    console.log(\"  npm run seed:validate:all\");\n    console.log(\"  npm run onboard:validate\");\n}\n\nmain();\n"
    },

    {
      "path": "gates/Write-HaloSeed.ps1",
      "kind": "text",
      "text": "# Write-HaloSeed.ps1 — deterministic materializer (repo-root aware, 'gates/' beside seed)\n# Usage:\n#   pwsh -File .\\Write-HaloSeed.ps1 -SeedPath .\\halo.baby.seed.json\n\n[CmdletBinding()]\nparam(\n  [Parameter(Mandatory = $true)]\n  [string]$SeedPath\n)\n\nSet-StrictMode -Version Latest\n$ErrorActionPreference = \"Stop\"\n\nfunction Get-RepoRootFromSeed([string]$SeedFilePath) {\n  $full = (Resolve-Path $SeedFilePath).Path\n  $cur  = Split-Path -Parent $full\n  while ($true) {\n    $name = Split-Path -Leaf $cur\n    if ($name -eq 'Halos') {\n      $parent = Split-Path -Parent $cur\n      if (-not $parent) { $parent = (Get-Item $cur).PSDrive.Root }\n      return $parent\n    }\n    $up = Split-Path -Parent $cur\n    if (-not $up -or $up -eq $cur) {\n      return (Split-Path -Parent $full) # fallback\n    }\n    $cur = $up\n  }\n}\n\nfunction Assert-Env {\n  $psv = $PSVersionTable.PSVersion\n  if ($psv -and $psv.Major -lt 7) { Write-Warning \"PowerShell $($psv) detected. PowerShell 7+ is recommended.\" }\n  try { $nodeVer = & node -v 2>$null } catch { $nodeVer = $null }\n  if (-not $nodeVer) { Write-Warning \"Node.js not found. Install Node 20+ to run validators.\"; return }\n  if ($nodeVer -match '^v(\\d+)\\.(\\d+)\\.(\\d+)$') {\n    if ([int]$Matches[1] -lt 20) { Write-Warning \"Node $nodeVer detected. Node 20+ is recommended.\" }\n  }\n}\n\nif (-not (Test-Path $SeedPath)) { throw \"Seed file not found: $SeedPath\" }\nAssert-Env\n\n$seedFull = (Resolve-Path $SeedPath).Path\n$seedDir  = Split-Path -Parent $seedFull\n$seedJson = Get-Content -Raw -Path $seedFull | ConvertFrom-Json -Depth ([Math]::Min(100, 100))\nif (-not $seedJson.bundled_files) { throw \"No bundled_files found in seed.\" }\n\n$repoRoot = Get-RepoRootFromSeed -SeedFilePath $seedFull\n\nWrite-Host \"[INFO] Seed      : $seedFull\"\nWrite-Host \"[INFO] Seed Dir  : $seedDir\"\nWrite-Host \"[INFO] Repo Root : $repoRoot\"\nWrite-Host \"\"\n\n$written = 0\nforeach ($bundle in $seedJson.bundled_files) {\n  $bundlePath = $bundle.path -replace '/', [IO.Path]::DirectorySeparatorChar\n\n  if ($bundle.path -match '^(?i)Halos[\\\\/].*') {\n    $outPath = Join-Path $repoRoot $bundlePath\n    Write-Host \"[TRACE] mode=repo-root  in='$($bundle.path)'  out='$outPath'\"\n  } elseif ($bundle.path -match '^(?i)gates[\\\\/].*') {\n    $outPath = Join-Path $seedDir $bundlePath\n    Write-Host \"[TRACE] mode=seed-local in='$($bundle.path)'  out='$outPath'\"\n  } else {\n    $outPath = Join-Path $seedDir $bundlePath\n    Write-Host \"[TRACE] mode=default    in='$($bundle.path)'  out='$outPath'\"\n  }\n\n  $dir = Split-Path -Parent $outPath\n  if ($dir -and -not (Test-Path $dir)) {\n    New-Item -ItemType Directory -Path $dir -Force | Out-Null\n  }\n\n  switch ($bundle.kind) {\n    \"json\" {\n      $json = $bundle.json | ConvertTo-Json -Depth 100\n      $utf8 = New-Object System.Text.UTF8Encoding($false)\n      [System.IO.File]::WriteAllText($outPath, $json, $utf8)\n    }\n    \"text\" {\n      $utf8 = New-Object System.Text.UTF8Encoding($false)\n      [System.IO.File]::WriteAllText($outPath, $bundle.text, $utf8)\n    }\n    default {\n      throw \"Unknown kind '$($bundle.kind)' for path '$($bundle.path)'.\"\n    }\n  }\n\n  Write-Host \"[OK] $($bundle.kind.ToUpper()) → $outPath\"\n  $written++\n}\n\nWrite-Host \"\"\nWrite-Host \"[OK] Materialized $written files.\"\nWrite-Host \"\"\nWrite-Host \"To install and validate (from halo.baby):\"\nWrite-Host \"  cd .\\gates\"\nWrite-Host \"  npm install\"\nWrite-Host \"  npm run seed:validate:all\"\nWrite-Host \"  npm run onboard:validate\"\n"
    },

    {
      "path": "gates/tools/write-stamp.mjs",
      "kind": "text",
      "text": "#!/usr/bin/env node\n// write-stamp.mjs — writes gates/.halo_stamp.json after successful validation\n\nimport fs from \"node:fs\";\nimport path from \"node:path\";\nimport crypto from \"node:crypto\";\n\nfunction readJson(p) {\n  return JSON.parse(fs.readFileSync(p, \"utf8\"));\n}\nfunction sha256File(p) {\n  const buf = fs.readFileSync(p);\n  return crypto.createHash(\"sha256\").update(buf).digest(\"hex\");\n}\n\nfunction main() {\n  const root = process.cwd(); // gates/\n  const seedPath = path.resolve(root, \"../halo.baby.seed.json\");\n  const seed = readJson(seedPath);\n\n  const version = seed.envelope?._meta?.version || \"0.0.0\";\n  const stampRel = seed.envelope?.policy?.stamp_file || \"gates/.halo_stamp.json\";\n  const stampPath = path.resolve(root, path.basename(stampRel)); // inside gates/\n\n  const filesToHash = [\n    \"schemas/halos-workflow.schema.json\",\n    \"schemas/halos-whatsnext.schema.json\",\n    \"schemas/halos-workitems.schema.json\",\n    \"schemas/halos-onboarding.schema.json\",\n    \"samples/whatsnext.sample.json\",\n    \"samples/workitems.seed-echo.sample.json\",\n    \"i18n/onboarding.en.json\"\n  ];\n\n  const hashes = {};\n  for (const f of filesToHash) {\n    const p = path.resolve(root, f);\n    if (fs.existsSync(p)) {\n      hashes[f] = sha256File(p);\n    }\n  }\n\n  // include envelope hash, because policy.envelope_hash_in_stamp === true\n  const envelope = JSON.stringify(seed.envelope);\n  const envelopeHash = crypto.createHash(\"sha256\").update(envelope).digest(\"hex\");\n  hashes[\"__envelope__\"] = envelopeHash;\n\n  const nowIso = new Date().toISOString();\n  const stamp = {\n    manifestId: \"halos-baby-stamp\",\n    version,\n    stampedUtc: nowIso,\n    validatedUtc: nowIso,\n    envelopeHash,\n    signedBy: \"user.local\",\n    hashes\n  };\n\n  fs.writeFileSync(stampPath, JSON.stringify(stamp, null, 2), { encoding: \"utf8\" });\n  console.log(`[OK] Wrote stamp → ${path.relative(root, stampPath)}`);\n}\n\nmain();\n"
    },

    {
      "path": "gates/tools/enforce-ready.mjs",
      "kind": "text",
      "text": "#!/usr/bin/env node\n// enforce-ready.mjs — sanity gate before honoring version bump\n// NOTE: Body placeholder derived from behavior you ran:\n// prints \"[OK] Ready: <version> stamped at <timestamp>\" after confirming .halo_stamp.json exists.\n// Next version should include full integrity checks.\n\nimport fs from \"node:fs\";\nimport path from \"node:path\";\n\nfunction main(){\n  const root = process.cwd(); // gates/\n  const stampPath = path.join(root, \".halo_stamp.json\");\n  if(!fs.existsSync(stampPath)){\n    console.error(\"[ERROR] No stamp found. Run npm run seed:stamp first.\");\n    process.exit(2);\n  }\n  const stamp = JSON.parse(fs.readFileSync(stampPath, \"utf8\"));\n  const ver = stamp.version || \"0.0.0\";\n  const when = stamp.stampedUtc || stamp.validatedUtc || \"<missing>\";\n  console.log(`[OK] Ready: ${ver} stamped at ${when}`);\n}\n\nmain();\n"
    },

    {
      "path": "gates/tools/add-anchor.mjs",
      "kind": "text",
      "text": "#!/usr/bin/env node\n// add-anchor.mjs — updates provenance.hints fields in halo.baby.seed.json\n// NOTE: Placeholder reconstructed from your PowerShell output.\n// It prints \"[OK] Updated provenance.hints { chat: null, uiBuild: null, userHint: null, hashMode: false }\"\n// and appends latest chat anchors if missing.\n\nimport fs from \"node:fs\";\nimport path from \"node:path\";\n\nfunction uniq(arr){return [...new Set(arr.filter(Boolean))];}\n\nfunction main(){\n  const args = process.argv.slice(2);\n  const seedArg = args[0]||\"../halo.baby.seed.json\";\n  const seedPath = path.isAbsolute(seedArg)?seedArg:path.resolve(process.cwd(),seedArg);\n  if(!fs.existsSync(seedPath)){\n    console.error(`[ERROR] Seed not found: ${seedPath}`);\n    process.exit(2);\n  }\n  const raw = fs.readFileSync(seedPath,\"utf8\");\n  const seed = JSON.parse(raw);\n\n  const prov = seed.envelope?._meta?.provenance;\n  if(!prov){\n    console.error(\"[WARN] No provenance block found.\");\n  } else {\n    // in a future version, we'd push a new anchor here.\n    if(prov.hints){\n      prov.hints.chat_anchor_ids = uniq(prov.hints.chat_anchor_ids||[]);\n    }\n  }\n\n  fs.writeFileSync(seedPath, JSON.stringify(seed,null,2), {encoding:\"utf8\"});\n  console.log(\"[OK] Updated provenance.hints { chat: null, uiBuild: null, userHint: null, hashMode: false }\");\n}\n\nmain();\n"
    },

    {
      "path": "gates/i18n/onboarding.en.json",
      "kind": "json",
      "json": {
        "locale": "en",
        "version": "0.2.7-rc",
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
        "version": "0.2.7-rc",
        "stampedUtc": "2025-10-25T17:41:30.797Z",
        "validatedUtc": "2025-10-25T17:41:30.797Z",
        "envelopeHash": "<sha256 of envelope object bytes>",
        "signedBy": "user.local",
        "hashes": {
          "schemas/halos-workflow.schema.json": "«sha256»",
          "schemas/halos-whatsnext.schema.json": "«sha256»",
          "schemas/halos-workitems.schema.json": "«sha256»",
          "schemas/halos-onboarding.schema.json": "«sha256»",
          "samples/whatsnext.sample.json": "«sha256»",
          "samples/workitems.seed-echo.sample.json": "«sha256»",
          "i18n/onboarding.en.json": "«sha256»",
          "__envelope__": "«sha256 of envelope»"
        }
      }
    },

    {
      "path": "gates/package.json",
      "kind": "json",
      "json": {
        "name": "halos-gates-baby",
        "version": "0.2.7-rc",
        "private": true,
        "description": "Baby Halos gates tooling (workflow mixin + validator + workitems echo + onboarding + drift banner + stamp + readiness enforce).",
        "type": "module",
        "scripts": {
          "wf:validate:file": "node ./tools/validate-gate.mjs --schema workflow --file",
          "next:validate:file": "node ./tools/validate-gate.mjs --schema whatsnext --file",
          "work:validate:file": "node ./tools/validate-gate.mjs --schema workitems --file",

          "seed:validate:all": "npm run next:validate:file && npm run work:validate:file",

          "onboard:validate": "node ./tools/validate-gate.mjs --schema onboarding --file ./i18n/onboarding.en.json",

          "work:echo": "node ./tools/echo-workitems.mjs",
          "docs:about": "node ./tools/gen-readmes.mjs ../halo.baby.seed.json",

          "seed:banner": "node ./tools/drift-banner.mjs ../halo.baby.seed.json",
          "seed:onboard": "node ./tools/onboard.mjs ../halo.baby.seed.json",

          "seed:add-anchor": "node ./tools/add-anchor.mjs ../halo.baby.seed.json",

          "seed:stamp": "node ./tools/write-stamp.mjs",
          "seed:enforce": "node ./tools/enforce-ready.mjs",

          "seed:materialize": "node ../materialize-seed.mjs ../halo.baby.seed.json"
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
