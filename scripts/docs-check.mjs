import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const docsRoot = path.join(root, "docs");
const failures = [];

function walk(directory) {
  if (!existsSync(directory)) return [];
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

const allMarkdown = [...walk(docsRoot), ...walk(path.join(root, "references"))]
  .filter((file) => file.toLowerCase().endsWith(".md"));
const canonicalMarkdown = allMarkdown.filter((file) => {
  const relative = path.relative(root, file).replaceAll("\\", "/");
  return /^docs\/(00-core|10-brand|20-business|30-design|40-content|50-products|60-data|70-operations|80-platform|90-decisions)\//.test(relative);
});

for (const file of canonicalMarkdown) {
  const buffer = readFileSync(file);
  if (statSync(file).size === 0) failures.push(`Zero-byte canonical Markdown: ${path.relative(root, file)}`);
  try { new TextDecoder("utf-8", { fatal: true }).decode(buffer); }
  catch { failures.push(`Invalid UTF-8 in canonical Markdown: ${path.relative(root, file)}`); }
  if (buffer[0] === 0xef && buffer[1] === 0xbb && buffer[2] === 0xbf) failures.push(`Unexpected UTF-8 BOM in canonical Markdown: ${path.relative(root, file)}`);
  if (buffer.toString("utf8").includes("\uFFFD")) failures.push(`Replacement-character corruption in canonical Markdown: ${path.relative(root, file)}`);
}

const seen = new Map();
for (const file of canonicalMarkdown) {
  const key = path.relative(root, file).replaceAll("\\", "/").toLowerCase();
  const previous = seen.get(key);
  if (previous) failures.push(`Duplicate canonical path: ${previous} and ${path.relative(root, file)}`);
  seen.set(key, path.relative(root, file));
}

const required = [
  "docs/00-core/START_HERE.md",
  "docs/00-core/AC_MASTER_BRIEF.md",
  "docs/00-core/CURRENT_STATE.md",
  "docs/00-core/ROADMAP.md",
  "docs/00-core/DECISION_INDEX.md",
  "docs/00-core/AI_HANDOFF.md",
  "docs/00-core/DOCUMENTATION_GOVERNANCE.md",
  "docs/00-core/MIGRATION_LEDGER.md",
];
for (const relative of required) {
  if (!existsSync(path.join(root, relative))) failures.push(`Missing required core document: ${relative}`);
}

const linkPattern = /\[[^\]]*\]\(([^)]+)\)/g;
for (const file of allMarkdown.filter((item) => !item.includes(`${path.sep}_incoming${path.sep}`))) {
  const text = readFileSync(file, "utf8");
  for (const match of text.matchAll(linkPattern)) {
    const raw = match[1].trim().replace(/^<|>$/g, "");
    if (!raw || raw.startsWith("#")) continue;
    if (/^[a-z]:[\\/]/i.test(raw)) {
      const relative = path.relative(root, file).replaceAll("\\", "/");
      if (/^docs\/(00-core|10-brand|20-business|30-design|40-content|50-products|60-data|70-operations|80-platform|90-decisions)\//.test(relative)) failures.push(`Absolute Windows path in canonical Markdown: ${relative}: ${raw}`);
      continue;
    }
    if (/^[a-z][a-z0-9+.-]*:/i.test(raw)) continue;
    const target = decodeURIComponent(raw.split("#", 1)[0]);
    if (!target) continue;
    const resolved = path.resolve(path.dirname(file), target);
    if (!existsSync(resolved)) failures.push(`Broken relative link in ${path.relative(root, file)}: ${raw}`);
  }
}

function requireText(relative, patterns) {
  const file = path.join(root, relative);
  if (!existsSync(file)) return failures.push(`Missing validation document: ${relative}`);
  const text = readFileSync(file, "utf8");
  for (const pattern of patterns) if (!pattern.test(text)) failures.push(`Required invariant missing from ${relative}: ${pattern}`);
}

requireText("docs/20-business/SERVICE_REGISTRY.md", [/DEAL[\s\S]*ACTIVE/, /SPACE[\s\S]*ACTIVE/, /CONDITION[\s\S]*INACTIVE/]);
requireText("docs/20-business/services/CONDITION.md", [/Service Status:\s*INACTIVE/, /Public Availability:\s*NO/]);
requireText("docs/00-core/DOCUMENTATION_GOVERNANCE.md", [/Draft is not Published/i, /Assignment is not Approval/i, /Role is not software Capability/i, /Production Asset/i]);
requireText("docs/50-products/specs/AC_MARKET_PULSE.md", [/Product Status:\s*PROPOSED/]);
requireText("docs/60-data/calculations/MARKET_PULSE_SCORING.md", [/PROPOSED[\s\S]*not approved truth/i, /NOT VALIDATED|not validated/i]);
requireText("docs/95-workbench/README.md", [/NON-CANONICAL/, /zero canonical authority/i]);
requireText("docs/00-core/START_HERE.md", [/Workbench[\s\S]*zero canonical authority/i]);

if (failures.length) {
  console.error(`Documentation validation failed (${failures.length}):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Documentation validation passed: ${canonicalMarkdown.length} canonical Markdown files, ${allMarkdown.length} total checked.`);
