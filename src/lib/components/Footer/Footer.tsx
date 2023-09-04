import { FC } from "react";
import Link from "next/link";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faInstagram, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/pro-solid-svg-icons";

import "./Footer.css";

export const Footer: FC = () => (
	<footer id="footer" role="contentinfo">
		<div className="meta-container">
			<small>
				<i>Last Update: September 4, 2023</i>
			</small>
		</div>
		<div className="social-container">
			<Link href="mailto:richardmantao@gmail.com" target="_blank" aria-label="E-mail logo">
				<Icon icon={faEnvelope} />
			</Link>
			<Link href="https://instagram.com/richardantao" target="_blank" aria-label="Instagram logo">
				<Icon icon={faInstagram} />
			</Link>
			<Link href="https://linkedin.com/in/richardantao" target="_blank" aria-label="LinkedIn logo">
				<Icon icon={faLinkedin} />
			</Link>
		</div>
	</footer>
);

