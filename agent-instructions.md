# SlushUp Project Instructions

## Project Overview
SlushUp is a premium, high-impact marketing landing page built with React 19, TypeScript, and Tailwind CSS v4. The project uses Biome for linting/formatting and Husky for pre-commit hooks.

## Tech Stack
* **Framework**: React 19 (Functional Components)
* **Build Tool**: Vite (rolldown-vite) + SWC
* **Styling**: Tailwind CSS v4 (@tailwindcss/postcss)
* **Linting/Formatting**: Biome 2.3.11
* **Git Hooks**: Husky (pre-commit runs `npm run format`)

## Project Structure
* `src/components/`: Self-contained page sections (Hero, Services, Audience, Premium, Gallery, CTA, Footer).
* `src/utils/assetRouter.ts`: Centralized mapping for all public assets. Always use `getAsset("name")` to reference images/videos.
* `tailwind.config.js`: Contains brand colors (`slushup-green`, `slushup-cream`, etc.).

## Development Workflow
1. **Dev Server**: `npm run dev`
2. **Formatting**: Biome handles formatting automatically on commit via Husky.
3. **Assets**: Place new assets in `public/` and register them in `src/utils/assetRouter.ts`.
4. **Code Quality**: No unused imports, no console logs, and proper TypeScript typing required.

## Brand Identity
* **Colors**: Green (#2D7F4F), Light Green (#4A9F6F), Cream (#F5F1E8).
* **Typography**: System font stack for performance.
* **Tone**: Premium, visual-first, and mobile-responsive.