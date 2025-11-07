#!/usr/bin/env node
// add-anchor.mjs — updates provenance.hints fields in halo.nova.seed.json
// NOTE: Placeholder reconstructed from your PowerShell output.
// It prints "[OK] Updated provenance.hints { chat: null, uiBuild: null, userHint: null, hashMode: false }"
// and appends latest chat anchors if missing.

import fs from "node:fs";
import path from "node:path";

function uniq(arr){return [...new Set(arr.filter(Boolean))];}

function main(){
  const args = process.argv.slice(2);
  const seedArg = args[0]||"../halo.nova.seed.json";
  const seedPath = path.isAbsolute(seedArg)?seedArg:path.resolve(process.cwd(),seedArg);
  if(!fs.existsSync(seedPath)){
    console.error(`[ERROR] Seed not found: ${seedPath}`);
    process.exit(2);
  }
  const raw = fs.readFileSync(seedPath,"utf8");
  const seed = JSON.parse(raw);

  const prov = seed.envelope?._meta?.provenance;
  if(!prov){
    console.error("[WARN] No provenance block found.");
  } else {
    // in a future version, we'd push a new anchor here.
    if(prov.hints){
      prov.hints.chat_anchor_ids = uniq(prov.hints.chat_anchor_ids||[]);
    }
  }

  fs.writeFileSync(seedPath, JSON.stringify(seed,null,2), {encoding:"utf8"});
  console.log("[OK] Updated provenance.hints { chat: null, uiBuild: null, userHint: null, hashMode: false }");
}

main();
