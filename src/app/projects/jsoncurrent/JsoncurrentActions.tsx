"use client";
import posthog from "posthog-js";

import { Button } from "~/lib/client/components/Button";

export function JsoncurrentActions() {
	return (
		<>
			<Button
				href="https://github.com/richardantao/jsoncurrent-js"
				external
				onClick={() => posthog.capture("jsoncurrent_repo_clicked")}
			>
				View repository
			</Button>
			<Button href="#demo" variant="outlineAccent">
				Jump to demo
			</Button>
		</>
	);
}
