import { test, expect } from '@playwright/test';
import { readFile } from 'node:fs/promises';

test('production hydration, cards, mobile navigation and simulated form submission', async ({ page }) => {
 const errors: string[] = [];
 page.on('pageerror', error => errors.push(error.message));
 await page.goto('/');
 await expect(page.locator('h1')).toHaveCount(1);
 await expect(page.locator('#nodrah-pattern-waves canvas')).toHaveCount(1);
 await expect(page.locator('link[rel=canonical]')).toHaveAttribute('href', 'https://nodrah.com.br/');
 await page.locator('#processo').scrollIntoViewIfNeeded();
 await expect(page.locator('#process-depth-carousel')).toHaveAttribute('data-depth-ready', 'true');
 const cards = page.locator('.depth-carousel__card');
 await cards.first().focus(); await page.keyboard.press('ArrowRight');
 await expect(cards.nth(1)).toHaveAttribute('aria-current', 'step');
 await page.locator('#project-name').fill('Teste local');
 await page.locator('#project-email').fill('teste@example.com');
 await page.locator('#project-description').fill('Validação local com envio simulado.');
 expect(await page.locator('#project-type').evaluate((node: HTMLSelectElement) => node.validity.valid)).toBe(false);
 await page.locator('#project-type').selectOption({ label: 'Site institucional' });
 await page.route('http://127.0.0.1:4175/', route => route.request().method() === 'POST' ? route.fulfill({ status: 200, body: 'ok' }) : route.continue());
 await page.locator('#project-form button[type=submit]').click();
 await expect(page.locator('#project-form-note')).toContainText('Projeto enviado');
 await page.setViewportSize({ width: 390, height: 844 });
 await page.evaluate(() => scrollTo(0, 0));
 await page.locator('.nodrah-menu-toggle').click();
 await expect(page.locator('.nodrah-menu-toggle')).toHaveAttribute('aria-expanded', 'true');
 await page.keyboard.press('Escape');
 await expect(page.locator('.nodrah-menu-toggle')).toHaveAttribute('aria-expanded', 'false');
 expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false);
 expect(errors).toEqual([]);
});

test('public routes and untouched independent documents', async ({ request, browser }) => {
 for (const route of ['/nutricionistas/', '/privacidade/', '/projetos/veiculos/', '/projetos/energia-solar/', '/robots.txt', '/sitemap.xml']) {
  expect((await request.get(route)).status()).toBe(200);
 }
 for (const file of ['nutricionistas/index.html', 'privacidade/index.html', 'robots.txt', 'sitemap.xml']) {
  expect(await readFile(`dist/${file}`)).toEqual(await readFile(file));
 }
 const context = await browser.newContext({ javaScriptEnabled: false });
 const page = await context.newPage(); await page.goto('http://127.0.0.1:4175/');
 await expect(page.locator('h1')).toHaveText('Tecnologia acimae além do convencional');
 await expect(page.locator('#solucoes .service-card')).toHaveCount(5);
 await expect(page.locator('#project-form')).toBeVisible();
 await context.close();
});

test('reduced motion keeps the hero available without WebGL', async ({ page }) => {
 await page.emulateMedia({ reducedMotion: 'reduce' });
 await page.goto('/');
 await expect(page.locator('h1')).toBeVisible();
 await expect(page.locator('#nodrah-pattern-waves canvas')).toHaveCount(0);
});

test('brand loading fills the wordmark and reaches 100 before revealing the site', async ({ page }) => {
 await page.route('https://fonts.googleapis.com/**', route => route.fulfill({ contentType: 'text/css', body: '' }));
 await page.route('**/static/PatternWaves-*.js', async route => {
  await new Promise(resolve => setTimeout(resolve, 1400));
  await route.continue();
 });
 await page.goto('/', { waitUntil: 'domcontentloaded' });
 const progress = page.getByRole('progressbar', { name: 'Carregando Nodrah' });
 await expect(progress).toBeVisible();
 await expect(page.locator('.brand-loader-wordmark')).toHaveText('NODRAHNODRAH');
 await expect.poll(async () => Number(await progress.getAttribute('aria-valuenow'))).toBeGreaterThan(0);
 await expect(progress).toHaveAttribute('aria-valuenow', '100', { timeout: 4000 });
 await expect(page.locator('.brand-loader-fill')).toHaveAttribute('style', /inset\(0% 0(px)? 0(px)?\)/);
 await expect(page.locator('.brand-loader')).toHaveCount(0);
 await expect(page.locator('h1')).toBeVisible();
});

test('brand loading can be skipped and restores focus', async ({ page }) => {
 await page.goto('/', { waitUntil: 'domcontentloaded' });
 await page.getByRole('button', { name: 'Pular abertura' }).click();
 await expect(page.locator('.brand-loader')).toHaveCount(0);
 await expect(page.locator('#inicio')).toBeFocused();
});

test('portfolio uses a responsive 2 by 2 grid with four published projects', async ({ page }) => {
 await page.emulateMedia({ reducedMotion: 'reduce' });
 await page.setViewportSize({ width: 1440, height: 1000 });
 await page.goto('/#portfolio');
 const cards = page.locator('#portfolio .projeto');
 await expect(cards).toHaveCount(4);
 const urls = ['https://www.sphereyachts.com.br/', 'https://byd-zeta-amber.vercel.app/', 'https://maryane.vercel.app/', 'https://thais-hazel.vercel.app/'];
 for (const [index, url] of urls.entries()) {
  await expect(cards.nth(index).locator('.project-preview')).toHaveAttribute('href', url);
  await expect(cards.nth(index).locator('.project-button')).toHaveAttribute('target', '_blank');
 }
 const positions = await cards.evaluateAll(nodes => nodes.map(node => { const rect = node.getBoundingClientRect(); return { top: rect.top, left: rect.left }; }));
 expect(Math.abs(positions[0].top - positions[1].top)).toBeLessThan(2);
 expect(Math.abs(positions[2].top - positions[3].top)).toBeLessThan(2);
 expect(positions[1].left).toBeGreaterThan(positions[0].left);
 expect(positions[2].top).toBeGreaterThan(positions[0].top);
 await expect(page.locator('#portfolio video[src]')).toHaveCount(0);
 await page.setViewportSize({ width: 390, height: 844 });
 const mobile = await cards.evaluateAll(nodes => nodes.map(node => ({ top: node.getBoundingClientRect().top, left: node.getBoundingClientRect().left })));
 expect(Math.abs(mobile[0].left - mobile[1].left)).toBeLessThan(2);
 expect(mobile[1].top).toBeGreaterThan(mobile[0].top);
 expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false);
});

test('project previews play only while visible and cards highlight on hover', async ({ page }) => {
 const errors: string[] = [];
 page.on('pageerror', error => errors.push(error.message));
 await page.setViewportSize({ width: 1440, height: 1000 });
 await page.goto('/#portfolio');
 const card = page.locator('#portfolio .projeto').first();
 await card.scrollIntoViewIfNeeded();
 const video = card.locator('video');
 await expect.poll(() => video.evaluate((node: HTMLVideoElement) => node.currentTime)).toBeGreaterThan(0.3);
 expect(await video.evaluate((node: HTMLVideoElement) => node.muted && node.loop && !node.paused)).toBe(true);
 await card.hover({ position: { x: 400, y: 90 } });
 await expect.poll(() => card.evaluate(node => getComputedStyle(node).transform)).not.toBe('none');
 await page.locator('#contato').scrollIntoViewIfNeeded();
 await expect.poll(() => video.evaluate((node: HTMLVideoElement) => node.paused)).toBe(true);
 expect(errors).toEqual([]);
});

test('transparent header changes contrast only while text overlaps a light surface', async ({ page }) => {
 await page.emulateMedia({ reducedMotion: 'reduce' });
 await page.goto('/#inicio');
 const header = page.locator('.site-header');
 const link = header.locator('a[href="#solucoes"]');
 expect(await header.evaluate(node => getComputedStyle(node).backgroundColor)).toBe('rgba(0, 0, 0, 0)');
 expect(await header.evaluate(node => getComputedStyle(node, '::before').content)).toBe('none');
 const scrollPortfolioTo = async (viewportTop: number) => {
  await page.locator('#portfolio').evaluate((node, y) => scrollTo({ top: node.getBoundingClientRect().top + scrollY - y, behavior: 'instant' }), viewportTop);
 };
 await scrollPortfolioTo(80);
 await expect(link).toHaveAttribute('data-contrast', 'light');
 await scrollPortfolioTo(25);
 await expect(link).toHaveAttribute('data-contrast', 'dark');
 await scrollPortfolioTo(80);
 await expect(link).toHaveAttribute('data-contrast', 'light');
 await page.locator('#pacotes .bespoke-surface').evaluate(node => scrollTo({ top: node.getBoundingClientRect().top + scrollY + 30, behavior: 'instant' }));
 await expect(link).toHaveAttribute('data-contrast', 'dark');
 await page.locator('#perguntas').evaluate(node => scrollTo({ top: node.getBoundingClientRect().top + scrollY, behavior: 'instant' }));
 await expect(link).toHaveAttribute('data-contrast', 'light');
 await page.setViewportSize({ width: 390, height: 844 });
 await scrollPortfolioTo(0);
 await expect(page.locator('.nodrah-menu-toggle')).toHaveAttribute('data-contrast', 'dark');
 await page.locator('.nodrah-menu-toggle').click();
 await expect(link).toHaveAttribute('data-contrast', 'dark');
});

test('nutrition landing shares the live hero and preserves form steps and mobile layout', async ({ page }) => {
 const errors: string[] = [];
 page.on('pageerror', error => errors.push(error.message));
 await page.goto('/nutricionistas/');
 const canvas = page.locator('#nodrah-pattern-waves canvas');
 await expect(canvas).toHaveCount(1);
 await expect(page.locator('.hero-video')).toHaveCount(0);
 await expect(page.locator('#lead-form')).toHaveAttribute('name', 'nodrah-nutricionistas');
 await page.getByLabel('Indicações', { exact: true }).check();
 await page.getByLabel('Instagram e conteúdo', { exact: true }).check();
 await page.locator('#next-step').click();
 await expect(page.locator('#step-count')).toHaveText('Etapa 2 de 6');
 await page.locator('#previous-step').click();
 await expect(page.getByLabel('Indicações', { exact: true })).toBeChecked();
 await expect(page.getByLabel('Instagram e conteúdo', { exact: true })).toBeChecked();
 await page.setViewportSize({ width: 390, height: 844 });
 expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false);
 await page.locator('.nodrah-menu-toggle').click();
 await expect(page.locator('#landing-navigation')).toBeVisible();
 await page.keyboard.press('Escape');
 await expect(page.locator('#landing-navigation')).toBeHidden();
 await canvas.evaluate(node => node.dispatchEvent(new Event('webglcontextlost', { bubbles: true, cancelable: true })));
 await expect(canvas).toHaveCount(0);
 await expect(page.locator('#next-step')).toBeVisible();
 expect(errors).toEqual([]);
});
