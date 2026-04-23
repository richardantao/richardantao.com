import "server-only";

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

import { BOOKS } from "~/lib/shared/fixtures/books";
import type { BookMeta, ReviewedBookMeta, SpineColor } from "~/lib/shared/types/book";

const BOOKS_DIR = path.join(process.cwd(), "src/content/bookshelf");

// =============================================================================
// READERS
// =============================================================================

// Returns all books from the shared fixtures.
export async function getAllBooks(): Promise<BookMeta[]> {
	return BOOKS;
}

// Returns only books that have a written review.
export async function getReviewedBooks(): Promise<ReviewedBookMeta[]> {
	const books = await getAllBooks();
	return books.filter((book): book is ReviewedBookMeta => book.hasReview);
}

// Returns raw MDX source + frontmatter for a single book review.
// Used in bookshelf/[slug]/page.tsx.
export async function getBook(slug: string): Promise<{
	meta: ReviewedBookMeta;
	content: string;
} | null> {
	const filepath = path.join(BOOKS_DIR, `${slug}.mdx`);
	if (!fs.existsSync(filepath)) return null;

	const raw = fs.readFileSync(filepath, "utf8");
	const { data, content } = matter(raw);
	const finishedDate = (data.finishedDate ?? data.date) as string | undefined;

	if (!finishedDate) {
		return null;
	}

	return {
		meta: {
			slug,
			title: data.title as string,
			author: data.author as string,
			rating: data.rating as number,
			spineColor: (data.spineColor ?? "slate") as SpineColor,
			hasReview: true,
			finishedDate,
			genre: (data.genre ?? []) as string[],
		},
		content,
	};
}

// Used by bookshelf/[slug]/page.tsx → generateStaticParams.
export async function getAllBookSlugs(): Promise<string[]> {
	if (!fs.existsSync(BOOKS_DIR)) return [];
	return fs
		.readdirSync(BOOKS_DIR)
		.filter(f => f.endsWith(".mdx"))
		.map(f => f.replace(/\.mdx$/, ""));
}

