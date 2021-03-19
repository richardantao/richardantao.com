import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt, faCode, faInfo } from "@fortawesome/free-solid-svg-icons";
import { faAppStoreIos, faGooglePlay } from "@fortawesome/free-brands-svg-icons";

import "./styles.scss";

const linkStyle = {
	color: "#0D3AA9"
};

const Card = ({
	children,
	src,
	alt,
	title,
	srcRef,
	infoRef,
	codeRef,
	appStoreRef,
	googlePlayRef,
	expandable = false
}) =>
	<div className="card">
		<div className="card-display">
			<img src={src} alt={alt} className={expandable ? "expandable" : ""} />
		</div>
		<div className="card-body">
			<h3>
				{title}
			</h3>
			<div className="card-body-description">
				{children}
			</div>
		</div>
		<div className="card-footer">
			{renderIcon(faExternalLinkAlt, srcRef)}
			{renderIcon(faAppStoreIos, appStoreRef)}
			{renderIcon(faGooglePlay, googlePlayRef)}
			{renderIcon(faInfo, infoRef)}
			{renderIcon(faCode, codeRef)}
		</div>
	</div>;

/**
 * @param {IconDefinition} icon icon definition
 * @param {string | undefined} href anchor tag href
 * @returns {JSX.Element}
 */
const renderIcon = (icon, href) => {
	if (href) return (
		<a href={href} target="_blank" rel="noreferrer">
			<FontAwesomeIcon icon={icon} style={linkStyle} />
		</a>
	);
};

Card.propTypes = {
	src: PropTypes.array.isRequired,
	alt: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	srcRef: PropTypes.string,
	infoRef: PropTypes.string,
	codeRef: PropTypes.string,
	expandable: PropTypes.bool
};

export default Card;