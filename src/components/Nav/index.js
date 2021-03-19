import React from "react";

import { useCurrentWidth } from "./hooks";

import "styles/global.scss";
import "./styles.scss";

const Nav = () => {
	// const width = useCurrentWidth();
	// const isResponsive = width < 768;

	return (
		<nav id="nav" role="navigation">
			<a id="logo" href="/">
				{/* <img src="" alt="Logo"/> */}
			</a>
			<div id="nav-links">
				<a href="/">Home</a>
				<a href="https://learnify.ca" target="_blank" rel="noreferrer">Learnify</a>
			</div>
		</nav>
	);
};

export default Nav;

/*
{
	isResponsive ?
		(
			<>
				<div id="menu">

				</div>
			</>
		) :
		(
			<>
				<a href="/">Home</a>
				<a href="https://learnify.ca" target="_blank" rel="noreferrer">Learnify</a>
//				{/* <a href="/#projects">Projects</a> */
//				{/* <a href="/#services">Services</a> */}
//				{/* <a href="/book-shelf">Book Shelf</a> */}
			//</>
		//)
//}