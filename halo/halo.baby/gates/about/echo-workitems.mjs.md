# About: `echo-workitems.mjs`

**Kind:** tool  
**Path:** `gates/tools/echo-workitems.mjs`

---

## Purpose

Node.js utility used by the gates harness.

---

## Preview

```
#!/usr/bin/env node
// echo-workitems.mjs — prints a concise checklist of workitems (for cold-start proof)

import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const args = process.argv.slice(2);
const fileArg = args[0] || "./samples/workitems.seed-echo.sample.json";
const ROOT = process.cwd();
const filePath = path.isAbsolute(fileArg) ? fileArg : path.join(ROOT, fileArg);
if (!fs.existsSync(filePath)) {
  console.error(`[ERROR] Workitems file not found: ${filePath}`);
  process.exit(2);
}
let data;
try {
  data = JSON.parse(fs.readFileSync(filePath, "utf8"));
} catch (e) {
  console.error(`[ERROR] Failed to parse JSON: ${filePath}\n${e.message}`);
  process.exit(2);
}
console.log(`# Workitems Echo — ${data.manifestId}`);
console.log(`createdUtc: ${data.createdUtc}`);
console.log("");
for (const item of data.items || []) {
  const state = `${item.state}(${item.stateCode})`;
  console.log(`- [${item.kind}] ${item.id} :: ${item.title}`);
  console.log(`    path  : ${item.path}`);
  if (item.reason) console.log(`    reason: ${item.reason}`);
  console.log(`    state : ${state}`);
}

```

---
