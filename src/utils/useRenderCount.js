import { useRef } from 'react';

const useRenderCount = () => {
	const renders = useRef(1);
	console.log(`Renders count: ${renders.current++}`);
}

export default useRenderCount
