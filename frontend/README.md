# 🧮 Calchub – Calculator Publishing Platform

Calchub is a full-stack, multilingual platform for creating, reviewing, and publishing powerful online calculators.

## 🚀 Quick Start

### Frontend (Nuxt 3)

```bash
npm install
npm run dev
```

Build for Netlify:

```bash
npm run build
```

### Backend (Node/Nitro)

```bash
npm install
npm run build
npm run start
```

> Ensure `.env` files are configured in both projects.

## ⚙️ Features

- ✍️ AI-enhanced calculator generation from `.calcbundle.json`
- ✅ Review → Improve → Approve → Publish flow
- 🌍 Multilingual + SEO optimized
- 🧪 Snapshot tests via Playwright
- 📦 Embed-friendly output (`/embed/[slug]`)
- 🔍 CI: GitHub Actions, Lighthouse, Lint, A11y

## 📐 Generate a New Calculator

```bash
node tools/generate-calculator.js calcbundles/bmi.calcbundle.json
```

This will create:
- `components/calculators/bmi-calculator.vue`
- `content/calculators/bmi-calculator.en.md`
- `tests/bmi-calculator.test.js`

---

Built to outperform OmniCalculator & others — with transparency, accessibility, and developer joy.