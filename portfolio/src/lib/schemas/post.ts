import { z } from 'zod';

export const postSchema = z.object({
	slug: z.string().regex(/^[a-z0-9-]+$/),
	title: z.string().min(1),
	excerpt: z.string().min(1),
	date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
	readTime: z.string().min(1),
	tags: z.array(z.string().min(1)).min(1),
	body: z.array(z.string().min(1)).min(1)
});
export type Post = z.infer<typeof postSchema>;
