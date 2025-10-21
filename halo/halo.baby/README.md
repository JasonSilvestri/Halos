# **Halos\{\} - Universal AI Design Pattern**

**`Halos{}`** is a ground breaking, first-of-its-kind, 2025 modern **LLM + Quant + PLM** universal AI Design Pattern for rapid, *reproducible* AI-powered development (_including chat “cold-starts”_). 

---
**Invented by Jason Silvestri with system design assistance by “Lumina” (ChatGPT collaborator)**.

---

It is **portable across domains** (aero, legal, media, UI, or something simple as the coffee order at work Joe programmer is in charge of) and **independent of tool stacks** (.NET, Node.js, Python, etc.).  

**Halos\{\}** are a practical, reproducible AI design pattern for cold-starting chat systems and pipelines. It’s intentionally boring at v0.2.6: one workflow mixin schema, two document schemas, a validator, a tiny echo tool, and samples to prove the circuit.

---

**Origin & Authors**  
Invented by **Jason Silvestri** with system design assistance by **“Lumina”**.

---

## Layout

```
Halos/halo/halo.baby/
├─ halo.baby.seed.json
└─ gates/
   ├─ package.json
   ├─ SEED_VERSION.json
   ├─ schemas/
   │  ├─ halos-workflow.schema.json
   │  ├─ halos-whatsnext.schema.json
   │  └─ halos-workitems.schema.json
   ├─ samples/
   │  ├─ whatsnext.sample.json
   │  └─ workitems.seed-echo.sample.json
   ├─ tools/
   │  ├─ validate-gate.mjs
   │  ├─ echo-workitems.mjs
   │  └─ gen-readmes.mjs            ← (optional) auto-writes gates/about/*.md
   └─ about/
      └─ (auto-generated *.md pages for each artifact)
```

## What’s in the box (v0.2.6)

- **Workflow mixin**: `halos-workflow.schema.json` (14 states; used by others via `$ref`)
- **Documents**:
  - `halos-whatsnext.schema.json` – list of next actions
  - `halos-workitems.schema.json` – checklist of materialized artifacts
- **Samples**:
  - `whatsnext.sample.json`
  - `workitems.seed-echo.sample.json`
- **Tools**:
  - `validate-gate.mjs` – AJV validator for any of the schemas
  - `echo-workitems.mjs` – prints a human-friendly checklist from a workitems manifest
- **NPM scripts** in `gates/package.json`

## Quickstart (from `Halos/halo/halo.baby/gates/`)

```powershell
npm install

# compile schemas (no data)
node .\tools\validate-gate.mjs --schema workflow
node .\tools\validate-gate.mjs --schema whatsnext
node .\tools\validate-gate.mjs --schema workitems

# validate samples (with data)
npm run next:validate:file
npm run work:validate:file

# echo a workitems manifest (human-readable)
npm run work:echo
```

## One-time materialization (PowerShell)

If you’re starting from the seed:

```powershell
cd Halos/halo/halo.baby
pwsh -File .\Write-HaloSeed.ps1 -SeedPath .\halo.baby.seed.json
cd .\gates
npm install
npm run next:validate:file
npm run work:validate:file
npm run work:echo
```

## Optional: generate “about” docs

```powershell
# writes/updates markdown pages under gates/about for each artifact
node .\tools\gen-readmes.mjs ..\halo.baby.seed.json
```

## CI hint

Wire a GitHub Action that runs: `npm ci`, the 3 validators, and the echo. This gives you red/green on every PR without ceremony.

---

## Navigation

- **Back to Home (Halo\{\} repo root):** [`../../README.md`](../../README.md)
- **See Baby Halo\{\} Seed About:** [`./gates/about/halo.baby.seed.json.md`](./gates/about/halo.baby.seed.json.md)

---

##### [Halos\{\} GitHub](https://github.com/JasonSilvestri/Halo)

###### Copyright © 2025 — All Rights Reserved by Jason Silvestri
