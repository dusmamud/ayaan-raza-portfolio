<script lang="ts">
	import { onMount } from 'svelte';

	// Custom cursor: a fast dot plus a slower trailing ring, the standard
	// 2026 portfolio pattern. It only ever activates on a fine pointer
	// (mouse/trackpad) without reduced motion — touch devices and
	// motion-sensitive users always keep the native cursor. Positions are
	// written straight to the DOM inside requestAnimationFrame, never
	// through reactive state, so tracking stays at 60fps.
	//
	// States: the ring grows over links and buttons, turns into a filled
	// label badge over [data-cursor-label] elements, and hides over text
	// fields, where the CSS in layout.css restores the native cursor.

	let dotEl: HTMLDivElement | undefined = $state();
	let ringEl: HTMLDivElement | undefined = $state();
	let enabled = $state(false);
	let label = $state<string | null>(null);
	let hovering = $state(false);
	let overText = $state(false);
	let pressing = $state(false);
	let visible = $state(false);

	const mouse = { x: -100, y: -100 };
	const pos = { dx: -100, dy: -100, rx: -100, ry: -100 };
	let started = false;

	function onMove(e: MouseEvent) {
		mouse.x = e.clientX;
		mouse.y = e.clientY;
		if (!started) {
			// Snap to the first position instead of swooping in from a corner.
			pos.dx = pos.rx = mouse.x;
			pos.dy = pos.ry = mouse.y;
			started = true;
		}
		visible = true;
		const target = e.target as Element | null;
		if (!target?.closest) return;
		// Text fields first: the native I-beam stays, the custom cursor hides.
		if (target.closest('input, textarea, select, [contenteditable="true"]')) {
			label = null;
			hovering = false;
			overText = true;
			return;
		}
		overText = false;
		const labelled = target.closest('[data-cursor-label]');
		label = labelled?.getAttribute('data-cursor-label') ?? null;
		hovering = !label && !!target.closest('a, button, [role="button"], label, summary');
	}

	function onDown() {
		pressing = true;
	}
	function onUp() {
		pressing = false;
	}
	function onLeave() {
		visible = false;
	}
	function onEnter() {
		visible = true;
	}

	onMount(() => {
		const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
		const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (!fine || reduce) return;
		enabled = true;
		document.documentElement.classList.add('has-custom-cursor');
		window.addEventListener('mousemove', onMove, { passive: true });
		window.addEventListener('mousedown', onDown);
		window.addEventListener('mouseup', onUp);
		document.addEventListener('mouseleave', onLeave);
		document.addEventListener('mouseenter', onEnter);
		return () => {
			window.removeEventListener('mousemove', onMove);
			window.removeEventListener('mousedown', onDown);
			window.removeEventListener('mouseup', onUp);
			document.removeEventListener('mouseleave', onLeave);
			document.removeEventListener('mouseenter', onEnter);
			document.documentElement.classList.remove('has-custom-cursor');
		};
	});

	$effect(() => {
		if (!enabled || !dotEl || !ringEl) return;
		const dot = dotEl;
		const ring = ringEl;
		let raf = 0;
		const loop = () => {
			// The dot snaps, the ring lerps behind it for the trailing feel.
			pos.dx += (mouse.x - pos.dx) * 0.6;
			pos.dy += (mouse.y - pos.dy) * 0.6;
			pos.rx += (mouse.x - pos.rx) * 0.16;
			pos.ry += (mouse.y - pos.ry) * 0.16;
			dot.style.transform = `translate3d(${pos.dx}px, ${pos.dy}px, 0)`;
			ring.style.transform = `translate3d(${pos.rx}px, ${pos.ry}px, 0)`;
			raf = requestAnimationFrame(loop);
		};
		raf = requestAnimationFrame(loop);
		return () => cancelAnimationFrame(raf);
	});

	const shown = $derived(visible && !overText);
</script>

{#if enabled}
	<!-- Dot: instant, hides under the label badge. -->
	<div
		bind:this={dotEl}
		aria-hidden="true"
		class="custom-cursor pointer-events-none fixed top-0 left-0 z-[100] will-change-transform"
	>
		<div
			class="h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent transition-all duration-150 {shown &&
			!label
				? 'opacity-100'
				: 'opacity-0'} {pressing ? 'scale-75' : 'scale-100'}"
		></div>
	</div>
	<!-- Ring: trails behind, grows on interactive elements, becomes a
	     filled label badge over [data-cursor-label] elements. -->
	<div
		bind:this={ringEl}
		aria-hidden="true"
		class="custom-cursor pointer-events-none fixed top-0 left-0 z-[100] will-change-transform"
	>
		<div
			class="flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full transition-all duration-200 {label
				? 'h-[76px] w-[76px] border-2 border-accent bg-accent'
				: hovering
					? 'h-12 w-12 border-2 border-accent bg-accent/10'
					: 'h-9 w-9 border-2 border-accent/70 bg-transparent'} {shown
				? 'opacity-100'
				: 'opacity-0'} {pressing && !label ? 'scale-90' : 'scale-100'}"
		>
			{#if label}
				<span class="text-[11px] font-bold tracking-wide text-white uppercase">{label}</span>
			{/if}
		</div>
	</div>
{/if}
