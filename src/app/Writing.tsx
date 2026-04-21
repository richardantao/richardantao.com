import { PostRow } from "~/lib/client/components/PostRow";
import { SectionHeader } from "~/lib/client/components/SectionHeader";
import { HOME_WRITING_POSTS } from "~/lib/shared/fixtures/writing";

import styles from "./Writing.module.scss";

export function Writing() {
	return (
		<section aria-labelledby="writing-heading">
			<div className="container">
				<SectionHeader
					overline="Writing"
					title="On building, thinking, shipping"
					viewAllHref="/writing"
				/>
				<div className={styles.list}>
					{HOME_WRITING_POSTS.map(post => (
						<PostRow key={post.slug} post={post} />
					))}
				</div>
			</div>
		</section>
	);
}
