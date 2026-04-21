import styles from "./Footer.module.scss";
import { FooterSocialLinks } from "./FooterSocialLinks";

const FooterMeta = async () => {
	"use cache";

	return (
		<p className={styles.meta}>Toronto, ON · {new Date().getFullYear()}</p>
	);
};

export function Footer() {
	return (
		<footer className={styles.footer}>
			<div className={`container ${styles.inner}`}>
				<div className={styles.left}>
					<p className={styles.name}>Richard Antao</p>
					<FooterMeta />
				</div>
				<FooterSocialLinks />
			</div>
		</footer>
	);
}
