# halos-workflow.schema.json

**What it is:** A reusable state mixin you can `$ref` into any JSON object.

**Fields:** `stateCode` (int), `state` (label), optional `reason`, `updatedUtc`, `updatedBy`, `stateHistory[]`.

**Why:** Gives every unit of work a deterministic status without bloating your contracts.

**Validate:**
```powershell
npm --prefix "Halos/gates" run wf:validate:file -- --file "Halos/gates/samples/workitem.sample.json"
```
