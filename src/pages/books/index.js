import React from "react";

import { Helmet } from "react-helmet";

import Alert from "components/alert";
import Nav from "components/Nav";
import Footer from "components/Footer";

import "styles/global.scss";
import "./styles.scss";

const Books = () =>
	<>
		<Helmet>
			<meta charSet="utf-8" />
			<meta name="description" content="Richard Antao's personal website" />
			<meta name="keywords" content="richard, antao" />
			<meta name="author" content="Richard Antao" />
			<meta name="application-name" content="richardantao.com" />
			<title>Books</title>
		</Helmet>
		<Nav />
		<main id="books" role="main">
			<section>
				<h1>Books</h1>
				<p>
					I'm dedicating parts of my 2021 to finally tackling all the books I've put do on "to-read" list.
					Below you can find my bookshelf.
					I've ranked each of these reads by the amount I'd recommend it.
					I hold the highest praise for books that materially changed my perspective,
					and provide frameworks for living day to day.
				</p>
			</section>
			<section>
				<h3>March 2021</h3>
				<ul>
					<li>
						<a href="/books/zero-to-one">
							Zero to One
						</a>
					</li>
					<li>
						<a href="/books/atomic-habits">
							Atomic Habits
						</a>
					</li>
				</ul>
			</section>
			<section>
				<h3>February 2021</h3>
				<ul>
					<li>
						<a href="/books/crossing-the-chasm">
							Crossing the Chasm
						</a>
					</li>
				</ul>
			</section>
		</main>
		<Footer />
		<Alert />
	</>;

export default Books;