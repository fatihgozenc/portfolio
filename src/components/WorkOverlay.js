import React from 'react'
import { connect } from 'react-redux'
import useWindowSize from '../utils/useWindowSize';
import getCharFromInt from '../utils/getCharFromInt'
import addThenDelClass from '../utils/addThenDelClass'
import animate, { Easing } from '../utils/animate'

const mapStateToProps = state => (
	{
		entries: state.entries,
		category: state.category,
	}
)

const WorkOverlay = React.memo(({ worksDom, entries, category, whenScrollEnds }) => {
	const size = useWindowSize();

  const [key, setKey] = React.useState(0)
  const numberFirst = React.useRef()
  const numberSecond = React.useRef()
  let initialActiveItemKey = 0
  let initialFirstDecimal = 0
	let initialSecondDecimal = 1
 
  let scrolledTopPrev = 0
  let scrollDirection = 'down'

  const changeNumber = (el, direction) => {
    el.className = `count-${direction}`
		addThenDelClass(el, 'animate', 350)
  }

	const setActiveProjectOnScroll = (e) => {
    // For firefox compatibility
    // const isDesktop = e.type == "wheel"
    const isDesktop = size.width > 1200
    
    // Changing vertical direction to horizontal in desktop
    // Also increase deltaY val for Firefox
    if(isDesktop){
      let normalizedDeltaY = e.wheelDelta ? e.deltaY : e.deltaY * 37
      e.currentTarget.scrollLeft += (normalizedDeltaY + e.deltaX) * 2;
    }

		// Setting active item key
		const center = isDesktop ? Math.round(window.innerWidth / 2) : Math.round(window.innerHeight / 2)
		const activityMap = Array.from(
			worksDom.current.children).map(
				el => (
          isDesktop
          ? Math.round(el.getBoundingClientRect().right) < center ? 1 : 0
          : Math.round(el.getBoundingClientRect().bottom) < center ? 1 : 0
        )
			)
    let activeItemKey = activityMap.indexOf(0)

    // Get scroll direction
    let scrolledTop = window.pageYOffset || document.documentElement.scrollTop
    if(isDesktop){
      e.deltaY > 0
      ? scrollDirection = 'down'
      : scrollDirection = 'up'
    } else {
      scrolledTop > scrolledTopPrev
      ? scrollDirection = 'down'
      : scrollDirection = 'up'
      scrolledTopPrev = scrolledTop <= 0 ? 0 : scrolledTop;
    }

    // When the key has changed
		if (activeItemKey !== initialActiveItemKey) {
      initialActiveItemKey = activeItemKey
      setKey(activeItemKey)
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
        scrollDirection === 'down'
        ? changeNumber(numberFirst.current, 'down')
        : changeNumber(numberFirst.current, 'up')
        initialFirstDecimal = decimals[0]
        numberFirst.current.innerText = initialFirstDecimal
			}
			if (decimals[1] !== initialSecondDecimal) {
        scrollDirection === 'down'
        ? changeNumber(numberSecond.current, 'down')
        : changeNumber(numberSecond.current, 'up')
        initialSecondDecimal = decimals[1]
        numberSecond.current.innerText = initialSecondDecimal
			}
    }

    // Correcting item position after scroll ends
    if(isDesktop){
      const itemCount = worksDom.current.children.length
      const itemWidth = (window.innerWidth / 3) + ( window.innerWidth / 6)
      const correctItemPositions = Array(itemCount).fill().map((el, i) => i * itemWidth)
      const currentPosition = worksDom.current.parentElement.scrollLeft;
      whenScrollEnds !== null && clearTimeout(whenScrollEnds)
      whenScrollEnds = setTimeout(function () {
        if ( currentPosition !== correctItemPositions[activeItemKey]){
          animate({
            duration: 500,
            timing: Easing.easeInOutQuint,
            action: (progress) => {
              let difference = currentPosition - correctItemPositions[activeItemKey]
              worksDom.current &&  worksDom.current.parentElement.scrollTo(currentPosition - (progress * difference), 0)
             
            }
          })
      }
      }, 750);
    }
  }

	React.useEffect(() => {
    setKey(0)
    worksDom.current.parentElement.scrollTo(0, 0)
    whenScrollEnds !== null && clearTimeout(whenScrollEnds)
    setTimeout(() => {
      numberFirst.current.innerText = 0
      numberSecond.current.innerText = 1
      window.scroll(0, 1)
    }, 200);
    return () => {
      setKey(0)
    }
  }, [category])

  
  React.useEffect(() => {
    const worksContainer = worksDom.current.parentElement
    if(size.width > 1200 ){
      worksContainer.addEventListener('wheel', setActiveProjectOnScroll, false)
      document.body.classList.add('overflowHidden')
    } else {
      window.addEventListener('scroll', setActiveProjectOnScroll, false)
      document.body.classList.remove('overflowHidden')
    }
    return () => {
      clearTimeout(whenScrollEnds)
      if(size.width > 1200 ){
        worksContainer.removeEventListener('wheel', setActiveProjectOnScroll, false)
        document.body.classList.remove('overflowHidden')
      } else {
        window.removeEventListener('scroll', setActiveProjectOnScroll, false)
        document.body.classList.remove('overflowHidden')
      }
		}
  }, [size])
  
	return (
    <>
      <div className="works__utils__number">
        {/* <span ref={numberFirst}>{entries.length > 0 && (entries[key] ? entries.indexOf(entries[key]) < 9 ? 0 : Array.from((entries.indexOf(entries[key]) + 1).toString())[0] : 0)}</span>
        <span ref={numberSecond}>{entries.length > 0 && (entries[key] ? entries.indexOf(entries[key]) < 9 ? (entries.indexOf(entries[key] )+ 1) : Array.from((entries.indexOf(entries[key]) + 1).toString())[0] : 0)}</span> */}
        <span ref={numberFirst}>{key < 9 ? 0 : Array.from((key + 1).toString())[0]}</span>
        <span ref={numberSecond}>{key < 9 ? key + 1 : Array.from((key + 1).toString())[1]}</span>
        {/* <span ref={numberFirst}>0</span>
        <span ref={numberSecond}>1</span> */}
        {/* <span ref={numberFirst}>{initialFirstDecimal}</span>
        <span ref={numberSecond}>{initialSecondDecimal}</span> */}
      </div>
      <div className="works__utils__overlay">
        <div className="works__utils__overlay--name">
          <span>{entries.length > 0 && (entries[key] ? entries[key].name : entries[0].name )}</span>
        </div>
        <div className="works__utils__overlay--year">
          <span>{entries.length > 0 && (entries[key] ? entries[key].year : entries[0].year)}</span>
        </div>
        <div className="works__utils__overlay--slider">
          <span className="slider__number slider__number--current">{key < 9 ? `0${key + 1}` : key + 1}</span>
          <div className="slider__bar--wrapper">
            <span style={{width: `${(100 / entries.length) * (key + 1)}%`}} className="slider__bar" />
          </div>
          <span className="slider__number slider__number--total">{entries.length > 0 && entries.length}</span>
        </div>
      </div>
    </>
	)
})

export default connect(mapStateToProps)(WorkOverlay)
