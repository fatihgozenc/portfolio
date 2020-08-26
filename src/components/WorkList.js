import React from 'react'
import useFetchSuspense from '../utils/useFetchSuspense'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { updateEntries } from '../redux/actions'
import useRenderCount from '../utils/useRenderCount'

const mapDispatchToProps = dispatch => {
	return {
		updateEntries: entries => dispatch(updateEntries(entries)),
	}
}

const mapStateToProps = state => ({ category: state.category })

const WorkList = React.memo(({ category, updateEntries }) => {

	const data = useFetchSuspense(
		`${process.env.REACT_APP_API_URL}/works?category=${category}`
	).entries;

	const workItem = React.useRef()

	React.useEffect(() => {
		updateEntries(data)
	}, [category, updateEntries, data])

	useRenderCount('WorkList');

	return (
		<>
			{
				data.map((work, i) => (
					<article
						key={i}
						ref={workItem}
						name={work.name}
						from={work.year}
						className="works__item">
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
		</>
	)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps)(WorkList)