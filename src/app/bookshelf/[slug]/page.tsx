import type { FunctionComponent } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";

import { REVIEWED_BOOKS } from "~/lib/shared/fixtures/books";
import { getBook, getAllBookSlugs } from "~/lib/server/books";
import { Tag } from "~/lib/client/components/Tag";
import type { SpineColor } from "~/lib/shared/types/book";

import styles from "./page.module.scss";

const POST_DATE_FORMATTER = new Intl.DateTimeFormat("en-US", {
	year: "numeric",
	month: "short",
	day: "numeric",
});

export async function generateStaticParams() {
	const slugs = await getAllBookSlugs();
	return slugs.map(slug => ({ slug }));
}

export async function generateMetadata(
	props: PageProps<"/bookshelf/[slug]">
): Promise<Metadata> {
	const params = await props.params;
	const book = await getBook(params.slug);
	if (!book) return {};

	return {
		title: `${book.meta.title} — Review`,
		description: `My review and reflections on "${book.meta.title}" by ${book.meta.author}.`,
		openGraph: {
			title: `${book.meta.title} by ${book.meta.author}`,
			description: `Review by Richard Antao`,
			type: "article",
		},
	};
}

async function getAdjacentBooks(slug: string) {
	const all = REVIEWED_BOOKS;
	const index = all.findIndex(b => b.slug === slug);
	return {
		prev: index < all.length - 1 ? all[index + 1] : null,
		next: index > 0 ? all[index - 1] : null,
	};
}

const SPINE_CLASS: Record<SpineColor, string> = {
	blue: styles.spineBlue,
	indigo: styles.spineIndigo,
	teal: styles.spineTeal,
	amber: styles.spineAmber,
	slate: styles.spineSlate,
	violet: styles.spineViolet,
};

export default async function BookshelfSlugPage(
	props: PageProps<"/bookshelf/[slug]">
) {
	const { slug } = await props.params;

	const [book, { prev, next }] = await Promise.all([
		getBook(slug),
		getAdjacentBooks(slug),
	]);

	if (!book) notFound();

	const { meta } = book;

	const { default: BookContent } = (await import(
		`~/content/bookshelf/${slug}.mdx`
	)) as { default: FunctionComponent };

	return (
		<>
			{/* Header */}
			<div className={styles.header}>
				<div className="container-narrow">
					<Link href="/bookshelf" className={styles.back}>
						Bookshelf
					</Link>

					<div className={styles.bookCard}>
						{/* Spine */}
						<div
							className={clsx(styles.spine, SPINE_CLASS[meta.spineColor])}
							aria-hidden="true"
						/>

						{/* Book info */}
						<div className={styles.bookInfo}>
							{meta.genre && meta.genre.length > 0 && (
								<div className={styles.genres}>
									{meta.genre.map(g => (
										<Tag key={g} color="indigo">
											{g}
										</Tag>
									))}
								</div>
							)}

							<h1 className={styles.title}>{meta.title}</h1>
							<p className={styles.author}>{meta.author}</p>

							<div className={styles.meta}>
								{/* Star rating */}
								{/** biome-ignore lint/a11y/useAriaPropsSupportedByRole: static div used to provide a readable stars label */}
								<div
									className={styles.stars}
									aria-label={`${meta.rating} out of 5 stars`}
								>
									{Array.from({ length: 5 }).map((_, i) => (
										<span
											// biome-ignore lint/suspicious/noArrayIndexKey: star slots are a fixed-length visual sequence
											key={i}
											className={
												i < meta.rating ? styles.starFilled : styles.starEmpty
											}
											aria-hidden="true"
										>
											★
										</span>
									))}
								</div>

								{meta.finishedDate && (
									<>
										<span className={styles.metaDivider} aria-hidden="true" />
										<time
											className={styles.metaItem}
											dateTime={meta.finishedDate}
										>
											Finished{" "}
											{POST_DATE_FORMATTER.format(new Date(meta.finishedDate))}
										</time>
									</>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Review body */}
			<div className="container-narrow">
				<article className={`${styles.article} prose`}>
					<BookContent />
				</article>
			</div>

			{/* Prev / Next nav among reviewed books */}
			{(prev || next) && (
				<div className="container-narrow">
					<nav className={styles.bookNav} aria-label="Bookshelf navigation">
						{prev ? (
							<Link
								href={`/bookshelf/${prev.slug}`}
								className={styles.bookNavItem}
							>
								<span className={styles.bookNavLabel}>← Previous review</span>
								<span className={styles.bookNavTitle}>{prev.title}</span>
								<span className={styles.bookNavAuthor}>{prev.author}</span>
							</Link>
						) : (
							<div />
						)}
						{next && (
							<Link
								href={`/bookshelf/${next.slug}`}
								className={styles.bookNavItem}
							>
								<span className={styles.bookNavLabel}>Next review →</span>
								<span className={styles.bookNavTitle}>{next.title}</span>
								<span className={styles.bookNavAuthor}>{next.author}</span>
							</Link>
						)}
					</nav>
				</div>
			)}
		</>
	);
}
