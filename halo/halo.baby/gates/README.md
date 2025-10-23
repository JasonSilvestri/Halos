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