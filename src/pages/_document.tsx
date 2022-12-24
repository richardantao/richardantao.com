import { Fragment } from "react";
import NextDocument, { Html, Head, Main, NextScript, DocumentContext } from "next/document";
import { ServerStyleSheet } from "styled-components";

export default class Document extends NextDocument {
	static async getInitialProps(ctx: DocumentContext) {
		const sheet = new ServerStyleSheet();
		const originalRenderPage = ctx.renderPage;

		try {
			ctx.renderPage = () =>
				originalRenderPage({
					enhanceApp: App => props =>
						sheet.collectStyles(<App {...props} />),
				});

			const initialProps = await NextDocument.getInitialProps(ctx);
			return {
				...initialProps,
				styles: [
					<Fragment key={ctx.pathname}>
						{initialProps.styles}
						{sheet.getStyleElement()}
					</Fragment>
				],
			};
		} finally {
			sheet.seal();
		}
	}

	render() {
		return (
			<Html lang="en">
				<Head>
					<meta name="application-name" content="richardantao.com" />
					<meta name="author" content="Richard Antao" />
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
