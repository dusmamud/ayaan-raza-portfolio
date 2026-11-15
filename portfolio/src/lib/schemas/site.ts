import { z } from 'zod';

export const socialIdSchema = z.enum(['github', 'linkedin', 'x', 'instagram', 'mail']);
export type SocialId = z.infer<typeof socialIdSchema>;

export const socialSchema = z.object({
	id: socialIdSchema,
	label: z.string().min(1),
	href: z.string().min(1)
});

export const navLinkSchema = z.object({
	label: z.string().min(1),
	href: z.string().min(1)
});

export const siteSchema = z.object({
	name: z.string().min(1),
	role: z.string().min(1),
	tagline: z.string().min(1),
	email: z.string().min(1),
	phone: z.string().min(1),
	location: z.string().min(1),
	baseUrl: z.string().url(),
	nav: z.array(navLinkSchema).min(1),
	socials: z.array(socialSchema).min(1),
	techStack: z.array(z.string().min(1)).min(1)
});
export type Site = z.infer<typeof siteSchema>;
