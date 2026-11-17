/**
 * Subtle scroll parallax action. The element drifts a few pixels
 * against the scroll direction, capped so it never escapes its
 * section. rAF-throttled, passive listeners, and fully off for
 * reduced-motion users. Apply it to a wrapper that carries no other
 * transform (no reveal, no entrance animation) so nothing fights.
 */
export function parallax(node: HTMLElement, speed = 0.06) {
	if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return {};

	let raf = 0;
	let ticking = false;

	function update() {
		ticking = false;
		const rect = node.getBoundingClientRect();
		const centerOffset = window.innerHeight / 2 - (rect.top + rect.height / 2);
		const shift = Math.max(-30, Math.min(30, centerOffset * speed));
		node.style.transform = `translate3d(0, ${shift.toFixed(1)}px, 0)`;
	}

	function onScroll() {
		if (ticking) return;
		ticking = true;
		raf = requestAnimationFrame(update);
	}

	update();
	window.addEventListener('scroll', onScroll, { passive: true });
	window.addEventListener('resize', onScroll);

	return {
		destroy() {
			window.removeEventListener('scroll', onScroll);
			window.removeEventListener('resize', onScroll);
			cancelAnimationFrame(raf);
			node.style.transform = '';
		}
	};
}
