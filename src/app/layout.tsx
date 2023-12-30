import { FC, PropsWithChildren } from "react";
import { Metadata, Viewport } from "next";
import NextTopLoader from "nextjs-toploader";

import { Footer } from "~/components";

import "./layout.css";

export const viewport: Viewport = {
	initialScale: 1,
	width: "device-width",
	themeColor: "#FFFFFF",

};

export const metadata: Metadata = {
	title: "Richard Antao",
	authors: [
		{
			name: "Richard Antao",
			url: "https://richardantao.com"
		}
	],
	manifest: "/site.webmanifest",
	other: {
		"msapplication-TileColor": "#da532c"
	}
};

const RootLayout: FC<PropsWithChildren> = ({ children }) => (
	<html lang="en">
		<body>
			<NextTopLoader
				color="#00A6FF"
				showSpinner={false}
			/>
			{children}
			<Footer />
		</body>
	</html>
);

export default RootLayout;