import type { FC } from "react";
import type { Metadata, Viewport } from "next";
import { Syne, DM_Sans, DM_Mono } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import { clsx } from "clsx";

import "~/styles/globals.scss";

import { Footer } from "~/lib/client/components/Footer";
import { Navbar } from "~/lib/client/components/Navbar";

import { ThemeScript } from "./ThemeScript";

export const viewport: Viewport = {
	initialScale: 1,
	width: "device-width",
	themeColor: [
		{
			media: "(prefers-color-scheme: light)",
			color: "#FFFFFF",
		},
		{
			media: "(prefers-color-scheme: dark)",
			color: "#0A0A0A",
		},
	],
};

export const metadata: Metadata = {
	title: "Richard Antao",
	authors: [
		{
			name: "Richard Antao",
			url: "https://richardantao.com",
		},
	],
	manifest: "/site.webmanifest",
	other: {
		"msapplication-TileColor": "#da532c",
	},
	metadataBase: new URL("https://richardantao.com"),
};

const syne = Syne({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700", "800"],
	variable: "--font-display",
	display: "swap",
});

const dmSans = DM_Sans({
	subsets: ["latin"],
	weight: ["300", "400", "500"],
	style: ["normal", "italic"],
	variable: "--font-body",
	display: "swap",
});

const dmMono = DM_Mono({
	subsets: ["latin"],
	weight: ["400", "500"],
	variable: "--font-mono",
	display: "swap",
});

const RootLayout: FC<LayoutProps<"/">> = ({ children }) => (
	<html
		lang="en"
		className={clsx(syne.variable, dmSans.variable, dmMono.variable)}
		data-scroll-behavior="smooth"
		suppressHydrationWarning
	>
		<body>
			<NextTopLoader color="#0090E8" showSpinner={false} />
			<ThemeScript />
			<Navbar />
			{children}
			<Footer />
		</body>
	</html>
);

export default RootLayout;
