# kapoy-blog

A minimal Next.js + MDX blog, built to deploy on Vercel with the same stack you already use for InvoiceKit.

## Stack

- Next.js 14 (App Router)
- MDX posts read from `content/posts/*.mdx` at build/request time via `next-mdx-remote`
- Syntax highlighting via `rehype-pretty-code` (Shiki under the hood)
- No database, no CMS — posts are files, git is your content history
- Dark theme with a mint accent (`#00F5B4`), matching the $0 Bot Stack branding

## Getting started

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`.

## Writing a post

Add a new file to `content/posts/your-slug.mdx`:

```mdx
---
title: "Your post title"
description: "One sentence for SEO/social previews."
date: "2026-06-30"
tags: ["python", "trading-bots"]
draft: false
---

Your content here. Standard Markdown plus code blocks with syntax highlighting.
```

The filename becomes the URL slug: `content/posts/my-post.mdx` → `/blog/my-post`.

Set `draft: true` to keep a post out of the list in production while still being able to preview it locally.

## Before you deploy

1. Open `lib/siteConfig.js` and update `url` to your real domain, and `twitter` if needed.
2. Update `public/robots.txt` with the same domain (used for the sitemap reference).
3. Replace the two example posts in `content/posts/` with your own, or keep them as templates.

## Deploying

Same flow as InvoiceKit:

```bash
git init
git add .
git commit -m "init blog"
```

Push to a GitHub repo, then import it in Vercel. No environment variables are required for the base setup — everything is filesystem-driven.

## What's included

- `/` — landing page with the 5 most recent posts
- `/blog` — full post index
- `/blog/[slug]` — individual post pages, statically generated at build time
- `/sitemap.xml` — auto-generated from your posts
- `/rss.xml` — RSS feed, auto-generated from your posts

## Extending it

- **Tags/categories page** — `getAllPosts()` in `lib/posts.js` already returns `tags`; add a `/blog/tag/[tag]` route that filters on it.
- **Newsletter signup** — drop a form component into `app/layout.js` footer or a post's closing section.
- **OG images** — add `app/blog/[slug]/opengraph-image.js` using `next/og` if you want auto-generated social preview cards per post.
