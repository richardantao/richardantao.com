import type { Metadata } from "next";

import {
	getWritingTags,
	VISIBLE_WRITING_POSTS,
} from "~/lib/shared/fixtures/writing";

import { Writing } from "./Writing";
import styles from "./page.module.scss";

export const metadata: Metadata = {
	title: "Writing",
	description:
		"Essays and notes on building Vita, open source, product decisions, and personal explorations into topics of meaning.",
};

export default async function WritingPage(_: PageProps<"/writing">) {
	const tags = getWritingTags(VISIBLE_WRITING_POSTS);

	return (
		<>
			<div className={styles.header}>
				<div className={`container ${styles.headerInner}`}>
					<p className={styles.overline}>Writing</p>
					<h1 className={styles.title}>On building, thinking, shipping</h1>
					<p className={styles.description}>
						Essays and notes on building Vita, open source, product decisions,
						and personal explorations into topics of meaning.
					</p>
				</div>
			</div>
			<Writing posts={VISIBLE_WRITING_POSTS} tags={tags} />
		</>
	);
}
