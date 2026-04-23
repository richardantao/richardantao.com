import "server-only";

import matter from "gray-matter";
import fs from "node:fs";
import path from "node:path";

import type { PostMeta } from "~/lib/client/components/PostRow";

const POSTS_DIR = path.join(process.cwd(), "src/content/writing");

// Returns all post metadata sorted newest-first.
// Called only from server components — never imported in client code.
export async function getAllPosts(): Promise<PostMeta[]> {
	if (!fs.existsSync(POSTS_DIR)) return [];

	const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith(".mdx"));

	const posts = files.map(filename => {
		const slug = filename.replace(/\.mdx$/, "");
		const raw = fs.readFileSync(path.join(POSTS_DIR, filename), "utf8");
		const { data } = matter(raw);

		return {
			slug,
			title: data.title as string,
			excerpt: data.excerpt as string,
			date: data.date as string, // ISO string e.g. "2026-04-01"
			readingTime: data.readingTime as string, // e.g. "8 min"
			tags: (data.tags ?? []) as PostMeta["tags"],
			timestamp: new Date(data.date as string).getTime(),
			keywords: Array.isArray(data.keywords)
				? data.keywords.filter((k): k is string => typeof k === "string")
				: [],
		} satisfies PostMeta;
	});

	return posts.sort((a, b) => b.timestamp - a.timestamp);
}

// Returns raw MDX source + frontmatter for a single post.
// Used in writing/[slug]/page.tsx for static generation.
export async function getPost(slug: string): Promise<{
	meta: PostMeta;
	content: string;
} | null> {
	const filepath = path.join(POSTS_DIR, `${slug}.mdx`);
	if (!fs.existsSync(filepath)) return null;

	const raw = fs.readFileSync(filepath, "utf8");
	const { data, content } = matter(raw);

	return {
		meta: {
			slug,
			title: data.title as string,
			excerpt: data.excerpt as string,
			date: data.date as string,
			readingTime: data.readingTime as string,
			tags: (data.tags ?? []) as PostMeta["tags"],
			timestamp: new Date(data.date as string).getTime(),
			keywords: Array.isArray(data.keywords)
				? data.keywords.filter((k): k is string => typeof k === "string")
				: [],
		},
		content,
	};
}

// Used by writing/[slug]/page.tsx → generateStaticParams
export async function getAllPostSlugs(): Promise<string[]> {
	if (!fs.existsSync(POSTS_DIR)) return [];
	return fs
		.readdirSync(POSTS_DIR)
		.filter(f => f.endsWith(".mdx"))
		.map(f => f.replace(/\.mdx$/, ""));
}
