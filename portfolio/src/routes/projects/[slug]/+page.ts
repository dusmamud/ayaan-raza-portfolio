import { error } from '@sveltejs/kit';
import { site } from '#lib/data/site';
import { getProject, projects } from '#lib/data/projects';
import type { EntryGenerator, PageLoad } from './$types';

export const entries: EntryGenerator = () => projects.map((project) => ({ slug: project.slug }));

export const load: PageLoad = ({ params }) => {
	const project = getProject(params.slug);
	if (!project) error(404, 'Project not found');
	return {
		site,
		project,
		others: projects.filter((item) => item.slug !== project.slug)
	};
};
