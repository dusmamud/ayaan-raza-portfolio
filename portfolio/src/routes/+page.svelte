<script lang="ts">
	import type { PageData } from './$types';
	import About from '#lib/components/sections/About.svelte';
	import BlogPreview from '#lib/components/sections/BlogPreview.svelte';
	import Cta from '#lib/components/sections/Cta.svelte';
	import Experience from '#lib/components/sections/Experience.svelte';
	import Faq from '#lib/components/sections/Faq.svelte';
	import Hero from '#lib/components/sections/Hero.svelte';
	import Process from '#lib/components/sections/Process.svelte';
	import SelectedWork from '#lib/components/sections/SelectedWork.svelte';
	import Services from '#lib/components/sections/Services.svelte';
	import TechStack from '#lib/components/sections/TechStack.svelte';
	import Testimonials from '#lib/components/sections/Testimonials.svelte';

	let { data }: { data: PageData } = $props();

	// The whole tag is injected raw: Svelte does not evaluate
	// expressions inside <script> elements in markup, so a plain
	// {JSON.stringify(...)} there would ship literally and the
	// structured data would be invalid. The closing tag is escaped
	// so it cannot terminate this component <script> block.
	/* eslint-disable no-useless-escape -- \/ keeps the literal closing tag out of this file */
	const jsonLd = $derived(
		`<script type="application/ld+json">${JSON.stringify({
			'@context': 'https://schema.org',
			'@type': 'Person',
			name: data.site.name,
			jobTitle: data.site.role,
			url: data.site.baseUrl,
			description:
				'Ayaan Raza builds fast, scalable and beautiful web and mobile applications. Demo portfolio — all content is fictional.'
		}).replaceAll('<', '\\u003c')}<\/script>`
	);
	/* eslint-enable no-useless-escape */
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
	<!-- eslint-disable-next-line svelte/no-at-html-tags -- jsonLd is built above from static site data, no user input -->
	{@html jsonLd}
</svelte:head>

<Hero site={data.site} />
<About stats={data.stats} />
<Services services={data.services} />
<SelectedWork projects={data.projects} />
<Experience experience={data.experience} />
<Process steps={data.processSteps} />
<Testimonials testimonials={data.testimonials} />
<TechStack stack={data.tech} />
<BlogPreview posts={data.posts} />
<Faq faqs={data.faqs} />
<Cta />
