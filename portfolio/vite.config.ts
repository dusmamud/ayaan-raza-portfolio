import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vitest/config';
import { playwright } from '@vitest/browser-playwright';
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit({ adapter: adapter({ fallback: '404.html' }), preprocess: vitePreprocess() })
	],
	build: {
		// Never inline font files: Vite's default 4 KiB limit inlined one
		// tiny @fontsource subset as a data: URI, which the CSP font-src
		// 'self' directive blocks (one console error on every page).
		// Fonts always ship as files; other assets keep the 4 KiB rule.
		assetsInlineLimit: (filePath, content) =>
			filePath.endsWith('.woff2') ? false : content.length < 4096
	},
	test: {
		expect: { requireAssertions: true },
		projects: [
			{
				extends: './vite.config.ts',
				test: {
					name: 'client',
					browser: {
						enabled: true,
						provider: playwright(),
						instances: [{ browser: 'chromium', headless: true }]
					},
					include: ['src/**/*.svelte.{test,spec}.{js,ts}'],
					exclude: ['src/lib/server/**']
				}
			},

			{
				extends: './vite.config.ts',
				test: {
					name: 'server',
					environment: 'node',
					include: ['src/**/*.{test,spec}.{js,ts}'],
					exclude: ['src/**/*.svelte.{test,spec}.{js,ts}']
				}
			}
		]
	}
});
