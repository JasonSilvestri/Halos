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
  if(banner) console.log(banner);
  if(fence){
    console.log(`\nRender policy → outer backticks: ${fence.outer_backticks_required}, inner: ${fence.inner_backticks_for_nested_examples}, default lang: ${fence.default_code_language}`);
  }
}
run(process.argv[2]||"../halo.baby.seed.json");
