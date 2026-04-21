import styles from "./Divider.module.scss";

export function Divider() {
	// biome-ignore lint/a11y/noAriaHiddenOnFocusable: The divider is purely decorative and does not convey any information, so it is safe to hide it from assistive technologies.
	return <hr className={styles.divider} aria-hidden="true" />;
}
