import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://redfoxius.github.io',
  trailingSlash: 'ignore',
  markdown: {
    syntaxHighlight: { type: 'shiki', excludeLangs: ['mermaid'] },
    shikiConfig: { themes: { light: 'github-light', dark: 'github-dark' } },
  },
});
