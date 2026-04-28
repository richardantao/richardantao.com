"use client";
import posthog from "posthog-js";

import { Button } from "~/lib/client/components/Button";

export function JsoncurrentActions() {
	return (
		<>
			<Button
				href="https://jsoncurrent.com"
				external
				onClick={() => posthog.capture("jsoncurrent_docs_clicked")}
			>
				View Docs
			</Button>
			<Button href="#demo" variant="outlineAccent">
				Jump to demo
			</Button>
		</>
	);
}
