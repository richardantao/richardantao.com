import Link from "next/link";

import styles from "./SectionHeader.module.scss";

interface SectionHeaderProps {
	overline: string;
	title: string;
	viewAllHref?: string;
	viewAllLabel?: string;
}

export function SectionHeader({
	overline,
	title,
	viewAllHref,
	viewAllLabel = "View all →",
}: SectionHeaderProps) {
	return (
		<div className={styles.root}>
			<div className={styles.row}>
				<div>
					<p className={styles.overline}>{overline}</p>
					<h2 className={styles.title}>{title}</h2>
				</div>
				{viewAllHref && (
					<Link href={viewAllHref} className={styles.viewAll}>
						{viewAllLabel}
					</Link>
				)}
			</div>
		</div>
	);
}
