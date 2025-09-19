# halos-whatsnext.schema.json

**What it is:** A compact "What's Next" manifest. Each item includes the workflow mixin, priorities, labels, links.

**Why:** A safe, appendable backlog that travels with seeds and envelopes.

**Validate:**
```powershell
npm --prefix "Halos/Architecture/Gates" run next:validate:file -- --file "Halos/Halos/Architecture/Gates/samples/whatsnext.sample.json"
```
