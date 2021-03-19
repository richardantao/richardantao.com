import React from "react";

import Page from "templates/Page";

import "styles/global.scss";
import "./styles.scss";

const Books = () =>
	<Page
		description=""
		kewyords=""
		title="Book Shelf"
		id="book-shelf"
	>
		<h1>Books</h1>
		<section id="books-intro">
			<p>
				I'm dedicating parts of my 2021 to finally tackling all the books I've put do on "to-read" list.
				Below you can find my bookshelf.
				I've ranked each of these reads by the amount I'd recommend it.
				I hold the highest praise for books that materially changed my perspective,
				and provide frameworks for living day to day.
			</p>
		</section>
		{/* <section className="book-shelf-month" id="2021-05">
				<h3>May 2021</h3>
				<ul>
					<li>
						<a>

						</a>
					</li>
				</ul>
			</section> */}
		<section className="book-shelf-month" id="2021-04">
			<h3>April 2020</h3>
			<ul>
				<li>
					<a href="/book-shelf/the-brain-that-changes-itself">
						The Brain That Changes Itself
					</a>
				</li>
				<li>
					<a href="/book-shelf/never-split-the-difference">
						Never Split the Difference
					</a>
				</li>
			</ul>
		</section>
		<section className="book-shelf-month" id="2021-03">
			<h3>March 2021</h3>
			<ul>
				<li>
					<a href="/book-shelf/the-lean-startup">
						The Lean Startup
					</a>
				</li>
				<li>
					<a href="/book-shelf/zero-to-one">
						Zero to One
					</a>
				</li>
				<li>
					<a href="/book-shelf/atomic-habits">
						Atomic Habits
						</a>
				</li>
			</ul>
		</section>
		<section className="book-shelf-month" id="2021-02">
			<h3>February 2021</h3>
			<ul>
				<li>
					<a href="/book-shelf/crossing-the-chasm">
						Crossing the Chasm
					</a>
				</li>
			</ul>
		</section>
	</Page>

export default Books;