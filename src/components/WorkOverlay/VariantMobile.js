import React from 'react'
import useRenderCount from '../../utils/useRenderCount';
import { connect } from 'react-redux'

const mapStateToProps = state => {
	return {
		entries: state.entries,
		category: state.category
	}
}

const VariantMobile = React.memo((props) => {

	let initialActiveItemKey = 0;
	const [key, setKey] = React.useState(0)

	const setActiveProject = () => {
		const center = Math.round(window.innerHeight / 2)
		// Creating an array from list
		// First 0 is the active one
		// Because its bottom position is
		// above the center of window
		const activityMap = Array.from(
			props.worksDom.current.children).map(
				el => Math.round(el.getBoundingClientRect().bottom) < center ? 1 : 0
			)

		// Getting the first 0 in array
		let activeItemKey = activityMap.indexOf(0)

		// Checking if the key is different
		// then initial value
		if (activeItemKey !== initialActiveItemKey) {
			initialActiveItemKey = activeItemKey
			setKey(activeItemKey)
		}
	}

	React.useEffect(() => {
		window.addEventListener('mousewheel', setActiveProject, false)
		// For Mozilla
		window.addEventListener('DOMMouseScroll', setActiveProject, false)
		return () => {
			window.removeEventListener('mousewheel', setActiveProject, false)
			// For Mozilla
			window.removeEventListener('DOMMouseScroll', setActiveProject, false)
		}
	})

	React.useEffect(() => {
		// If category changes
		// Set active item key to 0
		setKey(0)
	}, [props.category])

	useRenderCount('WorkOverlayMobile');

	return (
		<div className="works__utils__overlay">
			<div className="works__utils__overlay--name">
				<span >{
					// Need this check because
					// initial entries state is empty
					// because its not an SSR app
					props.entries.length > 0 && props.entries[key].name
				}</span>
			</div>
			<div className="works__utils__overlay--year">
				<span >{
					// Need this check because
					// initial entries state is empty
					// because its not an SSR app
					props.entries.length > 0 && props.entries[key].year
				}</span>
			</div>
		</div>
	)
})

export default connect(mapStateToProps)(VariantMobile)