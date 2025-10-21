# Halo\{\} - `halo-whatsnext`

This folder contains **scripts and helper utilities** used to run Lumina Gate checks locally or in CI/CD, now referred to as Halo{}.

> `Halo{}` - `halo-whatsnext` is child of the parent `halo-whatsnext.json`.

--- 

# File Structure

```
Halos/halo/halo.baby/gates/
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

1. **Schema**: `Halos/halo/halo.baby/gates/schemas/halo-whatsnext.schema.json`
2. **Sample**: `Halos/halo/halo.baby/gates/samples/halo-whatsnext.*.json`
3. **Validators**: `Halos/halo/halo.baby/gates/tools/validate-gate.mjs`
4. **Packages**: `Halos/halo/halo.baby/gates/package.json`

This mapping **above** preserves CI paths and developer muscle memory while letting documentation use the PaLMs{} terminology.


> **Results (_Deprecated_)**: `Halos/halo/halo.baby/gates/results/halo-whatsnext.*.json`

---

## Halo\{\} "What's Next" Schema

> 🔥 This `schema` needs to be `validated`.

### `Halos/halo/halo.baby/gates/schemas/halos-whatsnext.schema.json`

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "halos-whatsnext.schema.json",
  "title": "Halos What's Next (Baby)",
  "type": "object",
  "required": [
    "manifestId",
    "createdUtc",
    "items"
  ],
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
        "allOf": [
          {
            "$ref": "halos-workflow.schema.json"
          }
        ],
        "required": [
          "id",
          "title",
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
          "description": {
            "type": "string"
          },
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
```

---

## Halo\{\} "What's Next" Samples

> 🔥 This `sample` needs to be `validated`.

### `Halos/halo/halo.baby/gates/samples/whatsnext.sample.json`

```json
{
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
```

---

## Halo\{\} Validators

**How to run validations (command examples)**:

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

- **See latest Halo\{\} Validators:** [`./validate-gate.mjs.md`](./validate-gate.mjs.md)

---

## Halo\{\} Packages

- **See Halo\{\} Package:** [`./package.json.md`](./package.json.md)

---

## Navigation

- **Back to Home (repo root):** [`../../README.md`](../../README.md)

---


##### [Halos\{\} GitHub](https://github.com/JasonSilvestri/Halos)

###### Copyright © 2025 — All Rights Reserved by Jason Silvestri
