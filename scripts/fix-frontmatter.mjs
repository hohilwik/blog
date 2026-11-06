// Adds missing required frontmatter (title, description, pubDate) to blog posts.
// Only touches files that are missing something; existing values are never changed.
// Usage: node scripts/fix-frontmatter.mjs [dir]   (default: src/content/blog)
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, basename, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const FM = /^---\r?\n([\s\S]*?)^---[ \t]*(?:\r?\n|$)/m;

export function fix(src, file, today = new Date().toISOString().slice(0, 10)) {
  const m = src.match(FM);
  const hasFm = m && m.index === 0;
  const fm = hasFm ? m[1] : '';
  let body = hasFm ? src.slice(m[0].length) : src;
  const has = (k) => new RegExp(`^${k}\\s*:`, 'm').test(fm);

  const add = [];
  if (!has('title')) {
    const h1 = body.match(/^\s*#\s+(.+?)\s*#*\s*(?:\r?\n|$)/);
    let title;
    if (h1) {
      title = h1[1];
      body = body.slice(h1[0].length); // layout already renders the title as <h1>
    } else {
      const s = basename(file, '.md').replace(/[-_]+/g, ' ').trim().toLowerCase();
      title = s.charAt(0).toUpperCase() + s.slice(1);
    }
    add.push(`title: ${JSON.stringify(title)}`);
  }
  if (!has('description')) {
    const para = body
      .split(/\r?\n\s*\r?\n/)
      .map((p) => p.trim())
      .find((p) => p && !/^(#|```|[-*+] |\d+\. |>|\||<|!\[)/.test(p));
    let d = (para ?? '')
      .replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1')
      .replace(/[*_`]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
    if (d.length > 160) d = d.slice(0, 157).replace(/\s+\S*$/, '') + '…';
    add.push(`description: ${JSON.stringify(d || 'No description.')}`);
  }
  if (!has('pubDate')) add.push(`pubDate: ${today}`);

  if (!add.length) return null;
  const lines = [fm.replace(/\s+$/, ''), ...add].filter(Boolean).join('\n');
  return `---\n${lines}\n---\n${body.replace(/^\s+/, '')}`;
}

const isMain = import.meta.url === pathToFileURL(resolve(process.argv[1])).href;
if (isMain) {
  const dir = process.argv[2] ?? 'src/content/blog';
  for (const f of readdirSync(dir, { recursive: true })) {
    if (!f.endsWith('.md')) continue;
    const p = join(dir, f);
    const out = fix(readFileSync(p, 'utf8'), p);
    if (out) {
      writeFileSync(p, out);
      console.log(`fixed frontmatter: ${p}`);
    }
  }
}
