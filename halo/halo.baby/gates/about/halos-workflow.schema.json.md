# About: `halos-workflow.schema.json`

**Kind:** schema  
**Path:** `gates/schemas/halos-workflow.schema.json`

---

## Purpose

JSON Schema used by Baby Halo v0.2.6. Referenced by other docs via `$ref`.

---

## Preview

```json
{ "$schema": "https://json-schema.org/draft/2020-12/schema", "$id": "halos-workflow.schema.json", "title": "Halos Workflow State Mixin (Full 14-state)", "type": "object", "required": ["state","stateCode"], "properties": { "stateCode": { "type": "integer", "enum": [1,2,3,4,5,6,7,8,9,10,11,12,13,14] }, "state": { "type": "string", "enum": ["CREATED","QUEUED","IN_PROGRESS","WAITING","PASSED","FAILED","REJECTED","CANCELLED","SKIPPED","TIMEOUT","NETWORK_ERROR","VALIDATION_ERROR","RETRYING","BLOCKED"] }, "updatedUtc": { "type": "string", "format": "date-time" }, "reason": { "type": "string", "maxLength": 1000 } }, "allOf": [ { "if": { "properties": { "state": { "const": "CREATED" } }, "required": ["state"] }, "then": { "properties": { "stateCode": { "const": 1 } } } } ], "additionalProperties": true }
```

---

## How to use

Compile only:

```bash
node ./tools/validate-gate.mjs --schema workflow
```