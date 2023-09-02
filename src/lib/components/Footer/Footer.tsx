import { FC } from "react";
import Link from "next/link";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faInstagram, faLinkedin } from "@fortawesome/free-brands-svg-icons";

import "./Footer.css";

export const Footer: FC = () => (
	<footer id="footer" role="contentinfo">
		<div className="meta-container">
			<p>
				<i>Last Update: September 2, 2023</i>
			</p>
		</div>
		<div className="social-container">
			<Link href="https://instagram.com/richardantao" target="_blank">
				<Icon icon={faInstagram} />
			</Link>
			<Link href="https://linkedin.com/in/richardantao" target="_blank">
				<Icon icon={faLinkedin} />
			</Link>
		</div>
	</footer>
);

