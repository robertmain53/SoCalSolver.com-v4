
# Frontend Developer Guide

## 🏗 Structure
- `pages/`: Nuxt routes (e.g. `/en/[slug].vue`)
- `components/`: UI blocks (Tabs, Quiz, Calculator)
- `content/`: Markdown `.md` files with metadata
- `plugins/`: Custom markdown-it containers

## 🧠 AI-Aided Authoring
- `:::explain`, `:::learn`, `:::challenge` in `.md`
- AI review via `/admin/create` or CLI

## 📦 Commands

```bash
pnpm dev
pnpm lint
pnpm generate
```

## 🧪 Testing
- Visual: `pnpm test:visual` (Playwright)
- Validation: `tools/validate-content.ts`
