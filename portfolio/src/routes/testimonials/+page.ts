import { testimonials } from '#lib/data/home';
import { site } from '#lib/data/site';
import type { PageLoad } from './$types';

export const load: PageLoad = () => ({ site, testimonials });
