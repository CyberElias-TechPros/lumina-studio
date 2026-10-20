import { test, expect } from '@playwright/test';
import { createServer, type Server } from 'node:http';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
let server: Server;
let origin: string;
test.beforeAll(async () => {
  const dir = resolve('apps/android/android/app/src/main/assets/reader');
  server = createServer(async (req, res) => {
    const name = (req.url || '/').split('?')[0].slice(1) || 'index.html';
    if (!['index.html', 'reader.js', 'reader.css', 'lessons.json'].includes(name)) { res.writeHead(404).end(); return; }
    try { const data = await readFile(resolve(dir, name)); res.setHeader('Content-Type', name.endsWith('.js') ? 'text/javascript' : name.endsWith('.css') ? 'text/css' : name.endsWith('.json') ? 'application/json' : 'text/html'); res.end(data); }
    catch { res.writeHead(500).end(); }
  });
  await new Promise<void>(r => server.listen(0, '127.0.0.1', r));
  const address = server.address();
  if (!address || typeof address === 'string') throw new Error('No reader server');
  origin = `http://127.0.0.1:${address.port}`;
});
test.afterAll(async () => { await new Promise<void>(r => server.close(() => r())); });
test('bundled public lessons support search, progress, larger text and resume without external requests', async ({ page }) => {
  const external: string[] = [];
  await page.route('**/*', route => {
    if (!route.request().url().startsWith(origin + '/')) { external.push(route.request().url()); return route.abort(); }
    return route.continue();
  });
  await page.goto(origin);
  await expect(page.locator('#results button')).toHaveCount(210);
  await page.getByLabel('Find a lesson').fill('sitting down');
  await page.locator('#results button').first().click();
  await expect(page.locator('#title')).toBeFocused();
  await expect(page.locator('#body')).toContainText('Madam Grace');
  await page.getByRole('button', { name: 'Mark as read', exact: true }).click();
  await expect(page.getByRole('status').filter({ hasText: 'Marked as read' })).toBeVisible();
  await page.getByLabel('Text size').selectOption('26');
  await page.reload();
  await expect(page.getByLabel('Text size')).toHaveValue('26');
  await expect(page.locator('#title')).toContainText('Sitting down');
  await page.getByRole('button', { name: 'All lessons', exact: true }).click();
  await expect(page.locator('#results button').first()).toContainText('— read');
  await page.getByRole('button', { name: 'Continue reading' }).click();
  await expect(page.locator('#title')).toContainText('Sitting down');
  expect(external).toEqual([]);
});
