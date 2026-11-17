<script lang="ts">
	import type { Snippet } from 'svelte';
	import { tv, type VariantProps } from 'tailwind-variants';
	import { magnetic } from '#lib/actions/magnetic';
	import { cn } from '#lib/utils/cn';

	const button = tv({
		base: 'inline-flex items-center justify-center gap-2 font-display font-bold transition-all duration-150 motion-safe:active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-60',
		variants: {
			variant: {
				// Dark-mode hover keeps the dark rose: the token flips light
				// for text, which would fail contrast under white button text.
				primary: 'bg-accent-dark text-white hover:bg-accent-darker dark:hover:bg-[#be123c]',
				secondary:
					'border-2 border-ink bg-transparent text-ink hover:bg-ink hover:text-white dark:hover:bg-[#f5f2ff] dark:hover:text-[#1b1740]',
				dark: 'bg-ink text-white hover:bg-footer dark:bg-[#f5f2ff] dark:text-[#1b1740] dark:hover:bg-white',
				ghost: 'text-accent-darker hover:text-accent-dark dark:hover:text-accent'
			},
			size: {
				sm: 'rounded-full px-4 py-2 text-sm',
				md: 'rounded-full px-6 py-3 text-base'
			}
		},
		defaultVariants: { variant: 'primary', size: 'md' }
	});

	type ButtonProps = VariantProps<typeof button> & {
		href?: string;
		download?: boolean | string;
		type?: 'button' | 'submit' | 'reset';
		class?: string;
		ariaLabel?: string;
		/** Magnetic pull toward the cursor (hero/CTA buttons only). */
		magnetic?: boolean;
		/** Buttons only; ignored for links. */
		disabled?: boolean;
		onclick?: (event: MouseEvent) => void;
		children: Snippet;
	};

	let {
		href,
		download,
		variant,
		size,
		type = 'button',
		class: className,
		ariaLabel,
		magnetic: magneticEnabled = false,
		disabled = false,
		onclick,
		children
	}: ButtonProps = $props();
</script>

{#if href}
	<a
		{href}
		{download}
		use:magnetic={magneticEnabled}
		class={cn(button({ variant, size }), className)}
		aria-label={ariaLabel}
		{onclick}
	>
		{@render children()}
	</a>
{:else}
	<button
		{type}
		{disabled}
		use:magnetic={magneticEnabled}
		class={cn(button({ variant, size }), className)}
		aria-label={ariaLabel}
		{onclick}
	>
		{@render children()}
	</button>
{/if}
