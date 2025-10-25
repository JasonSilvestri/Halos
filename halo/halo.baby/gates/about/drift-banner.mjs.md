# About: `drift-banner.mjs`

**Kind:** tool  
**Path:** `gates/tools/drift-banner.mjs`

---

## Purpose

Node.js utility used by the gates harness.

---

## Preview

```
#!/usr/bin/env node
// drift-banner.mjs — prints collab banner + render hints from seed
import fs from "node:fs";
import path from "node:path";
function readJson(p){return JSON.parse(fs.readFileSync(p,"utf8"));}
function run(seedArg){
  const seedPath=path.isAbsolute(seedArg)?seedArg:path.resolve(process.cwd(),seedArg);
  const seed=readJson(seedPath);
  const banner=seed.collab_state?.display_banner_markdown;
  const fence=seed.render_hints?.markdown_fence_policy;
  const hints=seed.envelope?._meta?.provenance?.hints;
  if(hints){
    console.log("\nProvenance Hints:");
    console.log(`  chat_anchor_ids: ${hints.chat_anchor_ids?.join(", ")}`);
    console.log(`  ui_build_ids   : ${hints.ui_build_ids?.join(", ")}`);
    console.log(`  ui_user_hint   : ${hints.ui_user_token_hint}`);
  }
  if(banner) console.log(banner);
  if(fence){
    console.log(`Render policy → outer backticks: ${fence.outer_backticks_required}, inner: ${fence.inner_backticks_for_nested_examples}, default lang: ${fence.default_code_language}`);
  }
}
run(process.argv[2]||"../halo.baby.seed.json");

```

---
