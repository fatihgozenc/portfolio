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

	const worksDomList = React.useRef();

	useRenderCount('Works');

	return (
		<>
			<div className="works__utils">
				<h1 className="title__outline">Works</h1>
				<WorkNumbers worksDom={worksDomList} />
				{size.width <= 1200 && (
					<WorkOverlay variant="mobile" worksDom={worksDomList} />
				)}
				{size.width > 1200 && (
					<WorkOverlay variant="desktop" worksDom={worksDomList} />
				)}
			</div>
			<div className="works__wrapper">
				<div className="works" ref={worksDomList}>
					<Suspense fallback={<Loading />}>
						<WorkList />
					</Suspense>
				</div>

			</div>
		</>
	)
})

export default Works;
