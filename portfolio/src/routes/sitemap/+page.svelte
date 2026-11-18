<script lang="ts">
	import type { PageData } from './$types';
	import Breadcrumbs from '#lib/components/ui/Breadcrumbs.svelte';
	import CtaBand from '#lib/components/ui/CtaBand.svelte';
	import JsonLd from '#lib/components/ui/JsonLd.svelte';
	import PageHeader from '#lib/components/ui/PageHeader.svelte';

	let { data }: { data: PageData } = $props();

	const breadcrumbLd = $derived({
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: [
			{ '@type': 'ListItem', position: 1, name: 'Home', item: data.site.baseUrl },
			{ '@type': 'ListItem', position: 2, name: 'Sitemap', item: `${data.site.baseUrl}/sitemap` }
		]
	});

	const mainPages = [
		{ label: 'Home', href: '/' },
		{ label: 'About', href: '/about' },
		{ label: 'Services', href: '/services' },
		{ label: 'Projects', href: '/projects' },
		{ label: 'Blog', href: '/blog' },
		{ label: 'Testimonials', href: '/testimonials' },
		{ label: 'Uses', href: '/uses' },
		{ label: 'Now', href: '/now' },
		{ label: 'Pricing', href: '/pricing' },
		{ label: 'Book a call', href: '/book' },
		{ label: 'Contact', href: '/contact' },
		{ label: 'Resume', href: '/resume' },
		{ label: 'Search', href: '/search' }
	];

	const infoPages = [
		{ label: 'Privacy Policy', href: '/privacy' },
		{ label: 'Terms of Use', href: '/terms' },
		{ label: 'Accessibility', href: '/accessibility' },
		{ label: 'Sitemap (this page)', href: '/sitemap' }
	];

	const linkClass = 'inline-block py-1 font-bold text-accent-darker hover:text-accent-dark';
</script>

<svelte:head>
	<title>Sitemap — Ayaan Raza</title>
	<meta property="og:type" content="website" />
	<meta
		name="description"
		content="Every page on the Ayaan Raza demo portfolio in one place: pages, services, projects, blog posts and legal pages."
	/>
	<meta property="og:title" content="Sitemap — Ayaan Raza" />
	<meta
		property="og:description"
		content="Every page on the Ayaan Raza demo portfolio in one place: pages, services, projects, blog posts and legal pages."
	/>
	<meta property="og:url" content="{data.site.baseUrl}/sitemap" />
	<meta property="og:image" content="{data.site.baseUrl}/og/sitemap.jpg" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content="Sitemap — Ayaan Raza" />
	<meta name="twitter:image" content="{data.site.baseUrl}/og/sitemap.jpg" />
	<meta name="twitter:title" content="Sitemap — Ayaan Raza" />
	<meta
		name="twitter:description"
		content="Every page on the Ayaan Raza demo portfolio in one place: pages, services, projects, blog posts and legal pages."
	/>
	<link rel="canonical" href="{data.site.baseUrl}/sitemap" />
	<JsonLd data={breadcrumbLd} />
</svelte:head>

<div class="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
	<Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Sitemap' }]} />
	<div class="mt-6">
		<PageHeader
			eyebrow="Sitemap"
			title="Every page, in one place"
			description="A human-readable map of the whole site. The machine-readable version lives at /sitemap.xml."
		/>
	</div>

	<div class="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
		<nav aria-label="Main pages">
			<h2 class="font-display text-xl font-bold text-ink">Pages</h2>
			<ul class="mt-4 space-y-1.5">
				{#each mainPages as link (link.href)}
					<li><a href={link.href} class={linkClass}>{link.label}</a></li>
				{/each}
			</ul>
		</nav>

		<nav aria-label="Services">
			<h2 class="font-display text-xl font-bold text-ink">Services</h2>
			<ul class="mt-4 space-y-1.5">
				{#each data.services as service (service.id)}
					<li><a href={service.href} class={linkClass}>{service.title}</a></li>
				{/each}
			</ul>
		</nav>

		<nav aria-label="Projects">
			<h2 class="font-display text-xl font-bold text-ink">Projects</h2>
			<ul class="mt-4 space-y-1.5">
				{#each data.projects as project (project.slug)}
					<li>
						<a href="/projects/{project.slug}" class={linkClass}>{project.title}</a>
					</li>
				{/each}
			</ul>
		</nav>

		<nav aria-label="Blog posts">
			<h2 class="font-display text-xl font-bold text-ink">Blog posts</h2>
			<ul class="mt-4 space-y-1.5">
				{#each data.posts as post (post.slug)}
					<li><a href="/blog/{post.slug}" class={linkClass}>{post.title}</a></li>
				{/each}
			</ul>
		</nav>

		<nav aria-label="Legal and information">
			<h2 class="font-display text-xl font-bold text-ink">Legal &amp; info</h2>
			<ul class="mt-4 space-y-1.5">
				{#each infoPages as link (link.href)}
					<li><a href={link.href} class={linkClass}>{link.label}</a></li>
				{/each}
			</ul>
		</nav>
	</div>
</div>

<CtaBand />
