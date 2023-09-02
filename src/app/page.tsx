import { FC } from "react";
import { Metadata } from "next";
import Link from "next/link";

import "./page.css";
import Image from "next/image";

export const metadata: Metadata = {
	description: "Personal website of Richard Antao.",
	keywords: "Richard Antao, Vita, Vita Learning"
};

const BookShelfItem: FC<{ title: string, author: string }> = ({ title, author }) => (
	<li>
		{title} - <em>{author}</em>
	</li>
);

const HomePage = () => (
	<main role="main">
		<header role="banner">
			<h1>Richard Antao</h1>
			<Image
				src="/rich.jpg"
				alt="Richard Antao's headshot"
				height={75}
				width={75}
				priority
			/>
		</header>
		<hr />
		<section id="about">
			<div>
				<p>
					A self-taught software developer (more of a <em>&ldquo;hacker&rdquo;</em> than an engineer), interested in exploring
					better methods and tools for learning and productivity, particularly within the domain of formal education.
				</p>
				<p>
					I am currently based in the Greater Toronto Area, and I am the founder of <Link href="https://www.vitalearning.ca" target="_blank">Vita Learning</Link>.
				</p>
				<p>
					In my free time, I enjoy reading, strength-training, and endurance running.
				</p>
			</div>
		</section>
		<section id="projects">
			<h2>Projects</h2>
			<div>
				<Link href="https://www.vitalearning.ca" target="_blank">
					<h3>Vita Learning</h3>
				</Link>
				<p>
					Vita Learning is a startup aiming to create personalized learning paths for students
					to tailor their education based on their goals, interests, and preferences.
				</p>
			</div>
		</section>
		<section id="blog">
			<h2>Blog</h2>
			<div>
				<div>
					<Link href="https://blog.vitalearning.ca/launching-vita" target="_blank">
						<h3>Launching Vita</h3>
					</Link>
					<p>
						We&apos;re very excited to announce the official launch of Vita! 🥳
					</p>
					<p>
						We&apos;re on a mission to create tailored learning experiences that enable students to personalize their education to their goals, preferences, and passions...
					</p>
				</div>
				<div>
					<Link href="https://blog.vitalearning.ca/its-time-to-place-mastery-before-marks" target="_blank">
						<h3>It&apos;s Time to Place Mastery before Marks</h3>
					</Link>
					<p>
						Try and think back to when you were in school. Did you ever get to a point where you were so busy
						with assignments, classes, and extra-curricular activities that you didn&apos;t have the time...
					</p>
				</div>
				<div>
					<Link href="https://blog.vitalearning.ca/the-current-state-of-the-education-system" target="_blank">
						<h3>The Current State of the Education System</h3>
					</Link>
					<p>
						Education is at the core of a good and prosperous life. Given it&apos;s importance in society, why
						have we not seen the same rate of progression compared to other industries over the last 40 years?
					</p>
				</div>
			</div>
		</section>
		<section id="bookshelf">
			<h2>Bookshelf</h2>
			<ul>
				<BookShelfItem title="Power and Prediction: The Disruptive Economics of Artificial Intelligence" author="Ajay Agrawal" />
				<BookShelfItem title="Prediction Machines: The Simple Economics of Artificial Intelligence" author="Ajay Agrawal" />
				<BookShelfItem title="Atomic Habits" author="James Clear" />
				<BookShelfItem title="Brave New World" author="Aldous Huxley" />
				<BookShelfItem title="Crossing the Chasm" author="Geoffrey Moore" />
				<BookShelfItem title="Deep Work" author="Cal Newport" />
				<BookShelfItem title="Grit" author="Angela Duckworth" />
				<BookShelfItem title="Man's Search for Meaning" author="Viktor Frankl" />
				<BookShelfItem title="Nineteen Eighty-Four" author="George Orwell" />
				<BookShelfItem title="Never Split the Difference" author="Chris Voss" />
				<BookShelfItem title="The Brain that Changes Itself" author="Norman Doidge" />
				<BookShelfItem title="The Lean Startup" author="Eric Ries" />
				<BookShelfItem title="The Power of Now" author="Eckhart Tolle" />
				<BookShelfItem title="The 4-Hour Workweek" author="Tim Ferriss" />
				<BookShelfItem title="Thinking Fast and Slow" author="Daniel Kahneman" />
				<BookShelfItem title="Zero to One" author="Peter Thiel" />
			</ul>
		</section>
	</main>
);

export default HomePage;