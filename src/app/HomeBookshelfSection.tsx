import { BookCard } from "~/lib/client/components/BookCard";
import { SectionHeader } from "~/lib/client/components/SectionHeader";
import { HOME_BOOKS } from "~/lib/shared/fixtures/books";

import styles from "./HomeBookshelfSection.module.scss";

export function BookshelfSection() {
	return (
		<section aria-labelledby="bookshelf-heading">
			<div className="container">
				<SectionHeader
					overline="Bookshelf"
					title="What I've been reading"
					viewAllHref="/bookshelf"
				/>
				<p className={styles.legend}>
					<span className={styles.legendSwatch} aria-hidden="true" />
					Purple border = review written
				</p>
				<div className={styles.grid}>
					{HOME_BOOKS.map(book => (
						<BookCard key={book.title} book={book} />
					))}
				</div>
			</div>
		</section>
	);
}
