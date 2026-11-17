<script lang="ts">
	import { onMount } from 'svelte';

	// Thin scroll progress bar pinned to the top of the viewport. The
	// width is written straight to the DOM in a rAF-throttled scroll
	// handler, never through reactive state. It mirrors scroll position
	// (information, not decoration), so it stays under reduced motion.
	let bar: HTMLDivElement | undefined = $state();

	onMount(() => {
		let raf = 0;
		let ticking = false;
		const update = () => {
			ticking = false;
			if (!bar) return;
			const max = document.documentElement.scrollHeight - window.innerHeight;
			const progress = max > 0 ? Math.min(1, window.scrollY / max) : 0;
			bar.style.transform = `scaleX(${progress})`;
		};
		const onScroll = () => {
			if (ticking) return;
			ticking = true;
			raf = requestAnimationFrame(update);
		};
		update();
		window.addEventListener('scroll', onScroll, { passive: true });
		window.addEventListener('resize', onScroll);
		return () => {
			window.removeEventListener('scroll', onScroll);
			window.removeEventListener('resize', onScroll);
			cancelAnimationFrame(raf);
		};
	});
</script>

<div
	bind:this={bar}
	aria-hidden="true"
	class="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-accent"
	style="transform: scaleX(0)"
></div>
