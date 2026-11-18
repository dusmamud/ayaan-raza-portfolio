<script lang="ts">
	import type { PageData } from './$types';
	import { ArrowRight, Check } from '@lucide/svelte';
	import { reveal } from '#lib/actions/reveal';
	import { services } from '#lib/data/services';
	import Breadcrumbs from '#lib/components/ui/Breadcrumbs.svelte';
	import Button from '#lib/components/ui/Button.svelte';
	import CtaBand from '#lib/components/ui/CtaBand.svelte';
	import JsonLd from '#lib/components/ui/JsonLd.svelte';
	import PageHeader from '#lib/components/ui/PageHeader.svelte';
	import { cn } from '#lib/utils/cn';

	let { data }: { data: PageData } = $props();

	const breadcrumbLd = $derived({
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: [
			{ '@type': 'ListItem', position: 1, name: 'Home', item: data.site.baseUrl },
			{ '@type': 'ListItem', position: 2, name: 'Pricing', item: `${data.site.baseUrl}/pricing` }
		]
	});

	// Demo pricing — fictional numbers for the UI/UX demo. The per-service
	// starting prices from the service cards moved here in the v15 round.
	const plans = [
		{
			name: 'Starter',
			price: '$499',
			unit: 'from',
			blurb: 'A sharp landing page or a design audit for an existing product.',
			features: [
				'One page, designed and built',
				'Mobile-first responsive layout',
				'Contact form + basic SEO setup',
				'Two revision rounds',
				'Delivery in 1–2 weeks (demo)'
			],
			cta: 'Start with Starter',
			href: '/contact',
			featured: false
		},
		{
			name: 'Growth',
			price: '$1,499',
			unit: 'from',
			blurb: 'A complete app or website, from first sketch to launch.',
			features: [
				'Up to 6 screens or pages',
				'UI/UX design + frontend build',
				'Backend integration included',
				'Animations and interactions',
				'Three revision rounds',
				'Delivery in 4–6 weeks (demo)'
			],
			cta: 'Book a Growth call',
			href: '/book',
			featured: true
		},
		{
			name: 'Scale',
			price: '$2,999',
			unit: 'from',
			blurb: 'A full product build with launch support and handover.',
			features: [
				'Everything in Growth',
				'User accounts and payments wiring',
				'Analytics and launch checklist',
				'30 days of launch support',
				'Team handover documentation'
			],
			cta: 'Talk about Scale',
			href: '/contact',
			featured: false
		}
	];

	const included = [
		'Fixed scope agreed before work starts',
		'Weekly progress updates, no surprises',
		'Clean handover: source, assets and notes',
		'Accessibility and performance checks included'
	];

	const addons = [
		{ name: 'Extra screen or page', price: '$149 each' },
		{ name: 'Monthly maintenance', price: '$199/mo' },
		{ name: 'Rush delivery', price: '+30%' },
		{ name: 'Extra revision round', price: '$99' }
	];
</script>

<svelte:head>
	<title>Pricing — Ayaan Raza</title>
	<meta property="og:type" content="website" />
	<meta
		name="description"
		content="Demo pricing for design and development work: three plans from $499, plus add-ons. Demo content — all fictional."
	/>
	<meta property="og:title" content="Pricing — Ayaan Raza" />
	<meta
		property="og:description"
		content="Demo pricing for design and development work: three plans from $499, plus add-ons. Demo content — all fictional."
	/>
	<meta property="og:url" content="{data.site.baseUrl}/pricing" />
	<meta property="og:image" content="{data.site.baseUrl}/og/pricing.jpg" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content="Pricing — Ayaan Raza" />
	<meta name="twitter:image" content="{data.site.baseUrl}/og/pricing.jpg" />
	<meta name="twitter:title" content="Pricing — Ayaan Raza" />
	<meta
		name="twitter:description"
		content="Demo pricing for design and development work: three plans from $499, plus add-ons. Demo content — all fictional."
	/>
	<link rel="canonical" href="{data.site.baseUrl}/pricing" />
	<JsonLd data={breadcrumbLd} />
</svelte:head>

<div class="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
	<Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Pricing' }]} />
	<div class="mt-6">
		<PageHeader
			eyebrow="Pricing"
			title="Simple, honest pricing"
			description="Three plans for three kinds of projects. Every price is a starting point — the final quote follows a short call and a written scope."
		/>
	</div>

	<div class="mt-12 grid gap-6 lg:grid-cols-3">
		{#each plans as plan, i (plan.name)}
			<div use:reveal={{ delay: i * 75 }}>
				<article
					class={cn(
						'flex h-full flex-col rounded-3xl bg-card p-6 shadow-sm sm:p-7',
						plan.featured && 'border-2 border-accent shadow-md'
					)}
				>
					<div class="flex items-center justify-between gap-3">
						<h2 class="font-display text-xl font-bold text-ink">{plan.name}</h2>
						{#if plan.featured}
							<span class="rounded-full bg-accent-dark px-3 py-1 text-xs font-bold text-white">
								Most popular
							</span>
						{/if}
					</div>
					<p class="mt-4">
						<span class="text-sm text-body">{plan.unit}</span>
						<span class="font-display text-4xl font-extrabold tracking-tight text-ink">
							{plan.price}
						</span>
					</p>
					<p class="mt-2 text-sm leading-relaxed text-body">{plan.blurb}</p>
					<ul class="mt-5 flex-1 space-y-2.5">
						{#each plan.features as feature (feature)}
							<li class="flex items-start gap-2.5 text-sm leading-relaxed text-body">
								<Check size={18} aria-hidden="true" class="mt-0.5 shrink-0 text-accent" />
								{feature}
							</li>
						{/each}
					</ul>
					<div class="mt-7">
						<Button href={plan.href} variant={plan.featured ? 'primary' : 'secondary'}>
							{plan.cta}
							<ArrowRight size={18} aria-hidden="true" />
						</Button>
					</div>
				</article>
			</div>
		{/each}
	</div>

	<div class="mt-14 grid gap-10 lg:grid-cols-2">
		<div use:reveal>
			<h2 class="font-display text-2xl font-extrabold tracking-tight text-ink">
				Included in every plan
			</h2>
			<ul class="mt-4 space-y-2.5">
				{#each included as item (item)}
					<li class="flex items-start gap-2.5 leading-relaxed text-body">
						<Check size={18} aria-hidden="true" class="mt-0.5 shrink-0 text-accent" />
						{item}
					</li>
				{/each}
			</ul>
		</div>
		<div use:reveal={{ delay: 100 }}>
			<h2 class="font-display text-2xl font-extrabold tracking-tight text-ink">Add-ons</h2>
			<ul class="mt-4 divide-y divide-ink/10">
				{#each addons as addon (addon.name)}
					<li class="flex items-baseline justify-between gap-4 py-2.5 text-body">
						<span>{addon.name}</span>
						<span class="font-bold whitespace-nowrap text-ink">{addon.price}</span>
					</li>
				{/each}
			</ul>
		</div>
	</div>

	<div class="mt-14" use:reveal>
		<h2 class="font-display text-2xl font-extrabold tracking-tight text-ink">
			Starting prices by service
		</h2>
		<ul class="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
			{#each services as service (service.id)}
				<li>
					<a
						href={service.href}
						class="group/link flex h-full flex-col rounded-3xl bg-card p-5 shadow-sm transition-all duration-300 motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-md"
					>
						<span class="font-display font-bold text-ink">{service.title}</span>
						<span class="mt-1 text-sm font-bold text-accent-darker">{service.price} (demo)</span>
						<span class="mt-3 inline-flex items-center gap-1 text-sm font-bold text-accent-darker">
							See what's included
							<ArrowRight
								size={16}
								aria-hidden="true"
								class="motion-safe:transition-transform motion-safe:group-hover/link:translate-x-0.5"
							/>
						</span>
					</a>
				</li>
			{/each}
		</ul>
	</div>

	<p class="mt-12 text-center text-sm text-body">
		Demo prices — fictional numbers for the UI/UX demo. Questions?
		<a href="/#faq" class="font-bold text-accent-darker hover:text-accent-dark">Read the FAQ</a>.
	</p>
</div>

<CtaBand />
