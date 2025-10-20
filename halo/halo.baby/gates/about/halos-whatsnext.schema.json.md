# halos-whatsnext.schema.json

**What it is:** A compact "What's Next" manifest. Each item includes the workflow mixin, priorities, labels, links.

**Why:** A safe, appendable backlog that travels with seeds and envelopes.

**Validate:**
```powershell
npm --prefix "Halos/gates" run next:validate:file -- --file "Halos/gates/samples/whatsnext.sample.json"
```
