import React from 'react'
import { useSpring, animated } from 'react-spring'
import { connect } from 'react-redux'
import useRenderCount from '../../utils/useRenderCount'
import getWheelDelta from '../../utils/getWheelDelta'

const mapStateToProps = state => (
	{
		entries: state.entries,
		category: state.category,
	}
)
// Keeping it out of component
// to prevent its reset on rendering
var xPos = 0

const VariantDesktop = React.memo(({ worksDom, entries, category }) => {

	const [key, setKey] = React.useState(0)
	let initialActiveItemKey = 0;

	const setActiveProject = (e) => {
		let deltaValue = getWheelDelta(e)

		// Reverting scroll delta to 
		// match with transform direction
		let revertedDelta = deltaValue < 0
			? Math.abs(deltaValue)
			: -Math.abs(deltaValue)

		// Every work has width of 33.33vw in CSS
		let workWidth = window.innerWidth / 3 // 33.33vw
		let wrapperWidth = worksDom.current.getBoundingClientRect().width

		// Getting scroll limit from
		// work width which has css width of 33.33vw
		// it also has its width / 2 of margin
		// then subtracting value from total width
		// to calculate final value
		let scrollLimit = Math.floor(
			wrapperWidth - (workWidth + (workWidth / 2))
		)

		// Incrementing initialXPos from delta value
		// Limiting its start to 0
		// Also limiting its end to scrolllimit
		xPos = xPos + revertedDelta
		xPos = xPos < 0 ? 0 : xPos
		xPos = xPos > scrollLimit ? scrollLimit : xPos

		worksDom.current.style.transform = `translateX(-${xPos}px)`


		// Updating activeProjectKey
		// Center is the horizontally middle on desktop
		const center = Math.round(window.innerWidth / 2)
		// Creating an array from list
		// First 0 is the active one
		// Because its bottom position is
		// above the center of window
		const activityMap = Array.from(
			worksDom.current.children).map(
				el => Math.round(el.getBoundingClientRect().right) < center ? 1 : 0
			)

		let activeItemKey = activityMap.indexOf(0)

		if (activeItemKey !== initialActiveItemKey) {
			initialActiveItemKey = activeItemKey
			setKey(activeItemKey)
		}
	}

	const setActiveProjectWithoutTransform = (e) => {
		// Changing vertical direction to horizontal
		e.currentTarget.scrollLeft += (e.deltaY + e.deltaX) * 2;

		const center = Math.round(window.innerWidth / 2)
		// Creating an array from list
		// First 0 is the active one
		// Because its bottom position is
		// above the center of window
		const activityMap = Array.from(
			worksDom.current.children).map(
				el => Math.round(el.getBoundingClientRect().right) < center ? 1 : 0
			)

		let activeItemKey = activityMap.indexOf(0)

		if (activeItemKey !== initialActiveItemKey) {
			initialActiveItemKey = activeItemKey
			setKey(activeItemKey)
		}
	}

	// React.useEffect(() => {
	// 	window.addEventListener('mousewheel', setActiveProject, false)
	// 	window.addEventListener('DOMMouseScroll', setActiveProject, false)
	// 	document.body.classList.add('overflowHidden')
	// 	return () => {
	// 		window.removeEventListener('mousewheel', setActiveProject, false)
	// 		window.removeEventListener('DOMMouseScroll', setActiveProject, false)
	// 		document.body.classList.remove('overflowHidden')
	// 	}
	// }, [])

	React.useEffect(() => {
		const worksContainer = worksDom.current.parentElement
		worksContainer.addEventListener(
			'wheel',
			setActiveProjectWithoutTransform,
			false
		)
		worksContainer.addEventListener(
			'wheel',
			setActiveProjectWithoutTransform,
			false
		)
		document.body.classList.add('overflowHidden')
		return () => {
			worksContainer.removeEventListener(
				'mousewheel',
				setActiveProjectWithoutTransform,
				false
			)
			worksContainer.removeEventListener(
				'DOMMouseScroll',
				setActiveProjectWithoutTransform,
				false
			)
			document.body.classList.remove('overflowHidden')
		}
	}, [])

	React.useEffect(() => {
		setKey(0)
		worksDom.current.parentElement.scrollTo(0, 0)
		// worksDom.current.style.transform = 'translateX(0)'
	}, [category])

	const barProps = useSpring({
		from: { width: 0 },
		width: 1024
	})

	useRenderCount('WorkOverlayDesktop');

	return (
		<div className="works__utils__overlay">
			<div className="works__utils__overlay--name">
				<span>{entries.length > 0 && entries[key].name}</span>
			</div>
			<div className="works__utils__overlay--year">
				<span>{entries.length > 0 && entries[key].year}</span>
			</div>
			<div className="works__utils__overlay--slider">
				<span className="slider__number slider__number--current">01</span>
				<div className="slider__bar--wrapper">
					<animated.span style={barProps} className="slider__bar" />
				</div>
				<span className="slider__number slider__number--total">{13}</span>
			</div>
		</div>
	)
})

export default connect(mapStateToProps)(VariantDesktop)