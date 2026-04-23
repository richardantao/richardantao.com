import "server-only";

import type { PostMeta } from "~/lib/client/components/PostRow";

const SHORT_MONTH_YEAR_FORMATTER = new Intl.DateTimeFormat("en-US", {
	month: "short",
	year: "numeric",
	timeZone: "UTC",
});

export function getShortMonthYearFromTimestamp(timestamp: number): string {
	return SHORT_MONTH_YEAR_FORMATTER.format(new Date(timestamp));
}

function getWritingDateParts(
	year: number,
	month: number,
	date = 1
): Pick<PostMeta, "date" | "timestamp"> {
	const monthIndex = month - 1; // JavaScript Date months are 0-indexed

	const timestamp = Date.UTC(year, monthIndex, date);

	return {
		date: getShortMonthYearFromTimestamp(timestamp),
		timestamp,
	};
}

type TagKey =
	// Technical topics — blue
	| "engineering"
	| "product"
	| "open-source"
	// Non-technical topics — indigo
	| "startup"
	| "personal"
	| "philosophy"
	| "poetry"
	// Writing styles — neutral
	| "essay"
	| "braindump"
	| "reflection"
	| "guide"
	| "analysis";

const tagsMap = new Map<TagKey, PostMeta["tags"][number]>([
	// Technical topics — blue
	["engineering", { label: "Engineering", color: "blue" }],
	["product", { label: "Product", color: "blue" }],
	["startup", { label: "Startup", color: "blue" }],
	// Non-technical topics — indigo
	["open-source", { label: "Open source", color: "green" }],
	["personal", { label: "Personal", color: "green" }],
	["philosophy", { label: "Philosophy", color: "indigo" }],
	["poetry", { label: "Poetry", color: "indigo" }],
	// Writing styles — neutral
	["essay", { label: "Essay", color: "neutral" }],
	["braindump", { label: "Braindump", color: "neutral" }],
	["reflection", { label: "Reflection", color: "neutral" }],
	["guide", { label: "Guide", color: "neutral" }],
	["analysis", { label: "Analysis", color: "neutral" }],
]);

function getTag(tag: TagKey): PostMeta["tags"][number] {
	const entry = tagsMap.get(tag);

	if (!entry) {
		throw new Error(`Missing writing tag definition: ${tag}`);
	}

	return entry;
}

export const WRITING_POSTS: PostMeta[] = [
	{
		slug: "jsoncurrent-stepping-into-the-world-of-open-source",
		title: "jsoncurrent - Stepping Into the World of Open Source",
		excerpt:
			"Building jsoncurrent in the open - the motivations, efforts, and lessons learned shipping my first OSS library while building a startup.",
		...getWritingDateParts(2026, 4, 22),
		readingTime: "7 min",
		tags: [getTag("open-source"), getTag("personal"), getTag("essay")],
	},
	{
		slug: "deep-dive-into-passion",
		title: "A Deep Dive into Passion (and Suffering)",
		excerpt:
			"A reflective essay on the etymology of 'passion', it's relation to suffering, and the cost of caring deeply.",
		...getWritingDateParts(2026, 4, 26),
		readingTime: "10 min",
		tags: [getTag("philosophy"), getTag("reflection")],
		comingSoon: true,
	},
	{
		slug: "design-systems-for-dummies",
		title: "Design Systems for Dummies",
		excerpt:
			"Me. I'm the dummy. How I went about creating a design system for Vita as someone who doesn't work in Figma.",
		...getWritingDateParts(2026, 4, 30),
		readingTime: "5 min",
		tags: [getTag("product"), getTag("guide")],
		comingSoon: true,
	},
	{
		slug: "love-is-the-answer",
		title: "Love is the Answer",
		excerpt: "Maybe life isn't as complicated as we make it out to be.",
		...getWritingDateParts(2026, 5, 2),
		readingTime: "9 min",
		tags: [getTag("philosophy"), getTag("reflection")],
		comingSoon: true,
		hiddenInProduction: true,
	},
	{
		slug: "you-just-have-to-surrender",
		title: "You Just Have to Surrender",
		excerpt:
			"A personal reflection on control, acceptance, and finding peace in letting go of the reins.",
		...getWritingDateParts(2026, 5, 4),
		readingTime: "2 min",
		tags: [getTag("philosophy"), getTag("reflection")],
		comingSoon: true,
		hiddenInProduction: true,
	},
	{
		slug: "love-sex-and-psychedelics",
		title: "Love, Sex, and Psychedelics",
		excerpt: "A personal exploration of intimacy, altered states, and meaning.",
		...getWritingDateParts(2026, 5, 27),
		readingTime: "10 min",
		tags: [getTag("philosophy"), getTag("personal"), getTag("reflection")],
		comingSoon: true,
		hiddenInProduction: true,
	},
	{
		slug: "monorepo-migration",
		title: "Monorepo Migration",
		excerpt:
			"On unifying systems to move faster, reduce friction, and create a more coherent product experience.",
		...getWritingDateParts(2026, 6, 14),
		readingTime: "6 min",
		tags: [getTag("engineering"), getTag("guide")],
		comingSoon: true,
		hiddenInProduction: true,
	},
	{
		slug: "building-vita-solo",
		title: "Building Vita as a Solo Tech Team",
		excerpt:
			"Shipping a full-stack edtech product as a one-person technical team. Roadmap, tradeoffs, and what's actually hard.",
		...getWritingDateParts(2026, 7, 31),
		readingTime: "5 min",
		tags: [getTag("startup"), getTag("personal"), getTag("reflection")],
		comingSoon: true,
		hiddenInProduction: true,
	},
].sort((a, b) => b.timestamp - a.timestamp); // Sort by timestamp descending

export function isWritingPostVisible(
	post: PostMeta,
	env = process.env.NODE_ENV
): boolean {
	return !(env === "production" && post.hiddenInProduction === true);
}

export function getWritingPostBySlug(slug: string): PostMeta | undefined {
	return WRITING_POSTS.find(post => post.slug === slug);
}

export const VISIBLE_WRITING_POSTS = WRITING_POSTS.filter(post =>
	isWritingPostVisible(post)
);

export const HOME_WRITING_POSTS = VISIBLE_WRITING_POSTS.slice(0, 3);

export function getWritingTags(
	posts: PostMeta[] = VISIBLE_WRITING_POSTS
): string[] {
	const seen = new Set<string>();
	const tags: string[] = [];

	for (const post of posts) {
		for (const tag of post.tags) {
			if (!seen.has(tag.label)) {
				seen.add(tag.label);
				tags.push(tag.label);
			}
		}
	}

	return tags;
}
