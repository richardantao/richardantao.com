"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import posthog from "posthog-js";

import { Button } from "~/lib/client/components/Button";
import { useEventListener } from "~/lib/client/hooks/useEventListener";

import { HamburgerMenu } from "./HamburgerMenu";
import { ThemeButton } from "./ThemeButton";
import styles from "./Navbar.module.scss";

const NAV_LINKS = [
	{ label: "Projects", href: "/#projects" },
	{ label: "Writing", href: "/writing" },
	{ label: "Bookshelf", href: "/bookshelf" },
	// { label: "About", href: "/about" },
];

export function Navbar() {
	const pathname = usePathname();
	const [scrolled, setScrolled] = useState(false);

	useEventListener(
		"scroll",
		() => setScrolled(window.scrollY > 16),
		undefined,
		{
			passive: true,
		}
	);

	const isActive = (href: string) => {
		if (href === "/") return pathname === "/";
		return pathname.startsWith(href.replace("/#", "/"));
	};

	return (
		<header className={clsx(styles.nav, scrolled && styles.scrolled)}>
			<div className={`container ${styles.inner}`}>
				<Link href="/" className={styles.brand}>
					Richard Antao
				</Link>

				<nav aria-label="Primary navigation">
					<ul className={styles.links}>
						{NAV_LINKS.map(({ label, href }) => (
							<li key={href}>
								<Link
									href={href}
									className={clsx(styles.link, isActive(href) && styles.active)}
								>
									{label}
								</Link>
							</li>
						))}
					</ul>
				</nav>

				<HamburgerMenu links={NAV_LINKS} isActive={isActive} />

				<div className={styles.actions}>
					<ThemeButton className={styles.themeToggle} />

					<Button
						href="mailto:richardmantao@gmail.com"
						size="sm"
						onClick={() =>
							posthog.capture("contact_cta_clicked", { source: "navbar" })
						}
					>
						Say hello →
					</Button>
				</div>
			</div>
		</header>
	);
}
