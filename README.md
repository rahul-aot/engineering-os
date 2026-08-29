# Engineering OS

> Learn once. Understand deeply. Never start from zero again.

A minimal, personal software-engineering knowledge base — structured lessons in
JavaScript, DSA, and System Design, from beginner to advanced.

## Stack

React + TypeScript + Vite + Material UI + React Router.

## Getting started

```bash
npm install
npm run dev
```

## Project structure

```text
src/
  components/   Layout, Sidebar, Header, TopicList, TopicPage, CodeBlock, ...
  pages/        Home, Subject, Topic, Progress, Bookmarks
  content/      All lesson data (javascript/, dsa/, system-design/)
  hooks/        useProgress, useBookmarks, useSearch (all localStorage-backed)
  theme/        MUI theme (light/dark)
  types/        Shared content + progress types
  router/       Route definitions
```

Content lives entirely in `src/content/` as plain TypeScript data, organized
by subject and level. Adding a new topic means adding an entry to the
relevant `content/<subject>/<level>.ts` file — no component changes needed.

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — typecheck and build for production
- `npm run lint` — run oxlint
