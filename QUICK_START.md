# SlushUp Landing Page - Quick Start Guide

## What Was Built

A complete, production-ready marketing landing page for SlushUp Frozen Treats and Beverages, following all provided copilot instructions.

### ✅ All Requirements Met

**Tech Stack:**
- React 19 + TypeScript + SWC
- Vite with rolldown-vite
- Tailwind CSS v4 (with new @tailwindcss/postcss)
- Biome for linting/formatting (replaces ESLint + Prettier)
- Husky for git pre-commit hooks
- PostCSS for Tailwind

**Landing Page Sections:**
1. **Hero** - Background video, headline, dual CTAs
2. **Services** - 4-column grid (Mobile Bar, Cocktails, Mocktails, Frozen Treats)
3. **Audience** - Event types (Corporate, Weddings, Professionals)
4. **Premium** - Highlights & emotional value proposition
5. **Gallery** - Visual showcase with assets
6. **Call-to-Action** - Conversion-focused section
7. **Footer** - Clean branding and links

**Special Features:**
- **Asset Router**: Centralized asset mapping for easy updates (`src/utils/assetRouter.ts`)
- **Brand Colors**: Custom Tailwind colors configured globally
- **Responsive Design**: Mobile-first, touch-friendly
- **Clean Code**: No unused imports, no console logs, proper a11y

---

## Quick Start

### Start Development Server
```bash
npm run dev
```
Opens at `http://localhost:5173` with hot module replacement (HMR).

### Build for Production
```bash
npm run build
```
Outputs optimized files to `dist/` folder.

### Check Code Quality
```bash
npm run lint      # Check for issues
npm run format    # Auto-format code
```

---

## File Organization

### Components (`src/components/`)
Each component is a self-contained section:
- `Hero.tsx` - Full-screen hero with video background
- `Services.tsx` - 4-service card grid
- `Audience.tsx` - Event types section
- `Premium.tsx` - Premium highlights
- `Gallery.tsx` - Image/video gallery
- `CallToAction.tsx` - Conversion CTA
- `Footer.tsx` - Footer with links

### Utilities (`src/utils/`)
- `assetRouter.ts` - Maps asset names to public folder paths

### Styling
- `App.css` - Tailwind directives
- `index.css` - Global base styles
- `tailwind.config.js` - Brand colors and Tailwind config

---

## Making Changes

### Update Content
Edit component files directly. All content is static.

```tsx
// Example: Edit Hero.tsx
<h1>New Headline Here</h1>
<p>New description here</p>
```

### Update Brand Colors
Edit `tailwind.config.js`:
```js
colors: {
  slushup: {
    green: "#NEW_COLOR",
    cream: "#NEW_COLOR",
    // ...
  }
}
```

### Update Assets
1. Add new asset to `public/` folder
2. Update `src/utils/assetRouter.ts`:
```ts
export const assetRoutes = {
  myNewImage: "/my-new-image.jpg",
  // ...
}
```
3. Use in components:
```tsx
<img src={getAsset("myNewImage")} />
```

---

## Code Standards

All code is:
- **Typed**: Full TypeScript support
- **Formatted**: Biome handles all formatting
- **Clean**: No unused imports, no console logs
- **Accessible**: Proper button types, semantic HTML
- **Responsive**: Mobile-first design
- **Fast**: Optimized Tailwind CSS bundle

---

## Git Workflow

The pre-commit hook automatically runs `npm run format` before each commit. This ensures:
- Consistent code style
- No formatting arguments
- Commits always pass linting

```bash
git add .
git commit -m "Update landing page"
# Pre-commit hook runs npm run format automatically
```

---

## Deployment

The `dist/` folder is production-ready:
```bash
npm run build
# Deploy dist/ folder to your host
```

Files are optimized and minified:
- `dist/index.html` - Page markup
- `dist/assets/index-*.css` - Tailwind styles (~3KB gzipped)
- `dist/assets/index-*.js` - React app (~63KB gzipped)

---

## Project Structure Reference

```
SlushUp/
├── src/
│   ├── components/       # Page sections
│   │   ├── Hero.tsx
│   │   ├── Services.tsx
│   │   ├── Audience.tsx
│   │   ├── Premium.tsx
│   │   ├── Gallery.tsx
│   │   ├── CallToAction.tsx
│   │   ├── Footer.tsx
│   │   └── index.ts      # Component exports
│   ├── utils/
│   │   └── assetRouter.ts # Asset mapping
│   ├── App.tsx           # Main app
│   ├── App.css
│   ├── index.css
│   └── main.tsx
├── public/               # Images, videos
│   ├── bar-image.jpeg
│   ├── drink-*.jpeg
│   ├── *-video*.mp4
│   └── ...
├── dist/                 # Production build (generated)
├── node_modules/         # Dependencies (generated)
├── tailwind.config.js    # Tailwind config
├── biome.json           # Biome config
├── postcss.config.js    # PostCSS config
├── vite.config.ts       # Vite config
├── tsconfig.json        # TypeScript config
├── package.json         # Scripts & dependencies
└── .husky/              # Git hooks
    └── pre-commit       # Auto-format before commit
```

---

## Next Steps

1. **Start Development**: `npm run dev`
2. **Update Content**: Edit component files in `src/components/`
3. **Customize Styling**: Modify colors in `tailwind.config.js`
4. **Add Images**: Put assets in `public/` and reference in `assetRouter.ts`
5. **Deploy**: Run `npm run build` and deploy `dist/` folder

---

## Support Notes

- **Tailwind Classes**: Use the full class names directly (e.g., `className="px-6 py-3 bg-slushup-green"`)
- **Responsive**: Use Tailwind breakpoints: `md:`, `lg:`, etc.
- **Hover States**: Use `hover:` prefix for interactive elements
- **Assets**: Always use `getAsset()` from `assetRouter.ts`
- **Linting**: Run `npm run lint` to check for issues before committing

---

## Brand Identity

**Colors:**
- Primary Green: `#2D7F4F`
- Light Green: `#4A9F6F`
- Background Cream: `#F5F1E8`
- Subtle Cream: `#E8E3D8`

**Typography:**
- System font stack for fast loading
- Proper heading hierarchy (h1, h2, h3)
- Readable line heights and spacing

**Design Philosophy:**
- Visual-first marketing
- Premium brand positioning
- Mobile-first responsive
- Clean, minimal aesthetic

---

Ready to launch! 🚀
