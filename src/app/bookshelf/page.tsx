import type { Metadata } from "next";

import { BOOKS, getBookGenres } from "~/lib/shared/fixtures/books";

import { Bookshelf } from "./Bookshelf";
import styles from "./page.module.scss";

export const metadata: Metadata = {
	title: "Bookshelf",
	description:
		"Books I've read — with reviews and reflections on the ones that shaped how I think about building, product, and engineering.",
};

export default async function BookshelfPage(_: PageProps<"/bookshelf">) {
	const genres = getBookGenres(BOOKS);

	return (
		<>
			<div className={styles.header}>
				<div className={`container ${styles.headerInner}`}>
					<p className={styles.overline}>Bookshelf</p>
					<h1 className={styles.title}>What I've been reading</h1>
					<p className={styles.description}>
						Books that have shaped how I think about building products, running a company, love and relationships, and the meaning of life.
					</p>
				</div>
			</div>
			<Bookshelf books={BOOKS} genres={genres} />
		</>
	);
}
