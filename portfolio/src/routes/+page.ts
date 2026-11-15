import { experience, faqs, processSteps, testimonials } from '#lib/data/home';
import { posts } from '#lib/data/posts';
import { projects } from '#lib/data/projects';
import { services, stats } from '#lib/data/services';
import { site } from '#lib/data/site';
import { tech } from '#lib/data/tech';
import type { PageLoad } from './$types';

export const load: PageLoad = () => ({
	site,
	services,
	stats,
	projects,
	experience,
	processSteps,
	testimonials,
	faqs,
	posts,
	tech
});
