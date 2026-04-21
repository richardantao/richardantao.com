import type { ReactNode } from "react";
import clsx from "clsx";
import styles from "./Tag.module.scss";

export type TagColor = "blue" | "indigo" | "green" | "amber" | "neutral";

interface TagProps {
	children: ReactNode;
	color?: TagColor;
	className?: string;
}

export function Tag({ children, color = "neutral", className }: TagProps) {
	return (
		<span className={clsx(styles.tag, styles[color], className)}>
			{children}
		</span>
	);
}
