import { certifications, education, experience } from '#lib/data/home';
import { projects } from '#lib/data/projects';
import { site } from '#lib/data/site';
import { tech } from '#lib/data/tech';
import type { PageLoad } from './$types';

export const load: PageLoad = () => ({
	site,
	experience,
	education,
	certifications,
	tech,
	projects
});
