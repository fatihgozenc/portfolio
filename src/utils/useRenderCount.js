import { useRef } from 'react';

const useRenderCount = (componentName) => {
	const renders = useRef(1);
	componentName
		? console.log(`${componentName} render count: ${renders.current++}`)
		: console.log(`Render count: ${renders.current++}`);
}

export default useRenderCount
