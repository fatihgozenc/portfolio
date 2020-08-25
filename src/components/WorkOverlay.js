import React from 'react'

const WorkOverlay = ({ data, index }) => {
	return (
		<div className="works__utils__overlay">
			<div className="works__utils__overlay--name">
				<span>{data[index].name}</span>
			</div>
			<div className="works__utils__overlay--year">
				<span>{data[index].year}</span>
			</div>
		</div>
	)
}

export default WorkOverlay