import Link from "next/link";
import styles from "./PostRow.module.scss";
import { Tag, type TagColor } from "../Tag";

export interface PostMeta {
	slug: string;
	title: string;
	excerpt: string;
	date: string; // formatted display string e.g. "Apr 2026"
	/**
	 * Unix timestamp in milliseconds, used for sorting. Should be derived from the same date as the `date` string to avoid inconsistencies.
	 */
	timestamp: number;
	readingTime: string; // e.g. "8 min"
	tags: { label: string; color: TagColor }[];
	keywords: string[]; // for SEO, derived from tags and other relevant keywords
	comingSoon?: boolean;
	hiddenInProduction?: boolean;
}

interface PostRowProps {
	post: PostMeta;
}

export function PostRow({ post }: PostRowProps) {
	const { slug, title, excerpt, date, tags } = post;

	return (
		<Link href={`/writing/${slug}`} className={styles.row}>
			<time className={styles.date} dateTime={date}>
				{date}
			</time>
			<div className={styles.content}>
				<h3 className={styles.title}>{title}</h3>
				<p className={styles.excerpt}>{excerpt}</p>
				<div className={styles.tags}>
					{tags.map(t => (
						<Tag key={t.label} color={t.color}>
							{t.label}
						</Tag>
					))}
				</div>
			</div>
			<span className={styles.arrow} aria-hidden="true">
				→
			</span>
		</Link>
	);
}
