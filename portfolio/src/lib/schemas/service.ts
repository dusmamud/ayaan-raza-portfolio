import { z } from 'zod';

export const serviceIconSchema = z.enum(['smartphone', 'palette', 'cloud', 'bug']);
export type ServiceIconName = z.infer<typeof serviceIconSchema>;

export const tintSchema = z.enum(['icon-lavender', 'icon-pink', 'icon-yellow', 'icon-green']);
export type TintName = z.infer<typeof tintSchema>;

export const serviceSchema = z.object({
	id: z.string().min(1),
	title: z.string().min(1),
	description: z.string().min(1),
	icon: serviceIconSchema,
	tint: tintSchema,
	href: z.string().min(1)
});
export type Service = z.infer<typeof serviceSchema>;

export const statIconSchema = z.enum(['briefcase', 'layers', 'users', 'coffee']);
export type StatIconName = z.infer<typeof statIconSchema>;

export const statSchema = z.object({
	id: z.string().min(1),
	icon: statIconSchema,
	tint: tintSchema,
	label: z.string().min(1),
	/** Final display text, rendered in HTML so it is readable without JS. */
	display: z.string().min(1),
	/** Number the counter animates to, or null for a static display (e.g. ∞). */
	countTo: z.number().nullable(),
	suffix: z.string()
});
export type Stat = z.infer<typeof statSchema>;

export const serviceDetailSchema = z.object({
	/** Matches the service id this detail page belongs to. */
	id: z.string().min(1),
	longDescription: z.string().min(1),
	includes: z.array(z.string().min(1)).min(1),
	approach: z.string().min(1),
	relatedSlugs: z.array(z.string().min(1)).min(1)
});
export type ServiceDetail = z.infer<typeof serviceDetailSchema>;
