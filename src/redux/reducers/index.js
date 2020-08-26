import { UPDATE_ENTRIES } from '../constants'
import { UPDATE_CATEGORY } from '../constants'

const initialState = {
	entries: [],
	category: "web"
}

const rootReducer = (state = initialState, action) => {
	switch (action.type) {
		case UPDATE_ENTRIES:
			return {
				...state,
				entries: action.payload
			}
		case UPDATE_CATEGORY:
			return {
				...state,
				category: action.payload
			}
		default:
			return state
	}
}

export default rootReducer