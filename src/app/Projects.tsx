import { ProjectCard, type Project } from "~/lib/client/components/ProjectCard";
import { SectionHeader } from "~/lib/client/components/SectionHeader";

import styles from "./Projects.module.scss";

const PROJECTS: Project[] = [
	{
		slug: "vita",
		name: "Vita Learning",
		iconLabel: "V",
		iconVariant: "blue",
		externalHref: "https://www.vitalearning.ca",
		description:
			"AI-native study platform for university students. Flashcard generation, lecture transcription, quiz creation, and smart notes — all from your course material.",
		tags: [
			{ label: "Founder", color: "blue" },
			{ label: "TypeScript", color: "neutral" },
			{ label: "Python", color: "neutral" },
			{ label: "React Native", color: "neutral" },
			{ label: "Next.js", color: "neutral" },
		],
	},
	{
		slug: "jsoncurrent",
		name: "jsoncurrent",
		iconLabel: "jc",
		iconVariant: "indigo",
		externalHref: "https://github.com/richardantao/jsoncurrrent-js",
		description:
			"A streaming JSON patch protocol for incremental LLM response delivery. Solves real-time UI updates from AI streams. TypeScript + Python, MIT licensed.",
		tags: [
			{ label: "Open source", color: "indigo" },
			{ label: "TypeScript", color: "neutral" },
			{ label: "Python", color: "neutral" },
		],
	},
];

export function Projects() {
	return (
		<section id="projects" aria-labelledby="projects-heading">
			<div className="container">
				<SectionHeader
					overline="Projects"
					title="Things I'm building"
					viewAllHref="/projects"
				/>
				<div className={styles.grid}>
					{PROJECTS.map(project => (
						<ProjectCard key={project.slug} project={project} />
					))}
				</div>
			</div>
		</section>
	);
}
