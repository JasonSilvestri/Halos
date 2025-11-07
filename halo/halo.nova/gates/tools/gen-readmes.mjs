#!/usr/bin/env node
// gen-readmes.mjs — generate per-artifact about pages under gates/about
import fs from "node:fs";
import path from "node:path";
import process from "node:process";
function readJson(p){return JSON.parse(fs.readFileSync(p,"utf8"));}
function ensureDir(p){if(!fs.existsSync(p))fs.mkdirSync(p,{recursive:true});}
function mdEscape(s){return String(s).replace(/```/g,"``\\`");}
function classify(p) {
    const n = p.replace(/\\/g, "/"); // normalize to forward slashes
    if (n.includes("/schemas/")) return "schema";
    if (n.includes("/samples/")) return "sample";
    if (n.includes("/tools/")) return "tool";
    if (n.endsWith("/package.json") || n.endsWith("package.json")) return "package";
    if (n.endsWith("/SEED_VERSION.json") || n.endsWith("SEED_VERSION.json")) return "doc";
    if (n.endsWith(".seed.json")) return "seed";
    return "doc";
}
function renderAbout(rel,kind,payload){
  const title=path.basename(rel);
  return `# About: \`${title}\`\n\n**Kind:** ${kind}  \n**Path:** \`${rel}\`\n\n---\n\n## Purpose\n\n${kind==="schema"?"JSON Schema used by Nova Halo v1.0.":kind==="sample"?"Sample JSON used to prove the schema.":kind==="tool"?"Node.js utility used by the gates harness.":kind==="package"?"NPM manifest for the gates workspace.":kind==="seed"?"Seed file that materializes gates files deterministically.":"Document emitted by the seed materializer."}\n\n---\n\n## Preview\n\n${payload?"```"+(typeof payload==="string"?"":"json")+"\n"+mdEscape(payload)+"\n```":"_no preview_"}\n\n---\n`}
function main(){
  const seedArg=process.argv[2];
  if(!seedArg){console.error("Usage: node ./tools/gen-readmes.mjs <seed.json>");process.exit(2);}
  const seedFull=path.isAbsolute(seedArg)?seedArg:path.resolve(process.cwd(),seedArg);
  if(!fs.existsSync(seedFull)){
    console.error(`[ERROR] Seed not found: ${seedFull}`);
    process.exit(2);
  }
  const seedDir=path.dirname(seedFull);
  const gatesDir=path.join(seedDir,"gates");
  const aboutDir=path.join(gatesDir,"about");
  ensureDir(aboutDir);
  const seed=readJson(seedFull);
  const bundles=seed.bundled_files??[];
  const outputs=[
    {rel:"halo.nova.seed.json",kind:"seed",payload:fs.readFileSync(seedFull,"utf8")},
    ...bundles.map(b=>({rel:b.path,kind:classify(b.path),payload:b.kind==="json"?JSON.stringify(b.json,null,2):b.text}))
  ];
  let count=0;
  for(const o of outputs){
    const name=path.basename(o.rel)+".md";
    const outPath=path.join(aboutDir,name);
    const md=renderAbout(o.rel.replace(/\\/g,"/"),o.kind,o.payload);
    fs.writeFileSync(outPath,md,{encoding:"utf8"});
    console.log(`[OK] wrote ${path.relative(process.cwd(),outPath)}`);
    count++;
  }
  console.log(`[OK] generated ${count} about pages -> ${aboutDir}`);
}
main();
