<script lang="ts">
	// Format waterfall: AVIF first, WebP second, JPG fallback. The
	// browser picks the first <source> type it supports, natively and
	// instantly — no JavaScript, and only one file is downloaded. Each
	// format carries a width-described srcset; `sizes` is repeated on
	// every <source> AND the <img> (the <img> copy is the fallback) and
	// must describe the real rendered slot, measured from the CSS.
	// Sizes on the <img> alone was measured picking the largest
	// variant on desktop (Chromium fell back to 100vw). The <img> carries
	// alt, dimensions and loading attributes and is the universal
	// fallback; its src is the largest JPG. Width variants are
	// generated from the PNG masters by qa/generate-responsive.py;
	// every width exists in all 3 formats. The <picture> wrapper is
	// display:contents so layout behaves exactly as if the <img>
	// stood alone.
	let {
		base,
		alt,
		width,
		height,
		widths,
		sizes,
		loading,
		fetchPriority,
		decoding = 'async',
		class: className = ''
	}: {
		base: string; // path without extension or width, e.g. '/images/hero-illustration'
		alt: string;
		width: number; // largest variant width (aspect-ratio hint)
		height: number;
		widths: number[]; // ascending; last entry is the largest generated width
		sizes: string; // rendered slot, e.g. '(max-width: 1023px) 100vw, 592px'
		loading?: 'lazy' | 'eager';
		fetchPriority?: 'high' | 'low' | 'auto';
		decoding?: 'async' | 'sync' | 'auto';
		class?: string;
	} = $props();

	const srcset = (ext: string) => widths.map((w) => `${base}-${w}.${ext} ${w}w`).join(', ');
	const largest = $derived(widths[widths.length - 1]);
</script>

<picture class="contents">
	<source srcset={srcset('avif')} {sizes} type="image/avif" />
	<source srcset={srcset('webp')} {sizes} type="image/webp" />
	<img
		src="{base}-{largest}.jpg"
		srcset={srcset('jpg')}
		{sizes}
		{alt}
		{width}
		{height}
		{loading}
		fetchpriority={fetchPriority}
		{decoding}
		class={className}
	/>
</picture>
