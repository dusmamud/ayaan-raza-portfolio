<script lang="ts">
	import { browser } from '$app/env';
	import { Moon, Sun } from '@lucide/svelte';

	// The .dark class is set before first paint by the inline script in
	// app.html, so the initial state is read straight from the document.
	let dark = $state(browser && document.documentElement.classList.contains('dark'));

	function toggle() {
		dark = !dark;
		document.documentElement.classList.toggle('dark', dark);
		localStorage.setItem('theme', dark ? 'dark' : 'light');
		document
			.querySelector('meta[name="theme-color"]')
			?.setAttribute('content', dark ? '#12102b' : '#fff7f1');
	}
</script>

<button
	type="button"
	onclick={toggle}
	aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
	class="inline-flex h-10 w-10 items-center justify-center rounded-full text-ink hover:bg-ink/5"
>
	{#if dark}
		<Sun size={20} aria-hidden="true" />
	{:else}
		<Moon size={20} aria-hidden="true" />
	{/if}
</button>
