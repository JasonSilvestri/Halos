# About: `whatsnext.sample.json`

**Kind:** sample  
**Path:** `gates/samples/whatsnext.sample.json`

---

## Purpose

Sample JSON used to prove the "What's Next" schema.

---

## Preview

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

## How to use

Validate against schema:

```bash
npm run next:validate:file
```