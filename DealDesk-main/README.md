# DealDesk

**Private deal workflow for music creators.**

A clickable prototype for managing music licensing, stems, custom versions, and commission requests.

## Quick Start

```bash
npm install
npm run dev
```

## Deploy to Vercel

1. Push to GitHub
2. Import in Vercel: https://vercel.com/new
3. Deploy (no config needed)

## Screen Overview

### Creator Dashboard (inside AppShell)
- `/` or `/deals` — Deal list with filters
- `/deals/:id` — Deal case file (messages, terms, payment)
- `/activity` — Activity feed
- `/connections` — Buyer relationships
- `/links` — Deal link management
- `/stems` — Stems code manager
- `/analytics` — Revenue dashboard
- `/invites` — Creator invites
- `/delivery` — File delivery controls
- `/settings` — Creator settings

### Buyer-Facing (standalone)
- `/store/:creatorId` — Instant access storefront
- `/request/:creatorId` — Request forms (4 types)
- `/deal/:dealId/action` — Accept/counter/pay/download
- `/buyer` — Buyer dashboard

## Design System

- **Background:** Deep blue-to-cyan gradient
- **Fonts:** Playfair Display (headlines), DM Sans (body), IBM Plex Mono (money)
- **Accent:** Emerald green (#10b981)
- **Aesthetic:** 80s Wall Street meets E*TRADE

## Tech Stack

- React 18
- React Router 6
- Tailwind CSS 3
- Vite 5
