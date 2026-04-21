"use client";
import posthog from "posthog-js";

import { Button } from "~/lib/client/components/Button";

const PROJECTS_LABEL = "View my work";
const WRITING_LABEL = "Read the blog";

export function HeroCTAs() {
	return (
		<>
			<Button
				href="#projects"
				size="lg"
				onClick={() =>
					posthog.capture("hero_cta_clicked", { label: PROJECTS_LABEL })
				}
			>
				{PROJECTS_LABEL}
			</Button>
			<Button
				href="/writing"
				variant="secondary"
				size="lg"
				onClick={() =>
					posthog.capture("hero_cta_clicked", { label: WRITING_LABEL })
				}
			>
				{WRITING_LABEL}
			</Button>
		</>
	);
}
