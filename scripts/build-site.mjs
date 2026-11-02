import { build, createServer } from 'vite';
import { readFile, writeFile, cp } from 'node:fs/promises';
await build();
const server = await createServer({ cacheDir: 'node_modules/.vite/prerender', server: { middlewareMode: true, hmr: false, ws: false }, appType: 'custom' });
try {
  const { render } = await server.ssrLoadModule('/src/entry-server.tsx');
  const template = await readFile('dist/index.html', 'utf8');
  await writeFile('dist/index.html', template.replace('<!--app-html-->', render()));
} finally { await server.close(); }
// Independent pages and their assets are copied byte for byte, without a SPA rewrite.
for (const name of ['assets', 'assets-logo', 'assets-icons', 'assets-preview', 'assets-tech', 'nutricionistas', 'privacidade', 'projetos', 'robots.txt', 'sitemap.xml']) {
  await cp(name, `dist/${name}`, { recursive: true });
}
console.log('Institutional HTML pre-rendered; independent routes preserved.');
