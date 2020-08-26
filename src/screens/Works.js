import React, { Suspense } from 'react';
import { useSpring, animated } from 'react-spring'
import { Link } from 'react-router-dom';
import { StateContext } from '../context/StateContext'
import useWindowSize from '../utils/useWindowSize';
// import WorkList from '../components/WorkList';
import Loading from '../components/Loading';
import useRenderCount from '../utils/useRenderCount';
import useFetchSuspense from '../utils/useFetchSuspense';
import WorkOverlay from '../components/WorkOverlay'
import WorkNumbers from '../components/WorkNumbers';

const Works = React.memo((props) => {
	const size = useWindowSize();
	const { activeCategory } = React.useContext(StateContext)

	// Fetching data with suspense
	// Shouldn't be inside an effect.
	let data = useFetchSuspense(
		`${process.env.REACT_APP_API_URL}/works?category=${activeCategory}`).entries

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

	React.useMemo(() => {
		// On category change
		// Using suspense again
		// By querying category slug
		setState({
			...state,
			entries: data,
			activeProject: {
				name: data[0].name,
				year: data[0].year
			}
		})
	}, [activeCategory])


	const { x } = useSpring({
		from: { x: 0 },
		x: 5
	})

	const worksDomList = React.useRef();

	useRenderCount('Works');

	return (
		<>
			<div className="works__utils">
				<h1 className="title__outline">Works</h1>
				<WorkNumbers worksDom={worksDomList} />
				{window.innerWidth <= 1200 && (
					<WorkOverlay variant="mobile" worksDom={worksDomList} data={state.entries} />
				)}
			</div>
			<div className="works__wrapper">
				<animated.div className="works" ref={worksDomList} style={{
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
				{size.width > 1200 && (
					<WorkOverlay variant="desktop" worksDom={worksDomList} data={state.entries} />
				)}
			</div>
		</>
	)
})

export default Works;
