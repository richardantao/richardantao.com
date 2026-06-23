import type { Metadata } from "next";

import { SectionHeader } from "~/lib/client/components/SectionHeader";
import { Tag } from "~/lib/client/components/Tag";

import { BrightspaceActions } from "./BrightspaceActions";
import styles from "./page.module.scss";

const LIBRARY_TAGS = [
	{ label: "TypeScript", color: "blue" as const },
	{ label: "D2L Brightspace", color: "blue" as const },
	{ label: "Open source", color: "indigo" as const },
	{ label: "MIT licensed", color: "neutral" as const },
];

const CAPABILITIES = [
	{
		title: "Auth flows built in",
		copy: "Bearer token, OAuth2 authorization code, OAuth2 client credentials, and legacy ID-Key support are all wrapped behind a consistent client interface.",
	},
	{
		title: "Version negotiation",
		copy: "The client checks API component compatibility with POST /d2l/api/versions/check and pins tested versions so integrations fail fast when hosts are too old.",
	},
	{
		title: "Resource-first API",
		copy: "Instead of hand-rolling HTTP calls, apps use typed namespaces like users, enrollments, grades, quizzes, dropboxes, calendar, org units, and more.",
	},
];

const RESOURCE_GROUPS = [
	{
		group: "Learning Platform (lp)",
		items: [
			"users",
			"enrollments",
			"orgUnits",
			"courses",
			"groups",
			"demographics",
			"news",
		],
	},
	{
		group: "Learning Environment (le)",
		items: [
			"grades",
			"quizzes",
			"dropboxes",
			"assessments",
			"calendar",
			"discussions",
			"content",
			"surveys",
			"checklists",
			"outcomes",
			"releaseConditions",
			"accommodations",
		],
	},
	{
		group: "Admin / Other",
		items: ["awards (bas)", "versions.check()"],
	},
];

export const metadata: Metadata = {
	title: "brightspace-lms",
	description:
		"Open source TypeScript client for the D2L Brightspace Valence API, with authentication, version negotiation, and typed resource wrappers.",
};

export default function BrightspacePage() {
	return (
		<main className={styles.page}>
			<section className={styles.hero}>
				<div className={`container ${styles.heroInner}`}>
					<div className={styles.heroCopy}>
						<p className={styles.overline}>Project / brightspace-lms</p>
						<h1 className={styles.title}>
							A production-grade Brightspace API client for TypeScript apps
						</h1>
						<p className={styles.description}>
							I built brightspace-lms to make the D2L Valence API easier to ship
							against in real products. It wraps authentication, retries,
							middleware, version compatibility checks, pagination, and typed
							resource calls into one reusable SDK.
						</p>
						<div className={styles.tagRow}>
							{LIBRARY_TAGS.map(tag => (
								<Tag key={tag.label} color={tag.color}>
									{tag.label}
								</Tag>
							))}
						</div>
						<div className={styles.actions}>
							<BrightspaceActions />
						</div>
					</div>

					<div className={styles.heroAside}>
						<div className={styles.statCard}>
							<p className={styles.statLabel}>Package</p>
							<p className={styles.statValue}>brightspace-lms</p>
							<p className={styles.statCopy}>
								Published on npm with TypeScript-first APIs, CJS/ESM outputs,
								and declaration files.
							</p>
						</div>
						<div className={styles.statGrid}>
							<div className={styles.miniStat}>
								<span className={styles.miniStatLabel}>First release</span>
								<strong className={styles.miniStatValue}>0.1.0</strong>
							</div>
							<div className={styles.miniStat}>
								<span className={styles.miniStatLabel}>Runtime</span>
								<strong className={styles.miniStatValue}>Node 24</strong>
							</div>
							<div className={styles.miniStat}>
								<span className={styles.miniStatLabel}>License</span>
								<strong className={styles.miniStatValue}>MIT</strong>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className={styles.section}>
				<div className="container">
					<SectionHeader overline="Capability" title="What the client solves" />
					<div className={styles.featureGrid}>
						{CAPABILITIES.map(item => (
							<article key={item.title} className={styles.featureCard}>
								<h2 className={styles.featureTitle}>{item.title}</h2>
								<p className={styles.featureCopy}>{item.copy}</p>
							</article>
						))}
					</div>
				</div>
			</section>

			<section className={styles.section}>
				<div className="container">
					<SectionHeader overline="Context" title="Why I built this" />
					<div className={styles.storyGrid}>
						<div>
							<div className={styles.storyCard}>
								<p className={styles.storyLead}>
									The Brightspace API is powerful, but shipping against it
									repeatedly means rebuilding the same plumbing every time.
								</p>
								<p className={styles.storyBody}>
									I first wrote this library while building Vita Learning. The
									goal was to move product code away from low-level request
									wiring and into typed domain actions. Instead of manually
									handling auth headers, rate-limit retries, endpoint version
									checks, and cursor bookmarks, apps call methods like
									client.users.whoami() or client.grades.listObjects(orgUnitId).
								</p>
							</div>
						</div>

						<aside className={styles.quoteCard}>
							<p className={styles.quoteMark}>"</p>
							<p className={styles.quoteText}>
								This started as infrastructure for one product, then became
								reusable open source infrastructure for any Brightspace
								integration.
							</p>
							<p className={styles.quoteMeta}>
								Built for production first, documented for reuse second.
							</p>
						</aside>
					</div>
				</div>
			</section>

			<section className={styles.section}>
				<div className="container">
					<SectionHeader overline="Coverage" title="Resource surface" />
					<div className={styles.resourceGrid}>
						{RESOURCE_GROUPS.map(group => (
							<article key={group.group} className={styles.resourceCard}>
								<h3 className={styles.resourceTitle}>{group.group}</h3>
								<div className={styles.resourceItems}>
									{group.items.map(item => (
										<span key={item} className={styles.resourceItem}>
											{item}
										</span>
									))}
								</div>
							</article>
						))}
					</div>
				</div>
			</section>
		</main>
	);
}
