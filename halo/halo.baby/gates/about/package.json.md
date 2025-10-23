# About: `package.json`

**Kind:** package  
**Path:** `gates/package.json`

---

## Purpose

NPM manifest and scripts for the gates workspace.

---

## Scripts

```json
{
  "wf:validate:file": "node ./tools/validate-gate.mjs --schema workflow --file",
  "next:validate:file": "node ./tools/validate-gate.mjs --schema whatsnext --file",
  "work:validate:file": "node ./tools/validate-gate.mjs --schema workitems --file",
  "work:echo": "node ./tools/echo-workitems.mjs"
}
```