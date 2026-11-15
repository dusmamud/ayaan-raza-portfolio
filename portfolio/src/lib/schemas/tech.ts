import { z } from 'zod';

export const techGroupSchema = z.enum(['frontend', 'backend', 'tools']);
export type TechGroup = z.infer<typeof techGroupSchema>;

export const techSchema = z.object({
	id: z.string().min(1),
	name: z.string().min(1),
	group: techGroupSchema,
	/** Brand hex color, used as the icon fill. */
	color: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
	/** Simple Icons (CC0) SVG path data, 24x24 viewBox. */
	path: z.string().min(1)
});
export type Tech = z.infer<typeof techSchema>;
