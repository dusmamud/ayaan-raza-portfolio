<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import '@fontsource-variable/inter';
	import '@fontsource-variable/plus-jakarta-sans';
	import './layout.css';
	import Header from '#lib/components/layout/Header.svelte';
	import Footer from '#lib/components/layout/Footer.svelte';
	import { site } from '#lib/data/site';

	let { children } = $props();

	// After navigating to a #hash, move keyboard focus to the target
	// section so keyboard and screen reader users land where sighted
	// users scroll to. Sections carry tabindex="-1" for this.
	afterNavigate(({ to }) => {
		const hash = to?.url.hash;
		if (!hash) return;
		const el = document.getElementById(hash.slice(1));
		if (el) {
			el.setAttribute('tabindex', '-1');
			el.focus({ preventScroll: true });
		}
	});
</script>

<svelte:head>
	<meta property="og:site_name" content="{site.name} — {site.role}" />
	<meta property="og:type" content="website" />
	<meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<a
	href="#content"
	class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:rounded-full focus:bg-footer focus:px-4 focus:py-2 focus:font-bold focus:text-white"
>
	Skip to content
</a>
<Header />
<main id="content">
	{@render children()}
</main>
<Footer />
