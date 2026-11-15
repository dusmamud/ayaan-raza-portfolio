<script lang="ts">
	import type { PageData } from './$types';
	import { ArrowLeft } from '@lucide/svelte';
	import Breadcrumbs from '#lib/components/ui/Breadcrumbs.svelte';
	import JsonLd from '#lib/components/ui/JsonLd.svelte';
	import PhoneMockup from '#lib/components/ui/PhoneMockup.svelte';
	import ProjectCard from '#lib/components/ui/ProjectCard.svelte';
	import ShareButtons from '#lib/components/ui/ShareButtons.svelte';
	import type { ProjectTint } from '#lib/schemas/project';

	let { data }: { data: PageData } = $props();
	const project = $derived(data.project);

	const tiles: Record<ProjectTint, string> = {
		green: 'bg-tile-green',
		pink: 'bg-tile-pink',
		yellow: 'bg-tile-yellow',
		purple: 'bg-tile-purple',
		blue: 'bg-tile-blue',
		orange: 'bg-tile-orange'
	};

	const sections = $derived([
		{ heading: 'Overview', body: project.overview },
		{ heading: 'The challenge', body: project.challenge },
		{ heading: 'The solution', body: project.solution },
		{ heading: 'The outcome', body: project.outcome }
	]);

	const pageUrl = $derived(`${data.site.baseUrl}/projects/${project.slug}`);

	const breadcrumbLd = $derived({
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: [
			{ '@type': 'ListItem', position: 1, name: 'Home', item: data.site.baseUrl },
			{ '@type': 'ListItem', position: 2, name: 'Projects', item: `${data.site.baseUrl}/projects` },
			{ '@type': 'ListItem', position: 3, name: project.title, item: pageUrl }
		]
	});
</script>

<svelte:head>
	<title>{project.title} — Ayaan Raza</title>
	<meta name="description" content={project.description} />
	<meta property="og:title" content="{project.title} — Ayaan Raza" />
	<meta property="og:description" content={project.description} />
	<meta property="og:url" content={pageUrl} />
	<meta property="og:image" content="{data.site.baseUrl}/og/project-{project.slug}.jpg" />
	<meta name="twitter:title" content="{project.title} — Ayaan Raza" />
	<meta name="twitter:description" content={project.description} />
	<link rel="canonical" href={pageUrl} />
	<JsonLd data={breadcrumbLd} />
</svelte:head>

<div class="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
	<Breadcrumbs
		items={[
			{ label: 'Home', href: '/' },
			{ label: 'Projects', href: '/projects' },
			{ label: project.title }
		]}
	/>
	<a
		href="/projects"
		class="mt-4 inline-flex items-center gap-1.5 py-1 text-sm font-bold text-accent-darker hover:text-accent-dark"
	>
		<ArrowLeft size={16} aria-hidden="true" /> All Projects
	</a>

	<div class="mt-8 grid items-start gap-10 lg:grid-cols-2">
		<div>
			<p class="font-display text-sm font-bold tracking-wide text-accent-darker uppercase">
				{project.category}
			</p>
			<h1
				class="mt-2 font-display text-[clamp(2rem,5vw,3rem)] leading-tight font-extrabold tracking-tight text-ink"
			>
				{project.title}
			</h1>
			<p class="mt-3 text-lg leading-relaxed text-body">{project.description}</p>
			<dl class="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-sm">
				<div>
					<dt class="font-bold text-ink">Year</dt>
					<dd class="text-body">{project.year} (demo)</dd>
				</div>
				<div>
					<dt class="font-bold text-ink">Role</dt>
					<dd class="text-body">{project.role}</dd>
				</div>
				<div>
					<dt class="font-bold text-ink">Timeline</dt>
					<dd class="text-body">{project.timeline} (demo)</dd>
				</div>
			</dl>
			<ul class="mt-6 flex flex-wrap gap-2">
				{#each project.tags as tag (tag)}
					<li
						class="rounded-full border border-ink/10 bg-card px-3 py-1 text-xs font-bold text-ink"
					>
						{tag}
					</li>
				{/each}
			</ul>
		</div>
		<div class="overflow-hidden rounded-3xl px-6 pt-10 {tiles[project.tint]}">
			<div class="-mb-5">
				<PhoneMockup variant={project.mockup} />
			</div>
		</div>
	</div>

	<dl class="mt-14 grid max-w-4xl grid-cols-3 gap-4">
		{#each project.metrics as metric (metric.label)}
			<div class="flex flex-col rounded-2xl bg-card p-4 text-center shadow-sm sm:p-5">
				<dt class="order-2 mt-1 text-xs leading-snug text-body sm:text-sm">{metric.label}</dt>
				<dd class="order-1 font-display text-xl font-extrabold tracking-tight text-ink sm:text-2xl">
					{metric.value}
				</dd>
			</div>
		{/each}
	</dl>
	<p class="mt-3 max-w-4xl text-xs text-body">
		Demo metrics — fictional numbers for the UI/UX demo.
	</p>

	<div class="mt-14 grid max-w-4xl gap-8 sm:grid-cols-2">
		{#each sections as section (section.heading)}
			<section aria-labelledby="case-{section.heading.toLowerCase().replaceAll(' ', '-')}">
				<h2
					id="case-{section.heading.toLowerCase().replaceAll(' ', '-')}"
					class="font-display text-xl font-bold text-ink"
				>
					{section.heading}
				</h2>
				<p class="mt-2 leading-relaxed text-body">{section.body}</p>
			</section>
		{/each}
	</div>
	<p class="mt-8 max-w-4xl text-sm text-body">
		Demo case study — the story above is fictional placeholder content for the UI/UX demo.
	</p>

	<div class="mt-10 border-t border-ink/10 pt-6">
		<ShareButtons url={pageUrl} title="{project.title} — Ayaan Raza" />
	</div>

	<h2 class="mt-16 font-display text-2xl font-extrabold tracking-tight text-ink">More projects</h2>
	<div class="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
		{#each data.others as other (other.slug)}
			<ProjectCard project={other} />
		{/each}
	</div>
</div>
