# Halo\{\} Packages

Here are the `package.json` and scripts to run the validators.

### 1. Script `Halos/Architecture/Gates/package.json`:

```json
 
{
  "name": "halos-gates",
  "version": "1.0.0",
  "private": true,
  "description": "Halos Architecture Gates tooling (schemas, validators, utilities).",
  "type": "module",
  "scripts": {
    "gate:validate": "node ./tools/validate-gate.mjs",
    "gate:validate:file": "node ./tools/validate-gate.mjs --file",
    "gate:validate:envelope": "node ./tools/validate-gate.mjs --schema envelope --file",
    "gate:validate:runner": "node ./tools/validate-gate.mjs --schema runner --file",
    "gate:validate:naming": "node ./tools/validate-gate.mjs --schema naming --file",
    "gate:validate:freeze": "node ./tools/validate-gate.mjs --schema freeze --file",
    "wf:validate:file": "node ./tools/validate-gate.mjs --schema workflow --file",
    "next:validate:file": "node ./tools/validate-gate.mjs --schema whatsnext --file"
  },
  "devDependencies": {
    "ajv": "^8.17.1",
    "ajv-formats": "^3.0.1"
  }
}


 ```

---


### 2. Validators `Halos/Architecture/Gates/tools/validate-gate.mjs`:

**From repo root:**

```powershell
# validate workflow sample
npm --prefix "Halos/Architecture/Gates" run wf:validate:file -- --file "Halos/Halos/Architecture/Gates/samples/workitem.sample.json"

# validate what's-next sample
npm --prefix "Halos/Architecture/Gates" run next:validate:file -- --file "Halos/Halos/Architecture/Gates/samples/whatsnext.sample.json"
```

From `Halos/Architecture/Gates/`:

```powershell
npm run wf:validate:file -- --file "./samples/workitem.sample.json"
npm run next:validate:file -- --file "./samples/whatsnext.sample.json"
```

---

## Navigation

- **Back to Home (repo root):** [`./README.md`](./README.md)

---

##### [Halos\{\} GitHub](https://github.com/JasonSilvestri/Halos)

###### Copyright © 2025 — All Rights Reserved by Jason Silvestri