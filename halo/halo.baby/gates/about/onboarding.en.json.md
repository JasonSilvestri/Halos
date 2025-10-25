# About: `onboarding.en.json`

**Kind:** doc  
**Path:** `gates/i18n/onboarding.en.json`

---

## Purpose

Document emitted by the seed materializer.

---

## Preview

````json
{
  "locale": "en",
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
````

---
