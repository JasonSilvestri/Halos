# About: `halos-workitems.schema.json`

**Kind:** schema  
**Path:** `gates/schemas/halos-workitems.schema.json`

---

## Purpose

JSON Schema for the "workitems" manifest used by the echo tool.

---

## Preview

```json
{ "$schema":"https://json-schema.org/draft/2020-12/schema","$id":"halos-workitems.schema.json","title":"Halos Work Items (Seed Echo)","type":"object","required":["manifestId","createdUtc","items"],"properties":{ "manifestId":{"type":"string","minLength":1},"createdUtc":{"type":"string","format":"date-time"},"items":{"type":"array","minItems":1,"items":{"type":"object","allOf":[{"$ref":"halos-workflow.schema.json"}],"required":["id","title","kind","path","state","stateCode"],"properties":{"id":{"type":"string","minLength":1},"title":{"type":"string","minLength":1},"kind":{"type":"string","enum":["schema","sample","script","package","doc"]},"path":{"type":"string","minLength":1},"note":{"type":"string"}},"additionalProperties":true}}},"additionalProperties":false }
```

---

## How to use

Validate sample:

```bash
npm run work:validate:file
```