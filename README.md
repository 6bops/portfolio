# Layor Salami — Portfolio

Personal portfolio site. Built with **React + TypeScript + Vite** and **React Router**.

## Getting started

```bash
npm install
npm run dev      # start the dev server (http://localhost:5173)
npm run build    # typecheck + production build to dist/
npm run preview  # preview the production build locally
```

## Routes

| Path          | Page                              |
| ------------- | --------------------------------- |
| `/`           | Home — intro + featured projects  |
| `/work`       | Full project list                 |
| `/work/:slug` | Project detail / case study       |
| `/about`      | About + experience + education    |
| `/more`       | Talks, writing, and side projects |

## Project structure

```
src/
├── main.tsx                 # entry — mounts <App/>
├── App.tsx                  # router + routes
├── types.ts                 # shared data-model types
├── styles/
│   ├── theme.ts             # design tokens (fonts, colours, shared styles)
│   └── global.css           # reset, keyframes, responsive utility classes
├── hooks/
│   └── useMounted.ts        # drives page-entry transitions
├── data/                    # content (projects, experience, talks, startups)
├── components/
│   ├── ui/                  # atoms/molecules: FadeIn, MediaItem, PillLink, …
│   ├── layout/              # Layout shell, Nav, Footer, ScrollToTop
│   ├── project/             # ProjectCard, ImageGroup, interactive art
│   └── showcase/            # case-study workstream subsystem
└── pages/                   # one file per route
```

Media and imagery live in `public/` and are served from the site root
(`/images/…`, `/videos/…`).

## Deployment

Configured for Netlify (`netlify.toml`): `npm run build` → publish `dist/`,
with an SPA fallback so client-side routes resolve on direct load/refresh.
