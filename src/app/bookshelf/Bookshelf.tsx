"use client";

import { useRef, useState } from "react";
import clsx from "clsx";

import { BookCard } from "~/lib/client/components/BookCard";
import { useMediaQuery } from "~/lib/client/hooks/useMediaQuery";
import type { BookMeta } from "~/lib/shared/types/book";

import styles from "./page.module.scss";

interface BookshelfProps {
	books: BookMeta[];
	genres: string[];
}

export function Bookshelf({ books, genres }: BookshelfProps) {
	const [activeGenre, setActiveGenre] = useState<string | null>(null);
	const [reviewedOnly, setReviewedOnly] = useState(false);
	const booksListRef = useRef<HTMLDivElement>(null);
	const isMobile = useMediaQuery("(max-width: 576px)");
	const prefersReducedMotion = useMediaQuery(
		"(prefers-reduced-motion: reduce)"
	);

	const scrollBooksIntoView = () => {
		if (!isMobile) {
			return;
		}

		requestAnimationFrame(() => {
			booksListRef.current?.scrollIntoView({
				behavior: prefersReducedMotion ? "auto" : "smooth",
				block: "start",
			});
		});
	};

	const filtered = books.filter(b => {
		if (activeGenre) return b.genre?.includes(activeGenre);

		if (reviewedOnly) return b.hasReview;

		return true;
	});

	const reviewCount = books.filter(b => b.hasReview).length;

	return (
		<div className="container">
			<div className={styles.stats}>
				<div className={styles.stat}>
					<span className={styles.statValue}>{books.length}</span>
					<span className={styles.statLabel}>Books read</span>
				</div>
				<div className={styles.stat}>
					<span className={styles.statValue}>{reviewCount}</span>
					<span className={styles.statLabel}>Reviews written</span>
				</div>
				<div className={styles.stat}>
					<span className={styles.statValue}>{genres.length}</span>
					<span className={styles.statLabel}>Genres</span>
				</div>
			</div>

			<div className={styles.filters}>
				<span className={styles.filterLabel}>Filter</span>

				<button
					className={clsx(
						styles.filterBtn,
						activeGenre === null && !reviewedOnly && styles.active
					)}
					onClick={() => {
						setActiveGenre(null);
						setReviewedOnly(false);
						scrollBooksIntoView();
					}}
					type="button"
				>
					All
				</button>

				<button
					className={clsx(styles.filterBtn, reviewedOnly && styles.active)}
					onClick={() => {
						setReviewedOnly(v => !v);
						scrollBooksIntoView();
					}}
					aria-pressed={reviewedOnly}
					type="button"
				>
					Reviewed
				</button>

				{genres.map(genre => (
					<button
						key={genre}
						className={clsx(
							styles.filterBtn,
							activeGenre === genre && styles.active
						)}
						onClick={() => {
							setReviewedOnly(false);
							setActiveGenre(activeGenre === genre ? null : genre);
							scrollBooksIntoView();
						}}
						aria-pressed={activeGenre === genre}
						type="button"
					>
						{genre}
					</button>
				))}
			</div>

			{/* Book count + legend */}
			<p className={styles.bookCount}>
				{filtered.length === books.length
					? `${books.length} book${books.length !== 1 ? "s" : ""}`
					: `${filtered.length} of ${books.length} book${books.length !== 1 ? "s" : ""}`}
			</p>

			<p className={styles.legend}>
				<span className={styles.legendSwatch} aria-hidden="true" />
				Purple border = review written
			</p>

			{/* Grid */}
			<div ref={booksListRef} className={styles.grid}>
				{filtered.length > 0 ? (
					filtered.map(book => (
						<BookCard key={book.slug ?? book.title} book={book} />
					))
				) : (
					<div className={styles.empty}>
						<p className={styles.emptyText}>No books in this category yet.</p>
					</div>
				)}
			</div>
		</div>
	);
}
