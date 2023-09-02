import { FC, PropsWithChildren } from "react";
import { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";

import { Footer } from "~/components";

import "./layout.css";

export const metadata: Metadata = {
	title: "Richard Antao",
	authors: [
		{
			name: "Richard Antao",
			url: "https://richardantao.com"
		}
	],
	viewport: {
		initialScale: 1,
		width: "device-width"
	},
	themeColor: "#FFFFFF",
	manifest: "/site.webmanifest",
	other: {
		"msapplication-TileColor": "#da532c"
	}
};

const RootLayout: FC<PropsWithChildren> = ({ children }) => (
	<html lang="en">
		<body>
			<NextTopLoader color="#00a6ff" />
			{children}
			<Footer />
		</body>
	</html>
);

export default RootLayout;