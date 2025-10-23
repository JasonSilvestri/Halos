# Baby Halo Gates (v0.2.6)

Tiny gate harness with AJV validation and a workitems echo.

## Commands

```bash
npm install

# compile only
node ./tools/validate-gate.mjs --schema workflow
node ./tools/validate-gate.mjs --schema whatsnext
node ./tools/validate-gate.mjs --schema workitems

# validate with sample data
npm run next:validate:file
npm run work:validate:file

# echo checklist
npm run work:echo
```

## Docs

- About pages live in `./about/*.md`
- Regenerate via: `node ./tools/gen-readmes.mjs ../halo.baby.seed.json`


## Navigation

- **Back to Home of (Halo\{\} Baby root):** [`../README.md`](../../README.md)
- **See Baby Halo\{\} Seed About:** [`./gates/about/halo.baby.seed.json.md`](./gates/about/halo.baby.seed.json.md)

---

##### [Halos\{\} GitHub](https://github.com/JasonSilvestri/Halo)

###### Copyright © 2025 — All Rights Reserved by Jason Silvestri
