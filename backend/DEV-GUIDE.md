
# Backend Developer Guide

## 📦 Structure
- `server/api/`: API routes (e.g. `/api/improve`)
- `utils/`: AI prompts, auth middleware
- `drafts/`, `logs/`, `reports/`: runtime data

## 🧠 AI Tools
- Prompt templates in `/utils/ai/`
- Logs: `logs/ai-history.json`

## 🔐 Auth
- `/api/auth/login`: returns JWT
- Use `requireRole(event, 'admin')`

## 📦 Run

```bash
pnpm dev
pnpm build
```
