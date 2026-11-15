import { z } from 'zod';
import { tintSchema } from './service';

export const experienceSchema = z.object({
	id: z.string().min(1),
	role: z.string().min(1),
	company: z.string().min(1),
	period: z.string().min(1),
	description: z.string().min(1),
	tags: z.array(z.string().min(1)).min(1)
});
export type Experience = z.infer<typeof experienceSchema>;

export const processStepSchema = z.object({
	id: z.string().min(1),
	step: z.number().int().min(1),
	title: z.string().min(1),
	description: z.string().min(1)
});
export type ProcessStep = z.infer<typeof processStepSchema>;

export const testimonialSchema = z.object({
	id: z.string().min(1),
	quote: z.string().min(1),
	name: z.string().min(1),
	role: z.string().min(1),
	initials: z.string().min(1).max(3),
	tint: tintSchema
});
export type Testimonial = z.infer<typeof testimonialSchema>;

export const faqSchema = z.object({
	id: z.string().min(1),
	question: z.string().min(1),
	answer: z.string().min(1)
});
export type Faq = z.infer<typeof faqSchema>;
