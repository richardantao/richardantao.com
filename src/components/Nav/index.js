import React from "react";

import "styles/global.scss";
import "./styles.scss";

const Nav = () =>
	<nav id="nav" role="navigation">
		<a id="logo" href="/">
			<img />
		</a>
		<div id="nav-links">
			<a href="/">Home</a>
			<a href="https://learnify.ca" target="_blank">Learnify</a>
			<a href="/projects">Projects</a>
			<a href="/services">Services</a>
			<a href="/books">Books</a>
		</div>
	</nav>;

export default Nav;