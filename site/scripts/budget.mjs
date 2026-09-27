/**
 * Performance budget, enforced. The previous site shipped a 4.6MB dist with a
 * 948KB JS bundle; this exists so that cannot happen again by accident.
 * Run after build: `npm run budget`. Non-zero exit fails CI.
 */
import { readdir, stat, readFile } from 'node:fs/promises';
import { join, extname } from 'node:path';
import { gzipSync } from 'node:zlib';

const DIST = 'dist';
const BUDGET = { js: 50 * 1024, css: 30 * 1024, page: 60 * 1024, total: 900 * 1024 };

async function walk(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(p)));
    else out.push(p);
  }
  return out;
}

const files = await walk(DIST);
let js = 0, css = 0, total = 0;
const pages = [];

for (const f of files) {
  const { size } = await stat(f);
  total += size;
  const ext = extname(f);
  if (ext === '.js') js += size;
  if (ext === '.css') css += size;
  if (ext === '.html') {
    const gz = gzipSync(await readFile(f)).length;
    pages.push({ f, size, gz });
  }
}

const kb = (n) => (n / 1024).toFixed(1) + 'KB';
const fails = [];

console.log('\n  page weights (html, gzipped)');
for (const p of pages.sort((a, b) => b.gz - a.gz)) {
  const over = p.gz > BUDGET.page;
  if (over) fails.push(`${p.f} is ${kb(p.gz)} gzipped, over ${kb(BUDGET.page)}`);
  console.log(`   ${over ? '✗' : '✓'} ${p.f.padEnd(34)} ${kb(p.size).padStart(9)} raw  ${kb(p.gz).padStart(9)} gz`);
}

console.log('\n  totals');
for (const [k, v] of [['js', js], ['css', css], ['total', total]]) {
  const over = v > BUDGET[k];
  if (over) fails.push(`${k} is ${kb(v)}, over ${kb(BUDGET[k])}`);
  console.log(`   ${over ? '✗' : '✓'} ${k.padEnd(8)} ${kb(v).padStart(9)}  budget ${kb(BUDGET[k])}`);
}

if (fails.length) {
  console.error('\n  BUDGET EXCEEDED\n' + fails.map((f) => '   · ' + f).join('\n') + '\n');
  process.exit(1);
}
console.log('\n  within budget\n');
