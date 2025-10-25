# About: `onboard.mjs`

**Kind:** tool  
**Path:** `gates/tools/onboard.mjs`

---

## Purpose

Node.js utility used by the gates harness.

---

## Preview

````json
#!/usr/bin/env node
// onboard.mjs — minimal CLI dialog that reads i18n onboarding script and walks the user
import fs from "node:fs";
import path from "node:path";
import readline from "node:readline";

function readJson(p){return JSON.parse(fs.readFileSync(p,"utf8"));}
function findStep(script,id){return script.find(s=>s.id===id)||null;}
async function ask(q){const rl=readline.createInterface({input:process.stdin,output:process.stdout});const ans=await new Promise(res=>rl.question(q,v=>res((v?.trim()||""))));rl.close();return ans.toLowerCase();}

async function run(seedArg,opts){
  const seedPath=path.isAbsolute(seedArg)?seedArg:path.resolve(process.cwd(),seedArg);
  const seed=readJson(seedPath);
  const locale=(opts.locale||seed.onboarding?.locale||"en").toLowerCase();
  const i18nRel=seed.onboarding?.loader?.replace(/\.en\./,`.${locale}.`)||"gates/i18n/onboarding.en.json";
  const i18nPath=path.isAbsolute(i18nRel)?i18nRel:path.resolve(path.dirname(seedPath),i18nRel);
  if(!fs.existsSync(i18nPath)){console.log(`[WARN] i18n file not found for locale '${locale}', falling back to EN.`);}
  const script=(fs.existsSync(i18nPath)?readJson(i18nPath):readJson(path.resolve(path.dirname(seedPath),"gates/i18n/onboarding.en.json"))).script||[];
  if(!seed.onboarding?.enabled||script.length===0){console.log("[INFO] Onboarding disabled or empty. Nothing to do.");return;}
  let cur=findStep(script,"welcome")||script[0];
  while(cur){
    console.log("\n"+cur.text);
    if(!cur.choices||cur.choices.length===0)break;
    const labels=cur.choices.map(c=>c.label);
    const ans=await ask(`(${labels.join("/")}): `);
    const match=cur.choices.find(c=>c.label.toLowerCase()===ans);
    if(!match){console.log(`[WARN] Unknown choice "${ans}". Try again.`);continue;}
    if(match.next==="materialize"){console.log("[INFO] User requested Build Seed. Run: npm run seed:materialize");}
    cur=findStep(script,match.next);
  }
  console.log("\n[OK] Onboarding complete.");
}

const args=process.argv.slice(2);
const seedArg=args[0]||"../halo.baby.seed.json";
const localeArg=(args.find(a=>a.startsWith("--locale="))||"").split("=")[1];
run(seedArg,{locale:localeArg}).catch(e=>{console.error(e);process.exit(1);});

````

---
