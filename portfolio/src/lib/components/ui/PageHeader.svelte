<script lang="ts">
	let { eyebrow, title, description }: { eyebrow?: string; title: string; description?: string } =
		$props();
</script>

<div class="max-w-3xl">
	{#if eyebrow}
		<p class="font-display text-sm font-bold tracking-wide text-accent uppercase">{eyebrow}</p>
	{/if}
	<h1
		class="mt-2 font-display text-[clamp(2rem,5vw,3rem)] leading-tight font-extrabold tracking-tight text-ink"
	>
		{title}
	</h1>
	{#if description}
		<p class="mt-3 leading-relaxed text-body">{description}</p>
	{/if}
</div>
