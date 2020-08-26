import React from 'react'
import VariantDesktop from './VariantDesktop'
import VariantMobile from './VariantMobile'

const WorkOverlay = ({ variant, worksDom, data }) => (
	variant === "mobile"
		? <VariantMobile worksDom={worksDom} data={data} />
		: <VariantDesktop worksDom={worksDom} data={data} />
)

export default WorkOverlay