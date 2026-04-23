import type { FunctionComponent } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";

import { Tag } from "~/lib/client/components/Tag";
import {
	getWritingPostBySlug,
	isWritingPostVisible,
	VISIBLE_WRITING_POSTS,
} from "~/lib/shared/fixtures/writing";
import { getPost, getAllPostSlugs } from "~/lib/server/posts";

import styles from "./page.module.scss";

const POST_DATE_FORMATTER = new Intl.DateTimeFormat("en-US", {
	year: "numeric",
	month: "short",
	day: "numeric",
});

function getPostDateValue(date: string, timestamp: number): Date | null {
	if (Number.isFinite(timestamp)) {
		return new Date(timestamp);
	}

	const parsed = new Date(date);
	return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function getPostDateTimeAttr(date: string, timestamp: number): string {
	const parsed = getPostDateValue(date, timestamp);
	return parsed ? parsed.toISOString() : date;
}

function getPostDateLabel(date: string, timestamp: number): string {
	const parsed = getPostDateValue(date, timestamp);
	return parsed ? POST_DATE_FORMATTER.format(parsed) : date;
}

export async function generateStaticParams() {
	const slugs = await getAllPostSlugs();
	const visibleSlugs = slugs.filter(slug => {
		const fixturePost = getWritingPostBySlug(slug);
		return !fixturePost || isWritingPostVisible(fixturePost);
	});

	return visibleSlugs.map(slug => ({ slug }));
}

export async function generateMetadata(
	props: PageProps<"/writing/[slug]">
): Promise<Metadata> {
	const params = await props.params;
	const fixturePost = getWritingPostBySlug(params.slug);

	if (fixturePost && !isWritingPostVisible(fixturePost)) {
		return {};
	}

	if (fixturePost?.comingSoon) {
		return {
			title: `${fixturePost.title} (Coming soon)`,
			description: fixturePost.excerpt,
			openGraph: {
				title: `${fixturePost.title} (Coming soon)`,
				description: fixturePost.excerpt,
				type: "article",
				publishedTime: fixturePost.date,
			},
		};
	}

	const post = await getPost(params.slug);

	if (!post && !fixturePost) return {};

	const meta = post?.meta ?? fixturePost;
	const keywords = meta?.keywords?.length
		? meta.keywords
		: (meta?.tags.map(tag => tag.label.toLowerCase()) ?? []);

	if (!meta) return {};

	return {
		title: meta.title,
		description: meta.excerpt,
		keywords,
		openGraph: {
			title: meta.title,
			description: meta.excerpt,
			type: "article",
			publishedTime: meta.date,
		},
	};
}

async function getAdjacentPosts(slug: string) {
	const all = VISIBLE_WRITING_POSTS;
	const index = all.findIndex(p => p.slug === slug);
	return {
		prev: index < all.length - 1 ? all[index + 1] : null, // older
		next: index > 0 ? all[index - 1] : null, // newer
	};
}

export default async function WritingSlugPage(
	props: PageProps<"/writing/[slug]">
) {
	const params = await props.params;
	const fixturePost = getWritingPostBySlug(params.slug);

	if (fixturePost && !isWritingPostVisible(fixturePost)) {
		notFound();
	}

	if (fixturePost?.comingSoon) {
		const { prev, next } = await getAdjacentPosts(params.slug);

		return (
			<>
				<div className={styles.header}>
					<div className="container-narrow">
						<Link href="/writing" className={styles.back}>
							Writing
						</Link>

						<div className={styles.tags}>
							{fixturePost.tags.map(t => (
								<Tag key={t.label} color={t.color}>
									{t.label}
								</Tag>
							))}
						</div>

						<h1 className={styles.title}>{fixturePost.title}</h1>

						<div className={styles.meta}>
							<time
								className={styles.metaItem}
								dateTime={getPostDateTimeAttr(
									fixturePost.date,
									fixturePost.timestamp
								)}
							>
								{getPostDateLabel(fixturePost.date, fixturePost.timestamp)}
							</time>
							<span className={styles.metaDivider} aria-hidden="true" />
							<span className={styles.metaItem}>
								{fixturePost.readingTime} read
							</span>
						</div>
					</div>
				</div>

				<div className="container-narrow">
					<div className={styles.article}>
						<article className={`${styles.body} prose`}>
							<div className={styles.comingSoonBanner}>Coming soon</div>
							<p>{fixturePost.excerpt}</p>
						</article>
					</div>
				</div>

				{(prev || next) && (
					<div className="container-narrow">
						<nav className={styles.postNav} aria-label="Post navigation">
							{prev ? (
								<Link
									href={`/writing/${prev.slug}`}
									className={styles.postNavItem}
								>
									<span className={styles.postNavLabel}>← Older</span>
									<span className={styles.postNavTitle}>{prev.title}</span>
								</Link>
							) : (
								<div />
							)}
							{next && (
								<Link
									href={`/writing/${next.slug}`}
									className={styles.postNavItem}
								>
									<span className={styles.postNavLabel}>Newer →</span>
									<span className={styles.postNavTitle}>{next.title}</span>
								</Link>
							)}
						</nav>
					</div>
				)}
			</>
		);
	}

	const [post, { prev, next }] = await Promise.all([
		getPost(params.slug),
		getAdjacentPosts(params.slug),
	]);

	if (!post) notFound();

	const { meta } = post;

	const { default: PostContent } = (await import(
		`~/content/writing/${params.slug}.mdx`
	)) as { default: FunctionComponent };

	return (
		<>
			{/* Header */}
			<div className={styles.header}>
				<div className="container-narrow">
					<Link href="/writing" className={styles.back}>
						Writing
					</Link>

					<div className={styles.tags}>
						{meta.tags.map(t => (
							<Tag key={t.label} color={t.color}>
								{t.label}
							</Tag>
						))}
					</div>

					<h1 className={styles.title}>{meta.title}</h1>

					<div className={styles.meta}>
						<time
							className={styles.metaItem}
							dateTime={getPostDateTimeAttr(meta.date, meta.timestamp)}
						>
							{getPostDateLabel(meta.date, meta.timestamp)}
						</time>
						<span className={styles.metaDivider} aria-hidden="true" />
						<span className={styles.metaItem}>{meta.readingTime} read</span>
					</div>
				</div>
			</div>

			{/* Article */}
			<div className="container-narrow">
				<div className={styles.article}>
					<article className={`${styles.body} prose`}>
						<PostContent />
					</article>
				</div>
			</div>

			{/* Prev / Next nav */}
			{(prev || next) && (
				<div className="container-narrow">
					<nav className={styles.postNav} aria-label="Post navigation">
						{prev ? (
							<Link
								href={`/writing/${prev.slug}`}
								className={styles.postNavItem}
							>
								<span className={styles.postNavLabel}>← Older</span>
								<span className={styles.postNavTitle}>{prev.title}</span>
							</Link>
						) : (
							<div />
						)}
						{next && (
							<Link
								href={`/writing/${next.slug}`}
								className={styles.postNavItem}
							>
								<span className={styles.postNavLabel}>Newer →</span>
								<span className={styles.postNavTitle}>{next.title}</span>
							</Link>
						)}
					</nav>
				</div>
			)}
		</>
	);
}
