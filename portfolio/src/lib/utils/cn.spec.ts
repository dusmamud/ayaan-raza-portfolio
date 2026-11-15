import { expect, test } from 'vitest';
import { cn } from './cn';

test('cn merges conflicting tailwind classes', () => {
	expect(cn('px-2', 'px-4')).toBe('px-4');
});

test('cn ignores falsy values', () => {
	expect(cn('text-ink', false, undefined, 'font-bold')).toBe('text-ink font-bold');
});
