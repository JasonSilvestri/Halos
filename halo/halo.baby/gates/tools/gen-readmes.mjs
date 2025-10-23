#!/usr/bin/env node
// gen-readmes.mjs — generate per-artifact "about" markdown pages under gates/about
// Usage: node ./tools/gen-readmes.mjs ../halo.baby.seed.json

import fs from "node:fs";
import path from "node:path";
import process from "node:process";

function readJson(p) {
    return JSON.parse(fs.readFileSync(p, "utf8"));
}

function ensureDir(p) {
    if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
}

function mdEscapeCodeFence(s) {
    // ensures inner ``` blocks won't break our wrapping fence
    return String(s).replace(/```/g, "``\\`");
}

function classify(p) {
    if (p.includes("/schemas/") || p.includes("\\schemas\\")) return "schema";
    if (p.includes("/samples/") || p.includes("\\samples\\")) return "sample";
    if (p.includes("/tools/") || p.includes("\\tools\\")) return "tool";
    if (p.endsWith("package.json")) return "package";
    if (p.endsWith("SEED_VERSION.json")) return "doc";
    if (p.endsWith(".seed.json")) return "seed";
    return "doc";
}

function renderAbout(relPath, kind, payload) {
    const title = path.basename(relPath);
    const block =
        `# About: \`${title}\`

**Kind:** ${kind}  
**Path:** \`${relPath}\`

---

## Purpose

${kind === "schema" ? "JSON Schema used by Baby Halo v0.2.6. Referenced by other docs via `$ref` where applicable."
            : kind === "sample" ? "Sample JSON used to prove the schema and to enable quick local validation."
                : kind === "tool" ? "Small Node.js utility used by the gates harness."
                    : kind === "package" ? "NPM manifest for the gates workspace."
                        : kind === "seed" ? "Seed file that materializes gates files deterministically."
                            : "Document emitted by the seed materializer."}

---

## Preview

${payload ? "```" + (typeof payload === "string" ? "" : "json") + "\n" + mdEscapeCodeFence(payload) + "\n```" : "_no preview_"}

---

## How to use

${kind === "schema" ? `Compile only:
\`\`\`bash
node ./tools/validate-gate.mjs --schema ${title.replace(/^halos\-|\.schema\.json$/g, "")}
\`\`\`

Validate with sample:
\`\`\`bash
npm run ${title.includes("workitems") ? "work:validate:file" : title.includes("whatsnext") ? "next:validate:file" : "wf:validate:file"}
\`\`\``
            : kind === "sample" ? `Validate against its schema:
\`\`\`bash
npm run ${title.includes("workitems") ? "work:validate:file" : "next:validate:file"}
\`\`\``
                : kind === "tool" ? (title.includes("validate-gate.mjs") ? `Compile a schema:
\`\`\`bash
node ./tools/validate-gate.mjs --schema whatsnext
\`\`\`

Validate with data:
\`\`\`bash
node ./tools/validate-gate.mjs --schema whatsnext --file ./samples/whatsnext.sample.json
\`\`\``
                    : title.includes("echo-workitems.mjs") ? `Echo the workitems manifest:
\`\`\`bash
node ./tools/echo-workitems.mjs ./samples/workitems.seed-echo.sample.json
\`\`\``
                        : "_tool_")
                    : kind === "package" ? `Install and run validators:
\`\`\`bash
npm install
npm run next:validate:file
npm run work:validate:file
\`\`\``
                        : kind === "seed" ? `Materialize files:
\`\`\`powershell
pwsh -File ./Write-HaloSeed.ps1 -SeedPath ./halo.baby.seed.json
\`\`\``
                            : "_doc_"}
`;

    return block;
}

function main() {
    const seedArg = process.argv[2];
    if (!seedArg) {
        console.error("Usage: node ./tools/gen-readmes.mjs <path-to-seed.json>");
        process.exit(2);
    }
    const seedFull = path.isAbsolute(seedArg) ? seedArg : path.resolve(process.cwd(), seedArg);
    if (!fs.existsSync(seedFull)) {
        console.error(`[ERROR] Seed not found: ${seedFull}`);
        process.exit(2);
    }

    const seedDir = path.dirname(seedFull);
    const gatesDir = path.join(seedDir, "gates");
    const aboutDir = path.join(gatesDir, "about");
    ensureDir(aboutDir);

    const seed = readJson(seedFull);
    const bundles = seed.bundled_files ?? [];
    // Also produce an about page for the seed itself
    const outputs = [
        { rel: "halo.baby.seed.json", kind: "seed", payload: fs.readFileSync(seedFull, "utf8") },
        ...bundles.map(b => ({ rel: b.path, kind: classify(b.path), payload: b.kind === "json" ? JSON.stringify(b.json, null, 2) : b.text }))
    ];

    let count = 0;
    for (const o of outputs) {
        const name = path.basename(o.rel) + ".md";
        const outPath = path.join(aboutDir, name);
        const md = renderAbout(o.rel.replace(/\//g, "/"), o.kind, o.payload);
        fs.writeFileSync(outPath, md, { encoding: "utf8" });
        console.log(`[OK] wrote ${path.relative(process.cwd(), outPath)}`);
        count++;
    }
    console.log(`[OK] generated ${count} about pages -> ${aboutDir}`);
}

main();