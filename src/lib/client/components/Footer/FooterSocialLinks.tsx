"use client";
import Link from "next/link";
import posthog from "posthog-js";
import styles from "./Footer.module.scss";

const LINKS = [
	{ label: "GitHub", href: "https://github.com/richardantao" },
	{ label: "LinkedIn", href: "https://linkedin.com/in/richardantao" },
];

export function FooterSocialLinks() {
	return (
		<nav aria-label="Social links">
			<ul className={styles.links}>
				{LINKS.map(({ label, href }) => (
					<li key={href}>
						<Link
							href={href}
							className={styles.link}
							target="_blank"
							rel="noopener noreferrer"
							onClick={() =>
								posthog.capture("social_link_clicked", { label, href })
							}
						>
							{label}
						</Link>
					</li>
				))}
			</ul>
		</nav>
	);
}
