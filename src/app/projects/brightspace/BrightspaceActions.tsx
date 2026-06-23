"use client";

import posthog from "posthog-js";

import { Button } from "~/lib/client/components/Button";

export function BrightspaceActions() {
	return (
		<>
			<Button
				href="https://github.com/richardantao/brightspace-lms-js"
				external
				onClick={() => posthog.capture("brightspace_repo_clicked")}
			>
				View Repository
			</Button>
			<Button
				href="https://www.npmjs.com/package/brightspace-lms"
				variant="outlineAccent"
				external
				onClick={() => posthog.capture("brightspace_npm_clicked")}
			>
				View npm Package
			</Button>
		</>
	);
}
