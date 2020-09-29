import React, { Suspense } from 'react';
import Loading from '../components/Loading';
import useRenderCount from '../utils/useRenderCount';
import WorkList from '../components/WorkList'
import WorkOverlay from '../components/WorkOverlay'

const Works = React.memo((props) => {

	const worksDomList = React.useRef();
	var whenScrollEnds = null
	useRenderCount('Works');

	return (
		<>
			<div className="works__utils">
				<h1 className="title__outline">Works</h1>
				<WorkOverlay worksDom={worksDomList} whenScrollEnds={whenScrollEnds} />
			</div>
			<div className="works__wrapper">
				<div className="works" ref={worksDomList}>
					<Suspense fallback={<Loading />}>
						<WorkList whenScrollEnds={whenScrollEnds} />
					</Suspense>
				</div>

			</div>
		</>
	)
})

export default Works;
