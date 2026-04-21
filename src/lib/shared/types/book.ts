export type SpineColor =
	| "blue"
	| "indigo"
	| "teal"
	| "amber"
	| "slate"
	| "violet";

interface BookBase {
	title: string;
	author: string;
	rating: number; // 1-5
	spineColor: SpineColor;
}

export interface ReviewedBook extends BookBase {
	slug: string;
	hasReview: true;
}

export interface UnreviewedBook extends BookBase {
	slug?: string;
	hasReview: false;
}

export type Book = ReviewedBook | UnreviewedBook;

interface BookMetaBase {
	genre?: string[]; // e.g. ["Product", "Business"]
}

export interface ReviewedBookMeta extends ReviewedBook, BookMetaBase {
	finishedDate: string; // ISO string e.g. "2026-03-01" — used for sort
}

export interface UnreviewedBookMeta extends UnreviewedBook, BookMetaBase {
	finishedDate?: string; // ISO string e.g. "2026-03-01" — used for sort
}

export type BookMeta = ReviewedBookMeta | UnreviewedBookMeta;
