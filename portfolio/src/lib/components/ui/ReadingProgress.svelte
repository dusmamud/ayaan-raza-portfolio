<script lang="ts">
	let progress = $state(0);

	$effect(() => {
		function onScroll() {
			const el = document.documentElement;
			const max = el.scrollHeight - el.clientHeight;
			progress = max > 0 ? Math.min(100, (el.scrollTop / max) * 100) : 0;
		}
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	});
</script>

<div class="fixed inset-x-0 top-0 z-[60] h-1 bg-ink/5" aria-hidden="true">
	<div class="h-full bg-accent transition-[width] duration-100" style="width: {progress}%"></div>
</div>
