"use client";

import { useState } from "react";
import clsx from "clsx";

import { PostRow, type PostMeta } from "~/lib/client/components/PostRow";

import styles from "./page.module.scss";

interface WritingClientProps {
	posts: PostMeta[];
	tags: string[];
}

export function Writing({ posts, tags }: WritingClientProps) {
	const [activeTag, setActiveTag] = useState<string | null>(null);

	const filtered = activeTag
		? posts.filter(p => p.tags.some(t => t.label === activeTag))
		: posts;

	return (
		<div className="container">
			{/* Tag filters */}
			{tags.length > 0 && (
				<div className={styles.filters}>
					<div className={styles.filterRow}>
						<span className={styles.filterLabel}>Filter</span>

						<button
							className={clsx(
								styles.filterBtn,
								activeTag === null && styles.active
							)}
							onClick={() => setActiveTag(null)}
							type="button"
						>
							All
						</button>

						{tags.map(tag => (
							<button
								key={tag}
								className={clsx(
									styles.filterBtn,
									activeTag === tag && styles.active
								)}
								onClick={() => setActiveTag(activeTag === tag ? null : tag)}
								aria-pressed={activeTag === tag}
								type="button"
							>
								{tag}
							</button>
						))}
					</div>
				</div>
			)}

			{/* Post count */}
			<p className={styles.postCount}>
				{filtered.length === posts.length
					? `${posts.length} post${posts.length !== 1 ? "s" : ""}`
					: `${filtered.length} of ${posts.length} post${posts.length !== 1 ? "s" : ""} in ${activeTag}`}
			</p>

			{/* List */}
			<div className={styles.list}>
				{filtered.length > 0 ? (
					filtered.map(post => <PostRow key={post.slug} post={post} />)
				) : (
					<div className={styles.empty}>
						<p className={styles.emptyText}>No posts in this category yet.</p>
					</div>
				)}
			</div>
		</div>
	);
}
