/**
 * Link-preview cards. A portfolio nobody sees has one job when it finally does
 * get shared in a Slack thread: not to unfurl as a grey box.
 *
 * Rendered at build time to flat PNGs, so they cost a visitor nothing — a
 * crawler fetches them, a browser never does.
 *
 * Run: npm run og   (committed to public/og, regenerate when copy changes)
 */
import sharp from 'sharp';
import { mkdir, writeFile } from 'node:fs/promises';

const W = 1200, H = 630;
const C = { authorize: '#f0b429', act: '#3fb8d4', evaluate: '#9d8cf5', attribute: '#4fc98a' };

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Crude but adequate wrap: Lato Black at this size averages ~0.54em per glyph. */
function wrap(text, size, maxW) {
  const per = size * 0.54, max = Math.floor(maxW / per);
  const out = [], words = text.split(' ');
  let line = '';
  for (const w of words) {
    if ((line + ' ' + w).trim().length > max && line) { out.push(line.trim()); line = w; }
    else line += ' ' + w;
  }
  if (line.trim()) out.push(line.trim());
  return out;
}

const CARDS = [
  { slug: 'index',   bar: ['authorize', 'act', 'evaluate', 'attribute'], tag: 'raj patil',
    head: 'I build the control plane for AI agents.',
    sub: 'Authorization, action, evaluation — three services that call each other.',
    foot: '239★ open source · AWS SA Associate' },
  { slug: 'atlas',   bar: ['authorize'], tag: 'atlas · authorize',
    head: 'Narrow a capability. Never widen it.',
    sub: 'Attenuable tokens bound to SPIFFE workload identity, verified offline.',
    foot: 'Go · SPIRE · gRPC · MCP · 40★' },
  { slug: 'klrb',    bar: ['evaluate'], tag: 'klrb · evaluate',
    head: 'It kept the answer after I deleted the evidence.',
    sub: 'Measuring whether an LLM reads your cluster before it diagnoses it.',
    foot: 'Python · chaos engineering · 96★' },
  { slug: 'aisre',   bar: ['act'], tag: 'aisre · act',
    head: 'An agent that investigates, then waits for a human.',
    sub: 'Agentic incident response behind a hard approval gate.',
    foot: 'Python · Nemotron · Flask' },
  { slug: 'tf-why',  bar: ['attribute'], tag: 'tf.why · attribute',
    head: 'Terraform says what drifted. This says who.',
    sub: 'Attribution to the exact IAM identity, API call and timestamp.',
    foot: 'Python · AWS CloudTrail · 33★' },
  { slug: 'self-healing-cicd', bar: ['act'], tag: 'self-healing ci/cd',
    head: 'A test fails. An agent opens the pull request.',
    sub: 'Inside the same Jenkins run that caught the failure.',
    foot: 'Python · Jenkins · 41★' },
  { slug: 'autostack', bar: ['act'], tag: 'autostack',
    head: 'Stand up an application stack without hand-wiring it.',
    sub: 'Go and Svelte tooling.',
    foot: 'Go · Svelte · 28★' },
];

const svg = (c) => {
  const HS = c.head.length > 44 ? 62 : 72;
  const lines = wrap(c.head, HS, 980);
  const top = 300 - ((lines.length - 1) * HS * 1.1) / 2;
  const barH = H / c.bar.length;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="#08090a"/>
  <g stroke="#ffffff" stroke-opacity="0.030">
    ${Array.from({ length: 19 }, (_, i) => `<line x1="${i * 64}" y1="0" x2="${i * 64}" y2="${H}"/>`).join('')}
    ${Array.from({ length: 10 }, (_, i) => `<line x1="0" y1="${i * 64}" x2="${W}" y2="${i * 64}"/>`).join('')}
  </g>
  ${c.bar.map((p, i) => `<rect x="0" y="${i * barH}" width="10" height="${barH}" fill="${C[p]}"/>`).join('')}

  <text x="82" y="112" font-family="Fira Code" font-size="21" fill="#6b7278" letter-spacing="5">${esc(c.tag.toUpperCase())}</text>

  ${lines.map((l, i) => `<text x="80" y="${top + i * HS * 1.1}" font-family="Lato" font-weight="900" font-size="${HS}" fill="#ffffff">${esc(l)}</text>`).join('\n  ')}

  <text x="82" y="${top + lines.length * HS * 1.1 + 24}" font-family="Lato" font-size="28" fill="#9aa1a7">${esc(c.sub.length > 80 ? c.sub.slice(0, 79) + '…' : c.sub)}</text>

  <line x1="80" y1="524" x2="1120" y2="524" stroke="#2b3237"/>
  <text x="82" y="566" font-family="Fira Code" font-size="22" fill="#8a9096">${esc(c.foot)}</text>
  <text x="1118" y="566" text-anchor="end" font-family="Fira Code" font-size="22" fill="#6b7278">rajpatil.dev</text>
</svg>`;
};

await mkdir('public/og', { recursive: true });
let total = 0;
for (const c of CARDS) {
  const buf = await sharp(Buffer.from(svg(c)))
    .png({ compressionLevel: 9, palette: true, quality: 90 })
    .toBuffer();
  await writeFile(`public/og/${c.slug}.png`, buf);
  total += buf.length;
  console.log(`  ${c.slug.padEnd(20)} ${(buf.length / 1024).toFixed(1)}KB`);
}
console.log(`\n  ${CARDS.length} cards, ${(total / 1024).toFixed(1)}KB total\n`);
