# SlushUp Landing Page

A premium, high-impact marketing landing page for **SlushUp Frozen Treats and Beverages** built with React, TypeScript, SWC, Tailwind CSS, and Biome.

## Overview

This is a static, visual-first React application designed to showcase SlushUp's premium beverage experiences. The application features:

- **Hero Section**: Strong headline, subheading, and prominent CTAs
- **Services Overview**: Mobile bar, cocktails, mocktails, frozen treats
- **Audience/Event Types**: Corporate, weddings, professionals
- **Premium Experience**: Emotional value proposition with key highlights
- **Gallery**: Visual showcase of SlushUp experiences
- **Call-to-Action**: Strong conversion-focused section
- **Footer**: Clean, minimal branding and links

## Tech Stack

- **Framework**: React 19 with Functional Components
- **Language**: TypeScript 5.9
- **Build Tool**: Vite (with rolldown-vite)
- **Transpiler**: SWC (`@vitejs/plugin-react-swc`)
- **Styling**: Tailwind CSS (with `@tailwindcss/postcss`)
- **Linting & Formatting**: Biome 2.3.11
- **Git Hooks**: Husky (pre-commit runs `npm run format`)

## Project Structure

```
src/
├── components/           # Reusable page sections
│   ├── Hero.tsx
│   ├── Services.tsx
│   ├── Audience.tsx
│   ├── Premium.tsx
│   ├── Gallery.tsx
│   ├── CallToAction.tsx
│   ├── Footer.tsx
│   └── index.ts         # Component exports
├── utils/
│   └── assetRouter.ts   # Asset mapping for easy updates
├── App.tsx              # Main application component
├── App.css              # Tailwind directives
├── index.css            # Global styles
└── main.tsx             # Entry point

public/                   # Assets (images, videos)
├── bar-image.jpeg
├── bar-image-2.jpeg
├── bar-image-with-people.jpeg
├── bar-video-short.mp4
├── drink-image-red.mp4
└── ... (other assets)

tailwind.config.js        # Tailwind configuration
biome.json               # Biome linting & formatting config
postcss.config.js        # PostCSS configuration
```

## Asset Router

Assets are managed through a centralized **asset router** at `src/utils/assetRouter.ts`. This provides a single source of truth for all asset paths, making updates simple:

```typescript
import { getAsset } from "../utils/assetRouter";

// Usage in components
<video src={getAsset("barVideoShort")} />
```

When assets are renamed or moved, only update the router—components remain unchanged.

## Getting Started

### Installation

```bash
npm install
```

### Development

Start the development server with hot module replacement (HMR):

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

### Building

Build the application for production:

```bash
npm run build
```

The optimized build will be output to the `dist/` folder.

### Linting & Formatting

Check for lint and formatting issues:

```bash
npm run lint
```

Automatically format code:

```bash
npm run format
```

**Note**: The pre-commit hook automatically runs `npm run format` before each commit, ensuring code is always formatted.

## Brand Colors

Custom SlushUp brand colors are defined in `tailwind.config.js`:

- **`slushup-green`**: `#2D7F4F` - Primary brand color
- **`slushup-green-light`**: `#4A9F6F` - Hover/accent state
- **`slushup-cream`**: `#F5F1E8` - Light background
- **`slushup-cream-dark`**: `#E8E3D8` - Subtle contrast

## Key Features

### Responsive Design
- Mobile-first layouts
- Generous spacing and readable typography
- Touch-friendly CTAs

### Accessibility
- Semantic HTML
- Button types (`type="button"`) for proper a11y
- High color contrast
- Proper heading hierarchy

### Clean Code
- No unused imports
- No commented-out code
- No console logs
- Consistent formatting via Biome
- Functional components only

### Performance
- Optimized CSS bundle (~3KB gzipped)
- Efficient component composition
- No heavy animation libraries
- Fast build times with Vite

## Husky Pre-Commit Hooks

This project uses Husky to automatically format code before commits. The pre-commit hook runs:

```bash
npm run format
```

If the format command fails, the commit will be rejected. Fix formatting issues and try again.

## Maintenance Notes

- **Assets**: Update paths only in `src/utils/assetRouter.ts`
- **Colors**: Modify brand colors in `tailwind.config.js` to update globally
- **Content**: Edit component files directly; all content is static
- **Linting**: Run `npm run lint` before pushing to catch issues early

## Future Considerations

This project is intentionally **static and low-debt**:
- No state management needed
- No backend integration
- No dynamic data fetching
- Focuses on visual presentation and user experience

If dynamic features are needed in the future (e.g., form submissions, blog posts), they should be added as isolated features without changing the core landing page architecture.
