# About: `halos-onboarding.schema.json`

**Kind:** schema  
**Path:** `gates/schemas/halos-onboarding.schema.json`

---

## Purpose

JSON Schema used by Baby Halo v0.2.7-rc.

---

## Preview

```
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "halos-onboarding.schema.json",
  "title": "Halos Onboarding i18n",
  "type": "object",
  "required": [
    "locale",
    "version",
    "script"
  ],
  "properties": {
    "locale": {
      "type": "string",
      "minLength": 2
    },
    "version": {
      "type": "string"
    },
    "script": {
      "type": "array",
      "minItems": 1,
      "items": {
        "type": "object",
        "required": [
          "id",
          "text"
        ],
        "properties": {
          "id": {
            "type": "string"
          },
          "text": {
            "type": "string"
          },
          "choices": {
            "type": "array",
            "items": {
              "type": "object",
              "required": [
                "label",
                "next"
              ],
              "properties": {
                "label": {
                  "type": "string"
                },
                "next": {
                  "type": "string"
                }
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
```

---
