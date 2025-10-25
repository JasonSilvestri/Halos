#!/usr/bin/env node
// drift-banner.mjs — prints collab banner + render hints from seed
import fs from "node:fs";
import path from "node:path";
function readJson(p){return JSON.parse(fs.readFileSync(p,"utf8"));}
function run(seedArg){
  const seedPath=path.isAbsolute(seedArg)?seedArg:path.resolve(process.cwd(),seedArg);
  const seed=readJson(seedPath);
  const banner = seed.envelope?.collab_state?.display_banner_markdown;
  const anchor = seed.envelope?._meta?.chat_anchor?.message_id;
  const prov = seed.envelope?._meta?.provenance;
  if (prov?.hints) {
        const ids = (prov.hints.chat_anchor_ids || []).join(", ");
        const builds = (prov.hints.ui_build_ids || []).join(", ");
        const userTok = prov.hints.ui_user_token_hint || "";
        console.log("\nProvenance Hints:");
        if (ids) console.log("  chat_anchor_ids:", ids);
        if (builds) console.log("  ui_build_ids   :", builds);
        if (userTok) console.log("  ui_user_hint   :", userTok);
  }

  const fence=seed.render_hints?.markdown_fence_policy;
    if (banner) console.log(banner);
    if (anchor) {
       console.log(`\nCollab anchor → message_id: ${anchor}`);
    }
    if(fence){
        console.log(`\nRender policy → outer backticks: ${fence.outer_backticks_required}, inner: ${fence.inner_backticks_for_nested_examples}, default lang: ${fence.default_code_language}`);
    }
}
run(process.argv[2]||"../halo.baby.seed.json");
