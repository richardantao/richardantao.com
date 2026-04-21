import Link from "next/link";
import clsx from "clsx";

import type { Book, SpineColor } from "~/lib/shared/types/book";

import styles from "./BookCard.module.scss";

function Stars({ rating }: { rating: number }) {
	return (
		<div
			className={styles.stars}
			role="img"
			aria-label={`${rating} out of 5 stars`}
		>
			{"★".repeat(rating)}
			{"☆".repeat(5 - rating)}
		</div>
	);
}

const SPINE_CLASS: Record<SpineColor, string> = {
	blue: styles.spineBlue,
	indigo: styles.spineIndigo,
	teal: styles.spineTeal,
	amber: styles.spineAmber,
	slate: styles.spineSlate,
	violet: styles.spineViolet,
};

interface BookCardProps {
	book: Book;
}

export function BookCard({ book }: BookCardProps) {
	const { slug, title, author, rating, spineColor, hasReview } = book;

	const inner = (
		<>
			<div
				className={clsx(styles.spine, SPINE_CLASS[spineColor])}
				aria-hidden="true"
			/>
			<div className={styles.title}>{title}</div>
			<div className={styles.author}>{author}</div>
			<Stars rating={rating} />
			{hasReview && <span className={styles.reviewBadge}>review →</span>}
		</>
	);

	if (hasReview && slug) {
		return (
			<Link
				href={`/bookshelf/${slug}`}
				className={clsx(styles.card, styles.hasReview, styles.link)}
				aria-label={`Read review of ${title} by ${author}`}
			>
				{inner}
			</Link>
		);
	}

	return (
		<div className={styles.card} title={`${title} by ${author}`}>
			{inner}
		</div>
	);
}
