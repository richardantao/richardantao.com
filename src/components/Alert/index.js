import React, { useState } from "react";

import "styles/global.scss";
import "./styles.scss";

const Alert = () => {
	const [isVisible, setVisible] = useState(true);

	const handleClick = () => setVisible(prevVisible => !prevVisible);

	return (
		isVisible &&
		<div id="alert" role="alert">
			<h3>Site under construction... again.</h3>
			<p>Ever get the urge to teardown your website and rebuild it from the ground up? Same</p>
			<p>Apologies for the half built site; I'm publishing the site in chunks as I go, so whatever you're currently seeing is a WIP.</p>
			<button onClick={handleClick}>Close</button>
		</div>
	);
};

export default Alert;