import { z } from 'zod';

export const projectTintSchema = z.enum(['green', 'pink', 'yellow', 'purple', 'blue', 'orange']);
export type ProjectTint = z.infer<typeof projectTintSchema>;

export const mockupVariantSchema = z.enum([
	'food',
	'shop',
	'finance',
	'fitness',
	'travel',
	'tasks'
]);
export type MockupVariant = z.infer<typeof mockupVariantSchema>;

export const projectMetricSchema = z.object({
	value: z.string().min(1),
	label: z.string().min(1)
});
export type ProjectMetric = z.infer<typeof projectMetricSchema>;

export const projectSchema = z.object({
	slug: z.string().regex(/^[a-z0-9-]+$/),
	title: z.string().min(1),
	category: z.string().min(1),
	description: z.string().min(1),
	tint: projectTintSchema,
	mockup: mockupVariantSchema,
	tags: z.array(z.string().min(1)).min(1),
	year: z.string().regex(/^\d{4}$/),
	role: z.string().min(1),
	/** Demo build duration, e.g. "8 weeks". */
	timeline: z.string().min(1),
	/** Demo outcome numbers shown on the case study page. */
	metrics: z.array(projectMetricSchema).min(1),
	overview: z.string().min(1),
	challenge: z.string().min(1),
	solution: z.string().min(1),
	outcome: z.string().min(1)
});
export type Project = z.infer<typeof projectSchema>;
