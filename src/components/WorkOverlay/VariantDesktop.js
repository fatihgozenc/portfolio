import React from 'react'
import useRenderCount from '../../utils/useRenderCount';
import { useSpring, animated } from 'react-spring'

const VariantDesktop = ({ worksDom, data }) => {

	const workOverlayName = React.useRef()
	const workOverlayYear = React.useRef()

	let initialActiveItemKey = 0;

	const setActiveProject = () => {
		const center = Math.round(window.innerHeight / 2)
		// Creating an array from list
		// First 0 is the active one
		// Because its bottom position is
		// above the center of window
		const activityMap = Array.from(
			worksDom.current.children).map(
				el => Math.round(el.getBoundingClientRect().bottom) < center ? 1 : 0
			)

		// Getting the first 0 in array
		let activeItemKey = activityMap.indexOf(0)
		if (activeItemKey !== initialActiveItemKey) {
			initialActiveItemKey = activeItemKey
			workOverlayName.current.innerText = data[activeItemKey].name
			workOverlayYear.current.innerText = data[activeItemKey].year
		}

	}

	React.useEffect(() => {
		window.addEventListener('mousewheel', setActiveProject, false)
		window.addEventListener('DOMMouseScroll', setActiveProject, false)
		return () => {
			window.removeEventListener('mousewheel', setActiveProject, false)
			window.removeEventListener('DOMMouseScroll', setActiveProject, false)
		}
	})

	const barProps = useSpring({
		from: { width: 0 },
		width: 1024
	})

	useRenderCount('WorkOverlayDesktop');

	return (
		<div className="works__utils__overlay">
			<div className="works__utils__overlay--name">
				<span>01</span>
			</div>
			<div className="works__utils__overlay--year">
				<span>2020</span>
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
}

export default VariantDesktop