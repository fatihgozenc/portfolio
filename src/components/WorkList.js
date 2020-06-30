import React from 'react';
import useFetchSuspense from '../utils/useFetchSuspense';
import { Link } from 'react-router-dom';

const WorkList = React.memo(({ filterCategory, getItemAttrs }) => {

	const data = useFetchSuspense(`https://fatihgozenc.com/api/works/${filterCategory}`);
	const workItem = React.useRef()
	React.useEffect(() => {
		getItemAttrs(data[0].name, data[0].year)
	}, [filterCategory])

	return (
		<>
			{
				data.map((work, i) => (
					<article ref={workItem} key={i} name={work.name} from={work.year} className="works__item">
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

export default WorkList;
