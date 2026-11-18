<script lang="ts">
	import type { PageData } from './$types';
	import About from '#lib/components/sections/About.svelte';
	import BlogPreview from '#lib/components/sections/BlogPreview.svelte';
	import ClientLogos from '#lib/components/sections/ClientLogos.svelte';
	import Cta from '#lib/components/sections/Cta.svelte';
	import Experience from '#lib/components/sections/Experience.svelte';
	import Faq from '#lib/components/sections/Faq.svelte';
	import Hero from '#lib/components/sections/Hero.svelte';
	import OpenSource from '#lib/components/sections/OpenSource.svelte';
	import Process from '#lib/components/sections/Process.svelte';
	import SelectedWork from '#lib/components/sections/SelectedWork.svelte';
	import Services from '#lib/components/sections/Services.svelte';
	import TechStack from '#lib/components/sections/TechStack.svelte';
	import Testimonials from '#lib/components/sections/Testimonials.svelte';
	import JsonLd from '#lib/components/ui/JsonLd.svelte';

	let { data }: { data: PageData } = $props();

	const personLd = $derived({
		'@context': 'https://schema.org',
		'@type': 'Person',
		'@id': `${data.site.baseUrl}/about#person`,
		name: data.site.name,
		jobTitle: data.site.role,
		url: data.site.baseUrl,
		description:
			'Ayaan Raza builds fast, scalable and beautiful web and mobile applications. Demo portfolio — all content is fictional.'
	});

	const websiteLd = $derived({
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		'@id': `${data.site.baseUrl}/#website`,
		name: data.site.name,
		alternateName: 'AR.',
		url: data.site.baseUrl
	});

	const faqLd = $derived({
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: data.faqs.map((faq) => ({
			'@type': 'Question',
			name: faq.question,
			acceptedAnswer: { '@type': 'Answer', text: faq.answer }
		}))
	});
</script>

<svelte:head>
	<title>Ayaan Raza — Full-Stack Developer</title>
	<meta property="og:type" content="website" />
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
	<meta property="og:image" content="{data.site.baseUrl}/og.jpg" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content="Ayaan Raza — Full-Stack Developer" />
	<meta name="twitter:image" content="{data.site.baseUrl}/og.jpg" />
	<meta name="twitter:title" content="Ayaan Raza — Full-Stack Developer" />
	<meta
		name="twitter:description"
		content="Ayaan Raza builds fast, scalable and beautiful web & mobile applications. Demo portfolio — all content is fictional."
	/>
	<link rel="canonical" href="{data.site.baseUrl}/" />
	<JsonLd data={personLd} />
	<JsonLd data={websiteLd} />
	<JsonLd data={faqLd} />
</svelte:head>

<Hero site={data.site} />
<ClientLogos />
<About stats={data.stats} />
<Services services={data.services} />
<SelectedWork projects={data.projects.slice(0, 4)} />
<Experience experience={data.experience} />
<Process steps={data.processSteps} />
<Testimonials testimonials={data.testimonials} />
<TechStack stack={data.tech} />
<OpenSource repos={data.repos} />
<BlogPreview posts={data.posts} />
<Faq faqs={data.faqs} />
<Cta />
