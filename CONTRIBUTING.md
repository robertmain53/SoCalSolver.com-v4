# Contributing to SoCalSolver.com

Thank you for your interest in contributing!

## 📦 Structure

- `frontend/` — Nuxt 3 app for UI and SSR rendering
- `backend/` — Node/Nitro APIs for AI, publishing, and admin
- `content/` — Markdown calculators (multi-lingual, AI-enhanced)
- `tools/` — CLI tools for generation and validation

## 🧪 Getting Started

```bash
pnpm install
pnpm dev  # frontend
pnpm --filter backend dev  # backend
pnpm test
```

## ✨ Tips

- Use `/builder` to create new calculators
- Run AI improvement tools via `tools/improve.sh`
- Write tests in `tests/` using Vitest
