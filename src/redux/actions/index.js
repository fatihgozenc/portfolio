import { UPDATE_ENTRIES } from '../constants'
import { UPDATE_CATEGORY } from '../constants'

export const updateEntries = (payload) => {
	return { type: UPDATE_ENTRIES, payload }
}

export const updateCategory = (payload) => {
	return { type: UPDATE_CATEGORY, payload }
}