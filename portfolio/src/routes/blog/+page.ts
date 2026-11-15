import { site } from '#lib/data/site';
import { posts } from '#lib/data/posts';
import type { PageLoad } from './$types';

export const load: PageLoad = () => ({ site, posts });
