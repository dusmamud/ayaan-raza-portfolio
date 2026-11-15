<script lang="ts">
	import { Check, Link2, Share2 } from '@lucide/svelte';

	let { url, title }: { url: string; title: string } = $props();

	let copied = $state(false);

	const encodedUrl = $derived(encodeURIComponent(url));
	const encodedTitle = $derived(encodeURIComponent(title));

	async function copyLink() {
		try {
			await navigator.clipboard.writeText(url);
			copied = true;
			setTimeout(() => {
				copied = false;
			}, 2000);
		} catch {
			copied = false;
		}
	}

	const pillClass =
		'inline-flex items-center gap-1.5 rounded-full border border-ink/10 bg-card px-3.5 py-1.5 text-sm font-bold text-ink shadow-sm transition-colors hover:border-accent-darker hover:text-accent-darker';
</script>

<div class="flex flex-wrap items-center gap-2.5">
	<span class="inline-flex items-center gap-1.5 text-sm font-bold text-ink">
		<Share2 size={16} aria-hidden="true" /> Share
	</span>
	<a
		href="https://twitter.com/intent/tweet?text={encodedTitle}&url={encodedUrl}"
		target="_blank"
		rel="noopener noreferrer"
		class={pillClass}
	>
		X
	</a>
	<a
		href="https://www.linkedin.com/sharing/share-offsite/?url={encodedUrl}"
		target="_blank"
		rel="noopener noreferrer"
		class={pillClass}
	>
		LinkedIn
	</a>
	<button type="button" onclick={copyLink} class={pillClass}>
		{#if copied}
			<Check size={16} aria-hidden="true" /> Copied!
		{:else}
			<Link2 size={16} aria-hidden="true" /> Copy link
		{/if}
	</button>
</div>
