import { ArrowRight } from '@lucide/svelte';
import * as Bits from 'bits-ui';
import * as Formsnap from 'formsnap';
import { superValidate } from 'sveltekit-superforms';
import { expect, test } from 'vitest';

test('lucide icon component imports', () => {
	expect(ArrowRight).toBeDefined();
});

test('forms libraries import', () => {
	expect(superValidate).toBeDefined();
	expect(Object.keys(Bits).length).toBeGreaterThan(0);
	expect(Object.keys(Formsnap).length).toBeGreaterThan(0);
});
