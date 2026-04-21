import type { Metadata } from "next";

import { Divider } from "~/lib/client/components/Divider";

import { BookshelfSection } from "./HomeBookshelfSection";
import { Hero } from "./Hero";
import { Projects } from "./Projects";
import { WritingSection } from "./HomeWritingSection";

export const metadata: Metadata = {
	title: "Richard Antao — Founder, Engineer, Writer",
	description:
		"Founder of Vita Learning. Building AI-native study tools for university students. Full-stack engineer writing about startups, product, and open source.",
};

export default function HomePage() {
	return (
		<>
			<Hero />
			<Divider />
			<Projects />
			<Divider />
			<WritingSection />
			<Divider />
			<BookshelfSection />
		</>
	);
}
