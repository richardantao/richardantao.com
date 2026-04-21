"use client";
import posthog from "posthog-js";

import { Button } from "~/lib/client/components/Button";

const MARKETING_SITE_URL = "https://vitalearning.ca";

export function VitaActions() {
	return (
		<>
			<Button
				href={MARKETING_SITE_URL}
				external
				onClick={() => posthog.capture("vita_site_clicked")}
			>
				Visit Vita
			</Button>
			<Button href="#preview" variant="outlineAccent">
				See the product
			</Button>
		</>
	);
}
