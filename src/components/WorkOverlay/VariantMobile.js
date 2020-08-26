import React from 'react'
import useRenderCount from '../../utils/useRenderCount';

const VariantMobile = ({ worksDom, data }) => {

	const workOverlayName = React.useRef()
	const workOverlayYear = React.useRef()

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

		const activeItemKey = activityMap.indexOf(0)

		workOverlayName.current.innerText = data[activeItemKey].name
		workOverlayYear.current.innerText = data[activeItemKey].year
	}

	React.useEffect(() => {
		window.addEventListener('mousewheel', setActiveProject, false)
		window.addEventListener('DOMMouseScroll', setActiveProject, false)
		return () => {
			window.removeEventListener('mousewheel', setActiveProject, false)
			window.removeEventListener('DOMMouseScroll', setActiveProject, false)
		}
	}, [])

	useRenderCount('WorkOverlayMobile');

	return (
		<div className="works__utils__overlay">
			<div className="works__utils__overlay--name">
				<span ref={workOverlayName}>{data[0].name}</span>
			</div>
			<div className="works__utils__overlay--year">
				<span ref={workOverlayYear}>{data[0].year}</span>
			</div>
		</div>
	)
}

export default VariantMobile