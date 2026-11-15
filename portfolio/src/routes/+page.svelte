<script lang="ts">
	import type { PageData } from './$types';
	import About from '#lib/components/sections/About.svelte';
	import Cta from '#lib/components/sections/Cta.svelte';
	import Hero from '#lib/components/sections/Hero.svelte';
	import SelectedWork from '#lib/components/sections/SelectedWork.svelte';
	import Services from '#lib/components/sections/Services.svelte';
	import TechStack from '#lib/components/sections/TechStack.svelte';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Ayaan Raza — Full-Stack Developer</title>
	<meta
		name="description"
		content="Ayaan Raza builds fast, scalable and beautiful web & mobile applications. Demo portfolio — all content is fictional."
	/>
	<meta property="og:title" content="Ayaan Raza — Full-Stack Developer" />
	<meta
		property="og:description"
		content="Ayaan Raza builds fast, scalable and beautiful web & mobile applications. Demo portfolio — all content is fictional."
	/>
	<meta property="og:url" content="{data.site.baseUrl}/" />
	<link rel="canonical" href="{data.site.baseUrl}/" />
	<script type="application/ld+json">
		{JSON.stringify({
			'@context': 'https://schema.org',
			'@type': 'Person',
			name: data.site.name,
			jobTitle: data.site.role,
			url: data.site.baseUrl,
			description:
				'Ayaan Raza builds fast, scalable and beautiful web and mobile applications. Demo portfolio — all content is fictional.'
		})}
	</script>
</svelte:head>

<Hero site={data.site} />
<About stats={data.stats} />
<Services services={data.services} />
<SelectedWork projects={data.projects} />
<TechStack stack={data.site.techStack} />
<Cta />
