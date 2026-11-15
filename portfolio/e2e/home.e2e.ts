import { expect, test } from '@playwright/test';

test('home page renders and uses self-hosted fonts only', async ({ page }) => {
	const requests: string[] = [];
	page.on('request', (request) => requests.push(request.url()));

	await page.goto('/');
	await expect(page.getByRole('heading', { name: /people love/ })).toBeVisible();
	await expect(page.getByRole('heading', { name: /Building apps with purpose/ })).toBeVisible();
	await expect(page.getByRole('heading', { name: /Services I provide/ })).toBeVisible();
	await expect(page.getByRole('heading', { name: /Selected Work/ })).toBeVisible();

	const fontsLoaded = await page.evaluate(async () => {
		await document.fonts.ready;
		return {
			inter: document.fonts.check('16px "Inter Variable"'),
			jakarta: document.fonts.check('16px "Plus Jakarta Sans Variable"')
		};
	});
	expect(fontsLoaded.inter).toBe(true);
	expect(fontsLoaded.jakarta).toBe(true);
	expect(
		requests.some(
			(url) => url.includes('fonts.googleapis.com') || url.includes('fonts.gstatic.com')
		)
	).toBe(false);
});
