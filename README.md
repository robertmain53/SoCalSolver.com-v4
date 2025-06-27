
# SoCalSolver.com v3

🧠 Multilingual, AI-powered educational calculator platform.

## 🛠️ Stack
- Nuxt 3 (Frontend)
- Node/Nitro (Backend)
- Markdown + i18n content
- AI-integrated explanations
- JWT Auth, CI, SSR, SEO Schema

## 🚀 Dev Setup

```bash
pnpm install
pnpm dev
```

## 🧪 Lint / Test / Validate

```bash
pnpm lint
pnpm test
pnpm tsx tools/validate-content.ts
pnpm test:visual
```

## 📦 Build & Deploy

```bash
pnpm build
```

Deployed via Vercel + Render.

## 🧠 AI Tools

- `tools/generate-calculator.js`: from `.calcbundle.json`
- `tools/ai-review-from-diff.js`: content diff + suggestions
- `tools/apply-ai-fixes.js`: apply patch JSONs

## 📚 Structure

- `/content/` — Markdown-based calculators
- `/pages/` — Nuxt dynamic routes
- `/admin/` — Builder, analytics, translations
- `/embed/[slug]` — Iframe UI
- `/logs/` — AI history, analytics
