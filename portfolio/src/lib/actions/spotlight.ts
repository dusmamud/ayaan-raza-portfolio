/**
 * Spotlight action. Tracks the cursor inside the element and exposes
 * its position as --mx/--my CSS variables, which the .spotlight rule in
 * layout.css turns into a soft radial glow that follows the mouse. The
 * variables default to the center, so without tracking (touch,
 * reduced motion) the glow simply appears centered on hover.
 */
export function spotlight(node: HTMLElement) {
	const usable =
		window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
		!window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	if (!usable) return {};

	function onMove(e: MouseEvent) {
		const rect = node.getBoundingClientRect();
		node.style.setProperty('--mx', `${e.clientX - rect.left}px`);
		node.style.setProperty('--my', `${e.clientY - rect.top}px`);
	}

	node.addEventListener('mousemove', onMove);
	return {
		destroy() {
			node.removeEventListener('mousemove', onMove);
		}
	};
}
