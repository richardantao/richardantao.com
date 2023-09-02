import { FC } from "react";
import Link from "next/link";

import "./Navbar.css";

export const Navbar: FC = () => (
	<header role="banner">
		<nav role="navigation">
			<Link href="/">Home</Link>
			<Link href="/blog">Blog</Link>
			<Link href="/bookshelf">Bookshelf</Link>
		</nav>
	</header>
);