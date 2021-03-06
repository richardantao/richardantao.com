import React from "react";
import { Helmet } from "react-helmet";

import Nav from "components/Nav";
import Footer from "components/Footer";

import "styles/global.scss";
import "./styles.scss";

const Services = () =>
	<>
		<Helmet>
			<meta charSet="utf-8" />
			<meta name="description" content="Richard Antao's personal website" />
			<meta name="keywords" content="richard, antao" />
			<meta name="author" content="Richard Antao" />
			<meta name="application-name" content="richardantao.com" />
			<title>Richard Antao</title>
		</Helmet>
		<Nav />
		<main>
			<h1>Services</h1>
			<section>
				<p>
					Aside from mobile apps and web applications, I also design and develop websites for clients.
				</p>
				<p>
					If you are interested in working with me to design and/or develop your website,
					send me an email by clicking on the envelope icon in the footer below.
				</p>
			</section>
			<section>
				<h3>Past Projects</h3>
				<ul>
					<li>
						Big Tyme Fitness
					</li>
					<li>
						Stone House Contracts
					<iframe src="https://stonehousecontractingltd.ca" title="Stone House Contracts"></iframe>
					</li>
				</ul>
			</section>
		</main>
		<Footer />
	</>;

export default Services;