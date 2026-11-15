import { error } from '@sveltejs/kit';
import { site } from '#lib/data/site';
import { getPost, posts } from '#lib/data/posts';
import type { EntryGenerator, PageLoad } from './$types';

export const entries: EntryGenerator = () => posts.map((post) => ({ slug: post.slug }));

export const load: PageLoad = ({ params }) => {
	const post = getPost(params.slug);
	if (!post) error(404, 'Post not found');
	const index = posts.findIndex((item) => item.slug === post.slug);
	return {
		site,
		post,
		// Posts are newest-first: the previous item is the newer post.
		prevPost: index > 0 ? posts[index - 1] : undefined,
		nextPost: index < posts.length - 1 ? posts[index + 1] : undefined,
		others: posts.filter((item) => item.slug !== post.slug)
	};
};
