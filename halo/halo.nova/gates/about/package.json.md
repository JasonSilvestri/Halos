# About: `package.json`

**Kind:** package  
**Path:** `gates/package.json`

---

## Purpose

NPM manifest for the gates workspace.

---

## Preview

```
{
  "name": "halos-gates-nova",
  "version": "1.0",
  "private": true,
  "description": "Nova Halos gates tooling (workflow state mixin + validator + workitems echo + onboarding + drift banner + stamp + readiness enforce).",
  "type": "module",
  "scripts": {
    "wf:validate:file": "node ./tools/validate-gate.mjs --schema workflowstates --file",
    "next:validate:file": "node ./tools/validate-gate.mjs --schema whatsnext --file",
    "work:validate:file": "node ./tools/validate-gate.mjs --schema workitems --file",
    "seed:validate:all": "npm run next:validate:file && npm run work:validate:file",
    "onboard:validate": "node ./tools/validate-gate.mjs --schema onboarding --file ./i18n/onboarding.en.json",
    "work:echo": "node ./tools/echo-workitems.mjs",
    "docs:about": "node ./tools/gen-readmes.mjs ../halo.nova.seed.json",
    "seed:banner": "node ./tools/drift-banner.mjs ../halo.nova.seed.json",
    "seed:onboard": "node ./tools/onboard.mjs ../halo.nova.seed.json",
    "seed:add-anchor": "node ./tools/add-anchor.mjs ../halo.nova.seed.json",
    "seed:stamp": "node ./tools/write-stamp.mjs",
    "seed:enforce": "node ./tools/enforce-ready.mjs",
    "seed:materialize": "node ../materialize-seed.mjs ../halo.nova.seed.json"
  },
  "devDependencies": {
    "ajv": "^8.17.1",
    "ajv-formats": "^3.0.1"
  }
}
```

---
