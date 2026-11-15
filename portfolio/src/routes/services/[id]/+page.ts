import { error } from '@sveltejs/kit';
import { getProject } from '#lib/data/projects';
import { getService, getServiceDetail, services } from '#lib/data/services';
import { site } from '#lib/data/site';
import type { EntryGenerator, PageLoad } from './$types';

export const entries: EntryGenerator = () => services.map((service) => ({ id: service.id }));

export const load: PageLoad = ({ params }) => {
	const service = getService(params.id);
	const detail = getServiceDetail(params.id);
	if (!service || !detail) error(404, 'Service not found');
	return {
		site,
		service,
		detail,
		others: services.filter((item) => item.id !== service.id),
		related: detail.relatedSlugs
			.map((slug) => getProject(slug))
			.filter((project) => project !== undefined)
	};
};
