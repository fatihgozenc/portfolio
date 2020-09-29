import React from 'react';
import { NavLink } from 'react-router-dom';

const Footer = (props) => {
	return (
		<footer className="footer">
			<a target="_blank" rel="noreferrer noopener" href="https://www.instagram.com/fatihgozenc">Instagram</a>
			<NavLink to="/about">About</NavLink>
		</footer>
	)
}

export default Footer