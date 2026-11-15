import { expect, test } from '@playwright/test';

test.use({ viewport: { width: 390, height: 844 } });

test('mobile menu opens, closes with Escape, and navigates', async ({ page }) => {
	await page.goto('/');

	const openButton = page.getByRole('button', { name: 'Open menu' });
	await expect(openButton).toBeVisible();
	await openButton.click();

	const menu = page.locator('#mobile-menu');
	await expect(menu).toBeVisible();
	await expect(menu.getByRole('link', { name: 'Services' })).toBeVisible();

	await page.keyboard.press('Escape');
	await expect(menu).toBeHidden();
	await expect(page.getByRole('button', { name: 'Open menu' })).toBeFocused();

	await page.getByRole('button', { name: 'Open menu' }).click();
	await expect(menu).toBeVisible();
	await menu.getByRole('link', { name: 'About' }).click();
	await expect(page).toHaveURL(/#about$/);
	await expect(menu).toBeHidden();
});
