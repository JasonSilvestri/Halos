# Halo\{\} - `halo-workflows`

This folder contains **scripts and helper utilities** used to run Lumina Gate checks locally or in CI/CD, now referred to as Halo{}.

> `Halo{}` - `halo-workflows` is child of the parent `whatsnext.json`.

--- 

# File Structure

```
Halos/Architecture/Gates/
├─ package.json
├─ tools/
│  └─ validate-gate.mjs
├─ schemas/
│  └─ halo-workflows.schema.json


```

---

###### Halo\{\} Script Creation Lifecycle

Here is the mapping of `Halo{}` terminology to existing file names and locations.

**From a script lifecycle perspective:**

1. **Schema**: `Halos/Architecture/Gates/schemas/halo-workflows.schema.json`
2. **Sample**: `Halos/Architecture/Gates/samples/workflows.*.json`
3. **Validators**: `Halos/Architecture/Gates/tools/validate-gate.mjs`
4. **Packages**: `Halos/Architecture/Gates/package.json`

This mapping **above** preserves CI paths and developer muscle memory while letting documentation use the PaLMs{} terminology.


> **Results (_Deprecated_)**: `Halos/Architecture/Gates/results/whatsnext.*.json`

---

## Halo\{\} "Workflows" Schema

> 🔥 This `schema` needs to be `validated`.

### `Halos/Architecture/Gates/schemas/halos-workflow.schema.json`

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "halos-workflow.schema.json",
  "title": "Halos Workflow State Mixin",
  "description": "Reusable state mixin you can $ref into any object.",
  "type": "object",
  "required": ["state", "stateCode"],
  "properties": {
    "stateCode": {
      "type": "integer",
      "enum": [1,2,3,4,5,6,7,8,9,10,11,12,13,14],
      "description": "Canonical state code (stable, source of truth)."
    },
    "state": {
      "type": "string",
      "enum": [
        "CREATED","QUEUED","IN_PROGRESS","WAITING","PASSED","FAILED",
        "REJECTED","CANCELLED","SKIPPED","TIMEOUT","NETWORK_ERROR",
        "VALIDATION_ERROR","RETRYING","BLOCKED"
      ],
      "description": "Human-friendly label normalized to the code."
    },
    "reason": { "type": "string", "maxLength": 2000 },
    "updatedUtc": { "type": "string", "format": "date-time" },
    "updatedBy": { "type": "string", "description": "Actor/system id" },
    "stateHistory": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["stateCode", "state", "timestampUtc"],
        "properties": {
          "stateCode": { "type": "integer", "enum": [1,2,3,4,5,6,7,8,9,10,11,12,13,14] },
          "state": {
            "type": "string",
            "enum": [
              "CREATED","QUEUED","IN_PROGRESS","WAITING","PASSED","FAILED",
              "REJECTED","CANCELLED","SKIPPED","TIMEOUT","NETWORK_ERROR",
              "VALIDATION_ERROR","RETRYING","BLOCKED"
            ]
          },
          "timestampUtc": { "type": "string", "format": "date-time" },
          "reason": { "type": "string", "maxLength": 2000 },
          "by": { "type": "string" }
        },
        "additionalProperties": false
      }
    }
  },
  "allOf": [
    { "if": { "properties": { "state": { "const": "PASSED" } }, "required": ["state"] }, "then": { "properties": { "stateCode": { "const": 5 } } } },
    { "if": { "properties": { "state": { "const": "FAILED" } }, "required": ["state"] }, "then": { "properties": { "stateCode": { "const": 6 } } } },
    { "if": { "properties": { "state": { "const": "REJECTED" } }, "required": ["state"] }, "then": { "properties": { "stateCode": { "const": 7 } } } },
    { "if": { "properties": { "state": { "const": "WAITING" } }, "required": ["state"] }, "then": { "properties": { "stateCode": { "const": 4 } } } },
    { "if": { "properties": { "state": { "const": "NETWORK_ERROR" } }, "required": ["state"] }, "then": { "properties": { "stateCode": { "const": 11 } } } }
  ],
  "additionalProperties": true
}
```

---

## Halo\{\} Validators

**How to run validations (command examples)**:

#### 1. From repo root: `Halos/`:

```powershell
# validate workflow sample
npm --prefix "Halos/Architecture/Gates" run wf:validate:file -- --file "Halos/Halos/Architecture/Gates/samples/workitem.sample.json"

# validate what's-next sample
npm --prefix "Halos/Architecture/Gates" run next:validate:file -- --file "Halos/Halos/Architecture/Gates/samples/workflows.sample.json"
```

#### 2. From `Halos/Architecture/Gates/`:

```powershell
npm run wf:validate:file -- --file "./samples/workitem.sample.json"
npm run next:validate:file -- --file "./samples/workflows.sample.json"
```

- **See latest Halo\{\} Validators:** [`./validate-gate.mjs.md`](./validate-gate.mjs.md)

---

## Halo\{\} Packages

- **See Halo\{\} Package:** [`./package.json.md`](./package.json.md)

---

## Navigation

- **Back to Home (repo root):** [`./README.md`](./README.md)

---

##### [Halos\{\} GitHub](https://github.com/JasonSilvestri/Halos)

###### Copyright © 2025 — All Rights Reserved by Jason Silvestri
