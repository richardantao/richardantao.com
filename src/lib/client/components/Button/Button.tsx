import type { FC, ReactNode } from "react";
import Link from "next/link";
import clsx from "clsx";
import styles from "./Button.module.scss";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outlineAccent";
type ButtonSize = "sm" | "md" | "lg";
type ButtonType = "button" | "submit" | "reset";

interface ButtonProps {
	children: ReactNode;
	variant?: ButtonVariant;
	size?: ButtonSize;
	href?: string;
	external?: boolean;
	disabled?: boolean;
	type?: ButtonType;
	onClick?: () => void;
	className?: string;
	"aria-label"?: string;
}

export const Button: FC<ButtonProps> = ({
	children,
	variant = "primary",
	size = "md",
	href,
	external,
	disabled,
	type = "button",
	onClick,
	className,
	"aria-label": ariaLabel,
}) => {
	const classes = clsx(styles.btn, styles[variant], styles[size], className);

	if (href) {
		const isExternal =
			external || href.startsWith("http") || href.startsWith("mailto");
		return (
			<Link
				href={href}
				className={classes}
				aria-label={ariaLabel}
				onClick={onClick}
				{...(isExternal
					? { target: "_blank", rel: "noopener noreferrer" }
					: {})}
			>
				{children}
			</Link>
		);
	}

	return (
		<button
			type={type}
			className={classes}
			disabled={disabled}
			onClick={onClick}
			aria-label={ariaLabel}
		>
			{children}
		</button>
	);
};
