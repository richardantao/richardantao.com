import React from "react";
import { StaticImage } from "gatsby-plugin-image";

/* Assets */
import coming from "../images/coming-soon.png"
import learnify from "../images/learnify.gif";
import reanimated from "../images/reanimated.gif";

/* Components */
import Card from "components/Card";

import Page from "templates/Page";

/* Styles */
import "styles/global.scss";
import "./styles.scss";

const Home = () =>
	<Page
		description="Richard Antao's personal website"
		keywords="richard, antao"
		title="Richard Antao"
		id="home"
	>
		<section id="bio">
			<div className="bio-child">
				<StaticImage
					src="../images/headshot.jpg"
					alt="Richard Antao's Headshot"
					placeholder="blurred"
					id="headshot-wrapper"
				/>
			</div>
			<div className="bio-child">
				<div id="bio-description">
					<h1>Richard Antao</h1>
					<p>
						Hey I'm Richard <span role="img" aria-label="" aria-labelledby="">&#128075;&#127996;</span>
					</p>
					<p>
						I'm interested in programming, design, and exploring applications for improvement in the education,
						energy, and financial sectors. Aside from the nerdiness, I'm a big soccer fan, and I enjoy reading,
						running, strength training, and hiking. I am also quite the foodie.
					</p>
					<p>
						I am currently working on <a href="https://learnify.ca" target="_blank" rel="noreferrer">Learnify</a>,
						an ed-tech platform created to help students manage their schedule, productivity, and improve
						their learning experience in school.
					</p>
				</div>
			</div>
		</section>
		<section id="projects">
			<h2>Projects</h2>
			<div className="card-container">
				<Card
					src={learnify}
					alt="Learnify"
					title="Learnify"
					srcRef="https://learnify.ca"
					codeRef="https://github.com/learnify-ca"
					appStoreRef={`
						mailto:richardantao@learnify.ca?
						subject=Interested%20in%20Learnify's%20iOS%20Beta%20Program!&
						body=Hello,%0d%0dI%20would%20like%20to%20join%20Learnify's%20Beta%20Program%20for%20iOS!%20Please%20send%20the%20invitation%20to%20this%20email.%20Thanks!%0d%0dRegards,%0d%0d
					`}
					googlePlayRef={`
					mailto:richardantao@learnify.ca?
						subject=Interested%20in%20Learnify's%20Android%20Beta%20Program!&
						body=Hello,%0d%0dI%20would%20like%20to%20join%20Learnify's%20Beta%20Program%20for%20Android!%20Please%20send%20the%20invitation%20to%20this%20email.%20Thanks!%0d%0dRegards,%0d%0d
					`}
				>
					<p>
						Integrated learning platform helping students manage their schedule, productivity,
						and improve their learning experience.
					</p>
				</Card>
				<Card
					src={coming}
					alt="Ledgerty"
					title="Ledgerty"
				// codeRef="https://github.com/richardantao/ledgerty"
				>
					<p>
						Personal finance application that uses interactive T-accounts to allow for intuitive budget
						allocation and tracking.
					</p>
				</Card>
				<Card
					src={coming}
					alt="Jobs4Me Preview"
					title="Jobs4Me"
				// codeRef="https://github.com/richardantao/jobs-finder"
				>
					<p>
						Advanced job filtering for jobs posts sourced from the most popular job sites,
						including LinkedIn, GlassDoor, Indeed, and StackOverflow.
					</p>
				</Card>
				<Card
					src={reanimated}
					alt="React Native Gestures & Animations"
					title="React Native Gestures & Animations"
					codeRef="https://github.com/richardantao/react-native-animations"
				>
					<p>
						Created React Native gestures and animations from scratch, including the classic Tinder swipe.
					</p>
				</Card>
			</div>
		</section>
		<section id="services">
			<h2>Freelance Clientele</h2>
			<div id="services-description">
				<p>
					I offer services for website design & development, webscraping, and small scale mobile/web applications.
				</p>
				<p>
					If you are interested in working together on your next project,
					send me an <a href="mailto:richardmantao@gmail.com">email</a>.
				</p>
			</div>
			<div className="card-container">
				<Card
					src={coming}
					title="Big Tyme Lifestyle"
				>
					<p>
						Dynamic personal brand website for professional boxer, Jake Daoust.
					</p>
					<ul>
						<li>
							Built with the MERN stack
						</li>
						<li>
							90+ for all Lighthouse metrics
						</li>
					</ul>
				</Card>
				<Card
					src={coming}
					title="Stone House Contracting Ltd."
				// srcRef="https://stonehousecontractingltd.ca"
				>
					<p>
						Static landscaping website for client.
					</p>
					<ul>
						<li>
							Built with React/Gatsby
						</li>
						<li>
							Designed gallery from scratch
						</li>
						<li>
							90+ for all Lighthouse metrics
						</li>
					</ul>
				</Card>
			</div>
		</section>
	</Page>

export default Home;