# About: `workitems.seed-echo.sample.json`

**Kind:** sample  
**Path:** `gates/samples/workitems.seed-echo.sample.json`

---

## Purpose

Sample workitems manifest for the echo tool and schema validation.

---

## Preview

```json
{
  "manifestId": "halos-baby-echo-001",
  "createdUtc": "2025-10-21T00:00:00Z",
  "items": [
    { "id": "wf-schema", "title": "Workflow mixin schema present", "kind": "schema", "path": "gates/schemas/halos-workflow.schema.json", "state": "PASSED", "stateCode": 5, "reason": "materialized" },
    { "id": "next-schema", "title": "What's Next schema present", "kind": "schema", "path": "gates/schemas/halos-whatsnext.schema.json", "state": "PASSED", "stateCode": 5, "reason": "materialized" },
    { "id": "workitems-schema", "title": "Work Items schema present", "kind": "schema", "path": "gates/schemas/halos-workitems.schema.json", "state": "PASSED", "stateCode": 5, "reason": "materialized" },
    { "id": "sample-next", "title": "whatsnext sample present", "kind": "sample", "path": "gates/samples/whatsnext.sample.json", "state": "PASSED", "stateCode": 5, "reason": "materialized" },
    { "id": "tool-validator", "title": "validator script present", "kind": "script", "path": "gates/tools/validate-gate.mjs", "state": "PASSED", "stateCode": 5, "reason": "materialized" },
    { "id": "tool-echo", "title": "echo-workitems tool present", "kind": "script", "path": "gates/tools/echo-workitems.mjs", "state": "PASSED", "stateCode": 5, "reason": "materialized" },
    { "id": "node-package", "title": "package.json present", "kind": "package", "path": "gates/package.json", "state": "PASSED", "stateCode": 5, "reason": "materialized" }
  ]
}
```

---

## How to use

Echo checklist:

```bash
npm run work:echo
```