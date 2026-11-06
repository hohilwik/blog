// @ts-check
import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import { rehypeBaseUrl } from './src/utils/rehype-base-url.mjs';

// GitHub Pages configuration
// 1. If this repo will be served at  https://<user>.github.io/<repo>/
//    (the normal case for a project repo), set both `site` and `base` below.
//
// 2. If this repo IS your user/org page (named exactly
//    <user>.github.io) it's served at the domain root, so set:
//       site: 'https://<user>.github.io'
//       base: '/'
//
// Replace hohilwik and YOUR_REPO_NAME, then do the same in
// package.json's "homepage" field used by the gh-pages deploy script.
//
// Running locally to test before pushing to GitHub
// The `base` below only applies when you run `npm run dev`, `npm run build`,
// or `npm run preview` those commands run the site at the same subpath it
// will use in production (e.g. http://localhost:4321/YOUR_REPO_NAME/).
//
// To test the site locally *without* the GitHub Pages subpath getting in the
// way (handy while you're still filling in YOUR_REPO_NAME, or just for a
// cleaner URL), use the `:local` variants instead:
//
//   npm run dev:local      → http://localhost:4321/          (live dev server)
//   npm run build:local    → builds dist/ with base '/'       (production build)
//   npm run preview:local  → serves the built dist/ at '/'    (preview that build)
//
// The `--base /` flag passed by these scripts overrides whatever `base` is
// set to below, so your in-content root-relative links (e.g.
// `/blog/tide-pools/`) resolve at the domain root while you iterate. None of
// these local commands touch GitHub they're purely for testing on your
// machine before you run `npm run deploy`.
const base = '/blog';

export default defineConfig({
  site: 'https://hohilwik.github.io',
  base,
  markdown: {
    // Posts link to each other with plain root-relative URLs like
    // /blog/some-slug/ (this is also what the backlinks scanner reads).
    // This plugin rewrites those to include `base` at render time, so
    // the links work once deployed under a GitHub Pages subpath.
    //
    // Note: when running with `npm run dev:local` / `build:local` / `preview:local`,
    // Astro's BASE_URL is '/' so `rehypeBaseUrl('/')` becomes a no-op and links
    // resolve at the domain root exactly what you want for local testing.
    processor: unified({
      // Pass Astro's *resolved* base (import.meta.env.BASE_URL) not the
      // local `base` const above so the `--base /` flag from
      // `npm run dev:local` / `build:local` / `preview:local` actually
      // reaches the rewriter. When BASE_URL is '/', normalizedBase becomes
      // '' and the plugin becomes a no-op, leaving your root-relative links
      // at the domain root for clean local testing.
      rehypePlugins: [[rehypeBaseUrl, import.meta.env.BASE_URL ?? base]],
    }),
  },
});
