# 六合彩預測器 Mark Six Predictor (v2)

A from-scratch, honest rebuild of a Mark Six (Hong Kong lottery) number generator.

## Why this rebuild exists

The original project (Lovable.dev + Supabase) had serious integrity problems:
- **Fabricated historical draw data** with obvious arithmetic sequences instead of real results.
- Misleading **"AI / TensorFlow ML prediction"** claims applied to a certified random draw — statistically meaningless.
- Hard dependency on the original author's **private Supabase backend** (could not run independently).
- Bloated 70+ file structure for what is fundamentally a simple app.

This rebuild fixes all four:

| Issue | Fix |
|---|---|
| Fake historical data | Real dataset (4,288 draws, 1993–2025) from the public, CORS-enabled [icelam/mark-six-data-visualization](https://github.com/icelam/mark-six-data-visualization) repo, with a bundled local JSON snapshot as offline fallback. |
| Fake "AI/ML" predictions | Removed entirely. Replaced with clearly-labeled traditional/cultural methods (I Ching, Zi Wei Dou Shu) and transparent historical statistics — **all explicitly disclosed as non-predictive, entertainment-only**. Mark Six draws are certified random; no method can improve your odds. |
| Supabase backend dependency | Removed. 100% frontend, all persistence (favorites, prediction history, language, theme) via `localStorage`. Fully self-contained, deployable as a static site. |
| Bloated structure | Rebuilt clean with ~30 focused files: `lib/` (pure logic), `hooks/` (state), `components/` (UI), `pages/` (2 pages). |

## Features
- 🪙 **I Ching (易經)** — simulated 3-coin-toss hexagram generation (64 hexagrams)
- ⭐ **Zi Wei Dou Shu (紫微斗數)** — simplified 14-star date-seeded reading
- 📊 **Historical statistics** — hot/cold/overdue number analysis from real draw data (heuristic only, not predictive)
- 🎯 Consensus combination across selected methods
- ⭐ Favorites & prediction history (localStorage)
- 🌗 Dark mode, 🌐 Traditional Chinese / English bilingual UI
- ⚠️ Explicit, persistent disclaimers throughout the UI

## Tech stack
Vite + React 19 + TypeScript (strict) + Tailwind CSS v3 + lucide-react icons. No backend, no database, no external API keys required.

## Development
```bash
npm install
npm run dev      # local dev server
npm run build    # production build (dist/)
```

## Disclaimer
This application is for **entertainment purposes only**. Hong Kong Mark Six draws use a certified random mechanism. No statistical method, traditional practice, or algorithm — including the ones in this app — can predict or influence the outcome of a random lottery draw. Please play responsibly.
