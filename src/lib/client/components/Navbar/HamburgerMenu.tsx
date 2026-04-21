import { useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import posthog from "posthog-js";

import { Button } from "~/lib/client/components/Button";
import { useEventListener } from "~/lib/client/hooks/useEventListener";

import { ThemeButton } from "./ThemeButton";
import styles from "./Navbar.module.scss";

interface NavLink {
	label: string;
	href: string;
}

interface HamburgerMenuProps {
	links: NavLink[];
	isActive: (href: string) => boolean;
}

export function HamburgerMenu({ links, isActive }: HamburgerMenuProps) {
	const [open, setOpen] = useState(false);

	useEventListener("keydown", e => {
		if (!open) {
			return;
		}

		if (e.key === "Escape") {
			setOpen(false);
		}
	});

	return (
		<div className={styles.mobileMenuWrap}>
			<button
				type="button"
				className={clsx(styles.menuBtn, open && styles.open)}
				onClick={() => setOpen(current => !current)}
				aria-expanded={open}
				aria-controls="mobile-nav-menu"
				aria-label={open ? "Close navigation menu" : "Open navigation menu"}
			>
				<span className={styles.menuBtnLine} />
				<span className={styles.menuBtnLine} />
				<span className={styles.menuBtnLine} />
			</button>

			{open && (
				<div id="mobile-nav-menu" className={styles.mobileMenuPanel}>
					<nav aria-label="Mobile navigation" className={styles.mobileNav}>
						<ul className={styles.mobileLinks}>
							{links.map(({ label, href }) => (
								<li key={href}>
									<Link
										href={href}
										className={clsx(
											styles.mobileLink,
											isActive(href) && styles.active
										)}
										onClick={() => setOpen(false)}
									>
										{label}
									</Link>
								</li>
							))}
						</ul>
					</nav>

					<ThemeButton className={styles.mobileThemeToggle} />

					<Button
						href="mailto:richardmantao@gmail.com"
						size="sm"
						className={styles.mobileCta}
						onClick={() =>
							posthog.capture("contact_cta_clicked", { source: "mobile_menu" })
						}
					>
						Say hello →
					</Button>
				</div>
			)}
		</div>
	);
}
