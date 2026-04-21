import "server-only";

import type { Book, BookMeta, ReviewedBookMeta } from "~/lib/shared/types/book";

export const BOOKS: BookMeta[] = [
	{
		slug: "atomic-habits",
		title: "Atomic Habits",
		author: "James Clear",
		rating: 4,
		spineColor: "blue",
		hasReview: false,
		genre: ["Habits", "Self-Improvement"],
	},
	{
		slug: "brave-new-world",
		title: "Brave New World",
		author: "Aldous Huxley",
		rating: 4,
		spineColor: "indigo",
		hasReview: false,
		genre: ["Fiction", "Dystopian"],
	},
	{
		slug: "crossing-the-chasm",
		title: "Crossing the Chasm",
		author: "Geoffrey Moore",
		rating: 5,
		spineColor: "amber",
		hasReview: false,
		genre: ["Business", "Marketing"],
	},
	{
		slug: "chip-war",
		title: "Chip War",
		author: "Chris Miller",
		rating: 3,
		spineColor: "teal",
		hasReview: false,
		genre: ["Technology", "History"],
	},
	{
		slug: "deep-work",
		title: "Deep Work",
		author: "Cal Newport",
		rating: 5,
		spineColor: "slate",
		hasReview: false,
		genre: ["Productivity", "Self-Improvement"],
	},
	{
		slug: "grit",
		title: "Grit",
		author: "Angela Duckworth",
		rating: 4,
		spineColor: "violet",
		hasReview: false,
		genre: ["Psychology", "Self-Improvement"],
	},
	{
		slug: "how-to-be-an-adult-in-relationships",
		title:
			"How to Be an Adult in Relationships: The Five Keys to Mindful Loving",
		author: "David Richo",
		rating: 4,
		spineColor: "blue",
		hasReview: false,
		genre: ["Relationships", "Mindfulness"],
	},
	// {
	// 	slug: "how-to-change-your-mind",
	// 	title: "How to Change Your Mind",
	// 	author: "Michael Pollan",
	// 	rating: 4,
	// 	spineColor: "slate",
	// 	hasReview: false,
	// 	genre: ["Psychology", "Neuroscience"],
	// },
	{
		slug: "mans-search-for-meaning",
		title: "Man's Search for Meaning",
		author: "Viktor Frankl",
		rating: 5,
		spineColor: "indigo",
		hasReview: false,
		genre: ["Psychology", "Philosophy"],
	},
	{
		slug: "nineteen-eighty-four",
		title: "Nineteen Eighty-Four",
		author: "George Orwell",
		rating: 4,
		spineColor: "amber",
		hasReview: false,
		genre: ["Fiction", "Dystopian"],
	},
	{
		slug: "never-split-the-difference",
		title: "Never Split the Difference",
		author: "Chris Voss",
		rating: 3,
		spineColor: "teal",
		hasReview: false,
		genre: ["Negotiation", "Business"],
	},
	{
		slug: "power-and-prediction",
		title:
			"Power and Prediction: The Disruptive Economics of Artificial Intelligence",
		author: "Ajay Agrawal",
		rating: 4,
		spineColor: "violet",
		hasReview: false,
		genre: ["AI", "Economics"],
	},
	{
		slug: "prediction-machines",

		title:
			"Prediction Machines: The Simple Economics of Artificial Intelligence",
		author: "Ajay Agrawal",
		rating: 4,
		spineColor: "blue",
		hasReview: false,
		finishedDate: "2025-07-14",
		genre: ["AI", "Economics"],
	},
	{
		slug: "the-brain-that-changes-itself",
		title: "The Brain that Changes Itself",
		author: "Norman Doidge",
		rating: 4,
		spineColor: "indigo",
		hasReview: false,
		genre: ["Neuroscience", "Psychology"],
	},
	{
		slug: "the-lean-startup",
		title: "The Lean Startup",
		author: "Eric Ries",
		rating: 4,
		spineColor: "amber",
		hasReview: false,
		genre: ["Business", "Startups"],
	},
	{
		slug: "the-power-of-now",
		title: "The Power of Now",
		author: "Eckhart Tolle",
		rating: 4,
		spineColor: "teal",
		hasReview: false,
		genre: ["Mindfulness", "Spirituality"],
	},
	{
		slug: "the-4-hour-workweek",
		title: "The 4-Hour Workweek",
		author: "Tim Ferriss",
		rating: 4,
		spineColor: "slate",
		hasReview: false,
		genre: ["Lifestyle", "Productivity"],
	},
	{
		slug: "thinking-fast-and-slow",
		title: "Thinking Fast and Slow",
		author: "Daniel Kahneman",
		rating: 5,
		spineColor: "violet",
		hasReview: false,
		genre: ["Psychology", "Behavioral Economics"],
	},
	{
		slug: "zero-to-one",
		title: "Zero to One",
		author: "Peter Thiel",
		rating: 5,
		spineColor: "blue",
		hasReview: false,
		genre: ["Business", "Startups"],
	},
];

export const REVIEWED_BOOKS: ReviewedBookMeta[] = BOOKS.filter(
	(book): book is ReviewedBookMeta => book.hasReview
);

export const HOME_BOOKS: Book[] = BOOKS.slice(0, 5).map(book => {
	if (book.hasReview) {
		return {
			slug: book.slug,
			title: book.title,
			author: book.author,
			rating: book.rating,
			spineColor: book.spineColor,
			hasReview: true,
		};
	}

	return {
		slug: book.slug,
		title: book.title,
		author: book.author,
		rating: book.rating,
		spineColor: book.spineColor,
		hasReview: false,
	};
});

export function getBookGenres(books: BookMeta[] = BOOKS): string[] {
	const seen = new Set<string>();
	const genres: string[] = [];

	for (const book of books) {
		for (const genre of book.genre ?? []) {
			if (!seen.has(genre)) {
				seen.add(genre);
				genres.push(genre);
			}
		}
	}

	return genres;
}
