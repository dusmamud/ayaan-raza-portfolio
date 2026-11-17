<script lang="ts">
	import { ArrowRight } from '@lucide/svelte';
	import type { Service, TintName } from '#lib/schemas/service';
	import { spotlight } from '#lib/actions/spotlight';
	import { cn } from '#lib/utils/cn';
	import Icon from './Icon.svelte';

	let { service }: { service: Service } = $props();

	const tints: Record<TintName, string> = {
		'icon-lavender': 'bg-icon-lavender',
		'icon-pink': 'bg-icon-pink',
		'icon-yellow': 'bg-icon-yellow',
		'icon-green': 'bg-icon-green'
	};
</script>

<article
	use:spotlight
	class="spotlight rounded-2xl bg-card p-6 shadow-sm transition-all duration-300 motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-md"
>
	<span class={cn('inline-flex rounded-xl p-3 text-ink', tints[service.tint])}>
		<Icon name={service.icon} size={24} />
	</span>
	<h3 class="mt-4 font-display text-lg font-bold text-ink">{service.title}</h3>
	<p class="mt-2 text-sm leading-relaxed text-body">{service.description}</p>
	<a
		href={service.href}
		class="group/link mt-4 inline-flex items-center gap-1 py-1 text-sm font-bold text-accent-darker hover:text-accent-dark"
	>
		Read more
		<ArrowRight
			size={16}
			aria-hidden="true"
			class="motion-safe:transition-transform motion-safe:group-hover/link:translate-x-0.5"
		/>
	</a>
</article>
