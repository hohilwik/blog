# Shirley's Blog deployment & changes notes

Personal reference for building, deploying, and updating the blog. The public
overview lives in [`README.md`](./README.md); everything operational is here.

## Writing a new post

Add a Markdown file to `src/content/blog/`, e.g. `src/content/blog/my-post.md`:

```md
---
title: My post title
description: One sentence for the index card and RSS feed.
pubDate: 2026-01-15
tags: [observation]
---

Your content here. Link to another post with `[link text](/blog/other-post-slug/)`
to create a backlink automatically.
```

The filename (minus `.md`) becomes the URL slug: `my-post.md` → `/blog/my-post/`.

A post won't show up on the site until its frontmatter includes at least
`title`, `description`, and `pubDate` (`tags` and `draft` are optional and
default to `[]` and `false`). Set `draft: true` to keep a post out of the
published feed while still iterating on it.

## Run it locally

```bash
npm install
npm run dev
```

### Test locally before pushing to GitHub

The `dev` / `build` / `preview` scripts above run the site at the same
subpath it will use in production (e.g. `http://localhost:4321/YOUR_REPO_NAME/`),
so what you see locally matches what readers will see after `npm run deploy`.

When you want to iterate quickly without the GitHub Pages subpath getting in
the way handy while you're still filling in `YOUR_REPO_NAME`, or just for a
cleaner URL use the `:local` variants instead:

```bash
npm run dev:local      # live dev server at http://localhost:4321/
npm run build:local    # production build with base '/'  (writes to dist/)
npm run preview:local  # serve the built dist/ at http://localhost:4321/
```

These pass `astro dev/build/preview --base /`, which overrides the `base`
configured in `astro.config.mjs`. Your in-content root-relative links (e.g.
`/blog/tide-pools/`) resolve at the domain root while you iterate, and the
`rehype-base-url` plugin becomes a no-op so it doesn't prepend anything.
**None of these local commands touch GitHub** they're purely for testing
on your machine. When you're happy with what you see, run `npm run deploy`
to publish for real.

## Before you deploy: set your GitHub username and repo name

Open `astro.config.mjs` and replace the placeholders:

```js
const base = '/YOUR_REPO_NAME';

export default defineConfig({
  site: 'https://YOUR_GITHUB_USERNAME.github.io',
  base,
  // ...
});
```

- **Project repo** (most common e.g. `github.com/alex/my-blog`, served at
  `https://alex.github.io/my-blog/`): set `site: 'https://alex.github.io'` and
  `base: '/my-blog'`.
- **User/org page** (repo literally named `alex.github.io`, served at the domain root): set
  `site: 'https://alex.github.io'` and `base: '/'`.

Also update the `"homepage"` you may want to add to `package.json` (optional, cosmetic only
npm doesn't require it).

## Deploying GitHub Actions

Every push to `main` runs `.github/workflows/deploy.yml`, which:

1. Runs `scripts/fix-frontmatter.mjs`: any post missing `title`, `description`, or `pubDate`
   gets them added (title from a leading `# Heading` or the filename, description from the
   first paragraph, pubDate = today) and the fix is committed back to `main`. Existing values
   are never changed. Run it locally with `node scripts/fix-frontmatter.mjs`.
2. Builds the site and publishes it to GitHub Pages.

Actions minutes are free for public repos.

**First-time setup** (empty GitHub repo already created):

```bash
scripts/push-to-github.sh https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPO_NAME.git
```

This fills in `site`/`base` in `astro.config.mjs`, makes the initial commit, and pushes. Then in
the repo go to **Settings → Pages → Source: GitHub Actions** and re-run the "Deploy blog"
workflow from the Actions tab. After that, just edit, commit, and `git push`. Pull before
editing locally, since the workflow may have committed frontmatter fixes.
