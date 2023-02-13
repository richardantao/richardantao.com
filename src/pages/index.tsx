import { FC } from "react";
import { NextPage } from "next";
import styled from "styled-components";
import Head from "next/head";
import NextLink from "next/link";

import { Breakpoint, Color } from "~/styles";

const Main = styled.main.attrs(() => ({ role: "main" }))`
	padding: 1rem 4rem;
	padding-bottom: 0;

	@media screen and (${Breakpoint.MOBILE_LANDSCAPE}){
		padding: 2rem 10rem;
	}

	@media screen and (${Breakpoint.TABLET_PORTRAIT}){
		padding: 2rem 15rem;
	}

	@media screen and (${Breakpoint.LAPTOP_SMALL}){
		padding: 2rem 25rem;
	}

	@media screen and (${Breakpoint.LAPTOP_LARGE}){
		padding: 2rem 30rem;
	}

	@media screen and (${Breakpoint.DESKTOP}){
		padding: 4rem 35rem;
	}
`;

const Section = styled.section`
	p,
	ul {
		margin: 1rem 0;
	}

	@media screen and (${Breakpoint.DESKTOP}) {
		p,
		ul {
			font-size: 1.75rem;
		}
	}
`;

const Link = styled(NextLink).attrs(() => ({ role: "link" }))`
	color: ${Color.PRIMARY};
	cursor: pointer;
	text-decoration: none;

	&:hover,
	&:focus,
	&:active {
		color: ${Color.SECONDARY};
	}
`;

const H1 = styled.h1`
	margin: 1rem 0;

	@media screen and (${Breakpoint.DESKTOP}){
		font-size: 4rem;
	}
`;

const H2 = styled.h2`
	margin: 0.5rem 0;

	@media screen and (${Breakpoint.DESKTOP}){
		font-size: 3rem;
	}
`;

const H3 = styled.h3`
	color: ${Color.TEXT};
	margin: 0.33rem 0;

	&:hover,
	&:focus,
	&:active {
		color: ${Color.PRIMARY};
	}

	@media screen and (${Breakpoint.DESKTOP}){
		font-size: 2rem;
	}
`;

const Hr = styled.hr`
	border: none;	
	border-bottom: 1px solid #ccc;
`;

const BookShelfItem: FC<{ title: string, author: string }> = ({ title, author }) => (
	<li>
		{title} - <em>{author}</em>
	</li>
);

const Home: NextPage = () => (
	<>
		<Head>
			<meta name="description" content="Personal website of Richard Antao." />
			<meta name="keywords" content="Richard, Antao, Learnify" />
			<title>Richard Antao</title>
		</Head>
		<Main>
			<H1>Richard Antao</H1>
			<Hr />
			<Section id="about">
				<div>
					<p>
						A self-taught software developer (more of a <em>&ldquo;hacker&rdquo;</em> than an engineer), interested in exploring
						better methods and tools for learning and productivity, particularly within the domain of formal education.
					</p>
					<p>
						I am currently based in the Greater Toronto Area, and I am the founder of <Link href="https://learnify.ca" target="_blank">Learnify</Link>.
					</p>
					<p>
						In my free time, I enjoy reading, strength-training, and running.
						I am currently training for my first marathon.
					</p>
				</div>
			</Section>
			<Section id="projects">
				<H2>Projects</H2>
				<div>
					<Link href="https://learnify.ca" target="_blank">
						<H3>Learnify</H3>
					</Link>
					<p>
						Learnify is a startup aiming to create personalized learning paths for students
						to tailor their education based on their goals, interests, and preferences.
					</p>
				</div>
			</Section>
			<Section id="blog">
				<H2>Blog</H2>
				<div>
					{/* <div>
					<Link href="https://blog.learnify.ca/launching-learnify" target="_blank">
						<H3>Launching Learnify</H3>
					</Link>
				</div>*/}
					<div>
						<Link href="https://blog.learnify.ca/lets-put-mastery-before-marks" target="_blank">
							<H3>It&apos;s Time to Place Mastery before Marks</H3>
						</Link>
						<p>
							Try and think back to when you were in school. Did you ever get to a point where you were so busy
							with assignments, classes, and extra-curricular activities that you didn&apos;t have the time...
						</p>
					</div>
					<div>
						<Link href="https://blog.learnify.ca/the-current-state-of-the-education-system" target="_blank">
							<H3>The Current State of the Education System</H3>
						</Link>
						<p>
							Education is at the core of a good and prosperous life. Given it&apos;s importance in society, why
							have we not seen the same rate of progression compared to other industries over the last 40 years?
						</p>
					</div>
				</div>
			</Section>
			<Section id="bookshelf">
				<H2>Bookshelf</H2>
				<ul>
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
			</Section>
		</Main>
	</>
);

export const config = {
	unstable_runtimeJS: false
};

export default Home;