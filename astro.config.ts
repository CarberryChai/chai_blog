import { defineConfig } from 'astro/config'

import mdx from '@astrojs/mdx'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import icon from 'astro-icon'

import { rehypeHeadingIds } from '@astrojs/markdown-remark'
import expressiveCode from 'astro-expressive-code'
import { createInlineSvgUrl } from '@expressive-code/core'
import rehypeDocument from 'rehype-document'
import rehypeExternalLinks from 'rehype-external-links'
import rehypeKatex from 'rehype-katex'

import remarkEmoji from 'remark-emoji'
import remarkMath from 'remark-math'

import tailwindcss from '@tailwindcss/vite'

const copyIcon =
  "<svg xmlns='http://www.w3.org/2000/svg' fill='none' stroke='rgba(128,128,128,1)' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' viewBox='0 0 24 24'><rect width='8' height='4' x='8' y='2' rx='1' ry='1'/><path d='M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2'/></svg>"

export default defineConfig({
  site: 'https://astro-erudite.vercel.app',
  integrations: [
    expressiveCode({
      themes: ['material-theme-palenight'],
      defaultProps: {
        wrap: true,
      },
      styleOverrides: {
        codeFontSize: '0.75rem',
        codeFontFamily: 'var(--font-mono)',
        uiFontFamily: 'var(--font-sans)',
        frames: {
          copyIcon: createInlineSvgUrl(copyIcon),
        },
      },
    }),
    mdx(),
    react(),
    sitemap(),
    icon(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  server: {
    port: 1234,
    host: true,
  },
  devToolbar: {
    enabled: false,
  },
  markdown: {
    syntaxHighlight: false,
    rehypePlugins: [
      [
        rehypeDocument,
        {
          css: 'https://cdn.jsdelivr.net/npm/katex@0.16.21/dist/katex.min.css',
        },
      ],
      [
        rehypeExternalLinks,
        {
          target: '_blank',
          rel: ['nofollow', 'noreferrer', 'noopener'],
        },
      ],
      rehypeHeadingIds,
      rehypeKatex,
    ],
    remarkPlugins: [remarkMath, remarkEmoji],
  },
})
