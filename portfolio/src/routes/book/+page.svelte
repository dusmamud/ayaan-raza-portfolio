<script lang="ts">
	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import { SvelteDate } from 'svelte/reactivity';
	import { Calendar, Check, Clock, Video } from '@lucide/svelte';
	import { reveal } from '#lib/actions/reveal';
	import Breadcrumbs from '#lib/components/ui/Breadcrumbs.svelte';
	import Button from '#lib/components/ui/Button.svelte';
	import CtaBand from '#lib/components/ui/CtaBand.svelte';
	import PageHeader from '#lib/components/ui/PageHeader.svelte';
	import { cn } from '#lib/utils/cn';

	let { data }: { data: PageData } = $props();

	// Demo booking widget: everything happens locally, nothing is
	// scheduled or sent. Days are generated on the client (tomorrow
	// onwards, skipping Sundays); "taken" slots are deterministic so
	// the demo is stable across reloads.
	const slots = ['10:00', '11:30', '13:00', '14:30', '16:00', '17:30'];

	type DayOption = { label: string; sub: string; full: string };
	let days: DayOption[] = $state([]);
	let selectedDay = $state(-1);
	let selectedSlot = $state(-1);
	let name = $state('');
	let email = $state('');
	let type = $state('New website');
	let note = $state('');
	let booked = $state(false);
	let slotError = $state(false);

	onMount(() => {
		const list: DayOption[] = [];
		const cursor = new SvelteDate();
		cursor.setDate(cursor.getDate() + 1);
		while (list.length < 7) {
			if (cursor.getDay() !== 0) {
				list.push({
					label: cursor.toLocaleDateString('en-IN', { weekday: 'short' }),
					sub: cursor.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
					full: cursor.toLocaleDateString('en-IN', {
						weekday: 'long',
						day: 'numeric',
						month: 'long'
					})
				});
			}
			cursor.setDate(cursor.getDate() + 1);
		}
		days = list;
	});

	function isTaken(dayIndex: number, slotIndex: number): boolean {
		return (dayIndex + slotIndex * 2) % 4 === 1;
	}

	// If the chosen day makes the chosen slot taken, clear the slot.
	$effect(() => {
		if (selectedDay >= 0 && selectedSlot >= 0 && isTaken(selectedDay, selectedSlot)) {
			selectedSlot = -1;
		}
	});

	function bookAnother() {
		booked = false;
		selectedDay = -1;
		selectedSlot = -1;
		name = '';
		email = '';
		note = '';
	}

	function onSubmit(event: SubmitEvent) {
		event.preventDefault();
		if (selectedDay < 0 || selectedSlot < 0) {
			slotError = true;
			return;
		}
		const form = event.target as HTMLFormElement;
		if (!form.checkValidity()) {
			form.reportValidity();
			return;
		}
		booked = true;
	}

	const inputClass =
		'w-full rounded-xl border border-ink/15 bg-card px-4 py-3 text-ink placeholder:text-body/60 focus:border-accent';
	const chipClass =
		'cursor-pointer rounded-xl border px-3 py-2 text-center text-sm font-bold transition-colors peer-checked:border-accent peer-checked:bg-accent peer-checked:text-white hover:border-accent peer-disabled:cursor-not-allowed peer-disabled:border-ink/10 peer-disabled:bg-ink/5 peer-disabled:text-body/50 peer-disabled:line-through peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent';
</script>

<svelte:head>
	<title>Book a call — Ayaan Raza</title>
	<meta
		name="description"
		content="Book a free 30-minute intro call with Ayaan Raza. Demo booking — nothing is scheduled or sent."
	/>
	<meta property="og:title" content="Book a call — Ayaan Raza" />
	<meta
		property="og:description"
		content="Book a free 30-minute intro call with Ayaan Raza. Demo booking — nothing is scheduled or sent."
	/>
	<meta property="og:url" content="{data.site.baseUrl}/book" />
	<meta property="og:image" content="{data.site.baseUrl}/og/book.jpg" />
	<meta name="twitter:title" content="Book a call — Ayaan Raza" />
	<meta
		name="twitter:description"
		content="Book a free 30-minute intro call with Ayaan Raza. Demo booking — nothing is scheduled or sent."
	/>
	<link rel="canonical" href="{data.site.baseUrl}/book" />
</svelte:head>

<div class="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
	<Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Book a call' }]} />
	<div class="mt-6">
		<PageHeader
			eyebrow="Book a call"
			title="Book a free intro call"
			description="Thirty minutes, no pitch. We talk about your idea, what it would take to build, and whether I'm the right person for it."
		/>
	</div>

	<div class="mt-12 grid gap-10 lg:grid-cols-5">
		<div class="lg:col-span-2" use:reveal>
			<h2 class="font-display text-xl font-bold text-ink">What to expect</h2>
			<ul class="mt-4 space-y-4 leading-relaxed text-body">
				<li class="flex gap-3">
					<Clock size={20} aria-hidden="true" class="mt-0.5 shrink-0 text-accent" />
					<span
						><strong class="text-ink">30 minutes.</strong> Sharp start, sharp end — your time is respected.</span
					>
				</li>
				<li class="flex gap-3">
					<Video size={20} aria-hidden="true" class="mt-0.5 shrink-0 text-accent" />
					<span
						><strong class="text-ink">Video call.</strong> Camera optional. A link would arrive by email
						on a real booking.</span
					>
				</li>
				<li class="flex gap-3">
					<Calendar size={20} aria-hidden="true" class="mt-0.5 shrink-0 text-accent" />
					<span
						><strong class="text-ink">A clear agenda.</strong> Your goal, the scope, the timeline, and
						a written quote afterwards.</span
					>
				</li>
			</ul>
			<p class="mt-6 text-sm text-body">
				All times are India time (IST, demo). Prefer writing?
				<a href="/contact" class="font-bold text-accent-darker hover:text-accent-dark"
					>Send a message</a
				> instead.
			</p>
		</div>

		<div class="lg:col-span-3" use:reveal={{ delay: 100 }}>
			{#if booked}
				<div class="rounded-3xl bg-card p-6 text-center shadow-sm sm:p-8">
					<span
						class="mx-auto inline-flex rounded-full bg-icon-green p-4 text-ink"
						aria-hidden="true"
					>
						<Check size={28} />
					</span>
					<h2 class="mt-4 font-display text-2xl font-extrabold tracking-tight text-ink">
						You're booked, {name}!
					</h2>
					<p class="mx-auto mt-2 max-w-md leading-relaxed text-body">
						{days[selectedDay].full} at {slots[selectedSlot]} IST — a {type.toLowerCase()} call. This
						is a demo booking: nothing was scheduled or sent anywhere.
					</p>
					<div class="mt-6">
						<Button onclick={bookAnother} variant="secondary">Book another call</Button>
					</div>
				</div>
			{:else}
				<form class="rounded-3xl bg-card p-6 shadow-sm sm:p-8" onsubmit={onSubmit}>
					<fieldset>
						<legend class="font-display text-lg font-bold text-ink">1. Pick a day</legend>
						{#if days.length === 0}
							<p class="mt-3 min-h-[3.5rem] text-sm text-body">Loading available days…</p>
						{:else}
							<div class="mt-3 flex min-h-[3.5rem] flex-wrap gap-2">
								{#each days as day, i (day.full)}
									<label>
										<input
											type="radio"
											name="day"
											class="peer sr-only"
											value={i}
											bind:group={selectedDay}
										/>
										<span class={cn(chipClass, 'block min-w-[4.25rem]')}>
											{day.label}
											<span class="block text-xs font-medium opacity-80">{day.sub}</span>
										</span>
									</label>
								{/each}
							</div>
						{/if}
					</fieldset>

					<fieldset class="mt-7">
						<legend class="font-display text-lg font-bold text-ink">2. Pick a time</legend>
						<div class="mt-3 flex flex-wrap gap-2">
							{#each slots as slot, j (slot)}
								<label>
									<input
										type="radio"
										name="slot"
										class="peer sr-only"
										value={j}
										bind:group={selectedSlot}
										disabled={selectedDay >= 0 && isTaken(selectedDay, j)}
									/>
									<span class={cn(chipClass, 'block min-w-[4.5rem]')}>{slot}</span>
								</label>
							{/each}
						</div>
						<p class="mt-2 text-xs text-body">
							Struck-through times are already taken (demo). Pick a day first — availability depends
							on it.
						</p>
						{#if slotError && (selectedDay < 0 || selectedSlot < 0)}
							<p role="alert" class="mt-2 text-sm font-bold text-accent-darker">
								Please pick a day and a time.
							</p>
						{/if}
					</fieldset>

					<fieldset class="mt-7">
						<legend class="font-display text-lg font-bold text-ink">3. Your details</legend>
						<div class="mt-3 grid gap-4 sm:grid-cols-2">
							<div>
								<label for="book-name" class="mb-1.5 block text-sm font-bold text-ink">
									Name
								</label>
								<input
									id="book-name"
									class={inputClass}
									type="text"
									required
									autocomplete="name"
									placeholder="Your name"
									bind:value={name}
								/>
							</div>
							<div>
								<label for="book-email" class="mb-1.5 block text-sm font-bold text-ink">
									Email
								</label>
								<input
									id="book-email"
									class={inputClass}
									type="email"
									required
									autocomplete="email"
									placeholder="you@example.com"
									bind:value={email}
								/>
							</div>
						</div>
						<div class="mt-4">
							<label for="book-type" class="mb-1.5 block text-sm font-bold text-ink">
								What is the call about?
							</label>
							<select id="book-type" class={inputClass} bind:value={type}>
								<option>New website</option>
								<option>Mobile app</option>
								<option>Redesign</option>
								<option>Something else</option>
							</select>
						</div>
						<div class="mt-4">
							<label for="book-note" class="mb-1.5 block text-sm font-bold text-ink">
								Anything I should know? <span class="font-normal text-body">(optional)</span>
							</label>
							<textarea
								id="book-note"
								class={inputClass}
								rows="3"
								placeholder="A sentence or two about your project…"
								bind:value={note}></textarea>
						</div>
					</fieldset>

					<div class="mt-7">
						<Button type="submit">Confirm booking</Button>
						<p class="mt-3 text-sm text-body">
							Demo booking — nothing is scheduled or sent anywhere.
						</p>
					</div>
				</form>
			{/if}
		</div>
	</div>
</div>

<CtaBand />
