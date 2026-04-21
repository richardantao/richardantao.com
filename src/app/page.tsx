import type { Metadata } from "next";

import { Divider } from "~/lib/client/components/Divider";

import { Bookshelf } from "./Bookshelf";
import { Hero } from "./Hero";
import { Projects } from "./Projects";
import { Writing } from "./Writing";

export const metadata: Metadata = {
	title: "Richard Antao — Founder, Engineer, Writer",
	description:
		"Solo founder. Full-stack engineer. Writing in public. Sharing my work, interests, and personal reflections.",
};

export default function HomePage() {
	return (
		<>
			<Hero />
			<Divider />
			<Projects />
			<Divider />
			<Writing />
			<Divider />
			<Bookshelf />
		</>
	);
}
