<script lang="ts">
	import type { PageData } from './$types';
	import { Download, Mail, MapPin, Phone, Printer } from '@lucide/svelte';
	import Breadcrumbs from '#lib/components/ui/Breadcrumbs.svelte';
	import Button from '#lib/components/ui/Button.svelte';

	let { data }: { data: PageData } = $props();

	const groups = [
		{ id: 'frontend', label: 'Frontend' },
		{ id: 'backend', label: 'Backend & Data' },
		{ id: 'tools', label: 'Mobile, Design & Tools' }
	] as const;

	function printPage() {
		window.print();
	}
</script>

<svelte:head>
	<title>CV / Resume — Ayaan Raza</title>
	<meta
		name="description"
		content="CV of Ayaan Raza, full-stack developer. Demo resume — all content is fictional."
	/>
	<meta property="og:title" content="CV / Resume — Ayaan Raza" />
	<meta
		property="og:description"
		content="CV of Ayaan Raza, full-stack developer. Demo resume — all content is fictional."
	/>
	<meta property="og:url" content="{data.site.baseUrl}/resume" />
	<meta property="og:image" content="{data.site.baseUrl}/og/resume.jpg" />
	<meta name="twitter:title" content="CV / Resume — Ayaan Raza" />
	<meta
		name="twitter:description"
		content="CV of Ayaan Raza, full-stack developer. Demo resume — all content is fictional."
	/>
	<link rel="canonical" href="{data.site.baseUrl}/resume" />
</svelte:head>

<div class="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
	<div class="print:hidden">
		<Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Resume' }]} />
	</div>
	<div class="mt-6 flex flex-wrap items-start justify-between gap-6">
		<div>
			<h1
				class="font-display text-[clamp(2rem,5vw,3rem)] leading-tight font-extrabold tracking-tight text-ink"
			>
				{data.site.name}
			</h1>
			<p class="mt-1 font-display text-lg font-bold text-accent-darker">{data.site.role}</p>
			<ul class="mt-4 space-y-1.5 text-sm text-body">
				<li class="flex items-center gap-2">
					<Mail size={15} aria-hidden="true" />
					<a href="mailto:{data.site.email}" class="hover:text-accent-dark">{data.site.email}</a>
				</li>
				<li class="flex items-center gap-2">
					<Phone size={15} aria-hidden="true" />
					<span>{data.site.phone}</span>
				</li>
				<li class="flex items-center gap-2">
					<MapPin size={15} aria-hidden="true" />
					<span>{data.site.location}</span>
				</li>
			</ul>
		</div>
		<div class="flex flex-col gap-3 print:hidden">
			<Button onclick={printPage} variant="secondary" size="sm">
				<Printer size={16} aria-hidden="true" /> Print / Save as PDF
			</Button>
			<Button href="/ayaan-raza-resume.pdf" download variant="secondary" size="sm">
				<Download size={16} aria-hidden="true" /> Download PDF
			</Button>
		</div>
	</div>

	<section class="mt-10" aria-labelledby="resume-summary">
		<h2 id="resume-summary" class="font-display text-xl font-bold text-ink">Summary</h2>
		<p class="mt-2 leading-relaxed text-body">
			Full-stack developer with 3+ years of experience building fast, scalable and beautiful web &
			mobile applications — from first sketch to app-store release.
		</p>
	</section>

	<section class="mt-10" aria-labelledby="resume-experience">
		<h2 id="resume-experience" class="font-display text-xl font-bold text-ink">Experience</h2>
		<ul class="mt-4 space-y-6">
			{#each data.experience as job (job.id)}
				<li>
					<div class="flex flex-wrap items-baseline justify-between gap-2">
						<h3 class="font-display font-bold text-ink">
							{job.role} · <span class="text-accent-darker">{job.company}</span>
						</h3>
						<p class="text-sm font-bold text-body">{job.period}</p>
					</div>
					<p class="mt-1 leading-relaxed text-body">{job.description}</p>
				</li>
			{/each}
		</ul>
	</section>

	<section class="mt-10" aria-labelledby="resume-education">
		<h2 id="resume-education" class="font-display text-xl font-bold text-ink">Education</h2>
		<ul class="mt-4 space-y-4">
			{#each data.education as item (item.id)}
				<li>
					<div class="flex flex-wrap items-baseline justify-between gap-2">
						<h3 class="font-display font-bold text-ink">
							{item.degree} · <span class="text-accent-darker">{item.school}</span>
						</h3>
						<p class="text-sm font-bold text-body">{item.period}</p>
					</div>
					<p class="mt-1 leading-relaxed text-body">{item.note}</p>
				</li>
			{/each}
		</ul>
	</section>

	<section class="mt-10" aria-labelledby="resume-certifications">
		<h2 id="resume-certifications" class="font-display text-xl font-bold text-ink">
			Certifications
		</h2>
		<ul class="mt-4 space-y-4">
			{#each data.certifications as cert (cert.id)}
				<li>
					<div class="flex flex-wrap items-baseline justify-between gap-2">
						<h3 class="font-display font-bold text-ink">
							{cert.title} · <span class="text-accent-darker">{cert.issuer}</span>
						</h3>
						<p class="text-sm font-bold text-body">{cert.year}</p>
					</div>
					<p class="mt-1 leading-relaxed text-body">{cert.note}</p>
				</li>
			{/each}
		</ul>
	</section>

	<section class="mt-10" aria-labelledby="resume-skills">
		<h2 id="resume-skills" class="font-display text-xl font-bold text-ink">Skills</h2>
		{#each groups as group (group.id)}
			<h3 class="mt-4 text-sm font-bold tracking-wide text-body uppercase">{group.label}</h3>
			<ul class="mt-2 flex flex-wrap gap-2">
				{#each data.tech.filter((item) => item.group === group.id) as item (item.id)}
					<li class="rounded-full bg-lilac px-3 py-1 text-xs font-bold text-ink">{item.name}</li>
				{/each}
			</ul>
		{/each}
	</section>

	<section class="mt-10" aria-labelledby="resume-projects">
		<h2 id="resume-projects" class="font-display text-xl font-bold text-ink">Selected projects</h2>
		<ul class="mt-4 space-y-3">
			{#each data.projects as project (project.slug)}
				<li class="leading-relaxed text-body">
					<a
						href="/projects/{project.slug}"
						class="font-display font-bold text-ink hover:text-accent-dark"
					>
						{project.title}
					</a>
					— {project.description}
				</li>
			{/each}
		</ul>
	</section>

	<p class="mt-12 border-t border-ink/10 pt-6 text-sm text-body">
		Demo CV — all content is fictional.
	</p>
</div>
