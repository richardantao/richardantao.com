import type { Metadata } from "next";
import { SectionHeader } from "~/lib/client/components/SectionHeader";
import { Tag } from "~/lib/client/components/Tag";
import styles from "./page.module.scss";
import { VitaActions } from "./VitaActions";

// =============================================================================
// DATA
// =============================================================================

const PRODUCT_TAGS = [
	{ label: "EdTech", color: "blue" as const },
	{ label: "Next.js", color: "blue" as const },
	{ label: "React Native", color: "blue" as const },
	{ label: "FastAPI", color: "indigo" as const },
	{ label: "Solo founder", color: "neutral" as const },
];

const STACK = [
	{
		layer: "Frontend",
		title: "Next.js + Expo",
		items: [
			"Next.js App Router",
			"React Native / Expo",
			"TanStack Query",
			"Plate.js",
		],
	},
	{
		layer: "Backend",
		title: "Python + Node.js",
		items: ["Python", "Node.js", "MongoDB", "Redis"],
	},
	{
		layer: "Infra",
		title: "DO + Vercel",
		items: [
			"DigitalOcean Droplet",
			"Docker Compose",
			"Vercel",
			"GitHub Actions",
		],
	},
	{
		layer: "AI",
		title: "Generation layer",
		items: [
			"OpenAI GPT-4.1",
			"jsoncurrent streaming",
			"Mistral OCR",
			"Custom parsing & retrieval orchestration",
		],
	},
];

export const metadata: Metadata = {
	title: "Vita Learning",
	description:
		"AI-native study tools for university students — flashcards, transcription, quiz generation, and smart notes. Built and run as a solo founder.",
};

const MARKETING_SITE_URL = "https://vitalearning.ca";

export default function VitaPage(_: PageProps<"/projects/vita">) {
	return (
		<main className={styles.page}>
			{/* ── Hero ─────────────────────────────────────────────────────── */}
			<section className={styles.hero}>
				<div className={`container ${styles.heroInner}`}>
					<div className={styles.heroCopy}>
						<p className={styles.overline}>Project / Vita Learning</p>
						<h1 className={styles.title}>
							AI study tools built for how students actually learn
						</h1>
						<p className={styles.description}>
							Vita turns your lecture recordings, PDFs, and slides into
							flashcards, quizzes, and structured notes — automatically. I've
							been building it solo since 2023 and plan to monetize it in
							September 2026.
						</p>
						<div className={styles.tagRow}>
							{PRODUCT_TAGS.map(tag => (
								<Tag key={tag.label} color={tag.color}>
									{tag.label}
								</Tag>
							))}
						</div>
						<div className={styles.actions}>
							<VitaActions />
						</div>
					</div>

					<div className={styles.heroAside}>
						<div className={styles.statCard}>
							<p className={styles.statLabel}>What it does</p>
							<p className={styles.statValue}>
								Your course material, made study-ready.
							</p>
							<p className={styles.statCopy}>
								Upload a lecture, drop in a PDF, or paste your notes. Vita
								generates the study material so you can focus on actually
								learning it.
							</p>
						</div>
						<div className={styles.statGrid}>
							<div className={styles.miniStat}>
								<span className={styles.miniStatLabel}>Launched</span>
								<strong className={styles.miniStatValue}>2023</strong>
							</div>
							<div className={styles.miniStat}>
								<span className={styles.miniStatLabel}>Stack</span>
								<strong className={styles.miniStatValue}>Full-stack TS</strong>
							</div>
							<div className={styles.miniStat}>
								<span className={styles.miniStatLabel}>Model</span>
								<strong className={styles.miniStatValue}>Bootstrap</strong>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* ── Origin story ─────────────────────────────────────────────── */}
			<section className={styles.section}>
				<div className="container">
					<SectionHeader overline="Origin" title="Why I built it" />
					<div className={styles.storyGrid}>
						<div>
							<div className={styles.storyCard}>
								<p className={styles.storyLead}>
									A professor can't pace a 300-person lecture to 300 different
									learning speeds, and a textbook can't reorganise its chapters
									around each student's prior knowledge.
									<br />A one-size-fits-all by design curriculum results in a
									system that works adequately for the median student and poorly
									for everyone else.
								</p>
								<div className={styles.storyBody}>
									<p>
										The technology we have available today makes that tradeoff
										unnecessary. Personalisation at scale is no longer a
										staffing problem — it's a software problem. A student who
										struggles with a concept can get a different explanation,
										more practice, and a slower pace without pulling an
										instructor away from the rest of the class. A student who
										has already mastered it can move on without waiting.
									</p>
									<p>
										I watched students around me lose hours to the wrong layer
										of the problem entirely — rewriting lecture slides into
										flashcards, creating practice questions by hand, scrubbing
										through 90-minute recordings. The preparation was eating the
										time that should have gone to understanding.
									</p>
									<p>
										Vita started as a simple flashcard generator that read PDFs.
										It wasn't pretty, but students used it every day. That told
										me the problem was real. Over time it grew into a full study
										workspace — transcription, document parsing, quiz
										generation, and a live note editor powered by streaming
										structured JSON. The core insight never changed: the product
										should handle the setup so the student can spend their time
										on actually learning.
									</p>
								</div>
							</div>
						</div>

						<aside className={styles.quoteCard}>
							<p className={styles.quoteMark}>"</p>
							<p className={styles.quoteText}>
								Vita is a slider — where one end is fully manual, and the other
								is fully automated. The value is letting the student choose
								where they sit on it.
							</p>
							<p className={styles.quoteMeta}>
								10K → 100K users · September 2026 launch
							</p>
						</aside>
					</div>
				</div>
			</section>

			{/* ── How I run it now ─────────────────────────────────────────── */}
			<section className={styles.section}>
				<div className="container">
					<SectionHeader overline="Operations" title="How I run it now" />
					<div className={styles.storyGrid}>
						<div>
							<div className={styles.storyCard}>
								<p className={styles.storyLead}>
									Freemium to students, then the institutions that teach them.
								</p>
								<div className={styles.storyBody}>
									<p>
										The go-to-market is freemium: give students a genuinely
										useful free tier, build the habit, and convert on depth. The
										longer play is moving upmarket — once we have the usage data
										and the retention numbers, we can go to instructors and
										institutions with proof that students are already using Vita
										to excel in their courses.
									</p>
									<p>
										On the business side, we run lean. A small team manages
										outsourced UGC operations, and an internal campaigns manager
										drives on-campus promotions across Southern Ontario —
										tabling, partnerships with student unions, semester-start
										activations. The campus model is the wedge; it expands
										region by region as we validate what works.
									</p>
									<p>
										The bootstrap path is clear: launch September 2026 at the
										semester start, grow through campus distribution, and move
										toward institutional partnerships once the student retention
										numbers support it.
									</p>
								</div>
							</div>
						</div>

						<aside className={styles.quoteCard}>
							<p className={styles.quoteMark}>"</p>
							<p className={styles.quoteText}>
								Lean by design. Every role, every dollar, and every feature has
								to earn its place.
							</p>
							<p className={styles.quoteMeta}>
								10K → 100K users · September 2026 launch
							</p>
						</aside>
					</div>
				</div>
			</section>

			{/* ── Tech stack ───────────────────────────────────────────────── */}
			<section className={styles.section}>
				<div className="container">
					<SectionHeader overline="Stack" title="How it's built" />
					<div className={styles.stackGrid}>
						{STACK.map(layer => (
							<div key={layer.layer} className={styles.stackCard}>
								<span className={styles.stackLayer}>{layer.layer}</span>
								<h3 className={styles.stackTitle}>{layer.title}</h3>
								<div className={styles.stackItems}>
									{layer.items.map(item => (
										<span key={item} className={styles.stackItem}>
											{item}
										</span>
									))}
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* ── Marketing site preview ───────────────────────────────────── */}
			<section id="preview" className={styles.previewSection}>
				<div className="container">
					<SectionHeader
						overline="Product"
						title="Enter into the Vita experience"
					/>
					<p className={styles.previewIntro}>
						The live product at vitalearning.ca — the landing page reflects our
						current positioning and feature set.
					</p>
					<div className={styles.iframeWrap}>
						<div className={styles.iframeBar}>
							<div className={styles.iframeTrafficLights}>
								<span className={styles.trafficDot} />
								<span className={styles.trafficDot} />
								<span className={styles.trafficDot} />
							</div>
							<span className={styles.iframeUrl}>vitalearning.ca</span>
						</div>
						<iframe
							src={MARKETING_SITE_URL}
							className={styles.iframe}
							title="Vita Learning — marketing site"
							loading="lazy"
							sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
						/>
					</div>
				</div>
			</section>
		</main>
	);
}
