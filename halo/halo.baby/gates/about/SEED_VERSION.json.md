# About: `SEED_VERSION.json`

**Kind:** doc  
**Path:** `gates/SEED_VERSION.json`

---

## Purpose

Document emitted by the seed materializer. Tracks seed version history.

---

## Preview

```json
{
  "seed": "halo.baby",
  "version": "0.2.6",
  "createdUtc": "2025-10-21T00:00:00Z",
  "previous": [
    { "version": "0.2.5", "note": "added roots metadata + SEED_VERSION.json" },
    { "version": "0.2.4", "note": "stabilized gates/ locality; validator green" },
    { "version": "0.2.3", "note": "package.json scripts fixed to ./tools/..." }
  ]
}
```