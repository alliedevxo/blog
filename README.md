# Allie's Blog

Simple static blog built with Astro. It includes:

- blog posts from Markdown files
- a books page for wishlist/progress
- a projects page
- light/dark mode support

## Run Locally

```sh
npm install
npm run dev
```

Open [http://localhost:4321](http://localhost:4321).

## Build

```sh
npm run build
npm run preview
```

## Content Authoring

Add content files under `src/content/`:

- `src/content/blog/*.md` for posts
- `src/data/books.json` for books
- `src/content/projects/*.md` for projects

### Blog frontmatter

```md
---
title: "Post title"
description: "One-line summary"
date: 2026-04-28
tags: ["astro", "notes"]
draft: false
---
```

### Books JSON shape

```json
{
  "currentlyReading": [
    { "title": "Book title", "author": "Author Name", "progress": 40, "notes": "Optional notes" }
  ],
  "wishlist": [
    { "title": "Book title", "author": "Author Name", "priority": "high", "notes": "Optional notes" }
  ],
  "completed": [
    { "title": "Book title", "author": "Author Name", "notes": "Optional notes" }
  ]
}
```

### Projects frontmatter

```md
---
name: "Project name"
summary: "Short project description"
tech: ["Astro", "TypeScript"]
repo: "https://github.com/you/repo" # optional
live: "https://your-site.dev" # optional
featured: false
---
```
