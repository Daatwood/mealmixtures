import {
	FETCH_RECIPES,
	FETCH_RECIPES_SUCCESS,
	FETCH_RECIPES_FAILURE,
	FETCH_RECIPE,
	FETCH_RECIPE_SUCCESS,
	FETCH_RECIPE_FAILURE
} from '../actions/types';
const INITIAL_STATE = { list: [], active: null, error: null, loading: false };
export default function(state = INITIAL_STATE, action) {
	let error;
	switch (action.type) {
		case FETCH_RECIPES:
			return { ...state, list: [], loading: true, error: null };
		case FETCH_RECIPES_SUCCESS:
			return { ...state, list: action.payload, error: null, loading: false };
		case FETCH_RECIPES_FAILURE:
			error = action.payload || { message: action.payload.message };
			return { ...state, list: [], error: error, loading: false };
		case FETCH_RECIPE:
			return { ...state, active: null, loading: true, error: null };
		case FETCH_RECIPE_SUCCESS:
			return { ...state, active: action.payload, loading: false, error: null };
		case FETCH_RECIPE_FAILURE:
			error = action.payload || { message: action.payload.message };
			return { ...state, active: action.payload, error: error, loading: false };
		default:
			return state;
	}
}
