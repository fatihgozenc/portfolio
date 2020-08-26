import { useRef } from 'react';

const useRenderCount = (componentName) => {
	const renders = useRef(1);
	componentName
		? console.log(`${componentName} Renders count: ${renders.current++}`)
		: console.log(`Renders count: ${renders.current++}`);
}

export default useRenderCount
