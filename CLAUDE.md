# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is **XiaoChai Blog** - a modern Astro-based personal blog featuring:
- Astro 5.7+ with React components and TypeScript
- Content Collections (blog posts, authors, projects) with MDX support
- Tailwind CSS 4.x with custom design system
- Expressive Code for syntax highlighting with Material Theme Palenight
- KaTeX for math rendering
- Giscus comments integration
- Vercel deployment ready

## Development Commands

```bash
# Start development server (port 1234)
npm run dev

# Build for production (includes Astro type checking)
npm run build

# Preview production build locally
npm run preview

# Format all code with Prettier
npm run prettier
```

## Code Architecture

### Directory Structure

```
src/
├── components/          # Astro and React components
│   ├── ui/             # Reusable UI components (shadcn/ui style)
│   ├── *.astro         # Page sections (Header, Footer, TOC, etc.)
│   └── Giscus.astro    # Comment system
├── content/            # Astro Content Collections
│   ├── blog/          # Blog posts (MD/MDX files)
│   ├── authors/       # Author profiles
│   └── projects/      # Project showcases
├── layouts/
│   └── Layout.astro   # Base layout with header/footer
├── lib/
│   ├── utils.ts       # Utility functions (cn, etc.)
│   └── data-utils.ts  # Content fetching helpers
├── pages/             # Astro file-based routing
│   ├── blog/         # Blog index and post pages
│   ├── tags/         # Tag-based filtering
│   ├── about.astro   # About page
│   ├── index.astro   # Homepage
│   ├── rss.xml.ts    # RSS feed
│   └── robots.txt.ts # SEO
├── styles/
│   ├── global.css    # Tailwind base
│   └── typography.css # Custom typography
├── consts.ts         # Site configuration
├── types.ts          # TypeScript type definitions
└── content.config.ts # Content collections schema
```

### Key Files

- **astro.config.ts**: Astro configuration with MDX, React, Sitemap, expressive-code, Tailwind, and KaTeX
- **src/layouts/Layout.astro**: Base HTML layout with sticky navigation, header, footer, and slot system
- **src/consts.ts**: Site metadata (title, description, navigation links, social links)
- **src/content.config.ts**: Content collections schema definitions for blog, authors, and projects

### Content Collections

The blog uses Astro Content Collections for type-safe content management:

1. **blog** (`src/content/blog/`): Markdown/MDX posts with frontmatter
   - Fields: title, description, date, order, image, tags, authors, draft
   - Example: `src/content/blog/the_person_looks_promising/`

2. **authors** (`src/content/authors/`): Author profiles
   - Fields: name, pronouns, avatar, bio, mail, website, twitter, github, linkedin, discord

3. **projects** (`src/content/projects/`): Project showcases
   - Fields: name, description, tags, image, link, startDate, endDate

### Component System

- **UI Components** (`src/components/ui/`): Built with Radix UI primitives, styled with Tailwind
  - button.tsx, badge.tsx, avatar.tsx, dropdown-menu.tsx, etc.
  - Uses `class-variance-authority` and `clsx` for variant management

- **Page Components** (`.astro`): Astro components for page sections
  - Header, Footer, TOC, BlogCard, AuthorCard, ThemeToggle, etc.
  - Giscus component for comments (conditionally rendered)

### Styling

- **Tailwind CSS 4.x** with `@tailwindcss/vite` plugin
- Custom CSS variables for fonts (--font-sans, --font-mono)
- Typography system in `src/styles/typography.css`
- Expressive Code styles integrated via astro.config.ts

### Routing

Astro uses file-based routing:
- Static pages: `pages/about.astro` → `/about`
- Blog posts: `pages/blog/[...slug].astro` dynamic routing
- Tag pages: `pages/tags/[tag]/[...page].astro` nested dynamic routing

### Server Configuration

From `astro.config.ts`:
- Development server: port 1234, host enabled
- DevToolbar: disabled
- Site URL: `https://astro-erudite.vercel.app`

## Development Notes

### Math and Code Blocks

- **KaTeX**: Configured via rehype-katex with CDN stylesheet
- **Expressive Code**: Material Theme Palenight, code wrapping enabled, custom copy icon
- **remark-math** and **remark-emoji** for Markdown enhancements

### SEO and Meta

- Sitemap integration via `@astrojs/sitemap`
- RSS feed at `/rss.xml`
- Robots.txt at `/robots.txt`
- External links automatically get `nofollow`, `noreferrer`, `noopener`

### Dependencies

Key packages:
- **@astrojs/mdx**: MDX support
- **@astrojs/react**: React integration
- **radix-ui**: Unstyled UI primitives
- **astro-icon**: Icon system (Lucide icons)
- **astro-expressive-code**: Code block styling
- **rehype-katex**: Math rendering
- **patch-package**: Post-install patching

### Type Checking

The build command runs `astro check` before building to ensure type safety. TypeScript configuration is in `tsconfig.json`.

## Working with Content

### Adding a Blog Post

1. Create MD/MDX file in `src/content/blog/`
2. Add frontmatter with required fields from schema
3. Use `getCollection('blog')` to fetch posts programmatically

### Adding an Author

1. Create MD/MDX file in `src/content/authors/`
2. Add author data to frontmatter
3. Reference author in blog post frontmatter

### Modifying Layout

- Update `src/layouts/Layout.astro` for global changes
- Individual page layouts can extend Layout.astro

## Deployment

Configured for Vercel deployment. Set `site` in astro.config.ts to production URL.
