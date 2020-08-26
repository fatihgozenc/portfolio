import React, { Suspense } from 'react';
import { useSpring, animated } from 'react-spring'
import useWindowSize from '../utils/useWindowSize';
import Loading from '../components/Loading';
import useRenderCount from '../utils/useRenderCount';
import WorkNumbers from '../components/WorkNumbers';
import WorkList from '../components/WorkList'

const WorkOverlay = React.lazy(() => import('../components/WorkOverlay'));

const Works = React.memo((props) => {
	const size = useWindowSize();

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
					<WorkOverlay variant="mobile" worksDom={worksDomList} />
				)}
			</div>
			<div className="works__wrapper">
				<animated.div className="works" ref={worksDomList} style={{
					transform: x.interpolate((x) => `translateX(${x}px)`)
				}}>
					<Suspense fallback={<Loading />}>
						<WorkList />
					</Suspense>
				</animated.div>
				{size.width > 1200 && (
					<WorkOverlay variant="desktop" worksDom={worksDomList} />
				)}
			</div>
		</>
	)
})

export default Works;
