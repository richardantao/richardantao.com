import React from "react";

import { Helmet } from "react-helmet";

import Nav from "components/Nav";
import Footer from "components/Footer";

import "styles/global.scss";
import "./styles.scss";

const Projects = () =>
	<>
		<Helmet>
			<meta charSet="utf-8" />
			<meta name="description" content="Richard Antao's personal website" />
			<meta name="keywords" content="richard, antao" />
			<meta name="author" content="Richard Antao" />
			<meta name="application-name" content="richardantao.com" />
			<title>Projects</title>
		</Helmet>
		<Nav />
		<main>
			<ul>
				<li>Learnify</li>
				<li>React Native Animations</li>
				<li>Freelance Gigs</li>
			</ul>
		</main>
		<Footer />
	</>;

export default Projects;