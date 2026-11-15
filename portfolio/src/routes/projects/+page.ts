import { site } from '#lib/data/site';
import { projects } from '#lib/data/projects';
import type { PageLoad } from './$types';

export const load: PageLoad = () => ({ site, projects });
