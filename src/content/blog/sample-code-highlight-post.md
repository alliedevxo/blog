---
title: "Sample Post with Syntax Highlighting"
description: "Quick smoke test for fenced code blocks and highlighting in Astro."
date: 2026-04-28
tags: ["astro", "code", "highlighting"]
draft: false
---

This post exists to verify that code highlighting is wired up.

## TypeScript example

```ts
type Book = {
  title: string;
  author: string;
  progress: number;
};

const reading: Book[] = [
  { title: "Fundamentals of Software Architecture", author: "Mark Richards, Neal Ford", progress: 15 },
];

const inProgress = reading.filter((book) => book.progress < 100);
console.log(inProgress.map((book) => book.title));
```

## JavaScript example

```js
function formatProgress(title, progress) {
  return `${title}: ${progress}% complete`;
}

console.log(formatProgress("SQL Performance Explained", 0));
```

## Bash example

```bash
npm run dev
npm run build
```
