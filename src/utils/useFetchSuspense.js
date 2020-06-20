import LRU from "lru-cache";
import md5 from "md5";
import produce from "immer";

const cache = new LRU(50);

const useFetchSuspense = (url, fetchOptions = {}) => {
	const key = `${url}.${md5(JSON.stringify(fetchOptions))}`;
	const value = cache.get(key) || { status: 'new', data: null };

	if (value.status === 'resolved') {
		return value.data;
	}

	const promise = fetch(url, fetchOptions).then(response => response.json());

	promise.then(data => {
		cache.set(key, produce(value, draft => {
			draft.status = 'resolved';
			draft.data = data;
		}));
	});

	throw promise;
};

export default useFetchSuspense;