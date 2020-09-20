import React from 'react';
import Logo from './Logo';
import { NavLink, useLocation } from 'react-router-dom';
import { connect } from 'react-redux'
import { updateCategory } from '../redux/actions'

const mapDispatchToProps = (dispatch) => {
	return {
		updateCategory: category => dispatch(updateCategory(category))
	}
}

const mapStateToProps = state => ({ category: state.category })

const Header = (props) => {
	let location = useLocation();
	const headerFilter = React.useRef();

	const changeCategory = (e) => {
		props.updateCategory(e.target.value)
		window.scrollTo(0, 0);
	};

	return (
		<nav className="header">
			{
				location.pathname === "/works"
					? (
						<div className="header__filter">
							<select
								value={props.category}
								ref={headerFilter}
								onChange={changeCategory}
								className="header__filter"
								name="category"
							>
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
			<NavLink to="/shop">Shop</NavLink>
		</nav>
	)
}

export default connect(
	mapStateToProps,
	mapDispatchToProps)(Header)