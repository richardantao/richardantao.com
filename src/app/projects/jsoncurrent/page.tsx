import type { Metadata } from "next";

import { SectionHeader } from "~/lib/client/components/SectionHeader";
import { Tag } from "~/lib/client/components/Tag";

import { JsoncurrentActions } from "./JsoncurrentActions";
import { JsoncurrentDemo } from "./JsoncurrentDemo";
import styles from "./page.module.scss";

const LIBRARY_TAGS = [
	{ label: "TypeScript", color: "blue" as const },
	{ label: "Python", color: "blue" as const },
	{ label: "Streaming JSON", color: "indigo" as const },
	{ label: "MIT licensed", color: "neutral" as const },
];

const HIGHLIGHTS = [
	{
		title: "Patch-first streaming",
		copy: "Instead of waiting for a complete object, jsoncurrent emits structured patches as fields become available. UIs can start rendering real state immediately.",
	},
	{
		title: "Collector on the other side",
		copy: "A collector reconstructs the latest object shape from incoming patches, so product code can consume stable state instead of raw token soup.",
	},
	{
		title: "Built for real product streams",
		copy: "I created it for Vita after repeatedly needing LLM output to drive live interfaces, not just text boxes. The library now works across the TypeScript and Python stack.",
	},
];

export const metadata: Metadata = {
	title: "jsoncurrent",
	description:
		"A streaming JSON patch protocol for incremental LLM response delivery, with a live demo and notes on why I built it.",
};

export default function JsoncurrentPage(_: PageProps<"/projects/jsoncurrent">) {
	return (
		<main className={styles.page}>
			<section className={styles.hero}>
				<div className={`container ${styles.heroInner}`}>
					<div className={styles.heroCopy}>
						<p className={styles.overline}>Project / jsoncurrent</p>
						<h1 className={styles.title}>
							Structured JSON streaming for live AI interfaces
						</h1>
						<p className={styles.description}>
							jsoncurrent is the transport layer I wanted every time a model was
							emitting structured output but the product needed to render before
							the final token landed.
						</p>
						<div className={styles.tagRow}>
							{LIBRARY_TAGS.map(tag => (
								<Tag key={tag.label} color={tag.color}>
									{tag.label}
								</Tag>
							))}
						</div>
						<div className={styles.actions}>
							<JsoncurrentActions />
						</div>
					</div>

					<div className={styles.heroAside}>
						<div className={styles.statCard}>
							<p className={styles.statLabel}>Why it matters</p>
							<p className={styles.statValue}>
								Token streams are not UI state.
							</p>
							<p className={styles.statCopy}>
								jsoncurrent turns partial model output into patches a frontend
								can apply incrementally.
							</p>
						</div>
						<div className={styles.statGrid}>
							<div className={styles.miniStat}>
								<span className={styles.miniStatLabel}>Emitter</span>
								<strong className={styles.miniStatValue}>patch stream</strong>
							</div>
							<div className={styles.miniStat}>
								<span className={styles.miniStatLabel}>Collector</span>
								<strong className={styles.miniStatValue}>live object</strong>
							</div>
							<div className={styles.miniStat}>
								<span className={styles.miniStatLabel}>Use case</span>
								<strong className={styles.miniStatValue}>
									LLM product UIs
								</strong>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className={styles.section}>
				<div className="container">
					<SectionHeader
						overline="Library"
						title="What the library gives you"
					/>
					<div className={styles.featureGrid}>
						{HIGHLIGHTS.map(item => (
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
					<SectionHeader
						overline="Origin"
						title="I built it because I kept needing it"
					/>
					<div className={styles.storyGrid}>
						<div>
							<div className={styles.storyCard}>
								<p className={styles.storyLead}>
									At Vita, I kept hitting the same problem: the model was
									emitting structured JSON, but mid-stream the object is
									incomplete — and incomplete JSON is unparseable.
								</p>
								<p className={styles.storyBody}>
									You can't call <code>JSON.parse()</code> on a half-streamed
									JSON object. That meant buffering the entire response and only
									updating the UI once the last token landed — which defeats the
									point of streaming entirely. I wrote jsoncurrent to solve
									that: emit patches as each field becomes available, so the UI
									can assemble real state incrementally without ever touching a
									malformed string.
								</p>
							</div>
						</div>

						<aside className={styles.quoteCard}>
							<p className={styles.quoteMark}>"</p>
							<p className={styles.quoteText}>
								The goal was simple: make structured AI responses feel native to
								the interface instead of bolted on after the fact.
							</p>
							<p className={styles.quoteMeta}>
								Built first for Vita, then open sourced.
							</p>
						</aside>
					</div>
				</div>
			</section>

			<section id="demo" className={styles.section}>
				<div className="container">
					<SectionHeader
						overline="Demo"
						title="Watch the object assemble live"
					/>
					<p className={styles.demoIntro}>
						The demo below illustrates what happens under the hood to drive
						structured streaming interfaces.
					</p>
					<JsoncurrentDemo />
				</div>
			</section>
		</main>
	);
}
