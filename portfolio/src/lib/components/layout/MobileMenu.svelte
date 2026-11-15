<script lang="ts">
	import { page } from '$app/state';
	import { ArrowRight } from '@lucide/svelte';
	import { site } from '#lib/data/site';
	import Button from '#lib/components/ui/Button.svelte';

	let { open, activeId, onClose }: { open: boolean; activeId: string; onClose: () => void } =
		$props();

	let panel: HTMLElement | undefined = $state();

	// Focus the first link on open; trap Tab inside; Escape closes.
	$effect(() => {
		if (!open || !panel) return;
		const currentPanel = panel;
		currentPanel.querySelector<HTMLElement>('a, button')?.focus();

		function onKeydown(event: KeyboardEvent) {
			if (event.key === 'Escape') {
				event.preventDefault();
				onClose();
				return;
			}
			if (event.key !== 'Tab') return;
			const items = [...currentPanel.querySelectorAll<HTMLElement>('a, button')];
			if (items.length === 0) return;
			const first = items[0];
			const last = items[items.length - 1];
			if (event.shiftKey && document.activeElement === first) {
				event.preventDefault();
				last.focus();
			} else if (!event.shiftKey && document.activeElement === last) {
				event.preventDefault();
				first.focus();
			}
		}

		currentPanel.addEventListener('keydown', onKeydown);
		return () => currentPanel.removeEventListener('keydown', onKeydown);
	});

	function isActive(href: string): boolean {
		if (href === '/blog') return page.url.pathname.startsWith('/blog');
		if (href === '/contact') return page.url.pathname === '/contact';
		if (href === '/#projects') {
			if (page.url.pathname.startsWith('/projects')) return true;
			if (page.url.pathname !== '/') return false;
			return activeId === 'projects';
		}
		if (page.url.pathname !== '/') return false;
		return href === `/#${activeId}`;
	}
</script>

{#if open}
	<nav
		bind:this={panel}
		id="mobile-menu"
		aria-label="Mobile"
		class="absolute inset-x-0 top-full border-b border-ink/10 bg-cream px-4 py-4 shadow-lg lg:hidden"
	>
		<ul class="space-y-1">
			{#each site.nav as link (link.href)}
				<li>
					<a
						href={link.href}
						aria-current={isActive(link.href) ? 'location' : undefined}
						class="block rounded-lg px-3 py-2.5 font-display font-bold {isActive(link.href)
							? 'bg-blush text-ink'
							: 'text-body hover:bg-ink/5 hover:text-ink'}"
						onclick={onClose}
					>
						{link.label}
					</a>
				</li>
			{/each}
		</ul>
		<div class="mt-4 border-t border-ink/10 pt-4">
			<Button href="/contact" size="sm" onclick={onClose}>
				Let's Talk <ArrowRight size={16} aria-hidden="true" />
			</Button>
		</div>
	</nav>
{/if}
