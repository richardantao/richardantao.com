"use client";

import clsx from "clsx";

import { useTheme } from "~/lib/client/hooks/useTheme";
import { useIsMounted } from "~/lib/client/hooks/useIsMounted";

import styles from "./Navbar.module.scss";

interface ThemeButtonProps {
	className?: string;
}

export function ThemeButton({ className }: ThemeButtonProps) {
	const { theme, resolvedTheme, setTheme } = useTheme();
	const mounted = useIsMounted();

	if (!mounted) {
		return null;
	}

	const activeTheme = theme === "system" ? resolvedTheme : theme;

	return (
		<div className={clsx(styles.themeToggleBase, className)}>
			<span
				className={clsx(
					styles.themeActivePill,
					activeTheme === "light" ? styles.toLight : styles.toDark
				)}
				aria-hidden="true"
			/>
			<button
				type="button"
				className={clsx(
					styles.themeBtn,
					activeTheme === "dark" && styles.active
				)}
				aria-pressed={activeTheme === "dark"}
				onClick={() => setTheme("dark")}
			>
				Dark
			</button>
			<button
				type="button"
				className={clsx(
					styles.themeBtn,
					activeTheme === "light" && styles.active
				)}
				aria-pressed={activeTheme === "light"}
				onClick={() => setTheme("light")}
			>
				Light
			</button>
		</div>
	);
}
