import { describe, expect, it } from 'vitest';
import { education, experience, faqs, processSteps, testimonials } from '#lib/data/home';
import { site } from '#lib/data/site';
import { getProject, projects } from '#lib/data/projects';
import { posts } from '#lib/data/posts';
import { getService, getServiceDetail, serviceDetails, services, stats } from '#lib/data/services';
import { tech } from '#lib/data/tech';

// Importing the data modules runs their Zod validation, so these tests
// prove the demo data is valid, complete and internally consistent.
describe('demo data', () => {
	it('has four projects with unique slugs that all resolve', () => {
		expect(projects).toHaveLength(4);
		const slugs = projects.map((project) => project.slug);
		expect(new Set(slugs).size).toBe(slugs.length);
		for (const slug of slugs) {
			expect(getProject(slug)?.slug).toBe(slug);
		}
		expect(getProject('no-such-project')).toBeUndefined();
	});

	it('has four services and four stats', () => {
		expect(services).toHaveLength(4);
		expect(stats).toHaveLength(4);
	});

	it('has unique nav hrefs and a demo contact block', () => {
		const hrefs = site.nav.map((link) => link.href);
		expect(new Set(hrefs).size).toBe(hrefs.length);
		expect(site.email).toContain('.demo');
		expect(site.phone).toContain('00000');
	});

	it('has three blog posts with unique slugs', () => {
		expect(posts).toHaveLength(3);
		const slugs = posts.map((post) => post.slug);
		expect(new Set(slugs).size).toBe(slugs.length);
	});

	it('has experience, process steps, testimonials and faqs', () => {
		expect(experience).toHaveLength(3);
		expect(processSteps.map((step) => step.step)).toEqual([1, 2, 3, 4]);
		expect(testimonials).toHaveLength(3);
		expect(faqs).toHaveLength(5);
	});

	it('has thirteen tech entries with unique ids and brand colors', () => {
		expect(tech).toHaveLength(13);
		const ids = tech.map((item) => item.id);
		expect(new Set(ids).size).toBe(ids.length);
		for (const item of tech) {
			expect(item.color).toMatch(/^#[0-9A-Fa-f]{6}$/);
			expect(item.path.length).toBeGreaterThan(50);
		}
	});

	it('has a detail page for every service with resolving related projects', () => {
		expect(serviceDetails).toHaveLength(services.length);
		for (const service of services) {
			expect(getService(service.id)?.id).toBe(service.id);
			const detail = getServiceDetail(service.id);
			expect(detail).toBeDefined();
			for (const slug of detail!.relatedSlugs) {
				expect(getProject(slug)).toBeDefined();
			}
		}
		expect(getService('no-such-service')).toBeUndefined();
		expect(getServiceDetail('no-such-service')).toBeUndefined();
	});

	it('has two education entries', () => {
		expect(education).toHaveLength(2);
	});
});
