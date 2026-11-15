import { certifications } from '#lib/data/home';
import { site } from '#lib/data/site';
import { stats } from '#lib/data/services';
import type { PageLoad } from './$types';

export const load: PageLoad = () => ({ site, stats, certifications });
