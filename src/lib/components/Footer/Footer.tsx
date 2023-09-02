import { FC } from "react";
import Link from "next/link";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faInstagram, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/pro-solid-svg-icons";

import "./Footer.css";

export const Footer: FC = () => (
	<footer id="footer" role="contentinfo">
		<div className="meta-container">
			<p>
				<i>Last Update: September 2, 2023</i>
			</p>
		</div>
		<div className="social-container">
			<Link href="mailto:richardmantao@gmail.com" target="_blank">
				<Icon icon={faEnvelope} aria-label="E-mail logo" />
			</Link>
			<Link href="https://instagram.com/richardantao" target="_blank">
				<Icon icon={faInstagram} aria-label="Instagram logo" />
			</Link>
			<Link href="https://linkedin.com/in/richardantao" target="_blank">
				<Icon icon={faLinkedin} aria-label="LinkedIn logo" />
			</Link>
		</div>
	</footer>
);

