# halo.lumina.seed.json (Cold-Start)

**Purpose:** One file to rehydrate Gates tooling: header, envelope, schemas, samples, validator, and docs.

**Materialize:** Write each `bundled_files[].path` with its `json` or `text` content.

**After writing:**
```powershell
cd Halos/gates
npm install
npm run wf:validate:file -- --file ./samples/workitem.sample.json
npm run next:validate:file -- --file ./samples/whatsnext.sample.json
```
