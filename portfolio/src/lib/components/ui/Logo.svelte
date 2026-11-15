<script lang="ts">
	// The "AR." wordmark. Header and footer share this so the logo stays
	// identical everywhere; the standalone asset is static/logo.svg.
	let { light = false }: { light?: boolean } = $props();
</script>

<span
	class="font-display text-[1.5rem] leading-none font-extrabold tracking-tight {light
		? 'text-white'
		: 'text-ink'}"
>
	AR<span class="text-accent">.</span>
</span>
