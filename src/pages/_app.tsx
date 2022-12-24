import type { AppProps } from "next/app";

import { Footer } from "~/components";
import { GlobalStyles } from "~/styles";

const App = ({ Component, pageProps }: AppProps) => (
	<>
		<GlobalStyles />
		{/* <Navbar /> */}
		<Component {...pageProps} />
		<Footer />
	</>
);

export default App;