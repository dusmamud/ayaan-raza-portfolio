import { error } from '@sveltejs/kit';
import { site } from '#lib/data/site';
import { getPost, posts } from '#lib/data/posts';
import type { EntryGenerator, PageLoad } from './$types';

export const entries: EntryGenerator = () => posts.map((post) => ({ slug: post.slug }));

export const load: PageLoad = ({ params }) => {
	const post = getPost(params.slug);
	if (!post) error(404, 'Post not found');
	return {
		site,
		post,
		others: posts.filter((item) => item.slug !== post.slug)
	};
};
