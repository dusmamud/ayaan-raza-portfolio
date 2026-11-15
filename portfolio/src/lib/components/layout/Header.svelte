<script lang="ts">
	import { page } from '$app/state';
	import { ArrowRight, Menu, Search, X } from '@lucide/svelte';
	import { site } from '#lib/data/site';
	import Button from '#lib/components/ui/Button.svelte';
	import Logo from '#lib/components/ui/Logo.svelte';
	import ThemeToggle from '#lib/components/ui/ThemeToggle.svelte';
	import MobileMenu from './MobileMenu.svelte';

	let menuOpen = $state(false);
	let menuButton: HTMLButtonElement | undefined = $state();
	let activeId = $state('home');

	const sectionIds = ['home', 'about', 'services', 'projects', 'stack'];

	// Scroll-spy: only on the home page, where the sections exist.
	$effect(() => {
		if (page.url.pathname !== '/') return;
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) activeId = entry.target.id;
				}
			},
			{ rootMargin: '-40% 0px -55% 0px' }
		);
		for (const id of sectionIds) {
			const el = document.getElementById(id);
			if (el) observer.observe(el);
		}
		return () => observer.disconnect();
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

	function closeMenu() {
		menuOpen = false;
		menuButton?.focus();
	}
</script>

<header class="sticky top-0 z-50 border-b border-ink/5 bg-cream/85 backdrop-blur-sm">
	<div
		class="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:h-20 lg:px-8"
	>
		<a href="/#home" class="flex items-center gap-2.5" aria-label="Ayaan Raza — home">
			<Logo />
			<span class="hidden flex-col leading-tight sm:flex">
				<span class="font-display font-bold text-ink">{site.name}</span>
				<span class="text-xs text-body">{site.role}</span>
			</span>
		</a>

		<nav aria-label="Primary" class="hidden lg:block">
			<ul class="flex items-center gap-7">
				{#each site.nav as link (link.href)}
					<li>
						<a
							href={link.href}
							aria-current={isActive(link.href) ? 'location' : undefined}
							class="border-b-2 pb-1 text-[0.95rem] font-medium transition-colors {isActive(
								link.href
							)
								? 'border-accent font-bold text-ink'
								: 'border-transparent text-body hover:text-ink'}"
						>
							{link.label}
						</a>
					</li>
				{/each}
			</ul>
		</nav>

		<div class="flex items-center gap-1.5 sm:gap-3">
			<ThemeToggle />
			<a
				href="/search"
				aria-label="Search the site"
				class="inline-flex h-10 w-10 items-center justify-center rounded-full text-ink hover:bg-ink/5"
			>
				<Search size={20} aria-hidden="true" />
			</a>
			<span class="hidden md:inline-flex">
				<Button href="/contact" size="sm">
					Let's Talk <ArrowRight size={16} aria-hidden="true" />
				</Button>
			</span>
			<button
				bind:this={menuButton}
				type="button"
				class="inline-flex h-10 w-10 items-center justify-center rounded-full text-ink hover:bg-ink/5 lg:hidden"
				aria-expanded={menuOpen}
				aria-controls="mobile-menu"
				aria-label={menuOpen ? 'Close menu' : 'Open menu'}
				onclick={() => {
					menuOpen = !menuOpen;
				}}
			>
				{#if menuOpen}
					<X size={24} aria-hidden="true" />
				{:else}
					<Menu size={24} aria-hidden="true" />
				{/if}
			</button>
		</div>
	</div>

	<MobileMenu open={menuOpen} {activeId} onClose={closeMenu} />
</header>
