/**
 * Magnetic pull action. While the cursor moves over the element, the
 * element drifts toward it (a fraction of the offset from center); on
 * leave it springs back. Direct follow while moving, spring on leave —
 * the inline transition is cleared after the spring so the element's
 * own transitions (e.g. Button's color fades) keep working. No-op on
 * touch devices and for reduced-motion users.
 */
export function magnetic(node: HTMLElement, enabled = true) {
	let active = enabled;
	const usable =
		window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
		!window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	function onMove(e: MouseEvent) {
		if (!active || !usable) return;
		const rect = node.getBoundingClientRect();
		const x = e.clientX - (rect.left + rect.width / 2);
		const y = e.clientY - (rect.top + rect.height / 2);
		const tx = Math.max(-12, Math.min(12, x * 0.25));
		const ty = Math.max(-10, Math.min(10, y * 0.25));
		node.style.transform = `translate(${tx}px, ${ty}px)`;
	}

	function onLeave() {
		if (!usable) return;
		node.style.transition = 'transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)';
		node.style.transform = '';
		const clear = () => {
			node.style.transition = '';
			node.removeEventListener('transitionend', clear);
		};
		node.addEventListener('transitionend', clear);
	}

	node.addEventListener('mousemove', onMove);
	node.addEventListener('mouseleave', onLeave);

	return {
		update(next: boolean) {
			active = next;
			if (!next) node.style.transform = '';
		},
		destroy() {
			node.removeEventListener('mousemove', onMove);
			node.removeEventListener('mouseleave', onLeave);
			node.style.transition = '';
			node.style.transform = '';
		}
	};
}
