/**
 * Scroll-reveal action. Adds the hidden state only when JS runs, so
 * content stays visible with no JS. Respects prefers-reduced-motion.
 * The visible state is added once, when the element scrolls into view.
 */
export function reveal(node: HTMLElement, options: { delay?: number } = {}) {
	if (options.delay) {
		node.style.setProperty('--reveal-delay', `${options.delay}ms`);
	}
	node.classList.add('reveal-init');

	const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	if (reduceMotion) {
		node.classList.add('reveal-visible');
		return {};
	}

	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					node.classList.add('reveal-visible');
					observer.disconnect();
				}
			}
		},
		{ threshold: 0.15 }
	);
	observer.observe(node);

	return {
		destroy() {
			observer.disconnect();
		}
	};
}
