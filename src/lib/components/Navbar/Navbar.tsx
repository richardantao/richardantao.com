import { FC } from "react";
import styled from "styled-components";
import NextLink from "next/link";
import { Color } from "~/styles";

const Header = styled.header.attrs(() => ({ role: "banner" }))`
	align-items: center;
	display: flex;
	height: 100px;
	justify-content: flex-end;
`;

const Nav = styled.nav.attrs(() => ({ role: "navigation" }))`
	align-items: center;
	display: flex;
`;

const Link = styled(NextLink).attrs(() => ({ role: "link" }))`
	color: ${Color.TEXT};
	margin: 0 1rem;
	padding: 0.25rem;
	text-decoration: none;

	&:hover,
	&:focus,
	&:active {
		color: ${Color.PRIMARY};
	}
`;

export const Navbar: FC = () => (
	<Header>
		<Nav>
			<Link href="/">Home</Link>
			<Link href="/blog">Blog</Link>
			<Link href="/bookshelf">Bookshelf</Link>
		</Nav>
	</Header>
);