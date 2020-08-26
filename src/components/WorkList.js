import React from 'react'
import useFetchSuspense from '../utils/useFetchSuspense'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { updateEntries, updateCategory } from '../redux/actions'
import useRenderCount from '../utils/useRenderCount'

const mapDispatchToProps = dispatch => {
	return {
		updateEntries: entries => dispatch(updateEntries(entries)),
		updateCategory: category => dispatch(updateCategory(category))
	}
}

const mapStateToProps = state => ({ category: state.category })

const WorkList = React.memo((props) => {

	const data = useFetchSuspense(
		`${process.env.REACT_APP_API_URL}/works?category=${props.category}`
	).entries;

	const workItem = React.useRef()

	React.useEffect(() => {
		props.updateEntries(data)
	}, [props.category])

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