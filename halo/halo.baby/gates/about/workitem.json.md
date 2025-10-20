# Halo\{\} - `halo-workitem`

This folder contains **scripts and helper utilities** used to run Lumina Gate checks locally or in CI/CD, now referred to as Halo{}.

> `Halo{}` - `halo-workitem` is child of the parent `halo-workitem.json`.

--- 

# File Structure

```
Halos/gates/
├─ package.json
├─ tools/
│  └─ validate-gate.mjs
├─ schemas/
│  └─ halo-workitem.schema.json
└─ samples/
   └─ workitem.sample.json

```

---

###### Halo\{\} Script Creation Lifecycle

Here is the mapping of `Halo{}` terminology to existing file names and locations.

**From a script lifecycle perspective:**

1. **Schema**: `Halos/gates/schemas/halo-workitem.schema.json`
2. **Sample**: `Halos/gates/samples/halo-workitem.*.json`
3. **Validators**: `Halos/gates/tools/validate-gate.mjs`
4. **Packages**: `Halos/gates/package.json`

This mapping **above** preserves CI paths and developer muscle memory while letting documentation use the PaLMs{} terminology.


> **Results (_Deprecated_)**: `Halos/gates/results/halo-workitem.*.json`

---

## Halo\{\} "Work Items" Schema

> 🔥 This `schema` needs to be `validated`.

### `Halos/gates/schemas/workitem.schema.json`

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "workitem.schema.json",
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

## Halo\{\} "Work Items" Samples

> 🔥 This `sample` needs to be `validated`.

## `Halos/gates/samples/workitem.sample.json`

```json
{
  "manifestId": "halos-demo-001",
  "createdUtc": "2025-09-17T12:00:00Z",
  "workItems": [
    {
      "id": "draft-article",
      "type": "content",
      "stateCode": 3,
      "state": "IN_PROGRESS",
      "reason": "Generating first draft",
      "updatedUtc": "2025-09-17T12:05:00Z",
      "updatedBy": "lumina",
      "stateHistory": [
        { "stateCode": 1, "state": "CREATED", "timestampUtc": "2025-09-17T12:00:00Z", "by": "jason" },
        { "stateCode": 2, "state": "QUEUED", "timestampUtc": "2025-09-17T12:01:00Z", "by": "halos-runner" },
        { "stateCode": 3, "state": "IN_PROGRESS", "timestampUtc": "2025-09-17T12:05:00Z", "by": "lumina", "reason": "prompt accepted" }
      ],
      "payload": {
        "topic": "Universal AI Design Pattern",
        "outline": ["Intro","Design Goals","Gating","Validation"]
      }
    },
    {
      "id": "review-gate",
      "type": "gate",
      "stateCode": 5,
      "state": "PASSED",
      "reason": "Auto-approval threshold >= 0.85",
      "updatedUtc": "2025-09-17T12:07:00Z",
      "updatedBy": "therealjasonsilvestri@gmail.com",
      "stateHistory": [
        { "stateCode": 4, "state": "WAITING", "timestampUtc": "2025-09-17T12:06:00Z", "by": "therealjasonsilvestri@gmail.com", "reason": "awaiting score" },
        { "stateCode": 5, "state": "PASSED", "timestampUtc": "2025-09-17T12:07:00Z", "by": "therealjasonsilvestri@gmail.com" }
      ],
      "gate": {
        "name": "quality-score",
        "threshold": 0.85,
        "observedScore": 0.91,
        "transitions": [
          { "target": "publish-phase", "on": "score>=threshold", "default": false },
          { "target": "revise-phase", "default": true }
        ]
      }
    },
    {
      "id": "cdn-upload",
      "type": "ops",
      "stateCode": 11,
      "state": "NETWORK_ERROR",
      "reason": "TLS handshake failed; retry scheduled",
      "updatedUtc": "2025-09-17T12:08:00Z",
      "updatedBy": "ops@halos",
      "stateHistory": [
        { "stateCode": 2, "state": "QUEUED", "timestampUtc": "2025-09-17T12:07:10Z", "by": "ops@halos" },
        { "stateCode": 11, "state": "NETWORK_ERROR", "timestampUtc": "2025-09-17T12:08:00Z", "by": "ops@halos" },
        { "stateCode": 13, "state": "RETRYING", "timestampUtc": "2025-09-17T12:08:05Z", "by": "ops@halos", "reason": "backoff=PT30S" }
      ],
      "retry": { "max": 3, "attempt": 1, "backoff": "PT30S" }
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
npm --prefix "Halos/gates" run next:validate:file -- --file "Halos/gates/samples/workitem.sample.json"
```

#### 2. From `Halos/gates/`:

```powershell
npm run wf:validate:file -- --file "./samples/workitem.sample.json"
npm run next:validate:file -- --file "./samples/workitem.sample.json"
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
