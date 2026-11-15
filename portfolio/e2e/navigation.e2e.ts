import { expect, test } from '@playwright/test';

test('projects list links to a case study and back', async ({ page }) => {
	await page.goto('/projects');
	await expect(page.getByRole('heading', { name: 'All Projects' })).toBeVisible();
	await page.getByRole('link', { name: 'Foodly' }).first().click();
	await expect(page).toHaveURL(/\/projects\/foodly$/);
	await expect(page.getByRole('heading', { name: 'Foodly' })).toBeVisible();
	await expect(page.getByRole('heading', { name: 'The challenge' })).toBeVisible();
	await page.getByRole('link', { name: 'All Projects' }).click();
	await expect(page).toHaveURL(/\/projects$/);
});

test('blog index links to a post and back', async ({ page }) => {
	await page.goto('/blog');
	await expect(page.getByRole('heading', { name: 'Notes & ideas' })).toBeVisible();
	await page.getByRole('link', { name: 'Designing mobile-first portfolios' }).first().click();
	await expect(page).toHaveURL(/\/blog\/mobile-first-portfolios$/);
	await expect(
		page.getByRole('heading', { name: 'Designing mobile-first portfolios' })
	).toBeVisible();
	await page.getByRole('link', { name: 'All posts' }).click();
	await expect(page).toHaveURL(/\/blog$/);
});

test('contact form validates and shows the demo success state', async ({ page }) => {
	await page.goto('/contact');
	await page.getByRole('button', { name: 'Send message' }).click();
	await expect(page.getByText('Name must be at least 2 characters')).toBeVisible();
	await expect(page.getByText('Enter a valid email address')).toBeVisible();
	await expect(page.getByText('Message must be at least 10 characters')).toBeVisible();

	await page.getByLabel('Name', { exact: true }).fill('Test Person');
	await page.getByLabel('Email', { exact: true }).fill('test@example.com');
	await page.getByLabel('Message', { exact: true }).fill('Hello, this is a demo message.');
	await page.getByRole('button', { name: 'Send message' }).click();
	await expect(page.getByRole('heading', { name: 'Thanks, Test Person!' })).toBeVisible();
	await expect(page.locator('main')).toContainText("wasn't sent anywhere");
});
