<script lang="ts">
	import type { PageData } from './$types';
	import { Calendar, Check, Clock, Globe, Mail, MapPin, Phone, Send } from '@lucide/svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import { zod4Client } from 'sveltekit-superforms/adapters';
	import { contactSchema } from '#lib/schemas/contact';
	import Breadcrumbs from '#lib/components/ui/Breadcrumbs.svelte';
	import Button from '#lib/components/ui/Button.svelte';
	import PageHeader from '#lib/components/ui/PageHeader.svelte';
	import SocialIcon from '#lib/components/ui/SocialIcon.svelte';

	let { data }: { data: PageData } = $props();

	let submitted = $state(false);
	let submittedName = $state('');

	// SPA mode: validates in the browser with the shared Zod schema and
	// sends nothing. Server delivery arrives in Phase 2. resetForm is off
	// so the success state can greet the user by name; "Send another"
	// clears the form by hand.
	const { form, errors, enhance } = superForm(
		{ name: '', email: '', message: '' },
		{
			SPA: true,
			resetForm: false,
			validators: zod4Client(contactSchema),
			onUpdate({ form: updated }) {
				if (updated.valid) {
					submittedName = updated.data.name;
					submitted = true;
				}
			}
		}
	);

	function sendAnother() {
		submitted = false;
		$form = { name: '', email: '', message: '' };
	}

	const inputClass =
		'w-full rounded-xl border border-ink/15 bg-card px-4 py-3 text-ink placeholder:text-body/60 focus:border-accent';
</script>

<svelte:head>
	<title>Contact — Ayaan Raza</title>
	<meta
		name="description"
		content="Contact Ayaan Raza about your project idea. Demo form — nothing is sent anywhere."
	/>
	<meta property="og:title" content="Contact — Ayaan Raza" />
	<meta
		property="og:description"
		content="Contact Ayaan Raza about your project idea. Demo form — nothing is sent anywhere."
	/>
	<meta property="og:url" content="{data.site.baseUrl}/contact" />
	<meta property="og:image" content="{data.site.baseUrl}/og/contact.jpg" />
	<meta name="twitter:title" content="Contact — Ayaan Raza" />
	<meta
		name="twitter:description"
		content="Contact Ayaan Raza about your project idea. Demo form — nothing is sent anywhere."
	/>
	<link rel="canonical" href="{data.site.baseUrl}/contact" />
</svelte:head>

<div class="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
	<Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Contact' }]} />
	<div class="mt-6">
		<PageHeader
			eyebrow="Contact"
			title="Let's talk"
			description="Tell me about your idea — this demo form validates in the browser and never sends anything anywhere."
		/>
	</div>

	<div class="mt-10 grid gap-8 lg:grid-cols-[1fr_1.4fr]">
		<div class="rounded-3xl bg-blush p-6 sm:p-8">
			<h2 class="font-display text-xl font-bold text-ink">Contact details</h2>
			<ul class="mt-5 space-y-4 text-body">
				<li class="flex items-center gap-3">
					<span
						class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-card text-ink"
					>
						<Mail size={18} aria-hidden="true" />
					</span>
					<a href="mailto:{data.site.email}" class="font-bold text-ink hover:text-accent-dark">
						{data.site.email}
					</a>
				</li>
				<li class="flex items-center gap-3">
					<span
						class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-card text-ink"
					>
						<Phone size={18} aria-hidden="true" />
					</span>
					<span>{data.site.phone}</span>
				</li>
				<li class="flex items-center gap-3">
					<span
						class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-card text-ink"
					>
						<MapPin size={18} aria-hidden="true" />
					</span>
					<span>{data.site.location}</span>
				</li>
			</ul>
			<p class="mt-6 text-sm leading-relaxed">
				Demo details — the email uses a reserved .demo address and the phone number is fake.
			</p>
			<ul class="mt-6 flex gap-2.5">
				{#each data.site.socials as social (social.id)}
					<li>
						<a
							href={social.href}
							aria-label={social.label}
							class="flex h-9 w-9 items-center justify-center rounded-full border border-ink/10 bg-card text-ink transition-colors hover:border-accent hover:bg-accent hover:text-white"
						>
							<SocialIcon id={social.id} />
						</a>
					</li>
				{/each}
			</ul>
			<div class="mt-6 border-t border-ink/10 pt-6">
				<h3 class="font-display font-bold text-ink">Before you write</h3>
				<ul class="mt-4 space-y-3 text-sm leading-relaxed">
					<li class="flex items-start gap-2.5">
						<Clock size={17} class="mt-0.5 shrink-0" aria-hidden="true" />
						<span>Usually replies within 24 hours, Monday to Friday (demo).</span>
					</li>
					<li class="flex items-start gap-2.5">
						<Globe size={17} class="mt-0.5 shrink-0" aria-hidden="true" />
						<span>Based in India — IST (UTC+5:30).</span>
					</li>
					<li class="flex items-start gap-2.5">
						<Calendar size={17} class="mt-0.5 shrink-0" aria-hidden="true" />
						<span>
							Prefer a call? Mention a time that suits you in your message and it will be confirmed
							by email — no booking tool is connected in this demo.
						</span>
					</li>
				</ul>
			</div>
		</div>

		<div class="rounded-3xl bg-card p-6 shadow-sm sm:p-8">
			{#if submitted}
				<div class="flex flex-col items-start gap-4">
					<span
						class="flex h-12 w-12 items-center justify-center rounded-full bg-icon-green text-ink"
					>
						<Check size={24} aria-hidden="true" />
					</span>
					<h2 class="font-display text-2xl font-extrabold tracking-tight text-ink">
						Thanks, {submittedName}!
					</h2>
					<p class="leading-relaxed text-body">
						Your message passed validation — and went nowhere, because this is a demo. It wasn't
						sent anywhere and nothing was stored.
					</p>
					<Button variant="secondary" size="sm" onclick={sendAnother}>Send another message</Button>
				</div>
			{:else}
				<h2 class="font-display text-xl font-bold text-ink">Send a message</h2>
				<p class="mt-2 rounded-xl bg-lilac px-4 py-3 text-sm leading-relaxed text-body">
					Demo form — validated in the browser only. Real delivery arrives in a later phase.
				</p>
				<form method="POST" use:enhance class="mt-6 space-y-5">
					<div>
						<label for="contact-name" class="mb-1.5 block font-display text-sm font-bold text-ink">
							Name
						</label>
						<input
							id="contact-name"
							name="name"
							type="text"
							autocomplete="name"
							placeholder="Your name"
							bind:value={$form.name}
							aria-invalid={$errors.name?.length ? 'true' : undefined}
							aria-describedby={$errors.name?.length ? 'contact-name-error' : undefined}
							class={inputClass}
						/>
						{#if $errors.name?.length}
							<p
								id="contact-name-error"
								class="mt-1.5 text-sm font-medium text-accent-dark"
								role="alert"
							>
								{$errors.name[0]}
							</p>
						{/if}
					</div>
					<div>
						<label for="contact-email" class="mb-1.5 block font-display text-sm font-bold text-ink">
							Email
						</label>
						<input
							id="contact-email"
							name="email"
							type="email"
							autocomplete="email"
							placeholder="you@example.com"
							bind:value={$form.email}
							aria-invalid={$errors.email?.length ? 'true' : undefined}
							aria-describedby={$errors.email?.length ? 'contact-email-error' : undefined}
							class={inputClass}
						/>
						{#if $errors.email?.length}
							<p
								id="contact-email-error"
								class="mt-1.5 text-sm font-medium text-accent-dark"
								role="alert"
							>
								{$errors.email[0]}
							</p>
						{/if}
					</div>
					<div>
						<label
							for="contact-message"
							class="mb-1.5 block font-display text-sm font-bold text-ink"
						>
							Message
						</label>
						<textarea
							id="contact-message"
							name="message"
							rows="5"
							placeholder="Tell me about your idea…"
							bind:value={$form.message}
							aria-invalid={$errors.message?.length ? 'true' : undefined}
							aria-describedby={$errors.message?.length ? 'contact-message-error' : undefined}
							class={inputClass}></textarea>
						{#if $errors.message?.length}
							<p
								id="contact-message-error"
								class="mt-1.5 text-sm font-medium text-accent-dark"
								role="alert"
							>
								{$errors.message[0]}
							</p>
						{/if}
					</div>
					<Button type="submit">
						Send message <Send size={18} aria-hidden="true" />
					</Button>
				</form>
			{/if}
		</div>
	</div>
</div>
