import { useEffect, useState } from "react";

import { useLocalStorage } from "./useLocalStorage";
import { useMediaQuery } from "./useMediaQuery";

export type Theme = "light" | "dark" | "system";
type ResolvedTheme = "light" | "dark";

interface ThemeProps {
	/**
	 * The current theme, which can be "light", "dark", or "system". This represents the user's intent and is used to determine the resolved theme.
	 */
	readonly theme: Theme;
	/**
	 * The resolved theme, which can be "light" or "dark". This is the actual theme applied to the application, determined by the user's intent and their system preferences (if the intent is "system").
	 */
	readonly resolvedTheme: ResolvedTheme;
	/**
	 * A function to update the theme. It accepts a Theme value ("light", "dark", or "system") and updates the user's theme preference accordingly.
	 * @param theme The new theme value to set.
	 * @returns void
	 */
	readonly setTheme: (theme: Theme) => void;
}

export const useTheme = (): ThemeProps => {
	const [theme, setTheme] = useLocalStorage<Theme>("theme", "system");

	const prefersDark = useMediaQuery("(prefers-color-scheme: dark)");

	const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>("light");

	useEffect(() => {
		const resolved =
			theme === "system" ? (prefersDark ? "dark" : "light") : theme;

		if (theme === "system") {
			document.documentElement.removeAttribute("data-theme");
		} else {
			document.documentElement.setAttribute("data-theme", theme);
		}

		setResolvedTheme(resolved);
	}, [theme, prefersDark]);

	return {
		theme,
		resolvedTheme,
		setTheme,
	};
};
