import { describe, expect, test } from 'vitest';
import { contactSchema } from './contact';

describe('contactSchema', () => {
	test('accepts valid input', () => {
		const result = contactSchema.safeParse({
			name: 'Ayaan Raza',
			email: 'demo@example.com',
			message: 'Hello, this is a demo message.'
		});
		expect(result.success).toBe(true);
	});

	test('rejects invalid email and short message', () => {
		const result = contactSchema.safeParse({
			name: 'A',
			email: 'not-an-email',
			message: 'hi'
		});
		expect(result.success).toBe(false);
	});
});
