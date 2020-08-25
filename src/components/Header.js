import React from 'react';
import { StateContext } from '../context/StateContext'
import Logo from './Logo';
import { NavLink, useLocation } from 'react-router-dom';

export default () => {

	let location = useLocation();
	const { activeCategory, setActiveCategory } = React.useContext(StateContext)
	const headerFilter = React.useRef();

	const changeCategory = (e) => {
		setActiveCategory(e.target.value)
	};

	// SELECT THE LATEST SELECTED CATEGORY
	React.useEffect(() => {
		// if (location.pathname === "/works") {
		// 	Array.from(headerFilter.current.children).map(option => (
		// 		option.value === activeCategory ? option.selected = true : null
		// 	))
		// }
	}, [])

	return (
		<nav className="header">
			{
				location.pathname === "/works"
					? (
						<div className="header__filter">
							<select ref={headerFilter} onChange={changeCategory} className="header__filter" name="category">
								<option value="web">Web</option>
								<option value="graphic">Graphic</option>
								<option value="art">Art</option>
							</select>
						</div>
					) : (
						<NavLink to="/works">Works</NavLink>
					)
			}
			<NavLink to="/"><Logo /></NavLink>
			<NavLink to="/about">About</NavLink>
		</nav>
	)
}