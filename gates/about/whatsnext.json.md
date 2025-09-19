# Halo\{\} - `halo-whatsnext`

This folder contains **scripts and helper utilities** used to run Lumina Gate checks locally or in CI/CD, now referred to as Halo{}.

> `Halo{}` - `halo-whatsnext` is child of the parent `halo-whatsnext.json`.

--- 

# File Structure

```
Halos/gates/
├─ package.json
├─ tools/
│  └─ validate-gate.mjs
├─ schemas/
│  └─ halo-whatsnext.schema.json
└─ samples/
   └─ whatsnext.sample.json

```

---

###### Halo\{\} Script Creation Lifecycle

Here is the mapping of `Halo{}` terminology to existing file names and locations.

**From a script lifecycle perspective:**

1. **Schema**: `Halos/gates/schemas/halo-whatsnext.schema.json`
2. **Sample**: `Halos/gates/samples/halo-whatsnext.*.json`
3. **Validators**: `Halos/gates/tools/validate-gate.mjs`
4. **Packages**: `Halos/gates/package.json`

This mapping **above** preserves CI paths and developer muscle memory while letting documentation use the PaLMs{} terminology.


> **Results (_Deprecated_)**: `Halos/gates/results/halo-whatsnext.*.json`

---

## Halo\{\} "What's Next" Schema

> 🔥 This `schema` needs to be `validated`.

### `Halos/gates/schemas/halos-halo-whatsnext.schema.json`

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "halos-halo-whatsnext.schema.json",
  "title": "Halos What's Next List",
  "description": "A safe, append-only list of next actions; each item carries the workflow state mixin.",
  "type": "object",
  "required": ["manifestId", "createdUtc", "items"],
  "properties": {
    "manifestId": { "type": "string", "minLength": 1 },
    "createdUtc": { "type": "string", "format": "date-time" },
    "owner": { "type": "string", "description": "persona, team, or system" },
    "tags": {
      "type": "array",
      "items": { "type": "string" }
    },
    "items": {
      "type": "array",
      "minItems": 1,
      "items": {
        "type": "object",
        "allOf": [ { "$ref": "halos-workflow.schema.json" } ],
        "required": ["id", "title", "priority", "state", "stateCode"],
        "properties": {
          "id": { "type": "string", "minLength": 1 },
          "title": { "type": "string", "minLength": 1 },
          "description": { "type": "string" },
          "priority": {
            "type": "integer",
            "minimum": 1,
            "maximum": 9,
            "description": "1 = highest urgency, 9 = lowest"
          },
          "labels": {
            "type": "array",
            "items": { "type": "string" }
          },
          "dueUtc": { "type": "string", "format": "date-time" },
          "links": {
            "type": "array",
            "items": {
              "type": "object",
              "required": ["rel","href"],
              "properties": {
                "rel": { "type": "string" },
                "href": { "type": "string", "minLength": 1 },
                "note": { "type": "string" }
              },
              "additionalProperties": false
            }
          },
          "metrics": {
            "type": "object",
            "properties": {
              "attempts": { "type": "integer", "minimum": 0 },
              "elapsedMs": { "type": "integer", "minimum": 0 },
              "score": { "type": "number" }
            },
            "additionalProperties": true
          }
        },
        "additionalProperties": true
      }
    }
  },
  "additionalProperties": false
}
```

---

## Halo\{\} "What's Next" Samples

> 🔥 This `sample` needs to be `validated`.

### `Halos/gates/samples/whatsnext.sample.json`

```json
{
  "manifestId": "halos-halo-whatsnext-001",
  "createdUtc": "2025-09-18T00:00:00Z",
  "owner": "jason",
  "tags": ["self-health","halos","gates"],
  "items": [
    {
      "id": "wire-up-enums",
      "title": "Wire up workflow enum in runner",
      "description": "Expose state mixin on each gate execution result.",
      "priority": 1,
      "labels": ["engine","schema"],
      "state": "IN_PROGRESS",
      "stateCode": 3,
      "updatedUtc": "2025-09-18T00:10:00Z",
      "updatedBy": "lumina",
      "stateHistory": [
        { "stateCode": 1, "state": "CREATED", "timestampUtc": "2025-09-17T23:55:00Z" },
        { "stateCode": 2, "state": "QUEUED", "timestampUtc": "2025-09-17T23:56:00Z" },
        { "stateCode": 3, "state": "IN_PROGRESS", "timestampUtc": "2025-09-18T00:10:00Z" }
      ],
      "links": [
        { "rel": "repo", "href": "https://github.com/JasonSilvestri/Halos", "note": "root" },
        { "rel": "runner", "href": "Halos/gates/tools/lumina-gate.ps1" }
      ],
      "metrics": { "attempts": 1 }
    },
    {
      "id": "sample-results",
      "title": "Create sample result with tally fields",
      "priority": 2,
      "labels": ["samples"],
      "state": "QUEUED",
      "stateCode": 2,
      "links": [
        { "rel": "schema", "href": "Halos/gates/schemas/halos-workflow.schema.json" }
      ]
    },
    {
      "id": "cdn-retry",
      "title": "CDN upload retry",
      "priority": 3,
      "labels": ["ops","network"],
      "state": "RETRYING",
      "stateCode": 13,
      "reason": "previous NETWORK_ERROR; backoff=PT30S",
      "metrics": { "attempts": 2, "elapsedMs": 4200 }
    }
  ]
}
```

---

## Halo\{\} Validators

**How to run validations (command examples)**:

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
