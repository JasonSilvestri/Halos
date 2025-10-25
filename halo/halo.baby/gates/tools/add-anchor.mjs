#!/usr/bin/env node
// add-anchor.mjs — append UI hint(s) into envelope._meta.provenance.hints
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

function readJson(p) { return JSON.parse(fs.readFileSync(p, "utf8")) }
function writeJson(p, o) { fs.writeFileSync(p, JSON.stringify(o, null, 2), { encoding: "utf8" }) }
function sha256(s) { return crypto.createHash("sha256").update(String(s)).digest("hex") }

const args = process.argv.slice(2);
// usage examples:
//   node ./tools/add-anchor.mjs ../halo.baby.seed.json --chat 2c77... --uibuild prod-... --userhint user-...
//   node ./tools/add-anchor.mjs ../halo.baby.seed.json --chat 2c77... --hash
const seedPath = path.resolve(process.cwd(), args[0] || "../halo.baby.seed.json");
const opts = new Map(args.slice(1).flatMap(x => x.startsWith("--") ? [x, true] : []));
function getOpt(k) { const i = args.indexOf("--" + k); return i >= 0 ? args[i + 1] : null; }

const hashMode = opts.has("--hash");

const chat = getOpt("chat");
const uiBuild = getOpt("uibuild");
const userHint = getOpt("userhint");

const seed = readJson(seedPath);
seed.envelope ??= {};
seed.envelope._meta ??= {};
const prov = (seed.envelope._meta.provenance ??= {});
const hints = (prov.hints ??= {});
hints.chat_anchor_ids ??= [];
hints.ui_build_ids ??= [];

function pushUnique(arr, val) {
    if (!val) return;
    const v = hashMode ? sha256(val) : val;
    if (!arr.includes(v)) arr.push(v);
}

pushUnique(hints.chat_anchor_ids, chat);
pushUnique(hints.ui_build_ids, uiBuild);
if (userHint) hints.ui_user_token_hint = hashMode ? sha256(userHint) : userHint;

prov.hints_policy ??= { visibility: "internal", hash_values: hashMode };

writeJson(seedPath, seed);
console.log("[OK] Updated provenance.hints", { chat, uiBuild, userHint, hashMode });
