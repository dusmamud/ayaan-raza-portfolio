<script lang="ts">
	// Renders one JSON-LD block. The whole tag is injected raw: Svelte
	// does not evaluate expressions inside <script> elements in markup,
	// so a plain {JSON.stringify(...)} there would ship literally and
	// the structured data would be invalid. The closing tag is escaped
	// so it cannot terminate this component <script> block.
	let { data }: { data: Record<string, unknown> } = $props();

	/* eslint-disable no-useless-escape -- \/ keeps the literal closing tag out of this file */
	const tag = $derived(
		`<script type="application/ld+json">${JSON.stringify(data).replaceAll('<', '\\u003c')}<\/script>`
	);
	/* eslint-enable no-useless-escape */
</script>

<!-- eslint-disable-next-line svelte/no-at-html-tags -- tag is built above from static site data, no user input -->
{@html tag}
