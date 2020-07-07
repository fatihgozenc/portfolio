import React, {Suspense} from 'react';
import {useSpring, animated} from 'react-spring'
import useWindowSize from '../utils/useWindowSize';
import WorksContext from '../context/WorksContext';
import useScrollDirection from '../utils/useScrollDirection';
import getCharFromInt from '../utils/getCharFromInt';
import addThenDelClass from '../utils/addThenDelClass';
import WorkList from '../components/WorkList';
import Loading from '../components/Loading';
import usePrevious from '../utils/usePrevious';

const Works = React.memo((props) => {
  const size = useWindowSize();
  const [activeCategory, setActiveCategory] = React.useContext(WorksContext);
  const [activeSubCategory, setActiveSubCategory] = React.useState('');
  const [activeNumberFirst, setActiveNumberFirst] = React.useState(0);
  const [activeNumberSecond, setActiveNumberSecond] = React.useState(1);
  const [activeProjectName, setActiveProjectName] = React.useState('Golden Door')
  const [activeProjectYear, setActiveProjectYear] = React.useState('2020');
  const [activeProjectArrayKey, setActiveProjectArrayKey] = React.useState(0);
  const [scrollLimit, setScrollLimit] = React.useState(0);
  const [itemXPositions, setItemXPositions] = React.useState([]);
  const prevItemXPositions = usePrevious(itemXPositions);
  const [projectCount, setProjectCount] = React.useState(13)

  const worksContainer = React.useRef();
  const overlay = React.useRef();
  const sliderBar = React.useRef();
  const numberFirst = React.useRef();
  const numberSecond = React.useRef();

  const setActiveProjectMobile = () => {
    let workList = Array.from(worksContainer.current.children);
    let itemPositions = workList.map(item => (
      item.getBoundingClientRect().top
    ))
    let itemTriggerBoolList = itemPositions.map((item, i) => (
      item < 0 ? true : false
    ))
    let itemArrayKey = itemTriggerBoolList.map((item, i) => item === true && i).indexOf(false);
    setActiveProjectArrayKey(itemArrayKey);
  }

  const [xPos, setXpos] = React.useState(0);
  const [sliderStepPos, setSliderStepPos] = React.useState(0);
  const xWidth = window.innerWidth * 33.33 / 100;
  const xSpacing = window.innerWidth * 16.665 / 100;
  let timer = null;

  const {x} = useSpring({
    from: {x: 0},
    x: xPos
  })

  const barProps = useSpring({
    from: {width: 0},
    width: sliderStepPos
  })

  // SET SCROLL LIMITS
  React.useEffect(() => {
    xPos >= 0 && setXpos(0)
    xPos < scrollLimit && setXpos(scrollLimit)
    // console.log(xPos)
  }, [xPos, scrollLimit])

  const setActiveProject = (e) => {
    let wheeling;
    let delta = e.wheelDelta ? e.wheelDelta /2 : -e.detail * 20;
    let workList = Array.from(worksContainer.current.children);
    let projectCount = workList.length;
    
    const redline = {left: overlay.current.getBoundingClientRect().left  - (xWidth), right: overlay.current.getBoundingClientRect().right  + (xWidth)}
    
    // SCROLLING ANIMATION CLASS ADDING/REMOVING
    setXpos(xPos => xPos + delta)
    !wheeling && delta < 0 && worksContainer.current.classList.add('bend-right');
    !wheeling && delta > 0 && worksContainer.current.classList.add('bend-left') 
    wheeling = setTimeout(() => {
      delta < 0 ? worksContainer.current.classList.remove('bend-right') : worksContainer.current.classList.remove('bend-left') 
      wheeling = undefined
    }, 250);

    // DETECT ITEM TRANSFORM COORDS
    let itemCount = Array(projectCount).fill(0)
    let itemTransformXPositions = itemCount.map((item, i) => Math.ceil((item + xWidth + xSpacing) * i) )

    // DETECT ITEM COORDS
    let itemCoords = workList.map(item => (
      {left: item.getBoundingClientRect().left, right: item.getBoundingClientRect().right}
    ))
    let itemTriggerBoolList = itemCoords.map(item => (
      item.left >= redline.left && item.right <= redline.right ? true : false
    ))

    // IF COORDS BETWEEN REDLINE IT'S TRUE
    let itemArrayKey = itemTriggerBoolList.indexOf(true)
    setActiveProjectArrayKey(itemArrayKey);
    setScrollLimit(-itemTransformXPositions[projectCount - 1])
    
    // CORRECTING ITEM X POSITION AFTER SCROLL ENDS
    timer !== null && clearTimeout(timer);
    timer = setTimeout(() => {
      setXpos(-itemTransformXPositions[itemArrayKey])
    }, 1000);
  }

  React.useEffect(() => {
    let projectList = Array.from(worksContainer.current.children);
    let activeProjectKey = activeProjectArrayKey + 1;
    setActiveNumberFirst(activeProjectKey > 9 ? getCharFromInt(activeProjectKey, 0) : 0)
    setActiveNumberSecond(activeProjectKey > 9 ? getCharFromInt(activeProjectKey, 1) : activeProjectKey)
    setActiveProjectName(projectList[activeProjectArrayKey].getAttribute('name'));
    setActiveProjectYear(projectList[activeProjectArrayKey].getAttribute('from'));
    // SET SLIDER BAR WIDTH ON PROJECT CHANGE
    if (size.width >= 1200){
      if(sliderBar.current !== undefined){
        setSliderStepPos((sliderBar.current.getBoundingClientRect().width / projectCount) * activeProjectKey)
      } else {
        setSliderStepPos(((window.innerWidth / 3 )/ projectCount) * activeProjectKey)
      }
    }
  }, [activeProjectArrayKey, size])

  React.useEffect(() => {
    console.log('Binding window event listeners')
    if (size.width >= 1200){
      document.body.classList.add('overflowHidden')
      setSliderStepPos(50)
      window.addEventListener('mousewheel', setActiveProject, false)
      // FOR FIREFOX SCROLL EVENT
      window.addEventListener('DOMMouseScroll', setActiveProject, false)
    } else {
      document.body.classList.remove('overflowHidden')
      window.addEventListener('scroll', setActiveProjectMobile)
    }
    return () => {
    console.log('Unbinding window event listeners')
      if (size.width >= 1200){
        document.body.classList.remove('overflowHidden')
        window.removeEventListener('mousewheel', setActiveProject, false)
        // FOR FIREFOX SCROLL EVENT
        window.removeEventListener('DOMMouseScroll', setActiveProject, false)
      } else {
        window.removeEventListener('scroll', setActiveProjectMobile)
      }
    }
  }, [])

  // FETCHING AND SETTING INITIAL PROJECT ATTRIBUTES
  React.useEffect(()=>{
    setTimeout(() => {
      let workList = Array.from(worksContainer.current.children);
      let itemCount = Array(workList.length).fill(0)
      let itemTransformXPositions = itemCount.map((item, i) => Math.ceil((item + xWidth + xSpacing) * i) )
      setActiveProjectName(worksContainer.current.children[0].getAttribute('name'));
      setActiveProjectYear(worksContainer.current.children[0].getAttribute('from'));
      setActiveNumberFirst(0)
      setActiveNumberSecond(1)
      setItemXPositions( prevItemXPositions !== itemTransformXPositions && itemTransformXPositions);
      size.width >= 1200 && setSliderStepPos(((sliderBar.current !== undefined ? sliderBar.current.getBoundingClientRect().width : window.innerWidth / 3) / workList.length))
      setXpos(0);
      setProjectCount(workList.length)
    }, 100);
  }, [activeCategory, activeSubCategory, prevItemXPositions, xWidth, xSpacing, size])

  // CHANGING FIRST NUMBER
  React.useEffect(() => {
    addThenDelClass(numberFirst.current, 'animate', 350)
  }, [activeNumberFirst]);

  // CHANGING SECOND NUMBER
  React.useEffect(() => {
    addThenDelClass(numberSecond.current, 'animate', 350)
  }, [activeNumberSecond])

  const getItemAttrs = (name, year) => {
    setActiveProjectName(name)
    setActiveProjectYear(year)
  }

  return (
    <>
      <div className="works__utils">
        {/* <div className="works__utils__filter">
          <select onChange={selectCategory} name="category">
            <option value="es6">ES6</option>
            <option value="Graphic">Graphic</option>
            <option value="Music">Music</option>
          </select>
        </div> */}
        <h1 className="title__outline">Works</h1>
        <div className="works__utils__number">
          <span ref={numberFirst} className={`count-${useScrollDirection()}`}>{activeNumberFirst}</span>
          <span ref={numberSecond} className={`count-${useScrollDirection()}`}>{activeNumberSecond}</span>
        </div>
        {window.innerWidth <= 1200 && (
          <div ref={overlay} className="works__utils__overlay">
            <div className="works__utils__overlay--name">
              <span>{activeProjectName}</span>
            </div>
            <div className="works__utils__overlay--year">
              <span>{activeProjectYear}</span>
            </div>
          </div>
        )}
      </div>
      <div className="works__wrapper">
        <p>{}</p>
        <animated.div ref={worksContainer} className="works" style={{
          transform: x.interpolate((x) => `translateX(${x}px)`) }}>
          <Suspense fallback={<Loading/>}>
            <WorkList getItemAttrs={getItemAttrs} filterCategory={activeCategory} filterSubCategory={activeSubCategory}/>
          </Suspense>
        </animated.div>
        {size.width > 1200 && 
          (<div ref={overlay} className="works__utils__overlay">
            <div className="works__utils__overlay--name">
              <span>{activeProjectName}</span>
            </div>
            <div className="works__utils__overlay--year">
              <span>{activeProjectYear}</span>
            </div>
            <div className="works__utils__overlay--slider">
              <span className="slider__number slider__number--current">
              {activeNumberFirst}{activeNumberSecond}
              </span>
              <div ref={sliderBar} className="slider__bar--wrapper">
                <animated.span style={barProps} className="slider__bar" />
              </div>
              <span className="slider__number slider__number--total">{projectCount}</span>
            </div>
          </div>)
          }
      </div>
    </>
  )
})

export default Works;