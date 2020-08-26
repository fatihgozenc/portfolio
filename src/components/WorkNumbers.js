import React from 'react'
import { connect } from 'react-redux'
import getWheelDelta from '../utils/getWheelDelta'
import getCharFromInt from '../utils/getCharFromInt'
import addThenDelClass from '../utils/addThenDelClass'
import useRenderCount from '../utils/useRenderCount';

const mapStateToProps = state => ({ category: state.category })

const WorkNumbers = ({ worksDom, category }) => {

	const numberFirst = React.useRef()
	const numberSecond = React.useRef()

	let initialActiveItemKey = 0;
	let initialFirstDecimal = 0;
	let initialSecondDecimal = 1;

	const setNumbers = (e) => {
		let scrollingDown = getWheelDelta(e) < 0 ? true : false

		const center = Math.round(window.innerHeight / 2)
		// Creating an array from list of dom elements
		// First 0 is the active one
		// Because its bottom position is
		// above the center of window
		const activityMap = Array.from(
			worksDom.current.children).map(
				el => Math.round(el.getBoundingClientRect().bottom) < center ? 1 : 0
			)
		// Getting the first 0 in array
		let activeItemKey = activityMap.indexOf(0)

		// Rendering starts on change of the value
		if (activeItemKey !== initialActiveItemKey) {
			initialActiveItemKey = activeItemKey

			// First number should start with 1 in view
			let activeItemNum = activeItemKey + 1
			// Creating array of decimals
			let decimals = activeItemNum > 9
				? [
					getCharFromInt(activeItemNum, 0),
					getCharFromInt(activeItemNum, 1)
				]
				: [0, activeItemNum]

			// Setting decimals
			// By rendering them on change of
			// decimal values
			if (decimals[0] !== initialFirstDecimal) {
				if (scrollingDown) {
					numberFirst.current.className = 'count-down'
					addThenDelClass(numberFirst.current, 'animate', 350)
				} else {
					numberFirst.current.className = 'count-up'
					addThenDelClass(numberFirst.current, 'animate', 350)
				}

				initialFirstDecimal = decimals[0]
				numberFirst.current.innerText = decimals[0]
			}
			if (decimals[1] !== initialSecondDecimal) {
				if (scrollingDown) {
					numberSecond.current.className = 'count-down'
					addThenDelClass(numberSecond.current, 'animate', 350)
				} else {
					numberSecond.current.className = 'count-up'
					addThenDelClass(numberSecond.current, 'animate', 350)
				}

				initialSecondDecimal = decimals[1]
				numberSecond.current.innerText = decimals[1]
			}
		}

	}

	React.useEffect(() => {
		window.addEventListener('mousewheel', setNumbers, false)
		// For Mozilla
		window.addEventListener('DOMMouseScroll', setNumbers, false)
		return () => {
			window.removeEventListener('mousewheel', setNumbers, false)
			// For Mozilla
			window.removeEventListener('DOMMouseScroll', setNumbers, false)
		}
	})

	// On category change
	// set numbers to initial values
	React.useEffect(() => {
		numberFirst.current.innerText = initialFirstDecimal
		numberSecond.current.innerText = initialSecondDecimal
	}, [category])

	useRenderCount('WorkNumbers');

	return (
		<div className="works__utils__number">
			<span ref={numberFirst}>0</span>
			<span ref={numberSecond}>1</span>
		</div>
	)
}

export default connect(mapStateToProps)(WorkNumbers)