import { z } from 'zod';

// Shared contact-form contract. Client validation in Phase 1, server
// action validation from Phase 2. Demo only until delivery is wired.
export const contactSchema = z.object({
	name: z.string().min(2, 'Name must be at least 2 characters'),
	email: z.string().email('Enter a valid email address'),
	message: z.string().min(10, 'Message must be at least 10 characters')
});

export type ContactInput = z.infer<typeof contactSchema>;
