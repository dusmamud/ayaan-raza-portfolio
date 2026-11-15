import { services } from '#lib/data/services';
import { site } from '#lib/data/site';
import type { PageLoad } from './$types';

export const load: PageLoad = () => ({ site, services });
