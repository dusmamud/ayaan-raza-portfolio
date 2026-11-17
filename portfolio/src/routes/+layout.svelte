<script lang="ts">
	import { afterNavigate, onNavigate } from '$app/navigation';
	import '@fontsource-variable/inter';
	import '@fontsource-variable/plus-jakarta-sans';
	import './layout.css';
	import Header from '#lib/components/layout/Header.svelte';
	import Footer from '#lib/components/layout/Footer.svelte';
	import CustomCursor from '#lib/components/ui/CustomCursor.svelte';
	import ScrollProgress from '#lib/components/ui/ScrollProgress.svelte';
	import { site } from '#lib/data/site';

	let { children } = $props();

	// Page transitions: wrap navigations in a View Transition so pages
	// fade and rise instead of hard-cutting. Skipped when the API is
	// missing or the user prefers reduced motion — then navigation
	// behaves exactly as before.
	type ViewTransitionDocument = Document & {
		startViewTransition?: (update: () => Promise<void> | void) => {
			ready: Promise<void>;
		};
	};

	onNavigate((navigation) => {
		const doc = document as ViewTransitionDocument;
		if (!doc.startViewTransition) return;
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		return new Promise<void>((resolve) => {
			doc.startViewTransition?.(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});

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
<ScrollProgress />
<Header />
<main id="content">
	{@render children()}
</main>
<Footer />
<CustomCursor />
