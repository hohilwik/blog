# Shirley's Blog an Astro blog with automatic backlinks

A small static blog, built with [Astro](https://astro.build), where posts that link to each
other automatically show up as "Referenced by" on both ends no wiki syntax, no database, no
plugin to configure. It's meant to be hosted on **GitHub Pages for free**, deployed by GitHub Actions on every push.

See [`README_SHIR.md`](./README_SHIR.md) for build, deploy, and content-authoring notes.

## How the backlinks work

Write posts with ordinary Markdown links, using a post's site-relative URL:

```md
See my earlier note on [tide pools](/blog/tide-pools/).
```

At build time, `src/utils/backlinks.ts` reads every post's raw Markdown source, finds links
that point at `/blog/<slug>`, and builds a reverse index. Each post page
(`src/pages/blog/[...slug].astro`) looks itself up in that index and renders a "Referenced by"
list at the bottom. There's nothing to keep in sync by hand rename or delete a post and its
backlinks disappear on the next build; add a new link and it appears.

`src/content/blog/tide-pools.md` is the example post. Add a second post that links to
`/blog/tide-pools/` and it will appear under "Referenced by" on the tide pools page.

## Project structure

```
src/
  content/blog/*.md          your posts (frontmatter: title, description, pubDate, tags, draft)
  content.config.ts          the blog collection's schema
  pages/
    index.astro               homepage, recent posts
    blog/index.astro          full post index
    blog/[...slug].astro      individual post template (renders backlinks)
    tags/[tag].astro          posts filtered by tag
    about.astro
    404.astro
    rss.xml.js                RSS feed
  components/                 Header, Footer, PostCard, BackLinks
  layouts/BaseLayout.astro
  utils/
    backlinks.ts               the backlink scanner/index
    callNumbers.ts              cosmetic "call number" stamp on post cards
    rehype-base-url.mjs         rewrites in-content links for the GitHub Pages subpath
astro.config.mjs              site/base config + markdown processor
```

## License

Do whatever you'd like with this template.