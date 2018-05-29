import { FETCH_RECIPES, FETCH_RECIPE } from '../actions/types';
const INITIAL_STATE = { list: [], active: null };
export default function(state = INITIAL_STATE, action) {
	switch (action.type) {
		case FETCH_RECIPES:
			return { ...state, list: action.payload, active: null };
		case FETCH_RECIPE:
			return { ...state, active: action.payload };
		default:
			return state;
	}
}
