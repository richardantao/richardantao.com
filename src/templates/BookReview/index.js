import React from "react";
import { Helmet } from "react-helmet";

import Nav from "components/Nav";
import Footer from "components/Footer";

import "styles/global.scss";
import "./styles.scss";

/**
 * Lowercase string and replace spaces with dashes
 * @param {string} title title string
 * @returns {string} href
 */
const titleToHref = title =>
	title
		.toLowerCase()
		.replace(":", "")
		.replace(" ", "-");

const BookReview = ({
	children,
	description,
	keywords,
	title,
	prevTitle,
	nextTitle
}) =>
	<>
		<Helmet>
			<meta charSet="utf-8" />
			<meta name="description" content={description} />
			<meta name="keywords" content={keywords} />
			<meta name="author" content="Richard Antao" />
			<title>{title}</title>
		</Helmet>
		<Nav />
		<main id="book-review">
			<h1>{title}</h1>
			<article>
				{children}
			</article>
			<aside>
				<div>
					<h4>Previous</h4>
					<a href={`/books/${titleToHref(prevTitle)}`}>
						{prevTitle}
					</a>
				</div>
				<div>
					Logo here
				</div>
				<div>
					<h4>Next</h4>
					<a href={`/books/${titleToHref(nextTitle)}`}>
						{nextTitle}
					</a>
				</div>
			</aside>
		</main>
		<Footer />
	</>

export default BookReview;