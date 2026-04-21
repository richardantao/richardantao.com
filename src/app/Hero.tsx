import Image from "next/image";

import styles from "./Hero.module.scss";
import { HeroCTAs } from "./HeroCTAs";

const ROLES = ["founder", "product thinker", "oss developer"];

const HEADSHOT_SRC = "/rich.jpg";

export function Hero() {
	return (
		<section className={styles.section} aria-label="Introduction">
			<div className={`container ${styles.inner}`}>
				{/* Text content */}
				<div className={styles.content}>
					<div className={styles.overline}>
						<span className={styles.overlineDot} aria-hidden="true" />
						<span className={styles.overlineText}>Toronto, ON</span>
					</div>

					<h1 className={styles.name}>
						Richard
						<br />
						Antao
						<span className={styles.period} aria-hidden="true">
							.
						</span>
					</h1>

					<p className={styles.tagline}>
						Solo founder. Full-stack engineer. Writing in public.
						<br />
						Sharing my work, interests, and personal reflections.
					</p>

					<ul className={styles.roles} aria-label="Roles and skills">
						{ROLES.map(role => (
							<li key={role} className={styles.roleChip}>
								{role}
							</li>
						))}
					</ul>

					<div className={styles.cta}>
						<HeroCTAs />
					</div>
				</div>

				{/* Headshot */}
				<div className={styles.photoWrap}>
					<Image
						src={HEADSHOT_SRC}
						alt="Richard Antao"
						width={200}
						height={200}
						className={styles.photo}
						priority
					/>
				</div>
			</div>
		</section>
	);
}
