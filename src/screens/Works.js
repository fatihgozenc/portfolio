import React, { Suspense } from 'react';
import { useSpring, animated } from 'react-spring'
import { Link } from 'react-router-dom';
import { StateContext } from '../context/StateContext'
import useWindowSize from '../utils/useWindowSize';
import useScrollDirection from '../utils/useScrollDirection';
import getCharFromInt from '../utils/getCharFromInt';
import addThenDelClass from '../utils/addThenDelClass';
import WorkList from '../components/WorkList';
import Loading from '../components/Loading';
import usePrevious from '../utils/usePrevious';
import useRenderCount from '../utils/useRenderCount';
import useScrollPosition from '../utils/useScrollPosition';
import useTraceUpdate from '../utils/useTraceUpdate';
import useFetchSuspense from '../utils/useFetchSuspense';
import WorkOverlay from '../components/WorkOverlay'

const Works = React.memo((props) => {
	const size = useWindowSize();
	const { activeCategory } = React.useContext(StateContext)

	// Fetching data with suspense
	// Shouldn't be inside an effect.
	let data = useFetchSuspense(
		`${process.env.REACT_APP_API_URL}/works?category=${activeCategory}`).entries

	const [activeItemKey, setActiveItemKey] = React.useState(0)

	const [state, setState] = React.useState({
		entries: data,
		// Setting first project's 
		// name and year on mount.
		activeProject: {
			name: data[0].name,
			year: data[0].year
		},
		activeNumber: [0, 1]
	})

	// React.useMemo(() => {
	// 	// On category change
	// 	// Using suspense again
	// 	// By querying category slug
	// 	setState({
	// 		...state,
	// 		entries: data,
	// 		activeProject: {
	// 			name: data[0].name,
	// 			year: data[0].year
	// 		}
	// 	})
	// }, [activeCategory])

	React.useEffect(() => {
		if (activeItemKey != 0) {
			setState({
				...state,
				activeProject: {
					name: data[activeItemKey].name,
					year: data[activeItemKey].year
				}
			})
		}
	}, [activeItemKey])


	const { x } = useSpring({
		from: { x: 0 },
		x: 5
	})

	const barProps = useSpring({
		from: { width: 0 },
		width: 1024
	})


	const works = React.useRef();

	useScrollPosition(({ prevPos, currPos }) => {
		const center = Math.round(window.innerHeight / 2)
		// Creating an array from list
		// First 0 is the active one
		// Because its bottom position is
		// above the center of window
		const activityMap = Array.from(
			works.current.children).map(
				el => Math.round(el.getBoundingClientRect().bottom) < center ? 1 : 0
			)
		// console.log(activityMap)
		const activeItem = activityMap.indexOf(0)
		let scrollingDown = prevPos.y - currPos.y > 0
		setActiveItemKey(activeItem)
	})

	React.useEffect(() => {
		console.log('first')
	}, [])

	useRenderCount();

	return (
		<>
			<div className="works__utils">
				<h1 className="title__outline">Works</h1>
				<div className="works__utils__number">
					<span className={`count-up`}>{state.activeNumber[0]}</span>
					<span className={`count-up`}>{state.activeNumber[1]}</span>
				</div>
				{window.innerWidth <= 1200 && (
					<WorkOverlay data={state.entries} index={activeItemKey}/>
				)}
			</div>
			<div className="works__wrapper">
				<animated.div className="works" ref={works} style={{
					transform: x.interpolate((x) => `translateX(${x}px)`)
				}}>
					<Suspense fallback={<Loading />}>
						{
							state.entries.map((work, i) => (
								<article key={i} name={work.name} from={work.year} className="works__item">
									<Link to={{
										pathname: `/works/${work.slug}`,
										state: {
											name: work.name,
											year: work.year,
											hero: work.hero
										}
									}}>
										<img alt={work.name} src={work.hero} />
									</Link>
								</article>
							))
						}
					</Suspense>
				</animated.div>
				{size.width > 1200 &&
					(<div className="works__utils__overlay">
						<div className="works__utils__overlay--name">
							<span>01</span>
						</div>
						<div className="works__utils__overlay--year">
							<span>2020</span>
						</div>
						<div className="works__utils__overlay--slider">
							<span className="slider__number slider__number--current">01</span>
							<div className="slider__bar--wrapper">
								<animated.span className="slider__bar" />
							</div>
							<span className="slider__number slider__number--total">{13}</span>
						</div>
					</div>)
				}
			</div>
		</>
	)
})

export default Works;
