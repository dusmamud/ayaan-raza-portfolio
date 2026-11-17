import { error } from '@sveltejs/kit';
import { site } from '#lib/data/site';
import { getProject, projects } from '#lib/data/projects';
import type { EntryGenerator, PageLoad } from './$types';

export const entries: EntryGenerator = () => projects.map((project) => ({ slug: project.slug }));

export const load: PageLoad = ({ params }) => {
	const project = getProject(params.slug);
	if (!project) error(404, 'Project not found');
	const index = projects.findIndex((item) => item.slug === project.slug);
	return {
		site,
		project,
		prevProject: index > 0 ? projects[index - 1] : undefined,
		nextProject: index < projects.length - 1 ? projects[index + 1] : undefined,
		others: projects.filter((item) => item.slug !== project.slug)
	};
};
