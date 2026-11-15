/** Calls the callback once, the first time the element scrolls into view. */
export function inview(node: HTMLElement, callback: () => void) {
	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					callback();
					observer.disconnect();
				}
			}
		},
		{ threshold: 0.4 }
	);
	observer.observe(node);

	return {
		destroy() {
			observer.disconnect();
		}
	};
}
