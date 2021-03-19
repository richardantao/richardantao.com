import React from "react";

import resume from "assets/Richard Antao's Engineering Resume.pdf";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGoodreads, faLinkedin, faInstagram, faGithub } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faFileAlt } from "@fortawesome/free-regular-svg-icons";

import "styles/global.scss";
import "./styles.scss";

const Footer = () =>
	<footer id="footer" role="contentinfo">
		<p>Designed and developed by Richard Antao</p>
		<div>
			<a href="mailto:richardmantao@gmail.com" >
				<FontAwesomeIcon icon={faEnvelope} />
			</a>
			<a href={resume} download>
				<FontAwesomeIcon icon={faFileAlt} />
			</a>
			<a href="https://linkedin.com/in/richardantao" target="_blank" rel="noreferrer">
				<FontAwesomeIcon icon={faLinkedin} />
			</a>
			<a href="https://github.com/richardantao" target="_blank" rel="noreferrer">
				<FontAwesomeIcon icon={faGithub} />
			</a>
			<a href="https://www.instagram.com/richardantao/" target="_blank" rel="noreferrer">
				<FontAwesomeIcon icon={faInstagram} />
			</a>
			<a href="https://www.goodreads.com/user/show/131046005-richard-antao" target="_blank" rel="noreferrer">
				<FontAwesomeIcon icon={faGoodreads} />
			</a>
		</div>
	</footer >;

export default Footer;