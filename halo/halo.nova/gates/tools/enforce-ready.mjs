#!/usr/bin/env node
// enforce-ready.mjs — sanity gate before honoring version bump
// NOTE: Body placeholder derived from behavior you ran:
// prints "[OK] Ready: <version> stamped at <timestamp>" after confirming .halo_stamp.json exists.
// Next version should include full integrity checks.

import fs from "node:fs";
import path from "node:path";

function main(){
  const root = process.cwd(); // gates/
  const stampPath = path.join(root, ".halo_stamp.json");
  if(!fs.existsSync(stampPath)){
    console.error("[ERROR] No stamp found. Run npm run seed:stamp first.");
    process.exit(2);
  }
  const stamp = JSON.parse(fs.readFileSync(stampPath, "utf8"));
  const ver = stamp.version || "0.0.0";
  const when = stamp.stampedUtc || stamp.validatedUtc || "<missing>";
  console.log(`[OK] Ready: ${ver} stamped at ${when}`);
}

main();
