# About: `validate-gate.mjs`

**Kind:** tool  
**Path:** `gates/tools/validate-gate.mjs`

---

## Purpose

AJV-based validator for Baby Halo schemas. Loads all schemas in `gates/schemas`, compiles the requested one (by `$id`), and optionally validates a data file.

---

## How to use

Compile only:

```bash
node ./tools/validate-gate.mjs --schema whatsnext
```

Validate with data:

```bash
node ./tools/validate-gate.mjs --schema whatsnext --file ./samples/whatsnext.sample.json
```