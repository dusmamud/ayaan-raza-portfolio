import { site } from '#lib/data/site';
import { services, stats } from '#lib/data/services';
import { projects } from '#lib/data/projects';
import type { PageLoad } from './$types';

export const load: PageLoad = () => ({ site, services, stats, projects });
